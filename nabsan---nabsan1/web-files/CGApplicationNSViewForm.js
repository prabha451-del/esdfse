var vItemID;
var vTotalDocLength = 0;
var fileArray = [];
var otherfileArray = [];
var AttchLength = 0;
var arraycount = 0;
var cgappfilename;
$(document).ready(function () {
	$('title').text('NS Approver Form');


	vItemID = GetQueryStingValue()["Item"];
	var vTaskID = GetQueryStingValue()["Task"];
	TaxMaster();
	SOEMaster(vItemID);
	RegionMaster();
	bindCGApplicationData(vItemID);
	getfile(vItemID);
	getfileNSApprover(vItemID);
	//getOtherDocDataLatest(vItemID);
	//$('#fileAttachInvoice').multifile();

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

function Exit() {
	window.location.href = "https://nabardmumbai.sharepoint.com/sites/FPOCGPortal/SitePages/NSApproverDashBoard.aspx";
}
var TaxMasterColl;
function TaxMaster() {
	//var requestUri = "+location.origin+""/_api/('TaxInvoices')//items?$top=1000&$select=*&$orderby=ID asc";
	//var requestUri = location.origin+"/_api/cr6fc_taxinvoiceses?$select=cr6fc_cgid,cr6fc_cgpan"; comm 9 18 24
	var requestUri = location.origin+"/_api/cr6fc_taxinvoiceses?$select=cr6fc_cgid,cr6fc_cgpan";
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
			TaxMasterColl = data.value;
		},
		error: function () {
			console.log("error");
		}
	});
}

var RegionMasterColl;
function RegionMaster() {
	//var requestUri = location.origin+"/_api/cr6fc_regionmasters?$select=*"; comm 9 18 24
	var requestUri = location.origin+"/_api/cr6fc_regionmasters?$select=*";
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


var SOEMasterColl;
var SOEIDMasterColl;
function SOEMaster(vItemID) {
	//SOEMasterID(vItemID);
	//var requestUri = "+location.origin+""/_api/('SOEDetails')//items?$top=500&$select=*&$orderby=ID asc";
	//var requestUri = location.origin+"/_api/cr6fc_soedetailses?$select=cr6fc_wfid,cr6fc_eligibleguranteecover,cr6fc_sanctionedamount,cr6fc_name,cr6fc_soedetailsid&$filter=(cr6fc_wfid eq '"+vItemID+"')&$top=5000"; comm on 9 18 24
	var requestUri = location.origin+"/_api/cr6fc_soedetailses?$select=cr6fc_wfid,cr6fc_eligibleguranteecover,cr6fc_sanctionedamount,cr6fc_name,cr6fc_soedetailsid&$filter=(cr6fc_wfid eq '"+vItemID+"')&$top=5000";
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
	//var requestUri = location.origin+"/_api/cr6fc_cgapplicationses?$top=5000&$select=cr6fc_FPOState,cr6fc_BusinessFPOState,cr6fc_RegionOfFPO,cr6fc_panfpo,cr6fc_soegenerateddate,cr6fc_sanctionedamount,cr6fc_status&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=cr6fc_panfpo eq '" + vPANNo + "' and (cr6fc_status eq 8 or cr6fc_status eq 10 or cr6fc_status eq 11 or cr6fc_status eq 13 or cr6fc_status eq 15 or cr6fc_status eq 12) and (cr6fc_cgstatus ne 7 and cr6fc_cgstatus ne 8 and cr6fc_cgstatus ne 10)"; comm 9 18 24
	var requsetUri = location.origin+"/_api/cr6fc_cgaplications?$top=500&$select=cr6fc_FPOState,cr6fc_BusinessFPOState,cr6fc_RegionOfFPO,cr6fc_panfpo,cr6fc_soegenerateddate,cr6fc_sanctionedamount,cr6fc_status&4expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=cr6fc_panfpo eq '" + vPANNo + "' and (cr6fc_status eq 8 or cr6fc_status eq 10 or cr6fc_status eq 11 or cr6fc_status eq 13 or cr6fc_status eq 15 or cr6fc_status eq 12) and (cr6fc_cgstatus ne 7 and cr6fc_cgstatus ne 8 and cr6fc_cgstatus ne 10)";
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
					//var SOEDate = new Date(CGApplPANColl[i].cr6fc_soegenerateddate)
					var SOEDate = new Date(CGApplPANColl[i].cr6fc_soegenerateddate)
					var CurrDate = new Date();
					// var difference = SOEDate.getTime() - CurrDate.getTime();
					var difference = CurrDate.getTime() - SOEDate.getTime();
					var TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
					console.log(difference);
					//if (CGApplPANColl[i].cr6fc_status == "8" && TotalDays < 60) {
						if(CGApplPANColl[i].cr6fc_status == "8" && TotalDays < 60) {
						//if (CGApplPANColl[i].cr6fc_sanctionedamount != null && CGApplPANColl[i].cr6fc_sanctionedamount != '') {
							if(CGApplPANColl[i].cr6fc_sanctionedamount != null && CGApplPANColl[i].cr6fc_sanctionedamount != '') {
							//ToatalSanctionAmt = ToatalSanctionAmt + parseFloat(CGApplPANColl[i].cr6fc_sanctionedamount);
							ToatalSanctionAmt = ToatalSanctionAmt + parseFloat(CGApplPANColl[i].cr6fc_sanctionedamount);

						}
					}
					//else if (CGApplPANColl[i].cr6fc_status != "8") {
						else if (CGApplPANColl[i].cr6fc_status != "8") {
						//if (CGApplPANColl[i].cr6fc_sanctionedamount != null && CGApplPANColl[i].cr6fc_sanctionedamount != '') {
							if(CGApplPANColl[i].cr6fc_sanctionedamount != null && CGApplPANColl[i].cr6fc_sanctionedamount != ''){
							//ToatalSanctionAmt = ToatalSanctionAmt + parseFloat(CGApplPANColl[i].cr6fc_sanctionedamount);
							ToatalSanctionAmt = ToatalSanctionAmt + parseFloat(CGApplPANColl[i].cr6fc_sanctionedamount);
						}

					}

				}
				ExcludingCurrSanctionAmt = ToatalSanctionAmt;
				//if (CGColl[0].cr6fc_sanctionedamount != '' && CGColl[0].cr6fc_sanctionedamount != null) {
					if(CGColl[0].cr6fc_sanctionedamount != '' && CGColl[0].cr6fc_sanctionedamount != null){
					//ToatalSanctionAmt = parseFloat(CGColl[0].cr6fc_sanctionedamount) + parseFloat(ToatalSanctionAmt);
					ToatalSanctionAmt = parseFloat(CGColl[0].cr6fc_sanctionedamount) + parseFloat(ToatalSanctionAmt);
				}
			}
			else {
				//ToatalSanctionAmt = CGColl[0].cr6fc_sanctionedamount;
				ToatalSanctionAmt = CGColl[0].cr6fc_sanctionedamount;
			}

		},
		error: function () {
			console.log("error");
		}
	});
}

function bindCGApplicationData(vItemID) {
	//var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CGApplications')//items?$top=500&$select=*,ELIChecker/Title,FPOActivities111/FPOActivity,RegionOfFPO/Region,FPOState/State,BusinessFPOState/State&$expand=RegionOfFPO,FPOActivities111,FPOState,BusinessFPOState,ELIChecker&$filter=(ID eq '"+vItemID+"')";
	//var requestUri = "+location.origin+""/_api/cr6fc_cgapplicationses?$top=5000&$select=*&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name),cr6fc_FPOActivities111($select=cr6fc_fpoactivitiesmasterid,cr6fc_name)&$filter=(cr6fc_cgapplicationsid eq '" + vItemID + "')";
	//var requestHeaders = { "accept": "application/json;odata=verbose" };
	//var requestUri = location.origin+"/_api/cr6fc_cgapplicationses?$top=5000&$select=*&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=(cr6fc_cgapplicationsid eq " + vItemID + ")";
	var requestUri = location.origin+"/_api/cr6fc_cgaplications?$top=5000&$select=*&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=(cr6fc_cgaplicationid eq " + vItemID + ")";
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
					// cgappfilename = Logg[0].cr6fc_nscheckercgappfile_name;
				//	document.getElementById("txtApplicantID").value = Logg[0].cr6fc_name;
					document.getElementById("txtApplicantID").value= Logg[0].cr6fc_name;
					// document.getElementById("txtNameOfFPO").value=Logg[0].NameOfFPO;
					//$("#txtNameOfFPO").text(Logg[0].cr6fc_nameoffpo);
					$("#txtNameOfFPO").text(Logg[0].cr6fc_nameoffpo);

					//$("#ConstitutionFPO1").val(Logg[0]['cr6fc_constitutionfpo@OData.Community.Display.V1.FormattedValue']);
					$("#ConstitutionFPO1").val(Logg[0]['cr6fc_constitutionfpo@OData.Community.Display.V1.FormattedValue']);

					//$("#FPOActs").text(Logg[0]['cr6fc_fpoacts@OData.Community.Display.V1.FormattedValue']);
					$("#FPOActs").text(Logg[0]['cr6fc_fpoacts@OData.Community.Display.V1.FormattedValue']);
					//$('#txtId').val(Logg[0].cr6fc_cgapplicationsid);
					$('#txtId').val(Logg[0].cr6fc_cgaplicationid);
					$('#flexCheckChecked').prop('disabled', true);

					//document.getElementById("FPOActs").value=Logg[0].FPOActs;
					//document.getElementById("DateOfRegistration").value=Logg[0].DateOfRegistration;
					/*if (Logg[0].cr6fc_dateofregistration != null && Logg[0].cr6fc_dateofregistration != undefined && Logg[0].cr6fc_dateofregistration != '') {
						//document.getElementById("DateOfRegistration").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_dateofregistration));
						const date2 = new Date(Logg[0].cr6fc_dateofregistration);
						const formattedDate2 = date2.toISOString().slice(0, 10);
						document.getElementById("DateOfRegistration").value = formattedDate2;
					}*/
					if (Logg[0].cr6fc_dateofregistration != null && Logg[0].cr6fc_dateofregistration != undefined && Logg[0].cr6fc_dateofregistration != '') {
						//document.getElementById("DateOfRegistration").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_dateofregistration));
						const date2 = new Date(Logg[0].cr6fc_dateofregistration);
						const formattedDate2 = date2.toISOString().slice(0, 10);
						document.getElementById("DateOfRegistration").value = formattedDate2;
					}
					//document.getElementById("PlaceOfRegistration").value = Logg[0].cr6fc_placeofregistration;
					document.getElementById("PlaceOfRegistration").value = Logg[0].cr6fc_placeofregistration;
					//document.getElementById("RegistrationNo").value = Logg[0].cr6fc_registrationno;
					document.getElementById("RegistrationNo").value = Logg[0].cr6fc_registrationno;
					//document.getElementById("PANFPO").value = Logg[0].cr6fc_panfpo;
					document.getElementById("PANFPO").value = Logg[0].cr6fc_panfpo;
					//CGApplPANCollData(Logg[0].cr6fc_panfpo, Logg);
					CGApplPANCollData(Logg[0].cr6fc_panfpo, Logg);
					ChecklistData(Logg);

					//document.getElementById("TANTINFPO").value = Logg[0].cr6fc_tantinfpo;
					document.getElementById("TANTINFPO").value = Logg[0].cr6fc_tantinfpo;
					//document.getElementById("GSTINFPO").value = Logg[0].cr6fc_gstinfpo;
					document.getElementById("GSTINFPO").value = Logg[0].cr6fc_gstinfpo;
					var objRJ = [];
					
					//document.getElementById("FPOActivities").innerHTML=Logg[0]['cr6fc_fpoactivities111@OData.Community.Display.V1.FormattedValue'];
					document.getElementById("FPOActivities").innerHTML=Logg[0]['cr6fc_fpoactivities111@OData.Community.Display.V1.FormattedValue'];
					//$("#FPOAgriBusinessActivity").val(Logg[0]['cr6fc_fpoagribusinessactivity@OData.Community.Display.V1.FormattedValue']);
					$("#FPOAgriBusinessActivity").val(Logg[0]['cr6fc_fpoagribusinessactivity@OData.Community.Display.V1.FormattedValue']);
					//$("#ForwardLinkageFPO").text(Logg[0].cr6fc_forwardlinkagefpo);
					$("#ForwardLinkageFPO").text(Logg[0].cr6fc_forwardlinkagefpo);
					//$("#BackwardLinkageFPO").text(Logg[0].cr6fc_backwardlinkagefpo);
					$("#BackwardLinkageFPO").text(Logg[0].cr6fc_backwardlinkagefpo);
					//$("#RegionOfFPO").val(Logg[0].cr6fc_RegionOfFPO.cr6fc_name);
					$("#RegionOfFPO").val(Logg[0].cr6fc_RegionOfFPO.cr6fc_name);
					/*if (Logg[0].cr6fc_RegionOfFPO.cr6fc_name == "FPO in North Eastern or Hilly Areas") {
						$("#Plains").hide();
						$("#Northen").show();
					}
					else {
						$("#Plains").show();
						$("#Northen").hide();
					}*/
					if (Logg[0].cr6fc_RegionOfFPO.cr6fc_name == "FPO in North Eastern or Hilly Areas") {
						$("#Plains").hide();
						$("#Northen").show();
					}
					else {
						$("#Plains").show();
						$("#Northen").hide();
					}
					//$("#TotalFPOMember").val(Logg[0]['cr6fc_totalfpomember@OData.Community.Display.V1.FormattedValue']);
					$("#TotalFPOMember").val(Logg[0]['cr6fc_totalfpomember@OData.Community.Display.V1.FormattedValue']);
					//$("#TotalMemberNorthen").val(Logg[0]['cr6fc_totalmembernorthen@OData.Community.Display.V1.FormattedValue']);
					$("#TotalMemberNorthen").val(Logg[0]['cr6fc_totalmembernorthen@OData.Community.Display.V1.FormattedValue']);
					//document.getElementById("NoOfLandlessFarmer").value = Logg[0].cr6fc_nooflandlessfarmer;
					document.getElementById("NoOfLandlessFarmer").value = Logg[0].cr6fc_nooflandlessfarmer;
					//document.getElementById("NoofSmallFarmer").value = Logg[0].cr6fc_noofsmallfarmer;
					document.getElementById("NoofSmallFarmer").value = Logg[0].cr6fc_noofsmallfarmer;
					//document.getElementById("NoOfMarginalFarmer").value = Logg[0].cr6fc_noofmarginalfarmer;
					document.getElementById("NoOfMarginalFarmer").value = Logg[0].cr6fc_noofmarginalfarmer;
					//document.getElementById("NoOfBigFarmer").value = Logg[0].cr6fc_noofbigfarmer;
					document.getElementById("NoOfBigFarmer").value = Logg[0].cr6fc_noofbigfarmer;
					//document.getElementById("FarmerMemberSize").value = Logg[0].cr6fc_farmermembersize;
					document.getElementById("FarmerMemberSize").value = Logg[0].cr6fc_farmermembersize;
					//document.getElementById("NoOfWomenFarmer").value = Logg[0].cr6fc_noofwomenfarmer;
					document.getElementById("NoOfWomenFarmer").value = Logg[0].cr6fc_noofwomenfarmer;
					//document.getElementById("NoOfSCFarmer").value = Logg[0].cr6fc_noofscfarmer;
					document.getElementById("NoOfSCFarmer").value = Logg[0].cr6fc_noofscfarmer;
					//document.getElementById("NoOfSTFarmer").value = Logg[0].cr6fc_noofstfarmer;
					document.getElementById("NoOfSTFarmer").value = Logg[0].cr6fc_noofstfarmer;
					//document.getElementById("FPODistrict").value = Logg[0].cr6fc_fpodistrict;
					document.getElementById("FPODistrict").value = Logg[0].cr6fc_fpodistrict;
					//document.getElementById("ExistingRegisteredOfficeAddress").value = Logg[0].cr6fc_existingregisteredofficeaddress;
					document.getElementById("ExistingRegisteredOfficeAddress").value = Logg[0].cr6fc_existingregisteredofficeaddress;
					/*$("#ExistingRegisteredOfficeAddress").text(Logg[0].cr6fc_existingregisteredofficeaddress);
					if (Logg[0]['cr6fc_businessaddresssameregiaddress@OData.Community.Display.V1.FormattedValue'] == "Yes") {
						$("#otherdetilfpo").hide();
						$("#busineefpoadd").hide();
						$("#busineefpostate").hide();
					}
					else {
						$("#otherdetilfpo").show();
						$("#busineefpoadd").show();
						$("#busineefpostate").show();
					}*/
					$("#ExistingRegisteredOfficeAddress").text(Logg[0].cr6fc_existingregisteredofficeaddress);
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

					//$("#FPOState").val(Logg[0].cr6fc_FPOState.cr6fc_name);
					$("#FPOState").val(Logg[0].cr6fc_FPOState.cr6fc_name);
					//$("#FPOCity").val(Logg[0].cr6fc_fpocity);
					$("#FPOCity").val(Logg[0].cr6fc_fpocity);
					//document.getElementById("FPOPincode").value = Logg[0].cr6fc_fpopincode;
					document.getElementById("FPOPincode").value = Logg[0].cr6fc_fpopincode;
					//document.getElementById("GeoLatituteLocation").value = Logg[0].cr6fc_geolatitutelocation;
					document.getElementById("GeoLatituteLocation").value = Logg[0].cr6fc_geolatitutelocation;
					//document.getElementById("GeoLongituteLocation").value = Logg[0].cr6fc_geolongitutelocation;
					document.getElementById("GeoLongituteLocation").value = Logg[0].cr6fc_geolongitutelocation;
					//$("#BusinessAddress").val(Logg[0]['cr6fc_businessaddresssameregiaddress@OData.Community.Display.V1.FormattedValue'])
					$("#BusinessAddress").val(Logg[0]['cr6fc_businessaddresssameregiaddress@OData.Community.Display.V1.FormattedValue'])
					//$("#BusinessFPOcity").val(Logg[0].cr6fc_businessfpocity);
					$("#BusinessFPOcity").val(Logg[0].cr6fc_businessfpocity);
					//document.getElementById("BusinessFPODistrict").value = Logg[0].cr6fc_businessfpodistrict;
					document.getElementById("BusinessFPODistrict").value = Logg[0].cr6fc_businessfpodistrict;
					//$("#BusinessAddressFPO").text(Logg[0].cr6fc_businessaddressfpo);
					$("#BusinessAddressFPO").text(Logg[0].cr6fc_businessaddressfpo);
					//if(Logg[0].cr6fc_BusinessFPOState!=null){$("#BusinessFPOState").val(Logg[0].cr6fc_BusinessFPOState.cr6fc_name);}
					if(Logg[0].cr6fc_BusinessFPOState!=null){$("#BusinessFPOState").val(Logg[0].cr6fc_BusinessFPOState.cr6fc_name);}
					//document.getElementById("FarmerMemberSize").value = Logg[0].cr6fc_farmermembersize;
					document.getElementById("FarmerMemberSize").value = Logg[0].cr6fc_farmermembersize;
					//document.getElementById("BusinessFPOPincode").value = Logg[0].cr6fc_businessfpopincode;
					document.getElementById("BusinessFPOPincode").value = Logg[0].cr6fc_businessfpopincode;
					//document.getElementById("GeoLatituteLocationFPO").value = Logg[0].cr6fc_geolatitutelocationfpo;
					document.getElementById("GeoLatituteLocationFPO").value = Logg[0].cr6fc_geolatitutelocationfpo;
					//document.getElementById("GeoLongituteLocationFPO").value = Logg[0].cr6fc_geolongitutelocationfpo;
					document.getElementById("GeoLongituteLocationFPO").value = Logg[0].cr6fc_geolongitutelocationfpo;
					//$("#NewFPO").text(Logg[0]['cr6fc_newfpo@OData.Community.Display.V1.FormattedValue']);
					$("#NewFPO").text(Logg[0]['cr6fc_newfpo@OData.Community.Display.V1.FormattedValue']);
					//document.getElementById("FPOAvailedGOIScheme").value = Logg[0]['cr6fc_fpoavailedgoischeme@OData.Community.Display.V1.FormattedValue'];
					document.getElementById("FPOAvailedGOIScheme").value = Logg[0]['cr6fc_fpoavailedgoischeme@OData.Community.Display.V1.FormattedValue'];
					//if (Logg[0]['cr6fc_fpoavailedgoischeme@OData.Community.Display.V1.FormattedValue'] == "Yes") {
						if (Logg[0]['cr6fc_fpoavailedgoischeme@OData.Community.Display.V1.FormattedValue'] == "Yes") {
						$("#creditfacility").show();
						$("#crodetails").hide();
					}
					else {
						$("#creditfacility").hide();
						$("#crodetails").hide();
					}
					//document.getElementById("CGPAN").value = Logg[0].cr6fc_cgpan;
					document.getElementById("CGPAN").value = Logg[0].cr6fc_cgpan;
					//document.getElementById("TotalSanctionedAmount").value = Logg[0].cr6fc_totalsanctionedamount;
					document.getElementById("TotalSanctionedAmount").value = Logg[0].cr6fc_totalsanctionedamount;
					//document.getElementById("TypeOfCreditFacility").value = Logg[0]['cr6fc_typeofcreditfacility@OData.Community.Display.V1.FormattedValue'];
					document.getElementById("TypeOfCreditFacility").value = Logg[0]['cr6fc_typeofcreditfacility@OData.Community.Display.V1.FormattedValue'];
					//document.getElementById("TypeOfCreditFacility").value=Logg[0].TypeOfCreditFacility;
					//if (Logg[0].cr6fc_validitycreditguarantee !== undefined && Logg[0].cr6fc_validitycreditguarantee !== null && Logg[0].cr6fc_validitycreditguarantee !== '') {
						if (Logg[0].cr6fc_validitycreditguarantee !== undefined && Logg[0].cr6fc_validitycreditguarantee !== null && Logg[0].cr6fc_validitycreditguarantee !== '') {
						//document.getElementById("ValidityCreditGuarantee").value=Logg[0].ValidityCreditGuarantee.substring(0,Logg[0].ValidityCreditGuarantee.indexOf("T"));;
						//document.getElementById("ValidityCreditGuarantee").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_validitycreditguarantee));
						//const date = new Date(Logg[0].cr6fc_validitycreditguarantee);
						const date = new Date(Logg[0].cr6fc_validitycreditguarantee);
						const formattedDate = date.toISOString().slice(0, 10);
						document.getElementById("ValidityCreditGuarantee").value = formattedDate;
					}
					//document.getElementById("NameOfCEO").value = Logg[0].cr6fc_nameofceo;
					document.getElementById("NameOfCEO").value = Logg[0].cr6fc_nameofceo;
					//$("#NameOfCEO").text(Logg[0].cr6fc_nameofceo);
					$("#NameOfCEO").text(Logg[0].cr6fc_nameofceo);
					//document.getElementById("ContactCEO").value = Logg[0].cr6fc_contactceo;
					document.getElementById("ContactCEO").value = Logg[0].cr6fc_contactceo;
					//document.getElementById("MobileCEO").value = Logg[0].cr6fc_mobileceo;
					document.getElementById("MobileCEO").value = Logg[0].cr6fc_mobileceo;
					//document.getElementById("EmailIDCEO").value = Logg[0].cr6fc_emailidceo;
					document.getElementById("EmailIDCEO").value = Logg[0].cr6fc_emailidceo;
					//document.getElementById("CustomerID").value = Logg[0].cr6fc_customerid;
					document.getElementById("CustomerID").value = Logg[0].cr6fc_customerid;
				//	$("#LendingAssesmentTool").text(Logg[0]['cr6fc_lendingassesmenttool@OData.Community.Display.V1.FormattedValue']);
					$("#LendingAssesmentTool").text(Logg[0]['cr6fc_lendingassesmenttool@OData.Community.Display.V1.FormattedValue']);
					//document.getElementById("LendingAssesmentTool").value=Logg[0].LendingAssesmentTool;
					//$("#TypeofFacility").val(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue']);
					$("#TypeofFacility").val(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue']);
					//document.getElementById("TypeofFacility").value=Logg[0].TypeofFacility;
					/*var objRJ1=[];
				if (Logg[0]['cr6fc_purposeofthecreditfacility@OData.Community.Display.V1.FormattedValue'].results.length > 0) {
					for (var n = 0; n < Logg[0]['cr6fc_purposeofthecreditfacility@OData.Community.Display.V1.FormattedValue'].results.length; n++) {
						console.log(objRJ);
						var a = Logg[0]['cr6fc_purposeofthecreditfacility@OData.Community.Display.V1.FormattedValue'].results[n];
						objRJ1.push(a)
					}
					var objRJNew1=String(objRJ1)*///.join(',')
					/*}*/
				//	$("#PurposeOftheCreditFacility").text(Logg[0]['cr6fc_purposeofthecreditfacility@OData.Community.Display.V1.FormattedValue']);
					$("#PurposeOftheCreditFacility").text(Logg[0]['cr6fc_purposeofthecreditfacility@OData.Community.Display.V1.FormattedValue']);
					//$("#CreditFacilityUtilised").val(Logg[0].cr6fc_creditfacilityutilised);
					$("#CreditFacilityUtilised").val(Logg[0].cr6fc_creditfacilityutilised);
					//if ((Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue']) == "Term Loan OR WCTL (Working Capital Term Loan)" || (Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue']) == "Term Loan OR Working Capital Term Loan(WCTL)") {
						if ((Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue']) == "Term Loan OR WCTL (Working Capital Term Loan)" || (Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue']) == "Term Loan OR Working Capital Term Loan(WCTL)") {
						$("#termloandet").show();
						$("#LoanorWTCL").show();
						$("#wcclimitdetail").hide();
						$("#WCCCLimit").hide();

						//document.getElementById("AccountNo").value = Logg[0].cr6fc_accountno;
						document.getElementById("AccountNo").value = Logg[0].cr6fc_accountno;
						//document.getElementById("hdnAccountNo").value=Logg[0].cr6fc_accountno;

						/*document.getElementById("SanctionedAmount").value = Logg[0].cr6fc_sanctionedamount;
						var Word = convertNumberToWords(Math.ceil(Logg[0].cr6fc_sanctionedamount));
						console.log(Word);
						$('#SanctionedAmountinwords').text("Rupees " + " " + Word + " " + "Only");*/

						document.getElementById("SanctionedAmount").value = Logg[0].cr6fc_sanctionedamount;
						var Word = convertNumberToWords(Math.ceil(Logg[0].cr6fc_sanctionedamount));
						console.log(Word);
						$('#SanctionedAmountinwords').text("Rupees " + " " + Word + " " + "Only");
						//document.getElementById("hdnSanctionAmt").value=Logg[0].cr6fc_sanctionedamount;                
						/*if (Logg[0].cr6fc_dateofsanction !== undefined && Logg[0].cr6fc_dateofsanction !== null && Logg[0].cr6fc_dateofsanction !== '') {
							//document.getElementById("DateOfSanction").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_dateofsanction));
							const date1 = new Date(Logg[0].cr6fc_dateofsanction);
							const formattedDate1 = date1.toISOString().slice(0, 10);
							document.getElementById("DateOfSanction").value = formattedDate1;
						}*/
						if (Logg[0].cr6fc_dateofsanction !== undefined && Logg[0].cr6fc_dateofsanction !== null && Logg[0].cr6fc_dateofsanction !== '') {
							//document.getElementById("DateOfSanction").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_dateofsanction));
							const date1 = new Date(Logg[0].cr6fc_dateofsanction);
							const formattedDate1 = date1.toISOString().slice(0, 10);
							document.getElementById("DateOfSanction").value = formattedDate1;
						}
						/*if (Logg[0].cr6fc_enddateofinterestmoratium !== undefined && Logg[0].cr6fc_enddateofinterestmoratium !== null && Logg[0].cr6fc_enddateofinterestmoratium !== '') {
							//document.getElementById("EndDateOfInterestMoratium").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_enddateofinterestmoratium));
							const date3 = new Date(Logg[0].cr6fc_enddateofinterestmoratium);
							const formattedDate3 = date3.toISOString().slice(0, 10);
							document.getElementById("EndDateOfInterestMoratium").value = formattedDate3;
						}*/
						if (Logg[0].cr6fc_enddateofinterestmoratium !== undefined && Logg[0].cr6fc_enddateofinterestmoratium !== null && Logg[0].cr6fc_enddateofinterestmoratium !== '') {
							//document.getElementById("EndDateOfInterestMoratium").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_enddateofinterestmoratium));
							const date3 = new Date(Logg[0].cr6fc_enddateofinterestmoratium);
							const formattedDate3 = date3.toISOString().slice(0, 10);
							document.getElementById("EndDateOfInterestMoratium").value = formattedDate3;
						}
						/*if (Logg[0].cr6fc_enddateofprinciplemoratium !== undefined && Logg[0].cr6fc_enddateofprinciplemoratium !== null && Logg[0].cr6fc_enddateofprinciplemoratium !== '') {
							//document.getElementById("EndDateOfPrincipleMoratium").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_enddateofprinciplemoratium));
							const date4 = new Date(Logg[0].cr6fc_enddateofprinciplemoratium);
							const formattedDate4 = date4.toISOString().slice(0, 10);
							document.getElementById("EndDateOfPrincipleMoratium").value = formattedDate4;
						}*/
						if (Logg[0].cr6fc_enddateofprinciplemoratium !== undefined && Logg[0].cr6fc_enddateofprinciplemoratium !== null && Logg[0].cr6fc_enddateofprinciplemoratium !== '') {
							//document.getElementById("EndDateOfPrincipleMoratium").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_enddateofprinciplemoratium));
							const date4 = new Date(Logg[0].cr6fc_enddateofprinciplemoratium);
							const formattedDate4 = date4.toISOString().slice(0, 10);
							document.getElementById("EndDateOfPrincipleMoratium").value = formattedDate4;
						}
						/*if (Logg[0].cr6fc_duedateoflastinstallment !== undefined && Logg[0].cr6fc_duedateoflastinstallment !== null && Logg[0].cr6fc_duedateoflastinstallment !== '') {
							//document.getElementById("DueDateOfLastInstallment").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_duedateoflastinstallment));
							const date5 = new Date(Logg[0].cr6fc_duedateoflastinstallment);
							const formattedDate5 = date5.toISOString().slice(0, 10);
							document.getElementById("DueDateOfLastInstallment").value = formattedDate5;
						}*/
						if (Logg[0].cr6fc_duedateoflastinstallment !== undefined && Logg[0].cr6fc_duedateoflastinstallment !== null && Logg[0].cr6fc_duedateoflastinstallment !== '') {
							//document.getElementById("DueDateOfLastInstallment").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_duedateoflastinstallment));
							const date5 = new Date(Logg[0].cr6fc_duedateoflastinstallment);
							const formattedDate5 = date5.toISOString().slice(0, 10);
							document.getElementById("DueDateOfLastInstallment").value = formattedDate5;
						}
						//document.getElementById("InterestRate").value = Logg[0].cr6fc_interestrate;
						document.getElementById("InterestRate").value = Logg[0].cr6fc_interestrate;
						//$("#CreditFacilityFundAgriInfra").val(Logg[0]['cr6fc_creditfacilityfundagriinfra@OData.Community.Display.V1.FormattedValue']);
						$("#CreditFacilityFundAgriInfra").val(Logg[0]['cr6fc_creditfacilityfundagriinfra@OData.Community.Display.V1.FormattedValue']);
						// document.getElementById("CreditFacilityFundAgriInfra").value=Logg[0].CreditFacilityFundAgriInfra;
						//$("#LoanFullyDisbured").val(Logg[0]['cr6fc_loanfullydisbured@OData.Community.Display.V1.FormattedValue']);
						$("#LoanFullyDisbured").val(Logg[0]['cr6fc_loanfullydisbured@OData.Community.Display.V1.FormattedValue']);
						//document.getElementById("LoanFullyDisbured").value=Logg[0].LoanFullyDisbured;
						//document.getElementById("OutstandingAmountOnDate").value = Logg[0].cr6fc_outstandingamountondate;
						document.getElementById("OutstandingAmountOnDate").value = Logg[0].cr6fc_outstandingamountondate;
						//document.getElementById("MeansOfFinanaceTermLoan").value = Logg[0].cr6fc_meansoffinanacetermloan;
						document.getElementById("MeansOfFinanaceTermLoan").value = Logg[0].cr6fc_meansoffinanacetermloan;
						//document.getElementById("PromoterEquityMargin").value = Logg[0].cr6fc_promoterequitymargin;
						document.getElementById("PromoterEquityMargin").value = Logg[0].cr6fc_promoterequitymargin;
						//document.getElementById("UNsecuredLoan").value = Logg[0].cr6fc_unsecuredloan;
						document.getElementById("UNsecuredLoan").value = Logg[0].cr6fc_unsecuredloan;
						//document.getElementById("AnyOtherSource").value = Logg[0].cr6fc_anyothersources;
						document.getElementById("AnyOtherSource").value = Logg[0].cr6fc_anyothersources;
						//$('#totalAmountvalue').text(Logg[0].cr6fc_totalamount);
						$('#totalAmountvalue').text(Logg[0].cr6fc_totalamount);

					}
					/*else if (Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'] == "WC/CC Limit") {
						$("#wcclimitdetail").show();
						$("#WCCCLimit").show();
						$("#termloandet").hide();
						$("#LoanorWTCL").hide();*/
						else if (Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'] == "WC/CC Limit") {
							$("#wcclimitdetail").show();
							$("#WCCCLimit").show();
							$("#termloandet").hide();
							$("#LoanorWTCL").hide();
						//document.getElementById("hdnSanctionAmt").value=Logg[0].cr6fc_sanctionedamount;

						//document.getElementById("AccountNoLimitDetail").value = Logg[0].cr6fc_accountno;
						document.getElementById("AccountNoLimitDetail").value = Logg[0].cr6fc_accountno;
						//document.getElementById("hdnAccountNo").value=Logg[0].cr6fc_accountno;
                             //$("#SanctionedAmountWCDetail").val(Logg[0].cr6fc_sanctionedamount);
							 $("#SanctionedAmountWCDetail").val(Logg[0].cr6fc_sanctionedamount);
					//	document.getElementById("SanctionedAmountWCDetail").value = Logg[0].cr6fc_sanctionedamount;
						// var Words = convertNumberToWords(Math.ceil(Logg[0].cr6fc_sanctionedamount));
						// $('#SanctionedAmountWCDetail').text("Rupees " + " " + Words + " " + "Only");
						/*if (Logg[0].cr6fc_dateofsanction !== undefined && Logg[0].cr6fc_dateofsanction !== null && Logg[0].cr6fc_dateofsanction !== '') {
							//document.getElementById("DateOfSanction").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_dateofsanction));
							const date1 = new Date(Logg[0].cr6fc_dateofsanction);
							const formattedDate1 = date1.toISOString().slice(0, 10);
							document.getElementById("SanctionedDate").value = formattedDate1;
						}*/
						if (Logg[0].cr6fc_dateofsanction !== undefined && Logg[0].cr6fc_dateofsanction !== null && Logg[0].cr6fc_dateofsanction !== '') {
							//document.getElementById("DateOfSanction").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_dateofsanction));
							const date1 = new Date(Logg[0].cr6fc_dateofsanction);
							const formattedDate1 = date1.toISOString().slice(0, 10);
							document.getElementById("SanctionedDate").value = formattedDate1;
						}
						/*if (Logg[0].cr6fc_enddateofmoratium !== undefined && Logg[0].cr6fc_enddateofmoratium !== null && Logg[0].cr6fc_enddateofmoratium !== '') {
							//document.getElementById("EndDateOfInterestMoratium").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_enddateofinterestmoratium));
							const date3 = new Date(Logg[0].cr6fc_enddateofmoratium);
							const formattedDate3 = date3.toISOString().slice(0, 10);
							document.getElementById("EndDateOfMoratium").value = formattedDate3;
						}*/
						if (Logg[0].cr6fc_enddateofmoratium !== undefined && Logg[0].cr6fc_enddateofmoratium !== null && Logg[0].cr6fc_enddateofmoratium !== '') {
							//document.getElementById("EndDateOfInterestMoratium").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_enddateofinterestmoratium));
							const date3 = new Date(Logg[0].cr6fc_enddateofmoratium);
							const formattedDate3 = date3.toISOString().slice(0, 10);
							document.getElementById("EndDateOfMoratium").value = formattedDate3;
						}
						/*if (Logg[0].cr6fc_validityenddate !== undefined && Logg[0].cr6fc_validityenddate !== null && Logg[0].cr6fc_validityenddate !== '') {
							//document.getElementById("EndDateOfPrincipleMoratium").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_enddateofprinciplemoratium));
							const date4 = new Date(Logg[0].cr6fc_validityenddate);
							const formattedDate4 = date4.toISOString().slice(0, 10);
							document.getElementById("ValidityEndDate").value = formattedDate4;
						}*/
						if (Logg[0].cr6fc_validityenddate !== undefined && Logg[0].cr6fc_validityenddate !== null && Logg[0].cr6fc_validityenddate !== '') {
							//document.getElementById("EndDateOfPrincipleMoratium").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_enddateofprinciplemoratium));
							const date4 = new Date(Logg[0].cr6fc_validityenddate);
							const formattedDate4 = date4.toISOString().slice(0, 10);
							document.getElementById("ValidityEndDate").value = formattedDate4;
						}
						/*if (Logg[0].cr6fc_duedateoflastinstallment !== undefined && Logg[0].cr6fc_duedateoflastinstallment !== null && Logg[0].cr6fc_duedateoflastinstallment !== '') {
							//document.getElementById("DueDateOfLastInstallment").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_duedateoflastinstallment));
							const date5 = new Date(Logg[0].cr6fc_duedateoflastinstallment);
							const formattedDate5 = date5.toISOString().slice(0, 10);
							document.getElementById("DueDateOfLastInstallment").value = formattedDate5;
						}*/
						//document.getElementById("DrawingPower").value=Logg[0].cr6fc_drawingpower;
						document.getElementById("DrawingPower").value=Logg[0].cr6fc_drawingpower;
						//document.getElementById("InterestRateDetail").value = Logg[0].cr6fc_interestrate;
						document.getElementById("InterestRateDetail").value = Logg[0].cr6fc_interestrate;
						//$("#FullyLoanDisbursed").val(Logg[0]['cr6fc_loanfullydisbured@OData.Community.Display.V1.FormattedValue']);
						$("#FullyLoanDisbursed").val(Logg[0]['cr6fc_loanfullydisbured@OData.Community.Display.V1.FormattedValue']);
						//document.getElementById("FullyLoanDisbursed").value=Logg[0].FullyLoanDisbursed;
						//document.getElementById("CCOutstandingAmountOnDate").value=Logg[0].cr6fc_outstandingamountondate;
						document.getElementById("CCOutstandingAmountOnDate").value=Logg[0].cr6fc_outstandingamountondate;
						//document.getElementById("MeansOfFinanaceTermLoan1").value=Logg[0].cr6fc_meansoffinanacetermloan;
						document.getElementById("MeansOfFinanaceTermLoan1").value=Logg[0].cr6fc_meansoffinanacetermloan;
					  // document.getElementById("PromoterEquityMargin1").value=Logg[0].cr6fc_promoterequitymargin;
					   document.getElementById("PromoterEquityMargin1").value=Logg[0].cr6fc_promoterequitymargin;
					  // document.getElementById("UNsecuredLoan1").value=Logg[0].cr6fc_unsecuredloan;
					   document.getElementById("UNsecuredLoan1").value=Logg[0].cr6fc_unsecuredloan;
					  // document.getElementById("AnyOtherSource1").value=Logg[0].cr6fc_anyothersources;
					   document.getElementById("AnyOtherSource1").value=Logg[0].cr6fc_anyothersources;
										 // $('#totalAmountvalue1').text(Logg[0].cr6fc_totalamount);
										  $('#totalAmountvalue1').text(Logg[0].cr6fc_totalamount);
					}

					//$("#TermLoanCreditFacility").val(Logg[0].cr6fc_termloancreditfacility);
					$("#TermLoanCreditFacility").val(Logg[0].cr6fc_termloancreditfacility);
					//document.getElementById("TermLoanCreditFacility").value=Logg[0].TermLoanCreditFacility;
					//document.getElementById("ProjectCostInput").value = Logg[0].cr6fc_projectcostinput;
					document.getElementById("ProjectCostInput").value = Logg[0].cr6fc_projectcostinput;
					///document.getElementById("ProjectCostMarketing").value = Logg[0].cr6fc_projectcostmarketing;
					document.getElementById("ProjectCostMarketing").value = Logg[0].cr6fc_projectcostmarketing;
					//document.getElementById("ProjectCostProcessing").value = Logg[0].cr6fc_projectcostprocessing;
					document.getElementById("ProjectCostProcessing").value = Logg[0].cr6fc_projectcostprocessing;
					//document.getElementById("ProjectCostOther").value = Logg[0].cr6fc_projectcostother;
					document.getElementById("ProjectCostOther").value = Logg[0].cr6fc_projectcostother;
					//document.getElementById("ProjectCostTotal").value = Logg[0].cr6fc_projectcosttotal;
					document.getElementById("ProjectCostTotal").value = Logg[0].cr6fc_projectcosttotal;
					//document.getElementById("DetailsOfInput").value=Logg[0].DetailsOfInput;
					// document.getElementById("TypeOfSecurity").value=Logg[0].TypeOfSecurity;
					//$("#TypeOfSecurity").text(Logg[0].cr6fc_typeofsecurity);
					$("#TypeOfSecurity").text(Logg[0].cr6fc_typeofsecurity);
					//$("#NatureOfSecurity").val(Logg[0]['cr6fc_natureofsecurity@OData.Community.Display.V1.FormattedValue']);
					$("#NatureOfSecurity").val(Logg[0]['cr6fc_natureofsecurity@OData.Community.Display.V1.FormattedValue']);
					//document.getElementById("ValueOfSecurity").value = Logg[0].cr6fc_valueofsecurity;
					//document.getElementById("NameOfLendingInstitution").value = Logg[0].cr6fc_nameoflendinginstitution;
					document.getElementById("ValueOfSecurity").value = Logg[0].cr6fc_valueofsecurity;
					document.getElementById("NameOfLendingInstitution").value = Logg[0].cr6fc_nameoflendinginstitution;
					/*if (Logg[0].cr6fc_nsapproverremark != null && Logg[0].cr6fc_nsapproverremark !== undefined && Logg[0].cr6fc_nsapproverremark !== '') {
						document.getElementById("hdnNSApproverHistory").value = Logg[0].cr6fc_nsapproverremark;
					}*/
					if (Logg[0].cr6fc_nsapproverremark != null && Logg[0].cr6fc_nsapproverremark !== undefined && Logg[0].cr6fc_nsapproverremark !== '') {
						document.getElementById("hdnNSApproverHistory").value = Logg[0].cr6fc_nsapproverremark;
					}
					//$("#CGIssued").val(Logg[0].cr6fc_cgissued);
					$("#CGIssued").val(Logg[0].cr6fc_cgissued);
					//document.getElementById("CGIssued").value=Logg[0].CGIssued;
					//$("#ExistingCF").val(Logg[0]['cr6fc_existingcf@OData.Community.Display.V1.FormattedValue']);
					$("#ExistingCF").val(Logg[0]['cr6fc_existingcf@OData.Community.Display.V1.FormattedValue']);
					//document.getElementById("ExistingCF").value=Logg[0].ExistingCF;
					//$("#CollateralSecurity").val([Logg[0]['cr6fc_collateralsecurity@OData.Community.Display.V1.FormattedValue']]);
					$("#CollateralSecurity").val([Logg[0]['cr6fc_collateralsecurity@OData.Community.Display.V1.FormattedValue']]);
					//document.getElementById("CollateralSecurity").value=Logg[0].CollateralSecurity;
					/*if (Logg[0]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == 'Review by NABSaranrakshan') {
						$("#txtCheckerStatus").text("Recommend for Approval");
					}*/
					if (Logg[0]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == 'Review by NABSaranrakshan') {
						$("#txtCheckerStatus").text("Recommend for Approval");
					}
					/*else if (Logg[0]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == 'Recommend for Rejection') {
						$("#txtCheckerStatus").text("Recommend for Rejection");
					}*/
					else if (Logg[0]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == 'Recommend for Rejection') {
						$("#txtCheckerStatus").text("Recommend for Rejection");
					}
					else {
						//$("#txtCheckerStatus").text(Logg[0]['cr6fc_status@OData.Community.Display.V1.FormattedValue']);
						$("#txtCheckerStatus").text(Logg[0]['cr6fc_status@OData.Community.Display.V1.FormattedValue']);
					}
					//document.getElementById("txtCheckerStatus").value=Logg[0].Status;
					// $("#txtCheckerRemark").text(Logg[0].NSChackerRemark);
					/*if (Logg[0].cr6fc_nschackerremark != null && Logg[0].cr6fc_nschackerremark != undefined && Logg[0].cr6fc_nschackerremark != '') {
						$('#NSCheckerDiv').show();
						$("#txtCheckerRemark").text(Logg[0].cr6fc_nschackerremark);
						document.getElementById("txtCheckerRemark1").innerHTML = Logg[0].cr6fc_nschackerremark;
					}*/
					if (Logg[0].cr6fc_nschackerremark != null && Logg[0].cr6fc_nschackerremark != undefined && Logg[0].cr6fc_nschackerremark != '') {
						$('#NSCheckerDiv').show();
						$("#txtCheckerRemark").text(Logg[0].cr6fc_nschackerremark);
						document.getElementById("txtCheckerRemark1").innerHTML = Logg[0].cr6fc_nschackerremark;
					}

					/*if (Logg[0].cr6fc_nsapproverremark != null && Logg[0].cr6fc_nsapproverremark != undefined && Logg[0].cr6fc_nsapproverremark != '') {
						$('#NSDiv').show();
						//$("#txtCheckerRemark").text(Logg[0].NSChackerRemark);
						document.getElementById("txtNSAppproverRemark1").innerHTML = Logg[0].cr6fc_nsapproverremark;
					}*/
					if (Logg[0].cr6fc_nsapproverremark != null && Logg[0].cr6fc_nsapproverremark != undefined && Logg[0].cr6fc_nsapproverremark != '') {
						$('#NSDiv').show();
						//$("#txtCheckerRemark").text(Logg[0].NSChackerRemark);
						document.getElementById("txtNSAppproverRemark1").innerHTML = Logg[0].cr6fc_nsapproverremark;
					}

					/*if (Logg[0].cr6fc_eilcheckercertificateviewdate != null && Logg[0].cr6fc_eilcheckercertificateviewdate != undefined && Logg[0].cr6fc_eilcheckercertificateviewdate != '') {
						$('#dtproceed').text(GetCreatedDateTime(Logg[0].cr6fc_eilcheckercertificateviewdate))
					}
					document.getElementById("txtCGApplicationNo").value = Logg[0].cr6fc_name;

					document.getElementById("txtNameOfFPO1").value = Logg[0].cr6fc_nameoffpo;
					$("#txtELICheckerName").text(Logg[0]['_cr6fc_elichecker_value@OData.Community.Display.V1.FormattedValue']);
					$("#instituteId").text(Logg[0].cr6fc_nameoflendinginstitution);
					$("#instituteIdNew").text(Logg[0].cr6fc_nameoflendinginstitution);

					bindSOEDetailsData(Logg[0].cr6fc_cgapplicationsid)*/


					if (Logg[0].cr6fc_eilcheckercertificateviewdate != null && Logg[0].cr6fc_eilcheckercertificateviewdate != undefined && Logg[0].cr6fc_eilcheckercertificateviewdate != '') {
						$('#dtproceed').text(GetCreatedDateTime(Logg[0].cr6fc_eilcheckercertificateviewdate))
					}
					document.getElementById("txtCGApplicationNo").value = Logg[0].cr6fc_name;

					document.getElementById("txtNameOfFPO1").value = Logg[0].cr6fc_nameoffpo;
					$("#txtELICheckerName").text(Logg[0]['_cr6fc_elichecker_value@OData.Community.Display.V1.FormattedValue']);
					$("#instituteId").text(Logg[0].cr6fc_nameoflendinginstitution);
					$("#instituteIdNew").text(Logg[0].cr6fc_nameoflendinginstitution);

					bindSOEDetailsData(Logg[0].cr6fc_cgaplicationid)
					//document.getElementById("txtCheckerRemark").val=Logg[0].txtCheckerRemark;
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

function getOtherDocDataLatest(vItemID) {
	//txtCMACNo=document.getElementById("txtCMACNo").value;

	var queryList = "";
	// queryList = _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/GetByTitle('TemplateVersion')/Items?$select=*,File/Name,EncodedAbsUrl,ProductID&$expand=File&$filter=(ProductID eq '"+ItemId+"')&$top=1&$orderby=ID desc"; //
	queryList = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('GeneralDocument')/Items?$select=*,File/Name,EncodedAbsUrl&$expand=File&$filter=Title eq '" + vItemID + "' and DocType eq 'NSChecker'&$top=5000&$orderby=ID desc"; //

	$.ajax({
		url: queryList,
		method: 'GET',
		async: false,
		headers: {
			"accept": "application/json;odata=verbose",
			"content-type": "application/json;odata=verbose",
		},
		success: function (data) {
			var DocData = data.d.results;
			var AttachmentFiles = '';
			if (DocData.length > 0) {
				//AttachmentFiles = data.d.results[t].AttachmentFiles.results;
				//	var AttcFileColl=[];
				var appendDocuments = [];
				var Filename = '';
				var ServRel = '';

				for (var s = 0; s < DocData.length; s++) {

					Filename = DocData[s].File.Name;
					var len = DocData[s].File.Name.length;
					if (len > 40) {
						var Fname1 = (Filename.substr(0, 40) + '...');
						//$('#hdnDoc').text($('#hdnDoc').text().substr(0,10)+'...');
					}
					else {
						Fname1 = Filename;
					}
					ServRel = DocData[s].EncodedAbsUrl;
					appendDocuments += '<div><div><a  onClick="DeleteOtherItemAttachment(this,\'' + Filename + '\')"></a><a href="' + ServRel + '" target="_blank">' + Fname1 + '<br/>&nbsp;&nbsp;&nbsp;&nbsp;</a></div></div>'
					//globalAttchFileNameColl.push(Filename);
					//<span class="fa fa-remove" data-toggle="tooltip" title="Delete" style="color:red !important;"></span>
				}
				$('#additionalDocs').append(appendDocuments);
			}
			else {
				//$('#additionalDocs').append("No Supporting Documents attached.");//commented by shivaprabha
				$('#additionalDocs').append("no supporting documents.");//added by shivaprabha
			}

		},
		error: function (data, errorCode, errorMessage) {
			console.log('An error occurred while searching for mapping content - ' + errorMessage);

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

	var filterRegion = $.grep(RegionMasterColl, function (value) {
		//return (value.cr6fc_regionmasterid == Logg[0].cr6fc_RegionOfFPO.cr6fc_regionmasterid);
		return (value.cr6fc_regionmasterid == Logg[0].cr6fc_RegionOfFPO.cr6fc_regionmasterid);
	});

	var vHTMLHeaderTBL = "<table class='blueTable table-bordered checklist' style='width: 99.9%; ' cellspacing='0'><tr style='background-color:#808080'>" +
		"<td  class='form-group'><font color='white' style='font-size:18px !important;'><b>Compliance Required</b></font></td>" +
		"<td style='text-align:center'  class='form-group'><font color='white' style='font-size:18px !important;'><b>Complied</b></font></td>" +
		"<td  class='form-group'><font color='white' style='font-size:18px !important;'><b>Value</b></font></td>" +
		"</tr>";
	vHTML += "<tr>"
	vHTML += "<td class='form-group'><font color='Black' style='font-size:15px !important'><b>1.&nbspShare-holder Members No. as per CGS-FPO</b></font></td>"

	//if (Logg[0].cr6fc_RegionOfFPO.cr6fc_name == "FPO in Plains") {
		if (Logg[0].cr6fc_RegionOfFPO.cr6fc_name == "FPO in Plains") {
		//if (parseInt(Logg[0].cr6fc_farmermembersize) >= parseInt(filterRegion[0].cr6fc_minmembers)) {
			if (parseInt(Logg[0].cr6fc_farmermembersize) >= parseInt(filterRegion[0].cr6fc_minmembers)) {
			//FPOMemberCount=
			vHTML += "<td style='text-align:center'><img style='width:25px' src="+location.origin+"/correct.png></td>"

		}
		else {
			vHTML += "<td style='text-align:center'><img style='width:25px' src="+location.origin+"/remove1.png></td>"
		}

		//divFPORegion += "<div class='form-group'><p style='font-size:15px !important;'>Region of the FPO :- " + Logg[0].cr6fc_RegionOfFPO.cr6fc_name + "</p><p style='font-size:15px !important;'>Total No of Member :- " + Logg[0]['cr6fc_totalfpomember@OData.Community.Display.V1.FormattedValue'] + "</p><p style='font-size:15px !important;'>Total Farmer Member Size :- " + Logg[0].cr6fc_farmermembersize + "</p></div>"
divFPORegion += "<div class='form-group'><p style='font-size:15px !important;'>Region of the FPO :- " + Logg[0].cr6fc_RegionOfFPO.cr6fc_name + "</p><p style='font-size:15px !important;'>Total No of Member :- " + Logg[0]['cr6fc_totalfpomember@OData.Community.Display.V1.FormattedValue'] + "</p><p style='font-size:15px !important;'>Total Farmer Member Size :- " + Logg[0].cr6fc_farmermembersize + "</p></div>"

	}
	//else if (Logg[0].cr6fc_RegionOfFPO.cr6fc_name == "FPO in North Eastern or Hilly Areas") {
		//if (parseInt(Logg[0].cr6fc_farmermembersize) >= parseInt(filterRegion[0].cr6fc_minmembers)) {
			else if (Logg[0].cr6fc_RegionOfFPO.cr6fc_name == "FPO in North Eastern or Hilly Areas") {
				if (parseInt(Logg[0].cr6fc_farmermembersize) >= parseInt(filterRegion[0].cr6fc_minmembers)) {
			//FPOMemberCount=
			vHTML += "<td style='text-align:center'><img style='width:25px' src="+location.origin+"/correct.png></td>"

		}
		else {
			vHTML += "<td style='text-align:center'><img style='width:25px' src="+location.origin+"/remove1.png></td>"
		}

		//divFPORegion += "<div class='form-group'><p style='font-size:15px !important;'>Region of the FPO :- " + Logg[0].cr6fc_RegionOfFPO.cr6fc_name + "</p><p style='font-size:15px !important;'>Total No of Member :- " + Logg[0]['cr6fc_totalmembernorthen@OData.Community.Display.V1.FormattedValue'] + "</p><p style='font-size:15px !important;'>Total Farmer Member Size :- " + Logg[0].cr6fc_farmermembersize + "</p></div>"
divFPORegion += "<div class='form-group'><p style='font-size:15px !important;'>Region of the FPO :- " + Logg[0].cr6fc_RegionOfFPO.cr6fc_name + "</p><p style='font-size:15px !important;'>Total No of Member :- " + Logg[0]['cr6fc_totalmembernorthen@OData.Community.Display.V1.FormattedValue'] + "</p><p style='font-size:15px !important;'>Total Farmer Member Size :- " + Logg[0].cr6fc_farmermembersize + "</p></div>"

	}
	if (divFPORegion != '') {
		vHTML += "<td><font color='Black' style='font-size:15px !important;'><b>" + divFPORegion + "</b></font></td>"
	}
	else {
		vHTML += "<td></td>";
	}
	vHTML += "</tr><tr style='height: 44px !important;'>"
	//vHTML += "<tr>"
	vHTML += "<td class='form-group'><font color='Black' style='font-size:15px !important'><b>2.&nbspFPO is connected with Agri- Business activities</b></font></td>";
	//if (Logg[0]['cr6fc_fpoagribusinessactivity@OData.Community.Display.V1.FormattedValue'] == "Yes") {
		if (Logg[0]['cr6fc_fpoagribusinessactivity@OData.Community.Display.V1.FormattedValue'] == "Yes") {
		vHTML += "<td style='text-align:center'><img style='width:25px' src="+location.origin+"/correct.png></td>";
	}
	else {
		vHTML += "<td style='text-align:center'><img style='width:25px' src="+location.origin+"/remove1.png></td>";
	}
	//vHTML += "<td class='form-group'><font color='Black' style='font-size:15px !important'>" + Logg[0]['cr6fc_fpoagribusinessactivity@OData.Community.Display.V1.FormattedValue'] + "</font></td>"
	vHTML += "<td class='form-group'><font color='Black' style='font-size:15px !important'>" + Logg[0]['cr6fc_fpoagribusinessactivity@OData.Community.Display.V1.FormattedValue'] + "</font></td>"
	vHTML += "</tr><tr>"
	vHTML += "<td class='form-group'><font color='Black' style='font-size:15px !important'><b>3.&nbspCG Application applied within the stipulated time period </b></font></td>"
	vHTML += "<td></td>";

	var SubmissionDate;
	//if (Logg[0]['cr6fc_submissiondate@OData.Community.Display.V1.FormattedValue'] != undefined ) {
		if (Logg[0]['cr6fc_submissiondate@OData.Community.Display.V1.FormattedValue'] != undefined ) {

		//SubmissionDate = GetCreatedDateTime(Logg[0]['cr6fc_submissiondate@OData.Community.Display.V1.FormattedValue']);
		SubmissionDate = GetCreatedDateTime(Logg[0]['cr6fc_submissiondate@OData.Community.Display.V1.FormattedValue']);
	}
	else {
		SubmissionDate = '';
	}
	//divCGAppliStipu = "<div><p style='font-size:15px !important;'>Sanction Date:- " + GetCreatedDateTime(Logg[0]['cr6fc_dateofsanction@OData.Community.Display.V1.FormattedValue']) + "</p><p style='font-size:15px !important;'>Submission Date :- " + SubmissionDate + "</p></div>"
		divCGAppliStipu = "<div><p style='font-size:15px !important;'>Sanction Date:- " + GetCreatedDateTime(Logg[0]['cr6fc_dateofsanction@OData.Community.Display.V1.FormattedValue']) + "</p><p style='font-size:15px !important;'>Submission Date :- " + SubmissionDate + "</p></div>"
	//divCGAppliStipu="<div><p>Sanction Date:- "+Logg[0].DateOfSanction.substring(0,Logg[0].DateOfSanction.indexOf("T"))+"</p><p>Submission Date :- "+Logg[0].DateOfRegistration.substring(0,Logg[0].DateOfRegistration.indexOf("T"))+"</p></div>"

	vHTML += "<td class='form-group' style='font-size:15px !important;'><font color='Black'><b>" + divCGAppliStipu + "</b></font></td>"
	vHTML += "</tr><tr>"
	vHTML += "<td class='form-group'><font color='Black' style='font-size:15px !important;'><b>4.&nbspLive Credit facility(ies) to FPO covered under CGS-FPO not exceeding Rs.2 crore(including current request amount)</b></font></td>"
	if (parseInt(ToatalSanctionAmt) < 20000000) {
		vHTML += "<td style='text-align:center'><img style='width:25px' src="+location.origin+"/correct.png></td>"
	}
	else {
		vHTML += "<td style='text-align:center'><img style='width:25px' src="+location.origin+"/remove1.png></td>"
	}

	if (CGApplPANColl.length > 0) {
		for (var i = 0; i < CGApplPANColl.length; i++) {

			//if (CGApplPANColl[i].cr6fc_status == "15") {
				if (CGApplPANColl[i].cr6fc_status == "15") {
				var filterTaxData = $.grep(TaxMasterColl, function (value) {
					//return (value.cr6fc_cgid == CGApplPANColl[i].cr6fc_cgapplicationsid);
					return (value.cr6fc_cgid == CGApplPANColl[i].cr6fc_cgaplicationid);
				});
				if (filterTaxData.length > 0) {
				//	divCreditLimit += "<div class='form-group'><p style='font-size:15px !important;'>Guarantee Issued</p><p style='font-size:15px !important;'>reference No :- " + filterTaxData[0].cr6fc_cgpan + "</p><p style='font-size:15px !important;'>Amount :- " + CGApplPANColl[i].cr6fc_sanctionedamount + "</p></div>"
					divCreditLimit += "<div class='form-group'><p style='font-size:15px !important;'>Guarantee Issued</p><p style='font-size:15px !important;'>reference No :- " + filterTaxData[0].cr6fc_cgpan + "</p><p style='font-size:15px !important;'>Amount :- " + CGApplPANColl[i].cr6fc_sanctionedamount + "</p></div>"
				}
				else {
					divCreditLimit += "";
				}

			}
			else {
				var filterSOEData = $.grep(SOEMasterColl, function (value) {
					//return (value.cr6fc_wfid == CGApplPANColl[i].cr6fc_cgapplicationsid);
					return (value.cr6fc_wfid == CGApplPANColl[i].cr6fc_cgaplicationid);
				});

				if (filterSOEData.length > 0) {
					//divCreditLimit += "<div class='form-group'><p style='font-size:15px !important;'>SOE Issued</p><p style='font-size:15px !important;'>reference No :- " + filterSOEData[0].cr6fc_name + "</p><p style='font-size:15px !important;'>Amount :- " + CGApplPANColl[i].cr6fc_sanctionedamount + "</p></div>";
					divCreditLimit += "<div class='form-group'><p style='font-size:15px !important;'>SOE Issued</p><p style='font-size:15px !important;'>reference No :- " + filterSOEData[0].cr6fc_name + "</p><p style='font-size:15px !important;'>Amount :- " + CGApplPANColl[i].cr6fc_sanctionedamount + "</p></div>";
				}
				else {
					divCreditLimit += "";
				}

			}


		}
		/*if ((Logg[0].cr6fc_status=="6" || Logg[0].Status=="7") && Logg[0].cr6fc_sanctionedamount != '' && Logg[0].cr6fc_sanctionedamount != null) {
			divCreditLimit += "<div class='form-group'><p style='font-size:15px !important;'>Current Applications</p><p style='font-size:15px !important;'>Amount :- " + Logg[0].cr6fc_sanctionedamount + "</p></div>";
		}*/
		if ((Logg[0].cr6fc_status=="6" || Logg[0].Status=="7") && Logg[0].cr6fc_sanctionedamount != '' && Logg[0].cr6fc_sanctionedamount != null) {
			divCreditLimit += "<div class='form-group'><p style='font-size:15px !important;'>Current Applications</p><p style='font-size:15px !important;'>Amount :- " + Logg[0].cr6fc_sanctionedamount + "</p></div>";
		}
	}
	else {
		//divCreditLimit += "<div class='form-group'><p style='font-size:15px !important;'>No Previous Applications</p><p style='font-size:15px !important;'>Amount :- " + ToatalSanctionAmt + "</p></div>";
		divCreditLimit += "<div class='form-group'><p style='font-size:15px !important;'>No Previous Applications</p><p style='font-size:15px !important;'>Amount :- " + ToatalSanctionAmt + "</p></div>";
	}

	vHTML += "<td><font color='Black'><b>" + divCreditLimit + "</b></font></td>"
	vHTML += "</tr><tr style='height: 44px !important;'>"
	vHTML += "<td class='form-group'><font color='Black' style='font-size:15px !important'><b>5.&nbspLive Credit facility(ies) to FPO covered under CGS-FPO not exceeding Rs.2 crore(excluding current request amount)</b></font></td>"
	if (parseInt(ExcludingCurrSanctionAmt) > 20000000) {
		vHTML += "<td style='text-align:center'><img style='width:25px' src="+location.origin+"/remove1.png></td>"
	}
	else {
		vHTML += "<td style='text-align:center'><img style='width:25px' src="+location.origin+"/correct.png></td>"
	}

	if (CGApplPANColl.length > 0) {
		for (var i = 0; i < CGApplPANColl.length; i++) {

			//if (CGApplPANColl[i].cr6fc_status == "15") {
				if (CGApplPANColl[i].cr6fc_status == "15") {
				var filterTaxData = $.grep(TaxMasterColl, function (value) {
					//return (value.cr6fc_cgid == CGApplPANColl[i].cr6fc_cgapplicationsid);
					return (value.cr6fc_cgid == CGApplPANColl[i].cr6fc_cgaplicationid);
				});
				if (filterTaxData.length > 0) {
					//divExcCurrCreditLimit += "<div class='form-group'><p style='font-size:15px !important'>Guarantee Issued</p><p style='font-size:15px !important'>reference No :- " + filterTaxData[0].cr6fc_cgpan + "</p><p style='font-size:15px !important'>Amount :- " + CGApplPANColl[i].cr6fc_sanctionedamount + "</p></div>"
						divExcCurrCreditLimit += "<div class='form-group'><p style='font-size:15px !important'>Guarantee Issued</p><p style='font-size:15px !important'>reference No :- " + filterTaxData[0].cr6fc_cgpan + "</p><p style='font-size:15px !important'>Amount :- " + CGApplPANColl[i].cr6fc_sanctionedamount + "</p></div>"
				}
				else {
					divExcCurrCreditLimit += "";
				}

			}
			else {
				var filterSOEData = $.grep(SOEMasterColl, function (value) {
					//return (value.cr6fc_wfid == CGApplPANColl[i].cr6fc_cgapplicationsid);
					return (value.cr6fc_wfid == CGApplPANColl[i].cr6fc_cgaplicationid);
				});

				if (filterSOEData.length > 0) {
					//divExcCurrCreditLimit += "<div class='form-group'><p  style='font-size:15px !important;'>SOE Issued</p><p  style='font-size:15px !important;'>reference No :- " + filterSOEData[0].cr6fc_name + "</p><p  style='font-size:15px !important;'>Amount :- " + CGApplPANColl[i].cr6fc_sanctionedamount + "</p></div>";
					divExcCurrCreditLimit += "<div class='form-group'><p  style='font-size:15px !important;'>SOE Issued</p><p  style='font-size:15px !important;'>reference No :- " + filterSOEData[0].cr6fc_name + "</p><p  style='font-size:15px !important;'>Amount :- " + CGApplPANColl[i].cr6fc_sanctionedamount + "</p></div>";
				}
				else {
					divExcCurrCreditLimit += "";
				}

			}


		}
	}
	else {
		divExcCurrCreditLimit += "";
	}

	vHTML += "<td class='form-group'><font color='Black'><b>" + divExcCurrCreditLimit + "</b></font></td>"
	vHTML += "</tr><tr style='height: 44px !important;'>";
	vHTML += "<td class='form-group'><font color='Black'  style='font-size:15px !important;'><b>6.&nbsp Nature of Security </b></font></td>"
	//if (Logg[0]['cr6fc_natureofsecurity@OData.Community.Display.V1.FormattedValue']== "Primary") {
		if (Logg[0]['cr6fc_natureofsecurity@OData.Community.Display.V1.FormattedValue']== "Primary") {
		vHTML += "<td style='text-align:center'><img style='width:25px;' src="+location.origin+"/correct.png></td>"
	}
	else {
		vHTML += "<td style='text-align:center'><img style='width:25px;' src="+location.origin+"/remove1.png></td>"
	}
//	vHTML += "<td class='form-group'><font color='Black'  style='font-size:15px !important;'>" + Logg[0]['cr6fc_natureofsecurity@OData.Community.Display.V1.FormattedValue'] + "</font></td>"
	vHTML += "<td class='form-group'><font color='Black'  style='font-size:15px !important;'>" + Logg[0]['cr6fc_natureofsecurity@OData.Community.Display.V1.FormattedValue'] + "</font></td>"
	vHTML += "</tr><tr style='height: 44px !important;'>"
	vHTML += "<td class='form-group'><font color='Black' style='font-size:15px !important;'><b>7.&nbspCredit Facility has been sanctioned without any collateral security and/or third guarantee </b></font></td>"
	//if (Logg[0]['cr6fc_collateralsecurity@OData.Community.Display.V1.FormattedValue'] == "Yes") {
		if (Logg[0]['cr6fc_collateralsecurity@OData.Community.Display.V1.FormattedValue'] == "Yes") {
		vHTML += "<td style='text-align:center'><img style='width:25px' src="+location.origin+"/correct.png></td>"
	}
	else {
		vHTML += "<td style='text-align:center'><img style='width:25px' src="+location.origin+"/remove1.png></td>"
	}
	//vHTML += "<td class='form-group'><font color='Black' style='font-size:15px !important;'>" + Logg[0]['cr6fc_collateralsecurity@OData.Community.Display.V1.FormattedValue'] + "</font></td>"
	vHTML += "<td class='form-group'><font color='Black' style='font-size:15px !important;'>" + Logg[0]['cr6fc_collateralsecurity@OData.Community.Display.V1.FormattedValue'] + "</font></td>"
	vHTML += "</tr>"


	document.getElementById("dvCGApplicationData").innerHTML = vHTMLHeaderTBL + vHTML;



}
function ChecklistData1(Logg) {

	var vHTML = '';
	var FPOMemberCount;
	var divCreditLimit = '';
	var vHTMLHeaderTBL = "<table class='blueTable table-bordered checklist' style='width: 99.9%;' cellspacing='0'><tr style='background-color:#808080'>" +
		"<td style='border: 1px solid grey;'><font color='white'><b>Compliance Required</b></font></td>" +
		"<td style='border: 1px solid grey; text-align:center'><font color='white'><b>Complied</b></font></td>" +
		"<td style='border: 1px solid grey;'><font color='white'><b>Value</b></font></td>" +
		"</tr>";
	vHTML += "<tr>"
	vHTML += "<td><font color='Black'><b>1.&nbspShare-holder Members No. as per CGS-FPO-  More than 300 in Plains or 100 in North- Eastern or Hilly areas</b></font></td>"

	if (Logg[0].RegionOfFPO.Region == "FPO in Plains") {
		if (Logg[0].TotalFPOMember == "Less than 300") {
			if (parseInt(Logg[0].FarmerMemberSize) > 300) {
				//FPOMemberCount=
				vHTML += "<td><img style='width:25px' src='/sites/FPOCGPortal/SiteAssets/remove.png'></td>"

			}
			else {
				vHTML += "<td><img style='width:25px' src='/sites/FPOCGPortal/SiteAssets/correct.png'></td>"
			}
		}
		else if (Logg[0].TotalFPOMember == "More than 300") {
			if (parseInt(Logg[0].FarmerMemberSize) < 300) {
				//FPOMemberCount=
				vHTML += "<td><img style='width:25px' src='/sites/FPOCGPortal/SiteAssets/correct.png'></td>"

			}
			else {
				vHTML += "<td><img style='width:25px' src='/sites/FPOCGPortal/SiteAssets/remove.png'></td>"
			}

		}
		else {
			vHTML += "<td></td>"
		}

	}
	else if (Logg[0].RegionOfFPO.Region == "FPO in North Eastern or Hilly Areas") {
		if (Logg[0].TotalFPOMember == "Less than 100") {
			if (parseInt(Logg[0].FarmerMemberSize) > 100) {
				//FPOMemberCount=
				vHTML += "<td><img style='width:25px' src='/sites/FPOCGPortal/SiteAssets/remove.png'></td>"

			}
			else {
				vHTML += "<td><img style='width:25px' src='/sites/FPOCGPortal/SiteAssets/correct.png'></td>"
			}
		}
		else if (Logg[0].TotalFPOMember == "More than 100") {
			if (parseInt(Logg[0].FarmerMemberSize) < 100) {
				//FPOMemberCount=
				vHTML += "<td><img style='width:25px' src='/sites/FPOCGPortal/SiteAssets/correct.png'></td>"

			}
			else {
				vHTML += "<td><img style='width:25px' src='/sites/FPOCGPortal/SiteAssets/remove.png'></td>"
			}

		}
		else {
			vHTML += "<td></td>"
		}

	}
	//vHTML += "<td><font color='Black'><b>Compliance Required</b></font></td>"
	vHTML += "<td><font color='Black'><b>" + Logg[0].FarmerMemberSize + "</b></font></td>"
	vHTML += "</tr><tr>"
	//vHTML += "<tr>"
	vHTML += "<td><font color='Black'><b>2.&nbspFPO is connected with Agri- Business activities </b></font></td>"
	vHTML += "<td><img style='width:25px' src='/sites/FPOCGPortal/SiteAssets/remove.png'></td>"
	vHTML += "<td><font color='Black'><b>" + Logg[0].FPOAgriBusinessActivity + "</b></font></td>"
	vHTML += "</tr><tr>"
	vHTML += "<td><font color='Black'><b>3.&nbspCG Application applied within the stipulated time period </b></font></td>"
	vHTML += "<td><img style='width:25px' src='/sites/FPOCGPortal/SiteAssets/remove.png'></td>"
	vHTML += "<td><font color='Black'><b>" + Logg[0].FPOAgriBusinessActivity + "</b></font></td>"
	vHTML += "</tr><tr>"
	vHTML += "<td><font color='Black'><b>4.&nbspCredit facility is not above Rs.2 crore.- </b></font></td>"
	if (parseInt(ToatalSanctionAmt) > 20000000) {
		vHTML += "<td><img style='width:25px' src='/sites/FPOCGPortal/SiteAssets/remove.png'></td>"
	}
	else {
		vHTML += "<td><img style='width:25px' src='/sites/FPOCGPortal/SiteAssets/correct.png'></td>"
	}

	if (CGApplPANColl.length > 0) {
		for (var i = 0; i < CGApplPANColl.length; i++) {

			if (CGApplPANColl[i].Status == "Guarantee Issued") {
				var filterTaxData = $.grep(TaxMasterColl, function (value) {
					return (value.CGID == CGApplPANColl[i].Id);
				});
				if (filterTaxData.length > 0) {
					divCreditLimit += "<div><p>Gurrentee Issued</p><p>Refernce No :- " + filterTaxData[0].CGPAN + "</p><p>Amount :- " + CGApplPANColl[i].SanctionedAmount + "</p></div>"
				}
				else {
					divCreditLimit += "";
				}

			}
			else {
				var filterSOEData = $.grep(SOEMasterColl, function (value) {
					return (value.WFID == CGApplPANColl[i].Id);
				});

				if (filterSOEData.length > 0) {
					divCreditLimit += "<div><p>SOE Issued</p><p>Refernce No :- " + filterSOEData[0].Title + "</p><p>Amount :- " + CGApplPANColl[i].SanctionedAmount + "</p></div>";
				}
				else {
					divCreditLimit += "";
				}

			}


		}
	}
	vHTML += "<td><font color='Black'><b>" + divCreditLimit + "</b></font></td>"
	vHTML += "</tr><tr>"
	vHTML += "<td><font color='Black'><b>5.&nbsp Nature of Security </b></font></td>"
	if (Logg[0]['cr6fc_natureofsecurity@OData.Community.Display.V1.FormattedValue'] == "Primary") {
		vHTML += "<td><img style='width:25px' src='/sites/FPOCGPortal/SiteAssets/correct.png'></td>"
	}
	else {
		vHTML += "<td><img style='width:25px' src='/sites/FPOCGPortal/SiteAssets/remove.png'></td>"
	}
	vHTML += "<td><font color='Black'><b>" + Logg[0].NatureOfSecurity + "</b></font></td>"
	vHTML += "</tr><tr>"
	vHTML += "<td><font color='Black'><b>6.&nbspCredit Facility has been sanctioned without any collateral security and/or third guarantee </b></font></td>"
	if (Logg[0].CollateralSecurity == "Yes") {
		vHTML += "<td><img style='width:25px' src='/sites/FPOCGPortal/SiteAssets/correct.png'></td>"
	}
	else {
		vHTML += "<td><img style='width:25px' src='/sites/FPOCGPortal/SiteAssets/remove.png'></td>"
	}
	vHTML += "<td><font color='Black'><b>" + Logg[0].CollateralSecurity + "</b></font></td>"
	vHTML += "</tr>"


	document.getElementById("dvCGApplicationData").innerHTML = vHTMLHeaderTBL + vHTML;

	/* for(var i=0;i<Loggs.length; i++)
	   { 
	   var vURLView='';
	   var ViewLink='';
	   var vURLEdit='';
	   var EditLink='';

	   vHTML += "<tr style='line-height: 16px;'>"+	
			   "<td style='text-align:center'>"+Loggs[i].Title+"</td>"+
			   "<td style='text-align:center'>"+Loggs[i].NameOfLendingInstitution+"</td>"+
			   "<td style='text-align:center'>"+Loggs[i].NameOfFPO+"</td>"+					
			   "</tr>";
		   	
																				   	
		   	
		   	
	   }
	   
	   if(vHTML != "")
	   {   
		   $('#tblDataMain').DataTable().clear();
		   $('#tblDataMain').DataTable().destroy();
		   document.getElementById("tbodyRequestor").innerHTML=vHTML;
			   $('#tblDataMain').DataTable({ 
		 "order": [[7,'dsc']],
		  //scrollY: "300px",
		  // scrollX:  true,
		   // scrollCollapse: true,
			paging:true,
					"bInfo": false,
			 "bFilter": true
						   } );
									   	
										   	
	   }
	   else  
	   {
		   vHTML ="<tr><td colspan='15'><font face='Calibri' size='2'>No Employee Addition Deletion</font></td></tr>"; 
		   document.getElementById("tbodyRequestor").innerHTML=vHTML;
		   $('#tblDataMain').dataTable();
	   }   */


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
var cgappentityid;
var soeentityid;
function FunAction(status) {
	var txtRemarksComments = $('#txtRemarksComments').val();
	if (txtRemarksComments == '' || txtRemarksComments == null || txtRemarksComments == undefined) {
		alert('Please Enter Remark')
		return false;
	}
	var workflowDt = new Date();
	workflowDt = GetCurrentDataToday();

	var NSApproverComm = document.getElementById("hdnNSApproverHistory").value;
	var txtNsApprRemark;
	if (NSApproverComm != '' && NSApproverComm != undefined && NSApproverComm != '') {
		txtNsApprRemark = "Comment :- " + txtRemarksComments + " - " + workflowDt + ": " + NSApproverComm.toString() + "\n\n"
	}
	else {
		txtNsApprRemark = "Comment :- " + txtRemarksComments + " - " + workflowDt + "\n\n"
	}
	var Data;

	if (status !== "8") {
		Data = JSON.stringify(
			{

				//"cr6fc_status": status,
				//"cr6fc_nsapproverremark": txtNsApprRemark
				"cr6fc_status": status,
				"cr6fc_nsapproverremark": txtNsApprRemark


			});

	}
	else if (status == "8") {
		Data = JSON.stringify(
			{
				/*"cr6fc_status": status,
				"cr6fc_nsapproverremark": txtNsApprRemark,
				"cr6fc_soegenerateddate": new Date()*/
				"cr6fc_status": status,
				"cr6fc_nsapproverremark": txtNsApprRemark,
				"cr6fc_soegenerateddate": new Date()
				//"NSApproverId":NSCheckerApprover

			});

	}
	fileInput = $('#fileAttachInvoice');
	otherfileArray = [];
	//var AttchLength=fileInput[0].files.length
	$("#attachFilesHolderOther input:file").each(function () {
		if ($(this)[0].files[0]) {
			otherfileArray.push({ "Attachment": $(this)[0].files[0] });
		}
	});
	AttchLength = otherfileArray.length;

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

			//url: "/_api/cr6fc_cgapplicationses(" + vItemID + ")",
			url: "/_api/cr6fc_cgaplications(" + vItemID + ")",
			type: "PATCH",
			async: false,
			data: Data,
			headers: header,
			success: function (data,textStatus,xhr) {
				 cgappentityid = xhr.getResponseHeader('entityid');
				if (AttchLength !== 0){
					// getFileContentsAndMetadata(vItemID,token)
					updatecgappfile(vItemID)

				  }
				var vTitle = GetCounter();
				var vCGFANTitle = GetCounterCGFAN();
				var subTotal;
				if (status == "8") {
					var SOEData = JSON.stringify(
						{
							/*"cr6fc_name": vTitle,
							"cr6fc_soeno": vTitle,
							"cr6fc_cgfan": vCGFANTitle,
							"cr6fc_soedate": new Date(),
							"cr6fc_dateonthetin": new Date()//added by shivaprabha*/
							
							"cr6fc_name": vTitle,
							"cr6fc_soeno": vTitle,
							"cr6fc_cgfan": vCGFANTitle,
							"cr6fc_soedate": new Date(),
							"cr6fc_dateonthetin": new Date()
						});

					//url: _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/getByTitle('SOEDetails')/getItemByStringId('" +SOEDetailsColl[0].ID+ "')",
					var header = {
						__RequestVerificationToken: token,
						contentType: "application/json;odata=verbose",
						XRequestDigest: $("#__REQUESTDIGEST").val(),
						IFMATCH: "*",
						XHttpMethod: "PATCH"
					}
					$.ajax({
						// url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CGApplications')/items",
						//url: "/_api/cr6fc_soedetailses(" + SOEDetailsColl[0].cr6fc_soedetailsid + ")",
						url: "/_api/cr6fc_soedetailses(" + SOEDetailsColl[0].cr6fc_soedetailsid + ")",
						type: "PATCH",
						headers: header,
						async: false,
						data: SOEData,
						success: function (data,textStatus,xhr) {
							//var successId=data.d.Id;
							soeentityid = xhr.getResponseHeader('entityid');
							UpdateCounter(token);
							UpdateCounterCGFAN(token);
                                  
							alert('Request Approved by NS Approver and SOE no is :' + document.getElementById("hdnDigitalRequestNo").value);
							if (AttchLength == 0 || AttchLength == null || AttchLength == '') {
								// window.location.href = location.origin+"/NSApproverDashboard";
								//window.location.href = location.origin + "/RefreshingCache/?id="+cgappentityid+","+soeentityid+","+counterentityid+","+countercgpanentityid+"&tbl=cr6fc_cgapplicationses,cr6fc_soedetailses,cr6fc_countermasters,cr6fc_countermasters&col=cr6fc_cacherefreshedon&red=NSApproverDashboard";
								window.location.href = location.origin + "/RefreshingCache/?id="+cgappentityid+","+soeentityid+","+counterentityid+","+countercgpanentityid+"&tbl=cr6fc_cgapplicationses,cr6fc_soedetailses,cr6fc_countermasters,cr6fc_countermasters&col=cr6fc_cacherefreshedon&red=NSApproverDashboard";

							}
						},
						error: function (e) {
							console.log(e);
						}
					});

				}
				else {
					alert('Action Submitted');
					if (AttchLength == 0 || AttchLength == null || AttchLength == '') {
						window.location.href = location.origin+"/NSApproverDashboard";
					}

				}
				//alert('List updated Succesfully');
				// window.location.href="https://nabardmumbai.sharepoint.com/sites/FPOCGPortal/SitePages/NSApproverDashBoard.aspx";			                 
			},
			error: function (e) {
				console.log(e);
			}
		});
	})
}
function GetCounterCGFAN() {
	var vRetVal = '';
	var hdnCounter = '';
	//var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CounterMaster')//items?$top=500&$select=CGApplicationNo,ID,Title&$filter=Title eq 'CGFAN'";
	//var requestUri = location.origin+"/_api/cr6fc_countermasters?$select=*&$filter=cr6fc_name eq 'CGFAN' and cr6fc_entrytype eq 1";
	var requestUri = location.origin+"/_api/cr6fc_countermasters?$select=*&$filter=cr6fc_name eq 'CGFAN' and cr6fc_entrytype eq 1";
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
				if (Logg.length > 0) {
					//var ItemId = Logg[0].cr6fc_cgapplicationno;
					var ItemId = Logg[0].cr6fc_cgapplicationno;

					hdnCounter = parseInt(ItemId) + 1;
					vRetVal = 'GFFPO' + dd + '' + calmonth + '' + yyyy + '000' + hdnCounter;
					//document.getElementById("hdnDigitalRequestNoCGFAN").value = vRetVal;
					//document.getElementById("hdnCounterItemIDCGFAN").value = Logg[0].cr6fc_cgapplicationno;
					//document.getElementById("hdnCounterItemID1CGFAN").value = Logg[0].cr6fc_countermasterid;
					document.getElementById("hdnCounterItemIDCGFAN").value = Logg[0].cr6fc_cgapplicationno;
					document.getElementById("hdnCounterItemID1CGFAN").value = Logg[0].cr6fc_countermasterid;

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
var vRetValSOE = '';
function GetCounter() {
	var hdnCounter = '';
	//var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CounterMaster')//items?$top=500&$select=CGApplicationNo,ID,Title&$filter=Title eq 'SOE'";
	//var requestUri = location.origin+"/_api/cr6fc_countermasters?$select=cr6fc_cgapplicationno,cr6fc_countermasterid,cr6fc_cgapplicationno&$filter=cr6fc_name eq 'SOE' and cr6fc_entrytype eq 1";
	var requestUri = location.origin+"/_api/cr6fc_countermasters?$select=cr6fc_cgapplicationno,cr6fc_countermasterid,cr6fc_cgapplicationno&$filter=cr6fc_name eq 'SOE' and cr6fc_entrytype eq 1";
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
				if (data.value.length > 0) {
					//var ItemId = data.value[0].cr6fc_cgapplicationno;
					var ItemId = data.value[0].cr6fc_cgapplicationno;
					var fiscalyear = "";
					var today = new Date();
					if ((today.getMonth() + 1) <= 3) {
						fiscalyear = (today.getFullYear() - 1) + "-" + today.getFullYear()
					} else {
						fiscalyear = today.getFullYear() + "-" + (today.getFullYear() + 1)
					}
					hdnCounter = parseInt(ItemId) + 1;
					var hdnCounter_str = hdnCounter.toString();

					var counter_length = hdnCounter_str.length;

					if (counter_length < 5) {
						var padding_zeros = '0'.repeat(5 - counter_length);
						hdnCounter_str = padding_zeros + hdnCounter_str;
					}
					vRetValSOE = 'SFPO/' + hdnCounter_str + '/' + fiscalyear;
					document.getElementById("hdnDigitalRequestNo").value = vRetValSOE;
					/*document.getElementById("hdnCounterItemID").value = data.value[0].cr6fc_cgapplicationno;
					document.getElementById("hdnCounterItemID1").value = data.value[0].cr6fc_countermasterid;*/
					document.getElementById("hdnCounterItemID").value = data.value[0].cr6fc_cgapplicationno;
					document.getElementById("hdnCounterItemID1").value = data.value[0].cr6fc_countermasterid;

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
var countercgpanentityid;
function UpdateCounterCGFAN(token) {
	debugger;
	var itemId = document.getElementById("hdnCounterItemID1CGFAN").value;
	var hdnCounter = document.getElementById("hdnCounterItemIDCGFAN").value;
	hdnCounter1 = parseInt(hdnCounter) + 1;
	var data1 = JSON.stringify(
		{
			'cr6fc_cgapplicationno': hdnCounter1.toString()
		});
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
		headers: header,
		async: false,
		data: data1,
		success: function (data,textStatus,xhr) {
			countercgpanentityid=xhr.getResponseHeader('entityid');// AddDashBoard(document.getElementById("hdnDigitalRequestNo").value, document.getElementById("hdnApprvlNotesItemID").value);
			//alert('Data Done')
		},
		error: function (e) {
		}
	});
}
var counterentityid;
function UpdateCounter(token) {
	debugger;
	var itemId = document.getElementById("hdnCounterItemID1").value;
	var hdnCounter = document.getElementById("hdnCounterItemID").value;
	hdnCounter1 = parseInt(hdnCounter) + 1;
	var data1 = JSON.stringify(
		{
			'cr6fc_cgapplicationno': hdnCounter1.toString()
		});
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
		headers: header,
		async: false,
		data: data1,
		success: function (data,textStatus,xhr) {
			counterentityid = xhr.getResponseHeader('entityid');
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
		url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('CounterMaster')/getItemByStringId('" + itemId + "')",
		type: "POST",
		contentType: "application/json;odata=verbose",
		async: false,
		data: JSON.stringify(
			{
				'__metadata': {
					'type': 'SP.Data.CounterMasterListItem'
				},
				'cr6fc_cgapplicationno': hdnCounter.toString()
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

function showSOW() {
	if (SOEMasterColl.length > 0) {
		//var url = location.origin+"/SOEDetails/?Item=" + SOEMasterColl[0].cr6fc_soedetailsid;
		var url = location.origin+"/SOEDetails/?Item=" + SOEMasterColl[0].cr6fc_soedetailsid;
		window.open(url, "_blank");
	}
}
var SOEDetailsColl = [];
function bindSOEDetailsData(vItemID) {
	//var requestUri = location.origin+"/_api/cr6fc_soedetailses?$select=cr6fc_wfid,cr6fc_soedetailsid&$filter=(cr6fc_wfid eq '" + vItemID + "')";
	var requestUri = location.origin+"/_api/cr6fc_soedetailses?$select=cr6fc_wfid,cr6fc_soedetailsid&$filter=(cr6fc_wfid eq '" + vItemID + "')";
	//var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SOEDetails')//items?$top=500&$select=*,BillToState/State,BillToState/Id,BillToState/StateCode&$expand=BillToState&$filter=(WFID eq '"+vItemID+"')";
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
			//SOEMasterColl = data.value;
			SOEDetailsColl = data.value;

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

var DocName = '';

function getfileNSApprover(vItemID)
{
	$.ajax({
	type: "GET",
	//url:"/_api/cr6fc_cgappfileses?$select=cr6fc_cgappfilesid,cr6fc_nsapproverfile,cr6fc_cgid&$filter=cr6fc_cgid eq ("+vItemID+") and cr6fc_name eq 'NSApprover'",
   url:location.origin +"/_api/cr6fc_cgappfileses?$select=cr6fc_cgappfilesid,cr6fc_nsapproverfile,cr6fc_cgid&$filter=cr6fc_cgid eq ("+vItemID+") and cr6fc_name eq 'NSApprover'",
    contentType:"application/json",
	async: false,
    success: function(res) {
        console.log(res);
		var Logg = res.value;
		var vhtml1='';
		if(Logg.length>0){
			$("#NSApproverAttach").show();
          for(var i = 0;i<Logg.length;i++){
			//var cgappfilename12 = Logg[i].cr6fc_nscheckerfile_name
			var cgappfilename12 = Logg[i].cr6fc_nscheckerfile_name
			//vhtml1+="<a href='/_api/cr6fc_cgappfileses(" + Logg[i].cr6fc_cgappfilesid + ")/cr6fc_nsapproverfile/$value'>"+Logg[i].cr6fc_nsapproverfile_name+"</a>";
			vhtml1+="<a href='/_api/cr6fc_cgappfileses(" + Logg[i].cr6fc_cgappfilesid + ")/cr6fc_nsapproverfile/$value'>"+Logg[i].cr6fc_nsapproverfile_name+"</a>";

		  }
		  $('#additionalDocsnsapprover').append(vhtml1);
		}		
    },
    error: function(xhr, status, error){
        var errorMessage = xhr.status + ': ' + xhr.statusText;
        console.log(errorMessage);
		}
	});
}
function getfile(vItemID)
{
	$.ajax({
	type: "GET",
   // url: "/_api/cr6fc_cgapplicationses("+vItemID+")/cr6fc_nscheckercgappfile",
   //url:"/_api/cr6fc_cgappfileses?$select=cr6fc_cgid,cr6fc_nscheckerfile,cr6fc_cgappfilesid&$filter=cr6fc_cgid eq ("+vItemID+") and cr6fc_name eq 'NSChecker'",
   url:location.origin +"/_api/cr6fc_cgappfileses?$select=cr6fc_cgid,cr6fc_nscheckerfile,cr6fc_cgappfilesid&$filter=cr6fc_cgid eq ("+vItemID+") and cr6fc_name eq 'NSChecker'",
    contentType:"application/json",
	async: false,
    success: function(res) {
        console.log(res);
		var Logg = res.value;
		var vhtml='';
		if(Logg.length>0){
          for(var i = 0;i<Logg.length;i++){
			//var cgappfilename12 = Logg[i].cr6fc_nscheckerfile_name
			var cgappfilename12 = Logg[i].cr6fc_nscheckerfile_name
			//vhtml+="<a href='/_api/cr6fc_cgappfileses(" + Logg[i].cr6fc_cgappfilesid + ")/cr6fc_nscheckerfile/$value'>"+Logg[i].cr6fc_nscheckerfile_name+"</a>";
			vhtml+="<a href='/_api/cr6fc_cgappfileses(" + Logg[i].cr6fc_cgappfilesid + ")/cr6fc_nscheckerfile/$value'>"+Logg[i].cr6fc_nscheckerfile_name+"</a>";

		  }
		  $('#additionalDocs').append(vhtml);
		}		
    },
    error: function(xhr, status, error){
        var errorMessage = xhr.status + ': ' + xhr.statusText;
        console.log(errorMessage);
		}
	});
}
function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}
function downloadfile()
{
	var file = dataURLtoFile(link,cgappfilename);
	saveAs(file, cgappfilename);
	console.log(file);
}

//---------------------------------------------------------------------------------------------------------

function getFileContentsAndMetadata(entityID,token,CGFileID) {
    // Get the name of the selected file
    var fileName = encodeURIComponent(document.getElementById('fileAttachInvoice').files[0].name);
    // Get the content of the selected file
    var file = document.getElementById('fileAttachInvoice').files[0];
    // If the user has selected a file
    if (file) {
        // Read the file as a byte array
        var reader = new FileReader();
        reader.readAsArrayBuffer(file);
        // The browser has finished reading the file, we can now do something with it...
        reader.onload = function(e) {
            // The browser has finished reading the file, we can now do something with it...
            var fileContent = e.target.result;
            // Run the function to upload to the Portal Web API, passing the GUID of the newly created record and the file's contents and name as inputs
            uploadFile(fileContent,fileName,CGFileID,token,file.type,file);
        };
    }
}
 
// Upload the file to
function uploadFile(fileContent,fileName,CGFileID,token,Filecontenttype) {
	
	// var data1 = JSON.stringify({
	// 	cr6fc_registrationname: fileName
	// 	//"value":2

	// });
	var header={__RequestVerificationToken:token,
        Accept: 'application/json;odata=verbose',
		XRequestDigest: $("#__REQUESTDIGEST").val(),
		// IFMATCH: "*",
		// XHttpMethod: "PUT"
	}
$.ajax({
	//url: "/_api/cr6fc_cgappfileses(" + CGFileID + ")/cr6fc_nsapproverfile?x-ms-file-name=" + fileName,
	url: "/_api/cr6fc_cgappfileses(" + CGFileID + ")/cr6fc_nsapproverfile?x-ms-file-name=" + fileName,
	type: "PUT",
	async: false,
	contentType: "application/octet-stream",
	processData: false,
	// data: fileContent,
	data: fileContent,
	headers: header,
	success: function (data, textStatus, xhr) {
		var cgfilentityid = xhr.getResponseHeader('entityid');
		// window.location.href = location.origin + "/RefreshingCache/?id="+cgfilentityid+"&tbl=cr6fc_cgappfileses&col=cr6fc_cacherefreshedon&red=NSApproverDashboard";
		//window.location.href = location.origin + "/RefreshingCache/?id="+cgappentityid+","+soeentityid+","+counterentityid+","+countercgpanentityid+","+cgfilentityid+"&tbl=cr6fc_cgapplicationses,cr6fc_soedetailses,cr6fc_countermasters,cr6fc_countermasters,cr6fc_cgappfileses&col=cr6fc_cacherefreshedon&red=NSApproverDashboard";
		window.location.href = location.origin + "/RefreshingCache/?id="+cgappentityid+","+soeentityid+","+counterentityid+","+countercgpanentityid+","+cgfilentityid+"&tbl=cr6fc_cgapplicationses,cr6fc_soedetailses,cr6fc_countermasters,cr6fc_countermasters,cr6fc_cgappfileses&col=cr6fc_cacherefreshedon&red=NSApproverDashboard";
		// window.location.href = location.origin+"/NSApproverDashboard";
	},
	error: function (xhr, textStatus, errorThrown) {
		console.log(errorThrown)
	}
});
}


function updatecgappfile(vItemID){
	var data = JSON.stringify(
		{
			/*"cr6fc_cgid": vItemID,
			"cr6fc_name":"NSApprover",
			"cr6fc_cgapplicationno": document.getElementById("txtApplicantID").value*/
			"cr6fc_cgid": vItemID,
			"cr6fc_name":"NSApprover",
			"cr6fc_cgapplicationno": document.getElementById("txtApplicantID").value
		});
	
	shell.getTokenDeferred().done(function(token){
		console.log(token)
		var header = {
			__RequestVerificationToken: token,
			contentType: "application/json;odata=verbose"
		}
		$.ajax({
			// url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CGApplications')/items",
			//url: "/_api/cr6fc_cgappfileses",
			url: "/_api/cr6fc_cgappfileses",
			type: "POST",
			headers: header,
			async: false,
			data: data,
			success: function (data,textStatus, xhr) {
				CGFileID = xhr.getResponseHeader("entityid");
				getFileContentsAndMetadata(vItemID,token,CGFileID)
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