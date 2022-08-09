$(document).ready(function () {
    $('#liSinhVien').addClass('active');
});
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
    if (id == null || id == 0) {
        document.getElementById('tieude').innerHTML = "Thêm mới sinh viên";
    }
    else {
        document.getElementById('tieude').innerHTML = "Cập nhật thông tin sinh viên";
        $.ajax({
            url: "/SinhVien/Edit",
            data: {
                id: id
            },
            type: 'post',
            success: function (result) {
                if (result.status == true) {
                    $('#id').val(id);
                    $('#NewFirstName').val(result.data.HoTen);
                    $('#txtMSV').val(result.data.MaSV);
                    $('#txtLop').val(result.data.Lop);
                    if (result.data.Image != null && result.data.Image != "") {
                        document.getElementById("imgAvatar").src = result.data.Image;
                    }
                    else {
                        document.getElementById("imgAvatar").src = '/Content/Images/Avatars/images.png';
                    }
                    $('#NewEmail').val(result.data.Email);
                    $('#NewBirthday').val(result.NgaySinh);
                    $('#NewPhone').val(result.data.SDT);
                    $('#NewAddress').val(result.data.DiaChi);
                    if (result.data.GioiTinh == true) {
                        $('#NewGender_1').attr('checked', true)
                    }
                    else {
                        $('#NewGender_0').attr('checked', true)
                    }
                }
            }
        });
    }
    $('#addNewUser').modal('show');
}

function resetForm() {
    $('#NewFirstName').val('');
    $('#txtLop').val('');
    $('#txtMSV').val('');
    $('#NewEmail').val('');
    $('#NewBirthday').val('');
    $('#NewPhone').val('');
    $('#NewAddress').val('');
    document.getElementById("imgAvatar").src = '/Content/Images/Avatars/images.png';
    $('#errTen').hide();
    $('#errUsername').hide();
    $('#errEmail').hide();
    $('#errPass').hide();
    $('#errNgaySinh').hide();
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

$("#txtMSV").keyup(function () {
    var ten = $('#txtMSV').val().trim();
    if (ten != "") {
        $('#errMSV').hide();
    }
    else {
        document.getElementById('errMSV').innerHTML = "Chưa nhập mã sinh viên";
        $('#errMSV').show();
    }
})
$("#NewFirstName").keyup(function () {
    var ten = $('#NewFirstName').val().trim();
    if (ten != "") {
        $('#errTen').hide();
    }
    else {
        document.getElementById('errTen').innerHTML = "Chưa nhập họ tên";
        $('#errTen').show();
    }
})

$("#txtLop").keyup(function () {
    var ten = $('#txtLop').val().trim();
    if (ten != "") {
        $('#errLop').hide();
    }
    else {
        document.getElementById('errLop').innerHTML = "Chưa nhập lớp";
        $('#errLop').show();
    }
})

$("#NewEmail").keyup(function () {
    var ten = $('#NewEmail').val().trim();
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

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function loadPartial() {
    $('#tableNguoiDung').load('/Admin/SinhVien/getList');
}

function Save() {
    var isSave = true;
    var hoten = $('#NewFirstName').val().trim();
    var lop = $('#txtLop').val().trim();
    var MaSV = $('#txtMSV').val().trim();
    var email = $('#NewEmail').val().trim();
    var id = $('#id').val();
    var nam = document.getElementById('NewGender_1');
    var nu = document.getElementById('radNewGender_0');
    var kichhoat = document.getElementById('activeKH_1');
    var kokichhoat = document.getElementById('activeKH_0');
    var Image = document.getElementById("fImage").files[0];
    var gioitinh = "";
    var ac = "";
    var kieu = $('#ddlKieuND').val();
    if (MaSV == "") {
        isSave = false;
        document.getElementById('errMSV').innerHTML = "Chưa nhập mã sinh viên";
        $('#errMSV').show();
    }

    if (hoten == "") {
        isSave = false;
        document.getElementById('errTen').innerHTML = "Chưa nhập họ tên";
        $('#errTen').show();
    }

    if (lop == "") {
        document.getElementById('errLop').innerHTML = "Chưa nhập lớp";
        $('#errLop').show();
    }
    if (email == "") {
        if (email == "") {
            isSave = false;
            document.getElementById('errEmail').innerHTML = "Chưa nhập email";
            $('#errEmail').show();
        }
        else {
            if (!isEmail(email)) {
                isSave = false;
                document.getElementById('errEmail').innerHTML = "Email sai định dạng";
                $('#errEmail').show();
            }
        }
    }

    if (isSave == true) {
        var formData = new FormData();
        formData.append("HoTen", hoten);
        formData.append("MaSV", MaSV);
        formData.append("Lop", lop);
        formData.append("SDT", $('#NewPhone').val());
        formData.append("Email", email);
        formData.append("DiaChi", $('#NewAddress').val());
        formData.append("NgaySinh", $('#NewBirthday').val());
        formData.append("Image", Image);
        if (nam.checked == true && nam != null) {
            gioitinh = 1;
        }
        if (nu != null && nu.checked == true) {
            gioitinh = 0;
        }
        formData.append("KieuNguoiDung", kieu);
        formData.append("ID", id);
        formData.append("GioiTinh", gioitinh);
        $.ajax({
            async: false,
            type: 'POST',
            url: "/SinhVien/Save",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.status == true) {
                    $('#addNewUser').modal('hide');
                    if (id == 0) {
                        toastr.success("Thêm mới thành công sinh viên");
                    }
                    else {
                        toastr.success("Cập nhật sinh viên thành công");
                    }
                }
                loadPartial();
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
        $('#pnoidung').text('Bạn có muốn xóa sinh viên đã chọn hay không?')
        $("#DeleteND").modal("show");
    }
}

function deleteOne() {

    if (idND != 0) {
        mangId = [];
        mangId.push(idND)
    }
    $.ajax({
        url: '/SinhVien/Delete',
        dataType: 'json',
        type: 'post',
        data: { ListID: JSON.stringify(mangId) },
        success: function (rs) {
            if (rs.status == true) {
                $("#DeleteND").modal("hide");
                toastr.success("Xóa thành công bản ghi");
            }
            loadPartial();
        }
    })
}

function deleteAll() {
    var chuoiMangId = JSON.stringify(mangId);
    $.ajax({
        url: '/SinhVien/Delete',
        dataType: 'json',
        type: 'post',
        data: { ListID: chuoiMangId },
        success: function (rs) {
            $('#check-all-delete-js').prop('checked', false);
            if (rs.status == true) {
                toastr.success("Xóa thành công bản ghi");
            }
            loadPartial();
        }
    })
}

$(document).ready(function () {
    $("#txtSearch").val('');
});

$("#txtSearch").on('keyup', function () {
    var value = $(this).val().toLowerCase();
    $("#tblUser > tbody tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) != -1)
    });
});