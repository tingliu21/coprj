!function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.GridManager = e() : t.GridManager = e()
}(this, function () {
    return function (t) {
        function e(o) {
            if (n[o]) return n[o].exports;
            var a = n[o] = {i: o, l: !1, exports: {}};
            return t[o].call(a.exports, a, a.exports, e), a.l = !0, a.exports
        }

        var n = {};
        return e.m = t, e.c = n, e.i = function (t) {
            return t
        }, e.d = function (t, n, o) {
            e.o(t, n) || Object.defineProperty(t, n, {configurable: !1, enumerable: !0, get: o})
        }, e.n = function (t) {
            var n = t && t.__esModule ? function () {
                return t.default
            } : function () {
                return t
            };
            return e.d(n, "a", n), n
        }, e.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, e.p = "", e(e.s = 21)
    }([function (t, e, n) {
        "use strict";

        function o(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(e, "__esModule", {value: !0}), e.Base = e.$ = e.jTool = void 0;
        var a = function () {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var o = e[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                }
            }

            return function (e, n, o) {
                return n && t(e.prototype, n), o && t(e, o), e
            }
        }();
        n(23);
        var r = window.jTool, i = window.jTool, l = function () {
            function t() {
                o(this, t)
            }

            return a(t, [{
                key: "getKey", value: function (t) {
                    return t.attr("grid-manager") || ""
                }
            }, {
                key: "getSetTopAttr", value: function () {
                    return "grid-manager-mock-thead"
                }
            }, {
                key: "getEmptyHtml", value: function (t, e) {
                    return '<tr emptyTemplate>\n\t\t\t\t\t<td colspan="' + (t || 1) + '">\n\t\t\t\t\t' + (e || "") + "\n\t\t\t\t\t</td>\n\t\t\t\t</tr>"
                }
            }, {
                key: "updateEmptyCol", value: function (t) {
                    var e = i("tr[emptyTemplate]", t);
                    0 !== e.length && i("td", e).attr("colspan", i('th[th-visible="visible"]', t).length)
                }
            }, {
                key: "outLog", value: function (t, e) {
                    switch (e) {
                        case"info":
                            console.info("GridManager Info: ", t);
                            break;
                        case"warn":
                            console.warn("GridManager Warn: ", t);
                            break;
                        case"error":
                            console.error("GridManager Error: ", t);
                            break;
                        default:
                            console.log("GridManager: ", t)
                    }
                }
            }, {
                key: "getColTd", value: function (t) {
                    var e = t.closest("table[grid-manager]"), n = t.index(), o = r("tbody tr", e), a = [], i = null;
                    return r.each(o, function (t, e) {
                        (i = r("td", e).get(n)) && a.push(i)
                    }), r(a)
                }
            }, {
                key: "setAreVisible", value: function (t, e, n) {
                    var o = this, a = null, l = void 0, s = null, u = null, c = [], d = null, f = null;
                    r.each(t, function (t, h) {
                        s = r(h), a = s.closest("table"), l = a.closest(".table-wrap"), u = r("tbody tr[cache-key]", a), d = r('.config-area li[th-name="' + s.attr("th-name") + '"]', l), f = i('input[type="checkbox"]', d), r.each(u, function (t, e) {
                            c.push(r(e).find("td").get(s.index()))
                        }), e ? (s.attr("th-visible", "visible"), r.each(c, function (t, e) {
                            e.setAttribute("td-visible", "visible")
                        }), d.addClass("checked-li"), f.prop("checked", !0)) : (s.attr("th-visible", "none"), r.each(c, function (t, e) {
                            e.setAttribute("td-visible", "none")
                        }), d.removeClass("checked-li"), f.prop("checked", !1)), o.updateEmptyCol(a), "function" == typeof n && n()
                    })
                }
            }, {
                key: "getTextWidth", value: function (t) {
                    var e = r(t), n = r(".th-wrap", e), o = r(".th-text", e), a = e.closest(".table-wrap"),
                        i = r(".text-dreamland", a);
                    i.text(o.text()), i.css({
                        fontSize: o.css("font-size"),
                        fontWeight: o.css("font-weight"),
                        fontFamily: o.css("font-family")
                    });
                    var l = n.css("padding-left"), s = n.css("padding-right");
                    return i.width() + (l || 0) + (s || 0) + 2 + 1
                }
            }, {
                key: "showLoading", value: function (t, e) {
                    if (!t || 0 === t.length) return !1;
                    var n = t.find(".load-area");
                    n.length > 0 && n.remove();
                    var o = r('<div class="load-area loading"><div class="loadInner kernel"></div></div>');
                    t.append(o);
                    var a = i(".load-area .loadInner", t), l = t.height(), s = a.height();
                    return a.css("margin-top", (l - s) / 2), window.setTimeout(function () {
                        "function" == typeof e && e()
                    }, 100), !0
                }
            }, {
                key: "hideLoading", value: function (t, e) {
                    return !(!t || 0 === t.length) && (window.setTimeout(function () {
                        r(".load-area", t).remove(), "function" == typeof e && e()
                    }, 500), !0)
                }
            }, {
                key: "updateInteractive", value: function (t, e) {
                    var n = ["Adjust", "Drag"], o = t.closest(".table-wrap");
                    e && -1 !== n.indexOf(e) ? o.attr("user-interactive", e) : o.removeAttr("user-interactive")
                }
            }, {
                key: "updateScrollStatus", value: function (t) {
                    var e = t.closest(".table-div");
                    return t.width() === e.width() ? (e.css("overflow-x", "hidden"), "hidden") : (e.css("overflow-x", "auto"), "auto")
                }
            }, {
                key: "getVisibleForColumn", value: function (t) {
                    return t.isShow ? "visible" : "none"
                }
            }]), t
        }(), s = new l;
        e.jTool = i, e.$ = r, e.Base = s
    }, function (t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {default: t}
        }

        function a(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(e, "__esModule", {value: !0});
        var r = function () {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var o = e[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                }
            }

            return function (e, n, o) {
                return n && t(e.prototype, n), o && t(e, o), e
            }
        }(), i = n(0), l = n(19), s = n(6), u = o(s), c = n(11), d = o(c), f = n(20), h = o(f), g = function () {
            function t() {
                a(this, t)
            }

            return r(t, [{
                key: "getVersion", value: function () {
                    return h.default.version
                }
            }, {
                key: "getScope", value: function (t) {
                    return h.default.scope[i.Base.getKey(t)]
                }
            }, {
                key: "setScope", value: function (t, e) {
                    h.default.scope[i.Base.getKey(t)] = e
                }
            }, {
                key: "getRowData", value: function (t, e) {
                    var n = i.Base.getKey(t);
                    if (h.default.responseData[n]) {
                        if ("element" === i.jTool.type(e)) return h.default.responseData[n][e.getAttribute("cache-key")];
                        if ("nodeList" === i.jTool.type(e)) {
                            var o = [];
                            return i.jTool.each(e, function (t, e) {
                                o.push(h.default.responseData[n][e.getAttribute("cache-key")])
                            }), o
                        }
                        return {}
                    }
                }
            }, {
                key: "setRowData", value: function (t, e, n) {
                    h.default.responseData[i.Base.getKey(t)][e] = n
                }
            }, {
                key: "getTableData", value: function (t) {
                    return h.default.responseData[i.Base.getKey(t)] || []
                }
            }, {
                key: "setTableData", value: function (t, e) {
                    var n = i.Base.getKey(t);
                    h.default.responseData[n] || (h.default.responseData[n] = {}), h.default.responseData[n] = e
                }
            }, {
                key: "delUserMemory", value: function (t, e) {
                    if (!t || 0 === t.length) return window.localStorage.removeItem("GridManagerMemory"), i.Base.outLog("用户记忆被全部清除: " + e, "warn"), !0;
                    var n = this.getSettings(t);
                    i.Base.outLog(n.gridManagerName + "用户记忆被清除: " + e, "warn");
                    var o = window.localStorage.getItem("GridManagerMemory");
                    return !!o && (o = JSON.parse(o), delete o[this.getMemoryKey(t)], window.localStorage.setItem("GridManagerMemory", JSON.stringify(o)), !0)
                }
            }, {
                key: "getMemoryKey", value: function (t) {
                    var e = this.getSettings(t);
                    return t && 0 !== t.length ? window.location.pathname + window.location.hash + "-" + e.gridManagerName : (i.Base.outLog("getUserMemory:无效的table", "error"), !1)
                }
            }, {
                key: "getUserMemory", value: function (t) {
                    if (!t || 0 === t.length) return {};
                    var e = this.getMemoryKey(t);
                    if (!e) return {};
                    var n = window.localStorage.getItem("GridManagerMemory");
                    return n && "{}" !== n ? (n = JSON.parse(n), {
                        key: e,
                        cache: JSON.parse(n[e] || "{}")
                    }) : (t.attr("grid-manager-cache-error", "error"), {})
                }
            }, {
                key: "saveUserMemory", value: function (t, e) {
                    var n = this;
                    if (e.disableCache) return !1;
                    var o = (0, i.jTool)("thead[grid-manager-thead] th", t);
                    if (!o || 0 === o.length) return i.Base.outLog("saveUserMemory:无效的thList,请检查是否正确配置table,thead,th", "error"), !1;
                    var a = {}, r = {};
                    a.column = e.columnMap, e.supportAjaxPage && (r.pSize = parseInt((0, i.jTool)('select[name="pSizeArea"]', t.closest(".table-wrap")).val(), 10), a.page = r);
                    var l = JSON.stringify(a), s = window.localStorage.getItem("GridManagerMemory");
                    return s = s ? JSON.parse(s) : {}, s[n.getMemoryKey(t)] = l, window.localStorage.setItem("GridManagerMemory", JSON.stringify(s)), l
                }
            }, {
                key: "initSettings", value: function (t, e) {
                    var n = this, o = new l.Settings;
                    o.textConfig = new l.TextSettings, i.jTool.extend(!0, o, e), this.setSettings(t, o), o.supportAutoOrder && o.columnData.unshift(d.default.getColumn(o)), o.supportCheckbox && o.columnData.unshift(u.default.getColumn(o)), o.columnMap = {}, o.columnData.forEach(function (t, e) {
                        o.columnMap[t.key] = t, o.columnMap[t.key].isShow = t.isShow || void 0 === t.isShow, o.columnMap[t.key].index = e
                    });
                    return function () {
                        if (!o.disableCache) {
                            var e = n.getUserMemory(t), a = e.cache && e.cache.column ? e.cache.column : {},
                                r = Object.keys(a), l = Object.keys(o.columnMap);
                            if (0 !== r.length) {
                                var s = !0;
                                r.length !== l.length && (s = !1), s && i.jTool.each(o.columnMap, function (t, e) {
                                    if (!a[t] || a[t].text !== e.text || a[t].isShow !== e.isShow || a[t].align !== e.align || a[t].sorting !== e.sorting || a[t].remind !== e.remind || a[t].template && a[t].template !== e.template) return s = !1, !1
                                }), s ? i.jTool.extend(!0, o.columnMap, a) : n.delUserMemory(t, "存储记忆项与配置项[columnData]不匹配")
                            }
                        }
                    }(), this.setSettings(t, o), o
                }
            }, {
                key: "getSettings", value: function (t) {
                    return t && 0 !== t.length ? i.jTool.extend(!0, {}, h.default.settings[i.Base.getKey(t)] || {}) : {}
                }
            }, {
                key: "setSettings", value: function (t, e) {
                    h.default.settings[i.Base.getKey(t)] = i.jTool.extend(!0, {}, e)
                }
            }, {
                key: "update", value: function (t, e) {
                    e || (e = this.getSettings(t)), e.columnMap = this.reworkColumnMap(t, e.columnMap), this.setSettings(t, e), this.saveUserMemory(t, e)
                }
            }, {
                key: "reworkColumnMap", value: function (t, e) {
                    if (!e || i.jTool.isEmptyObject(e)) return void i.Base.outLog("columnMap 为无效数据", "error");
                    var n = null;
                    return i.jTool.each(e, function (e, o) {
                        n = (0, i.jTool)('thead[grid-manager-thead] th[th-name="' + o.key + '"]', t), o.width = n.width() + "px", o.index = n.index(), o.isShow = "visible" === n.attr("th-visible")
                    }), e
                }
            }, {
                key: "cleanTableCacheForVersion", value: function () {
                    var t = window.localStorage.getItem("GridManagerVersion");
                    t || window.localStorage.setItem("GridManagerVersion", h.default.version), t && t !== h.default.version && (this.delUserMemory(null, "版本已升级,原全部缓存被自动清除"), window.localStorage.setItem("GridManagerVersion", h.default.version))
                }
            }]), t
        }();
        e.default = new g
    }, function (t, e, n) {
        "use strict";

        function o(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(e, "__esModule", {value: !0});
        var a = function () {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var o = e[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                }
            }

            return function (e, n, o) {
                return n && t(e.prototype, n), o && t(e, o), e
            }
        }(), r = n(0), i = n(1), l = function (t) {
            return t && t.__esModule ? t : {default: t}
        }(i), s = function () {
            function t() {
                o(this, t)
            }

            return a(t, [{
                key: "init", value: function (t) {
                    this.__bindAdjustEvent(t)
                }
            }, {
                key: "resetAdjust", value: function (t) {
                    if (!t || 0 === t.length) return !1;
                    var e = (0, r.jTool)('thead [th-visible="visible"]', t), n = (0, r.jTool)(".adjust-action", e);
                    if (!n || 0 === n.length) return !1;
                    n.show(), n.eq(n.length - 1).hide(), r.Base.updateScrollStatus(t)
                }
            }, {
                key: "destroy", value: function (t) {
                    t.unbind("mouseup mouseleave"), t.unbind("mousemove"), t.off("mousedown", ".adjust-action")
                }
            }, {
                key: "__bindAdjustEvent", value: function (t) {
                    var e = this;
                    t.off("mousedown", ".adjust-action"), t.on("mousedown", ".adjust-action", function (t) {
                        var n = (0, r.jTool)(this), o = n.closest("th"), a = o.parent(), i = a.closest("table"),
                            s = l.default.getSettings(i), u = a.find('th[th-visible="visible"]'),
                            c = u.eq(o.index(u) + 1), d = r.Base.getColTd(o);
                        return s.adjustBefore(t), o.addClass("adjust-selected"), d.addClass("adjust-selected"), r.Base.updateInteractive(i, "Adjust"), e.__runMoveEvent(i, o, c), e.__runStopEvent(i, o, d), !1
                    })
                }
            }, {
                key: "__runMoveEvent", value: function (t, e, n) {
                    var o = null, a = null, i = r.Base.getTextWidth(e), l = r.Base.getTextWidth(n);
                    t.unbind("mousemove"), t.bind("mousemove", function (s) {
                        t.addClass("no-select-text"), o = s.clientX - e.offset().left, o = Math.ceil(o), a = n.width() + e.width() - o, a = Math.ceil(a), o < i || (a < l && (a = l), o !== e.width() && (o + a < e.width() + n.width() && (a = e.width() + n.width() - o), e.width(o), n.width(a), 1 === e.closest("thead[" + r.Base.getSetTopAttr() + "]").length && ((0, r.jTool)('thead[grid-manager-thead] th[th-name="' + e.attr("th-name") + '"]', t).width(o), (0, r.jTool)('thead[grid-manager-thead] th[th-name="' + n.attr("th-name") + '"]', t).width(a), (0, r.jTool)("thead[" + r.Base.getSetTopAttr() + "]", t).width((0, r.jTool)("thead[grid-manager-thead]", t).width()))))
                    })
                }
            }, {
                key: "__runStopEvent", value: function (t, e, n) {
                    t.unbind("mouseup mouseleave"), t.bind("mouseup mouseleave", function (o) {
                        var a = l.default.getSettings(t);
                        t.unbind("mousemove mouseleave"), e.hasClass("adjust-selected") && a.adjustAfter(o), e.removeClass("adjust-selected"), n.removeClass("adjust-selected"), t.removeClass("no-select-text"), r.Base.updateInteractive(t), r.Base.updateScrollStatus(t), l.default.update(t, a)
                    })
                }
            }, {
                key: "html", get: function () {
                    return '<span class="adjust-action"></span>'
                }
            }]), t
        }();
        e.default = new s
    }, function (t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {default: t}
        }

        function a(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(e, "__esModule", {value: !0});
        var r = function () {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(), i = n(0), l = n(10), s = o(l), u = n(2), c = o(u), d = n(5), f = o(d), h = n(1), g = o(h), p = n(7),
            v = o(p), y = n(6), m = o(y), b = n(8), T = o(b), j = n(11), w = o(j), k = n(12), x = o(k), M = n(13),
            S = o(M), D = function () {
                function t() {
                    a(this, t)
                }

                return r(t, [{
                    key: "refresh", value: function (t, e) {
                        var n = this, o = g.default.getSettings(t), a = t.closest(".table-wrap");
                        if ((0, i.jTool)(".page-toolbar .refresh-action", a).addClass("refreshing"), o.ajax_data) return this.driveDomForSuccessAfter(t, o, o.ajax_data, e), o.ajax_success(o.ajax_data), void this.removeRefreshingClass(a);
                        if ("string" != typeof o.ajax_url || "" === o.ajax_url) return o.outLog("请求表格数据失败！参数[ajax_url]配制错误", "error"), this.removeRefreshingClass(a), void ("function" == typeof e && e());
                        var r = i.jTool.extend(!0, {}, o.query);
                        o.supportAjaxPage && i.jTool.extend(r, o.pageData), o.supportSorting && i.jTool.each(o.sortData, function (t, e) {
                            r["" + o.sortKey + t] = e
                        }), "POST" !== o.ajax_type.toUpperCase() || o.ajax_headers["Content-Type"] || (o.ajax_headers["Content-Type"] = "application/x-www-form-urlencoded"), o.requestHandler(r), o.supportAjaxPage && i.jTool.each(o.pageData, function (t, e) {
                            o.pageData[t] = r[t] || e
                        }), o.supportSorting && i.jTool.each(o.sortData, function (t, e) {
                            o.sortData[t] = r["" + o.sortKey + t] || e
                        }), g.default.setSettings(t, o), i.Base.showLoading(a), i.jTool.ajax({
                            url: o.ajax_url,
                            type: o.ajax_type,
                            data: r,
                            headers: o.ajax_headers,
                            xhrFields: o.ajax_xhrFields,
                            cache: !0,
                            beforeSend: function (t) {
                                o.ajax_beforeSend(t)
                            },
                            success: function (a) {
                                n.driveDomForSuccessAfter(t, o, a, e), o.ajax_success(a)
                            },
                            error: function (t, e, n) {
                                o.ajax_error(t, e, n)
                            },
                            complete: function (t, e) {
                                o.ajax_complete(t, e), n.removeRefreshingClass(a), i.Base.hideLoading(a)
                            }
                        })
                    }
                }, {
                    key: "removeRefreshingClass", value: function (t) {
                        var e = (0, i.jTool)(".page-toolbar .refresh-action", t);
                        window.setTimeout(function () {
                            e.removeClass("refreshing")
                        }, 2e3)
                    }
                }, {
                    key: "driveDomForSuccessAfter", value: function (t, e, n, o) {
                        if (!n) return void i.Base.outLog("请求数据失败！请查看配置参数[ajax_url或ajax_data]是否配置正确，并查看通过该地址返回的数据格式是否正确", "error");
                        var a = (0, i.jTool)("tbody", t), r = "string" == typeof n ? JSON.parse(n) : n;
                        e.responseHandler(r);
                        var l = r[e.dataKey], u = null;
                        if (l && 0 !== l.length) {
                            if (e.supportAutoOrder) {
                                var c = e.pageData, d = 1;
                                c && c.pSize && c.cPage && (d = c.pSize * (c.cPage - 1) + 1), l = l.map(function (t, e) {
                                    return t[w.default.key] = d + e, t
                                })
                            }
                            e.supportCheckbox && (l = l.map(function (t) {
                                return t[m.default.key] = !1, t
                            })), g.default.setTableData(t, l), a.html(""), i.jTool.each(l, function (t, n) {
                                var o = document.createElement("tr");
                                o.setAttribute("cache-key", t);
                                var r = [];
                                i.jTool.each(e.columnMap, function (t, e) {
                                    u = e.template, u = "function" == typeof u ? u(n[e.key], n) : "string" == typeof u ? u : n[e.key];
                                    var o = null;
                                    e.isAutoCreate ? o = (0, i.jTool)(u).get(0) : (o = (0, i.jTool)('<td gm-create="false"></td>').get(0), "element" === i.jTool.type(u) ? o.appendChild(u) : o.innerHTML = u || ""), e.align && o.setAttribute("align", e.align), r[e.index] = o
                                }), r.forEach(function (t) {
                                    o.appendChild(t)
                                }), a.append(o)
                            }), this.bindEvent(t), this.initVisible(t)
                        } else this.insertEmptyTemplate(t, e), r[e.totalsKey] = 0;
                        e.supportCheckbox && m.default.resetDOM(t, l), e.supportAjaxPage && (f.default.resetPageData(t, e, r[e.totalsKey]), s.default.updateMenuPageStatus(e.gridManagerName, e.pageData)), "function" == typeof o && o()
                    }
                }, {
                    key: "insertEmptyTemplate", value: function (t, e) {
                        var n = (0, i.jTool)('th[th-visible="visible"]', t).length;
                        (0, i.jTool)("tbody", t).html(i.Base.getEmptyHtml(n, e.emptyTemplate))
                    }
                }, {
                    key: "bindEvent", value: function (t) {
                        (0, i.jTool)("[gm-click]", t).bind("click", function (e) {
                            var n = g.default.getRowData(t, this.parentNode.parentNode),
                                o = g.default.getScope(t) || window, a = o[this.getAttribute("gm-click")];
                            "function" == typeof a && a.call(o, n)
                        })
                    }
                }, {
                    key: "createDOM", value: function (t) {
                        var e = g.default.getSettings(t), n = "<thead grid-manager-thead>", o = "", a = "", r = "", l = "",
                            s = "", u = [];
                        e.disableCache ? i.jTool.each(e.columnMap, function (t, e) {
                            u.push(e)
                        }) : i.jTool.each(e.columnMap, function (t, e) {
                            u[e.index] = e
                        }), i.jTool.each(u, function (u, c) {
                            switch (e.supportRemind && "string" == typeof c.remind && "" !== c.remind && (r = 'remind="' + c.remind + '"'), l = "", e.supportSorting && "string" == typeof c.sorting && (c.sorting === e.sortDownText ? (l = 'sorting="' + e.sortDownText + '"', e.sortData[c.key] = e.sortDownText, g.default.setSettings(t, e)) : c.sorting === e.sortUpText ? (l = 'sorting="' + e.sortUpText + '"', e.sortData[c.key] = e.sortUpText, g.default.setSettings(t, e)) : l = 'sorting=""'), a = c.width ? 'width="' + c.width + '"' : "", o = c.align ? 'align="' + c.align + '"' : "", s = i.Base.getVisibleForColumn(c), c.key) {
                                case w.default.key:
                                    n += w.default.getThString(e, s);
                                    break;
                                case m.default.key:
                                    n += m.default.getThString(e, s);
                                    break;
                                default:
                                    n += '<th gm-create="false" th-name="' + c.key + '" th-visible="' + s + '" ' + r + " " + l + " " + a + " " + o + ">" + c.text + "</th>"
                            }
                        }), n += "</thead>", t.html(n + "<tbody></tbody>"), e.supportCheckbox && m.default.bindCheckboxEvent(t);
                        var d = null, h = null, p = (0, i.jTool)("thead[grid-manager-thead]", t), y = (0, i.jTool)("th", p),
                            b = '<div class="table-wrap">\n\t\t\t\t\t\t<div class="table-div" style="height:calc(' + e.height + ' - 40px)"></div>\n\t\t\t\t\t\t<span class="text-dreamland"></span>\n\t\t\t\t\t</div>';
                        t.wrap(b);
                        var j = t.closest(".table-wrap");
                        e.supportConfig && j.append(v.default.html), e.supportAjaxPage && (j.append(f.default.createHtml(e)), f.default.initAjaxPage(t, e)), e.supportExport && j.append(T.default.html);
                        var k = (0, i.jTool)(".config-list", j), M = null, D = 0,
                            _ = (0, i.jTool)('<div class="th-wrap"></div>');
                        i.jTool.each(y, function (t, n) {
                            if (M = (0, i.jTool)(n), d = !(!e.supportAutoOrder || "true" !== M.attr("gm-order")), h = !(!e.supportCheckbox || "true" !== M.attr("gm-checkbox")), e.supportConfig && k.append('<li th-name="' + M.attr("th-name") + '">\n\t\t\t\t\t\t\t\t<input type="checkbox"/>\n\t\t\t\t\t\t\t\t<label>\n\t\t\t\t\t\t\t\t\t<span class="fake-checkbox"></span>\n\t\t\t\t\t\t\t\t\t' + M.text() + "\n\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t</li>"), !e.supportDrag || d || h ? _.html('<span class="th-text">' + M.html() + "</span>") : _.html('<span class="th-text drag-action">' + M.html() + "</span>"), e.supportRemind && void 0 !== M.attr("remind") && !d && !h) {
                                var o = (0, i.jTool)(x.default.html);
                                o.find(".ra-title").text(M.text()), o.find(".ra-con").text(M.attr("remind") || M.text()), _.append(o)
                            }
                            var a = M.attr("sorting");
                            if (e.supportSorting && void 0 !== a && !d && !h) {
                                var r = (0, i.jTool)(S.default.html);
                                switch (a) {
                                    case e.sortUpText:
                                        r.addClass("sorting-up");
                                        break;
                                    case e.sortDownText:
                                        r.addClass("sorting-down")
                                }
                                _.append(r)
                            }
                            if (e.supportAdjust && !d && !h) {
                                var l = (0, i.jTool)(c.default.html);
                                t === y.length - 1 && l.hide(), _.append(l)
                            }
                            if (M.html(_), d || h) D = 50; else {
                                var s = i.Base.getTextWidth(M), u = M.width();
                                D = u > s ? u : s
                            }
                            M.removeAttr("width"), M.width(D)
                        }), t.removeClass("GridManager-loading"), t.addClass("GridManager-ready")
                    }
                }, {
                    key: "initVisible", value: function (t) {
                        var e = (0, i.jTool)("tbody tr", t), n = null, o = null, a = "visible",
                            r = g.default.getSettings(t);
                        i.jTool.each(r.columnMap, function (r, l) {
                            n = (0, i.jTool)('th[th-name="' + l.key + '"]', t), a = i.Base.getVisibleForColumn(l), n.attr("th-visible", a), i.jTool.each(e, function (t, e) {
                                o = (0, i.jTool)("td", e).eq(n.index()), o.attr("td-visible", a)
                            })
                        })
                    }
                }]), t
            }();
        e.default = new D
    }, function (t, e, n) {
        "use strict";

        function o(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(e, "__esModule", {value: !0});
        var a = function () {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var o = e[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                }
            }

            return function (e, n, o) {
                return n && t(e.prototype, n), o && t(e, o), e
            }
        }(), r = n(0), i = function () {
            function t() {
                o(this, t)
            }

            return a(t, [{
                key: "getLanguage", value: function (t) {
                    return t.i18n
                }
            }, {
                key: "getText", value: function (t, e, n) {
                    return t.textConfig[e][n || this.getLanguage(t)] || ""
                }
            }, {
                key: "i18nText", value: function (t, e, n, o, a) {
                    var i = this, l = [];
                    if (3 === arguments.length && "array" === r.jTool.type(arguments[2])) l = arguments[2]; else if (arguments.length > 2) for (var s = 2; s < arguments.length; s++) l.push(arguments[s]);
                    var u = "";
                    try {
                        return u = i.getText(t, e), l && 0 !== l.length ? u = u.replace(/{\d+}/g, function (t) {
                            return l[t.match(/\d+/)] || ""
                        }) : u
                    } catch (n) {
                        return r.Base.outLog("未找到与" + e + "相匹配的" + i.getLanguage(t) + "语言", "warn"), ""
                    }
                }
            }]), t
        }();
        e.default = new i
    }, function (t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {default: t}
        }

        function a(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(e, "__esModule", {value: !0});
        var r = function () {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var o = e[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                }
            }

            return function (e, n, o) {
                return n && t(e.prototype, n), o && t(e, o), e
            }
        }(), i = n(0), l = n(3), s = o(l), u = n(1), c = o(u), d = n(4), f = o(d), h = function () {
            function t() {
                a(this, t)
            }

            return r(t, [{
                key: "createHtml", value: function (t) {
                    return '<div class="page-toolbar">\n\t\t\t\t\t\t<div class="refresh-action"><i class="iconfont icon-refresh"></i></div>\n\t\t\t\t\t\t<div class="goto-page">\n\t\t\t\t\t\t\t' + f.default.i18nText(t, "goto-first-text") + '\n\t\t\t\t\t\t\t<input type="text" class="gp-input"/>\n\t\t\t\t\t\t\t' + f.default.i18nText(t, "goto-last-text") + '\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="change-size"><select name="pSizeArea"></select></div>\n\t\t\t\t\t\t<div class="dataTables_info"></div>\n\t\t\t\t\t\t<div class="ajax-page"><ul class="pagination"></ul></div>\n\t\t\t\t\t</div>'
                }
            }, {
                key: "initAjaxPage", value: function (t, e) {
                    var n = e.sizeData;
                    if (!n || 0 === n.length) return void i.Base.outLog("渲染失败：参数[sizeData]配置错误", "error");
                    e.disableCache || this.__configPageForCache(t, e);
                    var o = t.closest(".table-wrap"), a = (0, i.jTool)(".page-toolbar", o),
                        r = (0, i.jTool)('select[name="pSizeArea"]', a);
                    a.hide(), r.html(this.__getPageSizeHtml(n)), this.__bindPageJumpEvent(t), this.__bindSetPageSizeEvent(t)
                }
            }, {
                key: "resetPageData", value: function (t, e, n) {
                    var o = this;
                    if (!isNaN(parseInt(n, 10))) {
                        var a = this.__getPageData(e, n);
                        o.__createPaginationDOM(t, e, a), o.__resetPSize(t, e, a), c.default.setSettings(t, i.jTool.extend(!0, e, {pageData: a}));
                        var r = t.closest(".table-wrap");
                        (0, i.jTool)(".page-toolbar", r).show()
                    }
                }
            }, {
                key: "gotoPage", value: function (t, e, n) {
                    (!n || n < 1) && (n = 1), n > e.pageData.tPage && (n = e.pageData.tPage), e.pageData.cPage = n, e.pageData.pSize = e.pageData.pSize || e.pageSize, c.default.setSettings(t, e);
                    var o = i.jTool.extend({}, e.query, e.sortData, e.pageData);
                    e.pagingBefore(o), s.default.refresh(t, function () {
                        e.pagingAfter(o)
                    })
                }
            }, {
                key: "destroy", value: function (t) {
                    var e = t.closest(".table-wrap"), n = (0, i.jTool)(".page-toolbar", e),
                        o = (0, i.jTool)(".gp-input", n), a = (0, i.jTool)(".refresh-action", n),
                        r = (0, i.jTool)("select[name=pSizeArea]", n);
                    n.off("click", "li"), o.unbind("keyup"), a.unbind("click"), r.unbind("change")
                }
            }, {
                key: "__createPaginationDOM", value: function (t, e, n) {
                    var o = t.closest(".table-wrap"), a = (0, i.jTool)(".page-toolbar", o);
                    (0, i.jTool)(".pagination", a).html(this.__joinPagination(e, n))
                }
            }, {
                key: "__joinPagination", value: function (t, e) {
                    var n = Number(e.cPage || 0), o = Number(e.tPage || 0), a = "", r = "", i = "first-page",
                        l = "previous-page";
                    1 === n && (i += " disabled", l += " disabled"), a += '<li c-page="1" class="' + i + '">\n\t\t\t\t\t' + f.default.i18nText(t, "first-page") + '\n\t\t\t\t</li>\n\t\t\t\t<li c-page="' + (n - 1) + '" class="' + l + '">\n\t\t\t\t\t' + f.default.i18nText(t, "previous-page") + "\n\t\t\t\t</li>";
                    var s = 1, u = o;
                    for (n > 4 && (a += '<li c-page="1">\n\t\t\t\t\t\t1\n\t\t\t\t\t</li>\n\t\t\t\t\t<li class="disabled">\n\t\t\t\t\t\t...\n\t\t\t\t\t</li>', s = n - 2), o - n > 4 && (u = n + 2, r += '<li class="disabled">\n\t\t\t\t\t\t...\n\t\t\t\t\t</li>\n\t\t\t\t\t<li c-page="' + o + '">\n\t\t\t\t\t\t' + o + "\n\t\t\t\t\t</li>"), s; s <= u; s++) a += s !== n ? '<li c-page="' + s + '">' + s + "</li>" : '<li class="active">' + n + "</li>";
                    a += r;
                    var c = "next-page", d = "last-page";
                    return n >= o && (c += " disabled", d += " disabled"), a += '<li c-page="' + (n + 1) + '" class="' + c + '">\n\t\t\t\t\t' + f.default.i18nText(t, "next-page") + '\n\t\t\t\t</li>\n\t\t\t\t<li c-page="' + o + '" class="' + d + '">\n\t\t\t\t\t' + f.default.i18nText(t, "last-page") + "\n\t\t\t\t</li>"
                }
            }, {
                key: "__getPageSizeHtml", value: function (t) {
                    var e = "";
                    return i.jTool.each(t, function (t, n) {
                        e += '<option value="' + n + '">' + n + "</option>"
                    }), e
                }
            }, {
                key: "__bindPageJumpEvent", value: function (t) {
                    var e = t.closest(".table-wrap"), n = (0, i.jTool)(".page-toolbar", e);
                    this.__bindPageClick(t, n), this.__bindInputEvent(t, n), this.__bindRefreshEvent(n)
                }
            }, {
                key: "__bindPageClick", value: function (t, e) {
                    var n = this;
                    e.off("click", "li"), e.on("click", "li", function () {
                        var e = (0, i.jTool)(this), o = e.attr("c-page");
                        if (!o || !Number(o) || e.hasClass("disabled")) return i.Base.outLog("指定页码无法跳转,已停止。原因:1、可能是当前页已处于选中状态; 2、所指向的页不存在", "info"), !1;
                        o = window.parseInt(o), n.gotoPage(t, c.default.getSettings(t), o)
                    })
                }
            }, {
                key: "__bindInputEvent", value: function (t, e) {
                    var n = this, o = (0, i.jTool)(".gp-input", e);
                    o.unbind("keyup"), o.bind("keyup", function () {
                        if (13 === event.which) {
                            var e = parseInt(this.value, 10);
                            n.gotoPage(t, c.default.getSettings(t), e), this.value = ""
                        }
                    })
                }
            }, {
                key: "__bindRefreshEvent", value: function (t) {
                    var e = (0, i.jTool)(".refresh-action", t);
                    e.unbind("click"), e.bind("click", function (t) {
                        var e = (0, i.jTool)(t.target).closest(".table-wrap"),
                            n = (0, i.jTool)("table[grid-manager]", e);
                        s.default.refresh(n)
                    })
                }
            }, {
                key: "__bindSetPageSizeEvent", value: function (t) {
                    var e = t.closest(".table-wrap"), n = (0, i.jTool)(".page-toolbar", e),
                        o = (0, i.jTool)("select[name=pSizeArea]", n);
                    if (!o || 0 === o.length) return i.Base.outLog("未找到单页显示数切换区域，停止该事件绑定", "info"), !1;
                    o.unbind("change"), o.bind("change", function (e) {
                        var n = (0, i.jTool)(e.target), o = n.closest(".table-wrap"),
                            a = (0, i.jTool)("table[grid-manager]", o), r = c.default.getSettings(t);
                        r.pageData = {
                            cPage: 1,
                            pSize: window.parseInt(n.val())
                        }, c.default.saveUserMemory(a, r), c.default.setSettings(t, r);
                        var l = i.jTool.extend({}, r.query, r.sortData, r.pageData);
                        r.pagingBefore(l), s.default.refresh(a, function () {
                            r.pagingAfter(l)
                        })
                    })
                }
            }, {
                key: "__resetPSize", value: function (t, e, n) {
                    var o = t.closest(".table-wrap"), a = (0, i.jTool)(".page-toolbar", o),
                        r = (0, i.jTool)('select[name="pSizeArea"]', a), l = (0, i.jTool)(".dataTables_info", a);
                    if (!r || 0 === r.length) return i.Base.outLog("未找到条数切换区域，停止该事件绑定", "info"), !1;
                    var s = 1 === n.cPage ? 1 : (n.cPage - 1) * n.pSize + 1, u = n.cPage * n.pSize, c = n.tSize,
                        d = f.default.i18nText(e, "dataTablesInfo", [s, u, c]);
                    return r.val(n.pSize || 10), l.html(d), r.show(), !0
                }
            }, {
                key: "__getPageData", value: function (t, e) {
                    var n = t.pageData.pSize || t.pageSize, o = t.pageData.cPage || 1;
                    return {tPage: Math.ceil(e / n), cPage: o, pSize: n, tSize: e}
                }
            }, {
                key: "__configPageForCache", value: function (t, e) {
                    var n = c.default.getUserMemory(t), o = n.cache, a = null;
                    a = o && o.page && o.page.pSize ? o.page.pSize : e.pageSize || 10;
                    var r = {pSize: a, cPage: 1};
                    i.jTool.extend(e, {pageData: r}), c.default.setSettings(t, e)
                }
            }]), t
        }();
        e.default = new h
    }, function (t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {default: t}
        }

        function a(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(e, "__esModule", {value: !0});
        var r = function () {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var o = e[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                }
            }

            return function (e, n, o) {
                return n && t(e.prototype, n), o && t(e, o), e
            }
        }(), i = n(0), l = n(4), s = o(l), u = n(1), c = o(u), d = function () {
            function t() {
                a(this, t)
            }

            return r(t, [{
                key: "getThString", value: function (t, e) {
                    return '<th th-name="' + this.key + '" th-visible="' + e + '" gm-checkbox="true" gm-create="true">\n\t\t\t\t\t\t\t\t<input type="checkbox"/>\n\t\t\t\t\t\t\t\t<span style="display: none">\n\t\t\t\t\t\t\t\t\t' + s.default.i18nText(t, "checkall-text") + "\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t</th>"
                }
            }, {
                key: "getColumn", value: function (t) {
                    return {
                        key: this.key,
                        text: s.default.getText(t, "checkall-text"),
                        isAutoCreate: !0,
                        isShow: !0,
                        width: "50px",
                        align: "center",
                        template: function (t) {
                            return '<td gm-checkbox="true" gm-create="true"><input type="checkbox" ' + (t ? 'checked="checked"' : "") + "/></td>"
                        }
                    }
                }
            }, {
                key: "bindCheckboxEvent", value: function (t) {
                    var e = this;
                    t.off("click", 'th[gm-checkbox="true"] input[type="checkbox"]'), t.on("click", 'th[gm-checkbox="true"] input[type="checkbox"]', function () {
                        var n = e.resetData(t, this.checked, !0);
                        e.resetDOM(t, n)
                    }), t.off("click", 'td[gm-checkbox="true"] input[type="checkbox"]'), t.on("click", 'td[gm-checkbox="true"] input[type="checkbox"]', function () {
                        var n = e.resetData(t, this.checked, !1, (0, i.jTool)(this).closest("tr").attr("cache-key"));
                        e.resetDOM(t, n)
                    })
                }
            }, {
                key: "resetData", value: function (t, e, n, o) {
                    var a = this, r = c.default.getTableData(t);
                    return n && !o && r.forEach(function (t) {
                        t[a.key] = e
                    }), !n && o && (r[o][this.key] = e), c.default.setTableData(t, r), r
                }
            }, {
                key: "resetDOM", value: function (t, e) {
                    var n = this, o = e && e.length > 0;
                    e.forEach(function (e, a) {
                        var r = (0, i.jTool)('tbody tr[cache-key="' + a + '"]', t),
                            l = (0, i.jTool)('td[gm-checkbox="true"] input[type="checkbox"]', r);
                        r.attr("checked", e[n.key]), l.prop("checked", e[n.key]), e[n.key] || (o = !1)
                    }), (0, i.jTool)('thead tr th[gm-checkbox="true"] input[type="checkbox"]', t).prop("checked", o)
                }
            }, {
                key: "destroy", value: function (t) {
                    t.off("click", 'th[gm-checkbox="true"] input[type="checkbox"]'), t.off("click", 'td[gm-checkbox="true"] input[type="checkbox"]')
                }
            }, {
                key: "key", get: function () {
                    return "gm_checkbox"
                }
            }]), t
        }();
        e.default = new d
    }, function (t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {default: t}
        }

        function a(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(e, "__esModule", {value: !0});
        var r = function () {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var o = e[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                }
            }

            return function (e, n, o) {
                return n && t(e.prototype, n), o && t(e, o), e
            }
        }(), i = n(0), l = n(1), s = o(l), u = n(2), c = o(u), d = function () {
            function t() {
                a(this, t)
            }

            return r(t, [{
                key: "init", value: function (t) {
                    this.__bindConfigEvent(t)
                }
            }, {
                key: "__bindConfigEvent", value: function (t) {
                    var e = this, n = t.closest("div.table-wrap"), o = (0, i.jTool)(".config-action", n);
                    o.unbind("click"), o.bind("click", function () {
                        var t = (0, i.jTool)(this), n = t.closest(".table-wrap");
                        e.toggle(n)
                    }), (0, i.jTool)(".config-list li", n).unbind("click"), (0, i.jTool)(".config-list li", n).bind("click", function () {
                        var t = (0, i.jTool)(this), e = t.attr("th-name"), n = t.find('input[type="checkbox"]'),
                            o = t.closest(".table-wrap"), a = (0, i.jTool)(".table-div", o),
                            r = (0, i.jTool)("[grid-manager]", o), l = s.default.getSettings(r),
                            u = (0, i.jTool)('thead[grid-manager-thead] th[th-name="' + e + '"]', r);
                        if (t.hasClass("no-click")) return !1;
                        t.closest(".config-list").find(".no-click").removeClass("no-click");
                        var d = !n.prop("checked");
                        a.addClass("config-editing"), i.Base.setAreVisible(u, d, function () {
                            a.removeClass("config-editing")
                        });
                        var f = (0, i.jTool)('.config-area input[type="checkbox"]:checked', o);
                        1 === f.length && f.parent().addClass("no-click"), l.supportAdjust && c.default.resetAdjust(r), (0, i.jTool)(".sa-inner", o).width("100%");
                        var h = (0, i.jTool)('thead[grid-manager-thead] th[th-visible="visible"]', r);
                        i.jTool.each(h, function (t, e) {
                            "true" === e.getAttribute("gm-create") ? e.style.width = "50px" : e.style.width = "auto"
                        }), i.jTool.each(h, function (t, e) {
                            var n = i.Base.getTextWidth(e), o = (0, i.jTool)(e).width();
                            o < n ? (0, i.jTool)(e).width(n) : (0, i.jTool)(e).width(o)
                        }), s.default.update(r, l);
                        var g = (0, i.jTool)("thead[" + i.Base.getSetTopAttr() + "]", r);
                        1 === g.length && (g.remove(), a.trigger("scroll"))
                    })
                }
            }, {
                key: "toggle", value: function (t) {
                    var e = (0, i.jTool)("table[grid-manager]", t), n = s.default.getSettings(e),
                        o = (0, i.jTool)(".config-area", t);
                    if ("block" === o.css("display")) return o.hide(), !1;
                    var a = null, r = null, l = 0;
                    i.jTool.each(n.columnMap, function (t, e) {
                        if (a = (0, i.jTool)('li[th-name="' + e.key + '"]', o), r = (0, i.jTool)('input[type="checkbox"]', a), e.isShow) return a.addClass("checked-li"), r.prop("checked", !0), void l++;
                        a.removeClass("checked-li"), r.prop("checked", !1)
                    });
                    var u = (0, i.jTool)(".checked-li", o);
                    1 === l ? u.addClass("no-click") : u.removeClass("no-click"), o.show()
                }
            }, {
                key: "destroy", value: function (t) {
                    var e = t.closest("div.table-wrap");
                    (0, i.jTool)(".config-action", e).unbind("click"), (0, i.jTool)(".config-list li", e).unbind("click")
                }
            }, {
                key: "html", get: function () {
                    return '<div class="config-area">\n\t\t\t\t\t\t<span class="config-action">\n\t\t\t\t\t\t\t<i class="iconfont icon-close"></i>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t<ul class="config-list"></ul>\n\t\t\t\t\t</div>'
                }
            }]), t
        }();
        e.default = new d
    }, function (t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {default: t}
        }

        function a(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(e, "__esModule", {value: !0});
        var r = function () {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var o = e[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                }
            }

            return function (e, n, o) {
                return n && t(e.prototype, n), o && t(e, o), e
            }
        }(), i = n(0), l = n(3), s = o(l), u = n(1), c = o(u), d = function () {
            function t() {
                a(this, t)
            }

            return r(t, [{
                key: "getHref", value: function (t) {
                    return this.URI + window.btoa(unescape(encodeURIComponent(t || "")))
                }
            }, {
                key: "getDownload", value: function (t, e) {
                    return e || (e = c.default.getSettings(t).gridManagerName), e + ".xls"
                }
            }, {
                key: "createExportHTML", value: function (t, e) {
                    return '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">\n\t\t\t\t\t\t\t\t<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head>\n\t\t\t\t\t\t\t\t<body>\n\t\t\t\t\t\t\t\t\t<table>\n\t\t\t\t\t\t\t\t\t\t<thead>\n\t\t\t\t\t\t\t\t\t\t\t' + t + "\n\t\t\t\t\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t\t\t\t" + e + "\n\t\t\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t\t</body>\n\t\t\t\t\t\t\t</html>"
                }
            }, {
                key: "__exportGridToXls", value: function (t, e, n) {
                    var o = (0, i.$)("#gm-export-action");
                    if (0 === o.length) return s.default.outLog("导出失败，请查看配置项:supportExport是否配置正确", "error"), !1;
                    var a = "", r = "",
                        l = (0, i.$)('thead[grid-manager-thead] th[th-visible="visible"][gm-create="false"]', t),
                        u = null, c = null;
                    u = n ? (0, i.$)('tbody tr[checked="true"]', t) : (0, i.$)("tbody tr", t), i.$.each(l, function (t, e) {
                        a += "<th>" + e.getElementsByClassName("th-text")[0].textContent + "</th>"
                    }), i.$.each(u, function (t, e) {
                        c = (0, i.$)('td[gm-create="false"][td-visible="visible"]', e), r += "<tr>", i.$.each(c, function (t, e) {
                            r += "<td>" + e.textContent + "</td>"
                        }), r += "</tr>"
                    });
                    var d = this.createExportHTML(a, r);
                    return o.prop("href", this.getHref(d)), o.prop("download", this.getDownload(t, e)), o.get(0).click(), !0
                }
            }, {
                key: "html", get: function () {
                    return '<a href="" download="" id="gm-export-action"></a>'
                }
            }, {
                key: "URI", get: function () {
                    return "data:application/vnd.ms-excel;base64,"
                }
            }]), t
        }();
        e.default = new d
    }, function (t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {default: t}
        }

        function a(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(e, "__esModule", {value: !0});
        var r = function () {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var o = e[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                }
            }

            return function (e, n, o) {
                return n && t(e.prototype, n), o && t(e, o), e
            }
        }();
        n(22);
        var i = n(0), l = n(2), s = o(l), u = n(5), c = o(u), d = n(1), f = o(d), h = n(6), g = o(h), p = n(7),
            v = o(p), y = n(3), m = o(y), b = n(16), T = o(b), j = n(8), w = o(j), k = n(10), x = o(k), M = n(12),
            S = o(M), D = n(18), _ = o(D), C = n(13), O = o(C), E = n(17), L = o(E), P = function () {
                function t() {
                    a(this, t)
                }

                return r(t, [{
                    key: "init", value: function (t, e, n) {
                        var o = (0, i.jTool)(t);
                        if (!e || i.jTool.isEmptyObject(e)) return void i.Base.outLog("init()方法中未发现有效的参数", "error");
                        if (!e.columnData || 0 === e.columnData.length) return void i.Base.outLog("请对参数columnData进行有效的配置", "error");
                        "string" != typeof e.gridManagerName || "" === e.gridManagerName.trim() ? e.gridManagerName = i.Base.getKey(o) : o.attr("grid-manager", e.gridManagerName), f.default.cleanTableCacheForVersion();
                        var a = f.default.initSettings(o, e);
                        return "" === a.gridManagerName.trim() ? void i.Base.outLog("请在html标签中为属性[grid-manager]赋值或在配置项中配置gridManagerName", "error") : o.hasClass("GridManager-ready") || o.hasClass("GridManager-loading") ? void i.Base.outLog("渲染失败,可能该表格已经渲染或正在渲染", "error") : (o.addClass("GridManager-loading"), this.initTable(o, a), void 0 !== o.attr("grid-manager-cache-error") && window.setTimeout(function () {
                            f.default.saveUserMemory(o, a), o.removeAttr("grid-manager-cache-error")
                        }, 1e3), void ("function" == typeof n && n(a.query)))
                    }
                }, {
                    key: "initTable", value: function (t, e) {
                        m.default.createDOM(t), e.supportAdjust && s.default.resetAdjust(t), e.supportAdjust && s.default.init(t), e.supportDrag && T.default.init(t), e.supportSorting && O.default.init(t), e.supportRemind && S.default.init(t), e.supportConfig && v.default.init(t), L.default.onTbodyHover(t), _.default.init(t), e.supportMenu && x.default.init(t), e.firstLoading ? m.default.refresh(t) : m.default.insertEmptyTemplate(t, e)
                    }
                }], [{
                    key: "get", value: function (t) {
                        return f.default.getSettings((0, i.jTool)(t))
                    }
                }, {
                    key: "setScope", value: function (t, e) {
                        return f.default.setScope((0, i.jTool)(t), e)
                    }
                }, {
                    key: "getLocalStorage", value: function (t) {
                        return f.default.getUserMemory((0, i.jTool)(t))
                    }
                }, {
                    key: "clear", value: function (t) {
                        return f.default.delUserMemory((0, i.jTool)(t), "通过clear()方法清除")
                    }
                }, {
                    key: "getRowData", value: function (t, e) {
                        return f.default.getRowData((0, i.jTool)(t), e)
                    }
                }, {
                    key: "setSort", value: function (t, e, n, o) {
                        O.default.__setSort((0, i.jTool)(t), e, n, o)
                    }
                }, {
                    key: "showTh", value: function (t, e) {
                        i.Base.setAreVisible((0, i.jTool)(e), !0), f.default.update((0, i.jTool)(t))
                    }
                }, {
                    key: "hideTh", value: function (t, e) {
                        i.Base.setAreVisible((0, i.jTool)(e), !1), f.default.update((0, i.jTool)(t))
                    }
                }, {
                    key: "exportGridToXls", value: function (t, e, n) {
                        return w.default.__exportGridToXls((0, i.jTool)(t), e, n)
                    }
                }, {
                    key: "setQuery", value: function (t, e, n, o) {
                        var a = (0, i.jTool)(t), r = f.default.getSettings(a);
                        "boolean" != typeof n && (o = n, n = !0), i.jTool.extend(r, {query: e}), n && (r.pageData.cPage = 1), f.default.setSettings(a, r), m.default.refresh(a, o)
                    }
                }, {
                    key: "setAjaxData", value: function (t, e) {
                        var n = (0, i.jTool)(t), o = f.default.getSettings(n);
                        i.jTool.extend(o, {ajax_data: e}), f.default.setSettings(n, o), m.default.refresh(n)
                    }
                }, {
                    key: "refreshGrid", value: function (t, e, n) {
                        var o = (0, i.jTool)(t), a = f.default.getSettings(o);
                        "boolean" != typeof e && (n = e, e = !1), e && (a.pageData.cPage = 1, f.default.setSettings(o, a)), m.default.refresh(o, n)
                    }
                }, {
                    key: "getCheckedTr", value: function (t) {
                        return t.querySelectorAll('tbody tr[checked="true"]')
                    }
                }, {
                    key: "getCheckedData", value: function (t) {
                        var e = (0, i.jTool)(t);
                        return f.default.getRowData(e, this.getCheckedTr(t))
                    }
                }, {
                    key: "destroy", value: function (t) {
                        var e = (0, i.jTool)(t);
                        s.default.destroy(e), c.default.destroy(e), g.default.destroy(e), v.default.destroy(e), T.default.destroy(e), L.default.destroy(e), x.default.destroy(e), S.default.destroy(e), _.default.destroy(e), O.default.destroy(e), f.default.setSettings(e, {});
                        var n = e.closest(".table-wrap");
                        e.removeClass("GridManager-ready"), e.html(""), n.after(e), n.remove()
                    }
                }, {
                    key: "version", get: function () {
                        return f.default.getVersion()
                    }
                }]), t
            }();
        e.default = P
    }, function (t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {default: t}
        }

        function a(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(e, "__esModule", {value: !0});
        var r = function () {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(), i = n(0), l = n(1), s = o(l), u = n(4), c = o(u), d = n(8), f = o(d), h = n(5), g = o(h), p = n(7),
            v = o(p), y = function () {
                function t() {
                    a(this, t)
                }

                return r(t, [{
                    key: "init", value: function (t) {
                        var e = s.default.getSettings(t);
                        this.createMenuDOM(e), this.bindRightMenuEvent(t, e)
                    }
                }, {
                    key: "createMenuDOM", value: function (t) {
                        var e = '<div class="grid-menu" ' + this.keyName + '="' + t.gridManagerName + '">';
                        t.supportAjaxPage && (e += '<span grid-action="refresh-page" refresh-type="previous">\n\t\t\t\t\t\t\t' + c.default.i18nText(t, "previous-page") + '\n\t\t\t\t\t\t\t<i class="iconfont icon-up"></i>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t<span grid-action="refresh-page" refresh-type="next">\n\t\t\t\t\t\t\t' + c.default.i18nText(t, "next-page") + '\n\t\t\t\t\t\t\t<i class="iconfont icon-down"></i>\n\t\t\t\t\t\t</span>'), e += '<span grid-action="refresh-page" refresh-type="refresh">\n\t\t\t\t\t\t' + c.default.i18nText(t, "refresh") + '\n\t\t\t\t\t\t<i class="iconfont icon-refresh"></i>\n\t\t\t\t\t</span>', t.supportExport && (e += '<span class="grid-line"></span>\n\t\t\t\t\t\t<span grid-action="export-excel" only-checked="false">\n\t\t\t\t\t\t\t' + c.default.i18nText(t, "save-as-excel") + '\n\t\t\t\t\t\t\t<i class="iconfont icon-xls"></i>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t<span grid-action="export-excel" only-checked="true">\n\t\t\t\t\t\t\t' + c.default.i18nText(t, "save-as-excel-for-checked") + '\n\t\t\t\t\t\t\t<i class="iconfont icon-xls"></i>\n\t\t\t\t\t\t</span>'), t.supportConfig && (e += '<span class="grid-line"></span>\n\t\t\t\t\t\t<span grid-action="config-grid">\n\t\t\t\t\t\t\t' + c.default.i18nText(t, "config-grid") + '\n\t\t\t\t\t\t\t<i class="iconfont icon-config"></i>\n\t\t\t\t\t\t</span>'), e += "</div>", (0, i.jTool)("body").append(e)
                    }
                }, {
                    key: "bindRightMenuEvent", value: function (t, e) {
                        var n = this, o = t.closest(".table-wrap"),
                            a = (0, i.jTool)(".grid-menu[" + n.keyName + '="' + e.gridManagerName + '"]'),
                            r = (0, i.jTool)("body");
                        o.unbind("contextmenu"), o.bind("contextmenu", function (t) {
                            if (t.preventDefault(), t.stopPropagation(), "TBODY" !== t.target.nodeName && 0 === (0, i.jTool)(t.target).closest("tbody").length) return void console.log("contextmenu    !TBODY");
                            var l = (0, i.jTool)('[grid-action="export-excel"][only-checked="true"]');
                            0 === (0, i.jTool)('tbody tr[checked="true"]', (0, i.jTool)('table[grid-manager="' + e.gridManagerName + '"]')).length ? l.addClass("disabled") : l.removeClass("disabled");
                            var s = a.width(), u = a.height(), c = document.documentElement.offsetHeight,
                                d = document.documentElement.offsetWidth, f = c < t.clientY + u ? t.clientY - u : t.clientY,
                                h = d < t.clientX + s ? t.clientX - s : t.clientX;
                            a.css({
                                top: f + o.get(0).scrollTop + (document.body.scrollTop || document.documentElement.scrollTop),
                                left: h + o.get(0).scrollLeft + (document.body.scrollLeft || document.documentElement.scrollLeft)
                            }), (0, i.jTool)(".grid-menu[" + n.keyName + "]").hide(), a.show(), r.off("mousedown.gridMenu"), r.on("mousedown.gridMenu", function (t) {
                                var e = (0, i.jTool)(t.target);
                                e.hasClass(".grid-menu") || 1 === e.closest(".grid-menu").length || (r.off("mousedown.gridMenu"), a.hide())
                            })
                        });
                        var l = (0, i.jTool)('[grid-action="refresh-page"]');
                        l.unbind("click"), l.bind("click", function (t) {
                            if (n.isDisabled(this, t)) return !1;
                            var e = (0, i.jTool)(this).closest(".grid-menu"),
                                o = (0, i.jTool)('table[grid-manager="' + e.attr(n.keyName) + '"]'),
                                a = this.getAttribute("refresh-type"), l = s.default.getSettings(o), u = l.pageData.cPage;
                            "previous" === a && l.pageData.cPage > 1 ? u = l.pageData.cPage - 1 : "next" === a && l.pageData.cPage < l.pageData.tPage ? u = l.pageData.cPage + 1 : "refresh" === a && (u = l.pageData.cPage), g.default.gotoPage(o, l, u), r.off("mousedown.gridMenu"), e.hide()
                        }), e.supportExport && function () {
                            var t = (0, i.jTool)('[grid-action="export-excel"]');
                            t.unbind("click"), t.bind("click", function (t) {
                                if (n.isDisabled(this, t)) return !1;
                                var e = (0, i.jTool)(this).closest(".grid-menu"),
                                    o = (0, i.jTool)('table[grid-manager="' + e.attr(n.keyName) + '"]'), a = !1;
                                "true" === this.getAttribute("only-checked") && (a = !0), f.default.__exportGridToXls(o, void 0, a), r.off("mousedown.gridMenu"), e.hide()
                            })
                        }(), e.supportConfig && function () {
                            var t = (0, i.jTool)('[grid-action="config-grid"]');
                            t.unbind("click"), t.bind("click", function (t) {
                                if (n.isDisabled(this, t)) return !1;
                                var e = (0, i.jTool)(this).closest(".grid-menu"),
                                    o = (0, i.jTool)('table[grid-manager="' + e.attr(n.keyName) + '"]');
                                v.default.toggle(o.closest(".table-wrap")), r.off("mousedown.gridMenu"), e.hide()
                            })
                        }()
                    }
                }, {
                    key: "updateMenuPageStatus", value: function (t, e) {
                        var n = (0, i.jTool)(".grid-menu[" + this.keyName + '="' + t + '"]');
                        if (n && 0 !== n.length) {
                            var o = (0, i.jTool)('[refresh-type="previous"]', n),
                                a = (0, i.jTool)('[refresh-type="next"]', n);
                            1 === e.cPage || 0 === e.tPage ? o.addClass("disabled") : o.removeClass("disabled"), e.cPage === e.tPage || 0 === e.tPage ? a.addClass("disabled") : a.removeClass("disabled")
                        }
                    }
                }, {
                    key: "isDisabled", value: function (t, e) {
                        return !!(0, i.jTool)(t).hasClass("disabled") && (e.stopPropagation(), e.preventDefault(), !0)
                    }
                }, {
                    key: "destroy", value: function (t) {
                        var e = t.closest(".table-wrap"), n = s.default.getSettings(t),
                            o = (0, i.jTool)(".grid-menu[" + this.keyName + '="' + n.gridManagerName + '"]'),
                            a = (0, i.jTool)("body");
                        e.unbind("contextmenu"), (0, i.jTool)('[grid-action="refresh-page"]').unbind("click"), (0, i.jTool)('[grid-action="export-excel"]').unbind("click"), (0, i.jTool)('[grid-action="config-grid"]').unbind("click"), a.off("mousedown.gridMenu"), o.remove()
                    }
                }, {
                    key: "keyName", get: function () {
                        return "grid-master"
                    }
                }]), t
            }();
        e.default = new y
    }, function (t, e, n) {
        "use strict";

        function o(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(e, "__esModule", {value: !0});
        var a = function () {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var o = e[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                }
            }

            return function (e, n, o) {
                return n && t(e.prototype, n), o && t(e, o), e
            }
        }(), r = n(4), i = function (t) {
            return t && t.__esModule ? t : {default: t}
        }(r), l = function () {
            function t() {
                o(this, t)
            }

            return a(t, [{
                key: "getThString", value: function (t, e) {
                    return '<th th-name="' + this.key + '" th-visible="' + e + '" gm-order="true" gm-create="true">' + i.default.i18nText(t, "order-text") + "</th>"
                }
            }, {
                key: "getColumn", value: function (t) {
                    return {
                        key: this.key,
                        text: i.default.getText(t, "order-text"),
                        isAutoCreate: !0,
                        isShow: !0,
                        width: "50px",
                        align: "center",
                        template: function (t) {
                            return '<td gm-order="true" gm-create="true">' + t + "</td>"
                        }
                    }
                }
            }, {
                key: "key", get: function () {
                    return "gm_order"
                }
            }]), t
        }();
        e.default = new l
    }, function (t, e, n) {
        "use strict";

        function o(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(e, "__esModule", {value: !0});
        var a = function () {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var o = e[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                }
            }

            return function (e, n, o) {
                return n && t(e.prototype, n), o && t(e, o), e
            }
        }(), r = n(0), i = function () {
            function t() {
                o(this, t)
            }

            return a(t, [{
                key: "init", value: function (t) {
                    this.__bindRemindEvent(t)
                }
            }, {
                key: "__bindRemindEvent", value: function (t) {
                    var e = (0, r.$)(".remind-action", t);
                    e.unbind("mouseenter"), e.bind("mouseenter", function () {
                        var t = (0, r.$)(this).find(".ra-area"), e = (0, r.$)(this).closest(".table-div");
                        t.show();
                        var n = e.get(0).offsetWidth - ((0, r.$)(this).offset().left - e.offset().left) > t.get(0).offsetWidth;
                        t.css({left: n ? "0px" : "auto", right: n ? "auto" : "0px"})
                    }), e.unbind("mouseleave"), e.bind("mouseleave", function () {
                        (0, r.$)(this).find(".ra-area").hide()
                    })
                }
            }, {
                key: "destroy", value: function (t) {
                    var e = (0, r.$)(".remind-action", t);
                    e.unbind("mouseenter"), e.unbind("mouseleave")
                }
            }, {
                key: "html", get: function () {
                    return '<div class="remind-action">\n\t\t\t\t\t\t<i class="ra-help iconfont icon-help"></i>\n\t\t\t\t\t\t<div class="ra-area">\n\t\t\t\t\t\t\t<span class="ra-title"></span>\n\t\t\t\t\t\t\t<span class="ra-con"></span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>'
                }
            }]), t
        }();
        e.default = new i
    }, function (t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {default: t}
        }

        function a(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(e, "__esModule", {value: !0});
        var r = function () {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var o = e[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                }
            }

            return function (e, n, o) {
                return n && t(e.prototype, n), o && t(e, o), e
            }
        }(), i = n(0), l = n(3), s = o(l), u = n(1), c = o(u), d = function () {
            function t() {
                a(this, t)
            }

            return r(t, [{
                key: "init", value: function (t) {
                    this.__bindSortingEvent(t)
                }
            }, {
                key: "__setSort", value: function (t, e, n, o) {
                    var a = this, r = c.default.getSettings(t);
                    if (!e || "object" !== i.$.type(e) || i.$.isEmptyObject(e)) return i.Base.outLog("排序数据不可用", "warn"), !1;
                    i.$.extend(r.sortData, e), c.default.setSettings(t, r), "function" != typeof n && (n = function () {
                    }), void 0 === o && (o = !0), o ? s.default.refresh(t, function () {
                        a.updateSortStyle(t), n()
                    }) : n()
                }
            }, {
                key: "__bindSortingEvent", value: function (t) {
                    var e = this;
                    t.off("mouseup", ".sorting-action"), t.on("mouseup", ".sorting-action", function () {
                        var t = (0, i.$)(this), n = t.closest("th"), o = n.closest("table"), a = n.attr("th-name"),
                            r = c.default.getSettings(o);
                        if (!a || "" === i.$.trim(a)) return i.Base.outLog("排序必要的参数丢失", "error"), !1;
                        var l = r.sortData[n.attr("th-name")];
                        r.isCombSorting || (r.sortData = {}), r.sortData[n.attr("th-name")] = l === r.sortDownText ? r.sortUpText : r.sortDownText, c.default.setSettings(o, r);
                        var u = i.$.extend({}, r.query, r.sortData, r.pageData);
                        r.sortingBefore(u), s.default.refresh(o, function () {
                            e.updateSortStyle(o), r.sortingAfter(u, n)
                        })
                    })
                }
            }, {
                key: "updateSortStyle", value: function (t) {
                    var e = c.default.getSettings(t), n = null, o = null;
                    i.$.each((0, i.$)(".sorting-action", t), function (t, e) {
                        (0, i.$)(e).removeClass("sorting-up sorting-down"), (0, i.$)(e).closest("th").attr("sorting", "")
                    }), i.$.each(e.sortData, function (a, r) {
                        n = (0, i.$)('thead th[th-name="' + a + '"]', t), o = (0, i.$)(".sorting-action", n), r === e.sortUpText && (o.addClass("sorting-up"), o.removeClass("sorting-down"), n.attr("sorting", e.sortUpText)), r === e.sortDownText && (o.addClass("sorting-down"), o.removeClass("sorting-up"), n.attr("sorting", e.sortDownText))
                    })
                }
            }, {
                key: "destroy", value: function (t) {
                    t.off("mouseup", ".sorting-action")
                }
            }, {
                key: "html", get: function () {
                    return '<div class="sorting-action">\n\t\t\t\t\t\t<i class="sa-icon sa-up iconfont icon-up"></i>\n\t\t\t\t\t\t<i class="sa-icon sa-down iconfont icon-down"></i>\n\t\t\t\t\t</div>'
                }
            }]), t
        }();
        e.default = new d
    }, function (t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        e.GM_VERSION = "2.5.8", e.GM_PUBLISH_METHOD_LIST = ["init", "get", "version", "getLocalStorage", "clear", "getRowData", "setSort", "showTh", "hideTh", "exportGridToXls", "setQuery", "setAjaxData", "refreshGrid", "getCheckedTr", "getCheckedData", "destroy"]
    }, function (t, e, n) {
        "use strict";

        function o(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(e, "__esModule", {value: !0}), e.publishMethodArray = e.PublishMethod = void 0;
        var a = function () {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var o = e[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                }
            }

            return function (e, n, o) {
                return n && t(e.prototype, n), o && t(e, o), e
            }
        }(), r = n(9), i = function (t) {
            return t && t.__esModule ? t : {default: t}
        }(r), l = n(14), s = function () {
            function t() {
                o(this, t)
            }

            return a(t, [{
                key: "init", value: function (t, e, n) {
                    return (new i.default).init(t, e, n)
                }
            }, {
                key: "version", value: function () {
                    return i.default.version
                }
            }, {
                key: "get", value: function (t) {
                    return i.default.get(t)
                }
            }, {
                key: "getLocalStorage", value: function (t) {
                    return i.default.getLocalStorage(t)
                }
            }, {
                key: "clear", value: function (t) {
                    return i.default.clear(t)
                }
            }, {
                key: "getRowData", value: function (t, e) {
                    return i.default.getRowData(t, e)
                }
            }, {
                key: "setSort", value: function (t, e, n, o) {
                    i.default.setSort(t, e, n, o)
                }
            }, {
                key: "showTh", value: function (t, e) {
                    i.default.showTh(t, e)
                }
            }, {
                key: "hideTh", value: function (t, e) {
                    i.default.hideTh(t, e)
                }
            }, {
                key: "exportGridToXls", value: function (t, e, n) {
                    return i.default.exportGridToXls(t, e, n)
                }
            }, {
                key: "setQuery", value: function (t, e, n, o) {
                    i.default.setQuery(t, e, n, o)
                }
            }, {
                key: "setAjaxData", value: function (t, e) {
                    i.default.setAjaxData(t, e)
                }
            }, {
                key: "refreshGrid", value: function (t, e, n) {
                    i.default.refreshGrid(t, e, n)
                }
            }, {
                key: "getCheckedTr", value: function (t) {
                    return i.default.getCheckedTr(t)
                }
            }, {
                key: "getCheckedData", value: function (t) {
                    return i.default.getCheckedData(t)
                }
            }, {
                key: "destroy", value: function (t) {
                    return i.default.destroy(t)
                }
            }]), t
        }(), u = l.GM_PUBLISH_METHOD_LIST, c = new s;
        e.PublishMethod = c, e.publishMethodArray = u
    }, function (t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {default: t}
        }

        function a(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(e, "__esModule", {value: !0});
        var r = function () {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var o = e[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                }
            }

            return function (e, n, o) {
                return n && t(e.prototype, n), o && t(e, o), e
            }
        }(), i = n(0), l = n(2), s = o(l), u = n(1), c = o(u), d = function () {
            function t() {
                a(this, t)
            }

            return r(t, [{
                key: "init", value: function (t) {
                    this.__bindDragEvent(t)
                }
            }, {
                key: "__bindDragEvent", value: function (t) {
                    var e = this;
                    t.off("mousedown", ".drag-action"), t.on("mousedown", ".drag-action", function (n) {
                        var o = (0, i.jTool)("body"), a = c.default.getSettings(t),
                            r = (0, i.jTool)(this).closest("th"), l = null, u = null, d = r.parent(),
                            f = (0, i.jTool)('th[th-visible="visible"]', d), h = d.closest("table"),
                            g = h.closest(".table-div"), p = h.closest(".table-wrap"), v = i.Base.getColTd(r);
                        a.dragBefore(n), o.addClass("no-select-text"), i.Base.updateInteractive(h, "Drag"), r.addClass("drag-ongoing opacityChange"), v.addClass("drag-ongoing opacityChange"), p.append('<div class="dreamland-div"></div>');
                        var y = (0, i.jTool)(".dreamland-div", p);
                        y.get(0).innerHTML = '<table class="dreamland-table ' + h.attr("class") + '"></table>';
                        var m = "", b = null, T = null;
                        i.jTool.each(v, function (t, e) {
                            T = e.cloneNode(!0), T.style.height = e.offsetHeight + "px", b = (0, i.jTool)(e).closest("tr").clone(), m += b.html(T.outerHTML).get(0).outerHTML
                        });
                        var j = '<thead>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<th style="height:' + r.height() + 'px">\n\t\t\t\t\t\t\t\t' + (0, i.jTool)(".drag-action", r).get(0).outerHTML + "\n\t\t\t\t\t\t\t\t</th>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t" + m + "\n\t\t\t\t\t\t\t</tbody>";
                        (0, i.jTool)(".dreamland-table", y).html(j);
                        var w = 0;
                        o.unbind("mousemove"), o.bind("mousemove", function (t) {
                            w = r.index(f), l = void 0, w > 0 && (l = f.eq(w - 1)), u = void 0, w < f.length && (u = f.eq(w + 1)), l && 0 !== l.length && "true" === l.attr("gm-create") ? l = void 0 : u && 0 !== u.length && "true" === u.attr("gm-create") && (u = void 0), y.show(), y.css({
                                width: r.get(0).offsetWidth,
                                height: h.get(0).offsetHeight,
                                left: t.clientX - p.offset().left + window.pageXOffset - r.get(0).offsetWidth / 2,
                                top: t.clientY - p.offset().top + window.pageYOffset - y.find("th").get(0).offsetHeight / 2
                            });
                            var n = !1;
                            1 === r.closest("thead[" + i.Base.getSetTopAttr() + "]").length && (n = !0), e.updateDrag(h, l, u, r, v, y, n), f = (0, i.jTool)('th[th-visible="visible"]', d)
                        }), o.unbind("mouseup"), o.bind("mouseup", function (e) {
                            var n = c.default.getSettings(t);
                            o.unbind("mousemove"), o.unbind("mouseup"), y = (0, i.jTool)(".dreamland-div"), 0 !== y.length && y.animate({
                                top: h.get(0).offsetTop + "px",
                                left: r.get(0).offsetLeft - g.get(0).scrollLeft + "px"
                            }, n.animateTime, function () {
                                r.removeClass("drag-ongoing"), v.removeClass("drag-ongoing"), y.remove(), n.dragAfter(e)
                            }), c.default.update(t, n), n.supportAdjust && s.default.resetAdjust(h), o.removeClass("no-select-text"), i.Base.updateInteractive(h)
                        })
                    })
                }
            }, {
                key: "updateDrag", value: function (t, e, n, o, a, r, l) {
                    var s = null, u = null;
                    if (e && 0 !== e.length && r.offset().left < e.offset().left) {
                        if (s = i.Base.getColTd(e), e.before(o), i.jTool.each(a, function (t, e) {
                            s.eq(t).before(e)
                        }), l) {
                            var c = (0, i.jTool)('thead[grid-manager-thead] th[th-name="' + e.attr("th-name") + '"]', t),
                                d = (0, i.jTool)('thead[grid-manager-thead] th[th-name="' + o.attr("th-name") + '"]', t);
                            c.before(d)
                        }
                    } else if (n && 0 !== n.length && r.offset().left + r.width() > n.offset().left && (u = i.Base.getColTd(n), n.after(o), i.jTool.each(a, function (t, e) {
                        u.eq(t).after(e)
                    }), l)) {
                        var f = (0, i.jTool)('thead[grid-manager-thead] th[th-name="' + n.attr("th-name") + '"]', t),
                            h = (0, i.jTool)('thead[grid-manager-thead] th[th-name="' + o.attr("th-name") + '"]', t);
                        f.after(h)
                    }
                }
            }, {
                key: "destroy", value: function (t) {
                    var e = (0, i.jTool)("body");
                    t.off("mousedown", ".drag-action"), e.unbind("mousemove"), e.unbind("mouseup")
                }
            }]), t
        }();
        e.default = new d
    }, function (t, e, n) {
        "use strict";

        function o(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(e, "__esModule", {value: !0});
        var a = function () {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var o = e[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                }
            }

            return function (e, n, o) {
                return n && t(e.prototype, n), o && t(e, o), e
            }
        }(), r = n(0), i = function () {
            function t() {
                o(this, t)
            }

            return a(t, [{
                key: "onTbodyHover", value: function (t) {
                    var e = this;
                    t.off("mousemove", "td"), t.on("mousemove", "td", function () {
                        e.updateHover(this)
                    })
                }
            }, {
                key: "updateHover", value: function (t) {
                    var e = (0, r.$)(t), n = e.parent(), o = e.closest("table[grid-manager]");
                    "true" === e.attr("col-hover") && "true" === n.attr("row-hover") || ("true" !== n.attr("row-hover") && ((0, r.$)('tr[row-hover="true"]', o).removeAttr("row-hover"), n.attr("row-hover", "true")), "true" !== e.attr("col-hover") && ((0, r.$)('td[col-hover="true"]', o).removeAttr("col-hover"), r.Base.getColTd(e).attr("col-hover", "true")))
                }
            }, {
                key: "destroy", value: function (t) {
                    t.off("mousemove", "td")
                }
            }]), t
        }();
        e.default = new i
    }, function (t, e, n) {
        "use strict";

        function o(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(e, "__esModule", {value: !0});
        var a = function () {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var o = e[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                }
            }

            return function (e, n, o) {
                return n && t(e.prototype, n), o && t(e, o), e
            }
        }(), r = n(0), i = n(1), l = function (t) {
            return t && t.__esModule ? t : {default: t}
        }(i), s = function () {
            function t() {
                o(this, t)
            }

            return a(t, [{
                key: "init", value: function (t) {
                    this.bindResizeToTable(t), this.bindScrollToTableDiv(t)
                }
            }, {
                key: "bindResizeToTable", value: function (t) {
                    var e = l.default.getSettings(t);
                    (0, r.jTool)(window).bind("resize." + e.gridManagerName, function () {
                        var e = (0, r.jTool)("thead[" + r.Base.getSetTopAttr() + "]", t);
                        e && 1 === e.length && (e.remove(), t.closest(".table-div").trigger("scroll"))
                    })
                }
            }, {
                key: "bindScrollToTableDiv", value: function (t) {
                    var e = t.closest(".table-div");
                    e.unbind("scroll"), e.bind("scroll", function (e, n) {
                        var o = (0, r.jTool)(this).scrollTop(), a = (0, r.jTool)("thead[grid-manager-thead]", t),
                            i = (0, r.jTool)("tbody", t), l = (0, r.jTool)("thead[" + r.Base.getSetTopAttr() + "]", t);
                        return 0 === (0, r.jTool)("tr", i).length || ((0 === l.length || n) && (0 === l.length && t.append(a.clone(!0).attr(r.Base.getSetTopAttr(), "")), l = (0, r.jTool)("thead[" + r.Base.getSetTopAttr() + "]", t), l.removeAttr("grid-manager-thead"), l.removeClass("scrolling"), l.css({
                            width: a.width(),
                            left: -t.closest(".table-div").scrollLeft() + "px"
                        }), r.jTool.each((0, r.jTool)("th", a), function (t, e) {
                            (0, r.jTool)("th", l).eq(t).width((0, r.jTool)(e).width())
                        })), 0 !== l.length ? (0 === o ? (a.removeClass("scrolling"), l.remove()) : (a.addClass("scrolling"), l.css({left: -t.closest(".table-div").scrollLeft() + "px"})), !0) : void 0)
                    })
                }
            }, {
                key: "destroy", value: function (t) {
                    var e = t.closest(".table-div"), n = l.default.getSettings(t);
                    (0, r.jTool)(window).unbind("resize." + n.gridManagerName), e.unbind("scroll")
                }
            }]), t
        }();
        e.default = new s
    }, function (t, e, n) {
        "use strict";

        function o(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(e, "__esModule", {value: !0}), e.TextSettings = e.Settings = void 0;
        var a = Object.assign || function (t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o])
            }
            return t
        }, r = n(0), i = function t() {
            o(this, t);
            var e = {supportDrag: !0, dragBefore: r.$.noop, dragAfter: r.$.noop},
                n = {supportAdjust: !0, adjustBefore: r.$.noop, adjustAfter: r.$.noop}, i = {supportMenu: !0},
                l = {supportRemind: !1}, s = {supportConfig: !0},
                u = {width: "100%", height: "300px", animateTime: 300}, c = {disableCache: !1}, d = {
                    supportSorting: !1,
                    isCombSorting: !1,
                    sortKey: "sort_",
                    sortData: {},
                    sortUpText: "ASC",
                    sortDownText: "DESC",
                    sortingBefore: r.$.noop,
                    sortingAfter: r.$.noop
                }, f = {
                    supportAjaxPage: !1,
                    sizeData: [10, 20, 30, 50, 100],
                    pageSize: 20,
                    pageData: {},
                    query: {},
                    pagingBefore: r.$.noop,
                    pagingAfter: r.$.noop
                }, h = {supportAutoOrder: !0}, g = {supportCheckbox: !0}, p = {i18n: "zh-cn"}, v = {
                    columnData: [],
                    gridManagerName: "",
                    ajax_url: "",
                    firstLoading: !0,
                    ajax_type: "GET",
                    ajax_headers: {},
                    ajax_xhrFields: {},
                    ajax_beforeSend: r.$.noop,
                    ajax_success: r.$.noop,
                    ajax_complete: r.$.noop,
                    ajax_error: r.$.noop,
                    ajax_data: void 0,
                    requestHandler: r.$.noop,
                    responseHandler: r.$.noop,
                    dataKey: "data",
                    totalsKey: "totals",
                    emptyTemplate: '<div class="gm-emptyTemplate">暂无数据</div>'
                }, y = {supportExport: !0}, m = a({}, e, n, i, l, s, u, c, d, f, h, g, p, v, y);
            r.$.extend(!0, this, m)
        }, l = function t() {
            o(this, t), this["order-text"] = {
                "zh-cn": "序号",
                "zh-tw": "序號",
                "en-us": "order"
            }, this["first-page"] = {
                "zh-cn": "首页",
                "zh-tw": "首頁",
                "en-us": "first"
            }, this["previous-page"] = {
                "zh-cn": "上一页",
                "zh-tw": "上一頁",
                "en-us": "previous"
            }, this["next-page"] = {
                "zh-cn": "下一页",
                "zh-tw": "下一頁",
                "en-us": "next"
            }, this["last-page"] = {
                "zh-cn": "尾页",
                "zh-tw": "尾頁",
                "en-us": "last"
            }, this.dataTablesInfo = {
                "zh-cn": "此页显示 {0}-{1} 共{2}条",
                "zh-tw": "此頁顯示 {0}-{1} 共{2}條",
                "en-us": "this page show {0}-{1} count {2}"
            }, this["goto-first-text"] = {
                "zh-cn": "跳转至",
                "zh-tw": "跳轉至",
                "en-us": "goto"
            }, this["goto-last-text"] = {
                "zh-cn": "页",
                "zh-tw": "頁",
                "en-us": "page"
            }, this.refresh = {
                "zh-cn": "重新加载",
                "zh-tw": "重新加載",
                "en-us": "Refresh"
            }, this["save-as-excel"] = {
                "zh-cn": "另存为Excel",
                "zh-tw": "另存為Excel",
                "en-us": "Save as Excel"
            }, this["save-as-excel-for-checked"] = {
                "zh-cn": "已选中项另存为Excel",
                "zh-tw": "已選中項另存為Excel",
                "en-us": "Save selected as Excel"
            }, this["config-grid"] = {
                "zh-cn": "配置表",
                "zh-tw": "配置表",
                "en-us": "Setting Grid"
            }, this["checkall-text"] = {"zh-cn": "全选", "zh-tw": "全選", "en-us": "All"}
        };
        e.Settings = i, e.TextSettings = l
    }, function (t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        var o = n(14), a = {version: o.GM_VERSION, scope: {}, responseData: {}, originalTh: {}, settings: {}};
        e.default = a
    }, function (t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        var o = n(0), a = n(9), r = function (t) {
            return t && t.__esModule ? t : {default: t}
        }(a), i = n(15);
        !function (t) {
            Element.prototype.GM = Element.prototype.GridManager = function () {
                if ("TABLE" !== this.nodeName) return void o.Base.outLog("不支持对非table标签实例化", "error");
                var e = null, n = null, a = null, l = null;
                if (0 === arguments.length ? (e = "init", n = {}, a = void 0) : "string" !== t.type(arguments[0]) ? (e = "init", n = arguments[0], a = arguments[1]) : (e = arguments[0], n = arguments[1], a = arguments[2], l = arguments[3]), -1 === i.publishMethodArray.indexOf(e)) return void o.Base.outLog("方法调用错误，请确定方法名[" + e + "]是否正确", "error");
                var s = r.default.get(this);
                return "init" === e || s && s.gridManagerName ? i.PublishMethod[e](this, n, a, l) || this : void o.Base.outLog("方法调用错误，请确定表格已实例化", "error")
            }
        }(o.jTool), function () {
            window.GridManager = window.GM = r.default
        }(), function (t) {
            void 0 !== t && t.fn.extend && (t.fn.extend({
                GridManager: function () {
                    return 0 === arguments.length ? this.get(0).GridManager() : 1 === arguments.length ? this.get(0).GridManager(arguments[0]) : 2 === arguments.length ? this.get(0).GridManager(arguments[0], arguments[1]) : 3 === arguments.length ? this.get(0).GridManager(arguments[0], arguments[1], arguments[2]) : void 0
                }
            }), t.fn.extend({GM: t.fn.GridManager}))
        }(window.jQuery), function (t) {
            window.$ = t || void 0
        }(window.jQuery), e.default = r.default
    }, function (t, e) {
    }, function (t, e, n) {
        var o, o;
        !function t(e, n, a) {
            function r(l, s) {
                if (!n[l]) {
                    if (!e[l]) {
                        var u = "function" == typeof o && o;
                        if (!s && u) return o(l, !0);
                        if (i) return i(l, !0);
                        var c = new Error("Cannot find module '" + l + "'");
                        throw c.code = "MODULE_NOT_FOUND", c
                    }
                    var d = n[l] = {exports: {}};
                    e[l][0].call(d.exports, function (t) {
                        return r(e[l][1][t] || t)
                    }, d, d.exports, t, e, n, a)
                }
                return n[l].exports
            }

            for (var i = "function" == typeof o && o, l = 0; l < a.length; l++) r(a[l]);
            return r
        }({
            1: [function (t, e, n) {
                var o = t("./utilities"), a = t("../src/Css"), r = {
                    show: function () {
                        return o.each(this.DOMList, function (t, e) {
                            var n = "", o = ["SPAN", "A", "FONT", "I"];
                            if (-1 !== e.nodeName.indexOf(o)) return e.style.display = "inline-block", this;
                            switch (e.nodeName) {
                                case"TABLE":
                                    n = "table";
                                    break;
                                case"THEAD":
                                    n = "table-header-group";
                                    break;
                                case"TBODY":
                                    n = "table-row-group";
                                    break;
                                case"TR":
                                    n = "table-row";
                                    break;
                                case"TH":
                                case"TD":
                                    n = "table-cell";
                                    break;
                                default:
                                    n = "block"
                            }
                            e.style.display = n
                        }), this
                    }, hide: function () {
                        return o.each(this.DOMList, function (t, e) {
                            e.style.display = "none"
                        }), this
                    }, animate: function (t, e, n) {
                        var r = this, i = "", l = "", s = r.DOMList[0];
                        if (t) {
                            "undefined" === o.type(n) && "function" === o.type(e) && (n = e, e = 0), "undefined" === o.type(n) && (n = o.noop), "undefined" === o.type(e) && (e = 0), o.each(t, function (t, e) {
                                t = o.toHyphen(t), i += t + ":" + o.getStyle(s, t) + ";", l += t + ":" + e + ";"
                            });
                            var u = "@keyframes jToolAnimate {from {" + i + "}to {" + l + "}}",
                                c = document.createElement("style");
                            c.className = "jTool-animate-style", c.type = "text/css", document.head.appendChild(c), c.textContent = c.textContent + u, s.style.animation = "jToolAnimate " + e / 1e3 + "s ease-in-out forwards", window.setTimeout(function () {
                                a.css.call(r, t), s.style.animation = "", document.head.removeChild(c), n()
                            }, e)
                        }
                    }
                };
                e.exports = r
            }, {"../src/Css": 3, "./utilities": 13}], 2: [function (t, e, n) {
                var o = t("./utilities"), a = {
                    addClass: function (t) {
                        return this.changeClass(t, "add")
                    }, removeClass: function (t) {
                        return this.changeClass(t, "remove")
                    }, toggleClass: function (t) {
                        return this.changeClass(t, "toggle")
                    }, hasClass: function (t) {
                        return [].some.call(this.DOMList, function (e) {
                            return e.classList.contains(t)
                        })
                    }, parseClassName: function (t) {
                        return t.indexOf(" ") ? t.split(" ") : [t]
                    }, changeClass: function (t, e) {
                        var n = this.parseClassName(t);
                        return o.each(this.DOMList, function (t, a) {
                            o.each(n, function (t, n) {
                                a.classList[e](n)
                            })
                        }), this
                    }
                };
                e.exports = a
            }, {"./utilities": 13}], 3: [function (t, e, n) {
                var o = t("./utilities"), a = {
                    css: function (t, e) {
                        function n(t, e) {
                            "number" === o.type(e) && (e = e.toString()), -1 !== r.indexOf(t) && -1 === e.indexOf("px") && (e += "px"), o.each(a.DOMList, function (n, o) {
                                o.style[t] = e
                            })
                        }

                        var a = this,
                            r = ["width", "height", "min-width", "max-width", "min-height", "min-height", "top", "left", "right", "bottom", "padding-top", "padding-right", "padding-bottom", "padding-left", "margin-top", "margin-right", "margin-bottom", "margin-left", "border-width", "border-top-width", "border-left-width", "border-right-width", "border-bottom-width"];
                        if ("string" === o.type(t) && !e && 0 !== e) return -1 !== r.indexOf(t) ? parseInt(o.getStyle(this.DOMList[0], t), 10) : o.getStyle(this.DOMList[0], t);
                        if ("object" === o.type(t)) {
                            var i = t;
                            for (var l in i) n(l, i[l])
                        } else n(t, e);
                        return this
                    }, width: function (t) {
                        return this.css("width", t)
                    }, height: function (t) {
                        return this.css("height", t)
                    }
                };
                e.exports = a
            }, {"./utilities": 13}], 4: [function (t, e, n) {
                var o = t("./utilities"), a = {
                    dataKey: "jTool" + o.version, data: function (t, e) {
                        var n = this, a = {};
                        if (void 0 === t && void 0 === e) return n.DOMList[0][n.dataKey];
                        if (void 0 !== e) {
                            var r = o.type(e);
                            return "string" !== r && "number" !== r || n.attr(t, e), o.each(n.DOMList, function (o, r) {
                                a = r[n.dataKey] || {}, a[t] = e, r[n.dataKey] = a
                            }), this
                        }
                        return a = n.DOMList[0][n.dataKey] || {}, this.transformValue(a[t] || n.attr(t))
                    }, removeData: function (t) {
                        var e, n = this;
                        void 0 !== t && (o.each(n.DOMList, function (o, a) {
                            e = a[n.dataKey] || {}, delete e[t]
                        }), n.removeAttr(t))
                    }, attr: function (t, e) {
                        return void 0 === t && void 0 === e ? "" : void 0 !== e ? (o.each(this.DOMList, function (n, o) {
                            o.setAttribute(t, e)
                        }), this) : this.transformValue(this.DOMList[0].getAttribute(t))
                    }, removeAttr: function (t) {
                        void 0 !== t && o.each(this.DOMList, function (e, n) {
                            n.removeAttribute(t)
                        })
                    }, prop: function (t, e) {
                        return void 0 === t && void 0 === e ? "" : void 0 !== e ? (o.each(this.DOMList, function (n, o) {
                            o[t] = e
                        }), this) : this.transformValue(this.DOMList[0][t])
                    }, removeProp: function (t) {
                        void 0 !== t && o.each(this.DOMList, function (e, n) {
                            delete n[t]
                        })
                    }, val: function (t) {
                        return this.prop("value", t) || ""
                    }, transformValue: function (t) {
                        return "null" === o.type(t) && (t = void 0), t
                    }
                };
                e.exports = a
            }, {"./utilities": 13}], 5: [function (t, e, n) {
                var o = t("./utilities"), a = t("./Sizzle"), r = {
                    append: function (t) {
                        return this.html(t, "append")
                    }, prepend: function (t) {
                        return this.html(t, "prepend")
                    }, before: function (t) {
                        t.jTool && (t = t.DOMList[0]);
                        var e = this.DOMList[0];
                        return e.parentNode.insertBefore(t, e), this
                    }, after: function (t) {
                        t.jTool && (t = t.DOMList[0]);
                        var e = this.DOMList[0], n = e.parentNode;
                        n.lastChild == e ? n.appendChild(t) : n.insertBefore(t, e.nextSibling)
                    }, text: function (t) {
                        return void 0 !== t ? (o.each(this.DOMList, function (e, n) {
                            n.textContent = t
                        }), this) : this.DOMList[0].textContent
                    }, html: function (t, e) {
                        if (void 0 === t && void 0 === e) return this.DOMList[0].innerHTML;
                        var n = this, a = o.type(t);
                        t.jTool ? t = t.DOMList : "string" === a ? t = o.createDOM(t || "") : "element" === a && (t = [t]);
                        var r;
                        return o.each(n.DOMList, function (n, a) {
                            e ? "prepend" === e && (r = a.firstChild) : a.innerHTML = "", o.each(t, function (t, e) {
                                e = e.cloneNode(!0), e.nodeType || (e = document.createTextNode(e)), r ? a.insertBefore(e, r) : a.appendChild(e), a.normalize()
                            })
                        }), this
                    }, wrap: function (t) {
                        var e;
                        return o.each(this.DOMList, function (n, o) {
                            e = o.parentNode;
                            var r = new a(t, o.ownerDocument).get(0);
                            e.insertBefore(r, o), r.querySelector(":empty").appendChild(o)
                        }), this
                    }, closest: function (t) {
                        function e() {
                            if (!n || 0 === o.length || 1 !== n.nodeType) return void (n = null);
                            -1 === [].indexOf.call(o, n) && (n = n.parentNode, e())
                        }

                        var n = this.DOMList[0].parentNode;
                        if (void 0 === t) return new a(n);
                        var o = document.querySelectorAll(t);
                        return e(), new a(n)
                    }, parent: function () {
                        return this.closest()
                    }, clone: function (t) {
                        return new a(this.DOMList[0].cloneNode(t || !1))
                    }, remove: function () {
                        o.each(this.DOMList, function (t, e) {
                            e.parentNode.removeChild(e)
                        })
                    }
                };
                e.exports = r
            }, {"./Sizzle": 9, "./utilities": 13}], 6: [function (t, e, n) {
                var o = t("./Sizzle"), a = {
                    get: function (t) {
                        return this.DOMList[t]
                    }, eq: function (t) {
                        return new o(this.DOMList[t])
                    }, find: function (t) {
                        return new o(t, this)
                    }, index: function (t) {
                        var e = this.DOMList[0];
                        return t ? t.jTool && (t = t.DOMList) : t = e.parentNode.childNodes, t ? [].indexOf.call(t, e) : -1
                    }
                };
                e.exports = a
            }, {"./Sizzle": 9}], 7: [function (t, e, n) {
                var o = t("./utilities"), a = {
                    on: function (t, e, n, o) {
                        return this.addEvent(this.getEventObject(t, e, n, o))
                    }, off: function (t, e) {
                        return this.removeEvent(this.getEventObject(t, e))
                    }, bind: function (t, e, n) {
                        return this.on(t, void 0, e, n)
                    }, unbind: function (t) {
                        return this.removeEvent(this.getEventObject(t))
                    }, trigger: function (t) {
                        return o.each(this.DOMList, function (e, n) {
                            try {
                                if (n.jToolEvent && n.jToolEvent[t].length > 0) {
                                    var a = new Event(t);
                                    n.dispatchEvent(a)
                                } else "click" !== t ? o.error("预绑定的事件只有click事件可以通过trigger进行调用") : "click" === t && n[t]()
                            } catch (e) {
                                o.error("事件:[" + t + "]未能正确执行, 请确定方法已经绑定成功")
                            }
                        }), this
                    }, getEventObject: function (t, e, n, a) {
                        if ("function" == typeof e && (a = n || !1, n = e, e = void 0), !t) return o.error("事件绑定失败,原因: 参数中缺失事件类型"), this;
                        if (e && "element" === o.type(this.DOMList[0]) || (e = ""), "" !== e) {
                            var r = n;
                            n = function (t) {
                                for (var n = t.target; n !== this;) {
                                    if (-1 !== [].indexOf.call(this.querySelectorAll(e), n)) {
                                        r.apply(n, arguments);
                                        break
                                    }
                                    n = n.parentNode
                                }
                            }
                        }
                        var i, l, s = t.split(" "), u = [];
                        return o.each(s, function (t, r) {
                            if ("" === r.trim()) return !0;
                            i = r.split("."), l = {
                                eventName: r + e,
                                type: i[0],
                                querySelector: e,
                                callback: n || o.noop,
                                useCapture: a || !1,
                                nameScope: i[1] || void 0
                            }, u.push(l)
                        }), u
                    }, addEvent: function (t) {
                        var e = this;
                        return o.each(t, function (t, n) {
                            o.each(e.DOMList, function (t, e) {
                                e.jToolEvent = e.jToolEvent || {}, e.jToolEvent[n.eventName] = e.jToolEvent[n.eventName] || [], e.jToolEvent[n.eventName].push(n), e.addEventListener(n.type, n.callback, n.useCapture)
                            })
                        }), e
                    }, removeEvent: function (t) {
                        var e, n = this;
                        return o.each(t, function (t, a) {
                            o.each(n.DOMList, function (t, n) {
                                n.jToolEvent && (e = n.jToolEvent[a.eventName]) && (o.each(e, function (t, e) {
                                    n.removeEventListener(e.type, e.callback)
                                }), n.jToolEvent[a.eventName] = void 0)
                            })
                        }), n
                    }
                };
                e.exports = a
            }, {"./utilities": 13}], 8: [function (t, e, n) {
                var o = t("./utilities"), a = {
                    offset: function () {
                        var t = {top: 0, left: 0}, e = this.DOMList[0];
                        if (!e.getClientRects().length) return t;
                        if ("none" === o.getStyle(e, "display")) return t;
                        t = e.getBoundingClientRect();
                        var n = e.ownerDocument.documentElement;
                        return {
                            top: t.top + window.pageYOffset - n.clientTop,
                            left: t.left + window.pageXOffset - n.clientLeft
                        }
                    }, scrollTop: function (t) {
                        return this.scrollFN(t, "top")
                    }, scrollLeft: function (t) {
                        return this.scrollFN(t, "left")
                    }, scrollFN: function (t, e) {
                        var n = this.DOMList[0];
                        return t || 0 === t ? (this.setScrollFN(n, e, t), this) : this.getScrollFN(n, e)
                    }, getScrollFN: function (t, e) {
                        return o.isWindow(t) ? "top" === e ? t.pageYOffset : t.pageXOffset : 9 === t.nodeType ? "top" === e ? t.body.scrollTop : t.body.scrollLeft : 1 === t.nodeType ? "top" === e ? t.scrollTop : t.scrollLeft : void 0
                    }, setScrollFN: function (t, e, n) {
                        return o.isWindow(t) ? "top" === e ? t.document.body.scrollTop = n : t.document.body.scrollLeft = n : 9 === t.nodeType ? "top" === e ? t.body.scrollTop = n : t.body.scrollLeft = n : 1 === t.nodeType ? "top" === e ? t.scrollTop = n : t.scrollLeft = n : void 0
                    }
                };
                e.exports = a
            }, {"./utilities": 13}], 9: [function (t, e, n) {
                var o = t("./utilities"), a = function (t, e) {
                    var n;
                    return t ? o.isWindow(t) ? (n = [t], e = void 0) : t === document ? (n = [document], e = void 0) : t instanceof HTMLElement ? (n = [t], e = void 0) : t instanceof NodeList || t instanceof Array ? (n = t, e = void 0) : t.jTool ? (n = t.DOMList, e = void 0) : /<.+>/.test(t) ? (n = o.createDOM(t), e = void 0) : (e ? e = "string" == typeof e ? document.querySelectorAll(e) : e instanceof HTMLElement ? [e] : e instanceof NodeList ? e : e.jTool ? e.DOMList : void 0 : n = document.querySelectorAll(t), e && (n = [], o.each(e, function (e, a) {
                        o.each(a.querySelectorAll(t), function (t, e) {
                            e && n.push(e)
                        })
                    }))) : t = null, n && 0 !== n.length || (n = void 0), this.jTool = !0, this.DOMList = n, this.length = this.DOMList ? this.DOMList.length : 0, this.querySelector = t, this
                };
                e.exports = a
            }, {"./utilities": 13}], 10: [function (t, e, n) {
                function o(t) {
                    function e() {
                        var e = "";
                        return "object" === l.type(t.data) ? (l.each(t.data, function (t, n) {
                            "" !== e && (e += "&"), e += t + "=" + n
                        }), e) : t.data
                    }

                    var n = {
                        url: null,
                        type: "GET",
                        data: null,
                        headers: {},
                        async: !0,
                        xhrFields: {},
                        beforeSend: l.noop,
                        complete: l.noop,
                        success: l.noop,
                        error: l.noop
                    };
                    if (t = i(n, t), !t.url) return void l.error("jTool ajax: url不能为空");
                    var o = new XMLHttpRequest, a = "";
                    "GET" === t.type.toUpperCase() && (a = e(), a && (t.url = t.url + (-1 === t.url.indexOf("?") ? "?" : "&") + a), a = null), "POST" === t.type.toUpperCase() && (t.headers["Content-Type"] || (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), 0 === t.headers["Content-Type"].indexOf("application/x-www-form-urlencoded") && (a = e()), 0 === t.headers["Content-Type"].indexOf("application/json") && (a = JSON.stringify(t.data))), o.open(t.type, t.url, t.async);
                    for (var r in t.xhrFields) o[r] = t.xhrFields[r];
                    for (var s in t.headers) o.setRequestHeader(s, t.headers[s]);
                    t.beforeSend(o), o.onload = function () {
                        t.complete(o, o.status)
                    }, o.onreadystatechange = function () {
                        4 === o.readyState && (o.status >= 200 && o.status < 300 || 304 === o.status ? t.success(o.response, o.status) : t.error(o, o.status, o.statusText))
                    }, o.send(a)
                }

                function a(t, e, n) {
                    o({url: t, type: "POST", data: e, success: n})
                }

                function r(t, e, n) {
                    o({url: t, type: "GET", data: e, success: n})
                }

                var i = t("./extend"), l = t("./utilities");
                e.exports = {ajax: o, post: a, get: r}
            }, {"./extend": 11, "./utilities": 13}], 11: [function (t, e, n) {
                function o() {
                    function t(e, o) {
                        for (var r in e) e.hasOwnProperty(r) && (n && "object" === a.type(e[r]) ? ("object" !== a.type(o[r]) && (o[r] = {}), t(e[r], o[r])) : o[r] = e[r])
                    }

                    if (0 === arguments.length) return {};
                    var e, n = !1, o = 1, r = arguments[0];
                    for (1 === arguments.length && "object" == typeof arguments[0] ? (r = this, o = 0) : 2 === arguments.length && "boolean" == typeof arguments[0] ? (n = arguments[0], r = this, o = 1) : arguments.length > 2 && "boolean" == typeof arguments[0] && (n = arguments[0], r = arguments[1] || {}, o = 2); o < arguments.length; o++) e = arguments[o] || {}, t(e, r);
                    return r
                }

                var a = t("./utilities");
                e.exports = o
            }, {"./utilities": 13}], 12: [function (t, e, n) {
                var o = t("./Sizzle"), a = t("./extend"), r = t("./utilities"), i = t("./ajax"), l = t("./Event"),
                    s = t("./Css"), u = t("./Class"), c = t("./Document"), d = t("./Offset"), f = t("./Element"),
                    h = t("./Animate"), g = t("./Data"), p = function (t, e) {
                        return new o(t, e)
                    };
                o.prototype = p.prototype = {}, p.extend = p.prototype.extend = a, p.extend(r), p.extend(i), p.prototype.extend(l), p.prototype.extend(s), p.prototype.extend(u), p.prototype.extend(c), p.prototype.extend(d), p.prototype.extend(f), p.prototype.extend(h), p.prototype.extend(g), void 0 !== window.$ && (window._$ = $), window.jTool = window.$ = p, e.exports = p
            }, {
                "./Animate": 1,
                "./Class": 2,
                "./Css": 3,
                "./Data": 4,
                "./Document": 5,
                "./Element": 6,
                "./Event": 7,
                "./Offset": 8,
                "./Sizzle": 9,
                "./ajax": 10,
                "./extend": 11,
                "./utilities": 13
            }], 13: [function (t, e, n) {
                function o() {
                    return -1 != navigator.userAgent.indexOf("Chrome")
                }

                function a(t) {
                    return null !== t && t === t.window
                }

                function r(t) {
                    return Array.isArray(t)
                }

                function i(t) {
                    return m[y.call(t)] || (t instanceof Element ? "element" : "")
                }

                function l() {
                }

                function s(t, e) {
                    t && t.jTool && (t = t.DOMList);
                    var n = i(t);
                    if ("array" === n || "nodeList" === n || "arguments" === n) [].every.call(t, function (t, n) {
                        return a(t) ? l() : t.jTool ? t = t.get(0) : l(), !1 !== e.call(t, n, t)
                    }); else if ("object" === n) for (var o in t) if (!1 === e.call(t[o], o, t[o])) break
                }

                function u(t) {
                    return t.trim()
                }

                function c(t) {
                    throw new Error("[jTool Error: " + t + "]")
                }

                function d(t) {
                    var e = !0;
                    for (var n in t) t.hasOwnProperty(n) && (e = !1);
                    return e
                }

                function f(t, e) {
                    return e ? window.getComputedStyle(t)[e] : window.getComputedStyle(t)
                }

                function h(t) {
                    var e = ["px", "vem", "em", "%"], n = "";
                    return "number" == typeof t ? n : (s(e, function (e, o) {
                        if (-1 !== t.indexOf(o)) return n = o, !1
                    }), n)
                }

                function g(t) {
                    return t.replace(/-\w/g, function (t) {
                        return t.split("-")[1].toUpperCase()
                    })
                }

                function p(t) {
                    return t.replace(/([A-Z])/g, "-$1").toLowerCase()
                }

                function v(t) {
                    var e = document.querySelector("#jTool-create-dom");
                    if (!e || 0 === e.length) {
                        var n = document.createElement("table");
                        n.id = "jTool-create-dom", n.style.display = "none", document.body.appendChild(n), e = document.querySelector("#jTool-create-dom")
                    }
                    e.innerHTML = t || "";
                    var o = e.childNodes;
                    return 1 != o.length || /<tbody|<TBODY/.test(t) || "TBODY" !== o[0].nodeName || (o = o[0].childNodes), 1 != o.length || /<thead|<THEAD/.test(t) || "THEAD" !== o[0].nodeName || (o = o[0].childNodes), 1 != o.length || /<tr|<TR/.test(t) || "TR" !== o[0].nodeName || (o = o[0].childNodes), 1 != o.length || /<td|<TD/.test(t) || "TD" !== o[0].nodeName || (o = o[0].childNodes), 1 != o.length || /<th|<TH/.test(t) || "TH" !== o[0].nodeName || (o = o[0].childNodes), document.body.removeChild(e), o
                }

                var y = Object.prototype.toString, m = {
                    "[object String]": "string",
                    "[object Boolean]": "boolean",
                    "[object Undefined]": "undefined",
                    "[object Number]": "number",
                    "[object Object]": "object",
                    "[object Error]": "error",
                    "[object Function]": "function",
                    "[object Date]": "date",
                    "[object Array]": "array",
                    "[object RegExp]": "regexp",
                    "[object Null]": "null",
                    "[object NodeList]": "nodeList",
                    "[object Arguments]": "arguments",
                    "[object Window]": "window",
                    "[object HTMLDocument]": "document"
                };
                e.exports = {
                    isWindow: a,
                    isChrome: o,
                    isArray: r,
                    noop: l,
                    type: i,
                    toHyphen: p,
                    toHump: g,
                    getStyleUnit: h,
                    getStyle: f,
                    isEmptyObject: d,
                    trim: u,
                    error: c,
                    each: s,
                    createDOM: v,
                    version: "1.2.25"
                }
            }, {}]
        }, {}, [12])
    }])
});