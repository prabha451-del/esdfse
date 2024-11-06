var vItemID;
var loggedInUserId = '';
var loggedInUserName = '';
var loggedInUserEmail = '';
$(document).ready(function () {
    $('title').text('ELICHECKERAPPROVALFORM');
	 vItemID= GetQueryStingValue()["Item"];
     loggedInUserId = $('#fpo-user-contact-id').val();
     loggedInUserName = $('#fpo-user-contact-name').val();
     loggedInUserEmail = $('#fpo-user-email').val();
  var vTaskID= GetQueryStingValue()["Task"];
  document.getElementById("MangmentCheck").disabled = true;

  //  BindFPOActivities();
    BindRegion();
    BindFPOState();
    //BindBusinessFPOcity();
    BindBusinessFPOState();
	bindCGApplicationData(vItemID);
    NSApprovalMatrix();
	//GetUserId1();
    
     
       $("#vehicle1").change(function(){

   var checked = $(this).is(':checked');
   if(checked){
      $("#vehicle1").each(function(){
          $(this).prop("checked",true);
            document.getElementById("MangmentCheck").disabled = false;

      });
   }else{
      $("#vehicle1").each(function(){
          $(this).prop("checked",false);
         document.getElementById("MangmentCheck").disabled = true;

      });
   }
});

  });
  
  const da = new Date();
var dateval = da.getDate();
var b = da.getMonth()+1;
c = da.getFullYear();


  
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

 /*function BindFPOActivities() {
	var requestUri = location.origin+"/_api/cr6fc_fpoactivitiesmasters?$select=*";

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
}*/
function BindRegion() {
	//var requestUri = location.origin+"/_api/cr6fc_regionmasters?$select=cr6fc_regionmasterid,cr6fc_name";
	var requestUri = location.origin+"/_api/cr6fc_regionmasters?$select=cr6fc_regionmasterid,cr6fc_name";
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
						//RegionOfFPO.options[RegionOfFPO.options.length] = new Option(items[i].cr6fc_name,items[i].cr6fc_regionmasterid);
						RegionOfFPO.options[RegionOfFPO.options.length] = new Option(items[i].cr6fc_name,items[i].cr6fc_regionmasterid);
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
	//var requestUri = location.origin+"/_api/cr6fc_statemasters?$select=cr6fc_statemasterid,cr6fc_name";
	var requestUri = location.origin+"/_api/cr6fc_statemasters?$select=cr6fc_statemasterid,cr6fc_name";
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
						//FPOState.options[FPOState.options.length] = new Option(LoggFPOState[i].cr6fc_name,LoggFPOState[i].cr6fc_statemasterid);
						FPOState.options[FPOState.options.length] = new Option(LoggFPOState[i].cr6fc_name,LoggFPOState[i].cr6fc_statemasterid);
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
	//var requestUri = location.origin+"/_api/cr6fc_statemasters?$select=cr6fc_name,cr6fc_statemasterid";
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
						//BusinessFPOState.options[BusinessFPOState.options.length] = new Option(Logg[i].cr6fc_name, Logg[i].cr6fc_statemasterid);
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
function bindCGApplicationData(vItemID){    
	//var requestUri = location.origin+"/_api/cr6fc_cgapplicationses?$top=5000&$select=*&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=(cr6fc_cgapplicationsid eq " + vItemID + ")";
	var requestUri = location.origin+"/_api/cr6fc_cgaplications?$top=5000&$select=*&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=(cr6fc_cgaplicationid eq " + vItemID + ")";
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
                 //  document.getElementById("txtApplicantID").value=Logg[0].cr6fc_name;
				   document.getElementById("txtApplicantID").value=Logg[0].cr6fc_name;
                   document.getElementById("txtCGApplicationNo").value=Logg[0].cr6fc_name;
                   //document.getElementById("txtCGApplicationNoPayment").value=Logg[0].cr6fc_name;
                  // document.getElementById("txtApplicantName").value=Logg[0].ApplicantName;
                   //document.getElementById("txtNameOfFPO1Payment").value=Logg[0].cr6fc_nameoffpo;
                   //document.getElementById("txtNameOfFPO").value=Logg[0].NameOfFPO;
                   $("#txtNameOfFPO").text(Logg[0].cr6fc_nameoffpo);
                   document.getElementById("txtNameOfFPO1").innerHTML=Logg[0].cr6fc_nameoffpo;
              		$("#txtELICheckerNamePayment").text(Logg[0]['_cr6fc_elichecker_value@OData.Community.Display.V1.FormattedValue']);
              		$("#instituteIdNewPayment").text(Logg[0].cr6fc_nameoflendinginstitution);
                   if(Logg[0].cr6fc_eilcheckerutrcertificateviewdate!=null && Logg[0].cr6fc_eilcheckerutrcertificateviewdate!=undefined && Logg[0].cr6fc_eilcheckerutrcertificateviewdate!='')
					{
						$('#dtproceedPayment').text(GetCreatedDateTime(Logg[0].cr6fc_eilcheckerutrcertificateviewdate))
					}

                   $("#ConstitutionFPO1").val(Logg[0]['cr6fc_constitutionfpo@OData.Community.Display.V1.FormattedValue']);
                   //document.getElementById("ConstitutionFPO").value=Logg[0].ConstitutionFPO;
                   $("#FPOActs").text(Logg[0]['cr6fc_fpoacts@OData.Community.Display.V1.FormattedValue']);
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
                //     var objRJ=[];
                //     if (Logg[0].FPOActivities111.results.length > 0) {
                //         for (var n = 0; n < Logg[0].FPOActivities111.results.length; n++) {
                //             console.log(objRJ);
                //             var a = Logg[0].FPOActivities111.results[n].FPOActivity;
                //             objRJ.push(a)
                //         }
                //         var objRJNew=String(objRJ)//.join(',')
                //     }
                //    // $scope.OnGroundContestColl[i].RjNameTitle = $scope.objRJNew;
                    
                //    $("#FPOActivities").val(objRJNew);
                //    $("#FPOActivities").text(objRJNew);
                   document.getElementById("FPOActivities").innerHTML=Logg[0]['cr6fc_fpoactivities111@OData.Community.Display.V1.FormattedValue'];
                   $("#FPOAgriBusinessActivity").val(Logg[0]['cr6fc_fpoagribusinessactivity@OData.Community.Display.V1.FormattedValue']);
                   //document.getElementById("FPOAgriBusinessActivity").value=Logg[0].FPOAgriBusinessActivity;
                   document.getElementById("ForwardLinkageFPO").innerText=Logg[0].cr6fc_forwardlinkagefpo;
                   document.getElementById("BackwardLinkageFPO").innerText=Logg[0].cr6fc_backwardlinkagefpo;
                   $("#RegionOfFPO").val(Logg[0]['_cr6fc_regionoffpo_value@OData.Community.Display.V1.FormattedValue']);
                   if(Logg[0]['_cr6fc_regionoffpo_value@OData.Community.Display.V1.FormattedValue'] == "FPO in Plains"){
			                    $("#Plains").show();
			         $("#Northen").hide();
                   }    
                   else{
				        $("#Plains").hide();
				            $("#Northen").show();
                   }  
                   //document.getElementById("RegionOfFPO").value=Logg[0].RegionOfFPOId;
                   $("#TotalFPOMember").val(Logg[0]['cr6fc_totalfpomember@OData.Community.Display.V1.FormattedValue']);
                   //document.getElementById("TotalFPOMember").value=Logg[0].TotalFPOMember;
                   $("#TotalMemberNorthen").val(Logg[0]['cr6fc_totalmembernorthen@OData.Community.Display.V1.FormattedValue']);
                   //document.getElementById("TotalMemberNorthen").value=Logg[0].TotalMemberNorthen;
                   document.getElementById("NoOfLandlessFarmer").value=Logg[0].cr6fc_nooflandlessfarmer;
                   document.getElementById("NoofSmallFarmer").value=Logg[0].cr6fc_noofsmallfarmer;
                   document.getElementById("NoOfMarginalFarmer").value=Logg[0].cr6fc_noofmarginalfarmer;
                   document.getElementById("NoOfBigFarmer").value=Logg[0].cr6fc_noofbigfarmer;
                   document.getElementById("FarmerMemberSize").value=Logg[0].cr6fc_farmermembersize;
                   document.getElementById("NoOfWomenFarmer").value=Logg[0].cr6fc_noofwomenfarmer;
                   document.getElementById("NoOfSCFarmer").value=Logg[0].cr6fc_noofscfarmer;
                   document.getElementById("NoOfSTFarmer").value=Logg[0].cr6fc_noofstfarmer;
                   document.getElementById("FPODistrict").value=Logg[0].cr6fc_fpodistrict;
                   document.getElementById("ExistingRegisteredOfficeAddress").innerText=Logg[0].cr6fc_existingregisteredofficeaddress;
                  	document.getElementById("FPOCity").value=Logg[0].cr6fc_fpocity;
                   $("#FPOState").val(Logg[0]['_cr6fc_fpostate_value@OData.Community.Display.V1.FormattedValue']);
                   //document.getElementById("FPOState").value=Logg[0].FPOStateId;
                   document.getElementById("FPOPincode").value=Logg[0].cr6fc_fpopincode;
                   document.getElementById("GeoLatituteLocation").value=Logg[0].cr6fc_geolatitutelocation;
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
                   
                 if(Logg[0].cr6fc_fpoavailedgoischeme!=1)
                   {
                   		$('#creditfacility').hide();
                   		$('#crodetails').hide();
						$('#creditfacility1').hide();
                   }
                   else
                   {
                   		$('#creditfacility').show();
                   		$('#crodetails').show();
						   $('#creditfacility1').show();
						}
                   
                  /* if(Logg[0].RegionOfFPOId=="FPO in Plains")
                   {
                   		$('#Plains').show();
                   		$('#Northen').hide();
                   }
                   else if(Logg[0].RegionOfFPOId=="FPO in North Eastern or Hilly Areas")
                   {
                   		$('#Plains').hide();
                   		$('#Northen').show();
                   }
                    else
                   {
                   		$('#Plains').show();
                   		$('#Northen').show();
                   }*/
                   
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
                   
                  /* if(Logg[0].cr6fc_loanfullydisbured==1)
                   {
                   		$('#outstand2').hide();
                   		$('#termloandettl').hide();
                   }
                   else
                   {
                   		$('#outstand2').show();
                   		$('#termloandettl').show();
                   }*/
                   
                   /* if(Logg[0].cr6fc_fullyloandisbursed==1)
                   {
                   		$('#outstanding3').hide();
                   		$('#termloandettl').hide();
                   }
                   else
                   {
                   		$('#outstanding3').show();
                   		$('#termloandettl').show();
                   }   */                
                   //document.getElementById("BusinessAddress").value=Logg[0].BusinessAddressSameRegiAddress;
                   $("#BusinessFPOcity").val(Logg[0].cr6fc_businessfpocity);
                   //document.getElementById("BusinessFPOcity").value=Logg[0].BusinessFPOCityId;
                   document.getElementById("BusinessFPODistrict").value=Logg[0].cr6fc_businessfpodistrict;
                   document.getElementById("BusinessAddressFPO").innerText=Logg[0].cr6fc_businessaddressfpo;
				   if(Logg[0].cr6fc_BusinessFPOState!=undefined && Logg[0].cr6fc_BusinessFPOState!=null)
				   {
					$("#BusinessFPOState").val(Logg[0].cr6fc_BusinessFPOState['cr6fc_name']);
				   }
                   //document.getElementById("BusinessFPOState").value=Logg[0].BusinessFPOStateId;
                   document.getElementById("FarmerMemberSize").value=Logg[0].cr6fc_farmermembersize;
                   document.getElementById("BusinessFPOPincode").value=Logg[0].cr6fc_businessfpopincode;
                   document.getElementById("GeoLatituteLocationFPO").value=Logg[0].cr6fc_geolatitutelocationfpo;
                   document.getElementById("GeoLongituteLocationFPO").value=Logg[0].cr6fc_geolongitutelocationfpo;
                   $("#NewFPO").text(Logg[0]['cr6fc_newfpo@OData.Community.Display.V1.FormattedValue']);
                   //document.getElementById("NewFPO").value=Logg[0].NewFPO;
                   $("#FPOAvailedGOIScheme").val(Logg[0]['cr6fc_fpoavailedgoischeme@OData.Community.Display.V1.FormattedValue']);
                   //document.getElementById("FPOAvailedGOIScheme").value=Logg[0].FPOAvailedGOIScheme;
                   document.getElementById("CGPAN").value=Logg[0].cr6fc_cgpan;
                   document.getElementById("ExistingCF").value=Logg[0]['cr6fc_existingcf@OData.Community.Display.V1.FormattedValue'];
                   document.getElementById("TotalSanctionedAmount").value=Logg[0].cr6fc_totalsanctionedamount;
                   $("#TypeOfCreditFacility").val(Logg[0]['cr6fc_typeofcreditfacility@OData.Community.Display.V1.FormattedValue']);
                   //document.getElementById("TypeOfCreditFacility").value=Logg[0].TypeOfCreditFacility;
                  if(Logg[0].cr6fc_validitycreditguarantee!=null && Logg[0].cr6fc_validitycreditguarantee!=undefined && Logg[0].cr6fc_validitycreditguarantee!='')
                  {

                   document.getElementById("ValidityCreditGuarantee").value=Logg[0].cr6fc_validitycreditguarantee.substring(0,Logg[0].cr6fc_validitycreditguarantee.indexOf("T"));;
                   //document.getElementById("ValidityCreditGuarantee").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_validitycreditguarantee));
                   }
                   //document.getElementById("NameOfCEO").value=Logg[0].NameOfCEO;
                   $("#NameOfCEO").text(Logg[0].cr6fc_nameofceo);
                   document.getElementById("ContactCEO").value=Logg[0].cr6fc_contactceo;
                   document.getElementById("MobileCEO").value=Logg[0].cr6fc_mobileceo;
                   document.getElementById("EmailIDCEO").value=Logg[0].cr6fc_emailidceo;
                   document.getElementById("CustomerID").value=Logg[0].cr6fc_customerid;
                   $("#LendingAssesmentTool").text(Logg[0]['cr6fc_lendingassesmenttool@OData.Community.Display.V1.FormattedValue']);
                   //document.getElementById("LendingAssesmentTool").value=Logg[0].LendingAssesmentTool;
                   $("#TypeofFacility").val(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue']);
                   //document.getElementById("TypeofFacility").value=Logg[0].TypeofFacility;
                //     var objRJ1=[];
                //     if (Logg[0].PurposeOftheCreditFacility.results.length > 0) {
                //         for (var n = 0; n < Logg[0].PurposeOftheCreditFacility.results.length; n++) {
                //             console.log(objRJ);
                //             var a = Logg[0].PurposeOftheCreditFacility.results[n];
                //             objRJ1.push(a)
                //         }
                //         var objRJNew1=String(objRJ)//.join(',')
                //     }
                //    $("#PurposeOftheCreditFacility").text(objRJNew1);
                      $("#CreditFacilityUtilised").val(Logg[0].cr6fc_creditfacilityutilised);
                document.getElementById("PurposeOftheCreditFacility").innerHTML=Logg[0]['cr6fc_purposeofthecreditfacility@OData.Community.Display.V1.FormattedValue'];
                   if(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'] ==  "Term Loan OR WCTL (Working Capital Term Loan)")
                   {
                   if(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'] ==  "Term Loan OR WCTL (Working Capital Term Loan)"){
                   
                   
                   document.getElementById("AccountNo").value=Logg[0].cr6fc_accountno;
                   document.getElementById("SanctionedAmount").value=Logg[0].cr6fc_sanctionedamount;
                  // document.getElementById("DateOfSanction").value=Logg[0].DateOfSanction;
                  var Word=convertNumberToWords(Math.ceil(Logg[0].cr6fc_sanctionedamount));
                   console.log(Word);
                   $('#SanctionedAmountinwords').text("Rupees " + " " + Word + " " + "Only" );
                  if(Logg[0].cr6fc_dateofsanction!==undefined && Logg[0].cr6fc_dateofsanction!==null && Logg[0].cr6fc_dateofsanction!=='')
                   {

                	document.getElementById("DateOfSanction").value=Logg[0].cr6fc_dateofsanction.substring(0,Logg[0].cr6fc_dateofsanction.indexOf("T"));;
                	//document.getElementById("DateOfSanction").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_dateofsanction));
                	}
                  // document.getElementById("EndDateOfInterestMoratium").value=Logg[0].EndDateOfInterestMoratium;
                  if(Logg[0].cr6fc_enddateofinterestmoratium!==undefined && Logg[0].cr6fc_enddateofinterestmoratium!==null && Logg[0].cr6fc_enddateofinterestmoratium!=='')
                   {

                	document.getElementById("EndDateOfInterestMoratium").value=Logg[0].cr6fc_enddateofinterestmoratium.substring(0,Logg[0].cr6fc_enddateofinterestmoratium.indexOf("T"));;
                	// document.getElementById("EndDateOfInterestMoratium").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_enddateofinterestmoratium));
                	}
                   //document.getElementById("EndDateOfPrincipleMoratium").value=Logg[0].EndDateOfPrincipleMoratium;
                   if(Logg[0].cr6fc_enddateofprinciplemoratium!==undefined && Logg[0].cr6fc_enddateofprinciplemoratium!==null && Logg[0].cr6fc_enddateofprinciplemoratium!=='')
                   {

                	document.getElementById("EndDateOfPrincipleMoratium").value=Logg[0].cr6fc_enddateofprinciplemoratium.substring(0,Logg[0].cr6fc_enddateofprinciplemoratium.indexOf("T"));;
                	// document.getElementById("EndDateOfPrincipleMoratium").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_enddateofprinciplemoratium));
                	}
                  // document.getElementById("DueDateOfLastInstallment").value=Logg[0].DueDateOfLastInstallment;
                  if(Logg[0].cr6fc_duedateoflastinstallment!==undefined && Logg[0].cr6fc_duedateoflastinstallment!==null && Logg[0].cr6fc_duedateoflastinstallment!=='')
                   {

                	document.getElementById("DueDateOfLastInstallment").value=Logg[0].cr6fc_duedateoflastinstallment.substring(0,Logg[0].cr6fc_duedateoflastinstallment.indexOf("T"));;
                	// document.getElementById("DueDateOfLastInstallment").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_duedateoflastinstallment));
                	}
                   document.getElementById("InterestRate").value=Logg[0].cr6fc_interestrate;
                   $("#CreditFacilityFundAgriInfra").val(Logg[0]['cr6fc_creditfacilityfundagriinfra@OData.Community.Display.V1.FormattedValue']);
                  // document.getElementById("CreditFacilityFundAgriInfra").value=Logg[0].CreditFacilityFundAgriInfra;
                  $("#LoanFullyDisbured").val(Logg[0]['cr6fc_loanfullydisbured@OData.Community.Display.V1.FormattedValue']);
                   //document.getElementById("LoanFullyDisbured").value=Logg[0].LoanFullyDisbured;
                   document.getElementById("OutstandingAmountOnDate").value=Logg[0].cr6fc_outstandingamountondate;
                   
                   $("#MeansOfFinanaceTermLoan").val(Logg[0].cr6fc_meansoffinanacetermloan);
                   document.getElementById("PromoterEquityMargin").value=Logg[0].cr6fc_promoterequitymargin;
                  // $("#UNsecuredLoan").text(results[0].UNsecuredLoan);
                  document.getElementById("UNsecuredLoan").value=Logg[0].cr6fc_unsecuredloan;
                   document.getElementById("AnyOtherSource").value=Logg[0].cr6fc_anyothersources;
                   //document.getElementById("totalAmountvalue").value=Logg[0].TotalAmount;
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
                   document.getElementById("TypeOfSecurity").innerText=Logg[0].cr6fc_typeofsecurity;
                   $("#NatureOfSecurity").val(Logg[0]['cr6fc_natureofsecurity@OData.Community.Display.V1.FormattedValue']);
                   document.getElementById("ValueOfSecurity").value=Logg[0].cr6fc_valueofsecurity;
                   $("#CGIssued").val(Logg[0].cr6fc_cgissued);
					   $('#NameOfLendingInstitution').val(Logg[0].cr6fc_nameoflendinginstitution);
					   // document.getElementById("NameOfLendingInstitution").value=Logg[0].cr6fc_nameoflendinginstitution;
					  $("#CollateralSecurity").val(Logg[0]['cr6fc_collateralsecurity@OData.Community.Display.V1.FormattedValue']);
                   	$("#txtELICheckerName").text(Logg[0]['_cr6fc_elichecker_value@OData.Community.Display.V1.FormattedValue']);
					$("#instituteIdNew").text(Logg[0].cr6fc_nameoflendinginstitution);
					if(Logg[0].cr6fc_elicheckerremark!=null && Logg[0].cr6fc_elicheckerremark!=undefined && Logg[0].cr6fc_elicheckerremark!='')
					{
						$('#divCheckerHide').show();
						document.getElementById("hdnEIlCheckerRemark").value=Logg[0].cr6fc_elicheckerremark;
						document.getElementById("divELICheckerRemark").innerHTML=Logg[0].cr6fc_elicheckerremark;
					}
					
					if(Logg[0].cr6fc_elimakerremark!=null && Logg[0].cr6fc_elimakerremark!=undefined && Logg[0].cr6fc_elimakerremark!='')
					{	
						$('#divMaker').show();
						document.getElementById("divELImaker").innerHTML=Logg[0].cr6fc_elimakerremark;
					}
					let a = new Date();
					$('#dtproceed').text(GetCreatedDateTime(a));
                   //document.getElementById("CollateralSecurity").value=Logg[0].CollateralSecurity;
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


function ShowPopUp(hi)
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
	var Newtoday = dd + '/' + mm + '/' + yyyy+" "+strTime;
	return Newtoday ;
 }
 
var NSApproverColl;
 var NSCheckerApprover;
function NSApprovalMatrix() {
				//var requestUri = location.origin+"/_api/cr6fc_nsapprovalmatrixes?$select=cr6fc_role,_cr6fc_user_value&$filter= cr6fc_role eq 'Checker'";
				var requestUri = location.origin+"/_api/cr6fc_nsapprovalmatrixes?$select=cr6fc_role,_cr6fc_user_value&$filter= cr6fc_role eq 'Checker'";
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
		            if(NSApproverColl.length>0)
		            {
		            	//NSCheckerApprover=NSApproverColl[0]._cr6fc_user_value;	
						NSCheckerApprover =NSApproverColl[0]._cr6fc_user_value;					
		            }
		        },
		        error: function () {
		            console.log("error");
		        }
		    });
}
var cgapplicationentityid;
function Proceed()
{
	var Data;
	
			Data = JSON.stringify(
		    {
		        /*'__metadata': {
		            'type': 'SP.Data.CGApplicationsListItem'
		        },*/
				 /*"cr6fc_eilcheckercertificateview":1,
				 "cr6fc_eilcheckercertificateviewdate":new Date(),
				"cr6fc_status":Status*/
				"cr6fc_eilcheckercertificateview":1,
				 "cr6fc_eilcheckercertificateviewdate":new Date(),
				"cr6fc_status":Status
		    });
		shell.getTokenDeferred().done(function(token){
			
			console.log(token)
			var header={__RequestVerificationToken:token,
				contentType: "application/json;odata=verbose",
				XRequestDigest: $("#__REQUESTDIGEST").val(),
				IFMATCH: "*",
				XHttpMethod: "PATCH"
			}
		$.ajax({
		
			url: "/_api/cr6fc_cgaplications(" +vItemID+")",
					type: "PATCH",
					headers: header,
					async: false,
					data: Data,
	    success: function (data,textStatus,xhr) 
	    {
	       	 cgapplicationentityid = xhr.getResponseHeader('entityid');
				alert('Item Updated Succesfully');
				//window.location.href = location.origin + "/RefreshingCache/?id="+cgapplicationentityid+"&tbl=cr6fc_cgapplicationses&col=cr6fc_cacherefreshedon&red=ELICheckerDashBoardCGApp";
				//window.location.href = location.origin + "/RefreshingCache/?id="+cgapplicationentityid+"&tbl=cr6fc_cgapplicationses&col=cr6fc_cacherefreshedon&red=ELICheckerDashBoardCGApp";
				window.location.href = location.origin + "/RefreshingCache/?id="+cgapplicationentityid+"&tbl=cr6fc_cgapplicationses&col=cr6fc_cacherefreshedon&red=ELICheckerDashBoardCGApp";
				// window.location.href=location.origin+"/ELICheckerDashBoardCGApp/";	
	    },
	    error: function (e) 
	    {
	    	console.log(e);
	    }
	});
})
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
var Status;
function FunAction(status) 
{
	var substatus = "";
	if(status == 'Submitted to NabSanrakshan') 
	{
		substatus = "6";
	}
	if(status == 'Sent Back by ELI Checker') 
	{
		substatus = "4";
	}
	if(status == 'Rejected by ELI Checker') 
	{
		substatus = "5";
	}

 	var txtRemarksComments= $('#txtRemarksComments').val();
    if (txtRemarksComments == '' || txtRemarksComments == null || txtRemarksComments == undefined) 
    {     
	  alert('Please Enter Remark')
	  return false;
     }
	var Data;
	var workflowDt = new Date();
	workflowDt = GetCurrentDataToday();
	
		var EIlCheckerComm=$("#hdnEIlCheckerRemark").val();
		var txtELICheckerRemark;
		if(EIlCheckerComm!='' && EIlCheckerComm!=undefined && EIlCheckerComm!='')
		{
		txtELICheckerRemark= "<b>Comment</b> :- " + txtRemarksComments + " - " + workflowDt + ": " + EIlCheckerComm.toString() + "\n\n"
		}
		else{
		txtELICheckerRemark= "<b>Comment </b>:- " + txtRemarksComments + " - " + workflowDt+ "\n\n"
		}
	
	if(status == 'Sent Back by ELI Checker' || status == 'Rejected by ELI Checker')
	{
			Data = JSON.stringify(
		    {
		        /*'__metadata': {
		            'type': 'SP.Data.CGApplicationsListItem'
		        },*/
				/*"cr6fc_status":substatus,
				"cr6fc_elicheckerremark":txtELICheckerRemark*/
				"cr6fc_status":substatus,
				"cr6fc_elicheckerremark":txtELICheckerRemark
				 
		    });

	}
	else if(status == 'Submitted to NabSanrakshan')
	{
			Data = JSON.stringify(
		    {
		        /*'__metadata': {
		            'type': 'SP.Data.CGApplicationsListItem'
		        },*/
				//"cr6fc_status":substatus,
				/*"cr6fc_elicheckerremark":txtELICheckerRemark,
				//"cr6fc_ELIChecker_contact@odata.bind": "/contacts(" + EILchecker + ")",
				"cr6fc_NSChecker_contact@odata.bind": "/contacts(" + NSCheckerApprover + ")", 				
				"cr6fc_submissiondate":new Date()*/
				"cr6fc_elicheckerremark":txtELICheckerRemark,
				"cr6fc_NSChecker_contact@odata.bind": "/contacts(" + NSCheckerApprover + ")", 
				"cr6fc_submissiondate": new Date()
				 
		    });

	}
	shell.getTokenDeferred().done(function(token){
			
		console.log(token)
		var header={__RequestVerificationToken:token,
			contentType: "application/json;odata=verbose",
			XRequestDigest: $("#__REQUESTDIGEST").val(),
			IFMATCH: "*",
			XHttpMethod: "PATCH"
		}
	$.ajax({
	
	    url: "/_api/cr6fc_cgaplications("+vItemID+")",
		type: "PATCH",
		async: false,
		data: Data,
		headers: header,
			success: function (data,textStatus,xhr) 
			{
				cgappentityid=xhr.getResponseHeader('entityid');
				if(status == 'Submitted to NabSanrakshan')
				{
					Status='6';
							alert('Approved Succesfully');

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
				else
				{
					alert('Item Updated Succesfully');
					window.location.href = location.origin + "/RefreshingCache/?id="+cgappentityid+"&tbl=cr6fc_cgaplications&col=cr6fc_cacherefreshedon&red=ELIMakerCGFeeDB";
					// window.location.href=location.origin+"/ELICheckerDashBoardCGApp/";	

				}		                 
			},
			error: function (e) 
			{
				console.log(e);
			}
		})
	})
}
//added by shivaprabha 20april
function Exit()
{
window.location.href=location.origin+"/ELICheckerDashBoardCGApp/";	
}
