var vItemID;
var TaxData;
var cgPanList;
var cgpanoffpo;
var selectedData;
var nameoffpo;
var Logg;
var typ;
var loggedInUserId = '';
var loggedInUserName = '';
var loggedInUserEmail = '';
var numOfAuthSign = 0;
var DetailArrayAuthSign = [];
var DateofClosure = '';
var rowIdx = 1;
$(document).ready(function () {
	loggedInUserId = $('#fpo-user-contact-id').val();
	loggedInUserName = $('#fpo-user-contact-name').val();
	loggedInUserEmail = $('#fpo-user-email').val();
	$('title').text('APPLICATIONEDITFORM');
	vItemID = GetQueryStingValue()["Item"];
	var vTaskID = GetQueryStingValue()["Task"];
	
	BindELIMaker()
	bindCGApplicationData(vItemID);
	ConstitutionFPO();
	bindSOEData(vItemID);
	bindTAXData(vItemID);
	bindCGRenewalData();


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

	window.location.href = location.origin + "/ClosureDashboard/";

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
    var requestUri = location.origin + "/_api/cr6fc_cgaplications?$top=5000&$select=*,cr6fc_sanctionedamount,cr6fc_cgpan,cr6fc_panfpo,cr6fc_nameoflendinginstitution,cr6fc_nameoffpo,cr6fc_typeoffacility&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=cr6fc_nameoflendinginstitution eq '" + lendingInstitution + "'";

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
								//items[i].cr6fc_cgaplicationid,
								JSON.stringify({
									fpoId: items[i].cr6fc_cgaplicationid,
									pan: items[i].cr6fc_panfpo,
									nameoffpo:items[i].cr6fc_nameoffpo,
									//CPAN:items[i].cr6fc_cgpan, //if cgpan enable on the basis of nameoffpo selection dropdown
									TypeFacility:items[i]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'],
									sanamt:items[i].cr6fc_sanctionedamount,
									TypeFacility1:items[i]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'],
									sanamt1:items[i].cr6fc_sanctionedamount,
									TypeFacility2:items[i]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'],
									sanamt2:items[i].cr6fc_sanctionedamount,
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

function handleFPOSelection() {
    var ConstitutionFPO = document.getElementById("ConstitutionFPO");
    var selectedOption = ConstitutionFPO.value;

    // Clear previous entries
    var cascadingDivContainer = document.getElementById("cascadingDivContainer");
    cascadingDivContainer.innerHTML = ""; // Clear previous entries

   /* if (!selectedOption) {
        return; // Do nothing if no FPO is selected
    }*/// commented 
	if (selectedOption) {
		// return; // Do nothing if no FPO is selected
		 
		selectedData = JSON.parse(selectedOption);
		  document.getElementById("PANFPO").value = selectedData.pan; 
	 }

    // Parse the selected option to get the data (assuming it's a JSON string)
    var fpoData = JSON.parse(selectedOption);
    var lendingInstitutionS = fpoData.lendingInstitution; // Assuming you have the lending institution info
    //var lendingInstitution = document.getElementById("NameOfLendingInstitution").value ;
    // Fetch CGPAN list dynamically based on the selected FPO
    fetchCgpanList(lendingInstitutionS);
}

function fetchCgpanList(lendingInstitutionS) {
    // Replace with your actual API endpoint
    //var requestUri = location.origin + "/_api/cr6fc_cgaplications?$top=5000&$select=*,cr6fc_nameoflendinginstitution&$filter=cr6fc_nameoffpo eq '"+ selectedData.nameoffpo + "'";
	var requestUri = location.origin + "/_api/cr6fc_cgaplications?$top=5000&$select=*,cr6fc_nameoflendinginstitution&$filter=cr6fc_nameoffpo eq '"+ selectedData.nameoffpo + "' and (cr6fc_panfpo eq '" +   selectedData.pan + "')";
	//var requestUri = location.origin + "/_api/cr6fc_cgaplications?$top=5000&$select=*,cr6fc_nameoflendinginstitution&$filter= cr6fc_panfpo eq '" +   selectedData.pan + "' && cr6fc_nameoffpo eq '"+ selectedData.nameoffpo + "'";
	//var requestUri = location.origin + "/_api/cr6fc_cgaplications?$top=5000&$select=*,cr6fc_nameoflendinginstitution&$filter=cr6fc_nameoflendinginstitution eq '" + lendingInstitutionS + "'";
    $.ajax({
        url: requestUri,
        type: "GET",
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose"
        },
        success: function(data) {
             cgPanList = data.value; // Adjust based on your API response structure
            // Process the CGPAN data to create dynamic input fields
            createCgpanInputs(cgPanList);
        },
        error: function(error) {
            console.error("Error fetching CGPAN list:", error);
            // Optionally show a message to the user
        }
    });
}
function createCgpanInputs(cgPanList) {
	let IncrimentalID = ++rowIdx;

	var cascadingDivContainer = document.getElementById("cascadingDivContainer");
	cascadingDivContainer.innerHTML = ""; // Clear previous entries
  
	if (cgPanList && cgPanList.length > 0) {
		cgPanList.forEach(function(cgPan, index) {
	 cgpanoffpo	= cgPan.cr6fc_panfpo;
	 nameoffpo = cgPan.cr6fc_nameoffpo;
	 typ = cgPan['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'];
	  //start grep
	  /*var filterRegion = $.grep(TaxData,function (value) {
		return (value.cr6fc_cgid == cr6fc_cgaplicationid);
	  })*/
  
	  var filteredRegion = $.grep(TaxData, function(value) {
				return value.cr6fc_cgid == cgPan.cr6fc_cgaplicationid; 
			});
	
	  var filteredcover = $.grep(Logg, function(value) {
				return value.cr6fc_wfid == cgPan.cr6fc_cgaplicationid; 
			});
  
	//	filterRegion[0].cr6fc_cgpan;
	  //cgPan.cr6fc_panfpo
  var cgpanValue = filteredRegion.length > 0 ? filteredRegion[0].cr6fc_cgpan : ""; 
  var covervalue = filteredcover.length > 0 ? filteredcover[0].cr6fc_eligibleguranteecover : "";
	  //added grep
			var newDiv = document.createElement("div");
			newDiv.className = "form-group row mx-0";
  
			newDiv.innerHTML = `
				<div class="form-group col-md-3">
					<label>CGPAN</label>
					<input type="text" id="CGPAN${index}" class="form-control" value="${cgpanValue}"  readonly />
		  <input type='hidden' id='ApplicationId${index} value='${cgPan.cr6fc_cgaplicationid}'>
				</div>
				<div class="form-group col-md-3">
					<label>Type of Facility</label>
					<input type="text" id="TypeofFacility${index}" value="${typ}" readonly />
				</div>
				<div class="form-group col-md-3">
					<label>Sanctioned Amount (Rs)</label>
					<input type="text" onkeypress="return onlyNumberKey(event)" maxlength="6" id="SanctionedAmount${index}" value="${cgPan.cr6fc_sanctionedamount}" readonly  /> 
				</div>
				<div class="form-group col-md-3">
					<label>CG Cover (Rs)</label>
					<input type="text" id="CGCover${index}" value="${covervalue}"  readonly />
				</div>
				<div class="form-group col-md-3">
                    <label for="inputState"
                      >Principal Outstanding<span id="id21an" style="color: red;"><b>*</b></span></label
                    ><input type="text" id="PrincipalOutstanding${index}" class="form-control" />
                  </div>
                  <div class="form-group col-md-3">
                    <label for="inputState"
                      >Interest Oustanding<span id="id21an" style="color: red;"><b>*</b></span></label
                    ><input type="text" id="InterestOustanding${index}" class="form-control" />
                  </div>
                   
                  <div class="form-group col-md-3">
                    <label for="inputState"
                      >Date of NPA<span id="id21an" style="color: red;"><b>*</b></span></label
                    ><input type="date" id="DateofNPA${index}" class="form-control" />
                  </div>
				  <div class="form-group col-md-3">
                    <label for=""
                      >IRAC Classification<span id="i0smoh" style="color: red;"><b>*</b></span
                      ></label
                    ><select id="IRACClassification${index}" class="form-control" onchange="AddtoColl(${index})">
                      <option value="Select">Select</option>
                      <option value="Company">Company</option>
                      <option value="Cooperative Society">Cooperative Society</option>
                    </select>
                  </div>
				
				
			`;
  
			// Append the new div to the container
			cascadingDivContainer.appendChild(newDiv);
		});
	} else {
		// Optionally handle the case where no CGPANs are found
		cascadingDivContainer.innerHTML = "<p>No CGPAN data found.</p>";
	}
	
  }
  function bindCGRenewalData() {
	//var requestUri = location.origin + "/_api/cr6fc_cgaplications?$top=5000&$select=*&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=(cr6fc_cgaplicationid eq " + vItemID + ")";
	var requestUri = location.origin + "/_api/cr6fc_renewalcgapplications?$top=5000&$select=*,cr6fc_renewalcgapplicationid";
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
			var Renewaldata = data.value;
			//vtitle = Logg[0].cr6fc_name; comm on 9 17 24
		//vtitle = Logg[0].cr6fc_name;
			try {
				if (Renewaldata.length > 0) {
					
					

					//document.getElementById("NameOfLendingInstitution").value = Renewaldata[0].cr6fc_nameoflendinginstitution;
					
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
var cgapplicationdata ='';
function bindCGApplicationData(vItemID) {
	//var requestUri = location.origin + "/_api/cr6fc_cgaplications?$top=5000&$select=*&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=(cr6fc_cgaplicationid eq " + vItemID + ")";
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
					
					

					document.getElementById("NameOfLendingInstitution").value = Logg[0].cr6fc_nameoflendinginstitution;
					
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
//vItemID
function bindSOEData(vItemID) {
	//var requestUri = location.origin + "/_api/cr6fc_cgapplicationses?$top=5000&$select=*&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=(cr6fc_cgapplicationsid eq " + vItemID + ")"; comm 9 17 24
	// var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CGApplications')//items?$top=5000&$select=*,FPOActivities111/FPOActivity,RegionOfFPO/ID,FPOState/ID,BusinessFPOState/Id,Title&$expand=RegionOfFPO,FPOActivities111,FPOState,BusinessFPOState&$filter=(ID eq '" + vItemID + "')";
	var requestUri = location.origin + "/_api/cr6fc_soedetailses?$top=5000&$select=*,cr6fc_eligibleguranteecover";
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
			 Logg = data.value;
			//vtitle = Logg[0].cr6fc_name; comm on 9 17 24
			//vtitle = Logg[0].cr6fc_wfid;
			try {
				if (Logg.length > 0) {
					
					for(var i=0;i<Logg.length;i++){
                       /*if(i===0){
						document.getElementById("CGCover").value = Logg[i].cr6fc_eligibleguranteecover;
					   }
					if(i===1){
					document.getElementById("CGCover1").value = Logg[i].cr6fc_eligibleguranteecover;
				}*/
                   // document.getElementById("CGPAN").value = Logg[0].cr6fc_cgpan;
					//document.getElementById("TypeofFacility").value = Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'];
					//document.getElementById("SanctionedAmount").value = Logg[0].cr6fc_sanctionedamount;
					 // Create a field ID based on the index
					 var fieldId1 = i === 0 ? "CGCover" : "CGCover" + i; // CGPAN1, CGPAN2, etc.

					 // Only set the value if the element exists
					 var inputField1 = document.getElementById(fieldId1);
					 if (inputField1) {
						 inputField1.value = Logg[i].cr6fc_eligibleguranteecover || ""; // Fallback to empty string
					 }
				 
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


function bindTAXData(vItemID) {
    var requestUri = location.origin + "/_api/cr6fc_taxinvoiceses?$top=5000&$select=*";
    var requestHeaders = { "accept": "application/json;odata=verbose" };

    $.ajax({
        url: requestUri,
        type: "GET",
        async: false,
        headers: requestHeaders,
        success: function (data) {
             TaxData = data.value;

            try {
                // Check if TaxData is not empty
                if (TaxData.length > 0) {
                    // Loop through the TaxData array and populate fields dynamically
                    for (var i = 0; i < TaxData.length; i++) {
                        // Create a field ID based on the index
                        var fieldId = i === 0 ? "CGPAN" : "CGPAN" + i; // CGPAN1, CGPAN2, etc.

                        // Only set the value if the element exists
                        var inputField = document.getElementById(fieldId);
                        if (inputField) {
                            inputField.value = TaxData[i].cr6fc_cgpan || ""; // Fallback to empty string
                        }
                    }
                }
            } catch (e) {
                console.error("Error processing TaxData: ", e);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error fetching tax data: ", status, error);
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
	var Newtoday = mm + '/' + dd + '/' + yyyy + " " + strTime;
	return Newtoday;
}
function AddtoColl(index) {
	/*var checkselected = $("#FPODistrict"+index+"").val();
	var DateofClosure = $("#DateofClosure"+index+"").val();
	var cgpan = $("#CGPAN"+index+"").val();
	var cgcover = $("#CGCover"+index+"").val();
	var sanctionamt = $("#SanctionedAmount"+index+"").val();
	var typeoffacility = $("#TypeofFacility"+index+"").val();*/

	 
	var checkselected = $("#IRACClassification" + index).val();
	//var DateofClosure = $("#DateofClosure" + index).val();
    var sanctionamt = $("#SanctionedAmount" + index).val();
   var typeoffacility = $("#TypeofFacility" + index).val();
	var cgpan = $("#CGPAN"+index+"").val();
	var cgcover = $("#CGCover"+index+"").val();
	var InterestOustanding = $("#InterestOustanding" + index).val();
	var PrincipalOutstanding = $("#PrincipalOutstanding" + index).val();
	var DateofNPA = $("#DateofNPA" + index).val();

	var DetailColl = {};
	
	//if(checkselected === "Yes"){
	
	
	DetailColl.creaditfacility = checkselected;
	DetailColl.DateofNPA = DateofNPA;
	DetailColl.InterestOustanding = InterestOustanding;
	DetailColl.PrincipalOutstanding = PrincipalOutstanding;
	DetailColl.cgpan = cgpan;
	DetailColl.cgcover = cgcover;
	DetailColl.sanctionamt = sanctionamt;
	DetailColl.typeoffacility = typeoffacility;
	DetailColl.nameoffpo = nameoffpo;

	DetailArrayAuthSign.push(DetailColl);
	
	//$('#cascadingDivContainer').empty();
	//bindData(DetailArrayAuthSign);
	//}
}



var SubStatus = '';
function SubmitData(status) {

     var txtmakerComment = $("#txtmakerComment").val();
	 //var InterestOustanding = $("#InterestOustanding").val();
	 //var PrincipalOutstanding = $("#PrincipalOutstanding").val();
	 //var DateofNPA = $("#DateofNPA").val();
	// if((DateofNPA == "" || DateofNPA == undefined) && status == "Submitted"){
		// alert('Please Enter Date of NPA')
		// return false;
	// }
	// else if (DateofNPA == "" || DateofNPA == undefined){
		// DateofNPA = null;
	// }
	 //var IRACClassification = $("#IRACClassification option:selected").text(); commented on 10 16 24

	var ELIMakerEmailID = loggedInUserEmail;


	
	var ELICheckerEmail = $('#ELICheckerEmail').val();
	var EILchecker;
	if (ELICheckerEmail != null && ELICheckerEmail != undefined && ELICheckerEmail != '') {
		//EILchecker=checker[0].EILCheckerId;
		EILchecker = GetUserId1(ELICheckerEmail);
	}
	/*else
	{
		EILchecker=0;
	}*/
	if (EILchecker == -1) {
		alert('There is no valid EIL Checker against this Lending Institute')
		return false;
	}

	if (EILchecker == 0) {
		alert('There is no EIL Checker against this Lending Institute')
		return false;
	}

	//vTitle = GetCounter();
	$('#btnSave').prop('disabled', true);
	$('#btn1').prop('disabled', true);

	if (status == "Draft") {
		SubStatus = "1";
	}
	else if (status == "Submitted") {
		SubStatus = "2";
	}
	$('#btn1').prop("disabled", true);
	var data1 = JSON.stringify({
		
	
		"cr6fc_npaelimakerremark": txtmakerComment,
		"cr6fc_status": SubStatus,
		"cr6fc_name":DetailArrayAuthSign[numOfAuthSign].cgpan,
		"cr6fc_cgcover":DetailArrayAuthSign[numOfAuthSign].cgcover,

		"cr6fc_principaloutstanding":DetailArrayAuthSign[numOfAuthSign].PrincipalOutstanding,
		"cr6fc_interestoustanding":DetailArrayAuthSign[numOfAuthSign].InterestOustanding,
		"cr6fc_sanctionedamount":DetailArrayAuthSign[numOfAuthSign].sanctionamt,
	"cr6fc_typeoffacility":DetailArrayAuthSign[numOfAuthSign].typeoffacility,
		//"cr6fc_iracclassification":DetailArrayAuthSign[numOfAuthSign].checkselected,
		"cr6fc_iracclassification":DetailArrayAuthSign[numofAuthSign].creaditfacility,
"cr6fc_dateofnpa":GetCreatedDateTime(DetailArrayAuthSign[numOfAuthSign].DateofNPA),
"cr6fc_nameoffpo":DetailArrayAuthSign[numOfAuthSign].nameoffpo,
"cr6fc_requeststatus":"1"

		//"cr6fc_dateofclosure":GetCreatedDateTime(DetailArrayAuthSign[numOfAuthSign].DateofClosure),
	
	
		//"cr6fc_dateofnpa":GetCreatedDateTime(DetailArrayAuthSign[numOfAuthSign].DateofNPAs)
//"cr6fc_iracclassification":IRACClassification, commented on 10 16 24

		//"cr011_State@odata.bind": "/cr011_ahdstatemasters(" + AHDState + ")",
		//"cr011_CategoryProposed@odata.bind": "/cr011_ahdcategoryofproposedinfrastructuremasters(" + RegionOfFPO + ")",
		//"cr011_StateofProjectSite@odata.bind": "/cr011_ahdstatemasters(" + RegionOfState + ")",
		//"cr011_entiryconstitution": ConstitutionFPO,
		//"cr011_EntiryConstitution@odata.bind": "/cr011_ahdentityconstitutionmasters(" + ConstitutionFPO + ")",
		//"cr011_TypeofEntity@odata.bind": "/cr011_ahdtypeofentitymasters(" + FPOActs + ")",

	});

	shell.getTokenDeferred().done(function (token) {

		console.log(token)
		var header = {
			__RequestVerificationToken: token,
			contentType: "application/json;odata=verbose",
		
		}
		$.ajax({
			// url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CGApplications')/items",
			url: "/_api/cr6fc_updateclosures",
			type : "POST",
			headers: header,
			async: false,
			data: data1,
			success: function (data, textStatus, xhr) {
				var successId = xhr.getResponseHeader('entityid');
				//console.log(successId);
				//Updatecgapplication(token);
				if (SubStatus == "2") {
					alert('Data saved Successfully')
				}
			
				else {
					alert('Data Added Successfully')
				}
				numOfAuthSign++;
				if (numOfAuthSign <= DetailArrayAuthSign.length - 1) {
					SubmitData(status);
				} else {
					authSignDeferred.resolve(xhr);
				}

				// Notify user of success
				
				
				// Redirect to Closure Dashboard
				window.location.href = location.origin + "/ClosureDashboard/";
		
			},
			error: function (error) {
				console.log(error);
				
				alert('Some error occured while adding data in CGApplications list. Please try again later.');
				console.log(error);

			}


		})
	})

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


