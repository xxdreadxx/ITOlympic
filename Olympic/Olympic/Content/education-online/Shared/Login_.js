var quyen = 'truong';
var idQuan_cache = 0
var capHoc_cache = 6;
var mdvTruong_cache = 0;
var mdvTruongPGD_cache = 0;
var userName_cache = "";
var passWord_cache = "";

$(document).ready(function () {
    //#region Xử lý dữ liệu cache
    Lay_DuLieu_Cache();
    //#endregion

    //#region Gán select2 cho các thẻ
    $('#cbQuan').select2();
    $('#cbCap').select2();
    $('#cbTruong').select2();
    //#endregion

    //#region Gán dữ liệu
    Reset_Form(quyen);
    //console.log(quyen)
    //#endregion

    //var errorLoginCount = getCookie('loginErrorTime');
    //errorLoginCount = errorLoginCount ? parseInt(errorLoginCount) : 0;
    //if (errorLoginCount >= 3) {
    //    $('#captchaKey').removeClass('hide');
    //}


});
// Kiểm tra điều kiện đăng nhập
function KiemTra() {
    let trangthai = true;
    var idtinh = $('#cbTinh').val();
    var idQuan = parseInt($('#cbQuan').val());
    var capHoc = parseInt($('#cbCap').val());
    var mdvTruong = $('#cbTruong').val();
    console.table([quyen, mdvTruongPGD_cache, idQuan, capHoc, mdvTruong]);

    let _quyen = quyen == 'sqd' ? 3 : quyen == 'pgd' ? 2 : 1;
    //// Kiểm tra sở
    //if (_quyen < 3) {
    //    // Kiểm tra cấp phòng
    //    if (_quyen <= 2) {
    //        if (idQuan == null || idQuan == undefined || idQuan == 0) {
    //            trangthai = false;
    //            $('#cbQuan_error').show();
    //        }
    //        // Kiểm tra cấp trường
    if (_quyen = 1) {
        if (mdvTruong == null || mdvTruong == undefined || mdvTruong == 0) {
            trangthai = false;
            $('#cbTruong_error').show();
        }
    }
    //    }
    //}
    return trangthai;
}
// Đăng nhập
$(document).keypress(function (event) {
    if (event.keyCode == 13) {
        DangNhap();
    }
});
function DangNhap() {
    let kiemtra = KiemTra();
    if (kiemtra) {
        //#region Lấy dữ liệu
        let mdvTruong = $('#cbTruong').val();
        let idtinh = $('#cbTinh').val();
        let idQuan = parseInt($('#cbQuan').val());
        let capHoc = parseInt($('#cbCap').val());
        $('#idTruong').val(mdvTruong);
        localStorage.setItem('quyen_cache', JSON.stringify(quyen));
        localStorage.setItem('mdvTruong_cache', JSON.stringify(mdvTruong));
        localStorage.setItem('idTinh_cache', JSON.stringify(idtinh));
        localStorage.setItem('idQuan_cache', JSON.stringify(idQuan));
        localStorage.setItem('capHoc_cache', JSON.stringify(capHoc));

        let username = $('input[name=UserName]').val().trim();
        let password = $('input[name=Password]').val();
        let remember = $('input[name=Remember]').is(':checked');

        localStorage.setItem('user', JSON.stringify(username));
        localStorage.setItem('pass', JSON.stringify(password));

        let madonvisudung = 0;
        let tendonvisudung = '';
        if (quyen == 'sgd') {
            madonvisudung = $('#cbTinh').data('madonvi');
            tendonvisudung = $('#cbTinh').data('tendonvi');
        }
        else if (quyen == 'pgd') {
            madonvisudung = idQuan;
            tendonvisudung = $('#cbQuan option:selected').text();
            localStorage.setItem('mdvTruongPGD_cache', JSON.stringify(madonvisudung));

        } else {
            madonvisudung = $('#cbTruong').val();
            tendonvisudung = $('#cbTruong option:selected').text();
        }

        //#endregion
        showLoadingScreen();
        var count = getCookie('loginErrorTime');
        count = count ? parseInt(count) : 0;
        var capt = '';
        if (count >= 3) {
            capt = grecaptcha.getResponse();
        }
        if (count < 3 || !isNullOrEmpty(capt)) {

            var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/\r\n/g, "\n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }
            password = Base64.encode(password);/*Nhật 05/03/2022*/

            $.ajax({
                url: '/Account/UserLogin',
                type: 'POST',
                data: {
                    username, password, remember, madonvisudung, tendonvisudung, quyen, capHoc
                },
                success: function (rs) {
                    let mess = '';
                    if (rs == 'ERROR') {
                        mess = 'Tài khoản hoặc mật khẩu không chính xác';
                        $('#DangNhap_error').text(mess).show();
                        hideLoadingScreen();
                        //if (count >= 2) {
                        //    $('#captchaKey').removeClass('hide');
                        //}
                        //setCookie('loginErrorTime', count + 1, 1, '/account/login');
                    } else if (rs == 'BRANCHERROR') {
                        mess = 'Đăng nhập vị từ chối. Vui lòng đăng nhập đúng chi nhánh';
                        $('#DangNhap_error').text(mess).show();
                        hideLoadingScreen();
                    } else if (rs == 'INACTIVE') {
                        mess = 'Tài khoản chưa được kích hoạt';
                        $('#DangNhap_error').text(mess).show();
                        hideLoadingScreen();
                    } else if (rs == 'DUPLICATE') {
                        mess = 'Tài khoản đang đăng nhập tại máy khác';
                        $('#DangNhap_error').text(mess).show();
                        hideLoadingScreen();
                    } else if (rs == 'LOGGEDIN') {
                        setCookie('loginErrorTime', 0, -1, '/account/login');
                        window.location.reload();
                    }
                    else {
                        setCookie('loginErrorTime', 0, -1, '/account/login');
                        var userId = rs.substr(0, rs.indexOf('::'));
                        var role = rs.replace(userId + '::', '');

                        var returnUrl = '/' //Trả về trang ngoài
                        window.location.href = returnUrl != '' ? returnUrl : (role == 'administrator' || role == 'instructor' || role == 'learner' ? '/?role=' + role : '/');
                    }
                }
            })
        }
    }
}
$('#cbQuan').on('change', function () {
    Reset_Error();
    if ($('#cbCap').val() != 6) {
        LayDanhSach_Truong();
    }
})
$('#cbTruong').on('change', function () {
    Reset_Error();
})
// Lấy quận
function LayDanhSach_Quan() {
    Reset_Error();
    //Khi thực hiện chọn sở giáo dục, hệ thống sẽ lấy danh sách các phòng tương ứng của sở
    //Đồng thời hiển thị thông tin của sở vào combobox trường
    var quyen = $('.boxQuyenDangNhap_check').data('quyen');
    console.log(quyen);
    var idtinh = $('#cbTinh').val();
    if (quyen == 'truong') {
        $.ajax({
            url: '/HomeTuyenSinh/GetThanhPho',
            type: 'GET',
            async:false,
            data: {
                id: idtinh,
                type: 2
            },
            success: function (res) {
                var html = '';
                html = '<option value="0" selected>CHỌN QUẬN/HUYỆN</option>'
                if (res.lstdanhsach != null) {
                    $.each(res.lstdanhsach, function (i, item) {
                        html += '<option value="' + item.ID + '">' + item.TenDiaChi + '</option>'
                    })
                }
                $('#cbQuan').html(html);
            }
        })
    }
    else if (quyen == 'pgd') {
        var idquanhuyen = 0;
        var cap = 4;
        var d = new Date();
        var namhoc = parseInt(d.getFullYear());
        $.ajax({
            url: '/Account/Lay_DanhSach_Truong',
            type: 'GET',
            async: false,
            data: {
                idtinh,
                idquanhuyen,
                cap,
                namhoc
            },
            success: function (res) {
                var html = '';
                html = '<option value="0" selected>CHỌN QUẬN/HUYỆN</option>';
                if (res.listTruong != null) {
                    $.each(res.listTruong, function (i, item) {
                        html += '<option value = "' + item.MaDonViSuDung + '">' + item.TenTruong + '</option>'
                    })
                }
                $('#cbQuan').html(html);
            }
        })
    }

}
// Lấy trường
function LayDanhSach_Truong() {
    Reset_Error();
    $('#cbTruong').val(0);
    $('#cbTruong').trigger('change');
    var idtinh = $('#cbTinh').val();
    var idquanhuyen = $('#cbQuan').val();
    var cap = $('#cbCap').val();
    var d = new Date();
    var namhoc = parseInt(d.getFullYear());
    $.ajax({
        url: '/Account/Lay_DanhSach_Truong',
        type: 'GET',
        async: false,
        data: {
            idtinh,
            idquanhuyen,
            cap,
            namhoc
        },
        success: function (res) {
            var html = '';
            html = '<option value="0" selected>CHỌN TRƯỜNG</option>';
            //'<option value="515">SGD &amp; ĐT Tỉnh Lai Châu</option>';
            if (res.listTruong != null) {
                $.each(res.listTruong, function (i, item) {
                    html += '<option value = "' + item.MaDonViSuDung + '">' + item.TenTruong + '</option>'
                })
            }
            $('#cbTruong').html(html);
        }
    })
}
// Chọn quyền đăng nhập
function Chon_Quyen_DangNhap(item) {
    quyen = $(item).data('quyen');
    Reset_Form(quyen);
    let idQuan = $('#cbQuan').val();
    let capHoc = $('#cbCap').val();
    let mdvTruong = $('#cbTruong').val();

    console.log(quyen + '-' + idQuan + '-' + capHoc + '-' + mdvTruong);
}
function Reset_Error() {
    $('#cbQuan_error').hide();
    $('#cbTruong_error').hide();
    $('#DangNhap_error').text('').hide();
}
function Reset_Form(_quyen) {
    // Xóa error
    Reset_Error();
    // Chuyển trạng thái quyền
    let item = $('button[data-quyen="' + _quyen + '"]');
    $.each($('.boxQuyenDangNhap'), function () {
        //$(this).data('check', false);
        $(this).addClass('boxQuyenDangNhap_uncheck')
        $(this).removeClass('boxQuyenDangNhap_check')
    })
    //item.data('check', true);
    item.addClass('boxQuyenDangNhap_check')
    item.removeClass('boxQuyenDangNhap_uncheck')

    let quan = true;
    let cap = true;
    let truong = true;
    if (_quyen == 'truong') {
        quan = false;
        cap = false;
        truong = false;
        Reset_Select(quan, cap, truong);
        //#region Lấy danh sách quận
        LayDanhSach_Quan();
        setTimeout(() => {
            if (idQuan_cache != 0) {
                $('#cbQuan option:selected').removeAttr('selected');
                $('#cbQuan').val(idQuan_cache);
                $('#cbQuan').trigger('change');
            }
        }, 2000)
        //#endregion Lấy danh sách quận
        if (capHoc_cache != 0) {
            $('#cbCap option:selected').removeAttr('selected');
            $('#cbCap').val(capHoc_cache);
            $('#cbCap').trigger('change');
        }
        //#region Lấy danh sách trường
        LayDanhSach_Truong();
        setTimeout(() => {
            if (mdvTruong_cache != 0) {
                $('#cbTruong option:selected').removeAttr('selected');
                $('#cbTruong').val(mdvTruong_cache);
                $('#cbTruong').trigger('change');
            }
        }, 2000)
        //#endregion Lấy danh sách trường
    }
    else if (_quyen == 'pgd') {
        quan = false;
        Reset_Select(quan, cap, truong);
        LayDanhSach_Quan();
    } else {
        Reset_Select(quan, cap, truong);
        $('#cbQuan option:first').attr('selected', 'selected');
        $('#cbCap option:first').attr('selected', 'selected');
        $('#cbTruong option:first').attr('selected', 'selected');
    }

    $('input[name=Password]').val(passWord_cache);
    $('input[name=UserName]').val(userName_cache);
}
function Reset_Select(quan, cap, truong) {
    $('#cbQuan').attr('disabled', quan);
    $('#cbQuan option:selected').removeAttr('selected');
    //$('#cbQuan option:first').attr('selected', 'selected');
    $('#cbQuan').trigger('change');

    $('#cbCap').attr('disabled', cap);
    $('#cbCap option:selected').removeAttr('selected');
    //$('#cbCap option:first').attr('selected', 'selected');
    $('#cbCap').trigger('change');

    $('#cbTruong').attr('disabled', truong);
    $('#cbTruong option:selected').removeAttr('selected');
    //$('#cbTruong option:first').attr('selected', 'selected');
    $('#cbTruong').trigger('change');
}
function Lay_DuLieu_Cache() {
    // Quyền 
    let quyen_cache = JSON.parse(localStorage.getItem('quyen_cache'));
    if (quyen_cache != null && quyen_cache != undefined && quyen_cache != "") {
        quyen = quyen_cache;
    }
    // PGD
    mdvTruongPGD_cache = JSON.parse(localStorage.getItem('mdvTruongPGD_cache'));
    if (mdvTruongPGD_cache == null || mdvTruongPGD_cache == undefined) {
        mdvTruongPGD_cache = 0;
    }
    // Quận/huyện
    idQuan_cache = JSON.parse(localStorage.getItem('idQuan_cache'));
    if (idQuan_cache == null || idQuan_cache == undefined) {
        idQuan_cache = 0;
    }
    // Cấp học
    capHoc_cache = JSON.parse(localStorage.getItem('capHoc_cache'));
    if (capHoc_cache == null || capHoc_cache == undefined) {
        capHoc_cache = 6;
    }
    // Trường
    mdvTruong_cache = JSON.parse(localStorage.getItem('mdvTruong_cache'));
    if (mdvTruong_cache == null || mdvTruong_cache == undefined) {
        mdvTruong_cache = 0;
    }
    // Tài khoản
    userName_cache = JSON.parse(localStorage.getItem('user'));
    if (userName_cache == null || userName_cache == undefined) {
        userName_cache = "";
    }
    // Mật khẩu
    passWord_cache = JSON.parse(localStorage.getItem('pass'));
    if (passWord_cache == null || passWord_cache == undefined) {
        passWord_cache = "";
    }
    // Gán cho PGD bất kỳ
    if (mdvTruong_cache == 0 && capHoc_cache == 6) {
        let mdvPGD = $('#cbPGD').data('madonvi');
        let idQuanPGD = $('#cbPGD').data('idquan');
        idQuan_cache = idQuanPGD;
        capHoc_cache = 4;
        mdvTruong_cache = mdvPGD;
    }
    console.table([quyen, mdvTruongPGD_cache, idQuan_cache, capHoc_cache, mdvTruong_cache]);
}
function Gan_DuLieu_Cache(dulieu = 'quan,cap,truong,userinfo') {
    let _dulieu = dulieu.split(',');
    $.each(_dulieu, function (i, loai) {
        if (idQuan_cache != 0 && loai == 'quan') {
            $('#cbQuan option:selected').removeAttr('selected');
            $('#cbQuan').val(idQuan_cache);
            $('#cbQuan').trigger('change');
        }
        if (mdvTruong_cache != 0 && loai == 'truong') {
            $('#cbTruong option:selected').removeAttr('selected');
            $('#cbTruong').val(mdvTruong_cache);
            $('#cbTruong').trigger('change');
        }
        if (capHoc_cache != 0 && loai == 'cap') {
            $('#cbCap option:selected').removeAttr('selected');
            $('#cbCap').val(capHoc_cache);
            $('#cbCap').trigger('change');
        }
        if (userName_cache != 0 && loai == 'userinfo') {
            $('input[name=UserName]').val(userName_cache);
        }
        if (passWord_cache != 0 && loai == 'userinfo') {
            $('input[name=Password]').val(passWord_cache);
        }
    })
}