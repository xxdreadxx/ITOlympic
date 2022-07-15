
// Hiển thị văn bản
function viewfile(id) {
    var idNew = id;
    if (idNew == undefined) {
        idNew = 0;
    }
    $('#pdfv>ul>li>ul>li').removeClass('activeviewpdf');
    $('.lstA').removeClass('active');
    $('#' + id).addClass('active');
    $.ajax({
        url: '/Home/ViewQuyetDinh',
        data: {
            id: idNew
        },
        success: function (res) {
            if (res.status == true) {
                var i = res.filequyetdinh.FileDinhKem;
                if (i != null) {
                    document.getElementById("fileview").src = res.filequyetdinh.FileDinhKem;
                    $('#file_' + id).addClass('activeviewpdf');
                    $('#viewquyetdinh').css('display', 'block');
                }
                else {
                    $('#viewquyetdinh').css('display', 'none');
                }
            }
            else {
                $('#viewquyetdinh').css('display', 'none');
            }
        },
        error: function () {
          
        }
    })
}

$('document').ready(function () {
    $('#navThongTin').addClass('active');
    // Hiển thị văn bản đầu tiên
    var firstchild = $('#accordion li:first').attr('data-id');
    viewfile(firstchild);

    $('#' + firstchild).addClass('active');
});
