var loggedInUserId = '';
var loggedInUserName = '';
var loggedInUserEmail = '';
$(document).ready(function () {
    $('title').text('NS Approver Dashboard');
    loggedInUserId = $('#fpo-user-contact-id').val();
    loggedInUserName = $('#fpo-user-contact-name').val();
    loggedInUserEmail = $('#fpo-user-email').val();
    Navigation();

    // SOEMaster();

    Dashboard();

});
$(document).ready(function(){
    $('li:first-child a').addClass('active');
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
    //queryList = location.origin+"/_api/cr6fc_menumasters?$select=cr6fc_link,cr6fc_name,cr6fc_role,statecode&$filter=statecode eq 0  and cr6fc_role eq 3&$orderby=cr6fc_order asc&$top=5000";
    queryList = location.origin+"/_api/cr6fc_menumasters?$select=cr6fc_link,cr6fc_name,cr6fc_role,statecode&$filter=statecode eq 0  and cr6fc_role eq 3&$orderby=cr6fc_order asc&$top=5000";
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
                        //vHTML += "<li class='nav-item'><a class='nav-link' href='" + Loggs[i].cr6fc_link + "'>" + Loggs[i].cr6fc_name + "</a></li>"
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
function Dashboard() {
    var queryList = "";
   // queryList = location.origin+"/_api/cr6fc_cgapplicationses?$select=_cr6fc_nsapprover_value,cr6fc_nameoflendinginstitution,cr6fc_cgapplicationsid,cr6fc_status,cr6fc_name,cr6fc_nameoffpo,createdon,cr6fc_accountno,cr6fc_sanctionedamount&$filter=_cr6fc_nsapprover_value eq " + loggedInUserId + " and (cr6fc_status eq 7 or cr6fc_status eq 5 or cr6fc_status eq 6 or cr6fc_status eq 16 or cr6fc_status eq 8 or cr6fc_status eq 9)&$top=5000";
queryList = location.origin+"/_api/cr6fc_cgaplications?$select=_cr6fc_nsapprover_value,cr6fc_nameoflendinginstitution,cr6fc_cgaplicationid,cr6fc_status,cr6fc_name,cr6fc_nameoffpo,createdon,cr6fc_accountno,cr6fc_sanctionedamount&$filter=_cr6fc_nsapprover_value eq " + loggedInUserId + " and (cr6fc_status eq 7 or cr6fc_status eq 5 or cr6fc_status eq 6 or cr6fc_status eq 16 or cr6fc_status eq 8 or cr6fc_status eq 9)&$top=5000";
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
                    if (Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == "Review by NABSaranrakshan" || Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == "Recommend for Rejection") {
                        vURLEdit = location.origin+"/NSApprover/?Item=" + Loggs[i].cr6fc_cgaplicationid;

                        EditLink = "<a href='" + vURLEdit + "'  style='margin:0; padding-right:10px'><i class='fa fa-edit' aria-hidden='true'></i></a>";

                        vURLView = location.origin+"/CGApplicationNSViewForm/?Item=" + Loggs[i].cr6fc_cgaplicationid + "&Page=NSApprover";

                        ViewLink = "<a href='" + vURLView + "'  style='margin:0;' target='_blank'><i class='fa fa-bars' aria-hidden='true'></i></a>";
                    }
                    else {
                        vURLView = location.origin+"/CGApplicationNSViewForm/?Item=" + Loggs[i].cr6fc_cgaplicationid + "&Page=NSApprover";

                        ViewLink = "<a href='" + vURLView + "'  style='margin:0;' target='_blank'><i class='fa fa-bars' aria-hidden='true'></i></a>";
                    }
                    var vStatus = '';
                    if (Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == "Recommend for Rejection") {
                        vStatus = "Review by NABSaranrakshan"
                    }
                    else {
                        vStatus = Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'];
                    }
                    //https://sharepointistech.sharepoint.com/sites/NABSANRAKSHAN/SitePages/CGApplicationEditForm.aspx
                    //var vURLEdit ="";
                    vHTML += "<tr style='line-height: 16px;'>" +
                        "<td style='text-align:center'>" + Loggs[i].cr6fc_nameoflendinginstitution + "</td>" +
                        "<td style='text-align:center'>" + Loggs[i].cr6fc_name + "</td>" +
                        "<td style='text-align:center'>" + GetCreatedDateTime(Loggs[i].createdon) + "</td>" +
                        "<td style='text-align:center'>" + Loggs[i].cr6fc_nameoffpo + "</td>" +
                        "<td style='text-align:center'>" + Loggs[i].cr6fc_accountno + "</td>" +
                        "<td style='text-align:center'>" + Loggs[i].cr6fc_sanctionedamount + "</td>" +
                        "<td style='text-align:center'>" + vStatus + "</td>" +
                        "<td style='text-align:center;  margin:0; padding:0;'><span>" + EditLink + "</span><span>" + ViewLink + "</span></td>" +
                        "<td style='text-align:center; display:none;'>" + Loggs[i].createdon + "</td>" +
                        "</tr>";
                }

                if (vHTML != "") {
                    $('#tblDataMain').DataTable().clear();
                    $('#tblDataMain').DataTable().destroy();
                    document.getElementById("tbodyRequestor").innerHTML = vHTML;
                    $('#tblDataMain').DataTable({
                        "order": [[8, 'desc']]
                    });
                }
                else {
                    //vHTML ="<tr><td colspan='15'><font face='Calibri' size='2'>No Employee Addition Deletion</font></td></tr>"; 

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
  //  var LoginName = _spPageContextInfo.userId;
    var ddlStatus = document.getElementById("ddlStatus").value;
    var vHTML = "";
    var queryList = "";
    if (ddlStatus !== "All") {
      //  queryList = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CGApplications')/Items?$select=*&$filter=(NSApproverId eq '" + LoginName + "' and Status eq '" + ddlStatus + "' )&$top=5000&$orderby=ID desc";
      //queryList = location.origin+"/_api/cr6fc_cgapplicationses?$select=_cr6fc_nsapprover_value,cr6fc_nameoflendinginstitution,cr6fc_cgapplicationsid,cr6fc_status,cr6fc_name,cr6fc_nameoffpo,createdon,cr6fc_accountno,cr6fc_sanctionedamount&$filter=_cr6fc_nsapprover_value eq '" + loggedInUserId + "' and (cr6fc_status eq " + ddlStatus + ")&$top=5000";
      queryList = location.origin+"/_api/cr6fc_cgaplications?$select=_cr6fc_nsapprover_value,cr6fc_nameoflendinginstitution,cr6fc_cgaplicationid,cr6fc_status,cr6fc_name,cr6fc_nameoffpo,createdon,cr6fc_accountno,cr6fc_sanctionedamount&$filter=_cr6fc_nsapprover_value eq '" + loggedInUserId + "' and (cr6fc_status eq " + ddlStatus + ")&$top=5000";
    }
    else {
       // queryList = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CGApplications')/Items?$select=*&$filter=NSApproverId eq '" + LoginName + "'&$top=5000&$orderby=ID desc";
      // queryList = location.origin+"/_api/cr6fc_cgapplicationses?$select=_cr6fc_nsapprover_value,cr6fc_nameoflendinginstitution,cr6fc_cgapplicationsid,cr6fc_status,cr6fc_name,cr6fc_nameoffpo,createdon,cr6fc_accountno,cr6fc_sanctionedamount&$filter=_cr6fc_nsapprover_value eq '" + loggedInUserId + "' and (cr6fc_status eq 7 or cr6fc_status eq 5 or cr6fc_status eq 6 or cr6fc_status eq 16 or cr6fc_status eq 8 or cr6fc_status eq 9)&$top=5000";
       queryList = location.origin+"/_api/cr6fc_cgaplications?$select=_cr6fc_nsapprover_value,cr6fc_nameoflendinginstitution,cr6fc_cgaplicationid,cr6fc_status,cr6fc_name,cr6fc_nameoffpo,createdon,cr6fc_accountno,cr6fc_sanctionedamount&$filter=_cr6fc_nsapprover_value eq '" + loggedInUserId + "' and (cr6fc_status eq 7 or cr6fc_status eq 5 or cr6fc_status eq 6 or cr6fc_status eq 16 or cr6fc_status eq 8 or cr6fc_status eq 9)&$top=5000";
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
                    if (Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == "Review by NABSaranrakshan" || Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == "Recommend for Rejection") {
                        vURLEdit = location.origin+"/NSApprover/?Item=" + Loggs[i].cr6fc_cgaplicationid;

                        EditLink = "<a href='" + vURLEdit + "'  style='margin:0; padding-right:10px'><i class='fa fa-edit' aria-hidden='true'></i></a>";

                        vURLView =location.origin+"/CGApplicationNSViewForm.aspx/?Item=" + Loggs[i].cr6fc_cgaplicationid + "&Page=NSApprover";

                        ViewLink = "<a href='" + vURLView + "'  style='margin:0;'><i class='fa fa-bars' aria-hidden='true'></i></a>";
                    }
                    else {
                        vURLView = location.origin+"/CGApplicationNSViewForm.aspx/?Item=" + Loggs[i].cr6fc_cgaplicationid + "&Page=NSApprover";

                        ViewLink = "<a href='" + vURLView + "'  style='margin:0;'><i class='fa fa-bars' aria-hidden='true'></i></a>";
                    }
                    var vStatus = '';
                    if (Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == "Recommend for Rejection") {
                        vStatus = "Review by NABSaranrakshan"
                    }
                    else {
                        vStatus = Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'];
                    }
                    //https://sharepointistech.sharepoint.com/sites/NABSANRAKSHAN/SitePages/CGApplicationEditForm.aspx
                    //var vURLEdit ="";
                  /*  var filterSOEData = $.grep(SOEColl, function (value) {
                        return (value.WFID == Loggs[i].Id);
                    });*/

                    vHTML += "<tr style='line-height: 16px;'>" +
                    "<td style='text-align:center'>" + Loggs[i].cr6fc_nameoflendinginstitution + "</td>" +
                    "<td style='text-align:center'>" + Loggs[i].cr6fc_name + "</td>" +
                    "<td style='text-align:center'>" + GetCreatedDateTime(Loggs[i].createdon) + "</td>" +
                    "<td style='text-align:center'>" + Loggs[i].cr6fc_nameoffpo + "</td>" +
                    "<td style='text-align:center'>" + Loggs[i].cr6fc_accountno + "</td>" +
                    "<td style='text-align:center'>" + Loggs[i].cr6fc_sanctionedamount + "</td>" +
                    "<td style='text-align:center'>" + vStatus + "</td>" +
                    "<td style='text-align:center;  margin:0; padding:0;'><span>" + EditLink + "</span><span>" + ViewLink + "</span></td>" +
                    "<td style='text-align:center; display:none;'>" + Loggs[i].cr6fc_cgaplicationid + "</td>" +
                    "</tr>";
                }

                if (vHTML != "") {
                    $('#tblDataMain').DataTable().clear();
                    $('#tblDataMain').DataTable().destroy();
                    document.getElementById("tbodyRequestor").innerHTML = vHTML;
                    $('#tblDataMain').DataTable({
                        "order": [[8, 'dsc']],
                        //scrollY: "300px",
                        // scrollX:  true,
                        //scrollCollapse: true,
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
    //var Newtoday = dd + '/' + mm + '/' + yyyy+" "+strTime;
    var Newtoday = dd + '/' + mm + '/' + yyyy;
    return Newtoday;
}