$('#menuhead').removeAttr('style');
$('#headermenu>ul>li').removeClass('activemenu');
$('#lichtrinh').addClass('activemenu');

$('document').ready(function () {
    $('.nav-link').removeClass('active');
    $('#navLichTrinh').addClass('active');
    // Hiển thị lịch trình đầu tiên
    $('#timeline_body :first-child').show();

    //var firstchild = $('.submenu_1 :first-child').attr('data-id');
    ////var firstchild = $('.submenu_1 :first-child').attr('data-id');
    //$('#a_' + firstchild).addClass('active');
    //ShowTimeline(firstchild);
});
function ShowTimeline(id) {
    $('.lstA').removeClass('active');
    $('#timeline_body').children().hide();
    $('#' + id).show();
    $('#a_' + id).addClass('active');
}