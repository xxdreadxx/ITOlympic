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