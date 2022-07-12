var jsSearchResult = {
    reportUrl: '',
    /** init */
    init: () => {

        $('#title').html(`Mã hồ sơ tuyển sinh`);
        $("#keyword").attr("placeholder", "Nhập mã hồ sơ tuyển sinh");
        /* init captcha */
        jsSearchResult.getCaptchaImage();
        jsSearchResult.getCaptchaImage_10();
        //smart-city
        if ($('#smartCityPrefix').text().length) {
            $('body').addClass($('#smartCityPrefix').text());
            $('.page-wrapper').removeClass('pt-3');
        }
    },
    changeSelect: () => {
        $('#result').html('');
        $("#keyword").val('');
        $('#schoolyearid').val('');
        $('#error_capcha').html('');
        $('#keyword_error').html('');
        $('#schoolyear_error').html('');
        $('#txt_captcha').val('');

        $('#title').html(``);
        var type = $('#TypeSearch').val();
        $('#schoolyear_required').removeClass('required');
        if (type == 1) {
            $('#title').html('Mã hồ sơ tuyển sinh');
            $("#keyword").attr("placeholder", "Nhập mã hồ sơ tuyển sinh");
            $('#schoolyear_required').addClass('');
            $('#errorthongtin').css('display', 'none');
        }
        if (type == 2) {
            $('#title').html('Mã học sinh');
            $("#keyword").attr("placeholder", "Nhập mã học sinh");
            $('#schoolyear_required').addClass('required');
            $('#errorthongtin').css('display', 'none');
        }
        if (type == 3) {
            $('#title').html('Số báo danh');
            $("#keyword").attr("placeholder", "Nhập số báo danh");
            $('#schoolyear_required').addClass('required');
            $('#errorthongtin').css('display', 'none');
        }
    },
    downloadReport10: (e, ele) => {
        const downloadLink = document.createElement('a');
        document.body.appendChild(downloadLink);

        downloadLink.href = `data:application/pdf;base64,${jsSearchResult.reportUrl}`;
        downloadLink.target = '_self';
        downloadLink.download = 'giay-nhap-hoc';
        downloadLink.click();
        downloadLink.remove();
    },
    printReport10: () => {
        /** print */
        printJS({ printable: jsSearchResult.reportUrl, type: "pdf", base64: true });
    },
    getCaptchaImage: () => {
        if ($("#img-captcha").length && $('#img-captcha-key').length) {
            $.ajax({
                oldKey: $('#img-captcha-key').val(),
                url: '/AdmissionRegister/GetCaptchaImage'
            }).done((response) => {
                $("#img-captcha").attr("src", `data:image/png;base64,${response.image}`);
                $('#img-captcha-key').val(response.key);
            });
        }
        return false;
    },
    getCaptchaImage_10: () => {
        if ($("#img-captcha-10").length && $('#img-captcha-10-key').length) {
            $.ajax({
                oldKey: $('#img-captcha-10-key').val(),
                url: '/AdmissionRegister/GetCaptchaImage'
            }).done((response) => {
                $("#img-captcha-10").attr("src", `data:image/png;base64,${response.image}`);
                $('#img-captcha-10-key').val(response.key);
            });
        }
        return false;
    },
    checkCaptcha: () => {
        var string1 = remove(document.getElementById('mainCaptcha').value);
        var string2 = remove(document.getElementById('txtInput').value);
        if (string1 == string2) {
            document.getElementsByClassName('thongbao-captcha')[0].innerHTML = "Chúc mừng bạn";
            return true;
        }
        else {
            document.getElementsByClassName('thongbao-captcha')[0].innerHTML = "Nhập lại";
            return false;
        }
    },
    remove: (string) => {
        return string.split(' ').join('');
    },

    /* thay doi loai search*/
    changeSearch: (type) => {
        if (typeof type === 'string') {
            //change button
            $('.btn-group.group-search button').removeClass('btn-primary').addClass('btn-secondary');
            $(`#btn-${type}`).addClass('btn-primary').removeClass('btn-secondary');

            //change panel
            if ($(`#search-${type}`).css('display')==='none') {
                $('.panel-search').slideUp('fast', () => {
                    $(`#search-${type}`).slideDown('fast');
                });
            }

            //nếu chuyển qua mark
            if (type === 'mark') {
                //reset value của result
                $('#TypeSearch').val(1);
                $('#keyword').val(null);
                $('#schoolyearid').val(null);
                $('#CaptchaCode').val(null);
            } else {
                //reset value của mark
                $('#schoolyearid_10').val(null);
                $('#enroll_number_10').val(null);
                $('#CaptchaCode_10').val(null);
            }

            $('.search-result_10').hasClass('hide') ? 0 : $('.search-result_10').addClass('hide');
            $('.search-result').hasClass('hide') ? 0 : $('.search-result').addClass('hide');
        }
    },

    /*
     * tra cuu ket qua thi vao 10
     */
    search_10: () => {
        var schoolYearId = $('#schoolyearid_10').val();
        var stCodeOrEnrollNo = $('#enroll_number_10').val();
        var captchaCode = $('#CaptchaCode_10').val();
        var captchaKey = $('#img-captcha-10-key').val();
        var canSearch = true;
        if (!schoolYearId) {
            canSearch = false;
            $('#schoolyear_10_error').text('Năm học không được để trống');
        }
        if (!stCodeOrEnrollNo) {
            canSearch = false;
            $('#enroll_number_10_error').text('Mã học sinh/Số báo danh không được để trống');
        }
        if (!captchaCode) {
            canSearch = false;
            $('#error_capcha_10').text('Mã xác nhận không được để trống');
        }
        if (canSearch) {
            $.ajax({
                url: 'SearchResult/CheckCaptcha',
                data: {
                    captchaCode,
                    captchaKey
                }
            }).done((response) => {
                jsSearchResult.getCaptchaImage_10();
                if (response.errorCaptcha) {
                    $('#error_capcha_10').text('Mã xác nhận không hợp lệ')
                }
                else {
                    $.ajax({
                        url: 'SearchResult/SearchResultStudentInfor_10',
                        data: {
                            schoolYearId,
                            stCodeOrEnrollNo
                        },
                        type: 'POST'
                    }).done((response) => {
                        response = JSON.parse(response);
                        if (!response.Error) {
                            if (response.ResultData) {
                                var data = JSON.parse(response.ResultData)[0];
                                var mark_html = `
                                    <thead>
                                        <tr>
                                            <th scope="col">Môn thi</th>
                                            <th scope="col">Kết quả</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Môn 1</td>
                                            <td>${data.mark1_10}</td>
                                        </tr>
                                        <tr>
                                            <td>Môn 2</td>
                                            <td>${data.mark2_10}</td>
                                        </tr>
                                        <tr>
                                            <td>Môn 3</td>
                                            <td>${data.mark3_10}</td>
                                        </tr>
                                        <tr>
                                            <td>Chuyên 1</td>
                                            <td>${data.spMark1_10}</td>
                                        </tr>
                                        <tr>
                                            <td>Chuyên 2</td>
                                            <td>${data.spMark2_10}</td>
                                        </tr>
                                        <tr>
                                            <td>Chuyên 3</td>
                                            <td>${data.spMark3_10}</td>
                                        </tr>
                                        <tr>
                                            <td>Chuyên 4</td>
                                            <td>${data.spMark4_10}</td>
                                        </tr>
                                    </tbody>
                                `;

                                //${
                                //    parseInt(schoolYearId) === 2020 ? '' : `
                                //                <tr>
                                //                    <td>Môn 4</td>
                                //                    <td>${data.mark4_10}</td>
                                //                </tr>
                                //            `
                                //}
                                //<tr>
                                //    <td>Tổng ĐXT</td>
                                //    <td>${data.totalMark_10}</td>
                                //</tr>

                                //<tr>
                                //    <td>Song bằng vòng 2</td>
                                //    <td>${data.dualDegree_10}</td>
                                //</tr>
                                //<tr>
                                //    <td>Song ngữ tiếng pháp</td>
                                //    <td>${data.bilingualFrench_10}</td>
                                //</tr>
                                //<tr>
                                //    <td>Ghi chú</td>
                                //    <td>${data.note_10}</td>
                                //</tr>

                                $('#EnrollNumberStudent_10').val(data.EnrollNumberStudent_10);
                                $('#StudentCode_10').val(data.StudentCode_10);
                                //$('#NameStudent_10').val(data.NameStudent_10);
                                //$('#BirthdayStudent_10').val(data.BirthdayStudent_10);
                                //$('#GenderStudent_10').val(data.GenderStudent_10);
                                $('#mark_10').html(mark_html);
                                $('.search-result_10').hasClass('hide') ? $('.search-result_10').removeClass('hide') : 0;
                            }
                            else {
                                //khong tim thay hoc sinh
                                $('#result_10').text('Không tìm thấy học sinh');
                                $('.search-result_10').hasClass('hide') ? 0 : $('.search-result_10').addClass('hide');
                            }
                        }
                        else {
                            //khong tim thay hoc sinh
                            $('#result_10').text('Không tìm thấy học sinh');
                            $('.search-result_10').hasClass('hide') ? 0 : $('.search-result_10').addClass('hide');
                        }
                    });
                }
            });
        }
        return false;
    }
}

$(document).ready(() => {
    jsSearchResult.init();

}); 