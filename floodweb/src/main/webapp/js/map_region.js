
/**
 * 根据区县获取土壤分布图层
 * @returns {*}
 */
function getSoilLayer() {
    var layer= L.esri.dynamicMapLayer({url: "https://ilab.fudan.edu.cn/arcgis/rest/services/Soil/MapServer"});
    return layer;
}

/**
 * DEM,暂无
 * @returns {*}
 */
function getDEMLayer(){
    var wmsLayer = L.tileLayer.wms('http://111.231.120.210:8080/geoserver/nurc/wms?',{layers:'nurc:mosaic'});
    return wmsLayer;
}
/**
 * 根据区县获取河湖水系图层
 * @returns {*}
 */
function getWaterLayer() {
    var layer= L.esri.dynamicMapLayer({url: "https://ilab.fudan.edu.cn/arcgis/rest/services/River/MapServer"});

    return layer;
}

/**
 * 根据区县获取内涝分布图层,暂无
 * @returns {*}
 */
function getFloodLayer() {
    var layer = L.esri.dynamicMapLayer({url: "http://127.0.0.1/arcgis/rest/services/EcoRedline/MapServer"});
    return layer;
}

/**
 * 根据区县获取土地利用图层
 * @returns {*}
 */
function getLanduseLayer() {
    var layer= L.esri.dynamicMapLayer({url: "https://ilab.fudan.edu.cn/arcgis/rest/services/Landuse/MapServer"});
    return layer;
}

function getPopLayer() {
    var layer= L.esri.dynamicMapLayer({url: "https://ilab.fudan.edu.cn/arcgis/rest/services/Pop/MapServer"});
    return layer;
}
