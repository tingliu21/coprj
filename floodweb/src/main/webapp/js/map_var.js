var WEB_PATH = "/floodweb";
// var GEOSERVER_PATH="http://localhost:8088/geoserver/sde/wms";
var GEOSERVER_PATH="https://ilab.fudan.edu.cn/geoserver/sde/wms";
var LAYER_TDT_NORMAL;
var LAYER_TDT_NORMAL_ANNO;
var LAYER_TDT_SATELLITE;
var LAYER_TDT_SATELLITE_ANNO;
var LAYER_TDT_TERRAIN;
var LAYER_TDT_TERRAIN_ANNO;
// var LAYER_TZBOUNDARY;
var LAYER_SOIL; //土壤数据图层
var LAYER_DEMTOPP; //DEM图层
var LAYER_WATER;   //河湖水系图层
var LAYER_FLOOD;   //内涝图层
var LAYER_LANDUSE; //土地利用
var LAYER_POP; //人口密度

var LAYER_RISK; //风险图层
var chartline;
var timeList; //时间轴时间列表

// var highlightStyle;
var highlightLayer;
var queryLocationMarker;
var map;
var satellite;  //影像底图
var normal;     //矢量底图
var terrain;    //地形底图
var baseLayers; //底图
// var overlays;
var operationOverlays; //业务图层
var heatmapLayer; //热力图
var measureControl;

//图例
var htmlLegend_risk;
var htmlLegend_soil;
var htmlLegend_landuse;
var htmlLegend_water;
var htmlLegend_flood;
var htmlLegend_pop;

// var sidebar_bookmark;
var sidebar;
var normal_click;
var double_click;
var map_mousemove;
var addbookmark_click;
var layergroup_rain1; //降雨聚合图
var layergroup_rain3;
var layergroup_rain5;
var layergroup_wts; //灾害事件
// var DIST_STYLE;

function initVar() {
    LAYER_TDT_NORMAL = L.tileLayer.chinaProvider('TianDiTu.Normal.Map',{maxZoom:18,minZoom:3});
    LAYER_TDT_NORMAL_ANNO = L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion',{maxZoom:18,minZoom:3});
    LAYER_TDT_SATELLITE = L.tileLayer.chinaProvider('TianDiTu.Satellite.Map',{maxZoom:18,minZoom:3});
    LAYER_TDT_SATELLITE_ANNO = L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion',{maxZoom:18,minZoom:3});
    LAYER_TDT_TERRAIN = L.tileLayer.chinaProvider('TianDiTu.Terrain.Map', {maxZoom:18,minZoom:3});
    LAYER_TDT_TERRAIN_ANNO = L.tileLayer.chinaProvider('TianDiTu.Terrain.Annotion', {maxZoom:18,minZoom:3});

    LAYER_SOIL = getSoilLayer();
    LAYER_DEMTOPP=getDEMLayer();
    LAYER_WATER = getWaterLayer();
    LAYER_FLOOD = getFloodLayer();
    LAYER_LANDUSE = getLanduseLayer();
    LAYER_POP = getPopLayer();

    queryLocationMarker = L.marker(L.latLng(0, 0));

    satellite = L.layerGroup([LAYER_TDT_SATELLITE, LAYER_TDT_SATELLITE_ANNO]);
    normal = L.layerGroup([LAYER_TDT_NORMAL, LAYER_TDT_NORMAL_ANNO]);
    terrain = L.layerGroup([LAYER_TDT_TERRAIN, LAYER_TDT_TERRAIN_ANNO]);

    baseLayers = {
        "satellite":satellite,
        "normal": normal,
        "terrain": terrain
    };

    operationOverlays = {
        "landuse": LAYER_LANDUSE,
        "soil": LAYER_SOIL,
        "water": LAYER_WATER,
        "flood": LAYER_FLOOD,
        "pop": LAYER_POP
        // "dem":LAYER_DEMTOPP
    };

    /* 风险等级图例 */
    htmlLegend_risk = L.control.htmllegend({
        position: 'bottomright',
        legends: [{
            name: '风险等级',
            layer: LAYER_RISK,
            elements: [{
                label: ' ',
                html: '',
                style: {
                    'background': '#FFF url(img/legend_1.png) no-repeat',
                    'width': '230px',
                    'height': '30px'
                }
            }]
        }],
        collapseSimple: true,
        detectStretched: true,
        defaultOpacity: 0.6,
        visibleIcon: 'icon icon-eye',
        hiddenIcon: 'icon icon-eye-slash'
    });

    /* 土壤数据图例 */
    htmlLegend_soil = L.control.htmllegend({
        position: 'bottomright',
        legends: [{
            name: '土壤数据',
            layer: LAYER_SOIL,
            elements: [{
                label: ' ',
                html: '',
                style: {
                    'background': '#FFF url(img/legend_soil.png) no-repeat',
                    'background-size': '230px 80px',
                    'width': '230px',
                    'height': '80px'
                }
            }]
        }],
        collapseSimple: true,
        detectStretched: true,
        defaultOpacity: 1,
        visibleIcon: 'icon icon-eye',
        hiddenIcon: 'icon icon-eye-slash'
    });

    /* 土地利用图例 */
    htmlLegend_landuse = L.control.htmllegend({
        position: 'bottomright',
        legends: [{
            name: '土地利用数据',
            layer: LAYER_LANDUSE,
            elements: [{
                label: ' ',
                html: '',
                style: {
                    // 复旦的服务器web请求地址多了envi1，暂时用相对路径，从index.html页面访问img
                    // 'background': '#FFF url(' + WEB_PATH + '/img/legend_landuse.png) no-repeat',
                    'background': '#FFF url(img/legend_landuse.png) no-repeat',
                    'background-size': '230px 80px',
                    'width': '230px',
                    'height': '80px'
                }
            }]
        }],
        collapseSimple: true,
        detectStretched: true,
        defaultOpacity: 1,
        visibleIcon: 'icon icon-eye',
        hiddenIcon: 'icon icon-eye-slash'
    });

    /*  河湖水系分布图例 */
    htmlLegend_water = L.control.htmllegend({
        position: 'bottomright',
        legends: [{
            name: '河湖水系分布',
            layer: LAYER_WATER,
            elements: [{
                label: ' ',
                html: '',
                style: {
                    'background': '#FFF url(img/legend_water.png) no-repeat',
                    'background-size': '230px 25px',
                    'width': '230px',
                    'height': '25px'
                }
            }]
        }],
        collapseSimple: true,
        detectStretched: true,
        defaultOpacity: 1,
        visibleIcon: 'icon icon-eye',
        hiddenIcon: 'icon icon-eye-slash'
    });

    /* 内涝分布图例 */
    htmlLegend_flood = L.control.htmllegend({
        position: 'bottomright',
        legends: [{
            name: '内涝分布',
            layer: LAYER_FLOOD,
            elements: [{
                label: ' ',
                html: '',
                style: {
                    'background': '#FFF url(' + WEB_PATH + '/img/legend_landuse.png) no-repeat',
                    'background-size': '230px 80px',
                    'width': '230px',
                    'height': '80px'
                }
            }]
        }],
        collapseSimple: true,
        detectStretched: true,
        defaultOpacity: 1,
        visibleIcon: 'icon icon-eye',
        hiddenIcon: 'icon icon-eye-slash'
    });

    /* 人口密度图例 */
    htmlLegend_pop = L.control.htmllegend({
        position: 'bottomright',
        legends: [{
            name: '人口密度(万/km2)',
            layer: LAYER_POP,
            elements: [{
                label: ' ',
                html: '',
                style: {
                    'background': '#FFF url(img/legend_pop.png) no-repeat',
                    'background-size': '230px 25px',
                    'width': '230px',
                    'height': '25px'
                }
            }]
        }],
        collapseSimple: true,
        detectStretched: true,
        defaultOpacity: 1,
        visibleIcon: 'icon icon-eye',
        hiddenIcon: 'icon icon-eye-slash'
    });

    /* 在地图上任意双击则按经纬度查询风险值 */
    double_click = function (e) {
        if (map.hasLayer(queryLocationMarker)) {
            map.removeLayer(queryLocationMarker);
        }
        queryLocationMarker = L.marker(L.latLng(e.latlng.lat,  e.latlng.lng)).addTo(map);
        //如果左侧风险查询日期有值，就用风险查询的日期，否则用当天
        let queryDate = formatDate(new Date());
        if ($('#risk-date').val() != "") {
            queryDate = $('#risk-date').val()
        }
        $.get( "rainflood/queryLocinundation?qdate=" + queryDate + "&num=3&clat=" + e.latlng.lat + "&clon=" + e.latlng.lng, function(data) {
            if (data.ok) {
                $('#risk-query-date').val(queryDate)
                $('#risk-query-lon').text(e.latlng.lng)
                $('#risk-query-lat').text(e.latlng.lat)
                generateRiskChart(data.data)
                $('#riskInfoModal').modal('show');
            } else {
                alert(data.msg);
            }

        });
    };

    /* 在地图上任意移动鼠标显示当前经纬度 */
    map_mousemove = function (e) {
        $('#latlon_info').text("经纬度：" + e.latlng.lat.toFixed(5) + "°N, " + e.latlng.lng.toFixed(5) + "°E");
    };

}

function getMapParams() {
    var center = [30, 119.5];
    var zoom = 10, minZoom = 8;

    return {center: center, zoom: zoom, minZoom: minZoom};
}
