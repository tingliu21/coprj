<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>长三角地区洪涝灾害风险评估管理系统</title>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
          integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"
          integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ=="
          crossorigin=""/>
    <link href="<%=basePath%>/css/all.css" rel="stylesheet">
    <link rel="stylesheet" href="<%=basePath%>/css/L.Control.HtmlLegend.css" />
<%--    <link rel="stylesheet" href="<%=basePath%>/css/L.Control.Sidebar.css" />--%>

    <link rel="stylesheet" href="<%=basePath%>/css/leaflet.contextmenu.min.css" />
    <link rel="stylesheet" href="<%=basePath%>/css/leaflet-measure.css" />
    <link rel="stylesheet" href="<%=basePath%>/css/leaflet-beautify-marker-icon.css" />
    <link rel="stylesheet" href="<%=basePath%>/css/MarkerCluster.css" />
    <link rel="stylesheet" href="<%=basePath%>/css/MarkerCluster.Default.css" />
    <link rel="stylesheet" href="<%=basePath%>/css/jsgrid.min.css" />
    <link rel="stylesheet" href="<%=basePath%>/css/jsgrid-theme.min.css" />
<%--    <link rel="stylesheet" href="<%=basePath%>/css/leaflet.groupedlayercontrol.min.css" />--%>
<%--    <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid.min.css" />--%>
<%--    <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid-theme.min.css" />--%>
    <link rel="stylesheet" href="<%=basePath%>/css/leaflet-sidebar.css" />
    <link rel="stylesheet" href="<%=basePath%>/css/index.css">

    <script>
        var authority = "<%=session.getAttribute("region") %>";
    </script>
    <script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js"
            integrity="sha512-/Nsx9X4HebavoBvEBuyp3I7od5tA0UzAxs+j83KgC8PU0kgB4XiK4Lfe4y4cgBtaRJQEIFCW+oC506aPT2L1zw=="
            crossorigin=""></script>
    <script src="<%=basePath%>/js/leaflet.ChineseTmsProviders.js"></script>
    <script src="https://unpkg.com/esri-leaflet@2.1.4/dist/esri-leaflet.js"
            integrity="sha512-m+BZ3OSlzGdYLqUBZt3u6eA0sH+Txdmq7cqA1u8/B2aTXviGMMLOfrKyiIW7181jbzZAY0u+3jWoiL61iLcTKQ=="
            crossorigin=""></script>
    <script src="<%=basePath%>/js/L.Control.HtmlLegend.js"></script>
<%--    <script src="<%=basePath%>/js/L.Control.Sidebar.js"></script>--%>
    <script src="<%=basePath%>/js/leaflet-sidebar.min.js"></script>
    <script src="<%=basePath%>/js/leaflet.contextmenu.min.js"></script>
    <script src="<%=basePath%>/js/Leaflet.Control.Custom.js"></script>
    <script src="<%=basePath%>/js/leaflet-measure.js"></script>
    <script src="<%=basePath%>/js/leaflet-beautify-marker-icon.js"></script>
    <script src="<%=basePath%>/js/leaflet.markercluster.js"></script>
    <script src="<%=basePath%>/js/heatmap.min.js"></script>
    <script src="<%=basePath%>/js/leaflet-heatmap.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/echarts@4.2.1/dist/echarts.min.js"></script>
<%--    <script src="<%=basePath%>/js/leaflet.groupedlayercontrol.min.js"></script>--%>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

    <script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script>

    <script src="<%=basePath%>/js/jsgrid.min.js"></script>
<%--    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid.min.js"></script>--%>
    <script type="text/javascript" src="<%=basePath%>/js/map_region.js"></script>
    <script type="text/javascript" src="<%=basePath%>/js/map_var.js"></script>
    <script src="<%=basePath%>/js/map.js"></script>
    <style>
        .fa, .fab, .fad, .fal, .far, .fas {
            line-height: unset;
        }
    </style>


</head>
<body>

<div class="parent">

    <div id="header" class="top">
        <span id="logo"><i class="fas fa-fan"></i></span><span id="title">长三角地区洪涝灾害风险评估管理系统</span>
<%--        <img id="logo" src="<%=basePath%>/img/logo.png">--%>
        <div id="welcome">欢迎您：<%=session.getAttribute("me") %> <a href="<%=basePath%>/user/logout" class="fa fa-sign-out-alt" style="color: white;"></a></div>
    </div>
    <!-- 书签列表 -->
<%--    <div id="sidebar_bookmark">--%>
<%--        <h2>书签列表</h2>--%>
<%--        <div id="jsGrid"></div>--%>
<%--    </div>--%>

<%--    <div id="sidebar_layer">--%>
<%--        <h2>图层</h2>--%>
<%--    </div>--%>

    <!--  侧边栏面板  -->
    <div id="sidebar" class="leaflet-sidebar collapsed">
        <!-- nav tabs -->
        <div class="leaflet-sidebar-tabs">
            <!-- top aligned tabs -->
            <ul role="tablist">
                <li><a href="#home" role="tab"><i class="fas fa-bars"></i></a></li>
                <li><a href="#poi" role="tab"><i class="fas fa-map-marker-alt"></i></a></li>
                <li><a href="#chart" role="tab"><i class="fas fa-chart-bar"></i></a></li>
                <li><a href="#search" role="tab"><i class="fas fa-search-location"></i></a></li>
                <li><a href="#fuzzy-search" role="tab"><i class="fas fa-search"></i></a></li>
            </ul>
        </div>
        <div class="leaflet-sidebar-content">
            <div class="leaflet-sidebar-pane" id="home">
                <h1 class="leaflet-sidebar-header">
                    图层
                    <span class="leaflet-sidebar-close"><i class="fa fa-caret-left"></i></span>
                </h1>
                <div>
                    <p class="sidebar-header2">基础底图</p>
                    <input type="radio" name="basemap" id="image-map" checked><label for="image-map">影像地图</label>
                    <input type="radio" name="basemap" id="vector-map"><label for="vector-map">矢量地图</label>
                </div>
                <div>
                    <p class="sidebar-header2">业务图层</p>
                    <div><input type="checkbox" id="dem" class="operation-overlay"><label>DEM数据</label></div>
                    <div><input type="checkbox" id="sxyd" class="operation-overlay"><label>土地利用数据</label></div>
                    <div><input type="checkbox" id="envfunczone" class="operation-overlay"><label>土壤数据</label></div>
                    <div><input type="checkbox" id="drinkingwatersource" class="operation-overlay"><label>河湖水系分布</label></div>
                    <div><input type="checkbox" id="ecoredline" class="operation-overlay"><label>内涝分布</label></div>
                </div>
            </div>
            <div class="leaflet-sidebar-pane" id="poi">
                <h1 class="leaflet-sidebar-header">
                    人口分布
                    <span class="leaflet-sidebar-close"><i class="fa fa-caret-left"></i></span>
                </h1>
                <div>
                    <p class="sidebar-header2">网格人口</p>
                    <input type="checkbox" id="cb-ent"><label>聚合图</label>
                </div>
                <div>
                    <p class="sidebar-header2">人口密度</p>
                    <div>
                        <div class="radio">
                            <label>
                                <input type="radio" name="heatmap-radio" id="heatmap-location" value="ent" extra="5">
                                人口核密度
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="leaflet-sidebar-pane" id="chart">
                <h1 class="leaflet-sidebar-header">
                    决策分析
                    <span class="leaflet-sidebar-close"><i class="fa fa-caret-left"></i></span>
                </h1>
                <div>
                    <p class="sidebar-header2">内涝预测模型</p>
                    <div>
                        <div class="radio">
                            <label>
                                <input type="radio" name="heatmap-radio" id="heatmap-voc" value="vocs" extra="500">
                                降雨量数据
                            </label>
                        </div>
                    </div>
                    <div><!--<input type="button" id="btn-heatmap-ok" value="确定">--><input type="button" id="btn-heatmap-clear" value="清除"></div>
                </div>
               <%-- <div>
                    <p class="sidebar-header2">内涝灾害影响</p>
                    <div>
                        <div class="radio">
                            <label>
                                <input type="radio" name="bar-radio" id="bar-source" value="source">
                                内涝等级
                            </label>
                        </div>
                        <div class="radio">
                            <label>
                                <input type="radio" name="bar-radio" id="bar-emission" value="emission">
                                受灾人口
                            </label>
                        </div>
                        <div class="radio">
                            <label>
                                <input type="radio" name="heatmap-radio" id="heatmap-dust" value="dust" extra="500">
                                财产损失
                            </label>
                        </div>
                    </div>
                    <div><input type="button" id="btn-bar-clear" value="清除"></div>
                </div>--%>
            </div>
            <div class="leaflet-sidebar-pane" id="search">
                <h1 class="leaflet-sidebar-header">
                    灾情查询
                    <span class="leaflet-sidebar-close"><i class="fa fa-caret-left"></i></span>
                </h1>

                <div class="input-group" style="width: 100%;margin: 10px 0px;">
                    <input id="txt-search-ent" type="text" class="form-control" placeholder="输入名称...">
                    <span class="input-group-btn">
                        <button id="btn-search-ent" class="btn btn-default" type="button">查询</button>
                    </span>
                </div>
                <div id="jsGrid-ent"></div>
            </div>
            <div class="leaflet-sidebar-pane" id="fuzzy-search">
                <h1 class="leaflet-sidebar-header">
                    风险值查询
                    <span class="leaflet-sidebar-close"><i class="fa fa-caret-left"></i></span>
                </h1>
                <div class="input-group" style="width: 100%;margin: 10px 0px;">
                    <!-- 模糊搜索框 -->
                        <input id="fuzzy-search-text" type="text" class="form-control" placeholder="输入地址或经纬度...">
                        <span class="input-group-btn">
                            <button id="btn-fuzzy-search" class="btn btn-primary" type="button">查询</button>
                            <button id="btn-fuzzy-search-setting" class="btn btn-default" type="button">
                                <span class="fa fa-cog"></span>
                            </button>
                        </span>
                </div>
            </div>
        </div>
    </div>

    <!-- 地图 -->
    <div class="canvi-content middle" id="map"></div>

    <div class="controls-bar-right">
        <button type="button" id="btn-view-encyclopedia" class="btn btn-default btn-tools" style="width: 32px;height: 32px;padding:0px;">
            <span class="fas fa-book"></span>
        </button>
<%--        <div class="btn-group-vertical" role="group" aria-label="书签" >--%>

<%--            <button type="button" id="btn-view-bookmark" class="btn btn-default btn-xs btn-tools btn-tools-top">--%>
<%--                <span class="fas fa-bookmark"></span><br>书签--%>
<%--            </button>--%>
<%--            <button type="button" id="btn-add-bookmark" class="btn btn-default btn-xs btn-tools btn-tools-bottom">--%>
<%--                <span class="fas fa-plus"></span><br>添加--%>
<%--            </button>--%>
<%--        </div>--%>
    </div>



    <div id="footer" class="bottom">
        <div id="latlon_info"></div>

        <div id="copyright">Desighed by 复旦大学</div>

    </div>
</div>

<!--  搜索设置对话框
================================= -->
<div class="modal fade" id="settingModal" tabindex="-1" role="dialog" aria-labelledby="modalLabelLatlon" data-backdrop="static">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="modalLabelLatlon">经纬度搜索设置</h4>
            </div>
            <div class="modal-body" >
                <!-- Nav tabs -->
                <ul class="nav nav-tabs" role="tablist">
                    <li role="presentation" class="active"><a href="#pane-lonlat-degree" aria-controls="pane-lonlat-degree" role="tab" data-toggle="tab">经纬度-度</a></li>
                    <li role="presentation"><a href="#pane-lonlat-dm" aria-controls="pane-lonlat-dm" role="tab" data-toggle="tab">经纬度-度分</a></li>
                    <li role="presentation"><a href="#pane-lonlat-dms" aria-controls="pane-lonlat-dms" role="tab" data-toggle="tab">经纬度-度分秒</a></li>
                </ul>
                <!-- Tab panes -->
                <div class="tab-content">
                    <!-- 度 -->
                    <div role="tabpanel" class="tab-pane active" id="pane-lonlat-degree">
                        <br>
                        <form>
                            <div class="form-group">
                                <label for="lonlat-degree-lon">经度</label>
                                <input type="number" class="form-control" id="lonlat-degree-lon" placeholder="如：121.400000">
                            </div>
                            <div class="form-group">
                                <label for="lonlat-degree-lat">纬度</label>
                                <input type="number" class="form-control" id="lonlat-degree-lat" placeholder="如：28.600000">
                            </div>
                            <button type="button" id="btn-lonlat-degree-submit" class="btn btn-default">确定</button>
                        </form>
                    </div>

                    <!-- 度分 -->
                    <div role="tabpanel" class="tab-pane" id="pane-lonlat-dm">
                        <br>
                        <form  class="form-horizontal">
                            <div class="form-group">
                                <label class="col-sm-2 control-label" for="lonlat-dm-lon-degree">经度</label>
                                <div  class="col-sm-5">
                                    <div class="row">
                                        <div class="col-md-10"><input type="number" class="form-control" id="lonlat-dm-lon-degree" placeholder="如：121" ></div>
                                        <label class="col-md-2 control-label" for="lonlat-dm-lon-degree" style="padding-left:0px;text-align:left;">度</label>
                                    </div>
                                </div>
                                <div  class="col-sm-5">
                                    <div class="row">
                                        <div class="col-md-10"><input type="number" class="form-control" id="lonlat-dm-lon-min" placeholder="如：4.321"></div>
                                        <label class="col-md-2 control-label" for="lonlat-dm-lon-min" style="padding-left:0px;text-align:left;">分</label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label" for="lonlat-dm-lat-degree">纬度</label>
                                <div  class="col-sm-5">
                                    <div class="row">
                                        <div class="col-md-10"><input type="number" class="form-control" id="lonlat-dm-lat-degree" placeholder="如：28" ></div>
                                        <label class="col-md-2 control-label" for="lonlat-dm-lat-degree" style="padding-left:0px;text-align:left;">度</label>
                                    </div>

                                </div>
                                <div  class="col-sm-5">
                                    <div class="row">
                                        <div class="col-md-10"><input type="number" class="form-control" id="lonlat-dm-lat-min" placeholder="如：6.731"></div>
                                        <label class="col-md-2 control-label" for="lonlat-dm-lat-min" style="padding-left:0px;text-align:left;">分</label>
                                    </div>
                                </div>
                            </div>
                            <button type="button" id="btn-lonlat-dm-submit" class="btn btn-default">确定</button>
                        </form>
                    </div>

                    <!-- 度分秒 -->
                    <div role="tabpanel" class="tab-pane" id="pane-lonlat-dms">
                        <br>
                        <form  class="form-horizontal">
                            <div class="form-group">
                                <label class="col-sm-2 control-label" for="lonlat-dms-lon-degree">经度</label>
                                <div  class="col-sm-3">
                                    <div class="row">
                                        <div class="col-md-10"><input type="number" class="form-control" id="lonlat-dms-lon-degree" placeholder="如：121" ></div>
                                        <label class="col-md-2 control-label" for="lonlat-dms-lon-degree" style="padding-left:0px;text-align:left;">度</label>
                                    </div>
                                </div>
                                <div  class="col-sm-3">
                                    <div class="row">
                                        <div class="col-md-10"><input type="number" class="form-control" id="lonlat-dms-lon-min" placeholder="如：4"></div>
                                        <label class="col-md-2 control-label" for="lonlat-dms-lon-min" style="padding-left:0px;text-align:left;">分</label>
                                    </div>
                                </div>
                                <div  class="col-sm-4">
                                    <div class="row">
                                        <div class="col-md-10"><input type="number" class="form-control" id="lonlat-dms-lon-sec" placeholder="如：0.84"></div>
                                        <label class="col-md-2 control-label" for="lonlat-dms-lon-sec" style="padding-left:0px;text-align:left;">秒</label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label" for="lonlat-dms-lat-degree">纬度</label>
                                <div  class="col-sm-3">
                                    <div class="row">
                                        <div class="col-md-10"><input type="number" class="form-control" id="lonlat-dms-lat-degree" placeholder="如：28" ></div>
                                        <label class="col-md-2 control-label" for="lonlat-dms-lat-degree" style="padding-left:0px;text-align:left;">度</label>
                                    </div>
                                </div>
                                <div  class="col-sm-3">
                                    <div class="row">
                                        <div class="col-md-10"><input type="number" class="form-control" id="lonlat-dms-lat-min" placeholder="如：17"></div>
                                        <label class="col-md-2 control-label" for="lonlat-dms-lat-min" style="padding-left:0px;text-align:left;">分</label>
                                    </div>
                                </div>
                                <div  class="col-sm-4">
                                    <div class="row">
                                        <div class="col-md-10"><input type="number" class="form-control" id="lonlat-dms-lat-sec" placeholder="如：22.5"></div>
                                        <label class="col-md-2 control-label" for="lonlat-dms-lat-sec" style="padding-left:0px;text-align:left;">秒</label>
                                    </div>
                                </div>
                            </div>
                            <button type="button" id="btn-lonlat-dms-submit" class="btn btn-default">确定</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> <!--  /搜索设置对话框 -->


<!-- 灾害事件详情对话框 -->
<div class="modal fade bs-example-modal-md" id="wtsInfoModal" tabindex="-1" role="dialog" aria-labelledby="modalLabelWts">
    <div class="modal-dialog modal-md" role="document">
        <div class="modal-content">
            <div class="modal-header" style="background-color: #57aff2;color:white;">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="modalLabelWts">灾害事件详细信息</h4>
            </div>
            <div class="modal-body" style="font-size: small;">
                <div class="row">
                    <div class="col-md-4">灾害事件名称</div>
                    <div class="col-md-8" id="info-wts-name"></div>
                </div>
                <div class="row">
                    <div class="col-md-4">县市区</div>
                    <div class="col-md-8" id="info-wts-region"></div>
                </div>
                <div class="row">
                    <div class="col-md-4">地址</div>
                    <div class="col-md-8" id="info-wts-addr"></div>
                </div>
                <div class="row">
                    <div class="col-md-4">开始时间</div>
                    <div class="col-md-8" id="info-wts-start-time"></div>
                </div>
                <div class="row">
                    <div class="col-md-4">结束时间</div>
                    <div class="col-md-8" id="info-wts-reform"></div>
                </div>
                <div class="row">
                    <div class="col-md-4">经度</div>
                    <div class="col-md-8" id="info-wts-lon"></div>
                </div>
                <div class="row">
                    <div class="col-md-4">纬度</div>
                    <div class="col-md-8" id="info-wts-lat"></div>
                </div>
                <div class="row">
                    <div class="col-md-4">受灾人口</div>
                    <div class="col-md-8" id="info-wts-daily-capacity"></div>
                </div>
                <div class="row">
                    <div class="col-md-4">财产损失</div>
                    <div class="col-md-8" id="info-wts-treatment"></div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div> <!-- /灾害事件详情对话框 -->
</body>
</html>