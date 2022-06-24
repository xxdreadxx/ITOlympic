function DangNhap() {
    var username = $('#txtUsername').val();
    var pass = $('#txtPassword').val();
    $.ajax({
        url: '/Login/Login',
        data: {
            username: username,
            pass: pass,
        },
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response.status == true) {
                toastr.success(response.mess, '', { timeOut: 2000 });
                setTimeout(function () {
                    window.location = '/Admin/HomeAd';
                }, 1000);
            }
            else {
                toastr.error(response.mess, '', { timeOut: 2000 });
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function updatePass() {
    var kt = true;
    var IDNV = $('#UserID').val();
    var PassOld = $('#txtOldPass').val();
    var NewPass = $('#txtNewPass').val();
    var PassConfirm = $('#txtPassConfirm').val();
    if (NewPass.trim() == '') {
        $('#txtNewPass').focus();
        document.getElementById('errPass').innerHTML = "Chưa nhập mật khẩu mới!";
        $('#errPass').show();
        kt = false;
    }
    else if (NewPass.trim().length < 4 || NewPass.trim().length > 8) {
        document.getElementById('errPass').innerHTML = "Mật khẩu phải từ 4 đến 8 kí tự!";
        $('#errPass').show();
        $('#txtNewPass').focus();
        kt = false;
    }
    else if (PassConfirm.trim() == '') {
        document.getElementById('errPassConfirm').innerHTML = "Chưa nhập lại mật khẩu mới!";
        $('#errPassConfirm').show();
        $('#txtPassConfirm').focus();
        kt = false;
    }
    else if (NewPass != PassConfirm) {
        document.getElementById('errPassConfirm').innerHTML = "Mật khẩu nhập lại không khớp!";
        $('#errPassConfirm').show();
        kt = false;
    }
    if (kt == true) {
        var formData = new FormData();
        formData.append("ID", IDNV);
        formData.append("NewPass", NewPass);
        $.ajax({
            url: '/Admin/User/UpdatePass',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                if (response.status == true) {
                    toastr.success('Cập nhật thành công', '', { timeOut: 1000 });
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                }
                else {
                    if (response.type == 2) {
                        toastr.error('Có lỗi xảy ra, cập nhật không thành công', '', { timeOut: 2000 });
                    }
                    else {
                        toastr.error('Mật khẩu mới trùng với mật khẩu cũ', '', { timeOut: 2000 });
                    }
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
}

function changeIMG() {
    var f = document.getElementById("fImage").files;
    if (f.length > 0) {
        var fileToLoad = f[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result; // <--- data: base64
            document.getElementById("imgAvatar").src = srcData;
        }
        fileReader.readAsDataURL(fileToLoad);
    }
};

function UpdateInfo() {
    var kt = true;
    var IDNV = $('#UserID').val();
    var HoTen = $('#txtHoTen').val();
    var NgaySinh = $('#txtNgaySinh').val();
    var CMT = $('#txtCMT').val();
    var DiaChi = $('#txtDiaChi').val();
    var SDT = $('#txtSDT').val();
    var Email = $('#txtEmail').val();
    var Image = document.getElementById("fImage").files[0];
    var nam = document.getElementById('NewGender_1');
    var nu = document.getElementById('radNewGender_0');
    var gioitinh = 0;
    if (nam.checked == true && nam != null) {
        gioitinh = 1;
    }
    if (nu != null && nu.checked == true) {
        gioitinh = 0;
    }
    if (HoTen.trim() == '') {
        document.getElementById('errHoTen').innerHTML = "Chưa nhập họ tên!";
        $('#errHoTen').show();
        $('#txtHoTen').focus();
        kt = false;
    }
    else {
        if (NgaySinh.trim() == '') {
            document.getElementById('errNgaySinh').innerHTML = "Chưa nhập ngày sinh!";
            $('#errNgaySinh').show();
            $('#txtNgaySinh').focus();
            kt = false;
        }
        else {
            if (Email == "") {
                kt = false;
                document.getElementById('errEmail').innerHTML = "Chưa nhập email";
                $('#errEmail').show();
                $('#txtEmail').focus();
            }
            else {
                if (!isEmail(Email)) {
                    kt = false;
                    document.getElementById('errEmail').innerHTML = "Email sai định dạng";
                    $('#errEmail').show();
                    $('#txtEmail').focus();
                }
            }
        }
    }
    if (kt == true) {
        var formData = new FormData();
        formData.append("ID", IDNV);
        formData.append("HoTen", HoTen);
        formData.append("NgaySinh", NgaySinh);
        formData.append("GioiTinh", gioitinh);
        formData.append("DiaChi", DiaChi);
        formData.append("SDT", SDT);
        formData.append("Email", Email);
        formData.append("Image", Image);
        $.ajax({
            url: '/Admin/User/UpdateInfo',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                if (response.status == true) {
                    toastr.success('Cập nhật thành công', '', { timeOut: 1000 });
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                }
                else {
                    toastr.error('Có lỗi xảy ra, cập nhật không thành công', '', { timeOut: 2000 });
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
}

$("#txtEmail").keyup(function () {
    var ten = $('#txtEmail').val().trim();
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

$("#txtHoTen").keyup(function () {
    var ten = $('#txtHoTen').val().trim();
    if (ten != "") {
        $('#errHoTen').hide();
    }
    else {
        document.getElementById('errHoTen').innerHTML = "Chưa nhập họ tên";
        $('#errHoTen').show();
    }
})

$("#txtSDT").keyup(function () {
    var ten = $('#txtSDT').val().trim();
    if (ten != "") {
        $('#errSDT').hide();
    }
    else {
        document.getElementById('errSDT').innerHTML = "Chưa nhập số điện thoại";
        $('#errSDT').show();
    }
})

$("#txtNgaySinh").keyup(function () {
    var ten = $('#txtNgaySinh').val().trim();
    if (ten != "") {
        $('#errNgaySinh').hide();
    }
    else {
        document.getElementById('errNgaySinh').innerHTML = "Chưa nhập số ngày sinh";
        $('#errNgaySinh').show();
    }
})

$("#txtNewPass").keyup(function () {
    var ten = $('#txtNewPass').val().trim().length;
    if (ten >=4 && ten<=8) {
        $('#errPass').hide();
    }
    else {
        document.getElementById('errPass').innerHTML = "Mật khẩu phải từ 4 đến 8 kí tự!";
        $('#errPass').show();
    }
})
$("#errPassConfirm").keyup(function () {
    var ten = $('#errPassConfirm').val().trim().length;
    if (ten >= 4 && ten <= 8) {
        $('#errPassConfirm').hide();
    }
    else {
        document.getElementById('errPassConfirm').innerHTML = "Mật khẩu phải từ 4 đến 8 kí tự!";
        $('#errPassConfirm').show();
    }
})

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}