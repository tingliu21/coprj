package cn.edu.fudan.floodweb.utils;

import cn.edu.fudan.floodweb.bean.Weather;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONException;
import com.alibaba.fastjson.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class ParseWeatherUtil {
    private static final String baseUrl = "https://devapi.qweather.com/v7/weather/7d?key=69ce23ee611d46eba23801a6d343fb3d";
    private static final String nowUrl = "https://devapi.qweather.com/v7/weather/now?key=69ce23ee611d46eba23801a6d343fb3d";

    /**
     * 解析实况天气数据
     * @param locId
     * @return
     */
    private Weather parseWeatherNow(Integer locId) {
        String strURL = nowUrl +"&location=" + locId ;
        Weather weather = null;
        try {
            String response = OkHttpUtil.httpGet(strURL);
            JSONObject root = JSONObject.parseObject(response);
            if(root.getString("code").equals("200")) {
                JSONObject nowObj = root.getJSONObject("now");
                weather = new Weather();
                weather.setFxDate(nowObj.getString("obsTime"));
                weather.setPrecip(nowObj.getString("precip"));
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return weather;
    }

    /**
     * 解析天气预报数据
     * @param locId
     * @return
     */
    public static List<Weather> parseWeatherForecast(Integer locId) {
        String strURL = baseUrl +"&location=" + locId ;
        try {
            String response = OkHttpUtil.httpGet(strURL);
            JSONObject root = JSONObject.parseObject(response);
            if(root.getString("code").equals("200")) {
                List<Weather> weathers = new ArrayList<>();
                JSONArray forecastObj = root.getJSONArray("daily");
                for(int i =0;i<forecastObj.size();i++) {
                    Weather weather = new Weather();
                    weather.setFxDate(forecastObj.getJSONObject(i).getString("fxDate"));
                    weather.setPrecip(forecastObj.getJSONObject(i).getString("precip"));
                    System.out.println((weather));
                    weathers.add(weather);
                }
                return weathers;
            }

        } catch (JSONException e) {
            e.printStackTrace();
        }
        return null;
    }
}
