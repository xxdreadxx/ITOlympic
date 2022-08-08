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
        document.getElementById('tieude').innerHTML = "Thêm mới đội tuyển";
    }
    else {
        document.getElementById('tieude').innerHTML = "Cập nhật thông tin đội tuyển";
        $.ajax({
            url: "/NguoiThi/Edit",
            data: {
                id: id
            },
            type: 'post',
            success: function (result) {
                if (result.status == true) {
                    $('#id').val(id);
                    $('#txtMa').val(result.data.MaDoi);
                    $('#txtTen').val(result.data.TenDoi);
                    $('#dllHM').val(result.data.ID_HangMuc).change();
                    $('#dllHLV').val(result.data.ID_HLV).change();
                    $('#addNewUser').modal('show');
                }
                else {
                    alert('Quá ngày đăng kí, không được sửa');
                }
            }
        });
    }
    $('#addNewUser').modal('show');
}

function resetForm() {
    $('#txtMa').val('');
    $('#txtTen').val('');
    $('#errMa').hide();
    $('#errTen').hide();
    $('#errTenHLV').hide();
}

$("#txtMa").keyup(function () {
    var ten = $('#txtMa').val().trim();
    if (ten != "") {
        $('#errMa').hide();
    }
    else {
        document.getElementById('errMa').innerHTML = "Chưa nhập mã đội tuyển";
        $('#errMa').show();
    }
})

$("#txtTen").keyup(function () {
    var ten = $('#txtTen').val().trim();
    if (ten != "") {
        $('#errUsername').hide();
    }
    else {
        document.getElementById('errTen').innerHTML = "Chưa nhập tên đội tuyển";
        $('#errTen').show();
    }
})

function loadPartial() {
    $('#tableNguoiDung').load('/Admin/NguoiThi/getListDoiThi');
}

function Save() {
    var IDCuocThi = $('#hdIDCuocThi').val();
    var IDHLV = $('#dllHLV').val();
    var IDHM = $('#dllHM').val();
    var isSave = true;
    var ma = $('#txtMa').val().trim();
    var ten = $('#txtTen').val().trim();
    var id = $('#id').val();
    if (ten == "") {
        isSave = false;
        document.getElementById('errTen').innerHTML = "Chưa nhập tên đội tuyển";
        $('#errTen').show();
    }
    if (ma == "") {
        isSave = false;
        document.getElementById('errMa').innerHTML = "Chưa nhập mã đội tuyển";
        $('#errMa').show();
    }
    else {
        $.ajax({
            url: "/NguoiThi/checkHLV",
            data: {
                IDHLV: IDHLV,
                IDCuocThi: IDCuocThi
            },
            type: 'post',
            success: function (result) {
                if (result.status == false) {
                    isSave = false;
                    document.getElementById('errHLV').innerHTML = "Huấn luyện viên này đã thuộc đội tuyển khác";
                    $('#errHLV').show();
                }
            }
        });
    }

    if (isSave == true) {
        var formData = new FormData();
        formData.append("Ma", ma);
        formData.append("Ten", ten);
        formData.append("IDHangMuc", IDHM);
        formData.append("IDHLV", IDHLV);
        formData.append("ID", id);
        $.ajax({
            async: false,
            type: 'POST',
            url: "/NguoiThi/SaveDoiThi",
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
                            message: "Thêm mới thành công đội tuyển",
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
                            message: "Cập nhật đội tuyển thành công",
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
        $('#pnoidung').text('Bạn có muốn xóa đội tuyển đã chọn hay không?')
        $("#DeleteND").modal("show");
    }
}

function deleteOne() {

    if (idND != 0) {
        mangId = [];
        mangId.push(idND)
    }
    $.ajax({
        url: '/NguoiThi/DeleteDoiTuyen',
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
        url: '/NguoiThi/DeleteDoiTuyen',
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

function DSTV(id) {
    getListMember(id);
    $('#divMember').modal('show');
}

function getListMember(id) {
    $.ajax({
        url: "/NguoiThi/getDSSVTrongDoiThi",
        data: {
            id: id
        },
        type: 'post',
        success: function (result) {
            if (result.status == true) {
                $('#txtMaHM').val(result.dataHM.MaHangMuc);
                $('#idHM').val(result.dataHM.ID);
                $('#hdID_DoiThi').val(id);
                $('#HM_SL').val(result.dataHM.SoLuong);
                $('#HM_SLHienTai').val(result.totalCount);
                $('#txtHMTGBD').val(result.dataHM.ThoiGianBatDau);
                $('#txtTenHM').val(result.dataHM.TenHangMuc);
                $('#txtHMTGKT').val(result.dataHM.ThoiGianKetThuc);
                var html = '';
                var stt = 0;
                $.each(result.data, function (i, item) {
                    stt++;
                    if (item.Diem == null) {
                        html += '<tr id=\"trlstMem_' + item.ID + '\"><td>' + stt + '</td><td>' + item.MaSV + '</td><td>' + item.TenSV + '</td><td>' + item.Lop + '</td><td><input type="text" value="0" onchange="changeDiem(' + item.ID + ')" id="txtDiem_' + item.ID + '" /></td><td><a href=\"#\" title=\"Xóa\" type=\"button\" onclick=\"DelMember(' + item.ID_SV + ', ' + item.ID + ')\"><i class=\"ti-trash\"></i></a></td></tr>';
                    }
                    else {
                        html += '<tr id=\"trlstMem_' + item.ID + '\"><td>' + stt + '</td><td>' + item.MaSV + '</td><td>' + item.TenSV + '</td><td>' + item.Lop + '</td><td><input type="text" value="' + item.Diem + '" onchange="changeDiem(' + item.ID + ')" id="txtDiem_' + item.ID + '" /></td><td><a href=\"#\" title=\"Xóa\" type=\"button\" onclick=\"DelMember(' + item.ID_SV + ', ' + item.ID + ')\"><i class=\"ti-trash\"></i></a></td></tr>';
                    }
                });
                $('#tblMember').html(html);
            }
            else {
                $('#txtMaHM').val(result.dataHM.MaHangMuc);
                $('#idHM').val(result.dataHM.ID);
                $('#hdID_DoiThi').val(id);
                $('#HM_SL').val(result.dataHM.SoLuong);
                $('#HM_SLHienTai').val(result.totalCount);
                $('#txtHMTGBD').val(result.dataHM.ThoiGianBatDau);
                $('#txtTenHM').val(result.dataHM.TenHangMuc);
                $('#txtHMTGKT').val(result.dataHM.ThoiGianKetThuc);
                var html = '';
                var stt = 0;
                $.each(result.data, function (i, item) {
                    stt++;
                    if (item.Diem == null) {
                        html += '<tr id=\"trlstMem_' + item.ID + '\"><td>' + stt + '</td><td>' + item.MaSV + '</td><td>' + item.TenSV + '</td><td>' + item.Lop + '</td><td><input type="text" value="0" disable onchange="changeDiem(' + item.ID + ')" id="txtDiem_' + item.ID + '" /></td><td><a href=\"#\" title=\"Xóa\" type=\"button\" onclick=\"DelMember(' + item.ID_SV + ', ' + item.ID + ')\"><i class=\"ti-trash\"></i></a></td></tr>';
                    }
                    else {
                        html += '<tr id=\"trlstMem_' + item.ID + '\"><td>' + stt + '</td><td>' + item.MaSV + '</td><td>' + item.TenSV + '</td><td>' + item.Lop + '</td><td><input type="text" disable value="' + item.Diem + '" onchange="changeDiem(' + item.ID + ')" id="txtDiem_' + item.ID + '" /></td><td><a href=\"#\" title=\"Xóa\" type=\"button\" onclick=\"DelMember(' + item.ID_SV + ', ' + item.ID + ')\"><i class=\"ti-trash\"></i></a></td></tr>';
                    }
                });
                $('#tblMember').html(html);
            }
        }
    });
}

$('#btnAddSV').on('click', function () {
    var idDoiThi = $('#hdID_DoiThi').val();
    var SoLuongMax = $('#HM_SL').val();
    var SoLuongHT = $('#HM_SLHienTai').val();
    if (parseInt(SoLuongHT) >= parseInt(SoLuongMax)) {
        toastr.error('Số lượng thành viên trong đội đã đủ'); return false;
    }
    else {
        getlstHSTruong(idDoiThi);
        $('#divLSTSV').modal('show');
    }
});

function getlstHSTruong(id) {
    $.ajax({
        url: "/NguoiThi/getDSSVChuaDKThi",
        data: {
            id: id
        },
        type: 'post',
        success: function (result) {
            if (result.status == true) {
                var html = '';
                var stt = 0;
                $.each(result.data, function (i, item) {
                    stt++;
                    html += '<tr id=\"trlstSV_' + item.ID + '\"><td style=\"text-align: center\">' + stt + '</td><td>' + item.MaSV + '</td><td>' + item.HoTen + '</td><td>' + item.Lop + '</td><td><a href=\"#\" title=\"Thêm\" type=\"button\" onclick=\"AddSV(' + item.ID + ')\"><i class=\"ti-check\"></i></a></td></tr>';
                });
                $('#tbllstSV').html(html);
            }
        }
    });
}

function AddSV(id) {
    var idDoiThi = $('#hdID_DoiThi').val();
    var SoLuongMax = $('#HM_SL').val();
    var SoLuongHT = $('#HM_SLHienTai').val();
    if (parseInt(SoLuongHT) >= parseInt(SoLuongMax)) {
        toastr.error('Số lượng thành viên trong đội đã đủ'); return false;
    }
    else {
        $.ajax({
            url: "/NguoiThi/addSVToDoiThi",
            data: {
                idSV: id,
                idDoiThi: idDoiThi
            },
            type: 'post',
            success: function (result) {
                $('#trlstSV_' + id).hide();
                getListMember(idDoiThi);
            }
        });
        
    }
}

function DelMember(id, id1) {
    var idDoiThi = $('#hdID_DoiThi').val();
    $.ajax({
        url: "/NguoiThi/delSVFromDoiThi",
        data: {
            IDSV: id,
            IDDoiThi: idDoiThi
        },
        type: 'post',
        success: function (result) {
            $('#trlstMem_' + id1).hide();
            var slsv = result.countSV;
            $('#HM_SLHienTai').val(slsv);
        }
    });
}

function changeDiem(id) {
    var diem = $('#txtDiem_' + id).val();
    $.ajax({
        url: "/NguoiThi/changeDiem",
        data: {
            id: id,
            Diem: diem
        },
        type: 'post',
        success: function (result) {
            if (result.status == true) {
                toastr.success('Nhập điểm thành công', '', { timeOut: 1000 });
            }
        }
    });
}

function AddKQ(id) {
    $.ajax({
        url: "/NguoiThi/EditTT",
        data: {
            id: id
        },
        type: 'post',
        success: function (result) {
            $('#txtKQ_TenHM').val(result.data.TenHangMuc);
            $('#txtKQ_TenHLV').val(result.data.HLV);
            $('#txtKQ_TenDoiTuyen').val(result.data.TenDoi);
            $('#txtKQ_SL').val(result.data.SoLuong);
            $('#hdID_DoiThi_KQ').val(id);
            $('#txtKQ_KetQua').val(result.data.KetQua);
        }
    });
    $('#divAddKQ').modal('show');
}

function SaveKQ() {
    var id = $('#hdID_DoiThi_KQ').val();
    var kq = $('#txtKQ_KetQua').val();
    var formdata = new FormData();
    formdata.append('id', id);
    formdata.append('kq', kq);
    $.ajax({
        async: false,
        type: 'POST',
        url: "/NguoiThi/SaveKQ",
        data: formdata,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.status == true) {
                $('#addNewUser').modal('hide');
                bootbox.alert({
                    title: "Thông báo",
                    message: "Cập nhật kết quả thành công",
                    buttons: {
                        ok: {
                            label: 'Đóng',
                            className: "btn btn-default",
                        }
                    },
                    callback: function () {
                        location.reload();
                    }
                })
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function Duyet(id) {
    $.ajax({
        url: "/NguoiThi/DuyetTSThiCaNhan",
        data: {
            id: id
        },
        type: 'post',
        success: function (result) {
            if (result.status == true) {
                toastr.success('Duyệt thành công', '', { timeOut: 2000 });
                setTimeout(function () {
                    document.getElementById("idtrDK_" + id).style.display = "none";
                }, 100);
                html = '';
                html += '<tr data-id="' + result.data.ID + '" id="idtr_' + result.data.IDHM_SV + '"><td class="text-center"><input type="checkbox" autocomplete="off" class="one-delete-js" /></td><td class="text-left">' + result.data.SoBaoDanh + '</td><td class="text-left">' + result.data.HoTen+'</td>';
                html += '<td class="text-center">' + result.data.TenHangMuc + '</td><td class="text-center"><input value="" onchange="changeDiem(' + item.IDHM_SV + ')" id="txtDiem_' + result.data.IDHM_SV + '" /></td><td class="text-center"><input value="" onchange="changeGT(' + item.IDHM_SV + ')" id="inpGT_' + result.data.IDHM_SV+'" /></td>';
                html += '</td><td style="text-align:center"><a href="#" title="Xóa" onclick="DelSVThiCN(' + result.data.ID+')"><i class="ti-trash"></i></a></td></tr>';
                $('#body_DSThiCN').append(html);
            }
        }
    });
    loadPartial();
}

function changeGT(id) {
    var kq = $('#inpGT_' + id).val();
    $.ajax({
        url: "/NguoiThi/changeKQ",
        data: {
            id: id,
            kq: kq
        },
        type: 'post',
        success: function (result) {
            if (result.status == true) {
                toastr.success('Nhập kết quả thi thành công', '', { timeOut: 1000 });
            }
        }
    });
}

function DelSVThiCN(id) {
    var IDCuocThi = $('#hdIDCuocThi').val();
    $.ajax({
        url: "/NguoiThi/DelSVThiCN",
        data: {
            IDSVHM: id,
            IDCuocThi: IDCuocThi
        },
        type: 'post',
        success: function (result) {
            if (result.status == true) {
                $('#trlstMem_' + id1).hide();
            }
            else {
                toastr.error('Sinh viên đang tham gia dự thi không thể xóa'); 
            }
        }
    });
}

function closeF() {
    loadPartial();
}