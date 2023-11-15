$(document).ready(function () {
    initVar();

    var mapParams = getMapParams();
    map = L.map('map', {
        attributionControl: false,
        center: mapParams.center,
        zoom: mapParams.zoom,
		//maxBounds: L.latLngBounds(L.latLng(27,119), L.latLng(30, 123)),
        doubleClickZoom: false,
        zoomControl: false,
        contextmenu: false
    });
    map.getContainer().style.cursor = "default";

	/* 默认加载影像底图 */
    satellite.addTo(map);

    /* 放大缩小按钮控件 */
    L.control.zoom({position:"topright"}).addTo(map);

    map.on("mousemove", map_mousemove);
    map.on("dblclick", double_click);

    /* 图例控件 */
    map.addControl(htmlLegend_risk);
    map.addControl(htmlLegend_soil);
    map.addControl(htmlLegend_landuse);
	map.addControl(htmlLegend_water);
	map.addControl(htmlLegend_flood);
	map.addControl(htmlLegend_pop);

	chartline = echarts.init(document.getElementById('risk-chart'));

    /* 底图切换 */
    $("input[name='basemap']").click(function(e) {
		switch (e.target.id) {
			case 'image-map':
				map.addLayer(baseLayers.satellite);
				map.removeLayer(baseLayers.normal);
				map.removeLayer(baseLayers.terrain);
				break;
			case 'vector-map':
				map.addLayer(baseLayers.normal);
				map.removeLayer(baseLayers.satellite);
				map.removeLayer(baseLayers.terrain);
				break;
			case 'terrain-map':
				map.addLayer(baseLayers.terrain);
				map.removeLayer(baseLayers.satellite);
				map.removeLayer(baseLayers.normal);
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
	/* 手机号风险查询 */
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

			let offset = 0.00001;
			let minx = lonlat[0] - offset;
			let miny = lonlat[1] - offset;
			let maxx = lonlat[0] + offset;
			let maxy = lonlat[1] + offset;
			//getRasterValue(minx, miny, maxx, maxy);

			$.get(WEB_PATH + "/map/queryInfo?lat=" + lonlat[1] + "&lon=" + lonlat[0], function(data) {
				if (data.ok) {
					if (map.hasLayer(queryLocationMarker)) {
						map.removeLayer(queryLocationMarker);
					}
					queryLocationMarker = L.marker(L.latLng(lonlat[1], lonlat[0])).addTo(map);
					queryLocationMarker.bindPopup("<p>常住地淹没风险："+data.data+"</p>").openPopup();
					map.panTo(L.latLng(lonlat[1], lonlat[0]));
				} else {
					alert(data.msg);
				}

			});
		} else {
			/* 根据地址查经纬度 */
			/* 修改日期：2022-8-30 暂时隐去，后续根据手机号查询经纬度
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
            });*/
		}
	});
    /*
     * sidebar设置
     */
    sidebar = L.control.sidebar({
        autopan: false,       // whether to maintain the centered map point when opening the sidebar
        closeButton: true,    // whether t add a close button to the panes
        container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
        position: 'left',     // left or right
    }).addTo(map);

	/**
	 *  处理时间轴
	 **/
	$(".timeline").hide() // 时间轴默认隐藏
	timeList = setTimeList(new Date()) //默认为当天日期及其前三天后三天

	var timeAxioParam = {  //时间轴控件参数
		data: timeList,
		id: 'cxTime',
		width: '80px',
		index: 3
	}
	// 时间轴控件
	// var oTimeAxiosFun = new oTimeAxios(timeAxioParam, function () {  });
	var oTimeAxiosFun;
	// $('#btnPlay').hide();

	// 处理自动播放时间轴
	var isPlay = false; //标识是否正在播放
	var interv; //interval
	$('#btnPlay').click(function () {
		if (isPlay) {
			window.clearInterval(interv);
			$('#btnPlay').text('▶')
		} else {
			$('#btnPlay').text('■')
			interv = setInterval(function () {
				oTimeAxiosFun.timeAxisMove(1)
			}, 5000) //每隔5秒跳到下一日，可修改
		}
		isPlay = !isPlay;
	})

	$('#sandbox-container .input-group.date').datepicker({
		language: "zh-CN",
		autoclose: true,
		todayBtn: "linked",
	});
	$('#sandbox-container2 .input-group.date').datepicker({
		language: "zh-CN",
		autoclose: true,
		todayBtn: "linked",
	});



	// 查询灾害风险图
	$('#btn-risk-search').click(function () {
		if ($('#risk-date').val() != "") {
			$(".timeline").show()

			let d = new Date($('#risk-date').val()); //用户填写的日期
			timeList = setTimeList(d) //得到连续7天的日期
			timeAxioParam.data = timeList //设置时间轴
			oTimeAxiosFun = new oTimeAxios(timeAxioParam, function () { changeDataTimeAxios(this) });
			// $('#btnPlay').show();
		}

	})
	//重置查询灾害风险图
	$('#btn-risk-reset').click(function () {
		$(".timeline").hide()
		$('#risk-date').val("")
		if (LAYER_RISK != undefined && map.hasLayer(LAYER_RISK)) {
			map.removeLayer(LAYER_RISK)
		}
	})

	//设置当前城市
	$('#current_region').click(function (){
		$('#setRegionModal').modal('show')
	})

	//查询风险
	$('#risk-query-date').change(function () {
		let lon = $('#risk-query-lon').text()
		let lat = $('#risk-query-lat').text()
		let date = $('#risk-query-date').val()
		$.get("rainflood/queryLocinundation?qdate=" + date + "&num=15&clat=" + lat + "&clon=" + lon, function(data) {
			if (data.ok) {
				generateRiskChart(data.data)
			} else {
				alert(data.msg);
			}

		});
	})
});
/* end of document ready */

/**
 * 处理时间轴日期切换后更换数据
 * @param e
 */
function changeDataTimeAxios(e) {
	let d = new Date($('#risk-date').val().split("-")[0] + "-" + timeList[e.options.index].time)
	LAYER_RISK = L.tileLayer.wms(GEOSERVER_PATH, {
					layers: "inun_"+formatDate2(d),
					 format: 'image/png',
					transparent: true,
					KeepBuffer:10,
					tileSize:2048
				});
	if (LAYER_RISK != undefined && map.hasLayer(LAYER_RISK)) {
		map.removeLayer(LAYER_RISK)
	}

	map.addLayer(LAYER_RISK)
}

/**
 * 设置时间轴的时间列表，返回包括输入日期及其前三天后三天
 * @param midDate 输入日期
 * @returns {[{name: string, time: string},{name: string, time: string},{name: string, time: string},{name: string, time: string},{name: string, time: string},null,null]}
 */
function setTimeList(midDate) {
	let d = new Date();
	return [
		{name: '', time: formatDate3(new Date(d.setTime(midDate.getTime()-3 * 24 * 60 * 60 * 1000)))},
		{name: '', time: formatDate3(new Date(d.setTime(midDate.getTime()-2 * 24 * 60 * 60 * 1000)))},
		{name: '', time: formatDate3(new Date(d.setTime(midDate.getTime()-1 * 24 * 60 * 60 * 1000)))},
		{name: '', time: formatDate3(new Date(d.setTime(midDate.getTime())))},
		{name: '', time: formatDate3(new Date(d.setTime(midDate.getTime()+1 * 24 * 60 * 60 * 1000)))},
		{name: '', time: formatDate3(new Date(d.setTime(midDate.getTime()+2 * 24 * 60 * 60 * 1000)))},
		{name: '', time: formatDate3(new Date(d.setTime(midDate.getTime()+3 * 24 * 60 * 60 * 1000)))}
	]
}
/**
 * 格式化日期
 * @param date
 * @returns {string} 格式化为yyyy-MM-dd
 */
function formatDate(date) {
	let y = date.getFullYear();
	let m = date.getMonth() + 1;
	m = m < 10 ? '0' + m : m;
	let d = date.getDate();
	d = d < 10 ? '0' + d : d;
	return y + '-' + m + '-' + d;
}

/**
 * 格式化日期
 * @param date
 * @returns {string} 格式化为yyyyMMdd
 */
function formatDate2(date) {
	let y = date.getFullYear();
	let m = date.getMonth() + 1;
	m = m < 10 ? '0' + m : m;
	let d = date.getDate();
	d = d < 10 ? '0' + d : d;
	return y + m + d;
}
/**
 * 格式化日期
 * @param date
 * @returns {string} 格式化为MMdd
 */
function formatDate3(date) {
	let m = date.getMonth() + 1;
	m = m < 10 ? '0' + m : m;
	let d = date.getDate();
	d = d < 10 ? '0' + d : d;
	return m + "-" + d;
}

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

/**
 * 读取地图服务的像素值
 * @param minx
 * @param miny
 * @param maxx
 * @param maxy
 */
function getRasterValue(minx, miny, maxx, maxy) {
	let url = GEOSERVER_PATH
		+ "?SERVICE=WMS"
		+ "&VERSION=2.0.0"
		+ "&REQUEST=GetFeatureInfo"
		+ "&FORMAT=" + encodeURIComponent("image/png")
		+ "&TRANSPARENT=true"
		+ "&QUERY_LAYERS=" + encodeURIComponent("sde:inunriver_rcp8p5_0000GFDL-ESM2M_2030_rp00100")
		+ "&LAYERS=" + encodeURIComponent("sde:inunriver_rcp8p5_0000GFDL-ESM2M_2030_rp00100")
		+ "&exceptions=" + encodeURIComponent("application/vnd.ogc.se_inimage")
		+ "&INFO_FORMAT=" + encodeURIComponent("application/json")
		+ "&FEATURE_COUNT=50"
		+ "&X=50"
		+ "&Y=50"
		+ "&SRS=EPSG%3A4326"
		+ "&STYLES="
		+ "&WIDTH=101"
		+ "&HEIGHT=101"
		+ "&BBOX=" + encodeURIComponent(minx + "," + miny + "," + maxx + "," + maxy);
	console.log(url);

	$.getJSON(url, function (data) {
		console.log(data);
	});
}

/**
 * 生成风险图表
 * @param data 风险数据
 */
function generateRiskChart(data) {
	var catalogs=[];
	var values=[];

	for(var i=0;i<data.length;i++){
		catalogs.push(data[i].day);
		values.push(data[i].depth)
	}
	// if(values.length>0){
		chartline.setOption({
			grid:{
				show:false,
				top:'20',    // 一下数值可为百分比也可为具体像素值
				right:'10',
				bottom:'20',
				left:'40'
			},
			tooltip : {
				trigger : 'axis',
				axisPointer : {
					type : 'cross',
					crossStyle : {
						color : '#999'
					}
				}
			},
			xAxis:{
				type : 'category',
				data:catalogs
			},
			yAxis: {
				type: 'value',
				interval : 0.2,
				min : 0,
				max : function(value) {
					return Math.ceil(value.max/0.2)*0.2;
				},
			},
			series:[{
				type:'line',
				label : {
					normal : {
						position : 'top',
						show : true
					}
				},
				name:'风险值',
				data:values
			}]
		});
	// }
}