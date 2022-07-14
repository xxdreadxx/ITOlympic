$('document').ready(function () {
    $('#navDangKy').addClass('active');
    var firstchild = $('#accordion li:first').attr('data-id');
    ShowTimeline(firstchild);
});
function ShowTimeline(id) {
    $('.list-group-item').removeClass('active');
    $('#a_' + id).addClass('active');
    $('.clskithi').css('display', 'none');
    $('.clsid_' + id).css('display', 'flex');
}