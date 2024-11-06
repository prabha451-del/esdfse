var vItemID;
var loggedInUserId = '';
var loggedInUserName = '';
var loggedInUserEmail = '';
$(document).ready(function () {
	loggedInUserId = $('#fpo-user-contact-id').val();
	loggedInUserName = $('#fpo-user-contact-name').val();
	loggedInUserEmail = $('#fpo-user-email').val();
	$('title').text('APPLICATIONEDITFORM');
	vItemID = GetQueryStingValue()["Item"];
	var vTaskID = GetQueryStingValue()["Task"];
	BindFPOActivities();
	BindRegion();
	BindFPOState();
	//BindBusinessFPOcity();
	BindBusinessFPOState();
	//BindELICheckerMaker();
	BindELIMaker()
	bindCGApplicationData(vItemID);

	// $.getScript(_spPageContextInfo.webAbsoluteUrl + "/SiteAssets/NEWJS/fSelect.js", function () {
	$('#PurposeOftheCreditFacility').fSelect();
	$('#FPOActivities').fSelect();


	// });

	var today = new Date();
	var dd1 = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0');
	var yyyy = today.getFullYear();

	today = yyyy + '-' + mm + '-' + dd1;
	$('#DateOfRegistration').attr('max', today);
	$('#DateOfRegistration').attr('max', today);

	$('#ValidityCreditGuarantee').attr('min', today);

	var today = new Date();
	var newdt = today.setDate(today.getDate() + 1);
	newdt = new Date(newdt);
	var dd = String(newdt.getDate()).padStart(2, '0');
	var mm = String(newdt.getMonth() + 1).padStart(2, '0');
	var yyyy = newdt.getFullYear();

	//today1 = yyyy + '-' + mm + '-' + dd;

	var today1 = new Date();
	var newdt1 = today1.setDate(today.getDate() - 1);
	newdt1 = new Date(newdt1);
	var dd = String(newdt1.getDate()).padStart(2, '0');
	var mm = String(newdt1.getMonth() + 1).padStart(2, '0');
	var yyyy = newdt1.getFullYear();


	today1 = yyyy + '-' + mm + '-' + dd;

	$('#DateOfSanction').attr('max', today1);

	$('#SanctionedDate').attr('max', today1);

	$("#BusinessAddress").change(function () {
		var SelVal = $(this).val();
		if (SelVal == "1") {
			$("#otherdetilfpo").hide();
			$("#busineefpoadd").hide();
			$("#busineefpostate").hide();
		}
		else if (SelVal == "2") {
			$("#otherdetilfpo").show();
			$("#busineefpoadd").show();
			$("#busineefpostate").show();

		}
		else {
			$("#otherdetilfpo").hide();
			$("#busineefpoadd").hide();
			$("#busineefpostate").hide();

		}
	})
	$("#FPOAvailedGOIScheme").change(function () {
		var SelVal = $(this).val();
		if (SelVal == "1") {
			$("#creditfacility").show();
			$("#crodetails").hide();
		}
		else if (SelVal == "2") {
			$("#creditfacility").hide();
			$("#crodetails").show();

		}
		else {
			$("#creditfacility").show();
			$("#crodetails").show();

		}
	})
	$("#TypeOfFacility").change(function () {
		var SelVal = $(this).val();
		if (SelVal == "1") {
			$("#termloandet").show();
			$("#LoanorWTCL").show();
			$("#wcclimitdetail").hide();
			$("#WCCCLimit").hide();
		}
		else if (SelVal == "2") {
			$("#wcclimitdetail").show();
			$("#WCCCLimit").show();
			$("#termloandet").hide();
			$("#LoanorWTCL").hide();


		}
		else {
			$("#termloandet").hide();
			$("#LoanorWTCL").hide();
			$("#wcclimitdetail").hide();
			$("#WCCCLimit").hide();

		}
	})
	$("#RegionOfFPO").change(function () {
		var SelVal = $('#RegionOfFPO option:selected').text();
		if (SelVal == "FPO in Plains") {
			$("#Plains").show();
			$("#Northen").hide();
		}
		else if (SelVal == "FPO in North Eastern or Hilly Areas") {
			$("#Plains").hide();
			$("#Northen").show();

		}
		else {
			$("#Plains").hide();
			$("#Northen").hide();

		}
	})

	/*$("#LoanFullyDisbured").change(function () {
			var SelVal = $(this).val();
			if (SelVal == "yes") {
				$("#outstand2").show();
				$("#termloandettl").hide();
			}
			else if(SelVal == "No")
			{
			 $("#outstand2").show();
			 $("#termloandettl").show();
	
			}
			else {
				$("#outstand2").hide();
				$("#termloandettl").hide();
	
			}
		})
	    
	$("#FullyLoanDisbursed").change(function () {
			var SelVal = $(this).val();
			if (SelVal == "yes") {
				$("#outstanding3").show();
				$("#termloandettl").hide();
			}
			else if(SelVal == "No")
			{
			 $("#outstanding3").show();
			 $("#termloandettl").show();
	
			}
			else {
				$("#outstanding3").hide();
				$("#termloandettl").hide();
	
			}
		});*/

	$(".nav-tabs a").click(function () {
		$(this).tab('show');
	});
	$('.nav-tabs a').on('shown.bs.tab', function (event) {
		var x = $(event.target).text();         // active tab
		var y = $(event.relatedTarget).text();  // previous tab
		$(".act span").text(x);
		$(".prev span").text(y);
	});

});

var LoggELIMaker;
function BindELIMaker() {
	//var requestUri = location.origin + "/_api/cr6fc_elimasters?$select=cr6fc_emailid,cr6fc_lendinginstitute,cr6fc_elicheckeremailid&$filter=cr6fc_emailid eq '" + loggedInUserEmail + "'"; commented on 17 9 224
	
	var requestUri = location.origin + "/_api/cr6fc_elimasters?$select=cr6fc_emailid,cr6fc_lendinginstitute,cr6fc_elicheckeremailid&$filter=cr6fc_emailid eq '" + loggedInUserEmail + "'";
	//var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ELIMaster')//items?$top=500&$select=*";
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
			LoggELIMaker = data.value;
			if (LoggELIMaker.length > 0) {
				/*$('#NameOfLendingInstitution').val(LoggELIMaker[0].cr6fc_lendinginstitute);
				$('#ELICheckerEmail').val(LoggELIMaker[0].cr6fc_elicheckeremailid); comm on 17 9 24*/
				$('#NameOfLendingInstitution').val(LoggELIMaker[0].cr6fc_lendinginstitute);
				$('#ELICheckerEmail').val(LoggELIMaker[0].cr6fc_elicheckeremailid);
			}
			else {
				alert('You dont have a Permission')
				$('.form-control').prop('disabled', true);

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
//added by shivaprabha bindOutstandingAmountwtc2
function bindOutstandingAmountwtc2() {
	//var totalcapi = 0;
	var OutstandingAmountOnDate = $("#OutstandingAmountOnDate").val();
	//totalcapi = SanctionedAmount 
	var Word = convertNumberToWords(Math.ceil(OutstandingAmountOnDate));
	console.log(Word);
	$('#SanctionedAmountinwords1').text("Rupees " + " " + Word + " " + "Only");
	$('#SanctionedAmountinwords1').val("Rupees " + " " + Word + " " + "Only");


	//$('#txtAmountinwords').text(totalcapi);
	//$('#txtAmountinwords').val(totalcapi);

}


function bindsantionamountwtcl() {
	//var totalcapi = 0;
	var SanctionedAmount = $("#SanctionedAmount").val();
	//totalcapi = SanctionedAmount 
	var Word = convertNumberToWords(Math.ceil(SanctionedAmount));
	console.log(Word);
	$('#SanctionedAmountinwords').text("Rupees " + " " + Word + " " + "Only");
	$('#SanctionedAmountinwords').val("Rupees " + " " + Word + " " + "Only");


	//$('#txtAmountinwords').text(totalcapi);
	//$('#txtAmountinwords').val(totalcapi);

}

function bindsantionamountwccc() {
	//var totalcapi = 0;
	var SanctionedAmountWCDetail = $("#SanctionedAmountWCDetail").val();
	//totalcapi = SanctionedAmount 
	var Word = convertNumberToWords(Math.ceil(SanctionedAmountWCDetail));
	console.log(Word);
	$('#SanctionedAmountWCDetailinwords').text("Rupees " + " " + Word + " " + "Only");
	$('#SanctionedAmountWCDetailinwords').val("Rupees " + " " + Word + " " + "Only");


	//$('#txtAmountinwords').text(totalcapi);
	//$('#txtAmountinwords').val(totalcapi);

}
function cancel() {

	window.location.href = location.origin + "/DashBoardCGApp/";

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

function calFarmerMember() {
	var NoOfLandlessFarmer = $('#NoOfLandlessFarmer').val();
	var NoofSmallFarmer = $('#NoofSmallFarmer').val();
	var NoOfBigFarmer = $('#NoOfBigFarmer').val();
	var NoOfMarginalFarmer = $('#NoOfMarginalFarmer').val();
	if (NoOfLandlessFarmer == 0 || NoOfLandlessFarmer == '') {
		NoOfLandlessFarmer = 0;
	}

	if (NoofSmallFarmer == 0 || NoofSmallFarmer == '') {
		NoofSmallFarmer = 0;
	}

	if (NoOfBigFarmer == 0 || NoOfBigFarmer == '') {
		NoOfBigFarmer = 0;
	}

	if (NoOfMarginalFarmer == 0 || NoOfMarginalFarmer == '') {
		NoOfMarginalFarmer = 0;
	}
	var TotalFarmer = parseInt(NoOfLandlessFarmer) + parseInt(NoofSmallFarmer) + parseInt(NoOfBigFarmer) + parseInt(NoOfMarginalFarmer);
	$('#FarmerMemberSize').text(TotalFarmer);
	$('#FarmerMemberSize').val(TotalFarmer);

}

function calTotalFinOutlet() {
	var ProjectCostInput = $('#ProjectCostInput').val();
	var ProjectCostMarketing = $('#ProjectCostMarketing').val();
	var ProjectCostProcessing = $('#ProjectCostProcessing').val();
	var ProjectCostOther = $('#ProjectCostOther').val();
	if (ProjectCostInput == 0 || ProjectCostInput == '') {
		ProjectCostInput = 0;
	}

	if (ProjectCostMarketing == 0 || ProjectCostMarketing == '') {
		ProjectCostMarketing = 0;
	}

	if (ProjectCostProcessing == 0 || ProjectCostProcessing == '') {
		ProjectCostProcessing = 0;
	}

	if (ProjectCostOther == 0 || ProjectCostOther == '') {
		ProjectCostOther = 0;
	}
	var TotalFarmer = parseInt(ProjectCostInput) + parseInt(ProjectCostMarketing) + parseInt(ProjectCostProcessing) + parseInt(ProjectCostOther);
	$('#ProjectCostTotal').text(TotalFarmer);
	$('#ProjectCostTotal').val(TotalFarmer);

}
function validate() {
	var TotalFPOMember = $("#TotalFPOMember").val();
	var FarmerMemberSize = $("#FarmerMemberSize").val();
	if (TotalFPOMember == "1") {
		if (FarmerMemberSize > 300) {
			alert('Farmer Member Size should be less than 300')
			return false;
		}
	}
}
function validateMore() {
	var TotalFPOMember = $("#TotalFPOMember").val();
	var FarmerMemberSize = $("#FarmerMemberSize").val();
	if (TotalFPOMember == "2") {
		if (FarmerMemberSize < 300) {
			alert('Farmer Member Size should not be less than 300')
			return false;
		}
	}
}
function validateEastern() {
	var TotalFPOMember = $("#TotalMemberNorthen").val();
	var FarmerMemberSize = $("#FarmerMemberSize").val();
	if (TotalFPOMember == "1") {
		if (FarmerMemberSize > 100) {
			alert('Farmer Member Size should be less than 100')
			return false;
		}
	}
}
function validateMoreNorthen() {
	var TotalFPOMember = $("#TotalMemberNorthen").val();
	var FarmerMemberSize = $("#FarmerMemberSize").val();
	if (TotalFPOMember == "2") {
		if (FarmerMemberSize < 100) {
			alert('Farmer Member Size should not be less than 100')
			return false;
		}
	}
}


// var LoggChecker;
// function BindELICheckerMaker() {
// 	var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EILMakerChecker')//items?$top=500&$select=*,EILMaker/Id,EILChecker/Id,ID&$expand=EILChecker,EILMaker&$filter=EILMaker/Id eq '" + _spPageContextInfo.userId + "' &$orderby=ID asc";
// 	var requestHeaders = { "accept": "application/json;odata=verbose" };
// 	$.ajax({
// 		url: requestUri,
// 		contentType: "application/json;odata=verbose",
// 		headers: requestHeaders,
// 		async: false,
// 		cache: false,
// 		success: function (data) {
// 			LoggChecker = data.d.results;
// 		},
// 		error: function () {
// 			console.log("error");
// 		}
// 	});
// }

function BindFPOActivities() {
	//var requestUri = location.origin + "/_api/cr6fc_fpoactivitiesmasters?$select=cr6fc_fpoactivity"; comm on 17 9 24
	var requestUri = location.origin + "/_api/cr6fc_fpoactivitiesmasters?$select=cr6fc_fpoactivity";
	var requestHeaders = { "accept": "application/json;odata=verbose" };
	$.ajax({
		url: requestUri,
		type: "GET",
		async: false,
		headers: {
			"accept": "application/json;odata=verbose",
			"content-type": "application/json;odata=verbose"
		},
		success: function onSuccess(data) {
			var items = data.value;
			try {
				if (items.length > 0) {
					var FPOActivities = document.getElementById("FPOActivities");
					FPOActivities.options.length = 0;
					FPOActivities.options[FPOActivities.options.length] = new Option();
					for (var i = 0; i < items.length; i++) {
						//FPOActivities.options[FPOActivities.options.length] = new Option(items[i].cr6fc_fpoactivity, i + 1); comm on 17 9 24
						FPOActivities.options[FPOActivities.options.length] = new Option(items[i].cr6fc_fpoactivity, i + 1);
					}
				}
			}
			catch (e) {
			}

		},
		error: function onError(error) {
			console.log(JSON.stringify(error));
		}
	});
}
function BindRegion() {
	//var requestUri = location.origin + "/_api/cr6fc_regionmasters?$select=cr6fc_name,cr6fc_regionmasterid"; comm on 9 17 24
	var requestUri =  location.origin + "/_api/cr6fc_regionmasters?$select=cr6fc_name,cr6fc_regionmasterid";
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
			var items = data.value;
			items.splice(2, 1);
			try {
				if (items.length > 0) {
					var RegionOfFPO = document.getElementById("RegionOfFPO");
					RegionOfFPO.options.length = 0;
					RegionOfFPO.options[RegionOfFPO.options.length] = new Option("Select", "0");
					for (var i = 0; i < items.length; i++) {
						//RegionOfFPO.options[RegionOfFPO.options.length] = new Option(items[i].cr6fc_name, items[i].cr6fc_regionmasterid); comm 9 17 24
						RegionOfFPO.options[RegionOfFPO.options.length] = new Option(items[i].cr6fc_name, items[i].cr6fc_regionmasterid);
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
var LoggFPOState;
function BindFPOState() {
	//var requestUri = location.origin + "/_api/cr6fc_statemasters?$select=cr6fc_name,cr6fc_statemasterid"; comm 9 17 24
	var requestUri = location.origin + "/_api/cr6fc__statemasters?$select=cr6fc_name,cr6fc_statemasterid";
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
			LoggFPOState = data.value;
			LoggFPOState.splice(2, 1);
			try {
				if (LoggFPOState.length > 0) {
					var FPOState = document.getElementById("FPOState");
					FPOState.options.length = 0;
					FPOState.options[FPOState.options.length] = new Option("Select", "0");
					for (var i = 0; i < LoggFPOState.length; i++) {
						//FPOState.options[FPOState.options.length] = new Option(LoggFPOState[i].cr6fc_name, LoggFPOState[i].cr6fc_statemasterid); comm on 9 17 24
						FPOState.options[FPOState.options.length] = new Option(LoggFPOState[i].cr6fc_name, LoggFPOState[i].cr6fc_statemasterid);
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


//BusinessFPOState
function BindBusinessFPOState() {
	//var requestUri = location.origin + "/_api/cr6fc_statemasters?$select=cr6fc_statemasterid,cr6fc_name"; comm on 9 17 24
	var requestUri = location.origin + "/_api/cr6fc_statemasters?$select=cr6fc_statemasterid,cr6fc_name";
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
			Logg.splice(2, 1);
			try {
				if (Logg.length > 0) {
					var BusinessFPOState = document.getElementById("BusinessFPOState");
					BusinessFPOState.options.length = 0;
					BusinessFPOState.options[BusinessFPOState.options.length] = new Option("Select", "0");
					for (var i = 0; i < Logg.length; i++) {
						//BusinessFPOState.options[BusinessFPOState.options.length] = new Option(Logg[i].cr6fc_name, Logg[i].cr6fc_statemasterid); comm 9 17 24
						BusinessFPOState.options[BusinessFPOState.options.length] = new Option(Logg[i].cr6fc_name, Logg[i].cr6fc_statemasterid)
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

var vtitle;
function bindCGApplicationData(vItemID) {
	//var requestUri = location.origin + "/_api/cr6fc_cgapplicationses?$top=5000&$select=*&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=(cr6fc_cgapplicationsid eq " + vItemID + ")"; comm 9 17 24
	// var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CGApplications')//items?$top=5000&$select=*,FPOActivities111/FPOActivity,RegionOfFPO/ID,FPOState/ID,BusinessFPOState/Id,Title&$expand=RegionOfFPO,FPOActivities111,FPOState,BusinessFPOState&$filter=(ID eq '" + vItemID + "')";
	var requestUri = location.origin + "/_api/cr6fc_cgaplications?$top=5000&$select=*&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=(cr6fc_cgaplicationid eq " + vItemID + ")";
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
			//vtitle = Logg[0].cr6fc_name; comm on 9 17 24
			vtitle = Logg[0].cr6fc_name;
			try {
				if (Logg.length > 0) {
					//document.getElementById("txtApplicantID").value = Logg[0].cr6fc_name; comm on 9 1724
					document.getElementById("txtApplicantID").value = Logg[0].cr6fc_name;
					// document.getElementById("txtApplicantName").value=Logg[0].ApplicantName;
					//document.getElementById("txtNameOfFPO").value = Logg[0].cr6fc_nameoffpo; comm o 9 17 24
					document.getElementById("txtNameOfFPO").value = Logg[0].cr6fc_nameoffpo;
					// $("#txtNameOfFPO").text(Logg[0].NameOfFPO);
					//document.getElementById("ConstitutionFPO").value = Logg[0].cr6fc_constitutionfpo; comm 9 17 24
					document.getElementById("ConstitutionFPO").value = Logg[0].cr6fc_constitutionfpo;
					//document.getElementById("FPOActs").value = Logg[0].cr6fc_fpoacts; comm 9 17 24
					document.getElementById("FPOActs").value = Logg[0].cr6fc_fpoacts;
					//document.getElementById("hdnStatus").value = Logg[0]['cr6fc_status@OData.Community.Display.V1.FormattedValue']; comm 9 17 24
					document.getElementById("hdnStatus").value = Logg[0]['cr6fc_status@OData.Community.Display.V1.FormattedValue'];
					//document.getElementById("hdnELIMaker").value = Logg[0].cr6fc_elimakerremark; comm 9 17 24
					document.getElementById("hdnELIMaker").value = Logg[0].cr6fc_elimakerremark;
					//document.getElementById("DateOfRegistration").value=Logg[0].DateOfRegistration;
					/*if (Logg[0].cr6fc_dateofregistration != null && Logg[0].cr6fc_dateofregistration != undefined && Logg[0].cr6fc_dateofregistration != '') {
						document.getElementById("DateOfRegistration").value = Logg[0].cr6fc_dateofregistration.substring(0, Logg[0].cr6fc_dateofregistration.indexOf("T"));;
						// document.getElementById("DateOfRegistration").value = String.format("{0:yyyy-MM-dd}", new Date(Logg[0].cr6fc_dateofregistration));
					} comm on 9 17 24*/
					if(Logg[0].cr6fc_dateofregistration != null && Logg[i].cr6fc_dateofregistration != undefined && Logg[i].cr6fc_dateofregistration != ''){
						document.getElementById("DateOfRegistration").value = Logg[0].cr6fc_dateofregistration.substring(0, Logg[0].cr6fc_dateofregistration.indexOf("T"));;
					}
					//document.getElementById("PlaceOfRegistration").value = Logg[0].cr6fc_placeofregistration; comm on 9 17 24
					document.getElementById("PlaceOfRegistration").value = Logg[0].cr6fc_placeofregistration;
					//document.getElementById("RegistrationNo").value=Logg[0].RegistrationNo;
					//$("#RegistrationNo").val(Logg[0].cr6fc_registrationno); comm 9 17 24
					$("#RegistrationNo").val(Logg[0].cr6fc_registrationno);
					//document.getElementById("PANFPO").value = Logg[0].cr6fc_panfpo; comm 9 17 24
					document.getElementById("PANFPO").value = Logg[0].cr6fc_panfpo;
					//document.getElementById("TANTINFPO").value = Logg[0].cr6fc_tantinfpo; comm 9 17 24
					document.getElementById("TANTINFPO").value = Logg[0].cr6fc_tantinfpo;
					//document.getElementById("GSTINFPO").value = Logg[0].cr6fc_gstinfpo; comm 9 17 24
					document.getElementById("GSTINFPO").value = Logg[0].cr6fc_gstinfpo;
					//document.getElementById("FPOActivities").innerHTML=Logg[0]['cr6fc_fpoactivities111@OData.Community.Display.V1.FormattedValue'];
					//document.getElementById("FPOActivities").innerHTML=Logg[0]['cr6fc_fpoactivities111@OData.Community.Display.V1.FormattedValue'];
					//  $('#FPOActivities').val(Logg[0].cr6fc_fpoactivities111);
					//var FPOActivities = Logg[0].cr6fc_fpoactivities111.split(',') comm 9 17 24
					var FPOActivities = Logg[0].cr6fc_fpoactivities111.split(',')

					if (FPOActivities.length > 0) {

						$("#FPOActivities option").each(function () {
							if (FPOActivities.length > 0) {
								for (var i = 0; i < FPOActivities.length; i++) {
									var flag = FPOActivities.includes(this.value);
									if (flag)
										this.selected = true;
								}
							}
						});
					}
					//$('#FPOAgriBusinessActivity').val(Logg[0].cr6fc_fpoagribusinessactivity) comm on 9 17 24
					$('#FPOAgriBusinessActivity').val(Logg[0].cr6fc_fpoagribusinessactivity)
					//document.getElementById("ForwardLinkageFPO").value = Logg[0].cr6fc_forwardlinkagefpo; comm 9 17 24
					document.getElementById("ForwardLinkageFPO").value = Logg[0].cr6fc_forwardlinkagefpo;
					//document.getElementById("BackwardLinkageFPO").value = Logg[0].cr6fc_backwardlinkagefpo; comm 9 17 24
					document.getElementById("BackwardLinkageFPO").value = Logg[0].cr6fc_backwardlinkagefpo;
					/*document.getElementById("RegionOfFPO").value = Logg[0]._cr6fc_regionoffpo_value;
					if (Logg[0]._cr6fc_regionoffpo_value == "7642dd3f-7900-ef11-9f89-6045bdaea3a2") {
						$("#RegionOfFPO").val('0');
					} com 9 17 24*/ 
					document.getElementById("RegionOfFPO").value = Logg[0]._cr6fc_regionoffpo_value;
					if (Logg[0]._cr6fc_regionoffpo_value == "7642dd3f-7900-ef11-9f89-6045bdaea3a2") {
						$("#RegionOfFPO").val('0');
					}
					/*if (Logg[0]['_cr6fc_regionoffpo_value@OData.Community.Display.V1.FormattedValue'] == "FPO in Plains") {
						$("#Plains").show();
						$("#Northen").hide();
					}
					else {
						$("#Plains").hide();
						$("#Northen").show();
					} com  9 17 24*/
					if (Logg[0]['_cr6fc_regionoffpo_value@OData.Community.Display.V1.FormattedValue'] == "FPO in Plains") {
						$("#Plains").show();
						$("#Northen").hide();
					}
					else {
						$("#Plains").hide();
						$("#Northen").show();
					}
					//document.getElementById("TotalFPOMember").value = Logg[0].cr6fc_totalfpomember; com 9 17 24
					document.getElementById("TotalFPOMember").value = Logg[0].cr6fc_totalfpomember;
					//document.getElementById("TotalMemberNorthen").value = Logg[0].cr6fc_totalmembernorthen; com 9 17 24
					document.getElementById("TotalMemberNorthen").value = Logg[0].cr6fc_totalmembernorthen;
					//$("#NoOfLandlessFarmer").val(Logg[0].cr6fc_nooflandlessfarmer); comm 9 17 24
					$("#NoOfLandlessFarmer").val(Logg[0].cr6fc_nooflandlessfarmer);
					//  $("#NoofSmallFarmer").val(Logg[0].NoOfSmallFarmer);
					//document.getElementById("NoOfSmallFarmer").value = Logg[0].cr6fc_noofsmallfarmer; com 9 17 24
					document.getElementById("NoOfSmallFarmer").value = Logg[0].cr6fc_noofsmallfarmer;
					//$("#NoOfMarginalFarmer").val(Logg[0].cr6fc_noofmarginalfarmer); comm 9 17 24
					$("#NoOfMarginalFarmer").val(Logg[0].cr6fc_noofmarginalfarmer);
					//$("#NoOfBigFarmer").val(Logg[0].cr6fc_noofbigfarmer); comm 9 17 24
					$("#NoOfBigFarmer").val(Logg[0].cr6fc_noofbigfarmer);
					//$("#FarmerMemberSize").val(Logg[0].cr6fc_farmermembersize); comm 9 17 24
					$("#FarmerMemberSize").val(Logg[0].cr6fc_farmermembersize);
					//document.getElementById("NoOfWomenFarmer").value = Logg[0].cr6fc_noofwomenfarmer; com  9 17 24
					document.getElementById("NoOfWomenFarmer").value = Logg[0].cr6fc_noofwomenfarmer;
					//$("#NoOfSCFarmer").val(Logg[0].cr6fc_noofscfarmer); comm 9 17 24
					$("#NoOfSCFarmer").val(Logg[0].cr6fc_noofscfarmer);
					//$("#NoOfSTFarmer").val(Logg[0].cr6fc_noofstfarmer); comm 9 17 24
					$("#NoOfSTFarmer").val(Logg[0].cr6fc_noofstfarmer);
					//document.getElementById("FPODistrict").value = Logg[0].cr6fc_fpodistrict; comm 9 17 24
					document.getElementById("FPODistrict").value = Logg[0].cr6fc_fpodistrict;
					//document.getElementById("ExistingRegisteredOfficeAddress").value = Logg[0].cr6fc_existingregisteredofficeaddress; comm 9 17 24
					document.getElementById("ExistingRegisteredOfficeAddress").value = Logg[0].cr6fc_existingregisteredofficeaddress;
					//document.getElementById("FPOCity").value = Logg[0].cr6fc_fpocity; comm 9 17 24
					document.getElementById("FPOCity").value = Logg[0].cr6fc_fpocity;
					/*document.getElementById("FPOState").value = Logg[0]._cr6fc_fpostate_value;
					if (Logg[0]._cr6fc_fpostate_value == "3db5e9b6-8300-ef11-9f89-6045bde85ebe") {
						$("#FPOState").val("0");
					} comm 9 17 24*/
					document.getElementById("FPOState").value = Logg[0]._cr6fc_fpostate_value;
					if (Logg[0]._cr6fc_fpostate_value == "3db5e9b6-8300-ef11-9f89-6045bde85ebe") {
						$("#FPOState").val("0");
					}
					// $("#FPOState").val(Logg[0].FPOStateId);
					//document.getElementById("FPOPincode").value = Logg[0].cr6fc_fpopincode; comm 9 17 24
					document.getElementById("FPOPincode").value = Logg[0].cr6fc_fpopincode;
					//document.getElementById("GeoLatituteLocation").value = Logg[0].cr6fc_geolatitutelocation; comm 9 17 24
					document.getElementById("GeoLatituteLocation").value = Logg[0].cr6fc_geolatitutelocation;
					//document.getElementById("GeoLongituteLocation").value = Logg[0].cr6fc_geolongitutelocation; comm 9 17 24
					document.getElementById("GeoLongituteLocation").value = Logg[0].cr6fc_geolongitutelocation;
					/*document.getElementById("BusinessAddress").value = Logg[0].cr6fc_businessaddresssameregiaddress;
					if (Logg[0]['cr6fc_businessaddresssameregiaddress@OData.Community.Display.V1.FormattedValue'] == "Yes") {
						$("#otherdetilfpo").hide();
						$("#busineefpoadd").hide();
						$("#busineefpostate").hide();
					}
					else {
						$("#otherdetilfpo").show();
						$("#busineefpoadd").show();
						$("#busineefpostate").show();
					} comm 9 17 24*/
					document.getElementById("BusinessAddress").value = Logg[0].cr6fc_businessaddresssameregiaddress;
					if (Logg[0]['cr6fc_businessaddresssameregiaddress@OData.Community.Display.V1.FormattedValue'] == "Yes") {
						$("#otherdetilfpo").hide();
						$("#busineefpoadd").hide();
						$("#busineefpostate").hide();
					}
					else {
						$("#otherdetilfpo").show();
						$("#busineefpoadd").show();
						$("#busineefpostate").show();
					}
					/*document.getElementById("BusinessFPOcity").value = Logg[0].cr6fc_businessfpocity;
					document.getElementById("BusinessFPODistrict").value = Logg[0].cr6fc_businessfpodistrict;
					document.getElementById("BusinessAddressFPO").value = Logg[0].cr6fc_businessaddressfpo; comm on 9 17 24*/
					document.getElementById("BusinessFPOcity").value = Logg[0].cr6fc_businessfpocity;
					document.getElementById("BusinessFPODistrict").value = Logg[0].cr6fc_businessfpodistrict;
					document.getElementById("BusinessAddressFPO").value = Logg[0].cr6fc_businessaddressfpo;
					/*document.getElementById("BusinessFPOState").value = Logg[0]._cr6fc_businessfpostate_value;
					if (Logg[0]._cr6fc_businessfpostate_value == "3db5e9b6-8300-ef11-9f89-6045bde85ebe") {
						$("#BusinessFPOState").val("0");

					}*/
					document.getElementById("BusinessFPOState").value = Logg[0]._cr6fc_businessfpostate_value;
					if (Logg[0]._cr6fc_businessfpostate_value == "3db5e9b6-8300-ef11-9f89-6045bde85ebe") {
						$("#BusinessFPOState").val("0");

					}
					//$("#BusinessFPOState").val(Logg[0].BusinessFPOStateId);
					/*document.getElementById("FarmerMemberSize").value = Logg[0].cr6fc_farmermembersize;
					document.getElementById("BusinessFPOPincode").value = Logg[0].cr6fc_businessfpopincode;
					document.getElementById("GeoLatituteLocationFPO").value = Logg[0].cr6fc_geolatitutelocationfpo;
					document.getElementById("GeoLongituteLocationFPO").value = Logg[0].cr6fc_geolongitutelocationfpo;
					document.getElementById("NewFPO").value = Logg[0].cr6fc_newfpo; comm 9 17 24*/
					document.getElementById("FarmerMemberSize").value = Logg[0].cr6fc_farmermembersize;
					document.getElementById("BusinessFPOPincode").value = Logg[0].cr6fc_businessfpopincode;
					document.getElementById("GeoLatituteLocationFPO").value = Logg[0].cr6fc_geolatitutelocationfpo;
					document.getElementById("GeoLongituteLocationFPO").value = Logg[0].cr6fc_geolongitutelocationfpo;
					document.getElementById("NewFPO").value = Logg[0].cr6fc_newfpo;
					/*document.getElementById("FPOAvailedGOIScheme").value = Logg[0].cr6fc_fpoavailedgoischeme;
					if (Logg[0].cr6fc_fpoavailedgoischeme == "1") {
						$("#creditfacility").show();
						$("#crodetails").hide();
					}
					else {
						$("#creditfacility").hide();
						$("#crodetails").hide();
					} comm 9 17 24*/
					document.getElementById("FPOAvailedGOIScheme").value = Logg[0].cr6fc_fpoavailedgoischeme;
					if (Logg[0].cr6fc_fpoavailedgoischeme == "1") {
						$("#creditfacility").show();
						$("#crodetails").hide();
					}
					else {
						$("#creditfacility").hide();
						$("#crodetails").hide();
					}
					/*document.getElementById("CGPAN").value = Logg[0].cr6fc_cgpan;
					document.getElementById("TotalSanctionedAmount").value = Logg[0].cr6fc_totalsanctionedamount;
					document.getElementById("TypeOfCreditFacility").value = Logg[0].cr6fc_typeofcreditfacility; comm on 9 17 24*/
					document.getElementById("CGPAN").value = Logg[0].cr6fc_cgpan;
					document.getElementById("TotalSanctionedAmount").value = Logg[0].cr6fc_totalsanctionedamount;
					document.getElementById("TypeOfCreditFacility").value = Logg[0].cr6fc_typeofcreditfacility;
					/*if (Logg[0].cr6fc_validitycreditguarantee != null && Logg[0].cr6fc_validitycreditguarantee != undefined && Logg[0].cr6fc_validitycreditguarantee != '') {

						document.getElementById("ValidityCreditGuarantee").value = Logg[0].cr6fc_validitycreditguarantee.substring(0, Logg[0].cr6fc_validitycreditguarantee.indexOf("T"));;
					}
					document.getElementById("NameOfCEO").value = Logg[0].cr6fc_nameofceo;
					document.getElementById("ContactCEO").value = Logg[0].cr6fc_contactceo;
					document.getElementById("MobileCEO").value = Logg[0].cr6fc_mobileceo;
					document.getElementById("EmailIDCEO").value = Logg[0].cr6fc_emailidceo;
					document.getElementById("CustomerID").value = Logg[0].cr6fc_customerid;
					document.getElementById("LendingAssesmentTool").value = Logg[0].cr6fc_lendingassesmenttool; com 9 17 24*/
					if (Logg[0].cr6fc_validitycreditguarantee != null && Logg[0].cr6fc_validitycreditguarantee != undefined && Logg[0].cr6fc_validitycreditguarantee != '') {

						document.getElementById("ValidityCreditGuarantee").value = Logg[0].cr6fc_validitycreditguarantee.substring(0, Logg[0].cr6fc_validitycreditguarantee.indexOf("T"));;
					}
					document.getElementById("NameOfCEO").value = Logg[0].cr6fc_nameofceo;
					document.getElementById("ContactCEO").value = Logg[0].cr6fc_contactceo;
					document.getElementById("MobileCEO").value = Logg[0].cr6fc_mobileceo;
					document.getElementById("EmailIDCEO").value = Logg[0].cr6fc_emailidceo;
					document.getElementById("CustomerID").value = Logg[0].cr6fc_customerid;
					document.getElementById("LendingAssesmentTool").value = Logg[0].cr6fc_lendingassesmenttool;
					document.getElementById("TypeOfFacility").value = Logg[0].cr6fc_typeoffacility;

					if (Logg[0].cr6fc_typeoffacility == "1") {
						$("#termloandet").show();
						$("#LoanorWTCL").show();
						$("#wcclimitdetail").hide();
						$("#WCCCLimit").hide();
						document.getElementById("AccountNo").value = Logg[0].cr6fc_accountno;
						$("#SanctionedAmount").val(Logg[0].cr6fc_sanctionedamount);
						var SanctionedAmount;
						if (Logg[0].cr6fc_sanctionedamount == '' || Logg[0].cr6fc_sanctionedamount == null) {
							SanctionedAmount = "0";
						}
						else {
							SanctionedAmount = Logg[0].cr6fc_sanctionedamount;
						}
						$('#SanctionedAmount').text(Math.ceil(SanctionedAmount));
						var Word = convertNumberToWords(Math.ceil(SanctionedAmount));
						console.log(Word);
						$('#SanctionedAmountinwords').text("Rupees " + " " + Word + " " + "Only");
						$('#SanctionedAmountinwords').val("Rupees " + " " + Word + " " + "Only");



						if (Logg[0].cr6fc_dateofsanction != null && Logg[0].cr6fc_dateofsanction != undefined && Logg[0].cr6fc_dateofsanction != '') {

							document.getElementById("DateOfSanction").value = Logg[0].cr6fc_dateofsanction.substring(0, Logg[0].cr6fc_dateofsanction.indexOf("T"));;

						}

						if (Logg[0].cr6fc_enddateofinterestmoratium != null && Logg[0].cr6fc_enddateofinterestmoratium != undefined && Logg[0].cr6fc_enddateofinterestmoratium != '') {

							document.getElementById("EndDateOfInterestMoratium").value = Logg[0].cr6fc_enddateofinterestmoratium.substring(0, Logg[0].cr6fc_enddateofinterestmoratium.indexOf("T"));;

						}

						if (Logg[0].cr6fc_enddateofprinciplemoratium != null && Logg[0].cr6fc_enddateofprinciplemoratium != undefined && Logg[0].cr6fc_enddateofprinciplemoratium != '') {

							document.getElementById("EndDateOfPrincipleMoratium").value = Logg[0].cr6fc_enddateofprinciplemoratium.substring(0, Logg[0].cr6fc_enddateofprinciplemoratium.indexOf("T"));;

						}

						if (Logg[0].cr6fc_duedateoflastinstallment != null && Logg[0].cr6fc_duedateoflastinstallment != undefined && Logg[0].cr6fc_duedateoflastinstallment != '') {

							document.getElementById("DueDateOfLastInstallment").value = Logg[0].cr6fc_duedateoflastinstallment.substring(0, Logg[0].cr6fc_duedateoflastinstallment.indexOf("T"));;

						}
						document.getElementById("InterestRate").value = Logg[0].cr6fc_interestrate;
						document.getElementById("CreditFacilityFundAgriInfra").value = Logg[0].cr6fc_creditfacilityfundagriinfra;
						document.getElementById("LoanFullyDisbured").value = Logg[0].cr6fc_loanfullydisbured;

						$("#OutstandingAmountOnDate").val(Logg[0].cr6fc_outstandingamountondate);
						var OutstandingAmountOnDate;
						if (Logg[0].cr6fc_outstandingamountondate == '' || Logg[0].cr6fc_outstandingamountondate == null) {
							OutstandingAmountOnDate = "0";
						}
						else {
							OutstandingAmountOnDate = Logg[0].cr6fc_outstandingamountondate;
						}
						$('#OutstandingAmountOnDate').text(Math.ceil(OutstandingAmountOnDate));
						var Word = convertNumberToWords(Math.ceil(OutstandingAmountOnDate));
						console.log(Word);
						$('#SanctionedAmountinwords1').text("Rupees " + " " + Word + " " + "Only");
						$('#SanctionedAmountinwords1').val("Rupees " + " " + Word + " " + "Only");
						//end
						$("#MeansOfFinanaceTermLoan").val(Logg[0].cr6fc_meansoffinanacetermloan);
						document.getElementById("PromoterEquityMargin").value = Logg[0].cr6fc_promoterequitymargin;
						// $("#UNsecuredLoan").text(results[0].UNsecuredLoan);
						document.getElementById("UNsecuredLoan").value = Logg[0].cr6fc_unsecuredloan;
						document.getElementById("AnyOtherSource").value = Logg[0].cr6fc_anyothersources;
						//document.getElementById("totalAmountvalue").value=Logg[0].TotalAmount;
						$('#totalAmountvalue').text(Logg[0].cr6fc_totalamount);

					}

					else if (Logg[0].cr6fc_typeoffacility == "2") {
						$("#wcclimitdetail").show();
						$("#WCCCLimit").show();
						$("#termloandet").hide();
						$("#LoanorWTCL").hide();
						document.getElementById("AccountNoLimitDetail").value = Logg[0].cr6fc_accountno;
						document.getElementById("SanctionedAmountWCDetail").value = Logg[0].cr6fc_sanctionedamount;
						var SanctionedAmountWCDetail;
						if (Logg[0].cr6fc_sanctionedamount == '' || Logg[0].cr6fc_sanctionedamount == null) {
							SanctionedAmountWCDetail = "0";
						}
						else {
							SanctionedAmountWCDetail = Logg[0].cr6fc_sanctionedamount;
						}
						$('#SanctionedAmountWCDetail').text(Math.ceil(SanctionedAmountWCDetail));
						var Word = convertNumberToWords(Math.ceil(SanctionedAmountWCDetail));
						console.log(Word);
						$('#SanctionedAmountWCDetailinwords').text("Rupees " + " " + Word + " " + "Only");
						$('#SanctionedAmountWCDetailinwords').val("Rupees " + " " + Word + " " + "Only");
						if (Logg[0].cr6fc_dateofsanction != null && Logg[0].cr6fc_dateofsanction != undefined && Logg[0].cr6fc_dateofsanction != '') {

							document.getElementById("SanctionedDate").value = Logg[0].cr6fc_dateofsanction.substring(0, Logg[0].cr6fc_dateofsanction.indexOf("T"));;
						}
						document.getElementById("DrawingPower").value = Logg[0].cr6fc_drawingpower;
						if (Logg[0].cr6fc_enddateofmoratium != null && Logg[0].cr6fc_enddateofmoratium != undefined && Logg[0].cr6fc_enddateofmoratium != '') {

							document.getElementById("EndDateOfMoratium").value = Logg[0].cr6fc_enddateofmoratium.substring(0, Logg[0].cr6fc_enddateofmoratium.indexOf("T"));;
						}
						if (Logg[0].cr6fc_validityenddate != null && Logg[0].cr6fc_validityenddate != undefined && Logg[0].cr6fc_validityenddate != '') {

							document.getElementById("ValidityEndDate").value = Logg[0].cr6fc_validityenddate.substring(0, Logg[0].cr6fc_validityenddate.indexOf("T"));;
						}
						document.getElementById("InterestRateDetail").value = Logg[0].cr6fc_interestrate;
						document.getElementById("FullyLoanDisbursed").value = Logg[0].cr6fc_loanfullydisbured;
						if (Logg[0].cr6fc_outstandingamountondate != null && Logg[0].cr6fc_outstandingamountondate != undefined) {
							document.getElementById("CCOutstandingAmountOnDate").value = Logg[0].cr6fc_outstandingamountondate;
						}

						$("#MeansOfFinanaceTermLoan1").val(Logg[0].cr6fc_meansoffinanacetermloan);
						document.getElementById("PromoterEquityMargin1").value = Logg[0].cr6fc_promoterequitymargin;
						document.getElementById("UNsecuredLoan1").value = Logg[0].cr6fc_unsecuredloan;
						document.getElementById("AnyOtherSource1").value = Logg[0].cr6fc_anyothersources;
						$('#totalAmountvalue1').text(Logg[0].cr6fc_totalamount);


					}

					var PurposeOftheCreditFacility = Logg[0].cr6fc_purposeofcreditfacility.split(',')

					if (PurposeOftheCreditFacility.length > 0) {

						$("#PurposeOftheCreditFacility option").each(function () {
							if (PurposeOftheCreditFacility.length > 0) {
								for (var i = 0; i < PurposeOftheCreditFacility.length; i++) {
									var flag = PurposeOftheCreditFacility.includes(this.value);
									if (flag)
										this.selected = true;
								}
							}
						});
					}
					$("#CreditFacilityUtilised").val(Logg[0].cr6fc_creditfacilityutilised)


					if (Logg[0].cr6fc_projectcostinput != null && Logg[0].cr6fc_projectcostinput != undefined) {

						document.getElementById("ProjectCostInput").value = Logg[0].cr6fc_projectcostinput;
					}
					document.getElementById("ProjectCostMarketing").value = Logg[0].cr6fc_projectcostmarketing;
					document.getElementById("ProjectCostProcessing").value = Logg[0].cr6fc_projectcostprocessing;
					document.getElementById("ProjectCostOther").value = Logg[0].cr6fc_projectcostother;
					document.getElementById("ProjectCostTotal").value = Logg[0].cr6fc_projectcosttotal;

					document.getElementById("TypeOfSecurity").value = Logg[0].cr6fc_typeofsecurity;
					document.getElementById("NatureOfSecurity").value = Logg[0].cr6fc_natureofsecurity;
					document.getElementById("ValueOfSecurity").value = Logg[0].cr6fc_valueofsecurity;

					document.getElementById("NameOfLendingInstitution").value = Logg[0].cr6fc_nameoflendinginstitution;

					document.getElementById("existingCF").value = Logg[0].cr6fc_existingcf;
					document.getElementById("CollateralSecurity").value = Logg[0].cr6fc_collateralsecurity;

					if (Logg[0].cr6fc_elimakerremark != null && Logg[0].cr6fc_elimakerremark != undefined && Logg[0].cr6fc_elimakerremark != '') {
						$('#divMakerHide').show();
						document.getElementById("divELIMakerRemark").innerHTML = Logg[0].cr6fc_elimakerremark;
					}

					if (Logg[0].cr6fc_elicheckerremark != null && Logg[0].cr6fc_elicheckerremark != undefined && Logg[0].cr6fc_elicheckerremark != '') {
						$('#divCheckerHide').show();
						document.getElementById("divELICheckerRemark").innerHTML = Logg[0].cr6fc_elicheckerremark;
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
function calFarmerMember() {
	var NoOfLandlessFarmer = $('#NoOfLandlessFarmer').val();
	var NoOfSmallFarmer = $('#NoOfSmallFarmer').val();
	var NoOfBigFarmer = $('#NoOfBigFarmer').val();
	var NoOfMarginalFarmer = $('#NoOfMarginalFarmer').val();
	if (NoOfLandlessFarmer == 0 || NoOfLandlessFarmer == '') {
		NoOfLandlessFarmer = 0;
	}

	if (NoOfSmallFarmer == 0 || NoOfSmallFarmer == '') {
		NoOfSmallFarmer = 0;
	}

	if (NoOfBigFarmer == 0 || NoOfBigFarmer == '') {
		NoOfBigFarmer = 0;
	}

	if (NoOfMarginalFarmer == 0 || NoOfMarginalFarmer == '') {
		NoOfMarginalFarmer = 0;
	}
	var TotalFarmer = parseInt(NoOfLandlessFarmer) + parseInt(NoOfSmallFarmer) + parseInt(NoOfBigFarmer) + parseInt(NoOfMarginalFarmer);
	$('#FarmerMemberSize').text(TotalFarmer);
	$('#FarmerMemberSize').val(TotalFarmer);

}


function TotalFinancialOutlay() {
	var ProjectCostInput = $('#ProjectCostInput').val();
	var ProjectCostMarketing = $('#ProjectCostMarketing').val();
	var ProjectCostProcessing = $('#ProjectCostProcessing').val();
	var ProjectCostOther = $('#ProjectCostOther').val();
	if (ProjectCostInput == 0 || ProjectCostInput == '') {
		ProjectCostInput = 0;
	}

	if (ProjectCostMarketing == 0 || ProjectCostMarketing == '') {
		ProjectCostMarketing = 0;
	}

	if (ProjectCostProcessing == 0 || ProjectCostProcessing == '') {
		ProjectCostProcessing = 0;
	}

	if (ProjectCostOther == 0 || ProjectCostOther == '') {
		ProjectCostOther = 0;
	}
	var TotalFinancialOutlay = parseInt(ProjectCostInput) + parseInt(ProjectCostMarketing) + parseInt(ProjectCostProcessing) + parseInt(ProjectCostOther);
	$('#ProjectCostTotal').text(TotalFinancialOutlay);
	$('#ProjectCostTotal').val(TotalFinancialOutlay);

}


function Totalamount() {
	var MeansOfFinanaceTermLoan = $('#MeansOfFinanaceTermLoan').val();
	var PromoterEquityMargin = $('#PromoterEquityMargin').val();
	var UNsecuredLoan = $('#UNsecuredLoan').val();
	var AnyOtherSource = $('#AnyOtherSource').val();
	if (MeansOfFinanaceTermLoan == 0 || MeansOfFinanaceTermLoan == '') {
		MeansOfFinanaceTermLoan = 0;
	}

	if (PromoterEquityMargin == 0 || PromoterEquityMargin == '') {
		PromoterEquityMargin = 0;
	}

	if (UNsecuredLoan == 0 || UNsecuredLoan == '') {
		UNsecuredLoan = 0;
	}

	if (AnyOtherSource == 0 || AnyOtherSource == '') {
		AnyOtherSource = 0;
	}
	TotalValue = parseInt(MeansOfFinanaceTermLoan) + parseInt(PromoterEquityMargin) + parseInt(UNsecuredLoan) + parseInt(AnyOtherSource);

	$('#totalAmountvalue').text(TotalValue);
	$('#totalAmountvalue').val(TotalValue);

}


function TotalamountWC() {
	var MeansOfFinanaceTermLoan = $('#MeansOfFinanaceTermLoan1').val();
	var PromoterEquityMargin = $('#PromoterEquityMargin1').val();
	var UNsecuredLoan = $('#UNsecuredLoan1').val();
	var AnyOtherSource = $('#AnyOtherSource1').val();
	if (MeansOfFinanaceTermLoan == 0 || MeansOfFinanaceTermLoan == '') {
		MeansOfFinanaceTermLoan = 0;
	}

	if (PromoterEquityMargin == 0 || PromoterEquityMargin == '') {
		PromoterEquityMargin = 0;
	}

	if (UNsecuredLoan == 0 || UNsecuredLoan == '') {
		UNsecuredLoan = 0;
	}

	if (AnyOtherSource == 0 || AnyOtherSource == '') {
		AnyOtherSource = 0;
	}

	TotalValue12 = parseInt(MeansOfFinanaceTermLoan) + parseInt(PromoterEquityMargin) + parseInt(UNsecuredLoan) + parseInt(AnyOtherSource);

	$('#totalAmountvalue1').text(TotalValue12);
	$('#totalAmountvalue1').val(TotalValue12);

}


function calval() {
	var totalcapi = 0;
	var SanctionedAmount = $("#SanctionedAmount").val();
	totalcapi = SanctionedAmount



	$('#MeansOfFinanaceTermLoan').text(totalcapi);
	$('#MeansOfFinanaceTermLoan').val(totalcapi);
	Totalamount();
}
function bindTermLoan() {
	var TypeOfFacility = $("#TypeOfFacility").val();
	var totalcapi = 0;
	var SanctionedAmount = $("#SanctionedAmountWCDetail").val();
	totalcapi = SanctionedAmount



	$('#MeansOfFinanaceTermLoan1').text(totalcapi);
	$('#MeansOfFinanaceTermLoan1').val(totalcapi);
	TotalamountWC();
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

var ELIChecker;
function SubmitData(status) {


	var txtNameOfFPO = $("#txtNameOfFPO").val();
	if (txtNameOfFPO == "" || txtNameOfFPO == undefined) {
		alert('Please Enter Name Of FPO')
		return false;
	}
	var ConstitutionFPO = $("#ConstitutionFPO option:selected").val();
	if ((ConstitutionFPO == 0 || ConstitutionFPO == undefined) && status == "Submitted") {
		alert('Please Enter Constitution')
		return false;
	}
	var FPOActs = $("#FPOActs option:selected").val();
	if ((FPOActs == 0 || FPOActs == undefined) && status == "Submitted") {
		alert('Please Enter Act/s under which the FPO is Registered')
		return false;
	}
	var DateOfRegistration = $("#DateOfRegistration").val();
	if ((DateOfRegistration == "" || DateOfRegistration == undefined) && status == "Submitted") {
		alert('Please Enter Date Of Registration ')
		return false;
	}
	var PlaceOfRegistration = $("#PlaceOfRegistration").val();
	if ((PlaceOfRegistration == "" || PlaceOfRegistration == undefined) && status == "Submitted") {
		alert('Please Enter Place Of Registration')
		return false;
	}
	var RegistrationNo = $("#RegistrationNo").val();
	if ((RegistrationNo == "" || RegistrationNo == undefined) && status == "Submitted") {
		alert('Please Enter Registration No')
		return false;
	}
	var PANFPO = $("#PANFPO").val();
	if (PANFPO == "" || PANFPO == undefined) {
		alert('Please Enter PAN No')
		return false;
	}
	else {
		var regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;

		if (!regex.test(PANFPO)) {
			alert('Please Enter Valid PAN Number')

			return false;
		}

	}
	if (PANFPO.length != 10) {
		alert('Please Enter Valid PAN Number')
		return false;
	}
	var TANTINFPO = $("#TANTINFPO").val();
	if ((TANTINFPO != "" && TANTINFPO != null && TANTINFPO != undefined) && status == "Submitted") {
		var regex1 = /[A-Z]{4}[0-9]{5}[A-Z]{1}/;

		if (!regex1.test(TANTINFPO)) {
			alert('Please Enter Valid TAN/TIN Number')
			return false;
		}
		if (TANTINFPO.length != 10) {
			alert('Please Enter Valid TAN/TIN Number')
			return false;
		}
	}
	var GSTINFPO = $("#GSTINFPO").val();
	if ((GSTINFPO != "" && GSTINFPO != null) && status == "Submitted") {
		if (GSTINFPO.length != 15) {
			alert('Please Enter Valid GSTIN Number')
			return false;
		}
	}
	var objFPOActivity = {};
	objFPOActivity.results = [];
	var FPOActivities = $("#FPOActivities").val();
	if ((FPOActivities == "Select" || FPOActivities == undefined || FPOActivities == "0") && status == "Submitted") {
		alert('Please Enter Business of FPO/Present Status of FPO Activities')
		return false;
	}
	else if (FPOActivities == "Select" || FPOActivities == undefined || FPOActivities == "0") { FPOActivities = "0" }

	var FPOAgriBusinessActivity = $("#FPOAgriBusinessActivity option:selected").val();
	if ((FPOAgriBusinessActivity == 0 || FPOAgriBusinessActivity == undefined) && status == "Submitted") {
		alert('Please Enter Is FPO wholly /largely connected with Agri Business Activities')
		return false;

	}
	var BackwardLinkageFPO = $("#BackwardLinkageFPO").val();
	if ((BackwardLinkageFPO == "" || BackwardLinkageFPO == undefined) && status == "Submitted") {
		alert('Please Enter Brief Details of Backward Linkages Developed by FPO')
		return false;
	}

	var ExistingRegisteredOfficeAddress = $("#ExistingRegisteredOfficeAddress").val();
	if ((ExistingRegisteredOfficeAddress == "" || ExistingRegisteredOfficeAddress == undefined) && status == "Submitted") {
		alert('Please Enter Existing Registered and Office Address')
		return false;
	}
	var FPOCity = $("#FPOCity").val();
	if ((FPOCity == '' || FPOCity == null || FPOCity == undefined) && status == "Submitted") {
		alert('Please Enter FPO City')
		return false;
	}

	var FPOPincode = $("#FPOPincode").val();
	if ((FPOPincode == "" || FPOPincode == undefined) && status == "Submitted") {
		alert('Please Enter Pincode')
		return false;
	}
	var FPODistrict = $("#FPODistrict").val();
	if ((FPODistrict == "" || FPODistrict == undefined) && status == "Submitted") {
		alert('Please Enter District')
		return false;
	}


	var FPOState = $("#FPOState ").val();
	if ((FPOState == "Select" || FPOState == "0" || FPOState == undefined) && status == "Submitted") {
		alert('Please Enter State')
		return false;
	}
	else if ((FPOState == "Select" || FPOState == "0" || FPOState == undefined)) { FPOState = "3db5e9b6-8300-ef11-9f89-6045bde85ebe" }

	var BusinessAddress = $("#BusinessAddress option:selected").val();
	if ((BusinessAddress == 0 || BusinessAddress == undefined) && status == "Submitted") {
		alert('Please Enter Business Address of the FPO is same as the Registered Address')
		return false;
	}
	if (BusinessAddress == "2") {
		var BusinessFPOcity = $("#BusinessFPOcity").val();
		if ((BusinessFPOcity == "" || BusinessFPOcity == undefined) && status == "Submitted") {
			alert('Please Enter Business FPO city')
			return false;
		}
		var BusinessFPODistrict = $("#BusinessFPODistrict").val();
		if ((BusinessFPODistrict == "" || BusinessFPODistrict == undefined) && status == "Submitted") {
			alert('Please Enter Business FPO District')
			return false;
		}
		var BusinessAddressFPO = $("#BusinessAddressFPO").val();
		if ((BusinessAddressFPO == "" || BusinessAddressFPO == undefined) && status == "Submitted") {
			alert('Please Enter Business Address FPO')
			return false;
		}
		var BusinessFPOPincode = $("#BusinessFPOPincode").val();
		if ((BusinessFPOPincode == "" || BusinessFPOPincode == undefined) && status == "Submitted") {
			alert('Please Enter Business FPO Pincode')
			return false;
		}
	}
	var BusinessFPOState = $("#BusinessFPOState").val();

	if (BusinessAddress == "2") {
		if ((BusinessFPOState == 0 || BusinessFPOState == undefined) && status == "Submitted") {
			alert('Please Enter State')
			return false;
		}
		else if (BusinessFPOState == "Select" || BusinessFPOState == '0' || BusinessFPOState == undefined) { var BusinessFPOState = "3db5e9b6-8300-ef11-9f89-6045bde85ebe" }
	}
	var ForwardLinkageFPO = $("#ForwardLinkageFPO").val();
	if ((ForwardLinkageFPO == "" || ForwardLinkageFPO == undefined) && status == "Submitted") {
		alert('Please Enter Forward Linkage Developed by FPO ')
		return false;
	}
	var RegionOfFPO = $("#RegionOfFPO").val();
	if ((RegionOfFPO == "Select" || RegionOfFPO == undefined || RegionOfFPO == '0') && status == "Submitted") {
		alert('Please Enter Region Of FPO ')
		return false;
	}
	else if (RegionOfFPO == "Select" || RegionOfFPO == undefined || RegionOfFPO == '0') { RegionOfFPO = "7642dd3f-7900-ef11-9f89-6045bdaea3a2" }
	var TotalFPOMember = $("#TotalFPOMember option:selected").val();
	if (RegionOfFPO == "093da606-21e9-ee11-a203-6045bdac6483") {
		if ((TotalFPOMember == "0" || TotalFPOMember == undefined) && status == "Submitted") {
			alert('Please Enter Total Number of Members of the FPO in Plains')
			return false;
		}
		var FarmerMemberSize = $("#FarmerMemberSize").val();
		if ((TotalFPOMember == "1") && status == "Submitted") {
			if (FarmerMemberSize > 300) {
				alert('Farmer Member Size should be less than 300')
				return false;
			}
		}
		if (TotalFPOMember == "2" && status == "Submitted") {
			if (FarmerMemberSize < 300) {
				alert('Farmer Member Size should not be less than 300')
				return false;
			}
		}

	}
	var TotalMemberNorthen = $("#TotalMemberNorthen").val();
	if (RegionOfFPO == "5ccaef08-21e9-ee11-a203-6045bdaaab4d") {
		if ((TotalMemberNorthen == "0" || TotalMemberNorthen == undefined) && status == "Submitted") {
			alert('Please Enter Total Number of Members of the FPO in North Eastern or Hilly Areas')
			return false;
		}
		var FarmerMemberSize = $("#FarmerMemberSize").val();
		if (TotalMemberNorthen == "1" && status == "Submitted") {
			if (FarmerMemberSize > 100) {
				alert('Farmer Member Size should be less than 100')
				return false;
			}
		}
		if (TotalMemberNorthen == "2" && status == "Submitted") {
			if (FarmerMemberSize < 100) {
				alert('Farmer Member Size should not be less than 100')
				return false;
			}
		}

	}

	var NoOfLandlessFarmer = $("#NoOfLandlessFarmer").val();
	if ((NoOfLandlessFarmer == "" || NoOfLandlessFarmer == undefined) && status == "Submitted") {
		alert('Please Enter No. of Landless Tenant Farmer Members')
		return false;
	}
	var NoofSmallFarmer = $("#NoOfSmallFarmer").val();
	if ((NoofSmallFarmer == "" || NoofSmallFarmer == undefined) && status == "Submitted") {
		alert('Please Enter No. of Small Farmer Members ')
		return false;
	}
	var NoOfMarginalFarmer = $("#NoOfMarginalFarmer").val();
	if ((NoOfMarginalFarmer == "" || NoOfMarginalFarmer == undefined) && status == "Submitted") {
		alert('Please Enter No. of Marginal Farmer Member')
		return false;
	}
	var NoOfBigFarmer = $("#NoOfBigFarmer").val();
	if ((NoOfBigFarmer == "" || NoOfBigFarmer == undefined) && status == "Submitted") {
		alert('Please Enter No. of Big Farmers Member')
		return false;
	}
	var FarmerMemberSize = $("#FarmerMemberSize").val();
	if ((FarmerMemberSize == "" || FarmerMemberSize == undefined) && status == "Submitted") {
		alert('Please Enter Farmer Members size (Shareholder Members No.)')
		return false;
	}
	var NoOfWomenFarmer = $("#NoOfWomenFarmer").val();
	if ((NoOfWomenFarmer == "" || NoOfWomenFarmer == undefined) && status == "Submitted") {
		alert('Please Enter No. of Women Members')
		return false;
	}
	var NoOfSCFarmer = $("#NoOfSCFarmer").val();
	if ((NoOfSCFarmer == "" || NoOfSCFarmer == undefined) && status == "Submitted") {
		alert('Please Enter No. of SC Members')
		return false;
	}
	var NoOfSTFarmer = $("#NoOfSTFarmer").val();
	if ((NoOfSTFarmer == "" || NoOfSTFarmer == undefined) && status == "Submitted") {
		alert('Please Enter No. of ST Members')
		return false;
	}

	if ((parseInt(NoOfWomenFarmer) > parseInt(FarmerMemberSize)) && status == "Submitted") {
		alert('No Of WomenFarmer  should not be more than Total Farmer Member Size')
		return false;
	}
	if ((parseInt(NoOfSCFarmer) > parseInt(FarmerMemberSize)) && status == "Submitted") {
		alert('No Of SC Farmer  should not be more than Total Farmer Member Size')
		return false;
	}
	if ((parseInt(NoOfSTFarmer) > parseInt(FarmerMemberSize)) && status == "Submitted") {
		alert('No Of ST Farmer  should not be more than Total Farmer Member Size')
		return false;
	}
	var SCSTFarmer = parseInt(NoOfSCFarmer) + parseInt(NoOfSTFarmer);
	if ((parseInt(SCSTFarmer) > parseInt(FarmerMemberSize)) && status == "Submitted") {
		alert('Total of SC Members and ST Members cannot exceed Total Farmer Member Size')
		return false;
	}
	var GeoLatituteLocation = $("#GeoLatituteLocation").val();
	var GeoLongituteLocation = $("#GeoLongituteLocation").val();




	var GeoLatituteLocationFPO = $("#GeoLatituteLocationFPO").val();
	var GeoLongituteLocationFPO = $("#GeoLongituteLocationFPO").val();

	/*if(BusinessAddress=="No")
	{
	  var GeoLongituteLocationFPO = $("#GeoLongituteLocationFPO").val();
	  if(GeoLongituteLocationFPO=="" || GeoLongituteLocationFPO==undefined){
	  alert('Please Enter Geo Longitute Location FPO')
	  return false;
	  }
	}*/
	var NewFPO = $("#NewFPO option:selected").val();
	if ((NewFPO == 0 || NewFPO == undefined) && status == "Submitted") {
		alert('Please Enter New/Existing FPO')
		return false;
	}
	var FPOAvailedGOIScheme = $("#FPOAvailedGOIScheme option:selected").val();
	if ((FPOAvailedGOIScheme == "0" || FPOAvailedGOIScheme == undefined) && status == "Submitted") {
		alert('Please Enter Scheme of Government of India')
		return false;
	}
	if (FPOAvailedGOIScheme == "1") {
		var CGPAN = $("#CGPAN").val();
		if ((CGPAN == "" || CGPAN == undefined) && status == "Submitted") {
			alert('Please Enter CGPAN')
			return false;
		}
	}
	var existingCreditFacility = $("#existingCF option:selected").val();

	var TotalSanctionedAmount = $("#TotalSanctionedAmount").val();

	if (FPOAvailedGOIScheme == "1") {
		if ((TotalSanctionedAmount == "" || TotalSanctionedAmount == undefined) && status == "Submitted") {
			alert('Please Enter Total Sanctioned Amount')
			return false;
		}
	}

	if (FPOAvailedGOIScheme == "1") {
		var TypeOfCreditFacility = $("#TypeOfCreditFacility option:selected").val();
		if ((TypeOfCreditFacility == "Select" || TypeOfCreditFacility == undefined) && status == "Submitted") {
			alert('Please Enter Type Of Credit Facility')
			return false;
		}
	}

	if (FPOAvailedGOIScheme == "1") {
		var ValidityCreditGuarantee = $("#ValidityCreditGuarantee").val();
		if ((ValidityCreditGuarantee == "" || ValidityCreditGuarantee == undefined) && status == "Submitted") {
			alert('Please Enter Validity of Credit Facility')
			return false;
		}
	}

	var NameOfCEO = $("#NameOfCEO").val();
	if ((NameOfCEO == "" || NameOfCEO == undefined) && status == "Submitted") {
		alert('Please Enter Name')
		return false;
	}
	var ContactCEO = $("#ContactCEO").val();
	var MobileCEO = $("#MobileCEO").val();
	if ((MobileCEO == "" || MobileCEO == undefined) && status == "Submitted") {
		alert('Please Enter Mobile Number')
		return false;
	}
	if (MobileCEO != undefined && MobileCEO != '') {
		var regex = /^\d*(?:\.\d{1,2})?$/;
		if (!regex.test(MobileCEO)) {
			alert('Please Enter Valid Mobile Number')

			return false;
		}

	}
	if (MobileCEO.length != 10 && status == "Submitted") {
		alert('Please Enter Valid Mobile Number')
		return false;
	}

	var EmailIDCEO = $("#EmailIDCEO").val();
	if ((EmailIDCEO == "" || EmailIDCEO == undefined) && status == "Submitted") {
		alert('Please Enter Email ID')
		return false;
	}
	if (EmailIDCEO != undefined && EmailIDCEO != "") {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (!regex.test(EmailIDCEO)) {
			alert('Please Enter Valid Email ID')

			return false;
		}

	}

	var CustomerID = $("#CustomerID").val();
	if ((CustomerID == "" || CustomerID == undefined) && status == "Submitted") {
		alert('Please Enter Customer ID')
		return false;
	}
	var LendingAssesmentTool = $("#LendingAssesmentTool").val();
	if ((LendingAssesmentTool == "0" || LendingAssesmentTool == undefined) && status == "Submitted") {
		alert('Please Enter Lending Assesment Tool used by the Lending Institution to Determine FPOs Eligibilty for Lending')
		return false;
	}
	var TypeofFacility = $("#TypeOfFacility").val();
	if ((TypeofFacility == "0" || TypeofFacility == undefined) && status == "Submitted") {
		alert('Please Enter Type of Facility')
		return false;
	}
	/*var PurposeOftheCreditFacility = $("#PurposeOftheCreditFacility option:selected").text();
	if(PurposeOftheCreditFacility=="Select" || PurposeOftheCreditFacility==undefined){
	 alert('Please Enter Purpose Of the Credit Facility')
	 return false;
	}*/

	// var objFPOActivitypresentstatus = {};
	// objFPOActivitypresentstatus.results = [];
	var PurposeOftheCreditFacility = $('#PurposeOftheCreditFacility').val();
	if (PurposeOftheCreditFacility == null && status == "Submitted") {
		alert('Please Select Purpose of Credit Facility ');
		return false;
	}
	else if (PurposeOftheCreditFacility == null) { PurposeOftheCreditFacility = '0' }
	/*if (PurposeOftheCreditFacility != null && PurposeOftheCreditFacility != '') {
		for (var d = 0; d < PurposeOftheCreditFacility.length; d++) {

			//var abc = getUserByEmail(filteredDD[0].EMail);
			objFPOActivitypresentstatus.results.push(PurposeOftheCreditFacility[d]);
		}

	}*/


	var creditFacilityUtilised = $("#CreditFacilityUtilised option:selected").val();
	//var PurposeOftheCreditFacility = $("#PurposeOftheCreditFacility option:selected").text();
	if ((creditFacilityUtilised == "0" || creditFacilityUtilised == undefined || creditFacilityUtilised == "") && status == "Submitted") {
		alert('Please Select Credit facility Ulitised')
		return false;
	}
	if (TypeofFacility == "1") {
		var AccountNo = $("#AccountNo").val();
		if ((AccountNo == "" || AccountNo == undefined) && status == "Submitted") {
			alert('Please Enter  Account No')
			return false;
		}
	}

	if (TypeofFacility == "1") {
		var SanctionedAmount = $("#SanctionedAmount").val();
		if ((SanctionedAmount == "" || SanctionedAmount == undefined) && status == "Submitted") {
			alert('Please Enter Sanctioned Amount(Rs)')
			return false;
		}
	}

	if (TypeofFacility == "1") {
		var DateOfSanction = $("#DateOfSanction").val();
		if ((DateOfSanction == "" || DateOfSanction == undefined) && status == "Submitted") {
			alert('Please Enter Date Of Sanction')
			return false;
		}
		else if (DateOfSanction == "" || DateOfSanction == undefined) { DateOfSanction = null }
	}


	var DueDateOfLastInstallment = $("#DueDateOfLastInstallment").val();
	var todayvalue = new Date();


	if (TypeofFacility == "1") {
		if ((DueDateOfLastInstallment != "" && DueDateOfLastInstallment != null && DueDateOfLastInstallment != undefined) && status == "Submitted") {
			if (DueDateOfLastInstallment < DateOfSanction || DueDateOfLastInstallment < todayvalue) {
				alert('Date of Due Installment cannot be greater than Sanction date')
				return false;
			}
		}
	}

	if (TypeofFacility == "1") {
		var InterestRate = $("#InterestRate").val();
		if ((InterestRate == "" || InterestRate == undefined) && status == "Submitted") {
			alert('Please Enter Interest Rate (in%)')
			return false;
		}
	}

	if (TypeofFacility == "1") {
		var CreditFacilityFundAgriInfra = $("#CreditFacilityFundAgriInfra option:selected").val();
		if ((CreditFacilityFundAgriInfra == 0 || CreditFacilityFundAgriInfra == undefined) && status == "Submitted") {
			alert('Please Enter Credit Facility Agriculture Infrastructure Fund')
			return false;
		}
	}

	if (TypeofFacility == "1") {
		var LoanFullyDisbured = $("#LoanFullyDisbured").val();
		if ((LoanFullyDisbured == 0 || LoanFullyDisbured == undefined) && status == "Submitted") {
			alert('Please Enter Loan Fully Disbured')
			return false;
		}

		//if(LoanFullyDisbured=="No"||LoanFullyDisbured=="Yes")
		//{
		var OutstandingAmountOnDate = $("#OutstandingAmountOnDate").val();
		if ((OutstandingAmountOnDate == "" || OutstandingAmountOnDate == undefined) && status == "Submitted") {
			alert('Please Enter Outstanding Amount On Date (Rs.)')
			return false;
		}
		if ((parseInt(SanctionedAmount) < parseInt(OutstandingAmountOnDate)) && status == "Submitted") {
			alert('Outstanding Amount On Date Should not be greater than Sanction Amount')
			return false;

		}

		//}

	}
	if (TypeofFacility == "2") {
		//var AccountNoLimitDetail = $("#AccountNoLimitDetail").val();
		var AccountNo = $("#AccountNoLimitDetail").val();
		if ((AccountNo == "" || AccountNo == undefined) && status == "Submitted") {
			alert('Please Enter Account No')
			return false;
		}
	}

	if (TypeofFacility == "2") {
		//var SanctionedAmountWCDetail = $("#SanctionedAmountWCDetail").val();
		var SanctionedAmount = $("#SanctionedAmountWCDetail").val();
		if ((SanctionedAmount == "" || SanctionedAmount == undefined) && status == "Submitted") {
			alert('Please Enter Sanctioned Amount (Rs.)')
			return false;
		}
	}

	if (TypeofFacility == "2") {
		// var SanctionedDate = $("#SanctionedDate").val();
		var DateOfSanction = $("#SanctionedDate").val();
		if ((DateOfSanction == "" || DateOfSanction == undefined) && status == "Submitted") {
			alert('Please Enter Sanction Date')
			return false;
		}
		//var InterestRateDetail = $("#InterestRateDetail").val();
		var InterestRate = $("#InterestRateDetail").val();

		if ((InterestRate == "" || InterestRate == undefined) && status == "Submitted") {
			alert('Please Enter Interest Rate (%)')
			return false;
		}

		var DrawingPower = $("#DrawingPower").val();

		var EndDateOfMoratium = $("#EndDateOfMoratium").val();

		var ValidityEndDate = $("#ValidityEndDate").val();

		if ((EndDateOfMoratium != "" && EndDateOfMoratium != null && EndDateOfMoratium != undefined) && status == "Submitted") {
			if (EndDateOfMoratium < DateOfSanction) {
				alert('End Date Of Moratium  cannot be greater than Sanction date')
				return false;
			}
		}

		if ((ValidityEndDate != "" && ValidityEndDate != null && ValidityEndDate != undefined) && status == "Submitted") {
			if (ValidityEndDate < DateOfSanction) {
				alert('Validity End Date   cannot be greater than Sanction date')
				return false;
			}
		}


		var FullyLoanDisbursed = $("#FullyLoanDisbursed").val();
		if ((FullyLoanDisbursed == "Select" || FullyLoanDisbursed == undefined) && status == "Submitted") {
			alert('Please Enter Fully Loan Disbursed')
			return false;
		}

		var OutstandingAmountOnDate = $("#CCOutstandingAmountOnDate").val();
		if ((OutstandingAmountOnDate == "" || OutstandingAmountOnDate == undefined) && status == "Submitted") {
			alert('Please Enter CC Outstanding Amount On Date (Rs.)')
			return false;
		}

		/*if(FullyLoanDisbursed == "No")
		{
			//var CCOutstandingAmountOnDate = $("#CCOutstandingAmountOnDate").val();
			var OutstandingAmountOnDate= $("#CCOutstandingAmountOnDate").val();
			if(OutstandingAmountOnDate=="" ||  OutstandingAmountOnDate==undefined){
			 alert('Please Enter CC Outstanding Amount On Date (Rs.)')
			 return false;
			}
			if(parseInt(SanctionedAmount)<parseInt(OutstandingAmountOnDate))
		   {
						alert('Outstanding Amount On Date Should not be greater than Sanction Amount')
				return false;
	
		   }
	
		}*/
	}
	// var TermLoanCreditFacility = $("#TermLoanCreditFacility option:selected").val();
	// if ((TermLoanCreditFacility == "Select" || TermLoanCreditFacility == undefined) && status == "Submitted") {
	// 	alert('Please Enter Term Loan Credit Facility')
	// 	return false;
	// }

	if (TypeofFacility == "1") {
		var MeansOfFinanaceTermLoan = $("#MeansOfFinanaceTermLoan").val();
		if ((MeansOfFinanaceTermLoan == "" || MeansOfFinanaceTermLoan == undefined) && status == "Submitted") {
			alert('Please Enter Term Loan (Rs.)')
			return false;
		}
	}

	if (TypeofFacility == "1") {
		var PromoterEquityMargin = $("#PromoterEquityMargin").val();
		if ((PromoterEquityMargin == "" || PromoterEquityMargin == undefined) && status == "Submitted") {
			alert('Please Enter Promoters Equity/Margin (Rs.)')
			return false;
		}
	}

	if (TypeofFacility == "1") {
		var UNsecuredLoan = $("#UNsecuredLoan").val();
		if ((UNsecuredLoan == "" || UNsecuredLoan == undefined) && status == "Submitted") {
			alert('Please Enter Unsecured Loan (Rs.)')
			return false;
		}
	}

	if (TypeofFacility == "1") {
		var AnyOtherSource = $("#AnyOtherSource").val();
		if ((AnyOtherSource == "" || AnyOtherSource == undefined) && status == "Submitted") {
			alert('Please Enter Any Other Source (Rs.)')
			return false;
		}
	}

	if (TypeofFacility == "2") {

		var MeansOfFinanaceTermLoan = $("#MeansOfFinanaceTermLoan1").val();
		if ((MeansOfFinanaceTermLoan == "" || MeansOfFinanaceTermLoan == undefined) && status == "Submitted") {
			alert('Please Enter Term Loan (Rs.)')
			return false;
		}

		var PromoterEquityMargin = $("#PromoterEquityMargin1").val();
		if ((PromoterEquityMargin == "" || PromoterEquityMargin == undefined) && status == "Submitted") {
			alert('Please Enter Promoters Equity/Margin (Rs.)')
			return false;
		}

		var UNsecuredLoan = $("#UNsecuredLoan1").val();
		if ((UNsecuredLoan == "" || UNsecuredLoan == undefined) && status == "Submitted") {
			alert('Please Enter Unsecured Loan (Rs.)')
			return false;
		}

		var AnyOtherSource = $("#AnyOtherSource1").val();
		if ((AnyOtherSource == "" || AnyOtherSource == undefined) && status == "Submitted") {
			alert('Please Enter Any Other Source (Rs.)')
			return false;
		}

	}


	/*  if(TypeofFacility=="Term Loan OR WCTL (Working Capital Term Loan)")
   {
	var meansOffinanaceTermLoan= $("#meansOfFinanaceTermLoan").val();
	if(MeansOfFinanaceTermLoan=="" ||  MeansOfFinanaceTermLoan==undefined){
	alert('Please Enter Term Loan (Rs.)')
	return false;
	}
   }
	
   if(TypeofFacility=="Term Loan OR WCTL (Working Capital Term Loan)")
   {
	 var promoterequityMargin= $("#promoterEquityMargin").val();
	 if(PromoterEquityMargin=="" ||  PromoterEquityMargin==undefined){
	 alert('Please Enter Promoters Equity/Margin (Rs.)')
	 return false;
	}
  }
  
   if(TypeofFacility=="Term Loan OR WCTL (Working Capital Term Loan)")
   {
	 var unsecuredloan= $("#unsecuredLoan").val();
	 if(UNsecuredLoan=="" ||  UNsecuredLoan==undefined){
	 alert('Please Enter Unsecured Loan (Rs.)')
	 return false;
	}
  }
  
   if(TypeofFacility=="Term Loan OR WCTL (Working Capital Term Loan)")
	{
	 var anyotherSource= $("#anyOtherSource").val();
	 if(AnyOtherSource=="" ||  AnyOtherSource==undefined){
	 alert('Please Enter Any Other Source (Rs.)')
	 return false;
	}
   }*/


	var ProjectCostInput = $("#ProjectCostInput").val();
	if ((ProjectCostInput == "" || ProjectCostInput == undefined) && status == "Submitted") {
		alert('Please Enter Input')
		return false;
	}
	var ProjectCostMarketing = $("#ProjectCostMarketing").val();
	if ((ProjectCostMarketing == "" || ProjectCostMarketing == undefined) && status == "Submitted") {
		alert('Please Enter Marketing')
		return false;
	}

	var ProjectCostProcessing = $("#ProjectCostProcessing").val();
	if ((ProjectCostProcessing == "" || ProjectCostProcessing == undefined) && status == "Submitted") {
		alert('Please Enter Processing')
		return false;
	}

	var ProjectCostOther = $("#ProjectCostOther").val();
	if ((ProjectCostOther == "" || ProjectCostOther == undefined) && status == "Submitted") {
		alert('Please Enter Others')
		return false;
	}
	var ProjectCostTotal = $("#ProjectCostTotal").val();
	if ((ProjectCostTotal == "" || ProjectCostTotal == undefined) && status == "Submitted") {
		alert('Please Enter Total Financial Outlay (Rs.)')
		return false;
	}


	var TotalValue = $("#totalAmountvalue").text();
	if ((TypeofFacility == "1") && status == "Submitted") {

		if (TotalValue != ProjectCostTotal) {
			alert('Project Cost should match Means of Finance')
			return false;
		}
	}

	if (TypeofFacility == "2") {



		var TotalValue = $("#totalAmountvalue1").text();

		//	var ProjectCostTotal = $("#ProjectCostTotal1").val();

		if (TotalValue != ProjectCostTotal && status == "Submitted") {
			alert('Project Cost and Total Cost Should Match')
			return false;
		}
	}



	var TypeOfSecurity = $("#TypeOfSecurity").val();
	if ((TypeOfSecurity == "" || TypeOfSecurity == undefined) && status == "Submitted") {
		alert('Please Enter Type Of Security')
		return false;
	}

	var NatureOfSecurity = $("#NatureOfSecurity option:selected").val();
	if ((NatureOfSecurity == "0" || NatureOfSecurity == undefined) && status == "Submitted") {
		alert('Please Enter Nature Of Security')
		return false;
	}

	var ValueOfSecurity = $("#ValueOfSecurity").val();
	if ((ValueOfSecurity == "" || ValueOfSecurity == undefined) && status == "Submitted") {
		alert('Please Enter Value Of Security')
		return false;
	}
	var CollateralSecurity = $("#CollateralSecurity").val();
	//var creditFacilityUtilised= $("#CreditFacilityUtilised").val();
	//creditFacilityUtilised


	if ((CollateralSecurity == "0" || CollateralSecurity == undefined) && status == "Submitted") {
		alert('Please Enter Collateral Security')
		return false;
	}
	var SubStatus;
	if (status == "Draft") {
		SubStatus = "2";
	}
	else if (status == "Submitted") {
		SubStatus = "1";
	}
	var NameOfLendingInstitution = $("#NameOfLendingInstitution").val();
	if (NameOfLendingInstitution == "" || NameOfLendingInstitution == undefined) {
		alert('Please Enter Name Of Lending Institution')
		return false;
	}

	var ELICheckerEmail = $('#ELICheckerEmail').val();
	var EILchecker;
	if ((ELICheckerEmail != null && ELICheckerEmail != undefined && ELICheckerEmail != '') && status == "Submitted") {
		//EILchecker=checker[0].EILCheckerId;
		EILchecker = GetUserId1(ELICheckerEmail);
	}
	else { EILchecker = GetUserId1(ELICheckerEmail); }
	if (EILchecker == -1) {
		alert('There is no valid EIL Checker against this Lending Institute')
		return false;
	}

	if (EILchecker == 0) {
		alert('There is no EIL Checker against this Lending Institute')
		return false;
	}

	var txtmakerComment = $('#txtmakerComment').val();
	if (hdnStatus == "Sent Back by ELI Checker") {
		if (txtmakerComment == '' || txtmakerComment == undefined || txtmakerComment == null) {
			alert('Please enter the remark')
			return false;
		}
	}
	var hdnELIMaker = document.getElementById("hdnELIMaker").value;

	var txtELIMakerRemark;
	if (txtmakerComment != '' && txtmakerComment != undefined && txtmakerComment != '' && hdnELIMaker != null && hdnELIMaker != undefined && hdnELIMaker != '' && hdnELIMaker != "undefined") {
		txtELIMakerRemark = "<b>Comment</b> :- " + txtmakerComment + " - " + GetCurrentDataToday() + ": " + hdnELIMaker.toString() + "\n\n"
	}
	else {
		txtELIMakerRemark = "<b>Comment </b>:- " + txtmakerComment + " - " + GetCurrentDataToday() + "\n\n"
	}

	/*var checker = $.grep(LoggChecker, function (value) 
	{
		return (value.LendingInstitute == NameOfLendingInstitution);
	});
	var EILchecker;
	if(checker.length>0 && status=="Submitted")
	{
		EILchecker=checker[0].EILCheckerId;
	}
	else
	{
		EILchecker=0;
	}
	if(EILchecker==0 && status=="Submitted")
	{
		alert('There is no EIL Checker against this Lending Institute')
		return false;
	}*/
	if (DateOfRegistration !== '' && DateOfRegistration !== undefined) {
		DateOfRegistration = new Date(DateOfRegistration);
	}
	else {
		DateOfRegistration = null;
	}
	if (ValidityCreditGuarantee !== '' && ValidityCreditGuarantee !== undefined) {
		ValidityCreditGuarantee = new Date(ValidityCreditGuarantee);
	}
	else {
		ValidityCreditGuarantee = null;
	}

	if (EndDateOfInterestMoratium !== '' && EndDateOfInterestMoratium !== undefined) {
		EndDateOfInterestMoratium = new Date(EndDateOfInterestMoratium);
	}
	else {
		EndDateOfInterestMoratium = null;
	}

	if (EndDateOfPrincipleMoratium !== '' && EndDateOfPrincipleMoratium !== undefined) {
		EndDateOfPrincipleMoratium = new Date(EndDateOfPrincipleMoratium);
	}
	else {
		EndDateOfPrincipleMoratium = null;
	}

	if (DueDateOfLastInstallment !== '' && DueDateOfLastInstallment !== undefined) {
		DueDateOfLastInstallment = new Date(DueDateOfLastInstallment);
	}
	else {
		DueDateOfLastInstallment = null;
	}

	if (EndDateOfMoratium !== '' && EndDateOfMoratium !== undefined) {
		EndDateOfMoratium = new Date(EndDateOfMoratium);
	}
	else {
		EndDateOfMoratium = null;
	}

	if (ValidityEndDate !== '' && ValidityEndDate !== undefined) {
		ValidityEndDate = new Date(ValidityEndDate);
	}
	else {
		ValidityEndDate = null;
	}

	var FPORegion = null;
	if (RegionOfFPO !== null && RegionOfFPO !== "0" && RegionOfFPO !== undefined) {
		FPORegion = "/cr6fc_regionmasters(" + RegionOfFPO + ")";
	}

	if (BusinessAddress == "2") {
		var data = JSON.stringify(
			{

				//"Title":vTitle,
				//"cr6fc_ELIChecker_contact@odata.bind": "/contacts(" + EILchecker + ")",
				"cr6fc_ELIChecker_contact@odata.bind":"/contacts(" +  EILchecker + ")",
				//"cr6fc_eilcheckeremailid": ELICheckerEmail,
				"cr6fc_elicheckeremailid": ELICheckerEmail,
				//"ApplicantName":txtApplicantName,
				//"cr6fc_nameoffpo": txtNameOfFPO,
				"cr6fc_nameoffpo":txtNameOfFPO,
				//"cr6fc_constitutionfpo": ConstitutionFPO,
				"cr6fc_constitutionfpo": ConstitutionFPO,
				//"cr6fc_fpoacts": FPOActs,
				"cr6fc_fpoacts":FPOActs,
			//	"cr6fc_dateofregistration": DateOfRegistration,
				"cr6fc_dateofregistration": DateOfRegistration,
				//"cr6fc_placeofregistration": PlaceOfRegistration,
				"cr6fc_placeofregistration": PlaceOfRegistration,
				//"cr6fc_registrationno": RegistrationNo,
				"cr6fc_registrationno": RegistrationNo,
				//"cr6fc_panfpo": PANFPO,
				"cr6fc_panfpo": PANFPO,
				//"cr6fc_tantinfpo": TANTINFPO,
				"cr6fc_tantinfpo": TANTINFPO,
				//"cr6fc_gstinfpo": GSTINFPO,
				"cr6fc_gstinfpo": GSTINFPO,

				//"cr6fc_fpoactivities111": '' + FPOActivities,
				"cr6fc_fpoactivities111":''+FPOActivities,
				//"cr6fc_fpoagribusinessactivity": FPOAgriBusinessActivity,
				"cr6fc_fpoagribusinessactivity": FPOAgriBusinessActivity,
				//"cr6fc_forwardlinkagefpo": ForwardLinkageFPO,
				"cr6fc_forwardlinkagefpo": ForwardLinkageFPO,
				//"cr6fc_backwardlinkagefpo": BackwardLinkageFPO,
				"cr6fc_backwardlinkagefpo": BackwardLinkageFPO,
			//	"cr6fc_RegionOfFPO@odata.bind": FPORegion,
				"cr6fc_RegionOfFPO@odata.bind": FPORegion,
				//"cr6fc_totalfpomember": TotalFPOMember,
				"cr6fc_totalfpomember": TotalFPOMember,
				//"cr6fc_totalmembernorthen": TotalMemberNorthen,
				"cr6fc_totalmembernorthen": TotalMemberNorthen,
				//"cr6fc_nooflandlessfarmer": NoOfLandlessFarmer,
				"cr6fc_nooflandlessfarmer": NoOfLandlessFarmer,
				//"cr6fc_noofsmallfarmer": NoofSmallFarmer,
				"cr6fc_noofsmallfarmer": NoOfSmallFarmer,
				//"cr6fc_noofmarginalfarmer": NoOfMarginalFarmer,
				"cr6fc_noofmarginalfarmer": NoOfMarginalFarmer,
				//"cr6fc_noofbigfarmer": NoOfBigFarmer,
				"cr6fc_noofbigfarmer": NoOfBigFarmer,
				//"cr6fc_farmermembersize": FarmerMemberSize,
				"cr6fc_farmermembersize": FarmerMemberSize,
				//"cr6fc_noofwomenfarmer": NoOfWomenFarmer,
				"cr6fc_noofwomenfarmer": NoOfWomenFarmer,
				//"cr6fc_noofscfarmer": NoOfSCFarmer,
				"cr6fc_noofscfarmer": NoOfSCFarmer,
				//"cr6fc_noofstfarmer": NoOfSTFarmer,
				"cr6fc_noofstfarmer": NoOfSTFarmer,
				//"cr6fc_existingregisteredofficeaddress": ExistingRegisteredOfficeAddress,
				"cr6fc_existingregisteredofficeaddress": ExistingRegisteredOfficeAddress,
				//"cr6fc_fpodistrict": FPODistrict,
				"cr6fc_fpodistrict": FPODistrict,
				//"cr6fc_fpopincode": FPOPincode,
				"cr6fc_fpopincode": FPOPincode,
				//"cr6fc_geolatitutelocation": GeoLatituteLocation,
				"cr6fc_geolatitutelocation": GeoLatituteLocation,
				//"cr6fc_geolongitutelocation": GeoLongituteLocation,
				"cr6fc_geolongitutelocation": GeoLongituteLocation,
			//	"cr6fc_businessaddresssameregiaddress": BusinessAddress,
				"cr6fc_businessaddresssameregiaddress": BusinessAddress,
				//"cr6fc_fpocity": FPOCity,
				"cr6fc_fpocity": FPOCity,
			//	"cr6fc_businessfpocity": BusinessFPOcity,
				"cr6fc_businessfpocity": BusinessFPOcity,
				//"cr6fc_businessaddressfpo": BusinessAddressFPO,
				"cr6fc_businessaddressfpo": BusinessAddressFPO,
				//"cr6fc_businessfpodistrict": BusinessFPODistrict,
				"cr6fc_businessfpodistrict": BusinessFPODistrict,
			//	"cr6fc_BusinessFPOState@odata.bind": "/cr6fc_statemasters(" + BusinessFPOState + ")",
				"cr6fc_BusinessFPOState@odata.bind": "/cr6fc_statemasters(" + BusinessFPOState + ")",
				//"cr6fc_businessfpopincode": BusinessFPOPincode,
				"cr6fc_businessfpopincode": BusinessFPOPincode,
				//"cr6fc_geolatitutelocationfpo": GeoLatituteLocationFPO,
				"cr6fc_geolatitutelocationfpo": GeoLatituteLocationFPO,
				//"cr6fc_geolongitutelocationfpo": GeoLongituteLocationFPO,
				"cr6fc_geolongitutelocationfpo": GeoLongituteLocationFPO,
			//	"cr6fc_newfpo": NewFPO,
				"cr6fc_newfpo": NewFPO,
				//"cr6fc_fpoavailedgoischeme": FPOAvailedGOIScheme,
				"cr6fc_fpoavailedgoischeme": FPOAvailedGOIScheme,
				//"cr6fc_cgpan": CGPAN,
				"cr6fc_cgpan": CGPAN,
				//"cr6fc_existingcf": existingCreditFacility,
				"cr6fc_existingcf": existingCreditFacility,
				
				//"cr6fc_totalsanctionedamount": TotalSanctionedAmount,
				"cr6fc_totalsanctionedamount": TotalSanctionedAmount,
			//	"cr6fc_typeofcreditfacility": TypeOfCreditFacility,
				"cr6fc_typeofcreditfacility": TypeOfCreditFacility,
				//"cr6fc_validitycreditguarantee": ValidityCreditGuarantee,
				"cr6fc_validitycreditguarantee": ValidityCreditGuarantee,
				//"cr6fc_nameofceo": NameOfCEO,
				"cr6fc_nameofceo": NameOfCEO,
				//"cr6fc_contactceo": ContactCEO,
				"cr6fc_contactceo": ContactCEO,
				//"cr6fc_mobileceo": MobileCEO,
				"cr6fc_mobileceo": MobileCEO,
				//"cr6fc_emailidceo": EmailIDCEO,
				"cr6fc_emailidceo": EmailIDCEO,
				//"cr6fc_customerid": CustomerID,
				"cr6fc_customerid": CustomerID,
				//"cr6fc_lendingassesmenttool": LendingAssesmentTool,
				"cr6fc_lendingassesmenttool": LendingAssesmentTool,
				//"cr6fc_typeoffacility": TypeofFacility,
				"cr6fc_typeoffacility": TypeofFacility,
				//"cr6fc_purposeofthecreditfacility": '' + PurposeOftheCreditFacility,
				"cr6fc_purposeofcreditfacility":''+PurposeOftheCreditFacility,
				//"cr6fc_accountno": AccountNo,
				"cr6fc_accountno": AccountNo,
				//"cr6fc_sanctionedamount": SanctionedAmount,
				"cr6fc_sanctionedamount": SanctionedAmount,
				//"cr6fc_dateofsanction": DateOfSanction,
				"cr6fc_dateofsanction": DateOfSanction,
				//"cr6fc_enddateofinterestmoratium": EndDateOfInterestMoratium,
				"cr6fc_enddateofinterestmoratium": EndDateOfInterestMoratium,
				//"cr6fc_enddateofprinciplemoratium": EndDateOfPrincipleMoratium,
				"cr6fc_enddateofprinciplemoratium": EndDateOfPrincipleMoratium,
				//"cr6fc_duedateoflastinstallment": DueDateOfLastInstallment,
				"cr6fc_duedateoflastinstallment": DueDateOfLastInstallment,
				//"cr6fc_interestrate": InterestRate,
				"cr6fc_interestrate": InterestRate,
				//"cr6fc_creditfacilityfundagriinfra": CreditFacilityFundAgriInfra,
				"cr6fc_creditfacilityfundagriinfra": CreditFacilityFundAgriInfra,
				//"cr6fc_loanfullydisbured": LoanFullyDisbured,
				"cr6fc_loanfullydisbured": LoanFullyDisbured,
				//"cr6fc_outstandingamountondate": OutstandingAmountOnDate,
				"cr6fc_outstandingamountondate": OutstandingAmountOnDate,
				//"AccountNoLimitDetail":AccountNoLimitDetail,
				//"SanctionedAmountWCDetail":SanctionedAmountWCDetail,
				//"SanctionedDate":new Date(SanctionedDate),
			//	"cr6fc_drawingpower": DrawingPower,
				"cr6fc_drawingpower": DrawingPower,
				//"cr6fc_enddateofmoratium": EndDateOfMoratium,
				"cr6fc_enddateofmoratium": EndDateOfMoratium,
				//"cr6fc_validityenddate": ValidityEndDate,
				"cr6fc_validityenddate": ValidityEndDate,
				//"InterestRateDetail":InterestRateDetail,
				// "FullyLoanDisbursed": FullyLoanDisbursed,
				//"CCOutstandingAmountOnDate":CCOutstandingAmountOnDate,
				// "TermLoanCreditFacility": TermLoanCreditFacility,
				//"cr6fc_projectcostinput": ProjectCostInput,
				"cr6fc_projectcostinput": ProjectCostInput,
				//"cr6fc_projectcostmarketing": ProjectCostMarketing,
				"cr6fc_projectcostmarketing": ProjectCostMarketing,
				//"cr6fc_projectcostprocessing": ProjectCostProcessing,
				"cr6fc_projectcostprocessing": ProjectCostProcessing,
				//"cr6fc_projectcostother": ProjectCostOther,
				"cr6fc_projectcostother": ProjectCostOther,
				
				//"cr6fc_projectcosttotal": ProjectCostTotal,
				"cr6fc_projectcosttotal": ProjectCostTotal,
				//"cr6fc_meansoffinanacetermloan": MeansOfFinanaceTermLoan,
				"cr6fc_meansoffinanacetermloan": MeansOfFinanaceTermLoan,
				//"cr6fc_promoterequitymargin": PromoterEquityMargin,
				"cr6fc_promoterequitymargin": PromoterEquityMargin,
				//"cr6fc_unsecuredloan": UNsecuredLoan,
				"cr6fc_unsecuredloan": UNsecuredLoan,
			//	"cr6fc_anyothersources": AnyOtherSource,
				"cr6fc_anyothersources": AnyOtherSource,
			//	"cr6fc_typeofsecurity": TypeOfSecurity,
				"cr6fc_typeofsecurity": TypeOfSecurity,
				//"cr6fc_natureofsecurity": NatureOfSecurity,
				"cr6fc_natureofsecurity": NatureOfSecurity,
			//	"cr6fc_valueofsecurity": ValueOfSecurity,
				"cr6fc_valueofsecurity": ValueOfSecurity,
			//	"cr6fc_nameoflendinginstitution": NameOfLendingInstitution,
				"cr6fc_nameoflendinginstitution": NameOfLendingInstitution,
				//"cr6fc_elimakerremark": txtELIMakerRemark,
				"cr6fc_elimakerremark": txtELIMakerRemark,
				//"cr6fc_totalamount": TotalValue,
				"cr6fc_totalamount": TotalValue,
				//"cr6fc_status": SubStatus,
				"cr6fc_status": SubStatus,
				//"cr6fc_FPOState@odata.bind": "/cr6fc_statemasters(" + FPOState + ")",
				"cr6fc_FPOState@odata.bind": "/cr6fc_statemasters(" + FPOState + ")",
				//"cr6fc_collateralsecurity": CollateralSecurity,
				"cr6fc_collateralsecurity": CollateralSecurity,
				//"cr6fc_creditfacilityutilised": creditFacilityUtilised
				"cr6fc_creditfacilityutilised": creditFacilityUtilised
			});
	}
	else if (BusinessAddress == "1" || BusinessAddress == "0") {
		var data = JSON.stringify(
			{

				//"Title":vTitle,
				//"cr6fc_ELIChecker_contact@odata.bind": "/contacts(" + EILchecker + ")",
				"cr6fc_ELIChecker_contact@odata.bind":"/contacts(" +  EILchecker + ")",
			//	"cr6fc_eilcheckeremailid": ELICheckerEmail,
				"cr6fc_elicheckeremailid": ELICheckerEmail,
				//"ApplicantName":txtApplicantName,
				//"cr6fc_nameoffpo": txtNameOfFPO,
				"cr6fc_nameoffpo":txtNameOfFPO,
				//"cr6fc_constitutionfpo": ConstitutionFPO,
				"cr6fc_constitutionfpo": ConstitutionFPO,
				//"cr6fc_fpoacts": FPOActs,
				"cr6fc_fpoacts":FPOActs,
			//	"cr6fc_dateofregistration": DateOfRegistration,
				"cr6fc_dateofregistration": DateOfRegistration,
				//"cr6fc_placeofregistration": PlaceOfRegistration,
				"cr6fc_placeofregistration": PlaceOfRegistration,
			//	"cr6fc_registrationno": RegistrationNo,
				"cr6fc_registrationno": RegistrationNo,
			//	"cr6fc_panfpo": PANFPO,
				"cr6fc_panfpo": PANFPO,
				//"cr6fc_tantinfpo": TANTINFPO,
				"cr6fc_tantinfpo": TANTINFPO,
				//"cr6fc_gstinfpo": GSTINFPO,
				"cr6fc_gstinfpo": GSTINFPO,
				//"cr6fc_fpoactivities111": '' + FPOActivities,
				"cr6fc_fpoactivities111":''+FPOActivities,
				//"cr6fc_fpoagribusinessactivity": FPOAgriBusinessActivity,
				"cr6fc_fpoagribusinessactivity": FPOAgriBusinessActivity,
				//"cr6fc_forwardlinkagefpo": ForwardLinkageFPO,
				"cr6fc_forwardlinkagefpo": ForwardLinkageFPO,
				//"cr6fc_backwardlinkagefpo": BackwardLinkageFPO,
				"cr6fc_backwardlinkagefpo": BackwardLinkageFPO,
				//"cr6fc_RegionOfFPO@odata.bind": FPORegion,
				"cr6fc_RegionOfFPO@odata.bind": FPORegion,
				//"cr6fc_totalfpomember": TotalFPOMember,
				"cr6fc_totalfpomember": TotalFPOMember,
				//"cr6fc_totalmembernorthen": TotalMemberNorthen,
				"cr6fc_totalmembernorthen": TotalMemberNorthen,
				//"cr6fc_nooflandlessfarmer": NoOfLandlessFarmer,
				"cr6fc_nooflandlessfarmer": NoOfLandlessFarmer,
				//"cr6fc_noofsmallfarmer": NoofSmallFarmer,
				"cr6fc_noofsmallfarmer": NoOfSmallFarmer,
				//"cr6fc_noofmarginalfarmer": NoOfMarginalFarmer,
				"cr6fc_noofmarginalfarmer": NoOfMarginalFarmer,
				//"cr6fc_noofbigfarmer": NoOfBigFarmer,
				"cr6fc_noofbigfarmer": NoOfBigFarmer,
				//"cr6fc_farmermembersize": FarmerMemberSize,
				"cr6fc_farmermembersize": FarmerMemberSize,
				//"cr6fc_noofwomenfarmer": NoOfWomenFarmer,
				"cr6fc_noofwomenfarmer": NoOfWomenFarmer,
			//	"cr6fc_noofscfarmer": NoOfSCFarmer,
				"cr6fc_noofscfarmer": NoOfSCFarmer,
			//	"cr6fc_noofstfarmer": NoOfSTFarmer,
				"cr6fc_noofstfarmer": NoOfSTFarmer,
				//"cr6fc_existingregisteredofficeaddress": ExistingRegisteredOfficeAddress,
				"cr6fc_existingregisteredofficeaddress": ExistingRegisteredOfficeAddress,
				//"cr6fc_fpodistrict": FPODistrict,
				"cr6fc_fpodistrict": FPODistrict,
				//"cr6fc_fpopincode": FPOPincode,
				"cr6fc_fpopincode": FPOPincode,
			//	"cr6fc_geolatitutelocation": GeoLatituteLocation,
				"cr6fc_geolatitutelocation": GeoLatituteLocation,
				//"cr6fc_geolongitutelocation": GeoLongituteLocation,
				"cr6fc_geolongitutelocation": GeoLongituteLocation,
				//"cr6fc_businessaddresssameregiaddress": BusinessAddress,
				"cr6fc_businessaddresssameregiaddress": BusinessAddress,
				//"cr6fc_fpocity": FPOCity,
				"cr6fc_fpocity": FPOCity,
			//	"cr6fc_businessfpocity": BusinessFPOcity,
				"cr6fc_businessfpocity": BusinessFPOcity,
				//"cr6fc_businessaddressfpo": BusinessAddressFPO,
				"cr6fc_businessaddressfpo": BusinessAddressFPO,
				//"cr6fc_businessfpodistrict": BusinessFPODistrict,
				"cr6fc_businessfpodistrict": BusinessFPODistrict,
				//"cr6fc_BusinessFPOState@odata.bind": "/cr6fc_statemasters(" + BusinessFPOState + ")",
			//	"cr6fc_businessfpopincode": BusinessFPOPincode,
				"cr6fc_businessfpopincode": BusinessFPOPincode,
				//"cr6fc_geolatitutelocationfpo": GeoLatituteLocationFPO,
				"cr6fc_geolatitutelocationfpo": GeoLatituteLocationFPO,
				//"cr6fc_geolongitutelocationfpo": GeoLongituteLocationFPO,
				"cr6fc_geolongitutelocationfpo": GeoLongituteLocationFPO,
			//	"cr6fc_newfpo": NewFPO,
				"cr6fc_newfpo": NewFPO,
				//"cr6fc_fpoavailedgoischeme": FPOAvailedGOIScheme,
				"cr6fc_fpoavailedgoischeme": FPOAvailedGOIScheme,
				//"cr6fc_cgpan": CGPAN,
				"cr6fc_cgpan": CGPAN,
				//"cr6fc_existingcf": existingCreditFacility,
				"cr6fc_existingcf": existingCreditFacility,
				//"cr6fc_totalsanctionedamount": TotalSanctionedAmount,
				"cr6fc_totalsanctionedamount": TotalSanctionedAmount,
				//"cr6fc_typeofcreditfacility": TypeOfCreditFacility,
				"cr6fc_typeofcreditfacility": TypeOfCreditFacility,
				//"cr6fc_validitycreditguarantee": ValidityCreditGuarantee,
				"cr6fc_validitycreditguarantee": ValidityCreditGuarantee,
				//"cr6fc_nameofceo": NameOfCEO,
				"cr6fc_nameofceo": NameOfCEO,
				//"cr6fc_contactceo": ContactCEO,
				"cr6fc_contactceo": ContactCEO,
				//"cr6fc_mobileceo": MobileCEO,
				"cr6fc_mobileceo": MobileCEO,
				//"cr6fc_emailidceo": EmailIDCEO,
				"cr6fc_emailidceo": EmailIDCEO,
				//"cr6fc_customerid": CustomerID,
				"cr6fc_customerid": CustomerID,
			//	"cr6fc_lendingassesmenttool": LendingAssesmentTool,
				"cr6fc_lendingassesmenttool": LendingAssesmentTool,
				//"cr6fc_typeoffacility": TypeofFacility,
				"cr6fc_typeoffacility": TypeofFacility,
				//"cr6fc_purposeofthecreditfacility": '' + PurposeOftheCreditFacility,
				"cr6fc_purposeofcreditfacility":''+PurposeOftheCreditFacility,
				//"cr6fc_accountno": AccountNo,
				"cr6fc_accountno": AccountNo,
				//"cr6fc_sanctionedamount": SanctionedAmount,
				"cr6fc_sanctionedamount": SanctionedAmount,
				//"cr6fc_dateofsanction": DateOfSanction,
				"cr6fc_dateofsanction": DateOfSanction,
				//"cr6fc_enddateofinterestmoratium": EndDateOfInterestMoratium,
				"cr6fc_enddateofinterestmoratium": EndDateOfInterestMoratium,
				///"cr6fc_enddateofprinciplemoratium": EndDateOfPrincipleMoratium,
				"cr6fc_enddateofprinciplemoratium": EndDateOfPrincipleMoratium,
				//"cr6fc_duedateoflastinstallment": DueDateOfLastInstallment,
				"cr6fc_duedateoflastinstallment": DueDateOfLastInstallment,
				//"cr6fc_interestrate": InterestRate,
				"cr6fc_interestrate": InterestRate,
				//"cr6fc_creditfacilityfundagriinfra": CreditFacilityFundAgriInfra,
				"cr6fc_creditfacilityfundagriinfra": CreditFacilityFundAgriInfra,
				//"cr6fc_loanfullydisbured": LoanFullyDisbured,
				"cr6fc_loanfullydisbured": LoanFullyDisbured,
				//"cr6fc_outstandingamountondate": OutstandingAmountOnDate,
				"cr6fc_outstandingamountondate": OutstandingAmountOnDate,
				//"AccountNoLimitDetail":AccountNoLimitDetail,
				//"SanctionedAmountWCDetail":SanctionedAmountWCDetail,
				//"SanctionedDate":new Date(SanctionedDate),
			//	"cr6fc_drawingpower": DrawingPower,
				"cr6fc_drawingpower": DrawingPower,
				//"cr6fc_enddateofmoratium": EndDateOfMoratium,
				"cr6fc_enddateofmoratium": EndDateOfMoratium,
				//"cr6fc_validityenddate": ValidityEndDate,
				"cr6fc_validityenddate": ValidityEndDate,
				//"InterestRateDetail":InterestRateDetail,
				// "FullyLoanDisbursed": FullyLoanDisbursed,
				//"CCOutstandingAmountOnDate":CCOutstandingAmountOnDate,
				// "TermLoanCreditFacility": TermLoanCreditFacility,
				//"cr6fc_projectcostinput": ProjectCostInput,
				"cr6fc_projectcostinput": ProjectCostInput,
				//"cr6fc_projectcostmarketing": ProjectCostMarketing,
				"cr6fc_projectcostmarketing": ProjectCostMarketing,
			//	"cr6fc_projectcostprocessing": ProjectCostProcessing,
				"cr6fc_projectcostprocessing": ProjectCostProcessing,
				//"cr6fc_projectcostother": ProjectCostOther,
				"cr6fc_projectcostother": ProjectCostOther,
			//	"cr6fc_projectcosttotal": ProjectCostTotal,
				"cr6fc_projectcosttotal": ProjectCostTotal,
				//"cr6fc_meansoffinanacetermloan": MeansOfFinanaceTermLoan,
				"cr6fc_meansoffinanacetermloan": MeansOfFinanaceTermLoan,
				//"cr6fc_promoterequitymargin": PromoterEquityMargin,
				"cr6fc_promoterequitymargin": PromoterEquityMargin,
				//"cr6fc_unsecuredloan": UNsecuredLoan,
				"cr6fc_unsecuredloan": UNsecuredLoan,
				//"cr6fc_anyothersources": AnyOtherSource,
				"cr6fc_anyothersources": AnyOtherSource,
				//"cr6fc_typeofsecurity": TypeOfSecurity,
				"cr6fc_typeofsecurity": TypeOfSecurity,
				//"cr6fc_natureofsecurity": NatureOfSecurity,
				"cr6fc_natureofsecurity": NatureOfSecurity,
			//	"cr6fc_valueofsecurity": ValueOfSecurity,
				"cr6fc_valueofsecurity": ValueOfSecurity,
				//"cr6fc_nameoflendinginstitution": NameOfLendingInstitution,
				"cr6fc_nameoflendinginstitution": NameOfLendingInstitution,
				//"cr6fc_elimakerremark": txtELIMakerRemark,
				"cr6fc_elimakerremark": txtELIMakerRemark,
			//"cr6fc_totalamount": TotalValue,
				"cr6fc_totalamount": TotalValue,
				//"cr6fc_status": SubStatus,
				"cr6fc_status": SubStatus,
				//"cr6fc_FPOState@odata.bind": "/cr6fc_statemasters(" + FPOState + ")",
				"cr6fc_FPOState@odata.bind": "/cr6fc_statemasters(" + FPOState + ")",
			//	"cr6fc_collateralsecurity": CollateralSecurity,
				"cr6fc_collateralsecurity": CollateralSecurity,
				//"cr6fc_creditfacilityutilised": creditFacilityUtilised
				"cr6fc_creditfacilityutilised": creditFacilityUtilised
			});
	}
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
			url: "/_api/cr6fc_cgaplications(" + vItemID + ")",
			data: data,
			type: "PATCH",
			headers: header,
			async: false,
			success: function (data, textStatus, xhr) {
				var successId = xhr.getResponseHeader('entityid');
				//console.log(success);
				if (status == "Submitted") {
					alert('Request Send for Approval')

				}
				else {
					alert('Request Save Successfully')
				}
			//	window.location.href = location.origin + "/RefreshingCache/?id=" + successId + "&tbl=cr6fc_cgapplicationses&col=cr6fc_cacherefreshedon&red=DashboardCGApp";
				window.location.href = location.origin + "/RefreshingCache/?id="+successId+"&tbl=cr6fc_cgaplications&col=cr6fc_cacherefreshedon&red=DashboardCGApp";
				// window.location.href = location.origin + "/dashboardcgapp/";
			},
			error: function (error) {
				console.log(error);
				//alert('Some error occured. Please try again later.');
				alert('Some error occured while adding data in CGApplication list. Please try again later.');
				console.log(error);
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

function Checkdate() {
	var DueDateOfLastInstallment = $("#DueDateOfLastInstallment").val();
	var todayvalue = new Date();
	var DateOfSanction = $("#DateOfSanction").val();

	if (DueDateOfLastInstallment != "" && DueDateOfLastInstallment != null && DueDateOfLastInstallment != undefined) {
		if (DueDateOfLastInstallment < DateOfSanction || DueDateOfLastInstallment < todayvalue) {
			alert('Due Date of Last Installment should be greater than Sanctioned Date')
			return false;
		}
	}
}

function CheckEndDateInterest() {
	var EndDateOfInterestMoratium = $("#EndDateOfInterestMoratium").val();
	var todayvalue = new Date();
	var DateOfSanction = $("#DateOfSanction").val();

	if (EndDateOfInterestMoratium != "" && EndDateOfInterestMoratium != null && EndDateOfInterestMoratium != undefined) {
		if (EndDateOfInterestMoratium < DateOfSanction) {
			alert('End Date Of Interest Moratium  should be greater than Sanctioned Date')
			return false;
		}
	}
}

function CheckEndPriciple() {
	var EndDateOfPrincipleMoratium = $("#EndDateOfPrincipleMoratium").val();
	var todayvalue = new Date();
	var DateOfSanction = $("#DateOfSanction").val();


	if (EndDateOfPrincipleMoratium != "" && EndDateOfPrincipleMoratium != null && EndDateOfPrincipleMoratium != undefined) {
		if (EndDateOfPrincipleMoratium < DateOfSanction) {
			alert('End Date Of Principle Moratium should be greater than Sanctioned Date')
			return false;
		}
	}
}

function CheckWCEnd() {
	var EndDateOfMoratium = $("#EndDateOfMoratium").val();
	var todayvalue = new Date();
	var DateOfSanction = $("#SanctionedDate").val();

	if (EndDateOfMoratium != "" && EndDateOfMoratium != null && EndDateOfMoratium != undefined) {
		if (EndDateOfMoratium < DateOfSanction) {
			alert('End Date Of Moratium  should be greater than Sanctioned Date')
			return false;
		}
	}
}

function CheckWCEndValidity() {
	var ValidityEndDate = $("#ValidityEndDate").val();
	var todayvalue = new Date();
	var DateOfSanction = $("#SanctionedDate").val();


	if (ValidityEndDate != "" && ValidityEndDate != null && ValidityEndDate != undefined) {
		if (ValidityEndDate < DateOfSanction) {
			alert('Validity End Date should be greater than Sanctioned Date')
			return false;
		}
	}
}

function GetUserId1(EamilID) {
	debugger;
	//var vNewLoginName=EamilID.split('|')[2];
	var requestUri = location.origin + "/_api/contacts?$top=500&$select=contactid,emailaddress1&$filter=emailaddress1 eq '" + EamilID + "'";
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
				returnValue = Logg[0].contactid;
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

function SubmitDataOld(status) {
	var hdnELIMaker = document.getElementById("hdnELIMaker").value;
	var hdnStatus = document.getElementById("hdnStatus").value
	var txtApplicantName = $("#txtApplicantName").val();
	var txtNameOfFPO = $("#txtNameOfFPO").val();
	if (txtNameOfFPO == "") {
		alert('Please Enter Name Of FPO')
		return false;
	}
	var ConstitutionFPO = $("#ConstitutionFPO option:selected").text();
	if (ConstitutionFPO == "Select" || ConstitutionFPO == "") {
		alert('Please Enter Constitution FPO')
		return false;
	}
	var FPOActs = $("#FPOActs option:selected").text();
	if (FPOActs == "Select" || FPOActs == "") {
		alert('Please Enter FPOActs')
		return false;
	}
	var DateOfRegistration = $("#DateOfRegistration").val();
	if (DateOfRegistration == "Select" || DateOfRegistration == "" || DateOfRegistration == undefined) {
		alert('Please Enter Date Of Registration')
		return false;
	}
	var PlaceOfRegistration = $("#PlaceOfRegistration").val();
	if (PlaceOfRegistration == "Select" || PlaceOfRegistration == "" || PlaceOfRegistration == undefined) {
		alert('Please Enter Place Of Registration')
		return false;
	}
	var RegistrationNo = $("#RegistrationNo").val();
	if (RegistrationNo == "Select" || RegistrationNo == "" || RegistrationNo == undefined) {
		alert('Please Enter Registration No')
		return false;
	}
	var PANFPO = $("#PANFPO").val();
	if (PANFPO == "Select" || PANFPO == "" || PANFPO == undefined) {
		alert('Please Enter PAN FPO')
		return false;
	}
	var TANTINFPO = $("#TANTINFPO").val();
	var GSTINFPO = $("#GSTINFPO").val();
	var FPOActivities = $("#FPOActivities").val();
	if (FPOActivities == "Select" || FPOActivities == "" || FPOActivities == undefined) {
		alert('Please Enter FPO Activities')
		return false;
	}

	var FPOAgriBusinessActivity = $("#FPOAgriBusinessActivity option:selected").text();
	if (FPOAgriBusinessActivity == "Select" || FPOAgriBusinessActivity == "" || FPOAgriBusinessActivity == undefined) {
		alert('Please Enter FPO AgriBusiness Activity')
		return false;
	}

	var ForwardLinkageFPO = $("#ForwardLinkageFPO").val();
	if (ForwardLinkageFPO == "Select" || ForwardLinkageFPO == "") {
		alert('Please Enter ForwardLinkage FPO')
		return false;
	}
	var BackwardLinkageFPO = $("#BackwardLinkageFPO").val();
	if (BackwardLinkageFPO == "Select" || BackwardLinkageFPO == "") {
		alert('Please Enter BackwardLinkage FPO')
		return false;
	}
	var RegionOfFPO = $("#RegionOfFPO").val();
	if (RegionOfFPO == "Select" || RegionOfFPO == undefined || RegionOfFPO == '0') {
		alert('Please Enter Region Of FPO ')
		return false;
	}
	var TotalFPOMember = $("#TotalFPOMember option:selected").text();

	if (RegionOfFPO == "1") {
		if (TotalFPOMember == "Select" || TotalFPOMember == undefined) {
			alert('Please Enter Total Number of Members of the FPO in Plains')
			return false;
		}
		var FarmerMemberSize = $("#FarmerMemberSize").val();
		if (TotalFPOMember == "Less than 300") {
			if (FarmerMemberSize > 300) {
				alert('Farmer Member Size should be less than 300')
				return false;
			}
		}
		if (TotalFPOMember == "More than 300") {
			if (FarmerMemberSize < 300) {
				alert('Farmer Member Size should not be less than 300')
				return false;
			}
		}


	}
	var TotalMemberNorthen = $("#TotalMemberNorthen").val();

	if (RegionOfFPO == "2") {
		if (TotalMemberNorthen == "Select" || TotalMemberNorthen == undefined) {
			alert('Please Enter Total Number of Members of the FPO in North Eastern or Hilly Areas')
			return false;
		}
		var FarmerMemberSize = $("#FarmerMemberSize").val();
		if (TotalMemberNorthen == "Less than 100") {
			if (FarmerMemberSize > 100) {
				alert('Farmer Member Size should be less than 100')
				return false;
			}
		}
		if (TotalMemberNorthen == "More than 100") {
			if (FarmerMemberSize < 100) {
				alert('Farmer Member Size should not be less than 100')
				return false;
			}
		}


	}

	var NoOfLandlessFarmer = $("#NoOfLandlessFarmer").val();
	if (NoOfLandlessFarmer == "" || NoOfLandlessFarmer == undefined) {
		alert('Please Enter No. of Landless Tenant Farmer Members')
		return false;
	}
	var NoofSmallFarmer = $("#NoofSmallFarmer").val();
	if (NoofSmallFarmer == "" || NoofSmallFarmer == undefined) {
		alert('Please Enter No. of Small Farmer Members ')
		return false;
	}
	var NoOfMarginalFarmer = $("#NoOfMarginalFarmer").val();
	if (NoOfMarginalFarmer == "" || NoOfMarginalFarmer == undefined) {
		alert('Please Enter No. of Marginal Farmer Member')
		return false;
	}
	var NoOfBigFarmer = $("#NoOfBigFarmer").val();
	if (NoOfBigFarmer == "" || NoOfBigFarmer == undefined) {
		alert('Please Enter No. of Big Farmers Member')
		return false;
	}
	var FarmerMemberSize = $("#FarmerMemberSize").val();
	if (FarmerMemberSize == "" || FarmerMemberSize == undefined) {
		alert('Please Enter Farmer Members size (Shareholder Members No.)')
		return false;
	}
	var NoOfWomenFarmer = $("#NoOfWomenFarmer").val();
	if (NoOfWomenFarmer == "" || NoOfWomenFarmer == undefined) {
		alert('Please Enter No. of Women Members')
		return false;
	}
	var NoOfSCFarmer = $("#NoOfSCFarmer").val();
	if (NoOfSCFarmer == "" || NoOfSCFarmer == undefined) {
		alert('Please Enter No. of SC Members')
		return false;
	}
	var NoOfSTFarmer = $("#NoOfSTFarmer").val();
	if (NoOfSTFarmer == "" || NoOfSTFarmer == undefined) {
		alert('Please Enter No. of ST Members')
		return false;
	}

	if (NoOfWomenFarmer > FarmerMemberSize) {
		alert('No Of WomenFarmer  should not be more than "Total size of farmers"')
		return false;
	}
	if (NoOfSCFarmer > FarmerMemberSize) {
		alert('No Of SC Farmer  should not be more than "Total size of farmers"')
		return false;
	}
	if (NoOfSTFarmer > FarmerMemberSize) {
		alert('No Of ST Farmer  should not be more than "Total size of farmers"')
		return false;
	}
	if (parseInt(NoOfSCFarmer) + parseInt(NoOfSTFarmer) > FarmerMemberSize) {
		alert('Total of SC Members and ST Members cannot exceed Total Farmer Member Size')
		return false;
	}
	var ExistingRegisteredOfficeAddress = $("#ExistingRegisteredOfficeAddress").val();
	if (ExistingRegisteredOfficeAddress == "Select" || ExistingRegisteredOfficeAddress == "") {
		alert('Please Enter Existing Registered Office Address')
		return false;
	}

	var FPOCity = $("#FPOCity").val();
	if (FPOCity == '' || FPOCity == null || FPOCity == undefined) {
		alert('Please Enter FPO City')
		return false;
	}

	var FPOPincode = $("#FPOPincode").val();
	if (FPOPincode == "Select" || FPOPincode == "") {
		alert('Please Enter FPO Pincode')
		return false;
	}


	var FPODistrict = $("#FPODistrict").val();
	if (FPODistrict == "Select" || FPODistrict == "") {
		alert('Please Enter FPO District')
		return false;
	}
	var GeoLatituteLocation = $("#GeoLatituteLocation").val();
	var GeoLongituteLocation = $("#GeoLongituteLocation").val();
	var BusinessAddress = $("#BusinessAddress option:selected").val();
	if (BusinessAddress == "Select" || BusinessAddress == "") {
		alert('Please Enter Business Address')
		return false;
	}
	var BusinessFPOcity = $("#BusinessFPOcity").val();
	var BusinessAddressFPO = $("#BusinessAddressFPO").val();
	if (BusinessAddress == "2") {

		var BusinessAddressFPO = $("#BusinessAddressFPO").val();
		if (BusinessAddressFPO == "Select" || BusinessAddressFPO == "") {
			alert('Please Enter Existing FPO Registered Office Address')
			return false;
		}

		var FPOCity = $("#FPOCity").val();
		if (FPOCity == '' || FPOCity == null || FPOCity == undefined) {
			alert('Please Enter FPO City')
			return false;
		}

		var BusinessFPOPincode = $("#BusinessFPOPincode").val();
		if (BusinessFPOPincode == '' || BusinessFPOPincode == null || BusinessFPOPincode == undefined) {
			alert('Please Enter FPO PinCode')
			return false;
		}



		var BusinessFPODistrict = $("#BusinessFPODistrict").val();
		if (BusinessFPODistrict == "Select" || BusinessFPODistrict == undefined) {
			alert('Please Enter Business FPO District')
			return false;
		}

	}
	else {
		var BusinessFPOcity = $("#BusinessFPOcity").val();
		var BusinessFPODistrict = $("#BusinessFPODistrict").val();
		var BusinessAddressFPO = $("#BusinessAddressFPO").val();
		var BusinessFPOPincode = $("#BusinessFPOPincode").val();
		var BusinessFPOState = $("#BusinessFPOState option:selected").val();

	}


	var GeoLatituteLocationFPO = $("#GeoLatituteLocationFPO").val();
	var GeoLongituteLocationFPO = $("#GeoLongituteLocationFPO").val();
	/*if(GeoLongituteLocationFPO=="" || GeoLongituteLocationFPO==undefined){
	alert('Please Enter Geo Longitute Location FPO')
	return false;

  var NewFPO = $("#NewFPO option:selected").text();
  if (NewFPO == "Select" || NewFPO ==""){
	alert('Please Enter New FPO ')
	return false;
  }
  var FPOAvailedGOIScheme = $("#FPOAvailedGOIScheme option:selected").text();
  if (FPOAvailedGOIScheme == "Select" || FPOAvailedGOIScheme =="" || FPOAvailedGOIScheme=="No"){
	alert('Please Enter FPO AvailedGOIScheme ')
	return false;
  }
  if(FPOAvailedGOIScheme=="No")
  {
	 var CGPAN = $("#CGPAN").val();
	 if(CGPAN=="" || CGPAN==undefined){
	 alert('Please Enter CGPAN')
	 return false;
	  }
  }
	
  if(FPOAvailedGOIScheme=="No")
  {
	var TotalSanctionedAmount = $("#TotalSanctionedAmount").val();
	if(TotalSanctionedAmount=="" || TotalSanctionedAmount==undefined){
	alert('Please Enter Total Sanctioned Amount')
	return false;
	}
  }

  if(FPOAvailedGOIScheme=="No")
  {
	 var TypeOfCreditFacility = $("#TypeOfCreditFacility option:selected").text();
	 if(TypeOfCreditFacility=="Select" || TypeOfCreditFacility==undefined){
	 alert('Please Enter Type Of Credit Facility')
	 return false;
	}
  }

if(FPOAvailedGOIScheme=="No")
  {
	var ValidityCreditGuarantee = $("#ValidityCreditGuarantee").val();
	if(ValidityCreditGuarantee=="" || ValidityCreditGuarantee==undefined){
	alert('Please Enter Validity Credit Guarantee')
	return false;
   }
  }
	

  var NameOfCEO = $("#NameOfCEO").val();
  if (NameOfCEO == "Select" || NameOfCEO ==""){
	alert('Please Enter Name Of CEO')
	return false;
  }

  var ContactCEO = $("#ContactCEO").val();
  var MobileCEO = $("#MobileCEO").val();
  if (MobileCEO == "Select" || MobileCEO ==""){
	alert('Please Enter Contact number of CEO')
	return false;
  }
		  else 
  {
	  var regex = /^\d*(?:\.\d{1,2})?$/;		
	  if (!regex.test(MobileCEO)) {
	  alert('Please Enter Valid Mobile Number')
  	
	  return false;
	  }

  }
	  if (MobileCEO.length!=10){
	 alert('Please Enter Valid Mobile Number')
	 return false;
  }


  var EmailIDCEO = $("#EmailIDCEO").val();
  if (EmailIDCEO == "Select" || EmailIDCEO ==""){
	alert('Please Enter Email ID Of CEO ')
	return false;
  }
		  else 
  {
	  var regex =/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;		
	  if (!regex.test(EmailIDCEO)) {
	  alert('Please Enter Valid Email ID')
  	
	  return false;
	  }

  }


  var CustomerID = $("#CustomerID").val();
  if (CustomerID == "Select" || CustomerID ==""){
	alert('Please Enter CustomerID')
	return false;
  }

  var LendingAssesmentTool = $("#LendingAssesmentTool").val();
  if (LendingAssesmentTool == "Select" || LendingAssesmentTool ==""){
	alert('Please Enter Lending Assesment Tool ')
	return false;
  }

  var TypeofFacility = $("#TypeofFacility").val();
  if (TypeofFacility == "Select" || TypeofFacility ==""){
	alert('Please Enter Type Of Facility ')
	return false;
  }

  var PurposeOftheCreditFacility = $("#PurposeOftheCreditFacility option:selected").text();
  if (PurposeOftheCreditFacility == "Select" || PurposeOftheCreditFacility ==""){
	alert('Please Enter Purpose Of the Credit Facility ')
	return false;
  }

  var  AccountNo = $("#AccountNo").val();
  if (AccountNo == "Select" || AccountNo ==""){
	alert('Please Enter AccountNo')
	return false;
  }

  var SanctionedAmount = $("#SanctionedAmount").val();
  if (SanctionedAmount == "Select" || SanctionedAmount ==""){
	alert('Please Enter Sanctioned Amount')
	return false;
  }

  var DateOfSanction = $("#DateOfSanction").val();
  if (DateOfSanction == "Select" || DateOfSanction ==""){
	alert('Please Enter Date Of Sanction')
	return false;
  }

  var EndDateOfInterestMoratium = $("#EndDateOfInterestMoratium").val();
  var EndDateOfPrincipleMoratium = $("#EndDateOfPrincipleMoratium").val();
  var DueDateOfLastInstallment = $("#DueDateOfLastInstallment").val();
  var InterestRate = $("#InterestRate").val();
  if (InterestRate == "Select" || InterestRate ==""){
	alert('Please Enter Interest Rate')
	return false;
  }
  var CreditFacilityFundAgriInfra = $("#CreditFacilityFundAgriInfra option:selected").text();
  if (CreditFacilityFundAgriInfra == "Select" || CreditFacilityFundAgriInfra ==""){
	alert('Please Enter Credit Facility Fund AgriInfra ')
	return false;
  }
  var LoanFullyDisbured = $("#LoanFullyDisbured").val();
  if (LoanFullyDisbured == "Select" || LoanFullyDisbured ==""){
	alert('Please Enter Loan FullyDisbured ')
	return false;
  }
if(LoanFullyDisbured=="No")
  {
	 var OutstandingAmountOnDate = $("#OutstandingAmountOnDate").val();
	 if(OutstandingAmountOnDate=="" ||  OutstandingAmountOnDate==undefined){
	  alert('Please Enter Outstanding Amount On Date')
	  return false;
	 }
  }

  if(TypeofFacility=="2")
  {
	var AccountNoLimitDetail = $("#AccountNoLimitDetail").val();
	if(AccountNoLimitDetail=="" ||  AccountNoLimitDetail==undefined){
	alert('Please Enter Account No Limit Detail')
	return false;
	}
  }
	

if(TypeofFacility=="2")
  {
   var SanctionedAmountWCDetail = $("#SanctionedAmountWCDetail").val();
   if(SanctionedAmountWCDetail=="" ||  SanctionedAmountWCDetail==undefined){
   alert('Please Enter Sanctioned Amount WC Detail')
   return false;
   }
  }
	

if(TypeofFacility=="2")
  {
   var SanctionedDate = $("#SanctionedDate").val();
   if(SanctionedDate=="" ||  SanctionedDate==undefined){
   alert('Please Enter Sanctioned Date')
   return false;
   }
  }

  var DrawingPower = $("#DrawingPower").val();
  var EndDateOfMoratium = $("#EndDateOfMoratium").val();
  var ValidityEndDate = $("#ValidityEndDate").val();
  var InterestRateDetail = $("#InterestRateDetail").val();
   if (InterestRateDetail == "Select" || InterestRateDetail ==""){
	alert('Please Enter Constitution FPO')
	return false;
  }
  var FullyLoanDisbursed = $("#FullyLoanDisbursed").val();
  if(FullyLoanDisbursed == "No")
  {
	  var CCOutstandingAmountOnDate = $("#CCOutstandingAmountOnDate").val();
	  if(CCOutstandingAmountOnDate=="" ||  CCOutstandingAmountOnDate==undefined){
	   alert('Please Enter CC Outstanding Amount On Date')
	   return false;
	  }
  }

  /*var TermLoanCreditFacility = $("#TermLoanCreditFacility option:selected").text();
   if (TermLoanCreditFacility == "Select" || TermLoanCreditFacility ==""){
	alert('Please Enter Term Loan CreditFacility')
	return false;
  }*/

	var ProjectCostInput = $("#ProjectCostInput").val();
	if (ProjectCostInput == "Select" || ProjectCostInput == "") {
		alert('Please Enter Project Cost Input')
		return false;
	}
	var ProjectCostMarketing = $("#ProjectCostMarketing").val();
	if (ProjectCostMarketing == "Select" || ProjectCostMarketing == "") {
		alert('Please Enter Project Cost Marketing ')
		return false;
	}

	var ProjectCostProcessing = $("#ProjectCostProcessing").val();
	if (ProjectCostProcessing == "Select" || ProjectCostProcessing == "") {
		alert('Please Enter Project Cost Processing')
		return false;
	}

	var ProjectCostOther = $("#ProjectCostOther").val();
	var ProjectCostTotal = $("#ProjectCostTotal").val();
	if (ProjectCostTotal == "Select" || ProjectCostTotal == "") {
		alert('Please Enter Project Cost Total')
		return false;
	}

	var MeansOfFinanaceTermLoan = $("#MeansOfFinanaceTermLoan").val();
	var PromoterEquityMargin = $("#PromoterEquityMargin").val();
	var UNsecuredLoan = $("#UNsecuredLoan").val();
	if (UNsecuredLoan == "Select" || UNsecuredLoan == "") {
		alert('Please Enter UNsecured Loan')
		return false;
	}

	var AnyOtherSource = $("#AnyOtherSource").val();
	if (AnyOtherSource == "Select" || AnyOtherSource == "") {
		alert('Please Enter Any Other Source')
		return false;
	}
	if (LoanFullyDisbured == "2") {
		var PurposeOfCreditFacility = $("#PurposeOfCreditFacility option:selected").text();
		if (PurposeOfCreditFacility == "Select" || PurposeOfCreditFacility == "") {
			alert('Please Enter Purpose Of Credit Facility ')
			return false;
		}
	}
	/*var DetailsOfInput = $("#DetailsOfInput").val();
	 if (DetailsOfInput == "Select" || DetailsOfInput ==""){
	  alert('Please Enter Details Of Input ')
	  return false;
	}

	var DetailsOfMarketing = $("#DetailsOfMarketing").val();
	 if (DetailsOfMarketing == "Select" || DetailsOfMarketing ==""){
	  alert('Please Enter Details Of Marketing ')
	  return false;
	}

	var DetailsOfProcessing = $("#DetailsOfProcessing").val();
	 if (DetailsOfProcessing == "Select" || DetailsOfProcessing ==""){
	  alert('Please Enter Details Of Processing ')
	  return false;
	}

	var DetailsOfOther = $("#DetailsOfOther").val();
	 if (DetailsOfOther == "Select" || DetailsOfOther ==""){
	  alert('Please Enter Details Of Other ')
	  return false;
	}

	var TotalWorkingCapital = $("#TotalWorkingCapital").val();
	 if (TotalWorkingCapital == "Select" || TotalWorkingCapital ==""){
	  alert('Please Enter Constitution FPO')
	  return false;
	}

	var MeansOfFinanaceWCLimit = $("#MeansOfFinanaceWCLimit").val();
	 if (MeansOfFinanaceWCLimit == "Select" || MeansOfFinanaceWCLimit ==""){
	  alert('Please Enter Total Working Capital ')
	  return false;
	}

	var PromotersEquity = $("#PromotersEquity").val();
	 if (PromotersEquity == "Select" || PromotersEquity ==""){
	  alert('Please Enter Promoters Equity ')
	  return false;
	}

	var UnsecuredLoans = $("#UnsecuredLoans").val();
	 if (UnsecuredLoans == "Select" || UnsecuredLoans ==""){
	  alert('Please Enter Unsecured Loans')
	  return false;
	}
	var AnyOtherSources = $("#AnyOtherSources").val();
	 if (AnyOtherSources == "Select" || AnyOtherSources ==""){
	  alert('Please Enter Any Other Sources')
	  return false;
	}*/

	var TypeOfSecurity = $("#TypeOfSecurity").val();
	if (TypeOfSecurity == "Select" || TypeOfSecurity == "") {
		alert('Please Enter Type Of Security ')
		return false;
	}

	var NatureOfSecurity = $("#NatureOfSecurity option:selected").text();
	if (NatureOfSecurity == "Select" || NatureOfSecurity == "") {
		alert('Please Enter Nature Of Security')
		return false;
	}

	var ValueOfSecurity = $("#ValueOfSecurity").val();
	if (ValueOfSecurity == "Select" || ValueOfSecurity == "") {
		alert('Please Enter Value Of Security')
		return false;
	}

	var NameOfAuthorisedSignatory = $("#NameOfAuthorisedSignatory").val();
	if (NameOfAuthorisedSignatory == "Select" || NameOfAuthorisedSignatory == "") {
		alert('Please Enter Name Of Authorised Signatory ')
		return false;
	}
	/*var ELIDesignation = $("#ELIDesignation").val();
	 if (ELIDesignation == "Select" || ELIDesignation ==""){
	  alert('Please Enter ELIDesignation')
	  return false;
	}
	var ELIDate = $("#ELIDate").val();
	 if (ELIDate == "Select" || ELIDate ==""){
	  alert('Please Enter ELIDate ')
	  return false;
	}

	var CGIssued = $("#CGIssued").val();
	var ExistingCF = $("#ExistingCF").val();*/
	var NameOfLendingInstitution = $("#NameOfLendingInstitution").val();
	if (NameOfLendingInstitution == "Select" || NameOfLendingInstitution == "") {
		alert('Please Enter Name Of Lending Institution')
		return false;
	}

	var CollateralSecurity = $("#CollateralSecurity").val();

	var SubStatus;
	if (status == "Draft") {
		SubStatus = "Saved";
	}
	else if (status == "Submitted") {
		SubStatus = "Pending for Approval";
	}

	var checker = $.grep(LoggChecker, function (value) {
		return (value.LendingInstitute == NameOfLendingInstitution);
	});
	var EILchecker;
	if (checker.length > 0 && status == "Submitted") {
		EILchecker = checker[0].EILCheckerId;
	}
	else {
		EILchecker = 0;
	}
	if (EILchecker == 0 && status == "Submitted") {
		alert('There is no EIL Checker against this Lending Institute')
		return false;
	}
	var NameOfAuthorisedSignatory = $("#NameOfAuthorisedSignatory").val();
	/*var txtmakerComment=$('#txtmakerComment').val();
	if(hdnStatus=="Sent Back by ELI Checker")
	{
		if(txtmakerComment=='' || txtmakerComment == undefined || txtmakerComment == null)
		{
			alert('Please enter the remark')
			return false;
		}
	}
	var hdnELIMaker = document.getElementById("hdnELIMaker").value;

	 var txtELIMakerRemark;
	 if(txtmakerComment!='' && txtmakerComment!=undefined && txtmakerComment!='' && hdnELIMaker != null && hdnELIMaker!=undefined && hdnELIMaker!='' && hdnELIMaker!="undefined")
	 {
		  txtELIMakerRemark= "<b>Comment</b> :- " + txtmakerComment+ " - " + new Date().toLocaleString('en-US') + ": " + hdnELIMaker.toString() + "\n\n"
	 }
	 else{
		  txtELIMakerRemark= "<b>Comment </b>:- " + txtmakerComment+ " - " + new Date().toLocaleString('en-US') + "\n\n"
	 }*/

	var data1 = JSON.stringify(
		{
			"__metadata":
			{
				"type": "SP.Data.CGApplicationsListItem"
			},
			"ApplicantName": txtApplicantName,
			"cr6fc_status": SubStatus,
			"ELICheckerId": EILchecker,
			"NameOfFPO": txtNameOfFPO,
			"ConstitutionFPO": ConstitutionFPO,
			"FPOActs": FPOActs,
			"cr6fc_dateofregistration": new Date(DateOfRegistration),
			"PlaceOfRegistration": PlaceOfRegistration,
			"RegistrationNo": RegistrationNo,
			"cr6fc_panfpo": PANFPO,
			"cr6fc_tantinfpo": TANTINFPO,
			"cr6fc_gstinfpo": GSTINFPO,
			"cr6fc_fpoactivities111": '' + FPOActivities,
			"FPOAgriBusinessActivity": FPOAgriBusinessActivity,
			"cr6fc_fpoagribusinessactivity": ForwardLinkageFPO,
			"BackwardLinkageFPO": BackwardLinkageFPO,
			"RegionOfFPOId": parseInt(RegionOfFPO),
			"cr6fc_totalfpomember": TotalFPOMember,
			"cr6fc_totalmembernorthen": TotalMemberNorthen,
			"cr6fc_nooflandlessfarmer": NoOfLandlessFarmer,
			"cr6fc_noofsmallfarmer": NoofSmallFarmer,
			"cr6fc_noofmarginalfarmer": NoOfMarginalFarmer,
			"cr6fc_noofbigfarmer": NoOfBigFarmer,
			"cr6fc_farmermembersize": FarmerMemberSize,
			"cr6fc_noofwomenfarmer": NoOfWomenFarmer,
			"cr6fc_noofscfarmer": NoOfSCFarmer,
			"cr6fc_noofstfarmer": NoOfSTFarmer,
			"cr6fc_existingregisteredofficeaddress": ExistingRegisteredOfficeAddress,
			"cr6fc_fpodistrict": FPODistrict,
			"cr6fc_fpopincode": FPOPincode,
			"cr6fc_geolatitutelocation": GeoLatituteLocation,
			"GeoLongituteLocation": GeoLongituteLocation,
			"cr6fc_businessaddresssameregiaddress": BusinessAddress,
			"cr6fc_businessfpocity": BusinessFPOcity,
			"cr6fc_businessaddressfpo": BusinessAddressFPO,
			"cr6fc_businessfpodistrict": BusinessFPODistrict,
			// "BusinessFPOStateId":''+BusinessFPOState,
			"cr6fc_businessfpopincode": BusinessFPOPincode,
			"cr6fc_geolatitutelocationfpo": GeoLatituteLocationFPO,
			"cr6fc_geolongitutelocationfpo": GeoLongituteLocationFPO,
			"cr6fc_newfpo": NewFPO,
			"cr6fc_fpoavailedgoischeme": FPOAvailedGOIScheme,
			"cr6fc_cgpan": CGPAN,
			"cr6fc_totalsanctionedamount": TotalSanctionedAmount,
			"cr6fc_typeofcreditfacility": TypeOfCreditFacility,
			"cr6fc_validitycreditguarantee": new Date(ValidityCreditGuarantee),
			"cr6fc_nameofceo": NameOfCEO,
			"cr6fc_contactceo": ContactCEO,
			"cr6fc_mobileceo": MobileCEO,
			"cr6fc_emailidceo": EmailIDCEO,
			"cr6fc_customerid": CustomerID,
			"cr6fc_lendingassesmenttool": LendingAssesmentTool,
			"cr6fc_typeoffacility": TypeofFacility,
			"PurposeOftheCreditFacility": '' + PurposeOftheCreditFacility,
			"cr6fc_accountno": AccountNo,
			"cr6fc_sanctionedamount": SanctionedAmount,
			"cr6fc_dateofsanction": new Date(DateOfSanction),
			"cr6fc_enddateofinterestmoratium": new Date(EndDateOfInterestMoratium),
			"cr6fc_enddateofprinciplemoratium": new Date(EndDateOfPrincipleMoratium),
			"cr6fc_duedateoflastinstallment": new Date(DueDateOfLastInstallment),
			"cr6fc_interestrate": InterestRate,
			"cr6fc_creditfacilityfundagriinfra": CreditFacilityFundAgriInfra,
			"cr6fc_loanfullydisbured": LoanFullyDisbured,
			"cr6fc_outstandingamountondate": OutstandingAmountOnDate,
			// "AccountNoLimitDetail": AccountNoLimitDetail,
			// "SanctionedAmountWCDetail": SanctionedAmountWCDetail,
			// "SanctionedDate": new Date(SanctionedDate),
			"cr6fc_drawingpower": DrawingPower,
			"cr6fc_enddateofmoratium": new Date(EndDateOfMoratium),
			"cr6fc_validityenddate": new Date(ValidityEndDate),
			"InterestRateDetail": InterestRateDetail,
			"FullyLoanDisbursed": FullyLoanDisbursed,
			"CCOutstandingAmountOnDate": CCOutstandingAmountOnDate,
			//"TermLoanCreditFacility":TermLoanCreditFacility,
			"cr6fc_projectcostinput": ProjectCostInput,
			"cr6fc_projectcostmarketing": ProjectCostMarketing,
			"cr6fc_projectcostprocessing": ProjectCostProcessing,
			"cr6fc_projectcostother": ProjectCostOther,
			"cr6fc_projectcosttotal": ProjectCostTotal,
			"cr6fc_meansoffinanacetermloan": MeansOfFinanaceTermLoan,
			"cr6fc_promoterequitymargin": PromoterEquityMargin,
			"cr6fc_unsecuredloan": UNsecuredLoan,
			"cr6fc_anyothersources": AnyOtherSource,
			// "PurposeOfCreditFacility": PurposeOfCreditFacility,
			"cr6fc_typeofsecurity": TypeOfSecurity,
			"cr6fc_natureofsecurity": NatureOfSecurity,
			"cr6fc_valueofsecurity": ValueOfSecurity,
			// "NameOfAuthorisedSignatory": NameOfAuthorisedSignatory,
			//"ELIDesignation":ELIDesignation,
			"cr6fc_nameoflendinginstitution": NameOfLendingInstitution,
			//"ELIDate":new Date(ELIDate),
			//"CGIssued":CGIssued,
			// "ExistingCF":ExistingCF,
			"cr6fc_collateralsecurity": CollateralSecurity,
			"cr6fc_elimakerremark": txtELIMakerRemark,
			// "FPOStateId": parseInt(FPOState)
		});

	$.ajax({
		url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CGApplications')/getItemByStringId('" + vItemID + "')",
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

		success: function (success) {
			console.log(success);
			if (status == "Submitted") {
				alert('Request Send for Approval Your CGApplication No. is:-' + vtitle)

			}
			else {
				alert('Request Save Successfully.Your CGApplication No. is:-' + vtitle)
			}
			window.location.href = "https://nabardmumbai.sharepoint.com/sites/FPOCGPortal/SitePages/ELICheckerDashBoardCGApp.aspx";
		},
		error: function (error) {
			console.log(error);
			//alert('Some error occured. Please try again later.');
			alert('Some error occured while adding data in CGApplication list. Please try again later.');
			console.log(error);
		}


	});


}
