var loggedInUserId = '';
var loggedInUserName = '';
var loggedInUserEmail = '';
$(document).ready(function () {
    loggedInUserId = $('#fpo-user-contact-id').val();
    loggedInUserName = $('#fpo-user-contact-name').val();
    loggedInUserEmail = $('#fpo-user-email').val();
    Navigation();

    SOEMaster();

    Dashboard();


});

var TotalperEMployee = '';
var LoginName = '';
function GetParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function SubmitData() {

    window.location.href = "";

}
function OpenXL() {
    window.location.href = "";

}
function Navigation() {
    var queryList = "";
    queryList =location.origin + "/_api/cr6fc_menumasters?$select=cr6fc_link,cr6fc_name&$filter=statecode eq 0  and cr6fc_role eq 2&$orderby=cr6fc_order asc&$top=5000";
    var requestHeaders = { "accept": "application/json;odata=verbose" };
    $.ajax({
        url: queryList,
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose"
        },
        success: function onSuccess(data) {
            try {
                var Loggs = data.value;
                if (Loggs.length > 0) {
                    var vHTML = '';
                    for (var i = 0; i < Loggs.length; i++) {
                        vHTML += "<li class='nav-item'><a class='nav-link' href='" + Loggs[i].cr6fc_link + "'>" + Loggs[i].cr6fc_name + "</a></li>"
                    }
                    if (vHTML != '' && vHTML != null && vHTML != undefined) {
                        document.getElementById("Navdiv").innerHTML = vHTML;
                        //$('#leftnavigation').text(vHTML);
                    }

                }
            }
            catch (e) {
                console.log(e);
            }

        },
        error: function onError(error) {
            console.log(JSON.stringify(error));
        }
    });


}

var SOEColl;
function SOEMaster() {
    // var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SOEDetails')//items?$top=5000&$select=*,BillToState/State,BillToState/Id,BillToState/StateCode&$expand=BillToState&$orderby=ID desc";
    var requestUri = location.origin +"/_api/cr6fc_soedetailses?$select=cr6fc_grandtotal,cr6fc_wfid,cr6fc_name,cr6fc_soedate,cr6fc_creditguaranteefee&$expand=cr6fc_BillToState($select=cr6fc_statemasterid,cr6fc_name)&$top=5000";
    var requestHeaders = { "accept": "application/json;odata=verbose" };
    $.ajax({
        url: requestUri,
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose"
        },
        success: function (data) {
            SOEColl = data.value;
        },
        error: function () {
            console.log("error");
        }
    });
}


function Dashboard() {
    // var LoginName = _spPageContextInfo.userId;
    var queryList = "";

    //queryList = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('CGApplications')/Items?$select=*&$filter=NSCheckerId eq '"+LoginName+"' and (Status eq 'Submitted to NabSanrakshan' or Status eq 'Approved by NabSaranrakshan' or  Status eq 'Rejected by NabSaranrakshan')&$top=5000&$orderby=ID asc"; 
    // queryList = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CGApplications')/Items?$select=*&$filter=NSCheckerId eq '" + LoginName + "' and (Status eq 'Payment Processed by ELI' or Status eq 'Payment Confirmed by NABSaranrakshan')&$top=5000&$orderby=ID desc";
    queryList = location.origin +"/_api/cr6fc_cgaplications?$select=cr6fc_cgaplicationid,cr6fc_name,cr6fc_nameoffpo,cr6fc_status,createdon,cr6fc_nameoflendinginstitution&$filter=_cr6fc_nschecker_value eq " + loggedInUserId + " and (cr6fc_status eq 10 or cr6fc_status eq 11 or cr6fc_status eq 12)&$top=5000";

    var requestHeaders = { "accept": "application/json;odata=verbose" };

    $.ajax({
        url: queryList,
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose"
        },
        success: function (data) {


            try {
                var Loggs = data.value;
                var vHTML = '';

                for (var i = 0; i < Loggs.length; i++) {
                    /*var vURLView;
                    if(Loggs[i].Status=="Submitted to NabSanrakshan" || Loggs[i].Status=="Sent Back by NABSaranrakshan")
                    {
                      vURLView ="/sites/FPOCGPortal/SitePages/NSCheckerApprovalForm.aspx?Item="+Loggs[i].ID;

                    }
                    else if(Loggs[i].Status=="Payment Processed by ELI")
                    {
                      vURLView ="/sites/FPOCGPortal/SitePages/NSCheckerPaymentStatus.aspx?Item="+Loggs[i].ID;
                    }*/

                    var vURLView = '';
                    var ViewLink = '';
                    var vURLEdit = '';
                    var EditLink = '';
                    if (Loggs[i]["cr6fc_status@OData.Community.Display.V1.FormattedValue"] == "Payment Processed by ELI") {
                        vURLEdit = "/NSCheckerPaymentStatus/?Item=" + Loggs[i].cr6fc_cgaplicationid;

                        EditLink = "<a href='" + vURLEdit + "'  style='margin:0;Padding:0;padding-left: 17px;'><i class='fa fa-edit' style='color: #f55905 !important;' aria-hidden='true'></i></a>";

                        vURLView = "/CGFeePaymentVeiwForm/?Item=" + Loggs[i].cr6fc_cgaplicationid;

                        ViewLink = "<a href='" + vURLView + "'  style='margin:0;Padding:0;padding-left: 10px;'><i class='fa fa-bars' style='color: #f55905 !important;' aria-hidden='true'></i></a>";
                    }
                    else {
                        vURLView = "/CGFeePaymentVeiwForm/?Item=" + Loggs[i].cr6fc_cgaplicationid;

                        ViewLink = "<a href='" + vURLView + "'  style='margin:0;Padding:0;padding-left: 10px;'><i class='fa fa-bars' style='color: #f55905 !important;' aria-hidden='true'></i></a>";
                    }

                    /* var filterSOEData = $.grep(SOEColl, function (value) {
                         return (value.cr6fc_wfid == Loggs[i].cr6fc_cgapplicationsid);
                     });
 
                     var SoENo = '';
                     var SOEDate = '';
                     var SOECGFee = '';
                     if (filterSOEData.length > 0) {
                         if (filterSOEData[0].Title != null && filterSOEData[0].Title != '' && filterSOEData[0].Title != undefined) {
                             SoENo = filterSOEData[0].Title;
                         }
                         if (filterSOEData[0].SOEDate != null && filterSOEData[0].SOEDate != undefined && filterSOEData[0].SOEDate != '') {
                             SOEDate = GetCreatedDateTime(filterSOEData[0].SOEDate);
                         }
                         SOECGFee = filterSOEData[0].GrandTotal;
                     }*/
                    var filterSOEData = $.grep(SOEColl, function (value) {
                        return (value.cr6fc_wfid == Loggs[i].cr6fc_cgaplicationid);
                    });
                    var SoENo = '';
                    var SOEDate = '';
                    var SOECGFee = '';
                    if (filterSOEData.length > 0) {
                        SoENo = filterSOEData[0].cr6fc_name;
                        if (filterSOEData[0].cr6fc_soedate != null && filterSOEData[0].cr6fc_soedate != undefined && filterSOEData[0].cr6fc_soedate != '') {
                            SOEDate = GetCreatedDateTime(filterSOEData[0].cr6fc_soedate);
                        }
                        SOECGFee = filterSOEData[0].cr6fc_grandtotal;
                    }
                    vHTML += "<tr style='line-height: 16px;'>" +
                        "<td style='text-align:center'>" + Loggs[i].cr6fc_nameoflendinginstitution + "</td>" +
                        "<td style='text-align:center'>" + Loggs[i].cr6fc_name + "</td>" +
                        //"<td style='text-align:center'>"+Loggs[i].NameOfLendingInstitution+"</td>"+
                        "<td style='text-align:center'>" + Loggs[i].cr6fc_nameoffpo + "</td>" +
                        "<td style='text-align:center'>" + SoENo + "</td>" +
                        "<td style='text-align:center'>" + SOEDate + "</td>" +
                        "<td style='text-align:center'>" + SOECGFee + "</td>" +


                        "<td style='text-align:center'>" + Loggs[i]["cr6fc_status@OData.Community.Display.V1.FormattedValue"] + "</td>" +
                        "<td style='text-align:center; margin:0; padding:0;'>" + EditLink + "<a href='" + vURLView + "' target='_blank' style='margin:0;Padding:0;padding-left: 10px;'><i class='fa fa-bars' style='color: #f55905 !important;' aria-hidden='true'></i></a></td>" +

                        "<td style='text-align:center; display:none !Important;'>" + Loggs[i].createdon + "</td>" +

                        "</tr>";
                }

                if (vHTML != "") {
                    $('#tblDataMain').DataTable().clear();
                    $('#tblDataMain').DataTable().destroy();
                    document.getElementById("tbodyRequestor").innerHTML = vHTML;
                    $('#tblDataMain').DataTable({
                        "order": [[8, 'dsc']]
                    });
                }
                else {
                    // vHTML ="<tr><td colspan='15'><font face='Calibri' size='2'>No Employee Addition Deletion</font></td></tr>"; 
                    vHTML = "<tr><td colspan='15'><font face='Calibri' size='2'>No CG Application</font></td></tr>";
                    document.getElementById("tbodyRequestor").innerHTML = vHTML;
                    $('#tblDataMain').dataTable();
                }
            }
            catch (e) {
                console.log(e);
            }
            //getData(PolicyNo);
        },
        error: function () {
            console.log("error");
        }
    });
}
function BindHomeDetails() {
    debugger;
    // var LoginName = _spPageContextInfo.userId;
    var ddlStatus = document.getElementById("ddlStatus").value;
    var vHTML = "";
    var queryList = "";
    if (ddlStatus !== "All") {

        //  queryList = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CGApplications')/Items?$select=*&$filter=(NSCheckerId eq '" + LoginName + "' and Status eq '" + ddlStatus + "' )&$top=5000&$orderby=ID desc";
        queryList = "/_api/cr6fc_cgapplicationses?$select=cr6fc_cgaplicationid,cr6fc_name,cr6fc_nameoffpo,cr6fc_status,createdon,cr6fc_nameoflendinginstitution&$filter=_cr6fc_nschecker_value eq '" + loggedInUserId + "' and cr6fc_status eq " + ddlStatus + " &$top=5000";
    }
    else {
        // queryList = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CGApplications')/Items?$select=*&$filter=NSCheckerId eq '" + LoginName + "'&$top=5000&$orderby=ID desc";
        queryList = "/_api/cr6fc_cgapplicationses?$select=cr6fc_cgaplicationid,cr6fc_name,cr6fc_nameoffpo,cr6fc_status,createdon,cr6fc_nameoflendinginstitution&$filter=_cr6fc_nschecker_value eq '" + loggedInUserId + "' and (cr6fc_status eq 10 or cr6fc_status eq 8) &$top=5000";
    }
    var requestHeaders = { "accept": "application/json;odata=verbose" };
    $.ajax({
        url: queryList,
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose"
        },
        success: function (data) {
            try {
                var Loggs = data.value;
                var vHTML = '';

                for (var i = 0; i < Loggs.length; i++) {
                    var vURLView = '';
                    var ViewLink = '';
                    var vURLEdit = '';
                    var EditLink = '';
                    if (Loggs[i]["cr6fc_status@OData.Community.Display.V1.FormattedValue"] == "Payment Processed by ELI") {
                        vURLEdit = "/NSCheckerPaymentStatus/?Item=" + Loggs[i].cr6fc_cgaplicationid;
                        EditLink = "<a href='" + vURLEdit + "'  style='margin:0;Padding:0;padding-left: 17px;'><i class='fa fa-edit' aria-hidden='true'></i></a>";
                        vURLView = "/CGFeePaymentVeiwForm/?Item=" + Loggs[i].cr6fc_cgaplicationid;
                        ViewLink = "<a href='" + vURLView + "'  style='margin:0;Padding:0;padding-left: 10px;'><i class='fa fa-bars' aria-hidden='true'></i></a>";
                    }
                    else {
                        vURLView = "/CGFeePaymentVeiwForm/?Item=" + Loggs[i].cr6fc_cgaplicationid;
                        ViewLink = "<a href='" + vURLView + "'  style='margin:0;Padding:0;padding-left: 10px;'><i class='fa fa-bars' aria-hidden='true'></i></a>";
                    }
                    var filterSOEData = $.grep(SOEColl, function (value) {
                        return (value.cr6fc_wfid == Loggs[i].cr6fc_cgaplicationid);
                    });
                    var SoENo = '';
                    var SOEDate = '';
                    var SOECGFee = '';
                    if (filterSOEData.length > 0) {
                        SoENo = filterSOEData[0].cr6fc_name;
                        if (filterSOEData[0].cr6fc_soedate != null && filterSOEData[0].cr6fc_soedate != undefined && filterSOEData[0].cr6fc_soedate != '') {
                            SOEDate = GetCreatedDateTime(filterSOEData[0].cr6fc_soedate);
                        }
                        SOECGFee = filterSOEData[0].cr6fc_creditguaranteefee;
                    }

                    vHTML += "<tr style='line-height: 16px;'>" +
                        "<td style='text-align:center'>" + Loggs[i].cr6fc_nameoflendinginstitution + "</td>" +
                        "<td style='text-align:center'>" + Loggs[i].cr6fc_name + "</td>" +
                        //  "<td style='text-align:center'>"+Loggs[i].NameOfLendingInstitution+"</td>"+
                        "<td style='text-align:center'>" + Loggs[i].cr6fc_nameoffpo + "</td>" +
                        "<td style='text-align:center'>" + SoENo + "</td>" +

                        "<td style='text-align:center'>" + SOEDate + "</td>" +
                        "<td style='text-align:center'>" + SOECGFee + "</td>" +


                        "<td style='text-align:center'>" + Loggs[i]["cr6fc_status@OData.Community.Display.V1.FormattedValue"] + "</td>" +
                        "<td style='text-align:center;  margin:0; padding:0;'>" + EditLink + "<a href='" + vURLView + "' target='_blank' style='margin:0;Padding:0;padding-left: 10px;'><i class='fa fa-bars' style='color: #f55905 !important;'  aria-hidden='true'></i></a></td>" +

                        "<td style='text-align:center; display:none !Important;'>" + Loggs[i].cr6fc_cgaplicationid + "</td>" +

                        "</tr>";



                }

                if (vHTML != "") {
                    $('#tblDataMain').DataTable().clear();
                    $('#tblDataMain').DataTable().destroy();
                    document.getElementById("tbodyRequestor").innerHTML = vHTML;
                    $('#tblDataMain').DataTable({
                        "order": [[7, 'dsc']],
                        // scrollY: "300px",
                        //  scrollX:  true,
                        // scrollCollapse: true,
                        paging: true,
                        "bInfo": false,
                        "bFilter": true
                    });


                }
                else {
                    //vHTML ="<tr><td colspan='15'><font face='Calibri' size='2'>No Employee Addition Deletion</font></td></tr>"; 
                    vHTML = "<tr><td colspan='15'><font face='Calibri' size='2'>No CG Application</font></td></tr>";
                    document.getElementById("tbodyRequestor").innerHTML = vHTML;
                    $('#tblDataMain').DataTable();
                }

            }
            catch (e) {
                console.log(e);
            }
            //getData(PolicyNo);
        },
        error: function () {
            console.log("error");
        }
    });
}
function GetCreatedDateTime(vCreatedDate) {
    var vCreated = vCreatedDate;
    var today = new Date(vCreated);
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    var Newtoday = dd + '/' + mm + '/' + yyyy + " " + strTime;
    return Newtoday;
}
/*if (InvoiceNumber == null || InvoiceNumber == undefined || InvoiceNumber == '') {
    document.getElementById("panelshow").style.display = 'none';
    document.getElementById("showvendor").style.display = 'none';

}*/
