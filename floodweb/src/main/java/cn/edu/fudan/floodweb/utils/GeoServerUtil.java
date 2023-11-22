package cn.edu.fudan.floodweb.utils;

import cn.edu.fudan.floodweb.bean.GeoserverConfig;
import it.geosolutions.geoserver.rest.GeoServerRESTManager;
import it.geosolutions.geoserver.rest.GeoServerRESTReader;
import it.geosolutions.geoserver.rest.encoder.GSLayerEncoder;
import it.geosolutions.geoserver.rest.encoder.GSResourceEncoder;
import it.geosolutions.geoserver.rest.encoder.feature.GSFeatureTypeEncoder;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;

import java.net.MalformedURLException;
import java.net.URL;

@IocBean
public class GeoServerUtil {
    @Inject("geoserverConfig")
    protected GeoserverConfig geoserverConfig;
    /**
     * 发布MySQL数据库中的空间数据表
     * @param workspaceName 工作区名称sde
     * @param storeName     数据源名称flood
     * @param tableName     空间数据表名，发布的图层名也一致	inun_20220901
     * @param sytleName     样式名称sde:inundation
     * @return              是否发布成功
     */
    public boolean publishDBLayer(String workspaceName, String storeName, String tableName, String sytleName){
        GSFeatureTypeEncoder fte = new GSFeatureTypeEncoder();
        fte.setNativeName(tableName);
        fte.setProjectionPolicy(GSResourceEncoder.ProjectionPolicy.FORCE_DECLARED);
        fte.addKeyword("features");
        fte.setTitle(tableName);
        fte.setName(tableName);
        fte.setSRS("EPSG:4326"); // srs=null?"EPSG:4326":srs);
        //长三角区块的边界范围lon：115.875-122.5，lat：24.875-33.125
        //全国的边界范围lon：74-122.5，纬度18.25-53.5
        fte.setNativeBoundingBox(74,18.25,122.533333307,53.5,"EPSG:4326");
        fte.setLatLonBoundingBox(74,18.25,122.533333307,53.5,"EPSG:4326");

        GSLayerEncoder layerEncoder = new GSLayerEncoder();
        layerEncoder.setDefaultStyle("sde:inundation");

        //与GeoServer连接，进行管理
        try {
            GeoServerRESTManager manager = new GeoServerRESTManager(new URL(geoserverConfig.getUrl()), geoserverConfig.getUserName(), geoserverConfig.getPassWord());
            return manager.getPublisher().publishDBLayer(workspaceName,storeName,fte,layerEncoder);
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
    }
    public boolean checkLayerIsExist(String workspaceName, String layerName){
        try {
            GeoServerRESTManager manager = new GeoServerRESTManager(new URL(geoserverConfig.getUrl()), geoserverConfig.getUserName(), geoserverConfig.getPassWord());
            GeoServerRESTReader reader = manager.getReader();
            return  reader.existsLayer(workspaceName,layerName);
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
    }
}