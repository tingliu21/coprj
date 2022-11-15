var REGION_CODE_NAME = {"331000": "", "331002": "椒江区", "331003": "黄岩区", "331004": "路桥区", "331082": "临海市",
    "331081": "温岭市", "331021": "玉环市", "331023": "天台县", "331024": "仙居县", "331022": "三门县"};
var REGION_CODE_ACRONYM = {"331000": "", "331002": "jj", "331003": "hy", "331004": "lq", "331082": "lh", "331081": "wl",
    "331021": "yh", "331023": "tt", "331024": "xj", "331022": "sm"}

var authority = "";
/**
 * 根据区县获取地图初始化参数
 * @returns {{center: number[], minZoom: number, zoom: number}}
 */
function getMapParams() {
    var center;
    var zoom = 11, minZoom = 5;
    switch (authority) {
        case "331000": // 台州
            center = [28.65, 121.43];
            break;
        case "331002": // 椒江
            center = [28.68, 121.44];
            break;
        case "331003": // 黄岩
            center = [28.65, 121.26];
            break;
        case "331004": // 路桥
            center = [28.59, 121.36];
            break;
        case "331082": // 临海
            center = [28.86, 121.14];
            break;
        case "331081": // 温岭
            center = [28.37, 121.38];
            break;
        case "331021": // 玉环
            center = [28.14, 121.23];
            break;
        case "331023": // 天台
            center = [29.15, 121];
            break;
        case "331024": // 仙居
            center = [28.85, 120.72];
            break;
        case "331022": // 三门
            center = [29, 121.53];
            break;
    }
    return {center: center, zoom: zoom };
}

/**
 * 根据区县获取Mask图层
 * @returns {*}
 */
function getMaskLayer() {
    var layer;
    if (authority == "331000") {
        layer = '/floodweb/data/mask.json';
    } else {
        layer = '/floodweb/data/mask_' + REGION_CODE_ACRONYM[authority] + '.json';
    }
    return layer;
}

/**
 * 根据区县获取边界图层
 * @returns {*}
 */
function getBoundaryLayer() {
    var layer;
    if (authority == "331000") {
        layer = L.esri.dynamicMapLayer({url: "http://127.0.0.1/arcgis/rest/services/boundary/MapServer"});
    } else {
        layer = L.esri.dynamicMapLayer({url: "http://127.0.0.1/arcgis/rest/services/boundary_" + REGION_CODE_ACRONYM[authority] + "/MapServer"});
    }
    return layer;
}

/**
 * 根据区县获取土壤分布图层
 * @returns {*}
 */
function getSoilLayer() {
    var layer;
    if (authority == "331000") {
        layer = L.esri.dynamicMapLayer({url: "http://127.0.0.1/arcgis/rest/services/EnvFuncZone/MapServer"});
    } else {
        layer = L.esri.dynamicMapLayer({url: "http://127.0.0.1/arcgis/rest/services/EnvFuncZone_" + REGION_CODE_ACRONYM[authority] + "/MapServer"});
    }
    return layer;
}

/**
 * DEM
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
    var layer;
    if (authority == "331000") {
        layer = L.esri.dynamicMapLayer({url: "http://127.0.0.1/arcgis/rest/services/DrinkingWaterSource/MapServer"});
    } else {
        layer = L.esri.dynamicMapLayer({url: "http://127.0.0.1/arcgis/rest/services/DrinkingWaterSource_" + REGION_CODE_ACRONYM[authority] + "/MapServer"});
    }
    return layer;
}

/**
 * 根据区县获取内涝分布图层
 * @returns {*}
 */
function getFloodLayer() {
    var layer;
    if (authority == "331000") {
        layer = L.esri.dynamicMapLayer({url: "http://127.0.0.1/arcgis/rest/services/EcoRedline/MapServer"});
    } else {
        layer = L.esri.dynamicMapLayer({url: "http://127.0.0.1/arcgis/rest/services/EcoRedline_" + REGION_CODE_ACRONYM[authority] + "/MapServer"});
    }
    return layer;
}

/**
 * 根据区县获取土地利用图层
 * @returns {*}
 */
function getLanduseLayer() {
    var wmsLayer = L.tileLayer.wms('http://localhost:8080/geoserver/nurc/wms?',{layers:'nurc:mosaic'});
    return wmsLayer;
}
