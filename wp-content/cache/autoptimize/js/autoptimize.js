/*! jQuery Migrate v1.4.1 | (c) jQuery Foundation and other contributors | jquery.org/license */
"undefined" == typeof jQuery.migrateMute && (jQuery.migrateMute = !0),
    function(a, b, c) {
        function d(c) {
            var d = b.console;
            f[c] || (f[c] = !0, a.migrateWarnings.push(c), d && d.warn && !a.migrateMute && (d.warn("JQMIGRATE: " + c), a.migrateTrace && d.trace && d.trace()))
        }

        function e(b, c, e, f) {
            if (Object.defineProperty) try {
                return void Object.defineProperty(b, c, {
                    configurable: !0,
                    enumerable: !0,
                    get: function() {
                        return d(f), e
                    },
                    set: function(a) {
                        d(f), e = a
                    }
                })
            } catch (g) {}
            a._definePropertyBroken = !0, b[c] = e
        }
        a.migrateVersion = "1.4.1";
        var f = {};
        a.migrateWarnings = [], b.console && b.console.log && b.console.log("JQMIGRATE: Migrate is installed" + (a.migrateMute ? "" : " with logging active") + ", version " + a.migrateVersion), a.migrateTrace === c && (a.migrateTrace = !0), a.migrateReset = function() {
            f = {}, a.migrateWarnings.length = 0
        }, "BackCompat" === document.compatMode && d("jQuery is not compatible with Quirks Mode");
        var g = a("<input/>", {
                size: 1
            }).attr("size") && a.attrFn,
            h = a.attr,
            i = a.attrHooks.value && a.attrHooks.value.get || function() {
                return null
            },
            j = a.attrHooks.value && a.attrHooks.value.set || function() {
                return c
            },
            k = /^(?:input|button)$/i,
            l = /^[238]$/,
            m = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
            n = /^(?:checked|selected)$/i;
        e(a, "attrFn", g || {}, "jQuery.attrFn is deprecated"), a.attr = function(b, e, f, i) {
            var j = e.toLowerCase(),
                o = b && b.nodeType;
            return i && (h.length < 4 && d("jQuery.fn.attr( props, pass ) is deprecated"), b && !l.test(o) && (g ? e in g : a.isFunction(a.fn[e]))) ? a(b)[e](f) : ("type" === e && f !== c && k.test(b.nodeName) && b.parentNode && d("Can't change the 'type' of an input or button in IE 6/7/8"), !a.attrHooks[j] && m.test(j) && (a.attrHooks[j] = {
                get: function(b, d) {
                    var e, f = a.prop(b, d);
                    return f === !0 || "boolean" != typeof f && (e = b.getAttributeNode(d)) && e.nodeValue !== !1 ? d.toLowerCase() : c
                },
                set: function(b, c, d) {
                    var e;
                    return c === !1 ? a.removeAttr(b, d) : (e = a.propFix[d] || d, e in b && (b[e] = !0), b.setAttribute(d, d.toLowerCase())), d
                }
            }, n.test(j) && d("jQuery.fn.attr('" + j + "') might use property instead of attribute")), h.call(a, b, e, f))
        }, a.attrHooks.value = {
            get: function(a, b) {
                var c = (a.nodeName || "").toLowerCase();
                return "button" === c ? i.apply(this, arguments) : ("input" !== c && "option" !== c && d("jQuery.fn.attr('value') no longer gets properties"), b in a ? a.value : null)
            },
            set: function(a, b) {
                var c = (a.nodeName || "").toLowerCase();
                return "button" === c ? j.apply(this, arguments) : ("input" !== c && "option" !== c && d("jQuery.fn.attr('value', val) no longer sets properties"), void(a.value = b))
            }
        };
        var o, p, q = a.fn.init,
            r = a.find,
            s = a.parseJSON,
            t = /^\s*</,
            u = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/,
            v = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g,
            w = /^([^<]*)(<[\w\W]+>)([^>]*)$/;
        a.fn.init = function(b, e, f) {
            var g, h;
            return b && "string" == typeof b && !a.isPlainObject(e) && (g = w.exec(a.trim(b))) && g[0] && (t.test(b) || d("$(html) HTML strings must start with '<' character"), g[3] && d("$(html) HTML text after last tag is ignored"), "#" === g[0].charAt(0) && (d("HTML string cannot start with a '#' character"), a.error("JQMIGRATE: Invalid selector string (XSS)")), e && e.context && e.context.nodeType && (e = e.context), a.parseHTML) ? q.call(this, a.parseHTML(g[2], e && e.ownerDocument || e || document, !0), e, f) : (h = q.apply(this, arguments), b && b.selector !== c ? (h.selector = b.selector, h.context = b.context) : (h.selector = "string" == typeof b ? b : "", b && (h.context = b.nodeType ? b : e || document)), h)
        }, a.fn.init.prototype = a.fn, a.find = function(a) {
            var b = Array.prototype.slice.call(arguments);
            if ("string" == typeof a && u.test(a)) try {
                document.querySelector(a)
            } catch (c) {
                a = a.replace(v, function(a, b, c, d) {
                    return "[" + b + c + '"' + d + '"]'
                });
                try {
                    document.querySelector(a), d("Attribute selector with '#' must be quoted: " + b[0]), b[0] = a
                } catch (e) {
                    d("Attribute selector with '#' was not fixed: " + b[0])
                }
            }
            return r.apply(this, b)
        };
        var x;
        for (x in r) Object.prototype.hasOwnProperty.call(r, x) && (a.find[x] = r[x]);
        a.parseJSON = function(a) {
            return a ? s.apply(this, arguments) : (d("jQuery.parseJSON requires a valid JSON string"), null)
        }, a.uaMatch = function(a) {
            a = a.toLowerCase();
            var b = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
            return {
                browser: b[1] || "",
                version: b[2] || "0"
            }
        }, a.browser || (o = a.uaMatch(navigator.userAgent), p = {}, o.browser && (p[o.browser] = !0, p.version = o.version), p.chrome ? p.webkit = !0 : p.webkit && (p.safari = !0), a.browser = p), e(a, "browser", a.browser, "jQuery.browser is deprecated"), a.boxModel = a.support.boxModel = "CSS1Compat" === document.compatMode, e(a, "boxModel", a.boxModel, "jQuery.boxModel is deprecated"), e(a.support, "boxModel", a.support.boxModel, "jQuery.support.boxModel is deprecated"), a.sub = function() {
            function b(a, c) {
                return new b.fn.init(a, c)
            }
            a.extend(!0, b, this), b.superclass = this, b.fn = b.prototype = this(), b.fn.constructor = b, b.sub = this.sub, b.fn.init = function(d, e) {
                var f = a.fn.init.call(this, d, e, c);
                return f instanceof b ? f : b(f)
            }, b.fn.init.prototype = b.fn;
            var c = b(document);
            return d("jQuery.sub() is deprecated"), b
        }, a.fn.size = function() {
            return d("jQuery.fn.size() is deprecated; use the .length property"), this.length
        };
        var y = !1;
        a.swap && a.each(["height", "width", "reliableMarginRight"], function(b, c) {
            var d = a.cssHooks[c] && a.cssHooks[c].get;
            d && (a.cssHooks[c].get = function() {
                var a;
                return y = !0, a = d.apply(this, arguments), y = !1, a
            })
        }), a.swap = function(a, b, c, e) {
            var f, g, h = {};
            y || d("jQuery.swap() is undocumented and deprecated");
            for (g in b) h[g] = a.style[g], a.style[g] = b[g];
            f = c.apply(a, e || []);
            for (g in b) a.style[g] = h[g];
            return f
        }, a.ajaxSetup({
            converters: {
                "text json": a.parseJSON
            }
        });
        var z = a.fn.data;
        a.fn.data = function(b) {
            var e, f, g = this[0];
            return !g || "events" !== b || 1 !== arguments.length || (e = a.data(g, b), f = a._data(g, b), e !== c && e !== f || f === c) ? z.apply(this, arguments) : (d("Use of jQuery.fn.data('events') is deprecated"), f)
        };
        var A = /\/(java|ecma)script/i;
        a.clean || (a.clean = function(b, c, e, f) {
            c = c || document, c = !c.nodeType && c[0] || c, c = c.ownerDocument || c, d("jQuery.clean() is deprecated");
            var g, h, i, j, k = [];
            if (a.merge(k, a.buildFragment(b, c).childNodes), e)
                for (i = function(a) {
                        return !a.type || A.test(a.type) ? f ? f.push(a.parentNode ? a.parentNode.removeChild(a) : a) : e.appendChild(a) : void 0
                    }, g = 0; null != (h = k[g]); g++) a.nodeName(h, "script") && i(h) || (e.appendChild(h), "undefined" != typeof h.getElementsByTagName && (j = a.grep(a.merge([], h.getElementsByTagName("script")), i), k.splice.apply(k, [g + 1, 0].concat(j)), g += j.length));
            return k
        });
        var B = a.event.add,
            C = a.event.remove,
            D = a.event.trigger,
            E = a.fn.toggle,
            F = a.fn.live,
            G = a.fn.die,
            H = a.fn.load,
            I = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",
            J = new RegExp("\\b(?:" + I + ")\\b"),
            K = /(?:^|\s)hover(\.\S+|)\b/,
            L = function(b) {
                return "string" != typeof b || a.event.special.hover ? b : (K.test(b) && d("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"), b && b.replace(K, "mouseenter$1 mouseleave$1"))
            };
        a.event.props && "attrChange" !== a.event.props[0] && a.event.props.unshift("attrChange", "attrName", "relatedNode", "srcElement"), a.event.dispatch && e(a.event, "handle", a.event.dispatch, "jQuery.event.handle is undocumented and deprecated"), a.event.add = function(a, b, c, e, f) {
            a !== document && J.test(b) && d("AJAX events should be attached to document: " + b), B.call(this, a, L(b || ""), c, e, f)
        }, a.event.remove = function(a, b, c, d, e) {
            C.call(this, a, L(b) || "", c, d, e)
        }, a.each(["load", "unload", "error"], function(b, c) {
            a.fn[c] = function() {
                var a = Array.prototype.slice.call(arguments, 0);
                return "load" === c && "string" == typeof a[0] ? H.apply(this, a) : (d("jQuery.fn." + c + "() is deprecated"), a.splice(0, 0, c), arguments.length ? this.bind.apply(this, a) : (this.triggerHandler.apply(this, a), this))
            }
        }), a.fn.toggle = function(b, c) {
            if (!a.isFunction(b) || !a.isFunction(c)) return E.apply(this, arguments);
            d("jQuery.fn.toggle(handler, handler...) is deprecated");
            var e = arguments,
                f = b.guid || a.guid++,
                g = 0,
                h = function(c) {
                    var d = (a._data(this, "lastToggle" + b.guid) || 0) % g;
                    return a._data(this, "lastToggle" + b.guid, d + 1), c.preventDefault(), e[d].apply(this, arguments) || !1
                };
            for (h.guid = f; g < e.length;) e[g++].guid = f;
            return this.click(h)
        }, a.fn.live = function(b, c, e) {
            return d("jQuery.fn.live() is deprecated"), F ? F.apply(this, arguments) : (a(this.context).on(b, this.selector, c, e), this)
        }, a.fn.die = function(b, c) {
            return d("jQuery.fn.die() is deprecated"), G ? G.apply(this, arguments) : (a(this.context).off(b, this.selector || "**", c), this)
        }, a.event.trigger = function(a, b, c, e) {
            return c || J.test(a) || d("Global events are undocumented and deprecated"), D.call(this, a, b, c || document, e)
        }, a.each(I.split("|"), function(b, c) {
            a.event.special[c] = {
                setup: function() {
                    var b = this;
                    return b !== document && (a.event.add(document, c + "." + a.guid, function() {
                        a.event.trigger(c, Array.prototype.slice.call(arguments, 1), b, !0)
                    }), a._data(this, c, a.guid++)), !1
                },
                teardown: function() {
                    return this !== document && a.event.remove(document, c + "." + a._data(this, c)), !1
                }
            }
        }), a.event.special.ready = {
            setup: function() {
                this === document && d("'ready' event is deprecated")
            }
        };
        var M = a.fn.andSelf || a.fn.addBack,
            N = a.fn.find;
        if (a.fn.andSelf = function() {
                return d("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"), M.apply(this, arguments)
            }, a.fn.find = function(a) {
                var b = N.apply(this, arguments);
                return b.context = this.context, b.selector = this.selector ? this.selector + " " + a : a, b
            }, a.Callbacks) {
            var O = a.Deferred,
                P = [
                    ["resolve", "done", a.Callbacks("once memory"), a.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", a.Callbacks("once memory"), a.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", a.Callbacks("memory"), a.Callbacks("memory")]
                ];
            a.Deferred = function(b) {
                var c = O(),
                    e = c.promise();
                return c.pipe = e.pipe = function() {
                    var b = arguments;
                    return d("deferred.pipe() is deprecated"), a.Deferred(function(d) {
                        a.each(P, function(f, g) {
                            var h = a.isFunction(b[f]) && b[f];
                            c[g[1]](function() {
                                var b = h && h.apply(this, arguments);
                                b && a.isFunction(b.promise) ? b.promise().done(d.resolve).fail(d.reject).progress(d.notify) : d[g[0] + "With"](this === e ? d.promise() : this, h ? [b] : arguments)
                            })
                        }), b = null
                    }).promise()
                }, c.isResolved = function() {
                    return d("deferred.isResolved is deprecated"), "resolved" === c.state()
                }, c.isRejected = function() {
                    return d("deferred.isRejected is deprecated"), "rejected" === c.state()
                }, b && b.call(c, c), c
            }
        }
    }(jQuery, window);
jQuery(document).ready(function($) {
    $("#fue-subscriptions-form").submit(function() {
        var ids = [];
        $("input.chk-fue-list:checked").each(function() {
            ids.push($(this).val());
        });
        $(".follow-up-subscriptions").block({
            message: null,
            overlayCSS: {
                background: '#fff url(' + FUE.ajax_loader + ') no-repeat center',
                opacity: 0.6
            }
        });
        $.post(FUE.ajaxurl, {
            action: 'fue_update_account_subscriptions',
            lists: ids,
            nonce: $('#update-email-subscriptions-nonce').val()
        }, function() {
            $(".fue-subscriptions-message").show();
            $(".follow-up-subscriptions").unblock();
        });
        return false;
    });
});
(function($) {
    var $event = $.event,
        $special, resizeTimeout;
    $special = $event.special.debouncedresize = {
        setup: function() {
            $(this).on("resize", $special.handler);
        },
        teardown: function() {
            $(this).off("resize", $special.handler);
        },
        handler: function(event, execAsap) {
            var context = this,
                args = arguments,
                dispatch = function() {
                    event.type = "debouncedresize";
                    $event.dispatch.apply(context, args);
                };
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            execAsap ? dispatch() : resizeTimeout = setTimeout(dispatch, $special.threshold);
        },
        threshold: 150
    };
})(jQuery);

function flo_maybe_switch_layout(apiname) {
    var screenSize = jQuery(window).width(),
        layout;
    if (screenSize >= 768) {
        layout = 'fullscreen';
    } else {
        layout = 'fullwidth';
    }
    var api = apiname;
    var sliderSettings = api.data('opt') || api[0].opt;
    sliderSettings.sliderLayout = layout;
};

(function(i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery)
})(function(i) {
    "use strict";
    var e = window.Slick || {};
    e = function() {
        function e(e, o) {
            var s, n = this;
            n.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: i(e),
                appendDots: i(e),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(e, t) {
                    return i('<button type="button" />').text(t + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, n.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: !1,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                swiping: !1,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = i(e), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = i(e).data("slick") || {}, n.options = i.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, "undefined" != typeof document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = t++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0)
        }
        var t = 0;
        return e
    }(), e.prototype.activateADA = function() {
        var i = this;
        i.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, e.prototype.addSlide = e.prototype.slickAdd = function(e, t, o) {
        var s = this;
        if ("boolean" == typeof t) o = t, t = null;
        else if (t < 0 || t >= s.slideCount) return !1;
        s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : o === !0 ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function(e, t) {
            i(t).attr("data-slick-index", e)
        }), s.$slidesCache = s.$slides, s.reinit()
    }, e.prototype.animateHeight = function() {
        var i = this;
        if (1 === i.options.slidesToShow && i.options.adaptiveHeight === !0 && i.options.vertical === !1) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.animate({
                height: e
            }, i.options.speed)
        }
    }, e.prototype.animateSlide = function(e, t) {
        var o = {},
            s = this;
        s.animateHeight(), s.options.rtl === !0 && s.options.vertical === !1 && (e = -e), s.transformsEnabled === !1 ? s.options.vertical === !1 ? s.$slideTrack.animate({
            left: e
        }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({
            top: e
        }, s.options.speed, s.options.easing, t) : s.cssTransitions === !1 ? (s.options.rtl === !0 && (s.currentLeft = -s.currentLeft), i({
            animStart: s.currentLeft
        }).animate({
            animStart: e
        }, {
            duration: s.options.speed,
            easing: s.options.easing,
            step: function(i) {
                i = Math.ceil(i), s.options.vertical === !1 ? (o[s.animType] = "translate(" + i + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o))
            },
            complete: function() {
                t && t.call()
            }
        })) : (s.applyTransition(), e = Math.ceil(e), s.options.vertical === !1 ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(o), t && setTimeout(function() {
            s.disableTransition(), t.call()
        }, s.options.speed))
    }, e.prototype.getNavTarget = function() {
        var e = this,
            t = e.options.asNavFor;
        return t && null !== t && (t = i(t).not(e.$slider)), t
    }, e.prototype.asNavFor = function(e) {
        var t = this,
            o = t.getNavTarget();
        null !== o && "object" == typeof o && o.each(function() {
            var t = i(this).slick("getSlick");
            t.unslicked || t.slideHandler(e, !0)
        })
    }, e.prototype.applyTransition = function(i) {
        var e = this,
            t = {};
        e.options.fade === !1 ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, e.options.fade === !1 ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }, e.prototype.autoPlay = function() {
        var i = this;
        i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
    }, e.prototype.autoPlayClear = function() {
        var i = this;
        i.autoPlayTimer && clearInterval(i.autoPlayTimer)
    }, e.prototype.autoPlayIterator = function() {
        var i = this,
            e = i.currentSlide + i.options.slidesToScroll;
        i.paused || i.interrupted || i.focussed || (i.options.infinite === !1 && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 === 0 && (i.direction = 1))), i.slideHandler(e))
    }, e.prototype.buildArrows = function() {
        var e = this;
        e.options.arrows === !0 && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), e.options.infinite !== !0 && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, e.prototype.buildDots = function() {
        var e, t, o = this;
        if (o.options.dots === !0 && o.slideCount > o.options.slidesToShow) {
            for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1) t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
            o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active")
        }
    }, e.prototype.buildOut = function() {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, t) {
            i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "")
        }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), e.options.centerMode !== !0 && e.options.swipeToSlide !== !0 || (e.options.slidesToScroll = 1), i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.options.draggable === !0 && e.$list.addClass("draggable")
    }, e.prototype.buildRows = function() {
        var i, e, t, o, s, n, r, l = this;
        if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 0) {
            for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) {
                var d = document.createElement("div");
                for (e = 0; e < l.options.rows; e++) {
                    var a = document.createElement("div");
                    for (t = 0; t < l.options.slidesPerRow; t++) {
                        var c = i * r + (e * l.options.slidesPerRow + t);
                        n.get(c) && a.appendChild(n.get(c))
                    }
                    d.appendChild(a)
                }
                o.appendChild(d)
            }
            l.$slider.empty().append(o), l.$slider.children().children().children().css({
                width: 100 / l.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, e.prototype.checkResponsive = function(e, t) {
        var o, s, n, r = this,
            l = !1,
            d = r.$slider.width(),
            a = window.innerWidth || i(window).width();
        if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            s = null;
            for (o in r.breakpoints) r.breakpoints.hasOwnProperty(o) && (r.originalSettings.mobileFirst === !1 ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
            null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = s), e || l === !1 || r.$slider.trigger("breakpoint", [r, l])
        }
    }, e.prototype.changeSlide = function(e, t) {
        var o, s, n, r = this,
            l = i(e.currentTarget);
        switch (l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), n = r.slideCount % r.options.slidesToScroll !== 0, o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
            case "previous":
                s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
                break;
            case "next":
                s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
                break;
            case "index":
                var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
                r.slideHandler(r.checkNavigable(d), !1, t), l.children().trigger("focus");
                break;
            default:
                return
        }
    }, e.prototype.checkNavigable = function(i) {
        var e, t, o = this;
        if (e = o.getNavigableIndexes(), t = 0, i > e[e.length - 1]) i = e[e.length - 1];
        else
            for (var s in e) {
                if (i < e[s]) {
                    i = t;
                    break
                }
                t = e[s]
            }
        return i
    }, e.prototype.cleanUpEvents = function() {
        var e = this;
        e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)), e.options.accessibility === !0 && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), e.options.accessibility === !0 && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), e.options.accessibility === !0 && e.$list.off("keydown.slick", e.keyHandler), e.options.focusOnSelect === !0 && i(e.$slideTrack).children().off("click.slick", e.selectHandler), i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), i(window).off("resize.slick.slick-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
    }, e.prototype.cleanUpSlideEvents = function() {
        var e = this;
        e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }, e.prototype.cleanUpRows = function() {
        var i, e = this;
        e.options.rows > 0 && (i = e.$slides.children().children(), i.removeAttr("style"), e.$slider.empty().append(i))
    }, e.prototype.clickHandler = function(i) {
        var e = this;
        e.shouldClick === !1 && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault())
    }, e.prototype.destroy = function(e) {
        var t = this;
        t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            i(this).attr("style", i(this).data("originalStyling"))
        }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t])
    }, e.prototype.disableTransition = function(i) {
        var e = this,
            t = {};
        t[e.transitionType] = "", e.options.fade === !1 ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }, e.prototype.fadeSlide = function(i, e) {
        var t = this;
        t.cssTransitions === !1 ? (t.$slides.eq(i).css({
            zIndex: t.options.zIndex
        }), t.$slides.eq(i).animate({
            opacity: 1
        }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({
            opacity: 1,
            zIndex: t.options.zIndex
        }), e && setTimeout(function() {
            t.disableTransition(i), e.call()
        }, t.options.speed))
    }, e.prototype.fadeSlideOut = function(i) {
        var e = this;
        e.cssTransitions === !1 ? e.$slides.eq(i).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }))
    }, e.prototype.filterSlides = e.prototype.slickFilter = function(i) {
        var e = this;
        null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit())
    }, e.prototype.focusHandler = function() {
        var e = this;
        e.$slider.off("focus.slick blur.slick").on("focus.slick", "*", function(t) {
            var o = i(this);
            setTimeout(function() {
                e.options.pauseOnFocus && o.is(":focus") && (e.focussed = !0, e.autoPlay())
            }, 0)
        }).on("blur.slick", "*", function(t) {
            i(this);
            e.options.pauseOnFocus && (e.focussed = !1, e.autoPlay())
        })
    }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
        var i = this;
        return i.currentSlide
    }, e.prototype.getDotCount = function() {
        var i = this,
            e = 0,
            t = 0,
            o = 0;
        if (i.options.infinite === !0)
            if (i.slideCount <= i.options.slidesToShow) ++o;
            else
                for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else if (i.options.centerMode === !0) o = i.slideCount;
        else if (i.options.asNavFor)
            for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
        return o - 1
    }, e.prototype.getLeft = function(i) {
        var e, t, o, s, n = this,
            r = 0;
        return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), n.options.infinite === !0 ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = -1, n.options.vertical === !0 && n.options.centerMode === !0 && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), r = t * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll !== 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1, r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth, r = (i + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, r = 0), n.options.centerMode === !0 && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : n.options.centerMode === !0 && n.options.infinite === !0 ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : n.options.centerMode === !0 && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = n.options.vertical === !1 ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r, n.options.variableWidth === !0 && (o = n.slideCount <= n.options.slidesToShow || n.options.infinite === !1 ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow), e = n.options.rtl === !0 ? o[0] ? (n.$slideTrack.width() - o[0].offsetLeft - o.width()) * -1 : 0 : o[0] ? o[0].offsetLeft * -1 : 0, n.options.centerMode === !0 && (o = n.slideCount <= n.options.slidesToShow || n.options.infinite === !1 ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1), e = n.options.rtl === !0 ? o[0] ? (n.$slideTrack.width() - o[0].offsetLeft - o.width()) * -1 : 0 : o[0] ? o[0].offsetLeft * -1 : 0, e += (n.$list.width() - o.outerWidth()) / 2)), e
    }, e.prototype.getOption = e.prototype.slickGetOption = function(i) {
        var e = this;
        return e.options[i]
    }, e.prototype.getNavigableIndexes = function() {
        var i, e = this,
            t = 0,
            o = 0,
            s = [];
        for (e.options.infinite === !1 ? i = e.slideCount : (t = e.options.slidesToScroll * -1, o = e.options.slidesToScroll * -1, i = 2 * e.slideCount); t < i;) s.push(t), t = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        return s
    }, e.prototype.getSlick = function() {
        return this
    }, e.prototype.getSlideCount = function() {
        var e, t, o, s, n = this;
        return s = n.options.centerMode === !0 ? Math.floor(n.$list.width() / 2) : 0, o = n.swipeLeft * -1 + s, n.options.swipeToSlide === !0 ? (n.$slideTrack.find(".slick-slide").each(function(e, s) {
            var r, l, d;
            if (r = i(s).outerWidth(), l = s.offsetLeft, n.options.centerMode !== !0 && (l += r / 2), d = l + r, o < d) return t = s, !1
        }), e = Math.abs(i(t).attr("data-slick-index") - n.currentSlide) || 1) : n.options.slidesToScroll
    }, e.prototype.goTo = e.prototype.slickGoTo = function(i, e) {
        var t = this;
        t.changeSlide({
            data: {
                message: "index",
                index: parseInt(i)
            }
        }, e)
    }, e.prototype.init = function(e) {
        var t = this;
        i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), t.options.accessibility === !0 && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
    }, e.prototype.initADA = function() {
        var e = this,
            t = Math.ceil(e.slideCount / e.options.slidesToShow),
            o = e.getNavigableIndexes().filter(function(i) {
                return i >= 0 && i < e.slideCount
            });
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t) {
            var s = o.indexOf(t);
            if (i(this).attr({
                    role: "tabpanel",
                    id: "slick-slide" + e.instanceUid + t,
                    tabindex: -1
                }), s !== -1) {
                var n = "slick-slide-control" + e.instanceUid + s;
                i("#" + n).length && i(this).attr({
                    "aria-describedby": n
                })
            }
        }), e.$dots.attr("role", "tablist").find("li").each(function(s) {
            var n = o[s];
            i(this).attr({
                role: "presentation"
            }), i(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + e.instanceUid + s,
                "aria-controls": "slick-slide" + e.instanceUid + n,
                "aria-label": s + 1 + " of " + t,
                "aria-selected": null,
                tabindex: "-1"
            })
        }).eq(e.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++) e.options.focusOnChange ? e.$slides.eq(s).attr({
            tabindex: "0"
        }) : e.$slides.eq(s).removeAttr("tabindex");
        e.activateADA()
    }, e.prototype.initArrowEvents = function() {
        var i = this;
        i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, i.changeSlide), i.options.accessibility === !0 && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler)))
    }, e.prototype.initDotEvents = function() {
        var e = this;
        e.options.dots === !0 && e.slideCount > e.options.slidesToShow && (i("li", e.$dots).on("click.slick", {
            message: "index"
        }, e.changeSlide), e.options.accessibility === !0 && e.$dots.on("keydown.slick", e.keyHandler)), e.options.dots === !0 && e.options.pauseOnDotsHover === !0 && e.slideCount > e.options.slidesToShow && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }, e.prototype.initSlideEvents = function() {
        var e = this;
        e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)))
    }, e.prototype.initializeEvents = function() {
        var e = this;
        e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), e.options.accessibility === !0 && e.$list.on("keydown.slick", e.keyHandler), e.options.focusOnSelect === !0 && i(e.$slideTrack).children().on("click.slick", e.selectHandler), i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)), i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), i(e.setPosition)
    }, e.prototype.initUI = function() {
        var i = this;
        i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), i.options.dots === !0 && i.slideCount > i.options.slidesToShow && i.$dots.show()
    }, e.prototype.keyHandler = function(i) {
        var e = this;
        i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && e.options.accessibility === !0 ? e.changeSlide({
            data: {
                message: e.options.rtl === !0 ? "next" : "previous"
            }
        }) : 39 === i.keyCode && e.options.accessibility === !0 && e.changeSlide({
            data: {
                message: e.options.rtl === !0 ? "previous" : "next"
            }
        }))
    }, e.prototype.lazyLoad = function() {
        function e(e) {
            i("img[data-lazy]", e).each(function() {
                var e = i(this),
                    t = i(this).attr("data-lazy"),
                    o = i(this).attr("data-srcset"),
                    s = i(this).attr("data-sizes") || r.$slider.attr("data-sizes"),
                    n = document.createElement("img");
                n.onload = function() {
                    e.animate({
                        opacity: 0
                    }, 100, function() {
                        o && (e.attr("srcset", o), s && e.attr("sizes", s)), e.attr("src", t).animate({
                            opacity: 1
                        }, 200, function() {
                            e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        }), r.$slider.trigger("lazyLoaded", [r, e, t])
                    })
                }, n.onerror = function() {
                    e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, e, t])
                }, n.src = t
            })
        }
        var t, o, s, n, r = this;
        if (r.options.centerMode === !0 ? r.options.infinite === !0 ? (s = r.currentSlide + (r.options.slidesToShow / 2 + 1), n = s + r.options.slidesToShow + 2) : (s = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)), n = 2 + (r.options.slidesToShow / 2 + 1) + r.currentSlide) : (s = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide, n = Math.ceil(s + r.options.slidesToShow), r.options.fade === !0 && (s > 0 && s--, n <= r.slideCount && n++)), t = r.$slider.find(".slick-slide").slice(s, n), "anticipated" === r.options.lazyLoad)
            for (var l = s - 1, d = n, a = r.$slider.find(".slick-slide"), c = 0; c < r.options.slidesToScroll; c++) l < 0 && (l = r.slideCount - 1), t = t.add(a.eq(l)), t = t.add(a.eq(d)), l--, d++;
        e(t), r.slideCount <= r.options.slidesToShow ? (o = r.$slider.find(".slick-slide"), e(o)) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? (o = r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow), e(o)) : 0 === r.currentSlide && (o = r.$slider.find(".slick-cloned").slice(r.options.slidesToShow * -1), e(o))
    }, e.prototype.loadSlider = function() {
        var i = this;
        i.setPosition(), i.$slideTrack.css({
            opacity: 1
        }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad()
    }, e.prototype.next = e.prototype.slickNext = function() {
        var i = this;
        i.changeSlide({
            data: {
                message: "next"
            }
        })
    }, e.prototype.orientationChange = function() {
        var i = this;
        i.checkResponsive(), i.setPosition()
    }, e.prototype.pause = e.prototype.slickPause = function() {
        var i = this;
        i.autoPlayClear(), i.paused = !0
    }, e.prototype.play = e.prototype.slickPlay = function() {
        var i = this;
        i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1
    }, e.prototype.postSlide = function(e) {
        var t = this;
        if (!t.unslicked && (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), t.options.accessibility === !0 && (t.initADA(), t.options.focusOnChange))) {
            var o = i(t.$slides.get(t.currentSlide));
            o.attr("tabindex", 0).focus()
        }
    }, e.prototype.prev = e.prototype.slickPrev = function() {
        var i = this;
        i.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, e.prototype.preventDefault = function(i) {
        i.preventDefault()
    }, e.prototype.progressiveLazyLoad = function(e) {
        e = e || 1;
        var t, o, s, n, r, l = this,
            d = i("img[data-lazy]", l.$slider);
        d.length ? (t = d.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || l.$slider.attr("data-sizes"), r = document.createElement("img"), r.onload = function() {
            s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), l.options.adaptiveHeight === !0 && l.setPosition(), l.$slider.trigger("lazyLoaded", [l, t, o]), l.progressiveLazyLoad()
        }, r.onerror = function() {
            e < 3 ? setTimeout(function() {
                l.progressiveLazyLoad(e + 1)
            }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad())
        }, r.src = o) : l.$slider.trigger("allImagesLoaded", [l])
    }, e.prototype.refresh = function(e) {
        var t, o, s = this;
        o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), i.extend(s, s.initials, {
            currentSlide: t
        }), s.init(), e || s.changeSlide({
            data: {
                message: "index",
                index: t
            }
        }, !1)
    }, e.prototype.registerBreakpoints = function() {
        var e, t, o, s = this,
            n = s.options.responsive || null;
        if ("array" === i.type(n) && n.length) {
            s.respondTo = s.options.respondTo || "window";
            for (e in n)
                if (o = s.breakpoints.length - 1, n.hasOwnProperty(e)) {
                    for (t = n[e].breakpoint; o >= 0;) s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
                    s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings
                }
            s.breakpoints.sort(function(i, e) {
                return s.options.mobileFirst ? i - e : e - i
            })
        }
    }, e.prototype.reinit = function() {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), e.options.focusOnSelect === !0 && i(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
    }, e.prototype.resize = function() {
        var e = this;
        i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
            e.windowWidth = i(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
        }, 50))
    }, e.prototype.removeSlide = e.prototype.slickRemove = function(i, e, t) {
        var o = this;
        return "boolean" == typeof i ? (e = i, i = e === !0 ? 0 : o.slideCount - 1) : i = e === !0 ? --i : i, !(o.slideCount < 1 || i < 0 || i > o.slideCount - 1) && (o.unload(), t === !0 ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, void o.reinit())
    }, e.prototype.setCSS = function(i) {
        var e, t, o = this,
            s = {};
        o.options.rtl === !0 && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, o.transformsEnabled === !1 ? o.$slideTrack.css(s) : (s = {}, o.cssTransitions === !1 ? (s[o.animType] = "translate(" + e + ", " + t + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", o.$slideTrack.css(s)))
    }, e.prototype.setDimensions = function() {
        var i = this;
        i.options.vertical === !1 ? i.options.centerMode === !0 && i.$list.css({
            padding: "0px " + i.options.centerPadding
        }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), i.options.centerMode === !0 && i.$list.css({
            padding: i.options.centerPadding + " 0px"
        })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), i.options.vertical === !1 && i.options.variableWidth === !1 ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : i.options.variableWidth === !0 ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
        var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
        i.options.variableWidth === !1 && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e)
    }, e.prototype.setFade = function() {
        var e, t = this;
        t.$slides.each(function(o, s) {
            e = t.slideWidth * o * -1, t.options.rtl === !0 ? i(s).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            }) : i(s).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            })
        }), t.$slides.eq(t.currentSlide).css({
            zIndex: t.options.zIndex - 1,
            opacity: 1
        })
    }, e.prototype.setHeight = function() {
        var i = this;
        if (1 === i.options.slidesToShow && i.options.adaptiveHeight === !0 && i.options.vertical === !1) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.css("height", e)
        }
    }, e.prototype.setOption = e.prototype.slickSetOption = function() {
        var e, t, o, s, n, r = this,
            l = !1;
        if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : "undefined" != typeof arguments[1] && (n = "single")), "single" === n) r.options[o] = s;
        else if ("multiple" === n) i.each(o, function(i, e) {
            r.options[i] = e
        });
        else if ("responsive" === n)
            for (t in s)
                if ("array" !== i.type(r.options.responsive)) r.options.responsive = [s[t]];
                else {
                    for (e = r.options.responsive.length - 1; e >= 0;) r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--;
                    r.options.responsive.push(s[t])
                }
        l && (r.unload(), r.reinit())
    }, e.prototype.setPosition = function() {
        var i = this;
        i.setDimensions(), i.setHeight(), i.options.fade === !1 ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i])
    }, e.prototype.setProps = function() {
        var i = this,
            e = document.body.style;
        i.positionProp = i.options.vertical === !0 ? "top" : "left",
            "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || i.options.useCSS === !0 && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && i.animType !== !1 && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && i.animType !== !1
    }, e.prototype.setSlideClasses = function(i) {
        var e, t, o, s, n = this;
        if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("slick-current"), n.options.centerMode === !0) {
            var r = n.options.slidesToShow % 2 === 0 ? 1 : 0;
            e = Math.floor(n.options.slidesToShow / 2), n.options.infinite === !0 && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(i).addClass("slick-center")
        } else i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = n.options.infinite === !0 ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad()
    }, e.prototype.setupInfinite = function() {
        var e, t, o, s = this;
        if (s.options.fade === !0 && (s.options.centerMode = !1), s.options.infinite === !0 && s.options.fade === !1 && (t = null, s.slideCount > s.options.slidesToShow)) {
            for (o = s.options.centerMode === !0 ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1) t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
            for (e = 0; e < o + s.slideCount; e += 1) t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
            s.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                i(this).attr("id", "")
            })
        }
    }, e.prototype.interrupt = function(i) {
        var e = this;
        i || e.autoPlay(), e.interrupted = i
    }, e.prototype.selectHandler = function(e) {
        var t = this,
            o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"),
            s = parseInt(o.attr("data-slick-index"));
        return s || (s = 0), t.slideCount <= t.options.slidesToShow ? void t.slideHandler(s, !1, !0) : void t.slideHandler(s)
    }, e.prototype.slideHandler = function(i, e, t) {
        var o, s, n, r, l, d = null,
            a = this;
        if (e = e || !1, !(a.animating === !0 && a.options.waitForAnimate === !0 || a.options.fade === !0 && a.currentSlide === i)) return e === !1 && a.asNavFor(i), o = i, d = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, a.options.infinite === !1 && a.options.centerMode === !1 && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll) ? void(a.options.fade === !1 && (o = a.currentSlide, t !== !0 && a.slideCount > a.options.slidesToShow ? a.animateSlide(r, function() {
            a.postSlide(o)
        }) : a.postSlide(o))) : a.options.infinite === !1 && a.options.centerMode === !0 && (i < 0 || i > a.slideCount - a.options.slidesToScroll) ? void(a.options.fade === !1 && (o = a.currentSlide, t !== !0 && a.slideCount > a.options.slidesToShow ? a.animateSlide(r, function() {
            a.postSlide(o)
        }) : a.postSlide(o))) : (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll !== 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll !== 0 ? 0 : o - a.slideCount : o, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, s]), n = a.currentSlide, a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (l = a.getNavTarget(), l = l.slick("getSlick"), l.slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide)), a.updateDots(), a.updateArrows(), a.options.fade === !0 ? (t !== !0 ? (a.fadeSlideOut(n), a.fadeSlide(s, function() {
            a.postSlide(s)
        })) : a.postSlide(s), void a.animateHeight()) : void(t !== !0 && a.slideCount > a.options.slidesToShow ? a.animateSlide(d, function() {
            a.postSlide(s)
        }) : a.postSlide(s)))
    }, e.prototype.startLoad = function() {
        var i = this;
        i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), i.options.dots === !0 && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading")
    }, e.prototype.swipeDirection = function() {
        var i, e, t, o, s = this;
        return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), o = Math.round(180 * t / Math.PI), o < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? s.options.rtl === !1 ? "left" : "right" : o <= 360 && o >= 315 ? s.options.rtl === !1 ? "left" : "right" : o >= 135 && o <= 225 ? s.options.rtl === !1 ? "right" : "left" : s.options.verticalSwiping === !0 ? o >= 35 && o <= 135 ? "down" : "up" : "vertical"
    }, e.prototype.swipeEnd = function(i) {
        var e, t, o = this;
        if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1, !1;
        if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1;
        if (o.touchObject.edgeHit === !0 && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
            switch (t = o.swipeDirection()) {
                case "left":
                case "down":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1
            }
            "vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t]))
        } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
    }, e.prototype.swipeHandler = function(i) {
        var e = this;
        if (!(e.options.swipe === !1 || "ontouchend" in document && e.options.swipe === !1 || e.options.draggable === !1 && i.type.indexOf("mouse") !== -1)) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, e.options.verticalSwiping === !0 && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) {
            case "start":
                e.swipeStart(i);
                break;
            case "move":
                e.swipeMove(i);
                break;
            case "end":
                e.swipeEnd(i)
        }
    }, e.prototype.swipeMove = function(i) {
        var e, t, o, s, n, r, l = this;
        return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0, !1) : (l.options.verticalSwiping === !0 && (l.touchObject.swipeLength = r), t = l.swipeDirection(), void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0, i.preventDefault()), s = (l.options.rtl === !1 ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), l.options.verticalSwiping === !0 && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1), o = l.touchObject.swipeLength, l.touchObject.edgeHit = !1, l.options.infinite === !1 && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction, l.touchObject.edgeHit = !0), l.options.vertical === !1 ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s, l.options.verticalSwiping === !0 && (l.swipeLeft = e + o * s), l.options.fade !== !0 && l.options.touchMove !== !1 && (l.animating === !0 ? (l.swipeLeft = null, !1) : void l.setCSS(l.swipeLeft))))
    }, e.prototype.swipeStart = function(i) {
        var e, t = this;
        return t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow ? (t.touchObject = {}, !1) : (void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, void(t.dragging = !0))
    }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
        var i = this;
        null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit())
    }, e.prototype.unload = function() {
        var e = this;
        i(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, e.prototype.unslick = function(i) {
        var e = this;
        e.$slider.trigger("unslick", [e, i]), e.destroy()
    }, e.prototype.updateArrows = function() {
        var i, e = this;
        i = Math.floor(e.options.slidesToShow / 2), e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && e.options.centerMode === !1 ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && e.options.centerMode === !0 && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, e.prototype.updateDots = function() {
        var i = this;
        null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"))
    }, e.prototype.visibility = function() {
        var i = this;
        i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1)
    }, i.fn.slick = function() {
        var i, t, o = this,
            s = arguments[0],
            n = Array.prototype.slice.call(arguments, 1),
            r = o.length;
        for (i = 0; i < r; i++)
            if ("object" == typeof s || "undefined" == typeof s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n), "undefined" != typeof t) return t;
        return o
    }
});
/*! @license ScrollReveal v4.0.7
	Copyright 2020 Fisssion LLC.
	Licensed under the GNU General Public License 3.0 for
	compatible open source projects and non-commercial use.
	For commercial sites, themes, projects, and applications,
	keep your source code private/proprietary by purchasing
	a commercial license from https://scrollrevealjs.org/
*/
var ScrollReveal = function() {
    "use strict";
    var r = {
        delay: 0,
        distance: "0",
        duration: 600,
        easing: "cubic-bezier(0.5, 0, 0, 1)",
        interval: 0,
        opacity: 0,
        origin: "bottom",
        rotate: {
            x: 0,
            y: 0,
            z: 0
        },
        scale: 1,
        cleanup: !1,
        container: document.documentElement,
        desktop: !0,
        mobile: !0,
        reset: !1,
        useDelay: "always",
        viewFactor: 0,
        viewOffset: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        afterReset: function() {},
        afterReveal: function() {},
        beforeReset: function() {},
        beforeReveal: function() {}
    };
    var n = {
        success: function() {
            document.documentElement.classList.add("sr"), document.body ? document.body.style.height = "100%" : document.addEventListener("DOMContentLoaded", function() {
                document.body.style.height = "100%"
            })
        },
        failure: function() {
            return document.documentElement.classList.remove("sr"), {
                clean: function() {},
                destroy: function() {},
                reveal: function() {},
                sync: function() {},
                get noop() {
                    return !0
                }
            }
        }
    };

    function o(e) {
        return "object" == typeof window.Node ? e instanceof window.Node : null !== e && "object" == typeof e && "number" == typeof e.nodeType && "string" == typeof e.nodeName
    }

    function u(e, t) {
        if (void 0 === t && (t = document), e instanceof Array) return e.filter(o);
        if (o(e)) return [e];
        if (n = e, i = Object.prototype.toString.call(n), "object" == typeof window.NodeList ? n instanceof window.NodeList : null !== n && "object" == typeof n && "number" == typeof n.length && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(i) && (0 === n.length || o(n[0]))) return Array.prototype.slice.call(e);
        var n, i;
        if ("string" == typeof e) try {
            var r = t.querySelectorAll(e);
            return Array.prototype.slice.call(r)
        } catch (e) {
            return []
        }
        return []
    }

    function s(e) {
        return null !== e && e instanceof Object && (e.constructor === Object || "[object Object]" === Object.prototype.toString.call(e))
    }

    function f(n, i) {
        if (s(n)) return Object.keys(n).forEach(function(e) {
            return i(n[e], e, n)
        });
        if (n instanceof Array) return n.forEach(function(e, t) {
            return i(e, t, n)
        });
        throw new TypeError("Expected either an array or object literal.")
    }

    function h(e) {
        for (var t = [], n = arguments.length - 1; 0 < n--;) t[n] = arguments[n + 1];
        if (this.constructor.debug && console) {
            var i = "%cScrollReveal: " + e;
            t.forEach(function(e) {
                return i += "\n — " + e
            }), console.log(i, "color: #ea654b;")
        }
    }

    function t() {
        var n = this,
            i = {
                active: [],
                stale: []
            },
            t = {
                active: [],
                stale: []
            },
            r = {
                active: [],
                stale: []
            };
        try {
            f(u("[data-sr-id]"), function(e) {
                var t = parseInt(e.getAttribute("data-sr-id"));
                i.active.push(t)
            })
        } catch (e) {
            throw e
        }
        f(this.store.elements, function(e) {
            -1 === i.active.indexOf(e.id) && i.stale.push(e.id)
        }), f(i.stale, function(e) {
            return delete n.store.elements[e]
        }), f(this.store.elements, function(e) {
            -1 === r.active.indexOf(e.containerId) && r.active.push(e.containerId), e.hasOwnProperty("sequence") && -1 === t.active.indexOf(e.sequence.id) && t.active.push(e.sequence.id)
        }), f(this.store.containers, function(e) {
            -1 === r.active.indexOf(e.id) && r.stale.push(e.id)
        }), f(r.stale, function(e) {
            var t = n.store.containers[e].node;
            t.removeEventListener("scroll", n.delegate), t.removeEventListener("resize", n.delegate), delete n.store.containers[e]
        }), f(this.store.sequences, function(e) {
            -1 === t.active.indexOf(e.id) && t.stale.push(e.id)
        }), f(t.stale, function(e) {
            return delete n.store.sequences[e]
        })
    }

    function p(e) {
        var i, r = this;
        try {
            f(u(e), function(e) {
                var t = e.getAttribute("data-sr-id");
                if (null !== t) {
                    i = !0;
                    var n = r.store.elements[t];
                    n.callbackTimer && window.clearTimeout(n.callbackTimer.clock), e.setAttribute("style", n.styles.inline.generated), e.removeAttribute("data-sr-id"), delete r.store.elements[t]
                }
            })
        } catch (e) {
            return h.call(this, "Clean failed.", e.message)
        }
        if (i) try {
            t.call(this)
        } catch (e) {
            return h.call(this, "Clean failed.", e.message)
        }
    }

    function N(e) {
        if (e.constructor !== Array) throw new TypeError("Expected array.");
        if (16 === e.length) return e;
        if (6 !== e.length) throw new RangeError("Expected array with either 6 or 16 values.");
        var t = z();
        return t[0] = e[0], t[1] = e[1], t[4] = e[2], t[5] = e[3], t[12] = e[4], t[13] = e[5], t
    }

    function z() {
        for (var e = [], t = 0; t < 16; t++) t % 5 == 0 ? e.push(1) : e.push(0);
        return e
    }

    function F(e, t) {
        for (var n = N(e), i = N(t), r = [], o = 0; o < 4; o++)
            for (var s = [n[o], n[o + 4], n[o + 8], n[o + 12]], a = 0; a < 4; a++) {
                var c = 4 * a,
                    l = [i[c], i[c + 1], i[c + 2], i[c + 3]],
                    d = s[0] * l[0] + s[1] * l[1] + s[2] * l[2] + s[3] * l[3];
                r[o + c] = d
            }
        return r
    }

    function D(e, t) {
        var n = z();
        return n[0] = e, n[5] = "number" == typeof t ? t : e, n
    }
    var S = function() {
        var n = {},
            i = document.documentElement.style;

        function e(e, t) {
            if (void 0 === t && (t = i), e && "string" == typeof e) {
                if (n[e]) return n[e];
                if ("string" == typeof t[e]) return n[e] = e;
                if ("string" == typeof t["-webkit-" + e]) return n[e] = "-webkit-" + e;
                throw new RangeError('Unable to find "' + e + '" style property.')
            }
            throw new TypeError("Expected a string.")
        }
        return e.clearCache = function() {
            return n = {}
        }, e
    }();

    function m(e) {
        var t = window.getComputedStyle(e.node),
            n = t.position,
            i = e.config,
            r = {},
            o = (e.node.getAttribute("style") || "").match(/[\w-]+\s*:\s*[^;]+\s*/gi) || [];
        r.computed = o ? o.map(function(e) {
            return e.trim()
        }).join("; ") + ";" : "", r.generated = o.some(function(e) {
            return e.match(/visibility\s?:\s?visible/i)
        }) ? r.computed : o.concat(["visibility: visible"]).map(function(e) {
            return e.trim()
        }).join("; ") + ";";
        var s, a, c, l, d, u, f, h, p, m, y, v, g, b = parseFloat(t.opacity),
            w = isNaN(parseFloat(i.opacity)) ? parseFloat(t.opacity) : parseFloat(i.opacity),
            E = {
                computed: b !== w ? "opacity: " + b + ";" : "",
                generated: b !== w ? "opacity: " + w + ";" : ""
            },
            j = [];
        if (parseFloat(i.distance)) {
            var T = "top" === i.origin || "bottom" === i.origin ? "Y" : "X",
                k = i.distance;
            "top" !== i.origin && "left" !== i.origin || (k = /^-/.test(k) ? k.substr(1) : "-" + k);
            var O = k.match(/(^-?\d+\.?\d?)|(em$|px$|%$)/g),
                x = O[0];
            switch (O[1]) {
                case "em":
                    k = parseInt(t.fontSize) * x;
                    break;
                case "px":
                    k = x;
                    break;
                case "%":
                    k = "Y" === T ? e.node.getBoundingClientRect().height * x / 100 : e.node.getBoundingClientRect().width * x / 100;
                    break;
                default:
                    throw new RangeError("Unrecognized or missing distance unit.")
            }
            "Y" === T ? j.push((c = k, (l = z())[13] = c, l)) : j.push((s = k, (a = z())[12] = s, a))
        }
        i.rotate.x && j.push((d = i.rotate.x, u = Math.PI / 180 * d, (f = z())[5] = f[10] = Math.cos(u), f[6] = f[9] = Math.sin(u), f[9] *= -1, f)), i.rotate.y && j.push((h = i.rotate.y, p = Math.PI / 180 * h, (m = z())[0] = m[10] = Math.cos(p), m[2] = m[8] = Math.sin(p), m[2] *= -1, m)), i.rotate.z && j.push((y = i.rotate.z, v = Math.PI / 180 * y, (g = z())[0] = g[5] = Math.cos(v), g[1] = g[4] = Math.sin(v), g[4] *= -1, g)), 1 !== i.scale && (0 === i.scale ? j.push(D(2e-4)) : j.push(D(i.scale)));
        var A = {};
        if (j.length) {
            A.property = S("transform"), A.computed = {
                raw: t[A.property],
                matrix: function(e) {
                    if ("string" == typeof e) {
                        var t = e.match(/matrix(3d)?\(([^)]+)\)/);
                        if (t) return N(t[2].split(", ").map(parseFloat))
                    }
                    return z()
                }(t[A.property])
            }, j.unshift(A.computed.matrix);
            var R = j.reduce(F);
            A.generated = {
                initial: A.property + ": matrix3d(" + R.join(", ") + ");",
                final: A.property + ": matrix3d(" + A.computed.matrix.join(", ") + ");"
            }
        } else A.generated = {
            initial: "",
            final: ""
        };
        var q = {};
        if (E.generated || A.generated.initial) {
            q.property = S("transition"), q.computed = t[q.property], q.fragments = [];
            var P = i.delay,
                L = i.duration,
                M = i.easing;
            E.generated && q.fragments.push({
                delayed: "opacity " + L / 1e3 + "s " + M + " " + P / 1e3 + "s",
                instant: "opacity " + L / 1e3 + "s " + M + " 0s"
            }), A.generated.initial && q.fragments.push({
                delayed: A.property + " " + L / 1e3 + "s " + M + " " + P / 1e3 + "s",
                instant: A.property + " " + L / 1e3 + "s " + M + " 0s"
            }), q.computed && !q.computed.match(/all 0s|none 0s/) && q.fragments.unshift({
                delayed: q.computed,
                instant: q.computed
            });
            var I = q.fragments.reduce(function(e, t, n) {
                return e.delayed += 0 === n ? t.delayed : ", " + t.delayed, e.instant += 0 === n ? t.instant : ", " + t.instant, e
            }, {
                delayed: "",
                instant: ""
            });
            q.generated = {
                delayed: q.property + ": " + I.delayed + ";",
                instant: q.property + ": " + I.instant + ";"
            }
        } else q.generated = {
            delayed: "",
            instant: ""
        };
        return {
            inline: r,
            opacity: E,
            position: n,
            transform: A,
            transition: q
        }
    }

    function c(e, t) {
        void 0 === t && (t = {});
        var n = t.pristine || this.pristine,
            i = "always" === e.config.useDelay || "onload" === e.config.useDelay && n || "once" === e.config.useDelay && !e.seen,
            r = e.visible && !e.revealed,
            o = !e.visible && e.revealed && e.config.reset;
        return t.reveal || r ? function(e, t) {
            var n = [e.styles.inline.generated, e.styles.opacity.computed, e.styles.transform.generated.final];
            t ? n.push(e.styles.transition.generated.delayed) : n.push(e.styles.transition.generated.instant);
            e.revealed = e.seen = !0, e.node.setAttribute("style", n.filter(function(e) {
                return "" !== e
            }).join(" ")), a.call(this, e, t)
        }.call(this, e, i) : t.reset || o ? function(e) {
            var t = [e.styles.inline.generated, e.styles.opacity.generated, e.styles.transform.generated.initial, e.styles.transition.generated.instant];
            e.revealed = !1, e.node.setAttribute("style", t.filter(function(e) {
                return "" !== e
            }).join(" ")), a.call(this, e)
        }.call(this, e) : void 0
    }

    function a(e, t) {
        var n = this,
            i = t ? e.config.duration + e.config.delay : e.config.duration,
            r = e.revealed ? e.config.beforeReveal : e.config.beforeReset,
            o = e.revealed ? e.config.afterReveal : e.config.afterReset,
            s = 0;
        e.callbackTimer && (s = Date.now() - e.callbackTimer.start, window.clearTimeout(e.callbackTimer.clock)), r(e.node), e.callbackTimer = {
            start: Date.now(),
            clock: window.setTimeout(function() {
                o(e.node), e.callbackTimer = null, e.revealed && !e.config.reset && e.config.cleanup && p.call(n, e.node)
            }, i - s)
        }
    }
    var e, y = (e = 0, function() {
        return e++
    });

    function l(e, t) {
        if (void 0 === t && (t = this.pristine), !e.visible && e.revealed && e.config.reset) return c.call(this, e, {
            reset: !0
        });
        var n = this.store.sequences[e.sequence.id],
            i = e.sequence.index;
        if (n) {
            var r = new d(n, "visible", this.store),
                o = new d(n, "revealed", this.store);
            if (n.models = {
                    visible: r,
                    revealed: o
                }, !o.body.length) {
                var s = n.members[r.body[0]],
                    a = this.store.elements[s];
                if (a) return g.call(this, n, r.body[0], -1, t), g.call(this, n, r.body[0], 1, t), c.call(this, a, {
                    reveal: !0,
                    pristine: t
                })
            }
            if (!n.blocked.head && i === [].concat(o.head).pop() && i >= [].concat(r.body).shift()) return g.call(this, n, i, -1, t), c.call(this, e, {
                reveal: !0,
                pristine: t
            });
            if (!n.blocked.foot && i === [].concat(o.foot).shift() && i <= [].concat(r.body).pop()) return g.call(this, n, i, 1, t), c.call(this, e, {
                reveal: !0,
                pristine: t
            })
        }
    }

    function v(e) {
        var t = Math.abs(e);
        if (isNaN(t)) throw new RangeError("Invalid sequence interval.");
        this.id = y(), this.interval = Math.max(t, 16), this.members = [], this.models = {}, this.blocked = {
            head: !1,
            foot: !1
        }
    }

    function d(e, i, r) {
        var o = this;
        this.head = [], this.body = [], this.foot = [], f(e.members, function(e, t) {
            var n = r.elements[e];
            n && n[i] && o.body.push(t)
        }), this.body.length && f(e.members, function(e, t) {
            var n = r.elements[e];
            n && !n[i] && (t < o.body[0] ? o.head.push(t) : o.foot.push(t))
        })
    }

    function g(e, t, n, i) {
        var r = this,
            o = ["head", null, "foot"][1 + n],
            s = e.members[t + n],
            a = this.store.elements[s];
        e.blocked[o] = !0, setTimeout(function() {
            e.blocked[o] = !1, a && l.call(r, a, i)
        }, e.interval)
    }

    function b() {
        var n = this;
        t.call(this), f(this.store.elements, function(e) {
            var t = [e.styles.inline.generated];
            e.visible ? (t.push(e.styles.opacity.computed), t.push(e.styles.transform.generated.final), e.revealed = !0) : (t.push(e.styles.opacity.generated), t.push(e.styles.transform.generated.initial), e.revealed = !1), e.node.setAttribute("style", t.filter(function(e) {
                return "" !== e
            }).join(" "))
        }), f(this.store.containers, function(e) {
            var t = e.node === document.documentElement ? window : e.node;
            t.addEventListener("scroll", n.delegate), t.addEventListener("resize", n.delegate)
        }), this.delegate(), this.initTimeout = null
    }

    function w(e) {
        return void 0 === e && (e = navigator.userAgent), /Android|iPhone|iPad|iPod/i.test(e)
    }

    function E(n) {
        for (var e = [], t = arguments.length - 1; 0 < t--;) e[t] = arguments[t + 1];
        if (s(n)) return f(e, function(e) {
            f(e, function(e, t) {
                s(e) ? (n[t] && s(n[t]) || (n[t] = {}), E(n[t], e)) : n[t] = e
            })
        }), n;
        throw new TypeError("Target must be an object literal.")
    }

    function i(e, a, t) {
        var c = this;
        void 0 === a && (a = {}), void 0 === t && (t = !1);
        var l, d = [],
            n = a.interval || r.interval;
        try {
            n && (l = new v(n));
            var i = u(e);
            if (!i.length) throw new Error("Invalid reveal target.");
            f(i.reduce(function(e, t) {
                var n = {},
                    i = t.getAttribute("data-sr-id");
                i ? (E(n, c.store.elements[i]), n.node.setAttribute("style", n.styles.inline.computed)) : (n.id = y(), n.node = t, n.seen = !1, n.revealed = !1, n.visible = !1);
                var r = E({}, n.config || c.defaults, a);
                if (!r.mobile && w() || !r.desktop && !w()) return i && p.call(c, n), e;
                var o, s = u(r.container)[0];
                if (!s) throw new Error("Invalid container.");
                return s.contains(t) && (null === (o = function(t) {
                    var e = [],
                        n = arguments.length - 1;
                    for (; 0 < n--;) e[n] = arguments[n + 1];
                    var i = null;
                    return f(e, function(e) {
                        f(e, function(e) {
                            null === i && e.node === t && (i = e.id)
                        })
                    }), i
                }(s, d, c.store.containers)) && (o = y(), d.push({
                    id: o,
                    node: s
                })), n.config = r, n.containerId = o, n.styles = m(n), l && (n.sequence = {
                    id: l.id,
                    index: l.members.length
                }, l.members.push(n.id)), e.push(n)), e
            }, []), function(e) {
                (c.store.elements[e.id] = e).node.setAttribute("data-sr-id", e.id)
            })
        } catch (e) {
            return h.call(this, "Reveal failed.", e.message)
        }
        f(d, function(e) {
            c.store.containers[e.id] = {
                id: e.id,
                node: e.node
            }
        }), l && (this.store.sequences[l.id] = l), !0 !== t && (this.store.history.push({
            target: e,
            options: a
        }), this.initTimeout && window.clearTimeout(this.initTimeout), this.initTimeout = window.setTimeout(b.bind(this), 0))
    }
    var j, T = Math.sign || function(e) {
            return (0 < e) - (e < 0) || +e
        },
        k = (j = Date.now(), function(e) {
            var t = Date.now();
            16 < t - j ? e(j = t) : setTimeout(function() {
                return k(e)
            }, 0)
        }),
        O = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || k;

    function x(e, t) {
        for (var n = t ? e.node.clientHeight : e.node.offsetHeight, i = t ? e.node.clientWidth : e.node.offsetWidth, r = 0, o = 0, s = e.node; isNaN(s.offsetTop) || (r += s.offsetTop), isNaN(s.offsetLeft) || (o += s.offsetLeft), s = s.offsetParent;);
        return {
            bounds: {
                top: r,
                right: o + i,
                bottom: r + n,
                left: o
            },
            height: n,
            width: i
        }
    }

    function A(e, t) {
        var i = this;
        void 0 === e && (e = {
            type: "init"
        }), void 0 === t && (t = this.store.elements), O(function() {
            var n = "init" === e.type || "resize" === e.type;
            f(i.store.containers, function(e) {
                n && (e.geometry = x.call(i, e, !0));
                var t = function(e) {
                    var t, n;
                    return n = e.node === document.documentElement ? (t = window.pageYOffset, window.pageXOffset) : (t = e.node.scrollTop, e.node.scrollLeft), {
                        top: t,
                        left: n
                    }
                }.call(i, e);
                e.scroll && (e.direction = {
                    x: T(t.left - e.scroll.left),
                    y: T(t.top - e.scroll.top)
                }), e.scroll = t
            }), f(t, function(e) {
                (n || void 0 === e.geometry) && (e.geometry = x.call(i, e)), e.visible = function(e) {
                    void 0 === e && (e = {});
                    var t = this.store.containers[e.containerId];
                    if (t) {
                        var n = Math.max(0, Math.min(1, e.config.viewFactor)),
                            i = e.config.viewOffset,
                            r = e.geometry.bounds.top + e.geometry.height * n,
                            o = e.geometry.bounds.right - e.geometry.width * n,
                            s = e.geometry.bounds.bottom - e.geometry.height * n,
                            a = e.geometry.bounds.left + e.geometry.width * n,
                            c = t.geometry.bounds.top + t.scroll.top + i.top,
                            l = t.geometry.bounds.right + t.scroll.left - i.right,
                            d = t.geometry.bounds.bottom + t.scroll.top - i.bottom,
                            u = t.geometry.bounds.left + t.scroll.left + i.left;
                        return r < d && u < o && c < s && a < l || "fixed" === e.styles.position
                    }
                }.call(i, e)
            }), f(t, function(e) {
                e.sequence ? l.call(i, e) : c.call(i, e)
            }), i.pristine = !1
        })
    }
    var R, q, P, L, M, I, C, W, Y = "4.0.7";

    function $(e) {
        var t;
        if (void 0 === e && (e = {}), void 0 === this || Object.getPrototypeOf(this) !== $.prototype) return new $(e);
        if (!$.isSupported()) return h.call(this, "Instantiation failed.", "This browser is not supported."), n.failure();
        try {
            t = E({}, I || r, e)
        } catch (e) {
            return h.call(this, "Invalid configuration.", e.message), n.failure()
        }
        try {
            if (!u(t.container)[0]) throw new Error("Invalid container.")
        } catch (e) {
            return h.call(this, e.message), n.failure()
        }
        return !(I = t).mobile && w() || !I.desktop && !w() ? (h.call(this, "This device is disabled.", "desktop: " + I.desktop, "mobile: " + I.mobile), n.failure()) : (n.success(), this.store = {
            containers: {},
            elements: {},
            history: [],
            sequences: {}
        }, this.pristine = !0, R = R || A.bind(this), q = q || function() {
            var n = this;
            f(this.store.elements, function(e) {
                e.node.setAttribute("style", e.styles.inline.generated), e.node.removeAttribute("data-sr-id")
            }), f(this.store.containers, function(e) {
                var t = e.node === document.documentElement ? window : e.node;
                t.removeEventListener("scroll", n.delegate), t.removeEventListener("resize", n.delegate)
            }), this.store = {
                containers: {},
                elements: {},
                history: [],
                sequences: {}
            }
        }.bind(this), P = P || i.bind(this), L = L || p.bind(this), M = M || function() {
            var t = this;
            f(this.store.history, function(e) {
                i.call(t, e.target, e.options, !0)
            }), b.call(this)
        }.bind(this), Object.defineProperty(this, "delegate", {
            get: function() {
                return R
            }
        }), Object.defineProperty(this, "destroy", {
            get: function() {
                return q
            }
        }), Object.defineProperty(this, "reveal", {
            get: function() {
                return P
            }
        }), Object.defineProperty(this, "clean", {
            get: function() {
                return L
            }
        }), Object.defineProperty(this, "sync", {
            get: function() {
                return M
            }
        }), Object.defineProperty(this, "defaults", {
            get: function() {
                return I
            }
        }), Object.defineProperty(this, "version", {
            get: function() {
                return Y
            }
        }), Object.defineProperty(this, "noop", {
            get: function() {
                return !1
            }
        }), W || (W = this))
    }
    return $.isSupported = function() {
        return ("transform" in (t = document.documentElement.style) || "WebkitTransform" in t) && ("transition" in (e = document.documentElement.style) || "WebkitTransition" in e);
        var e, t
    }, Object.defineProperty($, "debug", {
        get: function() {
            return C || !1
        },
        set: function(e) {
            return C = "boolean" == typeof e ? e : C
        }
    }), $(), $
}();
jQuery(document).ready(function($) {
    $flo_freeswatch_infoz = $('#flo_freeswatch_infoz');
    $swatch_bg_flower = $('#swatch_bg_flower');
    $header = $('#mk-header-1');
    $swatch_select_details = $('#swatch_select_details');
    $swatch_footer = $('#swatch_footer');
    $ssd_pic = $('#ssd_pic');
    $ssd_swatch_family = $('#ssd_swatch_family');
    $ssd_swatch_name = $('#ssd_swatch_name');
    $ssd_desc = $('#ssd_desc');
    $ssd_care_desc = $('#ssd_care_desc');
    $ssh_luxe = $('#ssh_luxe');
    $ssh_kid_and_pf = $('#ssh_kid_and_pf');
    $ssh_durable = $('#ssh_performance');
    $ssh_cleanable = $('#ssh_cleanable');
    $swatch_select = $('#swatch_select');
    $swatch_bg_holder = $('#swatch_bg_holder');
    $('#ofsw_bg').imagesLoaded(function() {
        $('#ofsw_swatch1').imagesLoaded(function() {
            $('#ofsw_swatch1').removeClass('ofsw_not_init').addClass('ofsw_ani');
            setTimeout(function() {
                $('#ofsw_swatch1').imagesLoaded(function() {
                    $('#ofsw_swatch2').removeClass('ofsw_not_init').addClass('ofsw_ani');
                    setTimeout(function() {
                        $('#ofsw_pencil').imagesLoaded(function() {
                            $('#ofsw_pencil').removeClass('ofsw_not_init').addClass('ofsw_ani');
                            setTimeout(function() {
                                $('#ofsw_brush').imagesLoaded(function() {
                                    $('#ofsw_brush').removeClass('ofsw_not_init').addClass('ofsw_ani');
                                });
                            }, 500);
                        });
                    }, 1500);
                });
            }, 500);
        });
    });
    $('#ofsw_flower').imagesLoaded(function() {
        $swatch_bg_flower.addClass('init_after');
    });
    $('#fabric_detailz_content_holder').load($flo_freeswatch_infoz.data('stylesheet') + '/a_fabric_details_sheet.html', function() {});

    function fosw_toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    function on_resize(c, t) {
        onresize = function() {
            clearTimeout(t);
            t = setTimeout(c, 100)
        };
        return c
    };

    function inArray(needle, haystack) {
        var length = haystack.length;
        for (var i = 0; i < length; i++) {
            if (haystack[i] == needle) return true;
        }
        return false;
    }
    var swatch_details_element_pos, swatch_details_sticky_height_trigger;
    on_resize(function() {
        browser_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        calculate_top_background_position(browser_width);
        $swatch_select_details.removeClass('sticky');
        swatch_details_element_pos = $swatch_select_details.offset().top;
        swatch_details_sticky_height_trigger = swatch_details_element_pos - 20;
        swatches_maybe_stick_elements();
        define_swatches_to_order_size();
        calculate_color_piece_width(browser_width);
    })();

    function calculate_top_background_position(browser_width) {
        var offset_height = $swatch_select.offset().top;
        var background_pic_height = parseInt(browser_width / 2.58);
        if (background_pic_height > offset_height) {
            $swatch_bg_holder.css('background-position-y', offset_height - background_pic_height + 'px');
        } else {
            $swatch_bg_holder.css('background-position-y', '0px');
        }
    }

    function define_swatches_to_order_size() {
        var total_width_available = $('#swatches_to_order').innerWidth() - 90;
        var swatch_height_needs_to_be = parseInt(total_width_available / 10 / 1.045);
        var new_margin_top_needs_to_be = parseInt(swatch_height_needs_to_be / 2) * (-1);
        $('#swatches_to_order_inside').css('height', swatch_height_needs_to_be + 'px').css('margin-top', new_margin_top_needs_to_be + 'px');
    }

    function swatches_maybe_stick_elements() {
        var height = $(window).scrollTop();
        var header_height = $header.outerHeight();
        if (height > 306) {
            $swatch_bg_flower.addClass('sticky');
        } else {
            $swatch_bg_flower.removeClass('sticky');
        }
    }

    function calculate_color_piece_width(browser_width) {
        if (browser_width === undefined) {
            browser_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        }
        if (browser_width > 980) {
            available_width = $('#swatch_select_head').innerWidth() - $('#extra_filters_wrap1').outerWidth() - $('#extra_filters_wrap2').outerWidth() - 1;
        } else if (browser_width > 720) {
            available_width = $('#swatch_select_head').innerWidth() - $('#extra_filters_wrap1').outerWidth() - 1;
        } else if (browser_width > 480) {
            available_width = $('#swatch_select_head').innerWidth() - $('#extra_filters_toggle').outerWidth() - 1;
        } else {
            available_width = $('#swatch_select_head').innerWidth() - $('#extra_filters_toggle').outerWidth() - 1;
            available_width = available_width * 2;
            needed_pieces = 14;
            piece_width_is = parseInt(available_width / needed_pieces);
            $('#ssh_c').css('width', piece_width_is * 7 + 'px');
            $('#ssh_c li').css('width', piece_width_is + 'px');
            $('#ssh_c').addClass('initialised');
            return;
        }
        $('#ssh_c').css('width', 'auto');
        needed_pieces = $('#ssh_c li.active').size() * 2.5 + $('#ssh_c li:not(.active)').size();
        piece_width_is = parseInt(available_width / needed_pieces);
        $('#ssh_c li:not(.active)').css('width', piece_width_is + 'px');
        $('#ssh_c li.active').css('width', parseInt(2.3 * piece_width_is) + 'px');
        $('#ssh_c').addClass('initialised');
    }

    function calculate_what_swatches_to_display() {
        calculate_what_swatches_to_display_based_on_color_selection();
        calculate_what_swatches_to_display_based_on_tier();
        calculate_what_swatches_to_display_based_on_luxury();
        calculate_what_swatches_to_display_based_on_kid_and_pet_friendly();
        calculate_what_swatches_to_display_based_on_durability();
        calculate_what_swatches_to_display_based_on_cleanable();
    }

    function calculate_what_swatches_to_display_based_on_color_selection() {
        if ($('#ssh_c li.active').size() == 0) {
            $('.ssz_family, .ssz_swatch').addClass('visible');
            return;
        }
        $('.ssz_swatch').removeClass('visible');
        var valid_colors = [];
        $('#ssh_c li.active').each(function() {
            valid_colors.push($(this).data('color'));
        });
        var valid_families = [];
        $('#fabric_colors li').each(function() {
            $this = $(this);
            var colors = $this.data('color').trim().split(' ');
            $.each(colors, function(index, color) {
                if (inArray(color, valid_colors)) {
                    $('.ssz_swatch[data-family="' + $this.data('family') + '"][data-child="' + $this.data('child') + '"]').addClass('visible');
                    valid_families.push($this.data('family'));
                }
            });
        });
        $('.ssz_family').removeClass('visible');
        if ($flo_freeswatch_infoz.data('show-family-on-filter') == 'true') {
            var valid_families_unique = valid_families.reduce(function(a, b) {
                if (a.indexOf(b) < 0) a.push(b);
                return a;
            }, []);
            var i, s, len = valid_families_unique.length;
            for (i = 0; i < len; ++i) {
                s = valid_families_unique[i];
                $('.ssz_family[data-family="' + s + '"]').addClass('visible');
            }
        }
    }

    // function calculate_what_swatches_to_display_based_on_tier() {
    //     if ($('#ssh_price li[data-tier="all"]').hasClass('active')) {
    //         // return;
    //     }
    //     // $('.ssz_family').removeClass('visible');
    //     valid_tiers = [];
    //     $('#ssh_price li.active').each(function() {
    //         valid_tiers.push($(this).data('tier'));
    //     });
    //     $('#all_swatch_desc li').each(function() {
    //         if (!inArray($(this).data('tier'), valid_tiers)) {
    //             $('.ssz_family[data-family="' + $(this).data('type') + '"], .ssz_swatch[data-family="' + $(this).data('type') + '"]').removeClass('visible');
    //         }
    //     });
    // }

    function calculate_what_swatches_to_display_based_on_luxury() {
        if (!$ssh_luxe.hasClass('active')) {
            return;
        }
        $('.ssz_family').removeClass('visible');
        $('.ssz_family.visible, .ssz_swatch.visible').each(function() {
            if ($('#all_swatch_desc li[data-type="' + $(this).data('family') + '"]').data('luxe') == 'n') {
                $(this).removeClass('visible');
            }
        });
    }

    function calculate_what_swatches_to_display_based_on_kid_and_pet_friendly() {
        if (!$ssh_kid_and_pf.hasClass('active')) {
            return;
        }
        $('.ssz_family').removeClass('visible');
        $('.ssz_family.visible, .ssz_swatch.visible').each(function() {
            if ($('#all_swatch_desc li[data-type="' + $(this).data('family') + '"]').data('pf') === 1) {
                $(this).removeClass('visible');
            }
        });
    }

    function calculate_what_swatches_to_display_based_on_durability() {
        if (!$ssh_durable.hasClass('active')) {
            return;
        }
        $('.ssz_family').removeClass('visible');
        $('.ssz_family.visible, .ssz_swatch.visible').each(function() {
            if ($('#all_swatch_desc li[data-type="' + $(this).data('family') + '"]').data('performance') !== 'y') {
                $(this).removeClass('visible');
            }
        });
    }

    function calculate_what_swatches_to_display_based_on_cleanable() {
        if (!$ssh_cleanable.hasClass('active')) {
            return;
        }
        $('.ssz_family').removeClass('visible');
        $('.ssz_family.visible, .ssz_swatch.visible').each(function() {
            if ($('#all_swatch_desc li[data-type="' + $(this).data('family') + '"]').data('clean') == 'X') {
                $(this).removeClass('visible');
            }
        });
    }
    $('#extra_filters_toggle').on('click', function() {
        $(this).toggleClass('active');
        $('#swatch_select_head').toggleClass('expand_filters');
    });
    $('#ssh_c li').on('click', function() {
        $(this).toggleClass('active');
        calculate_color_piece_width();
        calculate_what_swatches_to_display();
    });
    $('#ssh_price li').on('click', function() {
        if ($(this).data('tier') == 'all') {
            $('#ssh_price li').removeClass('active');
            $(this).addClass('active');
        } else {
            $('#ssh_price li[data-tier="all"]').removeClass('active');
            $(this).toggleClass('active');
            if ($('#ssh_price li.active').size() === 0) {
                $('#ssh_price li[data-tier="all"]').addClass('active');
            }
        }
        calculate_what_swatches_to_display();
    });
    $('.kid_pet_cleanable_filters').on('click', function() {
        $(this).toggleClass('active');
        calculate_what_swatches_to_display();
    });
    $(window).scroll(function() {
        swatches_maybe_stick_elements();
    });
    $('.ssz_swatch').on('click', function() {
        $this = $(this);
        if ($this.hasClass('added')) {
            $('#swatches_to_order_inside img[data-family="' + $this.data('family') + '"][data-child="' + $this.data('child') + '"]').parent().remove();
            $swatch_select_details.removeClass('added');
        } else {
            if ($('.swatch_to_order').size() == 10) {
                $.fancyConfirm({
                    title: "Swatch Limit Reached",
                    message: "You can order up to 10 free swatches.<br />Please refine your selection to 10.",
                    okButton: 'Ok',
                });
                return;
            }
            var img = $('<img />', {
                'src': $this.find('img').eq(0).attr('src'),
                'data-family': $this.data('family'),
                'data-child': $this.data('child')
            });
            var $wrap = $('<div class="swatch_to_order"></div>');
            $wrap.on('click', function() {
                $our_new_img = $(this).find('img').eq(0);
                $('.ssz_swatch[data-family="' + $our_new_img.data('family') + '"][data-child="' + $our_new_img.data('child') + '"]').removeClass('added');
                $(this).remove();
                $swatch_select_details.removeClass('added');
            });
            $wrap.hover(function() {
                $our_new_img = $(this).find('img').eq(0);
                $('.ssz_swatch[data-family="' + $our_new_img.data('family') + '"][data-child="' + $our_new_img.data('child') + '"]').trigger('mouseenter');
            }, function() {});
            img.appendTo($('#swatches_to_order_inside')).wrap($wrap);
            $swatch_select_details.addClass('added');
        }
        $this.toggleClass('added');
        if (!$swatch_footer.hasClass('active')) {
            $swatch_footer.addClass('active');
            define_swatches_to_order_size();
        }
    });
    $ssd_props_rabit = $('#ssd_props .rabit');
    $ssd_props_clean = $('#ssd_props .clean');
    $ssd_props_dense = $('#ssd_props .dense');
    $('.ssz_swatch').hover(function() {
        $this = $(this);
        $ssd_pic.attr('src', $this.find('img').eq(0).attr('src'));
        $ssd_swatch_family.text($this.data('family'));
        $ssd_swatch_name.text($this.data('child'));
        $swatch_family_details = $('#all_swatch_desc li[data-type="' + $this.data('family') + '"]');
        if ($swatch_family_details.data('pf') > 1) {
            $ssd_props_rabit.addClass('active');
        } else {
            $ssd_props_rabit.removeClass('active');
        }
        if ($swatch_family_details.data('clean') !== 'X') {
            $ssd_props_clean.addClass('active');
        } else {
            $ssd_props_clean.removeClass('active');
        }
        $ssd_desc.text($swatch_family_details.data('desc'));
        $ssd_care_desc.text($('#all_swatch_clean_desc li[data-type="' + $swatch_family_details.data('clean') + '"]').data('desc'));
        $swatch_select_details.data('family', $this.data('family'));
        $swatch_select_details.data('child', $this.data('child'));
        if ($this.hasClass('added')) {
            $swatch_select_details.addClass('added');
        } else {
            $swatch_select_details.removeClass('added');
        }
        if (!$swatch_select_details.hasClass('active')) {
            $swatch_select_details.addClass('active');
        }
    }, function() {});
    $('#ssd_care').on('click', function() {
        $ssd_care_desc.slideToggle();
    });
    if (typeof tippy === "function") {
        tippy('#ssd_props .rabit', {
            content: 'This fabric is Kid & Pet Friendly',
        });
        tippy('#ssd_props .clean', {
            content: 'This fabric is cleanable. <br />Check additional care instructions.',
        });
    }
    $('#ssd_add_remove').on('click', function() {
        the_actual_swatch = $('.ssz_swatch[data-family="' + $swatch_select_details.data('family') + '"][data-child="' + $swatch_select_details.data('child') + '"]');
        the_actual_swatch.trigger('click');
        if (the_actual_swatch.hasClass('added')) {
            $swatch_select_details.addClass('added');
        } else {
            $swatch_select_details.removeClass('added');
        }
    });
    $('#ss_order_button').on('click', function() {
        $.fancybox.open({
            src: '#swatch_sect4_wrap',
            type: 'inline',
            opts: {
                beforeShow: function() {
                    $('#swatch_sect4_sidebar').css('display', 'none');
                    $('#ss4_swatch_container').empty();
                    $('.swatch_to_order img').each(function() {
                        var img = $('<img />', {
                            'src': $(this).attr('src'),
                            'data-family': $(this).data('family'),
                            'data-child': $(this).data('child')
                        });
                        img.prependTo($('#ss4_swatch_container')).wrap('<li class="ss4_sc_swatch"></li>').after('<h4>' + $(this).data('family') + '</h4><h5>' + $(this).data('child') + '</h5><div class="close_button ss4_square_close_button">x</div>');
                    });
                    $('.ss4_sc_swatch .close_button').off();
                    $('.ss4_sc_swatch .close_button').on('click', function() {
                        $parent = $(this).parent();
                        $img = $parent.find('img').eq(0);
                        $('.swatch_to_order img[data-family="' + $img.data('family') + '"][data-child="' + $img.data('child') + '"]').parent().trigger('click');
                        $parent.remove();
                    });
                },
                afterShow: function(instance, current) {
                    $('#swatch_sect4_sidebar').slideToggle(250, function() {
                        var swatches_totalno = $('.ss4_sc_swatch').size();
                        var i;
                        for (i = swatches_totalno; i > 0; i--) {
                            animate_swatch_individually(i);
                        }

                        function animate_swatch_individually(i) {
                            setTimeout(function() {
                                $('.ss4_sc_swatch').eq(i - 1).slideToggle(250);
                            }, i * 300);
                        }
                    });
                },
                modal: true,
                baseClass: 'swatches_order',
                touch: false,
            }
        });
    });
    $.fancyConfirm = function(opts) {
        opts = $.extend(true, {
            title: 'Are you sure?',
            message: '',
            okButton: 'OK',
            callback: $.noop
        }, opts || {});
        $.fancybox.open({
            type: 'html',
            src: '<div class="fc-content-confirm">' + '<h3>' + opts.title + '</h3>' + '<p>' + opts.message + '</p>' + '<p class="tright">' + '<button data-value="1" data-fancybox-close class="btn">' + opts.okButton + '</button>' + '</p>' + '</div>',
            opts: {
                animationDuration: 350,
                animationEffect: 'material',
                modal: true,
                baseTpl: '<div class="fancybox-container fc-container" role="dialog" tabindex="-1">' + '<div class="fancybox-bg"></div>' + '<div class="fancybox-inner">' + '<div class="fancybox-stage"></div>' + '</div>' + '</div>',
                afterClose: function(instance, current, e) {
                    var button = e ? e.target || e.currentTarget : null;
                    var value = button ? $(button).data('value') : 0;
                    opts.callback(value);
                }
            }
        });
    };
    ScrollReveal().reveal('.reveal', {
        distance: '30px',
        opacity: 0,
        duration: 1000,
        scale: 0.8
    });
    (function() {
        if (!String.prototype.trim) {
            (function() {
                var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
                String.prototype.trim = function() {
                    return this.replace(rtrim, '');
                };
            })();
        }
        [].slice.call(document.querySelectorAll('input.input__field')).forEach(function(inputEl) {
            if (inputEl.value.trim() !== '') {
                classie.add(inputEl.parentNode, 'input--filled');
            }
            inputEl.addEventListener('focus', onInputFocus);
            inputEl.addEventListener('blur', onInputBlur);
        });

        function onInputFocus(ev) {
            classie.add(ev.target.parentNode, 'input--filled');
        }

        function onInputBlur(ev) {
            if (ev.target.value.trim() === '') {
                classie.remove(ev.target.parentNode, 'input--filled');
            }
        }
    })();
    var validator = $('#freeswatch_order_form').validate({
        rules: {
            'sw_first_name': {
                required: true,
            },
            'sw_email': {
                required: true,
            },
            'sw_last_name': {
                required: true,
            },
            'sw_phone': {
                required: true,
            },
            'sw_street': {
                required: true,
            },
            'sw_city': {
                required: true,
            },
            'sw_state': {
                required: true,
            },
            'sw_zip': {
                required: true,
                digits: true,
                minlength: 5,
                maxlength: 5
            },
            'sw_country': {
                required: true,
            }
        },
        ignore: ":hidden",
        errorElement: "span",
        invalidHandler: function(event, validator) {},
    });
    $('#sc_goto_2').on('click', function() {
        if ($('.swatch_to_order').size() > 0) {
            console.log('for some reason valid');
            if ($('#freeswatch_order_form').valid()) {
                $('#sc_step1').attr('aria-hidden', true);
                $('#sc_step1').slideToggle('medium', function() {
                    $('#sc_step2').slideToggle('medium', function() {
                        $('#sc_step2').attr('aria-hidden', false);
                        $('#checkout_navi li').removeClass('active');
                        $('#checkout_navi #step_2').addClass('active');
                        $('#checkout_navi').addClass('clickable');
                        $('.sc_stepz').removeClass('active');
                        $('#sc_step2').addClass('active');
                    });
                });
            }
        } else {
            $.fancyConfirm({
                title: "No Swatch Selected",
                message: "You need to go back and first add the swatches that you'd like by clicking the Add button.",
                okButton: 'Understood',
            });
            $('html, body').animate({
                scrollTop: $("#swatches_wrap").offset().top - 70
            }, 2000);
        }
    });
    $('#checkout_navi #step_1').on('click', function() {
        if ($('#sc_step2').hasClass('active')) {
            $('#sc_step2').attr('aria-hidden', true);
            $('#sc_step2').slideToggle('medium', function() {
                $('#sc_step1').slideToggle('medium', function() {
                    $('#sc_step1').attr('aria-hidden', false);
                    $('#checkout_navi li').removeClass('active');
                    $('#checkout_navi #step_1').addClass('active');
                    $('#checkout_navi').removeClass('clickable');
                    $('.sc_stepz').removeClass('active');
                    $('#sc_step1').addClass('active');
                });
            });
        }
    })
    $('#checkout_navi #step_2').on('click', function() {
        if ($('#freeswatch_order_form').valid()) {
            if ($('#sc_step1').hasClass('active')) {
                $('#sc_step1').attr('aria-hidden', true);
                $('#sc_step1').slideToggle('medium', function() {
                    $('#sc_step2').slideToggle('medium', function() {
                        $('#sc_step2').attr('aria-hidden', false);
                        $('#checkout_navi li').removeClass('active');
                        $('#checkout_navi #step_2').addClass('active');
                        $('#checkout_navi').addClass('clickable');
                        $('.sc_stepz').removeClass('active');
                        $('#sc_step2').addClass('active');
                    });
                });
            }
        }
    })
    $('#sc_goto_3').on('click', function() {
        if ($('#freeswatch_order_form').valid()) {
            $('#sc_step2').slideToggle('medium', function() {
                $('#sc_step3').slideToggle('medium', function() {
                    $('#sc_step1,#sc_step2').attr('aria-hidden', true);
                    $('#checkout_navi li').removeClass('active');
                    $('#checkout_navi #step_3').addClass('active');
                    $('#checkout_navi').removeClass('clickable');
                    $('.sc_stepz').removeClass('active');
                    $('#sc_step3').addClass('active');
                    var selected_swatches_are = '';
                    var sheet_selected_swatches_are = '';
                    var swatch_count_newline = 0;
                    $('.ss4_sc_swatch img').each(function() {
                        selected_swatches_are += '<br />' + fosw_toTitleCase($(this).data('family').toString()) + ' ' + fosw_toTitleCase($(this).data('child').toString());
                        if (swatch_count_newline !== 0) {
                            sheet_selected_swatches_are += "\n";
                        }
                        sheet_selected_swatches_are += fosw_toTitleCase($(this).data('family').toString()) + ' ' + fosw_toTitleCase($(this).data('child').toString()) + ' | ';
                        swatch_count_newline++;
                    });
                    var email_content_is = 'First Name: ' + $('#sw_first_name').val() +
                        '<br />Last Name: ' + $('#sw_last_name').val() +
                        '<br />E-mail: ' + $('#sw_email').val() +
                        '<br />Phone: ' + $('#sw_phone').val() +
                        '<br /><br />Street: ' + $('#sw_street').val() +
                        '<br />Town/City: ' + $('#sw_city').val() +
                        '<br />State: ' + $('#sw_state').val() +
                        '<br />Apartment, suite: ' + $('#sw_apartment').val() +
                        '<br />ZIP: ' + $('#sw_zip').val() +
                        '<br />Country: ' + $('#sw_country').val() +
                        '<br /><br />Swatches: ' + selected_swatches_are;
                    $('#sc_email_content').html(email_content_is);
                    var sheet_address = "Street: " + $('#sw_street').val() +
                        "\nApt/Suite: " + $('#sw_apartment').val() +
                        "\nTown/City: " + $('#sw_city').val() +
                        "\nState: " + $('#sw_state').val() +
                        "\nZIP: " + $('#sw_zip').val();
                    $.ajax({
                        type: "POST",
                        url: $flo_freeswatch_infoz.data('ajaxurl'),
                        datatype: "html",
                        data: {
                            'action': 'rd_swatch_order',
                            'name': $('#sw_first_name').val(),
                            'email': $('#sw_email').val(),
                            'content': email_content_is,
                            'full_name': $('#sw_first_name').val() + ' ' + $('#sw_last_name').val(),
                            'phone': $('#sw_phone').val(),
                            'sheet_address': sheet_address,
                            'sheet_swatches': sheet_selected_swatches_are,
                            'line1': $('#sw_street').val(),
                            'line2': $('#sw_apartment').val(),
                            'city': $('#sw_city').val(),
                            'state': $('#sw_state').val(),
                            'zip': $('#sw_zip').val()
                        },
                        success: function(response) {
                            if (typeof pintrk === "function") {
                                pintrk('track', 'lead', {
                                    lead_type: 'Swatches'
                                });
                                gtag('event', 'pinterest-swatches-ordered', {
                                    event_category: 'pinterest-outside-tracking',
                                    event_action: 'swatches-ordered',
                                    event_label: 'equivalent to a lead in pinterest'
                                });
                                _tfa.push({
                                    notify: 'event',
                                    name: 'lead',
                                    id: 1188606
                                });
                            }
                        },
                        error: function(response) {
                            $('#sc_step3 h2').text('An error has occured.');
                            $('<p>Please call <a href="tel:855-373-2676">855-373-2676</a> to finish your order.</p>').insertAfter('#sc_step3 h2');
                        }
                    });
                });
            });
        }
    });
    $('#sc_orderdetails').on('click', function() {
        $('#sc_email_content').slideToggle();
    });
    $('#send_swatches p').on('click', function() {
        if ($('#swatches_to_order_inside img').length) {
            $('html, body').animate({
                scrollTop: $(".swatch_sect4").offset().top - 70
            }, 2000);
        } else {
            $.fancyConfirm({
                title: "No Swatch Selected",
                message: "You need to first add the swatches that you'd like by clicking the Add button.",
                okButton: 'Understood',
            });
            $('html, body').animate({
                scrollTop: $("#swatches_wrap").offset().top - 70
            }, 2000);
        }
    });
});
(function() {
    function aa(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }

    function ba(a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    }

    function p(a, b, c) {
        p = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? aa : ba;
        return p.apply(null, arguments)
    }
    var q = Date.now || function() {
        return +new Date
    };

    function ca(a, b) {
        this.a = a;
        this.m = b || a;
        this.c = this.m.document
    }
    var da = !!window.FontFace;

    function t(a, b, c, d) {
        b = a.c.createElement(b);
        if (c)
            for (var e in c) c.hasOwnProperty(e) && ("style" == e ? b.style.cssText = c[e] : b.setAttribute(e, c[e]));
        d && b.appendChild(a.c.createTextNode(d));
        return b
    }

    function u(a, b, c) {
        a = a.c.getElementsByTagName(b)[0];
        a || (a = document.documentElement);
        a.insertBefore(c, a.lastChild)
    }

    function v(a) {
        a.parentNode && a.parentNode.removeChild(a)
    }

    function w(a, b, c) {
        b = b || [];
        c = c || [];
        for (var d = a.className.split(/\s+/), e = 0; e < b.length; e += 1) {
            for (var f = !1, g = 0; g < d.length; g += 1)
                if (b[e] === d[g]) {
                    f = !0;
                    break
                }
            f || d.push(b[e])
        }
        b = [];
        for (e = 0; e < d.length; e += 1) {
            f = !1;
            for (g = 0; g < c.length; g += 1)
                if (d[e] === c[g]) {
                    f = !0;
                    break
                }
            f || b.push(d[e])
        }
        a.className = b.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "")
    }

    function y(a, b) {
        for (var c = a.className.split(/\s+/), d = 0, e = c.length; d < e; d++)
            if (c[d] == b) return !0;
        return !1
    }

    function z(a) {
        if ("string" === typeof a.f) return a.f;
        var b = a.m.location.protocol;
        "about:" == b && (b = a.a.location.protocol);
        return "https:" == b ? "https:" : "http:"
    }

    function ea(a) {
        return a.m.location.hostname || a.a.location.hostname
    }

    function A(a, b, c) {
        function d() {
            k && e && f && (k(g), k = null)
        }
        b = t(a, "link", {
            rel: "stylesheet",
            href: b,
            media: "all"
        });
        var e = !1,
            f = !0,
            g = null,
            k = c || null;
        da ? (b.onload = function() {
            e = !0;
            d()
        }, b.onerror = function() {
            e = !0;
            g = Error("Stylesheet failed to load");
            d()
        }) : setTimeout(function() {
            e = !0;
            d()
        }, 0);
        u(a, "head", b)
    }

    function B(a, b, c, d) {
        var e = a.c.getElementsByTagName("head")[0];
        if (e) {
            var f = t(a, "script", {
                    src: b
                }),
                g = !1;
            f.onload = f.onreadystatechange = function() {
                g || this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (g = !0, c && c(null), f.onload = f.onreadystatechange = null, "HEAD" == f.parentNode.tagName && e.removeChild(f))
            };
            e.appendChild(f);
            setTimeout(function() {
                g || (g = !0, c && c(Error("Script load timeout")))
            }, d || 5E3);
            return f
        }
        return null
    };

    function C() {
        this.a = 0;
        this.c = null
    }

    function D(a) {
        a.a++;
        return function() {
            a.a--;
            E(a)
        }
    }

    function F(a, b) {
        a.c = b;
        E(a)
    }

    function E(a) {
        0 == a.a && a.c && (a.c(), a.c = null)
    };

    function G(a) {
        this.a = a || "-"
    }
    G.prototype.c = function(a) {
        for (var b = [], c = 0; c < arguments.length; c++) b.push(arguments[c].replace(/[\W_]+/g, "").toLowerCase());
        return b.join(this.a)
    };

    function H(a, b) {
        this.c = a;
        this.f = 4;
        this.a = "n";
        var c = (b || "n4").match(/^([nio])([1-9])$/i);
        c && (this.a = c[1], this.f = parseInt(c[2], 10))
    }

    function fa(a) {
        return I(a) + " " + (a.f + "00") + " 300px " + J(a.c)
    }

    function J(a) {
        var b = [];
        a = a.split(/,\s*/);
        for (var c = 0; c < a.length; c++) {
            var d = a[c].replace(/['"]/g, ""); - 1 != d.indexOf(" ") || /^\d/.test(d) ? b.push("'" + d + "'") : b.push(d)
        }
        return b.join(",")
    }

    function K(a) {
        return a.a + a.f
    }

    function I(a) {
        var b = "normal";
        "o" === a.a ? b = "oblique" : "i" === a.a && (b = "italic");
        return b
    }

    function ga(a) {
        var b = 4,
            c = "n",
            d = null;
        a && ((d = a.match(/(normal|oblique|italic)/i)) && d[1] && (c = d[1].substr(0, 1).toLowerCase()), (d = a.match(/([1-9]00|normal|bold)/i)) && d[1] && (/bold/i.test(d[1]) ? b = 7 : /[1-9]00/.test(d[1]) && (b = parseInt(d[1].substr(0, 1), 10))));
        return c + b
    };

    function ha(a, b) {
        this.c = a;
        this.f = a.m.document.documentElement;
        this.h = b;
        this.a = new G("-");
        this.j = !1 !== b.events;
        this.g = !1 !== b.classes
    }

    function ia(a) {
        a.g && w(a.f, [a.a.c("wf", "loading")]);
        L(a, "loading")
    }

    function M(a) {
        if (a.g) {
            var b = y(a.f, a.a.c("wf", "active")),
                c = [],
                d = [a.a.c("wf", "loading")];
            b || c.push(a.a.c("wf", "inactive"));
            w(a.f, c, d)
        }
        L(a, "inactive")
    }

    function L(a, b, c) {
        if (a.j && a.h[b])
            if (c) a.h[b](c.c, K(c));
            else a.h[b]()
    };

    function ja() {
        this.c = {}
    }

    function ka(a, b, c) {
        var d = [],
            e;
        for (e in b)
            if (b.hasOwnProperty(e)) {
                var f = a.c[e];
                f && d.push(f(b[e], c))
            }
        return d
    };

    function N(a, b) {
        this.c = a;
        this.f = b;
        this.a = t(this.c, "span", {
            "aria-hidden": "true"
        }, this.f)
    }

    function O(a) {
        u(a.c, "body", a.a)
    }

    function P(a) {
        return "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + J(a.c) + ";" + ("font-style:" + I(a) + ";font-weight:" + (a.f + "00") + ";")
    };

    function Q(a, b, c, d, e, f) {
        this.g = a;
        this.j = b;
        this.a = d;
        this.c = c;
        this.f = e || 3E3;
        this.h = f || void 0
    }
    Q.prototype.start = function() {
        var a = this.c.m.document,
            b = this,
            c = q(),
            d = new Promise(function(d, e) {
                function k() {
                    q() - c >= b.f ? e() : a.fonts.load(fa(b.a), b.h).then(function(a) {
                        1 <= a.length ? d() : setTimeout(k, 25)
                    }, function() {
                        e()
                    })
                }
                k()
            }),
            e = new Promise(function(a, d) {
                setTimeout(d, b.f)
            });
        Promise.race([e, d]).then(function() {
            b.g(b.a)
        }, function() {
            b.j(b.a)
        })
    };

    function R(a, b, c, d, e, f, g) {
        this.v = a;
        this.B = b;
        this.c = c;
        this.a = d;
        this.s = g || "BESbswy";
        this.f = {};
        this.w = e || 3E3;
        this.u = f || null;
        this.o = this.j = this.h = this.g = null;
        this.g = new N(this.c, this.s);
        this.h = new N(this.c, this.s);
        this.j = new N(this.c, this.s);
        this.o = new N(this.c, this.s);
        a = new H(this.a.c + ",serif", K(this.a));
        a = P(a);
        this.g.a.style.cssText = a;
        a = new H(this.a.c + ",sans-serif", K(this.a));
        a = P(a);
        this.h.a.style.cssText = a;
        a = new H("serif", K(this.a));
        a = P(a);
        this.j.a.style.cssText = a;
        a = new H("sans-serif", K(this.a));
        a = P(a);
        this.o.a.style.cssText = a;
        O(this.g);
        O(this.h);
        O(this.j);
        O(this.o)
    }
    var S = {
            D: "serif",
            C: "sans-serif"
        },
        T = null;

    function U() {
        if (null === T) {
            var a = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);
            T = !!a && (536 > parseInt(a[1], 10) || 536 === parseInt(a[1], 10) && 11 >= parseInt(a[2], 10))
        }
        return T
    }
    R.prototype.start = function() {
        this.f.serif = this.j.a.offsetWidth;
        this.f["sans-serif"] = this.o.a.offsetWidth;
        this.A = q();
        la(this)
    };

    function ma(a, b, c) {
        for (var d in S)
            if (S.hasOwnProperty(d) && b === a.f[S[d]] && c === a.f[S[d]]) return !0;
        return !1
    }

    function la(a) {
        var b = a.g.a.offsetWidth,
            c = a.h.a.offsetWidth,
            d;
        (d = b === a.f.serif && c === a.f["sans-serif"]) || (d = U() && ma(a, b, c));
        d ? q() - a.A >= a.w ? U() && ma(a, b, c) && (null === a.u || a.u.hasOwnProperty(a.a.c)) ? V(a, a.v) : V(a, a.B) : na(a) : V(a, a.v)
    }

    function na(a) {
        setTimeout(p(function() {
            la(this)
        }, a), 50)
    }

    function V(a, b) {
        setTimeout(p(function() {
            v(this.g.a);
            v(this.h.a);
            v(this.j.a);
            v(this.o.a);
            b(this.a)
        }, a), 0)
    };

    function W(a, b, c) {
        this.c = a;
        this.a = b;
        this.f = 0;
        this.o = this.j = !1;
        this.s = c
    }
    var X = null;
    W.prototype.g = function(a) {
        var b = this.a;
        b.g && w(b.f, [b.a.c("wf", a.c, K(a).toString(), "active")], [b.a.c("wf", a.c, K(a).toString(), "loading"), b.a.c("wf", a.c, K(a).toString(), "inactive")]);
        L(b, "fontactive", a);
        this.o = !0;
        oa(this)
    };
    W.prototype.h = function(a) {
        var b = this.a;
        if (b.g) {
            var c = y(b.f, b.a.c("wf", a.c, K(a).toString(), "active")),
                d = [],
                e = [b.a.c("wf", a.c, K(a).toString(), "loading")];
            c || d.push(b.a.c("wf", a.c, K(a).toString(), "inactive"));
            w(b.f, d, e)
        }
        L(b, "fontinactive", a);
        oa(this)
    };

    function oa(a) {
        0 == --a.f && a.j && (a.o ? (a = a.a, a.g && w(a.f, [a.a.c("wf", "active")], [a.a.c("wf", "loading"), a.a.c("wf", "inactive")]), L(a, "active")) : M(a.a))
    };

    function pa(a) {
        this.j = a;
        this.a = new ja;
        this.h = 0;
        this.f = this.g = !0
    }
    pa.prototype.load = function(a) {
        this.c = new ca(this.j, a.context || this.j);
        this.g = !1 !== a.events;
        this.f = !1 !== a.classes;
        qa(this, new ha(this.c, a), a)
    };

    function ra(a, b, c, d, e) {
        var f = 0 == --a.h;
        (a.f || a.g) && setTimeout(function() {
            var a = e || null,
                k = d || null || {};
            if (0 === c.length && f) M(b.a);
            else {
                b.f += c.length;
                f && (b.j = f);
                var h, m = [];
                for (h = 0; h < c.length; h++) {
                    var l = c[h],
                        n = k[l.c],
                        r = b.a,
                        x = l;
                    r.g && w(r.f, [r.a.c("wf", x.c, K(x).toString(), "loading")]);
                    L(r, "fontloading", x);
                    r = null;
                    if (null === X)
                        if (window.FontFace) {
                            var x = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent),
                                ya = /OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent) && /Apple/.exec(window.navigator.vendor);
                            X = x ? 42 < parseInt(x[1], 10) : ya ? !1 : !0
                        } else X = !1;
                    X ? r = new Q(p(b.g, b), p(b.h, b), b.c, l, b.s, n) : r = new R(p(b.g, b), p(b.h, b), b.c, l, b.s, a, n);
                    m.push(r)
                }
                for (h = 0; h < m.length; h++) m[h].start()
            }
        }, 0)
    }

    function qa(a, b, c) {
        var d = [],
            e = c.timeout;
        ia(b);
        var d = ka(a.a, c, a.c),
            f = new W(a.c, b, e);
        a.h = d.length;
        b = 0;
        for (c = d.length; b < c; b++) d[b].load(function(b, d, c) {
            ra(a, f, b, d, c)
        })
    };

    function sa(a, b) {
        this.c = a;
        this.a = b
    }

    function ta(a, b, c) {
        var d = z(a.c);
        a = (a.a.api || "fast.fonts.net/jsapi").replace(/^.*http(s?):(\/\/)?/, "");
        return d + "//" + a + "/" + b + ".js" + (c ? "?v=" + c : "")
    }
    sa.prototype.load = function(a) {
        function b() {
            if (f["__mti_fntLst" + d]) {
                var c = f["__mti_fntLst" + d](),
                    e = [],
                    h;
                if (c)
                    for (var m = 0; m < c.length; m++) {
                        var l = c[m].fontfamily;
                        void 0 != c[m].fontStyle && void 0 != c[m].fontWeight ? (h = c[m].fontStyle + c[m].fontWeight, e.push(new H(l, h))) : e.push(new H(l))
                    }
                a(e)
            } else setTimeout(function() {
                b()
            }, 50)
        }
        var c = this,
            d = c.a.projectId,
            e = c.a.version;
        if (d) {
            var f = c.c.m;
            B(this.c, ta(c, d, e), function(e) {
                    e ? a([]) : (f["__MonotypeConfiguration__" + d] = function() {
                        return c.a
                    }, b())
                }).id = "__MonotypeAPIScript__" +
                d
        } else a([])
    };

    function ua(a, b) {
        this.c = a;
        this.a = b
    }
    ua.prototype.load = function(a) {
        var b, c, d = this.a.urls || [],
            e = this.a.families || [],
            f = this.a.testStrings || {},
            g = new C;
        b = 0;
        for (c = d.length; b < c; b++) A(this.c, d[b], D(g));
        var k = [];
        b = 0;
        for (c = e.length; b < c; b++)
            if (d = e[b].split(":"), d[1])
                for (var h = d[1].split(","), m = 0; m < h.length; m += 1) k.push(new H(d[0], h[m]));
            else k.push(new H(d[0]));
        F(g, function() {
            a(k, f)
        })
    };

    function va(a, b, c) {
        a ? this.c = a : this.c = b + wa;
        this.a = [];
        this.f = [];
        this.g = c || ""
    }
    var wa = "//fonts.googleapis.com/css";

    function xa(a, b) {
        for (var c = b.length, d = 0; d < c; d++) {
            var e = b[d].split(":");
            3 == e.length && a.f.push(e.pop());
            var f = "";
            2 == e.length && "" != e[1] && (f = ":");
            a.a.push(e.join(f))
        }
    }

    function za(a) {
        if (0 == a.a.length) throw Error("No fonts to load!");
        if (-1 != a.c.indexOf("kit=")) return a.c;
        for (var b = a.a.length, c = [], d = 0; d < b; d++) c.push(a.a[d].replace(/ /g, "+"));
        b = a.c + "?family=" + c.join("%7C");
        0 < a.f.length && (b += "&subset=" + a.f.join(","));
        0 < a.g.length && (b += "&text=" + encodeURIComponent(a.g));
        return b
    };

    function Aa(a) {
        this.f = a;
        this.a = [];
        this.c = {}
    }
    var Ba = {
            latin: "BESbswy",
            "latin-ext": "\u00e7\u00f6\u00fc\u011f\u015f",
            cyrillic: "\u0439\u044f\u0416",
            greek: "\u03b1\u03b2\u03a3",
            khmer: "\u1780\u1781\u1782",
            Hanuman: "\u1780\u1781\u1782"
        },
        Ca = {
            thin: "1",
            extralight: "2",
            "extra-light": "2",
            ultralight: "2",
            "ultra-light": "2",
            light: "3",
            regular: "4",
            book: "4",
            medium: "5",
            "semi-bold": "6",
            semibold: "6",
            "demi-bold": "6",
            demibold: "6",
            bold: "7",
            "extra-bold": "8",
            extrabold: "8",
            "ultra-bold": "8",
            ultrabold: "8",
            black: "9",
            heavy: "9",
            l: "3",
            r: "4",
            b: "7"
        },
        Da = {
            i: "i",
            italic: "i",
            n: "n",
            normal: "n"
        },
        Ea = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;

    function Fa(a) {
        for (var b = a.f.length, c = 0; c < b; c++) {
            var d = a.f[c].split(":"),
                e = d[0].replace(/\+/g, " "),
                f = ["n4"];
            if (2 <= d.length) {
                var g;
                var k = d[1];
                g = [];
                if (k)
                    for (var k = k.split(","), h = k.length, m = 0; m < h; m++) {
                        var l;
                        l = k[m];
                        if (l.match(/^[\w-]+$/)) {
                            var n = Ea.exec(l.toLowerCase());
                            if (null == n) l = "";
                            else {
                                l = n[2];
                                l = null == l || "" == l ? "n" : Da[l];
                                n = n[1];
                                if (null == n || "" == n) n = "4";
                                else var r = Ca[n],
                                    n = r ? r : isNaN(n) ? "4" : n.substr(0, 1);
                                l = [l, n].join("")
                            }
                        } else l = "";
                        l && g.push(l)
                    }
                0 < g.length && (f = g);
                3 == d.length && (d = d[2], g = [], d = d ? d.split(",") : g, 0 < d.length && (d = Ba[d[0]]) && (a.c[e] = d))
            }
            a.c[e] || (d = Ba[e]) && (a.c[e] = d);
            for (d = 0; d < f.length; d += 1) a.a.push(new H(e, f[d]))
        }
    };

    function Ga(a, b) {
        this.c = a;
        this.a = b
    }
    var Ha = {
        Arimo: !0,
        Cousine: !0,
        Tinos: !0
    };
    Ga.prototype.load = function(a) {
        var b = new C,
            c = this.c,
            d = new va(this.a.api, z(c), this.a.text),
            e = this.a.families;
        xa(d, e);
        var f = new Aa(e);
        Fa(f);
        A(c, za(d), D(b));
        F(b, function() {
            a(f.a, f.c, Ha)
        })
    };

    function Ia(a, b) {
        this.c = a;
        this.a = b
    }
    Ia.prototype.load = function(a) {
        var b = this.a.id,
            c = this.c.m;
        b ? B(this.c, (this.a.api || "https://use.typekit.net") + "/" + b + ".js", function(b) {
            if (b) a([]);
            else if (c.Typekit && c.Typekit.config && c.Typekit.config.fn) {
                b = c.Typekit.config.fn;
                for (var e = [], f = 0; f < b.length; f += 2)
                    for (var g = b[f], k = b[f + 1], h = 0; h < k.length; h++) e.push(new H(g, k[h]));
                try {
                    c.Typekit.load({
                        events: !1,
                        classes: !1,
                        async: !0
                    })
                } catch (m) {}
                a(e)
            }
        }, 2E3) : a([])
    };

    function Ja(a, b) {
        this.c = a;
        this.f = b;
        this.a = []
    }
    Ja.prototype.load = function(a) {
        var b = this.f.id,
            c = this.c.m,
            d = this;
        b ? (c.__webfontfontdeckmodule__ || (c.__webfontfontdeckmodule__ = {}), c.__webfontfontdeckmodule__[b] = function(b, c) {
            for (var g = 0, k = c.fonts.length; g < k; ++g) {
                var h = c.fonts[g];
                d.a.push(new H(h.name, ga("font-weight:" + h.weight + ";font-style:" + h.style)))
            }
            a(d.a)
        }, B(this.c, z(this.c) + (this.f.api || "//f.fontdeck.com/s/css/js/") + ea(this.c) + "/" + b + ".js", function(b) {
            b && a([])
        })) : a([])
    };
    var Y = new pa(window);
    Y.a.c.custom = function(a, b) {
        return new ua(b, a)
    };
    Y.a.c.fontdeck = function(a, b) {
        return new Ja(b, a)
    };
    Y.a.c.monotype = function(a, b) {
        return new sa(b, a)
    };
    Y.a.c.typekit = function(a, b) {
        return new Ia(b, a)
    };
    Y.a.c.google = function(a, b) {
        return new Ga(b, a)
    };
    var Z = {
        load: p(Y.load, Y)
    };
    "function" === typeof define && define.amd ? define(function() {
        return Z
    }) : "undefined" !== typeof module && module.exports ? module.exports = Z : (window.WebFont = Z, window.WebFontConfig && Y.load(window.WebFontConfig));
}());
WebFontConfig = {
    timeout: 2e3
}, mk_typekit_id.length > 0 && (WebFontConfig.typekit = {
    id: mk_typekit_id
}), mk_google_fonts.length > 0 && (WebFontConfig.google = {
    families: mk_google_fonts
}), WebFont.load(WebFontConfig);
/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */
(function(window) {
    'use strict';

    function classReg(className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }
    var hasClass, addClass, removeClass;
    if ('classList' in document.documentElement) {
        hasClass = function(elem, c) {
            return elem.classList.contains(c);
        };
        addClass = function(elem, c) {
            elem.classList.add(c);
        };
        removeClass = function(elem, c) {
            elem.classList.remove(c);
        };
    } else {
        hasClass = function(elem, c) {
            return classReg(c).test(elem.className);
        };
        addClass = function(elem, c) {
            if (!hasClass(elem, c)) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function(elem, c) {
            elem.className = elem.className.replace(classReg(c), ' ');
        };
    }

    function toggleClass(elem, c) {
        var fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
    }
    var classie = {
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };
    if (typeof define === 'function' && define.amd) {
        define(classie);
    } else {
        window.classie = classie;
    }
})(window);
/*! jQuery Validation Plugin - v1.17.0 - 7/29/2017
 * https://jqueryvalidation.org/
 * Copyright (c) 2017 Jörn Zaefferer; Licensed MIT */
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function(a) {
    a.extend(a.fn, {
        validate: function(b) {
            if (!this.length) return void(b && b.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
            var c = a.data(this[0], "validator");
            return c ? c : (this.attr("novalidate", "novalidate"), c = new a.validator(b, this[0]), a.data(this[0], "validator", c), c.settings.onsubmit && (this.on("click.validate", ":submit", function(b) {
                c.submitButton = b.currentTarget, a(this).hasClass("cancel") && (c.cancelSubmit = !0), void 0 !== a(this).attr("formnovalidate") && (c.cancelSubmit = !0)
            }), this.on("submit.validate", function(b) {
                function d() {
                    var d, e;
                    return c.submitButton && (c.settings.submitHandler || c.formSubmitted) && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)), !c.settings.submitHandler || (e = c.settings.submitHandler.call(c, c.currentForm, b), d && d.remove(), void 0 !== e && e)
                }
                return c.settings.debug && b.preventDefault(), c.cancelSubmit ? (c.cancelSubmit = !1, d()) : c.form() ? c.pendingRequest ? (c.formSubmitted = !0, !1) : d() : (c.focusInvalid(), !1)
            })), c)
        },
        valid: function() {
            var b, c, d;
            return a(this[0]).is("form") ? b = this.validate().form() : (d = [], b = !0, c = a(this[0].form).validate(), this.each(function() {
                b = c.element(this) && b, b || (d = d.concat(c.errorList))
            }), c.errorList = d), b
        },
        rules: function(b, c) {
            var d, e, f, g, h, i, j = this[0];
            if (null != j && (!j.form && j.hasAttribute("contenteditable") && (j.form = this.closest("form")[0], j.name = this.attr("name")), null != j.form)) {
                if (b) switch (d = a.data(j.form, "validator").settings, e = d.rules, f = a.validator.staticRules(j), b) {
                    case "add":
                        a.extend(f, a.validator.normalizeRule(c)), delete f.messages, e[j.name] = f, c.messages && (d.messages[j.name] = a.extend(d.messages[j.name], c.messages));
                        break;
                    case "remove":
                        return c ? (i = {}, a.each(c.split(/\s/), function(a, b) {
                            i[b] = f[b], delete f[b]
                        }), i) : (delete e[j.name], f)
                }
                return g = a.validator.normalizeRules(a.extend({}, a.validator.classRules(j), a.validator.attributeRules(j), a.validator.dataRules(j), a.validator.staticRules(j)), j), g.required && (h = g.required, delete g.required, g = a.extend({
                    required: h
                }, g)), g.remote && (h = g.remote, delete g.remote, g = a.extend(g, {
                    remote: h
                })), g
            }
        }
    }), a.extend(a.expr.pseudos || a.expr[":"], {
        blank: function(b) {
            return !a.trim("" + a(b).val())
        },
        filled: function(b) {
            var c = a(b).val();
            return null !== c && !!a.trim("" + c)
        },
        unchecked: function(b) {
            return !a(b).prop("checked")
        }
    }), a.validator = function(b, c) {
        this.settings = a.extend(!0, {}, a.validator.defaults, b), this.currentForm = c, this.init()
    }, a.validator.format = function(b, c) {
        return 1 === arguments.length ? function() {
            var c = a.makeArray(arguments);
            return c.unshift(b), a.validator.format.apply(this, c)
        } : void 0 === c ? b : (arguments.length > 2 && c.constructor !== Array && (c = a.makeArray(arguments).slice(1)), c.constructor !== Array && (c = [c]), a.each(c, function(a, c) {
            b = b.replace(new RegExp("\\{" + a + "\\}", "g"), function() {
                return c
            })
        }), b)
    }, a.extend(a.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            pendingClass: "pending",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: !1,
            focusInvalid: !0,
            errorContainer: a([]),
            errorLabelContainer: a([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(a) {
                this.lastActive = a, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(a)))
            },
            onfocusout: function(a) {
                this.checkable(a) || !(a.name in this.submitted) && this.optional(a) || this.element(a)
            },
            onkeyup: function(b, c) {
                var d = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
                9 === c.which && "" === this.elementValue(b) || a.inArray(c.keyCode, d) !== -1 || (b.name in this.submitted || b.name in this.invalid) && this.element(b)
            },
            onclick: function(a) {
                a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode)
            },
            highlight: function(b, c, d) {
                "radio" === b.type ? this.findByName(b.name).addClass(c).removeClass(d) : a(b).addClass(c).removeClass(d)
            },
            unhighlight: function(b, c, d) {
                "radio" === b.type ? this.findByName(b.name).removeClass(c).addClass(d) : a(b).removeClass(c).addClass(d)
            }
        },
        setDefaults: function(b) {
            a.extend(a.validator.defaults, b)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            equalTo: "Please enter the same value again.",
            maxlength: a.validator.format("Please enter no more than {0} characters."),
            minlength: a.validator.format("Please enter at least {0} characters."),
            rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."),
            range: a.validator.format("Please enter a value between {0} and {1}."),
            max: a.validator.format("Please enter a value less than or equal to {0}."),
            min: a.validator.format("Please enter a value greater than or equal to {0}."),
            step: a.validator.format("Please enter a multiple of {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function b(b) {
                    !this.form && this.hasAttribute("contenteditable") && (this.form = a(this).closest("form")[0], this.name = a(this).attr("name"));
                    var c = a.data(this.form, "validator"),
                        d = "on" + b.type.replace(/^validate/, ""),
                        e = c.settings;
                    e[d] && !a(this).is(e.ignore) && e[d].call(c, this, b)
                }
                this.labelContainer = a(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm), this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var c, d = this.groups = {};
                a.each(this.settings.groups, function(b, c) {
                    "string" == typeof c && (c = c.split(/\s/)), a.each(c, function(a, c) {
                        d[c] = b
                    })
                }), c = this.settings.rules, a.each(c, function(b, d) {
                    c[b] = a.validator.normalizeRule(d)
                }), a(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']", b).on("click.validate", "select, option, [type='radio'], [type='checkbox']", b), this.settings.invalidHandler && a(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler)
            },
            form: function() {
                return this.checkForm(), a.extend(this.submitted, this.errorMap), this.invalid = a.extend({}, this.errorMap), this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++) this.check(b[a]);
                return this.valid()
            },
            element: function(b) {
                var c, d, e = this.clean(b),
                    f = this.validationTargetFor(e),
                    g = this,
                    h = !0;
                return void 0 === f ? delete this.invalid[e.name] : (this.prepareElement(f), this.currentElements = a(f), d = this.groups[f.name], d && a.each(this.groups, function(a, b) {
                    b === d && a !== f.name && (e = g.validationTargetFor(g.clean(g.findByName(a))), e && e.name in g.invalid && (g.currentElements.push(e), h = g.check(e) && h))
                }), c = this.check(f) !== !1, h = h && c, c ? this.invalid[f.name] = !1 : this.invalid[f.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), a(b).attr("aria-invalid", !c)), h
            },
            showErrors: function(b) {
                if (b) {
                    var c = this;
                    a.extend(this.errorMap, b), this.errorList = a.map(this.errorMap, function(a, b) {
                        return {
                            message: a,
                            element: c.findByName(b)[0]
                        }
                    }), this.successList = a.grep(this.successList, function(a) {
                        return !(a.name in b)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                a.fn.resetForm && a(this.currentForm).resetForm(), this.invalid = {}, this.submitted = {}, this.prepareForm(), this.hideErrors();
                var b = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                this.resetElements(b)
            },
            resetElements: function(a) {
                var b;
                if (this.settings.unhighlight)
                    for (b = 0; a[b]; b++) this.settings.unhighlight.call(this, a[b], this.settings.errorClass, ""), this.findByName(a[b].name).removeClass(this.settings.validClass);
                else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(a) {
                var b, c = 0;
                for (b in a) void 0 !== a[b] && null !== a[b] && a[b] !== !1 && c++;
                return c
            },
            hideErrors: function() {
                this.hideThese(this.toHide)
            },
            hideThese: function(a) {
                a.not(this.containers).text(""), this.addWrapper(a).hide()
            },
            valid: function() {
                return 0 === this.size()
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) try {
                    a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (b) {}
            },
            findLastActive: function() {
                var b = this.lastActive;
                return b && 1 === a.grep(this.errorList, function(a) {
                    return a.element.name === b.name
                }).length && b
            },
            elements: function() {
                var b = this,
                    c = {};
                return a(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function() {
                    var d = this.name || a(this).attr("name");
                    return !d && b.settings.debug && window.console && console.error("%o has no name assigned", this), this.hasAttribute("contenteditable") && (this.form = a(this).closest("form")[0], this.name = d), !(d in c || !b.objectLength(a(this).rules())) && (c[d] = !0, !0)
                })
            },
            clean: function(b) {
                return a(b)[0]
            },
            errors: function() {
                var b = this.settings.errorClass.split(" ").join(".");
                return a(this.settings.errorElement + "." + b, this.errorContext)
            },
            resetInternals: function() {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = a([]), this.toHide = a([])
            },
            reset: function() {
                this.resetInternals(), this.currentElements = a([])
            },
            prepareForm: function() {
                this.reset(), this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(a) {
                this.reset(), this.toHide = this.errorsFor(a)
            },
            elementValue: function(b) {
                var c, d, e = a(b),
                    f = b.type;
                return "radio" === f || "checkbox" === f ? this.findByName(b.name).filter(":checked").val() : "number" === f && "undefined" != typeof b.validity ? b.validity.badInput ? "NaN" : e.val() : (c = b.hasAttribute("contenteditable") ? e.text() : e.val(), "file" === f ? "C:\\fakepath\\" === c.substr(0, 12) ? c.substr(12) : (d = c.lastIndexOf("/"), d >= 0 ? c.substr(d + 1) : (d = c.lastIndexOf("\\"), d >= 0 ? c.substr(d + 1) : c)) : "string" == typeof c ? c.replace(/\r/g, "") : c)
            },
            check: function(b) {
                b = this.validationTargetFor(this.clean(b));
                var c, d, e, f, g = a(b).rules(),
                    h = a.map(g, function(a, b) {
                        return b
                    }).length,
                    i = !1,
                    j = this.elementValue(b);
                if ("function" == typeof g.normalizer ? f = g.normalizer : "function" == typeof this.settings.normalizer && (f = this.settings.normalizer), f) {
                    if (j = f.call(b, j), "string" != typeof j) throw new TypeError("The normalizer should return a string value.");
                    delete g.normalizer
                }
                for (d in g) {
                    e = {
                        method: d,
                        parameters: g[d]
                    };
                    try {
                        if (c = a.validator.methods[d].call(this, j, b, e.parameters), "dependency-mismatch" === c && 1 === h) {
                            i = !0;
                            continue
                        }
                        if (i = !1, "pending" === c) return void(this.toHide = this.toHide.not(this.errorsFor(b)));
                        if (!c) return this.formatAndAdd(b, e), !1
                    } catch (k) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method.", k), k instanceof TypeError && (k.message += ".  Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method."), k
                    }
                }
                if (!i) return this.objectLength(g) && this.successList.push(b), !0
            },
            customDataMessage: function(b, c) {
                return a(b).data("msg" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()) || a(b).data("msg")
            },
            customMessage: function(a, b) {
                var c = this.settings.messages[a];
                return c && (c.constructor === String ? c : c[b])
            },
            findDefined: function() {
                for (var a = 0; a < arguments.length; a++)
                    if (void 0 !== arguments[a]) return arguments[a]
            },
            defaultMessage: function(b, c) {
                "string" == typeof c && (c = {
                    method: c
                });
                var d = this.findDefined(this.customMessage(b.name, c.method), this.customDataMessage(b, c.method), !this.settings.ignoreTitle && b.title || void 0, a.validator.messages[c.method], "<strong>Warning: No message defined for " + b.name + "</strong>"),
                    e = /\$?\{(\d+)\}/g;
                return "function" == typeof d ? d = d.call(this, c.parameters, b) : e.test(d) && (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)), d
            },
            formatAndAdd: function(a, b) {
                var c = this.defaultMessage(a, b);
                this.errorList.push({
                    message: c,
                    element: a,
                    method: b.method
                }), this.errorMap[a.name] = c, this.submitted[a.name] = c
            },
            addWrapper: function(a) {
                return this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper))), a
            },
            defaultShowErrors: function() {
                var a, b, c;
                for (a = 0; this.errorList[a]; a++) c = this.errorList[a], this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass), this.showLabel(c.element, c.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]);
                if (this.settings.unhighlight)
                    for (a = 0, b = this.validElements(); b[a]; a++) this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return a(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(b, c) {
                var d, e, f, g, h = this.errorsFor(b),
                    i = this.idOrName(b),
                    j = a(b).attr("aria-describedby");
                h.length ? (h.removeClass(this.settings.validClass).addClass(this.settings.errorClass), h.html(c)) : (h = a("<" + this.settings.errorElement + ">").attr("id", i + "-error").addClass(this.settings.errorClass).html(c || ""), d = h, this.settings.wrapper && (d = h.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(d) : this.settings.errorPlacement ? this.settings.errorPlacement.call(this, d, a(b)) : d.insertAfter(b), h.is("label") ? h.attr("for", i) : 0 === h.parents("label[for='" + this.escapeCssMeta(i) + "']").length && (f = h.attr("id"), j ? j.match(new RegExp("\\b" + this.escapeCssMeta(f) + "\\b")) || (j += " " + f) : j = f, a(b).attr("aria-describedby", j), e = this.groups[b.name], e && (g = this, a.each(g.groups, function(b, c) {
                    c === e && a("[name='" + g.escapeCssMeta(b) + "']", g.currentForm).attr("aria-describedby", h.attr("id"))
                })))), !c && this.settings.success && (h.text(""), "string" == typeof this.settings.success ? h.addClass(this.settings.success) : this.settings.success(h, b)), this.toShow = this.toShow.add(h)
            },
            errorsFor: function(b) {
                var c = this.escapeCssMeta(this.idOrName(b)),
                    d = a(b).attr("aria-describedby"),
                    e = "label[for='" + c + "'], label[for='" + c + "'] *";
                return d && (e = e + ", #" + this.escapeCssMeta(d).replace(/\s+/g, ", #")), this.errors().filter(e)
            },
            escapeCssMeta: function(a) {
                return a.replace(/([\\!"#$%&'()*+,.\/:;<=>?@\[\]^`{|}~])/g, "\\$1")
            },
            idOrName: function(a) {
                return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name)
            },
            validationTargetFor: function(b) {
                return this.checkable(b) && (b = this.findByName(b.name)), a(b).not(this.settings.ignore)[0]
            },
            checkable: function(a) {
                return /radio|checkbox/i.test(a.type)
            },
            findByName: function(b) {
                return a(this.currentForm).find("[name='" + this.escapeCssMeta(b) + "']")
            },
            getLength: function(b, c) {
                switch (c.nodeName.toLowerCase()) {
                    case "select":
                        return a("option:selected", c).length;
                    case "input":
                        if (this.checkable(c)) return this.findByName(c.name).filter(":checked").length
                }
                return b.length
            },
            depend: function(a, b) {
                return !this.dependTypes[typeof a] || this.dependTypes[typeof a](a, b)
            },
            dependTypes: {
                "boolean": function(a) {
                    return a
                },
                string: function(b, c) {
                    return !!a(b, c.form).length
                },
                "function": function(a, b) {
                    return a(b)
                }
            },
            optional: function(b) {
                var c = this.elementValue(b);
                return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch"
            },
            startRequest: function(b) {
                this.pending[b.name] || (this.pendingRequest++, a(b).addClass(this.settings.pendingClass), this.pending[b.name] = !0)
            },
            stopRequest: function(b, c) {
                this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[b.name], a(b).removeClass(this.settings.pendingClass), c && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (a(this.currentForm).submit(), this.submitButton && a("input:hidden[name='" + this.submitButton.name + "']", this.currentForm).remove(), this.formSubmitted = !1) : !c && 0 === this.pendingRequest && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            },
            previousValue: function(b, c) {
                return c = "string" == typeof c && c || "remote", a.data(b, "previousValue") || a.data(b, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(b, {
                        method: c
                    })
                })
            },
            destroy: function() {
                this.resetForm(), a(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur")
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(b, c) {
            b.constructor === String ? this.classRuleSettings[b] = c : a.extend(this.classRuleSettings, b)
        },
        classRules: function(b) {
            var c = {},
                d = a(b).attr("class");
            return d && a.each(d.split(" "), function() {
                this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this])
            }), c
        },
        normalizeAttributeRule: function(a, b, c, d) {
            /min|max|step/.test(c) && (null === b || /number|range|text/.test(b)) && (d = Number(d), isNaN(d) && (d = void 0)), d || 0 === d ? a[c] = d : b === c && "range" !== b && (a[c] = !0)
        },
        attributeRules: function(b) {
            var c, d, e = {},
                f = a(b),
                g = b.getAttribute("type");
            for (c in a.validator.methods) "required" === c ? (d = b.getAttribute(c), "" === d && (d = !0), d = !!d) : d = f.attr(c), this.normalizeAttributeRule(e, g, c, d);
            return e.maxlength && /-1|2147483647|524288/.test(e.maxlength) && delete e.maxlength, e
        },
        dataRules: function(b) {
            var c, d, e = {},
                f = a(b),
                g = b.getAttribute("type");
            for (c in a.validator.methods) d = f.data("rule" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()), this.normalizeAttributeRule(e, g, c, d);
            return e
        },
        staticRules: function(b) {
            var c = {},
                d = a.data(b.form, "validator");
            return d.settings.rules && (c = a.validator.normalizeRule(d.settings.rules[b.name]) || {}), c
        },
        normalizeRules: function(b, c) {
            return a.each(b, function(d, e) {
                if (e === !1) return void delete b[d];
                if (e.param || e.depends) {
                    var f = !0;
                    switch (typeof e.depends) {
                        case "string":
                            f = !!a(e.depends, c.form).length;
                            break;
                        case "function":
                            f = e.depends.call(c, c)
                    }
                    f ? b[d] = void 0 === e.param || e.param : (a.data(c.form, "validator").resetElements(a(c)), delete b[d])
                }
            }), a.each(b, function(d, e) {
                b[d] = a.isFunction(e) && "normalizer" !== d ? e(c) : e
            }), a.each(["minlength", "maxlength"], function() {
                b[this] && (b[this] = Number(b[this]))
            }), a.each(["rangelength", "range"], function() {
                var c;
                b[this] && (a.isArray(b[this]) ? b[this] = [Number(b[this][0]), Number(b[this][1])] : "string" == typeof b[this] && (c = b[this].replace(/[\[\]]/g, "").split(/[\s,]+/), b[this] = [Number(c[0]), Number(c[1])]))
            }), a.validator.autoCreateRanges && (null != b.min && null != b.max && (b.range = [b.min, b.max], delete b.min, delete b.max), null != b.minlength && null != b.maxlength && (b.rangelength = [b.minlength, b.maxlength], delete b.minlength, delete b.maxlength)), b
        },
        normalizeRule: function(b) {
            if ("string" == typeof b) {
                var c = {};
                a.each(b.split(/\s/), function() {
                    c[this] = !0
                }), b = c
            }
            return b
        },
        addMethod: function(b, c, d) {
            a.validator.methods[b] = c, a.validator.messages[b] = void 0 !== d ? d : a.validator.messages[b], c.length < 3 && a.validator.addClassRules(b, a.validator.normalizeRule(b))
        },
        methods: {
            required: function(b, c, d) {
                if (!this.depend(d, c)) return "dependency-mismatch";
                if ("select" === c.nodeName.toLowerCase()) {
                    var e = a(c).val();
                    return e && e.length > 0
                }
                return this.checkable(c) ? this.getLength(b, c) > 0 : b.length > 0
            },
            email: function(a, b) {
                return this.optional(b) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)
            },
            url: function(a, b) {
                return this.optional(b) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(a)
            },
            date: function(a, b) {
                return this.optional(b) || !/Invalid|NaN/.test(new Date(a).toString())
            },
            dateISO: function(a, b) {
                return this.optional(b) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)
            },
            number: function(a, b) {
                return this.optional(b) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)
            },
            digits: function(a, b) {
                return this.optional(b) || /^\d+$/.test(a)
            },
            minlength: function(b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(b, c);
                return this.optional(c) || e >= d
            },
            maxlength: function(b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(b, c);
                return this.optional(c) || e <= d
            },
            rangelength: function(b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(b, c);
                return this.optional(c) || e >= d[0] && e <= d[1]
            },
            min: function(a, b, c) {
                return this.optional(b) || a >= c
            },
            max: function(a, b, c) {
                return this.optional(b) || a <= c
            },
            range: function(a, b, c) {
                return this.optional(b) || a >= c[0] && a <= c[1]
            },
            step: function(b, c, d) {
                var e, f = a(c).attr("type"),
                    g = "Step attribute on input type " + f + " is not supported.",
                    h = ["text", "number", "range"],
                    i = new RegExp("\\b" + f + "\\b"),
                    j = f && !i.test(h.join()),
                    k = function(a) {
                        var b = ("" + a).match(/(?:\.(\d+))?$/);
                        return b && b[1] ? b[1].length : 0
                    },
                    l = function(a) {
                        return Math.round(a * Math.pow(10, e))
                    },
                    m = !0;
                if (j) throw new Error(g);
                return e = k(d), (k(b) > e || l(b) % l(d) !== 0) && (m = !1), this.optional(c) || m
            },
            equalTo: function(b, c, d) {
                var e = a(d);
                return this.settings.onfocusout && e.not(".validate-equalTo-blur").length && e.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function() {
                    a(c).valid()
                }), b === e.val()
            },
            remote: function(b, c, d, e) {
                if (this.optional(c)) return "dependency-mismatch";
                e = "string" == typeof e && e || "remote";
                var f, g, h, i = this.previousValue(c, e);
                return this.settings.messages[c.name] || (this.settings.messages[c.name] = {}), i.originalMessage = i.originalMessage || this.settings.messages[c.name][e], this.settings.messages[c.name][e] = i.message, d = "string" == typeof d && {
                    url: d
                } || d, h = a.param(a.extend({
                    data: b
                }, d.data)), i.old === h ? i.valid : (i.old = h, f = this, this.startRequest(c), g = {}, g[c.name] = b, a.ajax(a.extend(!0, {
                    mode: "abort",
                    port: "validate" + c.name,
                    dataType: "json",
                    data: g,
                    context: f.currentForm,
                    success: function(a) {
                        var d, g, h, j = a === !0 || "true" === a;
                        f.settings.messages[c.name][e] = i.originalMessage, j ? (h = f.formSubmitted, f.resetInternals(), f.toHide = f.errorsFor(c), f.formSubmitted = h, f.successList.push(c), f.invalid[c.name] = !1, f.showErrors()) : (d = {}, g = a || f.defaultMessage(c, {
                            method: e,
                            parameters: b
                        }), d[c.name] = i.message = g, f.invalid[c.name] = !0, f.showErrors(d)), i.valid = j, f.stopRequest(c, j)
                    }
                }, d)), "pending")
            }
        }
    });
    var b, c = {};
    return a.ajaxPrefilter ? a.ajaxPrefilter(function(a, b, d) {
        var e = a.port;
        "abort" === a.mode && (c[e] && c[e].abort(), c[e] = d)
    }) : (b = a.ajax, a.ajax = function(d) {
        var e = ("mode" in d ? d : a.ajaxSettings).mode,
            f = ("port" in d ? d : a.ajaxSettings).port;
        return "abort" === e ? (c[f] && c[f].abort(), c[f] = b.apply(this, arguments), c[f]) : b.apply(this, arguments)
    }), a
});
(function($) {
    var email_fields = ["input#billing_email"];
    for (var el in email_fields) {
        var $field = $(email_fields[el]);
        $field.on("change", [el], update_user_email);
    }

    function update_user_email(event) {
        if (FUE_Front.is_logged_in) {
            return;
        }
        var email = $(event.target).val();
        var first_name = $("#billing_first_name").val();
        var last_name = $("#billing_last_name").val();
        $.post(FUE_Front.ajaxurl, {
            action: "fue_wc_set_cart_email",
            email: email,
            first_name: first_name,
            last_name: last_name
        });
    }
})(jQuery);
/*!
 * JavaScript Cookie v2.1.4
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
! function(e) {
    var n = !1;
    if ("function" == typeof define && define.amd && (define(e), n = !0), "object" == typeof exports && (module.exports = e(), n = !0), !n) {
        var o = window.Cookies,
            t = window.Cookies = e();
        t.noConflict = function() {
            return window.Cookies = o, t
        }
    }
}(function() {
    function e() {
        for (var e = 0, n = {}; e < arguments.length; e++) {
            var o = arguments[e];
            for (var t in o) n[t] = o[t]
        }
        return n
    }

    function n(o) {
        function t(n, r, i) {
            var c;
            if ("undefined" != typeof document) {
                if (arguments.length > 1) {
                    if ("number" == typeof(i = e({
                            path: "/"
                        }, t.defaults, i)).expires) {
                        var a = new Date;
                        a.setMilliseconds(a.getMilliseconds() + 864e5 * i.expires), i.expires = a
                    }
                    i.expires = i.expires ? i.expires.toUTCString() : "";
                    try {
                        c = JSON.stringify(r), /^[\{\[]/.test(c) && (r = c)
                    } catch (m) {}
                    r = o.write ? o.write(r, n) : encodeURIComponent(String(r)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), n = (n = (n = encodeURIComponent(String(n))).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)).replace(/[\(\)]/g, escape);
                    var f = "";
                    for (var s in i) i[s] && (f += "; " + s, !0 !== i[s] && (f += "=" + i[s]));
                    return document.cookie = n + "=" + r + f
                }
                n || (c = {});
                for (var p = document.cookie ? document.cookie.split("; ") : [], d = /(%[0-9A-Z]{2})+/g, u = 0; u < p.length; u++) {
                    var l = p[u].split("="),
                        C = l.slice(1).join("=");
                    '"' === C.charAt(0) && (C = C.slice(1, -1));
                    try {
                        var g = l[0].replace(d, decodeURIComponent);
                        if (C = o.read ? o.read(C, g) : o(C, g) || C.replace(d, decodeURIComponent), this.json) try {
                            C = JSON.parse(C)
                        } catch (m) {}
                        if (n === g) {
                            c = C;
                            break
                        }
                        n || (c[g] = C)
                    } catch (m) {}
                }
                return c
            }
        }
        return t.set = t, t.get = function(e) {
            return t.call(t, e)
        }, t.getJSON = function() {
            return t.apply({
                json: !0
            }, [].slice.call(arguments))
        }, t.defaults = {}, t.remove = function(n, o) {
            t(n, "", e(o, {
                expires: -1
            }))
        }, t.withConverter = n, t
    }
    return n(function() {})
});
jQuery(function(r) {
    if ("undefined" == typeof wc_cart_fragments_params) return !1;
    var t = !0,
        o = wc_cart_fragments_params.cart_hash_key;
    try {
        t = "sessionStorage" in window && null !== window.sessionStorage, window.sessionStorage.setItem("wc", "test"), window.sessionStorage.removeItem("wc"), window.localStorage.setItem("wc", "test"), window.localStorage.removeItem("wc")
    } catch (f) {
        t = !1
    }

    function a() {
        t && sessionStorage.setItem("wc_cart_created", (new Date).getTime())
    }

    function s(e) {
        t && (localStorage.setItem(o, e), sessionStorage.setItem(o, e))
    }
    var e = {
        url: wc_cart_fragments_params.wc_ajax_url.toString().replace("%%endpoint%%", "get_refreshed_fragments"),
        type: "POST",
        data: {
            time: (new Date).getTime()
        },
        timeout: wc_cart_fragments_params.request_timeout,
        success: function(e) {
            e && e.fragments && (r.each(e.fragments, function(e, t) {
                r(e).replaceWith(t)
            }), t && (sessionStorage.setItem(wc_cart_fragments_params.fragment_name, JSON.stringify(e.fragments)), s(e.cart_hash), e.cart_hash && a()), r(document.body).trigger("wc_fragments_refreshed"))
        },
        error: function() {
            r(document.body).trigger("wc_fragments_ajax_error")
        }
    };

    function n() {
        r.ajax(e)
    }
    if (t) {
        var i = null;
        r(document.body).on("wc_fragment_refresh updated_wc_div", function() {
            n()
        }), r(document.body).on("added_to_cart removed_from_cart", function(e, t, r) {
            var n = sessionStorage.getItem(o);
            null !== n && n !== undefined && "" !== n || a(), sessionStorage.setItem(wc_cart_fragments_params.fragment_name, JSON.stringify(t)), s(r)
        }), r(document.body).on("wc_fragments_refreshed", function() {
            clearTimeout(i), i = setTimeout(n, 864e5)
        }), r(window).on("storage onstorage", function(e) {
            o === e.originalEvent.key && localStorage.getItem(o) !== sessionStorage.getItem(o) && n()
        }), r(window).on("pageshow", function(e) {
            e.originalEvent.persisted && (r(".widget_shopping_cart_content").empty(), r(document.body).trigger("wc_fragment_refresh"))
        });
        try {
            var c = r.parseJSON(sessionStorage.getItem(wc_cart_fragments_params.fragment_name)),
                _ = sessionStorage.getItem(o),
                g = Cookies.get("woocommerce_cart_hash"),
                m = sessionStorage.getItem("wc_cart_created");
            if (null !== _ && _ !== undefined && "" !== _ || (_ = ""), null !== g && g !== undefined && "" !== g || (g = ""), _ && (null === m || m === undefined || "" === m)) throw "No cart_created";
            if (m) {
                var d = 1 * m + 864e5,
                    w = (new Date).getTime();
                if (d < w) throw "Fragment expired";
                i = setTimeout(n, d - w)
            }
            if (!c || !c["div.widget_shopping_cart_content"] || _ !== g) throw "No fragment";
            r.each(c, function(e, t) {
                r(e).replaceWith(t)
            }), r(document.body).trigger("wc_fragments_loaded")
        } catch (f) {
            n()
        }
    } else n();
    0 < Cookies.get("woocommerce_items_in_cart") ? r(".hide_cart_widget_if_empty").closest(".widget_shopping_cart").show() : r(".hide_cart_widget_if_empty").closest(".widget_shopping_cart").hide(), r(document.body).on("adding_to_cart", function() {
        r(".hide_cart_widget_if_empty").closest(".widget_shopping_cart").show()
    }), "undefined" != typeof wp && wp.customize && wp.customize.selectiveRefresh && wp.customize.widgetsPreview && wp.customize.widgetsPreview.WidgetPartial && wp.customize.selectiveRefresh.bind("partial-content-rendered", function() {
        n()
    })
});
jQuery(document).ready(function($) {
    $('#mobi_view_cart2, .shopping-cart-header').on('click', function(event) {
        event.preventDefault();
        if ('function' === typeof affirm.ui.refresh) {
            affirm.ui.refresh();
        }
        $('#mk-boxed-layout').addClass('mini-cart-open');
    });
    $('#mini_shopping_cart_close').on("click", function(event) {
        $('#mk-boxed-layout').removeClass('mini-cart-open');
    });
    const $mobi_statement_scroller = $('#mobi_statement_scroller');

    function mobi_statement_scroller() {
        if ($mobi_statement_scroller.hasClass('slide2')) {
            $mobi_statement_scroller.removeClass('slide2').addClass('slide3');
        } else if ($mobi_statement_scroller.hasClass('slide3')) {
            $mobi_statement_scroller.removeClass('slide3').addClass('slide4');
        } else if ($mobi_statement_scroller.hasClass('slide4')) {
            $mobi_statement_scroller.removeClass('slide4');
        } else {
            $mobi_statement_scroller.addClass('slide2');
        }
        setTimeout(function() {
            mobi_statement_scroller();
        }, 5000);
    }
    mobi_statement_scroller();
    $('#mobi_search_trigger').on('click', function() {
        if ($('.mk-nav-responsive-link').hasClass('is-active')) {
            if ($('.mk-responsive-nav').hasClass('mobi-search-expanded')) {
                $('.mk-header-holder .mk-nav-responsive-link').trigger('click');
            } else {
                $('.mk-responsive-nav').addClass('mobi-search-expanded');
            }
        } else {
            $('.mk-header-holder .mk-nav-responsive-link').trigger('click');
            $('.mk-responsive-nav').addClass('mobi-search-expanded');
        }
    });
    $('.mk-nav-responsive-link').on('click', function() {
        $('.mk-responsive-nav').removeClass('mobi-search-expanded');
    });
    setTimeout(function() {
        $('.qualityHotspot').on('click', function() {
            return false;
        });
    }, 1000);
});

! function(t, e, n, o) {
    "use strict";

    function i(t, e) {
        var o, i, a = [],
            s = 0;
        t && t.isDefaultPrevented() || (t.preventDefault(), e = t && t.data ? t.data.options : e || {}, o = e.$target || n(t.currentTarget), i = o.attr("data-fancybox") || "", i ? (a = e.selector ? n(e.selector) : t.data ? t.data.items : [], a = a.length ? a.filter('[data-fancybox="' + i + '"]') : n('[data-fancybox="' + i + '"]'), s = a.index(o), s < 0 && (s = 0)) : a = [o], n.fancybox.open(a, e, s))
    }
    if (t.console = t.console || {
            info: function(t) {}
        }, n) {
        if (n.fn.fancybox) return void console.info("fancyBox already initialized");
        var a = {
                loop: !1,
                gutter: 50,
                keyboard: !0,
                arrows: !0,
                infobar: !0,
                smallBtn: "auto",
                toolbar: "auto",
                buttons: ["zoom", "thumbs", "close"],
                idleTime: 3,
                protect: !1,
                modal: !1,
                image: {
                    preload: !1
                },
                ajax: {
                    settings: {
                        data: {
                            fancybox: !0
                        }
                    }
                },
                iframe: {
                    tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',
                    preload: !0,
                    css: {},
                    attr: {
                        scrolling: "auto"
                    }
                },
                defaultType: "image",
                animationEffect: "zoom",
                animationDuration: 366,
                zoomOpacity: "auto",
                transitionEffect: "fade",
                transitionDuration: 366,
                slideClass: "",
                baseClass: "",
                baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"></div></div></div>',
                spinnerTpl: '<div class="fancybox-loading"></div>',
                errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
                btnTpl: {
                    download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"><svg viewBox="0 0 40 40"><path d="M13,16 L20,23 L27,16 M20,7 L20,23 M10,24 L10,28 L30,28 L30,24" /></svg></a>',
                    zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg viewBox="0 0 40 40"><path d="M18,17 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0 M24,22 L31,29" /></svg></button>',
                    close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg viewBox="0 0 40 40"><path d="M10,10 L30,30 M30,10 L10,30" /></svg></button>',
                    smallBtn: '<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"><svg viewBox="0 0 32 32"><path d="M10,10 L22,22 M22,10 L10,22"></path></svg></button>',
                    arrowLeft: '<a data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}" href="javascript:;"><svg viewBox="0 0 40 40"><path d="M18,12 L10,20 L18,28 M10,20 L30,20"></path></svg></a>',
                    arrowRight: '<a data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}" href="javascript:;"><svg viewBox="0 0 40 40"><path d="M10,20 L30,20 M22,12 L30,20 L22,28"></path></svg></a>'
                },
                parentEl: "body",
                autoFocus: !1,
                backFocus: !0,
                trapFocus: !0,
                fullScreen: {
                    autoStart: !1
                },
                touch: {
                    vertical: !0,
                    momentum: !0
                },
                hash: null,
                media: {},
                slideShow: {
                    autoStart: !1,
                    speed: 4e3
                },
                thumbs: {
                    autoStart: !1,
                    hideOnClose: !0,
                    parentEl: ".fancybox-container",
                    axis: "y"
                },
                wheel: "auto",
                onInit: n.noop,
                beforeLoad: n.noop,
                afterLoad: n.noop,
                beforeShow: n.noop,
                afterShow: n.noop,
                beforeClose: n.noop,
                afterClose: n.noop,
                onActivate: n.noop,
                onDeactivate: n.noop,
                clickContent: function(t, e) {
                    return "image" === t.type && "zoom"
                },
                clickSlide: "close",
                clickOutside: "close",
                dblclickContent: !1,
                dblclickSlide: !1,
                dblclickOutside: !1,
                mobile: {
                    idleTime: !1,
                    clickContent: function(t, e) {
                        return "image" === t.type && "toggleControls"
                    },
                    clickSlide: function(t, e) {
                        return "image" === t.type ? "toggleControls" : "close"
                    },
                    dblclickContent: function(t, e) {
                        return "image" === t.type && "zoom"
                    },
                    dblclickSlide: function(t, e) {
                        return "image" === t.type && "zoom"
                    }
                },
                lang: "en",
                i18n: {
                    en: {
                        CLOSE: "Close",
                        NEXT: "Next",
                        PREV: "Previous",
                        ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
                        PLAY_START: "Start slideshow",
                        PLAY_STOP: "Pause slideshow",
                        FULL_SCREEN: "Full screen",
                        THUMBS: "Thumbnails",
                        DOWNLOAD: "Download",
                        SHARE: "Share",
                        ZOOM: "Zoom"
                    },
                    de: {
                        CLOSE: "Schliessen",
                        NEXT: "Weiter",
                        PREV: "Zurück",
                        ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.",
                        PLAY_START: "Diaschau starten",
                        PLAY_STOP: "Diaschau beenden",
                        FULL_SCREEN: "Vollbild",
                        THUMBS: "Vorschaubilder",
                        DOWNLOAD: "Herunterladen",
                        SHARE: "Teilen",
                        ZOOM: "Maßstab"
                    }
                }
            },
            s = n(t),
            r = n(e),
            c = 0,
            l = function(t) {
                return t && t.hasOwnProperty && t instanceof n
            },
            d = function() {
                return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function(e) {
                    return t.setTimeout(e, 1e3 / 60)
                }
            }(),
            u = function() {
                var t, n = e.createElement("fakeelement"),
                    i = {
                        transition: "transitionend",
                        OTransition: "oTransitionEnd",
                        MozTransition: "transitionend",
                        WebkitTransition: "webkitTransitionEnd"
                    };
                for (t in i)
                    if (n.style[t] !== o) return i[t];
                return "transitionend"
            }(),
            f = function(t) {
                return t && t.length && t[0].offsetHeight
            },
            p = function(t, e) {
                var o = n.extend(!0, {}, t, e);
                return n.each(e, function(t, e) {
                    n.isArray(e) && (o[t] = e)
                }), o
            },
            h = function(t, o, i) {
                var a = this;
                a.opts = p({
                    index: i
                }, n.fancybox.defaults), n.isPlainObject(o) && (a.opts = p(a.opts, o)), n.fancybox.isMobile && (a.opts = p(a.opts, a.opts.mobile)), a.id = a.opts.id || ++c, a.currIndex = parseInt(a.opts.index, 10) || 0, a.prevIndex = null, a.prevPos = null, a.currPos = 0, a.firstRun = !0, a.group = [], a.slides = {}, a.addContent(t), a.group.length && (a.$lastFocus = n(e.activeElement).trigger("blur"), a.init())
            };
        n.extend(h.prototype, {
            init: function() {
                var i, a, s, r = this,
                    c = r.group[r.currIndex],
                    l = c.opts,
                    d = n.fancybox.scrollbarWidth;
                n.fancybox.getInstance() || l.hideScrollbar === !1 || (n("body").addClass("fancybox-active"), !n.fancybox.isMobile && e.body.scrollHeight > t.innerHeight && (d === o && (i = n('<div style="width:100px;height:100px;overflow:scroll;" />').appendTo("body"), d = n.fancybox.scrollbarWidth = i[0].offsetWidth - i[0].clientWidth, i.remove()), n("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar { margin-right: ' + d + "px; }</style>"), n("body").addClass("compensate-for-scrollbar"))), s = "", n.each(l.buttons, function(t, e) {
                    s += l.btnTpl[e] || ""
                }), a = n(r.translate(r, l.baseTpl.replace("{{buttons}}", s).replace("{{arrows}}", l.btnTpl.arrowLeft + l.btnTpl.arrowRight))).attr("id", "fancybox-container-" + r.id).addClass("fancybox-is-hidden").addClass(l.baseClass).data("FancyBox", r).appendTo(l.parentEl), r.$refs = {
                    container: a
                }, ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(function(t) {
                    r.$refs[t] = a.find(".fancybox-" + t)
                }), r.trigger("onInit"), r.activate(), r.jumpTo(r.currIndex)
            },
            translate: function(t, e) {
                var n = t.opts.i18n[t.opts.lang];
                return e.replace(/\{\{(\w+)\}\}/g, function(t, e) {
                    var i = n[e];
                    return i === o ? t : i
                })
            },
            addContent: function(t) {
                var e, i = this,
                    a = n.makeArray(t);
                n.each(a, function(t, e) {
                    var a, s, r, c, l, d = {},
                        u = {};
                    n.isPlainObject(e) ? (d = e, u = e.opts || e) : "object" === n.type(e) && n(e).length ? (a = n(e), u = a.data() || {}, u = n.extend(!0, {}, u, u.options), u.$orig = a, d.src = i.opts.src || u.src || a.attr("href"), d.type || d.src || (d.type = "inline", d.src = e)) : d = {
                        type: "html",
                        src: e + ""
                    }, d.opts = n.extend(!0, {}, i.opts, u), n.isArray(u.buttons) && (d.opts.buttons = u.buttons), s = d.type || d.opts.type, c = d.src || "", !s && c && ((r = c.match(/\.(mp4|mov|ogv)((\?|#).*)?$/i)) ? (s = "video", d.opts.videoFormat || (d.opts.videoFormat = "video/" + ("ogv" === r[1] ? "ogg" : r[1]))) : c.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? s = "image" : c.match(/\.(pdf)((\?|#).*)?$/i) ? s = "iframe" : "#" === c.charAt(0) && (s = "inline")), s ? d.type = s : i.trigger("objectNeedsType", d), d.contentType || (d.contentType = n.inArray(d.type, ["html", "inline", "ajax"]) > -1 ? "html" : d.type), d.index = i.group.length, "auto" == d.opts.smallBtn && (d.opts.smallBtn = n.inArray(d.type, ["html", "inline", "ajax"]) > -1), "auto" === d.opts.toolbar && (d.opts.toolbar = !d.opts.smallBtn), d.opts.$trigger && d.index === i.opts.index && (d.opts.$thumb = d.opts.$trigger.find("img:first")), d.opts.$thumb && d.opts.$thumb.length || !d.opts.$orig || (d.opts.$thumb = d.opts.$orig.find("img:first")), "function" === n.type(d.opts.caption) && (d.opts.caption = d.opts.caption.apply(e, [i, d])), "function" === n.type(i.opts.caption) && (d.opts.caption = i.opts.caption.apply(e, [i, d])), d.opts.caption instanceof n || (d.opts.caption = d.opts.caption === o ? "" : d.opts.caption + ""), "ajax" === d.type && (l = c.split(/\s+/, 2), l.length > 1 && (d.src = l.shift(), d.opts.filter = l.shift())), d.opts.modal && (d.opts = n.extend(!0, d.opts, {
                        infobar: 0,
                        toolbar: 0,
                        smallBtn: 0,
                        keyboard: 0,
                        slideShow: 0,
                        fullScreen: 0,
                        thumbs: 0,
                        touch: 0,
                        clickContent: !1,
                        clickSlide: !1,
                        clickOutside: !1,
                        dblclickContent: !1,
                        dblclickSlide: !1,
                        dblclickOutside: !1
                    })), i.group.push(d)
                }), Object.keys(i.slides).length && (i.updateControls(), e = i.Thumbs, e && e.isActive && (e.create(), e.focus()))
            },
            addEvents: function() {
                var o = this;
                o.removeEvents(), o.$refs.container.on("click.fb-close", "[data-fancybox-close]", function(t) {
                    t.stopPropagation(), t.preventDefault(), o.close(t)
                }).on("touchstart.fb-prev click.fb-prev", "[data-fancybox-prev]", function(t) {
                    t.stopPropagation(), t.preventDefault(), o.previous()
                }).on("touchstart.fb-next click.fb-next", "[data-fancybox-next]", function(t) {
                    t.stopPropagation(), t.preventDefault(), o.next()
                }).on("click.fb", "[data-fancybox-zoom]", function(t) {
                    o[o.isScaledDown() ? "scaleToActual" : "scaleToFit"]()
                }), s.on("orientationchange.fb resize.fb", function(t) {
                    t && t.originalEvent && "resize" === t.originalEvent.type ? d(function() {
                        o.update()
                    }) : (o.$refs.stage.hide(), setTimeout(function() {
                        o.$refs.stage.show(), o.update()
                    }, n.fancybox.isMobile ? 600 : 250))
                }), r.on("focusin.fb", function(t) {
                    var o = n.fancybox ? n.fancybox.getInstance() : null;
                    o.isClosing || !o.current || !o.current.opts.trapFocus || n(t.target).hasClass("fancybox-container") || n(t.target).is(e) || o && "fixed" !== n(t.target).css("position") && !o.$refs.container.has(t.target).length && (t.stopPropagation(), o.focus())
                }), r.on("keydown.fb", function(t) {
                    var e = o.current,
                        i = t.keyCode || t.which;
                    if (e && e.opts.keyboard && !(t.ctrlKey || t.altKey || t.shiftKey || n(t.target).is("input") || n(t.target).is("textarea"))) return 8 === i || 27 === i ? (t.preventDefault(), void o.close(t)) : 37 === i || 38 === i ? (t.preventDefault(), void o.previous()) : 39 === i || 40 === i ? (t.preventDefault(), void o.next()) : void o.trigger("afterKeydown", t, i)
                }), o.group[o.currIndex].opts.idleTime && (o.idleSecondsCounter = 0, r.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", function(t) {
                    o.idleSecondsCounter = 0, o.isIdle && o.showControls(), o.isIdle = !1
                }), o.idleInterval = t.setInterval(function() {
                    o.idleSecondsCounter++, o.idleSecondsCounter >= o.group[o.currIndex].opts.idleTime && !o.isDragging && (o.isIdle = !0, o.idleSecondsCounter = 0, o.hideControls())
                }, 1e3))
            },
            removeEvents: function() {
                var e = this;
                s.off("orientationchange.fb resize.fb"), r.off("focusin.fb keydown.fb .fb-idle"), this.$refs.container.off(".fb-close .fb-prev .fb-next"), e.idleInterval && (t.clearInterval(e.idleInterval), e.idleInterval = null)
            },
            previous: function(t) {
                return this.jumpTo(this.currPos - 1, t)
            },
            next: function(t) {
                return this.jumpTo(this.currPos + 1, t)
            },
            jumpTo: function(t, e) {
                var i, a, s, r, c, l, d, u = this,
                    p = u.group.length;
                if (!(u.isDragging || u.isClosing || u.isAnimating && u.firstRun)) {
                    if (t = parseInt(t, 10), a = u.current ? u.current.opts.loop : u.opts.loop, !a && (t < 0 || t >= p)) return !1;
                    if (i = u.firstRun = !Object.keys(u.slides).length, !(p < 2 && !i && u.isDragging)) {
                        if (r = u.current, u.prevIndex = u.currIndex, u.prevPos = u.currPos, s = u.createSlide(t), p > 1 && ((a || s.index > 0) && u.createSlide(t - 1), (a || s.index < p - 1) && u.createSlide(t + 1)), u.current = s, u.currIndex = s.index, u.currPos = s.pos, u.trigger("beforeShow", i), u.updateControls(), l = n.fancybox.getTranslate(s.$slide), s.isMoved = (0 !== l.left || 0 !== l.top) && !s.$slide.hasClass("fancybox-animated"), s.forcedDuration = o, n.isNumeric(e) ? s.forcedDuration = e : e = s.opts[i ? "animationDuration" : "transitionDuration"], e = parseInt(e, 10), i) return s.opts.animationEffect && e && u.$refs.container.css("transition-duration", e + "ms"), u.$refs.container.removeClass("fancybox-is-hidden"), f(u.$refs.container), u.$refs.container.addClass("fancybox-is-open"), f(u.$refs.container), s.$slide.addClass("fancybox-slide--previous"), u.loadSlide(s), s.$slide.removeClass("fancybox-slide--previous").addClass("fancybox-slide--current"), void u.preload("image");
                        n.each(u.slides, function(t, e) {
                            n.fancybox.stop(e.$slide)
                        }), s.$slide.removeClass("fancybox-slide--next fancybox-slide--previous").addClass("fancybox-slide--current"), s.isMoved ? (c = Math.round(s.$slide.width()), n.each(u.slides, function(t, o) {
                            var i = o.pos - s.pos;
                            n.fancybox.animate(o.$slide, {
                                top: 0,
                                left: i * c + i * o.opts.gutter
                            }, e, function() {
                                o.$slide.removeAttr("style").removeClass("fancybox-slide--next fancybox-slide--previous"), o.pos === u.currPos && (s.isMoved = !1, u.complete())
                            })
                        })) : u.$refs.stage.children().removeAttr("style"), s.isLoaded ? u.revealContent(s) : u.loadSlide(s), u.preload("image"), r.pos !== s.pos && (d = "fancybox-slide--" + (r.pos > s.pos ? "next" : "previous"), r.$slide.removeClass("fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous"), r.isComplete = !1, e && (s.isMoved || s.opts.transitionEffect) && (s.isMoved ? r.$slide.addClass(d) : (d = "fancybox-animated " + d + " fancybox-fx-" + s.opts.transitionEffect, n.fancybox.animate(r.$slide, d, e, function() {
                            r.$slide.removeClass(d).removeAttr("style")
                        }))))
                    }
                }
            },
            createSlide: function(t) {
                var e, o, i = this;
                return o = t % i.group.length, o = o < 0 ? i.group.length + o : o, !i.slides[t] && i.group[o] && (e = n('<div class="fancybox-slide"></div>').appendTo(i.$refs.stage), i.slides[t] = n.extend(!0, {}, i.group[o], {
                    pos: t,
                    $slide: e,
                    isLoaded: !1
                }), i.updateSlide(i.slides[t])), i.slides[t]
            },
            scaleToActual: function(t, e, i) {
                var a, s, r, c, l, d = this,
                    u = d.current,
                    f = u.$content,
                    p = n.fancybox.getTranslate(u.$slide).width,
                    h = n.fancybox.getTranslate(u.$slide).height,
                    g = u.width,
                    b = u.height;
                !d.isAnimating && f && "image" == u.type && u.isLoaded && !u.hasError && (n.fancybox.stop(f), d.isAnimating = !0, t = t === o ? .5 * p : t, e = e === o ? .5 * h : e, a = n.fancybox.getTranslate(f), a.top -= n.fancybox.getTranslate(u.$slide).top, a.left -= n.fancybox.getTranslate(u.$slide).left, c = g / a.width, l = b / a.height, s = .5 * p - .5 * g, r = .5 * h - .5 * b, g > p && (s = a.left * c - (t * c - t), s > 0 && (s = 0), s < p - g && (s = p - g)), b > h && (r = a.top * l - (e * l - e), r > 0 && (r = 0), r < h - b && (r = h - b)), d.updateCursor(g, b), n.fancybox.animate(f, {
                    top: r,
                    left: s,
                    scaleX: c,
                    scaleY: l
                }, i || 330, function() {
                    d.isAnimating = !1
                }), d.SlideShow && d.SlideShow.isActive && d.SlideShow.stop())
            },
            scaleToFit: function(t) {
                var e, o = this,
                    i = o.current,
                    a = i.$content;
                !o.isAnimating && a && "image" == i.type && i.isLoaded && !i.hasError && (n.fancybox.stop(a), o.isAnimating = !0, e = o.getFitPos(i), o.updateCursor(e.width, e.height), n.fancybox.animate(a, {
                    top: e.top,
                    left: e.left,
                    scaleX: e.width / a.width(),
                    scaleY: e.height / a.height()
                }, t || 330, function() {
                    o.isAnimating = !1
                }))
            },
            getFitPos: function(t) {
                var e, n, o, i, a, s = this,
                    r = t.$content,
                    c = t.width || t.opts.width,
                    l = t.height || t.opts.height,
                    d = {};
                return !!(t.isLoaded && r && r.length) && (i = {
                    top: parseInt(t.$slide.css("paddingTop"), 10),
                    right: parseInt(t.$slide.css("paddingRight"), 10),
                    bottom: parseInt(t.$slide.css("paddingBottom"), 10),
                    left: parseInt(t.$slide.css("paddingLeft"), 10)
                }, e = parseInt(s.$refs.stage.width(), 10) - (i.left + i.right), n = parseInt(s.$refs.stage.height(), 10) - (i.top + i.bottom), c && l || (c = e, l = n), o = Math.min(1, e / c, n / l), c = Math.floor(o * c), l = Math.floor(o * l), "image" === t.type ? (d.top = Math.floor(.5 * (n - l)) + i.top, d.left = Math.floor(.5 * (e - c)) + i.left) : "video" === t.contentType && (a = t.opts.width && t.opts.height ? c / l : t.opts.ratio || 16 / 9, l > c / a ? l = c / a : c > l * a && (c = l * a)), d.width = c, d.height = l, d)
            },
            update: function() {
                var t = this;
                n.each(t.slides, function(e, n) {
                    t.updateSlide(n)
                })
            },
            updateSlide: function(t, e) {
                var o = this,
                    i = t && t.$content,
                    a = t.width || t.opts.width,
                    s = t.height || t.opts.height;
                i && (a || s || "video" === t.contentType) && !t.hasError && (n.fancybox.stop(i), n.fancybox.setTranslate(i, o.getFitPos(t)), t.pos === o.currPos && (o.isAnimating = !1, o.updateCursor())), t.$slide.trigger("refresh"), o.$refs.toolbar.toggleClass("compensate-for-scrollbar", t.$slide.get(0).scrollHeight > t.$slide.get(0).clientHeight), o.trigger("onUpdate", t)
            },
            centerSlide: function(t, e) {
                var i, a, s = this;
                s.current && (i = Math.round(t.$slide.width()), a = t.pos - s.current.pos, n.fancybox.animate(t.$slide, {
                    top: 0,
                    left: a * i + a * t.opts.gutter,
                    opacity: 1
                }, e === o ? 0 : e, null, !1))
            },
            updateCursor: function(t, e) {
                var o, i = this,
                    a = i.current,
                    s = i.$refs.container.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut");
                a && !i.isClosing && (o = i.isZoomable(), s.toggleClass("fancybox-is-zoomable", o), n("[data-fancybox-zoom]").prop("disabled", !o), o && ("zoom" === a.opts.clickContent || n.isFunction(a.opts.clickContent) && "zoom" === a.opts.clickContent(a)) ? i.isScaledDown(t, e) ? s.addClass("fancybox-can-zoomIn") : a.opts.touch ? s.addClass("fancybox-can-drag") : s.addClass("fancybox-can-zoomOut") : a.opts.touch && "video" !== a.contentType && s.addClass("fancybox-can-drag"))
            },
            isZoomable: function() {
                var t, e = this,
                    n = e.current;
                if (n && !e.isClosing && "image" === n.type && !n.hasError) {
                    if (!n.isLoaded) return !0;
                    if (t = e.getFitPos(n), n.width > t.width || n.height > t.height) return !0
                }
                return !1
            },
            isScaledDown: function(t, e) {
                var i = this,
                    a = !1,
                    s = i.current,
                    r = s.$content;
                return t !== o && e !== o ? a = t < s.width && e < s.height : r && (a = n.fancybox.getTranslate(r), a = a.width < s.width && a.height < s.height), a
            },
            canPan: function() {
                var t, e = this,
                    n = !1,
                    o = e.current;
                return "image" === o.type && (t = o.$content) && !o.hasError && (n = e.getFitPos(o), n = Math.abs(t.width() - n.width) > 1 || Math.abs(t.height() - n.height) > 1), n
            },
            loadSlide: function(t) {
                var e, o, i, a = this;
                if (!t.isLoading && !t.isLoaded) {
                    switch (t.isLoading = !0, a.trigger("beforeLoad", t), e = t.type, o = t.$slide, o.off("refresh").trigger("onReset").addClass(t.opts.slideClass), e) {
                        case "image":
                            a.setImage(t);
                            break;
                        case "iframe":
                            a.setIframe(t);
                            break;
                        case "html":
                            a.setContent(t, t.src || t.content);
                            break;
                        case "video":
                            a.setContent(t, '<video class="fancybox-video" controls controlsList="nodownload"><source src="' + t.src + '" type="' + t.opts.videoFormat + "\">Your browser doesn't support HTML5 video</video");
                            break;
                        case "inline":
                            n(t.src).length ? a.setContent(t, n(t.src)) : a.setError(t);
                            break;
                        case "ajax":
                            a.showLoading(t), i = n.ajax(n.extend({}, t.opts.ajax.settings, {
                                url: t.src,
                                success: function(e, n) {
                                    "success" === n && a.setContent(t, e)
                                },
                                error: function(e, n) {
                                    e && "abort" !== n && a.setError(t)
                                }
                            })), o.one("onReset", function() {
                                i.abort()
                            });
                            break;
                        default:
                            a.setError(t)
                    }
                    return !0
                }
            },
            setImage: function(e) {
                var o, i, a, s, r, c = this,
                    l = e.opts.srcset || e.opts.image.srcset;
                if (e.timouts = setTimeout(function() {
                        var t = e.$image;
                        !e.isLoading || t && t[0].complete || e.hasError || c.showLoading(e)
                    }, 350), l) {
                    s = t.devicePixelRatio || 1, r = t.innerWidth * s, a = l.split(",").map(function(t) {
                        var e = {};
                        return t.trim().split(/\s+/).forEach(function(t, n) {
                            var o = parseInt(t.substring(0, t.length - 1), 10);
                            return 0 === n ? e.url = t : void(o && (e.value = o, e.postfix = t[t.length - 1]))
                        }), e
                    }), a.sort(function(t, e) {
                        return t.value - e.value
                    });
                    for (var d = 0; d < a.length; d++) {
                        var u = a[d];
                        if ("w" === u.postfix && u.value >= r || "x" === u.postfix && u.value >= s) {
                            i = u;
                            break
                        }
                    }!i && a.length && (i = a[a.length - 1]), i && (e.src = i.url, e.width && e.height && "w" == i.postfix && (e.height = e.width / e.height * i.value, e.width = i.value), e.opts.srcset = l)
                }
                e.$content = n('<div class="fancybox-content"></div>').addClass("fancybox-is-hidden").appendTo(e.$slide.addClass("fancybox-slide--image")), o = e.opts.thumb || !(!e.opts.$thumb || !e.opts.$thumb.length) && e.opts.$thumb.attr("src"), e.opts.preload !== !1 && e.opts.width && e.opts.height && o && (e.width = e.opts.width, e.height = e.opts.height, e.$ghost = n("<img />").one("error", function() {
                    n(this).remove(), e.$ghost = null
                }).one("load", function() {
                    c.afterLoad(e)
                }).addClass("fancybox-image").appendTo(e.$content).attr("src", o)), c.setBigImage(e)
            },
            setBigImage: function(t) {
                var e = this,
                    o = n("<img />");
                t.$image = o.one("error", function() {
                    e.setError(t)
                }).one("load", function() {
                    var n;
                    t.$ghost || (e.resolveImageSlideSize(t, this.naturalWidth, this.naturalHeight), e.afterLoad(t)), t.timouts && (clearTimeout(t.timouts), t.timouts = null), e.isClosing || (t.opts.srcset && (n = t.opts.sizes, n && "auto" !== n || (n = (t.width / t.height > 1 && s.width() / s.height() > 1 ? "100" : Math.round(t.width / t.height * 100)) + "vw"), o.attr("sizes", n).attr("srcset", t.opts.srcset)), t.$ghost && setTimeout(function() {
                        t.$ghost && !e.isClosing && t.$ghost.hide()
                    }, Math.min(300, Math.max(1e3, t.height / 1600))), e.hideLoading(t))
                }).addClass("fancybox-image").attr("src", t.src).appendTo(t.$content), (o[0].complete || "complete" == o[0].readyState) && o[0].naturalWidth && o[0].naturalHeight ? o.trigger("load") : o[0].error && o.trigger("error")
            },
            resolveImageSlideSize: function(t, e, n) {
                var o = parseInt(t.opts.width, 10),
                    i = parseInt(t.opts.height, 10);
                t.width = e, t.height = n, o > 0 && (t.width = o, t.height = Math.floor(o * n / e)), i > 0 && (t.width = Math.floor(i * e / n), t.height = i)
            },
            setIframe: function(t) {
                var e, i = this,
                    a = t.opts.iframe,
                    s = t.$slide;
                t.$content = n('<div class="fancybox-content' + (a.preload ? " fancybox-is-hidden" : "") + '"></div>').css(a.css).appendTo(s), s.addClass("fancybox-slide--" + t.contentType), t.$iframe = e = n(a.tpl.replace(/\{rnd\}/g, (new Date).getTime())).attr(a.attr).appendTo(t.$content), a.preload ? (i.showLoading(t), e.on("load.fb error.fb", function(e) {
                    this.isReady = 1, t.$slide.trigger("refresh"), i.afterLoad(t)
                }), s.on("refresh.fb", function() {
                    var n, i, s = t.$content,
                        r = a.css.width,
                        c = a.css.height;
                    if (1 === e[0].isReady) {
                        try {
                            n = e.contents(), i = n.find("body")
                        } catch (t) {}
                        i && i.length && i.children().length && (s.css({
                            width: "",
                            height: ""
                        }), r === o && (r = Math.ceil(Math.max(i[0].clientWidth, i.outerWidth(!0)))), r && s.width(r), c === o && (c = Math.ceil(Math.max(i[0].clientHeight, i.outerHeight(!0)))), c && s.height(c)), s.removeClass("fancybox-is-hidden")
                    }
                })) : this.afterLoad(t), e.attr("src", t.src), s.one("onReset", function() {
                    try {
                        n(this).find("iframe").hide().unbind().attr("src", "//about:blank")
                    } catch (t) {}
                    n(this).off("refresh.fb").empty(), t.isLoaded = !1
                })
            },
            setContent: function(t, e) {
                var o = this;
                o.isClosing || (o.hideLoading(t), t.$content && n.fancybox.stop(t.$content), t.$slide.empty(), l(e) && e.parent().length ? (e.parent().parent(".fancybox-slide--inline").trigger("onReset"), t.$placeholder = n("<div>").hide().insertAfter(e), e.css("display", "inline-block")) : t.hasError || ("string" === n.type(e) && (e = n("<div>").append(n.trim(e)).contents(), 3 === e[0].nodeType && (e = n("<div>").html(e))), t.opts.filter && (e = n("<div>").html(e).find(t.opts.filter))), t.$slide.one("onReset", function() {
                    n(this).find("video,audio").trigger("pause"), t.$placeholder && (t.$placeholder.after(e.hide()).remove(), t.$placeholder = null), t.$smallBtn && (t.$smallBtn.remove(), t.$smallBtn = null), t.hasError || (n(this).empty(), t.isLoaded = !1)
                }), n(e).appendTo(t.$slide), n(e).is("video,audio") && (n(e).addClass("fancybox-video"), n(e).wrap("<div></div>"), t.contentType = "video", t.opts.width = t.opts.width || n(e).attr("width"), t.opts.height = t.opts.height || n(e).attr("height")), t.$content = t.$slide.children().filter("div,form,main,video,audio").first().addClass("fancybox-content"), t.$slide.addClass("fancybox-slide--" + t.contentType), this.afterLoad(t))
            },
            setError: function(t) {
                t.hasError = !0, t.$slide.trigger("onReset").removeClass("fancybox-slide--" + t.contentType).addClass("fancybox-slide--error"), t.contentType = "html", this.setContent(t, this.translate(t, t.opts.errorTpl)), t.pos === this.currPos && (this.isAnimating = !1)
            },
            showLoading: function(t) {
                var e = this;
                t = t || e.current, t && !t.$spinner && (t.$spinner = n(e.translate(e, e.opts.spinnerTpl)).appendTo(t.$slide))
            },
            hideLoading: function(t) {
                var e = this;
                t = t || e.current, t && t.$spinner && (t.$spinner.remove(), delete t.$spinner)
            },
            afterLoad: function(t) {
                var e = this;
                e.isClosing || (t.isLoading = !1, t.isLoaded = !0, e.trigger("afterLoad", t), e.hideLoading(t), t.pos === e.currPos && e.updateCursor(), !t.opts.smallBtn || t.$smallBtn && t.$smallBtn.length || (t.$smallBtn = n(e.translate(t, t.opts.btnTpl.smallBtn)).prependTo(t.$content)), t.opts.protect && t.$content && !t.hasError && (t.$content.on("contextmenu.fb", function(t) {
                    return 2 == t.button && t.preventDefault(), !0
                }), "image" === t.type && n('<div class="fancybox-spaceball"></div>').appendTo(t.$content)), e.revealContent(t))
            },
            revealContent: function(t) {
                var e, i, a, s, r = this,
                    c = t.$slide,
                    l = !1,
                    d = !1;
                return e = t.opts[r.firstRun ? "animationEffect" : "transitionEffect"], a = t.opts[r.firstRun ? "animationDuration" : "transitionDuration"], a = parseInt(t.forcedDuration === o ? a : t.forcedDuration, 10), t.pos === r.currPos && (t.isComplete ? e = !1 : r.isAnimating = !0), !t.isMoved && t.pos === r.currPos && a || (e = !1), "zoom" === e && (t.pos === r.currPos && a && "image" === t.type && !t.hasError && (d = r.getThumbPos(t)) ? l = r.getFitPos(t) : e = "fade"), "zoom" === e ? (l.scaleX = l.width / d.width, l.scaleY = l.height / d.height, s = t.opts.zoomOpacity, "auto" == s && (s = Math.abs(t.width / t.height - d.width / d.height) > .1), s && (d.opacity = .1, l.opacity = 1), n.fancybox.setTranslate(t.$content.removeClass("fancybox-is-hidden"), d), f(t.$content), void n.fancybox.animate(t.$content, l, a, function() {
                    r.isAnimating = !1, r.complete()
                })) : (r.updateSlide(t), e ? (n.fancybox.stop(c), i = "fancybox-animated fancybox-slide--" + (t.pos >= r.prevPos ? "next" : "previous") + " fancybox-fx-" + e, c.removeAttr("style").removeClass("fancybox-slide--current fancybox-slide--next fancybox-slide--previous").addClass(i), t.$content.removeClass("fancybox-is-hidden"), f(c), void n.fancybox.animate(c, "fancybox-slide--current", a, function(e) {
                    c.removeClass(i).removeAttr("style"), t.pos === r.currPos && r.complete()
                }, !0)) : (f(c), t.$content.removeClass("fancybox-is-hidden"), void(t.pos === r.currPos && r.complete())))
            },
            getThumbPos: function(o) {
                var i, a = this,
                    s = !1,
                    r = o.opts.$thumb,
                    c = r && r.length && r[0].ownerDocument === e ? r.offset() : 0,
                    l = function(e) {
                        for (var o, i = e[0], a = i.getBoundingClientRect(), s = []; null !== i.parentElement;) "hidden" !== n(i.parentElement).css("overflow") && "auto" !== n(i.parentElement).css("overflow") || s.push(i.parentElement.getBoundingClientRect()), i = i.parentElement;
                        return o = s.every(function(t) {
                            var e = Math.min(a.right, t.right) - Math.max(a.left, t.left),
                                n = Math.min(a.bottom, t.bottom) - Math.max(a.top, t.top);
                            return e > 0 && n > 0
                        }), o && a.bottom > 0 && a.right > 0 && a.left < n(t).width() && a.top < n(t).height()
                    };
                return c && l(r) && (i = a.$refs.stage.offset(), s = {
                    top: c.top - i.top + parseFloat(r.css("border-top-width") || 0),
                    left: c.left - i.left + parseFloat(r.css("border-left-width") || 0),
                    width: r.width(),
                    height: r.height(),
                    scaleX: 1,
                    scaleY: 1
                }), s
            },
            complete: function() {
                var t = this,
                    o = t.current,
                    i = {};
                !o.isMoved && o.isLoaded && (o.isComplete || (o.isComplete = !0, o.$slide.siblings().trigger("onReset"), t.preload("inline"), f(o.$slide), o.$slide.addClass("fancybox-slide--complete"), n.each(t.slides, function(e, o) {
                    o.pos >= t.currPos - 1 && o.pos <= t.currPos + 1 ? i[o.pos] = o : o && (n.fancybox.stop(o.$slide), o.$slide.off().remove())
                }), t.slides = i), t.isAnimating = !1, t.updateCursor(), t.trigger("afterShow"), o.$slide.find("video,audio").filter(":visible:first").trigger("play"), (n(e.activeElement).is("[disabled]") || o.opts.autoFocus && "image" != o.type && "iframe" !== o.type) && t.focus())
            },
            preload: function(t) {
                var e = this,
                    n = e.slides[e.currPos + 1],
                    o = e.slides[e.currPos - 1];
                n && n.type === t && e.loadSlide(n), o && o.type === t && e.loadSlide(o)
            },
            focus: function() {
                var t, e = this.current;
                this.isClosing || e && e.isComplete && e.$content && (t = e.$content.find("input[autofocus]:enabled:visible:first"), t.length || (t = e.$content.find("button,:input,[tabindex],a").filter(":enabled:visible:first")), t = t && t.length ? t : e.$content, t.trigger("focus"))
            },
            activate: function() {
                var t = this;
                n(".fancybox-container").each(function() {
                    var e = n(this).data("FancyBox");
                    e && e.id !== t.id && !e.isClosing && (e.trigger("onDeactivate"), e.removeEvents(), e.isVisible = !1)
                }), t.isVisible = !0, (t.current || t.isIdle) && (t.update(), t.updateControls()), t.trigger("onActivate"), t.addEvents()
            },
            close: function(t, e) {
                var o, i, a, s, r, c, l, p = this,
                    h = p.current,
                    g = function() {
                        p.cleanUp(t)
                    };
                return !p.isClosing && (p.isClosing = !0, p.trigger("beforeClose", t) === !1 ? (p.isClosing = !1, d(function() {
                    p.update()
                }), !1) : (p.removeEvents(), h.timouts && clearTimeout(h.timouts), a = h.$content, o = h.opts.animationEffect, i = n.isNumeric(e) ? e : o ? h.opts.animationDuration : 0, h.$slide.off(u).removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"), h.$slide.siblings().trigger("onReset").remove(), i && p.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing"), p.hideLoading(h), p.hideControls(), p.updateCursor(), "zoom" !== o || t !== !0 && a && i && "image" === h.type && !h.hasError && (l = p.getThumbPos(h)) || (o = "fade"), "zoom" === o ? (n.fancybox.stop(a), s = n.fancybox.getTranslate(a), c = {
                    top: s.top,
                    left: s.left,
                    scaleX: s.width / l.width,
                    scaleY: s.height / l.height,
                    width: l.width,
                    height: l.height
                }, r = h.opts.zoomOpacity, "auto" == r && (r = Math.abs(h.width / h.height - l.width / l.height) > .1), r && (l.opacity = 0), n.fancybox.setTranslate(a, c), f(a), n.fancybox.animate(a, l, i, g), !0) : (o && i ? t === !0 ? setTimeout(g, i) : n.fancybox.animate(h.$slide.removeClass("fancybox-slide--current"), "fancybox-animated fancybox-slide--previous fancybox-fx-" + o, i, g) : g(), !0)))
            },
            cleanUp: function(t) {
                var e, o = this,
                    i = n("body");
                o.current.$slide.trigger("onReset"), o.$refs.container.empty().remove(), o.trigger("afterClose", t), o.$lastFocus && o.current.opts.backFocus && o.$lastFocus.trigger("focus"), o.current = null, e = n.fancybox.getInstance(), e ? e.activate() : (i.removeClass("fancybox-active compensate-for-scrollbar"), n("#fancybox-style-noscroll").remove())
            },
            trigger: function(t, e) {
                var o, i = Array.prototype.slice.call(arguments, 1),
                    a = this,
                    s = e && e.opts ? e : a.current;
                return s ? i.unshift(s) : s = a, i.unshift(a), n.isFunction(s.opts[t]) && (o = s.opts[t].apply(s, i)), o === !1 ? o : void("afterClose" !== t && a.$refs ? a.$refs.container.trigger(t + ".fb", i) : r.trigger(t + ".fb", i))
            },
            updateControls: function(t) {
                var e = this,
                    n = e.current,
                    o = n.index,
                    i = n.opts.caption,
                    a = e.$refs.container,
                    s = e.$refs.caption;
                n.$slide.trigger("refresh"), e.$caption = i && i.length ? s.html(i) : null, e.isHiddenControls || e.isIdle || e.showControls(), a.find("[data-fancybox-count]").html(e.group.length), a.find("[data-fancybox-index]").html(o + 1), a.find("[data-fancybox-prev]").toggleClass("disabled", !n.opts.loop && o <= 0), a.find("[data-fancybox-next]").toggleClass("disabled", !n.opts.loop && o >= e.group.length - 1), "image" === n.type ? a.find("[data-fancybox-zoom]").show().end().find("[data-fancybox-download]").attr("href", n.opts.image.src || n.src).show() : n.opts.toolbar && a.find("[data-fancybox-download],[data-fancybox-zoom]").hide()
            },
            hideControls: function() {
                this.isHiddenControls = !0, this.$refs.container.removeClass("fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav")
            },
            showControls: function() {
                var t = this,
                    e = t.current ? t.current.opts : t.opts,
                    n = t.$refs.container;
                t.isHiddenControls = !1, t.idleSecondsCounter = 0, n.toggleClass("fancybox-show-toolbar", !(!e.toolbar || !e.buttons)).toggleClass("fancybox-show-infobar", !!(e.infobar && t.group.length > 1)).toggleClass("fancybox-show-nav", !!(e.arrows && t.group.length > 1)).toggleClass("fancybox-is-modal", !!e.modal), t.$caption ? n.addClass("fancybox-show-caption ") : n.removeClass("fancybox-show-caption")
            },
            toggleControls: function() {
                this.isHiddenControls ? this.showControls() : this.hideControls()
            }
        }), n.fancybox = {
            version: "3.3.5",
            defaults: a,
            getInstance: function(t) {
                var e = n('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),
                    o = Array.prototype.slice.call(arguments, 1);
                return e instanceof h && ("string" === n.type(t) ? e[t].apply(e, o) : "function" === n.type(t) && t.apply(e, o), e)
            },
            open: function(t, e, n) {
                return new h(t, e, n)
            },
            close: function(t) {
                var e = this.getInstance();
                e && (e.close(), t === !0 && this.close())
            },
            destroy: function() {
                this.close(!0), r.add("body").off("click.fb-start", "**")
            },
            isMobile: e.createTouch !== o && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            use3d: function() {
                var n = e.createElement("div");
                return t.getComputedStyle && t.getComputedStyle(n) && t.getComputedStyle(n).getPropertyValue("transform") && !(e.documentMode && e.documentMode < 11)
            }(),
            getTranslate: function(t) {
                var e;
                return !(!t || !t.length) && (e = t[0].getBoundingClientRect(), {
                    top: e.top || 0,
                    left: e.left || 0,
                    width: e.width,
                    height: e.height,
                    opacity: parseFloat(t.css("opacity"))
                })
            },
            setTranslate: function(t, e) {
                var n = "",
                    i = {};
                if (t && e) return e.left === o && e.top === o || (n = (e.left === o ? t.position().left : e.left) + "px, " + (e.top === o ? t.position().top : e.top) + "px", n = this.use3d ? "translate3d(" + n + ", 0px)" : "translate(" + n + ")"), e.scaleX !== o && e.scaleY !== o && (n = (n.length ? n + " " : "") + "scale(" + e.scaleX + ", " + e.scaleY + ")"), n.length && (i.transform = n), e.opacity !== o && (i.opacity = e.opacity), e.width !== o && (i.width = e.width), e.height !== o && (i.height = e.height), t.css(i)
            },
            animate: function(t, e, i, a, s) {
                var r = !1;
                n.isFunction(i) && (a = i, i = null), n.isPlainObject(e) || t.removeAttr("style"), n.fancybox.stop(t), t.on(u, function(o) {
                    (!o || !o.originalEvent || t.is(o.originalEvent.target) && "z-index" != o.originalEvent.propertyName) && (n.fancybox.stop(t), r && n.fancybox.setTranslate(t, r),
                        n.isPlainObject(e) ? s === !1 && t.removeAttr("style") : s !== !0 && t.removeClass(e), n.isFunction(a) && a(o))
                }), n.isNumeric(i) && t.css("transition-duration", i + "ms"), n.isPlainObject(e) ? (e.scaleX !== o && e.scaleY !== o && (r = n.extend({}, e, {
                    width: t.width() * e.scaleX,
                    height: t.height() * e.scaleY,
                    scaleX: 1,
                    scaleY: 1
                }), delete e.width, delete e.height, t.parent().hasClass("fancybox-slide--image") && t.parent().addClass("fancybox-is-scaling")), n.fancybox.setTranslate(t, e)) : t.addClass(e), t.data("timer", setTimeout(function() {
                    t.trigger("transitionend")
                }, i + 16))
            },
            stop: function(t) {
                t && t.length && (clearTimeout(t.data("timer")), t.off("transitionend").css("transition-duration", ""), t.parent().removeClass("fancybox-is-scaling"))
            }
        }, n.fn.fancybox = function(t) {
            var e;
            return t = t || {}, e = t.selector || !1, e ? n("body").off("click.fb-start", e).on("click.fb-start", e, {
                options: t
            }, i) : this.off("click.fb-start").on("click.fb-start", {
                items: this,
                options: t
            }, i), this
        }, r.on("click.fb-start", "[data-fancybox]", i), r.on("click.fb-start", "[data-trigger]", function(t) {
            i(t, {
                $target: n('[data-fancybox="' + n(t.currentTarget).attr("data-trigger") + '"]').eq(n(t.currentTarget).attr("data-index") || 0),
                $trigger: n(this)
            })
        })
    }
}(window, document, window.jQuery || jQuery),
function(t) {
    "use strict";
    var e = function(e, n, o) {
            if (e) return o = o || "", "object" === t.type(o) && (o = t.param(o, !0)), t.each(n, function(t, n) {
                e = e.replace("$" + t, n || "")
            }), o.length && (e += (e.indexOf("?") > 0 ? "&" : "?") + o), e
        },
        n = {
            youtube: {
                matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
                params: {
                    autoplay: 1,
                    autohide: 1,
                    fs: 1,
                    rel: 0,
                    hd: 1,
                    wmode: "transparent",
                    enablejsapi: 1,
                    html5: 1
                },
                paramPlace: 8,
                type: "iframe",
                url: "//www.youtube.com/embed/$4",
                thumb: "//img.youtube.com/vi/$4/hqdefault.jpg"
            },
            vimeo: {
                matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
                params: {
                    autoplay: 1,
                    hd: 1,
                    show_title: 1,
                    show_byline: 1,
                    show_portrait: 0,
                    fullscreen: 1,
                    api: 1
                },
                paramPlace: 3,
                type: "iframe",
                url: "//player.vimeo.com/video/$2"
            },
            instagram: {
                matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
                type: "image",
                url: "//$1/p/$2/media/?size=l"
            },
            gmap_place: {
                matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
                type: "iframe",
                url: function(t) {
                    return "//maps.google." + t[2] + "/?ll=" + (t[9] ? t[9] + "&z=" + Math.floor(t[10]) + (t[12] ? t[12].replace(/^\//, "&") : "") : t[12] + "").replace(/\?/, "&") + "&output=" + (t[12] && t[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
                }
            },
            gmap_search: {
                matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
                type: "iframe",
                url: function(t) {
                    return "//maps.google." + t[2] + "/maps?q=" + t[5].replace("query=", "q=").replace("api=1", "") + "&output=embed"
                }
            }
        };
    t(document).on("objectNeedsType.fb", function(o, i, a) {
        var s, r, c, l, d, u, f, p = a.src || "",
            h = !1;
        s = t.extend(!0, {}, n, a.opts.media), t.each(s, function(n, o) {
            if (c = p.match(o.matcher)) {
                if (h = o.type, f = n, u = {}, o.paramPlace && c[o.paramPlace]) {
                    d = c[o.paramPlace], "?" == d[0] && (d = d.substring(1)), d = d.split("&");
                    for (var i = 0; i < d.length; ++i) {
                        var s = d[i].split("=", 2);
                        2 == s.length && (u[s[0]] = decodeURIComponent(s[1].replace(/\+/g, " ")))
                    }
                }
                return l = t.extend(!0, {}, o.params, a.opts[n], u), p = "function" === t.type(o.url) ? o.url.call(this, c, l, a) : e(o.url, c, l), r = "function" === t.type(o.thumb) ? o.thumb.call(this, c, l, a) : e(o.thumb, c), "youtube" === n ? p = p.replace(/&t=((\d+)m)?(\d+)s/, function(t, e, n, o) {
                    return "&start=" + ((n ? 60 * parseInt(n, 10) : 0) + parseInt(o, 10))
                }) : "vimeo" === n && (p = p.replace("&%23", "#")), !1
            }
        }), h ? (a.opts.thumb || a.opts.$thumb && a.opts.$thumb.length || (a.opts.thumb = r), "iframe" === h && (a.opts = t.extend(!0, a.opts, {
            iframe: {
                preload: !1,
                attr: {
                    scrolling: "no"
                }
            }
        })), t.extend(a, {
            type: h,
            src: p,
            origSrc: a.src,
            contentSource: f,
            contentType: "image" === h ? "image" : "gmap_place" == f || "gmap_search" == f ? "map" : "video"
        })) : p && (a.type = a.opts.defaultType)
    })
}(window.jQuery || jQuery),
function(t, e, n) {
    "use strict";
    var o = function() {
            return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function(e) {
                return t.setTimeout(e, 1e3 / 60)
            }
        }(),
        i = function() {
            return t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.mozCancelAnimationFrame || t.oCancelAnimationFrame || function(e) {
                t.clearTimeout(e)
            }
        }(),
        a = function(e) {
            var n = [];
            e = e.originalEvent || e || t.e, e = e.touches && e.touches.length ? e.touches : e.changedTouches && e.changedTouches.length ? e.changedTouches : [e];
            for (var o in e) e[o].pageX ? n.push({
                x: e[o].pageX,
                y: e[o].pageY
            }) : e[o].clientX && n.push({
                x: e[o].clientX,
                y: e[o].clientY
            });
            return n
        },
        s = function(t, e, n) {
            return e && t ? "x" === n ? t.x - e.x : "y" === n ? t.y - e.y : Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)) : 0
        },
        r = function(t) {
            if (t.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio') || n.isFunction(t.get(0).onclick) || t.data("selectable")) return !0;
            for (var e = 0, o = t[0].attributes, i = o.length; e < i; e++)
                if ("data-fancybox-" === o[e].nodeName.substr(0, 14)) return !0;
            return !1
        },
        c = function(e) {
            var n = t.getComputedStyle(e)["overflow-y"],
                o = t.getComputedStyle(e)["overflow-x"],
                i = ("scroll" === n || "auto" === n) && e.scrollHeight > e.clientHeight,
                a = ("scroll" === o || "auto" === o) && e.scrollWidth > e.clientWidth;
            return i || a
        },
        l = function(t) {
            for (var e = !1;;) {
                if (e = c(t.get(0))) break;
                if (t = t.parent(), !t.length || t.hasClass("fancybox-stage") || t.is("body")) break
            }
            return e
        },
        d = function(t) {
            var e = this;
            e.instance = t, e.$bg = t.$refs.bg, e.$stage = t.$refs.stage, e.$container = t.$refs.container, e.destroy(), e.$container.on("touchstart.fb.touch mousedown.fb.touch", n.proxy(e, "ontouchstart"))
        };
    d.prototype.destroy = function() {
        this.$container.off(".fb.touch")
    }, d.prototype.ontouchstart = function(o) {
        var i = this,
            c = n(o.target),
            d = i.instance,
            u = d.current,
            f = u.$content,
            p = "touchstart" == o.type;
        if (p && i.$container.off("mousedown.fb.touch"), (!o.originalEvent || 2 != o.originalEvent.button) && c.length && !r(c) && !r(c.parent()) && (c.is("img") || !(o.originalEvent.clientX > c[0].clientWidth + c.offset().left))) {
            if (!u || d.isAnimating || d.isClosing) return o.stopPropagation(), void o.preventDefault();
            if (i.realPoints = i.startPoints = a(o), i.startPoints.length) {
                if (o.stopPropagation(), i.startEvent = o, i.canTap = !0, i.$target = c, i.$content = f, i.opts = u.opts.touch, i.isPanning = !1, i.isSwiping = !1, i.isZooming = !1, i.isScrolling = !1, i.startTime = (new Date).getTime(), i.distanceX = i.distanceY = i.distance = 0, i.canvasWidth = Math.round(u.$slide[0].clientWidth), i.canvasHeight = Math.round(u.$slide[0].clientHeight), i.contentLastPos = null, i.contentStartPos = n.fancybox.getTranslate(i.$content) || {
                        top: 0,
                        left: 0
                    }, i.sliderStartPos = i.sliderLastPos || n.fancybox.getTranslate(u.$slide), i.stagePos = n.fancybox.getTranslate(d.$refs.stage), i.sliderStartPos.top -= i.stagePos.top, i.sliderStartPos.left -= i.stagePos.left, i.contentStartPos.top -= i.stagePos.top, i.contentStartPos.left -= i.stagePos.left, n(e).off(".fb.touch").on(p ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", n.proxy(i, "ontouchend")).on(p ? "touchmove.fb.touch" : "mousemove.fb.touch", n.proxy(i, "ontouchmove")), n.fancybox.isMobile && e.addEventListener("scroll", i.onscroll, !0), !i.opts && !d.canPan() || !c.is(i.$stage) && !i.$stage.find(c).length) return void(c.is(".fancybox-image") && o.preventDefault());
                n.fancybox.isMobile && (l(c) || l(c.parent())) || o.preventDefault(), (1 === i.startPoints.length || u.hasError) && (i.instance.canPan() ? (n.fancybox.stop(i.$content), i.$content.css("transition-duration", ""), i.isPanning = !0) : i.isSwiping = !0, i.$container.addClass("fancybox-controls--isGrabbing")), 2 === i.startPoints.length && "image" === u.type && (u.isLoaded || u.$ghost) && (i.canTap = !1, i.isSwiping = !1, i.isPanning = !1, i.isZooming = !0, n.fancybox.stop(i.$content), i.$content.css("transition-duration", ""), i.centerPointStartX = .5 * (i.startPoints[0].x + i.startPoints[1].x) - n(t).scrollLeft(), i.centerPointStartY = .5 * (i.startPoints[0].y + i.startPoints[1].y) - n(t).scrollTop(), i.percentageOfImageAtPinchPointX = (i.centerPointStartX - i.contentStartPos.left) / i.contentStartPos.width, i.percentageOfImageAtPinchPointY = (i.centerPointStartY - i.contentStartPos.top) / i.contentStartPos.height, i.startDistanceBetweenFingers = s(i.startPoints[0], i.startPoints[1]))
            }
        }
    }, d.prototype.onscroll = function(t) {
        var n = this;
        n.isScrolling = !0, e.removeEventListener("scroll", n.onscroll, !0)
    }, d.prototype.ontouchmove = function(t) {
        var e = this,
            o = n(t.target);
        return void 0 !== t.originalEvent.buttons && 0 === t.originalEvent.buttons ? void e.ontouchend(t) : e.isScrolling || !o.is(e.$stage) && !e.$stage.find(o).length ? void(e.canTap = !1) : (e.newPoints = a(t), void((e.opts || e.instance.canPan()) && e.newPoints.length && e.newPoints.length && (e.isSwiping && e.isSwiping === !0 || t.preventDefault(), e.distanceX = s(e.newPoints[0], e.startPoints[0], "x"), e.distanceY = s(e.newPoints[0], e.startPoints[0], "y"), e.distance = s(e.newPoints[0], e.startPoints[0]), e.distance > 0 && (e.isSwiping ? e.onSwipe(t) : e.isPanning ? e.onPan() : e.isZooming && e.onZoom()))))
    }, d.prototype.onSwipe = function(e) {
        var a, s = this,
            r = s.isSwiping,
            c = s.sliderStartPos.left || 0;
        if (r !== !0) "x" == r && (s.distanceX > 0 && (s.instance.group.length < 2 || 0 === s.instance.current.index && !s.instance.current.opts.loop) ? c += Math.pow(s.distanceX, .8) : s.distanceX < 0 && (s.instance.group.length < 2 || s.instance.current.index === s.instance.group.length - 1 && !s.instance.current.opts.loop) ? c -= Math.pow(-s.distanceX, .8) : c += s.distanceX), s.sliderLastPos = {
            top: "x" == r ? 0 : s.sliderStartPos.top + s.distanceY,
            left: c
        }, s.requestId && (i(s.requestId), s.requestId = null), s.requestId = o(function() {
            s.sliderLastPos && (n.each(s.instance.slides, function(t, e) {
                var o = e.pos - s.instance.currPos;
                n.fancybox.setTranslate(e.$slide, {
                    top: s.sliderLastPos.top,
                    left: s.sliderLastPos.left + o * s.canvasWidth + o * e.opts.gutter
                })
            }), s.$container.addClass("fancybox-is-sliding"))
        });
        else if (Math.abs(s.distance) > 10) {
            if (s.canTap = !1, s.instance.group.length < 2 && s.opts.vertical ? s.isSwiping = "y" : s.instance.isDragging || s.opts.vertical === !1 || "auto" === s.opts.vertical && n(t).width() > 800 ? s.isSwiping = "x" : (a = Math.abs(180 * Math.atan2(s.distanceY, s.distanceX) / Math.PI), s.isSwiping = a > 45 && a < 135 ? "y" : "x"), s.canTap = !1, "y" === s.isSwiping && n.fancybox.isMobile && (l(s.$target) || l(s.$target.parent()))) return void(s.isScrolling = !0);
            s.instance.isDragging = s.isSwiping, s.startPoints = s.newPoints, n.each(s.instance.slides, function(t, e) {
                n.fancybox.stop(e.$slide), e.$slide.css("transition-duration", ""), e.inTransition = !1, e.pos === s.instance.current.pos && (s.sliderStartPos.left = n.fancybox.getTranslate(e.$slide).left - n.fancybox.getTranslate(s.instance.$refs.stage).left)
            }), s.instance.SlideShow && s.instance.SlideShow.isActive && s.instance.SlideShow.stop()
        }
    }, d.prototype.onPan = function() {
        var t = this;
        return s(t.newPoints[0], t.realPoints[0]) < (n.fancybox.isMobile ? 10 : 5) ? void(t.startPoints = t.newPoints) : (t.canTap = !1, t.contentLastPos = t.limitMovement(), t.requestId && (i(t.requestId), t.requestId = null), void(t.requestId = o(function() {
            n.fancybox.setTranslate(t.$content, t.contentLastPos)
        })))
    }, d.prototype.limitMovement = function() {
        var t, e, n, o, i, a, s = this,
            r = s.canvasWidth,
            c = s.canvasHeight,
            l = s.distanceX,
            d = s.distanceY,
            u = s.contentStartPos,
            f = u.left,
            p = u.top,
            h = u.width,
            g = u.height;
        return i = h > r ? f + l : f, a = p + d, t = Math.max(0, .5 * r - .5 * h), e = Math.max(0, .5 * c - .5 * g), n = Math.min(r - h, .5 * r - .5 * h), o = Math.min(c - g, .5 * c - .5 * g), l > 0 && i > t && (i = t - 1 + Math.pow(-t + f + l, .8) || 0), l < 0 && i < n && (i = n + 1 - Math.pow(n - f - l, .8) || 0), d > 0 && a > e && (a = e - 1 + Math.pow(-e + p + d, .8) || 0), d < 0 && a < o && (a = o + 1 - Math.pow(o - p - d, .8) || 0), {
            top: a,
            left: i
        }
    }, d.prototype.limitPosition = function(t, e, n, o) {
        var i = this,
            a = i.canvasWidth,
            s = i.canvasHeight;
        return n > a ? (t = t > 0 ? 0 : t, t = t < a - n ? a - n : t) : t = Math.max(0, a / 2 - n / 2), o > s ? (e = e > 0 ? 0 : e, e = e < s - o ? s - o : e) : e = Math.max(0, s / 2 - o / 2), {
            top: e,
            left: t
        }
    }, d.prototype.onZoom = function() {
        var e = this,
            a = e.contentStartPos,
            r = a.width,
            c = a.height,
            l = a.left,
            d = a.top,
            u = s(e.newPoints[0], e.newPoints[1]),
            f = u / e.startDistanceBetweenFingers,
            p = Math.floor(r * f),
            h = Math.floor(c * f),
            g = (r - p) * e.percentageOfImageAtPinchPointX,
            b = (c - h) * e.percentageOfImageAtPinchPointY,
            m = (e.newPoints[0].x + e.newPoints[1].x) / 2 - n(t).scrollLeft(),
            y = (e.newPoints[0].y + e.newPoints[1].y) / 2 - n(t).scrollTop(),
            v = m - e.centerPointStartX,
            x = y - e.centerPointStartY,
            w = l + (g + v),
            $ = d + (b + x),
            S = {
                top: $,
                left: w,
                scaleX: f,
                scaleY: f
            };
        e.canTap = !1, e.newWidth = p, e.newHeight = h, e.contentLastPos = S, e.requestId && (i(e.requestId), e.requestId = null), e.requestId = o(function() {
            n.fancybox.setTranslate(e.$content, e.contentLastPos)
        })
    }, d.prototype.ontouchend = function(t) {
        var o = this,
            s = Math.max((new Date).getTime() - o.startTime, 1),
            r = o.isSwiping,
            c = o.isPanning,
            l = o.isZooming,
            d = o.isScrolling;
        return o.endPoints = a(t), o.$container.removeClass("fancybox-controls--isGrabbing"), n(e).off(".fb.touch"), e.removeEventListener("scroll", o.onscroll, !0), o.requestId && (i(o.requestId), o.requestId = null), o.isSwiping = !1, o.isPanning = !1, o.isZooming = !1, o.isScrolling = !1, o.instance.isDragging = !1, o.canTap ? o.onTap(t) : (o.speed = 366, o.velocityX = o.distanceX / s * .5, o.velocityY = o.distanceY / s * .5, o.speedX = Math.max(.5 * o.speed, Math.min(1.5 * o.speed, 1 / Math.abs(o.velocityX) * o.speed)), void(c ? o.endPanning() : l ? o.endZooming() : o.endSwiping(r, d)))
    }, d.prototype.endSwiping = function(t, e) {
        var o = this,
            i = !1,
            a = o.instance.group.length;
        o.sliderLastPos = null, "y" == t && !e && Math.abs(o.distanceY) > 50 ? (n.fancybox.animate(o.instance.current.$slide, {
            top: o.sliderStartPos.top + o.distanceY + 150 * o.velocityY,
            opacity: 0
        }, 200), i = o.instance.close(!0, 200)) : "x" == t && o.distanceX > 50 && a > 1 ? i = o.instance.previous(o.speedX) : "x" == t && o.distanceX < -50 && a > 1 && (i = o.instance.next(o.speedX)), i !== !1 || "x" != t && "y" != t || (e || a < 2 ? o.instance.centerSlide(o.instance.current, 150) : o.instance.jumpTo(o.instance.current.index)), o.$container.removeClass("fancybox-is-sliding")
    }, d.prototype.endPanning = function() {
        var t, e, o, i = this;
        i.contentLastPos && (i.opts.momentum === !1 ? (t = i.contentLastPos.left, e = i.contentLastPos.top) : (t = i.contentLastPos.left + i.velocityX * i.speed, e = i.contentLastPos.top + i.velocityY * i.speed), o = i.limitPosition(t, e, i.contentStartPos.width, i.contentStartPos.height), o.width = i.contentStartPos.width, o.height = i.contentStartPos.height, n.fancybox.animate(i.$content, o, 330))
    }, d.prototype.endZooming = function() {
        var t, e, o, i, a = this,
            s = a.instance.current,
            r = a.newWidth,
            c = a.newHeight;
        a.contentLastPos && (t = a.contentLastPos.left, e = a.contentLastPos.top, i = {
            top: e,
            left: t,
            width: r,
            height: c,
            scaleX: 1,
            scaleY: 1
        }, n.fancybox.setTranslate(a.$content, i), r < a.canvasWidth && c < a.canvasHeight ? a.instance.scaleToFit(150) : r > s.width || c > s.height ? a.instance.scaleToActual(a.centerPointStartX, a.centerPointStartY, 150) : (o = a.limitPosition(t, e, r, c), n.fancybox.setTranslate(a.$content, n.fancybox.getTranslate(a.$content)), n.fancybox.animate(a.$content, o, 150)))
    }, d.prototype.onTap = function(e) {
        var o, i = this,
            s = n(e.target),
            r = i.instance,
            c = r.current,
            l = e && a(e) || i.startPoints,
            d = l[0] ? l[0].x - n(t).scrollLeft() - i.stagePos.left : 0,
            u = l[0] ? l[0].y - n(t).scrollTop() - i.stagePos.top : 0,
            f = function(t) {
                var o = c.opts[t];
                if (n.isFunction(o) && (o = o.apply(r, [c, e])), o) switch (o) {
                    case "close":
                        r.close(i.startEvent);
                        break;
                    case "toggleControls":
                        r.toggleControls(!0);
                        break;
                    case "next":
                        r.next();
                        break;
                    case "nextOrClose":
                        r.group.length > 1 ? r.next() : r.close(i.startEvent);
                        break;
                    case "zoom":
                        "image" == c.type && (c.isLoaded || c.$ghost) && (r.canPan() ? r.scaleToFit() : r.isScaledDown() ? r.scaleToActual(d, u) : r.group.length < 2 && r.close(i.startEvent))
                }
            };
        if ((!e.originalEvent || 2 != e.originalEvent.button) && (s.is("img") || !(d > s[0].clientWidth + s.offset().left))) {
            if (s.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) o = "Outside";
            else if (s.is(".fancybox-slide")) o = "Slide";
            else {
                if (!r.current.$content || !r.current.$content.find(s).addBack().filter(s).length) return;
                o = "Content"
            }
            if (i.tapped) {
                if (clearTimeout(i.tapped), i.tapped = null, Math.abs(d - i.tapX) > 50 || Math.abs(u - i.tapY) > 50) return this;
                f("dblclick" + o)
            } else i.tapX = d, i.tapY = u, c.opts["dblclick" + o] && c.opts["dblclick" + o] !== c.opts["click" + o] ? i.tapped = setTimeout(function() {
                i.tapped = null, f("click" + o)
            }, 500) : f("click" + o);
            return this
        }
    }, n(e).on("onActivate.fb", function(t, e) {
        e && !e.Guestures && (e.Guestures = new d(e))
    })
}(window, document, window.jQuery || jQuery),
function(t, e) {
    "use strict";
    e.extend(!0, e.fancybox.defaults, {
        btnTpl: {
            slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg viewBox="0 0 40 40"><path d="M13,12 L27,20 L13,27 Z" /><path d="M15,10 v19 M23,10 v19" /></svg></button>'
        },
        slideShow: {
            autoStart: !1,
            speed: 3e3
        }
    });
    var n = function(t) {
        this.instance = t, this.init()
    };
    e.extend(n.prototype, {
        timer: null,
        isActive: !1,
        $button: null,
        init: function() {
            var t = this;
            t.$button = t.instance.$refs.toolbar.find("[data-fancybox-play]").on("click", function() {
                t.toggle()
            }), (t.instance.group.length < 2 || !t.instance.group[t.instance.currIndex].opts.slideShow) && t.$button.hide()
        },
        set: function(t) {
            var e = this;
            e.instance && e.instance.current && (t === !0 || e.instance.current.opts.loop || e.instance.currIndex < e.instance.group.length - 1) ? e.timer = setTimeout(function() {
                e.isActive && e.instance.jumpTo((e.instance.currIndex + 1) % e.instance.group.length)
            }, e.instance.current.opts.slideShow.speed) : (e.stop(), e.instance.idleSecondsCounter = 0, e.instance.showControls())
        },
        clear: function() {
            var t = this;
            clearTimeout(t.timer), t.timer = null
        },
        start: function() {
            var t = this,
                e = t.instance.current;
            e && (t.isActive = !0, t.$button.attr("title", e.opts.i18n[e.opts.lang].PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause"), t.set(!0))
        },
        stop: function() {
            var t = this,
                e = t.instance.current;
            t.clear(), t.$button.attr("title", e.opts.i18n[e.opts.lang].PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play"), t.isActive = !1
        },
        toggle: function() {
            var t = this;
            t.isActive ? t.stop() : t.start()
        }
    }), e(t).on({
        "onInit.fb": function(t, e) {
            e && !e.SlideShow && (e.SlideShow = new n(e))
        },
        "beforeShow.fb": function(t, e, n, o) {
            var i = e && e.SlideShow;
            o ? i && n.opts.slideShow.autoStart && i.start() : i && i.isActive && i.clear()
        },
        "afterShow.fb": function(t, e, n) {
            var o = e && e.SlideShow;
            o && o.isActive && o.set()
        },
        "afterKeydown.fb": function(n, o, i, a, s) {
            var r = o && o.SlideShow;
            !r || !i.opts.slideShow || 80 !== s && 32 !== s || e(t.activeElement).is("button,a,input") || (a.preventDefault(), r.toggle())
        },
        "beforeClose.fb onDeactivate.fb": function(t, e) {
            var n = e && e.SlideShow;
            n && n.stop()
        }
    }), e(t).on("visibilitychange", function() {
        var n = e.fancybox.getInstance(),
            o = n && n.SlideShow;
        o && o.isActive && (t.hidden ? o.clear() : o.set())
    })
}(document, window.jQuery || jQuery),
function(t, e) {
    "use strict";
    var n = function() {
        for (var e = [
                ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
                ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
            ], n = {}, o = 0; o < e.length; o++) {
            var i = e[o];
            if (i && i[1] in t) {
                for (var a = 0; a < i.length; a++) n[e[0][a]] = i[a];
                return n
            }
        }
        return !1
    }();
    if (!n) return void(e && e.fancybox && (e.fancybox.defaults.btnTpl.fullScreen = !1));
    var o = {
        request: function(e) {
            e = e || t.documentElement, e[n.requestFullscreen](e.ALLOW_KEYBOARD_INPUT)
        },
        exit: function() {
            t[n.exitFullscreen]()
        },
        toggle: function(e) {
            e = e || t.documentElement, this.isFullscreen() ? this.exit() : this.request(e)
        },
        isFullscreen: function() {
            return Boolean(t[n.fullscreenElement])
        },
        enabled: function() {
            return Boolean(t[n.fullscreenEnabled])
        }
    };
    e.extend(!0, e.fancybox.defaults, {
        btnTpl: {
            fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}"><svg viewBox="0 0 40 40"><path d="M9,12 v16 h22 v-16 h-22 v8" /></svg></button>'
        },
        fullScreen: {
            autoStart: !1
        }
    }), e(t).on({
        "onInit.fb": function(t, e) {
            var n;
            e && e.group[e.currIndex].opts.fullScreen ? (n = e.$refs.container, n.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function(t) {
                t.stopPropagation(), t.preventDefault(), o.toggle()
            }), e.opts.fullScreen && e.opts.fullScreen.autoStart === !0 && o.request(), e.FullScreen = o) : e && e.$refs.toolbar.find("[data-fancybox-fullscreen]").hide()
        },
        "afterKeydown.fb": function(t, e, n, o, i) {
            e && e.FullScreen && 70 === i && (o.preventDefault(), e.FullScreen.toggle())
        },
        "beforeClose.fb": function(t, e) {
            e && e.FullScreen && e.$refs.container.hasClass("fancybox-is-fullscreen") && o.exit()
        }
    }), e(t).on(n.fullscreenchange, function() {
        var t = o.isFullscreen(),
            n = e.fancybox.getInstance();
        n && (n.current && "image" === n.current.type && n.isAnimating && (n.current.$content.css("transition", "none"), n.isAnimating = !1, n.update(!0, !0, 0)), n.trigger("onFullscreenChange", t), n.$refs.container.toggleClass("fancybox-is-fullscreen", t))
    })
}(document, window.jQuery || jQuery),
function(t, e) {
    "use strict";
    var n = "fancybox-thumbs",
        o = n + "-active",
        i = n + "-loading";
    e.fancybox.defaults = e.extend(!0, {
        btnTpl: {
            thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg viewBox="0 0 120 120"><path d="M30,30 h14 v14 h-14 Z M50,30 h14 v14 h-14 Z M70,30 h14 v14 h-14 Z M30,50 h14 v14 h-14 Z M50,50 h14 v14 h-14 Z M70,50 h14 v14 h-14 Z M30,70 h14 v14 h-14 Z M50,70 h14 v14 h-14 Z M70,70 h14 v14 h-14 Z" /></svg></button>'
        },
        thumbs: {
            autoStart: !1,
            hideOnClose: !0,
            parentEl: ".fancybox-container",
            axis: "y"
        }
    }, e.fancybox.defaults);
    var a = function(t) {
        this.init(t)
    };
    e.extend(a.prototype, {
        $button: null,
        $grid: null,
        $list: null,
        isVisible: !1,
        isActive: !1,
        init: function(t) {
            var e, n, o = this;
            o.instance = t, t.Thumbs = o, o.opts = t.group[t.currIndex].opts.thumbs, e = t.group[0], e = e.opts.thumb || !(!e.opts.$thumb || !e.opts.$thumb.length) && e.opts.$thumb.attr("src"), t.group.length > 1 && (n = t.group[1], n = n.opts.thumb || !(!n.opts.$thumb || !n.opts.$thumb.length) && n.opts.$thumb.attr("src")), o.$button = t.$refs.toolbar.find("[data-fancybox-thumbs]"), o.opts && e && n && e && n ? (o.$button.show().on("click", function() {
                o.toggle()
            }), o.isActive = !0) : o.$button.hide()
        },
        create: function() {
            var t, o = this,
                a = o.instance,
                s = o.opts.parentEl,
                r = [];
            o.$grid || (o.$grid = e('<div class="' + n + " " + n + "-" + o.opts.axis + '"></div>').appendTo(a.$refs.container.find(s).addBack().filter(s)), o.$grid.on("click", "li", function() {
                a.jumpTo(e(this).attr("data-index"))
            })), o.$list || (o.$list = e("<ul>").appendTo(o.$grid)), e.each(a.group, function(e, n) {
                t = n.opts.thumb || (n.opts.$thumb ? n.opts.$thumb.attr("src") : null), t || "image" !== n.type || (t = n.src), r.push('<li data-index="' + e + '" tabindex="0" class="' + i + '"' + (t && t.length ? ' style="background-image:url(' + t + ')" />' : "") + "></li>")
            }), o.$list[0].innerHTML = r.join(""), "x" === o.opts.axis && o.$list.width(parseInt(o.$grid.css("padding-right"), 10) + a.group.length * o.$list.children().eq(0).outerWidth(!0))
        },
        focus: function(t) {
            var e, n, i = this,
                a = i.$list,
                s = i.$grid;
            i.instance.current && (e = a.children().removeClass(o).filter('[data-index="' + i.instance.current.index + '"]').addClass(o), n = e.position(), "y" === i.opts.axis && (n.top < 0 || n.top > a.height() - e.outerHeight()) ? a.stop().animate({
                scrollTop: a.scrollTop() + n.top
            }, t) : "x" === i.opts.axis && (n.left < s.scrollLeft() || n.left > s.scrollLeft() + (s.width() - e.outerWidth())) && a.parent().stop().animate({
                scrollLeft: n.left
            }, t))
        },
        update: function() {
            var t = this;
            t.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible), t.isVisible ? (t.$grid || t.create(), t.instance.trigger("onThumbsShow"), t.focus(0)) : t.$grid && t.instance.trigger("onThumbsHide"), t.instance.update()
        },
        hide: function() {
            this.isVisible = !1, this.update()
        },
        show: function() {
            this.isVisible = !0, this.update()
        },
        toggle: function() {
            this.isVisible = !this.isVisible, this.update()
        }
    }), e(t).on({
        "onInit.fb": function(t, e) {
            var n;
            e && !e.Thumbs && (n = new a(e), n.isActive && n.opts.autoStart === !0 && n.show())
        },
        "beforeShow.fb": function(t, e, n, o) {
            var i = e && e.Thumbs;
            i && i.isVisible && i.focus(o ? 0 : 250)
        },
        "afterKeydown.fb": function(t, e, n, o, i) {
            var a = e && e.Thumbs;
            a && a.isActive && 71 === i && (o.preventDefault(), a.toggle())
        },
        "beforeClose.fb": function(t, e) {
            var n = e && e.Thumbs;
            n && n.isVisible && n.opts.hideOnClose !== !1 && n.$grid.hide()
        }
    })
}(document, window.jQuery || jQuery),
function(t, e) {
    "use strict";

    function n(t) {
        var e = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "/": "&#x2F;",
            "`": "&#x60;",
            "=": "&#x3D;"
        };
        return String(t).replace(/[&<>"'`=\/]/g, function(t) {
            return e[t]
        })
    }
    e.extend(!0, e.fancybox.defaults, {
        btnTpl: {
            share: '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg viewBox="0 0 40 40"><path d="M6,30 C8,18 19,16 23,16 L23,16 L23,10 L33,20 L23,29 L23,24 C19,24 8,27 6,30 Z"></svg></button>'
        },
        share: {
            url: function(t, e) {
                return !t.currentHash && "inline" !== e.type && "html" !== e.type && (e.origSrc || e.src) || window.location
            },
            tpl: '<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" /></p></div>'
        }
    }), e(t).on("click", "[data-fancybox-share]", function() {
        var t, o, i = e.fancybox.getInstance(),
            a = i.current || null;
        a && ("function" === e.type(a.opts.share.url) && (t = a.opts.share.url.apply(a, [i, a])), o = a.opts.share.tpl.replace(/\{\{media\}\}/g, "image" === a.type ? encodeURIComponent(a.src) : "").replace(/\{\{url\}\}/g, encodeURIComponent(t)).replace(/\{\{url_raw\}\}/g, n(t)).replace(/\{\{descr\}\}/g, i.$caption ? encodeURIComponent(i.$caption.text()) : ""), e.fancybox.open({
            src: i.translate(i, o),
            type: "html",
            opts: {
                animationEffect: !1,
                afterLoad: function(t, e) {
                    i.$refs.container.one("beforeClose.fb", function() {
                        t.close(null, 0)
                    }), e.$content.find(".fancybox-share__links a").click(function() {
                        return window.open(this.href, "Share", "width=550, height=450"), !1
                    })
                }
            }
        }))
    })
}(document, window.jQuery || jQuery),
function(t, e, n) {
    "use strict";

    function o() {
        var t = e.location.hash.substr(1),
            n = t.split("-"),
            o = n.length > 1 && /^\+?\d+$/.test(n[n.length - 1]) ? parseInt(n.pop(-1), 10) || 1 : 1,
            i = n.join("-");
        return {
            hash: t,
            index: o < 1 ? 1 : o,
            gallery: i
        }
    }

    function i(t) {
        var e;
        "" !== t.gallery && (e = n("[data-fancybox='" + n.escapeSelector(t.gallery) + "']").eq(t.index - 1).trigger("click.fb-start"))
    }

    function a(t) {
        var e, n;
        return !!t && (e = t.current ? t.current.opts : t.opts, n = e.hash || (e.$orig ? e.$orig.data("fancybox") : ""), "" !== n && n)
    }
    n.escapeSelector || (n.escapeSelector = function(t) {
        var e = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
            n = function(t, e) {
                return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
            };
        return (t + "").replace(e, n)
    }), n(function() {
        n.fancybox.defaults.hash !== !1 && (n(t).on({
            "onInit.fb": function(t, e) {
                var n, i;
                e.group[e.currIndex].opts.hash !== !1 && (n = o(), i = a(e), i && n.gallery && i == n.gallery && (e.currIndex = n.index - 1))
            },
            "beforeShow.fb": function(n, o, i, s) {
                var r;
                i && i.opts.hash !== !1 && (r = a(o), r && (o.currentHash = r + (o.group.length > 1 ? "-" + (i.index + 1) : ""), e.location.hash !== "#" + o.currentHash && (o.origHash || (o.origHash = e.location.hash), o.hashTimer && clearTimeout(o.hashTimer), o.hashTimer = setTimeout(function() {
                    "replaceState" in e.history ? (e.history[s ? "pushState" : "replaceState"]({}, t.title, e.location.pathname + e.location.search + "#" + o.currentHash), s && (o.hasCreatedHistory = !0)) : e.location.hash = o.currentHash, o.hashTimer = null
                }, 300))))
            },
            "beforeClose.fb": function(n, o, i) {
                var s;
                i.opts.hash !== !1 && (s = a(o), o.currentHash && o.hasCreatedHistory ? e.history.back() : o.currentHash && ("replaceState" in e.history ? e.history.replaceState({}, t.title, e.location.pathname + e.location.search + (o.origHash || "")) : e.location.hash = o.origHash), o.currentHash = null, clearTimeout(o.hashTimer))
            }
        }), n(e).on("hashchange.fb", function() {
            var t, e = o();
            n.each(n(".fancybox-container").get().reverse(), function(e, o) {
                var i = n(o).data("FancyBox");
                if (i.currentHash) return t = i, !1
            }), t ? !t.currentHash || t.currentHash === e.gallery + "-" + e.index || 1 === e.index && t.currentHash == e.gallery || (t.currentHash = null, t.close()) : "" !== e.gallery && i(e)
        }), setTimeout(function() {
            n.fancybox.getInstance() || i(o())
        }, 50))
    })
}(document, window, window.jQuery || jQuery),
function(t, e) {
    "use strict";
    var n = (new Date).getTime();
    e(t).on({
        "onInit.fb": function(t, e, o) {
            e.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll", function(t) {
                var o = e.current,
                    i = (new Date).getTime();
                e.group.length < 2 || o.opts.wheel === !1 || "auto" === o.opts.wheel && "image" !== o.type || (t.preventDefault(), t.stopPropagation(), o.$slide.hasClass("fancybox-animated") || (t = t.originalEvent || t, i - n < 250 || (n = i, e[(-t.deltaY || -t.deltaX || t.wheelDelta || -t.detail) < 0 ? "next" : "previous"]())))
            })
        }
    })
}(document, window.jQuery || jQuery);
/*!
 * imagesLoaded PACKAGED v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
! function(e, t) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t()
}("undefined" != typeof window ? window : this, function() {
    function e() {}
    var t = e.prototype;
    return t.on = function(e, t) {
        if (e && t) {
            var i = this._events = this._events || {},
                n = i[e] = i[e] || [];
            return n.indexOf(t) == -1 && n.push(t), this
        }
    }, t.once = function(e, t) {
        if (e && t) {
            this.on(e, t);
            var i = this._onceEvents = this._onceEvents || {},
                n = i[e] = i[e] || {};
            return n[t] = !0, this
        }
    }, t.off = function(e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            var n = i.indexOf(t);
            return n != -1 && i.splice(n, 1), this
        }
    }, t.emitEvent = function(e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            i = i.slice(0), t = t || [];
            for (var n = this._onceEvents && this._onceEvents[e], o = 0; o < i.length; o++) {
                var r = i[o],
                    s = n && n[r];
                s && (this.off(e, r), delete n[r]), r.apply(this, t)
            }
            return this
        }
    }, t.allOff = function() {
        delete this._events, delete this._onceEvents
    }, e
}),
function(e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function(i) {
        return t(e, i)
    }) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter")) : e.imagesLoaded = t(e, e.EvEmitter)
}("undefined" != typeof window ? window : this, function(e, t) {
    function i(e, t) {
        for (var i in t) e[i] = t[i];
        return e
    }

    function n(e) {
        if (Array.isArray(e)) return e;
        var t = "object" == typeof e && "number" == typeof e.length;
        return t ? d.call(e) : [e]
    }

    function o(e, t, r) {
        if (!(this instanceof o)) return new o(e, t, r);
        var s = e;
        return "string" == typeof e && (s = document.querySelectorAll(e)), s ? (this.elements = n(s), this.options = i({}, this.options), "function" == typeof t ? r = t : i(this.options, t), r && this.on("always", r), this.getImages(), h && (this.jqDeferred = new h.Deferred), void setTimeout(this.check.bind(this))) : void a.error("Bad element for imagesLoaded " + (s || e))
    }

    function r(e) {
        this.img = e
    }

    function s(e, t) {
        this.url = e, this.element = t, this.img = new Image
    }
    var h = e.jQuery,
        a = e.console,
        d = Array.prototype.slice;
    o.prototype = Object.create(t.prototype), o.prototype.options = {}, o.prototype.getImages = function() {
        this.images = [], this.elements.forEach(this.addElementImages, this)
    }, o.prototype.addElementImages = function(e) {
        "IMG" == e.nodeName && this.addImage(e), this.options.background === !0 && this.addElementBackgroundImages(e);
        var t = e.nodeType;
        if (t && u[t]) {
            for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
                var o = i[n];
                this.addImage(o)
            }
            if ("string" == typeof this.options.background) {
                var r = e.querySelectorAll(this.options.background);
                for (n = 0; n < r.length; n++) {
                    var s = r[n];
                    this.addElementBackgroundImages(s)
                }
            }
        }
    };
    var u = {
        1: !0,
        9: !0,
        11: !0
    };
    return o.prototype.addElementBackgroundImages = function(e) {
        var t = getComputedStyle(e);
        if (t)
            for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage); null !== n;) {
                var o = n && n[2];
                o && this.addBackground(o, e), n = i.exec(t.backgroundImage)
            }
    }, o.prototype.addImage = function(e) {
        var t = new r(e);
        this.images.push(t)
    }, o.prototype.addBackground = function(e, t) {
        var i = new s(e, t);
        this.images.push(i)
    }, o.prototype.check = function() {
        function e(e, i, n) {
            setTimeout(function() {
                t.progress(e, i, n)
            })
        }
        var t = this;
        return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function(t) {
            t.once("progress", e), t.check()
        }) : void this.complete()
    }, o.prototype.progress = function(e, t, i) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded, this.emitEvent("progress", [this, e, t]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, e, t)
    }, o.prototype.complete = function() {
        var e = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
            var t = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[t](this)
        }
    }, r.prototype = Object.create(t.prototype), r.prototype.check = function() {
        var e = this.getIsImageComplete();
        return e ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
    }, r.prototype.getIsImageComplete = function() {
        return this.img.complete && this.img.naturalWidth
    }, r.prototype.confirm = function(e, t) {
        this.isLoaded = e, this.emitEvent("progress", [this, this.img, t])
    }, r.prototype.handleEvent = function(e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }, r.prototype.onload = function() {
        this.confirm(!0, "onload"), this.unbindEvents()
    }, r.prototype.onerror = function() {
        this.confirm(!1, "onerror"), this.unbindEvents()
    }, r.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, s.prototype = Object.create(r.prototype), s.prototype.check = function() {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
        var e = this.getIsImageComplete();
        e && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
    }, s.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, s.prototype.confirm = function(e, t) {
        this.isLoaded = e, this.emitEvent("progress", [this, this.element, t])
    }, o.makeJQueryPlugin = function(t) {
        t = t || e.jQuery, t && (h = t, h.fn.imagesLoaded = function(e, t) {
            var i = new o(this, e, t);
            return i.jqDeferred.promise(h(this))
        })
    }, o.makeJQueryPlugin(), o
});
(function(e, t) {
    'object' == typeof exports && 'undefined' != typeof module ? module.exports = t() : 'function' == typeof define && define.amd ? define(t) : e.tippy = t()
})(this, function() {
    'use strict';

    function e(e) {
        return e && '[object Function]' === {}.toString.call(e)
    }

    function t(e, t) {
        if (1 !== e.nodeType) return [];
        var r = e.ownerDocument.defaultView,
            a = r.getComputedStyle(e, null);
        return t ? a[t] : a
    }

    function r(e) {
        return 'HTML' === e.nodeName ? e : e.parentNode || e.host
    }

    function a(e) {
        if (!e) return document.body;
        switch (e.nodeName) {
            case 'HTML':
            case 'BODY':
                return e.ownerDocument.body;
            case '#document':
                return e.body;
        }
        var p = t(e),
            o = p.overflow,
            i = p.overflowX,
            n = p.overflowY;
        return /(auto|scroll|overlay)/.test(o + n + i) ? e : a(r(e))
    }

    function p(e) {
        return 11 === e ? bt : 10 === e ? yt : bt || yt
    }

    function o(e) {
        if (!e) return document.documentElement;
        for (var r = p(10) ? document.body : null, a = e.offsetParent || null; a === r && e.nextElementSibling;) a = (e = e.nextElementSibling).offsetParent;
        var i = a && a.nodeName;
        return i && 'BODY' !== i && 'HTML' !== i ? -1 !== ['TH', 'TD', 'TABLE'].indexOf(a.nodeName) && 'static' === t(a, 'position') ? o(a) : a : e ? e.ownerDocument.documentElement : document.documentElement
    }

    function n(e) {
        var t = e.nodeName;
        return 'BODY' !== t && ('HTML' === t || o(e.firstElementChild) === e)
    }

    function s(e) {
        return null === e.parentNode ? e : s(e.parentNode)
    }

    function l(e, t) {
        if (!e || !e.nodeType || !t || !t.nodeType) return document.documentElement;
        var r = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
            a = r ? e : t,
            p = r ? t : e,
            i = document.createRange();
        i.setStart(a, 0), i.setEnd(p, 0);
        var d = i.commonAncestorContainer;
        if (e !== d && t !== d || a.contains(p)) return n(d) ? d : o(d);
        var c = s(e);
        return c.host ? l(c.host, t) : l(e, s(t).host)
    }

    function d(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 'top',
            r = 'top' === t ? 'scrollTop' : 'scrollLeft',
            a = e.nodeName;
        if ('BODY' === a || 'HTML' === a) {
            var p = e.ownerDocument.documentElement,
                o = e.ownerDocument.scrollingElement || p;
            return o[r]
        }
        return e[r]
    }

    function c(e, t) {
        var r = !!(2 < arguments.length && void 0 !== arguments[2]) && arguments[2],
            a = d(t, 'top'),
            p = d(t, 'left'),
            o = r ? -1 : 1;
        return e.top += a * o, e.bottom += a * o, e.left += p * o, e.right += p * o, e
    }

    function m(e, t) {
        var r = 'x' === t ? 'Left' : 'Top',
            a = 'Left' === r ? 'Right' : 'Bottom';
        return parseFloat(e['border' + r + 'Width'], 10) + parseFloat(e['border' + a + 'Width'], 10)
    }

    function f(e, t, r, a) {
        return Ze(t['offset' + e], t['scroll' + e], r['client' + e], r['offset' + e], r['scroll' + e], p(10) ? parseInt(r['offset' + e]) + parseInt(a['margin' + ('Height' === e ? 'Top' : 'Left')]) + parseInt(a['margin' + ('Height' === e ? 'Bottom' : 'Right')]) : 0)
    }

    function h(e) {
        var t = e.body,
            r = e.documentElement,
            a = p(10) && getComputedStyle(r);
        return {
            height: f('Height', t, r, a),
            width: f('Width', t, r, a)
        }
    }

    function b(e) {
        return wt({}, e, {
            right: e.left + e.width,
            bottom: e.top + e.height
        })
    }

    function u(e) {
        var r = {};
        try {
            if (p(10)) {
                r = e.getBoundingClientRect();
                var a = d(e, 'top'),
                    o = d(e, 'left');
                r.top += a, r.left += o, r.bottom += a, r.right += o
            } else r = e.getBoundingClientRect()
        } catch (t) {}
        var i = {
                left: r.left,
                top: r.top,
                width: r.right - r.left,
                height: r.bottom - r.top
            },
            n = 'HTML' === e.nodeName ? h(e.ownerDocument) : {},
            s = n.width || e.clientWidth || i.right - i.left,
            l = n.height || e.clientHeight || i.bottom - i.top,
            c = e.offsetWidth - s,
            f = e.offsetHeight - l;
        if (c || f) {
            var y = t(e);
            c -= m(y, 'x'), f -= m(y, 'y'), i.width -= c, i.height -= f
        }
        return b(i)
    }

    function y(e, r) {
        var o = !!(2 < arguments.length && void 0 !== arguments[2]) && arguments[2],
            i = p(10),
            n = 'HTML' === r.nodeName,
            s = u(e),
            l = u(r),
            d = a(e),
            m = t(r),
            f = parseFloat(m.borderTopWidth, 10),
            h = parseFloat(m.borderLeftWidth, 10);
        o && n && (l.top = Ze(l.top, 0), l.left = Ze(l.left, 0));
        var y = b({
            top: s.top - l.top - f,
            left: s.left - l.left - h,
            width: s.width,
            height: s.height
        });
        if (y.marginTop = 0, y.marginLeft = 0, !i && n) {
            var g = parseFloat(m.marginTop, 10),
                x = parseFloat(m.marginLeft, 10);
            y.top -= f - g, y.bottom -= f - g, y.left -= h - x, y.right -= h - x, y.marginTop = g, y.marginLeft = x
        }
        return (i && !o ? r.contains(d) : r === d && 'BODY' !== d.nodeName) && (y = c(y, r)), y
    }

    function g(e) {
        var t = !!(1 < arguments.length && void 0 !== arguments[1]) && arguments[1],
            r = e.ownerDocument.documentElement,
            a = y(e, r),
            p = Ze(r.clientWidth, window.innerWidth || 0),
            o = Ze(r.clientHeight, window.innerHeight || 0),
            i = t ? 0 : d(r),
            n = t ? 0 : d(r, 'left'),
            s = {
                top: i - a.top + a.marginTop,
                left: n - a.left + a.marginLeft,
                width: p,
                height: o
            };
        return b(s)
    }

    function x(e) {
        var a = e.nodeName;
        return 'BODY' !== a && 'HTML' !== a && ('fixed' === t(e, 'position') || x(r(e)))
    }

    function w(e) {
        if (!e || !e.parentElement || p()) return document.documentElement;
        for (var r = e.parentElement; r && 'none' === t(r, 'transform');) r = r.parentElement;
        return r || document.documentElement
    }

    function v(e, t, p, o) {
        var i = !!(4 < arguments.length && void 0 !== arguments[4]) && arguments[4],
            n = {
                top: 0,
                left: 0
            },
            s = i ? w(e) : l(e, t);
        if ('viewport' === o) n = g(s, i);
        else {
            var d;
            'scrollParent' === o ? (d = a(r(t)), 'BODY' === d.nodeName && (d = e.ownerDocument.documentElement)) : 'window' === o ? d = e.ownerDocument.documentElement : d = o;
            var c = y(d, s, i);
            if ('HTML' === d.nodeName && !x(s)) {
                var m = h(e.ownerDocument),
                    f = m.height,
                    b = m.width;
                n.top += c.top - c.marginTop, n.bottom = f + c.top, n.left += c.left - c.marginLeft, n.right = b + c.left
            } else n = c
        }
        p = p || 0;
        var u = 'number' == typeof p;
        return n.left += u ? p : p.left || 0, n.top += u ? p : p.top || 0, n.right -= u ? p : p.right || 0, n.bottom -= u ? p : p.bottom || 0, n
    }

    function k(e) {
        var t = e.width,
            r = e.height;
        return t * r
    }

    function E(e, t, r, a, p) {
        var o = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === e.indexOf('auto')) return e;
        var i = v(r, a, o, p),
            n = {
                top: {
                    width: i.width,
                    height: t.top - i.top
                },
                right: {
                    width: i.right - t.right,
                    height: i.height
                },
                bottom: {
                    width: i.width,
                    height: i.bottom - t.bottom
                },
                left: {
                    width: t.left - i.left,
                    height: i.height
                }
            },
            s = Object.keys(n).map(function(e) {
                return wt({
                    key: e
                }, n[e], {
                    area: k(n[e])
                })
            }).sort(function(e, t) {
                return t.area - e.area
            }),
            l = s.filter(function(e) {
                var t = e.width,
                    a = e.height;
                return t >= r.clientWidth && a >= r.clientHeight
            }),
            d = 0 < l.length ? l[0].key : s[0].key,
            c = e.split('-')[1];
        return d + (c ? '-' + c : '')
    }

    function C(e, t, r) {
        var a = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null,
            p = a ? w(t) : l(t, r);
        return y(r, p, a)
    }

    function L(e) {
        var t = e.ownerDocument.defaultView,
            r = t.getComputedStyle(e),
            a = parseFloat(r.marginTop || 0) + parseFloat(r.marginBottom || 0),
            p = parseFloat(r.marginLeft || 0) + parseFloat(r.marginRight || 0),
            o = {
                width: e.offsetWidth + p,
                height: e.offsetHeight + a
            };
        return o
    }

    function O(e) {
        var t = {
            left: 'right',
            right: 'left',
            bottom: 'top',
            top: 'bottom'
        };
        return e.replace(/left|right|bottom|top/g, function(e) {
            return t[e]
        })
    }

    function T(e, t, r) {
        r = r.split('-')[0];
        var a = L(e),
            p = {
                width: a.width,
                height: a.height
            },
            o = -1 !== ['right', 'left'].indexOf(r),
            i = o ? 'top' : 'left',
            n = o ? 'left' : 'top',
            s = o ? 'height' : 'width',
            l = o ? 'width' : 'height';
        return p[i] = t[i] + t[s] / 2 - a[s] / 2, p[n] = r === n ? t[n] - a[l] : t[O(n)], p
    }

    function S(e, t) {
        return Array.prototype.find ? e.find(t) : e.filter(t)[0]
    }

    function A(e, t, r) {
        if (Array.prototype.findIndex) return e.findIndex(function(e) {
            return e[t] === r
        });
        var a = S(e, function(e) {
            return e[t] === r
        });
        return e.indexOf(a)
    }

    function Y(t, r, a) {
        var p = void 0 === a ? t : t.slice(0, A(t, 'name', a));
        return p.forEach(function(t) {
            t['function'] && console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
            var a = t['function'] || t.fn;
            t.enabled && e(a) && (r.offsets.popper = b(r.offsets.popper), r.offsets.reference = b(r.offsets.reference), r = a(r, t))
        }), r
    }

    function P() {
        if (!this.state.isDestroyed) {
            var e = {
                instance: this,
                styles: {},
                arrowStyles: {},
                attributes: {},
                flipped: !1,
                offsets: {}
            };
            e.offsets.reference = C(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = E(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = T(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute', e = Y(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e))
        }
    }

    function D(e, t) {
        return e.some(function(e) {
            var r = e.name,
                a = e.enabled;
            return a && r === t
        })
    }

    function X(e) {
        for (var t = [!1, 'ms', 'Webkit', 'Moz', 'O'], r = e.charAt(0).toUpperCase() + e.slice(1), a = 0; a < t.length; a++) {
            var p = t[a],
                o = p ? '' + p + r : e;
            if ('undefined' != typeof document.body.style[o]) return o
        }
        return null
    }

    function I() {
        return this.state.isDestroyed = !0, D(this.modifiers, 'applyStyle') && (this.popper.removeAttribute('x-placement'), this.popper.style.position = '', this.popper.style.top = '', this.popper.style.left = '', this.popper.style.right = '', this.popper.style.bottom = '', this.popper.style.willChange = '', this.popper.style[X('transform')] = ''), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
    }

    function N(e) {
        var t = e.ownerDocument;
        return t ? t.defaultView : window
    }

    function H(e, t, r, p) {
        var o = 'BODY' === e.nodeName,
            i = o ? e.ownerDocument.defaultView : e;
        i.addEventListener(t, r, {
            passive: !0
        }), o || H(a(i.parentNode), t, r, p), p.push(i)
    }

    function W(e, t, r, p) {
        r.updateBound = p, N(e).addEventListener('resize', r.updateBound, {
            passive: !0
        });
        var o = a(e);
        return H(o, 'scroll', r.updateBound, r.scrollParents), r.scrollElement = o, r.eventsEnabled = !0, r
    }

    function M() {
        this.state.eventsEnabled || (this.state = W(this.reference, this.options, this.state, this.scheduleUpdate))
    }

    function B(e, t) {
        return N(e).removeEventListener('resize', t.updateBound), t.scrollParents.forEach(function(e) {
            e.removeEventListener('scroll', t.updateBound)
        }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t
    }

    function R() {
        this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = B(this.reference, this.state))
    }

    function z(e) {
        return '' !== e && !isNaN(parseFloat(e)) && isFinite(e)
    }

    function F(e, t) {
        Object.keys(t).forEach(function(r) {
            var a = ''; - 1 !== ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(r) && z(t[r]) && (a = 'px'), e.style[r] = t[r] + a
        })
    }

    function _(e, t) {
        Object.keys(t).forEach(function(r) {
            var a = t[r];
            !1 === a ? e.removeAttribute(r) : e.setAttribute(r, t[r])
        })
    }

    function U(e, t) {
        var r = e.offsets,
            a = r.popper,
            p = r.reference,
            o = Qe,
            i = function(e) {
                return e
            },
            n = o(a.width),
            s = o(p.width),
            l = -1 !== ['left', 'right'].indexOf(e.placement),
            d = -1 !== e.placement.indexOf('-'),
            c = t ? l || d || s % 2 == n % 2 ? o : Je : i,
            m = t ? o : i;
        return {
            left: c(1 == s % 2 && 1 == n % 2 && !d && t ? a.left - 1 : a.left),
            top: m(a.top),
            bottom: m(a.bottom),
            right: c(a.right)
        }
    }

    function V(e, t, r) {
        var a = S(e, function(e) {
                var r = e.name;
                return r === t
            }),
            p = !!a && e.some(function(e) {
                return e.name === r && e.enabled && e.order < a.order
            });
        if (!p) {
            var o = '`' + t + '`';
            console.warn('`' + r + '`' + ' modifier is required by ' + o + ' modifier in order to work, be sure to include it before ' + o + '!')
        }
        return p
    }

    function q(e) {
        return 'end' === e ? 'start' : 'start' === e ? 'end' : e
    }

    function j(e) {
        var t = !!(1 < arguments.length && void 0 !== arguments[1]) && arguments[1],
            r = Et.indexOf(e),
            a = Et.slice(r + 1).concat(Et.slice(0, r));
        return t ? a.reverse() : a
    }

    function K(e, t, r, a) {
        var p = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
            o = +p[1],
            i = p[2];
        if (!o) return e;
        if (0 === i.indexOf('%')) {
            var n;
            switch (i) {
                case '%p':
                    n = r;
                    break;
                case '%':
                case '%r':
                default:
                    n = a;
            }
            var s = b(n);
            return s[t] / 100 * o
        }
        if ('vh' === i || 'vw' === i) {
            var l;
            return l = 'vh' === i ? Ze(document.documentElement.clientHeight, window.innerHeight || 0) : Ze(document.documentElement.clientWidth, window.innerWidth || 0), l / 100 * o
        }
        return o
    }

    function G(e, t, r, a) {
        var p = [0, 0],
            o = -1 !== ['right', 'left'].indexOf(a),
            i = e.split(/(\+|\-)/).map(function(e) {
                return e.trim()
            }),
            n = i.indexOf(S(i, function(e) {
                return -1 !== e.search(/,|\s/)
            }));
        i[n] && -1 === i[n].indexOf(',') && console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
        var s = /\s*,\s*|\s+/,
            l = -1 === n ? [i] : [i.slice(0, n).concat([i[n].split(s)[0]]), [i[n].split(s)[1]].concat(i.slice(n + 1))];
        return l = l.map(function(e, a) {
            var p = (1 === a ? !o : o) ? 'height' : 'width',
                i = !1;
            return e.reduce(function(e, t) {
                return '' === e[e.length - 1] && -1 !== ['+', '-'].indexOf(t) ? (e[e.length - 1] = t, i = !0, e) : i ? (e[e.length - 1] += t, i = !1, e) : e.concat(t)
            }, []).map(function(e) {
                return K(e, p, t, r)
            })
        }), l.forEach(function(e, t) {
            e.forEach(function(r, a) {
                z(r) && (p[t] += r * ('-' === e[a - 1] ? -1 : 1))
            })
        }), p
    }

    function J(e, t) {
        var r = t.offset,
            a = e.placement,
            p = e.offsets,
            o = p.popper,
            i = p.reference,
            n = a.split('-')[0],
            s = void 0;
        return s = z(+r) ? [+r, 0] : G(r, o, i, n), 'left' === n ? (o.top += s[0], o.left -= s[1]) : 'right' === n ? (o.top += s[0], o.left += s[1]) : 'top' === n ? (o.left += s[0], o.top -= s[1]) : 'bottom' === n && (o.left += s[0], o.top += s[1]), e.popper = o, e
    }

    function Q(e) {
        return [].slice.call(e)
    }

    function Z(e, t) {
        return (Tt.closest || function(e) {
            for (var t = this; t;) {
                if (St.call(t, e)) return t;
                t = t.parentElement
            }
        }).call(e, t)
    }

    function $(e, t) {
        for (; e;) {
            if (t(e)) return e;
            e = e.parentElement
        }
    }

    function ee() {
        return document.createElement('div')
    }

    function te(e, t) {
        e[Yt.x && 'innerHTML'] = t instanceof Element ? t[Yt.x && 'innerHTML'] : t
    }

    function re(e, t) {
        t.content instanceof Element ? (te(e, ''), e.appendChild(t.content)) : e[t.allowHTML ? 'innerHTML' : 'textContent'] = t.content
    }

    function ae(e) {
        return {
            tooltip: e.querySelector(Ot.TOOLTIP),
            backdrop: e.querySelector(Ot.BACKDROP),
            content: e.querySelector(Ot.CONTENT),
            arrow: e.querySelector(Ot.ARROW) || e.querySelector(Ot.ROUND_ARROW)
        }
    }

    function pe(e) {
        e.setAttribute('data-inertia', '')
    }

    function oe(e) {
        e.removeAttribute('data-inertia')
    }

    function ie(e) {
        var t = ee();
        return 'round' === e ? (t.className = 'tippy-roundarrow', te(t, '<svg viewBox="0 0 24 8" xmlns="http://www.w3.org/2000/svg"><path d="M3 8s2.021-.015 5.253-4.218C9.584 2.051 10.797 1.007 12 1c1.203-.007 2.416 1.035 3.761 2.782C19.012 8.005 21 8 21 8H3z"/></svg>')) : t.className = 'tippy-arrow', t
    }

    function ne() {
        var e = ee();
        return e.className = 'tippy-backdrop', e.setAttribute('data-state', 'hidden'), e
    }

    function se(e, t) {
        e.setAttribute('tabindex', '-1'), t.setAttribute('data-interactive', '')
    }

    function le(e, t) {
        e.removeAttribute('tabindex'), t.removeAttribute('data-interactive')
    }

    function de(e, t) {
        e.forEach(function(e) {
            e && (e.style.transitionDuration = t + 'ms')
        })
    }

    function ce(e, t, r) {
        e[t + 'EventListener']('transitionend', r)
    }

    function me(e) {
        var t = e.getAttribute('x-placement');
        return t ? t.split('-')[0] : ''
    }

    function fe(e, t) {
        e.forEach(function(e) {
            e && e.setAttribute('data-state', t)
        })
    }

    function he(e) {
        void e.offsetHeight
    }

    function be(e, t) {
        var r = ee();
        r.className = 'tippy-popper', r.setAttribute('role', 'tooltip'), r.id = 'tippy-' + e, r.style.zIndex = t.zIndex;
        var a = ee();
        a.className = 'tippy-tooltip', a.style.maxWidth = t.maxWidth + ('number' == typeof t.maxWidth ? 'px' : ''), a.setAttribute('data-size', t.size), a.setAttribute('data-animation', t.animation), a.setAttribute('data-state', 'hidden'), t.theme.split(' ').forEach(function(e) {
            a.classList.add(e + '-theme')
        });
        var p = ee();
        return p.className = 'tippy-content', p.setAttribute('data-state', 'hidden'), t.interactive && se(r, a), t.arrow && a.appendChild(ie(t.arrowType)), t.animateFill && (a.appendChild(ne()), a.setAttribute('data-animatefill', '')), t.inertia && pe(a), re(p, t), a.appendChild(p), r.appendChild(a), r.addEventListener('focusout', function(t) {
            t.relatedTarget && r._tippy && !$(t.relatedTarget, function(e) {
                return e === r
            }) && t.relatedTarget !== r._tippy.reference && r._tippy.props.shouldPopperHideOnBlur(t) && r._tippy.hide()
        }), r
    }

    function ye(e, t, r) {
        var a = ae(e),
            p = a.tooltip,
            o = a.content,
            i = a.backdrop,
            n = a.arrow;
        e.style.zIndex = r.zIndex, p.setAttribute('data-size', r.size), p.setAttribute('data-animation', r.animation), p.style.maxWidth = r.maxWidth + ('number' == typeof r.maxWidth ? 'px' : ''), t.content !== r.content && re(o, r), !t.animateFill && r.animateFill ? (p.appendChild(ne()), p.setAttribute('data-animatefill', '')) : t.animateFill && !r.animateFill && (p.removeChild(i), p.removeAttribute('data-animatefill')), !t.arrow && r.arrow ? p.appendChild(ie(r.arrowType)) : t.arrow && !r.arrow && p.removeChild(n), t.arrow && r.arrow && t.arrowType !== r.arrowType && p.replaceChild(ie(r.arrowType), n), !t.interactive && r.interactive ? se(e, p) : t.interactive && !r.interactive && le(e, p), !t.inertia && r.inertia ? pe(p) : t.inertia && !r.inertia && oe(p), t.theme !== r.theme && (t.theme.split(' ').forEach(function(e) {
            p.classList.remove(e + '-theme')
        }), r.theme.split(' ').forEach(function(e) {
            p.classList.add(e + '-theme')
        }))
    }

    function ue(e, t) {
        var r = e.popper,
            a = e.options,
            p = a.onCreate,
            o = a.onUpdate;
        a.onCreate = a.onUpdate = function() {
            he(r), t(), o(), a.onCreate = p, a.onUpdate = o
        }
    }

    function ge(e) {
        Q(document.querySelectorAll(Ot.POPPER)).forEach(function(t) {
            var r = t._tippy;
            r && !0 === r.props.hideOnClick && (!e || t !== e.popper) && r.hide()
        })
    }

    function xe(e, t, r, a) {
        if (!e) return !0;
        var p = r.clientX,
            o = r.clientY,
            i = a.interactiveBorder,
            n = a.distance,
            s = t.top - o > ('top' === e ? i + n : i),
            l = o - t.bottom > ('bottom' === e ? i + n : i),
            d = t.left - p > ('left' === e ? i + n : i),
            c = p - t.right > ('right' === e ? i + n : i);
        return s || l || d || c
    }

    function we(e, t) {
        return -(e - t) + 'px'
    }

    function ve(e) {
        return '[object Object]' === {}.toString.call(e)
    }

    function ke(e, t) {
        return {}.hasOwnProperty.call(e, t)
    }

    function Ee(e) {
        return !isNaN(e) && !isNaN(parseFloat(e))
    }

    function Ce(e) {
        if (e instanceof Element || ve(e)) return [e];
        if (e instanceof NodeList) return Q(e);
        if (Array.isArray(e)) return e;
        try {
            return Q(document.querySelectorAll(e))
        } catch (t) {
            return []
        }
    }

    function Le(e, t, r) {
        if (Array.isArray(e)) {
            var a = e[t];
            return null == a ? r : a
        }
        return e
    }

    function Oe(e) {
        var t = window.scrollX || window.pageXOffset,
            r = window.scrollY || window.pageYOffset;
        e.focus(), scroll(t, r)
    }

    function Te(e) {
        setTimeout(e, 1)
    }

    function Se(e, t) {
        var r;
        return function() {
            var a = this,
                p = arguments;
            clearTimeout(r), r = setTimeout(function() {
                return e.apply(a, p)
            }, t)
        }
    }

    function Ae(e, t) {
        return e && e.modifiers && e.modifiers[t]
    }

    function Ye(e, t) {
        return -1 < e.indexOf(t)
    }

    function Pe() {
        Pt || (Pt = !0, it && document.body.classList.add('tippy-iOS'), window.performance && document.addEventListener('mousemove', De))
    }

    function De() {
        var e = performance.now();
        20 > e - Dt && (Pt = !1, document.removeEventListener('mousemove', De), !it && document.body.classList.remove('tippy-iOS')), Dt = e
    }

    function Xe(e) {
        var t = e.target;
        if (!(t instanceof Element)) return ge();
        var r = Z(t, Ot.POPPER);
        if (!(r && r._tippy && r._tippy.props.interactive)) {
            var a = $(t, function(e) {
                return e._tippy && e._tippy.reference === e
            });
            if (a) {
                var p = a._tippy,
                    o = Ye(p.props.trigger, 'click');
                if (Pt || o) return ge(p);
                if (!0 !== p.props.hideOnClick || o) return;
                p.clearDelayTimeouts()
            }
            ge()
        }
    }

    function Ie() {
        var e = document,
            t = e.activeElement;
        t && t.blur && t._tippy && t.blur()
    }

    function Ne() {
        Q(document.querySelectorAll(Ot.POPPER)).forEach(function(e) {
            var t = e._tippy;
            t.props.livePlacement || t.popperInstance.scheduleUpdate()
        })
    }

    function He() {
        document.addEventListener('click', Xe, !0), document.addEventListener('touchstart', Pe, At), window.addEventListener('blur', Ie), window.addEventListener('resize', Ne), !nt && (navigator.maxTouchPoints || navigator.msMaxTouchPoints) && document.addEventListener('pointerdown', Pe)
    }

    function We(e) {
        return !(e instanceof Element) || St.call(e, 'a[href],area[href],button,details,input,textarea,select,iframe,[tabindex]') && !e.hasAttribute('disabled')
    }

    function Me(e) {
        return Xt.reduce(function(t, r) {
            var a = (e.getAttribute('data-tippy-' + r) || '').trim();
            return a ? (t[r] = 'content' === r ? a : 'true' === a || 'false' !== a && (Ee(a) ? +a : '[' === a[0] || '{' === a[0] ? JSON.parse(a) : a), t) : t
        }, {})
    }

    function Be(e) {
        var t = {
            isVirtual: !0,
            attributes: e.attributes || {},
            setAttribute: function(t, r) {
                e.attributes[t] = r
            },
            getAttribute: function(t) {
                return e.attributes[t]
            },
            removeAttribute: function(t) {
                delete e.attributes[t]
            },
            hasAttribute: function(t) {
                return t in e.attributes
            },
            addEventListener: function() {},
            removeEventListener: function() {},
            classList: {
                classNames: {},
                add: function(t) {
                    e.classList.classNames[t] = !0
                },
                remove: function(t) {
                    delete e.classList.classNames[t]
                },
                contains: function(t) {
                    return t in e.classList.classNames
                }
            }
        };
        for (var r in t) e[r] = t[r]
    }

    function Re(e, t) {
        var r = It({}, t, t.performance ? {} : Me(e));
        return r.arrow && (r.animateFill = !1), 'function' == typeof r.appendTo && (r.appendTo = t.appendTo(e)), 'function' == typeof r.content && (r.content = t.content(e)), r
    }

    function ze() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
            t = arguments[1];
        Object.keys(e).forEach(function(e) {
            if (!ke(t, e)) throw new Error('[tippy]: `' + e + '` is not a valid option')
        })
    }

    function Fe(e, t) {
        return (t ? e : {
            X: 'Y',
            Y: 'X'
        }[e]) || ''
    }

    function _e(e, t, r, p) {
        var o = t[0],
            i = t[1];
        if (!o && !i) return '';
        var n = {
            scale: function() {
                return i ? r ? o + ', ' + i : i + ', ' + o : '' + o
            }(),
            translate: function() {
                return i ? r ? p ? o + 'px, ' + -i + 'px' : o + 'px, ' + i + 'px' : p ? -i + 'px, ' + o + 'px' : i + 'px, ' + o + 'px' : p ? -o + 'px' : o + 'px'
            }()
        };
        return n[e]
    }

    function Ue(e, t) {
        var r = e.match(new RegExp(t + '([XY])'));
        return r ? r[1] : ''
    }

    function Ve(e, t) {
        var r = e.match(t);
        return r ? r[1].split(',').map(function(e) {
            return parseFloat(e, 10)
        }) : []
    }

    function qe(e, t) {
        var r = me(Z(e, Ot.POPPER)),
            a = Ye(['top', 'bottom'], r),
            p = Ye(['right', 'bottom'], r),
            o = {
                translate: {
                    axis: Ue(t, 'translate'),
                    numbers: Ve(t, Nt.translate)
                },
                scale: {
                    axis: Ue(t, 'scale'),
                    numbers: Ve(t, Nt.scale)
                }
            },
            i = t.replace(Nt.translate, 'translate' + Fe(o.translate.axis, a) + '(' + _e('translate', o.translate.numbers, a, p) + ')').replace(Nt.scale, 'scale' + Fe(o.scale.axis, a) + '(' + _e('scale', o.scale.numbers, a, p) + ')');
        e.style['undefined' == typeof document.body.style.transform ? 'webkitTransform' : 'transform'] = i
    }

    function je(e, t) {
        function r() {
            Te(function() {
                z = !1
            })
        }

        function a() {
            X = new MutationObserver(function() {
                q.popperInstance.update()
            }), X.observe(U, {
                childList: !0,
                subtree: !0,
                characterData: !0
            })
        }

        function p(e) {
            var t = N = e,
                r = t.clientX,
                a = t.clientY;
            if (q.popperInstance) {
                var p = me(q.popper),
                    o = q.popperChildren.arrow ? 20 : 5,
                    i = Ye(['top', 'bottom'], p),
                    n = Ye(['left', 'right'], p),
                    l = i ? Ze(o, r) : r,
                    d = n ? Ze(o, a) : a;
                i && l > o && (l = Ge(r, window.innerWidth - o)), n && d > o && (d = Ge(a, window.innerHeight - o));
                var c = q.reference.getBoundingClientRect(),
                    m = q.props.followCursor,
                    f = 'horizontal' === m,
                    h = 'vertical' === m;
                q.popperInstance.reference = {
                    getBoundingClientRect: function() {
                        return {
                            width: 0,
                            height: 0,
                            top: f ? c.top : d,
                            bottom: f ? c.bottom : d,
                            left: h ? c.left : l,
                            right: h ? c.right : l
                        }
                    },
                    clientWidth: 0,
                    clientHeight: 0
                }, q.popperInstance.scheduleUpdate(), 'initial' === m && q.state.isVisible && s()
            }
        }

        function o(e) {
            var t = Z(e.target, q.props.target);
            t && !t._tippy && (je(t, It({}, q.props, {
                target: '',
                showOnInit: !0
            })), i(e))
        }

        function i(e) {
            if (T(), !q.state.isVisible) {
                if (q.props.target) return o(e);
                if (M = !0, q.props.wait) return q.props.wait(q, e);
                x() && !q.state.isMounted && document.addEventListener('mousemove', p);
                var t = Le(q.props.delay, 0, st.delay);
                t ? H = setTimeout(function() {
                    A()
                }, t) : A()
            }
        }

        function n() {
            if (T(), !q.state.isVisible) return s();
            M = !1;
            var e = Le(q.props.delay, 1, st.delay);
            e ? W = setTimeout(function() {
                q.state.isVisible && Y()
            }, e) : Y()
        }

        function s() {
            document.removeEventListener('mousemove', p), N = null
        }

        function l() {
            document.body.removeEventListener('mouseleave', n), document.removeEventListener('mousemove', F)
        }

        function d(e) {
            !q.state.isEnabled || y(e) || (!q.state.isVisible && (I = e), 'click' === e.type && !1 !== q.props.hideOnClick && q.state.isVisible ? n() : i(e))
        }

        function c(e) {
            var t = $(e.target, function(e) {
                    return e._tippy
                }),
                r = Z(e.target, Ot.POPPER) === q.popper,
                a = t === q.reference;
            r || a || xe(me(q.popper), q.popper.getBoundingClientRect(), e, q.props) && (l(), n())
        }

        function m(e) {
            return y(e) ? void 0 : q.props.interactive ? (document.body.addEventListener('mouseleave', n), void document.addEventListener('mousemove', F)) : void n()
        }

        function f(e) {
            if (e.target === q.reference) {
                if (q.props.interactive) {
                    if (!e.relatedTarget) return;
                    if (Z(e.relatedTarget, Ot.POPPER)) return
                }
                n()
            }
        }

        function h(e) {
            Z(e.target, q.props.target) && i(e)
        }

        function b(e) {
            Z(e.target, q.props.target) && n()
        }

        function y(e) {
            var t = Ye(e.type, 'touch'),
                r = nt && Pt && q.props.touchHold && !t,
                a = Pt && !q.props.touchHold && t;
            return r || a
        }

        function u() {
            var e = q.props.popperOptions,
                t = q.popperChildren,
                r = t.tooltip,
                a = t.arrow;
            return new Lt(q.reference, q.popper, It({
                placement: q.props.placement
            }, e, {
                modifiers: It({}, e ? e.modifiers : {}, {
                    preventOverflow: It({
                        boundariesElement: q.props.boundary
                    }, Ae(e, 'preventOverflow')),
                    arrow: It({
                        element: a,
                        enabled: !!a
                    }, Ae(e, 'arrow')),
                    flip: It({
                        enabled: q.props.flip,
                        padding: q.props.distance + 5,
                        behavior: q.props.flipBehavior
                    }, Ae(e, 'flip')),
                    offset: It({
                        offset: q.props.offset
                    }, Ae(e, 'offset'))
                }),
                onCreate: function() {
                    r.style[me(q.popper)] = we(q.props.distance, st.distance), a && q.props.arrowTransform && qe(a, q.props.arrowTransform)
                },
                onUpdate: function() {
                    var e = r.style;
                    e.top = '', e.bottom = '', e.left = '', e.right = '', e[me(q.popper)] = we(q.props.distance, st.distance), a && q.props.arrowTransform && qe(a, q.props.arrowTransform)
                }
            }))
        }

        function g(e) {
            q.popperInstance ? !x() && (q.popperInstance.scheduleUpdate(), q.props.livePlacement && q.popperInstance.enableEventListeners()) : (q.popperInstance = u(), a(), (!q.props.livePlacement || x()) && q.popperInstance.disableEventListeners()), q.popperInstance.reference = q.reference;
            var t = q.popperChildren.arrow;
            if (x()) {
                t && (t.style.margin = '0');
                var r = Le(q.props.delay, 0, st.delay);
                I.type && p(r && N ? N : I)
            } else t && (t.style.margin = '');
            ue(q.popperInstance, e), q.props.appendTo.contains(q.popper) || (q.props.appendTo.appendChild(q.popper), q.props.onMount(q), q.state.isMounted = !0)
        }

        function x() {
            return q.props.followCursor && !Pt && 'focus' !== I.type
        }

        function w() {
            de([q.popper], ot ? 0 : q.props.updateDuration);
            (function e() {
                q.popperInstance && q.popperInstance.scheduleUpdate(), q.state.isMounted ? requestAnimationFrame(e) : de([q.popper], 0)
            })()
        }

        function v(e, t) {
            E(e, function() {
                !q.state.isVisible && q.props.appendTo.contains(q.popper) && t()
            })
        }

        function k(e, t) {
            E(e, t)
        }

        function E(e, t) {
            if (0 === e) return t();
            var r = q.popperChildren.tooltip,
                a = function a(p) {
                    p.target === r && (ce(r, 'remove', a), t())
                };
            ce(r, 'remove', B), ce(r, 'add', a), B = a
        }

        function C(e, t) {
            var r = !!(2 < arguments.length && void 0 !== arguments[2]) && arguments[2];
            q.reference.addEventListener(e, t, r), R.push({
                eventType: e,
                handler: t,
                options: r
            })
        }

        function L() {
            q.props.touchHold && !q.props.target && (C('touchstart', d, At), C('touchend', m, At)), q.props.trigger.trim().split(' ').forEach(function(e) {
                'manual' === e || (q.props.target ? 'mouseenter' === e ? (C('mouseover', h), C('mouseout', b)) : 'focus' === e ? (C('focusin', h), C('focusout', b)) : 'click' === e ? C(e, h) : void 0 : (C(e, d), 'mouseenter' === e ? C('mouseleave', m) : 'focus' === e ? C(ot ? 'focusout' : 'blur', f) : void 0))
            })
        }

        function O() {
            R.forEach(function(e) {
                var t = e.eventType,
                    r = e.handler,
                    a = e.options;
                q.reference.removeEventListener(t, r, a)
            }), R = []
        }

        function T() {
            clearTimeout(H), clearTimeout(W)
        }

        function S() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            ze(e, st);
            var t = q.props,
                r = Re(q.reference, It({}, q.props, e, {
                    performance: !0
                }));
            r.performance = ke(e, 'performance') ? e.performance : t.performance, q.props = r, (ke(e, 'trigger') || ke(e, 'touchHold')) && (O(), L()), ke(e, 'interactiveDebounce') && (l(), F = Se(c, e.interactiveDebounce)), ye(q.popper, t, r), q.popperChildren = ae(q.popper), q.popperInstance && lt.some(function(t) {
                return ke(e, t)
            }) && (q.popperInstance.destroy(), q.popperInstance = u(), !q.state.isVisible && q.popperInstance.disableEventListeners(), q.props.followCursor && N && p(N))
        }

        function A() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : Le(q.props.duration, 0, st.duration[0]);
            return q.state.isDestroyed || !q.state.isEnabled || Pt && !q.props.touch ? void 0 : q.reference.isVirtual || document.documentElement.contains(q.reference) ? q.reference.hasAttribute('disabled') ? void 0 : z ? void(z = !1) : void(!1 === q.props.onShow(q) || (q.popper.style.visibility = 'visible', q.state.isVisible = !0, de([q.popper, q.popperChildren.tooltip, q.popperChildren.backdrop], 0), g(function() {
                q.state.isVisible && (!x() && q.popperInstance.update(), de([q.popperChildren.tooltip, q.popperChildren.backdrop, q.popperChildren.content], e), q.popperChildren.backdrop && (q.popperChildren.content.style.transitionDelay = Qe(e / 6) + 'ms'), q.props.interactive && q.reference.classList.add('tippy-active'), q.props.sticky && w(), fe([q.popperChildren.tooltip, q.popperChildren.backdrop, q.popperChildren.content], 'visible'), k(e, function() {
                    0 === q.props.updateDuration && q.popperChildren.tooltip.classList.add('tippy-notransition'), q.props.autoFocus && q.props.interactive && Ye(['focus', 'click'], I.type) && Oe(q.popper), q.props.aria && q.reference.setAttribute('aria-' + q.props.aria, q.popper.id), q.props.onShown(q), q.state.isShown = !0
                }))
            }))) : P()
        }

        function Y() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : Le(q.props.duration, 1, st.duration[1]);
            q.state.isDestroyed || !q.state.isEnabled || !1 === q.props.onHide(q) || (0 === q.props.updateDuration && q.popperChildren.tooltip.classList.remove('tippy-notransition'), q.props.interactive && q.reference.classList.remove('tippy-active'), q.popper.style.visibility = 'hidden', q.state.isVisible = !1, q.state.isShown = !1, de([q.popperChildren.tooltip, q.popperChildren.backdrop, q.popperChildren.content], e), fe([q.popperChildren.tooltip, q.popperChildren.backdrop, q.popperChildren.content], 'hidden'), q.props.autoFocus && q.props.interactive && !z && Ye(['focus', 'click'], I.type) && ('focus' === I.type && (z = !0), Oe(q.reference)), v(e, function() {
                M || s(), q.props.aria && q.reference.removeAttribute('aria-' + q.props.aria), q.popperInstance.disableEventListeners(), q.props.appendTo.removeChild(q.popper), q.state.isMounted = !1, q.props.onHidden(q)
            }))
        }

        function P(e) {
            q.state.isDestroyed || (q.state.isMounted && Y(0), O(), q.reference.removeEventListener('click', r), delete q.reference._tippy, q.props.target && e && Q(q.reference.querySelectorAll(q.props.target)).forEach(function(e) {
                return e._tippy && e._tippy.destroy()
            }), q.popperInstance && q.popperInstance.destroy(), X && X.disconnect(), q.state.isDestroyed = !0)
        }
        var D = Re(e, t);
        if (!D.multiple && e._tippy) return null;
        var X = null,
            I = {},
            N = null,
            H = 0,
            W = 0,
            M = !1,
            B = function() {},
            R = [],
            z = !1,
            F = 0 < D.interactiveDebounce ? Se(c, D.interactiveDebounce) : c,
            _ = Ht++,
            U = be(_, D);
        U.addEventListener('mouseenter', function(e) {
            q.props.interactive && q.state.isVisible && 'mouseenter' === I.type && i(e)
        }), U.addEventListener('mouseleave', function(e) {
            q.props.interactive && 'mouseenter' === I.type && 0 === q.props.interactiveDebounce && xe(me(U), U.getBoundingClientRect(), e, q.props) && n()
        });
        var V = ae(U),
            q = {
                id: _,
                reference: e,
                popper: U,
                popperChildren: V,
                popperInstance: null,
                props: D,
                state: {
                    isEnabled: !0,
                    isVisible: !1,
                    isDestroyed: !1,
                    isMounted: !1,
                    isShown: !1
                },
                clearDelayTimeouts: T,
                set: S,
                setContent: function(e) {
                    S({
                        content: e
                    })
                },
                show: A,
                hide: Y,
                enable: function() {
                    q.state.isEnabled = !0
                },
                disable: function() {
                    q.state.isEnabled = !1
                },
                destroy: P
            };
        return L(), e.addEventListener('click', r), D.lazy || (q.popperInstance = u(), q.popperInstance.disableEventListeners()), D.showOnInit && i(), !D.a11y || D.target || We(e) || e.setAttribute('tabindex', '0'), e._tippy = q, U._tippy = q, q
    }

    function Ke(e, t, r) {
        ze(t, st), Wt || (He(), Wt = !0);
        var a = It({}, st, t);
        ve(e) && Be(e);
        var p = Ce(e),
            o = p[0],
            i = (r && o ? [o] : p).reduce(function(e, t) {
                var r = t && je(t, a);
                return r && e.push(r), e
            }, []),
            n = {
                targets: e,
                props: a,
                instances: i,
                destroyAll: function() {
                    n.instances.forEach(function(e) {
                        e.destroy()
                    }), n.instances = []
                }
            };
        return n
    }
    for (var Ge = Math.min, Je = Math.floor, Qe = Math.round, Ze = Math.max, $e = '.tippy-iOS{cursor:pointer!important}.tippy-notransition{transition:none!important}.tippy-popper{-webkit-perspective:700px;perspective:700px;z-index:9999;outline:0;transition-timing-function:cubic-bezier(.165,.84,.44,1);pointer-events:none;line-height:1.4;max-width:calc(100% - 10px)}.tippy-popper[x-placement^=top] .tippy-backdrop{border-radius:40% 40% 0 0}.tippy-popper[x-placement^=top] .tippy-roundarrow{bottom:-8px;-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=top] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(180deg);transform:rotate(180deg)}.tippy-popper[x-placement^=top] .tippy-arrow{border-top:8px solid #333;border-right:8px solid transparent;border-left:8px solid transparent;bottom:-7px;margin:0 6px;-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=top] .tippy-backdrop{-webkit-transform-origin:0 25%;transform-origin:0 25%}.tippy-popper[x-placement^=top] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-55%);transform:scale(1) translate(-50%,-55%)}.tippy-popper[x-placement^=top] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-50%,-45%);transform:scale(.2) translate(-50%,-45%);opacity:0}.tippy-popper[x-placement^=top] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateY(-20px);transform:translateY(-20px)}.tippy-popper[x-placement^=top] [data-animation=perspective]{-webkit-transform-origin:bottom;transform-origin:bottom}.tippy-popper[x-placement^=top] [data-animation=perspective][data-state=visible]{-webkit-transform:translateY(-10px) rotateX(0);transform:translateY(-10px) rotateX(0)}.tippy-popper[x-placement^=top] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) rotateX(60deg);transform:translateY(0) rotateX(60deg)}.tippy-popper[x-placement^=top] [data-animation=fade][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}.tippy-popper[x-placement^=top] [data-animation=scale][data-state=visible]{-webkit-transform:translateY(-10px) scale(1);transform:translateY(-10px) scale(1)}.tippy-popper[x-placement^=top] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) scale(.5);transform:translateY(0) scale(.5)}.tippy-popper[x-placement^=bottom] .tippy-backdrop{border-radius:0 0 30% 30%}.tippy-popper[x-placement^=bottom] .tippy-roundarrow{top:-8px;-webkit-transform-origin:50% 100%;transform-origin:50% 100%}.tippy-popper[x-placement^=bottom] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(0);transform:rotate(0)}.tippy-popper[x-placement^=bottom] .tippy-arrow{border-bottom:8px solid #333;border-right:8px solid transparent;border-left:8px solid transparent;top:-7px;margin:0 6px;-webkit-transform-origin:50% 100%;transform-origin:50% 100%}.tippy-popper[x-placement^=bottom] .tippy-backdrop{-webkit-transform-origin:0 -50%;transform-origin:0 -50%}.tippy-popper[x-placement^=bottom] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-45%);transform:scale(1) translate(-50%,-45%)}.tippy-popper[x-placement^=bottom] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-50%);transform:scale(.2) translate(-50%);opacity:0}.tippy-popper[x-placement^=bottom] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateY(20px);transform:translateY(20px)}.tippy-popper[x-placement^=bottom] [data-animation=perspective]{-webkit-transform-origin:top;transform-origin:top}.tippy-popper[x-placement^=bottom] [data-animation=perspective][data-state=visible]{-webkit-transform:translateY(10px) rotateX(0);transform:translateY(10px) rotateX(0)}.tippy-popper[x-placement^=bottom] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) rotateX(-60deg);transform:translateY(0) rotateX(-60deg)}.tippy-popper[x-placement^=bottom] [data-animation=fade][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}.tippy-popper[x-placement^=bottom] [data-animation=scale][data-state=visible]{-webkit-transform:translateY(10px) scale(1);transform:translateY(10px) scale(1)}.tippy-popper[x-placement^=bottom] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) scale(.5);transform:translateY(0) scale(.5)}.tippy-popper[x-placement^=left] .tippy-backdrop{border-radius:50% 0 0 50%}.tippy-popper[x-placement^=left] .tippy-roundarrow{right:-16px;-webkit-transform-origin:33.33333333% 50%;transform-origin:33.33333333% 50%}.tippy-popper[x-placement^=left] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(90deg);transform:rotate(90deg)}.tippy-popper[x-placement^=left] .tippy-arrow{border-left:8px solid #333;border-top:8px solid transparent;border-bottom:8px solid transparent;right:-7px;margin:3px 0;-webkit-transform-origin:0 50%;transform-origin:0 50%}.tippy-popper[x-placement^=left] .tippy-backdrop{-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=left] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-50%);transform:scale(1) translate(-50%,-50%)}.tippy-popper[x-placement^=left] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-75%,-50%);transform:scale(.2) translate(-75%,-50%);opacity:0}.tippy-popper[x-placement^=left] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateX(-20px);transform:translateX(-20px)}.tippy-popper[x-placement^=left] [data-animation=perspective]{-webkit-transform-origin:right;transform-origin:right}.tippy-popper[x-placement^=left] [data-animation=perspective][data-state=visible]{-webkit-transform:translateX(-10px) rotateY(0);transform:translateX(-10px) rotateY(0)}.tippy-popper[x-placement^=left] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) rotateY(-60deg);transform:translateX(0) rotateY(-60deg)}.tippy-popper[x-placement^=left] [data-animation=fade][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateX(0);transform:translateX(0)}.tippy-popper[x-placement^=left] [data-animation=scale][data-state=visible]{-webkit-transform:translateX(-10px) scale(1);transform:translateX(-10px) scale(1)}.tippy-popper[x-placement^=left] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) scale(.5);transform:translateX(0) scale(.5)}.tippy-popper[x-placement^=right] .tippy-backdrop{border-radius:0 50% 50% 0}.tippy-popper[x-placement^=right] .tippy-roundarrow{left:-16px;-webkit-transform-origin:66.66666666% 50%;transform-origin:66.66666666% 50%}.tippy-popper[x-placement^=right] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.tippy-popper[x-placement^=right] .tippy-arrow{border-right:8px solid #333;border-top:8px solid transparent;border-bottom:8px solid transparent;left:-7px;margin:3px 0;-webkit-transform-origin:100% 50%;transform-origin:100% 50%}.tippy-popper[x-placement^=right] .tippy-backdrop{-webkit-transform-origin:-50% 0;transform-origin:-50% 0}.tippy-popper[x-placement^=right] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-50%);transform:scale(1) translate(-50%,-50%)}.tippy-popper[x-placement^=right] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-25%,-50%);transform:scale(.2) translate(-25%,-50%);opacity:0}.tippy-popper[x-placement^=right] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateX(20px);transform:translateX(20px)}.tippy-popper[x-placement^=right] [data-animation=perspective]{-webkit-transform-origin:left;transform-origin:left}.tippy-popper[x-placement^=right] [data-animation=perspective][data-state=visible]{-webkit-transform:translateX(10px) rotateY(0);transform:translateX(10px) rotateY(0)}.tippy-popper[x-placement^=right] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) rotateY(60deg);transform:translateX(0) rotateY(60deg)}.tippy-popper[x-placement^=right] [data-animation=fade][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateX(0);transform:translateX(0)}.tippy-popper[x-placement^=right] [data-animation=scale][data-state=visible]{-webkit-transform:translateX(10px) scale(1);transform:translateX(10px) scale(1)}.tippy-popper[x-placement^=right] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) scale(.5);transform:translateX(0) scale(.5)}.tippy-tooltip{position:relative;color:#fff;border-radius:4px;font-size:.9rem;padding:.3rem .6rem;max-width:350px;text-align:center;will-change:transform;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;background-color:#333}.tippy-tooltip[data-size=small]{padding:.2rem .4rem;font-size:.75rem}.tippy-tooltip[data-size=large]{padding:.4rem .8rem;font-size:1rem}.tippy-tooltip[data-animatefill]{overflow:hidden;background-color:transparent}.tippy-tooltip[data-interactive],.tippy-tooltip[data-interactive] path{pointer-events:auto}.tippy-tooltip[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-tooltip[data-inertia][data-state=hidden]{transition-timing-function:ease}.tippy-arrow,.tippy-roundarrow{position:absolute;width:0;height:0}.tippy-roundarrow{width:24px;height:8px;fill:#333;pointer-events:none}.tippy-backdrop{position:absolute;will-change:transform;background-color:#333;border-radius:50%;width:calc(110% + 2rem);left:50%;top:50%;z-index:-1;transition:all cubic-bezier(.46,.1,.52,.98);-webkit-backface-visibility:hidden;backface-visibility:hidden}.tippy-backdrop:after{content:"";float:left;padding-top:100%}.tippy-backdrop+.tippy-content{transition-property:opacity;will-change:opacity}.tippy-backdrop+.tippy-content[data-state=visible]{opacity:1}.tippy-backdrop+.tippy-content[data-state=hidden]{opacity:0}', et = '3.4.1', tt = 'undefined' != typeof window, rt = tt ? navigator : {}, at = tt ? window : {}, pt = ('MutationObserver' in at), ot = /MSIE |Trident\//.test(rt.userAgent), it = /iPhone|iPad|iPod/.test(rt.platform) && !at.MSStream, nt = ('ontouchstart' in at), st = {
            a11y: !0,
            allowHTML: !0,
            animateFill: !0,
            animation: 'shift-away',
            appendTo: function() {
                return document.body
            },
            aria: 'describedby',
            arrow: !1,
            arrowTransform: '',
            arrowType: 'sharp',
            autoFocus: !0,
            boundary: 'scrollParent',
            content: '',
            delay: [0, 20],
            distance: 10,
            duration: [325, 275],
            flip: !0,
            flipBehavior: 'flip',
            followCursor: !1,
            hideOnClick: !0,
            inertia: !1,
            interactive: !1,
            interactiveBorder: 2,
            interactiveDebounce: 0,
            lazy: !0,
            livePlacement: !0,
            maxWidth: '',
            multiple: !1,
            offset: 0,
            onHidden: function() {},
            onHide: function() {},
            onMount: function() {},
            onShow: function() {},
            onShown: function() {},
            performance: !1,
            placement: 'top',
            popperOptions: {},
            shouldPopperHideOnBlur: function() {
                return !0
            },
            showOnInit: !1,
            size: 'regular',
            sticky: !1,
            target: '',
            theme: 'dark',
            touch: !0,
            touchHold: !1,
            trigger: 'mouseenter focus',
            updateDuration: 200,
            wait: null,
            zIndex: 9999
        }, lt = ['arrow', 'arrowType', 'distance', 'flip', 'flipBehavior', 'offset', 'placement', 'popperOptions'], dt = 'undefined' != typeof window && 'undefined' != typeof document, ct = ['Edge', 'Trident', 'Firefox'], mt = 0, ft = 0; ft < ct.length; ft += 1)
        if (dt && 0 <= navigator.userAgent.indexOf(ct[ft])) {
            mt = 1;
            break
        }
    var i = dt && window.Promise,
        ht = i ? function(e) {
            var t = !1;
            return function() {
                t || (t = !0, window.Promise.resolve().then(function() {
                    t = !1, e()
                }))
            }
        } : function(e) {
            var t = !1;
            return function() {
                t || (t = !0, setTimeout(function() {
                    t = !1, e()
                }, mt))
            }
        },
        bt = dt && !!(window.MSInputMethodContext && document.documentMode),
        yt = dt && /MSIE 10/.test(navigator.userAgent),
        ut = function(e, t) {
            if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
        },
        gt = function() {
            function e(e, t) {
                for (var r, a = 0; a < t.length; a++) r = t[a], r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
            return function(t, r, a) {
                return r && e(t.prototype, r), a && e(t, a), t
            }
        }(),
        xt = function(e, t, r) {
            return t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r, e
        },
        wt = Object.assign || function(e) {
            for (var t, r = 1; r < arguments.length; r++)
                for (var a in t = arguments[r], t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
            return e
        },
        vt = dt && /Firefox/i.test(navigator.userAgent),
        kt = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'],
        Et = kt.slice(3),
        Ct = {
            FLIP: 'flip',
            CLOCKWISE: 'clockwise',
            COUNTERCLOCKWISE: 'counterclockwise'
        },
        Lt = function() {
            function t(r, a) {
                var p = this,
                    o = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                ut(this, t), this.scheduleUpdate = function() {
                    return requestAnimationFrame(p.update)
                }, this.update = ht(this.update.bind(this)), this.options = wt({}, t.Defaults, o), this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: []
                }, this.reference = r && r.jquery ? r[0] : r, this.popper = a && a.jquery ? a[0] : a, this.options.modifiers = {}, Object.keys(wt({}, t.Defaults.modifiers, o.modifiers)).forEach(function(e) {
                    p.options.modifiers[e] = wt({}, t.Defaults.modifiers[e] || {}, o.modifiers ? o.modifiers[e] : {})
                }), this.modifiers = Object.keys(this.options.modifiers).map(function(e) {
                    return wt({
                        name: e
                    }, p.options.modifiers[e])
                }).sort(function(e, t) {
                    return e.order - t.order
                }), this.modifiers.forEach(function(t) {
                    t.enabled && e(t.onLoad) && t.onLoad(p.reference, p.popper, p.options, t, p.state)
                }), this.update();
                var i = this.options.eventsEnabled;
                i && this.enableEventListeners(), this.state.eventsEnabled = i
            }
            return gt(t, [{
                key: 'update',
                value: function() {
                    return P.call(this)
                }
            }, {
                key: 'destroy',
                value: function() {
                    return I.call(this)
                }
            }, {
                key: 'enableEventListeners',
                value: function() {
                    return M.call(this)
                }
            }, {
                key: 'disableEventListeners',
                value: function() {
                    return R.call(this)
                }
            }]), t
        }();
    Lt.Utils = ('undefined' == typeof window ? global : window).PopperUtils, Lt.placements = kt, Lt.Defaults = {
        placement: 'bottom',
        positionFixed: !1,
        eventsEnabled: !0,
        removeOnDestroy: !1,
        onCreate: function() {},
        onUpdate: function() {},
        modifiers: {
            shift: {
                order: 100,
                enabled: !0,
                fn: function(e) {
                    var t = e.placement,
                        r = t.split('-')[0],
                        a = t.split('-')[1];
                    if (a) {
                        var p = e.offsets,
                            o = p.reference,
                            i = p.popper,
                            n = -1 !== ['bottom', 'top'].indexOf(r),
                            s = n ? 'left' : 'top',
                            l = n ? 'width' : 'height',
                            d = {
                                start: xt({}, s, o[s]),
                                end: xt({}, s, o[s] + o[l] - i[l])
                            };
                        e.offsets.popper = wt({}, i, d[a])
                    }
                    return e
                }
            },
            offset: {
                order: 200,
                enabled: !0,
                fn: J,
                offset: 0
            },
            preventOverflow: {
                order: 300,
                enabled: !0,
                fn: function(e, t) {
                    var r = t.boundariesElement || o(e.instance.popper);
                    e.instance.reference === r && (r = o(r));
                    var a = X('transform'),
                        p = e.instance.popper.style,
                        i = p.top,
                        n = p.left,
                        s = p[a];
                    p.top = '', p.left = '', p[a] = '';
                    var l = v(e.instance.popper, e.instance.reference, t.padding, r, e.positionFixed);
                    p.top = i, p.left = n, p[a] = s, t.boundaries = l;
                    var d = t.priority,
                        c = e.offsets.popper,
                        m = {
                            primary: function(e) {
                                var r = c[e];
                                return c[e] < l[e] && !t.escapeWithReference && (r = Ze(c[e], l[e])), xt({}, e, r)
                            },
                            secondary: function(e) {
                                var r = 'right' === e ? 'left' : 'top',
                                    a = c[r];
                                return c[e] > l[e] && !t.escapeWithReference && (a = Ge(c[r], l[e] - ('right' === e ? c.width : c.height))), xt({}, r, a)
                            }
                        };
                    return d.forEach(function(e) {
                        var t = -1 === ['left', 'top'].indexOf(e) ? 'secondary' : 'primary';
                        c = wt({}, c, m[t](e))
                    }), e.offsets.popper = c, e
                },
                priority: ['left', 'right', 'top', 'bottom'],
                padding: 5,
                boundariesElement: 'scrollParent'
            },
            keepTogether: {
                order: 400,
                enabled: !0,
                fn: function(e) {
                    var t = e.offsets,
                        r = t.popper,
                        a = t.reference,
                        p = e.placement.split('-')[0],
                        o = Je,
                        i = -1 !== ['top', 'bottom'].indexOf(p),
                        n = i ? 'right' : 'bottom',
                        s = i ? 'left' : 'top',
                        l = i ? 'width' : 'height';
                    return r[n] < o(a[s]) && (e.offsets.popper[s] = o(a[s]) - r[l]), r[s] > o(a[n]) && (e.offsets.popper[s] = o(a[n])), e
                }
            },
            arrow: {
                order: 500,
                enabled: !0,
                fn: function(e, r) {
                    var a;
                    if (!V(e.instance.modifiers, 'arrow', 'keepTogether')) return e;
                    var p = r.element;
                    if ('string' == typeof p) {
                        if (p = e.instance.popper.querySelector(p), !p) return e;
                    } else if (!e.instance.popper.contains(p)) return console.warn('WARNING: `arrow.element` must be child of its popper element!'), e;
                    var o = e.placement.split('-')[0],
                        i = e.offsets,
                        n = i.popper,
                        s = i.reference,
                        l = -1 !== ['left', 'right'].indexOf(o),
                        d = l ? 'height' : 'width',
                        c = l ? 'Top' : 'Left',
                        m = c.toLowerCase(),
                        f = l ? 'left' : 'top',
                        h = l ? 'bottom' : 'right',
                        y = L(p)[d];
                    s[h] - y < n[m] && (e.offsets.popper[m] -= n[m] - (s[h] - y)), s[m] + y > n[h] && (e.offsets.popper[m] += s[m] + y - n[h]), e.offsets.popper = b(e.offsets.popper);
                    var u = s[m] + s[d] / 2 - y / 2,
                        g = t(e.instance.popper),
                        x = parseFloat(g['margin' + c], 10),
                        w = parseFloat(g['border' + c + 'Width'], 10),
                        v = u - e.offsets.popper[m] - x - w;
                    return v = Ze(Ge(n[d] - y, v), 0), e.arrowElement = p, e.offsets.arrow = (a = {}, xt(a, m, Qe(v)), xt(a, f, ''), a), e
                },
                element: '[x-arrow]'
            },
            flip: {
                order: 600,
                enabled: !0,
                fn: function(e, t) {
                    if (D(e.instance.modifiers, 'inner')) return e;
                    if (e.flipped && e.placement === e.originalPlacement) return e;
                    var r = v(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed),
                        a = e.placement.split('-')[0],
                        p = O(a),
                        o = e.placement.split('-')[1] || '',
                        i = [];
                    switch (t.behavior) {
                        case Ct.FLIP:
                            i = [a, p];
                            break;
                        case Ct.CLOCKWISE:
                            i = j(a);
                            break;
                        case Ct.COUNTERCLOCKWISE:
                            i = j(a, !0);
                            break;
                        default:
                            i = t.behavior;
                    }
                    return i.forEach(function(n, s) {
                        if (a !== n || i.length === s + 1) return e;
                        a = e.placement.split('-')[0], p = O(a);
                        var l = e.offsets.popper,
                            d = e.offsets.reference,
                            c = Je,
                            m = 'left' === a && c(l.right) > c(d.left) || 'right' === a && c(l.left) < c(d.right) || 'top' === a && c(l.bottom) > c(d.top) || 'bottom' === a && c(l.top) < c(d.bottom),
                            f = c(l.left) < c(r.left),
                            h = c(l.right) > c(r.right),
                            b = c(l.top) < c(r.top),
                            y = c(l.bottom) > c(r.bottom),
                            u = 'left' === a && f || 'right' === a && h || 'top' === a && b || 'bottom' === a && y,
                            g = -1 !== ['top', 'bottom'].indexOf(a),
                            x = !!t.flipVariations && (g && 'start' === o && f || g && 'end' === o && h || !g && 'start' === o && b || !g && 'end' === o && y);
                        (m || u || x) && (e.flipped = !0, (m || u) && (a = i[s + 1]), x && (o = q(o)), e.placement = a + (o ? '-' + o : ''), e.offsets.popper = wt({}, e.offsets.popper, T(e.instance.popper, e.offsets.reference, e.placement)), e = Y(e.instance.modifiers, e, 'flip'))
                    }), e
                },
                behavior: 'flip',
                padding: 5,
                boundariesElement: 'viewport'
            },
            inner: {
                order: 700,
                enabled: !1,
                fn: function(e) {
                    var t = e.placement,
                        r = t.split('-')[0],
                        a = e.offsets,
                        p = a.popper,
                        o = a.reference,
                        i = -1 !== ['left', 'right'].indexOf(r),
                        n = -1 === ['top', 'left'].indexOf(r);
                    return p[i ? 'left' : 'top'] = o[r] - (n ? p[i ? 'width' : 'height'] : 0), e.placement = O(t), e.offsets.popper = b(p), e
                }
            },
            hide: {
                order: 800,
                enabled: !0,
                fn: function(e) {
                    if (!V(e.instance.modifiers, 'hide', 'preventOverflow')) return e;
                    var t = e.offsets.reference,
                        r = S(e.instance.modifiers, function(e) {
                            return 'preventOverflow' === e.name
                        }).boundaries;
                    if (t.bottom < r.top || t.left > r.right || t.top > r.bottom || t.right < r.left) {
                        if (!0 === e.hide) return e;
                        e.hide = !0, e.attributes['x-out-of-boundaries'] = ''
                    } else {
                        if (!1 === e.hide) return e;
                        e.hide = !1, e.attributes['x-out-of-boundaries'] = !1
                    }
                    return e
                }
            },
            computeStyle: {
                order: 850,
                enabled: !0,
                fn: function(e, t) {
                    var r = t.x,
                        a = t.y,
                        p = e.offsets.popper,
                        i = S(e.instance.modifiers, function(e) {
                            return 'applyStyle' === e.name
                        }).gpuAcceleration;
                    void 0 !== i && console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
                    var n = void 0 === i ? t.gpuAcceleration : i,
                        s = o(e.instance.popper),
                        l = u(s),
                        d = {
                            position: p.position
                        },
                        c = U(e, 2 > window.devicePixelRatio || !vt),
                        m = 'bottom' === r ? 'top' : 'bottom',
                        f = 'right' === a ? 'left' : 'right',
                        h = X('transform'),
                        b = void 0,
                        y = void 0;
                    if (y = 'bottom' == m ? 'HTML' === s.nodeName ? -s.clientHeight + c.bottom : -l.height + c.bottom : c.top, b = 'right' == f ? 'HTML' === s.nodeName ? -s.clientWidth + c.right : -l.width + c.right : c.left, n && h) d[h] = 'translate3d(' + b + 'px, ' + y + 'px, 0)', d[m] = 0, d[f] = 0, d.willChange = 'transform';
                    else {
                        var g = 'bottom' == m ? -1 : 1,
                            x = 'right' == f ? -1 : 1;
                        d[m] = y * g, d[f] = b * x, d.willChange = m + ', ' + f
                    }
                    var w = {
                        "x-placement": e.placement
                    };
                    return e.attributes = wt({}, w, e.attributes), e.styles = wt({}, d, e.styles), e.arrowStyles = wt({}, e.offsets.arrow, e.arrowStyles), e
                },
                gpuAcceleration: !0,
                x: 'bottom',
                y: 'right'
            },
            applyStyle: {
                order: 900,
                enabled: !0,
                fn: function(e) {
                    return F(e.instance.popper, e.styles), _(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && F(e.arrowElement, e.arrowStyles), e
                },
                onLoad: function(e, t, r, a, p) {
                    var o = C(p, t, e, r.positionFixed),
                        i = E(r.placement, o, t, e, r.modifiers.flip.boundariesElement, r.modifiers.flip.padding);
                    return t.setAttribute('x-placement', i), F(t, {
                        position: r.positionFixed ? 'fixed' : 'absolute'
                    }), r
                },
                gpuAcceleration: void 0
            }
        }
    };
    var Ot = {
            POPPER: '.tippy-popper',
            TOOLTIP: '.tippy-tooltip',
            CONTENT: '.tippy-content',
            BACKDROP: '.tippy-backdrop',
            ARROW: '.tippy-arrow',
            ROUND_ARROW: '.tippy-roundarrow'
        },
        Tt = tt ? Element.prototype : {},
        St = Tt.matches || Tt.matchesSelector || Tt.webkitMatchesSelector || Tt.mozMatchesSelector || Tt.msMatchesSelector,
        At = {
            passive: !0
        },
        Yt = {
            x: !0
        },
        Pt = !1,
        Dt = 0,
        Xt = Object.keys(st),
        It = Object.assign || function(e) {
            for (var t, r = 1; r < arguments.length; r++)
                for (var a in t = arguments[r], t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
            return e
        },
        Nt = {
            translate: /translateX?Y?\(([^)]+)\)/,
            scale: /scaleX?Y?\(([^)]+)\)/
        },
        Ht = 1,
        Wt = !1;
    Ke.version = et, Ke.defaults = st, Ke.one = function(e, t) {
        return Ke(e, t, !0).instances[0]
    }, Ke.setDefaults = function(e) {
        Object.keys(e).forEach(function(t) {
            st[t] = e[t]
        })
    }, Ke.disableAnimations = function() {
        Ke.setDefaults({
            duration: 0,
            updateDuration: 0,
            animateFill: !1
        })
    }, Ke.hideAllPoppers = ge, Ke.useCapture = function() {};
    return tt && setTimeout(function() {
            Q(document.querySelectorAll('[data-tippy]')).forEach(function(e) {
                var t = e.getAttribute('data-tippy');
                t && Ke(e, {
                    content: t
                })
            })
        }),
        function(e) {
            if (pt) {
                var t = document.createElement('style');
                t.type = 'text/css', t.textContent = e, document.head.insertBefore(t, document.head.firstChild)
            }
        }($e), Ke
});;
! function($) {
    function mk_text_typer() {
        "use strict";
        $("[data-typer-targets]").each(function() {
            var that = this;
            MK.core.loadDependencies([MK.core.path.plugins + "jquery.typed.js"], function() {
                var $this = $(that),
                    $first_string = [$this.text()],
                    $rest_strings = $this.attr("data-typer-targets").split(","),
                    $strings = $first_string.concat($rest_strings);
                $this.text(""), $this.typed({
                    strings: $strings,
                    typeSpeed: 30,
                    backDelay: 1200,
                    loop: !0,
                    loopCount: !1
                })
            })
        })
    }

    function mk_tab_slider_func() {
        "use strict";
        $(".mk-tab-slider").each(function() {
            var that = this;
            MK.core.loadDependencies([MK.core.path.plugins + "jquery.swiper.js"], function() {
                function repaintFirefox() {
                    $content.css("display", "block"), setTimeout(function() {
                        mk_tab_slider.reInit(), $content.css("display", "table")
                    }, 100)
                }
                var $this = $(that),
                    id = $this.data("id"),
                    $autoplayTime = $this.data("autoplay"),
                    $content = $(".mk-slider-content"),
                    mk_tab_slider = $this.swiper({
                        wrapperClass: "mk-tab-slider-wrapper",
                        slideClass: "mk-tab-slider-item",
                        calculateHeight: !0,
                        speed: 500,
                        autoplay: !isTest && $autoplayTime,
                        onSlideChangeStart: function() {
                            $('.mk-tab-slider-nav[data-id="' + id + '"]').find(".active").removeClass("active"), $('.mk-tab-slider-nav[data-id="' + id + '"]').find("a").eq(mk_tab_slider.activeIndex).addClass("active")
                        }
                    });
                $('.mk-tab-slider-nav[data-id="' + id + '"]').find("a").first().addClass("active"), $('.mk-tab-slider-nav[data-id="' + id + '"]').find("a").on("touchstart mousedown", function(e) {
                    e.preventDefault(), $('.mk-tab-slider-nav[data-id="' + id + '"]').find(".active").removeClass("active"), $(this).addClass("active"), mk_tab_slider.swipeTo($(this).index())
                }), $('.mk-tab-slider-nav[data-id="' + id + '"]').find("a").click(function(e) {
                    e.preventDefault()
                }), repaintFirefox(), $(window).on("resize", repaintFirefox)
            })
        })
    }

    function mk_one_page_scroller() {
        "use strict";
        $(".mk-edge-one-pager").each(function() {
            var self = this;
            MK.core.loadDependencies([MK.core.path.plugins + "jquery.fullpage.js"], function() {
                function swipeTo(href, e) {
                    if (href = "_" + href, ~href.indexOf("#")) {
                        var section = href.split("#")[1];
                        ~anchorArr.indexOf(section) && (void 0 !== e && e.preventDefault(), scrollable ? $.fn.fullpage.moveTo(section) : MK.utils.scrollToAnchor('[data-title="' + section + '"]'))
                    }
                }
                var $this = $(self),
                    anchorArr = [];
                $this.find(".section").each(function() {
                    anchorArr.push($(this).attr("data-title"))
                });
                var scrollable = !0;
                $this.find(".section").each(function() {
                    var $section = $(this),
                        $content = $section.find(".edge-slide-content");
                    $section.height();
                    $content.innerHeight() + 30 > $(window).height() && (scrollable = !1)
                }), scrollable || $this.find(".section").each(function() {
                    $(this).addClass("active").css({
                        "padding-bottom": "50px"
                    })
                }), scrollable && $this.fullpage({
                    verticalCentered: !1,
                    resize: !0,
                    slidesColor: ["#ccc", "#fff"],
                    anchors: anchorArr,
                    scrollingSpeed: 600,
                    easing: "easeInQuart",
                    menu: !1,
                    navigation: !0,
                    navigationPosition: "right",
                    navigationTooltips: !1,
                    slidesNavigation: !0,
                    slidesNavPosition: "bottom",
                    loopBottom: !1,
                    loopTop: !1,
                    loopHorizontal: !0,
                    autoScrolling: !0,
                    scrollOverflow: !1,
                    css3: !0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    normalScrollElements: ".mk-header, .mk-responsive-wrap",
                    normalScrollElementTouchThreshold: 5,
                    keyboardScrolling: !0,
                    touchSensitivity: 15,
                    continuousVertical: !1,
                    animateAnchor: !0,
                    onLeave: function(index, nextIndex, direction) {
                        var currentSkin = $this.find(".one-pager-slide").eq(nextIndex - 1).attr("data-header-skin");
                        MK.utils.eventManager.publish("firstElSkinChange", currentSkin), $("#fullPage-nav").removeClass("light-skin dark-skin").addClass(currentSkin + "-skin")
                    },
                    afterRender: function() {
                        var $nav = $("#fullPage-nav");
                        setTimeout(function() {
                            var currentSkin = $this.find(".one-pager-slide").eq(0).attr("data-header-skin");
                            MK.utils.eventManager.publish("firstElSkinChange", currentSkin), $nav.length && $nav.removeClass("light-skin dark-skin").addClass(currentSkin + "-skin")
                        }, 300);
                        var $slide = $this.find(".section"),
                            headerHeight = MK.val.offsetHeaderHeight(0),
                            windowHeight = $(window).height();
                        if ($slide.height(windowHeight - headerHeight), $nav.length) {
                            $nav.css({
                                top: "calc(50% + " + headerHeight / 2 + "px)",
                                marginTop: 0
                            });
                            var style = $this.attr("data-pagination");
                            $nav.addClass("pagination-" + style)
                        }
                        setTimeout(mk_one_pager_resposnive, 1e3)
                    },
                    afterResize: function() {
                        var $slide = $this.find(".section"),
                            headerHeight = MK.val.offsetHeaderHeight(0),
                            windowHeight = $(window).height();
                        $slide.height(windowHeight - headerHeight), $("#fullPage-nav").css({
                            top: "calc(50% + " + headerHeight / 2 + "px)",
                            marginTop: 0
                        }), setTimeout(mk_one_pager_resposnive, 1e3), console.log("Reposition pager content.")
                    }
                });
                var loc = window.location;
                loc.hash && swipeTo(loc.hash), $(document).on("click", "a", function(e) {
                    swipeTo($(e.currentTarget).attr("href"), e)
                })
            })
        })
    }

    function mk_one_pager_resposnive() {
        "use strict";
        $(".mk-edge-one-pager").each(function() {
            var $pager = $(this),
                headerHeight = MK.val.offsetHeaderHeight(0),
                windowHeight = $(window).height() - headerHeight;
            $pager.find(".one-pager-slide").each(function() {
                var $slide = $(this),
                    $content = $slide.find(".edge-slide-content");
                if ($slide.hasClass("left_center") || $slide.hasClass("center_center") || $slide.hasClass("right_center")) {
                    var contentHeight = $content.height(),
                        distanceFromTop = (windowHeight - contentHeight) / 2;
                    distanceFromTop = distanceFromTop < 50 ? 50 + headerHeight : distanceFromTop, $content.css("marginTop", distanceFromTop)
                }
                if ($slide.hasClass("left_bottom") || $slide.hasClass("center_bottom") || $slide.hasClass("right_bottom")) {
                    var distanceFromTop = windowHeight - $content.height() - 90;
                    $content.css("marginTop", distanceFromTop)
                }
            })
        })
    }

    function mk_gallery() {
        "use strict";
        $(".mk-gallery .mk-gallery-item.hover-overlay_layer .item-holder").each(function() {
            function updatePosition() {
                var parentHeight = itemHolder.outerHeight(),
                    contentHeight = galleryDesc.innerHeight(),
                    paddingVal = (parentHeight - contentHeight) / 2;
                galleryDesc.css({
                    top: paddingVal
                })
            }
            var itemHolder = $(this),
                galleryDesc = itemHolder.find(".gallery-desc");
            updatePosition(), $(window).on("resize", function() {
                setTimeout(function() {
                    updatePosition()
                }, 1e3)
            })
        }), $(window).width() <= 1024 && $(".mk-gallery .mk-gallery-item").on("click", function(e) {
            var clicks = $(this).data("clicks");
            $(this).toggleClass("hover-state"), $(this).data("clicks", !clicks)
        })
    }

    function mk_theatre_responsive_calculator() {
        var $laptopContainer = $(".laptop-theatre-slider"),
            $computerContainer = $(".desktop-theatre-slider");
        $laptopContainer.each(function() {
            var $this = $(this),
                $window = $(window),
                $windowWidth = $window.outerWidth(),
                $width = ($window.outerHeight(), $this.outerWidth()),
                $height = $this.outerHeight(),
                $player = $this.find(".player-container");
            $windowWidth > $width && $player.css({
                "padding-left": parseInt(143 * $width / 1200),
                "padding-right": parseInt(143 * $width / 1200),
                "padding-top": parseInt(38 * $height / 690),
                "padding-bottom": parseInt(78 * $height / 690)
            })
        }), $computerContainer.each(function() {
            var $this = $(this),
                $window = $(window),
                $windowWidth = $window.outerWidth(),
                $width = ($window.outerHeight(), $this.outerWidth()),
                $height = $this.outerHeight(),
                $player = $this.find(".player-container");
            $windowWidth > $width && $player.css({
                "padding-left": parseInt(49 * $width / 1200),
                "padding-right": parseInt(52 * $width / 1200),
                "padding-top": parseInt(60 * $height / 969),
                "padding-bottom": parseInt(290 * $height / 969)
            })
        })
    }

    function mk_mobile_tablet_responsive_calculator() {
        var $laptopSlideshow = $(".mk-laptop-slideshow-shortcode"),
            $lcdSlideshow = $(".mk-lcd-slideshow");
        $.exists(".mk-laptop-slideshow-shortcode") && $laptopSlideshow.each(function() {
            var $this = $(this),
                $window = $(window),
                $width = ($window.outerWidth(), $window.outerHeight(), $this.outerWidth()),
                $height = $this.outerHeight();
            $this.find(".slideshow-container").css({
                "padding-left": parseInt(102 * $width / 836),
                "padding-right": parseInt(102 * $width / 836),
                "padding-top": parseInt(28 * $height / 481),
                "padding-bottom": parseInt(52 * $height / 481)
            })
        }), $.exists(".mk-lcd-slideshow") && $lcdSlideshow.each(function() {
            var $this = $(this),
                $window = $(window),
                $width = ($window.outerWidth(), $window.outerHeight(), $this.outerWidth()),
                $height = $this.outerHeight();
            $this.find(".slideshow-container").css({
                "padding-left": parseInt(36 * $width / 886),
                "padding-right": parseInt(39 * $width / 886),
                "padding-top": parseInt(35 * $height / 713),
                "padding-bottom": parseInt(213 * $height / 713)
            })
        })
    }

    function mk_start_tour_resize() {
        $(".mk-header-start-tour").each(function() {
            function updateStartTour() {
                $windowWidth < mk_responsive_nav_width ? ($this.removeClass("hidden"), $this.addClass("show")) : $padding < $linkWidth ? ($this.removeClass("show"), $this.addClass("hidden")) : ($this.removeClass("hidden"), $this.addClass("show"))
            }
            var $windowWidth = $(document).width(),
                $this = $(this),
                $linkWidth = $this.width() + 15,
                $padding = ($windowWidth - mk_responsive_nav_width) / 2;
            setTimeout(function() {
                updateStartTour()
            }, 300)
        })
    }

    function mk_header_social_resize() {
        $(".mk-header-social.header-section").each(function() {
            function updateStartTour() {
                $windowWidth < mk_responsive_nav_width ? ($this.removeClass("hidden"), $this.addClass("show")) : $padding < $linkWidth ? ($this.removeClass("show"), $this.addClass("hidden")) : ($this.removeClass("hidden"), $this.addClass("show"))
            }
            var $windowWidth = $(document).width(),
                $this = $(this),
                $linkWidth = $this.width() + 15,
                $padding = ($windowWidth - mk_responsive_nav_width) / 2;
            setTimeout(function() {
                updateStartTour()
            }, 300)
        })
    }

    function mk_page_section_social_video_bg() {
        $(".mk-page-section.social-hosted").each(function() {
            var player, $container = $(this),
                $sound = $container.data("sound"),
                $source = $container.data("source");
            if ("youtube" == $source) {
                var youtube = $container.find("iframe")[0];
                player = new YT.Player(youtube), setTimeout(function() {
                    player.playVideo(), 0 == $sound && player.mute()
                }, 1e3)
            }
            if ("vimeo" == $source) {
                var vimeo = $container.find("iframe")[0];
                player = $f(vimeo), setTimeout(function() {
                    player.api("play"), !1 === $sound && player.api("setVolume", 0)
                }, 1e3)
            }
        })
    }

    function mk_accordion_toggles_tooltip() {
        "use strict";
        $(".box-close-btn").on("click", function() {
            return $(this).parent().fadeOut(300), !1
        })
    }

    function mk_portfolio_ajax() {
        "use strict";

        function init() {
            var $portfolio = $(".portfolio-grid.portfolio-ajax-enabled");
            $portfolio.length && MK.core.loadDependencies([MK.core.path.plugins + "jquery.ajax.portfolio.js"], function() {
                setTimeout(function() {
                    $portfolio.each(function() {
                        $(this).ajaxPortfolio({
                            extraOffset: headerHeight
                        })
                    })
                }, 100)
            })
        }
        var headerHeight = 0;
        $.exists("#wpadminbar") && (headerHeight += $("#wpadminbar").height()), $.exists(".mk-vm-menuwrapper") || (headerHeight += parseInt($(".mk-header").attr("data-sticky-height"))), init(), MK.utils.eventManager.subscribe("ajaxLoaded", init)
    }

    function mk_ajax_search() {
        "use strict";

        function onSearchBoxInput(e) {
            var target = e.target || e.srcElement,
                newValue = target.value;
            searchTerm !== newValue && (searchTerm = newValue, ul.innerHTML = "", searchTerm.length >= minimumLengthToSearch && ($mkAjaxSearchInput.addClass("ajax-searching"), requestCounter++, $.getJSON(ajaxurl + querySpliter + "callback=?&action=mk_ajax_search&security=" + security + "&_wp_http_referer=" + wpHttpReferer + "&term=" + searchTerm).done(showSearchResult).fail(showErrorMessage)))
        }

        function showSearchResult(data) {
            if (responseCounter++, isCorrectResponse()) {
                if (data.length > 0)
                    for (var i = 0; i < data.length; i++) {
                        var item = data[i];
                        $("<li>").append('<a href="' + item.link + '">' + item.image + '<span class="search-title">' + item.label + '</span><span class="search-date">' + item.date + "</span></a>").appendTo(ul)
                    } else ul.innerHTML = '<li class="mk-nav-search-result-zero">No Result.</li>';
                $mkAjaxSearchInput.parent("form").removeClass("ajax-searching").addClass("ajax-search-complete")
            }
        }

        function showErrorMessage() {
            responseCounter++, isCorrectResponse() && (ul.innerHTML = '<li class="mk-nav-search-error-message">Can not search! Please try again.</li>')
        }

        function isCorrectResponse() {
            return requestCounter === responseCounter
        }
        if ("beside_nav" === mk_ajax_search_option) {
            var searchTerm, minimumLengthToSearch = 3,
                $mkAjaxSearchInput = $("#mk-ajax-search-input"),
                security = $mkAjaxSearchInput.siblings('input[name="security"]').val(),
                wpHttpReferer = $mkAjaxSearchInput.siblings('input[name="_wp_http_referer"]').val(),
                querySpliter = ajaxurl.indexOf("?") > -1 ? "&" : "?",
                ul = document.getElementById("mk-nav-search-result"),
                requestCounter = 0,
                responseCounter = 0;
            $mkAjaxSearchInput.on("paste input propertychange", onSearchBoxInput)
        }
    }

    function mk_backgrounds_parallax() {
        "use strict";
        1 == mk_header_parallax && $(".mk-header-bg").addClass("mk-parallax-enabled"), 1 == mk_body_parallax && $("body").addClass("mk-parallax-enabled"), 1 == mk_banner_parallax && $(".mk-header").addClass("mk-parallax-enabled"), 1 == mk_footer_parallax && $("#mk-footer").addClass("mk-parallax-enabled"), $(".mk-parallax-enabled").each(function() {
            var $this = $(this);
            MK.utils.isMobile() || MK.core.loadDependencies([MK.core.path.plugins + "jquery.parallax.js"], function() {
                $this.parallax("49%", .3)
            })
        }), $(".mk-fullwidth-slideshow.parallax-slideshow").each(function() {
            var $this = $(this);
            MK.utils.isMobile() || MK.core.loadDependencies([MK.core.path.plugins + "jquery.parallax.js"], function() {
                var speed_factor = $this.attr("data-speedFactor");
                $this.parallax("49%", speed_factor)
            })
        })
    }

    function loop_audio_init() {
        $.exists(".jp-jplayer") && $(".jp-jplayer.mk-blog-audio").each(function() {
            var $this = $(this);
            MK.core.loadDependencies([MK.core.path.plugins + "jquery.jplayer.js"], function() {
                var ogg_file, mp3_file, css_selector_ancestor = "#" + $this.siblings(".jp-audio").attr("id");
                ogg_file = $this.attr("data-ogg"), mp3_file = $this.attr("data-mp3"), $this.jPlayer({
                    ready: function() {
                        $this.jPlayer("setMedia", {
                            mp3: mp3_file,
                            ogg: ogg_file
                        })
                    },
                    play: function() {
                        $this.jPlayer("pauseOthers")
                    },
                    swfPath: void 0,
                    supplied: "mp3, ogg",
                    cssSelectorAncestor: css_selector_ancestor,
                    wmode: "window"
                })
            })
        })
    }

    function mk_blog_carousel() {
        "use strict";
        $.exists(".mk-blog-showcase") && $(".mk-blog-showcase ul li").each(function() {
            $(this).on("hover", function() {
                $(this).siblings("li").removeClass("mk-blog-first-el").end().addClass("mk-blog-first-el")
            })
        })
    }

    function mk_contact_form() {
        "use strict";

        function validateForm(e, invalidClassName) {
            e.preventDefault();
            for (var form = e.target || e.srcElement, inputs = getFormInputs(form), isValidForm = !0, hasCaptchaField = !1, i = 0; i < inputs.length; i++) {
                var input = inputs[i];
                switch (input.value = String(input.value).trim(), input.type) {
                    case "hidden":
                        break;
                    case "email":
                        isValidForm = validateEmail(input, invalidClassName) && isValidForm;
                        break;
                    case "textarea":
                        isValidForm = validateText(input, invalidClassName) && isValidForm;
                        break;
                    case "text":
                        "captcha" === input.dataset.type ? (isValidForm = validateText(input, invalidClassName) && isValidForm, hasCaptchaField = !0) : isValidForm = "email" === input.dataset.type ? validateEmail(input, invalidClassName) && isValidForm : validateText(input, invalidClassName) && isValidForm;
                        break;
                    default:
                        console.warn("Implement validation for " + input.name + ":" + input.type)
                }
            }
            isValidForm && (hasCaptchaField ? validateCaptcha(form, invalidClassName, sendForm) : sendForm(form))
        }

        function validateCaptcha(form, invalidClassName, captchaIsValidCallback) {
            var input = form.querySelectorAll('[data-type="captcha"]')[0];
            if (0 === input.value.length) return addClass(input, invalidClassName), !1;
            window.get.captcha(input.value).done(function(data) {
                loadCaptcha(), input.value = "", "ok" !== data ? (addClass(input, invalidClassName), addClass(input, "contact-captcha-invalid"), removeClass(input, "contact-captcha-valid"), input.placeholder = mk_captcha_invalid_txt) : (removeClass(input, invalidClassName), removeClass(input, "contact-captcha-invalid"), addClass(input, "contact-captcha-valid"), input.placeholder = mk_captcha_correct_txt, captchaIsValidCallback(form))
            })
        }

        function sendForm(form) {
            var $form = $(form),
                data = getFormData(form);
            progressButton.loader($form), $.post(ajaxurl, data, function(response) {
                var res = JSON.parse(response);
                res.action_Status ? (progressButton.success($form), $form.find(".text-input").val(""), $form.find("textarea").val(""), $form.find(".contact-form-message").addClass("state-success").html(res.message)) : (progressButton.error($form), $form.find(".contact-form-message").removeClass("state-success").html(res.message))
            })
        }

        function initializeCaptchas() {
            for (var captchaChangeImageButtons = document.getElementsByClassName("captcha-change-image"), i = 0; i < captchaChangeImageButtons.length; i++) captchaChangeImageButtons[i].addEventListener("click", loadCaptcha)
        }

        function loadCaptcha(e) {
            function appendImage(captchaImageURL) {
                0 === captchaImageHolder.find(".captcha-image").length ? captchaImageHolder.html('<img src="' + captchaImageURL + '" class="captcha-image" alt="captcha txt">') : captchaImageHolder.find(".captcha-image").attr("src", captchaImageURL + "?" + (new Date).getTime())
            }
            e && e.preventDefault(), $.post(ajaxurl, {
                action: "mk_create_captcha_image"
            }, appendImage)
        }

        function getFormInputs(form) {
            return form.querySelectorAll("input,textarea")
        }

        function getFormData(form) {
            for (var data = {
                    action: "mk_contact_form"
                }, inputs = getFormInputs(form), i = 0; i < inputs.length; i++) data[inputs[i].name] = inputs[i].value;
            return data
        }
        var mkContactForms = document.getElementsByClassName("mk-contact-form");
        if (0 !== mkContactForms.length) {
            for (var captchaImageHolder = $(".captcha-image-holder"), i = 0; i < mkContactForms.length; i++) ! function(form, activeClassName, invalidClassName) {
                function setActiveClass() {
                    addClass(this.parentNode, activeClassName)
                }

                function unsetActiveClass() {
                    "" === this.value && removeClass(this.parentNode, activeClassName)
                }
                for (var inputs = getFormInputs(form), i = 0; i < inputs.length; i++) ! function(input) {
                    input.addEventListener("focus", setActiveClass), input.addEventListener("blur", unsetActiveClass)
                }(inputs[i]);
                form.addEventListener("submit", function(e) {
                    validateForm(e, invalidClassName)
                })
            }(mkContactForms[i], "is-active", "mk-invalid");
            captchaImageHolder.length > 0 && $(window).on("load", initializeCaptchas)
        }
    }

    function mk_login_form() {
        $("form.mk-login-form").each(function() {
            var $this = $(this);
            $this.on("submit", function(e) {
                $("p.mk-login-status", $this).show().text(ajax_login_object.loadingmessage), $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: ajax_login_object.ajaxurl,
                    data: {
                        action: "ajaxlogin",
                        username: $("#username", $this).val(),
                        password: $("#password", $this).val(),
                        security: $("#security", $this).val()
                    },
                    success: function(data) {
                        $("p.mk-login-status", $this).text(data.message), !0 === data.loggedin && (document.location.href = ajax_login_object.redirecturl)
                    }
                }), e.preventDefault()
            })
        })
    }

    function mk_click_events() {
        "use strict";
        $(".mk-header-login, .mk-header-signup, .mk-side-dashboard, .mk-quick-contact-wrapper, .mk-dashboard-trigger, .blog-share-container, .news-share-buttons, .main-nav-side-search, #mk-fullscreen-search-wrapper, #fullscreen-navigation").on("click", function(event) {
            event.stopPropagation ? event.stopPropagation() : window.event && (window.event.cancelBubble = !0)
        }), $("html").on("click", function() {
            $(".mk-login-register, .mk-header-subscribe, #mk-quick-contact, .single-share-buttons, .single-share-box, .blog-social-share, .news-share-buttons, #mk-nav-search-wrapper").fadeOut(300), $(".mk-quick-contact-link").removeClass("quick-contact-active")
        }), $(".mk-fullscreen-search-overlay").on("click", function() {
            $(this).removeClass("mk-fullscreen-search-overlay-show")
        }), $(".mk-forget-password").on("click", function() {
            $(".mk-forget-panel").siblings().hide().end().show()
        }), $(".mk-create-account").on("click", function() {
            $("#mk-register-panel").siblings().hide().end().show()
        }), $(".mk-return-login").on("click", function() {
            $("#mk-login-panel").siblings().hide().end().show()
        }), $(".mk-quick-contact-link").on("click", function() {
            var $this = $(this),
                $quickContact = $("#mk-quick-contact");
            return $this.hasClass("quick-contact-active") ? ($quickContact.removeClass("quick-contact-anim").fadeOut(100), $this.removeClass("quick-contact-active")) : ($quickContact.addClass("quick-contact-anim").fadeIn(250), $this.addClass("quick-contact-active")), !1
        })
    }

    function mk_social_share_global() {
        "use strict";
        $(".twitter-share").on("click", function() {
            var $this = $(this),
                $url = $this.attr("data-url"),
                $title = $this.attr("data-title");
            return window.open("http://twitter.com/intent/tweet?text=" + $title + " " + $url, "twitterWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0"), !1
        }), $(".pinterest-share").on("click", function() {
            var $this = $(this),
                $url = $this.attr("data-url"),
                $title = $this.attr("data-title"),
                $image = $this.attr("data-image");
            return window.open("http://pinterest.com/pin/create/button/?url=" + $url + "&media=" + $image + "&description=" + $title, "twitterWindow", "height=320,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0"), !1
        }), $(".facebook-share").on("click", function() {
            var $url = $(this).attr("data-url");
            return window.open("https://www.facebook.com/sharer/sharer.php?u=" + $url, "facebookWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0"), !1
        }), $(".googleplus-share").on("click", function() {
            var $url = $(this).attr("data-url");
            return window.open("https://plus.google.com/share?url=" + $url, "googlePlusWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0"), !1
        }), $(".linkedin-share").on("click", function() {
            var $this = $(this),
                $url = $this.attr("data-url"),
                $title = $this.attr("data-title"),
                $desc = $this.attr("data-desc");
            return window.open("http://www.linkedin.com/shareArticle?mini=true&url=" + $url + "&title=" + $title + "&summary=" + $desc, "linkedInWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0"), !1
        })
    }

    function mk_event_countdown() {
        $.exists(".mk-event-countdown") && MK.core.loadDependencies([MK.core.path.plugins + "jquery.countdown.js"], function() {
            $(".mk-event-countdown").each(function() {
                if (!isTest) {
                    var $this = $(this),
                        $date = $this.attr("data-date"),
                        $offset = $this.attr("data-offset");
                    $this.downCount({
                        date: $date,
                        offset: $offset
                    })
                }
            })
        })
    }

    function mk_flexslider_init() {
        var $lcd = $(".mk-lcd-slideshow"),
            $laptop = $(".mk-laptop-slideshow-shortcode");
        $lcd.length && $lcd.find(".mk-lcd-image").fadeIn(), $laptop.length && $laptop.find(".mk-laptop-image").fadeIn(), $(".js-flexslider").each(function() {
            ($(this).parents(".mk-tabs").length || $(this).parents(".mk-accordion").length) && $(this).removeData("flexslider");
            var $this = $(this),
                $selector = $this.attr("data-selector"),
                $animation = $this.attr("data-animation"),
                $easing = $this.attr("data-easing"),
                $direction = $this.attr("data-direction"),
                $smoothHeight = "true" == $this.attr("data-smoothHeight"),
                $slideshowSpeed = $this.attr("data-slideshowSpeed"),
                $animationSpeed = $this.attr("data-animationSpeed"),
                $controlNav = "true" == $this.attr("data-controlNav"),
                $directionNav = "true" == $this.attr("data-directionNav"),
                $pauseOnHover = "true" == $this.attr("data-pauseOnHover"),
                $isCarousel = "true" == $this.attr("data-isCarousel");
            if (void 0 !== $selector) var $selector_class = $selector;
            else var $selector_class = ".mk-flex-slides > li";
            if (!0 === $isCarousel) var $itemWidth = parseInt($this.attr("data-itemWidth")),
                $itemMargin = parseInt($this.attr("data-itemMargin")),
                $minItems = parseInt($this.attr("data-minItems")),
                $maxItems = parseInt($this.attr("data-maxItems")),
                $move = parseInt($this.attr("data-move"));
            else var $itemWidth = $itemMargin = $minItems = $maxItems = $move = 0;
            MK.core.loadDependencies([MK.core.path.plugins + "jquery.flexslider.js"], function() {
                $this.flexslider({
                    selector: $selector_class,
                    animation: $animation,
                    easing: $easing,
                    direction: $direction,
                    smoothHeight: $smoothHeight,
                    slideshow: !isTest,
                    slideshowSpeed: $slideshowSpeed,
                    animationSpeed: $animationSpeed,
                    controlNav: $controlNav,
                    directionNav: $directionNav,
                    pauseOnHover: $pauseOnHover,
                    prevText: "",
                    nextText: "",
                    itemWidth: $itemWidth,
                    itemMargin: $itemMargin,
                    minItems: $minItems,
                    maxItems: $maxItems,
                    move: $move
                })
            })
        })
    }

    function mk_header_searchform() {
        $(".mk-search-trigger").click(function() {
            setTimeout(function() {
                $("#mk-ajax-search-input").focus()
            }, 500)
        }), $(".mk-header-toolbar .mk-header-searchform .text-input").on("focus", function() {
            if ($(".mk-header-toolbar .mk-header-searchform .text-input").hasClass("on-close-state")) return $(".mk-header-toolbar .mk-header-searchform .text-input").removeClass("on-close-state").animate({
                width: "200px"
            }, 200), !1
        }), $(".mk-header-toolbar .mk-header-searchform").click(function(event) {
            event.stopPropagation ? event.stopPropagation() : window.event && (window.event.cancelBubble = !0)
        }), $("html").click(function() {
            $(this).find(".mk-header-toolbar .mk-header-searchform .text-input").addClass("on-close-state").animate({
                width: 90
            }, 300)
        }), "Edge" === MK.utils.browser.name && $("#mk-fullscreen-search-input").on("keydown", function(e) {
            13 == e.which && (e.preventDefault(), $("#mk-fullscreen-searchform").submit())
        })
    }

    function mk_hover_events() {
        "use strict";
        $(".shopping-cart-header").hover(function() {
            $(this).find(".mk-shopping-cart-box").stop(!0, !0).fadeIn(250)
        }, function() {
            $(this).find(".mk-shopping-cart-box").stop(!0, !0).fadeOut(250)
        }), $(".widget-sub-navigation > ul > li, .widget_nav_menu ul.menu > li, .widget_product_categories ul > .cat-item").each(function() {
            var $this = $(this),
                $subLevel = $this.find("ul").first();
            ($this.hasClass("page_item_has_children") || $this.hasClass("menu-item-has-children") || $this.hasClass("cat-parent")) && ($this.on("click", function() {
                $this.hasClass("toggle-active") ? ($subLevel.stop(!0, !0).slideUp(700), $this.removeClass("toggle-active")) : ($subLevel.stop(!0, !0).slideDown(700), $this.addClass("toggle-active"))
            }), $subLevel.on("click", function(e) {
                e.stopPropagation()
            }))
        });
        $(".mk-fullscreen-trigger").on("click", function(e) {
            $(".mk-fullscreen-search-overlay").addClass("mk-fullscreen-search-overlay-show"), setTimeout(function() {
                $("#mk-fullscreen-search-input").focus()
            }, 300), e.preventDefault()
        }), $(".mk-fullscreen-close").on("click", function(e) {
            $(".mk-fullscreen-search-overlay").removeClass("mk-fullscreen-search-overlay-show"), e.preventDefault()
        })
    }

    function mk_unfold_footer() {
        var $this = $("#mk-footer"),
            $spacer = $("#mk-footer-unfold-spacer"),
            $footerHeight = $this.outerHeight();
        window.matchMedia("(max-width: 767px)").matches ? $spacer.css("height", 0) : $this.hasClass("mk-footer-unfold") && $spacer.css("height", $footerHeight)
    }

    function mk_lightbox_init() {}

    function mk_love_post() {
        "use strict";
        $("body").on("click", ".mk-love-this", function() {
            var $this = $(this),
                $id = $this.attr("id");
            if ($this.hasClass("item-loved")) return !1;
            if ($this.hasClass("item-inactive")) return !1;
            var $sentdata = {
                action: "mk_love_post",
                post_id: $id
            };
            return $.post(ajaxurl, $sentdata, function(data) {
                $this.find(".mk-love-count").html(data), $this.addClass("item-loved")
            }), $this.addClass("item-inactive"), !1
        })
    }

    function mk_milestone() {
        "use strict";
        !isTest && $.exists(".mk-milestone") && $(".mk-milestone").each(function() {
            var $this = $(this),
                stop_number = $this.find(".milestone-number").attr("data-stop"),
                animation_speed = parseInt($this.find(".milestone-number").attr("data-speed")),
                build = function() {
                    $this.hasClass("scroll-animated") || ($this.addClass("scroll-animated"), $({
                        countNum: $this.find(".milestone-number").text()
                    }).animate({
                        countNum: stop_number
                    }, {
                        duration: animation_speed,
                        easing: "linear",
                        step: function() {
                            $this.find(".milestone-number").text(Math.floor(this.countNum))
                        },
                        complete: function() {
                            $this.find(".milestone-number").text(this.countNum)
                        }
                    }))
                };
            MK.utils.isMobile() ? build() : MK.utils.scrollSpy(this, {
                position: "bottom",
                after: build
            })
        })
    }

    function mk_portfolio_widget() {
        "use strict";
        $(".widget_recent_portfolio li").each(function() {
            $(this).find(".portfolio-widget-thumb").hover(function() {
                $(this).siblings(".portfolio-widget-info").animate({
                    opacity: 1
                }, 200)
            }, function() {
                $(this).siblings(".portfolio-widget-info").animate({
                    opacity: 0
                }, 200)
            })
        })
    }

    function mk_skill_meter() {
        "use strict";
        $.exists(".mk-skill-meter") && (MK.utils.isMobile() ? $(".mk-skill-meter .progress-outer").each(function() {
            var $this = $(this);
            $this.hasClass("scroll-animated") || ($this.addClass("scroll-animated"), $this.css({
                width: $(this).attr("data-width") + "%"
            }))
        }) : $(".mk-skill-meter .progress-outer").each(function() {
            var $this = $(this),
                build = function() {
                    $this.hasClass("scroll-animated") || ($this.addClass("scroll-animated"), $this.animate({
                        width: $this.attr("data-width") + "%"
                    }, 2e3))
                };
            MK.utils.scrollSpy(this, {
                position: "bottom",
                after: build
            })
        }))
    }

    function addClass(tag, className) {
        tag.className += " " + className
    }

    function removeClass(tag, className) {
        tag.className = tag.className.replace(new RegExp(className, "g"), "")
    }

    function validateEmail(input, invalidClassName) {
        var value = input.value.trim();
        return (input.required || value.length > 0) && !/^([a-z0-9_\.\-\+]+)@([\da-z\.\-]+)\.([a-z\.]{2,63})$/i.test(value) ? (invalidClassName && addClass(input, invalidClassName), !1) : (invalidClassName && removeClass(input, invalidClassName), !0)
    }

    function validateText(input, invalidClassName) {
        var value = input.value.trim();
        return input.required && 0 === value.length ? (invalidClassName && addClass(input, invalidClassName), !1) : (invalidClassName && removeClass(input, invalidClassName), !0)
    }

    function product_loop_add_cart() {
        var $body = $("body");
        $body.on("click", ".add_to_cart_button", function() {
            var $holder = $(this).parents(".product:eq(0)"),
                $i = $holder.find(".product-loading-icon");
            $holder.addClass("adding-to-cart").removeClass("added-to-cart"), $i.html('<svg class="mk-svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M437.011 74.99c-46.326-46.328-110.318-74.99-181.011-74.99-109.744 0-203.345 69.064-239.749 166.094l59.938 22.477c27.302-72.773 97.503-124.571 179.811-124.571 53.02 0 101.01 21.5 135.753 56.247l-71.753 71.753h192v-192l-74.989 74.99zm-181.011 373.01c-53.02 0-101.013-21.496-135.756-56.244l71.756-71.756h-192v192l74.997-74.997c46.323 46.331 110.309 74.997 181.003 74.997 109.745 0 203.346-69.064 239.75-166.094l-59.938-22.477c-27.302 72.773-97.503 124.571-179.812 124.571z"/></svg>')
        }), $body.bind("added_to_cart", function() {
            var $holder = $(".adding-to-cart"),
                $i = $holder.find(".product-loading-icon");
            $holder.removeClass("adding-to-cart").addClass("added-to-cart"), $i.html('<svg class="mk-svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M432 64l-240 240-112-112-80 80 192 192 320-320z"/></svg>')
        })
    }
    var MK = {
        api: {},
        ui: {},
        component: {}
    };
    window.MK = MK, window.elementQuery = function() {
            var queryMatchers = {
                    "min-width": function(element, value, units) {
                        var el = element,
                            px = convertToPx(el, value, units);
                        return value && el && el.offsetWidth >= px
                    },
                    "max-width": function(element, value, units) {
                        var el = element,
                            px = convertToPx(el, value, units);
                        return value && el && el.offsetWidth < px
                    }
                },
                classNameForRules = function(rules) {
                    for (var name = "query", i = 0, len = rules.length; i < len; i++) name += "_" + rules[i].property + "_" + rules[i].value + rules[i].units;
                    return name
                },
                convertToPx = function(element, value, units) {
                    switch (units) {
                        case "px":
                            return value;
                        case "em":
                            return value * getEmSize(element);
                        case "rem":
                            return value * getEmSize();
                        case "vw":
                            return value * document.documentElement.clientWidth / 100;
                        case "vh":
                            return value * document.documentElement.clientHeight / 100;
                        case "vmin":
                        case "vmax":
                            var vw = document.documentElement.clientWidth / 100,
                                vh = document.documentElement.clientHeight / 100;
                            return value * (0, Math["vmin" === units ? "min" : "max"])(vw, vh);
                        default:
                            return value
                    }
                },
                getEmSize = function(element) {
                    return element || (element = document.documentElement), window.getComputedStyle ? parseFloat(getComputedStyle(element).fontSize) || 16 : 16
                },
                elementMatchesRules = function(element, rules) {
                    for (var i = rules.length - 1; i > -1; i--) {
                        var rule = rules[i],
                            matcher = queryMatchers[rule.property];
                        if (matcher && !matcher(element, rule.value, rule.units)) return !1
                    }
                    return !0
                },
                loader = {
                    loadStyleSheets: function(sheets, callback) {
                        for (var completed = 0, i = 0, len = sheets.length; i < len; i++) this.loadStyleSheet(sheets[i], function() {
                            (completed += 1) === len && callback && callback()
                        })
                    },
                    loadStyleSheet: function(sheet, callback) {
                        if ("STYLE" === sheet.ownerNode.nodeName && "js-media-query-css" === sheet.ownerNode.id) {
                            var result = elementQuery.parser.parseStyleText(sheet.ownerNode.innerHTML);
                            sheet.ownerNode.innerHTML += result.newCss, elementQuery.queries = elementQuery.queries.concat(result.queries), callback && callback()
                        }
                    }
                },
                elementQuery = {
                    autoInit: !0,
                    init: function() {
                        var evaluated = !1;
                        this.loader.loadStyleSheets(document.styleSheets, function() {
                            evaluated = !0, elementQuery.evaluateQueries()
                        }), evaluated || elementQuery.evaluateQueries()
                    },
                    evaluateQueries: function(context) {
                        context = context || document;
                        for (var queries = this.queries, i = 0, len = queries.length; i < len; i++)
                            for (var elements = context.querySelectorAll(queries[i].selector), j = 0; j < elements.length; j++) {
                                var element = elements[j];
                                elementMatchesRules(element, queries[i].rules) ? element.classList.add(queries[i].className) : element.classList.remove(queries[i].className)
                            }
                    },
                    queryMatchers: queryMatchers,
                    queries: [],
                    classNameForRules: classNameForRules,
                    loader: loader
                };
            return window.addEventListener("resize", function() {
                elementQuery.evaluateQueries()
            }, !1), window.addEventListener("load", function() {
                elementQuery.autoInit && (elementQuery.init(), setTimeout(function() {
                    elementQuery.evaluateQueries()
                }, 1e3))
            }), elementQuery
        }(),
        function(elementQuery) {
            var STATEMENT_END_OR_START_PATTERN = /\s*(?:(\})|(@\S+\s+[^;{]+;)|(?:([^{}]+)\{))/g,
                QUERY_PATTERN = /:media\s*\(([^)]*)\)/g,
                QUERY_RULES_PATTERN = /\(?([^\s:]+):\s*(\d+(?:\.\d+)?)(px|em|rem|vw|vh|vmin|vmax)\)?/g,
                WHITESPACE_PATTERN = /^\s*$/;
            elementQuery.parser = {
                parseStyleText: function(styleText) {
                    var newText = "",
                        queries = [];
                    return this.parseText(styleText, {
                        mediaQuery: function(selector) {
                            newText += "\n" + selector + "{"
                        },
                        endMediaQuery: function() {
                            newText += "\n}"
                        },
                        rule: function(selector, properties) {
                            for (var i = 0, len = selector.length; i < len; i++) {
                                for (var single = selector[i], selectorSoFar = "", j = 0, lenj = single.length; j < lenj; j += 2) {
                                    selectorSoFar += single[j];
                                    var rules = single[j + 1];
                                    if (rules) {
                                        var queryClass = elementQuery.classNameForRules(rules);
                                        queries.push({
                                            selector: selectorSoFar,
                                            rules: rules,
                                            className: queryClass
                                        }), selectorSoFar += "." + queryClass
                                    }
                                }
                                newText += selectorSoFar + (i < len - 1 ? "," : "")
                            }
                            newText += " {" + properties + "}"
                        }
                    }), {
                        queries: queries,
                        newCss: newText
                    }
                },
                parseText: function(styleText, callbacks) {
                    callbacks = callbacks || {};
                    for (var text = styleText.replace(/(\/\*)[\s\S]*?(\*\/)/g, ""); match = STATEMENT_END_OR_START_PATTERN.exec(text);)
                        if (match[1]) callbacks.endMediaQuery && callbacks.endMediaQuery();
                        else {
                            var selector = match[3];
                            if (selector)
                                if ("@media" === selector.slice(0, 6)) callbacks.mediaQuery && callbacks.mediaQuery(selector);
                                else {
                                    var closingIndex = text.indexOf("}", match.index);
                                    if ("@" !== selector[0]) {
                                        var content = text.slice(match.index + match[0].length, closingIndex);
                                        this.parseRule(selector, content, callbacks.rule)
                                    }
                                    STATEMENT_END_OR_START_PATTERN.lastIndex = closingIndex + 1
                                }
                        }
                },
                parseRule: function(selector, content, callback) {
                    var parsedSelector = this.parseSelector(selector);
                    parsedSelector && callback && callback(parsedSelector, content)
                },
                parseSelector: function(selector) {
                    for (var parsed = [], parts = selector.split(","), i = 0, len = parts.length; i < len; i++) {
                        var result = this.parseSingleSelector(parts[i]);
                        result.length > 1 && parsed.push(result)
                    }
                    return parsed.length ? parsed : null
                },
                parseSingleSelector: function(selector) {
                    for (var parsed = [], lastIndex = 0; queryMatch = QUERY_PATTERN.exec(selector);) {
                        var selectorChunk = selector.slice(lastIndex, queryMatch.index);
                        lastIndex = QUERY_PATTERN.lastIndex;
                        var queryData = this.parseQuery(queryMatch[1]);
                        parsed.push(selectorChunk), parsed.push(queryData)
                    }
                    var remaining = selector.slice(lastIndex);
                    return WHITESPACE_PATTERN.test(remaining) || parsed.push(remaining), QUERY_PATTERN.lastIndex = 0, parsed
                },
                parseQuery: function(queryString) {
                    for (var ruleMatch, rules = []; ruleMatch = QUERY_RULES_PATTERN.exec(queryString);) rules.push({
                        property: ruleMatch[1],
                        value: parseFloat(ruleMatch[2]),
                        units: ruleMatch[3]
                    });
                    return rules
                }
            }
        }(elementQuery),
        function($) {
            "use strict";
            $.exists = function(selector) {
                return $(selector).length > 0
            }, $.getCachedScript = function(url) {
                var options = {
                    dataType: "script",
                    cache: !0,
                    url: url
                };
                return $.ajax(options)
            }, $.fn.mk_imagesLoaded = function() {
                var $imgs = this.find('img[src!=""]');
                if (!$imgs.length) return $.Deferred().resolve().promise();
                var dfds = [];
                return $imgs.each(function() {
                    var dfd = $.Deferred();
                    dfds.push(dfd);
                    var img = new Image;
                    img.onload = function() {
                        dfd.resolve()
                    }, img.onerror = function() {
                        dfd.resolve()
                    }, img.src = this.src
                }), $.when.apply($, dfds)
            }
        }(jQuery),
        function() {
            function resetTriggers(element) {
                var triggers = element.__resizeTriggers__,
                    expand = triggers.firstElementChild,
                    contract = triggers.lastElementChild,
                    expandChild = expand.firstElementChild;
                contract.scrollLeft = contract.scrollWidth, contract.scrollTop = contract.scrollHeight, expandChild.style.width = expand.offsetWidth + 1 + "px", expandChild.style.height = expand.offsetHeight + 1 + "px", expand.scrollLeft = expand.scrollWidth, expand.scrollTop = expand.scrollHeight
            }

            function checkTriggers(element) {
                return element.offsetWidth != element.__resizeLast__.width || element.offsetHeight != element.__resizeLast__.height
            }

            function scrollListener(e) {
                var element = this;
                resetTriggers(this), this.__resizeRAF__ && cancelFrame(this.__resizeRAF__), this.__resizeRAF__ = requestFrame(function() {
                    checkTriggers(element) && (element.__resizeLast__.width = element.offsetWidth, element.__resizeLast__.height = element.offsetHeight, element.__resizeListeners__.forEach(function(fn) {
                        fn.call(element, e)
                    }))
                })
            }

            function createStyles() {
                if (!stylesCreated) {
                    var css = (animationKeyframes || "") + ".resize-triggers { " + (animationStyle || "") + 'visibility: hidden; opacity: 0; } .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',
                        head = document.head || document.getElementsByTagName("head")[0],
                        style = document.createElement("style");
                    style.type = "text/css", style.styleSheet ? style.styleSheet.cssText = css : style.appendChild(document.createTextNode(css)), head.appendChild(style), stylesCreated = !0
                }
            }
            var attachEvent = document.attachEvent,
                stylesCreated = !1;
            if (!attachEvent) {
                var requestFrame = function() {
                        var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(fn) {
                            return window.setTimeout(fn, 20)
                        };
                        return function(fn) {
                            return raf(fn)
                        }
                    }(),
                    cancelFrame = function() {
                        var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;
                        return function(id) {
                            return cancel(id)
                        }
                    }(),
                    animation = !1,
                    keyframeprefix = "",
                    animationstartevent = "animationstart",
                    domPrefixes = "Webkit Moz O ms".split(" "),
                    startEvents = "webkitAnimationStart animationstart oAnimationStart MSAnimationStart".split(" "),
                    pfx = "",
                    elm = document.createElement("fakeelement");
                if (void 0 !== elm.style.animationName && (animation = !0), !1 === animation)
                    for (var i = 0; i < domPrefixes.length; i++)
                        if (void 0 !== elm.style[domPrefixes[i] + "AnimationName"]) {
                            pfx = domPrefixes[i], pfx + "Animation", keyframeprefix = "-" + pfx.toLowerCase() + "-", animationstartevent = startEvents[i], animation = !0;
                            break
                        }
                var animationName = "resizeanim",
                    animationKeyframes = "@" + keyframeprefix + "keyframes " + animationName + " { from { opacity: 0; } to { opacity: 0; } } ",
                    animationStyle = keyframeprefix + "animation: 1ms " + animationName + "; "
            }
            window.addResizeListener = function(element, fn) {
                attachEvent ? element.attachEvent("onresize", fn) : (element.__resizeTriggers__ || ("static" == getComputedStyle(element).position && (element.style.position = "relative"), createStyles(), element.__resizeLast__ = {}, element.__resizeListeners__ = [], (element.__resizeTriggers__ = document.createElement("div")).className = "resize-triggers", element.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div><div class="contract-trigger"></div>', element.appendChild(element.__resizeTriggers__), resetTriggers(element), element.addEventListener("scroll", scrollListener, !0), animationstartevent && element.__resizeTriggers__.addEventListener(animationstartevent, function(e) {
                    e.animationName == animationName && resetTriggers(element)
                })), element.__resizeListeners__.push(fn))
            }, window.removeResizeListener = function(element, fn) {
                attachEvent ? element.detachEvent("onresize", fn) : (element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1), element.__resizeListeners__.length || (element.removeEventListener("scroll", scrollListener), element.__resizeTriggers__ = !element.removeChild(element.__resizeTriggers__)))
            }
        }(),
        function(window, document) {
            function addStyleSheet(ownerDocument, cssText) {
                var p = ownerDocument.createElement("p"),
                    parent = ownerDocument.getElementsByTagName("head")[0] || ownerDocument.documentElement;
                return p.innerHTML = "x<style>" + cssText + "</style>", parent.insertBefore(p.lastChild, parent.firstChild)
            }

            function getElements() {
                var elements = html5.elements;
                return "string" == typeof elements ? elements.split(" ") : elements
            }

            function addElements(newElements, ownerDocument) {
                var elements = html5.elements;
                "string" != typeof elements && (elements = elements.join(" ")), "string" != typeof newElements && (newElements = newElements.join(" ")), html5.elements = elements + " " + newElements, shivDocument(ownerDocument)
            }

            function getExpandoData(ownerDocument) {
                var data = expandoData[ownerDocument[expando]];
                return data || (data = {}, expanID++, ownerDocument[expando] = expanID, expandoData[expanID] = data), data
            }

            function createElement(nodeName, ownerDocument, data) {
                if (ownerDocument || (ownerDocument = document), supportsUnknownElements) return ownerDocument.createElement(nodeName);
                data || (data = getExpandoData(ownerDocument));
                var node;
                return node = data.cache[nodeName] ? data.cache[nodeName].cloneNode() : saveClones.test(nodeName) ? (data.cache[nodeName] = data.createElem(nodeName)).cloneNode() : data.createElem(nodeName), !node.canHaveChildren || reSkip.test(nodeName) || node.tagUrn ? node : data.frag.appendChild(node)
            }

            function createDocumentFragment(ownerDocument, data) {
                if (ownerDocument || (ownerDocument = document), supportsUnknownElements) return ownerDocument.createDocumentFragment();
                data = data || getExpandoData(ownerDocument);
                for (var clone = data.frag.cloneNode(), i = 0, elems = getElements(), l = elems.length; i < l; i++) clone.createElement(elems[i]);
                return clone
            }

            function shivMethods(ownerDocument, data) {
                data.cache || (data.cache = {}, data.createElem = ownerDocument.createElement, data.createFrag = ownerDocument.createDocumentFragment, data.frag = data.createFrag()), ownerDocument.createElement = function(nodeName) {
                    return html5.shivMethods ? createElement(nodeName, ownerDocument, data) : data.createElem(nodeName)
                }, ownerDocument.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + getElements().join().replace(/[\w\-:]+/g, function(nodeName) {
                    return data.createElem(nodeName), data.frag.createElement(nodeName), 'c("' + nodeName + '")'
                }) + ");return n}")(html5, data.frag)
            }

            function shivDocument(ownerDocument) {
                ownerDocument || (ownerDocument = document);
                var data = getExpandoData(ownerDocument);
                return !html5.shivCSS || supportsHtml5Styles || data.hasCSS || (data.hasCSS = !!addStyleSheet(ownerDocument, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), supportsUnknownElements || shivMethods(ownerDocument, data), ownerDocument
            }
            var supportsHtml5Styles, supportsUnknownElements, options = window.html5 || {},
                reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                expando = "_html5shiv",
                expanID = 0,
                expandoData = {};
            ! function() {
                try {
                    var a = document.createElement("a");
                    a.innerHTML = "<xyz></xyz>", supportsHtml5Styles = "hidden" in a, supportsUnknownElements = 1 == a.childNodes.length || function() {
                        document.createElement("a");
                        var frag = document.createDocumentFragment();
                        return void 0 === frag.cloneNode || void 0 === frag.createDocumentFragment || void 0 === frag.createElement
                    }()
                } catch (e) {
                    supportsHtml5Styles = !0, supportsUnknownElements = !0
                }
            }();
            var html5 = {
                elements: options.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",
                version: "3.7.3",
                shivCSS: !1 !== options.shivCSS,
                supportsUnknownElements: supportsUnknownElements,
                shivMethods: !1 !== options.shivMethods,
                type: "default",
                shivDocument: shivDocument,
                createElement: createElement,
                createDocumentFragment: createDocumentFragment,
                addElements: addElements
            };
            window.html5 = html5, shivDocument(document), "object" == typeof module && module.exports && (module.exports = html5)
        }("undefined" != typeof window ? window : this, document), window.matchMedia || (window.matchMedia = function() {
            "use strict";
            var styleMedia = window.styleMedia || window.media;
            if (!styleMedia) {
                var style = document.createElement("style"),
                    script = document.getElementsByTagName("script")[0],
                    info = null;
                style.type = "text/css", style.id = "matchmediajs-test", script.parentNode.insertBefore(style, script), info = "getComputedStyle" in window && window.getComputedStyle(style, null) || style.currentStyle, styleMedia = {
                    matchMedium: function(media) {
                        var text = "@media " + media + "{ #matchmediajs-test { width: 1px; } }";
                        return style.styleSheet ? style.styleSheet.cssText = text : style.textContent = text, "1px" === info.width
                    }
                }
            }
            return function(media) {
                return {
                    matches: styleMedia.matchMedium(media || "all"),
                    media: media || "all"
                }
            }
        }()),
        function(global) {
            "use strict";

            function noop() {}

            function safeActiveElement() {
                try {
                    return document.activeElement
                } catch (err) {}
            }

            function inArray(arr, item) {
                for (var i = 0, len = arr.length; i < len; i++)
                    if (arr[i] === item) return !0;
                return !1
            }

            function addEventListener(elem, event, fn) {
                return elem.addEventListener ? elem.addEventListener(event, fn, !1) : elem.attachEvent ? elem.attachEvent("on" + event, fn) : void 0
            }

            function moveCaret(elem, index) {
                var range;
                elem.createTextRange ? (range = elem.createTextRange(), range.move("character", index), range.select()) : elem.selectionStart && (elem.focus(), elem.setSelectionRange(index, index))
            }

            function changeType(elem, type) {
                try {
                    return elem.type = type, !0
                } catch (e) {
                    return !1
                }
            }

            function handleElem(node, callback) {
                if (node && node.getAttribute(ATTR_CURRENT_VAL)) callback(node);
                else
                    for (var elem, handleInputs = node ? node.getElementsByTagName("input") : inputs, handleTextareas = node ? node.getElementsByTagName("textarea") : textareas, handleInputsLength = handleInputs ? handleInputs.length : 0, handleTextareasLength = handleTextareas ? handleTextareas.length : 0, len = handleInputsLength + handleTextareasLength, i = 0; i < len; i++) elem = i < handleInputsLength ? handleInputs[i] : handleTextareas[i - handleInputsLength], callback(elem)
            }

            function disablePlaceholders(node) {
                handleElem(node, hidePlaceholder)
            }

            function enablePlaceholders(node) {
                handleElem(node, showPlaceholder)
            }

            function hidePlaceholder(elem, keydownValue) {
                var valueChanged = !!keydownValue && elem.value !== keydownValue,
                    isPlaceholderValue = elem.value === elem.getAttribute(ATTR_CURRENT_VAL);
                if ((valueChanged || isPlaceholderValue) && "true" === elem.getAttribute(ATTR_ACTIVE)) {
                    elem.removeAttribute(ATTR_ACTIVE), elem.value = elem.value.replace(elem.getAttribute(ATTR_CURRENT_VAL), ""), elem.className = elem.className.replace(classNameRegExp, "");
                    var maxLength = elem.getAttribute(ATTR_MAXLENGTH);
                    parseInt(maxLength, 10) >= 0 && (elem.setAttribute("maxLength", maxLength), elem.removeAttribute(ATTR_MAXLENGTH));
                    var type = elem.getAttribute(ATTR_INPUT_TYPE);
                    return type && (elem.type = type), !0
                }
                return !1
            }

            function showPlaceholder(elem) {
                var val = elem.getAttribute(ATTR_CURRENT_VAL);
                if ("" === elem.value && val) {
                    elem.setAttribute(ATTR_ACTIVE, "true"), elem.value = val, elem.className += " " + placeholderClassName;
                    elem.getAttribute(ATTR_MAXLENGTH) || (elem.setAttribute(ATTR_MAXLENGTH, elem.maxLength), elem.removeAttribute("maxLength"));
                    return elem.getAttribute(ATTR_INPUT_TYPE) ? elem.type = "text" : "password" === elem.type && changeType(elem, "text") && elem.setAttribute(ATTR_INPUT_TYPE, "password"), !0
                }
                return !1
            }

            function makeFocusHandler(elem) {
                return function() {
                    hideOnInput && elem.value === elem.getAttribute(ATTR_CURRENT_VAL) && "true" === elem.getAttribute(ATTR_ACTIVE) ? moveCaret(elem, 0) : hidePlaceholder(elem)
                }
            }

            function makeBlurHandler(elem) {
                return function() {
                    showPlaceholder(elem)
                }
            }

            function makeSubmitHandler(form) {
                return function() {
                    disablePlaceholders(form)
                }
            }

            function makeKeydownHandler(elem) {
                return function(e) {
                    if (keydownVal = elem.value, "true" === elem.getAttribute(ATTR_ACTIVE) && keydownVal === elem.getAttribute(ATTR_CURRENT_VAL) && inArray(badKeys, e.keyCode)) return e.preventDefault && e.preventDefault(), !1
                }
            }

            function makeKeyupHandler(elem) {
                return function() {
                    hidePlaceholder(elem, keydownVal), "" === elem.value && (elem.blur(), moveCaret(elem, 0))
                }
            }

            function makeClickHandler(elem) {
                return function() {
                    elem === safeActiveElement() && elem.value === elem.getAttribute(ATTR_CURRENT_VAL) && "true" === elem.getAttribute(ATTR_ACTIVE) && moveCaret(elem, 0)
                }
            }

            function newElement(elem) {
                var form = elem.form;
                form && "string" == typeof form && (form = document.getElementById(form), form.getAttribute(ATTR_FORM_HANDLED) || (addEventListener(form, "submit", makeSubmitHandler(form)), form.setAttribute(ATTR_FORM_HANDLED, "true"))), addEventListener(elem, "focus", makeFocusHandler(elem)), addEventListener(elem, "blur", makeBlurHandler(elem)), hideOnInput && (addEventListener(elem, "keydown", makeKeydownHandler(elem)), addEventListener(elem, "keyup", makeKeyupHandler(elem)), addEventListener(elem, "click", makeClickHandler(elem))), elem.setAttribute(ATTR_EVENTS_BOUND, "true"), elem.setAttribute(ATTR_CURRENT_VAL, placeholder), (hideOnInput || elem !== safeActiveElement()) && showPlaceholder(elem)
            }
            var test = document.createElement("input"),
                nativeSupport = void 0 !== test.placeholder;
            if (global.Placeholders = {
                    nativeSupport: nativeSupport,
                    disable: nativeSupport ? noop : disablePlaceholders,
                    enable: nativeSupport ? noop : enablePlaceholders
                }, !nativeSupport) {
                var keydownVal, validTypes = ["text", "search", "url", "tel", "email", "password", "number", "textarea"],
                    badKeys = [27, 33, 34, 35, 36, 37, 38, 39, 40, 8, 46],
                    placeholderClassName = "placeholdersjs",
                    classNameRegExp = new RegExp("(?:^|\\s)" + placeholderClassName + "(?!\\S)"),
                    ATTR_CURRENT_VAL = "data-placeholder-value",
                    ATTR_ACTIVE = "data-placeholder-active",
                    ATTR_INPUT_TYPE = "data-placeholder-type",
                    ATTR_FORM_HANDLED = "data-placeholder-submit",
                    ATTR_EVENTS_BOUND = "data-placeholder-bound",
                    ATTR_MAXLENGTH = "data-placeholder-maxlength",
                    head = document.getElementsByTagName("head")[0],
                    root = document.documentElement,
                    Placeholders = global.Placeholders,
                    inputs = document.getElementsByTagName("input"),
                    textareas = document.getElementsByTagName("textarea"),
                    hideOnInput = "false" === root.getAttribute("data-placeholder-focus"),
                    liveUpdates = "false" !== root.getAttribute("data-placeholder-live"),
                    styleElem = document.createElement("style");
                styleElem.type = "text/css";
                var styleRules = document.createTextNode("." + placeholderClassName + " {color:#ccc;}");
                styleElem.styleSheet ? styleElem.styleSheet.cssText = styleRules.nodeValue : styleElem.appendChild(styleRules), head.insertBefore(styleElem, head.firstChild);
                for (var placeholder, elem, i = 0, len = inputs.length + textareas.length; i < len; i++) elem = i < inputs.length ? inputs[i] : textareas[i - inputs.length], (placeholder = elem.attributes.placeholder) && (placeholder = placeholder.nodeValue) && inArray(validTypes, elem.type) && newElement(elem);
                var timer = setInterval(function() {
                    for (var i = 0, len = inputs.length + textareas.length; i < len; i++) elem = i < inputs.length ? inputs[i] : textareas[i - inputs.length], placeholder = elem.attributes.placeholder, placeholder ? (placeholder = placeholder.nodeValue) && inArray(validTypes, elem.type) && (elem.getAttribute(ATTR_EVENTS_BOUND) || newElement(elem), (placeholder !== elem.getAttribute(ATTR_CURRENT_VAL) || "password" === elem.type && !elem.getAttribute(ATTR_INPUT_TYPE)) && ("password" === elem.type && !elem.getAttribute(ATTR_INPUT_TYPE) && changeType(elem, "text") && elem.setAttribute(ATTR_INPUT_TYPE, "password"), elem.value === elem.getAttribute(ATTR_CURRENT_VAL) && (elem.value = placeholder), elem.setAttribute(ATTR_CURRENT_VAL, placeholder))) : elem.getAttribute(ATTR_ACTIVE) && (hidePlaceholder(elem), elem.removeAttribute(ATTR_CURRENT_VAL));
                    liveUpdates || clearInterval(timer)
                }, 100);
                addEventListener(global, "beforeunload", function() {
                    Placeholders.disable()
                })
            }
        }(this),
        function() {
            var lastTime, vendors, x;
            for (lastTime = 0, vendors = ["webkit", "moz"], x = 0; x < vendors.length && !window.requestAnimationFrame;) window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"], ++x;
            window.requestAnimationFrame || (window.requestAnimationFrame = function(callback, element) {
                var currTime, id, timeToCall;
                return currTime = (new Date).getTime(), timeToCall = Math.max(0, 16 - (currTime - lastTime)), id = window.setTimeout(function() {
                    callback(currTime + timeToCall)
                }, timeToCall), lastTime = currTime + timeToCall, id
            }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(id) {
                clearTimeout(id)
            })
        }(),
        function($) {
            "use strict";
            var MK = window.MK || {};
            MK.core = {};
            var _loadedDependencies = [],
                _inQueue = {};
            MK.core.initAll = function(scope) {
                var $el = $(scope).find(".js-el"),
                    $components = $el.filter("[data-mk-component]"),
                    component = null,
                    init = function(name, el) {
                        var $el = $(el);
                        $el.data("init-" + name) || ("function" != typeof MK.component[name] ? console.log("Component init error: ", name) : (component = new MK.component[name](el), component.init(), $el.data("init-" + name, !0), MK.utils.eventManager.publish("component-inited")))
                    };
                $components.each(function() {
                    var self = this,
                        $this = $(this),
                        names = $this.data("mk-component");
                    if ("string" == typeof names) {
                        init(names, self)
                    } else names.forEach(function(name) {
                        init(name, self)
                    })
                })
            }, MK.core.loadDependencies = function(dependencies, callback) {
                var _callback = callback || function() {};
                if (!dependencies) return void _callback();
                var newDeps = dependencies.map(function(dep) {
                    return -1 === _loadedDependencies.indexOf(dep) && (void 0 === _inQueue[dep] ? dep : (_inQueue[dep].push(_callback), !0))
                });
                if (!0 !== newDeps[0]) {
                    if (!1 === newDeps[0]) return void _callback();
                    var queue = newDeps.map(function(script) {
                            return _inQueue[script] = [_callback], $.getCachedScript(script)
                        }),
                        onLoad = function() {
                            newDeps.map(function(loaded) {
                                _inQueue[loaded].forEach(function(callback) {
                                    callback()
                                }), delete _inQueue[loaded], _loadedDependencies.push(loaded)
                            })
                        };
                    $.when.apply(null, queue).done(onLoad)
                }
            }, MK.core.path = {
                theme: mk_theme_dir,
                plugins: mk_theme_js_path + "/plugins/async/min/",
                ajaxUrl: window.PHP.ajax
            }
        }(jQuery),
        function($) {
            "use strict";
            var MK = window.MK || {};
            MK.utils = window.MK.utils || {}, MK.utils.actions = {}, MK.utils.actions.activate = function(el) {
                $(el).addClass("is-active")
            }, MK.utils.actions.deactivate = function(el) {
                $(el).removeClass("is-active")
            }
        }(jQuery),
        function($) {
            "use strict";
            var MK = window.MK || {};
            MK.utils = window.MK.utils || {}, MK.utils.browser = function() {
                var dataBrowser = [{
                        string: navigator.userAgent,
                        subString: "Edge",
                        identity: "Edge"
                    }, {
                        string: navigator.userAgent,
                        subString: "Chrome",
                        identity: "Chrome"
                    }, {
                        string: navigator.userAgent,
                        subString: "MSIE",
                        identity: "IE"
                    }, {
                        string: navigator.userAgent,
                        subString: "Trident",
                        identity: "IE"
                    }, {
                        string: navigator.userAgent,
                        subString: "Firefox",
                        identity: "Firefox"
                    }, {
                        string: navigator.userAgent,
                        subString: "Safari",
                        identity: "Safari"
                    }, {
                        string: navigator.userAgent,
                        subString: "Opera",
                        identity: "Opera"
                    }],
                    versionSearchString = null,
                    searchVersion = function(dataString) {
                        var index = dataString.indexOf(versionSearchString);
                        if (-1 !== index) {
                            var rv = dataString.indexOf("rv:");
                            return "Trident" === versionSearchString && -1 !== rv ? parseFloat(dataString.substring(rv + 3)) : parseFloat(dataString.substring(index + versionSearchString.length + 1))
                        }
                    },
                    name = function(data) {
                        for (var i = 0; i < data.length; i++) {
                            var dataString = data[i].string;
                            if (versionSearchString = data[i].subString, -1 !== dataString.indexOf(data[i].subString)) return data[i].identity
                        }
                    }(dataBrowser) || "Other",
                    version = searchVersion(navigator.userAgent) || searchVersion(navigator.appVersion) || "Unknown";
                return $("html").addClass(name).addClass(name + version), {
                    name: name,
                    version: version
                }
            }(), MK.utils.OS = function() {
                return -1 != navigator.appVersion.indexOf("Win") ? "Windows" : -1 != navigator.appVersion.indexOf("Mac") ? "OSX" : -1 != navigator.appVersion.indexOf("X11") ? "UNIX" : -1 != navigator.appVersion.indexOf("Linux") ? "Linux" : void 0
            }(), MK.utils.isMobile = function() {
                return function() {
                    return navigator.userAgent.match(/Android/i)
                }() || function() {
                    return navigator.userAgent.match(/BlackBerry/i)
                }() || function() {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i)
                }() || function() {
                    return navigator.userAgent.match(/Opera Mini/i)
                }() || function() {
                    return navigator.userAgent.match(/IEMobile/i)
                }() || matchMedia("(max-width: 1024px)").matches
            }, MK.utils.isResponsiveMenuState = function() {
                return window.matchMedia("(max-width: " + mk_responsive_nav_width + "px)").matches
            }, MK.utils.getUrlParameter = function(sParam) {
                var sParameterName, i, sPageURL = decodeURIComponent(window.location.search.substring(1)),
                    sURLVariables = sPageURL.split("&");
                for (i = 0; i < sURLVariables.length; i++)
                    if (sParameterName = sURLVariables[i].split("="), sParameterName[0] === sParam) return void 0 === sParameterName[1] || sParameterName[1]
            }, MK.utils.isSmoothScroll = function() {
                return "true" === mk_smooth_scroll
            }()
        }(jQuery),
        function($) {
            "use strict";
            var MK = window.MK || {};
            MK.utils = window.MK.utils || {}, MK.utils.eventManager = {}, MK.utils.eventManager.subscribe = function(evt, func) {
                $(this).on(evt, func)
            }, MK.utils.eventManager.unsubscribe = function(evt, func) {
                $(this).off(evt, func)
            }, MK.utils.eventManager.publish = function(evt, params) {
                $(this).trigger(evt, [params])
            }
        }(jQuery),
        function($) {
            "use strict";
            var MK = window.MK || {};
            MK.utils = window.MK.utils || {}, MK.utils.fullscreen = {}, MK.utils.launchIntoFullscreen = function(element) {
                element.requestFullscreen ? element.requestFullscreen() : element.mozRequestFullScreen ? element.mozRequestFullScreen() : element.webkitRequestFullscreen ? element.webkitRequestFullscreen() : element.msRequestFullscreen && element.msRequestFullscreen()
            }, MK.utils.exitFullscreen = function() {
                document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()
            }
        }(jQuery),
        function($) {
            "use strict";
            var MK = window.MK || {};
            MK.utils = window.MK.utils || {}, MK.utils.misc = {}, MK.utils.offsets = function($els) {
                return $.map($els, function(el) {
                    return $(el).offset().top
                })
            }, MK.utils.nextHigherVal = function(val, arr) {
                var i = 0,
                    higher = null,
                    check = function() {
                        val > arr[i] ? (i += 1, check()) : higher = arr[i]
                    };
                return check(), higher
            }, MK.utils.throttle = function(delay, fn) {
                var last, deferTimer;
                return function() {
                    var context = this,
                        args = arguments,
                        now = +new Date;
                    last && now < last + delay ? (clearTimeout(deferTimer), deferTimer = setTimeout(function() {
                        last = now, fn.apply(context, args)
                    }, delay)) : (last = now, fn.apply(context, args))
                }
            }, MK.utils.isElementInViewport = function(el) {
                return el.getBoundingClientRect().top < window.innerHeight
            }
        }(jQuery),
        function($) {
            "use strict";
            var MK = window.MK || {};
            MK.utils = window.MK.utils || {}, MK.utils.scrollTo = function(offset) {
                $("html, body").stop().animate({
                    scrollTop: offset
                }, {
                    duration: 1200,
                    easing: "easeInOutExpo"
                })
            }, MK.utils.scrollToAnchor = function(hash) {
                var $target = $(hash);
                if ($target.length) {
                    var offset = $target.offset().top;
                    offset -= MK.val.offsetHeaderHeight(offset), "#top-of-page" === hash ? window.history.replaceState(void 0, void 0, " ") : window.history.replaceState(void 0, void 0, hash), MK.utils.scrollTo(offset)
                }
            }, MK.utils.scroll = function() {
                function preventDefault(e) {
                    e = e || window.event, e.preventDefault(), e.returnValue = !1
                }

                function wheel(e) {
                    preventDefault(e)
                }

                function keydown(e) {
                    for (var i = keys.length; i--;)
                        if (e.keyCode === keys[i]) return void preventDefault(e)
                }

                function disableScroll() {
                    window.addEventListener && window.addEventListener("DOMMouseScroll", wheel, !1), window.onmousewheel = document.onmousewheel = wheel, document.onkeydown = keydown
                }

                function enableScroll() {
                    window.removeEventListener && window.removeEventListener("DOMMouseScroll", wheel, !1), window.onmousewheel = document.onmousewheel = document.onkeydown = null
                }
                var keys = [38, 40];
                return {
                    disable: disableScroll,
                    enable: enableScroll
                }
            }(), MK.utils.detectAnchor = function(el) {
                var $this = $(el),
                    loc = window.location,
                    href = (loc.origin, loc.pathname, $this.attr("href")),
                    linkSplit = href ? href.split("#") : "",
                    hrefHash = (linkSplit[0] && linkSplit[0], linkSplit[1] ? linkSplit[1] : "");
                return void 0 !== hrefHash && "" !== hrefHash && "#" + hrefHash
            }, MK.utils.scrollToURLHash = function() {
                var loc = window.location,
                    hash = loc.hash;
                hash.length && hash.substring(1).length && (hash = hash.replace("!loading", ""), setTimeout(function() {
                    MK.utils.scrollToAnchor(hash)
                }, 1e3), setTimeout(function() {
                    window.history.replaceState(void 0, void 0, hash)
                }, 1001))
            }, MK.utils.scrollSpy = function(toSpy, config) {
                var $window = $(window),
                    container = document.getElementById("mk-theme-container"),
                    isObj = "object" == typeof toSpy,
                    offset = isObj ? MK.val.dynamicOffset(toSpy, config.position, config.threshold) : function() {
                        return toSpy
                    },
                    height = isObj ? MK.val.dynamicHeight(toSpy) : function() {
                        return 0
                    },
                    cacheVals = {},
                    _p = "before",
                    checkPosition = function() {
                        var s = MK.val.scroll(),
                            o = offset(),
                            h = height();
                        s < o && "before" !== _p ? (config.before && config.before(), _p = "before") : s >= o && s <= o + h && "active" !== _p ? (config.active && config.active(o), _p = "active") : s > o + h && "after" !== _p && (config.after && config.after(o + h), _p = "after")
                    },
                    rAF = function() {
                        window.requestAnimationFrame(checkPosition)
                    },
                    exportVals = function() {
                        return cacheVals
                    },
                    updateCache = function() {
                        var o = offset(),
                            h = height();
                        cacheVals = {
                            before: o - $window.height(),
                            active: o,
                            after: o + h
                        }
                    };
                config.cache && config.cache(exportVals), checkPosition(), $window.on("load", checkPosition), $window.on("resize", checkPosition), $window.on("mouseup", checkPosition), window.addResizeListener(container, checkPosition), $window.on("scroll", rAF), updateCache(), $window.on("load", updateCache), $window.on("resize", updateCache), window.addResizeListener(container, updateCache)
            }
        }(jQuery),
        function($) {
            "use strict";
            $("body").on("click", ".js-taphover", function(e) {
                var $link = $(e.currentTarget),
                    $target = $(e.target);
                if ($link.hasClass("hover")) return !0;
                MK.utils.isMobile() && (!$target.hasClass("hover-icon") && !$target.closest(".hover-icon").length || $target.closest(".js-taphover").hasClass("hover") || e.preventDefault(), $link.addClass("hover"), $(".js-taphover").not(e.currentTarget).removeClass("hover"), e.stopPropagation())
            }), $(document).on("click", function(e) {
                $(".js-taphover").removeClass("hover")
            })
        }(jQuery),
        function($) {
            "use strict";

            function calc() {
                wrapperHeight = $wrapper.height(), wrapperWidth = $wrapper.width(), wrapperAspectRatio = wrapperHeight / wrapperWidth * 100
            }

            function apply() {
                var width = wrapperAspectRatio / baseAspectRatio * 100,
                    widthOverflow = width - 100;
                $videoHolder.css({
                    "padding-top": wrapperAspectRatio + "%",
                    width: width + "%",
                    left: -widthOverflow / 2 + "%"
                })
            }

            function reset() {
                $videoHolder.css({
                    "padding-top": baseAspectRatio + "%",
                    width: "100%",
                    left: 0
                })
            }

            function setCover() {
                reset(), calc(), wrapperAspectRatio > baseAspectRatio && apply()
            }
            var wrapperHeight, wrapperWidth, wrapperAspectRatio, $videoHolder = $(".mk-center-video"),
                $wrapper = $videoHolder.parent(),
                baseAspectRatio = 56.25;
            $(window).on("load", setCover), $(window).on("resize", setCover)
        }(jQuery),
        function($) {
            "use strict";
            var MK = window.MK || {};
            MK.val = {}, MK.val.scroll = function() {
                var offset = 0,
                    $window = $(window),
                    hasPageYOffset = void 0 !== window.pageYOffset,
                    body = document.documentElement || document.body.parentNode || document.body,
                    update = function() {
                        offset = hasPageYOffset ? window.pageYOffset : body.scrollTop
                    },
                    rAF = function() {
                        window.requestAnimationFrame(update)
                    };
                return update(), $window.on("load", update), $window.on("resize", update), $window.on("scroll", rAF),
                    function() {
                        return offset
                    }
            }(), MK.val.viewportPercentHeight = function(percent) {
                return $(window).height() * (percent / 100)
            }, MK.val.adminbarHeight = function() {
                return php.hasAdminbar ? window.matchMedia("( max-width: 782px )").matches ? 46 : 32 : 0
            }, MK.val.stickyOffset = function() {
                var $header = $(".mk-header").not(".js-header-shortcode").first();
                if (!$header.length) return function() {
                    return 0
                };
                var $toolbar = $header.find(".mk-header-toolbar"),
                    config = $header.data(),
                    hasToolbar = $toolbar.length,
                    toolbarHeight = hasToolbar ? $toolbar.height() : 0,
                    isVertical = 4 === config.headerStyle,
                    headerHeight = isVertical ? 0 : config.height,
                    type = "number" == typeof config.stickyOffset && "number" || "header" === config.stickyOffset && "header" || "percent",
                    stickyOffset = 0,
                    setOffset = function() {
                        toolbarHeight = hasToolbar ? $toolbar.height() : 0, MK.utils.isResponsiveMenuState() && (headerHeight = config.responsiveHeight, hasToolbar && $toolbar.is(":hidden") && (toolbarHeight = 0)), "number" === type ? stickyOffset = config.stickyOffset : "header" === type ? stickyOffset = headerHeight + toolbarHeight + MK.val.adminbarHeight() : "percent" === type && (stickyOffset = MK.val.viewportPercentHeight(parseInt(config.stickyOffset)))
                    };
                return setOffset(), $(window).on("resize", setOffset),
                    function() {
                        return stickyOffset
                    }
            }(), MK.val.offsetHeaderHeight = function() {
                var $header = $(".mk-header").not(".js-header-shortcode").first();
                if (!$header.length) return function() {
                    return 0
                };
                var $toolbar = $header.find(".mk-header-toolbar"),
                    config = $header.data(),
                    stickyHeight = config.stickyHeight,
                    desktopHeight = config.height,
                    mobileHeight = config.responsiveHeight,
                    isTransparent = $header.hasClass("transparent-header"),
                    isSticky = config.stickyStyle.length,
                    isStickyLazy = "lazy" === config.stickyStyle,
                    isVertical = 4 === config.headerStyle,
                    hasToolbar = $toolbar.length,
                    toolbarHeight = hasToolbar ? $toolbar.height() : 0,
                    $innerHeader = $header.find(".mk-header-inner"),
                    headerHeight = ($innerHeader.length, function(offset) {
                        toolbarHeight = hasToolbar ? $toolbar.height() : 0;
                        var stickyOffset = MK.val.stickyOffset();
                        if (MK.utils.isResponsiveMenuState()) {
                            hasToolbar && $toolbar.is(":hidden") && (toolbarHeight = 0);
                            var headerBorder = 0;
                            headerBorder = parseInt($innerHeader.css("border-bottom-width"));
                            var totalHeight = mobileHeight + MK.val.adminbarHeight() + toolbarHeight + headerBorder;
                            return offset <= totalHeight ? totalHeight : MK.val.adminbarHeight()
                        }
                        if (offset <= stickyOffset) return isVertical ? hasToolbar ? toolbarHeight + MK.val.adminbarHeight() : MK.val.adminbarHeight() : isTransparent ? MK.val.adminbarHeight() : desktopHeight + toolbarHeight + MK.val.adminbarHeight();
                        if (offset > stickyOffset) {
                            if (isVertical) return MK.val.adminbarHeight();
                            if (!isSticky) return MK.val.adminbarHeight();
                            if (isStickyLazy) return MK.val.adminbarHeight();
                            if (isSticky) return stickyHeight + MK.val.adminbarHeight()
                        }
                        return 0
                    });
                return function(offset) {
                    return headerHeight(offset - MK.val.adminbarHeight())
                }
            }(), MK.val.dynamicOffset = function(el, position, threshold) {
                var $window = $(window),
                    $el = $(el),
                    pos = position || "top",
                    thr = threshold || 0,
                    container = document.getElementById("mk-theme-container"),
                    currentPos = 0,
                    offset = 0,
                    winH = 0,
                    rect = 0,
                    x = 0,
                    update = function() {
                        winH = $window.height(), rect = $el[0].getBoundingClientRect(), offset = rect.top + MK.val.scroll(), x = "top" === pos ? MK.val.offsetHeaderHeight(offset) : winH + (rect.height - thr), currentPos = offset - x - 1
                    };
                return update(), $window.on("load", update), $window.on("resize", update), window.addResizeListener(container, update),
                    function() {
                        return currentPos
                    }
            }, MK.val.dynamicHeight = function(el) {
                var $window = $(window),
                    $el = $(el),
                    container = document.getElementById("mk-theme-container"),
                    currentHeight = 0,
                    update = function() {
                        currentHeight = $el.outerHeight()
                    };
                return update(), $window.on("load", update), $window.on("resize", update), window.addResizeListener(container, update),
                    function() {
                        return currentHeight
                    }
            }
        }(jQuery), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
            def: "easeOutQuad",
            swing: function(a, b, c, d, e) {
                return jQuery.easing[jQuery.easing.def](a, b, c, d, e)
            },
            easeInQuad: function(a, b, c, d, e) {
                return d * (b /= e) * b + c
            },
            easeOutQuad: function(a, b, c, d, e) {
                return -d * (b /= e) * (b - 2) + c
            },
            easeInOutQuad: function(a, b, c, d, e) {
                return (b /= e / 2) < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
            },
            easeInCubic: function(a, b, c, d, e) {
                return d * (b /= e) * b * b + c
            },
            easeOutCubic: function(a, b, c, d, e) {
                return d * ((b = b / e - 1) * b * b + 1) + c
            },
            easeInOutCubic: function(a, b, c, d, e) {
                return (b /= e / 2) < 1 ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c
            },
            easeInQuart: function(a, b, c, d, e) {
                return d * (b /= e) * b * b * b + c
            },
            easeOutQuart: function(a, b, c, d, e) {
                return -d * ((b = b / e - 1) * b * b * b - 1) + c
            },
            easeInOutQuart: function(a, b, c, d, e) {
                return (b /= e / 2) < 1 ? d / 2 * b * b * b * b + c : -d / 2 * ((b -= 2) * b * b * b - 2) + c
            },
            easeInQuint: function(a, b, c, d, e) {
                return d * (b /= e) * b * b * b * b + c
            },
            easeOutQuint: function(a, b, c, d, e) {
                return d * ((b = b / e - 1) * b * b * b * b + 1) + c
            },
            easeInOutQuint: function(a, b, c, d, e) {
                return (b /= e / 2) < 1 ? d / 2 * b * b * b * b * b + c : d / 2 * ((b -= 2) * b * b * b * b + 2) + c
            },
            easeInSine: function(a, b, c, d, e) {
                return -d * Math.cos(b / e * (Math.PI / 2)) + d + c
            },
            easeOutSine: function(a, b, c, d, e) {
                return d * Math.sin(b / e * (Math.PI / 2)) + c
            },
            easeInOutSine: function(a, b, c, d, e) {
                return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c
            },
            easeInExpo: function(a, b, c, d, e) {
                return 0 == b ? c : d * Math.pow(2, 10 * (b / e - 1)) + c
            },
            easeOutExpo: function(a, b, c, d, e) {
                return b == e ? c + d : d * (1 - Math.pow(2, -10 * b / e)) + c
            },
            easeInOutExpo: function(a, b, c, d, e) {
                return 0 == b ? c : b == e ? c + d : (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (2 - Math.pow(2, -10 * --b)) + c
            },
            easeInCirc: function(a, b, c, d, e) {
                return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c
            },
            easeOutCirc: function(a, b, c, d, e) {
                return d * Math.sqrt(1 - (b = b / e - 1) * b) + c
            },
            easeInOutCirc: function(a, b, c, d, e) {
                return (b /= e / 2) < 1 ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c : d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c
            },
            easeInElastic: function(a, b, c, d, e) {
                var f = 1.70158,
                    g = 0,
                    h = d;
                if (0 == b) return c;
                if (1 == (b /= e)) return c + d;
                if (g || (g = .3 * e), h < Math.abs(d)) {
                    h = d;
                    var f = g / 4
                } else var f = g / (2 * Math.PI) * Math.asin(d / h);
                return -h * Math.pow(2, 10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g) + c
            },
            easeOutElastic: function(a, b, c, d, e) {
                var f = 1.70158,
                    g = 0,
                    h = d;
                if (0 == b) return c;
                if (1 == (b /= e)) return c + d;
                if (g || (g = .3 * e), h < Math.abs(d)) {
                    h = d;
                    var f = g / 4
                } else var f = g / (2 * Math.PI) * Math.asin(d / h);
                return h * Math.pow(2, -10 * b) * Math.sin(2 * (b * e - f) * Math.PI / g) + d + c
            },
            easeInOutElastic: function(a, b, c, d, e) {
                var f = 1.70158,
                    g = 0,
                    h = d;
                if (0 == b) return c;
                if (2 == (b /= e / 2)) return c + d;
                if (g || (g = .3 * e * 1.5), h < Math.abs(d)) {
                    h = d;
                    var f = g / 4
                } else var f = g / (2 * Math.PI) * Math.asin(d / h);
                return b < 1 ? -.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g) + c : h * Math.pow(2, -10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g) * .5 + d + c
            },
            easeInBack: function(a, b, c, d, e, f) {
                return void 0 == f && (f = 1.70158), d * (b /= e) * b * ((f + 1) * b - f) + c
            },
            easeOutBack: function(a, b, c, d, e, f) {
                return void 0 == f && (f = 1.70158), d * ((b = b / e - 1) * b * ((f + 1) * b + f) + 1) + c
            },
            easeInOutBack: function(a, b, c, d, e, f) {
                return void 0 == f && (f = 1.70158), (b /= e / 2) < 1 ? d / 2 * b * b * ((1 + (f *= 1.525)) * b - f) + c : d / 2 * ((b -= 2) * b * ((1 + (f *= 1.525)) * b + f) + 2) + c
            },
            easeInBounce: function(a, b, c, d, e) {
                return d - jQuery.easing.easeOutBounce(a, e - b, 0, d, e) + c
            },
            easeOutBounce: function(a, b, c, d, e) {
                return (b /= e) < 1 / 2.75 ? 7.5625 * d * b * b + c : b < 2 / 2.75 ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : b < 2.5 / 2.75 ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
            },
            easeInOutBounce: function(a, b, c, d, e) {
                return b < e / 2 ? .5 * jQuery.easing.easeInBounce(a, 2 * b, 0, d, e) + c : .5 * jQuery.easing.easeOutBounce(a, 2 * b - e, 0, d, e) + .5 * d + c
            }
        }),
        function($, window, document, undefined) {
            function CustomMenu(element, options) {
                this.element = element, this.options = $.extend({}, defaults, options), this._defaults = defaults, this._name = pluginName, this.init()
            }
            var pluginName = "MegaMenu",
                defaults = {
                    propertyName: "value"
                },
                menus = [];
            CustomMenu.prototype = {
                isOpen: !1,
                timeout: null,
                init: function() {
                    var that = this;
                    $(this).each(function(index, menu) {
                        that.node = menu.element, that.addListeners(menu.element);
                        var $menu = $(menu.element);
                        $menu.addClass("dropdownJavascript"), menus.push(menu.element), $menu.find("ul > li").each(function(index, submenu) {
                            $(submenu).find("ul").length > 0 && $(submenu).addClass("with-menu")
                        })
                    })
                },
                addListeners: function(menu) {
                    var that = this;
                    $(menu).mouseover(function(e) {
                        that.handleMouseOver.call(that, e)
                    }).mouseout(function(e) {
                        that.handleMouseOut.call(that, e)
                    })
                },
                handleMouseOver: function(e) {
                    var that = this;
                    this.clearTimeout();
                    for (var item = e.target || e.srcElement;
                        "LI" != item.nodeName && item != this.node;) item = item.parentNode;
                    "LI" == item.nodeName && (this.toOpen = item, this.timeout = setTimeout(function() {
                        that.open.call(that)
                    }, this.options.delay))
                },
                handleMouseOut: function() {
                    var that = this;
                    this.clearTimeout();
                    var _delayOut = this.options.delay;
                    _delayOut = 400, this.timeout = setTimeout(function() {
                        that.close.call(that)
                    }, _delayOut)
                },
                clearTimeout: function() {
                    this.timeout && (clearTimeout(this.timeout), this.timeout = null)
                },
                open: function() {
                    var that = this;
                    this.isOpen = !0;
                    var items = $(this.toOpen).parent().children("li");
                    $(items).each(function(index, item) {
                        $(item).find("ul").each(function(index, submenu) {
                            if (item != that.toOpen) $(item).removeClass("dropdownOpen"), that.close(item);
                            else if (!$(item).hasClass("dropdownOpen")) {
                                $(item).addClass("dropdownOpen");
                                for (var left = 0, node = submenu; node;) left += Math.abs(node.offsetLeft), node = node.offsetParent;
                                var right = left + submenu.offsetWidth;
                                $(submenu).outerHeight(), $(submenu).offset().top, $(window).scrollTop(), window.innerHeight;
                                $(item).removeClass("dropdownRightToLeft"), left < 0 && $(item).addClass("dropdownLeftToRight"), right > document.body.clientWidth && $(item).addClass("dropdownRightToLeft")
                            }
                        })
                    })
                },
                close: function(node) {
                    node || (this.isOpen = !1, node = this.node), $(node).find("li").each(function(index, item) {
                        $(item).removeClass("dropdownOpen")
                    })
                }
            }, $.fn[pluginName] = function(options) {
                return this.each(function() {
                    $.data(this, "plugin_" + pluginName) || $.data(this, "plugin_" + pluginName, new CustomMenu(this, options))
                })
            }
        }(jQuery, window, document),
        function(window, document, undefined) {
            function is(obj, type) {
                return typeof obj === type
            }

            function cssToDOM(name) {
                return name.replace(/([a-z])-([a-z])/g, function(str, m1, m2) {
                    return m1 + m2.toUpperCase()
                }).replace(/^-/, "")
            }

            function contains(str, substr) {
                return !!~("" + str).indexOf(substr)
            }

            function createElement() {
                return "function" != typeof document.createElement ? document.createElement(arguments[0]) : isSVG ? document.createElementNS.call(document, "http://www.w3.org/2000/svg", arguments[0]) : document.createElement.apply(document, arguments)
            }

            function getBody() {
                var body = document.body;
                return body || (body = createElement(isSVG ? "svg" : "body"), body.fake = !0), body
            }

            function injectElementWithStyles(rule, callback, nodes, testnames) {
                var style, ret, node, docOverflow, mod = "modernizr",
                    div = createElement("div"),
                    body = getBody();
                if (parseInt(nodes, 10))
                    for (; nodes--;) node = createElement("div"), node.id = testnames ? testnames[nodes] : mod + (nodes + 1), div.appendChild(node);
                return style = createElement("style"), style.type = "text/css", style.id = "s" + mod, (body.fake ? body : div).appendChild(style), body.appendChild(div), style.styleSheet ? style.styleSheet.cssText = rule : style.appendChild(document.createTextNode(rule)), div.id = mod, body.fake && (body.style.background = "", body.style.overflow = "hidden", docOverflow = docElement.style.overflow, docElement.style.overflow = "hidden", docElement.appendChild(body)), ret = callback(div, rule), body.fake ? (body.parentNode.removeChild(body), docElement.style.overflow = docOverflow, docElement.offsetHeight) : div.parentNode.removeChild(div), !!ret
            }

            function fnBind(fn, that) {
                return function() {
                    return fn.apply(that, arguments)
                }
            }

            function testDOMProps(props, obj, elem) {
                var item;
                for (var i in props)
                    if (props[i] in obj) return !1 === elem ? props[i] : (item = obj[props[i]], is(item, "function") ? fnBind(item, elem || obj) : item);
                return !1
            }

            function domToCSS(name) {
                return name.replace(/([A-Z])/g, function(str, m1) {
                    return "-" + m1.toLowerCase()
                }).replace(/^ms-/, "-ms-")
            }

            function nativeTestProps(props, value) {
                var i = props.length;
                if ("CSS" in window && "supports" in window.CSS) {
                    for (; i--;)
                        if (window.CSS.supports(domToCSS(props[i]), value)) return !0;
                    return !1
                }
                if ("CSSSupportsRule" in window) {
                    for (var conditionText = []; i--;) conditionText.push("(" + domToCSS(props[i]) + ":" + value + ")");
                    return conditionText = conditionText.join(" or "), injectElementWithStyles("@supports (" + conditionText + ") { #modernizr { position: absolute; } }", function(node) {
                        return "absolute" == getComputedStyle(node, null).position
                    })
                }
                return undefined
            }

            function testProps(props, prefixed, value, skipValueTest) {
                function cleanElems() {
                    afterInit && (delete mStyle.style, delete mStyle.modElem)
                }
                if (skipValueTest = !is(skipValueTest, "undefined") && skipValueTest, !is(value, "undefined")) {
                    var result = nativeTestProps(props, value);
                    if (!is(result, "undefined")) return result
                }
                for (var afterInit, i, propsLength, prop, before, elems = ["modernizr", "tspan", "samp"]; !mStyle.style && elems.length;) afterInit = !0, mStyle.modElem = createElement(elems.shift()), mStyle.style = mStyle.modElem.style;
                for (propsLength = props.length, i = 0; i < propsLength; i++)
                    if (prop = props[i], before = mStyle.style[prop], contains(prop, "-") && (prop = cssToDOM(prop)), mStyle.style[prop] !== undefined) {
                        if (skipValueTest || is(value, "undefined")) return cleanElems(), "pfx" != prefixed || prop;
                        try {
                            mStyle.style[prop] = value
                        } catch (e) {}
                        if (mStyle.style[prop] != before) return cleanElems(), "pfx" != prefixed || prop
                    }
                return cleanElems(), !1
            }

            function testPropsAll(prop, prefixed, elem, value, skipValueTest) {
                var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
                    props = (prop + " " + cssomPrefixes.join(ucProp + " ") + ucProp).split(" ");
                return is(prefixed, "string") || is(prefixed, "undefined") ? testProps(props, prefixed, value, skipValueTest) : (props = (prop + " " + domPrefixes.join(ucProp + " ") + ucProp).split(" "), testDOMProps(props, prefixed, elem))
            }

            function testAllProps(prop, value, skipValueTest) {
                return testPropsAll(prop, undefined, undefined, value, skipValueTest)
            }
            var classes = [],
                tests = [],
                ModernizrProto = {
                    _version: "3.3.1",
                    _config: {
                        classPrefix: "",
                        enableClasses: !0,
                        enableJSClass: !0,
                        usePrefixes: !0
                    },
                    _q: [],
                    on: function(test, cb) {
                        var self = this;
                        setTimeout(function() {
                            cb(self[test])
                        }, 0)
                    },
                    addTest: function(name, fn, options) {
                        tests.push({
                            name: name,
                            fn: fn,
                            options: options
                        })
                    },
                    addAsyncTest: function(fn) {
                        tests.push({
                            name: null,
                            fn: fn
                        })
                    }
                },
                Modernizr = function() {};
            Modernizr.prototype = ModernizrProto, Modernizr = new Modernizr;
            var prefixes = ModernizrProto._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
            ModernizrProto._prefixes = prefixes;
            var docElement = document.documentElement,
                isSVG = "svg" === docElement.nodeName.toLowerCase();
            isSVG || function(window, document) {
                function addStyleSheet(ownerDocument, cssText) {
                    var p = ownerDocument.createElement("p"),
                        parent = ownerDocument.getElementsByTagName("head")[0] || ownerDocument.documentElement;
                    return p.innerHTML = "x<style>" + cssText + "</style>", parent.insertBefore(p.lastChild, parent.firstChild)
                }

                function getElements() {
                    var elements = html5.elements;
                    return "string" == typeof elements ? elements.split(" ") : elements
                }

                function addElements(newElements, ownerDocument) {
                    var elements = html5.elements;
                    "string" != typeof elements && (elements = elements.join(" ")), "string" != typeof newElements && (newElements = newElements.join(" ")), html5.elements = elements + " " + newElements, shivDocument(ownerDocument)
                }

                function getExpandoData(ownerDocument) {
                    var data = expandoData[ownerDocument[expando]];
                    return data || (data = {}, expanID++, ownerDocument[expando] = expanID, expandoData[expanID] = data), data
                }

                function createElement(nodeName, ownerDocument, data) {
                    if (ownerDocument || (ownerDocument = document), supportsUnknownElements) return ownerDocument.createElement(nodeName);
                    data || (data = getExpandoData(ownerDocument));
                    var node;
                    return node = data.cache[nodeName] ? data.cache[nodeName].cloneNode() : saveClones.test(nodeName) ? (data.cache[nodeName] = data.createElem(nodeName)).cloneNode() : data.createElem(nodeName), !node.canHaveChildren || reSkip.test(nodeName) || node.tagUrn ? node : data.frag.appendChild(node)
                }

                function createDocumentFragment(ownerDocument, data) {
                    if (ownerDocument || (ownerDocument = document), supportsUnknownElements) return ownerDocument.createDocumentFragment();
                    data = data || getExpandoData(ownerDocument);
                    for (var clone = data.frag.cloneNode(), i = 0, elems = getElements(), l = elems.length; i < l; i++) clone.createElement(elems[i]);
                    return clone
                }

                function shivMethods(ownerDocument, data) {
                    data.cache || (data.cache = {}, data.createElem = ownerDocument.createElement, data.createFrag = ownerDocument.createDocumentFragment, data.frag = data.createFrag()), ownerDocument.createElement = function(nodeName) {
                        return html5.shivMethods ? createElement(nodeName, ownerDocument, data) : data.createElem(nodeName)
                    }, ownerDocument.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + getElements().join().replace(/[\w\-:]+/g, function(nodeName) {
                        return data.createElem(nodeName), data.frag.createElement(nodeName), 'c("' + nodeName + '")'
                    }) + ");return n}")(html5, data.frag)
                }

                function shivDocument(ownerDocument) {
                    ownerDocument || (ownerDocument = document);
                    var data = getExpandoData(ownerDocument);
                    return !html5.shivCSS || supportsHtml5Styles || data.hasCSS || (data.hasCSS = !!addStyleSheet(ownerDocument, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), supportsUnknownElements || shivMethods(ownerDocument, data), ownerDocument
                }
                var supportsHtml5Styles, supportsUnknownElements, options = window.html5 || {},
                    reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                    saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                    expando = "_html5shiv",
                    expanID = 0,
                    expandoData = {};
                ! function() {
                    try {
                        var a = document.createElement("a");
                        a.innerHTML = "<xyz></xyz>", supportsHtml5Styles = "hidden" in a, supportsUnknownElements = 1 == a.childNodes.length || function() {
                            document.createElement("a");
                            var frag = document.createDocumentFragment();
                            return void 0 === frag.cloneNode || void 0 === frag.createDocumentFragment || void 0 === frag.createElement
                        }()
                    } catch (e) {
                        supportsHtml5Styles = !0, supportsUnknownElements = !0
                    }
                }();
                var html5 = {
                    elements: options.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",
                    version: "3.7.3",
                    shivCSS: !1 !== options.shivCSS,
                    supportsUnknownElements: supportsUnknownElements,
                    shivMethods: !1 !== options.shivMethods,
                    type: "default",
                    shivDocument: shivDocument,
                    createElement: createElement,
                    createDocumentFragment: createDocumentFragment,
                    addElements: addElements
                };
                window.html5 = html5, shivDocument(document), "object" == typeof module && module.exports && (module.exports = html5)
            }(void 0 !== window ? window : this, document);
            var omPrefixes = "Moz O ms Webkit",
                domPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(" ") : [];
            ModernizrProto._domPrefixes = domPrefixes;
            var cssomPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.split(" ") : [];
            ModernizrProto._cssomPrefixes = cssomPrefixes;
            var atRule = function(prop) {
                var rule, length = prefixes.length,
                    cssrule = window.CSSRule;
                if (void 0 === cssrule) return undefined;
                if (!prop) return !1;
                if (prop = prop.replace(/^@/, ""), (rule = prop.replace(/-/g, "_").toUpperCase() + "_RULE") in cssrule) return "@" + prop;
                for (var i = 0; i < length; i++) {
                    var prefix = prefixes[i];
                    if (prefix.toUpperCase() + "_" + rule in cssrule) return "@-" + prefix.toLowerCase() + "-" + prop
                }
                return !1
            };
            ModernizrProto.atRule = atRule;
            var testStyles = ModernizrProto.testStyles = injectElementWithStyles,
                modElem = {
                    elem: createElement("modernizr")
                };
            Modernizr._q.push(function() {
                delete modElem.elem
            });
            var mStyle = {
                style: modElem.elem.style
            };
            Modernizr._q.unshift(function() {
                delete mStyle.style
            });
            ModernizrProto.testProp = function(prop, value, useValue) {
                return testProps([prop], undefined, value, useValue)
            };
            ModernizrProto.testAllProps = testPropsAll;
            ModernizrProto.prefixed = function(prop, obj, elem) {
                return 0 === prop.indexOf("@") ? atRule(prop) : (-1 != prop.indexOf("-") && (prop = cssToDOM(prop)), obj ? testPropsAll(prop, obj, elem) : testPropsAll(prop, "pfx"))
            };
            ModernizrProto.testAllProps = testAllProps, Modernizr.addTest("cssanimations", testAllProps("animationName", "a", !0)), Modernizr.addTest("csstransitions", testAllProps("transition", "all", !0)), Modernizr.addTest("touchevents", function() {
                    var bool;
                    if ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch) bool = !0;
                    else {
                        var query = ["@media (", prefixes.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
                        testStyles(query, function(node) {
                            bool = 9 === node.offsetTop
                        })
                    }
                    return bool
                }),
                function() {
                    var featureNames, feature, aliasIdx, result, nameIdx, featureName, featureNameSplit;
                    for (var featureIdx in tests)
                        if (tests.hasOwnProperty(featureIdx)) {
                            if (featureNames = [], feature = tests[featureIdx], feature.name && (featureNames.push(feature.name.toLowerCase()), feature.options && feature.options.aliases && feature.options.aliases.length))
                                for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
                            for (result = is(feature.fn, "function") ? feature.fn() : feature.fn, nameIdx = 0; nameIdx < featureNames.length; nameIdx++) featureName = featureNames[nameIdx], featureNameSplit = featureName.split("."), 1 === featureNameSplit.length ? Modernizr[featureNameSplit[0]] = result : (!Modernizr[featureNameSplit[0]] || Modernizr[featureNameSplit[0]] instanceof Boolean || (Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]])), Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result), classes.push((result ? "" : "no-") + featureNameSplit.join("-"))
                        }
                }(),
                function(classes) {
                    var className = docElement.className,
                        classPrefix = Modernizr._config.classPrefix || "";
                    if (isSVG && (className = className.baseVal), Modernizr._config.enableJSClass) {
                        var reJS = new RegExp("(^|\\s)" + classPrefix + "no-js(\\s|$)");
                        className = className.replace(reJS, "$1" + classPrefix + "js$2")
                    }
                    Modernizr._config.enableClasses && (className += " " + classPrefix + classes.join(" " + classPrefix), isSVG ? docElement.className.baseVal = className : docElement.className = className)
                }(classes), delete ModernizrProto.addTest, delete ModernizrProto.addAsyncTest;
            for (var i = 0; i < Modernizr._q.length; i++) Modernizr._q[i]();
            window.Modernizr = Modernizr
        }(window, document),
        function($, window, undefined) {
            "use strict";
            var Modernizr = window.Modernizr,
                $body = $("body");
            $.DLMenu = function(options, element) {
                this.$el = $(element), this._init(options)
            }, $.DLMenu.defaults = {
                animationClasses: {
                    classin: "mk-vm-animate-in-" + mk_vertical_header_anim,
                    classout: "mk-vm-animate-out-" + mk_vertical_header_anim
                },
                onLevelClick: function(el, name) {
                    return !1
                },
                onLinkClick: function(el, ev) {
                    return !1
                }
            }, $.DLMenu.prototype = {
                _init: function(options) {
                    this.options = $.extend(!0, {}, $.DLMenu.defaults, options), this._config();
                    var animEndEventNames = {
                            WebkitAnimation: "webkitAnimationEnd",
                            OAnimation: "oAnimationEnd",
                            msAnimation: "MSAnimationEnd",
                            animation: "animationend"
                        },
                        transEndEventNames = {
                            WebkitTransition: "webkitTransitionEnd",
                            MozTransition: "transitionend",
                            OTransition: "oTransitionEnd",
                            msTransition: "MSTransitionEnd",
                            transition: "transitionend"
                        };
                    this.animEndEventName = animEndEventNames[Modernizr.prefixed("animation")] + ".dlmenu", this.transEndEventName = transEndEventNames[Modernizr.prefixed("transition")] + ".dlmenu", this.animEndEventNameUnsufixed = animEndEventNames[Modernizr.prefixed("animation")], this.transEndEventNameUnsufixed = transEndEventNames[Modernizr.prefixed("transition")], this.supportAnimations = Modernizr.cssanimations, this.supportTransitions = Modernizr.csstransitions, this._initEvents()
                },
                _config: function() {
                    this.open = !1, this.$trigger = this.$el.children(".mk-vm-trigger"), this.$menu = this.$el.children("ul.mk-vm-menu"), this.$menuitems = this.$menu.find("li:not(.mk-vm-back)"), this.$back = this.$menu.find("li.mk-vm-back")
                },
                _initEvents: function() {
                    var self = this;
                    $(".mk-vm-menuwrapper a").on("transitionend", function(event) {
                        event.stopPropagation()
                    }), this.$menuitems.on("click.dlmenu", "a", function(event) {
                        var $item = $(event.delegateTarget),
                            $submenu = $(event.currentTarget).siblings("ul.sub-menu");
                        if ($submenu.length > 0) {
                            var $flyin = $submenu.clone().css("opacity", 0).insertAfter(self.$menu),
                                onAnimationEndFn = function() {
                                    var $parent = $item.parents(".mk-vm-subviewopen:first");
                                    self.$menu.off(self.animEndEventName).removeClass(self.options.animationClasses.classout).addClass("mk-vm-subview"), $item.addClass("mk-vm-subviewopen"), $parent.removeClass("mk-vm-subviewopen").addClass("mk-vm-subview"), $flyin.remove();
                                    var $txt = $item.find(".meni-item-text");
                                    $txt.css("opacity", .99), setTimeout(function() {
                                        $txt.css("opacity", 1)
                                    }, 0)
                                };
                            return setTimeout(function() {
                                $flyin.addClass(self.options.animationClasses.classin), self.$menu.addClass(self.options.animationClasses.classout), self.supportAnimations ? self.$menu.on(self.animEndEventName, onAnimationEndFn) : onAnimationEndFn.call(), self.options.onLevelClick($item, $item.children("a:first").text())
                            }), !1
                        }
                        self.options.onLinkClick($item, event)
                    }), this.$back.on("click.dlmenu", function(event) {
                        var $this = $(this),
                            $submenu = $this.parents("ul.sub-menu:first"),
                            $item = $submenu.parent(),
                            $flyin = $submenu.clone().insertAfter(self.$menu),
                            onAnimationEndFn = function() {
                                self.$menu.off(self.animEndEventName).removeClass(self.options.animationClasses.classin), $flyin.remove()
                            };
                        return setTimeout(function() {
                            $flyin.addClass(self.options.animationClasses.classout), self.$menu.addClass(self.options.animationClasses.classin), self.supportAnimations ? self.$menu.on(self.animEndEventName, onAnimationEndFn) : onAnimationEndFn.call(), $item.removeClass("mk-vm-subviewopen");
                            var $subview = $this.parents(".mk-vm-subview:first");
                            $subview.is("li") && $subview.addClass("mk-vm-subviewopen"), $subview.removeClass("mk-vm-subview")
                        }), !1
                    })
                },
                closeMenu: function() {
                    this.open && this._closeMenu()
                },
                _closeMenu: function() {
                    var self = this,
                        onTransitionEndFn = function() {
                            self.$menu.off(self.transEndEventName), self._resetMenu()
                        };
                    this.$menu.removeClass("mk-vm-menuopen"), this.$menu.addClass("mk-vm-menu-toggle"), this.$trigger.removeClass("mk-vm-active"), this.supportTransitions ? this.$menu.on(this.transEndEventName, onTransitionEndFn) : onTransitionEndFn.call(), this.open = !1
                },
                openMenu: function() {
                    this.open || this._openMenu()
                },
                _openMenu: function() {
                    var self = this;
                    $body.off("click").on("click.dlmenu", function() {
                        self._closeMenu()
                    }), this.$menu.addClass("mk-vm-menuopen mk-vm-menu-toggle").on(this.transEndEventName, function() {
                        $(this).removeClass("mk-vm-menu-toggle")
                    }), this.$trigger.addClass("mk-vm-active"), this.open = !0
                },
                _resetMenu: function() {
                    this.$menu.removeClass("mk-vm-subview"), this.$menuitems.removeClass("mk-vm-subview mk-vm-subviewopen")
                }
            };
            var logError = function(message) {
                window.console && window.console.error(message)
            };
            $.fn.dlmenu = function(options) {
                if ("string" == typeof options) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    this.each(function() {
                        var instance = $.data(this, "dlmenu");
                        return instance ? $.isFunction(instance[options]) && "_" !== options.charAt(0) ? void instance[options].apply(instance, args) : void logError("no such method '" + options + "' for dlmenu instance") : void logError("cannot call methods on dlmenu prior to initialization; attempted to call method '" + options + "'")
                    })
                } else this.each(function() {
                    var instance = $.data(this, "dlmenu");
                    instance ? instance._init() : instance = $.data(this, "dlmenu", new $.DLMenu(options, this))
                });
                return this
            }
        }(jQuery, window),
        function($) {
            "use strict";
            $(".mk-main-navigation .menu-item-has-children").children("a").attr("aria-haspopup", "true"), $(".animated-column-item").attr("aria-haspopup", "true")
        }(jQuery),
        function($) {
            "use strict";
            var Accordion = function(el) {
                var timeout, that = this,
                    $el = $(el),
                    initial = $el.data("initialindex");
                this.$el = $el, this.$single = $("." + this.dom.single, $el), this.isExpendable = "toggle-action" === $el.data("style"), this.bindClicks(), $(window).on("load", function() {
                    -1 !== initial && that.show(that.$single.eq(initial))
                }), $(window).on("resize", function() {
                    clearTimeout(timeout), timeout = setTimeout(that.bindClicks.bind(that), 500)
                })
            };
            Accordion.prototype.dom = {
                single: "mk-accordion-single",
                tab: "mk-accordion-tab",
                pane: "mk-accordion-pane",
                current: "current",
                mobileToggle: "mobile-false",
                mobileBreakPoint: 767
            }, Accordion.prototype.bindClicks = function() {
                if (this.$single.off("click", "." + this.dom.tab), !window.matchMedia("(max-width: " + this.dom.mobileBreakPoint + "px)").matches || !this.$el.hasClass(this.dom.mobileToggle)) {
                    this.$single.on("click", "." + this.dom.tab, this.handleEvent.bind(this));
                    var $current = $("." + this.dom.current, this.$el);
                    "none" === $("." + this.dom.pane, $current).css("display") && this.show($current)
                }
            }, Accordion.prototype.handleEvent = function(e) {
                e.preventDefault(), e.stopPropagation();
                var $single = $(e.delegateTarget);
                $single.hasClass(this.dom.current) ? this.isExpendable && this.hide($single) : this.show($single)
            }, Accordion.prototype.hide = function($single) {
                $single.removeClass(this.dom.current), $("." + this.dom.pane, $single).slideUp()
            }, Accordion.prototype.show = function($single) {
                if (!this.isExpendable) {
                    var that = this;
                    this.hide($("." + this.dom.current, that.$el))
                }
                $single.addClass(this.dom.current), $("." + this.dom.pane, $single).slideDown()
            }, $(".mk-accordion").each(function() {
                new Accordion(this)
            })
        }(jQuery),
        function($) {
            "use strict";
            if ("undefined" != typeof Raphael) {
                var SkillDiagram = function(el) {
                    this.el = el
                };
                SkillDiagram.prototype = {
                    init: function() {
                        this.cacheElements(), this.createDiagram(), this.$skills.each(this.createSkill.bind(this))
                    },
                    cacheElements: function() {
                        this.$el = $(this.el), this.$skills = this.$el.find(".mk-meter-arch"), this.config = this.$el.data(), this.config.radius = this.config.dimension / 2
                    },
                    random: function(l, u) {
                        return Math.floor(Math.random() * (u - l + 1) + l)
                    },
                    createDiagram: function() {
                        var self = this;
                        this.diagram = Raphael(this.el, this.config.dimension, this.config.dimension), this.diagram.setViewBox(0, 0, this.config.dimension, this.config.dimension, !0), this.diagram.setSize("90%", "90%"), this.diagram.circle(this.config.radius, this.config.radius, 80).attr({
                            stroke: "none",
                            fill: this.config.circleColor
                        }), this.title = this.diagram.text(this.config.radius, this.config.radius, this.config.defaultText).attr({
                            font: "22px helvetica",
                            fill: this.config.defaultTextColor
                        }).toFront(), this.diagram.customAttributes.arc = function(value, color, rad) {
                            var v = 3.6 * value,
                                alpha = 360 == v ? 359.99 : v,
                                r = self.random(91, 240),
                                a = (r - alpha) * Math.PI / 180,
                                b = r * Math.PI / 180;
                            return {
                                path: [
                                    ["M", self.config.radius + rad * Math.cos(b), self.config.radius - rad * Math.sin(b)],
                                    ["A", rad, rad, 0, +(alpha > 180), 1, self.config.radius + rad * Math.cos(a), self.config.radius - rad * Math.sin(a)]
                                ],
                                stroke: color
                            }
                        }
                    },
                    createSkill: function(id, el) {
                        var self = this,
                            $this = $(el),
                            config = $this.data(),
                            newRad = 72 + 27 * (id + 1);
                        this.diagram.path().attr({
                            "stroke-width": 28,
                            arc: [config.percent, config.color, newRad]
                        }).mouseover(function() {
                            self.showSkill(this, config.name, config.percent)
                        }).mouseout(function() {
                            self.hideSkill(this)
                        })
                    },
                    showSkill: function(self, name, percent) {
                        var $this = self;
                        "VML" != Raphael.type && $this.toFront(), $this.animate({
                            "stroke-width": 50,
                            opacity: .9
                        }, 800, "elastic"), this.title.stop().animate({
                            opacity: 0
                        }, 250, ">", function() {
                            this.attr({
                                text: name + "\n" + percent + "%"
                            }).animate({
                                opacity: 1
                            }, 250, "<")
                        }).toFront()
                    },
                    hideSkill: function(self) {
                        var $this = self,
                            self = this;
                        $this.stop().animate({
                            "stroke-width": 28,
                            opacity: 1
                        }, 1e3, "elastic"), self.title.stop().animate({
                            opacity: 0
                        }, 250, ">", function() {
                            self.title.attr({
                                text: self.config.defaultText
                            }).animate({
                                opacity: 1
                            }, 250, "<")
                        })
                    }
                }, $(".mk-skill-diagram").each(function() {
                    new SkillDiagram(this).init()
                })
            }
        }(jQuery),
        function($) {
            "use strict";

            function tabDelegation() {
                var $this = $(this);
                $this.data().tab && $this.on("click", "a", openInTab)
            }

            function openInTab(e) {
                e.preventDefault();
                var $this = $(this),
                    url = $this.attr("href");
                window.open(url, "_blank")
            }
            $('[data-js="tab-delegation"]').each(tabDelegation)
        }(jQuery),
        function($) {
            "use strict";
            var Toggle = function(el) {
                var that = this,
                    $el = $(el);
                this.$el = $el, $(window).on("load", function() {
                    $el.toggle(that.open.bind(that), that.close.bind(that))
                })
            };
            Toggle.prototype.dom = {
                pane: "mk-toggle-pane",
                active: "active-toggle"
            }, Toggle.prototype.open = function() {
                var $this = this.$el;
                $this.addClass(this.dom.active), $this.siblings("." + this.dom.pane).slideDown(200)
            }, Toggle.prototype.close = function() {
                var $this = this.$el;
                $this.removeClass(this.dom.active), $this.siblings("." + this.dom.pane).slideUp(200)
            };
            var $toggle = $(".mk-toggle-title");
            $toggle.length && $toggle.each(function() {
                new Toggle(this)
            })
        }(jQuery), window.ajaxInit = function() {
            mk_lightbox_init(), mk_click_events(), mk_social_share_global(), mk_gallery(), loop_audio_init()
        }, window.ajaxDelayedInit = function() {
            mk_flexslider_init()
        }, $(document).ready(function() {
            mk_lightbox_init(), mk_login_form(), mk_backgrounds_parallax(), mk_flexslider_init(), mk_event_countdown(), mk_skill_meter(), mk_milestone(), mk_ajax_search(), mk_hover_events(), mk_portfolio_ajax(), mk_love_post(), product_loop_add_cart(), mk_portfolio_widget(), mk_contact_form(), mk_blog_carousel(), mk_header_searchform(), mk_click_events(), mk_text_typer(), mk_tab_slider_func(), $(window).on("load", function() {
                mk_unfold_footer(), mk_accordion_toggles_tooltip(), mk_gallery(), mk_theatre_responsive_calculator(), mk_start_tour_resize(), mk_header_social_resize(), mk_page_section_social_video_bg(), loop_audio_init(), mk_one_page_scroller(), setTimeout(function() {
                    mk_mobile_tablet_responsive_calculator()
                }, 300), console.log("ready for rock")
            });
            var onDebouncedResize = function() {
                    mk_theatre_responsive_calculator(), mk_mobile_tablet_responsive_calculator(), mk_accordion_toggles_tooltip(), mk_start_tour_resize(), mk_header_social_resize(), setTimeout(function() {
                        mk_unfold_footer()
                    }, 300)
                },
                debounceResize = null;
            $(window).on("resize", function() {
                null !== debounceResize && clearTimeout(debounceResize), debounceResize = setTimeout(onDebouncedResize, 300)
            });
            var onDebouncedScroll = function() {
                    mk_skill_meter(), mk_milestone()
                },
                debounceScroll = null;
            $(window).on("scroll", function() {
                null !== debounceScroll && clearTimeout(debounceScroll), debounceScroll = setTimeout(onDebouncedScroll, 100)
            }), MK.utils.isMobile() && $("body").addClass("no-transform")
        }),
        function() {
            $(".mk-section-video video").each(function() {
                var mkVideo = this;
                this.onload = function() {
                    setTimeout(function() {
                        $(mkVideo).animate({
                            opacity: 1
                        }, 300)
                    }, 1e3)
                }()
            })
        }(),
        function($) {
            function initialize() {
                var $gmap = $(".gmap_widget");
                $gmap.length && "undefined" != typeof google && $gmap.each(run)
            }

            function run() {
                var $mapHolder = $(this),
                    myLatlng = new google.maps.LatLng($mapHolder.data("latitude"), $mapHolder.data("longitude")),
                    mapOptions = $mapHolder.data("options");
                mapOptions.mapTypeId = google.maps.MapTypeId.ROADMAP, mapOptions.center = myLatlng;
                var map = new google.maps.Map(this, mapOptions);
                new google.maps.Marker({
                    position: myLatlng,
                    map: map
                })
            }
            $(window).on("load", initialize)
        }(jQuery),
        function($) {
            function run() {
                var options = $(this).data("options");
                options.template = '<a class="featured-image ' + options.tmp_col + '-columns" href="{{link}}" target="_' + options.tmp_target + '"><div class="item-holder"><img src="{{image}}" /><div class="image-hover-overlay"></div></div></a>', new Instafeed(options).run()
            }
            $(window).on("load", function() {
                var $feeds = $(".mk-instagram-feeds");
                $feeds.length && $feeds.each(run)
            })
        }(jQuery),
        function($) {
            $(window).on("load", function() {
                setTimeout(function() {
                    $(".chrome-flipbox-backface-fix").removeClass("chrome-flipbox-backface-fix")
                }, 300)
            })
        }(jQuery),
        function($) {
            $(window).on("load", function() {
                $(".vc_tta-tab a").on("click", function() {
                    setTimeout(function() {
                        $(window).trigger("resize")
                    }, 100)
                })
            })
        }(jQuery),
        function($) {
            $(window).on("load", function() {
                $("#mk-vm-menu .menu-item-has-children, #mk-vm-menu .mk-vm-back").on("mouseenter", function() {
                    var $header_inner = $(this).closest(".mk-header-inner"),
                        $header_inner_height = $header_inner.outerHeight(),
                        $header_bg = $header_inner.find(".mk-header-bg"),
                        total_height = 0;
                    $header_bg.css("height", "100%"), setTimeout(function() {
                        $header_inner.children(":visible").each(function() {
                            total_height += $(this).outerHeight(!0)
                        }), total_height -= $header_bg.height(), total_height < $header_inner_height ? $header_bg.css("height", "100%") : $header_bg.css("height", total_height + "px")
                    }, 600)
                })
            })
        }(jQuery),
        function($) {
            function set_lightbox_href() {
                var $product_img = $(this).find("img"),
                    $lightbox = $(this).find(".mk-lightbox");
                setTimeout(function() {
                    var image_url = $product_img.attr("src"),
                        image_suffix = image_url.substr(image_url.lastIndexOf(".") - image_url.length),
                        image_url = image_url.slice(0, image_url.lastIndexOf("-"));
                    $lightbox.attr("href", image_url + image_suffix)
                }, 300)
            }
            $(window).on("load", function() {
                var $variations_form = $(".variations_form");
                if ($variations_form.length) {
                    var $varitions_selects = $variations_form.find(".variations").find(".value").find("select");
                    $varitions_selects.on("change", function() {
                        var $all_img_container = $(".mk-product-image .mk-woocommerce-main-image");
                        $all_img_container.length && $($all_img_container).each(set_lightbox_href)
                    }), $varitions_selects.trigger("change")
                }
            })
        }(jQuery),
        function($) {
            MK.utils.isMobile() && $(".mk-section-video video").remove()
        }(jQuery),
        function($) {
            $(window).on("load", function() {
                $(document).on("yith-wcan-ajax-filtered yith_infs_added_elem yith-wcan-ajax-reset-filtered", function() {
                    setTimeout(function() {
                        MK.utils.eventManager.publish("ajaxLoaded"), MK.core.initAll(document)
                    }, 1e3)
                }), $(document).on("yith-wcan-ajax-filtered yith-wcan-ajax-reset-filtered", function() {
                    setTimeout(function() {
                        $(".woocommerce-ordering").on("change", "select.orderby", function() {
                            $(this).closest("form").submit()
                        })
                    }, 1e3)
                })
            })
        }(jQuery),
        function(e) {
            var a = window.location,
                n = a.hash;
            if (n.length && n.substring(1).length) {
                if (!e(".vc_row, .mk-main-wrapper-holder, .mk-page-section, #comments").filter("#" + n.substring(1)).length) return;
                n = n.replace("!loading", "");
                var i = n + "!loading";
                a.hash = i
            }
        }(jQuery);
    var progressButton = {
        loader: function(form) {
            MK.core.loadDependencies([MK.core.path.plugins + "tweenmax.js"], function() {
                var $form = form,
                    progressBar = $form.find(".mk-progress-button .mk-progress-inner"),
                    buttonText = $form.find(".mk-progress-button .mk-progress-button-content");
                (new TimelineLite).to(progressBar, 0, {
                    width: "100%",
                    scaleX: 0,
                    scaleY: 1
                }).to(buttonText, .3, {
                    y: -5
                }).to(progressBar, 1.5, {
                    scaleX: 1,
                    ease: Power2.easeInOut
                }, "-=.1").to(buttonText, .3, {
                    y: 0
                }).to(progressBar, .3, {
                    scaleY: 0
                })
            })
        },
        success: function(form) {
            MK.core.loadDependencies([MK.core.path.plugins + "tweenmax.js"], function() {
                function hideSuccessMessage() {
                    progressButtonSuccess.reverse()
                }
                var $form = form,
                    buttonText = $form.find(".mk-button .mk-progress-button-content, .mk-contact-button .mk-progress-button-content"),
                    successIcon = $form.find(".mk-progress-button .state-success"),
                    progressButtonSuccess = new TimelineLite({
                        onComplete: hideSuccessMessage
                    });
                progressButtonSuccess.to(buttonText, .3, {
                    paddingRight: 20,
                    ease: Power2.easeInOut
                }, "+=1").to(successIcon, .3, {
                    opacity: 1
                }).to(successIcon, 2, {
                    opacity: 1
                })
            })
        },
        error: function(form) {
            MK.core.loadDependencies([MK.core.path.plugins + "tweenmax.js"], function() {
                function hideErrorMessage() {
                    progressButtonError.reverse()
                }
                var $form = form,
                    buttonText = $form.find(".mk-button .mk-progress-button-content, .mk-contact-button .mk-progress-button-content"),
                    errorIcon = $form.find(".mk-progress-button .state-error"),
                    progressButtonError = new TimelineLite({
                        onComplete: hideErrorMessage
                    });
                progressButtonError.to(buttonText, .3, {
                    paddingRight: 20
                }, "+=1").to(errorIcon, .3, {
                    opacity: 1
                }).to(errorIcon, 2, {
                    opacity: 1
                })
            })
        }
    };
    $("#mc-embedded-subscribe-form").submit(function(e) {
            var $this = $(this);
            e.preventDefault(), $.ajax({
                url: MK.core.path.ajaxUrl,
                type: "POST",
                data: {
                    action: "mk_ajax_subscribe",
                    email: $this.find(".mk-subscribe--email").val(),
                    list_id: $this.find(".mk-subscribe--list-id").val(),
                    optin: $this.find(".mk-subscribe--optin").val()
                },
                success: function(res) {
                    $this.parent().find(".mk-subscribe--message").html($.parseJSON(res).message)
                }
            })
        }), "undefined" != typeof exports && (exports.addClass = addClass, exports.removeClass = removeClass), "undefined" != typeof exports && (exports.validateEmail = validateEmail, exports.validateText = validateText),
        function($) {
            "use strict";
            $(".mk-fullscreen-nav-close, .mk-fullscreen-nav-wrapper, #fullscreen-navigation a").on("click", function(e) {
                $(".mk-fullscreen-nav").removeClass("opened"), $(".mk-dashboard-trigger").removeClass("fullscreen-active"), $("body").removeClass("fullscreen-nav-opened");
                var anchor = MK.utils.detectAnchor(this),
                    $this = $(this),
                    href = $this.attr("href").split("#")[0],
                    url = window.location.href,
                    isSamePage = -1 !== url.indexOf(href);
                anchor.length ? (isSamePage && e.preventDefault(), MK.utils.scrollToAnchor(anchor)) : "#" === $this.attr("href") && e.preventDefault()
            }), $(".fullscreen-navigation-ul .menu-sub-level-arrow").on("click", function() {
                $(this).siblings(".sub-menu").slideToggle()
            })
        }(jQuery),
        function($) {
            "use strict";
            var $navList = $(".main-navigation-ul"),
                megaMenu = function() {
                    $navList.MegaMenu({
                        type: "vertical",
                        delay: 200
                    })
                };
            $(window).on("load", megaMenu)
        }(jQuery),
        function($) {
            "use strict";
            var onePageNavItem = function() {
                    var $this = $(this),
                        link = $this.find("a"),
                        anchor = MK.utils.detectAnchor(link);
                    if (anchor.length) {
                        $this.removeClass("current-menu-item current-menu-ancestor current-menu-parent");
                        var activeNav = function(state) {
                            return function() {
                                $this[state ? "addClass" : "removeClass"]("current-menu-item"), window.history.replaceState(void 0, void 0, [state ? anchor : " "])
                            }
                        };
                        MK.utils.scrollSpy($(anchor)[0], {
                            before: activeNav(!1),
                            active: activeNav(!0),
                            after: activeNav(!1)
                        })
                    }
                },
                $navItems = $(".js-main-nav").find("li");
            $(window).on("load", function() {
                setTimeout(function() {
                    $navItems.each(onePageNavItem)
                }, 1e3)
            })
        }(jQuery),
        function($) {
            "use strict";

            function toggleResMenu(e) {
                e.preventDefault();
                var $this = $(this),
                    $headerInner = $this.parents("header"),
                    $resMenu = $headerInner.find(".mk-responsive-wrap"),
                    searchBox = $(".responsive-searchform .text-input"),
                    adminBarHeight = $("#wpadminbar").height();
                if ($body.hasClass("mk-opened-nav")) $this.removeClass("is-active"), $body.removeClass("mk-opened-nav").addClass("mk-closed-nav").trigger("mk-closed-nav"), $resMenu.hide(), $post_nav.removeClass("post-nav-backward");
                else {
                    $this.addClass("is-active"), $body.removeClass("mk-closed-nav").addClass("mk-opened-nav").trigger("mk-opened-nav"), $resMenu.show(), $post_nav.addClass("post-nav-backward");
                    var offset = $headerInner.offset().top,
                        headerHeight = MK.val.offsetHeaderHeight(offset);
                    MK.utils.scrollTo(offset - headerHeight - adminBarHeight + 5)
                }
                searchBox.hasClass("input-focused") && searchBox.removeClass("input-focused")
            }
            var $window = $(window),
                $body = $("body"),
                $resMenuWrap = $(".mk-responsive-wrap"),
                $post_nav = $(".mk-post-nav"),
                $toolbar = $(".mk-header-toolbar"),
                $resMenuLink = $(".mk-nav-responsive-link"),
                hasResMenu = $resMenuWrap.length > 0,
                windowHeight = $window.height(),
                screenHeight = screen.height;
            if ($(".mk-toolbar-resposnive-icon").on("click", function(e) {
                    e.preventDefault(), console.log("clicked"), $body.hasClass("toolbar-opened") ? ($body.removeClass("toolbar-opened").addClass("toolbar-closed"), $toolbar.hide()) : ($body.removeClass("toolbar-closed").addClass("toolbar-opened"), $toolbar.show())
                }), hasResMenu) {
                $resMenuLink.each(function() {
                    $(this).on("click", toggleResMenu)
                });
                var setResMenuHeight = function() {
                    var height = $window.height() - MK.val.offsetHeaderHeight(0);
                    $resMenuWrap.css("max-height", height)
                };
                setResMenuHeight(), $window.on("resize", setResMenuHeight);
                var isVirtualKeyboard = function() {
                        var currentWindowHeight = $window.height(),
                            currentScreenHeight = screen.height,
                            searchBox = $(".responsive-searchform .text-input"),
                            searchBoxIsFocused = !1;
                        return searchBox.on("touchstart touchend", function(e) {
                            searchBox.addClass("input-focused")
                        }), searchBoxIsFocused = searchBox.is(":focus") || searchBox.hasClass("input-focused"), !(!$body.hasClass("mk-opened-nav") || !searchBoxIsFocused || currentScreenHeight != screenHeight || currentWindowHeight == windowHeight)
                    },
                    hideResMenu = function() {
                        MK.utils.isResponsiveMenuState() && (isVirtualKeyboard() || ($body.hasClass("mk-opened-nav") && $resMenuLink.filter(".is-active").trigger("click"), $resMenuWrap.hide()))
                    };
                $window.on("resize", hideResMenu), $resMenuWrap.on("click", "a", hideResMenu)
            }
        }(jQuery),
        function($) {
            "use strict";
            var $header = $(".mk-header");
            $header.length > 0 && ($header.attr("data-header-style"), $(".sidedash-navigation-ul > li").each(function() {
                $(this).children("ul").siblings("a").after('<span class="mk-nav-arrow mk-nav-sub-closed"><svg class="mk-svg-icon" data-name="mk-moon-arrow-down" data-cacheid="2" style=" height:14px; width: 14px; " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 192l-96-96-160 160-160-160-96 96 256 255.999z"></path></svg></span>')
            }), $(".mk-nav-arrow").stop(!0).on("click", function(e) {
                e.preventDefault();
                var $this = $(this);
                $this.hasClass("mk-nav-sub-closed") ? $this.siblings("ul").slideDown(450).end().removeClass("mk-nav-sub-closed").addClass("mk-nav-sub-opened") : $this.siblings("ul").slideUp(450).end().removeClass("mk-nav-sub-opened").addClass("mk-nav-sub-closed")
            }), $(".mk-dashboard-trigger").on("click", function(e) {
                var $this = $(this),
                    $body = $("body"),
                    $fullscreen_box = $(".mk-fullscreen-nav");
                $this.hasClass("dashboard-style") ? $this.hasClass("dashboard-active") ? ($this.removeClass("dashboard-active"), $body.removeClass("dashboard-opened")) : ($this.addClass("dashboard-active"), $body.addClass("dashboard-opened")) : $this.hasClass("fullscreen-style") && ($this.hasClass("fullscreen-active") ? ($this.removeClass("fullscreen-active"), $body.removeClass("fullscreen-nav-opened"), $fullscreen_box.removeClass("opened")) : ($this.addClass("fullscreen-active"), $body.addClass("fullscreen-nav-opened"), $fullscreen_box.addClass("opened"))), e.preventDefault()
            }), $("html").on("click", function() {
                $("body").removeClass("dashboard-opened"), $(".mk-dashboard-trigger").removeClass("dashboard-active")
            }))
        }(jQuery),
        function($) {
            "use strict";
            var $verticalMenu = $("#mk-vm-menu"),
                verticalMenu = function() {
                    $verticalMenu.data("vertical-menu") || MK.utils.isResponsiveMenuState() || ($verticalMenu.dlmenu(), $verticalMenu.data("vertical-menu", !0))
                };
            verticalMenu(), $(window).on("resize", verticalMenu)
        }(jQuery),
        function($) {
            "use strict";
            $(".mk-main-navigation > .main-navigation-ul > .menu-item-language").addClass("no-mega-menu").css("visibility", "visible"), $(".mk-main-navigation .menu-item-language > a").addClass("menu-item-link")
        }(jQuery),
        function($) {
            "use strict";

            function changeSkin(e, skin) {
                $header.attr("data-transparent-skin", skin);
                var contrast = "light" === skin ? "dark" : "light";
                $header.addClass(skin + "-skin"), $header.removeClass(contrast + "-skin")
            }
            var $header = $(".mk-header").first();
            if ($header.length > 0) {
                var $window = $(window),
                    $document = $(document),
                    $headerHolder = $header.find(".mk-header-holder"),
                    $paddingWrapper = $header.find(".mk-header-padding-wrapper"),
                    config = $header.data(),
                    isStickyLazy = "lazy" === config.stickyStyle,
                    isStickyFixed = "fixed" === config.stickyStyle,
                    isStickySlide = "slide" === config.stickyStyle;
                (function() {
                    return 4 !== config.headerStyle
                })() && MK.utils.eventManager.subscribe("firstElSkinChange", changeSkin), isStickyLazy ? 2 !== config.headerStyle && function() {
                    var wScrollCurrent = 0,
                        wScrollBefore = 0,
                        wScrollDiff = 0,
                        wHeight = 0,
                        dHeight = 0,
                        setSizes = function() {
                            dHeight = $document.height(), wHeight = $window.height()
                        },
                        onScroll = function() {
                            wScrollCurrent = MK.val.scroll(), wScrollDiff = wScrollBefore - wScrollCurrent, wScrollCurrent <= 0 ? ($headerHolder.removeClass("header--hidden"), $header.removeClass("a-sticky")) : wScrollDiff > 0 && $headerHolder.hasClass("header--hidden") ? ($headerHolder.removeClass("header--hidden"), $header.addClass("a-sticky")) : wScrollDiff < 0 && (wScrollCurrent + wHeight >= dHeight && $headerHolder.hasClass("header--hidden") ? ($headerHolder.removeClass("header--hidden"), $header.addClass("a-sticky")) : ($headerHolder.addClass("header--hidden"), $header.removeClass("a-sticky"))), wScrollBefore = wScrollCurrent
                        };
                    setSizes(), onScroll(), $window.on("resize", MK.utils.throttle(100, setSizes)), $window.on("scroll", MK.utils.throttle(500, onScroll))
                }() : isStickyFixed ? function() {
                    var scrollPos, sticked = !1,
                        toggleState = function() {
                            if ((scrollPos = MK.val.scroll() + MK.val.adminbarHeight()) > MK.val.stickyOffset() && !MK.utils.isResponsiveMenuState()) {
                                if (sticked) return;
                                $header.addClass("a-sticky"), sticked = !0
                            } else {
                                if (!sticked) return;
                                $header.removeClass("a-sticky"), sticked = !1
                            }
                        };
                    toggleState(), $window.on("scroll", MK.utils.throttle(100, toggleState)), $window.on("resize", MK.utils.throttle(100, toggleState))
                }() : isStickySlide && function() {
                    var sticked = !1,
                        onScroll = function() {
                            if (MK.val.scroll() > MK.val.stickyOffset()) {
                                if (sticked) return;
                                $header.addClass("pre-sticky"), $paddingWrapper.addClass("enable-padding"), setTimeout(function() {
                                    $header.addClass("a-sticky")
                                }, 1), sticked = !0
                            } else {
                                if (!sticked) return;
                                $header.removeClass("a-sticky"), $header.removeClass("pre-sticky"), $paddingWrapper.removeClass("enable-padding"), sticked = !1
                            }
                        };
                    onScroll(), $window.on("scroll", MK.utils.throttle(100, onScroll))
                }()
            }
        }(jQuery),
        function($) {
            "use strict";

            function normalizeClick() {
                $(this).on("click", handleClick)
            }

            function handleClick(e) {
                "none" !== $(e.currentTarget).find("> ul").css("display") || (e.preventDefault(), e.stopPropagation())
            }
            "ontouchstart" in document.documentElement && $(".mk-main-navigation .menu-item-has-children").each(normalizeClick)
        }(jQuery),
        function($) {
            "use strict";

            function deactivate() {
                $contactBtn.removeClass("is-active"), $backBtn.removeClass("is-active")
            }

            function activate() {
                $contactBtn.addClass("is-active"), $backBtn.addClass("is-active")
            }
            var $wrapper = $(".js-bottom-corner-btns"),
                $contactBtn = $wrapper.find(".js-bottom-corner-btn--contact"),
                $backBtn = $wrapper.find(".js-bottom-corner-btn--back");
            $contactBtn.length;
            $backBtn.length && MK.utils.scrollSpy(400, {
                before: deactivate,
                after: activate
            })
        }(jQuery),
        function($) {
            "use strict";
            MK.ui.preloader = {
                dom: {
                    overlay: ".mk-body-loader-overlay"
                },
                hide: function() {
                    $(this.dom.overlay).fadeOut(600, "easeInOutExpo", function() {
                        $("body").removeClass("loading")
                    })
                }
            }
        }(jQuery),
        function($) {
            "use strict";
            var _ajaxUrl = MK.core.path.ajaxUrl,
                _instances = {};
            MK.utils.ajaxLoader = function(el) {
                var id = "#" + $(el).attr("id");
                if (void 0 !== _instances[id]) return _instances[id];
                this.id = id, this.el = el, this.isLoading = !1, this.xhrCounter = 0
            }, MK.utils.ajaxLoader.prototype = {
                init: function() {
                    this.initialized || (this.createInstance(), this.cacheElements(), this.initialized = !0)
                },
                cacheElements: function() {
                    this.$container = $(this.el), this.id = "#" + this.$container.attr("id"), this.categories = this.$container.data("loop-categories"), this.data = {}, this.data.action = "mk_load_more", this.data.query = this.$container.data("query"), this.data.atts = this.$container.data("loop-atts"), this.data.loop_iterator = this.$container.data("loop-iterator"), this.data.author = this.$container.data("loop-author"), this.data.posts = this.$container.data("loop-posts"), this.data.safe_load_more = this.$container.siblings("#safe_load_more").val(), this.data._wp_http_referer = this.$container.siblings('input[name="_wp_http_referer"]').val(), this.data.paged = 1, this.data.maxPages = this.$container.data("max-pages"), this.data.term = this.categories
                },
                createInstance: function() {
                    _instances[this.id] = this
                },
                load: function(unique) {
                    var self = this,
                        seq = ++this.xhrCounter;
                    if (this.isLoading = !0, this.$container.siblings(".mk-ajax-loaded-posts").length) {
                        var loaded_posts = this.$container.siblings(".mk-ajax-loaded-posts").attr("data-loop-loaded-posts");
                        1 != this.$container.attr("data-pagination-style") && (self.data.loaded_posts = loaded_posts.split(","))
                    }
                    return $.when($.ajax({
                        url: _ajaxUrl,
                        type: "POST",
                        data: self.data
                    })).done(function(response) {
                        self.onDone(response, unique, seq)
                    })
                },
                onDone: function(response, unique, seq) {
                    if (seq === this.xhrCounter) {
                        var self = this;
                        response = $.parseJSON(response), response.unique = parseInt(unique, 10), response.id = this.id, this.$container.siblings(".mk-ajax-loaded-posts").length && this.$container.siblings(".mk-ajax-loaded-posts").attr("data-loop-loaded-posts", response.loaded_posts), this.setData({
                            maxPages: response.maxPages,
                            found_posts: response.found_posts,
                            loop_iterator: response.i
                        }), $(response.content).mk_imagesLoaded().then(function() {
                            MK.utils.eventManager.publish("ajaxLoaded", response), self.isLoading = !1, self.initNewComponents()
                        })
                    } else console.log("XHR request nr " + seq + " aborted")
                },
                setData: function(atts) {
                    for (var att in atts) "term" === att && "*" === atts[att] ? this.data.term = "" : this.data[att] = atts[att]
                },
                getData: function(att) {
                    return this.data[att]
                },
                initNewComponents: function() {
                    window.ajaxInit(), setTimeout(window.ajaxDelayedInit, 1e3), MK.core.initAll(this.el)
                }
            }
        }(jQuery), MK.component.BackgroundImageSetter = function($) {
            "use strict";

            function run($layers) {
                $layers.filter(function() {
                    return !this.hasAttribute("mk-img-loaded")
                }).each(applyBg)
            }

            function applyBg() {
                var $this = $(this),
                    imgs = $this.data("mk-img-set");
                $this.css("background-image", "url(" + module.getImage(imgs) + ")"), $this.find(".mk-adaptive-image").attr("src", module.getImage(imgs))
            }

            function handleResize($layers) {
                updateScreenSize(), hasSwitched() && (updateDevice(), run($layers))
            }

            function getScreenSize() {
                return {
                    w: $win.width(),
                    h: $win.height()
                }
            }

            function getDevice() {
                return screen.w > 1024 ? {
                    class: "desktop",
                    id: 2
                } : screen.w > 736 ? {
                    class: "tablet",
                    id: 1
                } : {
                    class: "mobile",
                    id: 0
                }
            }

            function getOrientation() {
                return screen.w > screen.h ? "landscape" : "portrait"
            }

            function updateScreenSize() {
                screen = getScreenSize()
            }

            function updateDevice() {
                lastOrientation !== orientation && (orientation = lastOrientation), lastDevice.id > device.id && (device = lastDevice)
            }

            function hasSwitched() {
                return lastOrientation = getOrientation(), lastDevice = getDevice(), lastOrientation !== orientation || lastDevice.class !== device.class
            }
            var module = {},
                $win = $(window),
                screen = getScreenSize(),
                orientation = getOrientation(),
                device = getDevice(),
                lastOrientation = orientation,
                lastDevice = device;
            return module.getImage = function(imgs) {
                if ("false" === imgs.responsive) return imgs.landscape.desktop ? imgs.landscape.desktop : imgs.landscape.external ? imgs.landscape.external : "";
                var hasOrientation = !!imgs[orientation],
                    imgOriented = imgs[hasOrientation ? orientation : Object.keys(imgs)[0]];
                return imgOriented[device.class] ? imgOriented[device.class] : imgOriented.external ? imgOriented.external : ""
            }, module.init = function($layers) {
                run($layers), $layers.attr("mk-img-loaded", "")
            }, module.onResize = function($layers) {
                $win.on("resize", MK.utils.throttle(500, function() {
                    handleResize($layers)
                }))
            }, module
        }(jQuery), jQuery(function($) {
            $allLayers = $("[data-mk-img-set]").filter(function(index) {
                return !$(this).hasClass("mk-section-image") && !$(this).hasClass("background-layer") && !$(this).hasClass("mk-video-section-touch")
            }), MK.component.BackgroundImageSetter.onResize($allLayers), MK.component.BackgroundImageSetter.init($allLayers)
        }),
        function($) {
            "use strict";
            var val = MK.val;
            MK.component.FullHeight = function(el) {
                var $window = $(window),
                    $this = $(el),
                    config = $this.data("fullheight-config"),
                    container = document.getElementById("mk-theme-container"),
                    minH = config && config.min ? config.min : 0,
                    winH = null,
                    height = null,
                    update_count = 0,
                    testing = MK.utils.getUrlParameter("testing"),
                    offset = null;
                "IE" === MK.utils.browser.name && $this.css("height", "1px");
                var update = function() {
                    0 === update_count && (winH = $window.height(), offset = $this.offset().top - 1, height = Math.max(minH, winH - val.offsetHeaderHeight(offset)), $this.css("min-height", height), void 0 !== testing && update_count++)
                };
                return {
                    init: function() {
                        update(), $window.on("resize", update), $window.on("scroll", update), window.addResizeListener(container, update)
                    }
                }
            }
        }(jQuery),
        function($) {
            "use strict";
            var utils = (MK.core, MK.utils);
            MK.core.path;
            MK.ui.FullScreenGallery = function(element, settings) {
                this.element = element, this.config = settings, this.isFullScreen = !1
            }, MK.ui.FullScreenGallery.prototype = {
                dom: {
                    fullScrBtn: ".slick-full-screen",
                    exitFullScrBtn: ".slick-minimize",
                    playBtn: ".slick-play",
                    pauseBtn: ".slick-pause",
                    shareBtn: ".slick-share",
                    socialShare: ".slick-social-share",
                    wrapper: ".slick-slider-wrapper",
                    slider: ".slick-slides",
                    slides: ".slick-slide",
                    dots: ".slick-dot",
                    active: ".slick-active",
                    hiddenClass: "is-hidden",
                    dataId: "slick-index"
                },
                tpl: {
                    dot: '<div class="slick-dot"></div>',
                    next: '<a href="javascript:;" class="slick-next"> <svg width="33px" height="65px"> <polyline fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points=" 0.5,0.5 32.5,32.5 0.5,64.5"/> </svg> </a>',
                    prev: '<a href="javascript:;" class="slick-prev"> <svg  width="33px" height="65px"> <polyline fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points=" 32.5,64.5 0.5,32.5 32.5,0.5"/> </svg> </a>'
                },
                init: function() {
                    var self = this;
                    self.cacheElements(), self.getViewportSizes(), self.updateSizes("window"), self.create(), self.updateCacheElements(), self.createPagination(), self.bindEvents()
                },
                create: function() {
                    var self = this;
                    this.slick = this.$gallery.slick({
                        dots: !0,
                        arrows: !0,
                        infinite: !0,
                        speed: 300,
                        slidesToShow: 1,
                        centerMode: !0,
                        centerPadding: "0px",
                        variableWidth: !0,
                        autoplay: !1,
                        autoplaySpeed: 3e3,
                        useTransform: !0,
                        prevArrow: self.tpl.prev,
                        nextArrow: self.tpl.next,
                        customPaging: function(slider, i) {
                            return self.tpl.dot
                        }
                    })
                },
                cacheElements: function() {
                    this.$window = $(window), this.$gallery = $(this.element), this.$fullScrBtn = $(this.dom.fullScrBtn), this.$exitFullScrBtn = $(this.dom.exitFullScrBtn), this.$playBtn = $(this.dom.playBtn), this.$pauseBtn = $(this.dom.pauseBtn), this.$shareBtn = $(this.dom.shareBtn), this.$socialShare = $(this.dom.socialShare), this.$wrapper = $(this.dom.wrapper), this.$slider = $(this.dom.slider), this.$slides = $(this.dom.slides), this.$imgs = this.$slides.find("img"), this.$originalImgs = this.$imgs
                },
                updateCacheElements: function() {
                    this.$slides = $(this.dom.slides), this.$imgs = this.$slides.find("img"), this.$dots = $(this.dom.dots)
                },
                bindEvents: function() {
                    var self = this;
                    this.$fullScrBtn.on("click", this.toFullScreen.bind(this)), this.$exitFullScrBtn.on("click", this.exitFullScreen.bind(this)), this.$playBtn.on("click", this.play.bind(this)), this.$pauseBtn.on("click", this.pause.bind(this)), this.$shareBtn.on("click", this.toggleShare.bind(this)), this.$socialShare.on("click", "a", this.socialShare.bind(this)), this.$window.on("resize", this.onResize.bind(this)), this.$window.on("keydown", function(e) {
                        39 === e.keyCode && self.$gallery.slick("slickNext"), 37 === e.keyCode && self.$gallery.slick("slickPrev")
                    }), $(document).on("fullscreenchange mozfullscreenchange webkitfullscreenchange msfullcreenchange", this.exitFullScreen.bind(this))
                },
                getViewportSizes: function() {
                    this.screen = {
                        w: screen.width,
                        h: screen.height
                    }, this.window = {
                        w: this.$window.width(),
                        h: this.$window.height()
                    }
                },
                updateSizes: function(viewport) {
                    this.$wrapper.width(this[viewport].w), this.$wrapper.height("100%"), this.$imgs.height("100%")
                },
                createPagination: function() {
                    var self = this;
                    this.$dots.each(function(i) {
                        var img = self.$originalImgs.eq(i).attr("src");
                        $(this).css({
                            "background-image": "url(" + img + ")"
                        })
                    })
                },
                play: function(e) {
                    e.preventDefault(), this.$playBtn.addClass(this.dom.hiddenClass), this.$pauseBtn.removeClass(this.dom.hiddenClass), $(this.element).slick("slickPlay")
                },
                pause: function(e) {
                    e.preventDefault(), this.$pauseBtn.addClass(this.dom.hiddenClass), this.$playBtn.removeClass(this.dom.hiddenClass), $(this.element).slick("slickPause")
                },
                toggleShare: function(e) {
                    e.preventDefault(), this.$socialShare.toggleClass(this.dom.hiddenClass)
                },
                getCurentId: function() {
                    return this.$slides.filter(this.dom.active).data(this.dom.dataId)
                },
                toFullScreen: function() {
                    var self = this;
                    this.$fullScrBtn.addClass(this.dom.hiddenClass), this.$exitFullScrBtn.removeClass(this.dom.hiddenClass), this.$slider.hide().fadeIn(500), utils.launchIntoFullscreen(document.documentElement), this.updateSizes("screen"), $(this.element).slick("slickGoTo", this.getCurentId(), !0), setTimeout(function() {
                        self.isFullScreen = !0
                    }, 1e3)
                },
                exitFullScreen: function() {
                    this.isFullScreen && (this.$exitFullScrBtn.addClass(this.dom.hiddenClass), this.$fullScrBtn.removeClass(this.dom.hiddenClass), utils.exitFullscreen(), this.updateSizes("window"), $(this.element).slick("slickGoTo", this.getCurentId(), !0), this.isFullScreen = !1)
                },
                onResize: function() {
                    this.getViewportSizes(), this.updateSizes(this.isFullScreen ? "screen" : "window"), $(this.element).slick("refresh"), $(this.element).slick("slickGoTo", this.getCurentId(), !0), this.updateCacheElements(), this.createPagination()
                },
                socialShare: function(e) {
                    e.preventDefault();
                    var name, $this = $(e.currentTarget),
                        network = $this.data("network"),
                        id = this.config.id,
                        url = this.config.url,
                        title = this.$wrapper.find(".slick-title").text(),
                        picture = this.$slides.filter(this.dom.active).children().first().attr("src");
                    switch (network) {
                        case "facebook":
                            url = "https://www.facebook.com/sharer/sharer.php?picture=" + picture + "&u=" + url + "#id=" + id, name = "Facebook Share";
                            break;
                        case "twitter":
                            url = "http://twitter.com/intent/tweet?text=" + url + "#id=" + id, name = "Twitter Share";
                            break;
                        case "pinterest":
                            url = "http://pinterest.com/pin/create/bookmarklet/?media=" + picture + "&url=" + url + "&is_video=false&description=" + title, name = "Pinterest Share"
                    }
                    window.open(url, name, "height=380 ,width=660, resizable=0, toolbar=0, menubar=0, status=0, location=0, scrollbars=0")
                }
            }
        }(jQuery),
        function($) {
            "use strict";
            MK.component.Grid = function(el) {
                var $container = $(el),
                    config = $container.data("grid-config"),
                    isSlideshow = $container.closest('[data-mk-component="SwipeSlideshow"]').length,
                    miniGridConfig = {
                        container: el,
                        item: config.item + ":not(.is-hidden)",
                        gutter: 0
                    },
                    prepareForGrid = function() {
                        var $item = $(this);
                        "none" === $item.css("display") ? $item.addClass("is-hidden") : $item.removeClass("is-hidden")
                    },
                    create = function() {
                        function draw() {
                            $container.find(config.item).each(prepareForGrid), minigrid(miniGridConfig)
                        }

                        function redraw() {
                            timer && clearTimeout(timer), timer = setTimeout(draw, 100)
                        }
                        var timer = null;
                        draw(), $(window).off("resize", redraw), $(window).on("resize", redraw), MK.utils.eventManager.subscribe("item-expanded", redraw), MK.utils.eventManager.subscribe("ajaxLoaded", redraw), MK.utils.eventManager.subscribe("staticFilter", redraw)
                    };
                return {
                    init: function() {
                        isSlideshow || MK.core.loadDependencies([MK.core.path.plugins + "minigrid.js"], create)
                    }
                }
            }
        }(jQuery),
        function(t, e) {
            "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
        }("undefined" != typeof window ? window : this, function() {
            function t() {}
            var e = t.prototype;
            return e.on = function(t, e) {
                if (t && e) {
                    var i = this._events = this._events || {},
                        n = i[t] = i[t] || [];
                    return -1 == n.indexOf(e) && n.push(e), this
                }
            }, e.once = function(t, e) {
                if (t && e) {
                    this.on(t, e);
                    var i = this._onceEvents = this._onceEvents || {};
                    return (i[t] = i[t] || {})[e] = !0, this
                }
            }, e.off = function(t, e) {
                var i = this._events && this._events[t];
                if (i && i.length) {
                    var n = i.indexOf(e);
                    return -1 != n && i.splice(n, 1), this
                }
            }, e.emitEvent = function(t, e) {
                var i = this._events && this._events[t];
                if (i && i.length) {
                    var n = 0,
                        o = i[n];
                    e = e || [];
                    for (var r = this._onceEvents && this._onceEvents[t]; o;) {
                        var s = r && r[o];
                        s && (this.off(t, o), delete r[o]), o.apply(this, e), n += s ? 0 : 1, o = i[n]
                    }
                    return this
                }
            }, t
        }),
        function(t, e) {
            "use strict";
            "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function(i) {
                return e(t, i)
            }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
        }(window, function(t, e) {
            function i(t, e) {
                for (var i in e) t[i] = e[i];
                return t
            }

            function n(t) {
                var e = [];
                if (Array.isArray(t)) e = t;
                else if ("number" == typeof t.length)
                    for (var i = 0; i < t.length; i++) e.push(t[i]);
                else e.push(t);
                return e
            }

            function o(t, e, r) {
                return this instanceof o ? ("string" == typeof t && (t = document.querySelectorAll(t)), this.elements = n(t), this.options = i({}, this.options), "function" == typeof e ? r = e : i(this.options, e), r && this.on("always", r), this.getImages(), h && (this.jqDeferred = new h.Deferred), void setTimeout(function() {
                    this.check()
                }.bind(this))) : new o(t, e, r)
            }

            function r(t) {
                this.img = t
            }

            function s(t, e) {
                this.url = t, this.element = e, this.img = new Image
            }
            var h = t.jQuery,
                a = t.console;
            o.prototype = Object.create(e.prototype), o.prototype.options = {}, o.prototype.getImages = function() {
                this.images = [], this.elements.forEach(this.addElementImages, this)
            }, o.prototype.addElementImages = function(t) {
                "IMG" == t.nodeName && this.addImage(t), !0 === this.options.background && this.addElementBackgroundImages(t);
                var e = t.nodeType;
                if (e && d[e]) {
                    for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
                        var o = i[n];
                        this.addImage(o)
                    }
                    if ("string" == typeof this.options.background) {
                        var r = t.querySelectorAll(this.options.background);
                        for (n = 0; n < r.length; n++) {
                            var s = r[n];
                            this.addElementBackgroundImages(s)
                        }
                    }
                }
            };
            var d = {
                1: !0,
                9: !0,
                11: !0
            };
            return o.prototype.addElementBackgroundImages = function(t) {
                var e = getComputedStyle(t);
                if (e)
                    for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
                        var o = n && n[2];
                        o && this.addBackground(o, t), n = i.exec(e.backgroundImage)
                    }
            }, o.prototype.addImage = function(t) {
                var e = new r(t);
                this.images.push(e)
            }, o.prototype.addBackground = function(t, e) {
                var i = new s(t, e);
                this.images.push(i)
            }, o.prototype.check = function() {
                function t(t, i, n) {
                    setTimeout(function() {
                        e.progress(t, i, n)
                    })
                }
                var e = this;
                return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function(e) {
                    e.once("progress", t), e.check()
                }) : void this.complete()
            }, o.prototype.progress = function(t, e, i) {
                this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, t, e)
            }, o.prototype.complete = function() {
                var t = this.hasAnyBroken ? "fail" : "done";
                if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
                    var e = this.hasAnyBroken ? "reject" : "resolve";
                    this.jqDeferred[e](this)
                }
            }, r.prototype = Object.create(e.prototype), r.prototype.check = function() {
                return this.getIsImageComplete() ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
            }, r.prototype.getIsImageComplete = function() {
                return this.img.complete && void 0 !== this.img.naturalWidth
            }, r.prototype.confirm = function(t, e) {
                this.isLoaded = t, this.emitEvent("progress", [this, this.img, e])
            }, r.prototype.handleEvent = function(t) {
                var e = "on" + t.type;
                this[e] && this[e](t)
            }, r.prototype.onload = function() {
                this.confirm(!0, "onload"), this.unbindEvents()
            }, r.prototype.onerror = function() {
                this.confirm(!1, "onerror"), this.unbindEvents()
            }, r.prototype.unbindEvents = function() {
                this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
            }, s.prototype = Object.create(r.prototype), s.prototype.check = function() {
                this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
            }, s.prototype.unbindEvents = function() {
                this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
            }, s.prototype.confirm = function(t, e) {
                this.isLoaded = t, this.emitEvent("progress", [this, this.element, e])
            }, o.makeJQueryPlugin = function(e) {
                (e = e || t.jQuery) && (h = e, h.fn.imagesLoaded = function(t, e) {
                    return new o(this, t, e).jqDeferred.promise(h(this))
                })
            }, o.makeJQueryPlugin(), o
        }), imagesLoaded.prototype.abort = function() {
            this.progress = this.complete = function() {}
        },
        function($) {
            "use strict";

            function createAll(scope) {
                for (var i = 0, l = families.length; i < l; i++) {
                    var family = families[i][0],
                        prefix = families[i][1],
                        $icons = getIcons(family, prefix, scope);
                    $icons.length && (_roundCount++, setTimeout(createIcons, 0, $icons, family, prefix))
                }
            }

            function getIcons(family, prefix, scope) {
                var $scope = $(scope),
                    $icons = $scope.find("[class*=" + prefix + "]"),
                    extraClassNames = extend[family];
                return extraClassNames ? (extraClassNames.forEach(function(className) {
                    var $icon = $scope.find(className);
                    $icons = $icons.add($icon)
                }), $icons) : $icons
            }

            function createIcons($icons, family, prefix, i, unicode) {
                var id = i || 0,
                    icon = $icons[id];
                if (!icon) return _roundCount--, void getIconsSprite(insertIcons, $icons, _roundCount, _config);
                var css = getComputedStyle(icon, ":before"),
                    classAttr = icon.getAttribute("class"),
                    name = !!classAttr && matchClass(classAttr.split(" "), prefix),
                    h = getComputedStyle(icon).fontSize,
                    config = createConfig(css, name, family, unicode, h),
                    cache = JSON.stringify(config);
                config && (_cache[cache] ? void 0 === _iconMap[cache] ? _iconMap[cache] = [$icons.eq(id)] : _iconMap[cache].push($icons.eq(id)) : (void 0 === _iconMap[cache] ? _iconMap[cache] = [$icons.eq(id)] : _iconMap[cache].push($icons.eq(id)), _cache[cache] = _cacheId.toString(), config.id = _cacheId, _config.push(config), _cacheId++)), createIcons($icons, family, prefix, ++id)
            }

            function insertIcons(sprite, $icons) {
                var $sprite = $(sprite),
                    idMap = ($sprite.find("svg"), invert(_cache));
                $sprite.each(function() {
                    var $svg = $(this),
                        id = $svg.attr("data-cacheid"),
                        configKey = idMap[id];
                    _cache[configKey] = this
                }), Object.keys(_iconMap).forEach(function(cacheKey) {
                    _iconMap[cacheKey].forEach(function($icons) {
                        $icons.each(function() {
                            var $svg = $(_cache[cacheKey]).clone(),
                                $icon = $(this);
                            $svg.length && function() {
                                $icon.parents(".pricing-features") || $icon.not(".mk-jupiter-icon-xing").not(".mk-jupiter-icon-square-xing").not(".mk-jupiter-icon-simple-xing").find(".mk-svg-icon").not('[data-name="mk-moon-zoom-in"]').remove()
                            }(), $icon.find("svg").length || ($icon.parents(".widget ul").length ? $icon.prepend($svg) : $icon.append($svg))
                        })
                    })
                }), MK.utils.eventManager.publish("iconsInsert")
            }

            function createConfig(css, name, family, unicode, height) {
                var hasGradient = checkGradient(css),
                    hasDirection = extractGradient("direction", css.background),
                    config = {
                        family: family,
                        unicode: unicode || decodeUnicode(css.content),
                        name: name,
                        gradient_type: !!hasGradient && extractGradient("type", css.background),
                        gradient_start: !!hasGradient && extractGradient("start", css.background),
                        gradient_stop: !!hasGradient && extractGradient("stop", css.background),
                        gradient_direction: !!hasDirection && extractGradient("direction", css.background).replace(" ", "-"),
                        height: height
                    };
                return !(!config.name && !config.unicode) && config
            }

            function matchClass(classes, prefix) {
                for (var i = 0, l = classes.length; i < l; i++)
                    if (-1 !== classes[i].indexOf(prefix)) return classes[i]
            }

            function checkGradient(css) {
                var bg = css.background;
                return (-1 !== bg.indexOf("radial") || -1 !== bg.indexOf("linear")) && bg
            }

            function extractGradient(attr, grad) {
                if (!grad) return !1;
                var f, t, isRadial = -1 !== grad.indexOf("radial"),
                    isLinear = -1 !== grad.indexOf("linear"),
                    hasDirection = -1 !== grad.indexOf("(to");
                if ("type" === attr) {
                    if (isRadial) return "radial";
                    if (isLinear) return "linear"
                } else if ("start" === attr) f = getStrPosition(grad, "rgb(", 1), t = getStrPosition(grad, "0%", 1);
                else if ("stop" === attr) f = getStrPosition(grad, "rgb(", 2), t = getStrPosition(grad, "100%", 1);
                else {
                    if ("direction" !== attr) return !1;
                    if (!hasDirection) return !1;
                    f = getStrPosition(grad, "(to", 1) + 4, t = getStrPosition(grad, ", rgb(", 1)
                }
                return grad.slice(f, t)
            }

            function getStrPosition(str, m, i) {
                return str.split(m, i).join(m).length
            }

            function decodeUnicode(content) {
                return !(!content || "none" === content) && escape(content).replace(/%22/g, "").replace("%u", "").toLowerCase()
            }

            function invert(obj) {
                var new_obj = {};
                for (var prop in obj) obj.hasOwnProperty(prop) && (new_obj[obj[prop]] = prop);
                return new_obj
            }
            var families = [
                    ["awesome-icons", "mk-icon-"],
                    ["icomoon", "mk-moon-"],
                    ["pe-line-icons", "mk-li-"],
                    ["theme-icons", "mk-jupiter-icon-"]
                ],
                extend = {
                    "awesome-icons": [],
                    icomoon: [],
                    "pe-line-icons": [],
                    "theme-icons": []
                },
                _cache = {},
                _cacheId = 0,
                _config = [],
                _roundCount = 0,
                _iconMap = {},
                getIconsSprite = function() {
                    function run(callback) {
                        var config = encodeURIComponent(JSON.stringify(_config));
                        $.ajax({
                            url: MK.core.path.ajaxUrl,
                            method: "POST",
                            data: {
                                action: "mk_get_icon",
                                iterator: iterator++,
                                config: config
                            },
                            success: function(sprite) {
                                callback(sprite, $icons), _config = [], _iconMap = {}, $icons = null
                            },
                            error: function(err) {
                                console.log("Icon load problem")
                            }
                        })
                    }
                    var $icons = null,
                        iterator = 0;
                    return function(callback, $els, count) {
                        $icons ? $icons.add($els) : $icons = $els, count || run(callback)
                    }
                }();
            $(window).on("load", function() {
                setTimeout(function() {
                    createAll(document), $(".mk-header").length && createAll(".mk-header"), $(".js-flexslider, .mk-flexslider").length && createAll(".js-flexslider, .mk-flexslider"), $(".mk-accordion").length && createAll(".mk-accordion")
                }, 1e3)
            }), MK.utils.eventManager.subscribe("ajaxLoaded", function() {
                setTimeout(createAll, 100, ".js-loop")
            }), MK.utils.eventManager.subscribe("ajax-preview", function() {
                setTimeout(createAll, 100, ".ajax-container")
            }), MK.utils.eventManager.subscribe("photoAlbum-open", function() {
                setTimeout(createAll, 100, ".gallery-share")
            }), MK.utils.eventManager.subscribe("quickViewOpen", function() {
                setTimeout(createAll, 300, ".mk-modal-content")
            })
        }(jQuery),
        function($, window) {
            "use strict";

            function pagination() {
                function bindHandlers() {
                    isLoadBtn && $loadBtn.on("click", handleClick), isInfiniteScroll && $window.on("scroll", handleScroll), isHandlerBinded = !0
                }

                function unbindHandlers() {
                    isLoadBtn && $loadBtn.off("click", handleClick), isInfiniteScroll && $window.off("scroll", handleScroll), isHandlerBinded = !1
                }

                function handleClick(e) {
                    e.preventDefault(), ajaxLoader.isLoading || loadMore()
                }

                function handleScroll() {
                    scrollY() > scrollCheckPoint() && !ajaxLoader.isLoading && loadMore()
                }

                function loadMore() {
                    loadingIndicatorStart();
                    var page = ajaxLoader.getData("paged");
                    ajaxLoader.setData({
                        paged: ++page
                    }), ajaxLoader.load(unique)
                }

                function onLoad(e, response) {
                    void 0 !== response && response.id === id && (ajaxLoader.getData("found_posts") <= 0 && ajaxLoader.getData("paged") >= ajaxLoader.getData("maxPages") ? loadingIndicatorHide() : loadingIndicatorShow(), response.unique === unique && $container.append(response.content), loadingIndicatorStop())
                }

                function loadingIndicatorStart() {
                    isLoadBtn ? $loadBtn.addClass("is-active") : isInfiniteScroll && MK.ui.loader.add(".js-load-more-scroll")
                }

                function loadingIndicatorStop() {
                    isLoadBtn ? $loadBtn.removeClass("is-active") : isInfiniteScroll && MK.ui.loader.remove(".js-load-more-scroll")
                }

                function loadingIndicatorShow() {
                    isHandlerBinded || (isLoadBtn ? $loadBtn.show() : isInfiniteScroll && $loadScroll.show(), bindHandlers())
                }

                function loadingIndicatorHide() {
                    isHandlerBinded && (isLoadBtn ? $loadBtn.hide() : isInfiniteScroll && $loadScroll.hide(), unbindHandlers())
                }

                function spyScrollCheckPoint() {
                    var containerO = 0,
                        containerH = dynamicHeight($superContainer),
                        winH = dynamicHeight(window),
                        setVals = function() {
                            containerO = $superContainer.offset().top
                        };
                    return setVals(), $window.on("resize", function() {
                            requestAnimationFrame(setVals)
                        }),
                        function() {
                            return containerH() + containerO - 2 * winH()
                        }
                }
                var unique = Date.now(),
                    $container = $(this),
                    $superContainer = $container.parent(),
                    $loadBtn = $container.siblings(".js-loadmore-holder").find(".js-loadmore-button"),
                    $loadScroll = $(".js-load-more-scroll"),
                    style = $container.data("pagination-style"),
                    id = ($container.data("max-pages"), "#" + $container.attr("id")),
                    ajaxLoader = new MK.utils.ajaxLoader(id),
                    isLoadBtn = 2 === style,
                    isInfiniteScroll = 3 === style,
                    scrollCheckPoint = null,
                    isHandlerBinded = !1;
                ajaxLoader.init(),
                    function() {
                        MK.utils.eventManager.subscribe("ajaxLoaded", onLoad), bindHandlers(), isInfiniteScroll && (scrollCheckPoint = spyScrollCheckPoint())
                    }()
            }
            var scrollY = MK.val.scroll,
                dynamicHeight = MK.val.dynamicHeight,
                $window = $(window);
            $(".js-loop").each(pagination)
        }(jQuery, window),
        function($) {
            "use strict";

            function isHidden(el) {
                return null === el.offsetParent
            }
            MK.component.Masonry = function(el) {
                var $window = $(window),
                    $container = $(el),
                    config = $container.data("masonry-config"),
                    $masonryItems = $container.find(config.item),
                    cols = config.cols || 8,
                    wall = null,
                    init = function() {
                        MK.core.loadDependencies([MK.core.path.plugins + "freewall.js"], onDepLoad)
                    },
                    onDepLoad = function() {
                        masonry(), $window.on("resize", onResize), MK.utils.eventManager.subscribe("ajaxLoaded", onPostAddition), MK.utils.eventManager.subscribe("staticFilter", resize)
                    },
                    masonry = function() {
                        if (!isHidden(el)) {
                            var newCols;
                            newCols = window.matchMedia("(max-width:600px)").matches ? 2 : window.matchMedia("(max-width:850px)").matches ? 4 : cols;
                            var colW = $container.width() / newCols;
                            wall = new Freewall(config.container), wall.reset({
                                selector: config.item + ":not(.is-hidden)",
                                gutterX: 0,
                                gutterY: 0,
                                cellW: colW,
                                cellH: colW
                            }), wall.fillHoles(), wall.fitWidth(), $masonryItems.each(function() {
                                $(this).data("loaded", !0)
                            })
                        }
                    },
                    destroyContainer = function() {
                        $container.removeAttr("style").removeData("wall-height").removeData("wall-width").removeData("min-width").removeData("total-col").removeData("total-row").removeAttr("data-wall-height").removeAttr("data-wall-width").removeAttr("data-min-width").removeAttr("data-total-col").removeAttr("data-total-row")
                    },
                    destroyItem = function() {
                        $(this).removeAttr("style").removeData("delay").removeData("height").removeData("width").removeData("state").removeAttr("data-delay").removeAttr("data-height").removeAttr("data-width").removeAttr("data-state")
                    },
                    destroyAll = function() {
                        wall && (wall.destroy(), destroyContainer(), $masonryItems.each(destroyItem))
                    },
                    onResize = function() {
                        requestAnimationFrame(resize)
                    },
                    resize = function() {
                        destroyAll(), masonry()
                    },
                    onPostAddition = function() {
                        $masonryItems = $container.find(config.item), $masonryItems.each(function() {
                            var $item = $(this);
                            $item.data("loaded") || $item.css("visibility", "hidden")
                        }), $container.mk_imagesLoaded().then(function() {
                            destroyAll(), masonry()
                        })
                    };
                return {
                    init: init
                }
            }
        }(jQuery),
        function($) {
            "use strict";
            MK.component.Pagination = function(el) {
                this.el = el
            }, MK.component.Pagination.prototype = {
                init: function() {
                    this.cacheElements(), this.bindEvents()
                },
                cacheElements: function() {
                    this.lastId = 1, this.unique = Date.now(), this.$pagination = $(this.el), this.$container = this.$pagination.prev(".js-loop"), this.$pageLinks = this.$pagination.find(".js-pagination-page"), this.$nextLink = this.$pagination.find(".js-pagination-next"), this.$prevLink = this.$pagination.find(".js-pagination-prev"), this.$current = this.$pagination.find(".js-current-page"), this.$maxPages = this.$pagination.find(".pagination-max-pages"), this.containerId = "#" + this.$container.attr("id"), this.ajaxLoader = new MK.utils.ajaxLoader("#" + this.$container.attr("id")), this.ajaxLoader.init()
                },
                bindEvents: function() {
                    this.$pageLinks.on("click", this.pageClick.bind(this)), this.$nextLink.on("click", this.nextClick.bind(this)), this.$prevLink.on("click", this.prevClick.bind(this)), MK.utils.eventManager.subscribe("ajaxLoaded", this.onLoad.bind(this))
                },
                pageClick: function(e) {
                    e.preventDefault();
                    var $this = $(e.currentTarget),
                        id = parseFloat($this.attr("data-page-id"));
                    id > this.ajaxLoader.getData("maxPages") || id < 1 || this.load(id, $this)
                },
                nextClick: function(e) {
                    e.preventDefault(), this.ajaxLoader.getData("paged") !== this.ajaxLoader.getData("maxPages") && this.load(++this.lastId, $(e.currentTarget))
                },
                prevClick: function(e) {
                    e.preventDefault(), 1 !== this.ajaxLoader.getData("paged") && this.load(--this.lastId, $(e.currentTarget))
                },
                load: function(id, $el) {
                    this.lastId = id, this.ajaxLoader.setData({
                        paged: id
                    }), this.ajaxLoader.load(this.unique), this.removeIndicator(), MK.ui.loader.add($el)
                },
                onLoad: function(e, response) {
                    void 0 !== response && response.id === this.containerId && (this.updatePagination(), this.lastId = this.ajaxLoader.getData("paged"), response.unique === this.unique && (this.removeIndicator(), this.scrollPage(), this.$container.html(response.content)))
                },
                updatePagination: function() {
                    var self = this,
                        isFirst = 1 === this.ajaxLoader.getData("paged"),
                        isLast = this.ajaxLoader.getData("paged") === this.ajaxLoader.getData("maxPages");
                    isFirst ? this.$prevLink.addClass("is-vis-hidden") : this.$prevLink.removeClass("is-vis-hidden"), isLast ? this.$nextLink.addClass("is-vis-hidden") : this.$nextLink.removeClass("is-vis-hidden"), this.$current.html(this.ajaxLoader.getData("paged")), this.$maxPages.html(this.ajaxLoader.getData("maxPages"));
                    this.ajaxLoader.getData("maxPages") > 10 ? this.$pageLinks.each(function(i) {
                        var id = self.lastId - 5;
                        id = Math.max(id, 1), id = Math.min(id, self.ajaxLoader.getData("maxPages") - 10 + 1), id += i, $(this).html(id).attr("data-page-id", id).show(), 0 === i && id > 1 && $(this).html("..."), 9 === i && id < self.ajaxLoader.getData("maxPages") && $(this).html("...")
                    }) : this.$pageLinks.each(function(i) {
                        var $link = $(this),
                            id = i + 1;
                        $link.html(id).attr("data-page-id", id), 1 === self.ajaxLoader.getData("maxPages") ? self.$pageLinks.hide() : i > self.ajaxLoader.getData("maxPages") - 1 ? $link.hide() : $link.show()
                    }), this.$pageLinks.filter('[data-page-id="' + this.ajaxLoader.getData("paged") + '"]').addClass("current-page").siblings().removeClass("current-page")
                },
                scrollPage: function() {
                    var containerOffset = this.$container.offset().top,
                        offset = containerOffset - MK.val.offsetHeaderHeight(containerOffset) - 20;
                    MK.utils.scrollTo(offset)
                },
                removeIndicator: function() {
                    MK.ui.loader.remove(".js-pagination-page, .js-pagination-next, .js-pagination-prev")
                }
            }
        }(jQuery),
        function($) {
            "use strict";
            var val = MK.val;
            MK.utils;
            MK.component.Parallax = function(el) {
                var $this = $(el),
                    obj = $this[0],
                    $window = $(window),
                    container = document.getElementById("mk-theme-container"),
                    config = $this.data("parallax-config"),
                    headerHeight = ($(config.holder), null),
                    offset = null,
                    elHeight = null,
                    ticking = !1,
                    isMobile = null,
                    clientRect = null,
                    update = function() {
                        if (obj.style.transform = null, obj.style.top = null, obj.style.bottom = null, isMobile = MK.utils.isMobile()) return void $this.css("height", "");
                        clientRect = $this[0].getBoundingClientRect(), offset = clientRect.top, elHeight = clientRect.height, headerHeight = val.offsetHeaderHeight(offset), offset = offset - headerHeight + val.scroll(), setPosition(), setSize()
                    },
                    h = 0,
                    winH = 0,
                    proportion = 0,
                    height = 0,
                    setSize = function() {
                        if ($this.css("height", ""), winH = $window.height() - headerHeight, h = obj.getBoundingClientRect().height, config.speed <= 1 && config.speed > 0) 0 === offset ? $this.css({
                            backgroundAttachment: "scroll",
                            "will-change": "transform"
                        }) : $this.css({
                            height: h + (winH - h) * config.speed,
                            backgroundAttachment: "scroll",
                            "will-change": "transform"
                        });
                        else if (config.speed > 1 && h <= winH) $this.css({
                            height: winH + 2 * (winH * config.speed - winH),
                            top: -(winH * config.speed - winH),
                            backgroundAttachment: "scroll",
                            "will-change": "transform"
                        });
                        else if (config.speed > 1 && h > winH) proportion = h / winH, height = winH + (winH * config.speed - winH) * (1 + proportion), $this.css({
                            height: height,
                            top: -(height - winH * config.speed),
                            backgroundAttachment: "scroll",
                            "will-change": "transform"
                        });
                        else if (config.speed < 0 && h >= winH) height = h * (1 - config.speed), $this.css({
                            height: height + (height - h),
                            top: h - height,
                            backgroundAttachment: "scroll",
                            "will-change": "transform"
                        });
                        else if (config.speed < 0 && h < winH) {
                            var display = (winH + h) / winH;
                            height = h * -config.speed * display, $this.css({
                                height: h + 2 * height,
                                top: -height,
                                backgroundAttachment: "scroll",
                                "will-change": "transform"
                            })
                        }
                    },
                    currentPoint = null,
                    startPoint = null,
                    endPoint = null,
                    scrollY = (config.opacity && $this.find(config.opacity), null),
                    setPosition = function() {
                        if (startPoint = offset - winH, endPoint = offset + elHeight + winH - headerHeight, (scrollY = val.scroll()) < startPoint || scrollY > endPoint) return void(ticking = !1);
                        currentPoint = (-offset + scrollY) * config.speed, $this.css({
                            "-webkit-transform": "translateY(" + currentPoint + "px) translateZ(0)",
                            "-moz-transform": "translateY(" + currentPoint + "px) translateZ(0)",
                            "-ms-transform": "translateY(" + currentPoint + "px) translateZ(0)",
                            "-o-transform": "translateY(" + currentPoint + "px) translateZ(0)",
                            transform: "translateY(" + currentPoint + "px) translateZ(0)"
                        }), ticking = !1
                    },
                    requestTick = function() {
                        ticking || isMobile || (ticking = !0, window.requestAnimationFrame(setPosition))
                    };
                return {
                    init: function() {
                        MK.utils.isSmoothScroll && (update(), setTimeout(update, 100), $window.on("load", update), $window.on("resize", update), window.addResizeListener(container, update), $window.on("scroll", requestTick))
                    }
                }
            }
        }(jQuery),
        function($) {
            "use strict";
            MK.component.Preloader = function(el) {
                this.el = el
            }, MK.component.Preloader.prototype = {
                init: function() {
                    this.cacheElements(), this.bindEvents()
                },
                cacheElements: function() {
                    this.$preloader = $(this.el)
                },
                bindEvents: function() {
                    this.onLoad()
                },
                onLoad: function() {
                    setTimeout(this.hidePreloader.bind(this), 300)
                },
                hidePreloader: function() {
                    this.$preloader.hide()
                }
            }
        }(jQuery),
        function($) {
            "use strict";
            MK.ui.loader = {
                tpl: function() {
                    return '<div class="mk-loading-indicator"><div class="mk-loading-indicator__inner"><div class="mk-loading-indicator__icon"></div><img style="height:100%; width:auto;" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></div></div>'
                },
                add: function(item) {
                    $(item).append(this.tpl)
                },
                remove: function(item) {
                    item ? $(item).find(".mk-loading-indicator").remove() : $(".mk-loading-indicator").remove()
                }
            }
        }(jQuery), MK.component.ResponsiveImageSetter = function($) {
            "use strict";

            function run($imgs) {
                $imgs.filter(function() {
                    return !this.hasAttribute("mk-img-src-setted")
                }).each(setSrcAttr)
            }

            function setSrcAttr() {
                var $img = $(this),
                    set = $img.data("mk-image-src-set");
                "false" === set.responsive && isRetina && set["2x"] ? $img.attr("src", set["2x"]) : "false" === set.responsive ? $img.attr("src", set.default) : 1 === viewportClass && isRetina && set["2x"] ? $img.attr("src", set["2x"]) : 0 === viewportClass && set.mobile ? $img.attr("src", set.mobile) : $img.attr("src", set.default)
            }

            function getViewportClass() {
                return window.matchMedia("(max-width: 736px)").matches ? 0 : 1
            }

            function handleResize($imgs) {
                if ($imgs.length) {
                    var currentViewportClass = getViewportClass();
                    currentViewportClass > viewportClass && (viewportClass = currentViewportClass, run($imgs))
                }
            }
            var module = {},
                viewportClass = getViewportClass(),
                isRetina = window.devicePixelRatio >= 2;
            return module.init = function($imgs) {
                $imgs.length && (run($imgs), $imgs.attr("mk-img-src-setted", ""))
            }, module.onResize = function($imgs) {
                $(window).on("resize", MK.utils.throttle(500, function() {
                    handleResize($imgs)
                }))
            }, module.handleAjax = function() {
                setTimeout(function() {
                    var $newImgs = $("img[data-mk-image-src-set]").filter(function() {
                        return !this.hasAttribute("mk-lazyload")
                    });
                    $newImgs.length && run($newImgs)
                }, 100)
            }, module
        }(jQuery), jQuery(function($) {
            $allImages = $("img[data-mk-image-src-set]").filter(function(index) {
                var isNotPortfolioImage = !$(this).hasClass("portfolio-image"),
                    isNotBlogImage = 0 == $(this).closest(".mk-blog-container").length,
                    isNotSwiperImage = !$(this).hasClass("swiper-slide-image"),
                    isNotGalleryImage = !$(this).hasClass("mk-gallery-image");
                return isNotPortfolioImage && isNotBlogImage && isNotSwiperImage && isNotGalleryImage
            }), MK.component.ResponsiveImageSetter.onResize($allImages), MK.component.ResponsiveImageSetter.init($allImages), MK.utils.eventManager.subscribe("ajaxLoaded", MK.component.ResponsiveImageSetter.handleAjax), MK.utils.eventManager.subscribe("ajax-preview", MK.component.ResponsiveImageSetter.handleAjax), MK.utils.eventManager.subscribe("quickViewOpen", MK.component.ResponsiveImageSetter.handleAjax)
        }),
        function($) {
            if ("Edge" === MK.utils.browser.name || "IE" === MK.utils.browser.name) {
                var val = 1,
                    $edgeClipper = $(".mk-slider-slide"),
                    $sectionClipper = $(".clipper-true"),
                    $bgLayer = $(".background-layer"),
                    onScroll = function() {
                        val *= -1, $edgeClipper.length && $edgeClipper.each(redraw), $sectionClipper.length && $sectionClipper.each(redraw), $bgLayer.length && $bgLayer.each(redraw)
                    },
                    redraw = function() {
                        $(this).css("margin-top", val / 100)
                    };
                $(window).on("scroll", function() {
                    window.requestAnimationFrame(onScroll)
                })
            }
        }(jQuery),
        function($) {
            "use strict";
            var utils = MK.utils,
                val = MK.val,
                $topLevelSections = $("#theme-page > .vc_row, #theme-page > .mk-main-wrapper-holder, #theme-page > .mk-page-section");
            $(document).on("click", ".mk-skip-to-next", function() {
                var $this = $(this),
                    offset = $this.offset().top,
                    nextOffset = utils.nextHigherVal(offset, utils.offsets($topLevelSections));
                utils.scrollTo(nextOffset - val.offsetHeaderHeight(nextOffset))
            })
        }(jQuery),
        function($) {
            "use strict";
            MK.ui.Slider = function(container, config) {
                var defaults = {
                    slide: ".mk-slider-slide",
                    nav: ".mk-slider-nav",
                    effect: "roulete",
                    ease: "easeOutQuart",
                    slidesPerView: 1,
                    slidesToView: 1,
                    transitionTime: 700,
                    displayTime: 3e3,
                    autoplay: !0,
                    hasNav: !0,
                    hasPagination: !0,
                    paginationTpl: "<span></span>",
                    paginationEl: "#pagination",
                    draggable: !0,
                    fluidHeight: !1,
                    pauseOnHover: !1,
                    lazyload: !1,
                    activeClass: "is-active",
                    edgeSlider: !1,
                    spinnerTpl: '<div class="mk-slider-spinner-wrap"><div class="mk-slider-spinner-fallback"></div><svg class="mk-slider-spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="mk-slider-spinner-path" fill="none" stroke-width="4" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg></div>',
                    onInitialize: function() {},
                    onAfterSlide: function(id) {},
                    onBeforeSlide: function(id) {}
                };
                this.state = {
                    id: 0,
                    moveForward: !0,
                    running: !1,
                    zIFlow: null,
                    stop: !1
                }, this.config = $.extend(defaults, config), this.container = container, this.initPerView = this.config.slidesPerView, this.activeTimer = null, this.autoplay = null, this.timer = null, this.timerRemaining = parseInt(this.config.displayTime), this.config.lazyload = JSON.parse(this.config.lazyload), this.config.edgeSlider = JSON.parse(this.config.edgeSlider), this.imageLoader = null
            }, MK.ui.Slider.prototype = {
                init: function() {
                    if (this.setPerViewItems(), this.cacheElements(), this.getSlideSize(), this.bindEvents(), this.setSize(), this.setPos(), this.updateId(-1), this.updateId(1), this.val = this.dynamicVal(), this.timeline = this.prepareTimeline(this.config.transitionTime), this.timeline.build(), this.config.hasPagination && this.buildPagination(), this.config.autoplay && document.hasFocus() && this.setTimer(), "function" == typeof this.config.onInitialize && this.config.onInitialize(this.slides), !0 === this.config.fluidHeight && ($(this.slides).height("auto"), $(this.container).css("transition", "height 200ms ease-out"), this.setHeight(0)), "toHighest" === this.config.fluidHeight && this.setHeightToHighest(), $(this.slides).each(this.createTimer), this.config.lazyload && this.config.edgeSlider) {
                        if (0 === $(this.slides[this.state.id]).find("video").length) {
                            var $slideImg = $(this.slides[this.state.id]).children("[data-mk-img-set]");
                            MK.component.BackgroundImageSetter.init($slideImg)
                        }
                        $(this.config.spinnerTpl).prependTo(this.$slides)
                    } else MK.component.BackgroundImageSetter.init($(this.slides).children("[data-mk-img-set]"))
                },
                cacheElements: function() {
                    this.container = this.isNode(this.container) ? this.container : document.querySelectorAll(this.container)[0], this.slides = this.container.querySelectorAll(this.config.slide), this.$slides = $(this.slides), this.config.hasNav && (this.$nav = $(this.config.nav)), this.config.hasPagination && (this.$pagination = $(this.config.paginationEl))
                },
                bindEvents: function() {
                    var $window = $(window);
                    this.config.slidesPerView > 1 && $window.on("resize", this.setPerViewItems.bind(this)), this.config.hasNav && this.eventsNav(), this.config.hasPagination && this.eventsPag(), this.config.draggable && this.dragHandler(), this.config.autoplay && ($window.on("focus", this.windowActive.bind(this)), $window.on("blur", this.windowInactive.bind(this))), this.config.pauseOnHover && ($(this.container).on("mouseleave", this.setTimer.bind(this)), $(this.container).on("mouseenter", this.unsetTimer.bind(this))), "toHighest" === this.config.fluidHeight && $window.on("resize", this.setHeightToHighest.bind(this))
                },
                setPerViewItems: function() {
                    window.matchMedia("(max-width: 500px)").matches ? this.config.slidesPerView = 1 : window.matchMedia("(max-width: 767px)").matches && this.initPerView >= 2 ? this.config.slidesPerView = 2 : window.matchMedia("(max-width: 1024px)").matches && this.initPerView >= 3 ? this.config.slidesPerView = 3 : this.config.slidesPerView = this.initPerView, void 0 !== this.slides && (this.getSlideSize(), this.setSize(), this.setPos(), this.timeline = this.prepareTimeline(this.config.transitionTime), this.timeline.build())
                },
                eventsNav: function() {
                    this.$nav.on("click", "a", this.handleNav.bind(this))
                },
                eventsPag: function() {
                    this.$pagination.on("click", "a", this.handlePagination.bind(this))
                },
                handleNav: function(e) {
                    if (e.preventDefault(), !this.state.running) {
                        this.state.running = !0;
                        var $this = $(e.currentTarget),
                            moveForward = "next" === $this.data("direction");
                        this.config.autoplay && (this.unsetTimer(), setTimeout(this.setTimer.bind(this), this.config.transitionTime)), this.state.moveForward = moveForward, this.timeline.build(), this.timeline.play(), this.setActive(this.nextId(moveForward ? 1 : -1)), this.config.fluidHeight && this.setHeight(this.nextId(moveForward ? 1 : -1))
                    }
                },
                handlePagination: function(e) {
                    e.preventDefault();
                    var $this = $(e.currentTarget),
                        id = $this.index();
                    this.goTo(id)
                },
                reset: function() {
                    this.state.stop = !0, this.state.id = 0, this.setPos(), this.unsetTimer(), this.setTimer()
                },
                goTo: function(id) {
                    if (!this.state.running) {
                        this.state.running = !0;
                        var lastId = this.state.id;
                        lastId !== id && (this.state.moveForward = lastId < id, this.config.autoplay && (this.unsetTimer(), setTimeout(this.setTimer.bind(this), this.config.transitionTime)), this.timeline.build(Math.abs(lastId - id)), this.timeline.play(), this.setActive(id), this.config.fluidHeight && this.setHeight(id))
                    }
                },
                windowActive: function() {
                    this.setTimer(!1, !0), $(this.container).removeClass("is-paused")
                },
                windowInactive: function() {
                    this.unsetTimer(), $(this.container).addClass("is-paused")
                },
                updateId: function(val) {
                    this.state.id = this.nextId(val)
                },
                nextId: function(val) {
                    var len = this.slides.length,
                        insertVal = this.state.id + val;
                    return insertVal = insertVal >= 0 ? insertVal : len + val, insertVal = insertVal >= len ? 0 : insertVal
                },
                setStyle: function(obj, style) {
                    var hasT = style.transform,
                        t = {
                            x: hasT ? style.transform.translateX : null,
                            y: hasT ? style.transform.translateY : null,
                            scale: hasT ? style.transform.scale : null,
                            rotate: hasT ? style.transform.rotate : null,
                            rotateX: hasT ? style.transform.rotateX : null,
                            rotateY: hasT ? style.transform.rotateY : null
                        },
                        x = t.x ? "translateX(" + t.x + "%)" : "translateX(0)",
                        y = t.y ? "translateY(" + t.y + "%)" : "translateY(0)",
                        s = t.scale ? "scale(" + t.scale + ")" : "scale(1)",
                        r = t.rotate ? "rotate(" + t.rotate + "deg)" : "rotate(0)",
                        rX = t.rotateX ? "rotateX(" + t.rotateX + "deg)" : "",
                        rY = t.rotateY ? "rotateY(" + t.rotateY + "deg)" : "",
                        o = style.opacity,
                        h = style.height,
                        w = style.width,
                        c = "translateZ(0)" + x + y + s + r + rX + rY;
                    c.length && (obj.style.webkitTransform = c, obj.style.msTransform = c, obj.style.transform = c), "number" == typeof o && (obj.style.opacity = o), h && (obj.style.height = h + "%"), w && (obj.style.width = w + "%")
                },
                setPos: function() {
                    if (void 0 !== this.slides) {
                        var id = this.state.id,
                            i = 0,
                            len = this.slides.length,
                            animation = this.animation[this.config.effect],
                            axis = animation.axis,
                            animNext = animation.next,
                            animActi = animation.active,
                            animPrev = animation.prev,
                            perView = this.config.slidesPerView,
                            slideId = null,
                            style = {};
                        for (style.transform = {}; i < len; i += 1) i < perView ? (style = animActi, style.transform["translate" + axis] = 100 * i) : (style = this.state.moveForward ? animNext : animPrev, style.transform["translate" + axis] = this.state.moveForward ? 100 * perView : -100), this.slides[i].style.zIndex = 0, slideId = (i + id) % len, this.setStyle(this.slides[slideId], style)
                    }
                },
                setSize: function() {
                    if (void 0 !== this.slides) {
                        var i = 0,
                            len = this.slides.length,
                            axis = this.animation[this.config.effect].axis,
                            slideSize = this.slideSize,
                            style = {};
                        for ("Y" === axis ? style.height = slideSize[axis] : style.width = slideSize[axis]; i < len; i += 1) this.setStyle(this.slides[i], style)
                    }
                },
                setHeight: function(id) {
                    var $slides = $(this.slides),
                        $activeSlide = $slides.eq(id),
                        currentHeight = $activeSlide.height();
                    $(this.container).height(currentHeight)
                },
                setHeightToHighest: function() {
                    var $slides = $(this.slides),
                        height = 0;
                    $slides.each(function() {
                        height = Math.max(height, $(this).find("> div").outerHeight())
                    }), $(this.container).height(height)
                },
                prepareTimeline: function(time) {
                    var timeProg, build, move, add, play, reverse, progress, kill, self = this,
                        iteration = 0,
                        totalIter = time / (1e3 / 60),
                        animLoop = [],
                        aL = 0,
                        loops = 1,
                        ease = this.config.ease,
                        len = this.slides.length,
                        perView = this.config.slidesPerView,
                        animation = this.animation[this.config.effect],
                        animAxis = animation.axis,
                        animNext = animation.next,
                        animActi = animation.active,
                        animPrev = animation.prev,
                        style = {},
                        slideId = null,
                        zIFlow = null;
                    return style.transform = {}, build = function(repeats) {
                        var currentEase = ease;
                        if (loops = repeats || loops) {
                            loops > 1 && (currentEase = "linearEase"), kill(), self.setPos();
                            for (var id = self.state.id, moveForward = self.state.moveForward, i = 0, axisMove = moveForward ? -100 : 100; i <= perView; i += 1) slideId = (moveForward ? i + id : i + id - 1) % len, slideId = slideId < 0 ? len + slideId : slideId, style = 0 === i ? moveForward ? animPrev : animActi : i === perView ? moveForward ? animActi : animNext : animActi, zIFlow = self.state.moveForward ? animNext.zIndex : animPrev.zIndex, zIFlow && (self.slides[slideId].style.zIndex = "+" === zIFlow ? i + 1 : len - i), style.transform["translate" + animAxis] = axisMove, add(self.slides[slideId], style, currentEase)
                        }
                    }, add = function(slide, toStyles, ease) {
                        if (void 0 === slide) throw "Add at least one slide";
                        var fromStyles = slide.style,
                            style = self.refStyle(toStyles, fromStyles);
                        animLoop.push([slide, style, ease]), aL += 1
                    }, move = function(startProg, mode) {
                        if (!isTest) {
                            var currentTotalIter = totalIter;
                            if (loops > 1 && (currentTotalIter = totalIter / 5), self.state.running || (self.state.running = !0), startProg && (iteration = Math.ceil(startProg * currentTotalIter)), timeProg = iteration / currentTotalIter, progress(timeProg), iteration >= currentTotalIter && "play" === mode || iteration <= 0 && "reverse" === mode) return self.state.running = !1, iteration = 0, kill(), self.updateId(self.state.moveForward ? 1 : -1), loops -= 1, loops > 0 && (build(), play()), void(loops || (loops = 1, self.timerRemaining = parseInt(self.config.displayTime), self.config.onAfterSlide(self.state.id)));
                            "play" === mode ? iteration += 1 : iteration -= 1, requestAnimationFrame(function() {
                                self.state.stop || move(0, mode)
                            })
                        }
                    }, play = function(startProg) {
                        var $nextSlide = $(self.slides[self.nextId(self.state.moveForward ? 1 : -1)]);
                        if (self.config.lazyload && self.config.edgeSlider) {
                            var $slideImg = $nextSlide.find("[data-mk-img-set]");
                            $slideImg.length && MK.component.BackgroundImageSetter.init($slideImg)
                        }
                        self.config.onBeforeSlide(self.nextId(self.state.moveForward ? 1 : -1));
                        var start = startProg || 0;
                        iteration = 0, self.state.stop = !1, move(start, "play")
                    }, reverse = function(startProg) {
                        move(startProg || 1, "reverse")
                    }, progress = function(progVal) {
                        var currentStyle, aI = 0;
                        for (aI; aI < aL; aI++) 1 !== progVal && 0 !== progVal ? currentStyle = self.currentStyle(progVal, animLoop[aI][1], animLoop[aI][2]) : 1 === progVal ? currentStyle = self.currentStyle(progVal, animLoop[aI][1], "linearEase") : 0 === progVal && (currentStyle = self.currentStyle(progVal, animLoop[aI][1], "linearEase")), self.setStyle(animLoop[aI][0], currentStyle)
                    }, kill = function() {
                        animLoop = [], aL = 0
                    }, {
                        build: build,
                        add: add,
                        play: play,
                        reverse: reverse,
                        progress: progress
                    }
                },
                refStyle: function(toStyles, fromStyles) {
                    var initVal, changeVal, endVal, dynamicEnd, styleProp, transProp, transform, axis = this.animation[this.config.effect].axis,
                        style = {};
                    for (styleProp in toStyles)
                        if ("transform" === styleProp) {
                            transform = this.getTransforms(fromStyles), style.transform = {};
                            for (transProp in toStyles.transform) "translateZ" !== transProp && (initVal = transform[transProp] || 0, dynamicEnd = transProp === "translate" + axis ? initVal : 0, endVal = toStyles.transform[transProp] + dynamicEnd, changeVal = endVal - initVal, style.transform[transProp] = [initVal, changeVal])
                        } else {
                            if ("zIndex" === styleProp) continue;
                            initVal = parseFloat(fromStyles[styleProp]) || 0, endVal = toStyles[styleProp], changeVal = endVal - initVal, style[styleProp] = [initVal, changeVal]
                        }
                    return style
                },
                currentStyle: function(progress, style, ease) {
                    var currentVals, styleProp, transProp, self = this,
                        currentStyle = {};
                    for (styleProp in style)
                        if ("transform" === styleProp) {
                            currentStyle.transform = {};
                            for (transProp in style.transform) "translateZ" !== transProp && (currentVals = style.transform[transProp], currentStyle.transform[transProp] = self.ease[ease](progress, currentVals[0], currentVals[1], 1))
                        } else currentVals = style[styleProp], currentStyle[styleProp] = self.ease[ease](progress, currentVals[0], currentVals[1], 1);
                    return currentStyle
                },
                setActive: function(id) {
                    var $slides = $(this.slides),
                        className = this.config.activeClass;
                    if ($slides.removeClass(className), this.config.hasPagination) {
                        var $pagination = this.$pagination.find("a");
                        $pagination.removeClass(className), $pagination.eq(id).addClass(className)
                    }
                    this.activeTimer && (clearTimeout(this.activeTimer), this.imageLoader && this.imageLoader.abort());
                    var self = this;
                    this.activeTimer = setTimeout(function() {
                        var $currentSlide = $slides.eq(id);
                        if (self.config.lazyload && self.config.edgeSlider)
                            if ($currentSlide.find(".mk-section-video").length && $currentSlide.children(".mk-video-section-touch").length) {
                                var imgSet = $currentSlide.children(".mk-video-section-touch").data("mk-img-set"),
                                    exactImg = MK.component.BackgroundImageSetter.getImage(imgSet),
                                    $bgImage = $("<img>").attr("src", exactImg);
                                self.imageLoader = imagesLoaded($bgImage[0], function(instance) {
                                    $currentSlide.children(".mk-slider-spinner-wrap").addClass("mk-slider-spinner-wrap-hidden"), setTimeout(function() {
                                        $currentSlide.children(".mk-slider-spinner-wrap").hide()
                                    }, 200), $currentSlide.addClass(className)
                                })
                            } else if ($currentSlide.find(".mk-section-video").length && 0 === $currentSlide.children(".mk-video-section-touch").length) $currentSlide.children(".mk-slider-spinner-wrap").addClass("mk-slider-spinner-wrap-hidden"), setTimeout(function() {
                            $currentSlide.children(".mk-slider-spinner-wrap").hide()
                        }, 200), $currentSlide.addClass(className);
                        else {
                            var imgSet = $currentSlide.children("[data-mk-img-set]").data("mk-img-set"),
                                exactImg = MK.component.BackgroundImageSetter.getImage(imgSet),
                                $bgImage = $("<img>").attr("src", exactImg);
                            self.unsetTimer(), self.imageLoader = imagesLoaded($bgImage[0], function(instance) {
                                $currentSlide.children(".mk-slider-spinner-wrap").addClass("mk-slider-spinner-wrap-hidden"), setTimeout(function() {
                                    $currentSlide.children(".mk-slider-spinner-wrap").hide()
                                }, 200), self.setTimer(!1, !1, $currentSlide.data("timer") || Number(self.config.displayTime)), $currentSlide.addClass(className)
                            })
                        } else $currentSlide.addClass(className)
                    }, this.config.transitionTime)
                },
                createTimer: function() {
                    var $slide = $(this),
                        video = $slide.find("video").get(0);
                    if (video) var interval = setInterval(function() {
                        video.readyState > 0 && ($slide.data("timer", 1e3 * video.duration), $slide.attr("data-timer", 1e3 * video.duration), clearInterval(interval))
                    }, 100)
                },
                setTimer: function(isFirst, isPaused, fixed_time) {
                    var create, run, customTimer = this.$slides.eq(this.nextId(this.state.moveForward ? 1 : -1)).data("timer"),
                        trans = parseInt(this.config.transitionTime),
                        interval = customTimer || parseInt(this.config.displayTime),
                        timer = interval + trans,
                        self = this,
                        first = isFirst || !0,
                        fixed_time = fixed_time || 0;
                    this.timer = !0, this.lastSetTimer = Date.now(), create = function() {
                        self.autoplay && clearTimeout(self.autoplay), self.timer && (self.state.moveForward = !0, self.timeline.build(), self.timeline.play(), self.setActive(self.nextId(1)), self.config.fluidHeight && self.setHeight(self.nextId(1)), first = !1, self.lastSetTimer = Date.now(), run())
                    }, run = function(newInterval) {
                        customTimer = self.$slides.eq(self.nextId(self.state.moveForward ? 1 : -1)).data("timer"), interval = customTimer || parseInt(self.config.displayTime), timer = interval + trans;
                        var time = newInterval || timer;
                        self.autoplay = setTimeout(create, time)
                    }, fixed_time ? run(fixed_time) : isPaused ? run(this.timerRemaining) : run()
                },
                unsetTimer: function() {
                    this.timer = !1, this.lastUnsetTimer = Date.now(), this.timerRemaining -= this.lastUnsetTimer - this.lastSetTimer, this.autoplay && clearTimeout(this.autoplay)
                },
                buildPagination: function() {
                    for (var i = 0, len = this.slides.length, tpl = ""; i < len; i += 1) tpl += '<a href="javascript:;">' + this.config.paginationTpl + "</a>";
                    this.$pagination.html(tpl), this.setActive(0)
                },
                getSlideSize: function() {
                    this.slideSize = {
                        X: 100 / this.config.slidesPerView,
                        Y: 100 / this.config.slidesPerView
                    }
                },
                getTransforms: function(style) {
                    var match, transform = style.transform || style.webkitTransform || style.mozTransform,
                        regex = /(\w+)\(([^)]*)\)/g,
                        T = {};
                    if ("string" != typeof transform) throw "Transform prop is not a string.";
                    if (transform) {
                        for (; match = regex.exec(transform);) T[match[1]] = parseFloat(match[2]);
                        return T
                    }
                },
                isNode: function(o) {
                    return "object" == typeof Node ? o instanceof Node : o && "object" == typeof o && "number" == typeof o.nodeType && "string" == typeof o.nodeName
                },
                dragHandler: function() {
                    var dragStart, dragMove, dragEnd, progress, self = this,
                        $container = $(this.container),
                        prevBuild = !1,
                        nextBuild = !1,
                        dragging = !1;
                    progress = function(moveX) {
                        return moveX / self.val.viewportW()
                    }, dragStart = function(moveX, startX) {}, dragMove = function(moveX) {
                        self.state.running || (moveX < -5 ? (nextBuild ? self.timeline.progress(-progress(moveX)) : (self.state.moveForward = !0, self.timeline.build(), nextBuild = !0, prevBuild = !1, self.unsetTimer()), dragging = !0) : moveX > 5 && (prevBuild ? self.timeline.progress(progress(moveX)) : (self.state.moveForward = !1, self.timeline.build(), prevBuild = !0, nextBuild = !1, self.unsetTimer()), dragging = !0))
                    }, dragEnd = function(moveX) {
                        if (dragging) {
                            var prog = progress(moveX),
                                absProg = prog < 0 ? -prog : prog;
                            absProg > .1 ? (self.timeline.play(absProg), self.setActive(self.nextId(prog < 0 ? 1 : -1)), self.config.fluidHeight && self.setHeight(self.nextId(prog < 0 ? 1 : -1))) : (self.timeline.reverse(absProg), prog < 0 ? self.updateId(-1) : self.updateId(1)), prevBuild = !1, nextBuild = !1, dragging = !1, self.config.autoplay && self.setTimer(!1)
                        }
                    }, this.drag($container, dragStart, dragMove, dragEnd)
                },
                drag: function($el, startFn, moveFn, stopFn) {
                    var touchX, movX, evt, prevent, start, move, stop;
                    prevent = function(e) {
                        e.preventDefault()
                    }, start = function(e) {
                        $el.on("mousemove", prevent), $el.on("touchmove", move), $el.on("mousemove", move), evt = "touchstart" === e.type ? e.originalEvent.touches[0] : e, touchX = evt.pageX, "function" == typeof startFn && startFn(movX, touchX)
                    }, move = function(e) {
                        evt = "touchmove" === e.type ? e.originalEvent.touches[0] : e, movX = evt.pageX - touchX, "function" == typeof moveFn && moveFn(movX)
                    }, stop = function(e) {
                        $el.off("mousemove", prevent), $el.off("touchmove", move), $el.off("mousemove", move), "function" == typeof stopFn && stopFn(movX)
                    }, $el.on("touchstart", start), $el.on("mousedown", start), $el.on("touchend", stop), $el.on("touchleave", stop), $el.on("touchcancel", stop), $el.on("mouseup", stop), $el.on("mouseleave", stop)
                },
                dynamicVal: function() {
                    var update, getViewportW, viewportW, $window = $(window);
                    return update = function() {
                        viewportW = $window.width()
                    }, getViewportW = function() {
                        return viewportW
                    }, update(), $window.on("load", update), $window.on("resize", update), {
                        viewportW: getViewportW
                    }
                }
            }, MK.ui.Slider.prototype.animation = {
                slide: {
                    axis: "X",
                    next: {
                        transform: {}
                    },
                    active: {
                        transform: {}
                    },
                    prev: {
                        transform: {}
                    }
                },
                vertical_slide: {
                    axis: "Y",
                    next: {
                        transform: {}
                    },
                    active: {
                        transform: {}
                    },
                    prev: {
                        transform: {}
                    }
                },
                perspective_flip: {
                    axis: "Y",
                    next: {
                        transform: {
                            rotateX: 80
                        }
                    },
                    active: {
                        transform: {
                            rotateX: 0
                        }
                    },
                    prev: {
                        transform: {
                            rotateX: 0
                        }
                    }
                },
                zoom: {
                    axis: "Z",
                    next: {
                        opacity: 0,
                        transform: {
                            scale: .9
                        }
                    },
                    active: {
                        opacity: 1,
                        transform: {
                            scale: 1
                        }
                    },
                    prev: {
                        opacity: 0,
                        transform: {
                            scale: 1.1
                        }
                    }
                },
                fade: {
                    axis: "Z",
                    next: {
                        opacity: 0,
                        transform: {}
                    },
                    active: {
                        opacity: 1,
                        transform: {}
                    },
                    prev: {
                        opacity: 0,
                        transform: {}
                    }
                },
                kenburned: {
                    axis: "Z",
                    next: {
                        opacity: 0,
                        transform: {}
                    },
                    active: {
                        opacity: 1,
                        transform: {}
                    },
                    prev: {
                        opacity: 0,
                        transform: {}
                    }
                },
                zoom_out: {
                    axis: "Z",
                    next: {
                        zIndex: "+",
                        opacity: 1,
                        transform: {
                            translateY: 100,
                            scale: 1
                        }
                    },
                    active: {
                        opacity: 1,
                        transform: {
                            translateY: 0,
                            scale: 1
                        }
                    },
                    prev: {
                        zIndex: "+",
                        opacity: 0,
                        transform: {
                            translateY: 0,
                            scale: .5
                        }
                    }
                },
                horizontal_curtain: {
                    axis: "Z",
                    next: {
                        zIndex: "+",
                        transform: {
                            translateX: 100
                        }
                    },
                    active: {
                        transform: {
                            translateX: 0
                        }
                    },
                    prev: {
                        zIndex: "+",
                        transform: {
                            translateX: -70
                        }
                    }
                },
                roulete: {
                    axis: "X",
                    next: {
                        opacity: .5,
                        transform: {
                            scale: .5,
                            rotate: 10,
                            translateY: 20
                        }
                    },
                    active: {
                        opacity: 1,
                        transform: {
                            scale: 1,
                            rotate: 0,
                            translateY: 0
                        }
                    },
                    prev: {
                        opacity: .3,
                        transform: {
                            scale: .5,
                            rotate: -10,
                            translateY: 20
                        }
                    }
                }
            }, MK.ui.Slider.prototype.ease = {
                linearEase: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * currentIteration / totalIterations + startValue
                },
                easeInQuad: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * (currentIteration /= totalIterations) * currentIteration + startValue
                },
                easeOutQuad: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return -changeInValue * (currentIteration /= totalIterations) * (currentIteration - 2) + startValue
                },
                easeInOutQuad: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return (currentIteration /= totalIterations / 2) < 1 ? changeInValue / 2 * currentIteration * currentIteration + startValue : -changeInValue / 2 * (--currentIteration * (currentIteration - 2) - 1) + startValue
                },
                easeInCubic: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * Math.pow(currentIteration / totalIterations, 3) + startValue
                },
                easeOutCubic: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 3) + 1) + startValue
                },
                easeInOutCubic: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return (currentIteration /= totalIterations / 2) < 1 ? changeInValue / 2 * Math.pow(currentIteration, 3) + startValue : changeInValue / 2 * (Math.pow(currentIteration - 2, 3) + 2) + startValue
                },
                easeInQuart: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * Math.pow(currentIteration / totalIterations, 4) + startValue
                },
                easeOutQuart: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return -changeInValue * (Math.pow(currentIteration / totalIterations - 1, 4) - 1) + startValue
                },
                easeInOutQuart: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return (currentIteration /= totalIterations / 2) < 1 ? changeInValue / 2 * Math.pow(currentIteration, 4) + startValue : -changeInValue / 2 * (Math.pow(currentIteration - 2, 4) - 2) + startValue
                },
                easeInQuint: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * Math.pow(currentIteration / totalIterations, 5) + startValue
                },
                easeOutQuint: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 5) + 1) + startValue
                },
                easeInOutQuint: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return (currentIteration /= totalIterations / 2) < 1 ? changeInValue / 2 * Math.pow(currentIteration, 5) + startValue : changeInValue / 2 * (Math.pow(currentIteration - 2, 5) + 2) + startValue
                },
                easeInSine: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * (1 - Math.cos(currentIteration / totalIterations * (Math.PI / 2))) + startValue
                },
                easeOutSine: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * Math.sin(currentIteration / totalIterations * (Math.PI / 2)) + startValue
                },
                easeInOutSine: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue / 2 * (1 - Math.cos(Math.PI * currentIteration / totalIterations)) + startValue
                },
                easeInExpo: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * Math.pow(2, 10 * (currentIteration / totalIterations - 1)) + startValue
                },
                easeOutExpo: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * (1 - Math.pow(2, -10 * currentIteration / totalIterations)) + startValue
                },
                easeInOutExpo: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return (currentIteration /= totalIterations / 2) < 1 ? changeInValue / 2 * Math.pow(2, 10 * (currentIteration - 1)) + startValue : changeInValue / 2 * (2 - Math.pow(2, -10 * --currentIteration)) + startValue
                },
                easeInCirc: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * (1 - Math.sqrt(1 - (currentIteration /= totalIterations) * currentIteration)) + startValue
                },
                easeOutCirc: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * Math.sqrt(1 - (currentIteration = currentIteration / totalIterations - 1) * currentIteration) + startValue
                },
                easeInOutCirc: function(currentIteration, startValue, changeInValue, totalIterations) {
                    return (currentIteration /= totalIterations / 2) < 1 ? changeInValue / 2 * (1 - Math.sqrt(1 - currentIteration * currentIteration)) + startValue : changeInValue / 2 * (Math.sqrt(1 - (currentIteration -= 2) * currentIteration) + 1) + startValue
                }
            }
        }(jQuery),
        function($) {
            "use strict";
            MK.component.SocialShare = function(el) {
                var networks = {
                    twitter: "http://twitter.com/intent/tweet?text={title} {url}",
                    pinterest: "http://pinterest.com/pin/create/button/?url={url}&media={image}&description={title}",
                    facebook: "https://www.facebook.com/sharer/sharer.php?u={url}",
                    googleplus: "https://plus.google.com/share?url={url}",
                    linkedin: "http://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}&summary={desc}"
                };
                this.networks = networks, this.el = el
            }, MK.component.SocialShare.prototype = {
                init: function() {
                    this.cacheElements(), this.bindEvents()
                },
                cacheElements: function() {
                    this.$this = $(this.el)
                },
                bindEvents: function() {
                    var thisObject = this;
                    $.each(this.networks, function(key, value) {
                        thisObject.$tempClass = $("." + key + "-share"), thisObject.$tempClass.click(thisObject.openSharingDialog.bind(self, this, key))
                    })
                },
                openSharingDialog: function(url, site, args) {
                    var urlWrapper = url,
                        rx = new RegExp("{[a-z]*}", "g");
                    for (match = rx.exec(url); null != match;) {
                        var pureAttr = match[0].replace("{", "").replace("}", ""),
                            attValue = $(args.currentTarget).attr("data-" + pureAttr);
                        void 0 !== attValue && null !== attValue || (attValue = ""), attValue = attValue.replace("#", "%23"), urlWrapper = urlWrapper.replace(match, attValue), match = rx.exec(url)
                    }
                    window.open(urlWrapper, site + "Window", "height=320,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0")
                }
            };
            var $body = $("body");
            $body.length && $body.each(function() {
                new MK.component.SocialShare(this).init()
            })
        }(jQuery),
        function($) {
            "use strict";
            MK.component.Sortable = function(el) {
                this.el = el
            }, MK.component.Sortable.prototype = {
                init: function() {
                    this.cacheElements(), this.bindEvents()
                },
                cacheElements: function() {
                    this.unique = Date.now(), this.$filter = $(this.el), this.config = this.$filter.data("sortable-config"), this.ajaxLoader = new MK.utils.ajaxLoader(this.config.container), this.ajaxLoader.init(), this.$container = $(this.config.container), this.$navItems = this.$filter.find("a"), this.$filterItems = this.$container.find(this.config.item)
                },
                bindEvents: function() {
                    this.$navItems.on("click", this.handleClick.bind(this)), MK.utils.eventManager.subscribe("ajaxLoaded", this.onLoad.bind(this))
                },
                handleClick: function(e) {
                    e.preventDefault();
                    var $item = $(e.currentTarget),
                        term = $item.data("filter");
                    this.$navItems.removeClass("current"), $item.addClass("current"), "ajax" === this.config.mode ? this.inDB(term, $item) : this.inPage(term)
                },
                inDB: function(term, $item) {
                    MK.ui.loader.remove(this.$filter), MK.ui.loader.add($item), this.$container.siblings(".mk-ajax-loaded-posts").length && this.$container.siblings(".mk-ajax-loaded-posts").attr("data-loop-loaded-posts", ""), this.ajaxLoader.setData({
                        paged: 1,
                        term: term
                    }), this.ajaxLoader.load(this.unique)
                },
                inPage: function(term) {
                    var $filterItems = this.$container.find(this.config.item);
                    $filterItems.removeClass("is-hidden"), "*" !== term && $filterItems.not("." + term).addClass("is-hidden"), MK.utils.eventManager.publish("staticFilter")
                },
                onLoad: function(e, response) {
                    "static" === this.config.mode && this.$navItems.removeClass("current").first().addClass("current"), void 0 !== response && response.id === this.config.container && (MK.ui.loader.remove(this.$filter), response.unique === this.unique && (this.$container.html(response.content), this.ajaxLoader.setData({
                        paged: 1
                    })))
                }
            }
        }(jQuery),
        function($) {
            "use strict";
            MK.component.Tabs = function(el) {
                var defaults = {
                    activeClass: "is-active"
                };
                this.config = defaults, this.el = el
            }, MK.component.Tabs.prototype = {
                init: function() {
                    this.cacheElements(), this.bindEvents()
                },
                cacheElements: function() {
                    this.$this = $(this.el), this.$tabs = this.$this.find(".mk-tabs-tab"), this.$panes = this.$this.find(".mk-tabs-pane"), this.currentId = 0
                },
                bindEvents: function() {
                    this.$tabs.on("click", this.switchPane.bind(this))
                },
                switchPane: function(evt) {
                    evt.preventDefault();
                    var clickedId = $(evt.currentTarget).index();
                    this.hide(this.currentId), this.show(clickedId), this.currentId = clickedId, MK.utils.eventManager.publish("item-expanded")
                },
                show: function(id) {
                    this.$tabs.eq(id).addClass(this.config.activeClass), this.$panes.eq(id).addClass(this.config.activeClass)
                },
                hide: function(id) {
                    this.$tabs.eq(id).removeClass(this.config.activeClass), this.$panes.eq(id).removeClass(this.config.activeClass)
                }
            }
        }(jQuery),
        function($) {
            "use strict";
            $("iframe").each(function() {
                var $iframe = $(this);
                "P" === $iframe.parent().get(0).tagName && $iframe.wrap('<div class="mk-video-container"></div>')
            })
        }(jQuery),
        function($) {
            "use strict";

            function toggle(e) {
                e.preventDefault(), e.stopPropagation();
                var $this = $(e.currentTarget);
                $this.hasClass("mk-toggle-active") ? ($(".mk-box-to-trigger").fadeOut(200), $this.removeClass("mk-toggle-active")) : ($(".mk-box-to-trigger").fadeOut(200), $this.parent().find(".mk-box-to-trigger").fadeIn(250), $(".mk-toggle-trigger").removeClass("mk-toggle-active"), $this.addClass("mk-toggle-active"))
            }

            function assignToggle() {
                setTimeout(function() {
                    $(".mk-toggle-trigger").off("click", toggle), $(".mk-toggle-trigger").on("click", toggle)
                }, 100)
            }
            $(document).on("click", function(e) {
                $(".mk-toggle-trigger").removeClass("mk-toggle-active")
            }), assignToggle(), MK.utils.eventManager.subscribe("ajaxLoaded", assignToggle), MK.utils.eventManager.subscribe("ajax-preview", assignToggle)
        }(jQuery),
        function($) {
            "use strict";
            if (MK.utils.isMobile()) return void $(".mk-animate-element").removeClass("mk-animate-element");
            var $rootLevelEls = $(".js-master-row, .widget"),
                init = function() {
                    $rootLevelEls.each(spyViewport), $rootLevelEls.each(function() {
                        $(this).find(".mk-animate-element").each(spyViewport)
                    })
                },
                spyViewport = function(i) {
                    var self = this;
                    MK.utils.scrollSpy(this, {
                        position: "bottom",
                        threshold: 200,
                        after: function() {
                            animate.call(self, i)
                        }
                    })
                },
                animate = function(i) {
                    var $this = $(this);
                    setTimeout(function() {
                        $this.addClass("mk-in-viewport")
                    }, 100 * i)
                };
            $(window).on("load", init)
        }(jQuery),
        function($) {
            "use strict";

            function smoothScrollToAnchor(evt) {
                var anchor = MK.utils.detectAnchor(this),
                    $this = $(evt.currentTarget),
                    loc = window.location,
                    currentPage = loc.origin + loc.pathname,
                    href = $this.attr("href"),
                    linkSplit = href ? href.split("#") : "",
                    hrefPage = linkSplit[0] ? linkSplit[0] : "";
                linkSplit[1] && linkSplit[1];
                anchor.length ? (hrefPage !== currentPage && "" !== hrefPage || evt.preventDefault(), MK.utils.scrollToAnchor(anchor)) : "#" === $this.attr("href") && evt.preventDefault()
            }
            $(window).on("load", function() {
                MK.core.initAll(document), MK.utils.scrollToURLHash(), setTimeout(function() {
                    MK.ui.preloader.hide(), $(".mk-preloader").hide(), $("body").removeClass("loading")
                }, 150)
            }), $(document).on("click", ".js-smooth-scroll, .js-main-nav a", smoothScrollToAnchor), $(".side_dashboard_menu a").on("click", smoothScrollToAnchor)
        }(jQuery)
}(jQuery),
function($) {
    "use strict";
    var _toBuild = [];
    MK.component.AdvancedGMaps = function(el) {
        var $this = $(el),
            container = document.getElementById("mk-theme-container"),
            data = $this.data("advancedgmaps-config"),
            apikey = !!data.options.apikey && "key=" + data.options.apikey + "&",
            map = null,
            bounds = null,
            infoWindow = null,
            position = null,
            build = function() {
                data.options.scrollwheel = !1, data.options.mapTypeId = google.maps.MapTypeId[data.options.mapTypeId], data.options.styles = data.style, bounds = new google.maps.LatLngBounds, map = new google.maps.Map(el, data.options), infoWindow = new google.maps.InfoWindow, map.setOptions({
                    panControl: data.options.panControl,
                    draggable: data.options.draggable,
                    zoomControl: data.options.zoomControl,
                    mapTypeControl: data.options.scaleControl,
                    scaleControl: data.options.mapTypeControl
                });
                var marker, i;
                for (map.setTilt(45), i = 0; i < data.places.length; i++) data.places[i].latitude && data.places[i].longitude && (position = new google.maps.LatLng(data.places[i].latitude, data.places[i].longitude), bounds.extend(position), marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    title: data.places[i].address,
                    icon: data.places[i].marker ? data.places[i].marker : data.icon
                }), google.maps.event.addListener(marker, "click", function(marker, i) {
                    return function() {
                        data.places[i].address && data.places[i].address.length > 1 ? (infoWindow.setContent('<div class="info_content"><p>' + data.places[i].address + "</p></div>"), infoWindow.open(map, marker)) : (infoWindow.setContent(""), infoWindow.close())
                    }
                }(marker, i)), map.fitBounds(bounds));
                var boundsListener = google.maps.event.addListener(map, "bounds_changed", function(event) {
                        this.setZoom(data.options.zoom), google.maps.event.removeListener(boundsListener)
                    }),
                    update = function() {
                        google.maps.event.trigger(map, "resize"), map.setCenter(position)
                    };
                update();
                ! function() {
                    $(window).on("resize", update), window.addResizeListener(container, update)
                }()
            },
            initAll = function() {
                for (var i = 0, l = _toBuild.length; i < l; i++) _toBuild[i]()
            };
        return MK.api.advancedgmaps = MK.api.advancedgmaps || function() {
            initAll()
        }, {
            init: function() {
                _toBuild.push(build), MK.core.loadDependencies(["https://maps.googleapis.com/maps/api/js?" + apikey + "callback=MK.api.advancedgmaps"])
            }
        }
    }
}(jQuery),
function($) {
    "use strict";

    function mk_animated_cols() {
        function equalheight(container) {
            var $el, currentTallest = 0,
                currentRowStart = 0,
                rowDivs = new Array,
                topPosition = 0;
            return $(container).each(function() {
                if ($el = $(this), $($el).height("auto"), topPosition = $el.position().top, currentRowStart != topPosition) {
                    for (var currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) rowDivs[currentDiv].height(currentTallest);
                    rowDivs.length = 0, currentRowStart = topPosition, currentTallest = $el.height(), rowDivs.push($el)
                } else rowDivs.push($el), currentTallest = currentTallest < $el.height() ? $el.height() : currentTallest;
                for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) rowDivs[currentDiv].height(currentTallest)
            }), currentTallest
        }

        function prepareCols(el) {
            var $this = el.parent().parent().find(".mk-animated-columns"),
                iconHeight = equalheight(".vc_row .animated-column-icon, .animated-column-holder .mk-svg-icon"),
                titleHeight = equalheight(".vc_row .animated-column-title"),
                descHeight = equalheight(".vc_row .animated-column-desc");
            $this.find(".animated-column-btn").innerHeight();
            $this.hasClass("full-style") ? $this.find(".animated-column-item").each(function() {
                var $this = $(this),
                    contentHeight = iconHeight + 30 + (titleHeight + 10) + (descHeight + 70) + 34;
                $this.height(1.5 * contentHeight + 50);
                var $box_height = $this.outerHeight(!0),
                    $icon_height = $this.find(".animated-column-icon, .animated-column-holder .mk-svg-icon").height();
                $this.find(".animated-column-holder").css({
                    paddingTop: $box_height / 2 - $icon_height
                }), $this.animate({
                    opacity: 1
                }, 300)
            }) : $this.find(".animated-column-item").each(function() {
                var $this = $(this),
                    halfHeight = $this.height() / 2,
                    halfIconHeight = $this.find(".animated-column-icon, .animated-column-holder .mk-svg-icon").height() / 2,
                    halfTitleHeight = $this.find(".animated-column-simple-title").height() / 2;
                $this.find(".animated-column-holder").css({
                    paddingTop: halfHeight - halfIconHeight
                }), $this.find(".animated-column-title").css({
                    paddingTop: halfHeight - halfTitleHeight
                }), $this.animate({
                    opacity: 1
                }, 300)
            })
        }
        $(".mk-animated-columns").each(function() {
            var that = this;
            MK.core.loadDependencies([MK.core.path.plugins + "tweenmax.js"], function() {
                var $this = $(that),
                    $parent = $this.parent().parent(),
                    $columns = $parent.find(".column_container"),
                    index = $columns.index($this.parent());
                $this.hasClass("full-style") && $this.find(".animated-column-item").hover(function() {
                    TweenLite.to($(this).find(".animated-column-holder"), .5, {
                        top: "-15%",
                        ease: Back.easeOut
                    }), TweenLite.to($(this).find(".animated-column-desc"), .5, {
                        top: "50%",
                        ease: Expo.easeOut
                    }, .4), TweenLite.to($(this).find(".animated-column-btn"), .3, {
                        top: "50%",
                        ease: Expo.easeOut
                    }, .6)
                }, function() {
                    TweenLite.to($(this).find(".animated-column-holder"), .5, {
                        top: "0%",
                        ease: Back.easeOut,
                        easeParams: [3]
                    }), TweenLite.to($(this).find(".animated-column-desc"), .5, {
                        top: "100%",
                        ease: Back.easeOut
                    }, .4), TweenLite.to($(this).find(".animated-column-btn"), .5, {
                        top: "100%",
                        ease: Back.easeOut
                    }, .2)
                }), $this.hasClass("simple-style") && $this.find(".animated-column-item").hover(function() {
                    TweenLite.to($(this).find(".animated-column-holder"), .7, {
                        top: "100%",
                        ease: Expo.easeOut
                    }), TweenLite.to($(this).find(".animated-column-title"), .7, {
                        top: "0%",
                        ease: Back.easeOut
                    }, .2)
                }, function() {
                    TweenLite.to($(this).find(".animated-column-holder"), .7, {
                        top: "0%",
                        ease: Expo.easeOut
                    }), TweenLite.to($(this).find(".animated-column-title"), .7, {
                        top: "-100%",
                        ease: Back.easeOut
                    }, .2)
                }), $columns.length === index + 1 && (prepareCols($this), $(window).on("resize", function() {
                    setTimeout(prepareCols($this), 1e3)
                })), MK.utils.eventManager.subscribe("iconsInsert", function() {
                    prepareCols($this)
                })
            })
        })
    }
    $(window).on("load", mk_animated_cols)
}(jQuery),
function($) {
    "use strict";
    MK.core, MK.core.path;
    MK.component.BannerBuilder = function(el) {
        return {
            init: function() {
                var $this = $(el),
                    data = $this.data("bannerbuilder-config");
                MK.core.loadDependencies([MK.core.path.plugins + "jquery.flexslider.js"], function() {
                    $this.flexslider({
                        selector: ".mk-banner-slides > .mk-banner-slide",
                        animation: data.animation,
                        smoothHeight: !1,
                        direction: "horizontal",
                        slideshow: !0,
                        slideshowSpeed: data.slideshowSpeed,
                        animationSpeed: data.animationSpeed,
                        pauseOnHover: !0,
                        directionNav: data.directionNav,
                        controlNav: !1,
                        initDelay: 2e3,
                        prevText: "",
                        nextText: "",
                        pauseText: "",
                        playText: ""
                    })
                })
            }
        }
    }
}(jQuery),
function($) {
    "use strict";
    var zIndex = 0;
    $(".mk-newspaper-wrapper").on("click", ".blog-loop-comments", function(event) {
        event.preventDefault();
        var $this = $(event.currentTarget);
        $this.parents(".mk-blog-newspaper-item").css("z-index", ++zIndex), $this.parents(".newspaper-item-footer").find(".newspaper-social-share").slideUp(200).end().find(".newspaper-comments-list").slideDown(200), setTimeout(function() {
            MK.utils.eventManager.publish("item-expanded")
        }, 300)
    }), $(".mk-newspaper-wrapper").on("click", ".newspaper-item-share", function(event) {
        event.preventDefault();
        var $this = $(event.currentTarget);
        $this.parents(".mk-blog-newspaper-item").css("z-index", ++zIndex), $this.parents(".newspaper-item-footer").find(".newspaper-comments-list").slideUp(200).end().find(".newspaper-social-share").slideDown(200), setTimeout(function() {
            MK.utils.eventManager.publish("item-expanded")
        }, 300)
    });
    var $blog = $(".mk-blog-container"),
        $imgs = $blog.find("img[data-mk-image-src-set]");
    $blog.hasClass("mk-blog-container-lazyload") && $imgs.length ? ($(window).on("scroll.mk_blog_lazyload", MK.utils.throttle(500, function() {
        $imgs.each(function(index, elem) {
            MK.utils.isElementInViewport(elem) && (MK.component.ResponsiveImageSetter.init($(elem)), $imgs = $imgs.not($(elem)))
        })
    })), $(window).trigger("scroll.mk_blog_lazyload"), MK.component.ResponsiveImageSetter.onResize($imgs)) : (MK.component.ResponsiveImageSetter.init($imgs), MK.component.ResponsiveImageSetter.onResize($imgs))
}(jQuery),
function($) {
    "use strict";
    var core = MK.core,
        path = MK.core.path;
    MK.component.Category = function(el) {
        var blurImage = function($item) {
                return $item.each(function() {
                    var $_this = $(this),
                        img = $_this.find(".item-thumbnail");
                    img.clone().addClass("blur-effect item-blur-thumbnail").removeClass("item-thumbnail").prependTo(this);
                    var blur_this = $(".blur-effect", this);
                    blur_this.each(function(index, element) {
                        !0 === img[index].complete ? Pixastic.process(blur_this[index], "blurfast", {
                            amount: .5
                        }) : blur_this.load(function() {
                            Pixastic.process(blur_this[index], "blurfast", {
                                amount: .5
                            })
                        })
                    })
                })
            },
            masonry = function() {
                function grid() {
                    minigrid({
                        container: ".js-masonry",
                        item: ".js-masonry-item",
                        gutter: 0
                    })
                }
                $(".js-masonry").length && (grid(), $(window).on("resize", grid))
            };
        return {
            init: function() {
                core.loadDependencies([path.plugins + "pixastic.js"], function() {
                    blurImage($(".blur-image-effect .mk-loop-item .item-holder "))
                }), core.loadDependencies([path.plugins + "minigrid.js"], masonry)
            }
        }
    }
}(jQuery),
function($) {
    "use strict";
    var core = MK.core;
    core.path;
    MK.component.Chart = function(el) {
        return {
            init: function() {
                MK.core.loadDependencies([MK.core.path.plugins + "jquery.easyPieChart.js"], function() {
                    $(".mk-chart__chart").each(function() {
                        var $this = $(this),
                            $parent_width = $(this).parent().width(),
                            $chart_size = parseInt($this.attr("data-barSize"));
                        $parent_width < $chart_size && ($chart_size = $parent_width, $this.css("line-height", $chart_size), $this.find("i").css({
                            "line-height": $chart_size + "px"
                        }), $this.css({
                            "line-height": $chart_size + "px"
                        }));
                        var build = function() {
                            $this.easyPieChart({
                                animate: 1300,
                                lineCap: "butt",
                                lineWidth: $this.attr("data-lineWidth"),
                                size: $chart_size,
                                barColor: $this.attr("data-barColor"),
                                trackColor: $this.attr("data-trackColor"),
                                scaleColor: "transparent",
                                onStep: function(value) {
                                    this.$el.find(".chart-percent span").text(Math.ceil(value))
                                }
                            })
                        };
                        MK.utils.scrollSpy(this, {
                            position: "bottom",
                            after: build
                        })
                    })
                })
            }
        }
    }
}(jQuery),
function($) {
    "use strict";
    $(".mk-clients.column-style").each(function() {
        function recreateGrid() {
            var i;
            if ($listItems.unwrap(), window.matchMedia("(max-width: 550px)").matches && fullRowColumnsCount >= 1)
                for (i = 0; i < listItemsCount; i += 1) $listItems.slice(i, i + 1).wrapAll('<ul class="mk-clients-fixed-list" style="' + listStyle + '"></ul>');
            else if (window.matchMedia("(max-width: 767px)").matches && fullRowColumnsCount >= 2)
                for (i = 0; i < listItemsCount; i += 2) $listItems.slice(i, i + 2).wrapAll('<ul class="mk-clients-fixed-list" style="' + listStyle + '"></ul>');
            else if (window.matchMedia("(max-width: 960px)").matches && fullRowColumnsCount >= 3)
                for (i = 0; i < listItemsCount; i += 3) $listItems.slice(i, i + 3).wrapAll('<ul class="mk-clients-fixed-list" style="' + listStyle + '"></ul>');
            else
                for (i = 0; i < listItemsCount; i += fullRowColumnsCount) $listItems.slice(i, i + fullRowColumnsCount).wrapAll('<ul style="' + listStyle + '"></ul>')
        }
        var $group = $(this),
            $listItems = $group.find("li"),
            listItemsCount = $listItems.length,
            listStyle = $group.find("ul").attr("style") || "",
            fullRowColumnsCount = $group.find("ul:first-of-type li").length;
        recreateGrid(), $(window).on("resize", recreateGrid)
    })
}(jQuery),
function($) {
    "use strict";
    $(".mk-edge-slider").find("video").each(function() {
        this.pause(), this.currentTime = 0
    }), MK.component.EdgeSlider = function(el) {
        var self = this,
            $this = $(el),
            $window = $(window),
            $wrapper = $this.parent(),
            config = $this.data("edgeslider-config"),
            $nav = $(config.nav),
            $prev = $nav.find(".mk-edge-prev"),
            $prevTitle = $prev.find(".nav-item-caption"),
            $prevBg = $prev.find(".edge-nav-bg"),
            $next = $nav.find(".mk-edge-next"),
            $nextTitle = $next.find(".nav-item-caption"),
            $nextBg = $next.find(".edge-nav-bg"),
            $navBtns = $nav.find("a"),
            $pagination = $(".swiper-pagination"),
            $skipBtn = $(".edge-skip-slider"),
            $opacityLayer = $this.find(".edge-slide-content"),
            $videos = $this.find("video"),
            currentSkin = null,
            currentPoint = null,
            winH = null,
            opacity = null,
            offset = null,
            callbacks = {
                onInitialize: function(slides) {
                    self.$slides = $(slides), self.slideContents = $.map(self.$slides, function(slide) {
                        var $slide = $(slide),
                            title = $slide.find(".edge-slide-content .edge-title").first().text();
                        return {
                            skin: $slide.attr("data-header-skin"),
                            title: title,
                            image: $slide.find(".mk-section-image").attr("data-thumb") || $slide.find(".mk-video-section-touch").attr("data-thumb"),
                            bgColor: $slide.find(".mk-section-image").css("background-color")
                        }
                    }), MK.utils.isSmoothScroll && $this.css("position", "fixed"), setNavigationContent(1, self.$slides.length - 1), setSkin(0), playVideo(0), setTimeout(function() {
                        $(".edge-slider-loading").fadeOut("100")
                    }, 1e3)
                },
                onBeforeSlide: function(id) {},
                onAfterSlide: function(id) {
                    setNavigationContent(nextFrom(id), prevFrom(id)), setSkin(id), stopVideos(), playVideo(id)
                }
            },
            nextFrom = function(id) {
                return id + 1 === self.$slides.length ? 0 : id + 1
            },
            prevFrom = function(id) {
                return id - 1 == -1 ? self.$slides.length - 1 : id - 1
            },
            setNavigationContent = function(nextId, prevId) {
                self.slideContents[prevId] && ($prevTitle.text(self.slideContents[prevId].title), $prevBg.css("background", "none" !== self.slideContents[prevId].image ? "url(" + self.slideContents[prevId].image + ")" : self.slideContents[prevId].bgColor)), self.slideContents[nextId] && ($nextTitle.text(self.slideContents[nextId].title), $nextBg.css("background", "none" !== self.slideContents[nextId].image ? "url(" + self.slideContents[nextId].image + ")" : self.slideContents[nextId].bgColor))
            },
            setSkin = function(id) {
                currentSkin = self.slideContents[id].skin, $navBtns.attr("data-skin", currentSkin), $pagination.attr("data-skin", currentSkin), $skipBtn.attr("data-skin", currentSkin), self.config.firstEl && MK.utils.eventManager.publish("firstElSkinChange", currentSkin)
            },
            stopVideos = function() {
                $videos.each(function() {
                    this.pause(), this.currentTime = 0
                })
            },
            playVideo = function(id) {
                var video = self.$slides.eq(id).find("video").get(0);
                video && (video.play(), console.log("play video in slide nr " + id))
            },
            onResize = function() {
                var height = $wrapper.height();
                $this.height(height);
                var width = $wrapper.width();
                $this.width(width), winH = $window.height(), offset = $this.offset().top, MK.utils.isSmoothScroll && (MK.utils.isResponsiveMenuState() ? ($this.css({
                    "-webkit-transform": "translateZ(0)",
                    "-moz-transform": "translateZ(0)",
                    "-ms-transform": "translateZ(0)",
                    "-o-transform": "translateZ(0)",
                    transform: "translateZ(0)",
                    position: "absolute"
                }), $opacityLayer.css({
                    opacity: 1
                })) : onScroll())
            },
            onScroll = function() {
                currentPoint = -MK.val.scroll(), offset + currentPoint <= 0 && (opacity = 1 + (offset + currentPoint) / winH * 2, opacity = Math.min(opacity, 1), opacity = Math.max(opacity, 0), $opacityLayer.css({
                    opacity: opacity
                })), $this.css({
                    "-webkit-transform": "translateY(" + currentPoint + "px) translateZ(0)",
                    "-moz-transform": "translateY(" + currentPoint + "px) translateZ(0)",
                    "-ms-transform": "translateY(" + currentPoint + "px) translateZ(0)",
                    "-o-transform": "translateY(" + currentPoint + "px) translateZ(0)",
                    transform: "translateY(" + currentPoint + "px) translateZ(0)",
                    position: "fixed"
                })
            };
        onResize(), $window.on("load", onResize), $window.on("resize", onResize), window.addResizeListener($wrapper.get(0), onResize), MK.utils.isSmoothScroll && (onScroll(), $window.on("scroll", function() {
            MK.utils.isResponsiveMenuState() || window.requestAnimationFrame(onScroll)
        })), this.el = el, this.config = $.extend(config, callbacks), this.slideContents = null, this.config.edgeSlider = !0
    }, MK.component.EdgeSlider.prototype = {
        init: function() {
            new MK.ui.Slider(this.el, this.config).init()
        }
    }
}(jQuery),
function($) {
    "use strict";
    $(".mk-faq-wrapper").each(function() {
        function filterItems(cat) {
            if ("" === cat) return void $faq.slideDown(200).removeClass("hidden");
            $faq.not("." + cat).slideUp(200).addClass("hidden"), $faq.filter("." + cat).slideDown(200).removeClass("hidden")
        }
        var $this = $(this),
            $filter = $this.find(".filter-faq"),
            $filterItem = $filter.find("a"),
            $faq = $this.find(".mk-faq-container > div"),
            currentFilter = "";
        $filterItem.on("click", function(e) {
            var $this = $(this);
            currentFilter = $this.data("filter"), $filterItem.removeClass("current"), $this.addClass("current"), filterItems(currentFilter), e.preventDefault()
        })
    })
}(jQuery), jQuery(function($) {
        "use strict";
        var $gallery = $(".mk-gallery"),
            $imgs = $gallery.find("img[data-mk-image-src-set]");
        $gallery.hasClass("mk-gallery-lazyload") && $imgs.length ? ($(window).on("scroll.mk_gallery_lazyload", MK.utils.throttle(500, function() {
            $imgs.each(function(index, elem) {
                MK.utils.isElementInViewport(elem) && (MK.component.ResponsiveImageSetter.init($(elem)), $imgs = $imgs.not($(elem)))
            })
        })), $(window).trigger("scroll.mk_gallery_lazyload"), MK.component.ResponsiveImageSetter.onResize($imgs)) : (MK.component.ResponsiveImageSetter.init($imgs), MK.component.ResponsiveImageSetter.onResize($imgs))
    }),
    function($) {
        "use strict";
        $(".js-header-shortcode").each(function() {
            var $this = $(this),
                $parent_page_section = $this.parents(".mk-page-section");
            $parent_page_section.attr("id") && $this.detach().appendTo($parent_page_section), $this.parent().css("z-index", 99999)
        })
    }(jQuery),
    function($) {
        "use strict";

        function mk_section_intro_effects() {
            if (MK.utils.isMobile()) $(".mk-page-section.intro-true").each(function() {
                $(this).attr("data-intro-effect", "")
            });
            else {
                if (!$.exists(".mk-page-section.intro-true")) return;
                $(".mk-page-section.intro-true").each(function() {
                    var that = this;
                    MK.core.loadDependencies([MK.core.path.plugins + "jquery.sectiontrans.js", MK.core.path.plugins + "tweenmax.js"], function() {
                        var $this = $(that),
                            $pageCnt = $this.parent().nextAll("div"),
                            windowHeight = $(window).height(),
                            effectName = $this.attr("data-intro-effect"),
                            $header = $(".mk-header"),
                            effect = {
                                fade: new TimelineLite({
                                    paused: !0
                                }).set($pageCnt, {
                                    opacity: 0,
                                    y: .3 * windowHeight
                                }).to($this, 1, {
                                    opacity: 0,
                                    ease: Power2.easeInOut
                                }).to($pageCnt, 1, {
                                    opacity: 1,
                                    y: 0,
                                    ease: Power2.easeInOut
                                }, "-=.7").set($this, {
                                    zIndex: "-1"
                                }),
                                zoom_out: new TimelineLite({
                                    paused: !0
                                }).set($pageCnt, {
                                    opacity: 0,
                                    y: .3 * windowHeight
                                }).to($this, 1.5, {
                                    opacity: .8,
                                    scale: .8,
                                    y: -windowHeight - 100,
                                    ease: Strong.easeInOut
                                }).to($pageCnt, 1.5, {
                                    opacity: 1,
                                    y: 0,
                                    ease: Strong.easeInOut
                                }, "-=1.3"),
                                shuffle: new TimelineLite({
                                    paused: !0
                                }).to($this, 1.5, {
                                    y: -windowHeight / 2,
                                    ease: Strong.easeInOut
                                }).to($pageCnt.first(), 1.5, {
                                    paddingTop: windowHeight / 2,
                                    ease: Strong.easeInOut
                                }, "-=1.3")
                            };
                        console.log($pageCnt), $this.sectiontrans({
                            effect: effectName
                        }), $this.hasClass("shuffled") && (TweenLite.set($this, {
                            y: -windowHeight / 2
                        }), TweenLite.set($this.nextAll("div").first(), {
                            paddingTop: windowHeight / 2
                        })), $("body").on("page_intro", function() {
                            MK.utils.scroll.disable(), $(this).data("intro", !0), effect[effectName].play(), setTimeout(function() {
                                $header.addClass("pre-sticky"), $header.addClass("a-sticky"), $(".mk-header-padding-wrapper").addClass("enable-padding"), $("body").data("intro", !1), "shuffle" === effectName && $this.addClass("shuffled")
                            }, 1e3), setTimeout(MK.utils.scroll.enable, 1500)
                        }), $("body").on("page_outro", function() {
                            MK.utils.scroll.disable(), $(this).data("intro", !0), effect[effectName].reverse(), setTimeout(function() {
                                $header.removeClass("pre-sticky"), $header.removeClass("a-sticky"), $(".mk-header-padding-wrapper").removeClass("enable-padding"), $("body").data("intro", !1), $this.hasClass("shuffled") && $this.removeClass("shuffled")
                            }, 1e3), setTimeout(MK.utils.scroll.enable, 1500)
                        })
                    })
                })
            }
        }

        function mk_section_adaptive_height() {
            $(".mk-page-section.mk-adaptive-height").each(function() {
                var imageHeight = $(this).find(".mk-adaptive-image").height();
                $(this).css("height", imageHeight)
            })
        }

        function mk_section_half_layout() {
            $(".mk-page-section.half_boxed").each(function() {
                var $section = $(this);
                if ($(window).width() > mk_grid_width) {
                    var margin = ($(window).width() - mk_grid_width) / 2,
                        $section_inner = $section.find(".mk-half-layout-inner");
                    $section.hasClass("half_left_layout") && $section_inner.css({
                        marginRight: margin + "px"
                    }), $section.hasClass("half_right_layout") && $section_inner.css({
                        marginLeft: margin + "px"
                    })
                }
            })
        }
        mk_section_intro_effects();
        var debounceResize = null;
        $(window).on("resize", function() {
            null !== debounceResize && clearTimeout(debounceResize), debounceResize = setTimeout(mk_section_intro_effects, 300)
        }), $(window).on("load resize", mk_section_adaptive_height);
        var $allLayers = $(".mk-page-section .background-layer").filter(function(index) {
            var isLazyLoad = "true" === $(this).attr("data-mk-lazyload");
            return isLazyLoad || MK.component.BackgroundImageSetter.init($(this)), isLazyLoad
        });
        $allLayers.length && ($(window).on("scroll.mk_page_section_lazyload", MK.utils.throttle(500, function() {
            $allLayers.each(function(index, elem) {
                MK.utils.isElementInViewport(elem) && (MK.component.BackgroundImageSetter.init($(elem)), $allLayers = $allLayers.not($(elem)))
            })
        })), $(window).trigger("scroll.mk_page_section_lazyload"), MK.component.BackgroundImageSetter.onResize($allLayers)), $(window).on("load resize", mk_section_half_layout)
    }(jQuery),
    function($) {
        "use strict";

        function mk_page_title_parallax() {
            MK.utils.isMobile() || "false" === mk_smooth_scroll || $(".mk-effect-wrapper").each(function() {
                var progressVal, currentPoint, $this = $(this),
                    ticking = !1,
                    scrollY = MK.val.scroll(),
                    $window = $(window),
                    parentHeight = ($(window).height(), $this.outerHeight()),
                    endPoint = $this.offset().top + parentHeight,
                    effectLayer = $this.find(".mk-effect-bg-layer"),
                    gradientLayer = effectLayer.find(".mk-effect-gradient-layer"),
                    cntLayer = $this.find(".mk-page-title-box-content"),
                    animation = effectLayer.attr("data-effect"),
                    top = $this.offset().top,
                    height = $this.outerHeight();
                "parallax" == animation && function() {
                    var gap = .7 * top;
                    effectLayer.css({
                        height: height + gap + "px",
                        top: -gap + "px"
                    })
                }();
                var animationSet = function() {
                    if (scrollY = MK.val.scroll(), "parallax" == animation && (currentPoint = .7 * (0 + scrollY), effectLayer.get(0).style.transform = "translateY(" + currentPoint + "px)"), "parallaxZoomOut" == animation) {
                        console.log(effectLayer), currentPoint = .7 * (0 + scrollY), progressVal = 1 / (endPoint - 0) * (scrollY - 0);
                        var zoomCalc = 1.3 - (1.3 - 1) * progressVal;
                        effectLayer.get(0).style.transform = "translateY(" + currentPoint + "px) scale(" + zoomCalc + ")"
                    }
                    "gradient" == animation && (progressVal = 1 / (endPoint - 0) * (scrollY - 0), gradientLayer.css({
                        opacity: 2 * progressVal
                    })), "gradient" != animation && (progressVal = 1 / (endPoint - 0) * (scrollY - 0), cntLayer.css({
                        opacity: 1 - 4 * progressVal
                    })), ticking = !1
                };
                animationSet();
                var requestTick = function() {
                    ticking || (window.requestAnimationFrame(animationSet), ticking = !0)
                };
                $window.off("scroll", requestTick), $window.on("scroll", requestTick)
            })
        }
        var $window = $(window),
            debounceResize = null;
        $window.on("load", mk_page_title_parallax), $window.on("resize", function() {
            null !== debounceResize && clearTimeout(debounceResize), debounceResize = setTimeout(mk_page_title_parallax, 300)
        })
    }(jQuery),
    function($) {
        "use strict";
        var utils = MK.utils,
            core = MK.core,
            path = MK.core.path;
        MK.component.PhotoAlbum = function(el) {
            this.album = el, this.initialOpen = !1
        }, MK.component.PhotoAlbum.prototype = {
            dom: {
                gallery: ".slick-slider-wrapper",
                title: ".slick-title",
                galleryContainer: ".slick-slides",
                closeBtn: ".slick-close-icon",
                thumbList: ".slick-dots",
                thumbs: ".slick-dots li",
                imagesData: "photoalbum-images",
                titleData: "photoalbum-title",
                idData: "photoalbum-id",
                urlData: "photoalbum-url",
                activeClass: "is-active"
            },
            tpl: {
                gallery: "#tpl-photo-album",
                slide: '<div class="slick-slide"></div>'
            },
            init: function() {
                this.cacheElements(), this.bindEvents(), this.openByLink()
            },
            cacheElements: function() {
                this.$album = $(this.album), this.imagesSrc = this.$album.data(this.dom.imagesData), this.albumLength = this.imagesSrc.length, this.title = this.$album.data(this.dom.titleData), this.id = this.$album.data(this.dom.idData), this.url = this.$album.data(this.dom.urlData), this.images = []
            },
            bindEvents: function() {
                this.$album.not('[data-photoalbum-images="[null]"]').on("click", this.albumClick.bind(this)), $(document).on("click", this.dom.closeBtn, this.closeClick.bind(this)), $(window).on("resize", this.thumbsVisibility.bind(this)), $(window).on("resize", this.makeArrows.bind(this))
            },
            albumClick: function(e) {
                e.preventDefault(), this.open(), MK.ui.loader.add(this.album)
            },
            closeClick: function(e) {
                e.preventDefault(), this.slider && (this.removeGallery(), this.slider.exitFullScreen())
            },
            thumbsVisibility: function() {
                this.thumbsWidth && (window.matchMedia("(max-width:" + (this.thumbsWidth + 260) + "px)").matches ? this.hideThumbs() : this.showThumbs())
            },
            hideThumbs: function() {
                this.$thumbList && this.$thumbList.hide()
            },
            showThumbs: function() {
                this.$thumbList && this.$thumbList.show()
            },
            open: function() {
                var self = this;
                core.loadDependencies([path.plugins + "slick.js"], function() {
                    self.createGallery(), self.loadImages()
                })
            },
            createGallery: function() {
                if (!$(this.dom.gallery).length) {
                    var tpl = $(this.tpl.gallery).eq(0).html();
                    $("body").append(tpl)
                }
                this.$gallery = $(this.dom.gallery), this.$closeBtn = $(this.dom.closeBtn)
            },
            createSlideshow: function() {
                var self = this;
                this.slider = new MK.ui.FullScreenGallery(this.dom.galleryContainer, {
                    id: this.id,
                    url: this.url
                }), this.slider.init(), $(window).trigger("resize"), this.makeArrows(), this.$thumbList = $(this.dom.thumbList), this.$thumbs = $(this.dom.thumbs), this.thumbsWidth = 95 * this.$thumbs.length, this.thumbsVisibility(), setTimeout(function() {
                    MK.ui.loader.remove(self.album)
                }, 100), MK.utils.eventManager.publish("photoAlbum-open")
            },
            makeArrows: function() {
                this.arrowsTimeout && clearTimeout(this.arrowsTimeout), this.arrowsTimeout = setTimeout(function() {
                    var $prev = $(".slick-prev").find("svg"),
                        $next = $(".slick-next").find("svg");
                    $prev.wrap('<div class="slick-nav-holder"></div>'), $next.wrap('<div class="slick-nav-holder"></div>'), matchMedia("(max-width: 1024px)").matches ? ($prev.attr({
                        width: 12,
                        height: 22
                    }).find("polyline").attr("points", "12,0 0,11 12,22"), $next.attr({
                        width: 12,
                        height: 22
                    }).find("polyline").attr("points", "0,0 12,11 0,22")) : ($prev.attr({
                        width: 33,
                        height: 65
                    }).find("polyline").attr("points", "0.5,0.5 32.5,32.5 0.5,64.5"), $next.attr({
                        width: 33,
                        height: 65
                    }).find("polyline").attr("points", "0.5,0.5 32.5,32.5 0.5,64.5"))
                }, 0)
            },
            loadImages: function() {
                var self = this,
                    n = 0;
                this.images.length ? this.onLoad(this.albumLength) : this.imagesSrc.forEach(function(src) {
                    if (null !== src) {
                        var img = new Image;
                        img.onload = function() {
                            self.onLoad(n += 1)
                        }, img.src = src, self.images.push(img)
                    }
                })
            },
            onLoad: function(n) {
                n === this.albumLength && (this.insertImages(), this.showGallery(), this.createSlideshow())
            },
            insertImages: function() {
                var $galleryContainer = this.$gallery.find(this.dom.galleryContainer),
                    $title = $(this.dom.title),
                    slide = this.tpl.slide;
                $galleryContainer.html(""), $title.html(this.title), this.images.forEach(function(img) {
                    var $slide = $(slide);
                    $slide.html(img), $galleryContainer.prepend($slide)
                })
            },
            showGallery: function() {
                this.$gallery.addClass(this.dom.activeClass), utils.scroll.disable()
            },
            removeGallery: function() {
                var self = this;
                this.$gallery.removeClass(this.dom.activeClass), setTimeout(function() {
                    self.$gallery.remove()
                }, 300), utils.scroll.enable()
            },
            openByLink: function() {
                var id, loc = window.location,
                    hash = loc.hash;
                hash.length && hash.substring(1).length && (id = hash.substring(1), (id = id.replace("!loading", "")) != this.id || this.initialOpen || (this.initialOpen = !0, this.open()))
            }
        }, MK.component.PhotoAlbumBlur = function(el) {
            var blurImage = function($item) {
                return $item.each(function() {
                    var $_this = $(this),
                        img = $_this.find(".album-cover-image");
                    img.clone().addClass("blur-effect item-blur-thumbnail").removeClass("album-cover-image").prependTo(this);
                    var blur_this = $(".blur-effect", this);
                    blur_this.each(function(index, element) {
                        !0 === img[index].complete ? Pixastic.process(blur_this[index], "blurfast", {
                            amount: .5
                        }) : blur_this.load(function() {
                            Pixastic.process(blur_this[index], "blurfast", {
                                amount: .5
                            })
                        })
                    })
                })
            };
            return {
                init: function() {
                    core.loadDependencies([path.plugins + "pixastic.js"], function() {
                        blurImage($(".mk-album-item figure"))
                    })
                }
            }
        }
    }(jQuery), jQuery(function($) {
        "use strict";
        var $portfolio = $(".portfolio-grid"),
            $imgs = $portfolio.find("img[data-mk-image-src-set]");
        $portfolio.hasClass("portfolio-grid-lazyload") && $imgs.length ? ($(window).on("scroll.mk_portfolio_lazyload", MK.utils.throttle(500, function() {
            $imgs.each(function(index, elem) {
                MK.utils.isElementInViewport(elem) && (MK.component.ResponsiveImageSetter.init($(elem)), $imgs = $imgs.not($(elem)))
            })
        })), $(window).trigger("scroll.mk_portfolio_lazyload"), MK.component.ResponsiveImageSetter.onResize($imgs)) : (MK.component.ResponsiveImageSetter.init($imgs), MK.component.ResponsiveImageSetter.onResize($imgs))
    }), jQuery(document).ready(function($) {
        "use strict";

        function get_item_width(style, showItems, id) {
            var item_width;
            if ("classic" == style) item_width = 275, items_to_show = 4;
            else {
                var screen_width = $("#portfolio-carousel-" + id).width(),
                    items_to_show = showItems;
                item_width = screen_width >= 1100 ? screen_width / items_to_show : screen_width <= 1200 && screen_width >= 800 ? screen_width / 3 : screen_width <= 800 && screen_width >= 540 ? screen_width / 2 : screen_width
            }
            return item_width
        }
        jQuery(window).on("load", function() {
            MK.core.loadDependencies([MK.core.path.plugins + "jquery.flexslider.js"], function() {
                $(".portfolio-carousel .mk-flexslider").each(function() {
                    $(this).flexslider({
                        selector: ".mk-flex-slides > li",
                        slideshow: !isTest,
                        animation: "slide",
                        slideshowSpeed: 6e3,
                        animationSpeed: 400,
                        pauseOnHover: !0,
                        controlNav: !1,
                        smoothHeight: !1,
                        useCSS: !1,
                        directionNav: $(this).data("directionNav"),
                        prevText: "",
                        nextText: "",
                        itemWidth: get_item_width($(this).data("style"), $(this).data("showItems"), $(this).data("id")),
                        itemMargin: 0,
                        maxItems: "modern" === $(this).data("style") ? $(this).data("showItems") : 4,
                        minItems: 1,
                        move: 1
                    })
                })
            })
        })
    }),
    function($) {
        "use strict";
        var AjaxModal = function(el) {
            this.el = el;
            var $this = $(el),
                action = $this.data("action"),
                id = $this.data("id");
            this.load(action, id)
        };
        AjaxModal.prototype = {
            init: function(html) {
                var self = this;
                $("body").append(html), this.cacheElements(), this.bindEvents(), this.$modal.addClass("is-active"), MK.core.initAll(self.$modal.get(0)), $(".variations_form").each(function() {
                    $(this).wc_variation_form().find(".variations select:eq(0)").change()
                }), MK.utils.scroll.disable(), MK.ui.loader.remove(), MK.utils.eventManager.publish("quickViewOpen")
            },
            cacheElements: function() {
                this.$modal = $(".mk-modal"), this.$slider = this.$modal.find(".mk-slider-holder"), this.$container = this.$modal.find(".mk-modal-container"), this.$closeBtn = this.$modal.find(".js-modal-close")
            },
            bindEvents: function() {
                this.$container.on("click", function(e) {
                    e.stopPropagation()
                }), this.$closeBtn.on("click", this.handleClose.bind(this)), this.$modal.on("click", this.handleClose.bind(this))
            },
            handleClose: function(e) {
                e.preventDefault(), MK.utils.scroll.enable(), this.close()
            },
            close: function() {
                this.$modal.remove()
            },
            load: function(action, id) {
                $.ajax({
                    url: MK.core.path.ajaxUrl,
                    data: {
                        action: action,
                        id: id
                    },
                    success: this.init.bind(this),
                    error: this.error.bind(this)
                })
            },
            error: function(response) {
                console.log(response)
            }
        };
        var createModal = function(e) {
            e.preventDefault();
            var el = e.currentTarget;
            MK.ui.loader.add($(el).parents(".product-loop-thumb")), new AjaxModal(el)
        };
        $(document).on("click", ".js-ajax-modal", createModal)
    }(jQuery),
    function($) {
        function handleLoad() {
            $(".mk-slideshow-box").each(run)
        }

        function run() {
            function autoScroll() {
                if (!isTest) {
                    var $i = $slider.find(".active").index();
                    $slides.eq($i).removeClass("active").fadeOut($transition_time), $slides.length == $i + 1 && ($i = -1), $slides.eq($i + 1).addClass("active").fadeIn($transition_time, function() {
                        setTimeout(autoScroll, $time_between_slides)
                    })
                }
            }
            var $slider = $(this),
                $slides = $slider.find(".mk-slideshow-box-item"),
                $transition_time = $slider.data("transitionspeed"),
                $time_between_slides = $slider.data("slideshowspeed");
            $slider.find(".mk-slideshow-box-content").children("p").filter(function() {
                if ("" == $.trim($(this).text())) return !0
            }).remove(), $slides.first().addClass("active").fadeIn($transition_time, function() {
                setTimeout(autoScroll, $time_between_slides)
            })
        }
        window.addEventListener ? window.addEventListener("load", handleLoad, !1) : window.attachEvent && window.attachEvent("onload", handleLoad)
    }(jQuery),
    function($) {
        "use strict";
        $(".mk-subscribe").each(function() {
            var $this = $(this);
            $this.find(".mk-subscribe--form").submit(function(e) {
                e.preventDefault(), $.ajax({
                    url: MK.core.path.ajaxUrl,
                    type: "POST",
                    data: {
                        action: "mk_ajax_subscribe",
                        email: $this.find(".mk-subscribe--email").val(),
                        list_id: $this.find(".mk-subscribe--list-id").val(),
                        optin: $this.find(".mk-subscribe--optin").val()
                    },
                    success: function(res) {
                        $this.find(".mk-subscribe--message").html($.parseJSON(res).message), console.log($.parseJSON(res).message)
                    }
                })
            })
        })
    }(jQuery),
    function($) {
        "use strict";
        var _instancesCollection = {};
        MK.component.SwipeSlideshow = function(el) {
            var $this = $(el),
                id = $this.parent().attr("id");
            this.el = el, this.id = id, this.config = $this.data("swipeslideshow-config"), this.config && (this.config.hasPagination = !1)
        }, MK.component.SwipeSlideshow.prototype = {
            init: function() {
                var slider = new MK.ui.Slider(this.el, this.config);
                slider.init(), _instancesCollection[this.id] = slider
            }
        }, MK.component.SwipeSlideshowExtraNav = function(el) {
            this.el = el
        }, MK.component.SwipeSlideshowExtraNav.prototype = {
            init: function() {
                this.cacheElements(), this.bindEvents()
            },
            cacheElements: function() {
                var $this = $(this.el);
                this.sliderId = $this.data("gallery"), this.slider = _instancesCollection[this.sliderId], this.$thumbs = $("#" + this.sliderId).find(".thumbnails a")
            },
            bindEvents: function() {
                this.$thumbs.on("click", this.clickThumb.bind(this))
            },
            clickThumb: function(e) {
                e.preventDefault();
                var $this = $(e.currentTarget),
                    id = $this.index();
                this.slider.goTo(id)
            }
        }, MK.utils.eventManager.subscribe("gallery-update", function(e, config) {
            void 0 !== _instancesCollection[config.id] && _instancesCollection[config.id].reset()
        });
        var $swiper = $(".mk-swipe-slideshow"),
            $imgs = $swiper.find("img[data-mk-image-src-set]");
        $swiper.hasClass("mk-swipe-slideshow-lazyload") && $imgs.length ? ($(window).on("scroll.mk_swipe_slideshow_lazyload", MK.utils.throttle(500, function() {
            $imgs.each(function(index, elem) {
                MK.utils.isElementInViewport(elem) && (MK.component.ResponsiveImageSetter.init($(elem)), $imgs = $imgs.not($(elem)))
            })
        })), $(window).trigger("scroll.mk_swipe_slideshow_lazyload"), MK.component.ResponsiveImageSetter.onResize($imgs)) : (MK.component.ResponsiveImageSetter.init($imgs), MK.component.ResponsiveImageSetter.onResize($imgs))
    }(jQuery),
    function($) {
        "use strict";
        var core = MK.core;
        core.path;
        MK.component.Tooltip = function(el) {
            return {
                init: function() {
                    $(".mk-tooltip").each(function() {
                        $(this).find(".mk-tooltip--link").hover(function() {
                            $(this).siblings(".mk-tooltip--text").stop(!0).animate({
                                opacity: 1
                            }, 400)
                        }, function() {
                            $(this).siblings(".mk-tooltip--text").stop(!0).animate({
                                opacity: 0
                            }, 400)
                        })
                    })
                }
            }
        }
    }(jQuery),
    function($) {
        "use strict";
        ! function() {
            $(".mk-flickr-feeds").each(function() {
                var $this = $(this),
                    apiKey = $this.attr("data-key"),
                    userId = $this.attr("data-userid"),
                    perPage = $this.attr("data-count");
                $this.attr("data-column"), jQuery.getJSON("https://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&api_key=" + apiKey + "&user_id=" + userId + "&&per_page=" + perPage + "&jsoncallback=?", function(data) {
                    jQuery.each(data.photos.photo, function(i, rPhoto) {
                        var basePhotoURL = "http://farm" + rPhoto.farm + ".static.flickr.com/" + rPhoto.server + "/" + rPhoto.id + "_" + rPhoto.secret,
                            thumbPhotoURL = basePhotoURL + "_q.jpg",
                            mediumPhotoURL = basePhotoURL + ".jpg",
                            photoStringEnd = 'title="' + rPhoto.title + '" rel="flickr-feeds" class="mk-lightbox flickr-item a_colitem" href="' + mediumPhotoURL + '"><img src="' + thumbPhotoURL + '" alt="' + rPhoto.title + '"/></a>;',
                            photoString = "<a " + photoStringEnd;
                        jQuery(photoString).appendTo($this)
                    })
                })
            })
        }()
    }(jQuery),
    function($) {
        "use strict";

        function dynamicHeight() {
            var $this = $(this);
            $this.height("auto"), window.matchMedia("(max-width: 768px)").matches || $this.height($this.height())
        }
        var $window = $(window),
            container = document.getElementById("mk-theme-container");
        $(".equal-columns").each(function() {
            dynamicHeight.bind(this), $window.on("load", dynamicHeight.bind(this)), $window.on("resize", dynamicHeight.bind(this)), window.addResizeListener(container, dynamicHeight.bind(this))
        })
    }(jQuery),
    function($) {
        "use strict";

        function mk_video_play() {}

        function mk_video_resize_play_icon() {
            $(".video-thumbnail-overlay").each(function() {
                var $thumbnailOverlay = $(this),
                    thumbnailWidth = $thumbnailOverlay.width(),
                    $svg = $thumbnailOverlay.find("svg");
                void 0 === $svg.data("width") && $svg.attr("data-width", $svg.width()), void 0 === $svg.data("height") && $svg.attr("data-height", $svg.height()), 4 * $svg.data("width") > thumbnailWidth ? $svg.css({
                    width: Math.round(parseInt(thumbnailWidth) / 4) + "px",
                    height: Math.round(parseInt(thumbnailWidth) / 4 * $svg.data("height") / $svg.data("width")) + "px"
                }) : $svg.css({
                    width: $svg.data("width") + "px",
                    height: $svg.data("height") + "px"
                })
            })
        }
        $(window).on("load", mk_video_play), $(window).on("load resize orientationChange", mk_video_resize_play_icon)
    }(jQuery),
    function() {
        function initTest() {
            options.keyboardSupport && addEvent("keydown", keydown)
        }

        function init() {
            if (!initDone && document.body) {
                initDone = !0;
                var body = document.body,
                    html = document.documentElement,
                    windowHeight = window.innerHeight,
                    scrollHeight = body.scrollHeight;
                if (root = document.compatMode.indexOf("CSS") >= 0 ? html : body, activeElement = body, initTest(), top != self) isFrame = !0;
                else if (scrollHeight > windowHeight && (body.offsetHeight <= windowHeight || html.offsetHeight <= windowHeight)) {
                    var fullPageElem = document.createElement("div");
                    fullPageElem.style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + root.scrollHeight + "px", document.body.appendChild(fullPageElem);
                    var pendingRefresh;
                    refreshSize = function() {
                        pendingRefresh || (pendingRefresh = setTimeout(function() {
                            isExcluded || (fullPageElem.style.height = "0", fullPageElem.style.height = root.scrollHeight + "px", pendingRefresh = null)
                        }, 500))
                    }, setTimeout(refreshSize, 10), addEvent("resize", refreshSize), window.addResizeListener(document.getElementById("mk-theme-container"), refreshSize);
                    var config = {
                        attributes: !0,
                        childList: !0,
                        characterData: !1
                    };
                    if (observer = new MutationObserver(refreshSize), observer.observe(body, config), root.offsetHeight <= windowHeight) {
                        var clearfix = document.createElement("div");
                        clearfix.style.clear = "both", body.appendChild(clearfix)
                    }
                }
                options.fixedBackground || isExcluded || (body.style.backgroundAttachment = "scroll", html.style.backgroundAttachment = "scroll")
            }
        }

        function cleanup() {
            observer && observer.disconnect(), removeEvent(wheelEvent, wheel), removeEvent("mousedown", mousedown), removeEvent("keydown", keydown), removeEvent("resize", refreshSize), removeEvent("load", init)
        }

        function scrollArray(elem, left, top) {
            if (directionCheck(left, top), 1 != options.accelerationMax) {
                var now = Date.now(),
                    elapsed = now - lastScroll;
                if (elapsed < options.accelerationDelta) {
                    var factor = (1 + 50 / elapsed) / 2;
                    factor > 1 && (factor = Math.min(factor, options.accelerationMax), left *= factor, top *= factor)
                }
                lastScroll = Date.now()
            }
            if (que.push({
                    x: left,
                    y: top,
                    lastX: left < 0 ? .99 : -.99,
                    lastY: top < 0 ? .99 : -.99,
                    start: Date.now()
                }), !pending) {
                var scrollWindow = elem === document.body,
                    step = function(time) {
                        for (var now = Date.now(), scrollX = 0, scrollY = 0, i = 0; i < que.length; i++) {
                            var item = que[i],
                                elapsed = now - item.start,
                                finished = elapsed >= options.animationTime,
                                position = finished ? 1 : elapsed / options.animationTime;
                            options.pulseAlgorithm && (position = pulse(position));
                            var x = item.x * position - item.lastX >> 0,
                                y = item.y * position - item.lastY >> 0;
                            scrollX += x, scrollY += y, item.lastX += x, item.lastY += y, finished && (que.splice(i, 1), i--)
                        }
                        scrollWindow ? window.scrollBy(scrollX, scrollY) : (scrollX && (elem.scrollLeft += scrollX), scrollY && (elem.scrollTop += scrollY)), left || top || (que = []), que.length ? requestFrame(step, elem, 1e3 / options.frameRate + 1) : pending = !1
                    };
                requestFrame(step, elem, 0), pending = !0
            }
        }

        function wheel(event) {
            initDone || init();
            var target = event.target,
                overflowing = overflowingAncestor(target);
            if (!overflowing || event.defaultPrevented || event.ctrlKey) return !0;
            if (isNodeName(activeElement, "embed") || isNodeName(target, "embed") && /\.pdf/i.test(target.src) || isNodeName(activeElement, "object")) return !0;
            var deltaX = -event.wheelDeltaX || event.deltaX || 0,
                deltaY = -event.wheelDeltaY || event.deltaY || 0;
            if (isMac && (options.touchpadSupport = !1, event.wheelDeltaX && isDivisible(event.wheelDeltaX, 120) && (deltaX = event.wheelDeltaX / Math.abs(event.wheelDeltaX) * -120), event.wheelDeltaY && isDivisible(event.wheelDeltaY, 120) && (deltaY = event.wheelDeltaY / Math.abs(event.wheelDeltaY) * -120)), deltaX || deltaY || (deltaY = -event.wheelDelta || 0), 1 === event.deltaMode && (deltaX *= 40, deltaY *= 40), !options.touchpadSupport && isTouchpad(deltaY)) return !0;
            Math.abs(deltaX) > 1.2 && (deltaX *= options.stepSize / 120), Math.abs(deltaY) > 1.2 && (deltaY *= options.stepSize / 120), scrollArray(overflowing, deltaX, deltaY), event.preventDefault(), scheduleClearCache()
        }

        function keydown(event) {
            var target = event.target,
                modifier = event.ctrlKey || event.altKey || event.metaKey || event.shiftKey && event.keyCode !== key.spacebar;
            document.body.contains(activeElement) || (activeElement = document.activeElement);
            var inputNodeNames = /^(textarea|select|embed|object)$/i,
                buttonTypes = /^(button|submit|radio|checkbox|file|color|image)$/i;
            if (inputNodeNames.test(target.nodeName) || isNodeName(target, "input") && !buttonTypes.test(target.type) || isNodeName(activeElement, "video") || isInsideYoutubeVideo(event) || target.isContentEditable || event.defaultPrevented || modifier) return !0;
            if ((isNodeName(target, "button") || isNodeName(target, "input") && buttonTypes.test(target.type)) && event.keyCode === key.spacebar) return !0;
            var shift, x = 0,
                y = 0,
                elem = overflowingAncestor(activeElement),
                clientHeight = elem.clientHeight;
            switch (elem == document.body && (clientHeight = window.innerHeight), event.keyCode) {
                case key.up:
                    y = -options.arrowScroll;
                    break;
                case key.down:
                    y = options.arrowScroll;
                    break;
                case key.spacebar:
                    shift = event.shiftKey ? 1 : -1, y = -shift * clientHeight * .9;
                    break;
                case key.pageup:
                    y = .9 * -clientHeight;
                    break;
                case key.pagedown:
                    y = .9 * clientHeight;
                    break;
                case key.home:
                    y = -elem.scrollTop;
                    break;
                case key.end:
                    var damt = elem.scrollHeight - elem.scrollTop - clientHeight;
                    y = damt > 0 ? damt + 10 : 0;
                    break;
                case key.left:
                    x = -options.arrowScroll;
                    break;
                case key.right:
                    x = options.arrowScroll;
                    break;
                default:
                    return !0
            }
            scrollArray(elem, x, y), event.preventDefault(), scheduleClearCache()
        }

        function mousedown(event) {
            activeElement = event.target
        }

        function scheduleClearCache() {
            clearTimeout(clearCacheTimer), clearCacheTimer = setInterval(function() {
                cache = {}
            }, 1e3)
        }

        function setCache(elems, overflowing) {
            for (var i = elems.length; i--;) cache[uniqueID(elems[i])] = overflowing;
            return overflowing
        }

        function overflowingAncestor(el) {
            var elems = [],
                body = document.body,
                rootScrollHeight = root.scrollHeight;
            do {
                var cached = cache[uniqueID(el)];
                if (cached) return setCache(elems, cached);
                if (elems.push(el), rootScrollHeight === el.scrollHeight) {
                    var topOverflowsNotHidden = overflowNotHidden(root) && overflowNotHidden(body),
                        isOverflowCSS = topOverflowsNotHidden || overflowAutoOrScroll(root);
                    if (isFrame && isContentOverflowing(root) || !isFrame && isOverflowCSS) return setCache(elems, getScrollRoot())
                } else if (isContentOverflowing(el) && overflowAutoOrScroll(el)) return setCache(elems, el)
            } while (el = el.parentElement)
        }

        function isContentOverflowing(el) {
            return el.clientHeight + 10 < el.scrollHeight
        }

        function overflowNotHidden(el) {
            return "hidden" !== getComputedStyle(el, "").getPropertyValue("overflow-y")
        }

        function overflowAutoOrScroll(el) {
            var overflow = getComputedStyle(el, "").getPropertyValue("overflow-y");
            return "scroll" === overflow || "auto" === overflow
        }

        function addEvent(type, fn) {
            window.addEventListener(type, fn, !1)
        }

        function removeEvent(type, fn) {
            window.removeEventListener(type, fn, !1)
        }

        function isNodeName(el, tag) {
            return (el.nodeName || "").toLowerCase() === tag.toLowerCase()
        }

        function directionCheck(x, y) {
            x = x > 0 ? 1 : -1, y = y > 0 ? 1 : -1, direction.x === x && direction.y === y || (direction.x = x, direction.y = y, que = [], lastScroll = 0)
        }

        function isTouchpad(deltaY) {
            if (deltaY) return deltaBuffer.length || (deltaBuffer = [deltaY, deltaY, deltaY]), deltaY = Math.abs(deltaY), deltaBuffer.push(deltaY), deltaBuffer.shift(), clearTimeout(deltaBufferTimer), deltaBufferTimer = setTimeout(function() {
                window.localStorage && (localStorage.SS_deltaBuffer = deltaBuffer.join(","))
            }, 1e3), !allDeltasDivisableBy(120) && !allDeltasDivisableBy(100)
        }

        function isDivisible(n, divisor) {
            return Math.floor(n / divisor) == n / divisor
        }

        function allDeltasDivisableBy(divisor) {
            return isDivisible(deltaBuffer[0], divisor) && isDivisible(deltaBuffer[1], divisor) && isDivisible(deltaBuffer[2], divisor)
        }

        function isInsideYoutubeVideo(event) {
            var elem = event.target,
                isControl = !1;
            if (-1 != document.URL.indexOf("www.youtube.com/watch"))
                do {
                    if (isControl = elem.classList && elem.classList.contains("html5-video-controls")) break
                } while (elem = elem.parentNode);
            return isControl
        }

        function pulse_(x) {
            var val, start, expx;
            return x *= options.pulseScale, x < 1 ? val = x - (1 - Math.exp(-x)) : (start = Math.exp(-1), x -= 1, expx = 1 - Math.exp(-x), val = start + expx * (1 - start)), val * options.pulseNormalize
        }

        function pulse(x) {
            return x >= 1 ? 1 : x <= 0 ? 0 : (1 == options.pulseNormalize && (options.pulseNormalize /= pulse_(1)), pulse_(x))
        }

        function SmoothScroll(optionsToSet) {
            for (var key in optionsToSet) defaultOptions.hasOwnProperty(key) && (options[key] = optionsToSet[key])
        }
        var activeElement, observer, refreshSize, clearCacheTimer, deltaBufferTimer, defaultOptions = {
                frameRate: 150,
                animationTime: 400,
                stepSize: 100,
                pulseAlgorithm: !0,
                pulseScale: 4,
                pulseNormalize: 1,
                accelerationDelta: 50,
                accelerationMax: 3,
                keyboardSupport: !0,
                arrowScroll: 50,
                touchpadSupport: !0,
                fixedBackground: !0,
                excluded: ""
            },
            options = defaultOptions,
            isExcluded = !1,
            isFrame = !1,
            direction = {
                x: 0,
                y: 0
            },
            initDone = !1,
            root = document.documentElement,
            deltaBuffer = [],
            isMac = /^Mac/.test(navigator.platform),
            key = {
                left: 37,
                up: 38,
                right: 39,
                down: 40,
                spacebar: 32,
                pageup: 33,
                pagedown: 34,
                end: 35,
                home: 36
            },
            que = [],
            pending = !1,
            lastScroll = Date.now(),
            uniqueID = function() {
                var i = 0;
                return function(el) {
                    return el.uniqueID || (el.uniqueID = i++)
                }
            }(),
            cache = {};
        window.localStorage && localStorage.SS_deltaBuffer && (deltaBuffer = localStorage.SS_deltaBuffer.split(","));
        var wheelEvent, requestFrame = function() {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback, element, delay) {
                    window.setTimeout(callback, delay || 1e3 / 60)
                }
            }(),
            MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
            getScrollRoot = function() {
                var SCROLL_ROOT;
                return function() {
                    if (!SCROLL_ROOT) {
                        var dummy = document.createElement("div");
                        dummy.style.cssText = "height:10000px;width:1px;", document.body.appendChild(dummy);
                        var bodyScrollTop = document.body.scrollTop;
                        document.documentElement.scrollTop;
                        window.scrollBy(0, 3), SCROLL_ROOT = document.body.scrollTop != bodyScrollTop ? document.body : document.documentElement, window.scrollBy(0, -3), document.body.removeChild(dummy)
                    }
                    return SCROLL_ROOT
                }
            }(),
            userAgent = window.navigator.userAgent,
            isIE = /Trident/.test(userAgent),
            isEdge = /Edge/.test(userAgent),
            isChrome = /chrome/i.test(userAgent) && !isEdge,
            isMobile = (/safari/i.test(userAgent), /mobile/i.test(userAgent)),
            isIEWin7 = /Windows NT 6.1/i.test(userAgent) && /rv:11/i.test(userAgent),
            isEnabledForBrowser = (isChrome || isIEWin7 || isIE || isEdge) && !isMobile;
        "onwheel" in document.createElement("div") ? wheelEvent = "wheel" : "onmousewheel" in document.createElement("div") && (wheelEvent = "mousewheel"), wheelEvent && isEnabledForBrowser && (addEvent(wheelEvent, wheel), addEvent("mousedown", mousedown), addEvent("load", init)), SmoothScroll.destroy = cleanup, window.SmoothScrollOptions && SmoothScroll(window.SmoothScrollOptions), "function" == typeof define && define.amd ? define(function() {
            return SmoothScroll
        }) : "object" == typeof exports ? module.exports = SmoothScroll : window.SmoothScroll = SmoothScroll
    }();
! function r(s, l, c) {
    function a(e, t) {
        if (!l[e]) {
            if (!s[e]) {
                var i = !1;
                if (!t && i) return i(e, !0);
                if (d) return d(e, !0);
                var o = new Error("Cannot find module '" + e + "'");
                throw o.code = "MODULE_NOT_FOUND", o
            }
            var n = l[e] = {
                exports: {}
            };
            s[e][0].call(n.exports, function(t) {
                return a(s[e][1][t] || t)
            }, n, n.exports, r, s, l, c)
        }
        return l[e].exports
    }
    for (var d = !1, t = 0; t < c.length; t++) a(c[t]);
    return a
}({
    1: [function(t, e, i) {
        "use strict";

        function s(t) {
            return (s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function l(t) {
            if (!window.location.hash || 0 === window.location.hash.length) return !1;
            var e = window.location.hash.match(/[#&](boxzilla-\d+)/);
            if (!e || "object" !== s(e) || e.length < 2) return !1;
            var i = e[1];
            return i === t.element.id || !!t.element.querySelector("#" + i)
        }
        var c, a, d;
        c = t("boxzilla"), a = window.boxzilla_options, (d = document.body && document.body.className && -1 < document.body.className.indexOf("logged-in")) && a.testMode && console.log("Boxzilla: Test mode is enabled. Please disable test mode if you're done testing."), c.init(), window.addEventListener("load", function() {
            if (!a.inited) {
                for (var t in a.boxes) {
                    var e = a.boxes[t];
                    e.testMode = d && a.testMode;
                    var i = document.getElementById("boxzilla-box-" + e.id + "-content");
                    if (i) {
                        e.content = i;
                        var o = c.create(e.id, e);
                        o.element.className = o.element.className + " boxzilla-" + e.post.slug, n = o.element, (r = e.css).background_color && (n.style.background = r.background_color), r.color && (n.style.color = r.color), r.border_color && (n.style.borderColor = r.border_color), r.border_width && (n.style.borderWidth = parseInt(r.border_width) + "px"), r.border_style && (n.style.borderStyle = r.border_style), r.width && (n.style.maxWidth = parseInt(r.width) + "px");
                        try {
                            o.element.firstChild.firstChild.className += " first-child", o.element.firstChild.lastChild.className += " last-child"
                        } catch (t) {}
                        o.fits() && l(o) && o.show()
                    }
                }
                var n, r;
                a.inited = !0, c.trigger("done"),
                    function() {
                        if ("object" === s(window.mc4wp_forms_config) && window.mc4wp_forms_config.submitted_form || "object" === s(window.mc4wp_submitted_form)) {
                            var e = "#" + (window.mc4wp_submitted_form || window.mc4wp_forms_config.submitted_form).element_id;
                            c.boxes.forEach(function(t) {
                                t.element.querySelector(e) && t.show()
                            })
                        }
                    }()
            }
        })
    }, {
        boxzilla: 4
    }],
    2: [function(t, e, i) {
        "use strict";
        var n = 320;

        function a(t, e) {
            for (var i in e) e.hasOwnProperty(i) && (t.style[i] = e[i])
        }

        function d(c, a, d) {
            var h = +new Date,
                t = window.getComputedStyle(c),
                g = {},
                u = {};
            for (var e in a)
                if (a.hasOwnProperty(e)) {
                    a[e] = parseFloat(a[e]);
                    var i = a[e],
                        o = parseFloat(t[e]);
                    o !== i ? (u[e] = (i - o) / n, g[e] = o) : delete a[e]
                }! function t() {
                var e, i, o, n, r = +new Date - h,
                    s = !0;
                for (var l in a) a.hasOwnProperty(l) && (e = u[l], i = a[l], o = e * r, n = g[l] + o, 0 < e && i <= n || e < 0 && n <= i ? n = i : s = !1, g[l] = n, c.style[l] = "opacity" !== l ? n + "px" : n);
                h = +new Date, s ? d && d() : window.requestAnimationFrame(t)
            }()
        }
        e.exports = {
            toggle: function(t, e, i) {
                function o() {
                    t.removeAttribute("data-animated"), t.setAttribute("style", l.getAttribute("style")), t.style.display = s ? "none" : "", i && i()
                }
                var n, r, s = "none" !== t.style.display || 0 < t.offsetLeft,
                    l = t.cloneNode(!0);
                if (t.setAttribute("data-animated", "true"), s || (t.style.display = ""), "slide" === e) {
                    if (n = function(t, e) {
                            for (var i = {}, o = 0; o < t.length; o++) i[t[o]] = e;
                            return i
                        }(["height", "borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"], 0), r = {}, !s) {
                        if (r = function(t, e) {
                                for (var i = {}, o = 0; o < t.length; o++) i[t[o]] = e[t[o]];
                                return i
                            }(["height", "borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"], window.getComputedStyle(t)), !isFinite(r.height)) {
                            var c = t.getBoundingClientRect();
                            r.height = c.height
                        }
                        a(t, n)
                    }
                    t.style.overflowY = "hidden", d(t, s ? n : r, o)
                } else n = {
                    opacity: 0
                }, r = {
                    opacity: 1
                }, s || a(t, n), d(t, s ? n : r, o)
            },
            animate: d,
            animated: function(t) {
                return !!t.getAttribute("data-animated")
            }
        }
    }, {}],
    3: [function(t, e, i) {
        "use strict";
        var o = {
                animation: "fade",
                rehide: !1,
                content: "",
                cookie: null,
                icon: "&times",
                screenWidthCondition: null,
                position: "center",
                testMode: !1,
                trigger: !1,
                closable: !0
            },
            n = t("./animator.js");

        function r(t, e, i) {
            this.id = t, this.fireEvent = i, this.config = function(t, e) {
                var i = {};
                for (var o in t) t.hasOwnProperty(o) && (i[o] = t[o]);
                for (var n in e) e.hasOwnProperty(n) && (i[n] = e[n]);
                return i
            }(o, e), this.overlay = document.createElement("div"), this.overlay.style.display = "none", this.overlay.id = "boxzilla-overlay-" + this.id, this.overlay.classList.add("boxzilla-overlay"), document.body.appendChild(this.overlay), this.visible = !1, this.dismissed = !1, this.triggered = !1, this.triggerHeight = this.calculateTriggerHeight(), this.cookieSet = this.isCookieSet(), this.element = null, this.contentElement = null, this.closeIcon = null, this.dom(), this.events()
        }
        r.prototype.events = function() {
            var n = this;
            this.closeIcon && this.closeIcon.addEventListener("click", function(t) {
                t.preventDefault(), n.dismiss()
            }), this.element.addEventListener("click", function(t) {
                "A" === t.target.tagName && n.fireEvent("box.interactions.link", [n, t.target])
            }, !1), this.element.addEventListener("submit", function(t) {
                n.setCookie(), n.fireEvent("box.interactions.form", [n, t.target])
            }, !1), this.overlay.addEventListener("click", function(t) {
                var e = t.offsetX,
                    i = t.offsetY,
                    o = n.element.getBoundingClientRect();
                (e < o.left - 40 || e > o.right + 40 || i < o.top - 40 || i > o.bottom + 40) && n.dismiss()
            })
        }, r.prototype.dom = function() {
            var t = document.createElement("div");
            t.className = "boxzilla-container boxzilla-" + this.config.position + "-container";
            var e, i = document.createElement("div");
            if (i.id = "boxzilla-" + this.id, i.className = "boxzilla boxzilla-" + this.id + " boxzilla-" + this.config.position, i.style.display = "none", t.appendChild(i), "string" == typeof this.config.content ? (e = document.createElement("div")).innerHTML = this.config.content : (e = this.config.content).style.display = "", e.className = "boxzilla-content", i.appendChild(e), this.config.closable && this.config.icon) {
                var o = document.createElement("span");
                o.className = "boxzilla-close-icon", o.innerHTML = this.config.icon, i.appendChild(o), this.closeIcon = o
            }
            document.body.appendChild(t), this.contentElement = e, this.element = i
        }, r.prototype.setCustomBoxStyling = function() {
            var t = this.element.style.display;
            this.element.style.display = "", this.element.style.overflowY = "", this.element.style.maxHeight = "";
            var e = window.innerHeight,
                i = this.element.clientHeight;
            if (e < i && (this.element.style.maxHeight = e + "px", this.element.style.overflowY = "scroll"), "center" === this.config.position) {
                var o = (e - i) / 2;
                o = 0 <= o ? o : 0, this.element.style.marginTop = o + "px"
            }
            this.element.style.display = t
        }, r.prototype.toggle = function(t, e) {
            return e = void 0 === e || e, !((t = void 0 === t ? !this.visible : t) === this.visible || n.animated(this.element) || !t && !this.config.closable || (this.visible = t, this.setCustomBoxStyling(), this.fireEvent("box." + (t ? "show" : "hide"), [this]), "center" === this.config.position && (this.overlay.classList.toggle("boxzilla-" + this.id + "-overlay"), e ? n.toggle(this.overlay, "fade") : this.overlay.style.display = t ? "" : "none"), e ? n.toggle(this.element, this.config.animation, function() {
                this.visible || (this.contentElement.innerHTML = this.contentElement.innerHTML + "")
            }.bind(this)) : this.element.style.display = t ? "" : "none", 0))
        }, r.prototype.show = function(t) {
            return this.toggle(!0, t)
        }, r.prototype.hide = function(t) {
            return this.toggle(!1, t)
        }, r.prototype.calculateTriggerHeight = function() {
            var t = 0;
            if (this.config.trigger)
                if ("element" === this.config.trigger.method) {
                    var e = document.body.querySelector(this.config.trigger.value);
                    e && (t = e.getBoundingClientRect().top)
                } else "percentage" === this.config.trigger.method && (t = this.config.trigger.value / 100 * function() {
                    var t = document.body,
                        e = document.documentElement;
                    return Math.max(t.scrollHeight, t.offsetHeight, e.clientHeight, e.scrollHeight, e.offsetHeight)
                }());
            return t
        }, r.prototype.fits = function() {
            if (!this.config.screenWidthCondition || !this.config.screenWidthCondition.value) return !0;
            switch (this.config.screenWidthCondition.condition) {
                case "larger":
                    return window.innerWidth > this.config.screenWidthCondition.value;
                case "smaller":
                    return window.innerWidth < this.config.screenWidthCondition.value
            }
            return !0
        }, r.prototype.onResize = function() {
            this.triggerHeight = this.calculateTriggerHeight(), this.setCustomBoxStyling()
        }, r.prototype.mayAutoShow = function() {
            return !(this.dismissed || !this.fits() || !this.config.trigger || this.cookieSet)
        }, r.prototype.mayRehide = function() {
            return this.config.rehide && this.triggered
        }, r.prototype.isCookieSet = function() {
            return !(this.config.testMode || !this.config.trigger || !this.config.cookie || !this.config.cookie.triggered && !this.config.cookie.dismissed || "true" !== document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*boxzilla_box_" + this.id + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1"))
        }, r.prototype.setCookie = function(t) {
            var e = new Date;
            e.setHours(e.getHours() + t), document.cookie = "boxzilla_box_" + this.id + "=true; expires=" + e.toUTCString() + "; path=/"
        }, r.prototype.trigger = function() {
            this.show() && (this.triggered = !0, this.config.cookie && this.config.cookie.triggered && this.setCookie(this.config.cookie.triggered))
        }, r.prototype.dismiss = function(t) {
            return !!this.visible && (this.hide(t), this.config.cookie && this.config.cookie.dismissed && this.setCookie(this.config.cookie.dismissed), this.dismissed = !0, this.fireEvent("box.dismiss", [this]), !0)
        }, e.exports = r
    }, {
        "./animator.js": 2
    }],
    4: [function(t, e, i) {
        "use strict";
        var o = t("./box.js"),
            n = t("./util.js").throttle,
            r = t("./styles.js"),
            s = t("./triggers/exit-intent.js"),
            l = t("./triggers/scroll.js"),
            c = t("./triggers/pageviews.js"),
            a = t("./triggers/time.js"),
            d = !1,
            h = [],
            g = {};

        function u(t) {
            "Escape" !== t.key && "Esc" !== t.key || w()
        }

        function f() {
            h.forEach(function(t) {
                return t.onResize()
            })
        }

        function m(t) {
            for (var e = t.target, i = 0; i <= 3 && e && "A" !== e.tagName; i++) e = e.parentElement;
            if (e && "A" === e.tagName && e.href) {
                var o = e.href.match(/[#&]boxzilla-(.+)/i);
                o && 1 < o.length && b(o[1])
            }
        }

        function p(t, e) {
            g[t] && g[t].forEach(function(t) {
                return t.apply(null, e)
            })
        }

        function v(t) {
            t = String(t);
            for (var e = 0; e < h.length; e++)
                if (h[e].id === t) return h[e];
            throw new Error("No box exists with ID " + t)
        }

        function w(t, e) {
            t ? v(t).dismiss(e) : h.forEach(function(t) {
                return t.dismiss(e)
            })
        }

        function b(t, e) {
            t ? v(t).toggle(e) : h.forEach(function(t) {
                return t.toggle(e)
            })
        }
        var y = {
            off: function(t, e) {
                g[t] && g[t].filter(function(t) {
                    return t !== e
                })
            },
            on: function(t, e) {
                g[t] = g[t] || [], g[t].push(e)
            },
            get: v,
            init: function() {
                if (!d) {
                    var t = document.createElement("style");
                    t.innerHTML = r, document.head.appendChild(t), s(h), c(h), l(h), a(h), document.body.addEventListener("click", m, !0), window.addEventListener("resize", n(f)), window.addEventListener("load", f), document.addEventListener("keyup", u), p("ready"), d = !0
                }
            },
            create: function(t, e) {
                void 0 !== e.minimumScreenWidth && (e.screenWidthCondition = {
                    condition: "larger",
                    value: e.minimumScreenWidth
                }), t = String(t);
                var i = new o(t, e, p);
                return h.push(i), i
            },
            trigger: p,
            show: function(t, e) {
                t ? v(t).show(e) : h.forEach(function(t) {
                    return t.show(e)
                })
            },
            hide: function(t, e) {
                t ? v(t).hide(e) : h.forEach(function(t) {
                    return t.hide(e)
                })
            },
            dismiss: w,
            toggle: b,
            boxes: h
        };
        window.Boxzilla = y, void 0 !== e && e.exports && (e.exports = y)
    }, {
        "./box.js": 3,
        "./styles.js": 5,
        "./triggers/exit-intent.js": 7,
        "./triggers/pageviews.js": 8,
        "./triggers/scroll.js": 9,
        "./triggers/time.js": 10,
        "./util.js": 11
    }],
    5: [function(t, e, i) {
        "use strict";
        e.exports = "#boxzilla-overlay,.boxzilla-overlay{position:fixed;background:rgba(0,0,0,.65);width:100%;height:100%;left:0;top:0;z-index:10000}.boxzilla-center-container{position:fixed;top:0;left:0;right:0;height:0;text-align:center;z-index:11000;line-height:0}.boxzilla-center-container .boxzilla{display:inline-block;text-align:left;position:relative;line-height:normal}.boxzilla{position:fixed;z-index:12000;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;background:#fff;padding:25px}.boxzilla.boxzilla-top-left{top:0;left:0}.boxzilla.boxzilla-top-right{top:0;right:0}.boxzilla.boxzilla-bottom-left{bottom:0;left:0}.boxzilla.boxzilla-bottom-right{bottom:0;right:0}.boxzilla-content>:first-child{margin-top:0;padding-top:0}.boxzilla-content>:last-child{margin-bottom:0;padding-bottom:0}.boxzilla-close-icon{position:absolute;right:0;top:0;text-align:center;padding:6px;cursor:pointer;-webkit-appearance:none;font-size:28px;font-weight:700;line-height:20px;color:#000;opacity:.5}.boxzilla-close-icon:focus,.boxzilla-close-icon:hover{opacity:.8}"
    }, {}],
    6: [function(t, e, i) {
        "use strict";

        function o() {
            this.time = 0, this.interval = 0
        }
        o.prototype.tick = function() {
            this.time++
        }, o.prototype.start = function() {
            this.interval || (this.interval = window.setInterval(this.tick.bind(this), 1e3))
        }, o.prototype.stop = function() {
            this.interval && (window.clearInterval(this.interval), this.interval = 0)
        }, e.exports = o
    }, {}],
    7: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = null,
                i = {};

            function o() {
                document.documentElement.removeEventListener("mouseleave", s), document.documentElement.removeEventListener("mouseenter", r), document.documentElement.removeEventListener("click", n), window.removeEventListener("touchstart", l), window.removeEventListener("touchend", c), t.forEach(function(t) {
                    t.mayAutoShow() && "exit_intent" === t.config.trigger.method && t.trigger()
                })
            }

            function n() {
                null !== e && (window.clearTimeout(e), e = null)
            }

            function r() {
                n()
            }

            function s(t) {
                n(), t.clientY <= (document.documentMode || /Edge\//.test(navigator.userAgent) ? 5 : 0) && t.clientX < .8 * window.innerWidth && (e = window.setTimeout(o, 600))
            }

            function l() {
                n(), i = {
                    timestamp: performance.now(),
                    scrollY: window.scrollY,
                    windowHeight: window.innerHeight
                }
            }

            function c(t) {
                n(), window.innerHeight > i.windowHeight || window.scrollY + 20 > i.scrollY || 300 < performance.now() - i.timestamp || -1 < ["A", "INPUT", "BUTTON"].indexOf(t.target.tagName) || (e = window.setTimeout(o, 800))
            }
            window.addEventListener("touchstart", l), window.addEventListener("touchend", c), document.documentElement.addEventListener("mouseenter", r), document.documentElement.addEventListener("mouseleave", s), document.documentElement.addEventListener("click", n)
        }
    }, {}],
    8: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e;
            try {
                e = sessionStorage.getItem("boxzilla_pageviews") || 0, sessionStorage.setItem("boxzilla_pageviews", ++e)
            } catch (t) {
                e = 0
            }
            window.setTimeout(function() {
                t.forEach(function(t) {
                    "pageviews" === t.config.trigger.method && e > t.config.trigger.value && t.mayAutoShow() && t.trigger()
                })
            }, 1e3)
        }
    }, {}],
    9: [function(t, e, i) {
        "use strict";
        var o = t("../util.js").throttle;
        e.exports = function(t) {
            function e() {
                var e = window.hasOwnProperty("pageYOffset") ? window.pageYOffset : window.scrollTop;
                e += .9 * window.innerHeight, t.forEach(function(t) {
                    !t.mayAutoShow() || t.triggerHeight <= 0 || (e > t.triggerHeight ? t.trigger() : t.mayRehide() && e < t.triggerHeight - 5 && t.hide())
                })
            }
            window.addEventListener("touchstart", o(e), !0), window.addEventListener("scroll", o(e), !0)
        }
    }, {
        "../util.js": 11
    }],
    10: [function(t, e, i) {
        "use strict";
        var r = t("../timer.js");
        e.exports = function(t) {
            var e = new r,
                i = new r,
                o = function() {
                    try {
                        var t = parseInt(sessionStorage.getItem("boxzilla_timer"));
                        t && (e.time = t)
                    } catch (t) {}
                    e.start(), i.start()
                },
                n = function() {
                    sessionStorage.setItem("boxzilla_timer", e.time), e.stop(), i.stop()
                };
            o(), document.addEventListener("visibilitychange", function() {
                document.hidden ? n() : o()
            }), window.addEventListener("beforeunload", function() {
                n()
            }), window.setInterval(function() {
                t.forEach(function(t) {
                    "time_on_site" === t.config.trigger.method && e.time > t.config.trigger.value && t.mayAutoShow() ? t.trigger() : "time_on_page" === t.config.trigger.method && i.time > t.config.trigger.value && t.mayAutoShow() && t.trigger()
                })
            }, 1e3)
        }
    }, {
        "../timer.js": 6
    }],
    11: [function(t, e, i) {
        "use strict";
        e.exports = {
            throttle: function(o, n, r) {
                var s, l;
                return n = n || 800,
                    function() {
                        var t = r || this,
                            e = +new Date,
                            i = arguments;
                        s && e < s + n ? (clearTimeout(l), l = setTimeout(function() {
                            s = e, o.apply(t, i)
                        }, n)) : (s = e, o.apply(t, i))
                    }
            }
        }
    }, {}]
}, {}, [1]);;
/*! This file is auto-generated */
! function(c, d) {
    "use strict";
    var e = !1,
        n = !1;
    if (d.querySelector)
        if (c.addEventListener) e = !0;
    if (c.wp = c.wp || {}, !c.wp.receiveEmbedMessage)
        if (c.wp.receiveEmbedMessage = function(e) {
                var t = e.data;
                if (t)
                    if (t.secret || t.message || t.value)
                        if (!/[^a-zA-Z0-9]/.test(t.secret)) {
                            for (var r, a, i, s = d.querySelectorAll('iframe[data-secret="' + t.secret + '"]'), n = d.querySelectorAll('blockquote[data-secret="' + t.secret + '"]'), o = 0; o < n.length; o++) n[o].style.display = "none";
                            for (o = 0; o < s.length; o++)
                                if (r = s[o], e.source === r.contentWindow) {
                                    if (r.removeAttribute("style"), "height" === t.message) {
                                        if (1e3 < (i = parseInt(t.value, 10))) i = 1e3;
                                        else if (~~i < 200) i = 200;
                                        r.height = i
                                    }
                                    if ("link" === t.message)
                                        if (a = d.createElement("a"), i = d.createElement("a"), a.href = r.getAttribute("src"), i.href = t.value, i.host === a.host)
                                            if (d.activeElement === r) c.top.location.href = t.value
                                }
                        }
            }, e) c.addEventListener("message", c.wp.receiveEmbedMessage, !1), d.addEventListener("DOMContentLoaded", t, !1), c.addEventListener("load", t, !1);

    function t() {
        if (!n) {
            n = !0;
            for (var e, t, r = -1 !== navigator.appVersion.indexOf("MSIE 10"), a = !!navigator.userAgent.match(/Trident.*rv:11\./), i = d.querySelectorAll("iframe.wp-embedded-content"), s = 0; s < i.length; s++) {
                if (!(e = i[s]).getAttribute("data-secret")) t = Math.random().toString(36).substr(2, 10), e.src += "#?secret=" + t, e.setAttribute("data-secret", t);
                if (r || a)(t = e.cloneNode(!0)).removeAttribute("security"), e.parentNode.replaceChild(t, e)
            }
        }
    }
}(window, document);