var jsAddmissionList = {
    /** init */
    init: () => {
        //smart-city
        if ($('#smartCityPrefix').text().length) {
            $('body').addClass($('#smartCityPrefix').text());
            $('.page-wrapper').removeClass('pt-3');
        }
    }
}

$(document).ready(() => {
    jsAddmissionList.init();
});