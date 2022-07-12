var jsAdmissioninfor = {
    v_lstAdmissionArea: [],
    v_lstAdmissionArea_Province: [],
    v_lstAdmissionArea_District: [],
    v_lstAdmissionArea_Ward: [],
    v_lstAdmissionArea_Helmet: [],
    v_lstAdmission: [],


    init: function () {
        //smart-city
        if ($('#smartCityPrefix').text().length) {
            $('body').addClass($('#smartCityPrefix').text());
            $('.page-wrapper').removeClass('pt-3');
        }

        var me = this;
        /***
         * init control
         */
        me.initSelect2();
        //me.registerEvents();
    },

    /**
     * init select 2
     * */
    initSelect2: function () {
        /** select */
        $('.ctl_selectone').prepend('<option selected></option>').select2({
            placeholder: $(this).data('placeholder'),
            allowClear: true
            //theme: 'bootstrap4'
        });

        setTimeout(function () {
            $('.ctl_selectone').select2({
                theme: 'bootstrap4'
            });
        }, 0);

    },
    changeIcon: function (a, schoolid, schoolyearid) {
        //var id_icon_up = '#icon-up' + a;
        //var id_icon_down = '#icon-down' + a;
        //var id_group = '#group-items-collapsible' + a;
        //var status = $(id_group).attr("aria-expanded");
        //if (status == 'false') {
        //    $(id_icon_up).show();
        //    $(id_icon_down).hide();
        //}
        //else {
        //    $(id_icon_up).hide();
        //    $(id_icon_down).show();
        //}
        //if (jsAdmissioninfor.v_lstAdmission.length > 0) {
        //    for (var i = 0; i < jsAdmissioninfor.v_lstAdmission.length; i++) {
        //        $('#collapse' + jsAdmissioninfor.v_lstAdmission[i].SCHOOLID).remove();
        //    }
        //}

        //neu cung id collapseA3C8D9817F2E3425E0550250568281F2 === collapseA3C8D9817F2E3425E0550250568281F2 => dong di $('#collapseA3C8D9817F2E3425E0550250568281F2').removeClass('show')
        //neu khac id => $('#accordion > .card > .collapse').removeClass('show') => $('#collapseA3C8D9817F2E3425E0550250568281F2').addClass('show')


        if ($('#collapse' + schoolid).children().length > 0) {

            $('#collapse' + schoolid).slideToggle();  
        
        } else {
            //goi ajax
            $.ajax({
                type: "POST",
                url: "/AdmissionInfo/GetDataContentAdmissionInfo",
                data: {

                    schoolyearid: schoolyearid,
                    schoolid: schoolid
                },
                dataType: "Json",
                success: function (result) {
            
                    var lstAdmission = result.lstAdmission;
                    var lstAdmissionArea = result.lstAdmissionArea;
                    //var lstAdmissionArea_Province = result.lstAdmissionArea_Province;
                    //var lstAdmissionArea_District = result.lstAdmissionArea_District;
                    //var lstAdmissionArea_Ward = result.lstAdmissionArea_Ward;
                    //var lstAdmissionArea_Helmet = result.lstAdmissionArea_Helmet;
                    //lst phân tuyến trên toàn thành phố
                    var lst_Province_Assign_True = [];
                    //lst phân tuyến trên toàn quận huyện
                    var lst_District_Assign_True = [];
                    //lst phân tuyến trên toàn phường xã
                    var lst_Ward_Assign_True = [];
                    //lst phân tuyến trên toàn Khu phố thôn
                    var lst_Helmet_Assign_True = [];
                    jsAdmissioninfor.v_lstAdmission = result.lstAdmission;

                    if (lstAdmission.length > 0) {



                        for (var i = 0; i < lstAdmission.length; i++) {
                            // Lấy ra lst agssin trên toàn khu vực
                            if (lstAdmissionArea.length > 0) {
                                for (var j = 0; j < lstAdmissionArea.length; j++) {
                                    if (lstAdmission[i].SCHOOLID === lstAdmissionArea[j].SCHOOLID && lstAdmission[i].ADMISSIONID === lstAdmissionArea[j].ADMISSIONID) {
                                        if (lstAdmissionArea[j].ISASSIGNALLPROVINCE == true) {
                                            lst_Province_Assign_True.push(lstAdmissionArea[j]);
                                        }
                                        if (lstAdmissionArea[j].ISASSIGNALLDISTRICT == true) {
                                            lst_District_Assign_True.push(lstAdmissionArea[j]);
                                        }
                                        if (lstAdmissionArea[j].ISASSIGNALLWARD == true) {
                                            lst_Ward_Assign_True.push(lstAdmissionArea[j]);
                                        }
                                        if (lstAdmissionArea[j].ISASSIGNALLPROVINCE == false && lstAdmissionArea[j].ISASSIGNALLDISTRICT == false && lstAdmissionArea[j].ISASSIGNALLWARD == false) {
                                            lst_Helmet_Assign_True.push(lstAdmissionArea[j]);
                                        }
                                    }
                                }
                            }
                            var lst_Phuong_remove = [];
                            var lst_KhuPhoThon_remove = [];

                            if (lst_Province_Assign_True.length == 0) {
                                if (lst_District_Assign_True.length > 0) {
                                    for (var t = 0; t < lst_District_Assign_True.length; t++) {
                                        if (lst_Ward_Assign_True.length > 0) {
                                            //có lst xã check xem trong lst xã có xã nào thuộc quận/huyện phân tuyến trên toàn quận huyện chưa ??
                                            for (var j = 0; j < lst_Ward_Assign_True.length; j++) {
                                                if (lst_Ward_Assign_True[j].ASSIGNDISTRICTID === lst_District_Assign_True[t].ASSIGNDISTRICTID) {
                                                    lst_Phuong_remove.push(lst_Ward_Assign_True[j]);
                                                    if (lst_Helmet_Assign_True.length > 0) {
                                                        for (var z = 0; z < lst_Helmet_Assign_True.length; z++) {
                                                            if (lst_Helmet_Assign_True[z].ASSIGNWARDID === lst_Ward_Assign_True[j].ASSIGNWARDID) {
                                                                lst_KhuPhoThon_remove.push(lst_Helmet_Assign_True[z]);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                else {
                                    //Không có phân tuyến trên toàn quận huyện
                                    if (lst_Ward_Assign_True.length > 0) {
                                        //có lst xã check xem trong lst xã có xã nào thuộc quận/huyện phân tuyến trên toàn quận huyện chưa ??
                                        for (var j = 0; j < lst_Ward_Assign_True.length; j++) {
                                                if (lst_Helmet_Assign_True.length > 0) {
                                                    for (var z = 0; z < lst_Helmet_Assign_True.length; z++) {
                                                        if (lst_Helmet_Assign_True[z].ASSIGNWARDID === lst_Ward_Assign_True[j].ASSIGNWARDID) {
                                                            lst_KhuPhoThon_remove.push(lst_Helmet_Assign_True[z]);
                                                        }
                                                    }
                                                }
                                        }
                                    }

                                }
                            }

                            //// Gán lại lst_Ward sau khi đã lọc
                            lst_Ward_Assign_True = lst_Ward_Assign_True.filter(x => !lst_Phuong_remove.includes(x));
                            lst_Helmet_Assign_True = lst_Helmet_Assign_True.filter(x => !lst_KhuPhoThon_remove.includes(x));

                            $("#collapse" + lstAdmission[i].SCHOOLID).append(
                                `<div class="card-body">
                                            <ul class="ul-father">
                                                <a href="#collapseExample${lstAdmission[i].ADMISSIONID}${lstAdmission[i].SCHOOLID}" data-toggle="collapse" aria-expanded="true" aria-controls="collapseExample${lstAdmission[i].ADMISSIONID}${lstAdmission[i].SCHOOLID}">
                                                    <span>${lstAdmission[i].ADMISSIONNAME}</span>
                                                </a>
                                        <div class="" id="collapseExample${lstAdmission[i].ADMISSIONID}${lstAdmission[i].SCHOOLID}">
                                            <div class="card-body">
                                                <li class="li-child">
                                                    Chỉ tiêu học sinh
                                                    <ul>
                                                        <li>Số lớp học: ${(lstAdmission[i].NUMBEROFCLASS) ? lstAdmission[i].NUMBEROFCLASS : ""}</li>
                                                        <li>Số học sinh: ${(lstAdmission[i].NUMBEROFSTUDENT) ? lstAdmission[i].NUMBEROFSTUDENT : ""}</li>
                                                    </ul>
                                                </li>
                                                <li class="li-child">
                                                    Hướng dẫn tuyển sinh
                                                    <ul>
                                                         <li>${ (lstAdmission[i].GUIDELINE) ? lstAdmission[i].GUIDELINE : ""}</li>
                                                    </ul>
                                                </li>
                                                <li class="li-child">
                                                    Tuyến tuyển sinh
                                                    <ul>
                                                        <li>
                                                            Chú thích viết tắt các đối tượng:
                                                            <ul>
                                                                <li>DT1: Học sinh có Hộ khẩu thường trú và Nơi cư trú hiện tại đều thuộc địa bàn tuyển sinh của nhà trường.</li>
                                                                <li>DT2: Học sinh có Hộ khẩu thường trú thuộc địa bàn tuyển sinh của nhà trường nhưng Nơi cư trú hiện tại không thuộc địa bàn tuyển sinh của trường</li>
                                                                <li>DT3: Học sinh có Nơi cư trú hiện tại thuộc địa bàn tuyển sinh của trường nhưng Hộ Khẩu thường trú Không thuộc địa bàn tuyển sinh của nhà trường</li>
                                                            </ul>
                                                        </li>
                                                            <span id="content${lstAdmission[i].ADMISSIONID}${lstAdmission[i].SCHOOLID}">
                                                        </span>
                                                    </ul>

                                                </li>
                                                <li class="li-child">
                                                    Điều kiện tuyển sinh
                                                    <ul>
                                                            <li>${(lstAdmission[i].REQUIREMENT) ? lstAdmission[i].REQUIREMENT : ""}</li>
                                                    </ul>
                                                </li>
                                                <li class="li-child">
                                                    Hướng dẫn sau khi hoàn thành đăng ký
                                                    <ul>
                                                            <li>${(lstAdmission[i].ADMISSION_GUIDELINE) ? lstAdmission[i].ADMISSION_GUIDELINE : ""}</li>
                                                    </ul>
                                                </li>
                                                </div>
                                            </div>
                                            </ul>
                                    </div>`);

                            // Check xem phân tuyến trên toàn thành phố chưa ???
                            if (lst_Province_Assign_True.length > 0) {
                                // Check xcem kỳ tuyển sinh của trường này đã có phân tuyến trên toàn thành phố nào k ? Nếu có add vào html
                                for (var j = 0; j < lst_Province_Assign_True.length; j++) {
                                    $("#content" + lstAdmission[i].ADMISSIONID + lstAdmission[i].SCHOOLID).append(`<li>${(lst_Province_Assign_True[j].ASSIGNPROVINCEID) ? lst_Province_Assign_True[j].ASSIGNPROVINCENAME : ""}${(lst_Province_Assign_True[j].ALLOWED_DT1) ? "_DT1" : ""}${(lst_Province_Assign_True[j].ALLOWED_DT2) ? "_DT2" : ""}${(lst_Province_Assign_True[j].ALLOWED_DT3) ? "_DT3" : ""}</li>`);
                                }
                            }
                            else {
                                //Xem có phân tuyến trên toàn quận/huyện nào không ???
                                if (lst_District_Assign_True.length > 0) {
                                    for (var t = 0; t < lst_District_Assign_True.length; t++) {
                                        $("#content" + lstAdmission[i].ADMISSIONID + lstAdmission[i].SCHOOLID).append(`<li>${(lst_District_Assign_True[t].ASSIGNDISTRICTID) ? lst_District_Assign_True[t].ASSIGNDISTRICTNAME : ""}${(lst_District_Assign_True[t].ALLOWED_DT1) ? "_DT1" : ""}${(lst_District_Assign_True[t].ALLOWED_DT2) ? "_DT2" : ""}${(lst_District_Assign_True[t].ALLOWED_DT3) ? "_DT3" : ""}</li>`);
                                        // Xem trong lst này có phân tuyến trên phường xã của quận huyện khác không
                                        if (lst_Ward_Assign_True.length > 0) {
                                            for (var y = 0; y < lst_Ward_Assign_True.length; y++) {
                                                if (lst_Ward_Assign_True[y].ASSIGNDISTRICTID != lst_District_Assign_True[t].ASSIGNDISTRICTID && lst_Ward_Assign_True[y].ASSIGNDISTRICTID ) {
                                                    $("#content" + lstAdmission[i].ADMISSIONID + lstAdmission[i].SCHOOLID).append(`<li>${(lst_Ward_Assign_True[y].ASSIGNDISTRICTID) ? lst_Ward_Assign_True[y].ASSIGNDISTRICTNAME : ""}${(lst_Ward_Assign_True[y].ASSIGNWARDID) ? '_' + lst_Ward_Assign_True[y].ASSIGNWARDNAME : ""}${(lst_Ward_Assign_True[y].ALLOWED_DT1) ? "_DT1" : ""}${(lst_Ward_Assign_True[y].ALLOWED_DT2) ? "_DT2" : ""}${(lst_Ward_Assign_True[y].ALLOWED_DT3) ? "_DT3" : ""}</li>`);
                                                    // Xem trong lst này có phân tuyến trên khu phố thôn của phường xã khác không
                                                    if (lst_Helmet_Assign_True.length > 0) {
                                                        for (var z = 0; z < lst_Helmet_Assign_True.length; z++) {
                                                            if (lst_Helmet_Assign_True[z].ASSIGNDISTRICTID != lst_Ward_Assign_True[y].ASSIGNDISTRICTID && lst_Helmet_Assign_True[z].ASSIGNWARDID != lst_Ward_Assign_True[y].ASSIGNWARDID) {
                                                                $("#content" + lstAdmission[i].ADMISSIONID + lstAdmission[i].SCHOOLID).append(`<li>${(lst_Helmet_Assign_True[z].ASSIGNDISTRICTID) ? lst_Helmet_Assign_True[z].ASSIGNDISTRICTNAME : ""}${(lst_Helmet_Assign_True[z].ASSIGNWARDID) ? '_' + lst_Helmet_Assign_True[z].ASSIGNWARDNAME : ""}${(lst_Helmet_Assign_True[z].ASSIGNHAMLETID) ? '_' + lst_Helmet_Assign_True[z].ASSIGNHAMLETNAME : ""}${(lst_Helmet_Assign_True[z].ALLOWED_DT1) ? "_DT1" : ""}${(lst_Helmet_Assign_True[z].ALLOWED_DT2) ? "_DT2" : ""}${(lst_Helmet_Assign_True[z].ALLOWED_DT3) ? "_DT3" : ""}</li>`);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                else {
                                    // Không có phân tuyến trên toàn quận nào cả
                                    if (lst_Ward_Assign_True.length > 0) {
                                        for (var y = 0; y < lst_Ward_Assign_True.length; y++) {
                                            $("#content" + lstAdmission[i].ADMISSIONID + lstAdmission[i].SCHOOLID).append(`<li>${(lst_Ward_Assign_True[y].ASSIGNDISTRICTID) ? lst_Ward_Assign_True[y].ASSIGNDISTRICTNAME : ""}${(lst_Ward_Assign_True[y].ASSIGNWARDID) ? '_' + lst_Ward_Assign_True[y].ASSIGNWARDNAME : ""}${(lst_Ward_Assign_True[y].ALLOWED_DT1) ? "_DT1" : ""}${(lst_Ward_Assign_True[y].ALLOWED_DT2) ? "_DT2" : ""}${(lst_Ward_Assign_True[y].ALLOWED_DT3) ? "_DT3" : ""}</li>`);
                                        }
                                            // Xem trong lst này có phân tuyến trên khu phố thôn của phường xã khác không
                                         if (lst_Helmet_Assign_True.length > 0) {
                                                for (var z = 0; z < lst_Helmet_Assign_True.length; z++) {
                                                        $("#content" + lstAdmission[i].ADMISSIONID + lstAdmission[i].SCHOOLID).append(`<li>${(lst_Helmet_Assign_True[z].ASSIGNDISTRICTID) ? lst_Helmet_Assign_True[z].ASSIGNDISTRICTNAME : ""}${(lst_Helmet_Assign_True[z].ASSIGNWARDID) ? '_' + lst_Helmet_Assign_True[z].ASSIGNWARDNAME : ""}${(lst_Helmet_Assign_True[z].ASSIGNHAMLETID) ? '_' + lst_Helmet_Assign_True[z].ASSIGNHAMLETNAME : ""}${(lst_Helmet_Assign_True[z].ALLOWED_DT1) ? "_DT1" : ""}${(lst_Helmet_Assign_True[z].ALLOWED_DT2) ? "_DT2" : ""}${(lst_Helmet_Assign_True[z].ALLOWED_DT3) ? "_DT3" : ""}</li>`);
                                                }
                                            }
                                    }
                                    else {
                                        if (lst_Helmet_Assign_True.length > 0) {
                                            for (var z = 0; z < lst_Helmet_Assign_True.length; z++) {
                                                $("#content" + lstAdmission[i].ADMISSIONID + lstAdmission[i].SCHOOLID).append(`<li>${(lst_Helmet_Assign_True[z].ASSIGNDISTRICTID) ? lst_Helmet_Assign_True[z].ASSIGNDISTRICTNAME : ""}${(lst_Helmet_Assign_True[z].ASSIGNWARDID) ? '_' + lst_Helmet_Assign_True[z].ASSIGNWARDNAME : ""}${(lst_Helmet_Assign_True[z].ASSIGNHAMLETID) ? '_' + lst_Helmet_Assign_True[z].ASSIGNHAMLETNAME : ""}${(lst_Helmet_Assign_True[z].ALLOWED_DT1) ? "_DT1" : ""}${(lst_Helmet_Assign_True[z].ALLOWED_DT2) ? "_DT2" : ""}${(lst_Helmet_Assign_True[z].ALLOWED_DT3) ? "_DT3" : ""}</li>`);
                                            }
                                        }
                                    }

                                }
                            }
                            // break;
                        }
                        //$('#collapse' + schoolid).addClass('show');
                        $('#collapse' + schoolid).slideToggle();
                        //end
                    }
                   
                }

            });

        }
      



    },
    registerEvents: function () {
        $('#DISTRICTID').html(``);
        $('#SCHOOLGRADEID').html(``);
        $('#SCHOOLYEARID').html(``);
        var valDistrict = $("#cbbDistrict").val();
        var valSchoolGrade = $("#sbbSchoolgrade").val();
        var valSchoolYear = $("#cbbSchoolyear").val();
        var checkError = 0;
        if (valDistrict == null || valDistrict == "") {
            $('#DISTRICTID').html(`Vui lòng chọn thông tin`);
            checkError = 1;
        }
        if (valSchoolGrade == null || valSchoolGrade == "") {
            $('#SCHOOLGRADEID').html(`Vui lòng chọn thông tin`);
            checkError = 2;
        } if (valSchoolYear == null || valSchoolYear == "") {
            $('#SCHOOLYEARID').html(`Vui lòng chọn thông tin`);
            checkError = 3;
        }
        if (checkError == 0) {
            $('#DISTRICT').html(``);
            $('#SCHOOLGRADEID').html(``);
            $('#SCHOOLYEARID').html(``);

            $("#accordion").html(``);
            $.ajax({
                type: "POST",
                url: "/AdmissionInfo/GetSchoolInSearch",
                data: {
                    districtid: valDistrict,
                    schoolgradeid: valSchoolGrade,
                    schoolyearid: valSchoolYear
                },
                dataType: "Json",
                success: function (result) {

                    var lstSchool = result.lstSchool;
                    var lstAdmissionSchool = result.lstAdmissionSchool;
                    $("#accordion").append(``);
                    if (lstSchool.length > 0) {
                        for (var i = 0; i < lstSchool.length; i++) {
                            var stringAdmission = '';

                            $("#accordion").append(`<div class="card" id="card${lstSchool[i].SCHOOLID}"><div class="card-header">
                                <h5 class="mb-0">
                                    <button class="btn btn-link" onclick="jsAdmissioninfor.changeIcon(${i},'${lstSchool[i].SCHOOLID}',${lstSchool[i].SCHOOLYEARID})">
                                        <span id="title-collapsible" class="title-collapsible-class">${lstSchool[i].ORGANIZATIONNAME}</span>
                                    </button>
                              
                                </h5>
                            </div>
                            <div id="collapse${lstSchool[i].SCHOOLID}" class="collapse"  data-parent="#accordion">
                            </div>
                        </div>`);
                        }
                        $('.pn-list-schools').hasClass('hide') ? $('.pn-list-schools').removeClass('hide') : 0;
                    }
                    else {

                        $('.pn-list-schools').hasClass('hide') ? 0 : $('.pn-list-schools').addClass('hide');
                    }
                },
                error: function () {

                }
            });
        }

    }

}

$(document).ready(() => {
    jsAdmissioninfor.init();
});