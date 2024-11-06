var vItemID;
var loggedInUserId = '';
var loggedInUserName = '';
var loggedInUserEmail = '';
$(document).ready(function () {
    $('title').text('APPLICATIONEDITFORM');
     vItemID= GetQueryStingValue()["Item"];
     loggedInUserId = $('#fpo-user-contact-id').val();
     loggedInUserName = $('#fpo-user-contact-name').val();
     loggedInUserEmail = $('#fpo-user-email').val();
	Page= GetQueryStingValue()["Page"];
    BindFPOActivities();
    BindRegion();
    BindFPOState();
    //BindBusinessFPOcity();
    BindBusinessFPOState();
     bindCGApplicationData(vItemID);
  });
  
  function GetQueryStingValue()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
//added by shivaprabha
function close1(){
if(Page=="DashBoardCGApp")
{
window.location.href="/DashboardCGApp/";
}
else if(Page=="ELIChecker")
{
window.location.href="/ELICheckerDashBoardCGApp/";
}
else if(Page=="ELIMakerCGIssued")
{
window.location.href="/ELIMakerCGIssuedDashboard/";
}
else if(Page=="ELICheckerCGIssued")
{
window.location.href="/ELICheckerCGIssuedDashBoardCGApp/";
}



}
//end
function ViewSOE()
{
	if(SOEDetailsColl.length>0)
	{
		var url="/sites/FPOCGPortal/SitePages/SOEDetails.aspx?Item="+SOEDetailsColl[0].ID
		window.open(url, "_blank");
	}


}
function showTaxInvoice()
{
	if(SOEDetailsColl.length>0)
	{

		var url="/sites/FPOCGPortal/SitePages/Tax-Invoice.aspx?Item="+SOEDetailsColl[0].ID;
		window.open(url, "_blank");
	}
}

var SOEDetailsColl=[];
function bindSOEDetailsData(vItemID){    
    var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SOEDetails')//items?$top=500&$select=*,BillToState/State,BillToState/Id,BillToState/StateCode&$expand=BillToState&$filter=(WFID eq '"+vItemID+"')";
    var requestHeaders = { "accept": "application/json;odata=verbose" };
    $.ajax({
        url: requestUri,
        contentType: "application/json;odata=verbose",
        headers: requestHeaders,
        async: false,
        cache: false,
        success: function (data) {
            SOEDetailsColl = data.d.results;            
            
        },
        error: function () {
            console.log("error");
        }
    });  
    
}


function BindFPOActivities() {
	//var requestUri = location.origin+"/_api/cr6fc_fpoactivitiesmasters?$select=cr6fc_name,cr6fc_fpoactivitiesmasterid";
    var requestUri = loaction.origin+"/_api/cr6fc_fpoactivitiesmasters?$select=cr6fc_fpoactivitiesmasterid,cr6fc_name";

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
						//FPOActivities.options[FPOActivities.options.length] = new Option(items[i].cr6fc_name, items[i].cr6fc_fpoactivitiesmasterid); comm 9 17 24
                        FPOActivities.options[FPOActivities.options.length] = new Option(items[i].cr6fc_name, items[i].cr6fc_fpoactivitiesmasterid);
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
//	var requestUri = location.origin+"/_api/cr6fc_regionmasters?$select=cr6fc_name,cr6fc_regionmasterid";
    var requestUri = location.origin+"/_api/cr6fc_regionmasters?$select=cr6fc_name,cr6fc_regionmasterid";
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
	//var requestUri = location.origin+"/_api/cr6fc_statemasters?$select=cr6fc_name,cr6fc_statemasterid"; comm on 9 17 24
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
			try {
				if (LoggFPOState.length > 0) {
					var FPOState = document.getElementById("FPOState");
					FPOState.options.length = 0;
					FPOState.options[FPOState.options.length] = new Option("Select", "0");
					for (var i = 0; i < LoggFPOState.length; i++) {
					//	FPOState.options[FPOState.options.length] = new Option(LoggFPOState[i].cr6fc_name, LoggFPOState[i].cr6fc_statemasterid); comm 9 17 24
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

function BindBusinessFPOState() {
	//var requestUri = location.origin+"/_api/cr6fc_statemasters?$select=cr6fc_name,cr6fc_statemasterid"; comm 9 17 24
    var requestUri = location.origin +"/_api/cr6fc_statemasters?$select=cr6fc_name,cr6fc_statemasterid";
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
						//BusinessFPOState.options[BusinessFPOState.options.length] = new Option(Logg[i].cr6fc_name, Logg[i].cr6fc_statemasterid); comm 9 17n 24
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
function ViewPaymentManagment()
{
	$("#inputDialog3").dialog({
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
		
		$("#inputDialog3").dialog("open");

}
function ClosePopup3()
{
	$("#inputDialog3").dialog("close");	
}

function ViewManagment()
{
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
var vtitle;

 function bindCGApplicationData(vItemID){    
	//var requestUri = location.origin+"/_api/cr6fc_cgapplicationses?$top=5000&$select=*&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=(cr6fc_cgapplicationsid eq '" + vItemID + "')"; comm 9 17 24
    var requestUri = location.origin+"/_api/cr6fc_cgaplications?$top=5000&$select=*&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=(cr6fc_cgaplicationid eq '" + vItemID + "')";
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
            try 
            {
              if(Logg.length > 0)
              {     
                  // document.getElementById("txtApplicantID").value=Logg[0].cr6fc_name;
                   document.getElementById("txtApplicantID").value=Logg[0].cr6fc_name;
                 //  document.getElementById("txtCGApplicationNo").value=Logg[0].cr6fc_name;
                   document.getElementById("txtCGApplicationNo").value=Logg[0].cr6fc_name;
                  // document.getElementById("txtCGApplicationNoPayment").value=Logg[0].cr6fc_name;
                   document.getElementById("txtCGApplicationNoPayment").value=Logg[0].cr6fc_name;
                  // document.getElementById("txtApplicantName").value=Logg[0].ApplicantName;
                  // document.getElementById("txtNameOfFPO1").value=Logg[0].NameOfFPO;
                 //  document.getElementById("txtNameOfFPO1Payment").value=Logg[0].cr6fc_nameoffpo;
                   document.getElementById("txtNameOfFPO1Payment").value=Logg[0].cr6fc_nameoffpo;
                   //document.getElementById("txtNameOfFPO").value=Logg[0].NameOfFPO;
                   $("#txtNameOfFPO").text(Logg[0].cr6fc_nameoffpo);
              		$("#txtELICheckerNamePayment").text(Logg[0]['_cr6fc_ELIChecker_value@OData.Community.Display.V1.FormattedValue']);
              		$("#instituteIdNewPayment").text(Logg[0].cr6fc_nameoflendinginstitution);
                   if(Logg[0].cr6fc_eilcheckerutrcertificateviewdate!=null && Logg[0].cr6fc_eilcheckerutrcertificateviewdate!=undefined && Logg[0].cr6fc_eilcheckerutrcertificateviewdate!='')
					{
						$('#dtproceedPayment').text(GetCreatedDateTime(Logg[0].cr6fc_eilcheckerutrcertificateviewdate))
					}
                    $("#ConstitutionFPO1").val(Logg[0]['cr6fc_constitutionfpo@OData.Community.Display.V1.FormattedValue']);
                  // $("#ConstitutionFPO1").val(Logg[0]['cr6fc_constitutionfpo@OData.Community.Display.V1.FormattedValue']);
                   //document.getElementById("ConstitutionFPO").value=Logg[0].ConstitutionFPO;
                   $("#FPOActs").val(Logg[0]['cr6fc_fpoacts@OData.Community.Display.V1.FormattedValue']);
                   //document.getElementById("FPOActs").value=Logg[0].FPOActs;
                  //document.getElementById("DateOfRegistration").value=Logg[0].DateOfRegistration;
                  if(Logg[0].cr6fc_dateofregistration!=null && Logg[0].cr6fc_dateofregistration!=undefined && Logg[0].cr6fc_dateofregistration!='')
                  {
                	document.getElementById("DateOfRegistration").value=Logg[0].cr6fc_dateofregistration.substring(0,Logg[0].cr6fc_dateofregistration.indexOf("T"));;
                	//document.getElementById("DateOfRegistration").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_dateofregistration));
                	}
                   document.getElementById("PlaceOfRegistration").value=Logg[0].cr6fc_placeofregistration;
                   document.getElementById("RegistrationNo").value=Logg[0].cr6fc_registrationno;
                   document.getElementById("PANFPO").value=Logg[0].cr6fc_panfpo;
                   document.getElementById("TANTINFPO").value=Logg[0].cr6fc_tantinfpo;
                   document.getElementById("GSTINFPO").value=Logg[0].cr6fc_gstinfpo;
               
                   document.getElementById("FPOActivities").innerHTML=Logg[0]['cr6fc_fpoactivities111@OData.Community.Display.V1.FormattedValue'];
                   $("#FPOAgriBusinessActivity").val(Logg[0]['cr6fc_fpoagribusinessactivity@OData.Community.Display.V1.FormattedValue']);
                   //document.getElementById("FPOAgriBusinessActivity").value=Logg[0].FPOAgriBusinessActivity;
                 //  document.getElementById("ForwardLinkageFPO").text=Logg[0].cr6fc_forwardlinkagefpo;
                  // document.getElementById("BackwardLinkageFPO").text=Logg[0].cr6fc_backwardlinkagefpo;
                  $('#ForwardLinkageFPO').text(Logg[0].cr6fc_forwardlinkagefpo);
                  $('#BackwardLinkageFPO').text(Logg[0].cr6fc_backwardlinkagefpo);
                   $("#RegionOfFPO").val(Logg[0]['_cr6fc_regionoffpo_value@OData.Community.Display.V1.FormattedValue']);
                   if(Logg[0]['_cr6fc_regionoffpo_value@OData.Community.Display.V1.FormattedValue'] == "FPO in Plains"){
			                    $("#Plains").show();
			         $("#Northen").hide();
                   }    
                   else{
				        $("#Plains").hide();
				            $("#Northen").show();
                   }  
                   $("#TotalFPOMember").val(Logg[0]['cr6fc_totalfpomember@OData.Community.Display.V1.FormattedValue']);
                   $("#TotalMemberNorthen").val(Logg[0].cr6fc_totalmembernorthen);
                   document.getElementById("NoOfLandlessFarmer").value=Logg[0].cr6fc_nooflandlessfarmer;
                  // document.getElementById("NoofSmallFarmer").value=Logg[0].cr6fc_noofsmallfarmer;
                   document.getElementById("NoofSmallFarmer").value = LoGG[0].cr6fc_noofsmallfarmer;
                  // document.getElementById("NoOfMarginalFarmer").value=Logg[0].cr6fc_noofmarginalfarmer;
                   document.getElementById("NoOfMarginalFarmer").value = Logg[0].cr6fc_noofmarginalfarmer;
                   //document.getElementById("NoOfBigFarmer").value=Logg[0].cr6fc_noofbigfarmer;
                   document.getElementById("NoOfBigFarmer").value=Logg[0].cr6fc_noofbigfarmer;
                 //  document.getElementById("FarmerMemberSize").value=Logg[0].cr6fc_farmermembersize;
                   document.getElementById("FarmerMemberSize").value=Logg[0].cr6fc_farmermembersize;
                  // document.getElementById("NoOfWomenFarmer").value=Logg[0].cr6fc_noofwomenfarmer;
                   document.get6ElementById("NoOfWomenFarmer").value=logg[0].cr6fc_noofwomenfarmer;
                  // document.getElementById("NoOfSCFarmer").value=Logg[0].cr6fc_noofscfarmer;
                   document.ggetElem,entById("NoOfSCFarmer").value=Logg[0].cr6fc_noofscfarmer;
                   document.getElementById("NoOfSTFarmer").value=Logg[0].cr6fc_noofstfarmer;
                   document.getElementById("NoOfSTFarmer").value=Logg[0].cr6fc_noofstfarmer;
                   //document.getElementById("FPODistrict").value=Logg[0].cr6fc_fpodistrict;
                   document.getElementById("FPODistrict").value=Logg[0].cr6fc_fpodistrict;
                  // document.getElementById("ExistingRegisteredOfficeAddress").value=Logg[0].cr6fc_existingregisteredofficeaddress;
                   document.getElementById("ExistingRegisteredOfficeAddress").value=Logg[0].cr6fc_existingregisteredofficeaddress;
                  //	document.getElementById("FPOCity").value=Logg[0].cr6fc_fpocity;
                    document.getElementById("FPOCity").value=Logg[0].cr6fc_fpocity;
                 //  $("#FPOState").val(Logg[0]['_cr6fc_fpostate_value@OData.Community.Display.V1.FormattedValue']);
                   $("#FPOState").val(Logg[0]['_cr6fc_fpostate_value@OData.Community.Display.V1.FormattedValue']);
                  // document.getElementById("FPOPincode").value=Logg[0].cr6fc_fpopincode;
                   document.getElementById("FPOPincode").value=Logg[0].cr6fc_fpopincode;
                 // document.getElementById("GeoLatituteLocation").value=Logg[0].cr6fc_geolatitutelocation;
                   document.getElementById("GeoLatituteLocation").value=Logg[0].cr6fc_geolatitutelocation;
                  // document.getElementById("GeoLongituteLocation").value=Logg[0].cr6fc_geolongitutelocation;
                   document.getElementById("GeoLongituteLocation").value=Logg[0].cr6fc_geolongitutelocation;
                   $("#BusinessAddress").val(Logg[0]['cr6fc_businessaddresssameregiaddress@OData.Community.Display.V1.FormattedValue'])

                   
                   if(Logg[0].cr6fc_businessaddresssameregiaddress==1)
                   {
                   		$('#otherdetilfpo').hide();
                   		$('#busineefpostate').hide();
                   }
                   else
                   {
                   		$('#otherdetilfpo').show();
                   		$('#busineefpostate').show();
                   }
                   
                 if(Logg[0].cr6fc_fpoavailedgoischeme==1)
                   {
                   		$('#creditfacility').hide();
                   		$('#crodetails').hide();
                   }
                   else
                   {
                   		$('#creditfacility').show();
                   		$('#crodetails').show();
                   }                 
                   if(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue']=="WC/CC Limit")
                   {
                       $("#termloandet").hide();
                       $("#LoanorWTCL").hide();
                       $("#wcclimitdetail").show();
                       $("#WCCCLimit").show();
                   }
                   else
                   {
                   	   $("#termloandet").show();
                  	   $("#LoanorWTCL").show();
                       $("#wcclimitdetail").hide();
                       $("#WCCCLimit").hide();
                   }
                   
                   if(Logg[0].cr6fc_loanfullydisbured==1)
                   {
                   		$('#outstand2').hide();
                   		$('#termloandettl').hide();
                   }
                   else
                   {
                   		$('#outstand2').show();
                   		$('#termloandettl').show();
                   }
                   
                    if(Logg[0].cr6fc_loanfullydisbured==1)
                   {
                   		$('#outstanding3').hide();
                   		$('#termloandettl').hide();
                   }
                   else
                   {
                   		$('#outstanding3').show();
                   		$('#termloandettl').show();
                   }                   
                   //document.getElementById("BusinessAddress").value=Logg[0].BusinessAddressSameRegiAddress;
                  // $("#BusinessFPOcity").val(Logg[0].cr6fc_businessfpocity);
                   $("#BusinessFPOcity").val(Logg[0].cr6fc_businessfpocity);
                   //document.getElementById("BusinessFPOcity").value=Logg[0].BusinessFPOCityId;
                   document.getElementById("BusinessFPODistrict").value=Logg[0].cr6fc_businessfpodistrict;
                   
                   document.getElementById("BusinessAddressFPO").value=Logg[0].cr6fc_businessaddressfpo;
                   if(Logg[0].cr6fc_BusinessFPOState!=undefined && Logg[0].cr6fc_BusinessFPOState!=null)
                   {
                    $("#BusinessFPOState").val(Logg[0].cr6fc_BusinessFPOState['cr6fc_name']);
                   }
                   //document.getElementById("BusinessFPOState").value=Logg[0].BusinessFPOStateId;
                   //document.getElementById("FarmerMemberSize").value=Logg[0].cr6fc_farmermembersize;
                   document.ggetElementById("FarmerMemberSize").value=Logg[0].cr6fc_farmermembersize;
                   //document.getElementById("BusinessFPOPincode").value=Logg[0].cr6fc_businessfpopincode;
                   document.getElementById("BusinessFPOPincode").value=Logg[0].cr6fc_businessfpopincode
                  // document.getElementById("GeoLatituteLocationFPO").value=Logg[0].cr6fc_geolatitutelocationfpo;
                   document.getElementById("GeoLatituteLocationFPO").value=Logg[0].cr6fc_geolatitutelocationfpo;
                  // document.getElementById("GeoLongituteLocationFPO").value=Logg[0].cr6fc_geolongitutelocationfpo;
                   document.getElementById("GeoLongituteLocationFPO").value=Logg[0].cr6fc_geolongitutelocationfpo;
                  // $("#NewFPO").val(Logg[0]['cr6fc_newfpo@OData.Community.Display.V1.FormattedValue']);
                   $("#NewFPO").val(Logg[0]['cr6fc_newfpo@OData.Community.Display.V1.FormattedValue']);
                   //document.getElementById("NewFPO").value=Logg[0].NewFPO;
                  /* $("#FPOAvailedGOIScheme").val(Logg[0]['cr6fc_fpoavailedgoischeme@OData.Community.Display.V1.FormattedValue']);
                   if(Logg[0]['cr6fc_fpoavailedgoischeme@OData.Community.Display.V1.FormattedValue']=='No'){
                                   $('#creditfacility').hide();
                   }
                   else{     
                                                  $('#creditfacility').show();
                }*/
                $("#FPOAvailedGOIScheme").val(Logg[0]['cr6fc_fpoavailedgoischeme@OData.Community.Display.V1.FormattedValue']);
                   if(Logg[0]['cr6fc_fpoavailedgoischeme@OData.Community.Display.V1.FormattedValue']=='No'){
                                   $('#creditfacility').hide();
                   }
                   else{     
                                                  $('#creditfacility').show();
                }
                   //document.getElementById("FPOAvailedGOIScheme").value=Logg[0].FPOAvailedGOIScheme;
                  // document.getElementById("CGPAN").value=Logg[0].cr6fc_cgpan;
                   document.getElementById("CGPAN").value=Logg[0].cr6fc_cgpan;
                  // document.getElementById("ExistingCF").value=Logg[0]['cr6fc_existingcf@OData.Community.Display.V1.FormattedValue'];
                   document.getElementById("ExistingCF").value=Logg[0]['cr6fc_existingcf@OData.Community.Display.V1.FormattedValue'];
                   //document.getElementById("TotalSanctionedAmount").value=Logg[0].cr6fc_totalsanctionedamount;
                   document.getElementById("TotalSanctionedAmount").value=Logg[0].cr6fc_totalsanctionedamount
                  // $("#TypeOfCreditFacility").val(Logg[0]['cr6fc_typeofcreditfacility@OData.Community.Display.V1.FormattedValue']);
                   $("#TypeOfCreditFacility").val(Logg[0]['cr6fc_typeofcreditfacility@OData.Community.Display.V1.FormattedValue']);
                   //document.getElementById("TypeOfCreditFacility").value=Logg[0].TypeOfCreditFacility;
                 /* if(Logg[0].cr6fc_validitycreditguarantee!=null && Logg[0].cr6fc_validitycreditguarantee!=undefined && Logg[0].cr6fc_validitycreditguarantee!='')
                  {

                   document.getElementById("ValidityCreditGuarantee").value=Logg[0].cr6fc_validitycreditguarantee.substring(0,Logg[0].cr6fc_validitycreditguarantee.indexOf("T"));;
                   //document.getElementById("ValidityCreditGuarantee").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_validitycreditguarantee));
                   }*/
                   if(Logg[0].cr6fc_validitycreditguarantee!=null && Logg[0].cr6fc_validitycreditguarantee!=undefined && Logg[0].cr6fc_validitycreditguarantee!='')
                   {
                    document.getElementById("ValidityCreditGuarantee").value=Logg[0].cr6fc_validitycreditguarantee.substring(0,Logg[0].cr6fc_validitycreditguarantee.indexOf("T"));;
                   }
                   //document.getElementById("NameOfCEO").value=Logg[0].NameOfCEO;
                  // $("#NameOfCEO").text(Logg[0].cr6fc_nameofceo);
                   $("#NameOfCEO").text(Logg[0].cr6fc_nameofceo);
                  // document.getElementById("ContactCEO").value=Logg[0].cr6fc_contactceo;
                   document.getElementById("ContactCEO").value=Loggg[0].cr6fc_contactceo;
                   //document.getElementById("MobileCEO").value=Logg[0].cr6fc_mobileceo;
                   document.getElementById("MobileCEO").value=Logg[0].cr6fc_mobileceo;
                  //document.getElementById("EmailIDCEO").value=Logg[0].cr6fc_emailidceo;
                   document.getElementById("EmailIDCEO").value=Logg[0].cr6fc_emailidceo;
                   //document.getElementById("CustomerID").value=Logg[0].cr6fc_customerid;
                   document.getElementById("CustomerID").value=Logg[0].cr6fc_customerid;
                 // $("#LendingAssesmentTool").text(Logg[0]['cr6fc_lendingassesmenttool@OData.Community.Display.V1.FormattedValue']);
                   $("#LendingAssesmentTool").text(Logg[0]['cr6fc_lendingassesmenttool@OData.Community.Display.V1.FormattedValue']);
                   $("#TypeofFacility").val(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue']);
                   $("#TypeofFacility").val(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue']);
                      //$("#CreditFacilityUtilised").val(Logg[0].cr6fc_creditfacilityutilised);
                      $("#CreditFacilityUtilised").val(Logg[0].cr6fc_creditfacilityutilised);
                  // document.getElementById("PurposeOftheCreditFacility").innerHTML=Logg[0]['cr6fc_purposeofthecreditfacility@OData.Community.Display.V1.FormattedValue'];
                //  $('#PurposeOftheCreditFacility').text(Logg[0]['cr6fc_purposeofthecreditfacility@OData.Community.Display.V1.FormattedValue']);
                  $('#PurposeOftheCreditFacility').text(Logg[0]['cr6fc_purposeofcreditfacility@OData.Community.Display.V1.FormattedValue']);
                   if(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'] == "Term Loan OR WCTL (Working Capital Term Loan)")
                   {
                   if(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'] == "Term Loan OR WCTL (Working Capital Term Loan)"){
                   
                   
                  // document.getElementById("AccountNo").value=Logg[0].cr6fc_accountno;
                   document.getElementById("AccountNo").value=Logg[0].cr6fc_accountno;
                   //document.getElementById("SanctionedAmount").value=Logg[0].cr6fc_sanctionedamount;
                   document.getElementById("SanctionedAmount").value=Logg[0].cr6fc_sanctionedamount;
                  var Word=convertNumberToWords(Math.ceil(Logg[0].cr6fc_sanctionedamount));
                   console.log(Word);
                   $('#SanctionedAmountinwords').text("Rupees " + " " + Word + " " + "Only" );
                  /*if(Logg[0].cr6fc_dateofsanction!==undefined && Logg[0].cr6fc_dateofsanction!==null && Logg[0].cr6fc_dateofsanction!=='')
                   {

                	document.getElementById("DateOfSanction").value=Logg[0].cr6fc_dateofsanction.substring(0,Logg[0].cr6fc_dateofsanction.indexOf("T"));;
                	}*/
                    if(Logg[0].cr6fc_dateofsanction!==undefined && Logg[0].cr6fc_dateofsanction!==null && Logg[0].cr6fc_dateofsanction!=='')
                    {
                        document.getElementById("DateOfSanction").value=Logg[0].cr6fc_dateofsanction.substring(0,Logg[0].cr6fc_dateofsanction.indexOf("T"));;
                    }
                 /* if(Logg[0].cr6fc_enddateofinterestmoratium!==undefined && Logg[0].cr6fc_enddateofinterestmoratium!==null && Logg[0].cr6fc_enddateofinterestmoratium!=='')
                   {

                	document.getElementById("EndDateOfInterestMoratium").value=Logg[0].cr6fc_enddateofinterestmoratium.substring(0,Logg[0].cr6fc_enddateofinterestmoratium.indexOf("T"));;
                	}*/
                    if(Logg[0].cr6fc_enddateofinterestmoratium!==undefined && Logg[0].cr6fc_enddateofinterestmoratium!==null && Logg[0].cr6fc_enddateofinterestmoratium!=='')
                        {
     
                         document.getElementById("EndDateOfInterestMoratium").value=Logg[0].cr6fc_enddateofinterestmoratium.substring(0,Logg[0].cr6fc_enddateofinterestmoratium.indexOf("T"));;
                         }
                   /*if(Logg[0].cr6fc_enddateofprinciplemoratium!==undefined && Logg[0].cr6fc_enddateofprinciplemoratium!==null && Logg[0].cr6fc_enddateofprinciplemoratium!=='')
                   {

                	document.getElementById("EndDateOfPrincipleMoratium").value=Logg[0].cr6fc_enddateofprinciplemoratium.substring(0,Logg[0].cr6fc_enddateofprinciplemoratium.indexOf("T"));;
                	}*/
                    if(Logg[0].cr6fc_enddateofprinciplemoratium!==undefined && Logg[0].cr6fc_enddateofprinciplemoratium!==null && Logg[0].cr6fc_enddateofprinciplemoratium!=='')
                        {
     
                         document.getElementById("EndDateOfPrincipleMoratium").value=Logg[0].cr6fc_enddateofprinciplemoratium.substring(0,Logg[0].cr6fc_enddateofprinciplemoratium.indexOf("T"));;
                         }
                 /* if(Logg[0].cr6fc_duedateoflastinstallment!==undefined && Logg[0].cr6fc_duedateoflastinstallment!==null && Logg[0].cr6fc_duedateoflastinstallment!=='')
                   {

                	document.getElementById("DueDateOfLastInstallment").value=Logg[0].cr6fc_duedateoflastinstallment.substring(0,Logg[0].cr6fc_duedateoflastinstallment.indexOf("T"));;
                	}*/
                    if(Logg[0].cr6fc_duedateoflastinstallment!==undefined && Logg[0].cr6fc_duedateoflastinstallment!==null && Logg[0].cr6fc_duedateoflastinstallment!=='')
                        {
     
                         document.getElementById("DueDateOfLastInstallment").value=Logg[0].cr6fc_duedateoflastinstallment.substring(0,Logg[0].cr6fc_duedateoflastinstallment.indexOf("T"));;
                         }
                  // document.getElementById("InterestRate").value=Logg[0].cr6fc_interestrate;
                   document.getElementById("InterestRate").value=Logg[0].cr6fc_interestrate;
                  // $("#CreditFacilityFundAgriInfra").val(Logg[0]['cr6fc_creditfacilityfundagriinfra@OData.Community.Display.V1.FormattedValue']);
                   $("#CreditFacilityFundAgriInfra").val(Logg[0]['cr6fc_creditfacilityfundagriinfra@OData.Community.Display.V1.FormattedValue']);
                  //$("#LoanFullyDisbured").val(Logg[0]['cr6fc_loanfullydisbured@OData.Community.Display.V1.FormattedValue']);
                  $("#LoanFullyDisbured").val(Logg[0]['cr6fc_loanfullydisbured@OData.Community.Display.V1.FormattedValue']);
                  // document.getElementById("OutstandingAmountOnDate").value=Logg[0].cr6fc_outstandingamountondate;
                   document.getElementById("OutstandingAmountOnDate").value=Logg[0].cr6fc_outstandingamountondate;
                  // $("#MeansOfFinanaceTermLoan").val(Logg[0].cr6fc_meansoffinanacetermloan);
                   $("#MeansOfFinanaceTermLoan").val(Logg[0].cr6fc_meansoffinanacetermloan);
                   //document.getElementById("PromoterEquityMargin").value=Logg[0].cr6fc_promoterequitymargin;
                   document.getElementById("PromoterEquityMargin").value=Logg[0].cr6fc_promoterequitymargin;
                  // $("#UNsecuredLoan").text(results[0].UNsecuredLoan);
                 // document.getElementById("UNsecuredLoan").value=Logg[0].cr6fc_unsecuredloan;
                  document.getElementById("UNsecuredLoan").value=Logg[0].cr6fc_unsecuredloan;
                  // document.getElementById("AnyOtherSource").value=Logg[0].cr6fc_anyothersources;
                   document.getElementById("AnyOtherSource").value=Logg[0].cr6fc_anyothersources;
                   //document.getElementById("totalAmountvalue").value=Logg[0].TotalAmount;
                   //$('#totalAmountvalue').text(Logg[0].cr6fc_totalamount);
                   $('#totalAmountvalue').text(Logg[0].cr6fc_totalamount);
                   }
                   }

                else if(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'] =="WC/CC Limit"){
                   document.getElementById("AccountNoLimitDetail").value=Logg[0].cr6fc_accountno;
                   document.getElementById("SanctionedAmountWCDetail").value=Logg[0].cr6fc_sanctionedamount;
                   //document.getElementById("SanctionedDate").value=Logg[0].SanctionedDate;
                   if(Logg[0].cr6fc_dateofsanction!==undefined && Logg[0].cr6fc_dateofsanction!==null && Logg[0].cr6fc_dateofsanction!=='')
                   {

                   document.getElementById("SanctionedDate").value=Logg[0].cr6fc_dateofsanction.substring(0,Logg[0].cr6fc_dateofsanction.indexOf("T"));;
                //    document.getElementById("SanctionedDate").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].DateOfSanction));
                   }
                   document.getElementById("DrawingPower").value=Logg[0].cr6fc_drawingpower;
                   //document.getElementById("EndDateOfMoratium").value=Logg[0].EndDateOfMoratium;
                   if(Logg[0].cr6fc_enddateofmoratium!==undefined && Logg[0].cr6fc_enddateofmoratium!==null && Logg[0].cr6fc_enddateofmoratium!=='')
                   {

                   document.getElementById("EndDateOfMoratium").value=Logg[0].cr6fc_enddateofmoratium.substring(0,Logg[0].cr6fc_enddateofmoratium.indexOf("T"));;
                //    document.getElementById("EndDateOfMoratium").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].EndDateOfMoratium));
                   }
                  // document.getElementById("ValidityEndDate").value=Logg[0].ValidityEndDate;
                  if(Logg[0].cr6fc_validityenddate!==undefined && Logg[0].cr6fc_validityenddate!==null && Logg[0].cr6fc_validityenddate!=='')
                   {

                   document.getElementById("ValidityEndDate").value=Logg[0].cr6fc_validityenddate.substring(0,Logg[0].cr6fc_validityenddate.indexOf("T"));;
                //    document.getElementById("ValidityEndDate").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].ValidityEndDate));
                   }
                   document.getElementById("InterestRateDetail").value=Logg[0].cr6fc_interestrate;
                   $("#FullyLoanDisbursed").val(Logg[0]['cr6fc_loanfullydisbured@OData.Community.Display.V1.FormattedValue']);
                   //document.getElementById("FullyLoanDisbursed").value=Logg[0].FullyLoanDisbursed;
                   document.getElementById("CCOutstandingAmountOnDate").value=Logg[0].cr6fc_outstandingamountondate;
                    document.getElementById("MeansOfFinanaceTermLoan1").value=Logg[0].cr6fc_meansoffinanacetermloan;
                   document.getElementById("PromoterEquityMargin1").value=Logg[0].cr6fc_promoterequitymargin;
                   document.getElementById("UNsecuredLoan1").value=Logg[0].cr6fc_unsecuredloan;
                   document.getElementById("AnyOtherSource1").value=Logg[0].cr6fc_anyothersources;
                                      $('#totalAmountvalue1').text(Logg[0].cr6fc_totalamount);

                   }
                   document.getElementById("ProjectCostInput").value=Logg[0].cr6fc_projectcostinput;
                   document.getElementById("ProjectCostMarketing").value=Logg[0].cr6fc_projectcostmarketing;
                   document.getElementById("ProjectCostProcessing").value=Logg[0].cr6fc_projectcostprocessing;
                   document.getElementById("ProjectCostOther").value=Logg[0].cr6fc_projectcostother;
                   document.getElementById("ProjectCostTotal").value=Logg[0].cr6fc_projectcosttotal;
                                  
                   document.getElementById("TypeOfSecurity").value=Logg[0].cr6fc_typeofsecurity;
                   $("#NatureOfSecurity").val(Logg[0]['cr6fc_natureofsecurity@OData.Community.Display.V1.FormattedValue']);
                   document.getElementById("ValueOfSecurity").value=Logg[0].cr6fc_valueofsecurity;
                  
                   $("#CGIssued").val(Logg[0].cr6fc_cgissued);
                   $("#ExistingCF").val(Logg[0].cr6fc_existingcf);
                    if(Logg[0]['cr6fc_status@OData.Community.Display.V1.FormattedValue']!=null && Logg[0]['cr6fc_status@OData.Community.Display.V1.FormattedValue']!=undefined && Logg[0]['cr6fc_status@OData.Community.Display.V1.FormattedValue']!='')
					{
						$('#divStatus').show();
						document.getElementById("txtStatus").innerHTML=Logg[0]['cr6fc_status@OData.Community.Display.V1.FormattedValue'];
					}

                   if(Logg[0].cr6fc_elimakerremark!=null && Logg[0].cr6fcelimakerremark!=undefined && Logg[0].cr6fc_elimakerremark!='')
					{
						$('#divELIMaker').show();
						document.getElementById("txtELIMakerRemark").innerHTML=Logg[0].cr6fc_elimakerremark;
					}
					
					if(Logg[0].cr6fc_elicheckerremark!=null && Logg[0].cr6fc_elicheckerremark!=undefined && Logg[0].cr6fc_elicheckerremark!='')
					{
						$('#divELIChecker').show();
						document.getElementById("txtELICheckerRemark").innerHTML=Logg[0].cr6fc_elicheckerremark;
					}
                   if(Logg[0]['cr6fc_status@OData.Community.Display.V1.FormattedValue']=="Guarantee Issued" || Logg[0]['cr6fc_status@OData.Community.Display.V1.FormattedValue']=="Payment Confirmed by NABSaranrakshan")
                   {
                   		$('#btnTaxInvoice').show();
                   }
				 if(Logg[0]['cr6fc_status@OData.Community.Display.V1.FormattedValue']=="Guarantee Issued" || Logg[0]['cr6fc_status@OData.Community.Display.V1.FormattedValue']=="Payment Confirmed by NABSaranrakshan" || Logg[0]['cr6fc_status@OData.Community.Display.V1.FormattedValue']=="Payment Processed by ELI")
                   {
                   		$('#btnViewPaymentCertificate').show();
                   }
                   	$('#flexCheckChecked').prop('disabled', true);
                   	$("#txtELICheckerName").text(Logg[0]['_cr6fc_elichecker_value@OData.Community.Display.V1.FormattedValue']);
					$("#instituteIdNew").text(Logg[0].cr6fc_nameoflendinginstitution);

					if(Logg[0].cr6fc_eilcheckercertificateviewdate!=null && Logg[0].cr6fc_eilcheckercertificateviewdate!=undefined && Logg[0].cr6fc_eilcheckercertificateviewdate!='')
					{
						$('#dtproceed').text(GetCreatedDateTime(Logg[0].cr6fc_eilcheckercertificateviewdate))
					}

                    document.getElementById("NameOfLendingInstitution").value=Logg[0].cr6fc_nameoflendinginstitution;
                   $("#CollateralSecurity").val(Logg[0]['cr6fc_collateralsecurity@OData.Community.Display.V1.FormattedValue']);
                    bindSOEDetailsData(Logg[0].cr6fc_cgaplicationid)
					if(SOEDetailsColl.length>0)
					{
                   		$('#btnSOE').show();
                   		$('#btnViewCertificate').show();
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


function GetCreatedDateTime(vCreatedDate)
 {
	var vCreated=vCreatedDate;
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
	return Newtoday ;
 }
