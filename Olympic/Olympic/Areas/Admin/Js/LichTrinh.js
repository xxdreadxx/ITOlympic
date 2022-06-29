$(document).ready(function () {
    $('#liCuocThi').addClass('active');
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
        if (strDate == null || strDate == "") return true;
        else {
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
}

function DongY_ChonKyThi() {
    var idKyThi = $('#txtIDKyThi_ChonKyThi').val();
    if (idKyThi != 0) {
        $('#mdlChonKyThi').modal('hide')
        $('#modal_ThemSua_LichTrinh').modal('show')

    } else {
        $('#error').html('Vui lòng chọn cuộc thi');
        $('#error').css('display', 'block');
    }
}

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
                    if (result.data.Image != null && result.data.Image != "") {
                        document.getElementById("imgAvatar").src = result.data.Image;
                    }
                    else {
                        document.getElementById("imgAvatar").src = '/Content/Images/Avatars/images.png';
                    }
                    $('#NewEmail').val(result.data.Email);
                    $('#NewBirthday').val(result.ngaysinh);
                    $('#NewPhone').val(result.data.SDT);
                    $('#NewAddress').val(result.data.DiaChi);
                    if (result.data.GioiTinh == true) {
                        $('#NewGender_1').attr('checked', true)
                    }
                    else {
                        $('#NewGender_0').attr('checked', true)
                    }
                    if (result.data.trangthai == 1) {
                        $('#activeKH_1').attr('checked', true)
                    }
                    else {
                        $('#activeKH_0').attr('checked', true)
                    }
                }
            }
        });
    }
    $('#addNewUser').modal('show');
}

function resetForm() {
    $('#txtBatDauNhanHS').val('');
    $('#txtBatDauNhanTHi').val('');
    $('#txtDiaDiem').val('');
    $('#txtKetThucNhanHS').val('');
    $('#txtKetThucThi').val('');
    $('#txtCongBo').val('');
    $('#errCongBo').hide();
    $('#errTGKTThi').hide();
    $('#errTGKTHS').hide();
    $('#errDiaDiem').hide();
    $('#errTGBDThi').hide();
    $('#errTGBDHS').hide();
}

$("#txtBatDauNhanHS").keyup(function () {
    if ($('#txtBatDauNhanHS').val() != "" && $('#txtBatDauNhanHS').val() != null) {
        if (checkDate($('#txtBatDauNhanHS').val(), false) == false) {
            document.getElementById('errTGBDHS').innerHTML = "Ngày tháng năm sai định dạng.";
            $('#errTGBDHS').show();
        }
        else {
            $('#errTGBDHS').hide();
        }
    }
    else {
        document.getElementById('errTGBDHS').innerHTML = "Chưa nhập ngày bắt đầu nhận hồ sơ";
        $('#errTGBDHS').show();
    }
})
$("#txtBatDauNhanTHi").keyup(function () {
    if ($('#txtBatDauNhanTHi').val() != "" && $('#txtBatDauNhanTHi').val() != null) {
        if (checkDate($('#txtBatDauNhanTHi').val(), false) == false) {
            document.getElementById('errTGBDThi').innerHTML = "Ngày tháng năm sai định dạng.";
            $('#errTGBDThi').show();
        }
        else {
            $('#errTGBDThi').hide();
        }
    }
    else {
        document.getElementById('errTGBDThi').innerHTML = "Chưa nhập ngày bắt đầu thi";
        $('#errTGBDThi').show();
    }
})
$("#txtDiaDiem").keyup(function () {
    if ($('#txtDiaDiem').val() != "" && $('#txtDiaDiem').val() != null) {
        
        $('#errDiaDiem').hide();
        
    }
    else {
        document.getElementById('errDiaDiem').innerHTML = "Chưa nhập địa điểm thi";
        $('#errDiaDiem').show();
    }
})
$("#txtKetThucNhanHS").keyup(function () {
    if ($('#txtKetThucNhanHS').val() != "" && $('#txtKetThucNhanHS').val() != null) {
        if (checkDate($('#txtBatDauNhanTHi').val(), false) == false) {
            document.getElementById('errTGKTHS').innerHTML = "Ngày tháng năm sai định dạng.";
            $('#errTGKTHS').show();
        }
        else {
            $('#errTGKTHS').hide();
        }
    }
    else {
        document.getElementById('errTGKTHS').innerHTML = "Chưa nhập ngày kết thúc nhận hồ sơ";
        $('#errTGKTHS').show();
    }
})
$("#txtKetThucThi").keyup(function () {
    if ($('#txtKetThucThi').val() != "" && $('#txtKetThucThi').val() != null) {
        if (checkDate($('#txtKetThucThi').val(), false) == false) {
            document.getElementById('errTGKTThi').innerHTML = "Ngày tháng năm sai định dạng.";
            $('#errTGKTThi').show();
        }
        else {
            $('#errTGKTThi').hide();
        }
    }
    else {
        document.getElementById('errTGKTThi').innerHTML = "Chưa nhập ngày kết thúc thi";
        $('#errTGKTThi').show();
    }
})