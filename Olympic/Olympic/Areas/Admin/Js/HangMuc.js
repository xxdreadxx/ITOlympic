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

function Add(id) {
    resetForm();
    $('#id').val(id);
    if (id == null || id == 0) {
        document.getElementById('tieude').innerHTML = "Thêm mới hạng mục thi";
    }
    else {
        document.getElementById('tieude').innerHTML = "Cập nhật thông tin hạng mục thi";
        $.ajax({
            url: "/HangMuc/Edit",
            data: {
                id: id
            },
            type: 'post',
            success: function (result) {
                if (result.status == true) {
                    $('#id').val(id);
                    $('#txtMa').val(result.data.MaHangMuc);
                    $('#txtTen').val(result.data.TenHangMuc);
                    $('#txtBatDau').val(result.data.ThoiGianBatDau);
                    $('#dllDoiTuong').val(result.data.DoiTuong).change();
                    $('#txtKetThuc').val(result.data.ThoiGianKetThuc);
                    $('#txtNoiDung').val(result.data.NoiDung);
                    $('#txtSoLuong').val(result.data.SoLuong);
                    $('#txtHinhThuc').val(result.data.HinhThucThi);
                    $('#txtGiaiThuong').val(result.data.GiaiThuong);
                    $('#txtNoiDung').val(result.data.NoiDungThi);
                }
            }
        });
    }
    $('#addNewUser').modal('show');
}

function resetForm() {
    $('#id').val(0);
    $('#txtMa').val('');
    $('#txtTen').val('');
    $('#txtBatDau').val('');
    $('#txtKetThuc').val('');
    $('#dllDoiTuong').val('1').change();
    $('#txtSoLuong').val(0);
    $('#txtGiaiThuong').val('');
    $('#txtHinhThuc').val('');
    $('#txtNoiDung').val('');
    $('#errMa').hide();
    $('#errTGBD').hide();
    $('#errTen').hide();
    $('#errTGKT').hide();
    $('#errSL').hide();
}

$("#txtMa").keyup(function () {
    var ten = $('#txtMa').val().trim();
    if (ten != "") {
        $('#errMa').hide();
    }
    else {
        document.getElementById('errMa').innerHTML = "Chưa nhập mã hạng mục thi";
        $('#errMa').show();
    }
})

$("#txtTen").keyup(function () {
    var ten = $('#txtTen').val().trim();
    if (ten != "") {
        $('#errTen').hide();
    }
    else {
        document.getElementById('errTen').innerHTML = "Chưa nhập tên hạng mục thi";
        $('#errTen').show();
    }
})

$("#txtKetThuc").keyup(function () {
    var tgkt = $('#txtKetThuc').val();
    if (tgkt == "") {
        document.getElementById('errTGKT').innerHTML = "Chưa nhập thời gian kết thúc";
        $('#errTGKT').show();
    }
    else {
        if (tgkt.length < 10) {
            document.getElementById('errTGKT').innerHTML = "Ngày tháng năm sai định dạng.";
            $('#errTGKT').show();
        }
        else {
            $('#errTGKT').hide();
        }
    }
})

$("#txtBatDau").keyup(function () {
    var tgkt = $('#txtBatDau').val();
    if (tgkt == "") {
        document.getElementById('errTGBD').innerHTML = "Chưa nhập thời gian bắt đầu";
        $('#errTGBD').show();
    }
    else {
        if (tgkt.length < 10) {
            document.getElementById('errTGBD').innerHTML = "Ngày tháng năm sai định dạng.";
            $('#errTGBD').show();
        }
        else {
            $('#errTGBD').hide();
        }
    }
})

$("#txtSoLuong").keyup(function () {
    var ten = $('#txtSoLuong').val();
    if (ten != "") {
        var SL = $('#txtSoLuong').val();
        if (SL <= 0) {
            document.getElementById('errSL').innerHTML = "Số lượng thành viên trong đội phải >0";
            $('#errSL').show();
        }
        else {
            $('#errSL').hide();
        }
    }
    else {
        document.getElementById('errSL').innerHTML = "Chưa nhập số lượng thành viên trong đội";
        $('#errSL').show();
    }
})

function loadPartial() {
    $('#tableNguoiDung').load('/Admin/HangMuc/getList');
}

function Save() {
    var isSave = false;
    var ma = $('#txtMa').val().trim();
    var doituong = $('#dllDoiTuong').val();
    var ten = $('#txtTen').val().trim();
    var tgbd = $('#txtBatDau').val();
    var tgkt = $('#txtKetThuc').val();
    var id = $('#id').val();
    if (ten == "") {
        isSave = false;
        document.getElementById('errTen').innerHTML = "Chưa nhập tên cuộc thi";
        $('#errTen').show();
    }
    if (ma == "") {
        isSave = false;
        document.getElementById('errMa').innerHTML = "Chưa nhập mã cuộc thi";
        $('#errMa').show();
    }
    else {
        $.ajax({
            url: "/HangMuc/checkMaHangMuc",
            data: {
                ma: ma,
                id: id
            },
            type: 'post',
            success: function (result) {
                if (result.status == false) {
                    isSave = false;
                    document.getElementById('errMa').innerHTML = "Mã hạng mục thi đã tồn tại";
                    $('#errMa').show();
                }
            }
        });
    }
    if (tgbd == "") {
        isSave = false;
        document.getElementById('errTGBD').innerHTML = "Chưa nhập thời gian bắt đầu";
        $('#errTGBD').show();
    }
    else {
        $.ajax({
            url: "/HangMuc/checkTG",
            data: {
                tg: tgbd
            },
            type: 'post',
            success: function (result) {
                if (result.status == true) {
                    $('#errTGBD').hide();
                    if (tgkt == "") {
                        isSave = false;
                        document.getElementById('errTGKT').innerHTML = "Chưa nhập thời gian kết thúc";
                        $('#errTGKT').show();
                    }
                    else {
                        $.ajax({
                            url: "/HangMuc/checkTG",
                            data: {
                                tg: tgkt
                            },
                            type: 'post',
                            success: function (result) {
                                if (result.status == true) {
                                    $('#errTGKT').hide();
                                    if (doituong == '1') {
                                        var sl1 = $('#txtSoLuong').val();
                                        if (sl1 != "") {
                                            var SL = $('#txtSoLuong').val();
                                            if (SL <= 0) {
                                                isSave = false;
                                                document.getElementById('errSL').innerHTML = "Số lượng thành viên trong đội phải >0";
                                                $('#errSL').show();
                                            }
                                            else {
                                                $('#errSL').hide();
                                                isSave = true;
                                            }
                                        }
                                        else {
                                            isSave = false;
                                            document.getElementById('errSL').innerHTML = "Chưa nhập số lượng thành viên trong đội";
                                            $('#errSL').show();
                                        }
                                    }
                                    else {
                                        isSave = true;
                                    }
                                }
                                else {
                                    isSave = false;
                                    document.getElementById('errTGKT').innerHTML = "Thời gian kết thúc phải nhỏ hơn hoặc bằng thời gian kết thúc thi trong lịch trình";
                                    $('#errTGKT').show();
                                }
                            }
                        });
                    }
                }
                else {
                    isSave = false;
                    document.getElementById('errTGBD').innerHTML = "Thời gian bắt đầu phải lớn hơn hoặc bằng thời gian bắt đầu thi trong lịch trình";
                    $('#errTGBD').show();
                }
            }
        });
    }

    setTimeout(function () {
        if (isSave == true) {
            SaveN(id);
        }
    }, 5000);
}

function SaveN(id) {
    var ma = $('#txtMa').val().trim();
    var doituong = $('#dllDoiTuong').val();
    var ten = $('#txtTen').val().trim();
    var tgbd = $('#txtBatDau').val();
    var tgkt = $('#txtKetThuc').val();
    var formData = new FormData();
    formData.append("Ma", ma);
    formData.append("Ten", ten);
    formData.append("DoiTuong", doituong);
    formData.append("GiaiThuong", $('#txtGiaiThuong').val());
    formData.append("HinhThuc", $('#txtHinhThuc').val());
    formData.append("NoiDung", $('#txtNoiDung').val());
    formData.append("SoLuong", $('#txtSoLuong').val());
    formData.append("TGBD", tgbd);
    formData.append("ID", id);
    formData.append("TGKT", tgkt);
    $.ajax({
        async: false,
        type: 'POST',
        url: "/HangMuc/Save",
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
                        message: "Thêm mới thành công hạng mục thi",
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
                        message: "Cập nhật hạng mục thi thành công",
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

var idND = "";
function Link_DeleteTT_onclick(DID) {
    idND = DID;
    if (idND != "" || idND == 0)//view popup xác nhận xóa
    {
        $('#pnoidung').text('Bạn có muốn xóa hạng mục thi đã chọn hay không?')
        $("#DeleteND").modal("show");
    }
}

function deleteOne() {

    if (idND != 0) {
        mangId = [];
        mangId.push(idND)
    }
    $.ajax({
        url: '/HangMuc/Delete',
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
        url: '/HangMuc/Delete',
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

$(document).ready(function () {
    $("#txtSearch").on('keyup', function () {
        var value = $(this).val().toLowerCase();
        $("#tblUser > tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) != -1)
        });
    });
});

function changeDoiTuong() {
    var doiTuong = $('#dllDoiTuong').val();
    if (doiTuong == 1) {
        document.getElementById('divSoLuong').style.display = 'block';
    }
    else {
        document.getElementById('divSoLuong').style.display = 'none';
        $('#txtSoLuong').val(0);
    }
}