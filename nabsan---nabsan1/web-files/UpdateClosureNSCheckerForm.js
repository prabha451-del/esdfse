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
	
	BindRegion();
	BindFPOState();
	//BindBusinessFPOcity();
	BindBusinessFPOState();
	//BindELICheckerMaker();
	BindELIMaker()
	bindCGApplicationData(vItemID);
	ConstitutionFPO();
	//populatePAN();

	// $.getScript(_spPageContextInfo.webAbsoluteUrl + "/SiteAssets/NEWJS/fSelect.js", function () {
	$('#PurposeOftheCreditFacility').fSelect();
	$('#FPOActivities').fSelect();


	// });

	

	
	

	
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


function cancel() {

	window.location.href = location.origin + "/ClosureNSCheckerDashboard/";

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

function ConstitutionFPO() {
    // Get the value of 'ConstitutionFPO' (which could be the name of lending institution) from an input or dropdown
    var lendingInstitution = document.getElementById("NameOfLendingInstitution").value ;

    // Ensure that the lending institution is provided before making the request
    if (!lendingInstitution) {
        alert("Please select or enter a lending institution.");
        return;
    }

    // Build the API request URI using the selected lending institution
    var requestUri = location.origin + "/_api/cr6fc_cgaplications?$top=5000&$select=*,cr6fc_panfpo,cr6fc_nameoflendinginstitution,cr6fc_nameoffpo&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=cr6fc_nameoflendinginstitution eq '" + lendingInstitution + "'";

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
                    var ConstitutionFPO = document.getElementById("ConstitutionFPO");
                    ConstitutionFPO.options.length = 0;
                    ConstitutionFPO.options[ConstitutionFPO.options.length] = new Option("Select FPO", ""); // Placeholder option

                    // Populate the dropdown with filtered FPOs
                    /*for (var i = 0; i < items.length; i++) {
                        ConstitutionFPO.options[ConstitutionFPO.options.length] = new Option(
                            items[i].cr6fc_nameoffpo,
                            items[i].cr6fc_cgaplicationid
                        );
                    }*/
						for (var i = 0; i < items.length; i++) {
							// Store both FPO ID and PAN in the option's value as a JSON string
							ConstitutionFPO.options[ConstitutionFPO.options.length] = new Option(
								items[i].cr6fc_nameoffpo,
								JSON.stringify({
									fpoId: items[i].cr6fc_cgaplicationid,
									pan: items[i].cr6fc_panfpo
								})
							);
						}
					
                } else {
                    // If no items match the filter, show a message
                    var ConstitutionFPO = document.getElementById("ConstitutionFPO");
                    ConstitutionFPO.options.length = 0;
                    ConstitutionFPO.options[ConstitutionFPO.options.length] = new Option("No FPOs found", "");
                }
            }
            catch (e) {
                console.log('Error processing items: ', e);
            }
        },
        error: function onError(error) {
            console.log(JSON.stringify(error));
        }
    });
}
function populatePAN() {
    var ConstitutionFPO = document.getElementById("ConstitutionFPO");
    var selectedOption = ConstitutionFPO.options[ConstitutionFPO.selectedIndex].value;

    // Parse the stored PAN and FPO ID from the selected option
    if (selectedOption) {
        var selectedData = JSON.parse(selectedOption);
        document.getElementById("PANFPO").value = selectedData.pan || "No PAN Available"; // Display PAN or message if unavailable
    } else {
        document.getElementById("PANFPO").value = "";
    }
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
					 document.getElementById("ConstitutionFPO").value = Logg[0].cr6fc_nameoffpo;
					

					document.getElementById("NameOfLendingInstitution").value = Logg[0].cr6fc_nameoflendinginstitution;
                    document.getElementById("PANFPO").value = Logg[0].cr6fc_nameoffpo;
					document.getElementById("TypeofFacility").value = Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'];
					document.getElementById("SanctionedAmount").value = Logg[0].cr6fc_sanctionedamount;

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

	
	

	var data = JSON.stringify(
		{

			//"Title":vTitle,
			//"cr6fc_ELIChecker_contact@odata.bind": "/contacts(" + EILchecker + ")",
			//"cr6fc_ELIChecker_contact@odata.bind":"/contacts(" +  EILchecker + ")",
			//"cr6fc_eilcheckeremailid": ELICheckerEmail,
			//"cr6fc_elicheckeremailid": ELICheckerEmail,
			//"cr6fc_nameoflendinginstitution": NameOfLendingInstitution,
			
			"cr6fc_closurenscheckerremark": txtmakerComment,
			
			"cr6fc_status": SubStatus,
		
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
		url: "/_api/cr6fc_updateclosures(" + vItemID + ")",
		data: data,
		type: "PATCH",
		headers: header,
		async: false,
		success: function (data, textStatus, xhr) {
			var successId = xhr.getResponseHeader('entityid');
			//console.log(success);


			if (status == 'Approved by NABSaranrakshan') {
				var CGData = JSON.stringify(
					{
						//cgapplication
						"cr6fc_cgstatus": CGStatus,
						//"cr6fc_statuschangeddate": new Date()

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
						//if (AttchLength != 0) {
						//	updatecgappfile(vItemID)
						//}
						///else {
							alert('Request Approved Sucessfully');
							//window.location.href = location.origin + "/RefreshingCache/?id=" + renewalcgapplicationentityid + "," + cgappentitid + "&tbl=cr6fc_renewalcgapplications,cr6fc_cgapplicationses&col=cr6fc_cacherefreshedon&red=NSApproverDBRenewal"
							window.location.href = location.origin + "/RefreshingCache/?id=" + renewalcgapplicationentityid + "," + cgappentitid + "&tbl=cr6fc_renewalcgapplications,cr6fc_cgaplications&col=cr6fc_cacherefreshedon&red=NSApproverDBRenewal"
							// window.location.href=location.origin + "/NSApproverDBRenewal/";		
						//}
					},
					error: function (e) {
						console.log(e);
					}
				});

			}
		  
			if (status == "Approved by NABSaranrakshan") {
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
