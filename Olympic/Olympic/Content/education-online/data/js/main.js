$(document).ready(function () {
    $('.management-index .feature[data-href]').click(function () {
        window.location.href = $(this).attr('data-href');
    });
});

function storageNavigator() {
    var navContent = $('#navigator-container').html();
    localStorage.setItem('navbar', navContent);
}

function generateNavigator() {
    var html = localStorage.getItem('navbar');
    if (html != null && html != 'undefined' && html.trim().length > 0) {
        var navPrev = $('<div></div>').html(html + '<span class="vertical-separator">/</span>');
        navPrev.children('.no-event').removeClass('no-event')
        var navCurrent = $('#navigator-container');
        var firstEl = navCurrent.children().first().attr('id');
        var prevEl = navPrev.children('#' + firstEl);
        if (prevEl.length) {
            while (prevEl.next().length) {
                prevEl.next().remove();
            }
            navCurrent.children().first().remove();
        }
        navCurrent.html(navPrev.html() + navCurrent.html());
    }
}