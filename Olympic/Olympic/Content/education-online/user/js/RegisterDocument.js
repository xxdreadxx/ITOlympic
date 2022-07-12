function registerCourse(maKhoaHoc, e) {
    if ($.trim($("#new-nameuser").val()) == "") {
        $("#new-nameuser").addClass("errorinput")
        alertModal(template.thongbaotennguoidungkhongduocdetrong, 'error');
    }
    else if ($.trim($("#new-addressemail").val()) == "") {
        $("#new-addressemail").addClass("errorinput")
        alertModal(template.thongbaoemailkhongduocdetrong, 'error');
    }
    else if ($.inArray("@", $("#new-addressemail").val()) <= 0 || $.inArray("@", $("#new-addressemail").val()) == $("#new-addressemail").val().length - 1) {
        $("#new-addressemail").addClass("errorinput")
        alertModal(template.thongbaoemailkhongdung, 'error');
    }
    else if ($.trim($("#new-phone").val()) == "") {
        $("#new-phone").addClass("errorinput")
        alertModal(template.thongbaosodienthoaikhongduocdetrong, 'error');
    }
    else {
        $("#new-address").removeClass("errorinput")

        // check email
        $.ajax({
            url: '/AcademyTemplate/CheckEmail',
            data:
            {
                email: $("#new-addressemail").val(),
            },
            type: 'POST',
            beforeSend: function () {
                showLoadingScreen();
            },
            success: function (res) {
                if (res.status == "NOTFOUND") {
                    $("#new-addressemail").addClass("errorinput")
                    alertModal(template.thongbaoemaildangkydatontai, 'error');
                    hideLoadingScreen()
                }
                else {
                    $("#new-phone").removeClass("errorinput")

                    // check số điện thoại
                    $.ajax({
                        url: '/AcademyTemplate/CheckSoDienThoai',
                        data:
                        {
                            soDienThoai: $("#new-phone").val(),
                        },
                        type: 'POST',
                        beforeSend: function () {
                            showLoadingScreen();
                        },
                        success: function (res) {
                            if (res.status == "NOTFOUND") {
                                $("#new-phone").addClass("errorinput")
                                alertModal(template.thongbaosodienthoaidatontai, 'error');
                                hideLoadingScreen()
                            }
                            else {
                                $("#new-phone").removeClass("errorinput")
                                hideLoadingScreen()

                                var valueName = $("#new-nameuser").val();
                                var valueEmailAddress = $("#new-addressemail").val();
                                var valuePhone = $("#new-phone").val();

                                $.ajax({
                                    url: '/AcademyTemplate/GuestRegisterCourse',
                                    type: 'POST',
                                    data: {
                                        tenNguoiDung: valueName,
                                        email: valueEmailAddress,
                                        soDienThoai: valuePhone,
                                        maKhoaHoc: maKhoaHoc,
                                    },
                                    beforeSend: function () {
                                        showLoadingScreen();
                                    },
                                    success: function (res) {
                                        if (res.status == 'SUCCESS') {
                                            alertModal(template.messagesuccessguiyeucau, 'success');
                                            hideLoadingScreen();
                                            $('.item-status-content.status-nofinish-background').first().removeClass('status-nofinish-background').addClass('status-finish-background');
                                            $('.item-icon.status-nofinish-background i').first().removeClass('fa-times').addClass('fa-check');
                                            $('.item-icon.status-nofinish-background').first().parents('.item-status:first').find('.status-info span').css('color', '#3fa813')
                                            $('.item-icon.status-nofinish-background').first().removeClass('status-nofinish-background').addClass('status-finish-background');
                                            $('.item-text.status-nofinish-text').first().removeClass('status-nofinish-text').addClass('status-finish-text');
                                            //$('.status-info span').first().removeClass('status-nofinish-background').addClass('status-finish-background');
                                            $(e).removeAttr('onclick');
                                            hideLoadingScreen()
                                        }
                                        else {
                                            hideLoadingScreen()
                                            alertModal(template.coloixayra, 'error');
                                        }
                                    },
                                    error: function () {
                                        hideLoadingScreen()
                                        alertModal(template.coloixayra, 'error');
                                    }
                                });
                                $("#new-nameuser").val('');
                                $("#new-addressemail").val('');
                                $("#new-phone").val('');
                            }
                        },
                        error: function (res) {
                            hideLoadingScreen()
                            alertModal(template.coloixayra, 'error');
                        }
                    })
                }
            },
            error: function (res) {
                hideLoadingScreen()
            }
        })
    }
}
//Xử lí khi người dùng nhập số vào input
function isNumberKey(evt, e) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode == 8)
        return true;
    if ((charCode >= 48 && charCode <= 57) || (charCode >= 96 && charCode <= 105) || charCode == 37 || charCode == 39)
        return true;
    else return false
}

$("#new-nameuser").keyup(function () {
    if ($(this).hasClass('errorinput')) {
        $(this).removeClass('errorinput')
    }
});
$("#new-addressemail").keyup(function () {
    if ($(this).hasClass('errorinput')) {
        $(this).removeClass('errorinput')
    }
});