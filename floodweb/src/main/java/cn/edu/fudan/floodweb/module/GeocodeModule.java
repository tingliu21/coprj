package cn.edu.fudan.floodweb.module;

import cn.edu.fudan.floodweb.utils.OkHttpUtil;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.lang.util.NutMap;
import org.nutz.mvc.annotation.At;
import org.nutz.mvc.annotation.Fail;
import org.nutz.mvc.annotation.Ok;
import org.nutz.mvc.annotation.Param;

@IocBean
@At("/geocode")
@Ok("json")
@Fail("http:500")
public class GeocodeModule {
    /**
     * 根据经纬度查地址
     * @param lon
     * @param lat
     * @return
     */
    @At
    public Object regeo(@Param("lon")String lon, @Param("lat")String lat) {
        NutMap re = new NutMap();
        String response = OkHttpUtil.httpGet("http://www.tianditu.com/query.shtml?postStr={'lon':" + lon + ",'lat':" + lat + ",'appkey':8a7b9aac0db21f9dd995e61a14685f05,'ver':1}&type=geocode");
        if (!response.equals("") && response != null) {
            try {
                JSONObject jsonRes = JSON.parseObject(response);
                if (jsonRes.getString("status").equals("0")) {
                    String address = jsonRes.getJSONObject("result").getString("formatted_address");
                    return re.setv("ok", true).setv("data", address);
                } else {
                    return re.setv("ok", false).setv("msg", jsonRes.getString("msg"));
                }
            } catch(Exception ex) {
                return re.setv("ok", false).setv("msg", "查询结果出错！");
            }
        } else {
            return re.setv("ok", false).setv("msg", "查询结果出错！");
        }

    }

    /**
     * 根据地址查经纬度
     * @param address
     * @return
     */
    @At
    public Object geo(@Param("address")String address) {
        NutMap re = new NutMap();
//        String response = OkHttpUtil.httpGet("http://api.tianditu.com/geocoder?ds={\"keyWord\":\"" + address + "\"}");
        String response = OkHttpUtil.httpGet("http://api.tianditu.gov.cn/geocoder?ds={\"keyWord\":\"" + address + "\"}&tk=33b699b67fb70716e2abe7f737658929");
        if (!response.equals("") && response != null) {
            try {
                JSONObject jsonRes = JSON.parseObject(response);
                if (jsonRes.getString("status").equals("0")) {
//					String lon = jsonRes.getJSONObject("location").getString("lon");
//					String lat = jsonRes.getJSONObject("location").getString("lat");
                    return re.setv("ok", true).setv("data", jsonRes.getJSONObject("location"));
                } else {
//					return jsonRes.getString("msg");
                    return re.setv("ok", false).setv("msg", jsonRes.getString("msg"));
                }
            } catch (Exception ex) {
                return re.setv("ok", false).setv("msg", "查询结果出错！");
            }
        } else {
            return re.setv("ok", false).setv("msg", "查询结果出错！");
        }
    }
}
