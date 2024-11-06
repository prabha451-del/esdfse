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




function cancel() {

	window.location.href = location.origin + "/ClosureELICheckerDashboard/";

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
	//var requestUri = location.origin + "/_api/cr6fc_cgaplications?$top=5000&$select=*&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=(cr6fc_cgaplicationid eq " + vItemID + ")";
	//var requestUri = location.origin + "/_api/cr6fc_updateclosures?$top=5000&$select=*";
	var requestUri = location.origin + "/_api/cr6fc_updateclosures?$top=5000&$select=*,cr6fc_updateclosureid&$filter=(cr6fc_updateclosureid eq "+vItemID+")";
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
					for (var i = 0; i < Logg.length; i++) {
					 document.getElementById("ConstitutionFPO").value = Logg[i].cr6fc_nameoffpo;
					
                      document.getElementById("PANFPO").value = Logg[i].cr6fc_panfpo;
					document.getElementById("NameOfLendingInstitution").value = Logg[i].cr6fc_nameoflendinginstitution;
					document.getElementById("TypeofFacility").value = Logg[i].cr6fc_typeoffacility;
					//document.getElementById("TypeofFacility").value = Logg[i]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'];
					document.getElementById("SanctionedAmount").value = Logg[i].cr6fc_sanctionedamount;
					document.getElementById("CGPAN").value = Logg[i].cr6fc_name;
						document.getElementById("CGCover").value = Logg[i].cr6fc_cgcover;
						document.getElementById("CreditFacility").value = Logg[i].cr6fc_creditfacility;
						 document.getElementById("DateofClosure").value = GetCreatedDateTime(Logg[i].cr6fc_dateofclosure);
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
	//var Newtoday = dd + '/' + mm + '/' + yyyy + " " + strTime; commented old one
	var Newtoday = dd + '/' + mm + '/' + yyyy;
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

	//var txtmakerComment = $('#txtmakerComment').val(); commented on 11 4 24
	var txtRemarksComments = $('#txtmakerComment').val();
	if (hdnStatus == "Sent Back by ELI Checker") {
		if (txtmakerComment == '' || txtmakerComment == undefined || txtmakerComment == null) {
			alert('Please enter the remark')
			return false;
		}
	}
	/*var hdnELIMaker = document.getElementById("hdnELIMaker").value;

	var txtELIMakerRemark;
	if (txtmakerComment != '' && txtmakerComment != undefined && txtmakerComment != '' && hdnELIMaker != null && hdnELIMaker != undefined && hdnELIMaker != '' && hdnELIMaker != "undefined") {
		txtELIMakerRemark = "<b>Comment</b> :- " + txtmakerComment + " - " + GetCurrentDataToday() + ": " + hdnELIMaker.toString() + "\n\n"
	}
	else {
		txtELIMakerRemark = "<b>Comment </b>:- " + txtmakerComment + " - " + GetCurrentDataToday() + "\n\n"
	}*/

	var Data;
		var workflowDt = new Date();
		workflowDt = GetCurrentDataToday();
		var EIlCheckerComm=document.getElementById("hdnEIlCheckerRemark").value;
		 var txtELICheckerRemark;
		 if(EIlCheckerComm!='' && EIlCheckerComm!=undefined && EIlCheckerComm!='')
		 {
			 txtELICheckerRemark= "<b>Comment</b> :- " + txtRemarksComments + " - " + workflowDt + ": " + EIlCheckerComm.toString() + "\n\n"
		 }
		 else{
			 txtELICheckerRemark= "<b>Comment </b>:- " + txtRemarksComments + " - " + workflowDt+ "\n\n"
		 }
		var data = JSON.stringify(
			{

				//"Title":vTitle,
				//"cr6fc_ELIChecker_contact@odata.bind": "/contacts(" + EILchecker + ")",
				//"cr6fc_ELIChecker_contact@odata.bind":"/contacts(" +  EILchecker + ")",
				//"cr6fc_eilcheckeremailid": ELICheckerEmail,
				//"cr6fc_elicheckeremailid": ELICheckerEmail,
				//"cr6fc_nameoflendinginstitution": NameOfLendingInstitution,
				
				"cr6fc_closureelicheckerremark": txtELICheckerRemark,
				
				//"cr6fc_status": SubStatus,
			
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


