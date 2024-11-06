var loggedInUserId = '';
var loggedInUserName = '';
var loggedInUserEmail = '';

$(document).ready(function () {
	loggedInUserId = $('#fpo-user-contact-id').val();
	loggedInUserName = $('#fpo-user-contact-name').val();
	loggedInUserEmail = $('#fpo-user-email').val();

	$('title').text('APPLICATION');

	BindFPOActivitiesNew();
	BindRegion();
	BindFPOState();
	BindBusinessFPOcity();
	BindBusinessFPOState();
	BindELIMaker()
	//BindELICheckerMaker();

	//$.getScript( _spPageContextInfo.webAbsoluteUrl+"/SiteAssets/NEWJS/fSelect.js", function( ) {
	 $('#PurposeOftheCreditFacility').fSelect();
	 $('#FPOActivities').fSelect();


	//});

	/*$.getScript( _spPageContextInfo.webAbsoluteUrl+"/SiteAssets/NEWJS/fSelect.js", function( ) {
   $('#FPOActivities').fSelect();
			   

   
   
 });*/


	//$('#').fSelect();
	var TotalValue = '';
	var TotalValue12 = '';


	var today = new Date();
	var dd1 = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0');
	var yyyy = today.getFullYear();

	today = yyyy + '-' + mm + '-' + dd1;
	$('#DateOfRegistration').attr('max', today);
	$('#DateOfRegistration').attr('max', today);

	/*var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0');
	var yyyy = today.getFullYear();

	today = yyyy + '-' + mm + '-' + dd;*/
	$('#ValidityCreditGuarantee').attr('min', today);

	var today = new Date();
	var newdt = today.setDate(today.getDate() + 1);
	newdt = new Date(newdt);
	var dd = String(newdt.getDate()).padStart(2, '0');
	var mm = String(newdt.getMonth() + 1).padStart(2, '0');
	var yyyy = newdt.getFullYear();

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
	});

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
	$("#TypeofFacility").change(function () {
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
	window.location.href = location.origin+"/DashboardCGApp/";
}

 
function BindFPOActivitiesNew() {
	//var requestUri = location.origin+"/_api/cr6fc_fpoactivitiesmasters?$select=cr6fc_fpoactivity"; comment 9 16 24
	var requestUri = location.origin+"/_api/cr6fc_fpoactivitiesmasters?$select=cr6fc_fpoactivity";

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
						// FPOActivities.options[FPOActivities.options.length] = new Option(items[i].cr6fc_fpoactivity, items[i].cr6fc_fpoactivitiesmasterid);
						//FPOActivities.options[FPOActivities.options.length] = new Option(items[i].cr6fc_fpoactivity, i+1); comm 9 16 24
						FPOActivities.options[FPOActivities.options.length] = new Option(items[i].cr6fc_fpoactivity, i+1);
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
	//var requestUri = location.origin+"/_api/cr6fc_regionmasters?$select=cr6fc_name,cr6fc_regionmasterid"; comment 9 16 24
	var requestUri = location.origin+"/_api/cr6fc_regionmasters?$select=cr6fc_name";
	

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
			 items.splice(2,1);
			try {
				if (items.length > 0) {
					var RegionOfFPO = document.getElementById("RegionOfFPO");
					RegionOfFPO.options.length = 0;
					RegionOfFPO.options[RegionOfFPO.options.length] = new Option("Select", "0");
					for (var i = 0; i < items.length; i++) {
						//RegionOfFPO.options[RegionOfFPO.options.length] = new Option(items[i].cr6fc_name, items[i].cr6fc_regionmasterid); comted 9 16 24
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
	//var requestUri = location.origin+"/_api/cr6fc_statemasters?$select=cr6fc_statemasterid,cr6fc_name"; comment 9 16 24
	var requestUri = location.origin+"/_api/cr6fc_statemasters?$select=cr6fc_name,cr6fc_statemasterid";
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
			 LoggFPOState.splice(2,1);
			try {
				if (LoggFPOState.length > 0) {
					var FPOState = document.getElementById("FPOState");
					FPOState.options.length = 0;
					FPOState.options[FPOState.options.length] = new Option("Select", "0");
					for (var i = 0; i < LoggFPOState.length; i++) {
						//FPOState.options[FPOState.options.length] = new Option(LoggFPOState[i].cr6fc_name, LoggFPOState[i].cr6fc_statemasterid); comm 9 16 24
						FPOState.options[FPOState.options.length] = new Option(LoggFPOState[i].cr6fc_name, LoggFPOState[i].cr6fc_statemasterid)
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

function BindBusinessFPOcity() {
	//var requestUri = location.origin+"/_api/cr6fc_citymasters?$select=cr6fc_name,cr6fc_citymasterid"; comment 9 16 24
	var requestUri = location.origin+"/_api/cr6fc_citymasters?$select=cr6fc_name,cr6fc_citymasterid";
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
				if (Logg.length > 0) {
					var BusinessFPOcity = document.getElementById("BusinessFPOcity");
					BusinessFPOcity.options.length = 0;
					BusinessFPOcity.options[BusinessFPOcity.options.length] = new Option("Select", "0");
					for (var i = 0; i < Logg.length; i++) {
						//BusinessFPOcity.options[BusinessFPOcity.options.length] = new Option(Logg[i].cr6fc_name, Logg[i].cr6fc_citymasterid); commnt 9 16 24
						BusinessFPOcity.options[BusinessFPOcity.options.length] = new Option(Logg[i].cr6fc_name, Logg[i].cr6fc_citymasterid);
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
	//var requestUri = location.origin+"/_api/cr6fc_statemasters?$select=cr6fc_name,cr6fc_statemasterid"; comment on 9 16 24
	var requestUri = location.origin+"/_api/cr6fc_statemasters?$select=cr6fc_name,cr6fc_statemasterid";
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
				if (Logg.length > 0) {
					var BusinessFPOState = document.getElementById("BusinessFPOState");
					BusinessFPOState.options.length = 0;
					BusinessFPOState.options[BusinessFPOState.options.length] = new Option("Select", "0");
					for (var i = 0; i < Logg.length; i++) {
						//BusinessFPOState.options[BusinessFPOState.options.length] = new Option(Logg[i].cr6fc_name, Logg[i].cr6fc_statemasterid); comm 9 16 24
						BusinessFPOState.options[BusinessFPOState.options.length] = new Option(Logg[i].cr6fc_name, Logg[i].cr6fc_statemasterid);
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
var LoggChecker;
function BindELICheckerMaker() {
	//var requestUri = location.origin+"/_api/cr6fc_elimasters?$select=*" comment 9 16 24
	var requestUri = location.origin+"/_api/cr6fc_elimasters?$select=*"
	// var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EILMakerChecker')//items?$top=500&$select=*,EILMaker/Id,EILChecker/Id,ID&$expand=EILChecker,EILMaker&$filter=EILMaker/Id eq '"+_spPageContextInfo.userId+"' &$orderby=ID asc";
	var requestHeaders = { "accept": "application/json;odata=verbose" };
	$.ajax({
		url: requestUri,
		contentType: "application/json;odata=verbose",
		headers: requestHeaders,
		async: false,
		cache: false,
		success: function (data) {
			LoggChecker = data.value;
		},
		error: function () {
			console.log("error");
		}
	});
}

var LoggELIMaker;
function BindELIMaker() {
	//var requestUri = location.origin+"/_api/cr6fc_elimasters?$select=cr6fc_emailid,cr6fc_lendinginstitute,cr6fc_elicheckeremailid&$filter=cr6fc_emailid eq '" + loggedInUserEmail + "'"; commente 9 16 24
	var requestUri = location.origin+"/_api/cr6fc_elimasters?$select=cr6fc_emailid,cr6fc_lendinginstitute,cr6fc_elicheckeremailid&$filter=cr6fc_emailid eq '" + loggedInUserEmail + "'";
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
				//$('#NameOfLendingInstitution').val(LoggELIMaker[0].cr6fc_lendinginstitute); comm 9 16 24
				//$('#ELICheckerEmail').val(LoggELIMaker[0].cr6fc_elicheckeremailid); comm 9 16 24
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


function GetCounter() {
	var vRetVal = '';
	var hdnCounter = '';
	// var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CounterMaster')//items?$top=500&$select=CGApplicationNo,ID,Title&$filter=Title eq 'CGApplication'&$orderby=CGApplicationNo desc";
	//var requestUri = location.origin+"/_api/cr6fc_countermasters?$top=500&$select=cr6fc_name,cr6fc_cgapplicationno,cr6fc_countermasterid&$filter=cr6fc_name eq 'CGApplication'"; comment 9 16 24
	var requestUri = location.origin+"/_api/cr6fc_countermasters?$top=500&$select=cr6fc_name,cr6fc_cgapplicationno,cr6fc_countermasterid&$filter=cr6fc_name eq 'CGApplication'";
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

				if (Logg.length > 0) {
					//var ItemId = Logg[0].cr6fc_cgapplicationno; comm 9 16 24
                    var ItemId = Logg[0].cr6fc_cgapplicationno;
					hdnCounter = parseInt(ItemId) + 1;
					vRetVal = 'CGAFPO' + dd + '' + calmonth + '' + yyyy + '000' + hdnCounter;
					document.getElementById("hdnDigitalRequestNo").value = vRetVal;
					/*document.getElementById("hdnCounterItemID").value = Logg[0].cr6fc_cgapplicationno;
					document.getElementById("hdnCounterItemID1").value = Logg[0].cr6fc_countermasterid; comm 9 16 24*/

					document.getElementById("hdnCounterItemID").value = Logg[0].cr6fc_cgapplicationno;
					document.getElementById("hdnCounterItemID1").value = Logg[0].cr6fc_countermasterid;

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
	//$('#MeansOfFinanaceTermLoan').text(MeansOfFinanaceTermLoan);
	var MeansOfFinanaceTermLoan = $('#MeansOfFinanaceTermLoan').text();
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
	/*if(MeansOfFinanaceTermLoan!='NaN' || PromoterEquityMargin!='NaN' ||  UNsecuredLoan!='NaN' || AnyOtherSource!='NaN'){
	}*/
	TotalValue = parseInt(MeansOfFinanaceTermLoan) + parseInt(PromoterEquityMargin) + parseInt(UNsecuredLoan) + parseInt(AnyOtherSource);

	$('#totalAmountvalue').text(TotalValue);
	$('#totalAmountvalue').val(TotalValue);

}
function TotalamountWC() {
	//$('#MeansOfFinanaceTermLoan').text(MeansOfFinanaceTermLoan);
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
	/*if(MeansOfFinanaceTermLoan!='NaN' || PromoterEquityMargin!='NaN' ||  UNsecuredLoan!='NaN' || AnyOtherSource!='NaN'){
	}*/
	TotalValue12 = parseInt(MeansOfFinanaceTermLoan) + parseInt(PromoterEquityMargin) + parseInt(UNsecuredLoan) + parseInt(AnyOtherSource);

	$('#totalAmountvalue1').text(TotalValue12);
	$('#totalAmountvalue1').val(TotalValue12);

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


var vTitle;
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


function bindTermLoan() {
	var totalcapi = 0;
	var SanctionedAmount = $("#SanctionedAmountWCDetail").val();
	totalcapi = SanctionedAmount



	$('#MeansOfFinanaceTermLoan1').text(totalcapi);
	$('#MeansOfFinanaceTermLoan1').val(totalcapi);
	$("#totalAmountvalue1").text(totalcapi);
	$("#totalAmountvalue1").val(totalcapi);

}
function calval() {
	var totalcapi = 0;
	var SanctionedAmount = $("#SanctionedAmount").val();
	totalcapi = SanctionedAmount



	$('#MeansOfFinanaceTermLoan').text(totalcapi);
	$('#MeansOfFinanaceTermLoan').val(totalcapi);
	$("#totalAmountvalue").text(totalcapi);
	$("#totalAmountvalue").val(totalcapi);
}

var ELIChecker;
function SubmitData(status) {

	var txtApplicantName = $("#txtApplicantName").val();	
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
	if ((PANFPO == "" || PANFPO == undefined)) {
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
	if (GSTINFPO != "" && GSTINFPO != null && status == "Submitted") {
		if (GSTINFPO.length != 15) {
			alert('Please Enter Valid GSTIN Number')
			return false;
		}
	}
	var FPOActivities = $("#FPOActivities").val();
	if ((FPOActivities == "Select" || FPOActivities == undefined || FPOActivities == "0") && status == "Submitted") {
		alert('Please Enter Business of FPO/Present Status of FPO Activities')
		return false;
	}
	else if((FPOActivities == "Select" || FPOActivities == undefined || FPOActivities == "0")){FPOActivities = '0'}
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
    var ForwardLinkageFPO = $("#ForwardLinkageFPO").val();
	if ((ForwardLinkageFPO == "" || ForwardLinkageFPO == undefined) && status == "Submitted") {
		alert('Please Enter Forward Linkage Developed by FPO ')
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
	else{
		if(FPOPincode.length!=6 && status == "Submitted"){alert("Please Enter the valid Pincode")
   return false;
}}
	var FPODistrict = $("#FPODistrict").val();
	if ((FPODistrict == "" || FPODistrict == undefined) && status == "Submitted") {
		alert('Please Enter District')
		return false;
	}


	var FPOState = $("#FPOState option:selected").val();
	if ((FPOState == 0 || FPOState == undefined || FPOState == "0") && status == "Submitted") {
		alert('Please Enter State')
		return false;
	}
	else if(FPOState == "Select" || FPOState == undefined || FPOState == "0"){FPOState = "3db5e9b6-8300-ef11-9f89-6045bde85ebe"}
	var GeoLatituteLocation = $("#GeoLatituteLocation").val();

	var GeoLongituteLocation = $("#GeoLongituteLocation").val();
	 var BusinessAddress = $("#BusinessAddress option:selected").val();
	if ((BusinessAddress == 0 || BusinessAddress == undefined) && status == "Submitted") {
		alert('Please Enter Business Address of the FPO is same as the Registered Address')
		return false;
	}
	if (BusinessAddress == "2") {


		var BusinessAddressFPO = $("#BusinessAddressFPO").val();
		if ((BusinessAddressFPO == "" || BusinessAddressFPO == undefined) && status == "Submitted") {
			alert('Please Enter BusinessAddress')
			return false;
		}
		var BusinessFPOcity = $("#BusinessFPOcity").val();
		if ((BusinessFPOcity == "Select" || BusinessFPOcity == undefined || BusinessFPOcity == "") && status == "Submitted") {
			alert('Please Enter City')
			return false;
		}

		var BusinessFPOPincode = $("#BusinessFPOPincode").val();
		if ((BusinessFPOPincode == "" || BusinessFPOPincode == undefined) && status == "Submitted") {
			alert('Please Enter Business Pincode')
			return false;
		}
		else if (BusinessFPOPincode.length!=6 && status == "Submitted"){
			alert("Please Enter Valid Business Pincode");
			return false;
		}

		var BusinessFPODistrict = $("#BusinessFPODistrict").val();
		if ((BusinessFPODistrict == "" || BusinessFPODistrict == undefined) && status == "Submitted") {
			alert('Please Enter District')
			return false;
		}

		var BusinessFPOState = $("#BusinessFPOState option:selected").val();

		if ((BusinessFPOState ==0|| BusinessFPOState == undefined) && status == "Submitted") {
			alert('Please Enter State')
			return false;
		}
		else if((BusinessFPOState == 0 || BusinessFPOState == undefined)){BusinessFPOState == '3db5e9b6-8300-ef11-9f89-6045bde85ebe'}





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

	
	var RegionOfFPO = $("#RegionOfFPO").val();
	if ((RegionOfFPO == 0 || RegionOfFPO == undefined || RegionOfFPO == '0') && status == "Submitted") {
		alert('Please Enter Region Of FPO ')
		return false;
	}
	else if ((RegionOfFPO == "Select" || RegionOfFPO == undefined || RegionOfFPO == '0'))
	{RegionOfFPO = "7642dd3f-7900-ef11-9f89-6045bdaea3a2"}
	var TotalFPOMember = $("#TotalFPOMember option:selected").val();
	if(TotalFPOMember=="Select")
	{
		TotalFPOMember="0";
	}
	if (RegionOfFPO == "093da606-21e9-ee11-a203-6045bdac6483" && status == "Submitted") {
		if (TotalFPOMember == 0 || TotalFPOMember == undefined) {
			alert('Please Enter Total Number of Members of the FPO in Plains')
			return false;
		}
	}
	
	var TotalMemberNorthen = $("#TotalMemberNorthen").val();
	if(TotalMemberNorthen=="Select")
	{
		TotalMemberNorthen="0";
	}
	if (RegionOfFPO == "5ccaef08-21e9-ee11-a203-6045bdaaab4d" && status == "Submitted") {
		if (TotalMemberNorthen == 0 || TotalMemberNorthen == undefined) {
			alert('Please Enter Total Number of Members of the FPO in North Eastern or Hilly Areas')
			return false;
		}
	}
	var NoOfLandlessFarmer = $("#NoOfLandlessFarmer").val();
	if ((NoOfLandlessFarmer == "" || NoOfLandlessFarmer == undefined) && status == "Submitted") {
		alert('Please Enter No. of Landless Tenant Farmer Members')
		return false;
	}
	var NoOfSmallFarmer = $("#NoOfSmallFarmer").val();
	if ((NoOfSmallFarmer == "" || NoOfSmallFarmer == undefined) && status == "Submitted") {
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

	var NewFPO = $("#NewFPO option:selected").val();
	if ((NewFPO == 0 || NewFPO == undefined) && status == "Submitted") {
		alert('Please Enter New/Existing FPO')
		return false;
	}
	var FPOAvailedGOIScheme = $("#FPOAvailedGOIScheme option:selected").val();
	if ((FPOAvailedGOIScheme == 0 || FPOAvailedGOIScheme == undefined) && status == "Submitted") {
		alert('Please Enter Scheme of Government of India')
		return false;
	}
	else if(FPOAvailedGOIScheme == "Select" || FPOAvailedGOIScheme == undefined){FPOAvailedGOIScheme='0'}
	var CGPAN = $("#CGPAN").val();

	if (FPOAvailedGOIScheme == "1" && status == "Submitted") {
		if ((CGPAN == "" || CGPAN == undefined) && status == "Submitted") {
			alert('Please Enter CGPAN')
			return false;
		}
	}
	var existingCreditFacility = $("#existingCF option:selected").val();
	
	var TotalSanctionedAmount = $("#TotalSanctionedAmount").val();
	if (FPOAvailedGOIScheme == "1" && status == "Submitted") {
		if (TotalSanctionedAmount == "" || TotalSanctionedAmount == undefined) {
			alert('Please Enter Total Sanctioned Amount')
			return false;
		}
	}
	var TypeOfCreditFacility = $("#TypeOfCreditFacility option:selected").val();
	if (FPOAvailedGOIScheme == "1" && status == "Submitted") {
		if (TypeOfCreditFacility == 0 || TypeOfCreditFacility == undefined) {
			alert('Please Enter Type Of Credit Facility')
			return false;
		}
	}
	var ValidityCreditGuarantee = $("#ValidityCreditGuarantee").val();
	if (FPOAvailedGOIScheme == "1" && status == "Submitted") {
		if (ValidityCreditGuarantee == "" || ValidityCreditGuarantee == undefined) {
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
	else {
		var regex = /^\d*(?:\.\d{1,2})?$/;
		if (!regex.test(MobileCEO) && status == "Submitted") {
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
	else {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (!regex.test(EmailIDCEO) && status == "Submitted") {
			alert('Please Enter Valid Email ID')

			return false;
		}

	}

	//var CustomerID = $("#CustomerID").val();
	var CustomerID = document.getElementById('CustomerID').value ;
	if ((CustomerID == "" || CustomerID == undefined) && status == "Submitted") {
		alert('Please Enter Customer ID')
		return false;
	}
	
	var LendingAssesmentTool = $("#LendingAssesmentTool").val();
	if ((LendingAssesmentTool == 0 || LendingAssesmentTool == undefined) && status == "Submitted") {
		alert('Please Enter Lending Assesment Tool used by the Lending Institution to Determine FPOs Eligibilty for Lending')
		return false;
	}
    else if (LendingAssesmentTool == 0 || LendingAssesmentTool == undefined ||LendingAssesmentTool=='0' )
	   {LendingAssesmentTool ="0"}

	

	var FPOActivities = $("#FPOActivities").val();
	if (FPOActivities == null && status == "Submitted") {
		alert('Please Select FPO Activity ');
		return false;
	}
	else if(FPOActivities == null){FPOActivities = '0'}
	/*if (FPOActivities != null && status == "Submitted") {
		for (var d = 0; d < FPOActivities.length; d++) {

			objFPOActivity.results.push(FPOActivities[d]);
		}
	}*/

	var TypeofFacility = $("#TypeofFacility").val();
	if ((TypeofFacility == 0 || TypeofFacility == undefined) && status == "Submitted") {
		alert('Please Enter Type of Facility')
		return false;
	}



	
	var PurposeOftheCreditFacility = $('#PurposeOftheCreditFacility').val();
	if (PurposeOftheCreditFacility == null && status == "Submitted") {
		alert('Please Select Purpose of Credit Facility ');
		return false;
	}
	else if(PurposeOftheCreditFacility == null){PurposeOftheCreditFacility = '0'}
	/*if (PurposeOftheCreditFacility != null && status == "Submitted") {
		for (var d = 0; d < PurposeOftheCreditFacility.length; d++) {

			//var abc = getUserByEmail(filteredDD[0].EMail);
			objFPOActivitypresentstatus.results.push(PurposeOftheCreditFacility[d]);
		}
	}*/


	var creditFacilityUtilised = $("#CreditFacilityUtilised option:selected").val();
	if ((creditFacilityUtilised == "Select" || creditFacilityUtilised == undefined) && status == "Submitted") {
		alert('Please Select Credit facility Ulitised')
		return false;
	}

	var AccountNo = $("#AccountNo").val();
	if (TypeofFacility == "1" && status == "Submitted") {
		if (AccountNo == "" || AccountNo == undefined) {
			alert('Please Enter  Account No')
			return false;
		}
	}
	var SanctionedAmount = $("#SanctionedAmount").val();
	if (TypeofFacility == "1" && status == "Submitted") {
		if (SanctionedAmount == "" || SanctionedAmount == undefined) {
			alert('Please Enter Sanctioned Amount(Rs)')
			return false;
		}
	}
	var DateOfSanction = $("#DateOfSanction").val();
	if (TypeofFacility == "1" && status == "Submitted") {
		if (DateOfSanction == "" || DateOfSanction == undefined) {
			alert('Please Enter Date Of Sanction')
			return false;
		}
	}
	var EndDateOfInterestMoratium = $("#EndDateOfInterestMoratium").val();
	var EndDateOfPrincipleMoratium = $("#EndDateOfPrincipleMoratium").val();
	if (TypeofFacility == "1" && status == "Submitted") {
		if (EndDateOfInterestMoratium != "" && EndDateOfInterestMoratium != null && EndDateOfInterestMoratium != undefined) {
			if (EndDateOfInterestMoratium < DateOfSanction) {
				alert('End Date Of Interest Moratium  cannot be greater than Sanction date')
				return false;
			}
		}
		if (EndDateOfPrincipleMoratium != "" && EndDateOfPrincipleMoratium != null && EndDateOfPrincipleMoratium != undefined) {
			if (EndDateOfPrincipleMoratium < DateOfSanction) {
				alert('End Date Of Principle Moratium  cannot be greater than Sanction date')
				return false;
			}
		}
	}
	var DueDateOfLastInstallment = $("#DueDateOfLastInstallment").val();
	var todayvalue = new Date();


	if (TypeofFacility == "1" && status == "Submitted") {
		if (DueDateOfLastInstallment != "" && DueDateOfLastInstallment != null && DueDateOfLastInstallment != undefined) {
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
	var CreditFacilityFundAgriInfra = $("#CreditFacilityFundAgriInfra option:selected").val();
	if (TypeofFacility == "1" && status == "Submitted") {
		if (CreditFacilityFundAgriInfra == 0 || CreditFacilityFundAgriInfra == undefined) {
			alert('Please Enter Credit Facility Agriculture Infrastructure Fund')
			return false;
		}
	}

	var OutstandingAmountOnDate = $("#OutstandingAmountOnDate").val();
	if (TypeofFacility == "1" && status == "Submitted") {

		if (OutstandingAmountOnDate == "" || OutstandingAmountOnDate == undefined) {
			alert('Please Enter Outstanding Amount On Date(Rs.)')
			return false;
		}
		if (parseInt(SanctionedAmount) < parseInt(OutstandingAmountOnDate)) {
			alert('Outstanding Amount On Date Should not be greater than Sanction Amount')
			return false;

		}
	}

	if (TypeofFacility == "1") {
		var LoanFullyDisbured = $("#LoanFullyDisbured").val();
		if ((LoanFullyDisbured == 0 || LoanFullyDisbured == undefined) && status == "Submitted") {
			alert('Please Enter Loan Fully Disbured')
			return false;
		}
	}

	if (TypeofFacility == "2") {
		var AccountNo = $("#AccountNoLimitDetail").val();
		if ((AccountNo == "" || AccountNo == undefined) && status == "Submitted") {
			alert('Please Enter Account No')
			return false;
		}
	}

	if (TypeofFacility == "2") {
		var SanctionedAmount = $("#SanctionedAmountWCDetail").val();
		if ((SanctionedAmount == "" || SanctionedAmount == undefined) && status == "Submitted") {
			alert('Please Enter Sanctioned Amount (Rs.)')
			return false;
		}
	}

	if (TypeofFacility == "2") {
		var DateOfSanction = $("#SanctionedDate").val();
		if ((DateOfSanction == "" || DateOfSanction == undefined) && status == "Submitted") {
			alert('Please Enter Sanction Date')
			return false;
		}

		var InterestRate = $("#InterestRateDetail").val();

		if ((InterestRate == "" || InterestRate == undefined) && status == "Submitted") {
			alert('Please Enter Interest Rate (%)')
			return false;
		}
		var LoanFullyDisbured = $("#FullyLoanDisbursed").val();

	}
	var DrawingPower = $("#DrawingPower").val();

	var EndDateOfMoratium = $("#EndDateOfMoratium").val();
	var ValidityEndDate = $("#ValidityEndDate").val();
	if (TypeofFacility == "2" && status == "Submitted") {
		if (EndDateOfMoratium != "" && EndDateOfMoratium != null && EndDateOfMoratium != undefined) {
			if (EndDateOfMoratium < DateOfSanction) {
				alert('End Date Of Moratium  cannot be greater than Sanction date')
				return false;
			}
		}

		if (ValidityEndDate != "" && ValidityEndDate != null && ValidityEndDate != undefined) {
			if (ValidityEndDate < DateOfSanction) {
				alert('Validity End Date   cannot be greater than Sanction date')
				return false;
			}
		}
	}
	if (TypeofFacility == "2") {

		var OutstandingAmountOnDate = $("#CCOutstandingAmountOnDate").val();
		if ((OutstandingAmountOnDate == "" || OutstandingAmountOnDate == undefined) && status == "Submitted") {
			alert('Please Enter CC Outstanding Amount On Date(Rs.)')
			return false;
		}

		if ((parseInt(SanctionedAmount) < parseInt(OutstandingAmountOnDate)) && status == "Submitted") {
			alert('Outstanding Amount On Date Should not be greater than Sanction Amount')
			return false;

		}

		if ((LoanFullyDisbured == "Select" || LoanFullyDisbured == undefined) && status == "Submitted") {
			alert('Please Enter Has the Limit been Availed?')
			return false;
		}


	}

	var MeansOfFinanaceTermLoan = $("#MeansOfFinanaceTermLoan").val();
	if (TypeofFacility == "1" && status == "Submitted") {
		if (MeansOfFinanaceTermLoan == "" || MeansOfFinanaceTermLoan == undefined) {
			alert('Please Enter Term Loan (Rs.)')
			return false;
		}
	}
	var PromoterEquityMargin = $("#PromoterEquityMargin").val();
	if (TypeofFacility == "1" && status == "Submitted") {
		if (PromoterEquityMargin == "" || PromoterEquityMargin == undefined) {
			alert('Please Enter Promoters Equity/Margin (Rs.)')
			return false;
		}
	}
	var UNsecuredLoan = $("#UNsecuredLoan").val();
	if (TypeofFacility == "1" && status == "Submitted") {
		if (UNsecuredLoan == "" || UNsecuredLoan == undefined) {
			alert('Please Enter Unsecured Loan (Rs.)')
			return false;
		}
	}
	var AnyOtherSource = $("#AnyOtherSource").val();
	if (TypeofFacility == "1" && status == "Submitted") {
		if (AnyOtherSource == "" || AnyOtherSource == undefined) {
			alert('Please Enter Any Other Source (Rs.)')
			return false;
		}
	}
	if (TypeofFacility == "2") {
		var MeansOfFinanaceTermLoan = $("#MeansOfFinanaceTermLoan1").val();
		if ((MeansOfFinanaceTermLoan == "" || MeansOfFinanaceTermLoan == undefined) && status == "Submitted") {
			alert('Please Enter WC/CC Limit (Rs.)')
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
		return false
	}

	var ProjectCostTotal = $("#ProjectCostTotal").val();
	var TotalValue = $("#totalAmountvalue").val();
	if (TypeofFacility == "1" && status == "Submitted") {

		if (TotalValue != ProjectCostTotal) {
			alert('Project Cost should match Means of Finance')
			return false;
		}
	}

	if (TypeofFacility == "2") {



		var TotalValue = $("#totalAmountvalue1").val();

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
	if ((NatureOfSecurity == 0 || NatureOfSecurity == undefined) && status == "Submitted") {
		alert('Please Enter Nature Of Security')
		return false;
	}

	var ValueOfSecurity = $("#ValueOfSecurity").val();
	if ((ValueOfSecurity == "" || ValueOfSecurity == undefined) && status == "Submitted") {
		alert('Please Enter Value Of Security')
		return false;
	}

	var CollateralSecurity = $("#CollateralSecurity").val();

	if ((CollateralSecurity == 0 || CollateralSecurity == undefined) && status == "Submitted") {
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
		vTitle = GetCounter();
	var NameOfLendingInstitution = $("#NameOfLendingInstitution").val();
	if ((NameOfLendingInstitution == "" || NameOfLendingInstitution == undefined) && status == "Submitted") {
		alert('Please Enter Name Of Lending Institution')
		return false;
	}

	var ELICheckerEmail = $('#ELICheckerEmail').val();
	var EILchecker;
	if (ELICheckerEmail != null && ELICheckerEmail != undefined && ELICheckerEmail != '') {
		//EILchecker=checker[0].EILCheckerId;
		EILchecker = GetUserId1(ELICheckerEmail);
	}

	if (EILchecker == -1) {
		alert('There is no valid EIL Checker against this Lending Institute')
		return false;
	}

	if (EILchecker == 0) {
		alert('There is no EIL Checker against this Lending Institute')
		return false;
	}
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

	if (DateOfSanction !== '' && DateOfSanction !== undefined) {
		DateOfSanction = new Date(DateOfSanction);
	}
	else {
		DateOfSanction = null;
	}

	var txtmakerComment = $('#txtmakerComment').val();
	var txtELIMakerRemark = '';
	if (txtmakerComment != '' && txtmakerComment != undefined && txtmakerComment != '') {
		txtELIMakerRemark = "<b>Comment </b>:- " + txtmakerComment + " - " + GetCurrentDataToday() + "\n\n";
	}

	var FPORegion=null;
	if(RegionOfFPO!==null && RegionOfFPO!=="0" && RegionOfFPO!==undefined)
	{
		//FPORegion="/cr6fc_regionmasters(" + RegionOfFPO + ")"; comm 9 16 24
		FPORegion="/cr6fc_regionmasters(" + RegionOfFPO +")";
	 }
	$('#btnSave').prop('disabled', true);
	$('#btn1').prop('disabled', true);

	if(BusinessAddress == "2")
	{
		var data = JSON.stringify(
			{
	
				//"cr6fc_name": vTitle, comm 9 16 24
				"cr6fc_name": vTitle,
				//"cr6fc_ELIChecker_contact@odata.bind": "/contacts(" + EILchecker + ")", com,mented on 9 16 24
				"cr6fc_ELIChecker_contact@odata.bind":"/contacts(" +  EILchecker + ")",
				//"cr6fc_eilcheckeremailid": ELICheckerEmail, comm 9 16 24
				"cr6fc_elicheckeremailid": ELICheckerEmail,
				//"cr6fc_elimakeremailid": loggedInUserEmail, comm 9 16 24
				"cr6fc_elimakeremailid": loggedInUserEmail,
				//"cr6fc_elimakerremark": txtELIMakerRemark, comm 9 16 24
				"cr6fc_elimakerremark": txtELIMakerRemark,
				//"cr6fc_nameoffpo": txtNameOfFPO, COMM 9 16 24
				"cr6fc_nameoffpo":txtNameOfFPO,
				//"cr6fc_constitutionfpo": ConstitutionFPO, COMM 9 16 24
				"cr6fc_constitutionfpo": ConstitutionFPO,
				//"cr6fc_fpoacts": FPOActs, COMM 9 16 24
				"cr6fc_fpoacts":FPOActs,
				//"cr6fc_dateofregistration": DateOfRegistration, COMM 9 16 24
				"cr6fc_dateofregistration": DateOfRegistration,
				//"cr6fc_placeofregistration": PlaceOfRegistration, comm 9 16 24
				"cr6fc_placeofregistration": PlaceOfRegistration,
				//"cr6fc_registrationno": RegistrationNo, comm 9 16 24
				"cr6fc_registrationno": RegistrationNo,
				//"cr6fc_panfpo": PANFPO, comm on 9 16 24
				"cr6fc_panfpo": PANFPO,
				//"cr6fc_tantinfpo": TANTINFPO, comm 9 16 24
				"cr6fc_tantinfpo": TANTINFPO,
				//"cr6fc_gstinfpo": GSTINFPO, comm 9 16 24
				"cr6fc_gstinfpo": GSTINFPO,
				//"cr6fc_fpoactivities111":''+FPOActivities, comm 9 16 24
				"cr6fc_fpoactivities111":''+FPOActivities,
				//"cr6fc_fpoagribusinessactivity": FPOAgriBusinessActivity, comm 9 16 24
				"cr6fc_fpoagribusinessactivity": FPOAgriBusinessActivity,
				//"cr6fc_forwardlinkagefpo": ForwardLinkageFPO, comm 9 16 24
				"cr6fc_forwardlinkagefpo": ForwardLinkageFPO,
				//"cr6fc_backwardlinkagefpo": BackwardLinkageFPO, comm 9 16 24
				"cr6fc_backwardlinkagefpo": BackwardLinkageFPO,
				//"cr6fc_RegionOfFPO@odata.bind": FPORegion, comm 9 16 24
				"cr6fc_RegionOfFPO@odata.bind": FPORegion,
				//"cr6fc_existingregisteredofficeaddress": ExistingRegisteredOfficeAddress, comm 9 16  24
				"cr6fc_existingregisteredofficeaddress": ExistingRegisteredOfficeAddress,
				//"cr6fc_fpodistrict": FPODistrict, comm 9 16 24
				"cr6fc_fpodistrict": FPODistrict,
				//"cr6fc_fpopincode": FPOPincode, comm 9 16 24
				"cr6fc_fpopincode": FPOPincode,
				//"cr6fc_geolatitutelocation": GeoLatituteLocation, comm 9 16 24
				"cr6fc_geolatitutelocation": GeoLatituteLocation,
				//"cr6fc_geolongitutelocation": GeoLongituteLocation, comm 9 16 24
				"cr6fc_geolongitutelocation": GeoLongituteLocation,
				//"cr6fc_businessaddresssameregiaddress": BusinessAddress, comm 9 16 24
				"cr6fc_businessaddresssameregiaddress": BusinessAddress,
				//"cr6fc_fpocity": FPOCity, comm 9 16 24
				"cr6fc_fpocity": FPOCity,
			//	"cr6fc_businessfpocity": BusinessFPOcity, comm 9 16 24
				"cr6fc_businessfpocity": BusinessFPOcity,
				//"cr6fc_businessaddressfpo": BusinessAddressFPO, comm 9 16 24
				"cr6fc_businessaddressfpo": BusinessAddressFPO,
				//"cr6fc_businessfpodistrict": BusinessFPODistrict, comm 9 16 24
				"cr6fc_businessfpodistrict": BusinessFPODistrict,
				//"cr6fc_totalfpomember": TotalFPOMember, comm 9 16 24
				"cr6fc_totalfpomember": TotalFPOMember,
				//"cr6fc_totalmembernorthen": TotalMemberNorthen, comm 9 16 24
				"cr6fc_totalmembernorthen": TotalMemberNorthen,
				//"cr6fc_nooflandlessfarmer": NoOfLandlessFarmer, comm 9 16 24
				"cr6fc_nooflandlessfarmer": NoOfLandlessFarmer,
				//"cr6fc_noofsmallfarmer": NoOfSmallFarmer, comm 9 16 24
				"cr6fc_noofsmallfarmer": NoOfSmallFarmer,
				//"cr6fc_noofmarginalfarmer": NoOfMarginalFarmer, comm 9 16 24
				"cr6fc_noofmarginalfarmer": NoOfMarginalFarmer,
				//"cr6fc_noofbigfarmer": NoOfBigFarmer, comm 9 16 24
				"cr6fc_noofbigfarmer": NoOfBigFarmer,
				//"cr6fc_farmermembersize": FarmerMemberSize, comm 9 16 24
				"cr6fc_farmermembersize": FarmerMemberSize,
				//"cr6fc_noofwomenfarmer": NoOfWomenFarmer comm 9 16 24
				"cr6fc_noofwomenfarmer": NoOfWomenFarmer,
				//"cr6fc_noofscfarmer": NoOfSCFarmer, comm 9 16 24
				"cr6fc_noofscfarmer": NoOfSCFarmer,
			//	"cr6fc_noofstfarmer": NoOfSTFarmer, comm 9 16 24
				"cr6fc_noofstfarmer": NoOfSTFarmer,
				//"cr6fc_BusinessFPOState@odata.bind": "/cr6fc_statemasters(" + BusinessFPOState + ")",
				"cr6fc_BusinessFPOState@odata.bind": "/cr6fc_statemasters(" + BusinessFPOState + ")",
				//"cr6fc_businessfpopincode": BusinessFPOPincode, comment 9 16 24
				"cr6fc_businessfpopincode": BusinessFPOPincode,
				//"cr6fc_geolatitutelocationfpo": GeoLatituteLocationFPO, comm 9 16 24
				"cr6fc_geolatitutelocationfpo": GeoLatituteLocationFPO,
				//"cr6fc_geolongitutelocationfpo": GeoLongituteLocationFPO, comm 9 16 24
				"cr6fc_geolongitutelocationfpo": GeoLongituteLocationFPO,
			//	"cr6fc_newfpo": NewFPO, comm 9 16 24
				"cr6fc_newfpo": NewFPO,
				//"cr6fc_fpoavailedgoischeme": FPOAvailedGOIScheme, comm 9 16 24
				"cr6fc_fpoavailedgoischeme": FPOAvailedGOIScheme,
				//"cr6fc_cgpan": CGPAN, comm 9 16 24
				"cr6fc_cgpan": CGPAN,
				"cr6fc_existingcf": existingCreditFacility,
				"cr6fc_totalsanctionedamount": TotalSanctionedAmount,
				"cr6fc_typeofcreditfacility": TypeOfCreditFacility,
				"cr6fc_validitycreditguarantee": ValidityCreditGuarantee,
				"cr6fc_nameofceo": NameOfCEO,
				"cr6fc_contactceo": ContactCEO,
				"cr6fc_mobileceo": MobileCEO,
				"cr6fc_emailidceo": EmailIDCEO,
				"cr6fc_customerid": CustomerID,
				"cr6fc_lendingassesmenttool": LendingAssesmentTool,
				"cr6fc_typeoffacility": TypeofFacility,
				 "cr6fc_purposeofcreditfacility":''+PurposeOftheCreditFacility,
				"cr6fc_accountno": AccountNo,
				"cr6fc_sanctionedamount": SanctionedAmount,
				"cr6fc_dateofsanction": DateOfSanction,
				"cr6fc_enddateofinterestmoratium": EndDateOfInterestMoratium,
				"cr6fc_enddateofprinciplemoratium": EndDateOfPrincipleMoratium,
				"cr6fc_duedateoflastinstallment": DueDateOfLastInstallment,
				"cr6fc_interestrate": InterestRate,
				"cr6fc_creditfacilityfundagriinfra": CreditFacilityFundAgriInfra,
				"cr6fc_loanfullydisbured": LoanFullyDisbured,
				"cr6fc_outstandingamountondate": OutstandingAmountOnDate,
				"cr6fc_drawingpower": DrawingPower,
				"cr6fc_enddateofmoratium": EndDateOfMoratium,
				"cr6fc_validityenddate": ValidityEndDate,
				"cr6fc_projectcostinput": ProjectCostInput,
				"cr6fc_projectcostmarketing": ProjectCostMarketing,
				"cr6fc_projectcostprocessing": ProjectCostProcessing,
				"cr6fc_projectcostother": ProjectCostOther,
				"cr6fc_projectcosttotal": ProjectCostTotal,
				"cr6fc_meansoffinanacetermloan": MeansOfFinanaceTermLoan,
				"cr6fc_promoterequitymargin": PromoterEquityMargin,
				"cr6fc_unsecuredloan": UNsecuredLoan,
				"cr6fc_anyothersources": AnyOtherSource,
				"cr6fc_typeofsecurity": TypeOfSecurity,
				"cr6fc_natureofsecurity": NatureOfSecurity,
				"cr6fc_valueofsecurity": ValueOfSecurity,
				"cr6fc_nameoflendinginstitution": NameOfLendingInstitution,
				"cr6fc_totalamount": TotalValue,
				"cr6fc_status": SubStatus,
				"cr6fc_FPOState@odata.bind": "/cr6fc_statemasters(" + FPOState + ")",
				"cr6fc_collateralsecurity": CollateralSecurity,
				"cr6fc_creditfacilityutilised": creditFacilityUtilised
				/*"cr6fc_existingcf": existingCreditFacility , commennted on9 16 24
				"cr6fc_totalsanctionedamount": TotalSanctionedAmount,
				"cr6fc_typeofcreditfacility": TypeOfCreditFacility,
				"cr6fc_validitycreditguarantee": ValidityCreditGuarantee,
				"cr6fc_nameofceo": NameOfCEO,
				"cr6fc_contactceo": ContactCEO,
				"cr6fc_mobileceo": MobileCEO,
				"cr6fc_emailidceo": EmailIDCEO,
				"cr6fc_customerid": CustomerID,
				"cr6fc_lendingassesmenttool": LendingAssesmentTool,
				"cr6fc_typeoffacility": TypeofFacility,
				 "cr6fc_purposeofthecreditfacility":''+PurposeOftheCreditFacility,
				"cr6fc_accountno": AccountNo,
				"cr6fc_sanctionedamount": SanctionedAmount,
				"cr6fc_dateofsanction": DateOfSanction,
				"cr6fc_enddateofinterestmoratium": EndDateOfInterestMoratium,
				"cr6fc_enddateofprinciplemoratium": EndDateOfPrincipleMoratium,
				"cr6fc_duedateoflastinstallment": DueDateOfLastInstallment,
				"cr6fc_interestrate": InterestRate,
				"cr6fc_creditfacilityfundagriinfra": CreditFacilityFundAgriInfra,
				"cr6fc_loanfullydisbured": LoanFullyDisbured,
				"cr6fc_outstandingamountondate": OutstandingAmountOnDate,
				"cr6fc_drawingpower": DrawingPower,
				"cr6fc_enddateofmoratium": EndDateOfMoratium,
				"cr6fc_validityenddate": ValidityEndDate,
				"cr6fc_projectcostinput": ProjectCostInput,
				"cr6fc_projectcostmarketing": ProjectCostMarketing,
				"cr6fc_projectcostprocessing": ProjectCostProcessing,
				"cr6fc_projectcostother": ProjectCostOther,
				"cr6fc_projectcosttotal": ProjectCostTotal,
				"cr6fc_meansoffinanacetermloan": MeansOfFinanaceTermLoan,
				"cr6fc_promoterequitymargin": PromoterEquityMargin,
				"cr6fc_unsecuredloan": UNsecuredLoan,
				"cr6fc_anyothersources": AnyOtherSource,
				"cr6fc_typeofsecurity": TypeOfSecurity,
				"cr6fc_natureofsecurity": NatureOfSecurity,
				"cr6fc_valueofsecurity": ValueOfSecurity,
				"cr6fc_nameoflendinginstitution": NameOfLendingInstitution,
				"cr6fc_totalamount": TotalValue,
				"cr6fc_status": SubStatus,
				"cr6fc_FPOState@odata.bind": "/cr6fc_statemasters(" + FPOState + ")",
				"cr6fc_collateralsecurity": CollateralSecurity,
				"cr6fc_creditfacilityutilised": creditFacilityUtilised*/
			});
	}
	else if(BusinessAddress == "1" ||BusinessAddress == "0")
	{
		var data = JSON.stringify(
			{
	
				//"cr6fc_name": vTitle,
				"cr6fc_name": vTitle,
				//"cr6fc_ELIChecker_contact@odata.bind": "/contacts(" + EILchecker + ")",
				"cr6fc_ELIChecker_contact@odata.bind":"/contacts(" +  EILchecker + ")",
				//"cr6fc_eilcheckeremailid": ELICheckerEmail,
				"cr6fc_elicheckeremailid": ELICheckerEmail,
				//"cr6fc_elimakeremailid": loggedInUserEmail,
				"cr6fc_elimakeremailid": loggedInUserEmail,
				//"cr6fc_elimakerremark": txtELIMakerRemark,
				"cr6fc_elimakerremark": txtELIMakerRemark,
			//	"cr6fc_nameoffpo": txtNameOfFPO,
			"cr6fc_nameoffpo":txtNameOfFPO,
				//"cr6fc_constitutionfpo": ConstitutionFPO,
				"cr6fc_constitutionfpo": ConstitutionFPO,
				//"cr6fc_fpoacts": FPOActs,
				"cr6fc_fpoacts":FPOActs,
				//"cr6fc_dateofregistration": DateOfRegistration,
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
				//"cr6fc_fpoactivities111":''+ FPOActivities,
				"cr6fc_fpoactivities111":''+FPOActivities,
				//"cr6fc_fpoagribusinessactivity": FPOAgriBusinessActivity,
				"cr6fc_fpoagribusinessactivity": FPOAgriBusinessActivity,
				//"cr6fc_forwardlinkagefpo": ForwardLinkageFPO,
				"cr6fc_forwardlinkagefpo": ForwardLinkageFPO,
				//"cr6fc_backwardlinkagefpo": BackwardLinkageFPO,
				"cr6fc_backwardlinkagefpo": BackwardLinkageFPO,
				//"cr6fc_RegionOfFPO@odata.bind": FPORegion,
				"cr6fc_RegionOfFPO@odata.bind": FPORegion,
				//"cr6fc_existingregisteredofficeaddress": ExistingRegisteredOfficeAddress,
				"cr6fc_existingregisteredofficeaddress": ExistingRegisteredOfficeAddress,
				//"cr6fc_fpodistrict": FPODistrict,
				"cr6fc_fpodistrict": FPODistrict,
				//"cr6fc_fpopincode": FPOPincode,
				"cr6fc_fpopincode": FPOPincode,
				//"cr6fc_geolatitutelocation": GeoLatituteLocation,
				"cr6fc_geolatitutelocationfpo": GeoLatituteLocationFPO,
				//"cr6fc_geolongitutelocation": GeoLongituteLocation,
				"cr6fc_geolongitutelocationfpo": GeoLongituteLocationFPO,
				//"cr6fc_businessaddresssameregiaddress": BusinessAddress,
			"cr6fc_businessaddresssameregiaddress": BusinessAddress,

				//"cr6fc_fpocity": FPOCity,
				"cr6fc_fpocity": FPOCity,
				//"cr6fc_businessfpocity": BusinessFPOcity,
				"cr6fc_businessfpocity": BusinessFPOcity,
				//"cr6fc_businessaddressfpo": BusinessAddressFPO,
				"cr6fc_businessaddressfpo": BusinessAddressFPO,
				//"cr6fc_businessfpodistrict": BusinessFPODistrict,
				"cr6fc_businessfpodistrict": BusinessFPODistrict,
				//"cr6fc_totalfpomember": TotalFPOMember,
				"cr6fc_totalfpomember": TotalFPOMember,
				//"cr6fc_totalmembernorthen": TotalMemberNorthen,
				"cr6fc_totalmembernorthen": TotalMemberNorthen,
				//"cr6fc_nooflandlessfarmer": NoOfLandlessFarmer,
				"cr6fc_nooflandlessfarmer": NoOfLandlessFarmer,
				//"cr6fc_noofsmallfarmer": NoOfSmallFarmer,
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
			//	"cr6fc_noofstfarmer": NoOfSTFarmer,
			"cr6fc_noofstfarmer": NoOfSTFarmer,
				//"cr6fc_BusinessFPOState@odata.bind": "/cr6fc_statemasters(" + BusinessFPOState + ")",
				//"cr6fc_businessfpopincode": BusinessFPOPincode,
				"cr6fc_businessfpopincode": BusinessFPOPincode,
				//"cr6fc_geolatitutelocationfpo": GeoLatituteLocationFPO,
				"cr6fc_geolatitutelocationfpo": GeoLatituteLocationFPO,
				//"cr6fc_geolongitutelocationfpo": GeoLongituteLocationFPO,
"cr6fc_geolongitutelocationfpo": GeoLongituteLocationFPO,
				//"cr6fc_newfpo": NewFPO,
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
				//	"cr6fc_contactceo": ContactCEO,
				"cr6fc_contactceo": ContactCEO,
			//	"cr6fc_mobileceo": MobileCEO,
				"cr6fc_mobileceo": MobileCEO,
				//"cr6fc_emailidceo": EmailIDCEO,
				"cr6fc_emailidceo": EmailIDCEO,
				//"cr6fc_customerid": CustomerID,
				"cr6fc_customerid": CustomerID,
				//"cr6fc_lendingassesmenttool": LendingAssesmentTool,
				"cr6fc_lendingassesmenttool": LendingAssesmentTool,
				
				//"cr6fc_typeoffacility": TypeofFacility,
				"cr6fc_typeoffacility": TypeofFacility,
				//"cr6fc_purposeofthecreditfacility": ''+PurposeOftheCreditFacility,
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
			//	"cr6fc_outstandingamountondate": OutstandingAmountOnDate,
				"cr6fc_outstandingamountondate": OutstandingAmountOnDate,
				//"cr6fc_drawingpower": DrawingPower,
				"cr6fc_drawingpower": DrawingPower,
				//"cr6fc_enddateofmoratium": EndDateOfMoratium,

				"cr6fc_enddateofmoratium": EndDateOfMoratium,
				
				//"cr6fc_validityenddate": ValidityEndDate,
				"cr6fc_validityenddate": ValidityEndDate,
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
				//"cr6fc_anyothersources": AnyOtherSource,
				"cr6fc_anyothersources": AnyOtherSource,
				//"cr6fc_typeofsecurity": TypeOfSecurity,
				"cr6fc_typeofsecurity": TypeOfSecurity,
				//"cr6fc_natureofsecurity": NatureOfSecurity,
				"cr6fc_natureofsecurity": NatureOfSecurity,
				//"cr6fc_valueofsecurity": ValueOfSecurity,
				"cr6fc_valueofsecurity": ValueOfSecurity,
				//"cr6fc_nameoflendinginstitution": NameOfLendingInstitution,
				"cr6fc_nameoflendinginstitution": NameOfLendingInstitution,
				//"cr6fc_totalamount": TotalValue,
				"cr6fc_totalamount": TotalValue,
				//"cr6fc_status": SubStatus,
				"cr6fc_status": SubStatus,
			//	"cr6fc_FPOState@odata.bind": "/cr6fc_statemasters(" + FPOState + ")",
				"cr6fc_FPOState@odata.bind": "/cr6fc_statemasters(" + FPOState + ")",
				//"cr6fc_collateralsecurity": CollateralSecurity,
				"cr6fc_collateralsecurity": CollateralSecurity,
				//"cr6fc_creditfacilityutilised": creditFacilityUtilised
				"cr6fc_creditfacilityutilised": creditFacilityUtilised
			});
	}


		shell.getTokenDeferred().done(function(token){
			
			console.log(token)
			var header = {
				__RequestVerificationToken: token,
				contentType: "application/json;odata=verbose"
			}
			$.ajax({
				// url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CGApplications')/items",
				url: "/_api/cr6fc_cgaplications",
				type: "POST",
				headers: header,
				async: false,
				data: data,
				success: function (data, textStatus, xhr) {
					var successId = xhr.getResponseHeader('entityid');
					//console.log(successId);
					UpdateCounter(token);
					if(SubStatus == "2")
					{
						alert('Data saved Successfully. The CGApplication No.is:-' + vTitle)
					}
					else
					{
						alert('Data Added Successfully. The CGApplication No.is:-' + vTitle)
				    }
				//	window.location.href = location.origin + "/RefreshingCache/?id="+successId+","+counterentID+"&tbl=cr6fc_cgapplicationses,cr6fc_countermasters&col=cr6fc_cacherefreshedon&red=DashboardCGApp";
					window.location.href = location.origin + "/RefreshingCache/?id="+successId+","+counterentID+"&tbl=cr6fc_cgaplications,cr6fc_countermasters&col=cr6fc_cacherefreshedon&red=DashboardCGApp";
					// window.location.href = location.origin+"/DashboardCGApp/";
				},
				error: function (error) {
					console.log(error);
					//alert('Some error occured. Please try again later.');
					alert('Some error occured while adding data in CGApplications list. Please try again later.');
					console.log(error);
		
				}
		
		
			})
		})



	//}
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
function GetUserId1(EamilID) {
	debugger;
	//var vNewLoginName=EamilID.split('|')[2];
	var requestUri = location.origin+"/_api/contacts?$top=500&$select=*&$filter=emailaddress1 eq '"+EamilID+"'";
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
var counterentID;
function UpdateCounter(token) {
	debugger;
	var itemId = document.getElementById("hdnCounterItemID1").value;
	var hdnCounter = document.getElementById("hdnCounterItemID").value;
	hdnCounter1 = parseInt(hdnCounter) + 1;

		var data1 = JSON.stringify({
			cr6fc_cgapplicationno: ''+hdnCounter1
			//"value":2

		});
		var header={__RequestVerificationToken:token,
			contentType: "application/json;odata=verbose",
			XRequestDigest: $("#__REQUESTDIGEST").val(),
			IFMATCH: "*",
			XHttpMethod: "PATCH"
		}
	$.ajax({
		url: "/_api/cr6fc_countermasters(" +itemId+")",
		type: "PATCH",
		async: false,
		data: data1,
		headers: header,
		success: function (data, textStatus, xhr) {
			counterentID = xhr.getResponseHeader('entityid');
			// AddDashBoard(document.getElementById("hdnDigitalRequestNo").value, document.getElementById("hdnApprvlNotesItemID").value);
			//alert('Data Done')
		},
		error: function (e) {
		}
	});
}
function UpdateCounterAttchFailed() {
	debugger;
	var itemId = document.getElementById("hdnCounterItemID").value;
	var hdnCounter = document.getElementById("hdnCounterItemID").value;
	hdnCounter = parseInt(hdnCounter) + 1;
	$.ajax({
		url: location.origin + "/_api/web/lists/getByTitle('CounterMaster')/getItemByStringId('" + itemId + "')",
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
