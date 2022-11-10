package cn.edu.fudan.floodweb.module;

import cn.edu.fudan.floodweb.bean.*;
import cn.edu.fudan.floodweb.utils.DateTimeUtil;
import cn.edu.fudan.floodweb.utils.ReflectUtil;
import org.joda.time.DateTime;
import org.nutz.dao.Cnd;
import org.nutz.dao.Dao;
import org.nutz.dao.FieldFilter;
import org.nutz.dao.util.Daos;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.lang.util.NutMap;
import org.nutz.mvc.annotation.At;
import org.nutz.mvc.annotation.Fail;
import org.nutz.mvc.annotation.Ok;
import org.nutz.mvc.annotation.Param;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@IocBean
@At("rainflood")
@Ok("json")
@Fail("http:500")
public class RainFloodModule {
    @Inject
    protected Dao dao;

    /**
     * 查询图层
     * @return
     */
    @At
    public Object querylayer(@Param("qdate")String querydate,@Param("clon")double qlon,@Param("clat")double qlat) {
        NutMap re = new NutMap();
        Cnd cnd = Cnd.where(null);
        if(qlon==0.0 || qlat==0.0){
            re.setv("ok",false).setv("msg","没有经纬度参数信息！");
            return re;
        }
        if (querydate == null || querydate.equals("")) {
            re.setv("ok",false).setv("msg","没有查询日期信息！");
            return re;
        }
        cnd = cnd.and("p_time", "=", querydate).and("lon",">=",qlon-0.125).and("lat",">=",qlat-0.125)
                .and("lon","<=",qlon+0.125).and("lat","<=",qlat+0.125);
        //查询中心点的日降雨量信息
        Precipitation precipitation = dao.fetch(Precipitation.class,cnd);
        double precip = precipitation.getPrecip();
        //查询降雨强度对应的重现期图层名
        cnd = Cnd.where("precip_min","<",precip).and("precip_max",">",precip);
        RainFlood rainFlood = dao.fetch(RainFlood.class, cnd);
        re.setv("ok",true).setv("data",rainFlood.getLayername());
        return re;
    }
    /**
     * 查询某位置日期前后几天的淹没风险
     * @return
     */
    @At
    public Object queryLocinundation(@Param("qdate")String querydate,@Param("num")int num,@Param("clon")double qlon,@Param("clat")double qlat) throws Exception {
        NutMap re = new NutMap();
        if(qlon==0.0 || qlat==0.0){
            re.setv("ok",false).setv("msg","没有经纬度参数信息！");
            return re;
        }
        if (querydate == null || querydate.equals("")) {
            re.setv("ok",false).setv("msg","没有查询日期信息！");
            return re;
        }
        if(num==0){
            //默认查询前后3天，共7天的风险
            num=3;
        }
        //得到查询日期
        DateTime dateTime = DateTime.parse(querydate);

        //查询7天的降雨信息
        Cnd cnd = Cnd.where(null);
        //30km格网半径0.125
        cnd = cnd.and("p_time", ">=", dateTime.minusDays(num).toString("yyyy-MM-dd")).and("p_time", "<=", dateTime.plusDays(num).toString("yyyy-MM-dd"))
                .and("lon",">=",qlon-0.125).and("lat",">=",qlat-0.125)
                .and("lon","<=",qlon+0.125).and("lat","<=",qlat+0.125);
        //查询中心点的日降雨量信息
        List<Precipitation> precipList= dao.query(Precipitation.class,cnd);
        //多日洪涝淹没深度
        List<DayDepth> depthList = new ArrayList<>();
        for(Precipitation precipitation:precipList) {
            DayDepth dayDepth = new DayDepth();
            Date p_time = precipitation.getTime();
            dayDepth.setDay(DateTimeUtil.dateToStr(p_time,("MM-dd")));
            Double depth =0.0;
            double precip = precipitation.getPrecip();
            String gridno =String.format("%d",(int)(precipitation.getLon()*1000000+precipitation.getLat()*100));
            //查询降雨强度对应的重现期图层名
            cnd = Cnd.where("precip_min", "<=", precip).and("precip_max", ">", precip);
            RainFlood rainFlood = dao.fetch(RainFlood.class, cnd);
            if (rainFlood != null) {
                String fieldName = rainFlood.getFieldname();
                //1km格网半径0.00416667
                cnd = cnd.where("lng_c",">=",qlon-0.00416667).and("lat_c",">=",qlat-0.00416667)
                        .and("lng_c","<=",qlon+0.00416667).and("lat_c","<=",qlat+0.00416667);
                InunRiver river = dao.fetch(InunRiver.class,cnd);
                if(river==null){
                    re.setv("ok",false).setv("msg","暂无该地区洪涝风险数据！");
                    return re;
                }
                //通过java反射机制获取属性值
                depth = (Double) ReflectUtil.getFieldValueByObject(river,fieldName);
                BigDecimal bg = new BigDecimal(depth);
                depth = bg.setScale(3,BigDecimal.ROUND_HALF_UP).doubleValue();
            }
            //设置淹没深度
            dayDepth.setDepth(depth);
            depthList.add(dayDepth);
        }
        re.setv("ok",true).setv("data",depthList);
        return re;
    }
}

