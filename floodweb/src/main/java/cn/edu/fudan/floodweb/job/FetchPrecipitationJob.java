package cn.edu.fudan.floodweb.job;

import cn.edu.fudan.floodweb.bean.Precipitation;
import cn.edu.fudan.floodweb.bean.StudyArea;
import cn.edu.fudan.floodweb.bean.Weather;
import cn.edu.fudan.floodweb.utils.GeoServerUtil;
import cn.edu.fudan.floodweb.utils.OkHttpUtil;
import cn.edu.fudan.floodweb.utils.ParseWeatherUtil;
import org.joda.time.DateTime;
import org.nutz.dao.Cnd;
import org.nutz.dao.Dao;
import org.nutz.dao.Sqls;
import org.nutz.dao.sql.Sql;
import org.nutz.dao.sql.SqlCallback;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.lang.Times;
import org.quartz.Job;
import org.quartz.JobExecutionContext;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

// 这个类的cron表达式定义在custom/cron.properties
@IocBean
public class FetchPrecipitationJob implements Job {
    @Inject
    protected Dao dao;
    @Inject
    protected GeoServerUtil geoServerUtil;
    //降雨数据获取任务的方法
    public void execute(JobExecutionContext context) {
        System.out.println("开始执行降雨数据获取任务：" + Times.sDTms(new Date()));//Times.sDTms(new Date()) 方法生成当前时间的字符串形式
        System.out.println("获取研究区的所有城市location列表：");
        //查询得到城市locationid
        List<Integer> locidList = getCityLocation();//调用 getCityLocation 方法获取城市的位置列表，并将结果存储在 locidList 中。
        for(Integer locid:locidList) {
            System.out.println("获取城市"+locid+"的7日天气预报:" + Times.sDTms(new Date()));
            //根据locationid调用和风天气获取城市站点7d的降雨量预测值
            List<Weather> weatherList = ParseWeatherUtil.parseWeatherForecast(locid);
            for(Weather weather : weatherList){
                System.out.println("更新城市"+locid+"对应格网"+weather.getFxDate()+"的降雨为:"+weather.getPrecip()+"毫米");
                UpdateOrInsertPrecip(locid,weather);
                //下面代码移出去提高效率
                //执行存储过程，生成对应的风险表
//                Sql sql = Sqls.create("call floodriskbyday(@day)").setParam("day",weather.getFxDate());
//                dao.execute(sql);
//                //动态发布geoserver图层
//                if(publishGeoserverLayer(DateTime.parse(weather.getFxDate()))){
//                    System.out.println(weather.getFxDate()+"洪涝风险图发布成功！");
//                }
            }
        }
        Integer loc = locidList.get(1);
        List<Weather> wth = ParseWeatherUtil.parseWeatherForecast(loc);
        for (Weather w:wth){
            Sql sql = Sqls.create("call floodriskbyday(@day)").setParam("day",w.getFxDate());
            System.out.println(w.getFxDate());
            dao.execute(sql);
            if(publishGeoserverLayer(DateTime.parse(w.getFxDate()))){
                System.out.println(w.getFxDate()+"洪涝风险图发布成功！");
            }
        }
    }
    //得到城市地址id
    private List<Integer> getCityLocation() {
        Sql sql= Sqls.create("select distinct locid from dd_studyarea");
        sql.setCallback(new SqlCallback() {
            @Override
            public Object invoke(Connection connection, ResultSet resultSet, Sql sql) throws SQLException {
                List<Integer> list = new ArrayList<>();
                while (resultSet.next()) {
                    Integer citylocid = resultSet.getInt("locid");
                    list.add(citylocid);
                }
                return list;
            }
        });
        dao.execute(sql);

        return sql.getList(Integer.class);
    }

    /**
     * 已知城市降雨信息，先获取对应研究区的网格，并将降雨信息存储到网格对应的数据表中
     * @param locid
     * @param weather
     * @return
     */
    //根据给定的城市位置和天气对象，检查数据库中是否存在相应日期、经度和纬度的降雨记录。如果存在记录，则更新降雨量信息；如果不存在记录，则插入新的降雨记录。这个方法通过与数据库交互来更新或插入降雨量信息。
    private void UpdateOrInsertPrecip(Integer locid,Weather weather){
        double precip = Double.parseDouble(weather.getPrecip());
        DateTime p_date  = DateTime.parse(weather.getFxDate());
        Cnd cnd = Cnd.where("locid", "=", locid);
        //得到城市id对应研究区中的格网信息
        List<StudyArea> studyAreas = dao.query(StudyArea.class,cnd);
        for(StudyArea studyArea :studyAreas) {
            //是否研究去区网格有降雨记录，有则更新，没有重新插入
            Sql sql = Sqls.create("REPLACE INTO t_precipitation (p_time, lat, lon,precip) VALUES (@date, @lat, @lon,@precip);").setParam("date",weather.getFxDate()).setParam("lat",studyArea.getLat()).setParam("lon",studyArea.getLon()).setParam("precip",precip);
            dao.execute(sql);
//            cnd = Cnd.where("p_time", "=", weather.getFxDate()).and("lon", "=", studyArea.getLon()).and("lat","=",studyArea.getLat());
//            System.out.println(cnd);
            // 改用写完整sql语句执行
            //查看该格网在预报日期是否有降雨记录
//            Precipitation precipitation = dao.fetch(Precipitation.class,cnd);
//            if (precipitation!= null)
//            {
//                //更新降雨量信息
//                precipitation.setPrecip(precip);
//                precipitation.setLat(studyArea.getLat());
//                precipitation.setLon(studyArea.getLon());
//                dao.update(precipitation);
//            }else{
//                //插入降雨量信息
//                precipitation = new Precipitation();
//                precipitation.setPrecip(precip);
//                precipitation.setLat(studyArea.getLat());
//                precipitation.setLon(studyArea.getLon());
//                precipitation.setTime(p_date.toDate());
//                dao.insert(precipitation);
//            }
        }
    }
    //根据给定的风险日期动态发布 GeoServer 图层。它首先检查指定的数据源下是否已存在相应的图层，如果不存在则调用 geoServerUtil.publishDBLayer() 方法将指定的数据库表发布为新的图层，并返回发布结果；如果图层已经存在，则返回 false。
    private boolean publishGeoserverLayer(DateTime riskdate){
        //动态发布geoserver图层
//        GeoServerUtil geoServerUtil = new GeoServerUtil();
        String tableName ="inun_"+riskdate.toString("yyyyMMdd");
        boolean bExists = geoServerUtil.checkLayerIsExist("sde",tableName);
        if(!bExists){
            return geoServerUtil.publishDBLayer("sde","flood",tableName,"sde:inundation");
        }else {
            return false;
        }
    }
}
