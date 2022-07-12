$(document).ready(function () {
    $('#timeline_lichtrinh :first-child').show();
    google.charts.load('current', { packages: ['corechart'], language: '@lang.CurrentLanguage' });
    google.charts.setOnLoadCallback(drawChart);
});
function ShowTimeline() {
    var id = $('#select_lichtrinh').val();
    if (id != 0) {
        $('#timeline_lichtrinh').children().hide();
        $('#' + id).show();
    }
}
//$('#select_LoaiTimKiem li a').on('click', function () {
//    $('#select_btn_LoaiTimKiem').text($(this).text())
//    $('#select_LoaiTimKiem').attr('data-id',$(this).data('id'))
//})
/*hàm xử lý khi nhấn chuyển trang trong list trường có thí sinh dự thi*/
//$(document).on('click', '#tblhoso .paginationNavigator li a', function (e) {
//    e.preventDefault();
//    if ($(this).attr('href') == undefined || $.trim($(this).attr('href')) == "") return;
//    var url = $(this).attr('href');

//    TimKiem();
////});

function TimKiem() {
    var loai_timkiem = $('#select_LoaiTimKiem').val();
    var thongtin_timkiem = $('#input_ThongTinTimKiem').val().trim();
    if (loai_timkiem != 0 && thongtin_timkiem != "") {
        //var page = $('#tblhoso .paginationNavigator li.currentPage a').text() || 1;
        $.ajax({
            url: '/HomeTuyenSinh/TimKiemHoSo',
            type: 'POST',
            data: {
                loai_timkiem: loai_timkiem,
                thongtin_timkiem: thongtin_timkiem,

            },
            success: function (res) {
                if (res.status == false) {
                    $('#tbl_KetQuaTimKiem').html("<span class='product-description'style='font-size:25px; font-weight:bold; color:#ccc;'> <i class='fa fa-warning' style='color:#ccc; font-size:44px;'> </i>Không tồn tại học sinh này!</span>")
                    $('#select_LoaiTimKiem').val(loai_timkiem);
                    $('#input_ThongTinTimKiem').val(thongtin_timkiem);
                } else {
                    $('#tbl_KetQuaTimKiem').html(res)
                    //Lấy thông tin tại các ô tìm kiếm
                    $('#select_LoaiTimKiem').val(loai_timkiem);
                    $('#input_ThongTinTimKiem').val(thongtin_timkiem);
                }
            },
            error: function () {
                alert('Có lỗi xảy ra trong hệ thống')
            }
        })
    }
}

$(document).on('click', '#tbl_KetQuaTimKiem .paginationNavigator li a', function (e) {
    e.preventDefault();
    var loai_timkiem = $('#select_LoaiTimKiem').val();
    var thongtin_timkiem = $('#input_ThongTinTimKiem').val().trim();
    if ($(this).attr('href') == undefined || $.trim($(this).attr('href')) == "") return;
    $.ajax({
        url: $(this).attr('href'),
        data:
        {
            loai_timkiem: loai_timkiem,
            thongtin_timkiem: thongtin_timkiem,
        },
        type: 'GET',
        beforeSend: function () {
            showLoadingScreen();
        },
        complete: function () {
            hideLoadingScreen();
        },
        success: function (res) {
            $('#tbl_KetQuaTimKiem').html(res);
            $('#select_LoaiTimKiem').val(loai_timkiem);
            $('#input_ThongTinTimKiem').val(thongtin_timkiem);
        }
    });
});




function XemChiTiet(id) {
    $('#chitiet_mahoso').text();
    $('#chitiet_mahocsinh').text();
    $('#chitiet_hoten').text();
    $('#chitiet_loaihoso').text();
    $('#chitiet_trangthaihoso').text();
    $.ajax({
        url: '/HomeTuyenSinh/GetHoSo',
        type: "POST",
        data: {
            id: id
        },
        success: function (res) {
            if (res.status) {
                var chitiet = res.hoso
                $('#chitiet_mahoso').text(chitiet.MaHoSo);
                $('#chitiet_mahocsinh').text(chitiet.MaHocSinh);
                $('#chitiet_hoten').text(chitiet.HoTen);
                var loaihoso = chitiet.LaHoSoTrucTiep == 1 ?
                    'Hồ sơ trực tiếp' : 'Hồ sơ trực tuyến'
                $('#chitiet_loaihoso').text(loaihoso);
                var trangthai = chitiet.TrangThai == 1 ?
                    'Hồ sơ chưa duyệt' : chitiet.TrangThai == 2 ?
                        'Hồ sơ đã duyệt' : chitiet.TrangThai == 3 ?
                            'Hồ sơ trúng tuyển' : chitiet.TrangThai == 4 ?
                                'Hồ sơ trả lại' : 'Hồ sơ tham gia kỳ đánh giá chất lượng';
                $('#chitiet_trangthaihoso').text(trangthai);
                $('#modal_XemHoSo').modal('show');
            } else if (res.status == false && exist == true) {
                $('#tblhoso').html("<span>Hồ sơ học sinh không tồn tại!</span>")
            }
            else {
                alert('Có lỗi xảy ra trong hệ thống')
            }
        }
    })
}
//#region code cũ
function drawChart() {
    $.post('/Home/GetUserChartData', function (rs) {
        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('date', '');
        data.addColumn('number', 'Đăng ký');
        data.addColumn('number', 'Đăng nhập');
        var arr = [];
        $.each(rs, function (index) {
            arr.push([new Date(parseInt(rs[index].date.substr(6))), rs[index].register, rs[index].login]);
        });

        data.addRows(arr);

        var options = {
            legend: { position: 'top' },
            height: 400,
            chartArea: { width: '100%', height: '80%' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('adminStatistic'));

        chart.draw(data, options);
    });

    $.post('/Home/GetGroupPieChart', function (result) {

        var data = new google.visualization.DataTable();
        data.addColumn('string', result.TenCoCauToChuc);
        data.addColumn('number', result.SoLuongNguoiDung);
        var arr = [];
        $.each(result, function (index) {
            arr.push([result[index].TenCoCauToChuc, result[index].SoLuongNguoiDung])
        })

        data.addRows(arr)

        var options = {
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
    });

    $.post('/Home/GetDocumentChart', function (result) {
        var data = new google.visualization.DataTable();
        data.addColumn('number', result.ChuaDuyet);
        data.addColumn('number', result.ChuaSoHoa);
        data.addColumn('number', result.DaDuyet);
        data.addColumn('number', result.DaSoHoa);
        data.addColumn('number', result.DuocCongKhai);
        data.addColumn('number', result.KhongDuocCongKhai);
        var arr = [];
        $.each(result, function (index) {
            arr.push([result[index].TenNhomNguoiDung, result[index].SLNguoiDung])
        })
        data.addRows(arr)
        var data = google.visualization.arrayToDataTable([
            ["Element", "Số hồ sơ", { role: "style" }],
            ["Hồ sơ đăng ký", result[0].DangKy, "#b87333"],
            ["Hồ sơ đã duyệt", result[0].DaDuyet, "silver"],
            ["Hồ sơ trúng tuyển", result[0].TrungTuyen, "gold"],
            ["Hồ sơ trả lại", result[0].TraLai, "color: #0099c6"],
        ]);

        var view = new google.visualization.DataView(data);
        view.setColumns([0, 1,
            {
                calc: "stringify",
                sourceColumn: 1,
                type: "string",
                role: "annotation"
            },
            2]);

        var options = {
            height: 500,
            bar: { groupWidth: "95%" },
            legend: { position: "none" },
        };
        var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
        chart.draw(view, options);
    })
}
$('#btn-branch').on('click', function () {
    setTimeout(alertModal('Có lỗi xảy ra trong hệ thống', 'error'), 500);
});
//#endregion

