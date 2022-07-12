$(document).ready(function () {
    $('.clsLogin js-example-basic-single').select2();
    $('#cbSo').select2();
    $('#cbPhong').select2();
    $('#cbCap').select2();
    var errorLoginCount = getCookie('loginErrorTime');
    errorLoginCount = errorLoginCount ? parseInt(errorLoginCount) : 0;
    if (errorLoginCount >= 3) {
        $('#captchaKey').removeClass('hide');
    }
    $(".toggle-password").click(function () {

        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $('#ipPassword');
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });
    // Lưu cache đăng nhập
    //Thông tin trường
    var val = JSON.parse(localStorage.getItem('unitCurrent'));
    if (val != null && val != undefined) {
        $('#cbSchoolName').val(val);
        $('#cbSchoolName').trigger('change');
        //$('#cbSchoolName').select2('destroy');
    }
    //Thông tin tỉnh/ thành phố
    //var valTinh = JSON.parse(localStorage.getItem('idTinhCurrent'));
    //if (valTinh != null && valTinh != undefined) {
    //    $('#cbSo').val(valTinh);
    //    //$('#cbSo').trigger('change');
    //}
    ////Thông tin quận/ huyện
    //var valQuan = JSON.parse(localStorage.getItem('idQuanCurrent'));
    //if (valQuan != null && valQuan != undefined) {
    //    $('#cbPhong').val(valQuan);
    //    //$('#cbPhong').trigger('change');
    //}
    ////Thông tin cấp học
    //var valCap = JSON.parse(localStorage.getItem('capHocCurrent'));
    //if (valCap != null && valCap != undefined) {
    //    $('#cbCap').val(valCap);
    //    //$('#cbCap').trigger('change');
    //}

    $('#cbSchoolName').select2();

    $('#btnLogin').click(function () {
        var unitchoose = $('#cbSchoolName').val();
        var idtinh = parseInt($('#cbSo').val());
        var idquanhuyen = parseInt($('#cbPhong').val());
        var cap = parseInt($('#cbCap').val());

        //var nameSchool = $('#cbSchoolName option:selected').text();
        if (unitchoose == 0 || unitchoose == null || unitchoose == undefined) {
            $('#errorChooseSchool').show();
            $('#formLogin').hide();
        } else {
            localStorage.setItem('unitCurrent', JSON.stringify(unitchoose));
            localStorage.setItem('idTinhCurrent', JSON.stringify(idtinh));
            localStorage.setItem('idQuanCurrent', JSON.stringify(idquanhuyen));
            localStorage.setItem('capHocCurrent', JSON.stringify(cap));
            //$('#titleIndex').html('CHÀO MỪNG ĐẾN VỚI <br/>' + nameSchool.toUpperCase());

            showLoadingScreen();
            $('#login-dialog .error-message').text('').hide();
            var count = getCookie('loginErrorTime');
            count = count ? parseInt(count) : 0;
            var capt = '';
            if (count >= 3) {
                capt = grecaptcha.getResponse();
            }
            if (count < 3 || !isNullOrEmpty(capt)) {
                $.post('/Account/UserLogin',
                    {
                        'username': $('input[name=UserName]').val().trim(),
                        'password': $('input[name=Password]').val(),
                        'remember': $('input[name=Remember]').prop('checked'),
                        'madonvisudung': $('#cbSchoolName').val(),
                        'tendonvisudung': $('#cbSchoolName option:selected').text()
                    },
                    function (rs) {
                        if (rs == 'ERROR') {
                            $('#login-dialog .error-message').text('Tài khoản hoặc mật khẩu không chính xác').show();
                            if (count >= 2) {
                                $('#captchaKey').removeClass('hide');
                            }
                            setCookie('loginErrorTime', count + 1, 1, '/account/login');
                            hideLoadingScreen();
                        } else if (rs == 'BRANCHERROR') {
                            $('#login-dialog .error-message').text('Đăng nhập vị từ chối. Vui lòng đăng nhập đúng chi nhánh').show();
                            hideLoadingScreen();
                        } else if (rs == 'INACTIVE') {
                            $('#login-dialog .error-message').text('Tài khoản chưa được kích hoạt').show();
                            hideLoadingScreen();
                        } else if (rs == 'DUPLICATE') {
                            $('#login-dialog .error-message').text('Tài khoản đang đăng nhập tại máy khác').show();
                            hideLoadingScreen();
                        } else if (rs == 'LOGGEDIN') {
                            setCookie('loginErrorTime', 0, -1, '/account/login');
                            window.location.reload();
                            hideLoadingScreen();
                        }
                        else {
                            setCookie('loginErrorTime', 0, -1, '/account/login');
                            var userId = rs.substr(0, rs.indexOf('::'));
                            var role = rs.replace(userId + '::', '');

                            var returnUrl = '/' //trả về trang ngoài
                            window.location.href = returnUrl != '' ? returnUrl : (role == 'administrator' || role == 'instructor' || role == 'learner' ? '/?role=' + role : '/');
                        }
                    });
                grecaptcha.reset();
            }
            $('#errorChooseSchool').hide();
            $('#formLogin').show();
        }
    });

    $('#login-dialog').keydown(function (event) {
        if (event.keyCode == 13) {
            $('#btnLogin').trigger('click');
        }
    });
});


$(function () {
    $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
    });
});

function ChooseUnit() {
    var unitchoose = $('#cbSchoolName').val();
    var nameSchool = $('#cbSchoolName option:selected').text();
    if (unitchoose == 0) {
        $('#errorChooseSchool').show();
        $('#formLogin').hide();
        $('#formChooseUnit').show();
    } else {
        localStorage.setItem('unitCurrent', JSON.stringify(unitchoose));
        $('#titleIndex').html('CHÀO MỪNG ĐẾN VỚI <br/>' + nameSchool.toUpperCase());
        $('#errorChooseSchool').hide();
        $('#formLogin').show();
        $('#formChooseUnit').hide();
    }
}
function QuayLai() {
    $('#formLogin').hide();
    $('#formChooseUnit').show();
}
$('#cbSchoolName').change(function () {
    $('#errorChooseSchool').hide();
})
// Lấy phòng giáo dục
function LayDanhSach_Phong() {
    //Khi thực hiện chọn sở giáo dục, hệ thống sẽ lấy danh sách các phòng tương ứng của sở
    //ĐỒNG THỜI hiển thị thông tin của sở vào combobox trường

    var id = $('#cbSo').val();
    $.ajax({
        url: '/HomeTuyenSinh/GetThanhPho',
        type: 'GET',
        data: {
            id,
            type: 2
        },
        success: function (res) {
            var html = '<option value = "0" selected>CHỌN PHÒNG GIÁO DỤC</option>'
            if (res.status && (res.lstdanhsach != null)) {
                $.each(res.lstdanhsach, function (i, item) {
                    html += '<option value = "' + item.ID + '">' + item.TenDiaChi + '</option>'
                })
            }
            $('#cbPhong').html(html);
            LayDanhSach_Truong();
        }
    })
}
// Lấy trường
function LayDanhSach_Truong() {
    $('#cbSchoolName').select2("val", "");
    var idtinh = parseInt($('#cbSo').val());
    var idquanhuyen = parseInt($('#cbPhong').val());
    var cap = parseInt($('#cbCap').val());
    var d = new Date();
    var namhoc = parseInt(d.getFullYear());
    $.ajax({
        url: '/Home/GetTruong',
        type: 'GET',
        data: {
            idtinh,
            idquanhuyen,
            cap,
            namhoc
        },
        success: function (res) {
            var html = '<option value="0" selected>CHỌN TRƯỜNG</option>';
            //'<option value="515">SGD &amp; ĐT Tỉnh Lai Châu</option>';
            if (res.status && (res.listTruong != null)) {
                $.each(res.listTruong, function (i, item) {
                    html += '<option value = "' + item.MaDonViSuDung + '">' + item.TenTruong + '</option>'
                })
            }
            $('#cbSchoolName').html(html);
        }
    })
}