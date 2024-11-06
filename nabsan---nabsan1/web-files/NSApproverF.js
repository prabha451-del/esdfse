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
	$('title').text('NS Approver Form');


	vItemID = GetQueryStingValue()["Item"];
	var vTaskID = GetQueryStingValue()["Task"];
	TaxMaster(vItemID);
	SOEMaster(vItemID);
	RateMster();
	RegionMaster();
	bindCGApplicationData(vItemID);
	getfileNSApprover(vItemID);
	getfileNSChecker(vItemID);
});

var RegionMasterColl;
function RegionMaster() {
	//var requestUri = location.origin + "/_api/cr6fc_regionmasters?$select=*";
	var requestUri = location.origin + "/_api/cr6fc_regionmasters?$select=*";
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

var RateMasterColl;
function RateMster() {
	//var requestUri = location.origin + "/_api/cr6fc_ratemasters?$select=*&$top=5000";
	var requestUri = location.origin +"/_api/cr6fc_ratemasters?$select=*&$top=5000";
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

var SOEMasterColl;
function SOEMaster() {
	//var requestUri = location.origin + "/_api/cr6fc_renewalsoedetailses?$select=*&$top=5000";
	var requestUri = location.origin + "/_api/cr6fc_renewalsoedetailses?$select=*&$top=5000";
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

var TaxMasterColl;
function TaxMaster() {
	//var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('TaxInvoices')//items?$top=5000&$select=*&$orderby=ID desc";
	//var requestUri = location.origin + "/_api/cr6fc_taxinvoiceses?$select=*&$top=5000";
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
function ClosePopup() {
	$("#inputDialog2").dialog("close");
}
function showSOW() {
	if (SOEDetailsColl.length > 0) {
		var url = location.origin + "/RenewalSOEDetails/?Item=" + SOEDetailsColl[0].cr6fc_renewalsoedetailsid;
		window.open(url, "_blank");
	}
}

var SOEDetailsColl = [];
function bindSOEDetailsData(vItemID) {
	//var requestUri = location.origin + "/_api/cr6fc_renewalsoedetailses?$select=cr6fc_renewalsoedetailsid,cr6fc_wfid&$top=5000&$filter=(cr6fc_wfid eq '" + vItemID + "')";
	var requesturi = location.origin + "/_api/cr6fc_renewalsoedetailses?$select=cr6fc_renewalsoedetailsid,cr6fc_wfid&$top=5000&$filter=(cr6fc_wfid eq '" + vItemID + "')";
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
			SOEDetailsColl = data.value;
		},
		error: function () {
			console.log("error");
		}
	});
}




function BindRegion() {
	var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('RegionMaster')//items?$top=500&$select=*,Title,ID&$orderby=ID asc";
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
				if (data.d.results.length > 0) {
					var RegionOfFPO = document.getElementById("RegionOfFPO");
					RegionOfFPO.options.length = 0;
					RegionOfFPO.options[RegionOfFPO.options.length] = new Option("Select", "0");
					for (var i = 0; i < data.d.results.length; i++) {
						RegionOfFPO.options[RegionOfFPO.options.length] = new Option(data.d.results[i].Region, data.d.results[i].ID);
					}
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

function facility() {
	if ($("#TypeofFacility option:selected").text() == "Term Loan OR WCTL (Working Capital Term Loan)") {
		$("#2").hide();
	}
	else if ($("#TypeofFacility option:selected").text() == "WC/CC Limit") {
		$("#1").hide();
	}
}
function MainCGAppFeeNew(PANFPO) {
	var CGApplicationTot = 0;
	//var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CGApplications')//items?$top=5000&$select=*,FPOActivities111/FPOActivity,RegionOfFPO/ID,FPOState/ID,BusinessFPOState/Id,Title,ELIChecker/Title,ELIChecker/Id&$expand=ELIChecker,RegionOfFPO,FPOActivities111,FPOState,BusinessFPOState&$filter=(PANFPO eq '"+PANFPO+"')";
	//var requestUri = location.origin + "/_api/cr6fc_cgapplicationses?$select=cr6fc_sanctionedamount";
	var requestUri = location.origin + "/_api/cr6fc_cgaplications?$select=cr6fc_sanctionedamount";
	var requestHeaders = { "accept": "application/json;odata=verbose" };
	$.ajax({
		url: requestUri,
		contentType: "application/json;odata=verbose",
		headers: requestHeaders,
		async: false,
		cache: false,
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


function RenewalCGApplicationPAN(PANFPO) {
	//var requestUri = location.origin + "/_api/cr6fc_renewalcgapplications?$top=5000&$select=cr6fc_FPOState,cr6fc_BusinessFPOState,cr6fc_RegionOfFPO,cr6fc_renewalcgapplicationid,cr6fc_status,cr6fc_modifiedsanctionedloanamount,&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=(cr6fc_renewalcgapplicationid eq '" + vItemID + "')";
	var requestUri = location.origin + "/_api/cr6fc_renewalcgapplications?$top=5000&$select=cr6fc_FPOState,cr6fc_BusinessFPOState,cr6fc_RegionOfFPO,cr6fc_renewalcgapplicationid,cr6fc_status,cr6fc_modifiedsanctionedloanamount&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=(cr6fc_renewalcgapplicationid eq '" + vItemID + "')";
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
						TotRenewCGFee = parseFloat(RenewalCGFeeColl[i].cr6fc_modifiedsanctionedloanamount) + TotRenewCGFee;
					}
					if (RenewalCGFeeColl[i].cr6fc_status == "8" || RenewalCGFeeColl[i].cr6fc_status == "10" || RenewalCGFeeColl[i].cr6fc_status == "13" || RenewalCGFeeColl[i].cr6fc_status == "11") {
						TotSOERenewCGFee = parseFloat(RenewalCGFeeColl[i].cr6fc_modifiedsanctionedloanamount) + TotSOERenewCGFee;
					}
				}
				if (TotSOERenewCGFee != 0 && TotSOERenewCGFee != '' && !isNaN(TotSOERenewCGFee)) {
					$('#hdnTotalSOEIssuedSanctionAmt').val(TotSOERenewCGFee);
				}

			}
			if (TotRenewCGFee != 0 && MainCGAppFee != "" && MainCGAppFee != 0) {
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
var CGID;
var GuaranteeEndDate;
function bindCGApplicationData(vItemID) {
	//var requestUri = location.origin + "/_api/cr6fc_renewalcgapplications?$top=5000&$select=*&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=(cr6fc_renewalcgapplicationid eq '" + vItemID + "')";
	var requestUri = location.origin + "/_api/cr6fc_renewalcgapplications?$top=5000&$select=*&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=(cr6fc_renewalcgapplicationid eq '" + vItemID + "')";
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
					bindSOEDetailsData(Logg[0].cr6fc_renewalcgapplicationid)
					CGID = Logg[0].cr6fc_parentid;
					$("#CGPAN").val(Logg[0].cr6fc_cgpan);
					$("#DisbursmentLoan").text(Logg[0]['cr6fc_disbursmentunderloan@OData.Community.Display.V1.FormattedValue']);
					$("#txtNameOfFPO").val(Logg[0].cr6fc_nameoffpo);
					$("#PANFPO").val(Logg[0].cr6fc_panfpo);
					$("#txtApplicantID").val(Logg[0].cr6fc_name);
					$("#CustomerID").val(Logg[0].cr6fc_customerid);
					if (Logg[0]['_cr6fc_regionoffpo_value@OData.Community.Display.V1.FormattedValue'] == 'FPO in Plains') {
						$("#RegionOfFPO").val('1');
					}
					else if (Logg[0]['_cr6fc_regionoffpo_value@OData.Community.Display.V1.FormattedValue'] == 'FPO in North Eastern or Hilly Areas') {
						$("#RegionOfFPO").val('2');
					}
					$("#FarmerMemberSize").val(Logg[0].cr6fc_farmermembersize);
					$("#TypeofFacility").val(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue']);
					$("#hdnTitle").val(Logg[0].cr6fc_name);

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
					$('#hdnParentId').val(Logg[0].cr6fc_parentid);
					$("#SanctionedAmount").val(Logg[0].cr6fc_sanctionedamount);
					$('#SanctionedAmount').text(Math.ceil(Logg[0].cr6fc_sanctionedamount));
					var Word = convertNumberToWords(Math.ceil(Logg[0].cr6fc_sanctionedamount));
					$('#SanctionedAmountinwords').text("Rupees " + " " + Word + " " + "Only");
					$("#hdnpreclosed").val(Logg[0].cr6fc_isprenormalstatus);
					$("#ModifiedSanctionedAmount").val(Logg[0].ModifiedSanctionedLoanAmount);
					$("#ModifiedSanctionedAmount").val(Logg[0].cr6fc_modifiedsanctionedloanamount);
					$("#ModifiedSanctionedAmount").val(Logg[0].cr6fc_modifiedsanctionedloanamount);
					$('#ModifiedSanctionedAmount').text(Math.ceil(Logg[0].cr6fc_modifiedsanctionedloanamount));
					var Word = convertNumberToWords(Math.ceil(Logg[0].cr6fc_modifiedsanctionedloanamount));
					$('#ModifiedSanctionedAmountinwords').text("Rupees " + " " + Word + " " + "Only");
					$("#hdnSanctionAmt").val(Logg[0].cr6fc_modifiedsanctionedloanamount);
					$("#hdnPreviousSanctionAmt").val(Logg[0].cr6fc_sanctionedamount);
					$("#hdnCGStatus").val(Logg[0].cr6fc_cgstatus);
					if (Logg[0].cr6fc_isprenormalstatus == "Yes") {
						$('#101').hide();
						//$('#hidecalculation').hide();
					}

					if (Logg[0].cr6fc_dateofsanction != null && Logg[0].cr6fc_dateofsanction != undefined && Logg[0].cr6fc_dateofsanction != '') {
						document.getElementById("SanctionDate").value = Logg[0].cr6fc_dateofsanction.substring(0, Logg[0].cr6fc_dateofsanction.indexOf("T"));;
					}
					else {
						document.getElementById("SanctionDate").value = '';
					}
					if (Logg[0].cr6fc_dateofnpa != null) {
						document.getElementById("DateofNPA").value = Logg[0].cr6fc_dateofnpa.substring(0, Logg[0].cr6fc_dateofnpa.indexOf("T"));;
					}
					else {
						document.getElementById("DateofNPA").value = null
					}
					if (Logg[0].cr6fc_status == "7" || Logg[0].cr6fc_status == "16") {
						if (Logg[0]._cr6fc_nsapprover_value == loggedInUserId) {
							$('#ButtonHide').show();
						}
					}
					RenewalCGApplicationPAN(Logg[0].cr6fc_panfpo);

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
					$('#dtproceed').text(GetCreatedDateTime(Logg[0].cr6fc_eilcheckercertificateviewdate))
					document.getElementById("instituteIdNew").value = Logg[0].cr6fc_nameoflendinginstitution;
					$('#hdnTypeOfFacility').val(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue']);
					if (Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'] == "Term Loan OR WCTL (Working Capital Term Loan)") {
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
						}
						else {
							document.getElementById("DatelastInstalment").value = null;
						}

						$("#Loanfullydisbursed").val(Logg[0]['cr6fc_loanfullydisbured@OData.Community.Display.V1.FormattedValue']);


						$("#LoanClosed").val(Logg[0]['cr6fc_loanfullydisbured@OData.Community.Display.V1.FormattedValue']);
						if (Logg[0]['cr6fc_loanfullydisbured@OData.Community.Display.V1.FormattedValue'] === 'No') { $('#10').hide(); }
						else { $('#10').show(); }

						$("#hdnDateclosureLoan").val(Logg[0].DateOfClosureOfLoan);
						if (Logg[0].cr6fc_dateofclosureofloan != null && Logg[0].cr6fc_dateofclosureofloan != undefined && Logg[0].cr6fc_dateofclosureofloan != '') {
							//document.getElementById("DateOfRegistration").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_dateofregistration));
							// const DCL = new Date(Logg[0].cr6fc_dateofclosureofloan);
							// const spDate10 = date2.toISOString().slice(0, 10);
							document.getElementById("DateclosureLoan").value = Logg[0].cr6fc_dateofclosureofloan.substring(0, Logg[0].cr6fc_dateofclosureofloan.indexOf("T"));;
							document.getElementById("hdnDateofClosure").value = Logg[0].cr6fc_dateofclosureofloan.substring(0, Logg[0].cr6fc_dateofclosureofloan.indexOf("T"));
						}



					}
					if (Logg[0]["cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue"] == "WC/CC Limit") {

						$("#2").show();
						$("#1").hide();
						$('#hdnLoanClosed').val(Logg[0].cr6fc_limitclosed);
						$("#PeakOutstanding2").val(Logg[0].cr6fc_peakoutstanding);
						$('#PeakOutstanding2').text(Math.ceil(Logg[0].cr6fc_peakoutstanding));
						var Word = convertNumberToWords(Math.ceil(Logg[0].cr6fc_peakoutstanding));
						$('#PeakOutstandinginwords').text("Rupees " + " " + Word + " " + "Only");
						$("#hdnPeakOutstanding").val(Logg[0].cr6fc_peakoutstanding);
						$('#hdnAnyUtiliseUnder').val(Logg[0]["cr6fc_utilisationunderlimit@OData.Community.Display.V1.FormattedValue"]);
						$('#hdnLimitOperationalForPreFY').val(Logg[0]["cr6fc_limitoperational@OData.Community.Display.V1.FormattedValue"]);
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

						$("#Limitoperational").val(Logg[0]["cr6fc_limitoperational@OData.Community.Display.V1.FormattedValue"]);
						if (Logg[0]["cr6fc_limitoperational@OData.Community.Display.V1.FormattedValue"] == 'No') {
							$('#22').hide();
						}
						else {
							$('#22').show();
						}

						$("#UtilisationLimit").val(Logg[0]["cr6fc_utilisationunderlimit@OData.Community.Display.V1.FormattedValue"]);
						if (Logg[0]["cr6fc_utilisationunderlimit@OData.Community.Display.V1.FormattedValue"] == 'No') {
							$('#202').hide();
						}
						else {
							$('#202').show();
						}
						$("#EndLimitClosed2").val(Logg[0]["cr6fc_limitclosed@OData.Community.Display.V1.FormattedValue"]);
						if (Logg[0]["cr6fc_limitclosed@OData.Community.Display.V1.FormattedValue"] === 'No') {
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
					/* if(Logg[0].cr6fc_nscheckerremark != null && Logg[0].cr6fc_nscheckerremark != undefined && Logg[0].cr6fc_nscheckerremark != '')
					 {							
						 $('#divMaker').show();						
						 document.getElementById("divELImaker").innerHTML=Logg[0].cr6fc_nscheckerremark;
					 }*/
					/*if(Logg[0].cr6fc_nsapproverremark != null && Logg[0].cr6fc_nsapproverremark != undefined && Logg[0].cr6fc_nsapproverremark !='')
					{
						$('#divCheckerHide').show();						
						document.getElementById("divELICheckerRemark").innerHTML=Logg[0].cr6fc_nsapproverremark;
  
					}	*/

					if (Logg[0]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == "Review by NABSaranrakshan") {
						$("#txtCheckerStatus").text("Recommend for Approval");
					}
					else if (Logg[0]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == "Recommend for Rejection") {
						$("#txtCheckerStatus").text("Recommend for Rejection");
					}
					$("#txtCGApplicationNo").text(Logg[0].cr6fc_cgpan);
					$("#txtNameOfFPO1").text(Logg[0].cr6fc_nameoffpo);
					$("#txtELICheckerName").text(Logg[0]['_cr6fc_elichecker_value@OData.Community.Display.V1.FormattedValue']);
					$("#instituteId").text(Logg[0].cr6fc_nameoflendinginstitution);
					$("#instituteIdNew").text(Logg[0].cr6fc_nameoflendinginstitution);
					ChecklistData(Logg);


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
function ChecklistData(Logg) {

	var vHTML = '';
	var FPOMemberCount;
	var divCreditLimit = '';
	var divExcCurrCreditLimit = '';
	var divFPORegion = '';
	var divCGAppliStipu = '';
	var hdnTotalSanctionAmt = $('#hdnTotalSanctionAmt').val();
	if (hdnTotalSanctionAmt != '' && hdnTotalSanctionAmt != null) {
		hdnTotalSanctionAmt = parseFloat(hdnTotalSanctionAmt) + parseFloat(Logg[0].cr6fc_modifiedsanctionedloanamount);
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
		return (value.cr6fc_regionmasterid == Logg[0]._cr6fc_regionoffpo_value);
	})

	var vHTMLHeaderTBL = "<table class='blueTable col-md-12 checklist table-bordered' style='border: 1px solid;' cellspacing='0'><tr style='background-color:#808080; height:35px !important;'>" +
		"<td class='form-group'><font  style='font-size:18px !important; color:white !important;'><b>Compliance Required</b></font></td>" +
		"<td class='form-group'><font  style='font-size:18px !important; text-align:center; color:white !important;'><b>Complied</b></font></td>" +
		"<td class='form-group'><font  style='font-size:18px !important; color:white !important;'><b>Value</b></font></td>" +
		"</tr>";
	vHTML += "<tr>"
	vHTML += "<td class='form-group'><font color='Black' style='font-size:15px !important;'><b>1.&nbsp Region and Total Farmer Member size </b></font></td>"

	if (Logg[0]['_cr6fc_regionoffpo_value@OData.Community.Display.V1.FormattedValue'] == "FPO in Plains") {
		if (parseInt(Logg[0].cr6fc_farmermembersize) >= parseInt(filterRegion[0].cr6fc_minmembers)) {
			//FPOMemberCount=
			vHTML += "<td class='form-group' style='text-align:center;'><img style='width:25px' src='/correct.png'></td>"

		}
		else {
			vHTML += "<td class='form-group' style='text-align:center'><img style='width:25px' src='/remove1.png'></td>"
		}


		divFPORegion += "<div><p>Region of the FPO :- " + Logg[0]['_cr6fc_regionoffpo_value@OData.Community.Display.V1.FormattedValue'] + "</p><p>Total No of Member :- " + Logg[0]['cr6fc_totalfpomember@OData.Community.Display.V1.FormattedValue'] + "</p><p>Total Farmer Member Size :- " + Logg[0].cr6fc_farmermembersize + "</p></div>"


	}
	else if (Logg[0]['_cr6fc_regionoffpo_value@OData.Community.Display.V1.FormattedValue'] == "FPO in North Eastern or Hilly Areas") {
		if (parseInt(Logg[0].cr6fc_farmermembersize) >= parseInt(filterRegion[0].cr6fc_minmembers)) {
			vHTML += "<td style='text-align:center'><img style='width:25px' src='/correct.png'></td>"
		}
		else {
			vHTML += "<td style='text-align:center'><img style='width:25px' src='/remove1.png'></td>"
		}

		divFPORegion += "<div class='form-group'><p>Region of the FPO :- " + Logg[0]['_cr6fc_regionoffpo_value@OData.Community.Display.V1.FormattedValue'] + "</p><p>Total No of Member :- " + Logg[0]['cr6fc_totalmembernorthen@OData.Community.Display.V1.FormattedValue'] + "</p><p>Total Farmer Member Size :- " + Logg[0].cr6fc_farmermembersize + "</p></div>"
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
	var CGFeeStartDate;
	var CGFeeEndDate;
	if (Logg[0].cr6fc_cgfeestartdate != "" && Logg[0].cr6fc_cgfeestartdate != null) {
		//CGFeeStartDate=String.format("{0:dd-MM-yyyy}",new Date(Logg[0].cr6fc_cgfeestartdate));
		var date = new Date(Logg[0].cr6fc_cgfeestartdate);
		var options = { day: '2-digit', month: '2-digit', year: 'numeric' };
		CGFeeStartDate = new Intl.DateTimeFormat('en-GB', options).format(date);
	}
	else {
		CGFeeStartDate = '';
	}

	if (Logg[0].cr6fc_cgfeeenddate != "" && Logg[0].cr6fc_cgfeeenddate != null) {
		//CGFeeEndDate=String.format("{0:dd-MM-yyyy}",new Date(Logg[0].cr6fc_cgfeeenddate));
		var date = new Date(Logg[0].cr6fc_cgfeeenddate);
		var options = { day: '2-digit', month: '2-digit', year: 'numeric' };
		CGFeeEndDate = new Intl.DateTimeFormat('en-GB', options).format(date);
	}
	else {
		CGFeeEndDate = '';
	}
	var CGFeeInDays = '';
	if (Logg[0].cr6fc_cgfeeindays != '' && Logg[0].cr6fc_cgfeeindays != null && Logg[0].cr6fc_cgfeeindays != undefined && Logg[0].cr6fc_cgfeeindays != "NaN") {
		CGFeeInDays = parseFloat(Logg[0].cr6fc_cgfeeindays) + 1;
	}
	if (Logg[0].cr6fc_isprenormalstatus == "0") {
		vHTML += "<td style='text-align:center'><img style='width:25px' src='/info.jpg' data-themekey='#'></td>";

		vHTML += "<td class='form-group'><b>Since the application is Pre-closed/Normally-closed, the SOE will not be generated</b></td>";

	} else {
		vHTML += "<td style='text-align:center'><img style='width:25px' src='/info.jpg'></td>"
		vHTML += "<td class='form-group'><font color='Black'><b><div><p>Base Amount :- " + CalBaseAmt + "</p></div><div><p>CG Fee Start Date :- " + CGFeeStartDate + "</p></div><div><p>CG Fee End Date :- " + CGFeeEndDate + "</p></div><div><p>Period in Days  :- " + CGFeeInDays + "</p></div></b></font></td>";


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
	var Newtoday = dd + '/' + mm + '/' + yyyy;
	return Newtoday;
}

var LoggELIMaker;
function BindELIMaker() {
	var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ELIMaster')//items?$top=500&$select=*&$filter=EmailID eq '" + _spPageContextInfo.userEmail + "' &$orderby=ID asc";
	var requestHeaders = { "accept": "application/json;odata=verbose" };
	$.ajax({
		url: requestUri,
		contentType: "application/json;odata=verbose",
		headers: requestHeaders,
		async: false,
		cache: false,
		success: function (data) {
			LoggELIMaker = data.d.results;
			if (LoggELIMaker.length > 0) {	//ELICheckerEmailID
				$('#hdnlendingInstitute').val(LoggELIMaker[0].LendingInstitute);
				$('#hdnELICheckerEmail').val(LoggELIMaker[0].ELICheckerEmailID);
			}
			else {
				alert('You dont have a Permission')

			}
		},
		error: function () {
			console.log("error");
		}
	});
}


/*var CGPAN;
function BindCGPAN(vItemID) {
			var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('TaxInvoices')//items?$top=500&$select=*&$filter=CGID eq '"+vItemID+"' &$orderby=ID asc";
			var requestHeaders = { "accept": "application/json;odata=verbose" };
			$.ajax({
				url: requestUri,
				contentType: "application/json;odata=verbose",
				headers: requestHeaders,
				async: false,
				cache: false,
				success: function (data) {
					CGPAN= data.d.results;
					if(CGPAN.length>0)
					{	//ELICheckerEmailID
						$('#hdnCGPAN').val(CGPAN[0].CGPAN);
					}
					else
					{
						alert('You dont have a Permission')
						
					}
				},
				error: function () {
					console.log("error");
				}
			});
}*/


var successId;
var renewalcgapplicationentityid;
var cgappentitid;
var renewalsoeentityid;
function Submit(status) {
	var txtnsapproverComment = $('#txtnsapproverComment').val();
	if (txtnsapproverComment == '' || txtnsapproverComment == null || txtnsapproverComment == undefined) {
		alert('Please Enter Remark')
		return false;
	}
	var workflowDt = new Date();
	workflowDt = GetCurrentDataToday();

	var requestflag = false;
	var CGStatus = '';
	var irac = $("#IRACclassification").val();
	var dateofLastInstall = $("#hdnDateOfLastInstall").val();
	var dateofClosure = $("#hdnDateofClosure").val();
	var hdnCGStatus = $("#hdnCGStatus").val();
	var dateofLastInstall1 = new Date(dateofLastInstall);
	var dateofClosure1 = new Date(dateofClosure);
	var hdnLoanClosed = $('#hdnLoanClosed').val();
	var hdWFID = $('#hdnParentId').val();
	if ((dateofClosure1 >= dateofLastInstall1) && (irac == "Standard" || irac == "SMA- 0" || irac == "SMA- 1" || irac == "SMA- 2" || irac == "Standard - 0 Days Past Due (DPD)") && hdnLoanClosed == "Yes") {
		requestflag = true;
		//CGStatus = "Normal Closed";
		CGStatus = "7";
	}

	if ((dateofClosure1 < dateofLastInstall1) && (irac == "Standard" || irac == "SMA- 0" || irac == "SMA- 1" || irac == "SMA- 2" || irac == "Standard - 0 Days Past Due (DPD)") && hdnLoanClosed == "Yes") {
		requestflag = true;
		//CGStatus = "Pre Closed";
		CGStatus = "8";
	}

	if (CGStatus == "" || CGStatus == null) {
		CGStatus = hdnCGStatus
	}

	var NSApproverComm = document.getElementById("hdnNSApproverHistory").value;
	var txtNsApprRemark;
	if (NSApproverComm != '' && NSApproverComm != undefined && NSApproverComm != '') {
		txtNsApprRemark = "Comment :- " + txtnsapproverComment + " - " + workflowDt + ": " + NSApproverComm.toString() + "\n\n"
	}
	else {
		txtNsApprRemark = "Comment :- " + txtnsapproverComment + " - " + workflowDt + "\n\n"
	}
	var Data;

	if (status !== 'Approved by NABSaranrakshan') {
		if (status == 'Sent Back by NABSaranrakshan') {
			Vstatus = "3";
		}
		else if (status == 'Rejected by NABSaranrakshan') {
			Vstatus = "9";
		}

		Data = JSON.stringify(
			{
				//RenewalCGApplicationListItem
				"cr6fc_status": Vstatus,
				"cr6fc_nsapproverremark": txtNsApprRemark

			});

	}
	else if (status == 'Approved by NABSaranrakshan') {
		Vstatus = "8";
		Data = JSON.stringify(
			{
				//RenewalCGApplicationListItem
				"cr6fc_status": Vstatus,
				"cr6fc_nsapproverremark": txtNsApprRemark,
				"cr6fc_soegenerateddate": new Date(),
				"cr6fc_cgstatus": CGStatus

			});

	}


	fileInput = $('#ELIChekerAttach');
	otherfileArray = [];
	//var AttchLength=fileInput[0].files.length
	$("#attachFilesHolder input:file").each(function () {
		if ($(this)[0].files[0]) {
			otherfileArray.push({ "Attachment": $(this)[0].files[0] });
		}
	});
	AttchLength = otherfileArray.length;

	//update data
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

			success: function (data, textStatus, xhr) {
				renewalcgapplicationentityid = xhr.getResponseHeader('entityid');
				fileInput = $('#ELIChekerAttach');
				otherfileArray = [];
				//var AttchLength=fileInput[0].files.length
				$("#attachFilesHolder input:file").each(function () {
					if ($(this)[0].files[0]) {
						otherfileArray.push({ "Attachment": $(this)[0].files[0] });
					}
				});
				AttchLength = otherfileArray.length;

				if (requestflag == true && status == 'Approved by NABSaranrakshan') {
					var CGData = JSON.stringify(
						{
							//cgapplication
							"cr6fc_cgstatus": CGStatus,
							"cr6fc_statuschangeddate": new Date()

						});


					var header = {
						__RequestVerificationToken: token,
						contentType: "application/json;odata=verbose",
						XRequestDigest: $("#__REQUESTDIGEST").val(),
						IFMATCH: "*",
						XHttpMethod: "PATCH"
					}
					$.ajax({

						url: "/_api/cr6fc_cgaplications(" + hdWFID + ")",
						type: "PATCH",
						async: false,
						data: CGData,
						headers: header,
						success: function (data, textStatus, xhr) {
							cgappentitid = xhr.getResponseHeader('entityid');
							if (AttchLength != 0) {
								updatecgappfile(vItemID)
							}
							else {
								alert('Request Approved Sucessfully');
								//window.location.href = location.origin + "/RefreshingCache/?id=" + renewalcgapplicationentityid + "," + cgappentitid + "&tbl=cr6fc_renewalcgapplications,cr6fc_cgapplicationses&col=cr6fc_cacherefreshedon&red=NSApproverDBRenewal"
								window.location.href = location.origin + "/RefreshingCache/?id=" + renewalcgapplicationentityid + "," + cgappentitid + "&tbl=cr6fc_renewalcgapplications,cr6fc_cgaplications&col=cr6fc_cacherefreshedon&red=NSApproverDBRenewal"
								// window.location.href=location.origin + "/NSApproverDBRenewal/";		
							}
						},
						error: function (e) {
							console.log(e);
						}
					});

				}
				else if (status == 'Approved by NABSaranrakshan') {
					var vTitle = GetCounter();
					var vCGFANTitle = GetCounterCGFAN();
					var subTotal;
					
						var SOEData = JSON.stringify(
							{
								//Renewal SOE Details
								"cr6fc_name": vTitle,
								"cr6fc_soeno": vTitle,
								"cr6fc_cgfan": vCGFANTitle,
								"cr6fc_soedate": new Date(),
								"cr6fc_dateonthetin": new Date()
							});

						var header = {
							__RequestVerificationToken: token,
							contentType: "application/json;odata=verbose",
							XRequestDigest: $("#__REQUESTDIGEST").val(),
							IFMATCH: "*",
							XHttpMethod: "PATCH"
						}
						$.ajax({

							url: "/_api/cr6fc_renewalsoedetailses(" + SOEDetailsColl[0].cr6fc_renewalsoedetailsid + ")",
							type: "PATCH",
							async: false,
							data: SOEData,
							headers: header,

							success: function (data, textStatus, xhr) {
								renewalsoeentityid = xhr.getResponseHeader('entityid');
								successId = SOEDetailsColl[0].cr6fc_renewalsoedetailsid;
								UpdateCounter();
								UpdateCounterCGFAN();

								if (AttchLength != 0) {
									updatecgappfile(vItemID)
								}
								else {

									alert('Request Approved by NS Approver and SOE no is :' + document.getElementById("hdnDigitalRequestNo").value);
									//window.location.href = location.origin + "/RefreshingCache/?id=" + renewalcgapplicationentityid + "," + renewalsoeentityid + "," + updateentityid + "," + cgfanentityid + "&tbl=cr6fc_renewalcgapplications,cr6fc_renewalsoedetailses,cr6fc_countermasters,cr6fc_countermasters&col=cr6fc_cacherefreshedon&red=NSApproverDBRenewal"
									window.location.href = location.origin + "/RefreshingCache/?id=" + renewalcgapplicationentityid + "," + renewalsoeentityid + "," + updateentityid + "," + cgfanentityid + "&tbl=cr6fc_renewalcgapplications,cr6fc_renewalsoedetailses,cr6fc_countermasters,cr6fc_countermasters&col=cr6fc_cacherefreshedon&red=NSApproverDBRenewal"
									// window.location.href= location.origin + "/NSApproverDBRenewal/";
								}
								/*if(AttchLength==0 || AttchLength==null || AttchLength==''){
								window.location.href="https://nabardmumbai.sharepoint.com/sites/FPOCGPortalUAT/SitePages/Renewal Application/NSApproverDashBoardApplicationRenewal.aspx";
								}*/
							},
							error: function (e) {
								console.log(e);
							}
						});

					}
					else if(status == 'Rejected by NABSaranrakshan'){
						var CGData1 = JSON.stringify(
							{
								//cgapplication
								//"cr6fc_cgstatus": CGStatus,
								//"cr6fc_statuschangeddate": new Date(),
								"cr6fc_renewalrequestongoing":'1'
							});
	
	
						var header = {
							__RequestVerificationToken: token,
							contentType: "application/json;odata=verbose",
							XRequestDigest: $("#__REQUESTDIGEST").val(),
							IFMATCH: "*",
							XHttpMethod: "PATCH"
						}
						$.ajax({
	
							url: "/_api/cr6fc_cgaplications(" + hdWFID + ")",
							type: "PATCH",
							async: false,
							data: CGData1,
							headers: header,
							success: function (data, textStatus, xhr) {
								cgappentitid = xhr.getResponseHeader('entityid');
								if (AttchLength != 0) {
									updatecgappfile(vItemID)
								}
								else {
									alert('Request Rejected');
									//window.location.href = location.origin + "/RefreshingCache/?id=" + renewalcgapplicationentityid + "," + cgappentitid + "&tbl=cr6fc_renewalcgapplications,cr6fc_cgapplicationses&col=cr6fc_cacherefreshedon&red=NSApproverDBRenewal"
									window.location.href = location.origin + "/RefreshingCache/?id=" + renewalcgapplicationentityid + "," + cgappentitid + "&tbl=cr6fc_renewalcgapplications,cr6fc_cgaplications&col=cr6fc_cacherefreshedon&red=NSApproverDBRenewal"
									// window.location.href=location.origin + "/NSApproverDBRenewal/";		
								}
							},
							error: function (e) {
								console.log(e);
							}
						});
	
					}
					else {
						alert('Action Submitted');
						/*if(AttchLength==0 || AttchLength==null || AttchLength==''){
						window.location.href="https://nabardmumbai.sharepoint.com/sites/FPOCGPortalUAT/SitePages/Renewal Application/NSApproverDashBoardApplicationRenewal.aspx";
						}*/

					}
				
			},
			error: function (e) {
				console.log(e);
			}
		});
	});
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

function GetCounterCGFAN() {
	var vRetVal = '';
	var hdnCounter = '';
	//var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CounterMaster')//items?$top=500&$select=CGApplicationNo,ID,Title&$filter=Title eq 'CGFAN'";
	//var requestUri = location.origin + "/_api/cr6fc_countermasters?$top=500&$select=*&$filter=cr6fc_name eq 'CGFAN'";
	var requestUri = location.origin + "/_api/cr6fc_countermasters?$top=500&$select=*&$filter=cr6fc_name eq 'CGFAN'";
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
				var dtt = new Date();
				var dd = dtt.getDate();
				var newdd = '';
				if (dd.length == 1) {
					newdd = '0' + dd;
				}
				else {
					newdd = dd;
				}
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
				if (data.value.length > 0) {
					var ItemId = Logg[0].cr6fc_cgapplicationno;
					hdnCounter = parseInt(ItemId) + 1;
					vRetVal = 'GFFPO' + dd + '' + calmonth + '' + yyyy + '0000' + hdnCounter;
					document.getElementById("hdnDigitalRequestNoCGFAN").value = vRetVal;
					document.getElementById("hdnCounterItemIDCGFAN").value = Logg[0].cr6fc_cgapplicationno;
					document.getElementById("hdnCounterItemID1CGFAN").value = Logg[0].cr6fc_countermasterid;
				}
			}
			catch (e) {
			}
		},
		error: function () {
			console.log("error");
		}
	});
	return vRetVal;
}

var vRetValSOE = '';
function GetCounter() {
	var hdnCounter = '';
	//var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CounterMaster')//items?$top=500&$select=CGApplicationNo,ID,Title&$filter=Title eq 'SOE'";    
	//var requestUri = location.origin + "/_api/cr6fc_countermasters?$top=500&$select=*&$filter=cr6fc_name eq 'SOE'";
	var requestUri = location.origin + "/_api/cr6fc_countermasters?$top=500&$select=*&$filter=cr6fc_name eq 'SOE'";
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
				var dtt = new Date();
				if (Logg.length > 0) {
					var ItemId = Logg[0].cr6fc_cgapplicationno;
					var fiscalyear = "";
					var today = new Date();
					if ((today.getMonth() + 1) <= 3) {
						fiscalyear = (today.getFullYear() - 1) + "-" + today.getFullYear()
					} else {
						fiscalyear = today.getFullYear() + "-" + (today.getFullYear() + 1)
					}
					hdnCounter = parseInt(ItemId) + 1;
					vRetValSOE = 'SFPO/' + hdnCounter + '/' + fiscalyear;
					document.getElementById("hdnDigitalRequestNo").value = vRetValSOE;
					document.getElementById("hdnCounterItemID").value = Logg[0].cr6fc_cgapplicationno;
					document.getElementById("hdnCounterItemID1").value = Logg[0].cr6fc_countermasterid;

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
	return vRetValSOE;
}

var cgfanentityid;
function UpdateCounterCGFAN() {
	debugger;
	var itemId = document.getElementById("hdnCounterItemID1CGFAN").value;
	var hdnCounter = document.getElementById("hdnCounterItemIDCGFAN").value;
	hdnCounter1 = parseInt(hdnCounter) + 1;
	var data1 = JSON.stringify(
		{
			//countermaster
			'CGApplicationNo': hdnCounter1.toString()
		});
	shell.getTokenDeferred().done(function (token) {
		var header = {
			__RequestVerificationToken: token,
			contentType: "application/json;odata=verbose",
			XRequestDigest: $("#__REQUESTDIGEST").val(),
			IFMATCH: "*",
			XHttpMethod: "PATCH"
		}
		$.ajax({
			url: "/_api/cr6fc_countermasters(" + itemId + ")",
			type: "PATCH",
			async: false,
			data: data1,
			headers: header,
			success: function (data, textStatus, xhr) {
				cgfanentityid = xhr.getResponseHeader('entityid');
			},
			error: function (e) {
			}
		});
	});
}
var updateentityid;
function UpdateCounter() {
	debugger;
	var itemId = document.getElementById("hdnCounterItemID1").value;
	var hdnCounter = document.getElementById("hdnCounterItemID").value;
	hdnCounter1 = parseInt(hdnCounter) + 1;
	var data1 = JSON.stringify(
		{
			//countermaster
			'cr6fc_cgapplicationno': hdnCounter1.toString()
		});
	shell.getTokenDeferred().done(function (token) {
		var header = {
			__RequestVerificationToken: token,
			contentType: "application/json;odata=verbose",
			XRequestDigest: $("#__REQUESTDIGEST").val(),
			IFMATCH: "*",
			XHttpMethod: "PATCH"
		}
		$.ajax({
			url: "/_api/cr6fc_countermasters(" + itemId + ")",
			type: "PATCH",
			async: false,
			data: data1,
			headers: header,
			success: function (data, textStatus, xhr) {
				updateentityid = xhr.getResponseHeader('entityid');
			},
			error: function (e) {
			}
		});
	});
}

function UpdateCounterAttchFailed() {
	debugger;
	var itemId = document.getElementById("hdnCounterItemID").value;
	var hdnCounter = document.getElementById("hdnCounterItemID").value;
	hdnCounter = parseInt(hdnCounter) + 1;
	$.ajax({
		url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('CounterMaster')/getItemByStringId('" + itemId + "')",
		type: "POST",
		contentType: "application/json;odata=verbose",
		async: false,
		data: JSON.stringify(
			{
				'__metadata': {
					'type': 'SP.Data.CounterMasterListItem'
				},
				'CGApplicationNo': hdnCounter.toString()
			}),
		headers: {
			"accept": "application/json;odata=verbose",
			"X-RequestDigest": $("#__REQUESTDIGEST").val(),
			"IF-MATCH": "*",
			"X-Http-Method": "PATCH"
		},
		success: function (data) {
			// AddDashBoardAttachFailed(document.getElementById("hdnDigitalRequestNo").value, document.getElementById("hdnApprvlNotesItemID").value);
		},
		error: function (e) {
		}
	});

}

function GetUserId1(EamilID) {
	debugger;
	//var vNewLoginName=EamilID.split('|')[2];
	var surl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/siteusers?$filter=substringof('" + EamilID + "',Email)";
	var returnValue = -1;
	$.ajax({
		async: false,
		url: surl,
		method: "GET",
		headers: { "Accept": "application/json; odata=verbose" },
		success: function (data) {
			try {
				returnValue = data.d.results[0].Id;
			}
			catch (err) {
				returnValue = -1;
			}
		},
		error: function (data) {
			returnValue = -1;
			console.log(JSON.stringify(data));

		}
	});
	return returnValue;
}

function Exit() {
	window.location.href = location.origin + "/NSApproverDBRenewal/";
}


//Attachment
function updatecgappfile(vItemID) {
	var data = JSON.stringify(
		{
			"cr6fc_cgid": vItemID,
			"cr6fc_name": "NSApprover",
			"cr6fc_type": "CGRenewal",
		});
	//document.getElementById("txtApplicantID").value,
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

var renewalentityid;
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
			renewalentityid = xhr.getResponseHeader('entityid');
			//window.location.href = location.origin + "/RefreshingCache/?id=" + renewalcgapplicationentityid + "," + cgappentitid + "," + renewalentityid + "," + updateentityid + "," + cgfanentityid + "," + renewalsoeentityid + "&tbl=cr6fc_renewalcgapplications,cr6fc_cgapplicationses,cr6fc_renewalappfiles,cr6fc_countermasters,cr6fc_countermasters,cr6fc_renewalsoedetailses&col=cr6fc_cacherefreshedon&red=NSApproverDBRenewal";
			window.location.href = location.origin + "/RefreshingCache/?id=" + renewalcgapplicationentityid + "," + cgappentitid + "," + renewalentityid + "," + updateentityid + "," + cgfanentityid + "," + renewalsoeentityid + "&tbl=cr6fc_renewalcgapplications,cr6fc_cgaplications,cr6fc_renewalappfiles,cr6fc_countermasters,cr6fc_countermasters,cr6fc_renewalsoedetailses&col=cr6fc_cacherefreshedon&red=NSApproverDBRenewal";
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
		url: location.origin + "/_api/cr6fc_renewalappfiles?$select=cr6fc_renewalappfileid,cr6fc_attachment&$filter=cr6fc_cgid eq (" + vItemID + ") and (cr6fc_name eq 'NSChecker' or cr6fc_name eq 'RenewalNSChecker') ",
		contentType: "application/json",
		async: false,
		success: function (res) {
			console.log(res);
			var Logg = res.value;
			var vhtml1 = '';
			if (Logg.length > 0) {
				$("#NSApproverAttach").show();
				for (var i = 0; i < Logg.length; i++) {
					var cgappfilename12 = Logg[i].cr6fc_attachment_name
					//vhtml1 += "<a href='/_api/cr6fc_renewalappfiles(" + Logg[i].cr6fc_renewalappfileid + ")/cr6fc_attachment/$value'>" + Logg[i].cr6fc_attachment_name + "</a>";
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
		//url: "/_api/cr6fc_renewalappfiles?$select=cr6fc_attachment,cr6fc_renewalappfileid&$filter=cr6fc_cgid eq (" + vItemID + ") and cr6fc_name eq 'NSApprover'",
		url: "/_api/cr6fc_renewalappfiles?$select=cr6fc_attachment,cr6fc_renewalappfileid&$filter=cr6fc_cgid eq (" + vItemID + ") and cr6fc_name eq 'NSApprover'",
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

