var mangId = [];
var isSave = true;
var kt_tenmien = true;
var kt_email = true;
var kt_ma = true;
var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

function Ma_onkeyTruong() {
    var ma = $('#txtMa_Truong').val().trim();
    if (ma != "") {
        if (checkKyTuDacBiet_Truong(ma)) {
            document.getElementById('maError_Truong').innerHTML = "Không được nhập ký tự đặc biệt.";
            $('#maError_Truong').show();
        }
        else {
            $('#maError_Truong').hide();
        }
    }
    else {
        document.getElementById('maError_Truong').innerHTML = "Không được để trống.";
        $('#maError_Truong').hide();
    }
}
function Ten_onkeyTruong() {
    var ten = $('#txtTen_Truong').val().trim();
    if (ten != "") {
        $('#tenError_Truong').hide();
    }
    else {
        document.getElementById('tenError_Truong').innerHTML = "Không được để trống.";
        $('#tenError_Truong').show();
    }
}
function checkKyTuDacBiet_Truong(str) {
    var specialChars = "<>!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
    for (i = 0; i < specialChars.length; i++) {
        if (str.indexOf(specialChars[i]) > -1) {
            return true
        }
    }
    return false;
}
function SDT_onkeyTruong() {
    var sdt = $('#txtSDT_Truong').val();
    if (sdt != "") {
        $('#sdtError_Truong').hide();
    }
    else {
        document.getElementById('sdtError_Truong').innerHTML = "Không được để trống.";
        $('#sdtError_Truong').show();
    }
}
function Email_onkeyTruong() {
    var email = $('#txtEmail_Truong').val();
    if (email != "") {
        $('#emailError_Truong').hide();

    }
    else {
        document.getElementById('emailError_Truong').innerHTML = "Không được để trống.";
        $('#emailError_Truong').show();
    }
}
function Web_onkeyTruong() {
    var w = $('#txtWeb_Truong').val();
    if (w != "") {
        $('#webError_Truong').hide();

    }
    else {
        document.getElementById('webError_Truong').innerHTML = "Không được để trống.";
        $('#webError_Truong').show();
    }
}

function CheckTenMien_Truong() {
    var web = $('#txtWeb').val();
    $.ajax({
        url: "/TS_School/checktenMien",
        dataType: 'json',
        type: 'post',
        data: { web: $('#txtWeb_Truong').val() },
        success: function (rs) {
            if (rs.status == true) {
                $('#webError_Truong').hide();
                kt_tenmien = true;
            }
            else {
                document.getElementById('webError_Truong').innerHTML = "Không tồn tại Website này";
                $('#webError_Truong').show();
                //return false;
                kt_tenmien = false;
            }
        }
    });
}

function QuocGia_onchanges_Truong() {
    var value = $('#opQG_Truong').val();
    $.ajax({
        url: '/TS_School/ListTinh',
        dataType: 'json',
        type: 'post',
        data: {
            id: value,
        },
        success: function (response) {
            if (response.status == true) {
                var data = response.data;
                var html = '<select id="opTP_Truong" class="form-control"  onchange="Tinh_onchanges_Truong()"><option value="0">-- Tỉnh/Thành phố --</option>';
                $.each(data, function (i, item) {
                    html += '<option value=' + item.ID + '>' + item.TenDiaChi + '</option>'
                });
                html += '</select>';
                $('#ddlTinh_Truong').html(html);
            }
        }
    })
}

function Tinh_onchanges_Truong() {
    var value = $('#opTP_Truong').val();
    $.ajax({
        url: '/TS_School/ListQuan',
        dataType: 'json',
        type: 'post',
        data: {
            id: value,
        },
        success: function (response) {
            if (response.status == true) {
                var data = response.data;
                var html = '<select id="opQH_Truong" class="form-control" onchange="Quan_onchanges_Truong()"><option value="0">-- Quận/Huyện --</option>';
                var html1 = '<select id="opPX_Truong" class="form-control"><option value="0">-- Phường/Xã --</option>';
                $.each(data, function (i, item) {
                    html += '<option value=' + item.ID + '>' + item.TenDiaChi + '</option>'
                });
                html += '</select>';
                $('#ddlQuan_Truong').html(html);
                html1 += '</select>';
                $('#ddlPhuong_Truong').html(html1);
            }
        }
    })
}

function Quan_onchanges_Truong() {
    var value = $('#opQH_Truong').val();
    $.ajax({
        url: '/TS_School/ListPhuong',
        dataType: 'json',
        type: 'post',
        data: {
            id: value,
        },
        success: function (response) {
            if (response.status == true) {
                var data = response.data;
                var html = '<select id="opPX_Truong" class="form-control"><option value="0">-- Phường/Xã --</option>';
                $.each(data, function (i, item) {
                    html += '<option value=' + item.ID + '>' + item.TenDiaChi + '</option>'
                });
                html += '</select>';
                $('#ddlPhuong_Truong').html(html);
            }
        }
    })
}
function ShowModalAdd_Truong(id) {
    var ID = parseInt(id);
    $('#webError_Truong').hide();
    $('#sdtError_Truong').hide();
    $('#emailError_Truong').hide();
    $('#maError_Truong').hide();
    $('#tenError_Truong').hide();
    $('#capError_Truong').hide();
    $.ajax({
        url: '/TS_School/GetData',
        dataType: 'json',
        type: 'post',
        data: {
            id: ID,
        },
        success: function (res) {
            if (res.status == true) {
                $('#txtTen_Truong').val(res.data.TenTruong);
                $('#txtMa_Truong').val(res.data.MaTruong);
                $('#txtdanhhieu_Truong').val(res.data.DanhHieu);
                $('#txthieutruong_Truong').val(res.data.HieuTruong);
                $('#txtWeb_Truong').val(res.data.Website);
                $('#txtThongTin_Truong').val(res.data.ThongTinKhac);
                $('#txtphonghoc_Truong').val(res.data.SoPhongHoc);
                $('#txtdiachi_Truong').val(res.data.DiaChi);
                $('#txtgv_Truong').val(res.data.SoGiaoVien);
                $('#txthocsinh_Truong').val(res.data.SoHocSinh);
                $('#txtEmail_Truong').val(res.data.Email_TiepNhan);
                $('#txtSDT_Truong').val(res.data.DienThoai); 

                var html1 = '<option value="0">-- Tỉnh/Thành phố --</option>';
                $.each(res.lstT, function (i, item) {
                    html1 += '<option value="' + item.ID + '">' + item.TenDiaChi + '</option>'
                })
                $('#opTP_Truong').html(html1);

                var html2 = '<option value="0">-- Quận/Huyện --</option>';
                $.each(res.lstQ, function (i, item) {
                    html2 += '<option value="'+item.ID+'">'+item.TenDiaChi+'</option>'
                })
                $('#opQH_Truong').html(html2);

                var html3 = '<option value="0">-- Phường/Xã --</option>';
                $.each(res.lstP, function (i, item) {
                    html3 += '<option value="' + item.ID + '">' + item.TenDiaChi + '</option>'
                })
                $('#opPX_Truong').html(html3);

                $('#opTP_Truong option[value=' + res.data.IDTinh + ']').prop('selected', 'selected');
                $('#opQH_Truong option[value=' + res.data.IDQuan + ']').prop('selected', 'selected');
                $('#opPX_Truong option[value=' + res.data.IDPhuong + ']').prop('selected', 'selected');

                $('#opCap_Truong option[value=' + res.data.Cap + ']').prop('selected', 'selected');

                //$('#opQG_Truong option[value=' + 0 + ']').prop('selected', 'selected');

                document.getElementById('lb').innerHTML = "CẬP NHẬT THÔNG TIN TRƯỜNG";
                $("#modalAdd_Truong").modal("show");
            }
        }
    })
}
function Save_Truong() {
    isSave = true;
    kt_email = true;
    kt_ma = true;
    //kiem tra validate
    var ma = $('#txtMa_Truong').val().trim();
    var ten = $('#txtTen_Truong').val().trim();
    var cap = $('#opCap_Truong').val();
    var id = $('#id_Truong').val();
    var email = $('#txtEmail_Truong').val();
    var sdt = $('#txtSDT_Truong').val();
    var web = $('#txtWeb_Truong').val();
    ValidateEmail_Truong();
    //CheckTenMien();
    if (ma == '') {
        isSave = false;
        $('#maError_Truong').text('Không được để trống.')
        $('#maError_Truong').show();
    }
    if (email == '') {
        isSave = false;
        $('#emailError_Truong').text('Không được để trống.')
        $('#emailError_Truong').show();
    }
    if (ten == '') {
        isSave = false;
        $('#tenError_Truong').text('Không được để trống.')
        $('#tenError_Truong').show();
    }
    if (checkKyTuDacBiet_Truong(ma)) {
        isSave = false;
    }
    //if (kt_tenmien == false) {
    //    isSave = false;
    //}
    if (kt_email == false) {
        isSave = false;
    }
    if (sdt == '') {
        isSave = false;
        $('#sdtError_Truong').text('Không được để trống.')
        $('#sdtError_Truong').show();
    }
    $.ajax({
        url: "/TS_School/CheckMa",
        dataType: 'json',
        type: 'post',
        data: {
            ma: $('#txtMa_Truong').val(),
            id: $('#id_Truong').val()
        },
        success: function (rs) {
            if (rs.status == true) {
                document.getElementById('maError_Truong').innerHTML = "Mã trường đã tồn tại";
                $('#maError_Truong').show();
                return false
            }
            else {
                if (web != "") {
                    $.ajax({
                        url: "/TS_School/checktenMien",
                        dataType: 'json',
                        type: 'post',
                        data: { web: $('#txtWeb_Truong').val() },
                        success: function (rs1) {
                            if (rs1.status == true) {
                                $('#webError_Truong').hide();
                                kt_tenmien = true;
                                if (isSave == true) {
                                    var formData = new FormData();
                                    formData.append("TenTruong", ten);
                                    formData.append("MaTruong", ma);
                                    formData.append("ID", id);
                                    formData.append("DanhHieu", $('#txtdanhhieu_Truong').val());
                                    formData.append("HieuTruong", $('#txthieutruong_Truong').val());
                                    formData.append("Web", web);
                                    formData.append("ThongTin", $('#txtThongTin_Truong').val());
                                    formData.append("SoPhongHoc", $('#txtphonghoc_Truong').val());
                                    formData.append("DiaChi", $('#txtdiachi_Truong').val());
                                    formData.append("SoGiaoVien", $('#txtgv_Truong').val());
                                    formData.append("SoHocSinh", $('#txthocsinh_Truong').val());
                                    formData.append("Email_TiepNhan", $('#txtEmail_Truong').val());
                                    formData.append("DienThoai", $('#txtSDT_Truong').val());
                                    formData.append("IDQuocGia", $('#opQG_Truong').val());
                                    formData.append("IDTinh", $('#opTP_Truong').val());
                                    formData.append("IDQuan", $('#opQH_Truong').val());
                                    formData.append("IDPhuong", $('#opPX_Truong').val());
                                    formData.append("Cap", $('#opCap_Truong').val());
                                    $.ajax({
                                        async: false,
                                        type: 'POST',
                                        url: "/TS_School/Save",
                                        data: formData,
                                        cache: false,
                                        contentType: false,
                                        processData: false,
                                        success: function (response) {
                                            if (response.status == true) {
                                                $('#modalAdd_Truong').modal('hide');
                                                if (id == 0) {
                                                    var message = 'Cập nhật trường thành công';
                                                    setTimeout(alertModal(message, 'success'), 500);
                                                    setTimeout(function () {
                                                        $('#alertModal').modal('hide');
                                                    }, 1200);
                                                }
                                                else {
                                                    var message = 'Cập nhật trường thành công';
                                                    setTimeout(alertModal(message, 'success'), 500);
                                                    setTimeout(function () {
                                                        $('#alertModal').modal('hide');
                                                    }, 1200);
                                                }
                                                location.reload();
                                            }
                                        },
                                        error: function (err) {
                                            console.log(err)
                                        }
                                    });
                                }
                            }
                            else {
                                document.getElementById('webError_Truong').innerHTML = "Không tồn tại tên miền này.";
                                $('#webError_Truong').show();
                                //return false;
                                kt_tenmien = false;
                            }
                        }

                    });
                }
                else {
                    document.getElementById('webError_Truong').innerHTML = "Không được để trống.";
                    $('#webError_Truong').show();
                    isSave = false;
                }

            }
        }
    })
}

function ValidateEmail_Truong() {

    var pattern = new RegExp(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/);

    if (pattern.test($('#txtEmail_Truong').val())) {
        $('#emailError_Truong').hide();
    }
    else {
        document.getElementById('emailError_Truong').innerHTML = "Nhập sai định dạng.";
        $('#emailError_Truong').show();
        kt_email = false;
    }
}

$("#txtphonghoc_Truong").keypress(function (e) {
    var keyCode = e.which;
    if ((keyCode != 8 || keyCode == 32) && (keyCode < 48 || keyCode > 57)) {
        return false;
    }
});
$("#txtgv_Truong").keypress(function (e) {
    var keyCode = e.which;
    if ((keyCode != 8 || keyCode == 32) && (keyCode < 48 || keyCode > 57)) {
        return false;
    }
});
$("#txthocsinh_Truong").keypress(function (e) {
    var keyCode = e.which;
    if ((keyCode != 8 || keyCode == 32) && (keyCode < 48 || keyCode > 57)) {
        return false;
    }
});

//CHẶN COPPY
$('#txtphonghoc_Truong').on("cut copy paste", function (e) {
    e.preventDefault();
});
$('#txtgv_Truong').on("cut copy paste", function (e) {
    e.preventDefault();
});
$('#txthocsinh_Truong').on("cut copy paste", function (e) {
    e.preventDefault();
});

function locdau_Truong(obj) {
    var txtMa = $('#txtMa_Truong').val().trim();
    if (txtMa != "") {
        if (checkKyTuDacBiet_Truong(txtMa)) {
            document.getElementById('maError_Truong').innerHTML = "Không được nhập ký tự đặc biệt";
            $('#maError_Truong').show();
        }
        else {
            $('#maError_Truong').hide();
        }
    }
    else {
        document.getElementById('maError_Truong').innerHTML = "Không được để trống mã địa chỉ";
        $('#maError_Truong').hide();
    }
    var str;
    if (eval(obj))
        str = eval(obj).value;
    else
        str = obj;
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    eval(obj).value = str;
}





