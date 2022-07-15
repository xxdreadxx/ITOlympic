$('#menuhead').removeAttr('style');
$('#headermenu>ul>li').removeClass('activemenu');
$('#lichtrinh').addClass('activemenu');

$('document').ready(function () {
    $('#navLichTrinh').addClass('active');
    // Hiển thị lịch trình đầu tiên
    $('#timeline_body :first-child').show();
});
function ShowTimeline(id) {
    $('.lstA').removeClass('active');
    $('#timeline_body').children().hide();
    $('#' + id).show();
    $('#a_' + id).addClass('active');
}