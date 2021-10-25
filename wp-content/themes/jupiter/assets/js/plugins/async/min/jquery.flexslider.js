! function($) {
    $.flexslider = function(el, options) {
        var slider = $(el);
        slider.vars = $.extend({}, $.flexslider.defaults, options);
        var namespace = slider.vars.namespace,
            msGesture = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            touch = ("ontouchstart" in window || msGesture || window.DocumentTouch && document instanceof DocumentTouch) && slider.vars.touch,
            eventType = "click touchend MSPointerUp",
            watchedEvent = "",
            watchedEventClearTimer, vertical = "vertical" === slider.vars.direction,
            reverse = slider.vars.reverse,
            carousel = slider.vars.itemWidth > 0,
            fade = "fade" === slider.vars.animation,
            asNav = "" !== slider.vars.asNavFor,
            methods = {},
            focused = !0;
        $.data(el, "flexslider", slider), methods = {
            init: function() {
                slider.animating = !1, slider.currentSlide = parseInt(slider.vars.startAt ? slider.vars.startAt : 0, 10), isNaN(slider.currentSlide) && (slider.currentSlide = 0), slider.animatingTo = slider.currentSlide, slider.atEnd = 0 === slider.currentSlide || slider.currentSlide === slider.last, slider.containerSelector = slider.vars.selector.substr(0, slider.vars.selector.search(" ")), slider.slides = $(slider.vars.selector, slider), slider.container = $(slider.containerSelector, slider), slider.count = slider.slides.length, slider.syncExists = $(slider.vars.sync).length > 0, "slide" === slider.vars.animation && (slider.vars.animation = "swing"), slider.prop = vertical ? "top" : "marginLeft", slider.args = {}, slider.manualPause = !1, slider.stopped = !1, slider.started = !1, slider.startTimeout = null, slider.transitions = !slider.vars.video && !fade && slider.vars.useCSS && function() {
                    var obj = document.createElement("div"),
                        props = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (var i in props)
                        if (void 0 !== obj.style[props[i]]) return slider.pfx = props[i].replace("Perspective", "").toLowerCase(), slider.prop = "-" + slider.pfx + "-transform", !0;
                    return !1
                }(), "" !== slider.vars.controlsContainer && (slider.controlsContainer = $(slider.vars.controlsContainer).length > 0 && $(slider.vars.controlsContainer)), "" !== slider.vars.manualControls && (slider.manualControls = $(slider.vars.manualControls).length > 0 && $(slider.vars.manualControls)), slider.vars.randomize && (slider.slides.sort(function() {
                    return Math.round(Math.random()) - .5
                }), slider.container.empty().append(slider.slides)), slider.doMath(), slider.setup("init"), slider.vars.controlNav && methods.controlNav.setup(), slider.vars.directionNav && methods.directionNav.setup(), slider.vars.keyboard && (1 === $(slider.containerSelector).length || slider.vars.multipleKeyboard) && $(document).bind("keyup", function(event) {
                    var keycode = event.keyCode;
                    if (!slider.animating && (39 === keycode || 37 === keycode)) {
                        var target = 39 === keycode ? slider.getTarget("next") : 37 === keycode && slider.getTarget("prev");
                        slider.flexAnimate(target, slider.vars.pauseOnAction)
                    }
                }), slider.vars.mousewheel && slider.bind("mousewheel", function(event, delta, deltaX, deltaY) {
                    event.preventDefault();
                    var target = delta < 0 ? slider.getTarget("next") : slider.getTarget("prev");
                    slider.flexAnimate(target, slider.vars.pauseOnAction)
                }), slider.vars.pausePlay && methods.pausePlay.setup(), slider.vars.slideshow && slider.vars.pauseInvisible && methods.pauseInvisible.init(), slider.vars.slideshow && (slider.vars.pauseOnHover && slider.hover(function() {
                    slider.manualPlay || slider.manualPause || slider.pause()
                }, function() {
                    slider.manualPause || slider.manualPlay || slider.stopped || slider.play()
                }), slider.vars.pauseInvisible && methods.pauseInvisible.isHidden() || (slider.vars.initDelay > 0 ? slider.startTimeout = setTimeout(slider.play, slider.vars.initDelay) : slider.play())), asNav && methods.asNav.setup(), touch && slider.vars.touch && methods.touch(), (!fade || fade && slider.vars.smoothHeight) && $(window).bind("resize orientationchange focus", methods.resize), slider.find("img").attr("draggable", "false"), setTimeout(function() {
                    slider.vars.start(slider)
                }, 200)
            },
            asNav: {
                setup: function() {
                    slider.asNav = !0, slider.animatingTo = Math.floor(slider.currentSlide / slider.move), slider.currentItem = slider.currentSlide, slider.slides.removeClass(namespace + "active-slide").eq(slider.currentItem).addClass(namespace + "active-slide"), msGesture ? (el._slider = slider, slider.slides.each(function() {
                        var that = this;
                        that._gesture = new MSGesture, that._gesture.target = that, that.addEventListener("MSPointerDown", function(e) {
                            e.preventDefault(), e.currentTarget._gesture && e.currentTarget._gesture.addPointer(e.pointerId)
                        }, !1), that.addEventListener("MSGestureTap", function(e) {
                            e.preventDefault();
                            var $slide = $(this),
                                target = $slide.index();
                            $(slider.vars.asNavFor).data("flexslider").animating || $slide.hasClass("active") || (slider.direction = slider.currentItem < target ? "next" : "prev", slider.flexAnimate(target, slider.vars.pauseOnAction, !1, !0, !0))
                        })
                    })) : slider.slides.on(eventType, function(e) {
                        e.preventDefault();
                        var $slide = $(this),
                            target = $slide.index();
                        $slide.offset().left - $(slider).scrollLeft() <= 0 && $slide.hasClass(namespace + "active-slide") ? slider.flexAnimate(slider.getTarget("prev"), !0) : $(slider.vars.asNavFor).data("flexslider").animating || $slide.hasClass(namespace + "active-slide") || (slider.direction = slider.currentItem < target ? "next" : "prev", slider.flexAnimate(target, slider.vars.pauseOnAction, !1, !0, !0))
                    })
                }
            },
            controlNav: {
                setup: function() {
                    slider.manualControls ? methods.controlNav.setupManual() : methods.controlNav.setupPaging()
                },
                setupPaging: function() {
                    var type = "thumbnails" === slider.vars.controlNav ? "control-thumbs" : "control-paging",
                        j = 1,
                        item, slide;
                    if (slider.controlNavScaffold = $('<ol class="' + namespace + "control-nav " + namespace + type + '"></ol>'), slider.pagingCount > 1)
                        for (var i = 0; i < slider.pagingCount; i++) {
                            if (slide = slider.slides.eq(i), item = "thumbnails" === slider.vars.controlNav ? '<img src="' + slider.slides.eq(i).attr("data-thumb") + '"/>' : '<a><svg class="mk-svg-icon" data-name="mk-icon-circle" data-cacheid="icon-575980971ec3f" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1536 1792"><path d="M1536 896q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path></svg></a>', "thumbnails" === slider.vars.controlNav && !0 === slider.vars.thumbCaptions) {
                                var captn = slide.attr("data-thumbcaption");
                                "" != captn && void 0 != captn && (item += '<span class="' + namespace + 'caption">' + captn + "</span>")
                            }
                            slider.controlNavScaffold.append("<li>" + item + "</li>"), j++
                        }
                    slider.controlsContainer ? $(slider.controlsContainer).append(slider.controlNavScaffold) : slider.append(slider.controlNavScaffold), methods.controlNav.set(), methods.controlNav.active(), slider.controlNavScaffold.delegate("a, img", eventType, function(event) {
                        if (event.preventDefault(), "" === watchedEvent || watchedEvent === event.type) {
                            var $this = $(this),
                                target = slider.controlNav.index($this);
                            $this.hasClass(namespace + "active") || (slider.direction = target > slider.currentSlide ? "next" : "prev", slider.flexAnimate(target, slider.vars.pauseOnAction))
                        }
                        "" === watchedEvent && (watchedEvent = event.type), methods.setToClearWatchedEvent()
                    })
                },
                setupManual: function() {
                    slider.controlNav = slider.manualControls, methods.controlNav.active(), slider.controlNav.bind(eventType, function(event) {
                        if (event.preventDefault(), "" === watchedEvent || watchedEvent === event.type) {
                            var $this = $(this),
                                target = slider.controlNav.index($this);
                            $this.hasClass(namespace + "active") || (target > slider.currentSlide ? slider.direction = "next" : slider.direction = "prev", slider.flexAnimate(target, slider.vars.pauseOnAction))
                        }
                        "" === watchedEvent && (watchedEvent = event.type), methods.setToClearWatchedEvent()
                    })
                },
                set: function() {
                    var selector = "thumbnails" === slider.vars.controlNav ? "img" : "a";
                    slider.controlNav = $("." + namespace + "control-nav li " + selector, slider.controlsContainer ? slider.controlsContainer : slider)
                },
                active: function() {
                    slider.controlNav.removeClass(namespace + "active").eq(slider.animatingTo).addClass(namespace + "active")
                },
                update: function(action, pos) {
                    slider.pagingCount > 1 && "add" === action ? slider.controlNavScaffold.append($("<li><a>" + slider.count + "</a></li>")) : 1 === slider.pagingCount ? slider.controlNavScaffold.find("li").remove() : slider.controlNav.eq(pos).closest("li").remove(), methods.controlNav.set(), slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length ? slider.update(pos, action) : methods.controlNav.active()
                }
            },
            directionNav: {
                setup: function() {
                    var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li><a class="' + namespace + 'prev" href="#">' + slider.vars.directionNavArrowsLeft + slider.vars.prevText + '</a></li><li><a class="' + namespace + 'next" href="#">' + slider.vars.directionNavArrowsRight + slider.vars.nextText + "</a></li></ul>");
                    slider.controlsContainer ? ($(slider.controlsContainer).append(directionNavScaffold), slider.directionNav = $("." + namespace + "direction-nav li a", slider.controlsContainer)) : (slider.append(directionNavScaffold), slider.directionNav = $("." + namespace + "direction-nav li a", slider)), methods.directionNav.update(), slider.directionNav.bind(eventType, function(event) {
                        event.preventDefault();
                        var target;
                        "" !== watchedEvent && watchedEvent !== event.type || (target = $(this).hasClass(namespace + "next") ? slider.getTarget("next") : slider.getTarget("prev"), slider.flexAnimate(target, slider.vars.pauseOnAction)), "" === watchedEvent && (watchedEvent = event.type), methods.setToClearWatchedEvent()
                    })
                },
                update: function() {
                    var disabledClass = namespace + "disabled";
                    1 === slider.pagingCount ? slider.directionNav.addClass(disabledClass).attr("tabindex", "-1") : slider.vars.animationLoop ? slider.directionNav.removeClass(disabledClass).removeAttr("tabindex") : 0 === slider.animatingTo ? slider.directionNav.removeClass(disabledClass).filter("." + namespace + "prev").addClass(disabledClass).attr("tabindex", "-1") : slider.animatingTo === slider.last ? slider.directionNav.removeClass(disabledClass).filter("." + namespace + "next").addClass(disabledClass).attr("tabindex", "-1") : slider.directionNav.removeClass(disabledClass).removeAttr("tabindex")
                }
            },
            pausePlay: {
                setup: function() {
                    var pausePlayScaffold = $('<div class="' + namespace + 'pauseplay"><a></a></div>');
                    slider.controlsContainer ? (slider.controlsContainer.append(pausePlayScaffold), slider.pausePlay = $("." + namespace + "pauseplay a", slider.controlsContainer)) : (slider.append(pausePlayScaffold), slider.pausePlay = $("." + namespace + "pauseplay a", slider)), methods.pausePlay.update(slider.vars.slideshow ? namespace + "pause" : namespace + "play"), slider.pausePlay.bind(eventType, function(event) {
                        event.preventDefault(), "" !== watchedEvent && watchedEvent !== event.type || ($(this).hasClass(namespace + "pause") ? (slider.manualPause = !0, slider.manualPlay = !1, slider.pause()) : (slider.manualPause = !1, slider.manualPlay = !0, slider.play())), "" === watchedEvent && (watchedEvent = event.type), methods.setToClearWatchedEvent()
                    })
                },
                update: function(state) {
                    "play" === state ? slider.pausePlay.removeClass(namespace + "pause").addClass(namespace + "play").html(slider.vars.playText) : slider.pausePlay.removeClass(namespace + "play").addClass(namespace + "pause").html(slider.vars.pauseText)
                }
            },
            touch: function() {
                function onTouchStart(e) {
                    slider.animating ? e.preventDefault() : (window.navigator.msPointerEnabled || 1 === e.touches.length) && (slider.pause(), cwidth = vertical ? slider.h : slider.w, startT = Number(new Date), localX = e.touches[0].pageX, localY = e.touches[0].pageY, offset = carousel && reverse && slider.animatingTo === slider.last ? 0 : carousel && reverse ? slider.limit - (slider.itemW + slider.vars.itemMargin) * slider.move * slider.animatingTo : carousel && slider.currentSlide === slider.last ? slider.limit : carousel ? (slider.itemW + slider.vars.itemMargin) * slider.move * slider.currentSlide : reverse ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth, startX = vertical ? localY : localX, startY = vertical ? localX : localY, el.addEventListener("touchmove", onTouchMove, !1), el.addEventListener("touchend", onTouchEnd, !1))
                }

                function onTouchMove(e) {
                    localX = e.touches[0].pageX, localY = e.touches[0].pageY, dx = vertical ? startX - localY : startX - localX, scrolling = vertical ? Math.abs(dx) < Math.abs(localX - startY) : Math.abs(dx) < Math.abs(localY - startY);
                    var fxms = 500;
                    (!scrolling || Number(new Date) - startT > 500) && (e.preventDefault(), !fade && slider.transitions && (slider.vars.animationLoop || (dx /= 0 === slider.currentSlide && dx < 0 || slider.currentSlide === slider.last && dx > 0 ? Math.abs(dx) / cwidth + 2 : 1), slider.setProps(offset + dx, "setTouch")))
                }

                function onTouchEnd(e) {
                    if (el.removeEventListener("touchmove", onTouchMove, !1), slider.animatingTo === slider.currentSlide && !scrolling && null !== dx) {
                        var updateDx = reverse ? -dx : dx,
                            target = updateDx > 0 ? slider.getTarget("next") : slider.getTarget("prev");
                        slider.canAdvance(target) && (Number(new Date) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth / 2) ? slider.flexAnimate(target, slider.vars.pauseOnAction) : fade || slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, !0)
                    }
                    el.removeEventListener("touchend", onTouchEnd, !1), startX = null, startY = null, dx = null, offset = null
                }

                function onMSPointerDown(e) {
                    e.stopPropagation(), slider.animating ? e.preventDefault() : (slider.pause(), el._gesture.addPointer(e.pointerId), accDx = 0, cwidth = vertical ? slider.h : slider.w, startT = Number(new Date), offset = carousel && reverse && slider.animatingTo === slider.last ? 0 : carousel && reverse ? slider.limit - (slider.itemW + slider.vars.itemMargin) * slider.move * slider.animatingTo : carousel && slider.currentSlide === slider.last ? slider.limit : carousel ? (slider.itemW + slider.vars.itemMargin) * slider.move * slider.currentSlide : reverse ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth)
                }

                function onMSGestureChange(e) {
                    e.stopPropagation();
                    var slider = e.target._slider;
                    if (slider) {
                        var transX = -e.translationX,
                            transY = -e.translationY;
                        if (accDx += vertical ? transY : transX, dx = accDx, scrolling = vertical ? Math.abs(accDx) < Math.abs(-transX) : Math.abs(accDx) < Math.abs(-transY), e.detail === e.MSGESTURE_FLAG_INERTIA) return void setImmediate(function() {
                            el._gesture.stop()
                        });
                        (!scrolling || Number(new Date) - startT > 500) && (e.preventDefault(), !fade && slider.transitions && (slider.vars.animationLoop || (dx = accDx / (0 === slider.currentSlide && accDx < 0 || slider.currentSlide === slider.last && accDx > 0 ? Math.abs(accDx) / cwidth + 2 : 1)), slider.setProps(offset + dx, "setTouch")))
                    }
                }

                function onMSGestureEnd(e) {
                    e.stopPropagation();
                    var slider = e.target._slider;
                    if (slider) {
                        if (slider.animatingTo === slider.currentSlide && !scrolling && null !== dx) {
                            var updateDx = reverse ? -dx : dx,
                                target = updateDx > 0 ? slider.getTarget("next") : slider.getTarget("prev");
                            slider.canAdvance(target) && (Number(new Date) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth / 2) ? slider.flexAnimate(target, slider.vars.pauseOnAction) : fade || slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, !0)
                        }
                        startX = null, startY = null, dx = null, offset = null, accDx = 0
                    }
                }
                var startX, startY, offset, cwidth, dx, startT, scrolling = !1,
                    localX = 0,
                    localY = 0,
                    accDx = 0;
                msGesture ? (el.style.msTouchAction = "none", el._gesture = new MSGesture, el._gesture.target = el, el.addEventListener("MSPointerDown", onMSPointerDown, !1), el._slider = slider, el.addEventListener("MSGestureChange", onMSGestureChange, !1), el.addEventListener("MSGestureEnd", onMSGestureEnd, !1)) : el.addEventListener("touchstart", onTouchStart, !1)
            },
            resize: function() {
                !slider.animating && slider.is(":visible") && (carousel || slider.doMath(), fade ? methods.smoothHeight() : carousel ? (slider.slides.width(slider.computedW), slider.update(slider.pagingCount), slider.setProps()) : vertical ? (slider.viewport.height(slider.h), slider.setProps(slider.h, "setTotal")) : (slider.vars.smoothHeight && methods.smoothHeight(), slider.newSlides.width(slider.computedW), slider.setProps(slider.computedW, "setTotal")))
            },
            smoothHeight: function(dur) {
                if (!vertical || fade) {
                    var $obj = fade ? slider : slider.viewport;
                    dur ? $obj.animate({
                        height: slider.slides.eq(slider.animatingTo).height()
                    }, dur) : $obj.height(slider.slides.eq(slider.animatingTo).height())
                }
            },
            sync: function(action) {
                var $obj = $(slider.vars.sync).data("flexslider"),
                    target = slider.animatingTo;
                switch (action) {
                    case "animate":
                        $obj.flexAnimate(target, slider.vars.pauseOnAction, !1, !0);
                        break;
                    case "play":
                        $obj.playing || $obj.asNav || $obj.play();
                        break;
                    case "pause":
                        $obj.pause()
                }
            },
            uniqueID: function($clone) {
                return $clone.find("[id]").each(function() {
                    var $this = $(this);
                    $this.attr("id", $this.attr("id") + "_clone")
                }), $clone
            },
            pauseInvisible: {
                visProp: null,
                init: function() {
                    var prefixes = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document) return "hidden";
                    for (var i = 0; i < prefixes.length; i++) prefixes[i] + "Hidden" in document && (methods.pauseInvisible.visProp = prefixes[i] + "Hidden");
                    if (methods.pauseInvisible.visProp) {
                        var evtname = methods.pauseInvisible.visProp.replace(/[H|h]idden/, "") + "visibilitychange";
                        document.addEventListener(evtname, function() {
                            methods.pauseInvisible.isHidden() ? slider.startTimeout ? clearTimeout(slider.startTimeout) : slider.pause() : slider.started ? slider.play() : slider.vars.initDelay > 0 ? setTimeout(slider.play, slider.vars.initDelay) : slider.play()
                        })
                    }
                },
                isHidden: function() {
                    return document[methods.pauseInvisible.visProp] || !1
                }
            },
            setToClearWatchedEvent: function() {
                clearTimeout(watchedEventClearTimer), watchedEventClearTimer = setTimeout(function() {
                    watchedEvent = ""
                }, 3e3)
            }
        }, slider.flexAnimate = function(target, pause, override, withSync, fromNav) {
            if (slider.vars.animationLoop || target === slider.currentSlide || (slider.direction = target > slider.currentSlide ? "next" : "prev"), asNav && 1 === slider.pagingCount && (slider.direction = slider.currentItem < target ? "next" : "prev"), !slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
                if (asNav && withSync) {
                    var master = $(slider.vars.asNavFor).data("flexslider");
                    if (slider.atEnd = 0 === target || target === slider.count - 1, master.flexAnimate(target, !0, !1, !0, fromNav), slider.direction = slider.currentItem < target ? "next" : "prev", master.direction = slider.direction, Math.ceil((target + 1) / slider.visible) - 1 === slider.currentSlide || 0 === target) return slider.currentItem = target, slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide"), !1;
                    slider.currentItem = target, slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide"), target = Math.floor(target / slider.visible)
                }
                if (slider.animating = !0, slider.animatingTo = target, pause && slider.pause(), slider.vars.before(slider), slider.syncExists && !fromNav && methods.sync("animate"), slider.vars.controlNav && methods.controlNav.active(), carousel || slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide"), slider.atEnd = 0 === target || target === slider.last, slider.vars.directionNav && methods.directionNav.update(), target === slider.last && (slider.vars.end(slider), slider.vars.animationLoop || slider.pause()), fade) touch ? (slider.slides.eq(slider.currentSlide).css({
                    opacity: 0,
                    zIndex: 1
                }), slider.slides.eq(target).css({
                    opacity: 1,
                    zIndex: 2
                }), slider.wrapup(dimension)) : (slider.slides.eq(slider.currentSlide).css({
                    zIndex: 1
                }).animate({
                    opacity: 0
                }, slider.vars.animationSpeed, slider.vars.easing), slider.slides.eq(target).css({
                    zIndex: 2
                }).animate({
                    opacity: 1
                }, slider.vars.animationSpeed, slider.vars.easing, slider.wrapup));
                else {
                    var dimension = vertical ? slider.slides.filter(":first").height() : slider.computedW,
                        margin, slideString, calcNext;
                    carousel ? (margin = slider.vars.itemMargin, calcNext = (slider.itemW + margin) * slider.move * slider.animatingTo, slideString = calcNext > slider.limit && 1 !== slider.visible ? slider.limit : calcNext) : slideString = 0 === slider.currentSlide && target === slider.count - 1 && slider.vars.animationLoop && "next" !== slider.direction ? reverse ? (slider.count + slider.cloneOffset) * dimension : 0 : slider.currentSlide === slider.last && 0 === target && slider.vars.animationLoop && "prev" !== slider.direction ? reverse ? 0 : (slider.count + 1) * dimension : reverse ? (slider.count - 1 - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension, slider.setProps(slideString, "", slider.vars.animationSpeed), slider.transitions ? (slider.vars.animationLoop && slider.atEnd || (slider.animating = !1, slider.currentSlide = slider.animatingTo), slider.container.unbind("webkitTransitionEnd transitionend"), slider.container.bind("webkitTransitionEnd transitionend", function() {
                        slider.wrapup(dimension)
                    })) : slider.container.animate(slider.args, slider.vars.animationSpeed, slider.vars.easing, function() {
                        slider.wrapup(dimension)
                    })
                }
                slider.vars.smoothHeight && methods.smoothHeight(slider.vars.animationSpeed)
            }
        }, slider.wrapup = function(dimension) {
            fade || carousel || (0 === slider.currentSlide && slider.animatingTo === slider.last && slider.vars.animationLoop ? slider.setProps(dimension, "jumpEnd") : slider.currentSlide === slider.last && 0 === slider.animatingTo && slider.vars.animationLoop && slider.setProps(dimension, "jumpStart")), slider.animating = !1, slider.currentSlide = slider.animatingTo, slider.vars.after(slider)
        }, slider.animateSlides = function() {
            slider.animating || slider.flexAnimate(slider.getTarget("next"))
        }, slider.pause = function() {
            clearInterval(slider.animatedSlides), slider.animatedSlides = null, slider.playing = !1, slider.vars.pausePlay && methods.pausePlay.update("play"), slider.syncExists && methods.sync("pause")
        }, slider.play = function() {
            slider.playing && clearInterval(slider.animatedSlides), slider.animatedSlides = slider.animatedSlides || setInterval(slider.animateSlides, slider.vars.slideshowSpeed), slider.started = slider.playing = !0, slider.vars.pausePlay && methods.pausePlay.update("pause"), slider.syncExists && methods.sync("play")
        }, slider.stop = function() {
            slider.pause(), slider.stopped = !0
        }, slider.canAdvance = function(target, fromNav) {
            var last = asNav ? slider.pagingCount - 1 : slider.last;
            return !!fromNav || (!(!asNav || slider.currentItem !== slider.count - 1 || 0 !== target || "prev" !== slider.direction) || (!asNav || 0 !== slider.currentItem || target !== slider.pagingCount - 1 || "next" === slider.direction) && (!(target === slider.currentSlide && !asNav) && (!!slider.vars.animationLoop || (!slider.atEnd || 0 !== slider.currentSlide || target !== last || "next" === slider.direction) && (!slider.atEnd || slider.currentSlide !== last || 0 !== target || "next" !== slider.direction))))
        }, slider.getTarget = function(dir) {
            return slider.direction = dir, "next" === dir ? slider.currentSlide === slider.last ? 0 : slider.currentSlide + 1 : 0 === slider.currentSlide ? slider.last : slider.currentSlide - 1
        }, slider.setProps = function(pos, special, dur) {
            var target = function() {
                var posCheck = pos || (slider.itemW + slider.vars.itemMargin) * slider.move * slider.animatingTo;
                return -1 * function() {
                    if (carousel) return "setTouch" === special ? pos : reverse && slider.animatingTo === slider.last ? 0 : reverse ? slider.limit - (slider.itemW + slider.vars.itemMargin) * slider.move * slider.animatingTo : slider.animatingTo === slider.last ? slider.limit : posCheck;
                    switch (special) {
                        case "setTotal":
                            return reverse ? (slider.count - 1 - slider.currentSlide + slider.cloneOffset) * pos : (slider.currentSlide + slider.cloneOffset) * pos;
                        case "setTouch":
                            return pos;
                        case "jumpEnd":
                            return reverse ? pos : slider.count * pos;
                        case "jumpStart":
                            return reverse ? slider.count * pos : pos;
                        default:
                            return pos
                    }
                }() + "px"
            }();
            slider.transitions && (target = vertical ? "translate3d(0," + target + ",0)" : "translate3d(" + target + ",0,0)", dur = void 0 !== dur ? dur / 1e3 + "s" : "0s", slider.container.css("-" + slider.pfx + "-transition-duration", dur), slider.container.css("transition-duration", dur)), slider.args[slider.prop] = target, (slider.transitions || void 0 === dur) && slider.container.css(slider.args), slider.container.css("transform", target)
        }, slider.setup = function(type) {
            if (fade) slider.slides.css({
                width: "100%",
                float: "left",
                marginRight: "-100%",
                position: "relative"
            }), "init" === type && (touch ? slider.slides.css({
                opacity: 0,
                display: "block",
                webkitTransition: "opacity " + slider.vars.animationSpeed / 1e3 + "s ease",
                zIndex: 1
            }).eq(slider.currentSlide).css({
                opacity: 1,
                zIndex: 2
            }) : slider.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(slider.currentSlide).css({
                zIndex: 2
            }).animate({
                opacity: 1
            }, slider.vars.animationSpeed, slider.vars.easing)), slider.vars.smoothHeight && methods.smoothHeight();
            else {
                var sliderOffset, arr;
                "init" === type && (slider.viewport = $('<div class="' + namespace + 'viewport"></div>').css({
                    overflow: "hidden",
                    position: "relative"
                }).appendTo(slider).append(slider.container), slider.cloneCount = 0, slider.cloneOffset = 0, reverse && (arr = $.makeArray(slider.slides).reverse(), slider.slides = $(arr), slider.container.empty().append(slider.slides))), slider.vars.animationLoop && !carousel && (slider.cloneCount = 2, slider.cloneOffset = 1, "init" !== type && slider.container.find(".clone").remove(), slider.container.append(slider.slides.first().clone().addClass("clone").attr("aria-hidden", "true")).prepend(slider.slides.last().clone().addClass("clone").attr("aria-hidden", "true")), methods.uniqueID(slider.slides.first().clone().addClass("clone")).appendTo(slider.container), methods.uniqueID(slider.slides.last().clone().addClass("clone")).prependTo(slider.container)), slider.newSlides = $(slider.vars.selector, slider), sliderOffset = reverse ? slider.count - 1 - slider.currentSlide + slider.cloneOffset : slider.currentSlide + slider.cloneOffset, vertical && !carousel ? (slider.container.height(200 * (slider.count + slider.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function() {
                    slider.newSlides.css({
                        display: "block"
                    }), slider.doMath(), slider.viewport.height(slider.h), slider.setProps(sliderOffset * slider.h, "init")
                }, "init" === type ? 100 : 0)) : (slider.container.width(200 * (slider.count + slider.cloneCount) + "%"), slider.setProps(sliderOffset * slider.computedW, "init"), setTimeout(function() {
                    slider.doMath(), slider.newSlides.css({
                        width: slider.computedW,
                        float: "left",
                        display: "block"
                    }), slider.vars.smoothHeight && methods.smoothHeight()
                }, "init" === type ? 100 : 0))
            }
            carousel || slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide"), slider.vars.init(slider)
        }, slider.doMath = function() {
            var slide = slider.slides.first(),
                slideMargin = slider.vars.itemMargin,
                minItems = slider.vars.minItems,
                maxItems = slider.vars.maxItems;
            slider.w = void 0 === slider.viewport ? slider.width() : slider.viewport.width(), slider.h = slide.height(), slider.boxPadding = slide.outerWidth() - slide.width(), carousel ? (slider.itemT = slider.vars.itemWidth + slideMargin, slider.minW = minItems ? minItems * slider.itemT : slider.w, slider.maxW = maxItems ? maxItems * slider.itemT - slideMargin : slider.w, slider.itemW = slider.minW > slider.w ? (slider.w - slideMargin * (minItems - 1)) / minItems : slider.maxW < slider.w ? (slider.w - slideMargin * (maxItems - 1)) / maxItems : slider.vars.itemWidth > slider.w ? slider.w : slider.vars.itemWidth, slider.visible = Math.floor(slider.w / slider.itemW), slider.move = slider.vars.move > 0 && slider.vars.move < slider.visible ? slider.vars.move : slider.visible, slider.pagingCount = Math.ceil((slider.count - slider.visible) / slider.move + 1), slider.last = slider.pagingCount - 1, slider.limit = 1 === slider.pagingCount ? 0 : slider.vars.itemWidth > slider.w ? slider.itemW * (slider.count - 1) + slideMargin * (slider.count - 1) : (slider.itemW + slideMargin) * slider.count - slider.w - slideMargin) : (slider.itemW = slider.w, slider.pagingCount = slider.count, slider.last = slider.count - 1), slider.computedW = slider.itemW - slider.boxPadding
        }, slider.update = function(pos, action) {
            slider.doMath(), carousel || (pos < slider.currentSlide ? slider.currentSlide += 1 : pos <= slider.currentSlide && 0 !== pos && (slider.currentSlide -= 1), slider.animatingTo = slider.currentSlide), slider.vars.controlNav && !slider.manualControls && ("add" === action && !carousel || slider.pagingCount > slider.controlNav.length ? methods.controlNav.update("add") : ("remove" === action && !carousel || slider.pagingCount < slider.controlNav.length) && (carousel && slider.currentSlide > slider.last && (slider.currentSlide -= 1, slider.animatingTo -= 1), methods.controlNav.update("remove", slider.last))), slider.vars.directionNav && methods.directionNav.update()
        }, slider.addSlide = function(obj, pos) {
            var $obj = $(obj);
            slider.count += 1, slider.last = slider.count - 1, vertical && reverse ? void 0 !== pos ? slider.slides.eq(slider.count - pos).after($obj) : slider.container.prepend($obj) : void 0 !== pos ? slider.slides.eq(pos).before($obj) : slider.container.append($obj), slider.update(pos, "add"), slider.slides = $(slider.vars.selector + ":not(.clone)", slider), slider.setup(), slider.vars.added(slider)
        }, slider.removeSlide = function(obj) {
            var pos = isNaN(obj) ? slider.slides.index($(obj)) : obj;
            slider.count -= 1, slider.last = slider.count - 1, isNaN(obj) ? $(obj, slider.slides).remove() : vertical && reverse ? slider.slides.eq(slider.last).remove() : slider.slides.eq(obj).remove(), slider.doMath(), slider.update(pos, "remove"), slider.slides = $(slider.vars.selector + ":not(.clone)", slider), slider.setup(), slider.vars.removed(slider)
        }, methods.init()
    }, $(window).blur(function(e) {
        focused = !1
    }).focus(function(e) {
        focused = !0
    }), $.flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: !1,
        animationLoop: !0,
        smoothHeight: !0,
        startAt: 0,
        slideshow: !0,
        slideshowSpeed: 7e3,
        animationSpeed: 600,
        initDelay: 0,
        randomize: !1,
        thumbCaptions: !1,
        pauseOnAction: !0,
        pauseOnHover: !1,
        pauseInvisible: !0,
        useCSS: !0,
        touch: !0,
        video: !1,
        controlNav: !0,
        directionNav: !0,
        prevText: "Previous",
        nextText: "Next",
        directionNavArrowsLeft: '<i><svg viewBox="0 0 512 512"><path d="M368 505.6c-8 0-16-3.2-22.4-8l-240-225.6c-6.4-6.4-9.6-14.4-9.6-24 0-8 3.2-16 9.6-22.4l240-224c12.8-11.2 33.6-11.2 44.8 1.6 12.8 12.8 11.2 32-1.6 44.8l-214.4 201.6 216 203.2c12.8 11.2 12.8 32 0 44.8-4.8 4.8-14.4 8-22.4 8z"/></svg></i>',
        directionNavArrowsRight: '<i><svg viewBox="0 0 512 512"><path d="M144 505.6c8 0 16-3.2 22.4-8l240-225.6c6.4-6.4 9.6-14.4 9.6-22.4s-3.2-16-9.6-22.4l-240-224c-12.8-12.8-32-12.8-44.8 0s-11.2 32 1.6 44.8l214.4 201.6-216 203.2c-12.8 11.2-12.8 32 0 44.8 6.4 4.8 14.4 8 22.4 8z"/></svg></i>',
        keyboard: !0,
        multipleKeyboard: !1,
        mousewheel: !1,
        pausePlay: !1,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 1,
        maxItems: 0,
        move: 0,
        allowOneSlide: !0,
        start: function() {},
        before: function() {},
        after: function() {},
        end: function() {},
        added: function() {},
        removed: function() {},
        init: function() {}
    }, $.fn.flexslider = function(options) {
        if (void 0 === options && (options = {}), "object" == typeof options) return this.each(function() {
            var $this = $(this),
                selector = options.selector ? options.selector : ".slides > li",
                $slides = $this.find(selector);
            1 === $slides.length && !0 === options.allowOneSlide || 0 === $slides.length ? ($slides.fadeIn(400), options.start && options.start($this)) : void 0 === $this.data("flexslider") && new $.flexslider(this, options)
        });
        var $slider = $(this).data("flexslider");
        switch (options) {
            case "play":
                $slider.play();
                break;
            case "pause":
                $slider.pause();
                break;
            case "stop":
                $slider.stop();
                break;
            case "next":
                $slider.flexAnimate($slider.getTarget("next"), !0);
                break;
            case "prev":
            case "previous":
                $slider.flexAnimate($slider.getTarget("prev"), !0);
                break;
            default:
                "number" == typeof options && $slider.flexAnimate(options, !0)
        }
    }
}(jQuery);