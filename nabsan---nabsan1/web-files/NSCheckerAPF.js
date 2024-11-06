var vItemID;
var vTotalDocLength = 0;
var fileArray = [];
var otherfileArray = [];
var AttchLength = 0;
var arraycount = 0;


var loggedInUserId = '';
var loggedInUserName = '';
var loggedInUserEmail = '';
$(document).ready(function () {
	loggedInUserId = $('#fpo-user-contact-id').val();
	loggedInUserName = $('#fpo-user-contact-name').val();
	loggedInUserEmail = $('#fpo-user-email').val();
	$('title').text('CGChecker');
	vItemID = GetQueryStingValue()["Item"];
	var vTaskID = GetQueryStingValue()["Task"];
	document.getElementById("MangmentCheck").unabled = true;
	//TaxMaster(vItemID);
	//SOEMaster(vItemID);
	RateMster();
	RegionMaster();
	bindCGApplicationData(vItemID);
	NSApprovalMatrix();
	TrustMaster();
	SOEMasterID(vItemID);
	getfileNSApprover(vItemID);
	getfileNSChecker(vItemID);
	getcontactdata();
	$("#vehicle1").change(function () {

		var checked = $(this).is(':checked');
		if (checked) {
			$("#vehicle1").each(function () {
				$(this).prop("checked", true);
				document.getElementById("MangmentCheck").disabled = false;

			});
		} else {
			$("#vehicle1").each(function () {
				$(this).prop("checked", false);
				document.getElementById("MangmentCheck").disabled = true;

			});
		}
	});

});

function GetQueryStingValue() {
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for (var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

var RegionMasterColl;
function RegionMaster() {
	var requestUri = location.origin + "/_api/cr6fc_regionmasters?$select=cr6fc_regionmasterid,cr6fc_minmembers";
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
			RegionMasterColl = data.value;
		},
		error: function () {
			console.log("error");
		}
	});
}


var TrustMasterColl;
function TrustMaster() {
	//var requestUri = location.origin + "/_api/('TrustMaster')//items?$top=500&$select=*,Title,ID,State/State,State/Id,State/StateCode&$expand=State&$orderby=ID asc";
	var requestUri = location.origin + "/_api/cr6fc_trustmasters?$select=cr6fc_State&$expand=cr6fc_State($select=cr6fc_statemasterid,cr6fc_name)";
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
			TrustMasterColl = data.value;
		},
		error: function () {
			console.log("error");
		}
	});
}

var TaxMasterColl;
function TaxMaster() {
	//var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('TaxInvoices')//items?$top=5000&$select=*&$orderby=ID desc";
	var requestUri = location.origin + "/_api/cr6fc_taxinvoiceses?$select=*&$top=5000";
	//var requestHeaders = { "accept": "application/json;odata=verbose" };
	$.ajax({
		url: requestUri,
		type: "GET",
		async: false,
		headers: {
			"accept": "application/json;odata=verbose",
			"content-type": "application/json;odata=verbose"
		},
		success: function (data) {
			TaxMasterColl = data.value;
		},
		error: function () {
			console.log("error");
		}
	});
}

function convertNumberToWords(num) {
	var ones = ["", "One ", "Two ", "Three ", "Four ", "Five ", "Six ", "Seven ", "Eight ", "Nine ", "Ten ", "Eleven ", "Twelve ", "Thirteen ", "Fourteen ", "Fifteen ", "Sixteen ", "Seventeen ", "Eighteen ", "Nineteen "];
	var tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
	if ((num = num.toString()).length > 9) return "Overflow: Maximum 9 digits supported";
	n = ("000000000" + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
	if (!n) return;
	var str = "";
	str += n[1] != 0 ? (ones[Number(n[1])] || tens[n[1][0]] + " " + ones[n[1][1]]) + "Crore " : "";
	str += n[2] != 0 ? (ones[Number(n[2])] || tens[n[2][0]] + " " + ones[n[2][1]]) + "Lakh " : "";
	str += n[3] != 0 ? (ones[Number(n[3])] || tens[n[3][0]] + " " + ones[n[3][1]]) + "Thousand " : "";
	str += n[4] != 0 ? (ones[Number(n[4])] || tens[n[4][0]] + " " + ones[n[4][1]]) + "Hundred " : "";
	str += n[5] != 0 ? (str != "" ? "and " : "") + (ones[Number(n[5])] || tens[n[5][0]] + " " + ones[n[5][1]]) : "";
	return str;
}

var SOEMasterColl;
function SOEMaster() {
	var requestUri = location.origin + "/_api/cr6fc_soedetailses?$select=*&$top=5000";
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
			SOEMasterColl = data.value;
		},
		error: function () {
			console.log("error");
		}
	});
}

var ToatalSanctionAmt = 0;
var ExcludingCurrSanctionAmt = 0;
var CGApplPANColl;
function CGApplPANCollData(vPANNo, CGColl) {

	//var requestUri = location.origin + "/_api/cr6fc_renewalcgapplications?$top=5000&$select=*&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=cr6fc_panfpo eq '" + vPANNo + "' and (cr6fc_status eq 8 or cr6fc_status eq 10 or cr6fc_status eq 11 or cr6fc_status eq 13 or cr6fc_status eq 15 or cr6fc_status eq 12)";
	var requestUri = location.origin + "/_api/cr6fc_renewalcgapplications?$top=5000&$select=*&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=cr6fc_panfpo eq '" + vPANNo + "' and (cr6fc_status eq 8 or cr6fc_status eq 10 or cr6fc_status eq 11 or cr6fc_status eq 13 or cr6fc_status eq 15 or cr6fc_status eq 12)";
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
			CGApplPANColl = data.value;
			if (CGApplPANColl.length > 0) {

				for (var i = 0; i < CGApplPANColl.length; i++) {
					var SOEDate = new Date(CGApplPANColl[i].cr6fc_soegenerateddate)
					var CurrDate = new Date();
					var difference = SOEDate.getTime() - CurrDate.getTime();
					var TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
					console.log(difference);
					if (CGApplPANColl[i].cr6fc_status == "8" && TotalDays > 60) {
						if (CGApplPANColl[i].cr6fc_sanctionedamount != null && CGApplPANColl[i].cr6fc_sanctionedamount != '') {
							ToatalSanctionAmt = ToatalSanctionAmt + parseFloat(CGApplPANColl[i].cr6fc_sanctionedamount);
						}
					}
					else if (CGApplPANColl[i].cr6fc_status != "8") {
						if (CGApplPANColl[i].cr6fc_sanctionedamount != null && CGApplPANColl[i].cr6fc_sanctionedamount != '') {
							ToatalSanctionAmt = ToatalSanctionAmt + parseFloat(CGApplPANColl[i].cr6fc_sanctionedamount);
						}

					}

				}
				ExcludingCurrSanctionAmt = ToatalSanctionAmt;
				if (CGColl[0].cr6fc_sanctionedamount != '' && CGColl[0].cr6fc_sanctionedamount != null) {
					ToatalSanctionAmt = parseFloat(CGColl[0].cr6fc_sanctionedamount) + parseFloat(ToatalSanctionAmt);
				}
			}
			else {
				ToatalSanctionAmt = CGColl[0].cr6fc_sanctionedamount;
			}

		},
		error: function () {
			console.log("error");
		}
	});
}

var RateMasterColl;
function RateMster() {
	var requestUri = location.origin + "/_api/cr6fc_ratemasters?$select=cr6fc_category,cr6fc_applicablepercentage,cr6fc_lessthan,cr6fc_greaterthan&$top=5000";
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
			RateMasterColl = data.value;
		},
		error: function () {
			console.log("error");
		}
	});
}


var NSApproverColl;
var NSCheckerApprover;
function NSApprovalMatrix() {
	var requestUri = location.origin + "/_api/cr6fc_nsapprovalmatrixes?$select=_cr6fc_user_value&$filter= cr6fc_role eq 'Checker'";
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
			NSApproverColl = data.value;
			if (NSApproverColl.length > 0) {
				NSCheckerApprover = NSApproverColl[0]._cr6fc_user_value;
			}
		},
		error: function () {
			console.log("error");
		}
	});
}


var ELIMasterColl;
var ELIMaster;
function ELIMaster(email) {
	//var requestUri = location.origin + "/_api/('ELIMaster')//items?$top=500&$select=*,Title,ID,State/State,State/Id,State/StateCode&$expand=State&$filter=EmailID eq '"+email+"'&$orderby=ID asc";
	var requestUri = location.origin + "/_api/cr6fc_elimasters?$select=*&$expand=cr6fc_State($select=cr6fc_statemasterid,cr6fc_name)&$filter=cr6fc_emailid eq '" + email + "'";
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
			ELIMasterColl = data.value;
		},
		error: function () {
			console.log("error");
		}
	});
}

function MainCGAppFeeNew(PANFPO) {
	var CGApplicationTot = 0;
	//var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CGApplications')//items?$top=5000&$select=*,FPOActivities111/FPOActivity,RegionOfFPO/ID,FPOState/ID,BusinessFPOState/Id,Title,ELIChecker/Title,ELIChecker/Id&$expand=ELIChecker,RegionOfFPO,FPOActivities111,FPOState,BusinessFPOState&$filter=(PANFPO eq '"+PANFPO+"')";
	var requestUri = location.origin + "/_api/cr6fc_cgaplications?$select=*,cr6fc_panfpo&$filter=(cr6fc_panfpo eq '" + PANFPO + "')";
	$.ajax({
		url: requestUri,
		type: "GET",
		async: false,
		headers: {
			"accept": "application/json;odata=verbose",
			"content-type": "application/json;odata=verbose"
		},
		success: function (data) {
			var CGAppColl = data.value;
			if (CGAppColl.length > 0) {
				for (var i = 0; i < CGAppColl.length; i++) {
					CGApplicationTot = parseFloat(CGAppColl[i].cr6fc_sanctionedamount) + CGApplicationTot;
				}

			}
		},
		error: function () {
			console.log("error");
		}
	});
	return CGApplicationTot;
}

function getcontactdata() {
	var NameAndSesignation = $('#txtELICheckerName').text()
	var CGApplicationTot = 0;
	//var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CGApplications')//items?$top=5000&$select=*,FPOActivities111/FPOActivity,RegionOfFPO/ID,FPOState/ID,BusinessFPOState/Id,Title,ELIChecker/Title,ELIChecker/Id&$expand=ELIChecker,RegionOfFPO,FPOActivities111,FPOState,BusinessFPOState&$filter=(PANFPO eq '"+PANFPO+"')";
	var requestUri = location.origin + "/_api/contacts?$select=*&$filter=(fullname eq '" + NameAndSesignation + "')";
	$.ajax({
		url: requestUri,
		type: "GET",
		async: false,
		headers: {
			"accept": "application/json;odata=verbose",
			"content-type": "application/json;odata=verbose"
		},
		success: function (data) {
			var CGAppColl = data.value;
			$('#txtdesignationname').text(CGAppColl[0].cr6fc_designation)
		},
		error: function () {
			console.log("error");
		}
	});
	return CGApplicationTot;
}

function RenewalCGApplicationPAN(PANFPO) {
	var requestUri = location.origin + "/_api/cr6fc_renewalcgapplications?$top=5000&$select=*&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=(cr6fc_panfpo eq '" + PANFPO + "' and (cr6fc_cgstatus ne 7 and cr6fc_cgstatus ne 8 and cr6fc_cgstatus ne 9 and cr6fc_cgstatus ne 10))";
	$.ajax({
		url: requestUri,
		type: "GET",
		async: false,
		headers: {
			"accept": "application/json;odata=verbose",
			"content-type": "application/json;odata=verbose"
		},
		success: function (data) {
			var TotRenewCGFee = 0;
			var TotSOERenewCGFee = 0;
			var RenewalCGFeeColl = data.value;
			var MainCGAppFee = MainCGAppFeeNew(PANFPO);
			if (RenewalCGFeeColl.length > 0) {
				for (i = 0; i < RenewalCGFeeColl.length; i++) {
					if (RenewalCGFeeColl[i].cr6fc_status == "8" || RenewalCGFeeColl[i].cr6fc_status == "10" || RenewalCGFeeColl[i].cr6fc_status == "13" || RenewalCGFeeColl[i].cr6fc_status == "15" || RenewalCGFeeColl[i].cr6fc_status == "16" || RenewalCGFeeColl[i].cr6fc_status == "11") {
						TotSOERenewCGFee = parseFloat(RenewalCGFeeColl[i].cr6fc_modifiedsanctionedloanamount) + TotRenewCGFee;
					}
					if (RenewalCGFeeColl[i].cr6fc_status == "8" || RenewalCGFeeColl[i].cr6fc_status == "10" || RenewalCGFeeColl[i].cr6fc_status == "13" || RenewalCGFeeColl[i].cr6fc_status == "11") {
						TotSOERenewCGFee = parseFloat(RenewalCGFeeColl[i].cr6fc_modifiedsanctionedloanamount) + TotSOERenewCGFee;
					}
				}
				if (TotSOERenewCGFee != 0 && TotSOERenewCGFee != '' && !isNaN(TotSOERenewCGFee)) {
					$('#hdnTotalSOEIssuedSanctionAmt').val(TotSOERenewCGFee);
				}

			}
			if (MainCGAppFee != undefined && MainCGAppFee != "" && MainCGAppFee != null) {
				TotRenewCGFee = parseFloat(MainCGAppFee) + parseFloat(TotRenewCGFee);
			}
			if (TotRenewCGFee != 0 && TotRenewCGFee != '' && !isNaN(TotRenewCGFee)) {
				$('#hdnTotalSanctionAmt').val(TotRenewCGFee);
			}
		},
		error: function () {
			console.log("error");
		}
	});
}

var AllWCCGApplicationColl;
function BindAllWCCGData(PANNo) {
	var TotalWCSancAmt = 0;

	//var requestUri = location.origin+"/_api/('CGApplications')//items?$top=500&$select=*&$filter=(PANFPO eq '"+PANNo+"' and (Status ne 'Saved'))&$orderby=ID asc";
	var requestUri = "/_api/cr6fc_cgaplications?$select=cr6fc_sanctionedamount,cr6fc_status&$filter=cr6fc_panfpo eq '" + PANNo + "'";
	//location.origin+"/_api/cr6fc_cgapplicationses?$select=*&$filter=cr6fc_panfpo eq '"+PANNo+"'and cr6fc_status ne 8
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
			AllWCCGApplicationColl = data.value;
			if (AllWCCGApplicationColl.length > 0) {
				for (i = 0; i < AllWCCGApplicationColl.length; i++) {
					if (AllWCCGApplicationColl[i].cr6fc_status == "0") {
						/*if (AllWCCGApplicationColl[i].cr6fc_modifiedsanctionedamount != '' && AllWCCGApplicationColl[i].cr6fc_modifiedsanctionedamount != null && AllWCCGApplicationColl[i].cr6fc_modifiedsanctionedamount != undefined) {
							TotalWCSancAmt = parseFloat(TotalWCSancAmt) + parseFloat(AllWCCGApplicationColl[i].cr6fc_modifiedsanctionedamount)
							*/
							if (AllWCCGApplicationColl[i].cr6fc_sanctionedamount != '' && AllWCCGApplicationColl[i].cr6fc_sanctionedamount != null && AllWCCGApplicationColl[i].cr6fc_modifiedsanctionedamount != undefined) {
								TotalWCSancAmt = parseFloat(TotalWCSancAmt) + parseFloat(AllWCCGApplicationColl[i].cr6fc_sanctionedamount)
							
						}
					}

				}
				$('#hdnTotalWCCGSanctionAmt').val(TotalWCSancAmt);
			}
		},
		error: function () {
			console.log("error");
		}
	});
}

var CGID;
var GuaranteeEndDate;
var CGApplicationNO = '';
function bindCGApplicationData(vItemID) {
	var requestUri = location.origin + "/_api/cr6fc_renewalcgapplications?$top=5000&$select=cr6fc_remainingcgfeesindays,cr6fc_alreadytakencgfeedays,cr6fc_typeofrequest,cr6fc_isfeeealreadypaid,cr6fc_cgfeestartdate,cr6fc_cgfeeenddate,cr6fc_isprenormalstatus,c6fc_totalfpomember,cr6fc_totalmembernorthen,cr6fc_principaloutstanding,cr6fc_enddateofinterestmoratium,cr6fc_enddateofprinciplemoratium,cr6fc_dateoflastinstalment,cr6fc_dateoffirstdisbursement,cr6fc_dateofmodifiedsanction,cr6fc_FPOState,cr6fc_BusinessFPOState,cr6fc_RegionOfFPO,cr6fc_cgfeeindays,cr6fc_parentid,cr6fc_status,cr6fc_cgpan,cr6fc_customerid,cr6fc_farmermembersize,cr6fc_name,cr6fc_nameoffpo,cr6fc_farmermembersize,cr6fc_accountno,cr6fc_modifiedsanctionedloanamount,cr6fc_dateofnpa,cr6fc_dateofsanction,cr6fc_disbursmentunderloan,cr6fc_panfpo,cr6fc_typeoffacility,_cr6fc_nschecker_value,cr6fc_iracclassificationoftheaccount,cr6fc_elimakeremailid,cr6fc_cgstatus,cr6fc_sanctionedamount,cr6fc_loanclosed,cr6fc_loanfullydisbured,cr6fc_dateofclosureofloan,cr6fc_limitclosed,cr6fc_peakoutstanding,cr6fc_utilisationunderlimit,cr6fc_limitoperational,cr6fc_dateoffirstwithdrawal,cr6fc_dateofclosureoflimit,cr6fc_limitoperational,cr6fc_utilisationunderlimit,cr6fc_limitclosed,cr6fc_dateoflimitvalidity,cr6fc_nscheckerremark,cr6fc_nsapproverremark,cr6fc_eilcheckercertificateviewdate,cr6fc_nameoflendinginstitution,_cr6fc_elichecker_value&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=(cr6fc_renewalcgapplicationid eq '" + vItemID + "')";
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
			var Logg = data.value;

			try {
				if (data.value.length > 0) {
					if (Logg[0].cr6fc_cgfeeindays !== '' && Logg[0].cr6fc_cgfeeindays !== null && Logg[0].cr6fc_cgfeeindays !== undefined) {
						$('#hdnCGFeeInDays').val(Logg[0].cr6fc_cgfeeindays)
					}
					else {
						$('#hdnCGFeeInDays').val("1");
					}
					$('#hdnTypeOfRequest').val(Logg[0].cr6fc_typeofrequest);
					$('#hdnAlreadyTakenCGFeedays').val(Logg[0].cr6fc_alreadytakencgfeedays);
					$('#hdnRemainingCGFeesindays').val(Logg[0].cr6fc_remainingcgfeesindays);
					

					CGID = Logg[0].cr6fc_parentid;
					$('#hdnParentId').val(Logg[0].cr6fc_parentid);
					$('#hdnStatus').val(Logg[0]['cr6fc_status@OData.Community.Display.V1.FormattedValue']);
					$("#CGPAN").val(Logg[0].cr6fc_cgpan);
					$("#DisbursmentLoan").val(Logg[0]['cr6fc_disbursmentunderloan@OData.Community.Display.V1.FormattedValue']);
					$("#txtNameOfFPO").val(Logg[0].cr6fc_nameoffpo);
					$("#PANFPO").val(Logg[0].cr6fc_panfpo);
					$("#txtApplicantID").val(Logg[0].cr6fc_name);
					$("#CustomerID").val(Logg[0].cr6fc_customerid);
					if (Logg[0].cr6fc_RegionOfFPO.cr6fc_name == 'FPO in Plains') {
						$("#RegionOfFPO").val('1');
					}
					else if (Logg[0].cr6fc_RegionOfFPO.cr6fc_name == 'FPO in North Eastern or Hilly Areas') {
						$("#RegionOfFPO").val('2');
					}
					$("#FarmerMemberSize").val(Logg[0].cr6fc_farmermembersize);
					$("#TypeofFacility").val(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue']);
					if (Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'] == 'Term Loan OR WCTL (Working Capital Term Loan)' || Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'] == 'Term Loan OR WCTL (Working Capital Term Loan)') {

					}
					$("#hdnTitle").val(Logg[0].cr6fc_name);
					$("#hdnAccountNo").val(Logg[0].cr6fc_accountno);
					$("#AccountNo").val(Logg[0].cr6fc_accountno);
					$("#SanctionedAmount").val(Logg[0].cr6fc_sanctionedamount);
					$('#SanctionedAmount').text(Math.ceil(Logg[0].cr6fc_sanctionedamount));
					var Word = convertNumberToWords(Math.ceil(Logg[0].cr6fc_sanctionedamount));
					$('#SanctionedAmountinwords').text("Rupees " + " " + Word + " " + "Only");
					$("#ModifiedSanctionedAmount").val(Logg[0].cr6fc_modifiedsanctionedloanamount);
					$("#ModifiedSanctionedAmount").val(Logg[0].cr6fc_modifiedsanctionedloanamount);
					$('#ModifiedSanctionedAmount').text(Math.ceil(Logg[0].cr6fc_modifiedsanctionedloanamount));
					var Word = convertNumberToWords(Math.ceil(Logg[0].cr6fc_modifiedsanctionedloanamount));
					$('#ModifiedSanctionedAmountinwords').text("Rupees " + " " + Word + " " + "Only");

					if (Logg[0].cr6fc_dateofnpa != null) {
						document.getElementById("DateofNPA").value = Logg[0].cr6fc_dateofnpa.substring(0, Logg[0].cr6fc_dateofnpa.indexOf("T"));;
					}
					else {
						document.getElementById("DateofNPA").value = null
					}

					if (Logg[0].cr6fc_dateofsanction != null && Logg[0].cr6fc_dateofsanction != undefined && Logg[0].cr6fc_dateofsanction != '') {
						document.getElementById("SanctionDate").value = Logg[0].cr6fc_dateofsanction.substring(0, Logg[0].cr6fc_dateofsanction.indexOf("T"));;
					}
					else {
						document.getElementById("SanctionDate").value = '';
					}


					if (Logg[0].cr6fc_status == "6" || Logg[0].cr6fc_status == "3") {
						if (Logg[0]._cr6fc_nschecker_value == loggedInUserId) {
							$('#ButtonHide').show();
						}
					}

					RenewalCGApplicationPAN(Logg[0].cr6fc_panfpo);
					$('#hdnTypeOfFacility').val(Logg[0].cr6fc_typeoffacility);
					if (Logg[0].cr6fc_typeoffacility == 2) {
						BindAllWCCGData(Logg[0].cr6fc_panfpo);
					}
					$("#IRACclassification").val(Logg[0]['cr6fc_iracclassificationoftheaccount@OData.Community.Display.V1.FormattedValue']);
					if (Logg[0]['cr6fc_iracclassificationoftheaccount@OData.Community.Display.V1.FormattedValue'] == "Substandard" || Logg[0]['cr6fc_iracclassificationoftheaccount@OData.Community.Display.V1.FormattedValue'] == "Doubtful" || Logg[0]['cr6fc_iracclassificationoftheaccount@OData.Community.Display.V1.FormattedValue'] == "Loss") {
						IRACStat = "NPA";
					}
					else {
						IRACStat = "Non NPA";
					}

					if (IRACStat === 'Non NPA') { $('#20').hide(); }
					else { $('#20').show(); }

					var DisbursmentLoan = Logg[0]['cr6fc_disbursmentunderloan@OData.Community.Display.V1.FormattedValue'];
					ELIMaster(Logg[0].cr6fc_elimakeremailid);
					document.getElementById("txtNameOfFPO1").value = Logg[0].cr6fc_nameoffpo;
					$("#hdnCGStatus").val(Logg[0].cr6fc_cgstatus);

					$("#hdnSanctionAmt").val(Logg[0].cr6fc_modifiedsanctionedloanamount);
					$("#hdnPreviousSanctionAmt").val(Logg[0].cr6fc_sanctionedamount);

					$('#hdnTypeOfFacility').val(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue']);
					if (Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'] == 'Term Loan OR WCTL (Working Capital Term Loan)' || Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'] == 'Term Loan OR WCTL (Working Capital Term Loan)') {
						$("#2").hide();
						$("#1").show();

						$('#hdnLoanClosed').val(Logg[0]['cr6fc_loanclosed@OData.Community.Display.V1.FormattedValue']);
						$('#hdnDisbursmentLoan').val(Logg[0]['cr6fc_loanfullydisbured@OData.Community.Display.V1.FormattedValue'])
						$("#DisbursmentLoan").val(Logg[0]['cr6fc_disbursmentunderloan@OData.Community.Display.V1.FormattedValue']);
						$("#hdnPrincipalAmt").val(Logg[0].cr6fc_principaloutstanding);

						if (DisbursmentLoan == "No") {
							$('#3').hide();
							$('#5').hide();
							$('#6').hide();
							$('#7').hide();
							$('#8').hide();

						}



						$("#PrincipalOutstanding").val(Logg[0].cr6fc_principaloutstanding);
						$('#PrincipalOutstanding').val(Math.ceil(Logg[0].cr6fc_principaloutstanding));
						var Word = convertNumberToWords(Math.ceil(Logg[0].cr6fc_principaloutstanding));
						$('#PrincipalOutstandinginwords').text("Rupees " + " " + Word + " " + "Only");

						if (Logg[0].cr6fc_dateofmodifiedsanction != null && Logg[0].cr6fc_dateofmodifiedsanction != undefined && Logg[0].cr6fc_dateofmodifiedsanction != '') {
							const DMS2 = new Date(Logg[0].cr6fc_dateofmodifiedsanction);
							const spDate5 = DMS2.toISOString().slice(0, 10);
							document.getElementById("DateModifiedSanction").value = spDate5;
						}

						if (Logg[0].cr6fc_dateoffirstdisbursement != null) {
							document.getElementById("Date").value = Logg[0].cr6fc_dateoffirstdisbursement.substring(0, Logg[0].cr6fc_dateoffirstdisbursement.indexOf("T"));;
						}
						else {
							document.getElementById("Date").value = null;
						}

						if (Logg[0].cr6fc_enddateofinterestmoratium != null) {
							document.getElementById("EndDateinterest").value = Logg[0].cr6fc_enddateofinterestmoratium.substring(0, Logg[0].cr6fc_enddateofinterestmoratium.indexOf("T"));;
						}
						else {
							document.getElementById("EndDateinterest").value = null;
						}

						if (Logg[0].cr6fc_enddateofprinciplemoratium != null) {
							document.getElementById("EndDateprincipal").value = Logg[0].cr6fc_enddateofprinciplemoratium.substring(0, Logg[0].cr6fc_enddateofprinciplemoratium.indexOf("T"));;
						}
						else {
							document.getElementById("EndDateprincipal").value = null;
						}

						if (Logg[0].cr6fc_dateoflastinstalment != null) {
							document.getElementById("DatelastInstalment").value = Logg[0].cr6fc_dateoflastinstalment.substring(0, Logg[0].cr6fc_dateoflastinstalment.indexOf("T"));;
						}
						else {
							document.getElementById("DatelastInstalment").value = null;
						}
						if (Logg[0].cr6fc_dateoflastinstalment != null) {
							document.getElementById("DatelastInstalment").value = Logg[0].cr6fc_dateoflastinstalment.substring(0, Logg[0].cr6fc_dateoflastinstalment.indexOf("T"));;
						}
						else {
							document.getElementById("DatelastInstalment").value = null;
						}

						$("#hdnDatelastInstalment").val(Logg[0].cr6fc_dateoflastinstalment);
						$("#DatelastInstalment").val(Logg[0].DateOfLastInstalment);
						if (Logg[0].cr6fc_dateoflastinstalment != null) {
							document.getElementById("DatelastInstalment").value = Logg[0].cr6fc_dateoflastinstalment.substring(0, Logg[0].cr6fc_dateoflastinstalment.indexOf("T"));;
							document.getElementById("hdnDateOfLastInstall").value = Logg[0].cr6fc_dateoflastinstalment;						}
						else {
							document.getElementById("DatelastInstalment").value = null;
						}

						$("#Loanfullydisbursed").val(Logg[0]['cr6fc_loanfullydisbured@OData.Community.Display.V1.FormattedValue']);


						$("#LoanClosed").val(Logg[0]['cr6fc_loanclosed@OData.Community.Display.V1.FormattedValue']);
						if (Logg[0]['cr6fc_loanclosed@OData.Community.Display.V1.FormattedValue'] === 'No') {
							$('#10').hide();
						}
						else {
							$('#10').show();
						}

						$("#hdnDateclosureLoan").val(Logg[0].cr6fc_dateofclosureofloan);
						if (Logg[0].cr6fc_dateofclosureofloan != null && Logg[0].cr6fc_dateofclosureofloan != undefined && Logg[0].cr6fc_dateofclosureofloan != '') {
							document.getElementById("DateclosureLoan").value = Logg[0].cr6fc_dateofclosureofloan.substring(0, Logg[0].cr6fc_dateofclosureofloan.indexOf("T"));
							document.getElementById("hdnDateofClosure").value = Logg[0].cr6fc_dateofclosureofloan;
						}
					}
					if (Logg[0]["cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue"] == "WC/CC Limit") {

						$("#2").show();
						$("#1").hide();
						$('#hdnLoanClosed').val(Logg[0]['cr6fc_loanclosed@OData.Community.Display.V1.FormattedValue']);

						$("#PeakOutstanding2").val(Logg[0].cr6fc_peakoutstanding);
						$('#PeakOutstanding2').text(Math.ceil(Logg[0].cr6fc_peakoutstanding));
						var Word = convertNumberToWords(Math.ceil(Logg[0].cr6fc_peakoutstanding));
						$('#PeakOutstandinginwords').text("Rupees " + " " + Word + " " + "Only");
						$("#hdnPeakOutstanding").val(Logg[0].cr6fc_peakoutstanding);
						$('#hdnAnyUtiliseUnder').val(Logg[0]['cr6fc_utilisationunderlimit@OData.Community.Display.V1.FormattedValue']);
						$('#hdnLimitOperationalForPreFY').val(Logg[0]['cr6fc_limitoperational@OData.Community.Display.V1.FormattedValue']);
						if (Logg[0].cr6fc_dateoffirstwithdrawal != null && Logg[0].cr6fc_dateoffirstwithdrawal != undefined && Logg[0].cr6fc_dateoffirstwithdrawal != '') {
							//document.getElementById("DateOfRegistration").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_dateofregistration));
							const DFWL2 = new Date(Logg[0].cr6fc_dateoffirstwithdrawal);
							const spDate3 = DFWL2.toISOString().slice(0, 10);
							document.getElementById("DatefirstWithdrawl").value = spDate3;
						}
						if (Logg[0].cr6fc_dateofclosureoflimit != null && Logg[0].cr6fc_dateofclosureoflimit != undefined && Logg[0].cr6fc_dateofclosureoflimit != '') {
							const DCL2 = new Date(Logg[0].cr6fc_dateofclosureoflimit);
							const spDate4 = DCL2.toISOString().slice(0, 10);
							document.getElementById("DateClosureLimit2").value = spDate4;
							document.getElementById("hdnDateofClosure").value = Logg[0].cr6fc_dateofclosureoflimit;
						}

						$("#Limitoperational").val(Logg[0]['cr6fc_limitoperational@OData.Community.Display.V1.FormattedValue']);
						if (Logg[0]['cr6fc_limitoperational@OData.Community.Display.V1.FormattedValue'] === 'No') {
							$('#22').hide();
						}
						else {
							$('#22').show();
						}

						$("#UtilisationLimit").val(Logg[0]['cr6fc_utilisationunderlimit@OData.Community.Display.V1.FormattedValue']);
						if (Logg[0]['cr6fc_utilisationunderlimit@OData.Community.Display.V1.FormattedValue'] === 'No') {
							$('#202').hide();
						}
						else {
							$('#202').show();
						}
						$("#EndLimitClosed2").val(Logg[0]['cr6fc_limitclosed@OData.Community.Display.V1.FormattedValue']);
						if (Logg[0]['cr6fc_limitclosed@OData.Community.Display.V1.FormattedValue'] === 'No') {
							$('#201').hide();
						}
						else {
							$('#201').show();
						}
						if (Logg[0].cr6fc_dateofmodifiedsanction != null && Logg[0].cr6fc_dateofmodifiedsanction != undefined && Logg[0].cr6fc_dateofmodifiedsanction != '') {
							const DMS2 = new Date(Logg[0].cr6fc_dateofmodifiedsanction);
							const spDate5 = DMS2.toISOString().slice(0, 10);
							document.getElementById("DateModifiedSanction").value = spDate5;
						}

						if (Logg[0].cr6fc_dateoflimitvalidity != null && Logg[0].cr6fc_dateoflimitvalidity != undefined && Logg[0].cr6fc_dateoflimitvalidity != '') {
							const DLV2 = new Date(Logg[0].cr6fc_dateoflimitvalidity);
							const spDate6 = DLV2.toISOString().slice(0, 10);
							document.getElementById("DateLimitValidity").value = spDate6;
							document.getElementById("hdnDateOfLastInstall").value = Logg[0].cr6fc_dateoflimitvalidity;

						}
					}

					if (Logg[0].cr6fc_nscheckerremark != null && Logg[0].cr6fc_nscheckerremark != undefined && Logg[0].cr6fc_nscheckerremark != '') {
						$('#divMaker').show();
						document.getElementById("divELImaker").innerHTML = Logg[0].cr6fc_nscheckerremark;
					}
					/*if(Logg[0].cr6fc_nsapproverremark != null && Logg[0].cr6fc_nsapproverremark != undefined && Logg[0].cr6fc_nsapproverremark !='')
					{
						$('#divCheckerHide').show();						
						document.getElementById("divELICheckerRemark").innerHTML=Logg[0].cr6fc_nsapproverremark;

					}	*/
					$("#txtCGApplicationNo").text(Logg[0].cr6fc_cgpan);
					$("#txtNameOfFPO1").text(Logg[0].cr6fc_nameoffpo);

					ExpenseFrom = new Date(Logg[0].cr6fc_eilcheckercertificateviewdate);
					var curDate = ExpenseFrom.getDate();
					if (curDate < 10)
						curDate = "0" + curDate;
					var curM = ExpenseFrom.getMonth() + 1;
					if (curM < 10)
						curM = "0" + curM;
					var dt = ExpenseFrom.getFullYear() + "-" + curM + "-" + curDate;
					$("#dtproceed").text(dt);

					$("#txtELICheckerName").text(Logg[0]['_cr6fc_elichecker_value@OData.Community.Display.V1.FormattedValue']);
					$("#instituteId").text(Logg[0].cr6fc_nameoflendinginstitution);
					$("#instituteIdNew").text(Logg[0].cr6fc_nameoflendinginstitution);

					if (Logg[0].cr6fc_status == "7") {
						$("#txtCheckerStatus").text("Submitted to NabSanrakshan");
					}
					else if (Logg[0].cr6fc_status == "7") {
						$("#txtCheckerStatus").text("Submitted to NabSanrakshan");
					}
					ChecklistData(Logg);
					CGApplicationNO = Logg[0].cr6fc_name;
					// bindsData(Logg[0].Id)          		  				  

				}
			}
			catch (e) {
			}
		},
		error: function () {
			console.log("error");
		}
	});

}
var CGFeeStartDateSOE;
var CGFeeEndDateSOE;
function ChecklistData(Logg) {

	var vHTML = '';
	var FPOMemberCount;
	var divCreditLimit = '';
	var divExcCurrCreditLimit = '';
	var divFPORegion = '';
	var divCGAppliStipu = '';
	var hdnTotalSanctionAmt = $('#hdnTotalSanctionAmt').val();
	// if (hdnTypeOfFacility == "WC/CC Limit") {
	// 	TotalCalculatedSanctionAmount = parseFloat(hdnTotalSanctionAmt) + parseFloat(hdnTotalWCCGSanctionAmt);
	// }
	// else {
	// 	TotalCalculatedSanctionAmount = hdnTotalSanctionAmt;
	// }
	if (hdnTotalSanctionAmt != '' && hdnTotalSanctionAmt != null) {
		hdnTotalSanctionAmt = parseFloat(hdnTotalSanctionAmt)// + parseFloat(Logg[0].cr6fc_modifiedsanctionedloanamount);
	}
	else {
		hdnTotalSanctionAmt = parseFloat(Logg[0].cr6fc_modifiedsanctionedloanamount)
	}

	var hdnTotalSOEIssuedSanctionAmt = $('#hdnTotalSOEIssuedSanctionAmt').val();
	if (hdnTotalSanctionAmt != '' && hdnTotalSanctionAmt != null) {
		if (parseFloat(hdnTotalSanctionAmt) != parseFloat(Logg[0].cr6fc_modifiedsanctionedloanamount)) {
			var ExcludeCurrAmt = parseFloat(hdnTotalSanctionAmt) - parseFloat(Logg[0].cr6fc_modifiedsanctionedloanamount);
		}
		else {
			var ExcludeCurrAmt = "1";
		}

	}
	else {
		var ExcludeCurrAmt = "1";
	}
	// var ExcludeCurrAmt = parseFloat(hdnTotalSanctionAmt) - parseFloat(Logg[0].ModifiedSanctionedLoanAmount);

	//var hdnTotalSanctionAmt=$('#hdnTotalSanctionAmt').val();
	var hdnPreviousSanctionAmt = $('#hdnPreviousSanctionAmt').val();
	var hdnPrincipalAmt = $('#hdnPrincipalAmt').val();
	var hdnTypeOfFacility = $('#hdnTypeOfFacility').val();
	var hdnDisbursmentLoan = $('#hdnDisbursmentLoan').val();
	var hdnAnyUtiliseUnder = $('#hdnAnyUtiliseUnder').val();
	var hdnLimitOperationalForPreFY = $('#hdnLimitOperationalForPreFY').val();
	var hdnPeakOutstanding = $('#hdnPeakOutstanding').val();
	var SanctionAmt = document.getElementById("hdnSanctionAmt").value;
	var hdnCGFeeInDays = $('#hdnCGFeeInDays').val();
	var CalBaseAmt = '';
	if (hdnTypeOfFacility == "Term Loan OR WCTL (Working Capital Term Loan)") {
		if (hdnDisbursmentLoan == "Yes") {
			CalBaseAmt = hdnPrincipalAmt;
		}
		else {
			CalBaseAmt = SanctionAmt;
		}
	}
	else if (hdnTypeOfFacility == "WC/CC Limit") {
		if (SanctionAmt != hdnPreviousSanctionAmt) {
			CalBaseAmt = SanctionAmt;
		}
		else if (hdnAnyUtiliseUnder == "No") {
			CalBaseAmt = SanctionAmt;
		}
		else if (hdnAnyUtiliseUnder == "Yes") {
			if (hdnLimitOperationalForPreFY == "Yes") {
				if (parseInt(hdnPeakOutstanding) <= parseInt(SanctionAmt)) {
					CalBaseAmt = hdnPeakOutstanding;
				}
				else if (parseInt(hdnPeakOutstanding) >= parseInt(SanctionAmt)) {
					CalBaseAmt = SanctionAmt;
				}
			}
			else if (hdnLimitOperationalForPreFY == "No") {
				CalBaseAmt = SanctionAmt;
			}

		}
	}
	var filterRegion = $.grep(RegionMasterColl, function (value) {
		return (value.cr6fc_regionmasterid == Logg[0].cr6fc_RegionOfFPO.cr6fc_regionmasterid);
	})

	var vHTMLHeaderTBL = "<table class='blueTable col-md-12 checklist table-bordered' style='border: 1px solid;' cellspacing='0'><tr style='background-color:#808080; height:35px !important;'>" +
		"<td class='form-group'><font  style='font-size:18px !important; color:white !important;'><b>Compliance Required</b></font></td>" +
		"<td class='form-group'><font  style='font-size:18px !important; color:white !important; text-align:center;'><b>Complied</b></font></td>" +
		"<td class='form-group'><font  style='font-size:18px !important; color:white !important;'><b>Value</b></font></td>" +
		"</tr>";
	vHTML += "<tr>"
	vHTML += "<td class='form-group'><font color='Black' style='font-size:15px !important;'><b>1.&nbsp Region and Total Farmer Member size </b></font></td>"

	if (Logg[0].cr6fc_RegionOfFPO.cr6fc_name == "FPO in Plains") {
		if (parseInt(Logg[0].cr6fc_farmermembersize) >= parseInt(filterRegion[0].cr6fc_minmembers)) {
			//FPOMemberCount=
			vHTML += "<td class='form-group' style='text-align:center'><img style='width:25px' src='/correct.png'></td>"

		}
		else {
			vHTML += "<td class='form-group' style='text-align:center'><img style='width:25px' src='/remove1.png'></td>"
		}


		divFPORegion += "<div><p>Region of the FPO :- " + Logg[0].cr6fc_RegionOfFPO.cr6fc_name + "</p><p>Total No of Member :- " + Logg[0]['cr6fc_totalfpomember@OData.Community.Display.V1.FormattedValue'] + "</p><p>Total Farmer Member Size :- " + Logg[0].cr6fc_farmermembersize + "</p></div>"


	}
	else if (Logg[0].cr6fc_RegionOfFPO.cr6fc_name == "FPO in North Eastern or Hilly Areas") {
		if (parseInt(Logg[0].cr6fc_farmermembersize) >= parseInt(filterRegion[0].cr6fc_minmembers)) {
			vHTML += "<td style='text-align:center'><img style='width:25px' src='/correct.png'></td>"
		}
		else {
			vHTML += "<td style='text-align:center'><img style='width:25px' src='/remove1.png'></td>"
		}

		divFPORegion += "<div class='form-group'><p>Region of the FPO :- " + Logg[0].cr6fc_RegionOfFPO.cr6fc_name + "</p><p>Total No of Member :- " + Logg[0]['cr6fc_totalmembernorthen@OData.Community.Display.V1.FormattedValue'] + "</p><p>Total Farmer Member Size :- " + Logg[0].cr6fc_farmermembersize + "</p></div>"
	}
	if (divFPORegion != '') {
		vHTML += "<td class='form-group'><font color='Black'><b>" + divFPORegion + "</b></font></td>"
	}
	else {
		vHTML += "<td></td>";
	}
	vHTML += "</tr><tr class='form-group'>"
	vHTML += "<td class='form-group'><font color='Black'><b>2.&nbspTotal Exposure for FPO</b></font></td>"
	vHTML += "<td style='text-align:center'><img style='width:25px' src='/info.jpg'></td>"

	if (hdnTotalSanctionAmt != null && hdnTotalSanctionAmt != '') {
		divCreditLimit += "<div><p>Live CGs Amount :- " + hdnTotalSanctionAmt + "</p></div>"
		if (hdnTotalSOEIssuedSanctionAmt != 0 && hdnTotalSOEIssuedSanctionAmt != '' && !isNaN(hdnTotalSOEIssuedSanctionAmt)) {
			divCreditLimit += "<div class='form-group'><p>SOE Issued Amount :- " + hdnTotalSOEIssuedSanctionAmt + "</p></div>"
		}
		else {
			divCreditLimit += "<div><p>SOE Issued Amount :- No Records</p></div>"
		}
	}
	else {
		divCreditLimit += "<div><p>No Previous Applications</p></div>";
	}

	vHTML += "<td class='form-group'><font color='Black'><b>" + divCreditLimit + "</b></font></td>"
	vHTML += "</tr><tr class='form-group'>"
	vHTML += "<td class='form-group'><font color='Black'><b>3.&nbsp Change in Slab </b></font></td>"

	var CGFeePerChanged = "";
	var filterRateDataExcCurr = $.grep(RateMasterColl, function (value) {
		return (value['cr6fc_category@OData.Community.Display.V1.FormattedValue'] == "Guarantee Fee" && parseFloat(value.cr6fc_greaterthan) < parseFloat(ExcludeCurrAmt) && parseFloat(value.cr6fc_lessthan) > parseFloat(ExcludeCurrAmt));
	});

	var filterRateData = $.grep(RateMasterColl, function (value) {
		return (value['cr6fc_category@OData.Community.Display.V1.FormattedValue'] == "Guarantee Fee" && parseFloat(value.cr6fc_greaterthan) < parseFloat(hdnTotalSanctionAmt) && parseFloat(value.cr6fc_lessthan) > parseFloat(hdnTotalSanctionAmt));
	});

	var filterRateDataExcCurrCGCover = $.grep(RateMasterColl, function (value) {
		return (value['cr6fc_category@OData.Community.Display.V1.FormattedValue'] == "Guarantee Cover" && parseFloat(value.cr6fc_greaterthan) < parseFloat(ExcludeCurrAmt) && parseFloat(value.cr6fc_lessthan) > parseFloat(ExcludeCurrAmt));
	});

	var filterRateDataCGCover = $.grep(RateMasterColl, function (value) {
		return (value['cr6fc_category@OData.Community.Display.V1.FormattedValue'] == "Guarantee Cover" && parseFloat(value.cr6fc_greaterthan) < parseFloat(hdnTotalSanctionAmt) && parseFloat(value.cr6fc_lessthan) > parseFloat(hdnTotalSanctionAmt));
	});


	if (filterRateDataExcCurr.length > 0 && filterRateData.length > 0) {
		if (filterRateDataExcCurr[0].cr6fc_applicablepercentage == filterRateData[0].cr6fc_applicablepercentage) {
			CGFeePerChanged = "No";
		}
		else {
			CGFeePerChanged = "Yes";
		}
	}
	else {
		CGFeePerChanged = "No";
	}
	if (Logg[0]['cr6fc_isprenormalstatus@OData.Community.Display.V1.FormattedValue'] == "No") {
		if (CGFeePerChanged == "No") {
			vHTML += "<td style='text-align:center'><img style='width:25px' src='/remove1.png'></td>";
			vHTML += "<td class='form-group'><font color='Black'><b><div><p>Applicable CG Fee Rate :- " + filterRateData[0].cr6fc_applicablepercentage + " % </p></div><div><p>Applicable CG Cover rate :- " + filterRateDataCGCover[0].cr6fc_applicablepercentage + " %  (No Change in Slab)</p></div></font></b></td>"
			//vHTML += "<td><font color='Black'><b><div><p>New Rate Applicable :- "+filterRateData[0].ApplicablePercentage+"</p></div><div><p>New Guarantee cover rate :- "+filterRateDataCGCover[0].ApplicablePercentage+" % </p></div></font></b></td>"

		}
		else if (CGFeePerChanged == "Yes") {
			vHTML += "<td style='text-align:center'><img style='width:25px' src='/correct.png'></td>";
			//vHTML += "<td><font color='Black'><b><div><p>Applicable CG Fee Rate :- "+filterRateData[0].ApplicablePercentage+"</p></div><div><p>Applicable CG Cover rate :- "+filterRateDataCGCover[0].ApplicablePercentage+" % </p></div></font></b></td>"
			vHTML += "<td class='form-group'><font color='Black'><b><div><p>New Rate Applicable :- " + filterRateData[0].cr6fc_applicablepercentage + "</p></div><div><p>New Guarantee cover rate :- " + filterRateDataCGCover[0].cr6fc_applicablepercentage + " % </p></div><div><p>Applicable CG Fee Rate :- " + filterRateDataExcCurr[0].cr6fc_applicablepercentage + "</p></div><div><p>Applicable CG Cover rate :- " + filterRateDataExcCurrCGCover[0].cr6fc_applicablepercentage + " % </p></div></font></b></td>"
		}

	}
	else {
		vHTML += "<td style='text-align:center'><img style='width:25px' src='/info.jpg' data-themekey='#'></td>";
		vHTML += "<td class='form-group'><font color='Black'><b><div><p>Not Applicable</p></div></font></b></td>";

	}

	vHTML += "</tr><tr>"

	vHTML += "<td class='form-group'><font color='Black'><b>4.&nbsp CG Fee Calculation</b></font></td>";
	var CGFeeEndDate;
	var CGFeeStartDate;
	if (Logg[0].cr6fc_cgfeestartdate != "" && Logg[0].cr6fc_cgfeestartdate != null) {
		//CGFeeStartDate=String.format("{0:dd-MM-yyyy}",new Date(Logg[0].cr6fc_cgfeestartdate));
		CGFeeStartDateSOE = new Date(Logg[0].cr6fc_cgfeestartdate);
		var options = { day: '2-digit', month: '2-digit', year: 'numeric' };
		CGFeeStartDate = new Intl.DateTimeFormat('en-GB', options).format(CGFeeStartDateSOE);
	}
	else {
		CGFeeStartDate = '';
	}

	if (Logg[0].cr6fc_cgfeeenddate != "" && Logg[0].cr6fc_cgfeeenddate != null) {
		//CGFeeEndDate=String.format("{0:dd-MM-yyyy}",new Date(Logg[0].cr6fc_cgfeeenddate));
		CGFeeEndDateSOE = new Date(Logg[0].cr6fc_cgfeeenddate);
		var options = { day: '2-digit', month: '2-digit', year: 'numeric' };
		CGFeeEndDate = new Intl.DateTimeFormat('en-GB', options).format(CGFeeEndDateSOE);
	}
	else {
		CGFeeEndDate = '';
	}
	var CGFeeInDays = '';
	if (Logg[0].cr6fc_cgfeeindays != '' && Logg[0].cr6fc_cgfeeindays != null && Logg[0].cr6fc_cgfeeindays != undefined && Logg[0].cr6fc_cgfeeindays != "NaN") {
		CGFeeInDays = parseFloat(Logg[0].cr6fc_cgfeeindays) + 1;
	}
	if (Logg[0].cr6fc_isprenormalstatus == "0" && Logg[0].cr6fc_isfeeealreadypaid == "No") {
		vHTML += "<td style='text-align:center'><img style='width:25px' src='/info.jpg' data-themekey='#'></td>";

		vHTML += "<td class='form-group'><b>Since the application is Pre-closed/Normally-closed, the SOE will not be generated</b></td>";

	} else if (Logg[0].cr6fc_isprenormalstatus == "1" && Logg[0].cr6fc_isfeeealreadypaid == "No") {
		vHTML += "<td style='text-align:center'><img style='width:25px' src='/info.jpg'></td>"
		vHTML += "<td class='form-group'><font color='Black'><b><div><p>Base Amount :- " + CalBaseAmt + "</p></div><div><p>CG Fee Start Date :- " + CGFeeStartDate + "</p></div><div><p>CG Fee End Date :- " + CGFeeEndDate + "</p></div><div><p>Period in Days  :- " + CGFeeInDays + "</p></div></b></font></td>";
	}
	else if (Logg[0].cr6fc_isfeeealreadypaid == "Yes") {
		vHTML += "<td style='text-align:center'><img style='width:25px' src='/info.jpg' data-themekey='#'></td>";

		vHTML += "<td class='form-group'><b>Since the fee are already paid, the SOE will not be generated</b></td>";
	}
	vHTML += "</tr>"


	document.getElementById("dvCGApplicationData").innerHTML = vHTMLHeaderTBL + vHTML;




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

function ShowPopUp() {
	$("#inputDialog2").dialog({
		autoOpen: false,
		modal: true,
		dialogClass: "noclose",
		closeOnEscape: false,
		/*buttons: [{
		text: "View",
		click: function () {
			
		}
		}],*/
		show: { effect: "clip", duration: 200 }
	});

	$("#inputDialog2").dialog("open");

}

function Proceed() {
	var Data;

	Data = JSON.stringify(
		{
			"cr6fc_nscheckercertificateview": "1"
		});



	$.ajax({
		url: "/_api/cr6fc_renewalcgapplications",
		type: "POST",
		headers: header,
		async: false,
		data: Data,
		success: function (success) {

			alert('Item Updated Succesfully');
			$("#inputDialog2").dialog("close");
			//window.location.href="https://nabardmumbai.sharepoint.com/sites/FPOCGPortalUAT/SitePages/ELICheckerDashBoardCGApp.aspx";	
		},
		error: function (e) {
			console.log(e);
		}
	});

}
function ClosePopup() {
	$("#inputDialog2").dialog("close");
}
function Close1() {
	window.location.href = location.origin + "/NSCheckerDBRenewal/";

}
function GetCurrentDataToday() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();
	var vDueDate = dd + "/" + mm + "/" + yyyy;
	var hours = today.getHours();
	var minutes = today.getMinutes();
	var ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0' + minutes : minutes;
	var strTime = vDueDate;
	return strTime;
}

var SOEIDMasterColl;
function SOEMasterID(vItemID) {
	//var requestUri = location.origin + "/_api/('SOEDetails')//items?$top=500&$select=*&$filter=WFID eq '"+vItemID+"'&$orderby=ID asc";
	var requestUri = location.origin + "/_api/cr6fc_renewalsoedetailses?$select=*&$filter=cr6fc_wfid eq '" + vItemID + "'";
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
			SOEIDMasterColl = data.value;
		},
		error: function () {
			console.log("error");
		}
	});
}

var hdnCGFeeInDays = '';
function Submit(status) {
	var requestflag = false;
	var CGStatus = '';
	var irac = $("#IRACclassification").val();
	var dateofLastInstall = $("#hdnDateOfLastInstall").val();
	var dateofClosure = $("#hdnDateofClosure").val();
	var dateofLastInstall1 = new Date(dateofLastInstall);
	var dateofClosure1 = new Date(dateofClosure);
	var hdWFID = $('#hdnParentId').val();
	var hdnLoanClosed = $('#hdnLoanClosed').val();
	var hdnTotalSanctionAmt = $('#hdnTotalSanctionAmt').val();
	var hdnPreviousSanctionAmt = $('#hdnPreviousSanctionAmt').val();
	var hdnPrincipalAmt = $('#hdnPrincipalAmt').val();
	var hdnTypeOfFacility = $('#hdnTypeOfFacility').val();
	var hdnDisbursmentLoan = $('#hdnDisbursmentLoan').val();
	var hdnAnyUtiliseUnder = $('#hdnAnyUtiliseUnder').val();
	var hdnLimitOperationalForPreFY = $('#hdnLimitOperationalForPreFY').val();
	var hdnPeakOutstanding = $('#hdnPeakOutstanding').val();
	var hdnTypeOfRequest = $('#hdnTypeOfRequest').val();
	var hdnAlreadyTakenCGFeedays = $('#hdnAlreadyTakenCGFeedays').val();
	var hdnRemainingCGFeesindays = $('#hdnRemainingCGFeesindays').val();
	var SanctionAmt = document.getElementById("hdnSanctionAmt").value;
	var TotalCalculatedSanctionAmount = "0";

	if (hdnTotalSanctionAmt == "" || hdnTotalSanctionAmt == null || hdnTotalSanctionAmt == undefined || hdnTotalSanctionAmt == 0) {
		hdnTotalSanctionAmt = SanctionAmt;
	}
	else {
		hdnTotalSanctionAmt = parseFloat(hdnTotalSanctionAmt) + parseFloat(SanctionAmt);
	}
	var hdnTotalWCCGSanctionAmt = $('#hdnTotalWCCGSanctionAmt').val();
	if (hdnTotalWCCGSanctionAmt == "" || hdnTotalWCCGSanctionAmt == null || hdnTotalWCCGSanctionAmt == undefined) {
		hdnTotalWCCGSanctionAmt = "0";
	}
	if (hdnTypeOfFacility == "WC/CC Limit") {
		TotalCalculatedSanctionAmount = parseFloat(hdnTotalSanctionAmt) + parseFloat(hdnTotalWCCGSanctionAmt);
	}
	else {
		TotalCalculatedSanctionAmount = hdnTotalSanctionAmt;
	}
	hdnCGFeeInDays = $('#hdnCGFeeInDays').val();
	var CalBaseAmt = '';
	if (hdnTypeOfFacility == "Term Loan OR WCTL (Working Capital Term Loan)") {
		if (hdnDisbursmentLoan == "Yes") {
			CalBaseAmt = hdnPrincipalAmt;
		}
		else {
			CalBaseAmt = SanctionAmt;
		}
	}
	else if (hdnTypeOfFacility == "WC/CC Limit") {
		if (SanctionAmt != hdnPreviousSanctionAmt) {
			CalBaseAmt = SanctionAmt;
		}
		else if (hdnAnyUtiliseUnder == "No") {
			CalBaseAmt = SanctionAmt;
		}
		else if (hdnAnyUtiliseUnder == "Yes") {
			if (hdnLimitOperationalForPreFY == "Yes") {
				if (parseInt(hdnPeakOutstanding) <= parseInt(SanctionAmt)) {
					CalBaseAmt = hdnPeakOutstanding;
				}
				else if (parseInt(hdnPeakOutstanding) > parseInt(SanctionAmt)) {
					CalBaseAmt = SanctionAmt;
				}
			}
			else if (hdnLimitOperationalForPreFY == "No") {
				CalBaseAmt = SanctionAmt;
			}

		}
	}

	if ((dateofClosure1 >= dateofLastInstall1) && (irac == "Standard" || irac == "SMA- 0" || irac == "SMA- 1" || irac == "SMA- 2" || irac == "Standard - 0 Days Past Due (DPD)") && hdnLoanClosed == "Yes") {
		requestflag = true;
		CGStatus = "Normal Closed";
	}

	if ((dateofClosure1 < dateofLastInstall1) && (irac == "Standard" || irac == "SMA- 0" || irac == "SMA- 1" || irac == "SMA- 2" || irac == "Standard - 0 Days Past Due (DPD)") && hdnLoanClosed == "Yes") {
		requestflag = true;
		CGStatus = "Pre Closed";
	}

	var hdnStatus = document.getElementById("hdnStatus").value;
	var txtCGApplicationNo = $("#txtCGApplicationNo").text();
	var txtRemarksComments = $('#txtnscheckerComment').val();
	if (txtRemarksComments == '' || txtRemarksComments == null || txtRemarksComments == undefined) {
		alert('Please Enter Remark')
		return false;
	}
	var Data;
	var workflowDt = new Date();
	workflowDt = GetCurrentDataToday();

	var NSCheckerComm = document.getElementById("hdnNABCheckerComment").value;
	var txtNsApprRemark;
	if (NSCheckerComm != '' && NSCheckerComm != undefined && NSCheckerComm != '') {
		txtNsApprRemark = "<b>Comment</b> :- " + txtRemarksComments + " - " + workflowDt + ": " + NSCheckerComm.toString() + "\n\n"
	}
	else {
		txtNsApprRemark = "<b>Comment </b>:- " + txtRemarksComments + " - " + workflowDt + "\n\n"
	}
	if (status == "Review by NABSaranrakshan") {
		status = "7"
	}
	else if (status == "Recommend for Rejection") {
		status = "16"
	}
	Data = JSON.stringify(
		{
			"cr6fc_status": status,
			"cr6fc_nscheckerremark": txtNsApprRemark,
			"cr6fc_NSApprover_contact@odata.bind": "/contacts(" + NSCheckerApprover + ")"

		});




	shell.getTokenDeferred().done(function (token) {
		console.log(token)
		var header = {
			__RequestVerificationToken: token,
			contentType: "application/json;odata=verbose",
			XRequestDigest: $("#__REQUESTDIGEST").val(),
			IFMATCH: "*",
			XHttpMethod: "PATCH"
		}
		$.ajax({

			url: "/_api/cr6fc_renewalcgapplications(" + vItemID + ")",
			type: "PATCH",
			async: false,
			data: Data,
			headers: header,

			success: function (data) {

				fileInput = $('#ELIChekerAttach');
				otherfileArray = [];
				//var AttchLength=fileInput[0].files.length
				$("#attachFilesHolder input:file").each(function () {
					if ($(this)[0].files[0]) {
						otherfileArray.push({ "Attachment": $(this)[0].files[0] });
					}
				});
				AttchLength = otherfileArray.length;

				if (requestflag == true) {
					alert('Request Approved Sucessfully');
					window.location.href = location.origin + "/NSCheckerDBRenewal/";

				}
				else {
					if(hdnTypeOfRequest=="2")
					{
						if((TotalCalculatedSanctionAmount!=null && TotalCalculatedSanctionAmount!=undefined && TotalCalculatedSanctionAmount!="") && (SanctionAmt!=null && SanctionAmt!=undefined && SanctionAmt!=""))
						{
							var TotalSanctionAMtWitoutCurrent=parseFloat(TotalCalculatedSanctionAmount) - parseFloat(SanctionAmt)
						}
						var filterRateData1 = $.grep(RateMasterColl, function (value) {
							// return (value['cr6fc_category@OData.Community.Display.V1.FormattedValue'] == "Guarantee Fee" && parseFloat(value.cr6fc_greaterthan) < parseFloat(hdnTotalSanctionAmt) && parseFloat(value.cr6fc_lessthan) > parseFloat(hdnTotalSanctionAmt));
							return (value['cr6fc_category@OData.Community.Display.V1.FormattedValue'] == "Guarantee Fee" && parseFloat(value.cr6fc_greaterthan) < parseFloat(TotalCalculatedSanctionAmount) && parseFloat(value.cr6fc_lessthan) > parseFloat(TotalCalculatedSanctionAmount));
						});
						if (filterRateData1.length > 0) {
							var calCGFessPer1 = parseFloat(filterRateData1[0].cr6fc_applicablepercentage)
	
							var CGFessPerValue1 = calCGFessPer1 / 100;
							CGFessPerValue1 = '' + CGFessPerValue1
							var getCalVal1 = CGFessPerValue1 * CalBaseAmt * (parseFloat(hdnAlreadyTakenCGFeedays) + 1) / 365;;
							getCalVal1 = '' + getCalVal1
							var CGFeeVal1 = Math.ceil(getCalVal1);
							//var CGFeeVal= parseFloat(getCalVal) + parseFloat(SanctionAmt);
	
						}

						var filterRateData2 = $.grep(RateMasterColl, function (value) {
							// return (value['cr6fc_category@OData.Community.Display.V1.FormattedValue'] == "Guarantee Fee" && parseFloat(value.cr6fc_greaterthan) < parseFloat(hdnTotalSanctionAmt) && parseFloat(value.cr6fc_lessthan) > parseFloat(hdnTotalSanctionAmt));
							return (value['cr6fc_category@OData.Community.Display.V1.FormattedValue'] == "Guarantee Fee" && parseFloat(value.cr6fc_greaterthan) < parseFloat(TotalSanctionAMtWitoutCurrent) && parseFloat(value.cr6fc_lessthan) > parseFloat(TotalSanctionAMtWitoutCurrent));
						});
						if (filterRateData2.length > 0) {
							var calCGFessPer2 = parseFloat(filterRateData2[0].cr6fc_applicablepercentage)
	
							var CGFessPerValue2 = calCGFessPer2 / 100;
							CGFessPerValue2 = '' + CGFessPerValue2
							var getCalVal2 = CGFessPerValue2 * hdnPreviousSanctionAmt * (parseFloat(hdnAlreadyTakenCGFeedays) + 1) / 365;;
							getCalVal2 = '' + getCalVal2
							var CGFeeVal2 = Math.ceil(getCalVal2);
							//var CGFeeVal= parseFloat(getCalVal) + parseFloat(SanctionAmt);
	
						}

						var filterRateData3 = $.grep(RateMasterColl, function (value) {
							// return (value['cr6fc_category@OData.Community.Display.V1.FormattedValue'] == "Guarantee Fee" && parseFloat(value.cr6fc_greaterthan) < parseFloat(hdnTotalSanctionAmt) && parseFloat(value.cr6fc_lessthan) > parseFloat(hdnTotalSanctionAmt));
							return (value['cr6fc_category@OData.Community.Display.V1.FormattedValue'] == "Guarantee Fee" && parseFloat(value.cr6fc_greaterthan) < parseFloat(TotalCalculatedSanctionAmount) && parseFloat(value.cr6fc_lessthan) > parseFloat(TotalCalculatedSanctionAmount));
						});
						if (filterRateData3.length > 0) {
							var calCGFessPer3 = parseFloat(filterRateData3[0].cr6fc_applicablepercentage)
	
							var CGFessPerValue3 = calCGFessPer3 / 100;
							CGFessPerValue3 = '' + CGFessPerValue3
							var getCalVal3 = CGFessPerValue3 * CalBaseAmt * (parseFloat(hdnRemainingCGFeesindays) + 1) / 365;;
							getCalVal3 = '' + getCalVal3
							var CGFeeVal3 = Math.ceil(getCalVal3);
							//var CGFeeVal= parseFloat(getCalVal) + parseFloat(SanctionAmt);
	
						}
						if((CGFeeVal1!=null && CGFeeVal1!=undefined && CGFeeVal1!="") && (CGFeeVal2!=null && CGFeeVal2!=undefined && CGFeeVal2!=""))
						{
							var CGFeeVal4 = CGFeeVal1 - CGFeeVal2;
						}

						if((CGFeeVal4!=null && CGFeeVal4!=undefined && CGFeeVal4!="") && (CGFeeVal3!=null && CGFeeVal3!=undefined && CGFeeVal3!=""))
						{
							var CGFeeVal5 = CGFeeVal3 + CGFeeVal4;
						}
						var CGFeeVal;
						if(CGFeeVal5!=null && CGFeeVal5!=undefined && CGFeeVal5!="")
						{
							CGFeeVal = Math.ceil(CGFeeVal5);
						}



	
						var filterEligibleRateData = $.grep(RateMasterColl, function (value) {
							// return (value['cr6fc_category@OData.Community.Display.V1.FormattedValue'] == "Guarantee Cover" && parseFloat(value.cr6fc_greaterthan) < parseFloat(hdnTotalSanctionAmt) && parseFloat(value.cr6fc_lessthan) > parseFloat(hdnTotalSanctionAmt));
							return (value['cr6fc_category@OData.Community.Display.V1.FormattedValue'] == "Guarantee Cover" && parseFloat(value.cr6fc_greaterthan) < parseFloat(TotalCalculatedSanctionAmount) && parseFloat(value.cr6fc_lessthan) > parseFloat(TotalCalculatedSanctionAmount));
						});
						if (filterEligibleRateData.length > 0) {
							var calCGFessPerEligible = parseFloat(filterEligibleRateData[0].cr6fc_applicablepercentage)
	
							var CGFessPerValueElig = calCGFessPerEligible / 100;
							CGFessPerValueElig = '' + CGFessPerValueElig;
							var getCalValElig = CGFessPerValueElig * SanctionAmt;
							getCalValElig = '' + getCalValElig
							var CGFeeValElig = Math.ceil(getCalValElig);
							//var CGFeeValElig= parseFloat(getCalValElig) + parseFloat(SanctionAmt);
	
						}
					}
					else
					{
						var filterRateData = $.grep(RateMasterColl, function (value) {
							// return (value['cr6fc_category@OData.Community.Display.V1.FormattedValue'] == "Guarantee Fee" && parseFloat(value.cr6fc_greaterthan) < parseFloat(hdnTotalSanctionAmt) && parseFloat(value.cr6fc_lessthan) > parseFloat(hdnTotalSanctionAmt));
							return (value['cr6fc_category@OData.Community.Display.V1.FormattedValue'] == "Guarantee Fee" && parseFloat(value.cr6fc_greaterthan) < parseFloat(TotalCalculatedSanctionAmount) && parseFloat(value.cr6fc_lessthan) > parseFloat(TotalCalculatedSanctionAmount));
						});
						if (filterRateData.length > 0) {
							var calCGFessPer = parseFloat(filterRateData[0].cr6fc_applicablepercentage)
	
							var CGFessPerValue = calCGFessPer / 100;
							CGFessPerValue = '' + CGFessPerValue
							var getCalVal = CGFessPerValue * CalBaseAmt * (parseFloat(hdnCGFeeInDays) + 1) / 365;;
							getCalVal = '' + getCalVal
							var CGFeeVal = Math.ceil(getCalVal);
							//var CGFeeVal= parseFloat(getCalVal) + parseFloat(SanctionAmt);
	
						}
	
						var filterEligibleRateData = $.grep(RateMasterColl, function (value) {
							// return (value['cr6fc_category@OData.Community.Display.V1.FormattedValue'] == "Guarantee Cover" && parseFloat(value.cr6fc_greaterthan) < parseFloat(hdnTotalSanctionAmt) && parseFloat(value.cr6fc_lessthan) > parseFloat(hdnTotalSanctionAmt));
							return (value['cr6fc_category@OData.Community.Display.V1.FormattedValue'] == "Guarantee Cover" && parseFloat(value.cr6fc_greaterthan) < parseFloat(TotalCalculatedSanctionAmount) && parseFloat(value.cr6fc_lessthan) > parseFloat(TotalCalculatedSanctionAmount));
						});
						if (filterEligibleRateData.length > 0) {
							var calCGFessPerEligible = parseFloat(filterEligibleRateData[0].cr6fc_applicablepercentage)
	
							var CGFessPerValueElig = calCGFessPerEligible / 100;
							CGFessPerValueElig = '' + CGFessPerValueElig;
							var getCalValElig = CGFessPerValueElig * SanctionAmt;
							getCalValElig = '' + getCalValElig
							var CGFeeValElig = Math.ceil(getCalValElig);
							//var CGFeeValElig= parseFloat(getCalValElig) + parseFloat(SanctionAmt);
	
						}
					}

					var IGST = '18';
					var CGST = '9';
					var SGST = '9';
					var UGST = '9';
					if (TrustMasterColl.length > 0) {
						if (TrustMasterColl[0].cr6fc_State.cr6fc_name == ELIMasterColl[0].cr6fc_State.cr6fc_name) {
							//var calCGFessPerEligible=parseFloat(filterEligibleRateData[0].ApplicablePercentage)

							var CGST = CGST / 100;
							CGST = '' + CGST;
							var getCalCGST = CGST * parseFloat(CGFeeVal);
							getCalCGST = '' + getCalCGST
							var CGSTVal = Math.ceil(getCalCGST);

							var SGST = SGST / 100;
							SGST = '' + SGST;
							var getCalSGST = SGST * parseFloat(CGFeeVal);
							getCalSGST = '' + getCalSGST
							var SGSTVal = Math.ceil(getCalSGST);
							var IGSTVal = 0;

						}
						else {
							var IGST = IGST / 100;
							IGST = '' + IGST;
							var getCalIGST = IGST * parseFloat(CGFeeVal);
							getCalIGST = '' + getCalIGST
							var IGSTVal = Math.ceil(getCalIGST);

						}

					}
					else {
						var IGST = IGST / 100;
						IGST = '' + IGST;
						var getCalIGST = IGST * parseFloat(CGFeeVal);
						getCalIGST = '' + getCalIGST
						var IGSTVal = Math.ceil(getCalIGST);
					}
					var subTotal;
					if (CGSTVal != '' && SGSTVal != '' && CGSTVal != undefined && SGSTVal != undefined) {
						subTotal = parseFloat(CGSTVal) + parseFloat(SGSTVal);
					}
					else if (IGSTVal != '' && IGSTVal != undefined) {
						subTotal = parseFloat(IGSTVal);
					}
					var GrandTot;
					if (subTotal != '' && CGFeeVal != '' && subTotal != undefined && CGFeeVal != undefined) {
						GrandTot = Math.ceil(subTotal) + Math.ceil(CGFeeVal);
					}
					var cgfeeindays = parseInt(hdnCGFeeInDays) + 1;
					if(SOEIDMasterColl.length == 0 && hdnStatus !== 'Sent Back by NABSaranrakshan'){
					// if (hdnStatus !== 'Sent Back by NABSaranrakshan') {
						var SOEData = JSON.stringify(
							{

								"cr6fc_wfid": vItemID,
								"cr6fc_billtoname": ELIMasterColl[0].cr6fc_lendinginstitute,
								"cr6fc_billtoaddress": ELIMasterColl[0].cr6fc_address,
								'cr6fc_BillToState@odata.bind': "/cr6ffc_statemasters(" + ELIMasterColl[0].cr6fc_State.cr6fc_statemasterid + ")",
								//"cr6fc_billtostatecode": "/cr6fc_statemasters(" + ELIMasterColl[0].cr6fc_State.cr6fc_statemasterid + ")",
								"cr6fc_billtogstin": ELIMasterColl[0].cr6fc_gstin,
								"cr6fc_billtopan": ELIMasterColl[0].cr6fc_pan,
								"cr6fc_fpo": document.getElementById("txtNameOfFPO").value,
								"cr6fc_fpoloanaccountno": document.getElementById("hdnAccountNo").value,
								"cr6fc_sanctionedamount": document.getElementById("hdnSanctionAmt").value,
								"cr6fc_cgapplicationno": CGApplicationNO,
								"cr6fc_cgpan": txtCGApplicationNo,
								"cr6fc_creditguaranteefee": '' + CGFeeVal,
								"cr6fc_eligibleguranteecover": '' + CGFeeValElig,
								"cr6fc_igst": '' + IGST,
								"cr6fc_igstamount": '' + IGSTVal,
								"cr6fc_cgst": '' + CGST,
								"cr6fc_cgstamount": '' + CGSTVal,
								"cr6fc_sgst": '' + SGST,
								"cr6fc_sgstamount": '' + SGSTVal,
								"cr6fc_taxamount": '' + subTotal,
								"cr6fc_grandtotal": '' + GrandTot,
								"cr6fc_cgfeestartdate": CGFeeStartDateSOE,
								"cr6fc_cgfeeenddate": CGFeeEndDateSOE,
								"cr6fc_cgfeeindays": '' + cgfeeindays


							});


						console.log(token)
						var header = {
							__RequestVerificationToken: token,
							contentType: "application/json;odata=verbose",
							XRequestDigest: $("#__REQUESTDIGEST").val(),
							// IFMATCH: "*",
							// XHttpMethod: "PATCH"
						}
						$.ajax({

							url: "/_api/cr6fc_renewalsoedetailses",//("+SOEIDMasterColl[0].cr6fc_soedetailsid+")
							type: "POST",
							async: false,
							data: SOEData,
							headers: header,

							success: function (data) {
								if (AttchLength != 0) {
									SOEMasterID(vItemID)
									// getFileContentsAndMetadata(vItemID,token,SOECOLLID)
									updatecgappfile(vItemID)
								}
								SOEMasterID(vItemID)
								alert('SOE Generated Sucessfully');
								if (AttchLength == 0 || AttchLength == null || AttchLength == '') {
									window.location.href = location.origin + "/RenewalSOEDetails/?Item=" + SOEIDMasterColl[0].cr6fc_renewalsoedetailsid + "&Page=NSChecker";
								}
							},
							error: function (e) {
								console.log(e);
							}
						});

					}
					else if (SOEIDMasterColl.length >0){
						var SOEData1 = JSON.stringify(
							{

								"cr6fc_wfid": vItemID,
								"cr6fc_billtoname": ELIMasterColl[0].cr6fc_lendinginstitute,
								"cr6fc_billtoaddress": ELIMasterColl[0].cr6fc_address,
								'cr6fc_BillToState@odata.bind': "/cr6fc_statemasters(" + ELIMasterColl[0].cr6fc_State.cr6fc_statemasterid + ")",
								//"cr6fc_billtostatecode": "/cr6fc_statemasters(" + ELIMasterColl[0].cr6fc_State.cr6fc_statemasterid + ")",
								"cr6fc_billtogstin": ELIMasterColl[0].cr6fc_gstin,
								"cr6fc_billtopan": ELIMasterColl[0].cr6fc_pan,
								"cr6fc_fpo": document.getElementById("txtNameOfFPO").value,
								"cr6fc_fpoloanaccountno": document.getElementById("hdnAccountNo").value,
								"cr6fc_sanctionedamount": document.getElementById("hdnSanctionAmt").value,
								"cr6fc_cgapplicationno": CGApplicationNO,
								"cr6fc_cgpan": txtCGApplicationNo,
								"cr6fc_creditguaranteefee": '' + CGFeeVal,
								"cr6fc_eligibleguranteecover": '' + CGFeeValElig,
								"cr6fc_igst": '' + IGST,
								"cr6fc_igstamount": '' + IGSTVal,
								"cr6fc_cgst": '' + CGST,
								"cr6fc_cgstamount": '' + CGSTVal,
								"cr6fc_sgst": '' + SGST,
								"cr6fc_sgstamount": '' + SGSTVal,
								"cr6fc_taxamount": '' + subTotal,
								"cr6fc_grandtotal": '' + GrandTot,
								"cr6fc_cgfeestartdate": CGFeeStartDateSOE,
								"cr6fc_cgfeeenddate": CGFeeEndDateSOE,
								"cr6fc_cgfeeindays": '' + cgfeeindays


							});


						console.log(token)
						var header = {
							__RequestVerificationToken: token,
							contentType: "application/json;odata=verbose",
							XRequestDigest: $("#__REQUESTDIGEST").val(),
							// IFMATCH: "*",
							// XHttpMethod: "PATCH"
						}
						$.ajax({

							url: "/_api/cr6fc_renewalsoedetailses("+SOEIDMasterColl[0].cr6fc_renewalsoedetailsid+")",
							type: "PATCH",
							async: false,
							data: SOEData1,
							headers: header,

							success: function (data) {
								if (AttchLength != 0) {
									SOEMasterID(vItemID)
									// getFileContentsAndMetadata(vItemID,token,SOECOLLID)
									updatecgappfile(vItemID)
								}
								SOEMasterID(vItemID)
								alert('SOE Generated Sucessfully');
								if (AttchLength == 0 || AttchLength == null || AttchLength == '') {
									window.location.href = location.origin + "/RenewalSOEDetails/?Item=" + SOEIDMasterColl[0].cr6fc_renewalsoedetailsid + "&Page=NSChecker";
								}
							},
							error: function (e) {
								console.log(e);
							}
						});
					}
					else {
						alert('Request has been Approved by NABSaranrakshan');
						window.location.href = location.origin + "/NSCheckerDBRenewal/";
						if (AttchLength == 0 || AttchLength == null || AttchLength == '') {
							window.location.href = location.origin + "/NSCheckerDBRenewal/";
						}
					}

				}

				//alert('List updated Succesfully');
				// window.location.href="https://nabardmumbai.sharepoint.com/sites/FPOCGPortalUAT/SitePages/NSCheckerDashBoardCGApp.aspx";			                 
			},
			error: function (e) {
				console.log(e);
			}
		});
	})
}
var successId = '';
function GetCounterCGFAN() {
	var vRetVal = '';
	var hdnCounter = '';
	var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CounterMaster')//items?$top=500&$select=CGApplicationNo,ID,Title&$filter=Title eq 'CGFAN' Entrytype eq 'Renewal'";
	var requestHeaders = { "accept": "application/json;odata=verbose" };
	$.ajax({
		url: requestUri,
		contentType: "application/json;odata=verbose",
		headers: requestHeaders,
		async: false,
		cache: false,
		success: function (data) {
			var Logg = data.d.results;
			try {
				var dtt = new Date();
				var dd = dtt.getDate();
				var mm = dtt.getMonth();
				var actmonh = mm + parseInt(1);
				actmonh = '' + actmonh;
				var calmonth;
				if (actmonh.length == 1) {
					calmonth = '0' + actmonh;
				}
				else {
					calmonth = actmonh;
				}
				var yyyy = dtt.getFullYear();
				var month = new Array();
				/* month[0] = "Jan";
				 month[1] = "Feb";
				 month[2] = "Mar";
				 month[3] = "Apr";
				 month[4] = "May";
				 month[5] = "Jun";
				 month[6] = "Jul";
				 month[7] = "Aug";
				 month[8] = "Sep";
				 month[9] = "Oct";
				 month[10] = "Nov";
				 month[11] = "Dec";
				 var mName = month[mm];*/
				if (data.d.results.length > 0) {
					var ItemId = data.d.results[0].CGApplicationNo;

					hdnCounter = parseInt(ItemId) + 1;
					vRetVal = 'CGA' + dd + '' + calmonth + '' + yyyy + '000' + hdnCounter;
					document.getElementById("hdnDigitalRequestNoCGFAN").value = vRetVal;
					document.getElementById("hdnCounterItemIDCGFAN").value = data.d.results[0].CGApplicationNo;
					document.getElementById("hdnCounterItemID1CGFAN").value = data.d.results[0].ID;

					// hdnCounter = parseInt(vRetVal) + 1;

					// var Itemid = data.d.results[0].ID;
				}
			}
			catch (e) {
			}
			// UpdateCounter();
		},
		error: function () {
			console.log("error");
		}
	});
	return vRetVal;
}

function GetCounter() {
	var vRetVal = '';
	var hdnCounter = '';
	var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CounterMaster')//items?$top=500&$select=CGApplicationNo,ID,Title&$filter=Title eq 'SOE'";
	var requestHeaders = { "accept": "application/json;odata=verbose" };
	$.ajax({
		url: requestUri,
		contentType: "application/json;odata=verbose",
		headers: requestHeaders,
		async: false,
		cache: false,
		success: function (data) {
			var Logg = data.d.results;
			try {
				var dtt = new Date();
				if (data.d.results.length > 0) {
					var ItemId = data.d.results[0].CGApplicationNo;
					var fiscalyear = "";
					var today = new Date();
					if ((today.getMonth() + 1) <= 3) {
						fiscalyear = (today.getFullYear() - 1) + "-" + today.getFullYear()
					} else {
						fiscalyear = today.getFullYear() + "-" + (today.getFullYear() + 1)
					}
					hdnCounter = parseInt(ItemId) + 1;
					vRetVal = 'SFPO' + hdnCounter + '/' + fiscalyear;
					document.getElementById("hdnDigitalRequestNo").value = vRetVal;
					document.getElementById("hdnCounterItemID").value = data.d.results[0].CGApplicationNo;
					document.getElementById("hdnCounterItemID1").value = data.d.results[0].ID;

					// hdnCounter = parseInt(vRetVal) + 1;

					// var Itemid = data.d.results[0].ID;
				}
			}
			catch (e) {
			}
			// UpdateCounter();
		},
		error: function () {
			console.log("error");
		}
	});
	return vRetVal;
}
function UpdateCounterCGFAN() {
	debugger;
	var itemId = document.getElementById("hdnCounterItemID1CGFAN").value;
	var hdnCounter = document.getElementById("hdnCounterItemIDCGFAN").value;
	hdnCounter1 = parseInt(hdnCounter) + 1;
	var data1 = JSON.stringify(
		{
			'__metadata': {
				'type': 'SP.Data.CounterMasterListItem'
			},
			'CGApplicationNo': hdnCounter1.toString()
		});
	$.ajax({
		url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('CounterMaster')/getItemByStringId('" + itemId + "')",
		type: "POST",
		contentType: "application/json;odata=verbose",
		async: false,
		data: data1,
		headers: {
			"accept": "application/json;odata=verbose",
			"X-RequestDigest": $("#__REQUESTDIGEST").val(),
			"IF-MATCH": "*",
			"X-Http-Method": "PATCH"
		},
		success: function (data) {
			// AddDashBoard(document.getElementById("hdnDigitalRequestNo").value, document.getElementById("hdnApprvlNotesItemID").value);
			//alert('Data Done')
		},
		error: function (e) {
		}
	});
}

function UpdateCounter() {
	debugger;
	var itemId = document.getElementById("hdnCounterItemID1").value;
	var hdnCounter = document.getElementById("hdnCounterItemID").value;
	hdnCounter1 = parseInt(hdnCounter) + 1;
	var data1 = JSON.stringify(
		{
			'__metadata': {
				'type': 'SP.Data.CounterMasterListItem'
			},
			'CGApplicationNo': hdnCounter1.toString()
		});
	$.ajax({
		url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('CounterMaster')/getItemByStringId('" + itemId + "')",
		type: "POST",
		contentType: "application/json;odata=verbose",
		async: false,
		data: data1,
		headers: {
			"accept": "application/json;odata=verbose",
			"X-RequestDigest": $("#__REQUESTDIGEST").val(),
			"IF-MATCH": "*",
			"X-Http-Method": "PATCH"
		},
		success: function (data) {
			// AddDashBoard(document.getElementById("hdnDigitalRequestNo").value, document.getElementById("hdnApprvlNotesItemID").value);
			//alert('Data Done')
		},
		error: function (e) {
		}
	});
}

//Attachment
function updatecgappfile(vItemID) {
	var data = JSON.stringify(
		{
			"cr6fc_cgid": vItemID,
			"cr6fc_name": "RenewalNSChecker",
			"cr6fc_type": "CGRenewal",
		});
	document.getElementById("txtApplicantID").value,
		shell.getTokenDeferred().done(function (token) {
			console.log(token)
			var header = {
				__RequestVerificationToken: token,
				contentType: "application/json;odata=verbose"
			}
			$.ajax({
				// url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CGApplications')/items",
				url: "/_api/cr6fc_renewalappfiles",
				type: "POST",
				headers: header,
				async: false,
				data: data,
				success: function (data, textStatus, xhr) {
					CGFileID = xhr.getResponseHeader("entityid");
					getFileContentsAndMetadata(vItemID, token, CGFileID)
				},
				error: function (error) {
					console.log(error);
					//alert('Some error occured. Please try again later.');
					alert('Some error occured while adding data in CGApplications list. Please try again later.');
					console.log(error);

				}


			})
		})
}


function getFileContentsAndMetadata(entityID, token, CGFileID) {
	// Get the name of the selected file
	var fileName = encodeURIComponent(document.getElementById('ELIChekerAttach').files[0].name);
	// Get the content of the selected file
	var file = document.getElementById('ELIChekerAttach').files[0];
	// If the user has selected a file
	if (file) {
		// Read the file as a byte array
		var reader = new FileReader();
		reader.readAsArrayBuffer(file);
		// The browser has finished reading the file, we can now do something with it...
		reader.onload = function (e) {
			// The browser has finished reading the file, we can now do something with it...
			var fileContent = e.target.result;
			// Run the function to upload to the Portal Web API, passing the GUID of the newly created record and the file's contents and name as inputs
			uploadFile(fileContent, fileName, CGFileID, token, file.type, file);
		};
	}
}

// Upload the file to
function uploadFile(fileContent, fileName, CGFileID, token, Filecontenttype) {
	var header = {
		__RequestVerificationToken: token,
		Accept: 'application/json;odata=verbose',
		XRequestDigest: $("#__REQUESTDIGEST").val(),

	}
	$.ajax({
		url: "/_api/cr6fc_renewalappfiles(" + CGFileID + ")/cr6fc_attachment?x-ms-file-name=" + fileName,
		type: "PUT",
		async: false,
		contentType: "application/octet-stream",
		processData: false,
		data: fileContent,
		headers: header,
		success: function (data, textStatus, xhr) {

			window.location.href = location.origin + "/RenewalSOEDetails/?Item=" + SOEIDMasterColl[0].cr6fc_renewalsoedetailsid + "&Page=NSChecker";

		},
		error: function (xhr, textStatus, errorThrown) {
			console.log(errorThrown)
		}
	});
}


//Binding Attachment 
function getfileNSChecker(vItemID) {
	$.ajax({
		type: "GET",
		// url: "/_api/cr6fc_cgapplicationses("+vItemID+")/cr6fc_nscheckercgappfile",
		url: "/_api/cr6fc_renewalappfiles?$select=cr6fc_nscheckerfile_name,cr6fc_renewalappfileid,cr6fc_attachment_name&$filter=cr6fc_cgid eq (" + vItemID + ") and cr6fc_name eq 'NSChecker'",
		contentType: "application/json",
		async: false,
		success: function (res) {
			console.log(res);
			var Logg = res.value;
			var vhtml1 = '';
			if (Logg.length > 0) {
				$("#NSApproverAttach").show();
				for (var i = 0; i < Logg.length; i++) {
					var cgappfilename12 = Logg[i].cr6fc_nscheckerfile_name
					vhtml1 += "<a href='/_api/cr6fc_renewalappfiles(" + Logg[i].cr6fc_renewalappfileid + ")/cr6fc_attachment/$value'>" + Logg[i].cr6fc_attachment_name + "</a>";

				}
				$('#additionalDocs').append(vhtml1);
			}

		},
		error: function (xhr, status, error) {
			var errorMessage = xhr.status + ': ' + xhr.statusText;
			console.log(errorMessage);
		}
	});
}

function getfileNSApprover(vItemID) {
	$.ajax({
		type: "GET",
		// url: "/_api/cr6fc_cgapplicationses("+vItemID+")/cr6fc_nscheckercgappfile",
		url: "/_api/cr6fc_renewalappfiles?$select=cr6fc_nscheckerfile_name,cr6fc_renewalappfileid,cr6fc_attachment_name&$filter=cr6fc_cgid eq (" + vItemID + ") and cr6fc_name eq 'NSApprover'",
		contentType: "application/json",
		async: false,
		success: function (res) {
			console.log(res);
			var Logg = res.value;
			var vhtml1 = '';
			if (Logg.length > 0) {
				$("#ELICheckerAttch").show();
				for (var i = 0; i < Logg.length; i++) {
					var cgappfilename12 = Logg[i].cr6fc_nscheckerfile_name
					vhtml1 += "<a href='/_api/cr6fc_renewalappfiles(" + Logg[i].cr6fc_renewalappfileid + ")/cr6fc_attachment/$value'>" + Logg[i].cr6fc_attachment_name + "</a>";

				}
				$('#additionalDocs2').append(vhtml1);
			}

		},
		error: function (xhr, status, error) {
			var errorMessage = xhr.status + ': ' + xhr.statusText;
			console.log(errorMessage);
		}
	});
}
