$(document).ready(function () {
    $('#liGiaoVien').addClass('active');
});

var mangId = [];
$(document).on('change', '#check-all-delete-js', function () {
    var status = $(this).is(':checked');
    if (status === true) {
        $(this).closest('table').find('tbody > tr:visible  input.one-delete-js[type="checkbox"]').prop('checked', true);
        $('#btn-delete-all').prop('disabled', false);
        $('#tblUser').find('tr[data-id]').each(function () {
            if ($(this).find('.one-delete-js').length > 0) {
                var itemId = Number($(this).attr('data-id'));
                if ($.inArray(itemId, mangId) < 0) {
                    mangId.push(itemId);
                }
            }
        })
    }
    else {
        $(this).closest('table').find('tbody > tr  input.one-delete-js[type="checkbox"]').prop('checked', false);
        if (mangId.length == 0) {
            $('#btn-delete-all').prop('disabled', true);
        }

        $('#tblUser').find('tr[data-id]').each(function () {
            var itemId = Number($(this).attr('data-id'));
            if ($.inArray(itemId, mangId) >= 0) {
                mangId.splice($.inArray(itemId, mangId), 1);
            }
        })
    }

    if (mangId.length > 0) {
        $('#btn-delete-all').prop('disabled', false);
    }
    else {
        $('#btn-delete-all').prop('disabled', true);

    }
});

$(document).on('change', '#check-all-delete-js , #tblUser > tbody > tr  input.one-delete-js', function () {
    if ($(this).hasClass('one-delete-js')) {
        // Nếu là check thì thêm id của user đó vào mảng
        if ($(this).is(':checked') == true) {
            mangId.push(Number($(this).closest('tr').data('id')));
        }
        else {
            mangId.splice(mangId.indexOf(Number($(this).closest('tr').data('id'))), 1)
            $('#check-all-delete-js').prop('checked', false);
        }
        ///Nếu số khóa học được check (trên tất cả các trang) lớn hơn không thì mở nút xóa tất cả
        if (mangId.length > 0) {
            $('#btn-delete-all').prop('disabled', false);
        }
        else {
            $('#btn-delete-all').prop('disabled', true);

        }
        // Nếu đã check hết tất cả các user trên trang hiện tại thì check vào nút check all
        if ($('#tblUser').find('tbody  tr[data-id]').find('.one-delete-js').length == $('#tblUser').find('tbody  tr[data-id]').find('.one-delete-js:checked').length) {
            $("#check-all-delete-js").prop('checked', true);
        }
        else {
            $("#check-all-delete-js").prop('checked', false)
        }
    }
});


function Add(id) {
    resetForm();
    if (id == null || id == 0) {
        document.getElementById('tieude').innerHTML = "Thêm mới giáo viên";
    }
    else {
        document.getElementById('tieude').innerHTML = "Cập nhật thông tin giáo viên";
        $.ajax({
            url: "/dGiaoVien/Edit",
            data: {
                id: id
            },
            type: 'post',
            success: function (result) {
                if (result.status == true) {
                    $('#id').val(id);
                    $('#NewFirstName').val(result.data.HoTen);
                    $('#NewUserName').val(result.data.Username);
                    //$('#NewPassword').val(result.data.HoTen);
                    $('#NewEmail').val(result.data.Email);
                    $('#NewBirthday').val(result.ngaysinh);
                    $('#NewPhone').val(result.data.SDT);
                    $('#NewAddress').val(result.data.DiaChi);
                }
            }
        });
    }
   $('#addNewUser').modal('show');
}

function resetForm() {
    $('#NewFirstName').val('');
    $('#NewUserName').val('');
    $('#NewPassword').val('');
    $('#NewEmail').val('');
    $('#NewBirthday').val('');
    $('#NewPhone').val('');
    $('#NewAddress').val('');
    $('#errTen').hide();
    $('#errUsername').hide();
    $('#errEmail').hide();
    $('#errPass').hide();
    $('#errNgaySinh').hide();
}


function checkDate(strDate, kt) {
    if (kt == true) {
        var comp = strDate.split('/');
        var d = comp[0];
        var m = comp[1];
        var y = comp[2];
        var date = new Date(y, m - 1, d);
        if (date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d) {
            return true;
        }
        return false;
    }
    else {
        //nếu ko có dữ liệu thì ko cần kiểm tra(trường ngày tháng có thể để trống)

            var comp = strDate.split('/');
            var d = comp[0];
            var m = comp[1];
            var y = comp[2];
            var date = new Date(y, m - 1, d);
            if (date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d) {
                return true;
            }
            return false;
        
    }
}

$("#NewFirstName").keyup(function () {
    var ten = $('#NewFirstName').val().trim();
    if (ten != "") {
        $('#errTen').hide();
    }
    else {
        document.getElementById('errTen').innerHTML = "Chưa nhập họ tên";
        $('#errTen').show();
    }
})

$("#NewUserName").keyup(function () {
    var ten = $('#NewUserName').val().trim();
    if (ten != "") {
        $('#errUsername').hide();
    }
    else {
        document.getElementById('errUsername').innerHTML = "Chưa nhập tên đăng nhập";
        $('#errUsername').show();
    }
})

//$("#NewBirthday").keyup(function () {
//    if (checkDate($('#NewBirthday').val(), false) == false) {
//        document.getElementById('errNgaySinh').innerHTML = "Ngày tháng năm sai định dạng.";
//        $('#errNgaySinh').show();
//    }
//    else {
//        $('#errNgaySinh').hide();
//    }
    
//})

$("#NewPassword").keyup(function () {
    var ten = $('#NewPassword').val().trim();
    if (ten != "") {
        if (!isPass(ten)) {
            document.getElementById('errPass').innerHTML = "Tối thiểu 4 ký tự, tối đa 8 ký tự, ít nhất 1 chữ cái và 1 số";
            $('#errPass').show();
        }
        else {
            $('#errPass').hide();
        }
    }
    else {
        document.getElementById('errPass').innerHTML = "Chưa nhập mật khẩu";
        $('#errPass').show();
    }
})

$("#NewEmail").keyup(function () {
    var ten = $('#NewEmail').val().trim();
    if (ten != "") {
        if (!isEmail(ten)) {
            document.getElementById('errEmail').innerHTML = "Email sai định dạng";
            $('#errEmail').show();
        }
        else {
            $('#errEmail').hide();
        }
    }
    else {
        document.getElementById('errEmail').innerHTML = "Chưa nhập email";
        $('#errEmail').show();
    }
})

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function isPass(pass) {
    var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,8}$/;
    return regex.test(pass);
}

function loadPartial() {
    $('#tableNguoiDung').load('/Admin/dGiaoVien/getList');
}

function Save() {
    var isSave = true;
    var hoten = $('#NewFirstName').val().trim();
    var taikhoan = $('#NewUserName').val().trim();
    var matkhau = $('#NewPassword').val().trim();
    var email = $('#NewEmail').val().trim();
    var id = $('#id').val();
    var nam = document.getElementById('NewGender_1');
    var nu = document.getElementById('radNewGender_0');
    var kichhoat = document.getElementById('activeKH_1');
    var kokichhoat = document.getElementById('activeKH_0');
    var gioitinh = "";
    var ac = "";
    var kieu = $('#ddlKieuND').val();
    if (hoten == "") {
        isSave = false;
        document.getElementById('errTen').innerHTML = "Chưa nhập họ tên";
        $('#errTen').show();
    }
    if (taikhoan == "") {
        isSave = false;
        document.getElementById('errUsername').innerHTML = "Chưa nhập tên đăng nhập";
        $('#errUsername').show();
    }
    else {
        $.ajax({
            url: "/dGiaoVien/checkTenDangNhap",
            data: {
                user: taikhoan,
                id: id
            },
            type: 'post',
            success: function (result) {
                if (result.status == false) {
                    isSave = false;
                    document.getElementById('errUsername').innerHTML = "Tên đăng nhập đã tồn tại trong hệ thống";
                    $('#errUsername').show();
                }
            }
        });
    }
    if (id == 0) {
        if (matkhau == "") {
            isSave = false;
            document.getElementById('errPass').innerHTML = "Chưa nhập mật khẩu";
            $('#errPass').show();
        }
        else {
            if (!isPass(matkhau)) {
                isSave = false;
                document.getElementById('errPass').innerHTML = "Tối thiểu 4 ký tự, tối đa 8 ký tự, ít nhất 1 chữ cái và 1 số.";
                $('#errPass').show();
            }
        }
    }

    if (email == "") {
        if (matkhau == "") {
            isSave = false;
            document.getElementById('errEmail').innerHTML = "Chưa nhập email";
            $('#errEmail').show();
        }
        else {
            if (!isEmail(email)) {
                isSave = false;
                document.getElementById('errEmail').innerHTML = "Email sai định dạng";
                $('#errEmail').show();
            }
        }
        
    }
    

    if (isSave == true) {
        var formData = new FormData();
        formData.append("HoTen", hoten);
        formData.append("TenDangNhap", taikhoan);
        formData.append("MatKhau", matkhau);
        formData.append("SDT", $('#NewPhone').val());
        formData.append("Email", email);
        formData.append("DiaChi", $('#NewAddress').val());
        formData.append("NgaySinh", $('#NewBirthday').val());
        if (nam.checked == true && nam != null) {
            gioitinh = 1;
        }
        if (nu != null && nu.checked == true ) {
            gioitinh = 0;
        }
        if (kichhoat.checked == true && kichhoat != null) {
            ac = 1;
        }
        if (kokichhoat.checked == true && kokichhoat != null) {
            ac = 0;
        }
        formData.append("KieuNguoiDung", kieu);
        formData.append("ID", id);
        formData.append("GioiTinh", gioitinh);
        formData.append("KichHoat", ac);
        $.ajax({
            async: false,
            type: 'POST',
            url: "/dGiaoVien/Save",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.status == true) {
                    $('#addNewUser').modal('hide');
                    if (id == 0) {
                        bootbox.alert({
                            title: "Thông báo",
                            message: "Thêm mới thành công giáo viên",
                            buttons: {
                                ok: {
                                    label: 'Đóng',
                                    className: "btn btn-default",
                                }
                            },
                            callback: function () { loadPartial(); }
                        })
                    }
                    else {
                        bootbox.alert({
                            title: "Thông báo",
                            message: "Cập nhật giáo viên thành công",
                            buttons: {
                                ok: {
                                    label: 'Đóng',
                                    className: "btn btn-default",
                                }
                            },
                            callback: function () { loadPartial(); }
                        })
                    }
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
    
}
var idND = "";
function Link_DeleteTT_onclick(DID) {
    idND = DID;
    if (idND != "" || idND ==0)//view popup xác nhận xóa
    {
        $("#DeleteND").modal("show");
    }
}

function deleteOne() {

    if (idND != 0) {
        mangId = [];
        mangId.push(idND)
    }
    $.ajax({
        url: '/dGiaoVien/Delete',
        dataType: 'json',
        type: 'post',
        data: { ListID: JSON.stringify(mangId) },
        success: function (rs) {
            if (rs.status == true) {
                $("#DeleteND").modal("hide");
                bootbox.alert({
                    title: "Thông báo",
                    message: "Xóa thành công bản ghi",
                    buttons: {
                        ok: {
                            label: 'Đóng',
                            className: "btn btn-default",
                        }
                    },
                    callback: function () { loadPartial(); }
                })
            }
        }
    })
}

function deleteAll() {
    var chuoiMangId = JSON.stringify(mangId);
    $.ajax({
        url: '/dGiaoVien/Delete',
        dataType: 'json',
        type: 'post',
        data: { ListID: chuoiMangId },
        success: function (rs) {
            $('#check-all-delete-js').prop('checked', false);
            if (rs.status == true) {
                bootbox.alert({
                    title: "Thông báo",
                    message: "Xóa thành công bản ghi",
                    buttons: {
                        ok: {
                            label: 'Đóng',
                            className: "btn btn-default",
                        }
                    },
                    callback: function () { loadPartial(); }
                })
            }
        }
    })
}

var idBG = "";
var status = "";
function Link_Status_onclick(DID, trangthai) {
    idBG = DID;
    status = trangthai;
    if (idBG != "")//view popup xác nhận xóa
    {
        if (status == 2) {
            $('#statusNoiDung').text('Bạn có muốn bỏ kích hoạt tài khoản giáo viên đã chọn hay không?')
        }
        else {
            $('#statusNoiDung').text('Bạn có muốn kích hoạt tài khoản giáo viên đã chọn hay không?')
        }
        $("#status").modal("show");
    }
}

function changeStatus() {
    $.ajax({
        url: "/dGiaoVien/ChangeStatus",
        data: {
            id: idBG,
            trangthai: status
        },
        type: 'post',
        success: function (result) {
            if (result.status == true) {
                $("#status").modal("hide");
                if (status == 1) {
                    bootbox.alert({
                        title: "Thông báo",
                        message: "Kích hoạt tài khoản giáo viên thành công",
                        buttons: {
                            ok: {
                                label: 'Đóng',
                                className: "btn btn-default",
                            }
                        },
                        callback: function () { loadPartial(); }
                    })
                }
                else {
                    bootbox.alert({
                        title: "Thông báo",
                        message: "Bỏ kích hoạt tài khoản giáo viên thành công",
                        buttons: {
                            ok: {
                                label: 'Đóng',
                                className: "btn btn-default",
                            }
                        },
                        callback: function () { loadPartial(); }
                    })
                }
            }
        }
    });
}

$(document).ready(function () {
    $("#txtSearch").on('keyup', function () {
        var value = $(this).val().toLowerCase();
        $("#tblUser > tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) != -1)
        });
    });
});