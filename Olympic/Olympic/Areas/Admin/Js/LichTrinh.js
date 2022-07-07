$(document).ready(function () {
    $('#liCuocThi').addClass('active');
});

$(document).ready(function () {
    $("#txtSearch").on('keyup', function () {
        var value = $(this).val().toLowerCase();
        $("#tblUser > tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) != -1)
        });
    });
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
        Add(0, idKyThi);

    } else {
        $('#error').html('Vui lòng chọn cuộc thi');
        $('#error').css('display', 'block');
    }
}

function Add(id, idKyThi) {
    resetForm();
    if (id == null || id == 0) {
        document.getElementById('tieude').innerHTML = "Thêm mới lịch trình";
        $.ajax({
            url: "/LichTrinh/getDataCuocThi",
            data: {
                id: idKyThi
            },
            type: 'get',
            success: function (result) {
                if (result.status == true) {
                    $('#txtBatDauNhanHS').val(result.data.ThoiGianBatDauNhanHS);
                    $('#txtCongBo').val(result.data.ThoiGianCongBoDiem);
                }
            }
        });
    }
    else {
        document.getElementById('tieude').innerHTML = "Cập nhật thông tin lịch trình";
        $.ajax({
            url: "/LichTrinh/Edit",
            data: {
                id: id
            },
            type: 'post',
            success: function (result) {
                if (result.status == true) {
                    $('#id').val(id);
                    $('#txtBatDauNhanHS').val(result.data.ThoiGianBatDauNhanHoSo);
                    $('#txtBatDauNhanTHi').val(result.data.ThoiGianBatDauThi);
                    $('#txtDiaDiem').val(result.data.DiaDiemThi);
                    $('#txtKetThucNhanHS').val(result.data.ThoiGianKetThucNhanHoSo);
                    $('#txtKetThucThi').val(result.data.ThoiGianKetThucThi);
                    $('#txtBatDauChamDiem').val(result.data.ThoiGianBatDauChamDiem);
                    $('#txtKetThuChamDiem').val(result.data.ThoiGianKetThucChamDiem);
                    $('#txtCongBo').val(result.data.ThoiGianCongBoKetQua);
                }
            }
        });
    }
    $('#modal_ThemSua_LichTrinh').modal('show');
}

function resetForm() {
    $('#txtBatDauNhanHS').val('');
    $('#txtBatDauNhanTHi').val('');
    $('#txtDiaDiem').val('');
    $('#txtKetThucNhanHS').val('');
    $('#txtKetThucThi').val('');
    $('#txtBatDauChamDiem').val('');
    $('#txtKetThuChamDiem').val('');
    $('#txtCongBo').val('');
    $('#errCongBo').hide();
    $('#errTGKTThi').hide();
    $('#errTGBDChamDiem').hide();
    $('#errTGKTChamDiem').hide();
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
    if ($('#txtDiaDiem').val().trim() != "" && $('#txtDiaDiem').val().trim() != null) {
        
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
$("#txtCongBo").keyup(function () {
    if ($('#txtCongBo').val() != "" && $('#txtCongBo').val() != null) {
        if (checkDate($('#txtCongBo').val(), false) == false) {
            document.getElementById('errCongBo').innerHTML = "Ngày tháng năm sai định dạng.";
            $('#errCongBo').show();
        }
        else {
            $('#errCongBo').hide();
        }
    }
    else {
        document.getElementById('errCongBo').innerHTML = "Chưa nhập ngày công bố kết quả";
        $('#errCongBo').show();
    }
})

function loadPartial() {
    $('#tableNguoiDung').load('/Admin/LichTrinh/getList');
}

function Save() {
    var isSave = false;
    var bdhs = $('#txtBatDauNhanHS').val();
    var kths = $('#txtKetThucNhanHS').val();
    var bdthi = $('#txtBatDauNhanTHi').val();
    var ktthi = $('#txtKetThucThi').val();
    var btcd = $('#txtBatDauChamDiem').val();
    var ktcd = $('#txtKetThuChamDiem').val();
    var diadiem = $('#txtDiaDiem').val().trim();
    var tgcongbo = $('#txtCongBo').val();
    var id = $('#id').val();
    var idCuocThi = $('#txtIDKyThi_ChonKyThi').val();

    if (bdhs == "") {
        isSave = false;
        document.getElementById('errTGBDHS').innerHTML = "Chưa nhập ngày bắt đầu nhận hồ sơ";
        $('#errTGBDHS').show();
    }
    else {
        if (checkDate(bdhs, false) == false) {
            document.getElementById('errTGBDHS').innerHTML = "Ngày tháng năm sai định dạng.";
            $('#errTGBDHS').show();
            isSave = false;
        }
    }

    if (kths == "") {
        isSave = false;
        document.getElementById('errTGKTHS').innerHTML = "Chưa nhập ngày kết thúc nhận hồ sơ";
        $('#errTGKTHS').show();
    }
    else {
        if (checkDate(kths, false) == false) {
            document.getElementById('errTGKTHS').innerHTML = "Ngày tháng năm sai định dạng.";
            $('#errTGKTHS').show();
            isSave = false;
        }
    }

    if (bdthi == "") {
        isSave = false;
        document.getElementById('errTGBDThi').innerHTML = "Chưa nhập ngày bắt đầu thi";
        $('#errTGBDThi').show();
    }
    else {
        if (checkDate(bdhs, false) == false) {
            document.getElementById('errTGBDThi').innerHTML = "Ngày tháng năm sai định dạng.";
            $('#errTGBDThi').show();
            isSave = false;
        }
    }

    if (ktthi == "") {
        isSave = false;
        document.getElementById('errTGKTThi').innerHTML = "Chưa nhập ngày kết thúc thi";
        $('#errTGKTThi').show();
    }
    else {
        if (checkDate(ktthi, false) == false) {
            document.getElementById('errTGKTThi').innerHTML = "Ngày tháng năm sai định dạng.";
            $('#errTGKTThi').show();
            isSave = false;
        }
    }

    if (btcd == "") {
        isSave = false;
        document.getElementById('errTGBDBChamDiem').innerHTML = "Chưa nhập ngày bắt đầu chấm điểm";
        $('#errTGBDBChamDiem').show();
    }
    else {
        if (checkDate(btcd, false) == false) {
            document.getElementById('errTGBDHS').innerHTML = "Ngày tháng năm sai định dạng.";
            $('#errTGBDHS').show();
            isSave = false;
        }
    }

    if (ktcd == "") {
        isSave = false;
        document.getElementById('errTGKTChamDiem').innerHTML = "Chưa nhập ngày kết thúc chấm điểm";
        $('#errTGKTChamDiem').show();
    }
    else {
        if (checkDate(ktcd, false) == false) {
            document.getElementById('errTGKTChamDiem').innerHTML = "Ngày tháng năm sai định dạng.";
            $('#errTGKTChamDiem').show();
            isSave = false;
        }
    }

    if (tgcongbo == "") {
        isSave = false;
        document.getElementById('errCongBo').innerHTML = "Chưa nhập ngày công bố kết quả";
        $('#errCongBo').show();
    }
    else {
        if (checkDate(tgcongbo, false) == false) {
            document.getElementById('errCongBo').innerHTML = "Ngày tháng năm sai định dạng.";
            $('#errCongBo').show();
            isSave = false;
        }
    }

    if (diadiem == "") {
        document.getElementById('errDiaDiem').innerHTML = "Chưa nhập địa điểm thi";
        $('#errDiaDiem').show();
    }

    if (isSave == true) {
        var formData = new FormData();
        formData.append("TGBDNhanHoSo", bdhs);
        formData.append("TGBDKTNhanHoSo", kths);
        formData.append("TGBDThi", bdthi);
        formData.append("TGKTThi", ktthi);
        formData.append("TGBDChamDiem", btcd);
        formData.append("TGKTChamDiem", ktcd);
        formData.append("DiaDiem", diadiem);
        formData.append("TGCongBo", tgcongbo);
        formData.append("ID", id);
        formData.append("IDCuocThi", idCuocThi);

        $.ajax({
            async: false,
            type: 'POST',
            url: "/LichTrinh/Save",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.status == true) {
                    $('#modal_ThemSua_LichTrinh').modal('hide');
                    if (id == 0) {
                        bootbox.alert({
                            title: "Thông báo",
                            message: "Thêm mới thành công lịch trình",
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
                            message: "Cập nhật thành công lịch trình",
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
    if (idND != "" || idND == 0)//view popup xác nhận xóa
    {
        $('#pnoidung').text('Bạn có muốn xóa lịch trình đã chọn hay không?')
        $("#DeleteND").modal("show");
    }
}

function deleteOne() {

    if (idND != 0) {
        mangId = [];
        mangId.push(idND)
    }
    $.ajax({
        url: '/LichTrinh/Delete',
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
        url: '/LichTrinh/Delete',
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

function ChonKyThi_LichTrinh() {
    $.ajax({
        url: '/HomeAd/GetCuocThiChuaTaoLichTrinh',
        success: function (res) {
            var selectCuocThi = $('#txtKyThi_ChonKyThi');
            var op = "<option value=0>Chọn cuộc thi</option>";
            $.each(res.data, function (i, item) {
                op += '<option value=' + item.ID + '>' + item.TenCuocThi + '</option>'
            });
            selectCuocThi.html(op);
        }
    });
    $('#mdlChonKyThi').modal('show');
}