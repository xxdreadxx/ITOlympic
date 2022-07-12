var jsWalkthrough = {
    /** init */
    init: () => {
        if (window.location.hash === '#page-ds') {
            $('#aContactNumber').click();
        }
        //smart-city
        if ($('#smartCityPrefix').text().length) {
            $('body').addClass($('#smartCityPrefix').text());
            $('.page-wrapper').removeClass('pt-3');
        }
    },
    changePage: (sender, event) => {
        if (window.innerWidth > 768) {
            event.preventDefault();
        }
        $('.page-item.active').addClass('hide').removeClass('active');
        $('.list-group-item').removeClass('active');
        $(sender.hash).addClass('active').removeClass('hide');
        $(`.list-group-item[href="${sender.hash}"]`).addClass('active');
    }
}

$(document).ready(() => {
    jsWalkthrough.init();
}); 