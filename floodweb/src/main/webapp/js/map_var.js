var WEB_PATH = "/floodweb";
var LAYER_TDT_NORMAL;
var LAYER_TDT_NORMAL_ANNO;
var LAYER_TDT_SATELLITE;
var LAYER_TDT_SATELLITE_ANNO;
var LAYER_TZBOUNDARY;
var LAYER_ENVFUNCZONE;
var LAYER_DEMTOPP;
var LAYER_DRINKINGWATERSOURCE;
var LAYER_ECOREDLINE;
var LAYER_SXYD;
var POPUP_ADD_BOOKMARK;
var POPUP_SHOW_BOOKMARK;
var highlightStyle;
var highlightLayer;
var queryLocationMarker;
var map;
var satellite;  //影像底图
var normal;     //矢量底图
var baseLayers; //底图
// var overlays;
var operationOverlays; //业务图层
var heatmapLayer; //热力图
var measureControl;
var htmlLegend1;
var htmlLegend2;
var htmlLegend3;

var htmlLegendWater;
// var sidebar_bookmark;
var sidebar;
var normal_click;
var double_click;
var map_mousemove;
var addbookmark_click;
var layergroup_ent; //人口
var layergroup_wts; //灾害事件
var DIST_STYLE;


function initVar() {
    LAYER_TDT_NORMAL = L.tileLayer.chinaProvider('TianDiTu.Normal.Map',{maxZoom:18,minZoom:5});
    LAYER_TDT_NORMAL_ANNO = L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion',{maxZoom:18,minZoom:5});
    LAYER_TDT_SATELLITE = L.tileLayer.chinaProvider('TianDiTu.Satellite.Map',{maxZoom:18,minZoom:5});
    LAYER_TDT_SATELLITE_ANNO = L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion',{maxZoom:18,minZoom:5});
    LAYER_TZBOUNDARY = getBoundaryLayer();
    LAYER_ENVFUNCZONE = getEnvFuncZoneLayer();
    LAYER_DEMTOPP=getDEMLayer();
    LAYER_DRINKINGWATERSOURCE = getDrinkingWaterSourceLayer();
    LAYER_ECOREDLINE = getEcoRedLineLayer();
    LAYER_SXYD = getSxydLayer();

    POPUP_ADD_BOOKMARK = "<p>书签标题：<input type='text' id='bm_title'></p><p>书签内容：<input type='text' id='bm_content'></p><p><input type='button' value='确定' id='add-bookmark'></p>";
    POPUP_SHOW_BOOKMARK = "";

    highlightStyle = {
        "color": "#ffff00",
        "fillColor": "#ffffff",
        "weight": 3,
        "opacity": 1,
        "fillOpacity": 0.5
    };

    DIST_STYLE = {
        fillOpacity: 1.0,
        color: "#fff",
        weight: 1
    };

    queryLocationMarker = L.marker(L.latLng(0, 0));


    satellite = L.layerGroup([LAYER_TDT_SATELLITE, LAYER_TDT_SATELLITE_ANNO]);
    normal = L.layerGroup([LAYER_TDT_NORMAL, LAYER_TDT_NORMAL_ANNO]);

    baseLayers = {
        "satellite":satellite,
        "normal": normal
    };

    overlays = {
        "土壤类型": LAYER_ENVFUNCZONE,
        "河湖水系分布": LAYER_DRINKINGWATERSOURCE,
        "内涝分布": LAYER_ECOREDLINE

    };


    operationOverlays = {
        "sxyd": LAYER_SXYD,
        "envfunczone": LAYER_ENVFUNCZONE,
        "drinkingwatersource": LAYER_DRINKINGWATERSOURCE,
        "ecoredline": LAYER_ECOREDLINE,
        "dem":LAYER_DEMTOPP
    };

    heatmapLayer = new HeatmapOverlay({
        "maxOpacity": 0,
        radius: 20,
        latField: 'lat',
        lngField: 'lng',
        valueField: 'count'
    });

    // 测量控件
    measureControl = L.control.measure({
        primaryLengthUnit: 'meters',
        secondaryLengthUnit: 'kilometers',
        primaryAreaUnit: 'sqmeters'
    });


    /* 土壤分布图例 */
    htmlLegend1 = L.control.htmllegend({
        position: 'bottomright',
        legends: [{
            name: '土壤类型',
            layer: LAYER_ENVFUNCZONE,
            elements: [{
                label: '红壤性土',
                html: '',
                style: {
                    'background-color': '#FF0000',
                    'width': '15px',
                    'height': '15px'
                }
            }, {
                label: '水稻土',
                html: '',
                style: {
                    'background-color': '#F7F8AD',
                    'width': '15px',
                    'height': '15px'
                }
            }, {
                label: '岩石土',
                html: '',
                style: {
                    'background': '#000 url(../img/legend1.png) no-repeat',
                    'width': '15px',
                    'height': '15px'
                }
            }, {
                label: '粗骨石质土',
                html: '',
                style: {
                    'background': '#000 url(../img/legend2.png) no-repeat',
                    'width': '15px',
                    'height': '15px'
                }
            }, {
                label: '淹渗型水稻土',
                html: '',
                style: {
                    'background-color': '#7FE499',
                    'width': '15px',
                    'height': '15px'
                }
            }, {
                label: '黄红壤',
                html: '',
                style: {
                    'background-color': '#F89E80',
                    'width': '15px',
                    'height': '15px'
                }
            }]
        }],
        collapseSimple: true,
        detectStretched: true,
        defaultOpacity: 0.6,
        visibleIcon: 'icon icon-eye',
        hiddenIcon: 'icon icon-eye-slash'
    });

    /* 河湖水系图例 */
    htmlLegend2 = L.control.htmllegend({
        position: 'bottomright',
        legends: [{
            name: '河湖水系分布',
            layer: LAYER_DRINKINGWATERSOURCE,
            elements: [ {
                label: '水域分布',
                html: '',
                style: {
                    'background': '#fff url(../img/legend5.png) no-repeat',
                    'width': '15px',
                    'height': '15px'
                }
            }]
        }],
        collapseSimple: true,
        detectStretched: true,
        defaultOpacity: 1,
        visibleIcon: 'icon icon-eye',
        hiddenIcon: 'icon icon-eye-slash'
    });

    /* 内涝分布范围图例 */
    htmlLegend3 = L.control.htmllegend({
        position: 'bottomright',
        legends: [{
            name: '内涝分布范围',
            layer: LAYER_ECOREDLINE,
            elements: [{
                label: '内涝分布',
                html: '',
                style: {
                    'background-color': '#F89E80',
                    'width': '15px',
                    'height': '15px'
                }
            }]
        }],
        collapseSimple: true,
        detectStretched: true,
        defaultOpacity: 0.6,
        visibleIcon: 'icon icon-eye',
        hiddenIcon: 'icon icon-eye-slash'
    });

    /* 三线一单图例 */
    htmlLegendSxyd = L.control.htmllegend({
        position: 'bottomright',
        legends: [{
            name: '土地利用类型',
            layer: LAYER_SXYD,
            elements: [{
                label: '工业用地',
                html: '',
                style: {
                    'background-color': '#FF0000',
                    'width': '15px',
                    'height': '15px'
                }
            }, {
                label: '居民区',
                html: '',
                style: {
                    'background-color': '#FF7F7F',
                    'width': '15px',
                    'height': '15px'
                }
            }, {
                label: '水域',
                html: '',
                style: {
                    'background-color': '#D0E4FD',
                    'width': '15px',
                    'height': '15px'
                }
            }, {
                label: '草地',
                html: '',
                style: {
                    'background-color': '#FFFF00',
                    'width': '15px',
                    'height': '15px'
                }
            }, {
                label: '林地',
                html: '',
                style: {
                    'background-color': '#38A800',
                    'width': '15px',
                    'height': '15px'
                }
            }]
        }],
        collapseSimple: true,
        detectStretched: true,
        defaultOpacity: 0.6,
        visibleIcon: 'icon icon-eye',
        hiddenIcon: 'icon icon-eye-slash'
    });



    /* 图例 */
    htmlLegendWater = L.control.htmllegend({
        position: 'bottomright',
        legends: [{
            name: '海拔',
            layer: LAYER_DEMTOPP,
            elements: [{
                label: '>1000',
                html: '',
                style: {
                    'background-color': '#EC1B24',
                    'width': '15px',
                    'height': '15px'
                }
            }, {
                label: '800-1000',
                html: '',
                style: {
                    'background-color': '#FF7F7F',
                    'width': '15px',
                    'height': '15px'
                }
            }, {
                label: '600-800',
                html: '',
                style: {
                    'background-color': '#DE9E66',
                    'width': '15px',
                    'height': '15px'
                }
            }, {
                label: '400-600',
                html: '',
                style: {
                    'background-color': '#E69800',
                    'width': '15px',
                    'height': '15px'
                }
            }, {
                label: '200-400',
                html: '',
                style: {
                    'background-color': '#FFFF00',
                    'width': '15px',
                    'height': '15px'
                }
            }, {
                label: '<200',
                html: '',
                style: {
                    'background-color': '#FFFFBE',
                    'width': '15px',
                    'height': '15px'
                }
            }]
        }],
        collapseSimple: true,
        detectStretched: true,
        defaultOpacity: 0.6,
        visibleIcon: 'icon icon-eye',
        hiddenIcon: 'icon icon-eye-slash'
    });



    /* 在地图上任意点击则清空所有Marker */
    normal_click = function(e) {
        if (map.hasLayer(queryLocationMarker)) {
            map.removeLayer(queryLocationMarker);
        }
        highlightLayer.clearLayers();
    };

    /* 在地图上任意双击则按经纬度查询POI */
    double_click = function (e) {
        $.get(WEB_PATH + "/geocode/regeo?lat=" + e.latlng.lat + "&lon=" + e.latlng.lng, function(data) {
            if (data.ok) {
                if (map.hasLayer(queryLocationMarker)) {
                    map.removeLayer(queryLocationMarker);
                }
                queryLocationMarker = L.marker(e.latlng).addTo(map);
                queryLocationMarker.bindPopup(data.data).openPopup();
            } else {
                alert(data.msg);
            }

        });
    };

    /* 在地图上任意移动鼠标显示当前经纬度 */
    map_mousemove = function (e) {
        $('#latlon_info').text("经纬度：" + e.latlng.lat.toFixed(5) + "°N, " + e.latlng.lng.toFixed(5) + "°E");
    };

    /* 点击鼠标添加书签 */
    addbookmark_click = function(e) {
        //记录日志
        $.get(WEB_PATH + "/log/add?source=web&op=添加书签",function(){});

        if (map.hasLayer(queryLocationMarker)) {
            map.removeLayer(queryLocationMarker);
        }
        queryLocationMarker = L.marker(e.latlng).addTo(map);
        queryLocationMarker.bindPopup(POPUP_ADD_BOOKMARK).openPopup();
        map.off("click");
        map.on("click", normal_click);
        map.getContainer().style.cursor = "";
        $('#add-bookmark').click(function() {
            if ($('#bm_title').val() == "") {
                alert("书签标题不能为空！");
                return;
            }
            $.get(WEB_PATH + "/bookmark/add?title=" + $('#bm_title').val() + "&content=" + $('#bm_content').val() + "&lat=" + e.latlng.lat + "&lon=" + e.latlng.lng, function(data) {
                if (data.ok) {
                    alert("添加成功");

                    $("#jsGrid").jsGrid("insertItem", data.data).done(function() {
                        $("#jsGrid").jsGrid("refresh");
                    });
                } else {
                    alert("添加失败");
                }
            });
        });
        queryLocationMarker.on("popupclose", function() {
            map.removeLayer(queryLocationMarker);
        });
    };

    /* 以聚合方式加载所有人口 */
    $.get(WEB_PATH + "/ent/querylite?region=" + REGION_CODE_NAME[authority], function(data) {
        layergroup_ent = L.markerClusterGroup({showCoverageOnHover:false});
        var options_ent = {
            icon: 'building',
            borderColor: '#169eff',
            textColor: '#169eff',
            innerIconAnchor: [0,0]
        };
        for (var i = 0; i < data.length; i++) {
            var lon = data[i].lon;
            var lat = data[i].lat;
            layergroup_ent.addLayer(L.marker([lat, lon], {
                icon: L.BeautifyIcon.icon(options_ent)
            }).bindPopup("<p style='font-weight: bold;'>" + data[i].name + "</p><p>地址：" + data[i].address + "</p>"
                + "<p><button class='view-detail-ent' id='view-detail-ent' onclick=showEntInfo('" + data[i].creditCode +"')>查看详细</button></p>"));

        }

    });

    // 加载所有灾害事件
    $.get(WEB_PATH + "/wts/query?region=" + REGION_CODE_NAME[authority], function(data) {
        layergroup_wts = L.layerGroup([]);
        var options_wts = {
            icon: 'trash-restore',
            borderColor: '#42a7a3',
            textColor: '#42a7a3',
            innerIconAnchor: [0,0]
        };
        for (var i = 0; i < data.length; i++) {
            var lon = data[i].lon;
            var lat = data[i].lat;
            var popup_content = "<p style='font-weight: bold;'>" + data[i].name + "</p><p>工艺：" + data[i].treatment + "</p>"
                + "<p><button class='view-detail-wts' id='view-detail-wts' onclick='showWtsInfo(" + '\"' + data[i].id + '\"' + ")'>查看详细</button></p>";
            L.marker([lat, lon], {
                icon: L.BeautifyIcon.icon(options_wts)
            }).addTo(layergroup_wts).bindPopup(popup_content);
        }
    });

}
