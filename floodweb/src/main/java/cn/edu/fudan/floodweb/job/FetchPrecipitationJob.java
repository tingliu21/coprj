package cn.edu.fudan.floodweb.job;

import cn.edu.fudan.floodweb.bean.Precipitation;
import cn.edu.fudan.floodweb.bean.StudyArea;
import cn.edu.fudan.floodweb.bean.Weather;
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
    public void execute(JobExecutionContext context) {
        System.out.println("开始执行降雨数据获取任务：" + Times.sDTms(new Date()));
        System.out.println("获取研究区的所有城市location列表：");
        //查询得到城市locationid
        List<Integer> locidList = getCityLocation();

        for(Integer locid:locidList) {
            System.out.println("获取城市"+locid+"的7日天气预报:" + Times.sDTms(new Date()));
            //根据locationid调用和风天气获取城市站点7d的降雨量预测值
            List<Weather> weatherList = ParseWeatherUtil.parseWeatherForecast(locid);
            for(Weather weather : weatherList){
                System.out.println("更新城市"+locid+"对应格网"+weather.getFxDate()+"的降雨为:"+weather.getPrecip()+"毫米");
                UpdateOrInsertPrecip(locid,weather);
            }
        }
    }

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
    private void UpdateOrInsertPrecip(Integer locid,Weather weather){
        double precip = Double.parseDouble(weather.getPrecip());
        Cnd cnd = Cnd.where("locid", "=", locid);
        //得到城市id对应研究区中的格网信息
        List<StudyArea> studyAreas = dao.query(StudyArea.class,cnd);
        for(StudyArea studyArea :studyAreas) {
            //是否研究去区网格有降雨记录，有则更新，没有重新插入
            cnd = Cnd.where("p_time", "=", weather.getFxDate()).and("lon", "=", studyArea.getLon()).and("lat","=",studyArea.getLat());
            //查看该格网在预报日期是否有降雨记录
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