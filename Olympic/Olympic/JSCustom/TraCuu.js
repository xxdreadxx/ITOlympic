// Hiển thị các input
function ShowInfo(item) {
    var type = $(item).val();
    var body = "";
         type == 2 ?
            body += '<div class="col-12">' + // Mã học sinh
            '<label class="required"><span id="title">Mã học sinh</span></label>' +
            '<input class="form-control" type="text" id="mahocsinh" />' +
            '<span class="error-text" id="error_input_1"></span>' +
            '</div>'
            : body += '<div class="col-12">' + // Số báo danh
            '<label class="required"><span id="title">Số báo danh</span></label>' +
            '<input class="form-control" type="text" id="sobaodanh" />' +
            '<span class="error-text" id="error_input"></span>' +
            '</div>'
    $('#nhapthongtintracuu').html(body);
};



$('#mahocsinh').off('click').on('click', function () {
    $('#mhocsinh').css('display', 'unset');
    $('#errorthongtin').text('');
    $('#errorthongtin').removeAttr('style');
    $('#thongtinhoso').html('');
    resetForm();
});

// Reset validate
function ResetValidate() {
    // Mã học sinh
    $('#error_input_1').text('');
    $('#error_input_1').css('display', 'none');
    // Số báo danh
    $('#error_input').text('');
    $('#error_input').css('display', 'none');

    // Trường thi
    $('#error_cuocthi').text('');
    $('#error_cuocthi').css('display', 'none');
}

$('#timkiem').off('click').on('click', function () {
    // Reset validate
    ResetValidate();
    // Lấy giá trị input
    var type = $('input[name="rdlLoaiTraCuu"]:checked').val() || "";

    var mahocsinh = $('#mahocsinh').val() || "";
    var sobaodanh = $('#sobaodanh').val() || "";
    var cuocthi = $('#cuocthi').val();
    var hangmuc = $('#hangmuc').val();

    // reset validate 
    $('#errorthongtin').text('');
    $('#errorthongtin').css('display', 'none');
    $('#error_input_1').text('');
    $('#error_input_1').css('display', 'none');
    $('#error_input_2').text('');
    $('#error_input_2').css('display', 'none');
    // validate input
    (() => {
        // Kiểm tra kiểu tra cứu
        if (type == "" || type == null) {
            $('#errorthongtin').text('Vui lòng nhập thông tin muốn tìm kiếm');
            $('#errorthongtin').css('display', 'unset');
            return false;
        }
        // Kiểm tra mã học sinh và mật khẩu
        if (type == 2) {

            if (mahocsinh == "" || mahocsinh == null) {
                $('#error_input_1').text('Vui lòng nhập mã học sinh');
                $('#error_input_1').css('display', 'unset');
                return false;
            }
        }
        // Kiểm tra số báo danh
        if (type == 3) {
            if (sobaodanh == "" || sobaodanh == null) {
                $('#error_input').text('Vui lòng nhập số báo danh');
                $('#error_input').css('display', 'unset');
                return false;
            }
        }

        // Kiểm tra cuocthi
        if (cuocthi == "" || cuocthi == null) {
            $('#error_cuocthi').text('Vui lòng chọn cuộc thi');
            $('#error_cuocthi').css('display', 'unset');
            return false;
        }
        return true;
    })() &&
        $.ajax({
            url: '/Home/KetQuaTraCuuHoSo',
            data: {
                type,
                mahocsinh,
                sobaodanh,
                cuocthi,
                hangmuc
            },
            success: function (res) {
                    $('#thongtinhoso').html(res.ketquatracuu)
            },
            error: function () {
                toastr.error('Có lỗi xảy ra trong quá trình tìm kiếm', 'error');
            }
        })
});

$('document').ready(function () {
    $('#navTraCuu').addClass('active');
});

function selectHangMuc() {
    var cuocthi = $('#cuocthi').val();
    $.ajax({
        url: '/Home/GetHangMuc',
        data: {cuocthi},
        success: function (res) {
            var selectCuocThi = $('#hangmuc');
            var op = "";
            $.each(res.data, function (i, item) {
                op += '<option value=' + item.ID + '>' + item.TenHangMuc + '</option>'
            });
            selectCuocThi.html(op);
        }
    });
}

