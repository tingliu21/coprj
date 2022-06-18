package cn.edu.fudan.floodweb.module;

import cn.edu.fudan.floodweb.utils.OkHttpUtil;
import cn.edu.fudan.floodweb.bean.User;
import org.nutz.dao.Dao;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.lang.util.NutMap;
import org.nutz.mvc.Scope;
import org.nutz.mvc.annotation.*;
import org.nutz.mvc.filter.CheckSession;

@IocBean
@At("/map")
@Ok("json")
@Fail("http:500")
public class MapModule {
    @Inject
    protected Dao dao;

    @At
    @Ok("re:jsp:/index.jsp")
    @Filters(@By(type= CheckSession.class, args={"me", "/signin.html"}))
    public String index(@Attr(scope= Scope.SESSION, value="me")String username) {
        User user = dao.fetch(User.class, username);
        switch (user.getRegion()) {
            case 331000:
                return null;
            default:
                return null;
        }
    }


    @At
    public Object query(@Param("layer")int layer, @Param("lon")String lon, @Param("lat")String lat,
                        @Param("region")String region) {
        NutMap re = new NutMap();
        String strLayer = "";
        String strurl = "";
        String outFields = "";
        String where = "";
        switch (layer) {
            case 1:
                strLayer = "EnvFuncZone";
                strurl = "http://120.27.230.108/arcgis/rest/services/" + strLayer + "/MapServer/1/query?";
                outFields = "名称%2C编号%2C功能区序号%2C功能区类型%2C行政区%2C管控措施%2C负面清单";
                where = "行政区%3D%27" + region + "%27";
                break;
            case 2:
                strLayer = "DrinkingWaterSource";
                strurl = "http://120.27.230.108/arcgis/rest/services/" + strLayer + "/MapServer/1/query?";
                outFields = "水源地名称%2C功能名称%2C行政区划%2C功能类型%2C管控措施";
                where = "行政区划%3D%27" + region + "%27";
                break;
            case 3:
                strLayer = "EcoRedline";
                strurl = "http://120.27.230.108/arcgis/rest/services/" + strLayer + "/MapServer/1/query?";
                outFields = "XQBH%2CXQMC%2C类型%2C行政区";
                where = "行政区%3D%27" + region + "%27";
                break;
            case 4:
                strLayer = "SXYD";
                strurl = "http://120.27.230.108/arcgis/rest/services/" + strLayer + "/MapServer/0/query?";
                outFields = "HJGKDYBM%2CHJGKDYMC%2CCOUNTY%2CREMARKS";
                where = "county%3D%27" + region + "%27";
                break;
//            case 5:
//                strLayer = "WaterControl";
//                strurl = "http://120.27.230.108/arcgis/rest/services/" + strLayer + "/MapServer/0/query?";
//                outFields = "XQBH%2CXQMC%2C类型%2C行政区";
//                break;
//            case 6:
//                strLayer = "EcoControl";
//                strurl = "http://120.27.230.108/arcgis/rest/services/" + strLayer + "/MapServer/0/query?";
//                outFields = "XQBH%2CXQMC%2C类型%2C行政区";
//                break;
//            case 7:
//                strLayer = "GeneralControl";
//                strurl = "http://120.27.230.108/arcgis/rest/services/" + strLayer + "/MapServer/0/query?";
//                outFields = "XQBH%2CXQMC%2C类型%2C行政区";
//                break;
            default:
                break;
        }
        StringBuilder url = new StringBuilder();
        url.append(strurl)
                .append("outFields=" + outFields)
                .append("&where=" + where)
                .append("&returnGeometry=true")
                .append("&geometryType=esriGeometryPoint")
                .append("&geometry=").append(lon).append(",").append(lat)
                .append("&f=geojson")
                .append("&insr=4326")
                .append("&outsr=4326");
        String response = OkHttpUtil.httpGet(url.toString());
        if (!response.equals("") && response != null) {
            return re.setv("ok", true).setv("data", response);
        } else {
            return re.setv("ok", false).setv("msg", "查询服务失效！");
        }
    }
}
