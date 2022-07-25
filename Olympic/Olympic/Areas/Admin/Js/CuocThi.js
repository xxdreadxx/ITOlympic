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
        document.getElementById('tieude').innerHTML = "Thêm mới cuộc thi";
        $('#addNewUser').modal('show');
    }
    else {
        document.getElementById('tieude').innerHTML = "Cập nhật thông tin cuộc thi";
        $.ajax({
            url: "/CuocThiAd/Edit",
            data: {
                id: id
            },
            type: 'post',
            success: function (result) {
                if (result.status == true) {
                    if (result.data.TrangThai == 3 || result.data.TrangThai == 2) {
                        toastr.error('Cuộc thi đã kết thúc hoặc đang triển khai, không thể sửa!', '', { timeOut: 2000 });
                        //setTimeout(function () {
                        //    window.location = '/Admin/HomeAd';
                        //}, 1000);
                    }
                    else {
                        $('#id').val(id);
                        $('#txtMa').val(result.data.MaCuocThi);
                        $('#txtBatDau').val(result.data.ThoiGianBatDau);
                        $('#txtBTC').val(result.data.BTC);
                        $('#txtGiaiThuong').val(result.data.GiaiTHuong);
                        $('#txtTen').val(result.data.TenCuocThi);
                        $('#txtNam').val(result.data.Nam);
                        $('#txtKetThuc').val(result.data.ThoiGianKetThuc);
                        $('#txtKinhPhi').val(result.data.KinhPhi);
                        $('#txtNoiDung').val(result.data.NoiDung);
                        if (result.data.TenFile != null && result.data.TenFile != "") {
                            var strtenfile = result.data.TenFile.split("/").pop();
                            if (strtenfile.length > 30) {
                                strtenfile = strtenfile.substring(0, 20) + "...";
                            }
                            $('#fileName').text(strtenfile);
                            $('#fileName').css('display', 'block');
                        }
                        $('#addNewUser').modal('show');
                    }
                }
            }
        });
    }
}

function resetForm() {
    $('#txtMa').val('');
    $('#txtBatDau').val('');
    $('#txtBTC').val('');
    $('#txtGiaiThuong').val('');
    $('#txtTen').val('');
    $('#txtNam').val('');
    $('#txtKetThuc').val('');
    $('#txtKinhPhi').val('');
    $('#txtNoiDung').val('');
    $('#errMa').hide();
    $('#errTGBD').hide();
    $('#errTen').hide();
    $('#errTGKT').hide();
    $('#fileError').hide();

    $('#btnChoose').val("");
    $('#fileName').text("Chọn tệp đính kèm");
}

$("#btnChoose").change(function () {
    var fileName = $(this).val().split("\\").pop();
    if (fileName.length > 20) {
        fileName = fileName.substring(0, 20) + "...";
    }
    $('#fileName').text(fileName);
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    readURL(this);
    if (fileName != "") {
        var extension = $(this).val().split("\\").pop().split('.').pop();
        if (extension != "pdf") {
            document.getElementById('fileError').innerHTML = "Vui lòng chọn file PDF";
            $('#fileError').show();
        } else {
            document.getElementById('fileError').innerHTML = "";
            $('#fileError').hide();
        }
    }
    else {
        $('#fileError').show();
    }
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
    }
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

$("#txtMa").keyup(function () {
    var ten = $('#txtMa').val().trim();
    if (ten != "") {
        $('#errMa').hide();
    }
    else {
        document.getElementById('errMa').innerHTML = "Chưa nhập mã cuộc thi";
        $('#errMa').show();
    }
})

$("#txtTen").keyup(function () {
    var ten = $('#txtTen').val().trim();
    if (ten != "") {
        $('#errUsername').hide();
    }
    else {
        document.getElementById('errTen').innerHTML = "Chưa nhập tên cuộc thi";
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
        if (checkDate(tgkt, false) == false) {
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
        if (checkDate(tgkt, false) == false) {
            document.getElementById('errTGBD').innerHTML = "Ngày tháng năm sai định dạng.";
            $('#errTGBD').show();
        }
        else {
            $('#errTGBD').hide();
        }
    }
})

function loadPartial() {
    $('#tableNguoiDung').load('/Admin/CuocThiAd/getList');
}

function Save() {
    var isSave = true;
    var ma = $('#txtMa').val().trim();
    var ten = $('#txtTen').val().trim();
    var tgbd = $('#txtBatDau').val();
    var tgkt = $('#txtKetThuc').val();
    var extension = $("#btnChoose").val().split('.').pop();
    if (extension != "pdf" && extension != "") {
        document.getElementById('fileError').innerHTML = "Vui lòng chọn file PDF";
        isSave = false;
        $('#fileError').show();
        return false;
    }
    else if (ten == "") {
        document.getElementById('errTen').innerHTML = "Chưa nhập tên cuộc thi";
        isSave = false;
        $('#errTen').show();
        return false;
    }
    else if (ma == "") {
        document.getElementById('errMa').innerHTML = "Chưa nhập mã cuộc thi";
        isSave = false;
        $('#errMa').show();
        return false;
    }
    if (tgbd == "") {
        document.getElementById('errTGBD').innerHTML = "Chưa nhập thời gian bắt đầu";
        isSave = false;
        $('#errTGBD').show();
        return false;
    }
    else {
        if (checkDate(tgkt, false) == false) {
            document.getElementById('errTGBD').innerHTML = "Ngày tháng năm sai định dạng.";
            isSave = false;
            $('#errTGBD').show();
            return false;
        }
        else {
            $('#errTGBD').hide();
        }
    }
    if (tgkt == "") {
        document.getElementById('errTGKT').innerHTML = "Chưa nhập thời gian kết thúc";
        isSave = false;
        $('#errTGKT').show();
        return false;
    }
    else {
        if (checkDate(tgkt, false) == false) {
            document.getElementById('errTGKT').innerHTML = "Ngày tháng năm sai định dạng.";
            isSave = false;
            $('#errTGKT').show();
            return false;
        }
        else {
            $('#errTGKT').hide();
        }
    }
    if (isSave == true) {
        SaveData();
    }
}

function SaveData() {
    var ma = $('#txtMa').val().trim();
    var ten = $('#txtTen').val().trim();
    var tgbd = $('#txtBatDau').val();
    var tgkt = $('#txtKetThuc').val();
    var id = $('#id').val();
    var formData = new FormData();
    formData.append("Ma", ma);
    formData.append("Ten", ten);
    formData.append("BTC", $('#txtBTC').val());
    formData.append("Cap", $('#dllCap').val());
    formData.append("GiaiThuong", $('#txtGiaiThuong').val());
    formData.append("KinhPhi", $('#txtKinhPhi').val());
    formData.append("NamHoc", $('#txtNam').val());
    var file = document.getElementById("btnChoose").files[0];
    formData.append("File", file);
    formData.append("NoiDung", $('#txtNoiDung').val());
    formData.append("TGBD", tgbd);
    formData.append("ID", id);
    formData.append("TGKT", tgkt);
    $.ajax({
        async: false,
        type: 'POST',
        url: "/CuocThiAd/Save",
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
                        message: "Thêm mới thành công cuộc thi",
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
                        message: "Cập nhật cuộc thi thành công",
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
            else {
                $('#errMa').text('Mã cuộc thi đã tồn tại');
                $('#errMa').show();
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
        $('#pnoidung').text('Bạn có muốn xóa cuộc thi đã chọn hay không?')
        $("#DeleteND").modal("show");
    }
}

function deleteOne() {

    if (idND != 0) {
        mangId = [];
        mangId.push(idND)
    }
    $.ajax({
        url: '/CuocThiAd/Delete',
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
        url: '/CuocThiAd/Delete',
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

function link(id) {
    $.ajax({
        url: "/CuocThiAd/checklink",
        data: {
            id: id
        },
        type: 'post',
        success: function (result) {
            if (result.status == true) {
                location.href = '/Admin/HangMuc/Index/' + id;
            }
            else {
                toastr.error('Cuộc thi chưa nhập lịch trình, không thể vào quản lý hạng mục thi!', '', { timeOut: 2000 });
            }
        }
    });
}