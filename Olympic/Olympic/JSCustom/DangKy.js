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

var lstFile = [];
//Mảng chứa file đã chọn
function fileChange() {
    $('#errortailieudinhkem').text('');
    $('#errortailieudinhkem').css('display', 'none');
    var html = '';
    var filedinhkem_input = document.getElementById('fDinhKem');
    if (filedinhkem_input != null) {

        //Check xem cái file đẩy lên có đúng các đinh dạng yêu cầu hay không
        var ten_file = filedinhkem_input.files[0].name;
        html = '<tr class="file_hienthi" id="file_hienthi">' +
            '<td colspan="0" style="width: 90%; font-size:14px" data-bs-placement="top" >●&ensp;' + ten_file + '</td>' +
            '<td colspan="2" class="btn_chontep" style="width: 10%; text-align:center; cursor: pointer;"><a class="fa fa-trash btn_chontep" style="width:100%; cursor: pointer;" onclick="removeFile()"></a>' +
            '</td>' +
            '</tr >';
        $(html).insertAfter($('#file_loai'));

    }
    else {
        document.getElementById('fDinhKem').value = null;
    }
   
}

function removeFile() {
    $('#lst_chonfile_DinhKem').find("#file_hienthi").remove();
}

function ResetValidate() {
    $('.error-message').text('');
    $('.error-message').removeAttr('style');
}
//Hàm validate
function Validate() {
    var charactersRgx = /[!@#$%^&*(),.?":{}|<>]+$/i;
    var emailRgx = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    //var caphoc = $("input[name='truongdk']:checked").val();
    var checkValid = true;
    var mess = 'Có thông tin chưa chính xác ! Vui lòng kiểm tra lại thông tin đã nhập';

    var ma = $('#txtMaSV').val().trim() || "";
    var hoTen = $('#txthoten').val().trim() || "";
    var ngaySinh = $('#txtngaysinh').val().trim() || "";
    var email = $('#txtemaillienhe').val().trim() || "";
    var dienthoai = $('#txtdienthoailienhe').val().trim() || "";
    var lop = $('#txtLopHanhChinh').val().trim() || "";

    if (email != "") {
        if (!emailRgx.test(email)) {
            $('#erroremaillienhe').text('Email không đúng định dạng');
            $('#erroremaillienhe').css('display', 'unset');
            $('#txtemaillienhe').focus();
            checkValid = false;
        }
        if (email.length > 100) {
            $('#txtemaillienhe').focus();
            checkValid = false;
        }
    }
    else {
        $('#erroremaillienhe').text('Email không được để trống');
        $('#erroremaillienhe').css('display', 'unset');
        $('#txtemaillienhe').focus();
        checkValid = false;
    }

    if (ma == "") {
        $('#errormasinhvien').text('Mã sinh viên không được để trống');
        $('#errormasinhvien').css('display', 'unset');
        $('#txtMaSV').focus();
        checkValid = false;
    }
    else {
        if (charactersRgx.test(ma) == true) {
            $('#errormasinhvien').text('Họ tên không được chứa ký tự đặc biệt');
            $('#errormasinhvien').css('display', 'unset');
            $('#txtMaSV').focus();
            checkValid = false;
        }
        if (ma.length > 20) {
            $('#txtMaSV').focus();
            checkValid = false;
        }
    }

    if (lop == "") {
        $('#errorlop').text('Lớp hành chính không được để trống');
        $('#errorlop').css('display', 'unset');
        $('#txtLopHanhChinh').focus();
        checkValid = false;
    }
    else {
        if (lop.length > 100) {
            $('#txtLopHanhChinh').focus();
            checkValid = false;
        }
    }

    //#region Ngày sinh
    if (ngaySinh == "") {
        $('#errorngaysinh').text('Ngày sinh không được để trống');
        $('#errorngaysinh').css('display', 'unset');
        $('#txtngaysinh').focus();
        checkValid = false;
    }
    else {
        var date = ngaySinh.split("/");
        var isDate = new Date(date[2], date[1] - 1, date[0]);
        if (isDate.toString() == "Invalid Date") {
            $('#errorngaysinh').text('Ngày sinh không đúng định dạng');
            $('#errorngaysinh').css('display', 'unset');
            $('#txtngaysinh').focus();
            checkValid = false;
        }
    }

    if (hoTen == "") {
        $('#errorhoten').text('Họ tên không được để trống');
        $('#errorhoten').css('display', 'unset');
        $('#txthoten').focus();
        checkValid = false;
    }
    else {
        if (charactersRgx.test(hoTen) == true) {
            $('#errorhoten').text('Họ tên không được chứa ký tự đặc biệt');
            $('#errorhoten').css('display', 'unset');
            $('#txthoten').focus();
            checkValid = false;
        }
        if (hoTen.length > 100) {
            $('#txthoten').focus();
            checkValid = false;
        }
    }

    return { checkValid, mess }
}

function SaveThongTin() {
    var kiemtra = Validate();
    var f = document.getElementById('fDinhKem');
    if (kiemtra.checkValid == false) {
        toastr.error('Có thông tin chưa chính xác ! Vui lòng kiểm tra lại thông tin đã nhập');
    }
    else {
        var form = new FormData();
        form.append('ID', $('#id').val());
        form.append('IDHangMuc', $('#idHangMuc').val());
        form.append("MaHocSinh", $('#txtMaSV').val());
        form.append("HoTen", $('#txthoten').val());
        form.append("GioiTinh", $('input[name="Gender"]:checked').val());
        form.append("NgaySinh", $('#txtngaysinh').val());
        form.append("Lop", $('#txtLopHanhChinh').val());

        //Thông tin liên hệ
        form.append("SoDienThoai", $('#txtdienthoailienhe').val());
        form.append("Email", $('#txtemaillienhe').val());
        form.append("fileDinhKem", f);
        
       

        $.ajax({
            url: '/Home/SaveThongTin',
            data: form,
            type: 'post',
            dataType: 'json',
            contentType: false,
            processData: false,
            async: false,
            beforeSend: function () {
                $('body').addClass('loading');
            },
            complete: function () {
                $('body').removeClass('loading');
            },
            success: function (res) {
                if (res.status == true) {
                    $('#savethongtin').hide();

                    var mess = 'Thông tin đăng ký của bạn đã được tiếp nhận.  ' +
                        'Bạn có thể thực hiện tra cứu thông tin hồ sơ trên cổng thông tin.';

                    toastr.success(mess, '', { timeOut: 6000 });
                    setTimeout(function () {
                        window.location = '/Home/DanhSachCuocThi';
                    }, 1000);
                }
                else {
                    toastr.error(res.error);
                }
            },
            error: function () {

            }
        });
        
    }
}
