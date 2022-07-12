var jsAdmissionRule = {

    /** init */
    init: () => {

    },
    search: () => {
        var keyword = $("#textSearch").val();
      
            $.ajax({
                method: "POST",
                url: "AdmissionRule/GetOrganizationByKeyword",
                data: {
                    "KEYWORD": keyword
                },
                success: function (result) {
                    var table = $("#ListOrganization");
                    var a = ``;
                    if (result.length > 0) {
                            for (var i = 0; i < result.length; i++) {
                                a = a + `<a class="list-group-item list-group-item-action" href="javascript:void(0)" onclick="jsAdmissionRule.getAdmission(this)" data-id="${result[i].organizationid}">${result[i].organizationname}</a>`
                                    ;
                            }
                    }
                    table.html(a);
                }

            });
        return false;
    },
    downloadFromFileServer: function (hash, callBack) {//
        
        $.ajax({
            type: "POST",
            method: "POST",
            url: "UploadDownloadHandler/GetFile",
            data: { hashFile: hash }
        }).done((data) => {
            callBack(data);
        });
    },
    downloadFile: function (lol) {
        
        var fileid = $(lol).attr("data-id");
        jsAdmissionRule.downloadFromFileServer(fileid, (data) => {
            //console.log(data);
            window.open(data)
        });
    },
    getAdmission: (ele) => {
        var orId = $(ele).attr("data-id");
        $('#ListOrganization a').removeClass('active');
        $(ele).addClass('active');
        $.ajax({
            method: "POST",
            url: "AdmissionRule/GetDocumentByOrID",
            data: {
                "ORGANIZATIONID": orId
            },
            success: function (result) {
                var table = $('#table');
                var a = ``;
                if (result.length > 0) {
                        for (var i = 0; i < result.length; i++) {
                            a = a + `
                                    <div class="row no-gutters">
                                        <div class="col-5 col-xl-7 p-2 bg-white ${i === result.length - 1 ? 'brbl-025' : 'border-custom border-bottom'}">${result[i].title}</div>
                                        <div class="col-2 p-2 bg-white ${i === result.length - 1 ? '' : 'border-custom border-bottom'}">${result[i].documentnumber}</div>
                                        <div class="col-3 col-xl-2 p-2 bg-white text-center ${i === result.length - 1 ? '' : 'border-custom border-bottom'}">${result[i].issueddate}</div>
                                        <div class="col-2 col-xl-1 p-2 bg-white text-center ${i === result.length - 1 ? 'brbr-025' : 'border-custom border-bottom'}"><a href="javascript:void(0);" onclick="jsAdmissionRule.downloadFile(this)" data-id="${result[i].fileid}"><i class="fa fa-download"></i></a></div>
                                    </div>
                                `;
                        }
                }
                table.html(a);
            }
        });

    }
}

$(document).ready(() => {
    jsAdmissionRule.init();
    
}); 