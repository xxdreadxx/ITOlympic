!function (o) {
    o(document).on("ready", function () {
        o(document).on("click", ".side-menu-wrap .side-menu-ul .sidenav__item .menu-plus-icon",
            function () {
                return o(this).closest(".sidenav__item").siblings().removeClass("active").find(".side-sub-menu").slideUp(200),
                    o(this).closest(".sidenav__item").toggleClass("active").find(".side-sub-menu").slideToggle(200),
                    !1
            });
        var e = o("#scroll-top"),
            i = document.querySelector(".header-menu-content"),
            t = i.offsetTop; 
                o(document).on("click", "#scroll-top", function () {
                    o("html, body").animate({ scrollTop: 0 }, 1e3)
                }),
                o(document).on("click", ".header-category ul li .dropdown-menu-item > li",
                    function () {
                        return o(this).closest("li").siblings().removeClass("active").find(".sub-menu").slideUp(200),
                            o(this).closest("li").toggleClass("active").find(".sub-menu").slideToggle(200),
                            !1
                    }),
                o(document).on("click", ".logo-right-button .side-menu-open", function () {
                    o(".side-nav-container").addClass("active")
                }),
                o(document).on("click", ".humburger-menu .side-menu-close", function () {
                    o(".side-nav-container").removeClass("active")
                }),
                o(".homepage-slide1").owlCarousel({
                    items: 1,
                    nav: !0,
                    dots: !0,
                    autoplay: !1,
                    loop: !0,
                    smartSpeed: 5e3,
                    animateOut: "lightSpeedOut",
                    animateIn: "fadeIn",
                    active: !0,
                    navText: ["<i class='la la-angle-left'></i>", "<i class='la la-angle-right'></i>"]
                }),
                o(".homepage-slide1").on("translate.owl.carousel",
                    function () {
                        o(".single-slide-item .slider__title, .single-slide-item .slider__text").removeClass("animated fadeInUp").css("opacity", "0"),
                            o(".single-slide-item .theme-btn, .single-slide-item .video-play-btn").removeClass("animated fadeInDown").css("opacity", "0")
                    }),
                o(".homepage-slide1").on("translated.owl.carousel", function () {
                    o(".single-slide-item .slider__title, .single-slide-item .slider__text").addClass("animated fadeInUp").css("opacity", "1"),
                        o(".single-slide-item .theme-btn, .single-slide-item .video-play-btn").addClass("animated fadeInDown").css("opacity", "1")
                }),
                o(".course-carousel").owlCarousel({
                    loop: !0,
                    items: 3,
                    nav: !0,
                    dots: !1,
                    smartSpeed: 500,
                    autoplay: !1,
                    margin: 30,
                    navText: ["<i class='la la-angle-left'></i>", "<i class='la la-angle-right'></i>"],
                    responsive: {
                        320: {
                            items: 1
                        },
                        992: {
                            items: 3
                        }
                    }
                }),
                o(".view-more-carousel").owlCarousel({
                    loop: !0,
                    items: 2,
                    nav: !1,
                    dots: !0,
                    smartSpeed: 500,
                    autoplay: !1,
                    margin: 15, responsive: {
                        320: { items: 1 },
                        768: { items: 2 }
                    }
                }),
                o(".counter").counterUp({
                    delay: 20, time: 2e3
                }),
                o(".video-play-btn").magnificPopup({
                    type: "video"
                }),
                o(".testimonial-wrap").owlCarousel({
                    loop: !0,
                    items: 5,
                    nav: !1,
                    dots: !0,
                    smartSpeed: 500,
                    autoplay: !1,
                    margin: 30,
                    autoHeight: !0,
                    responsive: {
                        320: {
                            items: 1
                        },
                        767: {
                            items: 2
                        },
                        992: {
                            items: 3
                        },
                        1025: {
                            items: 4
                        },
                        1440: {
                            items: 5
                        }
                    }
                }),
                o(".client-logo").owlCarousel({
                    loop: !0,
                    items: 5,
                    nav: !1,
                    dots: !1,
                    smartSpeed: 500,
                    autoplay: !1,
                    responsive: {
                        0: {
                            items: 2
                        },
                        481: {
                            items: 3
                        },
                        768: {
                            items: 4
                        },
                        992: {
                            items: 5
                        }
                    }
                }),
                o(".blog-post-carousel").owlCarousel({
                    loop: !0,
                    items: 3,
                    nav: !1,
                    dots: !0,
                    smartSpeed: 500,
                    autoplay: !1,
                    margin: 30,
                    responsive: {
                        320: {
                            items: 1
                        },
                        992: {
                            items: 3
                        }
                    }
                }),
                o('[data-toggle="tooltip"]').tooltip(),
                o(document).on("click", ".faq-heading", function () {
                    return o(this).closest(".faq-panel").siblings().removeClass("active").find(".faq-content").slideUp(200),
                        o(this).closest(".faq-panel").toggleClass("active").find(".faq-content").slideToggle(200),
                        !1
                }),
                o(document).on("click", ".portfolio-filter li", function () {
                    var e = o(this).attr("data-filter"); o(".portfolio-list").isotope({
                        filter: e
                    }),
                        o(".portfolio-filter li").removeClass("active"),
                        o(this).addClass("active")
                }),
                o(".portfolio-list").isotope({
                    itemSelector: ".single-portfolio-item",
                    percentPosition: !0,
                    masonry: {
                        columnWidth: ".single-portfolio-item",
                        horizontalOrder: !0
                    }
                }),
                o("[data-fancybox]").fancybox({
                    buttons: ["zoom", "share", "slideShow", "fullScreen", "download", "thumbs", "close"]
                }),
                o.fancybox.defaults.animationEffect = "zoom", o("#map").length && initMap("map", 40.717499, -74.044113, "images/map-marker.png")
    })
}(jQuery);