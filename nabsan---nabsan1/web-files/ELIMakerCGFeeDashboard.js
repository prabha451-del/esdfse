var loggedInUserId = '';
var loggedInUserName = '';
var loggedInUserEmail = '';
$(document).ready(function () {
    Navigation();

    loggedInUserId = $('#fpo-user-contact-id').val();
    loggedInUserName = $('#fpo-user-contact-name').val();
    loggedInUserEmail = $('#fpo-user-email').val();
    SOEMaster();
    EliMasterData(loggedInUserEmail);
   
    // Dashboard();


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
   // queryList = location.origin+"/_api/cr6fc_menumasters?$select=*&$filter=statecode eq 0  and cr6fc_role eq 0&$orderby=cr6fc_order asc&$top=5000";
    queryList = location.origin+"/_api/cr6fc_menumasters?$select=*&$filter=statecode eq 0 and cr6fc_role eq 0&$orderby=cr6fc_order asc&$top=5000";
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
                        vHTML += "<li class='nav-item'><a class='nav-link' href='" + Loggs[i].cr6fc_link +"'>" + Loggs[i].cr6fc_name + "</a></li>"
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
var nameEliInstitute;
const EliMasterData = (loggedInUserEmail) =>{
  //  let URL = location.origin+"/_api/cr6fc_elimasters?$select=*&$filter= cr6fc_emailid eq '"+loggedInUserEmail+"'";
    let URL = location.origin+"/_api/cr6fc_elimasters?$select=*&$filter= cr6fc_emailid eq '"+loggedInUserEmail+"'";
           $.ajax({
               url: URL,
               type: "GET",
               async: false,
               headers: {
                   "accept": "application/json;odata=verbose",
                   "content-type": "application/json;odata=verbose"
               },
               success: function (data) {
                   Loggmakerrequestdata = data.value;
                   if (Loggmakerrequestdata.length > 0) {
                       for(var a =0;a<Loggmakerrequestdata.length;a++){
                           //nameEliInstitute = Loggmakerrequestdata[0].cr6fc_lendinginstitute;
                           nameEliInstitute = Loggmakerrequestdata[0].cr6fc_lendinginstitute;
                       }
                       Dashboard(nameEliInstitute);
                   }
                   else{
                          alert("Log in id is not a Eli Maker");
                          return false;
                   }
                   
               },
               error: function () {
                   console.log("error");
               }
           });
   }
var SOEColl;
function SOEMaster() {
    // var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SOEDetails')//items?$top=5000&$select=*d&$expand=BillToState&$orderby=ID desc";
    //var requestUri = location.origin+"/_api/cr6fc_soedetailses?$select=*&$expand=cr6fc_BillToState(cr6fc_name,cr6fc_statemasterid)&$top=5000";
   // var requestUri = location.origin+"/_api/cr6fc_soedetailses?$select=cr6fc_wfid,cr6fc_soeno,cr6fc_soedate,cr6fc_grandtotal&$top=5000";
    var requestUri = location.origin+"/_api/cr6fc_soedetailses?$select=cr6fc_wfid,cr6fc_soeno,cr6fc_soedate,cr6fc_grandtotal&$top=5000";
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


function Dashboard(nameEliInstitute) {
    //var loggedInUserId=_spPageContextInfo.userId; 
    var queryList = "";
   // queryList = location.origin+"/_api/cr6fc_cgapplicationses?$select=cr6fc_nameoflendinginstitution,cr6fc_status,createdon,cr6fc_cgapplicationsid,cr6fc_name,cr6fc_nameoffpo&$filter=cr6fc_nameoflendinginstitution eq '" + nameEliInstitute + "' and (cr6fc_status eq 8 or cr6fc_status eq 10 or cr6fc_status eq 12 or cr6fc_status eq 14 )&$top=5000&$orderby=createdon desc";
    queryList = location.origin+"/_api/cr6fc_cgaplications?$select=cr6fc_nameoflendinginstitution,cr6fc_status,createdon,cr6fc_cgaplicationid,cr6fc_name,cr6fc_nameoffpo&$filter=cr6fc_nameoflendinginstitution eq '" + nameEliInstitute + "' and (cr6fc_status eq 8 or cr6fc_status eq 10 or cr6fc_status eq 12 or cr6fc_status eq 14 )&$top=5000&$orderby=createdon desc";
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
                var vURLEdit1 = '';
                for (var i = 0; i < Loggs.length; i++) {
                    var Status = '';
                    if (Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == "Sent Back by ELI Checker" || Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == "Saved") {
                        //vURLEdit1 ="https://nabardmumbai.sharepoint.com/sites/FPOCGPortal/SitePages/CGApplicationEditForm.aspx?Item="+Loggs[i].ID;
                        vURLEdit1 = location.origin+"/CGApplicationEditForm/?Item=" + Loggs[i].cr6fc_cgaplicationid;
                        vURLEdit1 = "<a href='" + vURLEdit1 + "'  title='Edit Form' style='margin:0;Padding:0;'><i class='fa fa-pencil' aria-hidden='true'></i></a>"
                    }
                    else if (Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == "Approved by NABSaranrakshan") {
                        vURLEdit1 = location.origin+"/ELIMakerUTRDetails/?Item=" + Loggs[i].cr6fc_cgaplicationid;
                        var vURLView =location.origin+"/CGApplicationViewForm/?Item=" + Loggs[i].cr6fc_cgaplicationid;
                        vURLEdit1 = "<a href='" + vURLEdit1 + "' title='Enter UTR Details' style='margin:0;Padding:0;'><i class='fa fa-pencil' aria-hidden='true'></i></a>"
                    }
                    else if (Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == "Sent Back" || Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == "Returned by Checker") {
                        vURLEdit1 = location.origin+"/EliMakerSendBackUTRForm/?Item=" + Loggs[i].cr6fc_cgaplicationid;
                        var vURLView = location.origin+"/CGFeePaymentVeiwForm/?Item=" + Loggs[i].cr6fc_cgaplicationid + "&Page=ELImaker";
                        vURLEdit1 = "<a href='" + vURLEdit1 + "'  title='Enter UTR Details' style='margin:0;Padding:0;'><i class='fa fa-pencil' aria-hidden='true'></i></a>"
                    }
                    else {
                        vURLEdit1 = "";
                        var vURLView = location.origin+"/CGFeePaymentVeiwForm/?Item=" + Loggs[i].cr6fc_cgaplicationid + "&Page=ELImaker";

                    }

                    var filterSOEData = $.grep(SOEColl, function (n) {
                        return (n.cr6fc_wfid == Loggs[i].cr6fc_cgaplicationid);
                    });
                    var SoENo = '';
                    var SOEDate = '';
                    var SOECGFee = '';
                    if (filterSOEData.length > 0) {
                        if (filterSOEData[0].cr6fc_soeno != null && filterSOEData[0].cr6fc_soeno != '') {
                            SoENo = filterSOEData[0].cr6fc_soeno;
                        }
                        else {
                            SoENo = '';
                        }
                        if (filterSOEData[0].cr6fc_soedate != null && filterSOEData[0].cr6fc_soedate != undefined) {
                            SOEDate = GetCreatedDateTime(filterSOEData[0].cr6fc_soedate);

                        }
                        SOECGFee = filterSOEData[0].cr6fc_grandtotal;
                    }

                    vHTML += "<tr style='line-height: 16px;'>" +

                        "<td style='text-align:center'>" + Loggs[i].cr6fc_name + "</td>" +
                        "<td style='text-align:center'>" + Loggs[i].cr6fc_nameoffpo + "</td>" +
                        "<td style='text-align:center'>" + SoENo + "</td>" +
                        "<td style='text-align:center'>" + SOEDate + "</td>" +
                        "<td style='text-align:center'>" + SOECGFee + "</td>" +
                        "<td style='text-align:center'>" + Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] + "</td>" +
                        "<td style='text-align:center;  margin:0; '>" + vURLEdit1 + "<a href='" + vURLView + "' target='_blank' style='margin:0;Padding:10px;'><i class='fa fa-bars' aria-hidden='true'></i></a></td>" +
                        "<td style='text-align:center; display:none;'>" + Loggs[i].cr6fc_cgaplicationid + "</td>" +

                        "</tr>";
                }

                if (vHTML != "") {
                    $('#tblDataMain').DataTable().clear();
                        $('#tblDataMain').DataTable().destroy();
                        document.getElementById("tbodyRequestor").innerHTML=vHTML;
                      	$('#tblDataMain').DataTable({ 
	                  "order": [[7,'dsc']],
	                  // scrollY: "300px",
                       // scrollX:  true,
                       //  scrollCollapse: true,
                         paging:true,
                         "bSort": true,
       					 "bInfo": false,
						  "bFilter": true
					});
                }
                else {
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
    if (ddlStatus !== "All" && ddlStatus !== "") {
       // queryList = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CGApplications')/Items?$select=*&$filter=(ELICheckerId eq '" + LoginName + "' and Status eq '" + ddlStatus + "' )&$top=5000";
      // queryList = location.origin+"/_api/cr6fc_cgapplicationses?$select=*&$filter=cr6fc_nameoflendinginstitution eq '" + nameEliInstitute + "' and (cr6fc_status eq " + ddlStatus + " )&$top=5000";
       queryList = location.origin+"/_api/cr6fc_cgaplications?$select=*&$filter=cr6fc_nameoflendinginstitution eq '" + nameEliInstitute + "' and (cr6fc_status eq " + ddlStatus + " )&$top=5000";
   
    }
    else {
     //   queryList = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CGApplications')/Items?$select=*&$filter=ELICheckerId eq '" + LoginName + "'&$top=5000&$orderby=ID asc";
    // queryList = location.origin+"/_api/cr6fc_cgapplicationses?$select=*&$filter=cr6fc_nameoflendinginstitution eq '" + nameEliInstitute + "' and (cr6fc_status eq 8 or cr6fc_status eq 10 or cr6fc_status eq 12 or cr6fc_status eq 14 )&$top=5000";
     queryList = location.origin+"/_api/cr6fc_cgaplications?$select=*&$filter=cr6fc_nameoflendinginstitution eq '" + nameEliInstitute + "' and (cr6fc_status eq 8 or cr6fc_status eq 10 or cr6fc_status eq 12 or cr6fc_status eq 14 )&$top=5000";
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
                var vURLEdit1 = '';
                for (var i = 0; i < Loggs.length; i++) {
                    if (Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == "Sent Back by ELI Checker" || Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == "Saved") {
                        //vURLEdit1 ="https://nabardmumbai.sharepoint.com/sites/FPOCGPortal/SitePages/CGApplicationEditForm.aspx?Item="+Loggs[i].ID;
                        vURLEdit1 = location.origin+"/CGApplicationEditForm/?Item=" + Loggs[i].cr6fc_cgaplicationid;
                        vURLEdit1 = "<a href='" + vURLEdit1 + "'  title='Edit Form' style='margin:0;Padding:0;'><i class='fa fa-pencil' aria-hidden='true'></i></a>"
                    }
                    else if (Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == "Approved by NABSaranrakshan") {
                        vURLEdit1 = location.origin+"/ELIMakerUTRDetails/?Item=" + Loggs[i].cr6fc_cgaplicationid;
                        var vURLView = location.origin+"/CGApplicationViewForm/?Item=" + Loggs[i].cr6fc_cgaplicationid;
                        vURLEdit1 = "<a href='" + vURLEdit1 + "' title='Enter UTR Details' style='margin:0;Padding:0;'><i class='fa fa-pencil' aria-hidden='true'></i></a>"
                    }
                    else if (Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == "Sent Back" || Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == "Returned by Checker") {
                        vURLEdit1 = "https://nabardmumbai.sharepoint.com/sites/FPOCGPortal/SitePages/ELIMakerSendBackUTRForm.aspx?Item=" + Loggs[i].cr6fc_cgaplicationid;
                        var vURLView = location.origin+"/CGFeePaymentVeiwForm/?Item=" + Loggs[i].cr6fc_cgaplicationid + "&Page=ELImaker";
                        vURLEdit1 = "<a href='" + vURLEdit1 + "'  title='Enter UTR Details' style='margin:0;Padding:0;'><i class='fa fa-pencil' aria-hidden='true'></i></a>"
                    }
                    else {
                        vURLEdit1 = "";
                        var vURLView = location.origin+"/CGFeePaymentVeiwForm/?Item=" + Loggs[i].cr6fc_cgaplicationid + "&Page=ELImaker";

                    }
                   
                    var filterSOEData = $.grep(SOEColl, function (n) {
                        return (n.cr6fc_wfid == Loggs[i].cr6fc_cgaplicationid);
                    });
                    var SoENo = '';
                    var SOEDate = '';
                    var SOECGFee = '';
                    if (filterSOEData.length > 0) {
                        if (filterSOEData[0].cr6fc_soeno != null && filterSOEData[0].cr6fc_soeno != '') {
                            SoENo = filterSOEData[0].cr6fc_soeno;
                        }
                        else {
                            SoENo = '';
                        }
                        if (filterSOEData[0].cr6fc_soedate != null && filterSOEData[0].cr6fc_soedate != undefined) {
                            SOEDate = GetCreatedDateTime(filterSOEData[0].cr6fc_soedate);

                        }
                        SOECGFee = filterSOEData[0].cr6fc_grandtotal;
                    }
                    vHTML += "<tr style='line-height: 16px;'>" +
                        "<td style='text-align:center'>" + Loggs[i].cr6fc_name + "</td>" +
                        "<td style='text-align:center'>" + Loggs[i].cr6fc_nameoffpo + "</td>" +
                        "<td style='text-align:center'>" + SoENo + "</td>" +
                        "<td style='text-align:center'>" + SOEDate + "</td>" +
                        "<td style='text-align:center'>" + SOECGFee + "</td>" +
                        "<td style='text-align:center'>" + Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] + "</td>" +
                        "<td style='text-align:center;  margin:0; '>" + vURLEdit1 + "<a href='" + vURLView + "' target='_blank' style='margin:0;Padding:10px; '><i class='fa fa-bars' aria-hidden='true'></i></a></td>" +
                        "<td style='text-align:center; display:none;'>" + Loggs[i].cr6fc_cgaplicationid + "</td>" +

                        "</tr>";
                }

                if (vHTML != "") {
                    $('#tblDataMain').DataTable().clear();
                    //$('#tblDataMain').DataTable().destroy();
                    document.getElementById("tbodyRequestor").innerHTML = vHTML;
                   /* $('#tblDataMain').DataTable({
                        "order": [[7, 'dsc']],
                        // scrollY: "300px",
                        // scrollX: true,
                        // scrollCollapse: true,
                        paging: true,
                        "bSort": false,
                        "bInfo": false,
                        "bFilter": true
                    });*/


                }
                else {
                    vHTML = "<tr><td colspan='15'><font face='Calibri' size='2'>No CG Application</font></td></tr>";
                    //vHTML ="<tr><td colspan='15'><font face='Calibri' size='2'>No Employee Addition Deletion</font></td></tr>"; 
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
    var Newtoday = dd + '/' + mm + '/' + yyyy;
    return Newtoday;
}
 /* if(InvoiceNumber == null || InvoiceNumber == undefined || InvoiceNumber == '')
{
   document.getElementById("panelshow").style.display = 'none';
   document.getElementById("showvendor").style.display = 'none';

}*/
