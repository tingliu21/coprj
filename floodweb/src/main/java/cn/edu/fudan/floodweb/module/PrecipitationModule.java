package cn.edu.fudan.floodweb.module;

import cn.edu.fudan.floodweb.bean.*;
import cn.edu.fudan.floodweb.utils.DateTimeUtil;
import cn.edu.fudan.floodweb.utils.GeoServerUtil;
import cn.edu.fudan.floodweb.utils.OkHttpUtil;
import cn.edu.fudan.floodweb.utils.ParseWeatherUtil;
import org.joda.time.DateTime;
import org.joda.time.Days;
import org.nutz.dao.Cnd;
import org.nutz.dao.Dao;
import org.nutz.dao.Sqls;
import org.nutz.dao.sql.Sql;
import org.nutz.dao.sql.SqlCallback;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.lang.util.NutMap;
import org.nutz.mvc.annotation.At;
import org.nutz.mvc.annotation.Fail;
import org.nutz.mvc.annotation.Ok;
import org.nutz.mvc.annotation.Param;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@IocBean
@At("precip")
@Ok("json")
@Fail("http:500")
public class PrecipitationModule {
    @Inject
    protected Dao dao;
    @Inject
    protected GeoServerUtil geoServerUtil;
    @At
    public Object querylite(@Param("day")String sDay){
        if (sDay == null || sDay.equals("")) {
            return null;
        }
        Cnd cnd = Cnd.where("p_time", "=", sDay);
        List<Precipitation> precipList = dao.query(Precipitation.class, cnd);
        return precipList;
    }
    @At
    public void getCityPrecip() {
        //查询得到城市locationid
        Sql citySql= Sqls.create("select distinct locid from dd_studyarea");
        citySql.setCallback(new SqlCallback() {
            @Override
            public Object invoke(Connection connection, ResultSet resultSet, Sql sql) throws SQLException {
                return getCityLocation(resultSet);
            }
        });
        dao.execute(citySql);
        List<Integer> locidList = citySql.getList(Integer.class);

        Cnd cnd = Cnd.where(null);

        for(Integer locid:locidList) {
            //根据locationid调用和风天气获取7d的降雨量预测值
            //得到1个城市站点7天的降雨量信息
            List<Weather> weatherList = ParseWeatherUtil.parseWeatherForecast(locid);
            for(Weather weather : weatherList){
                double precip = Double.parseDouble(weather.getPrecip());
                if(precip>0.0){
                    //城市有降雨信息，先获取对应研究区的网格，并将降雨信息存储到数据表中
                    cnd = Cnd.where("locid", "=", locid);
                    List<StudyArea> studyAreas = dao.query(StudyArea.class,cnd);
                    for(StudyArea studyArea :studyAreas) {
                        //是否研究去区网格有降雨记录，有则更新，没有重新插入
                        cnd = Cnd.where("p_time", "=", weather.getFxDate()).and("lon", "=", studyArea.getLon()).and("lat","=",studyArea.getLat());
                        Precipitation precipitation = dao.fetch(Precipitation.class,cnd);
                        if (precipitation!=null)
                        {
                            //更新降雨量信息
                            precipitation.setPrecip(precip);
                            dao.update(precipitation);
                        }else{
                            //插入降雨两信息
                            precipitation = new Precipitation();
                            precipitation.setPrecip(precip);
                            precipitation.setLat(studyArea.getLat());
                            precipitation.setLon(studyArea.getLon());
                            precipitation.setTime(DateTime.parse(weather.getFxDate()).toDate());
                            dao.insert(precipitation);
                        }

                    }

                }
            }
        }
    }

    @At
    public void batchPublishGL(@Param("sdate")String begin,@Param("edate")String end) {
        DateTime dtStart = DateTime.parse(begin);
        DateTime dtStop = DateTime.parse(end);
        int times = Days.daysBetween(dtStart,dtStop).getDays();
        for(int i=0;i<times;i++){
            DateTime ptime = dtStart.plusDays(i);
            String tableName ="inun_"+ptime.toString("yyyyMMdd");
            boolean bExists = geoServerUtil.checkLayerIsExist("sde",tableName);
            if(!bExists){
                if(geoServerUtil.publishDBLayer("sde","flood",tableName,"sde:inundation")){
                    System.out.println(tableName+"洪涝风险图发布成功！");
                }
            }
        }
    }
    private List<Integer> getCityLocation(ResultSet rs) throws SQLException {
        List<Integer> list = new ArrayList<>();
        while (rs.next()) {
            Integer citylocid = rs.getInt("locid");
            list.add(citylocid);
        }
        return list;
    }
}
