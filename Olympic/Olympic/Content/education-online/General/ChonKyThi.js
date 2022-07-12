$(document).ready(function () {
    $('body').on('click', '#columnsListDropDown li label', function (event) {
        event.stopPropagation();
    });
});

//Gọi modal chọn kỳ thi
function ChonKyThi(url) {
    $('#txtUrl_ChonKyThi').val(url);
    if (url == '/ts_lophoc/Index') {
        $('#txtDoiTuong_ChonKyThi').hide();
    } else {
        $('#txtDoiTuong_ChonKyThi').show();
    }
    // Cấp
    var doituong = parseInt($('#txtCap').val());
    // Thông tin về trường và kỳ thi trong module quản lí hồ sơ
    var idKyThi = $('#txtKyThi').data('id');
    var idTruong = $('#txtTruong').data('id');
    var idDoiTuong = $('#txtDTUT').data('id');
    var capHoc_DangChon = $('#txtCapHoc_ChonKyThi').val();
    // Nếu đang ở trong module quản lí hồ sơ thì gán thông tin ngược lại modal để hỗ trợ chuyển loại hồ sơ
    if (typeof (idKyThi) != 'undefined' && typeof (idTruong) != 'undefined' && typeof (idDoiTuong) != 'undefined') {
        // Id kỳ thi
        $('#txtIDKyThi_ChonKyThi').val(idKyThi);
        // Id trường
        $('#txtIDTruong_ChonKyThi').val(idTruong);
        // Id đối tượng
        $('#txtIDDoiTuong_ChonKyThi').val(idDoiTuong);
    }

    //Lấy danh sách kỳ thi
    $.ajax({
        url: '/HomeTuyenSinh/LayThongTin_Modal_KyTuyenSinh',
        data:
        {
            loaithongtin: "listTruong,listKyThi,listDTUT,kythi",
            idKyThi, idTruong, idDoiTuong, capHoc_DangChon
        },
        success: function (res) {
            //#region Trường
            if (doituong == 4 || doituong == 5) {
                let listTruong = res.listTruong;
                var html_lstTruong = ' <option value="0" >Chọn trường</option>';
                $.each(listTruong, function (i, truong) {
                    if (idTruong == truong.ID) {
                        html_lstTruong += '<option value="' + truong.ID + '" data-cap="' + truong.Cap + '" selected>' + truong.TenTruong + '</option>';
                    } else {
                        html_lstTruong += '<option value="' + truong.ID + '" data-cap="' + truong.Cap + '">' + truong.TenTruong + '</option>';
                    }
                });
                $('#txtTruong_ChonKyThi').html(html_lstTruong);
            }
            //#endregion

            //#region Kỳ thi
            let listKyThi = res.listKyThi;
            let html_lstKyThi = ' <option value="0" >Chọn kỳ tuyển sinh</option>';
            $.each(listKyThi, function (i, kythi) {
                if (idKyThi == kythi.ID) {
                    html_lstKyThi += '<option value="' + kythi.ID + '" selected>' + kythi.TenKyThi + '</option>';
                } else {
                    html_lstKyThi += '<option value="' + kythi.ID + '">' + kythi.TenKyThi + '</option>';
                }
            });
            $('#txtKyThi_ChonKyThi').html(html_lstKyThi);
            //#endregion

            //#region Đối tượng ưu tiên
            let listDTUT = res.listDTUT;
            let html_lstDTUT = ' <option value="0" >Chọn đối tượng ưu tiên</option>';
            $.each(listDTUT, function (i, nhom_dtut) {
                //html_lstDTUT += '<option disabled>' + nhom_dtut.TenLoai + '</option>';
                $.each(nhom_dtut.lstDanhSach, function (i, dtut) {
                    if (idDoiTuong == dtut.ID) {
                        html_lstDTUT += '<option value="' + dtut.ID + '" selected>' + dtut.Ma + '-' + dtut.Ten + '</option>';

                    } else {
                        html_lstDTUT += '<option value="' + dtut.ID + '">' + dtut.Ma + '-' + dtut.Ten + '</option>';
                    }
                });
            });
            $('#txtDoiTuong_ChonKyThi').html(html_lstDTUT);

            $('#txtDoiTuong_ChonKyThi').select2({
                minimumResultsForSearch: -1
            });
            //#endregion

            //#region Kỳ thi
            let kythi = res.kythi;
            $('#txtIDKyThi_ChonKyThi').val(kythi == null ? 0 : kythi.ID);

            $('#txtMa_ChonKyThi').html(kythi == null ? "" : kythi.MaKyThi);
            $('#txtTen_ChonKyThi').htmlkythi == null ? "" : (kythi.TenKyThi);
            $('#txtNgayBD_ChonKyThi').html(kythi == null ? "" : kythi.ThoiGianBatDauThi);
            //#endregion
        }
    })
    $('#mdlChonKyThi').modal('show');
}
// Reset kiểm tra
function Reset_Kiemtra() {
    $('#error').html('')
    $('#error').css('display', 'none');
}
// Kiểm tra trống
function Kiemtra_Trong(capTruong, idTruong, idKyThi) {
    Reset_Kiemtra();
    var trangthai = true;
    if (capTruong == 4) {
        if (idTruong == 0) {
            $('#error').html('Vui lòng chọn trường')
            $('#error').css('display', 'block');
            trangthai = false;
            if (idKyThi == 0) {
                $('#error').html('Vui lòng chọn trường và kỳ tuyển sinh')
                $('#error').css('display', 'block');
                trangthai = false;
            }
        } else {
            if (idKyThi == 0) {
                $('#error').html('Vui lòng chọn kỳ tuyển sinh')
                $('#error').css('display', 'block');
                trangthai = false
            }
        }
        return trangthai;
    }
    if (idKyThi == 0) {
        $('#error').html('Vui lòng chọn kỳ tuyển sinh')
        $('#error').css('display', 'block');
        trangthai = false
    }
    return trangthai;
}
//Sự kiện nút đồng ý của chọn kỳ thi
function DongY_ChonKyThi() {
    // Cấp
    var capTruong = parseInt($('#txtCapHoc_ChonKyThi').val());
    // Id kỳ thi
    var idKyThi = parseInt($('#txtIDKyThi_ChonKyThi').val());
    // Id trường
    var idTruong = parseInt($('#txtIDTruong_ChonKyThi').val());
    // Id đối tượng
    var idDoiTuong = parseInt($('#txtIDDoiTuong_ChonKyThi').val());
    var url = $('#txtUrl_ChonKyThi').val();

    // Kiểm tra trống
    var kiemtra = Kiemtra_Trong(capTruong, idTruong, idKyThi);
    if (kiemtra) {
        $('#mdlChonKyThi').modal('hide');
        window.location = url + '?idKyThi=' + idKyThi + '&idTruong=' + idTruong + '&idDoiTuong=' + idDoiTuong + '&capTruong=' + capTruong;
    }
};
//Lấy danh sách môn thi và hệ số của kỳ thi
function Get_IDKyThi() {
    $('#error').html('')
    $('#error').css('display', 'none');
    var idKyThi = parseInt($('#txtKyThi_ChonKyThi').val());
    $.ajax({
        url: '/HomeTuyenSinh/LayThongTin_Modal_KyTuyenSinh',
        data:
        {
            loaithongtin: "kythi",
            idKyThi
        }, success: function (res) {
            let kythi = res.kythi;
            $('#txtIDKyThi_ChonKyThi').val(kythi.ID);

            $('#txtMa_ChonKyThi').html(kythi.MaKyThi);
            $('#txtTen_ChonKyThi').html(kythi.TenKyThi);
            $('#txtNgayBD_ChonKyThi').html(kythi.ThoiGianBatDauThi);
            $('#txtNgayKT_ChonKyThi').html(kythi.ThoiGianKetThucThi);
        }
    })
}
function Get_CapHoc() {
    var capHoc_DangChon = $('#txtCapHoc_ChonKyThi').val();
    var idTruong = $('#txtTruong_ChonKyThi').val();
    $.ajax({
        url: '/HomeTuyenSinh/LayThongTin_Modal_KyTuyenSinh',
        data:
        {
            loaithongtin: "listTruong,listKyThi,kythi",
            capHoc_DangChon
        },
        success: function (res) {
            //#region Trường
            let listTruong = res.listTruong;
            var html_lstTruong = ' <option value="0" >Chọn trường</option>';
            $.each(listTruong, function (i, truong) {
                if (idTruong == truong.ID) {
                    html_lstTruong += '<option value="' + truong.ID + '" data-cap="' + truong.Cap + '" selected>' + truong.TenTruong + '</option>';
                } else {
                    html_lstTruong += '<option value="' + truong.ID + '" data-cap="' + truong.Cap + '">' + truong.TenTruong + '</option>';
                }
            });
            $('#txtTruong_ChonKyThi').html(html_lstTruong);
            //#endregion

            //#region Kỳ thi
            let listKyThi = res.listKyThi;
            let html_lstKyThi = ' <option value="0" >Chọn kỳ tuyển sinh</option>';
            $.each(listKyThi, function (i, kythi) {
                if (idKyThi == kythi.ID) {
                    html_lstKyThi += '<option value="' + kythi.ID + '" selected>' + kythi.TenKyThi + '</option>';
                } else {
                    html_lstKyThi += '<option value="' + kythi.ID + '">' + kythi.TenKyThi + '</option>';
                }
            });
            $('#txtKyThi_ChonKyThi').html(html_lstKyThi);
            //#endregion

            //#region Kỳ thi
            let kythi = res.kythi;
            $('#txtIDKyThi_ChonKyThi').val(kythi == null ? 0 : kythi.ID);

            $('#txtMa_ChonKyThi').html(kythi == null ? "" : kythi.MaKyThi);
            $('#txtTen_ChonKyThi').html(kythi == null ? "" : kythi.TenKyThi);
            $('#txtNgayBD_ChonKyThi').html(kythi == null ? "" : kythi.ThoiGianBatDauThi);
            //#endregion
        }
    })
}
function Get_IDTruong() {
    //$('#txtKyThi_ChonKyThi').select2("val", "");
    // Gán id trường cho input giữ id trường
    var idTruong = $('#txtTruong_ChonKyThi').val();
    var capHoc_DangChon = $('#txtCapHoc_ChonKyThi').val();
    $('#txtIDTruong_ChonKyThi').val(idTruong);
    // Cấp
    //var cap = parseInt($('#txtTruong_ChonKyThi option:selected').data("cap"));
    $.ajax({
        url: '/HomeTuyenSinh/LayThongTin_Modal_KyTuyenSinh',
        data:
        {
            loaithongtin: "listKyThi",
            idTruong,
            capHoc_DangChon
        }, success: function (res) {
            let listKyThi = res.listKyThi;
            var html_lstKyThi = ' <option value="0" selected>Chọn kỳ tuyển sinh</option>';
            $.each(listKyThi, function (i, kythi) {
                html_lstKyThi += '<option value="' + kythi.ID + '">' + kythi.TenKyThi + '</option>';
            });
            $('#txtKyThi_ChonKyThi').html(html_lstKyThi);

            $('#txtIDKyThi_ChonKyThi').val(0);
            $('#txtMa_ChonKyThi').html('');
            $('#txtTen_ChonKyThi').html('');
            $('#txtNgayBD_ChonKyThi').html('');
            $('#txtNgayKT_ChonKyThi').html('');
            $('#txtGhiChu_ChonKyThi').html('');
        }
    })
}
function Get_IDDoiTuong() {
    // Gán id đối tượng cho input giữ id đối tượng
    var iddoituong = $('#txtDoiTuong_ChonKyThi').val();
    $('#txtIDDoiTuong_ChonKyThi').val(iddoituong);
}

