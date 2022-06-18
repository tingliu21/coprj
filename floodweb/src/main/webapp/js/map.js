$(document).ready(function () {
    initVar();

    var mapParams = getMapParams();
    map = L.map('map', {
        attributionControl: false,
        center: mapParams.center,
        zoom: mapParams.zoom,
		minZoom: mapParams.minZoom,
		//maxBounds: L.latLngBounds(L.latLng(27,119), L.latLng(30, 123)),
        doubleClickZoom: false,
        zoomControl: false,
        contextmenu: false
    });
    map.getContainer().style.cursor = "default";

    /* 高亮图层 */
    highlightLayer = L.geoJSON([],{style: highlightStyle}).addTo(map);
    // L.control.groupedLayers(baseLayers, groupedOverlays).addTo(map);
	/* 默认加载影像底图 */
    satellite.addTo(map);
    //LAYER_TZBOUNDARY.addTo(map);

	// $.get(getMaskLayer(), function(data) {
	// 	LAYER_MASK = L.geoJSON(data,{
	// 		style: function (feature) {
	// 			return {color: '#fff', fillOpacity:0.8, stroke:false};
	// 		}});
	// 	map.addLayer(LAYER_MASK);
	// });

    /* 放大缩小按钮控件 */
    L.control.zoom({position:"topright"}).addTo(map);
    // map.addControl(sidebar_bookmark);
    // map.addControl(sidebar_layer);

	/* 测量控件 */
    measureControl.addTo(map);
    map.on("measurestart", function(){
    	$.get(WEB_PATH + "/log/add?source=web&op=测量",function(){});
    });

    map.on("mousemove", map_mousemove);
    map.on("dblclick", double_click);
    map.on("click", normal_click);
    map.on("movestart", function() {map.getContainer().style.cursor = "";});
    map.on("moveend", function() {map.getContainer().style.cursor = "default";});

    /* 图例控件 */
    map.addControl(htmlLegend1);
    map.addControl(htmlLegend2);
    map.addControl(htmlLegend3);
    map.addControl(htmlLegendSxyd);
    map.addControl(htmlLegendWater);
    // map.addControl(htmlLegendEco);
    // map.addControl(htmlLegendGeneral);

    /* 底图切换 */
    $("input[name='basemap']").click(function(e) {
		switch (e.target.id) {
			case 'image-map':
				map.addLayer(baseLayers.satellite);
				map.removeLayer(baseLayers.normal);
				break;
			case 'vector-map':
				map.addLayer(baseLayers.normal);
				map.removeLayer(baseLayers.satellite);
				break;
		}
	});

    /* 业务图层切换 */
    $(".operation-overlay").click(function (e) {
		toggleOperationOverlay(e.target.id);
	});

    /* 人口聚合图层切换 */
	$("#cb-ent").click(function (e) {
		toggleEntOverlay(e.target);
	});


	/* 显示灾害事件 */
	$("#cb-wts").click(function (e) {
		toggleWtsOverlay(e.target);
	});

	/* 模糊查询 */
    $('#btn-fuzzy-search').click(function() {
    	$.get(WEB_PATH + "/log/add?source=web&op=查询",function(){});
    	var searchText = $('#fuzzy-search-text').val();
    	if (isLonLat(searchText)) {
    		/* 根据经纬度定位 */
    		var lonlat = getLonLat(searchText);
			if (map.hasLayer(queryLocationMarker)) {
				map.removeLayer(queryLocationMarker);
			}
			queryLocationMarker = L.marker(L.latLng(lonlat[1], lonlat[0])).addTo(map);
			map.panTo(L.latLng(lonlat[1], lonlat[0]));
    		// $.get(WEB_PATH + "/geocode/regeo?lat=" + lonlat[1] + "&lon=" + lonlat[0], function(data) {
    		// 	if (data.ok) {
    		// 		if (map.hasLayer(queryLocationMarker)) {
    	    //     		map.removeLayer(queryLocationMarker);
    	    //         }
    	    //         queryLocationMarker = L.marker(L.latLng(lonlat[1], lonlat[0])).addTo(map);
    	    //         queryLocationMarker.bindPopup(data.data).openPopup();
    	    //         map.panTo(L.latLng(lonlat[1], lonlat[0]));
    		// 	} else {
    		// 		alert(data.msg);
    		// 	}
	        //
    		// });
    	} else {
    		/* 根据地址查经纬度 */
    		$.get(WEB_PATH + "/geocode/geo?address=" + searchText, function(data) {
    			if (data.ok) {
    				if (map.hasLayer(queryLocationMarker)) {
    	        		map.removeLayer(queryLocationMarker);
    	            }
    	            queryLocationMarker = L.marker(L.latLng(data.data.lat, data.data.lon)).addTo(map);
    	            queryLocationMarker.bindPopup($('#fuzzy-search-text').val() + "<br>" + data.data.lat + ", " + data.data.lon).openPopup();
    	            map.panTo(L.latLng(data.data.lat, data.data.lon));
    			} else {
    				alert(data.msg);
    			}
    		});
    	}
    });

	/**
	 * 灾害事件查询
	 */
	$('#btn-search-ent').click(function () {
		$("#jsGrid-ent").jsGrid("search", {
			name: $('#txt-search-ent').val(),
			region: REGION_CODE_NAME[authority]
		});
	});
	/**
	 灾害事件查询结果列表
	 */
	$("#jsGrid-ent").jsGrid({
		width: "100%",
		height: "300px",

		controller: {
			loadData: function(filter) {
				return $.ajax({
					type: "GET",
					url: WEB_PATH + "/wts/query",
					data: filter
				});
			},
			insertItem: $.noop,
			updateItem: $.noop,
			deleteItem: $.noop
		},
		autoload: false,
		inserting: false,
		editing: false,
		sorting: false,
		paging: true,
		pagerFormat: "{prev} {pages} {next}    {pageIndex} of {pageCount}",
		pagePrevText: "上一页",
		pageNextText: "下一页",
		pageFirstText: "第一页",
		pageButtonCount: 5,
		fields: [
			{ name: "name", title: "灾害事件", type: "text", validate: "required" }
		],
		rowClick: function(args) {
			if (map.hasLayer(queryLocationMarker)) {
				map.removeLayer(queryLocationMarker);
			}
			queryLocationMarker = L.marker(L.latLng(args.item.lat, args.item.lon), {
				draggable: true,
				autoPan: true
			}).addTo(map);
			var popupContent = makeSourcePopupContent(args.item, queryLocationMarker.getLatLng());
			queryLocationMarker.bindPopup(popupContent).openPopup();
			queryLocationMarker.on('moveend', function(evt) {
				var popupContent = makeSourcePopupContent(args.item, queryLocationMarker.getLatLng());
				queryLocationMarker.setPopupContent(popupContent).openPopup();
			});
			map.panTo(L.latLng(args.item.lat, args.item.lon));
		}
	});


	/*
     ***************** 书签按钮 *****************/
    // $('#btn-view-bookmark').click(function() {
    //     sidebar_bookmark.toggle();
    // });
    $('#btn-add-bookmark').click(function() {
    	map.getContainer().style.cursor = "crosshair";
    	map.on("click", addbookmark_click);
    });

	/*
     ********************  书签列表 **************/
    $("#jsGrid").jsGrid({
        width: "100%",
        height: "500px",
        
        controller: {
            loadData: function() {
            	return ($.get("/bookmark/query", function(data) {
            		
            	}));
            },
            insertItem: $.noop,
            updateItem: $.noop,
            deleteItem: $.noop
        },
        autoload: true,
        inserting: false,
        editing: true,
        sorting: true,
        paging: true,
        deleteConfirm: "确定要删除?",
        pagerFormat: "页码: {first} {prev} {pages} {next} {last}    {pageIndex} of {pageCount}",
        pagePrevText: "上一页",
        pageNextText: "下一页",
        pageFirstText: "第一页",
        pageLastText: "最后页",


        fields: [
            { name: "title", title: "标题", type: "text", width: 130, validate: "required" },
            { name: "content", title: "内容", type: "text", width: 200 },
            { type: "control",  modeSwitchButton: false }
        ],
        
        onItemDeleted: function(args) {
        		var item = args.item;
        		$.get(WEB_PATH + "/bookmark/delete?bm_id=" + item.id, function() {
        			
        		});
        },
        onItemUpdated: function(args) {
        		var item = args.item;
        		$.post(WEB_PATH + "/bookmark/update", item, function() {
        			
        		});
        },
        rowClick: function(args) {
        	if (map.hasLayer(queryLocationMarker)) {
	        	map.removeLayer(queryLocationMarker);
	        }
	        queryLocationMarker = L.marker(L.latLng(args.item.lat, args.item.lon)).addTo(map);
	        var popupContent = "标题"
	        queryLocationMarker.bindPopup(args.item.content).openPopup();
	        map.panTo(L.latLng(args.item.lat, args.item.lon));
        }
    }); /* *** 书签列表结束 ********/

    /*
     * sidebar设置
     */
    sidebar = L.control.sidebar({
        autopan: false,       // whether to maintain the centered map point when opening the sidebar
        closeButton: true,    // whether t add a close button to the panes
        container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
        position: 'left',     // left or right
    }).addTo(map);

    /*
     * 搜索设置
     */
    $('#btn-fuzzy-search-setting').click(function() {
    	$('#settingModal').modal('show');
    });
    $('#btn-lonlat-degree-submit').click(function() {
    	$('#settingModal').modal('hide');
    	$('#fuzzy-search-text').val($('#lonlat-degree-lon').val() + "," + $('#lonlat-degree-lat').val());
    });
    $('#btn-lonlat-dm-submit').click(function() {
    	if ($('#lonlat-dm-lon-degree').val() == "" || $("#lonlat-dm-lon-min").val() == "" || $('#lonlat-dm-lat-degree').val() == "" || $('#lonlat-dm-lat-min').val() == "") {
    		alert("输入不可为空");
    		return;
    	}
    	$('#settingModal').modal('hide');
    	$('#fuzzy-search-text').val(dms2num($('#lonlat-dm-lon-degree').val(), $("#lonlat-dm-lon-min").val(), 0) + "," + dms2num($('#lonlat-dm-lat-degree').val(), $('#lonlat-dm-lat-min').val(), 0));
    });
    $('#btn-lonlat-dms-submit').click(function() {
    	if ($('#lonlat-dms-lon-degree').val() == "" 
    			|| $("#lonlat-dms-lon-min").val() == "" 
    			|| $("#lonlat-dms-lon-sec").val() == "" 
    			|| $('#lonlat-dms-lat-degree').val() == "" 
    			|| $('#lonlat-dms-lat-min').val() == ""
    			|| $("#lonlat-dms-lat-sec").val() == "" ) {
    		alert("输入不可为空");
    		return;
    	}
    	$('#settingModal').modal('hide');
    	$('#fuzzy-search-text').val(
    			dms2num($('#lonlat-dms-lon-degree').val(), $("#lonlat-dms-lon-min").val(), $("#lonlat-dms-lon-sec").val()) + "," + 
    			dms2num($('#lonlat-dms-lat-degree').val(), $('#lonlat-dms-lat-min').val(), $("#lonlat-dms-lat-sec").val()));
    });

    /* 显示核密度图 */
	$('input:radio[name="heatmap-radio"]').change(function () {
		$.get(WEB_PATH + "/heatmap/" + $("input:radio[name='heatmap-radio']:checked").val() + "?region=" + REGION_CODE_NAME[authority], function(data) {
			heatmapLayer.setData({
				max: Number($("input:radio[name='heatmap-radio']:checked").attr('extra')),
				data: data
			});
			if (!map.hasLayer(heatmapLayer)) {
				map.addLayer(heatmapLayer);
			}
		});
		LAYER_TZBOUNDARY.setOpacity(0);
	});

	/* 清除所有核密度图 */
	$('#btn-heatmap-clear').click(function () {
		if (map.hasLayer(heatmapLayer)) {
			map.removeLayer(heatmapLayer);
		}
		$("input[name='heatmap-radio']:checked").prop('checked', false);
		LAYER_TZBOUNDARY.setOpacity(1);
	});

});
/* end of document ready */


/**
 * 将度分秒转换为十进制度
 * @param d 度
 * @param m 分
 * @param s 秒
 * @returns
 */
function dms2num(d, m, s) {
	return Number(d) + Number(m) / 60.0 + Number(s) / 3600.0;
}

/**
 * 判断输入是否是经纬度
 * @param searchText
 * @returns
 */
function isLonLat(searchText) {
	var lonlat = searchText.split(",");
	if (lonlat.length == 2) {
		var strlon = lonlat[0].trim();
		var strlat = lonlat[1].trim();
		if (isNaN(parseFloat(strlon))) {
			return false;
		}
		if (isNaN(parseFloat(strlat))) {
			return false;
		}
		return true;
	} else {
		return false;
	}
}

function getLonLat(searchText) {
	var reLonlat = new Array();
	var lonlat = searchText.split(",");
    if (lonlat.length == 2) {
    	var strlon = lonlat[0].trim();
		var strlat = lonlat[1].trim();
            var lon = parseFloat(strlon);
            var lat = parseFloat(strlat);
            reLonlat.push(lon);
            reLonlat.push(lat);
            return reLonlat;
    } else {
        return null;
    }
}

/**
 * 查询土壤数据信息
 * @param e
 * @returns
 */
function identifyEnvFuncZone(e) {
	$.get(WEB_PATH + "/log/add?source=web&op=查询土壤数据",function(){});
	$.get(WEB_PATH + "/map/query?layer=1&region=" + REGION_CODE_NAME[authority] + "&lat=" + e.latlng.lat + "&lon=" + e.latlng.lng, function(data) {
		if (data.ok) {
			// 高亮
			highlightLayer.clearLayers();
			var jdata = JSON.parse(data.data);
			highlightLayer.addData(jdata);
			
			// 显示气泡
			if (map.hasLayer(queryLocationMarker)) {
	            map.removeLayer(queryLocationMarker);
	        }
	        queryLocationMarker = L.marker(e.latlng).addTo(map);
	        
	        // 显示查询结果
	        var content;
	        if (jdata.features.length == 0) {
	        	content = "该处无结果";
	        } else {
	        	content = "<p>编号：" + jdata.features[0].properties.编号 + "</p><p>名称：" + jdata.features[0].properties.名称 + "</p>"
        				+ "<p>功能区类型：" + jdata.features[0].properties.功能区类型 + "</p>"
        				+ "<p><button class='view-detail-env' id='view-detail-env' data='" + JSON.stringify(jdata.features[0].properties) + "'>查看详细</button></p>";
	        }
	        queryLocationMarker.bindPopup(content).openPopup();
	        
	        $('.view-detail-env').click(function() {
	        	var info = JSON.parse($(this).attr('data'));
	        	$('#info-env-id').html(info.编号);
	        	$('#info-env-name').html(info.名称);
	        	$('#info-env-number').html(info.土壤区序号);
	        	$('#info-env-type').html(info.土壤类型);
	        	$('#info-env-district').html(info.行政区);
	        	$('#envFuncZoneInfoModal').modal('show');
	        });
		} else {
			alert(data.msg)
		}
		
	});
}

/**
 * 查询河湖水系分布信息
 * @param e
 * @returns
 */
function identifyDringkingWaterSource(e) {
	$.get(WEB_PATH + "/log/add?source=web&op=查询河湖水系分布",function(){});
	$.get(WEB_PATH + "/map/query?layer=2&region=" + REGION_CODE_NAME[authority] + "&lat=" + e.latlng.lat + "&lon=" + e.latlng.lng, function(data) {
		if (data.ok) {
			// 高亮
			highlightLayer.clearLayers();
			var jdata = JSON.parse(data.data);
			highlightLayer.addData(jdata);
			
			// 显示气泡
			if (map.hasLayer(queryLocationMarker)) {
	            map.removeLayer(queryLocationMarker);
	        }
	        queryLocationMarker = L.marker(e.latlng).addTo(map);
	        
	        // 显示查询结果
	        var content;
	        if (jdata.features.length == 0) {
	        	content = "该处无结果";
	        } else {
	        	content = "<p>水源地名称：" + jdata.features[0].properties.水源地名称 + "</p><p>功能名称：" + jdata.features[0].properties.功能名称 + "</p>"
        				+ "<p>行政区划：" + jdata.features[0].properties.行政区划 + "</p>"
        				+ "<p><button class='view-detail-water' data='" + JSON.stringify(jdata.features[0].properties) + "'>查看详细</button></p>";
	        }
	        queryLocationMarker.bindPopup(content).openPopup();
	        
	        $('.view-detail-water').click(function() {
	        	var info = JSON.parse($(this).attr('data'));
	        	$('#info-water-name').html(info.水源地名称);
	        	$('#info-water-func').html(info.功能名称);
	        	$('#info-water-district').html(info.行政区划);
	        	$('#info-water-type').html(info.功能类型);
	        	$('#info-water-measure').html(info.管控措施);
	        	$('#drinkingWaterSourceInfoModal').modal('show');
	        });
		} else {
			alert(data.msg)
		}
		
	});
}

/**
 * 查询内涝分布信息
 * @param e
 * @returns
 */
function identifyEcoRedLine(e) {
	$.get(WEB_PATH + "/log/add?source=web&op=查询内涝分布",function(){});
	$.get(WEB_PATH + "/map/query?layer=3&region="+ REGION_CODE_NAME[authority] + "&lat=" + e.latlng.lat + "&lon=" + e.latlng.lng, function(data) {
		if (data.ok) {
			// 高亮
			highlightLayer.clearLayers();
			var jdata = JSON.parse(data.data);
			highlightLayer.addData(jdata);

			// 显示气泡
			if (map.hasLayer(queryLocationMarker)) {
	            map.removeLayer(queryLocationMarker);
	        }
	        queryLocationMarker = L.marker(e.latlng).addTo(map);
	        
	        // 显示查询结果
	        var content;
	        if (jdata.features.length == 0) {
	        	content = "该处无结果";
	        } else {
	        	content = "<p>编号：" + jdata.features[0].properties.XQBH + "</p><p>名称：" + jdata.features[0].properties.XQMC + "</p>"
        				+ "<p>类型：" + jdata.features[0].properties.类型 + "</p><p>行政区：" + jdata.features[0].properties.行政区 + "</p>";
	        }
	        queryLocationMarker.bindPopup(content).openPopup();
		} else {
			alert(data.msg)
		}
		
	});
}

/**
 * 查询土地利用
 * @param e
 * @returns
 */
function identifySxyd(e) {
	$.get(WEB_PATH + "/log/add?source=web&op=查询土地利用",function(){});
	$.get(WEB_PATH + "/map/query?region=" + REGION_CODE_NAME[authority] + "&layer=4&lat=" + e.latlng.lat + "&lon=" + e.latlng.lng, function(data) {
		if (data.ok) {
			// 高亮
			highlightLayer.clearLayers();
			var jdata = JSON.parse(data.data);
			highlightLayer.addData(jdata);

			// 显示气泡
			if (map.hasLayer(queryLocationMarker)) {
				map.removeLayer(queryLocationMarker);
			}
			queryLocationMarker = L.marker(e.latlng).addTo(map);

			// 显示查询结果
			var content;
			if (jdata.features.length == 0) {
				content = "该处无结果";
			} else {
				content = "<p>编号：" + jdata.features[0].properties.HJGKDYBM + "</p><p>名称：" + jdata.features[0].properties.HJGKDYMC + "</p>"
					+ "<p>行政区：" + jdata.features[0].properties.COUNTY + "</p><p>类型：" + jdata.features[0].properties.REMARKS + "</p>";
			}
			queryLocationMarker.bindPopup(content).openPopup();
		} else {
			alert(data.msg)
		}

	});
}


/**
 * 切换业务图层
 * @param overlay 业务图层名
 */
function toggleOperationOverlay(overlay) {
	if ($('#' + overlay).prop('checked')) {
		map.addLayer(operationOverlays[overlay]);
	} else {
		map.removeLayer(operationOverlays[overlay]);
	}
}

function toggleEntOverlay(checkbox) {
	if (checkbox.checked) {
		layergroup_ent.addTo(map);
	} else {
		layergroup_ent.remove();
	}
}


/**
 * 灾害事件
 * @param checkbox
 */
function toggleWtsOverlay(checkbox) {
	if (checkbox.checked) {
		layergroup_wts.addTo(map);
	} else {
		layergroup_wts.remove();
	}
}

/**
 * 显示人口分布对话框
 * @param id
 */
function showEntInfo(id) {
	$.get(WEB_PATH + "/ent/fetch?id=" + id, function (data) {
		$('#info-ent-name').text(data.name);
		$('#info-ent-county').text(data.county);
		$('#info-ent-street').text(data.street == undefined ? "" : data.street);
		$('#info-ent-address').text(data.address);

		$('#info-ent-procedure').text(data.procedure);

		$('#info-ent-manage-type').text(data.manageType);
	});
	$('#entInfoModal').modal('show');
}



/**
 * 显示灾害事件详情对话框
 * @param id
 */
function showWtsInfo(id) {
	$.get(WEB_PATH + "/wts/fetch?id=" + id, function (data) {
		$('#info-wts-name').text(data.name);
		$('#info-wts-region').text(data.region);
		$('#info-wts-addr').text(data.addr);
		$('#info-wts-start-time').text(data.startTimeYear + (data.startTimeMonth == 0 ? "" : "-" + data.startTimeMonth));
		$('#info-wts-reform').text(data.reform);
		$('#info-wts-lon').text(data.lon);
		$('#info-wts-lat').text(data.lat);
		$('#info-wts-daily-capacity').text(data.dailyCapacity);
		$('#info-wts-treatment').text(data.treatment);
	});
	$('#wtsInfoModal').modal('show');
}


/**
 * 修改位置
 * @param lat
 * @param lng
 */
function modifyLocation(lat, lng) {
	if(confirm('位置修改不可撤销，确定要改为当前位置吗？')){
		alert("位置已修改为: " + Number(lat).toFixed(6) + ", " + Number(lng).toFixed(6));
	}else{
		return;
	}
}