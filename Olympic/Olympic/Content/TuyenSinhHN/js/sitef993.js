// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
// object homepage
var homepage = {
    /**
     * init all necessary function
     * @returns {} 
     */
    init: () => {
        //homepage.addScript();
        //homepage.addStyle();

        //var slickInterval = window.setInterval(checkSlick, 0);
        //function checkSlick() {
        //    if (typeof $.fn.slick == 'function') {
        //        homepage.makeSlideShow();
        //        window.clearInterval(slickInterval);
        //    }
        //}

    },

    /**
     * add dynamic style
     * @returns {} 
     */
    addStyle: () => {
        var head = document.getElementsByTagName('head')[0];
        var styles = [
            {
                href: '//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css',
                type: 'text/css',
                rel: 'stylesheet'
            },
            {
                href: '//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css',
                type: 'text/css',
                rel: 'stylesheet'
            }
        ];
        for (var i = 0; i < styles.length; i++) {
            var style = styles[i];
            var link = document.createElement('link');
            link.href = style.href;
            link.type = style.type;
            link.rel = style.rel;
            head.appendChild(link);
        }

    },

    /**
     * add dynamic script
     * @returns {} 
     */
    addScript: () => {
        var body = document.getElementsByTagName('body')[0];
        var scripts = [
            {
                src: '//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js'
            }
        ];
        for (var i = 0; i < scripts.length; i++) {
            var script = scripts[i];
            var homepageScript = document.createElement('script');
            homepageScript.setAttribute('src', script.src);
            body.appendChild(homepageScript);
        }

    },

    /**
     * init slides
     * @returns {} 
     */
    makeSlideShow: (slickInterval) => {
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav'
        });
        $('.slider-nav').slick({
            infinite: false,
            arrows: false,
            asNavFor: '.slider-for',
            slidesToShow: 4,
            slidesToScroll: 4,
            focusOnSelect: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        arrows: true,
                        centerMode: true,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                        arrows: true,
                        centerMode: true,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        arrows: true,
                        centerMode: true,
                    }
                }
            ]
        });
    }
};

var pageName = document.getElementById('pageName');
if (pageName && pageName.value) {
    switch (pageName.value) {
    case 'Homepage':
        homepage.init();
        break;
    default:
        break;
    }
}