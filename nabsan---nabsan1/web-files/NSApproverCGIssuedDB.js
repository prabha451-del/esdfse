var loggedInUserId = '';
var loggedInUserName = '';
var loggedInUserEmail = '';
$(document).ready(function () {
	loggedInUserId = $('#fpo-user-contact-id').val();
	loggedInUserName = $('#fpo-user-contact-name').val();
	loggedInUserEmail = $('#fpo-user-email').val();
	UTRMaster();
	SOEMaster();
	TaxInvoicesGet();
	Dashboard();
	Navigation();
});
function Navigation() {
	var queryList = "";
	//queryList = location.origin + "/_api/cr6fc_menumasters?$select=*&$filter=statecode eq 0  and cr6fc_role eq 3&$orderby=cr6fc_order asc&$top=5000";
	queryList = location.origin + "/_api/cr6fc_menumasters?$select=*&$filter=statecode eq 0 and  cr6fc_role eq 3 &$orderby=cr6fc_order asc&$top=5000";
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
var UTRColl;
function UTRMaster() {
	//var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('UTRDetails')//items?$top=5000&$select=*,CGID&$orderby=ID desc";
	//var requestUri = location.origin + "/_api/cr6fc_renewalutrdetailses?$select=cr6fc_cgid,cr6fc_paymentreceiveddate&$top=5000";
	var requestUri = location.origin + "/_api/cr6fc_renewalutrdetailses?$select=cr6fc_cgid,cr6fc_paymentreceiveddate&$top=5000";

	$.ajax({
		url: requestUri,
		type: "GET",
		async: false,
		headers: {
			"accept": "application/json;odata=verbose",
			"content-type": "application/json;odata=verbose"
		},
		success: function (data) {
			UTRColl = data.value;
		},
		error: function () {
			console.log("error");
		}
	});
}
var TaxInvoicesColl;
function TaxInvoicesGet() {
	//var requestUri = location.origin + "/_api/cr6fc_renewaltaxinvoices?$select=cr6fc_cgid,cr6fc_cgpan&$top=5000";
	var requestUri = location.origin + "/_api/cr6fc_renewaltaxinvoices?$select=cr6fc_cgid,cr6fc_cgpan&$top=5000";
	$.ajax({
		url: requestUri,
		type: "GET",
		async: false,
		headers: {
			"accept": "application/json;odata=verbose",
			"content-type": "application/json;odata=verbose"
		},
		success: function (data) {
			TaxInvoicesColl = data.value;
		},
		error: function (error) {
			console.log(error);
		}
	});
}
var SOEColl;
function SOEMaster() {
	//var requestUri = location.origin + "/_api/cr6fc_renewalsoedetailses?$select=cr6fc_wfid,cr6fc_eligibleguranteecover&$top=5000";
	var requestUri = location.origin + "/_api/cr6fc_renewalsoedetailses?$select=cr6fc_wfid,cr6fc_eligibleguranteecover&$top=5000";
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
		error: function (error) {
			console.log(error);
		}
	});
}
var CGPANNo = '';
var UTREligible = '';
var ViewLink = '';
function Dashboard() {
	var queryList = "";
	//queryList = location.origin + "/_api/cr6fc_renewalcgapplications?$select=cr6fc_status,cr6fc_nameoflendinginstitution,cr6fc_renewalcgapplicationid,cr6fc_cgstatus,cr6fc_cgpan,cr6fc_nameoffpo,cr6fc_guaranteestartdate,cr6fc_parentid&$filter=_cr6fc_nsapprover_value eq '" + loggedInUserId + "' and (cr6fc_status eq 15)&$top=5000";
	queryList = location.origin + "/_api/cr6fc_renewalcgapplications?$select=cr6fc_status,cr6fc_nameoflendinginstitution,cr6fc_renewalcgapplicationid,cr6fc_cgstatus,cr6fc_cgpan,cr6fc_nameoffpo,cr6fc_guaranteestartdate,cr6fc_parentid&$filter=_cr6fc_nsapprover_value eq '" + loggedInUserId + "' and (cr6fc_status eq 15)&$top=5000";
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
					var vURLView;
					if (Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == "Guarantee Renewed") {
						vURLView = "//?Item=" + Loggs[i].cr6fc_renewalcgapplicationid + "&Page=NSApproverCGPay";
					}
					else if (Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == "Payment Confirmed by NABSaranrakshan") {
						vURLView = "/sites/FPOCGPortalUAT/SitePages/Renewal Application/ViewRenewalCGFeePayment.aspx?Item=" + Loggs[i].cr6fc_renewalcgapplicationid + "&Page=NSApproverCGPay";
					}
					var vURLView = '';
					var vURLEdit = '';
					var EditLink = '';
					if (Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == "Guarantee Renewed") {
						vURLEdit = "/sites/FPOCGPortal/SitePages/NSApproverPayment.aspx?Item=" + Loggs[i].cr6fc_renewalcgapplicationid;

						EditLink = "<a href='" + vURLEdit + "' target='_blank' style='margin:0;Padding:0;padding-left: 40px;'><i class='fa fa-edit' aria-hidden='true'></i></a>";

						vURLView = "/sites/FPOCGPortalUAT/SitePages/Renewal Application/ViewRenewalCGFeePayment.aspx?Item=" + Loggs[i].cr6fc_renewalcgapplicationid + "&Page=NSApproverCGPay";

						ViewLink = "<a href='" + vURLView + "' target='_blank' style='margin:0;Padding:0;padding-left:18px;'><i class='fa fa-bars' aria-hidden='true'></i></a>";
					}

					var filterUTRData = $.grep(UTRColl, function (value) {
						return (value.cr6fc_cgid == Loggs[i].cr6fc_renewalcgapplicationid);
					});

					var UTRDate = '';
					if (filterUTRData != undefined) {
						if (filterUTRData.length > 0) {
							UTRDate = GetCreatedDateTime(filterUTRData[0].cr6fc_paymentreceiveddate);
						}
					}
					var filterSOEData = $.grep(SOEColl, function (value) {
						return (value.cr6fc_wfid == Loggs[i].cr6fc_renewalcgapplicationid);
					});
					if (filterSOEData != undefined) {
						if (filterSOEData.length > 0) {
							UTREligible = filterSOEData[0].cr6fc_eligibleguranteecover;
						}
					}
					var filterTaxData = $.grep(TaxInvoicesColl, function (value) {
						return (value.cr6fc_cgid == Loggs[i].cr6fc_parentid);
					});
					if (filterTaxData != undefined) {
						if (filterTaxData.length > 0) {
							CGPANNo = filterTaxData[0].cr6fc_cgpan;
						}
					}
					if (Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == "Guarantee Renewed") {
						vStatus = "Guarantee Renewed";
					}
					else {
						vStatus = Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'];
					}

					var editlink = "https://nabardmumbai.sharepoint.com/sites/FPOCGPortalUAT/SitePages/RenewalApplication/CGApplicationViewForm.aspx?ItemID=" + Loggs[i].cr6fc_renewalcgapplicationid;
					vHTML += "<tr style='line-height: 16px;'>" +
						"<td style='text-align:center'>" + Loggs[i].cr6fc_nameoflendinginstitution + "</td>" +
						"<td style='text-align:center'>" + CGPANNo + "</td>" +
						"<td style='text-align:center'>" + Loggs[i].cr6fc_nameoffpo + "</td>" +
						"<td style='text-align:center'>" + UTREligible + "</td>" +
						"<td style='text-align:center'>" + GetCreatedDateTime(Loggs[i].cr6fc_guaranteestartdate) + "</td>" +
						"<td style='text-align:center'>" + Loggs[i]['cr6fc_cgstatus@OData.Community.Display.V1.FormattedValue'] + "</td>" +
						"<td style='text-align:center'>" + vStatus + "</td>" +
						"<td style='text-align:center;  margin:0; padding:0;'><span>" + ViewLink + "</span></td>" +
						"<td style='text-align:center !important;'><a href='" + editlink + "' target='_blank'><i class='fa fa-eye' aria-hidden='true'></i></a></td>" +
						"<td style='text-align:center; display:none  !Important;'>" + Loggs[i].cr6fc_renewalcgapplicationid + "</td>" +
						"</tr>";




				}

				if (vHTML != "") {
					$('#tblDataMain').DataTable().clear();
					$('#tblDataMain').DataTable().destroy();
					document.getElementById("tbodyRequestor").innerHTML = vHTML;
					$('#tblDataMain').DataTable();


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
		error: function (error) {
			console.log(error);
		}
	});


}
function BindHomeDetails() {
	debugger;
	var LoginName = _spPageContextInfo.userId;
	var ddlStatus = document.getElementById("ddlStatus").value;
	if (ddlStatus == "Guarantee Renewed") {
		ddlStatus = "Guarantee Issued";
	}
	var vHTML = "";
	var queryList = "";
	if (ddlStatus !== "All") {
		queryList = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('RenewalCGApplication')/Items?$select=*&$filter=(NSApproverId eq '" + LoginName + "' and Status eq '" + ddlStatus + "' )&$top=5000&$orderby=ID desc";
	}
	else {
		queryList = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('RenewalCGApplication')/Items?$select=*&$filter=NSApproverId eq '" + LoginName + "'&$top=5000&$orderby=ID desc";

	}
	var requestHeaders = { "accept": "application/json;odata=verbose" };
	$.ajax({
		url: queryList,
		contentType: "application/json;odata=verbose",
		headers: requestHeaders,
		async: false,
		cache: false,
		success: function (data) {


			try {
				var Loggs = data.d.results;
				var vHTML = '';

				for (var i = 0; i < Loggs.length; i++) {
					var vURLView;
					if (Loggs[i].Status == "Review by NABSaranrakshan") {
						vURLView = "/sites/FPOCGPortal/SitePages/NSApproverForm.aspx?Item=" + Loggs[i].ID;
					}
					else if (Loggs[i].Status == "Payment Confirmed by NABSaranrakshan") {
						vURLView = "/sites/FPOCGPortal/SitePages/NSApproverPayment.aspx?Item=" + Loggs[i].ID;
					}
					//https://nabardmumbai.sharepoint.com/sites/FPOCGPortal/SitePages/CGApplicationEditForm.aspx
					//var vURLEdit ="";
					var filterUTRData = $.grep(UTRColl, function (value) {
						return (value.CGID == Loggs[i].Id);
					});

					//var SoENo='';
					var UTRDate = '';
					//var SOECGFee='';
					if (filterUTRData.length > 0) {
						//SoENo=filterSOEData[0].Title;
						UTRDate = GetCreatedDateTime(filterUTRData[0].PaymentReceivedDate);
						//SOECGFee=filterSOEData[0].CreditGuaranteeFee;
					}

					var filterSOEData = $.grep(SOEColl, function (value) {
						return (value.WFID == Loggs[i].Id);
					});
					if (filterSOEData.length > 0) {
						//SoENo=filterSOEData[0].Title;
						UTREligible = filterSOEData[0].EligibleGuranteeCover;
						//SOECGFee=filterSOEData[0].CreditGuaranteeFee;
					}

					if (Loggs[i].Status == "Guarantee Issued") {
						vStatus = "Guarantee Renewed"
					}
					else {
						vStatus = Loggs[i].Status;
					}

					vHTML += "<tr style='line-height: 16px;'>" +
						"<td style='text-align:center'>" + Loggs[i].NameOfLendingInstitution + "</td>" +
						"<td style='text-align:center'>" + CGPANNo + "</td>" +
						"<td style='text-align:center'>" + Loggs[i].NameOfFPO + "</td>" +
						"<td style='text-align:center'>" + UTREligible + "</td>" +
						"<td style='text-align:center'>" + GetCreatedDateTime(Loggs[i].GuaranteeStartDate) + "</td>" +
						"<td style='text-align:center'>" + Loggs[i].CGStatus + "</td>" +
						"<td style='text-align:center'>" + vStatus + "</td>" +
						"<td style='text-align:center;  margin:0; padding:0;'><span>" + ViewLink + "</span></td>" +
						"<td style='text-align:center; display:none  !Important;'>" + Loggs[i].ID + "</td>" +
						"</tr>";




				}

				if (vHTML != "") {
					$('#tblDataMain').DataTable().clear();
					$('#tblDataMain').DataTable().destroy();
					document.getElementById("tbodyRequestor").innerHTML = vHTML;
					$('#tblDataMain').DataTable({
						"order": [[6, 'dsc']],
						// scrollY: "300px",
						// scrollX:  true,
						// scrollCollapse: true,
						paging: true,
						"bSort": true,
						"bInfo": false,
						"bFilter": true
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
		error: function (error) {
			console.log(error);
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