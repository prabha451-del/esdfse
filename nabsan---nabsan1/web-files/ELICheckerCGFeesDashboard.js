var loggedInUserId = '';
var loggedInUserName = '';
var loggedInUserEmail = '';

$(document).ready(function () {
    Navigation();
    SOEMaster();
    loggedInUserId = $('#fpo-user-contact-id').val();
    loggedInUserName = $('#fpo-user-contact-name').val();
    loggedInUserEmail = $('#fpo-user-email').val();
    // Dashboard();
    EliMasterData(loggedInUserEmail);

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
var nameEliInstitute;
const EliMasterData = (loggedInUserEmail) =>{
	//let URL = location.origin+"/_api/cr6fc_elimasters?$select=cr6fc_lendinginstitute,cr6fc_elicheckeremailid&$filter= cr6fc_elicheckeremailid eq '"+loggedInUserEmail+"'";
    let URL = location.origin+"/_api/cr6fc_elimasters?$select=cr6fc_lendinginstitute,cr6fc_elicheckeremailid&$filter= cr6fc_elicheckeremailid eq '"+loggedInUserEmail+"'";
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
function Navigation() {
    var queryList = "";
   // queryList = location.origin+"/_api/cr6fc_menumasters?$select=statecode,cr6fc_role,cr6fc_link,cr6fc_name&$filter=statecode eq 0  and cr6fc_role eq 1&$orderby=cr6fc_order asc&$top=5000";
    queryList = location.origin+"/_api/cr6fc_menumasters?$select=statecode,cr6fc_order,cr6fc_link,cr6fc_name&$filter=statecode eq 0 and cr6fc_role eq 1&$orderby=cr6fc_order asc&$top=5000";
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
                      //  vHTML += "<li class='nav-item'><a class='nav-link' href='" + Loggs[i].cr6fc_link + "'>" + Loggs[i].cr6fc_name + "</a></li>"
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

var SOEColl;
function SOEMaster() {
    //var requestUri = location.origin+"/_api/cr6fc_soedetailses?$select=cr6fc_grandtotal,cr6fc_soedate,cr6fc_BillToState,cr6fc_wfid,cr6fc_soedetailsid,cr6fc_name,cr6fc_creditguaranteefee,cr6fc_taxamount,cr6fc_grandtotal,cr6fc_fpo,cr6fc_eligibleguranteecover&$expand=cr6fc_BillToState($select=cr6fc_statemasterid,cr6fc_name)&$top=5000";
    var requestUri = location.origin+"/_api/cr6fc_soedetailses?$select=cr6fc_grandtotal,cr6fc_soedate,cr6fc_BillToState,cr6fc_wfid,cr6fc_soedetailsid,cr6fc_name,cr6fc_creditguaranteefee,cr6fc_taxamount,cr6fc_grandtotal,cr6fc_fpo,cr6fc_eligibleguranteecover&$expand=cr6fc_BillToState($select=cr6fc_statemasterid,cr6fc_name)&$top=5000";
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
    var queryList = "";
   // queryList = location.origin+"/_api/cr6fc_cgapplicationses?$select=cr6fc_nameoflendinginstitution,cr6fc_cgapplicationsid,cr6fc_status,cr6fc_name,cr6fc_nameoffpo,createdon&$filter=cr6fc_nameoflendinginstitution eq '" + nameEliInstitute + "' and (cr6fc_status eq 8 or cr6fc_status eq 10 or cr6fc_status eq 12 or cr6fc_status eq 14 )&$top=5000";
    queryList = location.origin+"/_api/cr6fc_cgaplications?$select=cr6fc_nameoflendinginstitution,cr6fc_cgaplicationid,cr6fc_status,cr6fc_name,cr6fc_nameoffpo,createdon&$filter=cr6fc_nameoflendinginstitution eq '" +nameEliInstitute +"'and (cr6fc_status eq 8 or cr6fc_status eq 10 or cr6fc_status eq 12 or cr6fc_status eq 14 )&$top=5000";
    //queryList = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('CGApplications')/Items?$select=*&$filter=ELICheckerId eq '"+LoginName+"' and (Status eq 'Approved by NABSaranrakshan' or Status eq 'Payment Processed by ELI'  or Status eq 'Payment Inititated' or Status eq 'Returned by Checker')&$top=5000&$orderby=ID desc"; 
    // queryList = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('CGApplications')/Items?$select=*&$filter=ELICheckerId eq '"+LoginName+"' and (Status eq '' or Status eq 'Payment Inititated by ELI')&$top=5000&$orderby=ID desc"; 

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
                    //var vURLView = "/sites/FPOCGPortal/SitePages/ELICheckerApprovalForm.aspx?Item=" + Loggs[i].cr6fc_cgapplicationsid;
                    var vURLView = "/sites/FPOCGPortal/SitePages/ELICheckerApprovalForm.aspx?Item=" + Loggs[i].cr6fc_cgaplicationid;
                    //https://nabardmumbai.sharepoint.com/sites/FPOCGPortal/SitePages/CGApplicationEditForm.aspx
                   // var Status = Loggs[i]["cr6fc_status@OData.Community.Display.V1.FormattedValue"];
                    var Status = Loggs[i]["cr6fc_status@OData.Community.Display.V1.FormattedValue"];
                  //  var vURLEdit = "/sites/FPOCGPortal/SitePages/ELICheckerApprovalForm.aspx?Item=" + Loggs[i].cr6fc_cgapplicationsid;
                    var vURLEdit = "/sites/FPOCGPortal/SitePages/ELICheckerApprovalForm.aspx?Item=" + Loggs[i].cr6fc_cgaplicationid;

                    if (Status == "Pending For Approval") {
                       //  var vURLEdit = "/sites/FPOCGPortal/SitePages/ELICheckerApprovalForm.aspx?Item=" + Loggs[i].;
                       // vURLEdit1 = "<a href='" + vURLEdit + "'  style='margin:0;Padding:0;'><i class='fa fa-pencil' aria-hidden='true'></i></a>"
                        var vURLEdit = "/sites/FPOCGPortal/SitePages/ELICheckerApprovalForm.aspx?Item=" + Loggs[i].cr6fc_cgaplicationid;
                        vURLEdit1 = "<a href='" + vURLEdit + "'  style='margin:0;Padding:0;'><i class='fa fa-pencil' aria-hidden='true'></i></a>"
                    }
                    else if (Status == "Payment Inititated by ELI" || Status == "Payment Inititated") {
                        /*var vURLEdit = location.origin+"/ELICheckerUTRApproverForm/?Item=" + Loggs[i].cr6fc_cgapplicationsid;
                        vURLEdit1 = "<a href='" + vURLEdit + "'  style='margin:0;Padding:0;'><i class='fa fa-pencil' aria-hidden='true'></i></a>"

                        var vURLView = location.origin+"/CGFeePaymentVeiwForm/?Item=" + Loggs[i].cr6fc_cgapplicationsid;
                        vURLView1 = "<a href='" + vURLView + "'  style='margin:0;Padding:0;'><i class='fa fa-eye' aria-hidden='true'></i></a>"*/

                        var vURLEdit = location.origin+"/ELICheckerUTRApproverForm/?Item=" + Loggs[i].cr6fc_cgaplicationid;
                        vURLEdit1 = "<a href='" + vURLEdit + "'  style='margin:0;Padding:0;'><i class='fa fa-pencil' aria-hidden='true'></i></a>"

                        var vURLView = location.origin+"/CGFeePaymentVeiwForm/?Item=" + Loggs[i].cr6fc_cgaplicationid;
                        vURLView1 = "<a href='" + vURLView + "'  style='margin:0;Padding:0;'><i class='fa fa-eye' aria-hidden='true'></i></a>"

                    }
                    else {
                        /*vURLEdit1 = "";
                        var vURLView = location.origin+"/CGFeePaymentVeiwForm/?Item=" + Loggs[i].cr6fc_cgapplicationsid;
                        vURLView1 = "<a href='" + vURLView + "'  style='margin:0;Padding:0;'><i class='fa fa-eye' aria-hidden='true'></i></a>"*/
                        vURLEdit1 = "";
                        var vURLView = location.origin+"/CGFeePaymentVeiwForm/?Item=" + Loggs[i].cr6fc_cgaplicationid;
                        vURLView1 = "<a href='" + vURLView + "'  style='margin:0;Padding:0;'><i class='fa fa-eye' aria-hidden='true'></i></a>"

                    }
                    var filterSOEData = $.grep(SOEColl, function (value) {
                        return (value.cr6fc_wfid == Loggs[i].cr6fc_cgaplicationid);
                    });
                    var SoENo = '';
                    var SOEDate = '';
                    var SOECGFee = '';
                    if (filterSOEData.length > 0) {
                        SoENo = filterSOEData[0].cr6fc_name;
                        SOEDate = GetCreatedDateTime(filterSOEData[0].cr6fc_soedate);
                        SOECGFee = filterSOEData[0].cr6fc_grandtotal;
                    }

                    vHTML += "<tr style='line-height: 16px;'>" +

                        "<td style='text-align:center'>" + Loggs[i].cr6fc_name + "</td>" +
                        "<td style='text-align:center'>" + Loggs[i].cr6fc_nameoffpo + "</td>" +

                        "<td style='text-align:center'>" + SoENo + "</td>" +

                        "<td style='text-align:center'>" + SOEDate + "</td>" +
                        "<td style='text-align:center'>" + SOECGFee + "</td>" +

                        "<td style='text-align:center'>" + Loggs[i]["cr6fc_status@OData.Community.Display.V1.FormattedValue"] + "</td>" +
                        "<td style='text-align:center; margin:0; padding:0;'>" + vURLEdit1 + "<a href='" + vURLView + "' target='_blank' style='margin:0;Padding:0; padding:0;'><i class='fa fa-bars' aria-hidden='true'></i></a></td>" +

                        "<td style='text-align:center; display:none;'>" + Loggs[i].createdon + "</td>" +

                        "</tr>";
                }

                if (vHTML != "") {
                    $('#tblDataMain').DataTable().clear();
                    $('#tblDataMain').DataTable().destroy();
                    document.getElementById("tbodyRequestor").innerHTML = vHTML;
                    $('#tblDataMain').DataTable({
                        "order": [[7, 'desc']]
                       
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
    //var LoginName = _spPageContextInfo.userId;
    var ddlStatus = document.getElementById("ddlStatus").value;
    var vHTML = "";
    var queryList = "";
    if (ddlStatus !== "All" && ddlStatus !== "") {
       // queryList = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CGApplications')/Items?$select=*&$filter=(ELICheckerId eq '" + LoginName + "' and Status eq '" + ddlStatus + "' )&$top=5000";
        queryList = location.origin+"/_api/cr6fc_cgaplications?$select=*&$filter=cr6fc_nameoflendinginstitution eq '" + nameEliInstitute + "' and (cr6fc_status eq " + ddlStatus + ")&$top=5000";
    }
    else {
      //queryList = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CGApplications')/Items?$select=*&$filter=ELICheckerIdeq '" + LoginName + "'&$top=5000&$orderby=ID asc";
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
                    var vURLView = "/sites/FPOCGPortal/SitePages/ELICheckerApprovalForm.aspx?Item=" + Loggs[i].cr6fc_cgaplicationid;
                    //https://nabardmumbai.sharepoint.com/sites/FPOCGPortal/SitePages/CGApplicationEditForm.aspx
                    var Status = Loggs[i]["cr6fc_status@OData.Community.Display.V1.FormattedValue"];
                    var vURLEdit = "/sites/FPOCGPortal/SitePages/ELICheckerApprovalForm.aspx?Item=" + Loggs[i].cr6fc_cgaplicationid;

                    if (Status == "Pending For Approval") {
                        var vURLEdit = "/sites/FPOCGPortal/SitePages/ELICheckerApprovalForm.aspx?Item=" + Loggs[i].cr6fc_cgaplicationid;
                        vURLEdit1 = "<a href='" + vURLEdit + "'  style='margin:0;Padding:0;'><i class='fa fa-pencil' aria-hidden='true'></i></a>"
                    }
                    else if (Status == "Payment Inititated by ELI" || Status == "Payment Inititated") {
                        var vURLEdit = location.origin+"/ELICheckerUTRApproverForm/?Item=" + Loggs[i].cr6fc_cgaplicationid;
                        vURLEdit1 = "<a href='" + vURLEdit + "'  style='margin:0;Padding:0;'><i class='fa fa-pencil' aria-hidden='true'></i></a>"

                        var vURLView = location.origin+"/CGFeePaymentVeiwForm/?Item=" + Loggs[i].cr6fc_cgaplicationid;
                        vURLView1 = "<a href='" + vURLView + "'  style='margin:0;Padding:0;'><i class='fa fa-eye' aria-hidden='true'></i></a>"

                    }
                    else {
                        vURLEdit1 = "";
                        var vURLView = location.origin+"/CGFeePaymentVeiwForm/?Item=" + Loggs[i].cr6fc_cgaplicationid;
                        vURLView1 = "<a href='" + vURLView + "'  style='margin:0;Padding:0;'><i class='fa fa-eye' aria-hidden='true'></i></a>"

                    }
                    var filterSOEData = $.grep(SOEColl, function (value) {
                        return (value.cr6fc_wfid == Loggs[i].cr6fc_cgaplicationid);
                    });
                    var SoENo = '';
                    var SOEDate = '';
                    var SOECGFee = '';
                    if (filterSOEData.length > 0) {
                        SoENo = filterSOEData[0].cr6fc_name;
                        SOEDate = GetCreatedDateTime(filterSOEData[0].cr6fc_soedate);
                        SOECGFee = filterSOEData[0].cr6fc_creditguaranteefee;
                    }

                    vHTML += "<tr style='line-height: 16px;'>" +
                        "<td style='text-align:center'>" + Loggs[i].cr6fc_name + "</td>" +
                        "<td style='text-align:center'>" + Loggs[i].cr6fc_nameoffpo + "</td>" +
                        "<td style='text-align:center'>" + SoENo + "</td>" +
                        "<td style='text-align:center'>" + SOEDate + "</td>" +
                        "<td style='text-align:center'>" + SOECGFee + "</td>" +
                        "<td style='text-align:center'>" + Loggs[i]["cr6fc_status@OData.Community.Display.V1.FormattedValue"] + "</td>" +
                        "<td style='text-align:center; margin:0; padding:0;'>" + vURLEdit1 + "<a href='" + vURLView + "' target='_blank' style='margin:0;Padding:0; padding-left: 60px;'><i class='fa fa-bars' aria-hidden='true'></i></a></td>" +
                        "<td style='text-align:center; display:none;'>" + Loggs[i].cr6fc_cgaplicationid + "</td>" +

                        "</tr>";
                }

                if (vHTML != "") {
                    $('#tblDataMain').DataTable().clear();
                    $('#tblDataMain').DataTable().destroy();
                    document.getElementById("tbodyRequestor").innerHTML = vHTML;
                    $('#tblDataMain').DataTable(/*{
                        "order": [[7, 'dsc']],
                        paging: true,
                        "bSort": false,
                        "bInfo": false,
                        "bFilter": true
                    }*/);


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
