var vItemID;
var vTotalDocLength = 0;
var fileArray = [];
var otherfileArray=[];
var AttchLength=0;
var arraycount = 0;
var SOECOLLID;
var Page;
$(document).ready(function () {
//$('#fileAttachInvoice').multifile();
    $('title').text('APPLICATIONEDITFORM');
     vItemID= GetQueryStingValue()["Item"];
  var vTaskID= GetQueryStingValue()["Task"];
    Page= GetQueryStingValue()["Page"];
    document.getElementById("MangmentCheck").unabled = true;
	TaxMaster(vItemID);
	SOEMaster(vItemID);
	RegionMaster()
	bindCGApplicationData(vItemID);
	NSApprovalMatrix();
	RateMster();
	TrustMaster();
	getfileNSchecker(vItemID);  
	getfileNSNSApprover(vItemID); 
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
function cancel(){
window.location.href="/sites/FPOCGPortal/SitePages/DashBoardCGApp.aspx";

}
var TrustMasterColl;
function TrustMaster() {
		    //var requestUri = location.origin+"/_api/('TrustMaster')//items?$top=500&$select=*,Title,ID,State/State,State/Id,State/StateCode&$expand=State&$orderby=ID asc";
			var requestUri =location.origin + "/_api/cr6fc_trustmasters?$select=cr6fc_State&$expand=cr6fc_State($select=cr6fc_statemasterid,cr6fc_name)";
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
		            TrustMasterColl= data.value;
		        },
		        error: function () {
		            console.log("error");
		        }
		    });
}

var TaxMasterColl;
function TaxMaster() {
		    //var requestUri = location.origin+"/_api/('TaxInvoices')//items?$top=1000&$select=*&$orderby=ID asc";
			var requestUri = location.origin +"/_api/cr6fc_taxinvoiceses?$select=cr6fc_cgid,cr6fc_cgpan";
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
		    var requestUri =location.origin + "/_api/cr6fc_regionmasters?$select=*";
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
		            RegionMasterColl= data.value;
		        },
		        error: function () {
		            console.log("error");
		        }
		    });
}


var SOEMasterColl;
var SOEIDMasterColl;
function SOEMaster(vItemID) {
			SOEMasterID(vItemID);
		    //var requestUri = location.origin+"/_api/('SOEDetails')//items?$top=500&$select=*&$orderby=ID asc";
			var requestUri = location.origin +"/_api/cr6fc_soedetailses?$select=*";
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
var SOEIDMasterColl;
function SOEMasterID(vItemID) {
		    //var requestUri = location.origin+"/_api/('SOEDetails')//items?$top=500&$select=*&$filter=WFID eq '"+vItemID+"'&$orderby=ID asc";
			var requestUri = "/_api/cr6fc_soedetailses?$select=*&$filter=cr6fc_wfid eq '"+vItemID+"'";
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



var ToatalSanctionAmt=0;
var ExcludingCurrSanctionAmt=0;
var CGApplPANColl;
function CGApplPANCollData(vPANNo,CGColl) {
    //var requestUri = location.origin+"/_api/('CGApplications')//items?$top=500&$select=*,FPOActivities111/FPOActivity,RegionOfFPO/Region,FPOState/State,BusinessFPOState/State,ELIChecker/Title&$expand=ELIChecker,RegionOfFPO,FPOActivities111,FPOState,BusinessFPOState&$filter=(PANFPO eq '"+vPANNo+"' and (Status eq 'Review by NABSaranrakshan' or Status eq '8' or Status eq '10' or Status eq '11' or Status eq '13' or Status eq '15' or Status eq '12'))";
    //var requestUri = location.origin+"/_api/('CGApplications')//items?$top=500&$select=*,FPOActivities111/FPOActivity,RegionOfFPO/Region,FPOState/State,BusinessFPOState/State,ELIChecker/Title&$expand=ELIChecker,RegionOfFPO,FPOActivities111,FPOState,BusinessFPOState&$filter=(PANFPO eq '"+vPANNo+"' and (Status eq '8' or Status eq '10' or Status eq '11' or Status eq '13' or Status eq '15' or Status eq '12'))";
	var requestUri = "/_api/cr6fc_cgaplications?$top=5000&$select=*&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=cr6fc_panfpo eq '"+vPANNo+"' and (cr6fc_status eq 8 or cr6fc_status eq 10 or cr6fc_status eq 11 or cr6fc_status eq 13 or cr6fc_status eq 15 or cr6fc_status eq 12)";
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
		            if(CGApplPANColl.length>0)
		            {
		            	
		            	for(var i=0;i<CGApplPANColl.length; i++)
                    	{
                    		var SOEDate=new Date(CGApplPANColl[i].cr6fc_soegenerateddate)
                    		var CurrDate=new Date();
                    		var difference = SOEDate.getTime() - CurrDate.getTime();
                    		var TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
							console.log(difference);
                    		if(CGApplPANColl[i].cr6fc_status=="8" && TotalDays > 60)
                    		{
                    			if(CGApplPANColl[i].cr6fc_sanctionedamount!=null && CGApplPANColl[i].cr6fc_sanctionedamount!='')
	                    		{
	                    			ToatalSanctionAmt=ToatalSanctionAmt+parseFloat(CGApplPANColl[i].cr6fc_sanctionedamount);
	                    		}
                    		}
                    		else if(CGApplPANColl[i].cr6fc_status!="8")
                    		{
                    			if(CGApplPANColl[i].cr6fc_sanctionedamount!=null && CGApplPANColl[i].cr6fc_sanctionedamount!='')
	                    		{
	                    			ToatalSanctionAmt=ToatalSanctionAmt+parseFloat(CGApplPANColl[i].cr6fc_sanctionedamount);
	                    		}

                    		}

                    	}
                    	ExcludingCurrSanctionAmt=ToatalSanctionAmt;
                    	if(CGColl[0].cr6fc_sanctionedamount!='' && CGColl[0].cr6fc_sanctionedamount!=null)
                    	{
                    		ToatalSanctionAmt=parseFloat(CGColl[0].cr6fc_sanctionedamount) + parseFloat(ToatalSanctionAmt);
                    	}
		            }
		            else
		            {
		            	ToatalSanctionAmt=CGColl[0].cr6fc_sanctionedamount;
		            }
		            
		        },
		        error: function () {
		            console.log("error");
		        }
		    });
}

var RateMasterColl;
function RateMster() {
		    //var requestUri = location.origin+"/_api/('RateMaster')//items?$top=500&$select=*,Title,ID&$orderby=ID asc";
			var requestUri =location.origin + "/_api/cr6fc_ratemasters?$top=5000&$select=cr6fc_category,cr6fc_applicablepercentage,cr6fc_greaterthan,cr6fc_lessthan"
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
	var requestUri = location.origin +"/_api/cr6fc_nsapprovalmatrixes?$select=_cr6fc_user_value&$filter= cr6fc_role eq 'Approver'";
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
			NSCheckerApprover=NSApproverColl[0]._cr6fc_user_value;						
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
		    //var requestUri = location.origin+"/_api/('ELIMaster')//items?$top=500&$select=*,Title,ID,State/State,State/Id,State/StateCode&$expand=State&$filter=EmailID eq '"+email+"'&$orderby=ID asc";
			var requestUri = "/_api/cr6fc_elimasters?$select=*&$expand=cr6fc_State($select=cr6fc_statemasterid,cr6fc_name)&$filter=cr6fc_emailid eq '"+email+"'";
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

 var AllCGApplicationColl;
 
function BindAllCGData(PANNo) {
			var TotalSancAmt=0;
			
		    //var requestUri = location.origin+"/_api/('CGApplications')//items?$top=500&$select=*&$filter=(PANFPO eq '"+PANNo+"' and (Status ne 'Saved'))&$orderby=ID asc";
			var requestUri = "/_api/cr6fc_cgaplications?$select=*&$filter=cr6fc_panfpo eq '"+PANNo+"'and cr6fc_status ne 8";
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
		            AllCGApplicationColl = data.value;
		            if(AllCGApplicationColl.length>0)
		            {
		            	for(i=0;i<AllCGApplicationColl.length;i++)
		            	{
		            		if(AllCGApplicationColl[i].cr6fc_status=="8" || AllCGApplicationColl[i].cr6fc_status=="10" || AllCGApplicationColl[i].cr6fc_status=="13" || AllCGApplicationColl[i].cr6fc_status=="15" || AllCGApplicationColl[i].cr6fc_status=="11")
		            		{
		            			if(AllCGApplicationColl[i].cr6fc_sanctionedamount!='' && AllCGApplicationColl[i].cr6fc_sanctionedamount!=null && AllCGApplicationColl[i].cr6fc_sanctionedamount!=undefined)
			            		{
			            			TotalSancAmt=parseFloat(TotalSancAmt)+parseFloat(AllCGApplicationColl[i].cr6fc_sanctionedamount)
			            		}
		            		}
			            		
		            	}
		            	$('#hdnTotalSanctionAmt').val(TotalSancAmt);
		            }
		        },
		        error: function () {
		            console.log("error");
		        }
		    });
}



function bindCGApplicationData(vItemID){    
    //var requestUri = location.origin+"/_api/('CGApplications')//items?$top=500&$select=*,FPOActivities111/FPOActivity,RegionOfFPO/Region,FPOState/State,BusinessFPOCity/City,BusinessFPOState/State,ELIChecker/Title&$expand=ELIChecker,RegionOfFPO,FPOActivities111,FPOState,BusinessFPOCity,BusinessFPOState&$filter=(ID eq '"+vItemID+"')";
    //var requestUri = location.origin+"/_api/('CGApplications')//items?$top=500&$select=*,FPOActivities111/FPOActivity,RegionOfFPO/Region,FPOState/State,BusinessFPOState/State,ELIChecker/Title&$expand=ELIChecker,RegionOfFPO,FPOActivities111,FPOState,BusinessFPOState&$filter=(ID eq '"+vItemID+"')";
	var requestUri = location.origin +"/_api/cr6fc_cgaplications?$top=5000&$select=*&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name),&$filter=(cr6fc_cgaplicationid eq " + vItemID + ")";
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
              if(data.value.length > 0)
              {     
              		     ELIMaster(Logg[0].cr6fc_elimakeremailid);
					BindAllCGData(Logg[0].cr6fc_panfpo);	
					document.getElementById("hdnStatus").value=Logg[0].cr6fc_status;
					document.getElementById("txtApplicantID").value=Logg[0].cr6fc_name;                  	
					document.getElementById("txtCGApplicationNo").value=Logg[0].cr6fc_name;
					document.getElementById("existingCF").value=Logg[0]['cr6fc_existingcf@OData.Community.Display.V1.FormattedValue'];

					$("#txtNameOfFPO1").text(Logg[0].cr6fc_nameoffpo);
                        $("#FPOActivities").text(Logg[0]['cr6fc_fpoactivities111@OData.Community.Display.V1.FormattedValue']);
					$("#txtNameOfFPO").text(Logg[0].cr6fc_nameoffpo);
					$("#txtELICheckerName").text(Logg[0]['_cr6fc_elichecker_value@OData.Community.Display.V1.FormattedValue']);
					$("#instituteId").text(Logg[0].cr6fc_nameoflendinginstitution);
					$("#instituteIdNew").text(Logg[0].cr6fc_nameoflendinginstitution);
					$("#fsGroupLable").text(Logg[0].cr6fc_nameoflendinginstitution)
					if(Logg[0].cr6fc_eilcheckercertificateviewdate!=null && Logg[0].cr6fc_eilcheckercertificateviewdate!=undefined && Logg[0].cr6fc_eilcheckercertificateviewdate!='')
					{
						$('#dtproceed').text(GetCreatedDateTime(Logg[0].cr6fc_eilcheckercertificateviewdate))
					}
					if(Logg[0].cr6fc_nsapproverremark!=null && Logg[0].cr6fc_nsapproverremark!=undefined && Logg[0].cr6fc_nsapproverremark!='')
					{
						document.getElementById("divReview").innerHTML=Logg[0].cr6fc_nsapproverremark;
						document.getElementById("hdnNABApproverComment").value=Logg[0].cr6fc_nsapproverremark;
						$('#reviewNab').show();
					}
					
					if(Logg[0].cr6fc_nschackerremark!=null && Logg[0].cr6fc_nschackerremark!=undefined && Logg[0].cr6fc_nschackerremark!='')
					{
						document.getElementById("hdnNABCheckerComment").value=Logg[0].cr6fc_nschackerremark;
						document.getElementById("divReviewChecker").innerHTML=Logg[0].cr6fc_nschackerremark;
						$('#reviewNabChecker').show();
						//divReviewChecker
					}
					CGApplPANCollData(Logg[0].cr6fc_panfpo,Logg);
                   $("#ConstitutionFPO1").val(Logg[0]['cr6fc_constitutionfpo@OData.Community.Display.V1.FormattedValue']);
                   //document.getElementById("ConstitutionFPO").value=Logg[0].ConstitutionFPO;
                   $("#FPOActs").text(Logg[0]['cr6fc_fpoacts@OData.Community.Display.V1.FormattedValue']);
                   //document.getElementById("FPOActs").value=Logg[0].FPOActs;
                  //document.getElementById("DateOfRegistration").value=Logg[0].DateOfRegistration;
                   if(Logg[0].cr6fc_dateofregistration!=null && Logg[0].cr6fc_dateofregistration!=undefined && Logg[0].cr6fc_dateofregistration !='')
	                {                		
                		//document.getElementById("DateOfRegistration").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_dateofregistration));
						const date2 = new Date(Logg[0].cr6fc_dateofregistration);
						const formattedDate2 = date2.toISOString().slice(0, 10);
						document.getElementById("DateOfRegistration").value = formattedDate2;
                	}
                   document.getElementById("PlaceOfRegistration").value=Logg[0].cr6fc_placeofregistration;
                   document.getElementById("RegistrationNo").value=Logg[0].cr6fc_registrationno;
                   document.getElementById("PANFPO").value=Logg[0].cr6fc_panfpo;
                   document.getElementById("TANTINFPO").value=Logg[0].cr6fc_tantinfpo;
                   document.getElementById("GSTINFPO").value=Logg[0].cr6fc_gstinfpo;
                   
                   $("#FPOAgriBusinessActivity").val(Logg[0]['cr6fc_fpoagribusinessactivity@OData.Community.Display.V1.FormattedValue']);                   
                   $("#ForwardLinkageFPO").text(Logg[0].cr6fc_forwardlinkagefpo);                  
                   $("#BackwardLinkageFPO").text(Logg[0].cr6fc_backwardlinkagefpo);
                   document.getElementById("FPODistrict").value=Logg[0].cr6fc_fpodistrict;
                  // document.getElementById("ExistingRegisteredOfficeAddress").value=Logg[0].ExistingRegisteredOfficeAddress;
                   $("#ExistingRegisteredOfficeAddress").text(Logg[0].cr6fc_existingregisteredofficeaddress);
                   if (Logg[0]['cr6fc_businessaddresssameregiaddress@OData.Community.Display.V1.FormattedValue'] == "Yes"){
                             $("#otherdetilfpo").hide();
				            $("#busineefpoadd").hide();
				            $("#busineefpostate").hide();
                   }
                   else{
		                   $("#otherdetilfpo").show();
				           $("#busineefpoadd").show();
				           $("#busineefpostate").show();
                   }

                  // document.getElementById("FPODistrict").value=Logg[0].FPODistrict;
                   $("#FPOState").val(Logg[0].cr6fc_FPOState.cr6fc_name);
                   $("#FPOCity").val(Logg[0].cr6fc_fpocity);

                   document.getElementById("stateID").value=Logg[0].cr6fc_FPOState.cr6fc_statemasterid;
                   //document.getElementById("FPOState").value=Logg[0].FPOStateId;
                   document.getElementById("FPOPincode").value=Logg[0].cr6fc_fpopincode;
                   document.getElementById("GeoLatituteLocation").value=Logg[0].cr6fc_geolatitutelocation;
                   document.getElementById("GeoLongituteLocation").value=Logg[0].cr6fc_geolongitutelocation;
                   $("#BusinessAddress").val(Logg[0]['cr6fc_businessaddresssameregiaddress@OData.Community.Display.V1.FormattedValue'])
                   //document.getElementById("BusinessAddress").value=Logg[0].BusinessAddressSameRegiAddress;
                   $("#BusinessFPOcity").val(Logg[0].cr6fc_businessfpocity);
                   //document.getElementById("BusinessFPOcity").value=Logg[0].BusinessFPOCityId;
                   document.getElementById("BusinessFPODistrict").value=Logg[0].cr6fc_businessfpodistrict;
                  // document.getElementById("BusinessAddressFPO").value=Logg[0].BusinessAddressFPO;
                   $("#BusinessAddressFPO").text(Logg[0].cr6fc_businessaddressfpo);
                   if(Logg[0].cr6fc_BusinessFPOState!= null){
					$("#BusinessFPOState").val(Logg[0].cr6fc_BusinessFPOState.cr6fc_name);
			}
                   //document.getElementById("BusinessFPOState").value=Logg[0].BusinessFPOStateId;
                   document.getElementById("FarmerMemberSize").value=Logg[0].cr6fc_farmermembersize;
                   document.getElementById("BusinessFPOPincode").value=Logg[0].cr6fc_businessfpopincode;
                   document.getElementById("GeoLatituteLocationFPO").value=Logg[0].cr6fc_geolatitutelocationfpo;
                   document.getElementById("GeoLongituteLocationFPO").value=Logg[0].cr6fc_geolongitutelocationfpo;
                     $("#RegionOfFPO").val(Logg[0].cr6fc_RegionOfFPO.cr6fc_name);
                   if(Logg[0].cr6fc_RegionOfFPO.cr6fc_name=="FPO in North Eastern or Hilly Areas"){
			                    $("#Plains").hide();
			         $("#Northen").show();
                   }    
                   else{
				        $("#Plains").show();
				            $("#Northen").hide();
                   }                         //document.getElementById("RegionOfFPO").value=Logg[0].RegionOfFPOId;
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
                   $("#NewFPO").text(Logg[0]['cr6fc_newfpo@OData.Community.Display.V1.FormattedValue']);
                   //document.getElementById("NewFPO").value=Logg[0].NewFPO;
                    document.getElementById("FPOAvailedGOIScheme").value=Logg[0]['cr6fc_fpoavailedgoischeme@OData.Community.Display.V1.FormattedValue'];
                   if(Logg[0]['cr6fc_fpoavailedgoischeme@OData.Community.Display.V1.FormattedValue'] == "Yes"){
                      $("#creditfacility").show();
                      $("#crodetails").hide();
                   }
                   else{$("#creditfacility").hide();
                      $("#crodetails").hide();
                   }
                   //document.getElementById("CGPAN").value=Logg[0].CGPAN;
				   $("#CGPAN").val(Logg[0].cr6fc_cgpan);
                   $("#TotalSanctionedAmount").val(Logg[0].cr6fc_totalsanctionedamount);
                   document.getElementById("TypeOfCreditFacility").value=Logg[0]['cr6fc_typeofcreditfacility@OData.Community.Display.V1.FormattedValue'];
                   //document.getElementById("TypeOfCreditFacility").value=Logg[0].TypeOfCreditFacility;
                   if(Logg[0].cr6fc_validitycreditguarantee!==undefined && Logg[0].cr6fc_validitycreditguarantee!==null && Logg[0].cr6fc_validitycreditguarantee!=='')
                   {

                   //document.getElementById("ValidityCreditGuarantee").value=Logg[0].ValidityCreditGuarantee.substring(0,Logg[0].ValidityCreditGuarantee.indexOf("T"));;
                   //document.getElementById("ValidityCreditGuarantee").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_validitycreditguarantee));
					const date = new Date(Logg[0].cr6fc_validitycreditguarantee);
					const formattedDate = date.toISOString().slice(0, 10);
					document.getElementById("ValidityCreditGuarantee").value = formattedDate;
                   }
                   document.getElementById("NameOfCEO").value=Logg[0].cr6fc_nameofceo;
                   $("#NameOfCEO").text(Logg[0].cr6fc_nameofceo);
                   document.getElementById("ContactCEO").value=Logg[0].cr6fc_contactceo;
                   document.getElementById("MobileCEO").value=Logg[0].cr6fc_mobileceo;
                   document.getElementById("EmailIDCEO").value=Logg[0].cr6fc_emailidceo;
                   document.getElementById("CustomerID").value=Logg[0].cr6fc_customerid;
                   $("#LendingAssesmentTool").text(Logg[0]['cr6fc_lendingassesmenttool@OData.Community.Display.V1.FormattedValue']);
                   $("#TypeofFacility").val(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue']);
                  
                   $("#PurposeOftheCreditFacility").text(Logg[0]['cr6fc_purposeofthecreditfacility@OData.Community.Display.V1.FormattedValue']);
                   $("#CreditFacilityUtilised").val(Logg[0].cr6fc_creditfacilityutilised);
                   if((Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue']) == "Term Loan OR WCTL (Working Capital Term Loan)" || (Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue']) == "Term Loan OR Working Capital Term Loan(WCTL)"){
					$("#termloandet").show();
					$("#LoanorWTCL").show();
					$("#wcclimitdetail").hide();
					$("#WCCCLimit").hide();

                   	document.getElementById("AccountNo").value=Logg[0].cr6fc_accountno;
                   	document.getElementById("hdnAccountNo").value=Logg[0].cr6fc_accountno;
                   	
                   document.getElementById("SanctionedAmount").value=Logg[0].cr6fc_sanctionedamount;
                   var Word=convertNumberToWords(Math.ceil(Logg[0].cr6fc_sanctionedamount));
                   console.log(Word);
                   $('#SanctionedAmountinwords').text("Rupees " + " " + Word + " " + "Only" );                   
                   
                   document.getElementById("hdnSanctionAmt").value=Logg[0].cr6fc_sanctionedamount;                
				if(Logg[0].cr6fc_dateofsanction!==undefined && Logg[0].cr6fc_dateofsanction!==null && Logg[0].cr6fc_dateofsanction!=='')
				{                
				//document.getElementById("DateOfSanction").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_dateofsanction));
				const date1 = new Date(Logg[0].cr6fc_dateofsanction);
				const formattedDate1 = date1.toISOString().slice(0, 10);
				document.getElementById("DateOfSanction").value = formattedDate1;
				}                
				if(Logg[0].cr6fc_enddateofinterestmoratium!==undefined && Logg[0].cr6fc_enddateofinterestmoratium!==null && Logg[0].cr6fc_enddateofinterestmoratium!=='')
				{                
				//document.getElementById("EndDateOfInterestMoratium").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_enddateofinterestmoratium));
				const date3 = new Date(Logg[0].cr6fc_enddateofinterestmoratium);
				const formattedDate3 = date3.toISOString().slice(0, 10);
				document.getElementById("EndDateOfInterestMoratium").value = formattedDate3;
				}                
				if(Logg[0].cr6fc_enddateofprinciplemoratium!==undefined && Logg[0].cr6fc_enddateofprinciplemoratium!==null && Logg[0].cr6fc_enddateofprinciplemoratium!=='')
				{				
				//document.getElementById("EndDateOfPrincipleMoratium").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_enddateofprinciplemoratium));
				const date4 = new Date(Logg[0].cr6fc_enddateofprinciplemoratium);
				const formattedDate4 = date4.toISOString().slice(0, 10);
				document.getElementById("EndDateOfPrincipleMoratium").value = formattedDate4;
				}				
				if(Logg[0].cr6fc_duedateoflastinstallment!==undefined && Logg[0].cr6fc_duedateoflastinstallment!==null && Logg[0].cr6fc_duedateoflastinstallment!=='')
				{				
				//document.getElementById("DueDateOfLastInstallment").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_duedateoflastinstallment));
				const date5 = new Date(Logg[0].cr6fc_duedateoflastinstallment);
				const formattedDate5 = date5.toISOString().slice(0, 10);
				document.getElementById("DueDateOfLastInstallment").value = formattedDate5;
				}
				document.getElementById("InterestRate").value=Logg[0].cr6fc_interestrate;
				$("#CreditFacilityFundAgriInfra").val(Logg[0]['cr6fc_creditfacilityfundagriinfra@OData.Community.Display.V1.FormattedValue']);
				// document.getElementById("CreditFacilityFundAgriInfra").value=Logg[0].CreditFacilityFundAgriInfra;
				$("#LoanFullyDisbured").val(Logg[0]['cr6fc_loanfullydisbured@OData.Community.Display.V1.FormattedValue']);
				//document.getElementById("LoanFullyDisbured").value=Logg[0].LoanFullyDisbured;
				document.getElementById("OutstandingAmountOnDate").value=Logg[0].cr6fc_outstandingamountondate;
				document.getElementById("MeansOfFinanaceTermLoan").value=Logg[0].cr6fc_meansoffinanacetermloan;
				document.getElementById("PromoterEquityMargin").value=Logg[0].cr6fc_promoterequitymargin;
				document.getElementById("UNsecuredLoan").value=Logg[0].cr6fc_unsecuredloan;
				document.getElementById("AnyOtherSource").value=Logg[0].cr6fc_anyothersources;
				$('#totalAmountvalue').text(Logg[0].cr6fc_totalamount);

				}
				else if(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'] == "WC/CC Limit"){
				$("#wcclimitdetail").show();
				$("#WCCCLimit").show();
				$("#termloandet").hide();
				$("#LoanorWTCL").hide();
				document.getElementById("hdnSanctionAmt").value=Logg[0].cr6fc_sanctionedamount;

				document.getElementById("AccountNoLimitDetail").value=Logg[0].cr6fc_accountno;
				document.getElementById("hdnAccountNo").value=Logg[0].cr6fc_accountno;

				document.getElementById("SanctionedAmountWCDetail").value=Logg[0].cr6fc_sanctionedamount;
				var Words=convertNumberToWords(Math.ceil(Logg[0].cr6fc_sanctionedamount));
				$('#SanctionedAmountWCDetailinword').text("Rupees " + " " + Words + " " + "Only" );   
				if(Logg[0].cr6fc_dateofsanction!==undefined && Logg[0].cr6fc_dateofsanction!==null && Logg[0].cr6fc_dateofsanction!=='')
				{
					const date6 = new Date(Logg[0].cr6fc_dateofsanction);
					const formattedDate6= date6.toISOString().slice(0, 10);
					document.getElementById("SanctionedDate").value = formattedDate6;
				//document.getElementById("SanctionedDate").value=Logg[0].Logg[0].cr6fc_dateofsanction.substring(0,Logg[0].cr6fc_dateofsanction.indexOf("T"));;
				//document.getElementById("SanctionedDate").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_dateofsanction));
				}
				document.getElementById("DrawingPower").value=Logg[0].cr6fc_drawingpower;
				//document.getElementById("EndDateOfMoratium").value=Logg[0].EndDateOfMoratium;
				if(Logg[0].cr6fc_enddateofmoratium!==undefined && Logg[0].cr6fc_enddateofmoratium!==null && Logg[0].cr6fc_enddateofmoratium!=='')
				{
					const date7 = new Date(Logg[0].cr6fc_enddateofmoratium);
					const formattedDate7= date7.toISOString().slice(0, 10);
					document.getElementById("EndDateOfMoratium").value = formattedDate7;
				//document.getElementById("EndDateOfMoratium").value=Logg[0].cr6fc_enddateofmoratium.substring(0,Logg[0].cr6fc_enddateofmoratium.indexOf("T"));;
				//document.getElementById("EndDateOfMoratium").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_enddateofmoratium));
				}
				if(Logg[0].cr6fc_validityenddate!==undefined && Logg[0].cr6fc_validityenddate!==null && Logg[0].cr6fc_validityenddate!=='')
                   {
					const date8 = new Date(Logg[0].cr6fc_validityenddate);
					const formattedDate8= date8.toISOString().slice(0, 10);
					document.getElementById("ValidityEndDate").value = formattedDate8;
                   //document.getElementById("ValidityEndDate").value=Logg[0].cr6fc_validityenddate.substring(0,Logg[0].cr6fc_validityenddate.indexOf("T"));;
                  // document.getElementById("ValidityEndDate").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_validityenddate));
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
                   
                   ChecklistData(Logg);
                   $("#TermLoanCreditFacility").val(Logg[0].cr6fc_termloancreditfacility);
                   //document.getElementById("TermLoanCreditFacility").value=Logg[0].TermLoanCreditFacility;
                   document.getElementById("ProjectCostInput").value=Logg[0].cr6fc_projectcostinput;
                   document.getElementById("ProjectCostMarketing").value=Logg[0].cr6fc_projectcostmarketing;
                   document.getElementById("ProjectCostProcessing").value=Logg[0].cr6fc_projectcostprocessing;
                   document.getElementById("ProjectCostOther").value=Logg[0].cr6fc_projectcostother;
                   document.getElementById("ProjectCostTotal").value=Logg[0].cr6fc_projectcosttotal;
                   //document.getElementById("DetailsOfInput").value=Logg[0].DetailsOfInput;
                   $("#PurposeOfCreditFacility").val(Logg[0].cr6fc_purposeofcreditfacility);
                   //document.getElementById("PurposeOfCreditFacility").value=Logg[0].PurposeOfCreditFacility;
                  /* document.getElementById("DetailsOfMarketing").value=Logg[0].DetailsOfMarketing;
                   document.getElementById("DetailsOfProcessing").value=Logg[0].DetailsOfProcessing;
                   document.getElementById("DetailsOfOther").value=Logg[0].DetailsOfOther;
                   document.getElementById("TotalWorkingCapital").value=Logg[0].TotalWorkingCapital;
                   document.getElementById("MeansOfFinanaceWCLimit").value=Logg[0].MeansOfFinanaceWCLimit;
                   document.getElementById("PromotersEquity").value=Logg[0].PromotersEquity;
                   document.getElementById("UnsecuredLoans").value=Logg[0].UnsecuredLoans;
                   document.getElementById("AnyOtherSources").value=Logg[0].AnyOtherSources;*/
                  // document.getElementById("TypeOfSecurity").value=Logg[0].TypeOfSecurity;
                                      $("#TypeOfSecurity").text(Logg[0].cr6fc_typeofsecurity);
                   $("#NatureOfSecurity").val(Logg[0]['cr6fc_natureofsecurity@OData.Community.Display.V1.FormattedValue']);
                   //document.getElementById("NatureOfSecurity").value=Logg[0].NatureOfSecurity;
                   document.getElementById("ValueOfSecurity").value=Logg[0].cr6fc_valueofsecurity;
                   //document.getElementById("NameOfAuthorisedSignatory").value=Logg[0].NameOfAuthorisedSignatory;
                  // document.getElementById("ELIDesignation").value=Logg[0].ELIDesignation;
                   document.getElementById("NameOfLendingInstitution").value=Logg[0].cr6fc_nameoflendinginstitution;
                  // document.getElementById("ELIDate").value=Logg[0].ELIDate;
                 /* if(Logg[0].ELIDate!==undefined && Logg[0].ELIDate!==null && Logg[0].ELIDate!=='')
                   {

                   document.getElementById("ELIDate").value=Logg[0].ELIDate.substring(0,Logg[0].ELIDate.indexOf("T"));;
                   }*/
                   //$("#CGIssued").val(Logg[0].cr6fc_cgissued);
                   //document.getElementById("CGIssued").value=Logg[0].CGIssued;
                  
                   //document.getElementById("ExistingCF").value=Logg[0].ExistingCF;
                   $("#CollateralSecurity").val([Logg[0]['cr6fc_collateralsecurity@OData.Community.Display.V1.FormattedValue']]);
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

function ChecklistData(Logg)
{			
	
            var vHTML='';
            var FPOMemberCount;
            var divCreditLimit='';
            var divExcCurrCreditLimit='';
            var divFPORegion='';
            var divCGAppliStipu='';
            
            var filterRegion = $.grep(RegionMasterColl, function (value) 
		    {
		        return (value.cr6fc_regionmasterid == Logg[0].cr6fc_RegionOfFPO.cr6fc_regionmasterid);
		    });

				var vHTMLHeaderTBL ="<table class='blueTable checklist table-bordered' style='width: 99.9%;' cellspacing='0'><tr style='background-color:#808080; height:35px !important;'>" +
									"<td class='form-group'><font color='white' style='font-size:18px !important;'><b>Compliance Required</b></font></td>" +
									"<td style='text-align:center'class='form-group'><font color='white'  style='font-size:18px !important;'><b>Complied</b></font></td>" +
									"<td><font color='white' class='form-group'  style='font-size:18px !important;'><b>Value</b></font></td>" +
									"</tr>";
		vHTML += "<tr>"
		vHTML += "<td class='form-group'><font color='Black' style='font-size:15px !important'><b>1.&nbspShare-holder Members No. as per CGS-FPO</b></font></td>"
		
		if(Logg[0].cr6fc_RegionOfFPO.cr6fc_name=="FPO in Plains")
		{
				if(parseInt(Logg[0].cr6fc_farmermembersize) >= parseInt(filterRegion[0].cr6fc_minmembers))
				{
					//FPOMemberCount=
					vHTML += "<td style='text-align:center'><img style='width:25px' src='/correct.png'></td>"

				}
				else
				{
					vHTML += "<td style='text-align:center'><img style='width:25px' src='/remove1.png'></td>"
				}

			divFPORegion+="<div class='form-group'><p  style='font-size:15px !important;'>Region of the FPO :- "+Logg[0].cr6fc_RegionOfFPO.cr6fc_name+"</p><p  style='font-size:15px !important;'>Total No of Member :- "+Logg[0]['cr6fc_totalfpomember@OData.Community.Display.V1.FormattedValue']+"</p><p  style='font-size:15px !important;'>Total Farmer Member Size :- "+Logg[0].cr6fc_farmermembersize+"</p></div>"


		}
		else if(Logg[0].cr6fc_RegionOfFPO.cr6fc_name=="FPO in North Eastern or Hilly Areas")
		{
				if(parseInt(Logg[0].cr6fc_farmermembersize) >= parseInt(filterRegion[0].cr6fc_minmembers))
				{
					//FPOMemberCount=
					vHTML += "<td style='text-align:center'><img style='width:25px' src='/correct.png'></td>"

				}
				else
				{
					vHTML += "<td style='text-align:center'><img style='width:25px' src=/remove1.png'></td>"
				}

			divFPORegion+="<div class='form-group'><p style='font-size:15px !important;'>Region of the FPO :- "+Logg[0].cr6fc_RegionOfFPO.cr6fc_name+"</p><p  style='font-size:15px !important;'>Total No of Member :- "+Logg[0]['cr6fc_totalmembernorthen@OData.Community.Display.V1.FormattedValue']+"</p><p style='font-size:15px !important;'>Total Farmer Member Size :- "+Logg[0].cr6fc_farmermembersize+"</p></div>"


		}
		if(divFPORegion!='')
		{
			vHTML += "<td><font color='Black' style='font-size:15px !important;'>"+divFPORegion+"</font></td>"
		}
		else
		{
			vHTML += "<td></td>";
		}
		vHTML += "</tr><tr style='height: 44px !important;'>"
		//vHTML += "<tr>"
		vHTML += "<td class='form-group'><font color='Black' style='font-size:15px !important'><b>2.&nbspFPO is connected with Agri- Business activities</b></font></td>";
		if(Logg[0]['cr6fc_fpoagribusinessactivity@OData.Community.Display.V1.FormattedValue']=="Yes")
		{
			vHTML += "<td style='text-align:center'><img style='width:25px' src='/correct.png'></td>";
		}
		else
		{
			vHTML += "<td style='text-align:center'><img style='width:25px' src='/remove1.png'></td>";
		}
		vHTML += "<td class='form-group'><font color='Black' style='font-size:15px !important'>"+Logg[0]['cr6fc_fpoagribusinessactivity@OData.Community.Display.V1.FormattedValue']+"</font></td>"
		vHTML += "</tr><tr>"
		vHTML += "<td class='form-group'><font color='Black' style='font-size:15px !important'><b>3.&nbspCG Application applied within the stipulated time period </b></font></td>"
		vHTML += "<td></td>";
		
		var SubmissionDate;
		if(Logg[0]['cr6fc_submissiondate@OData.Community.Display.V1.FormattedValue']!=undefined || Logg[0]['cr6fc_submissiondate@OData.Community.Display.V1.FormattedValue']!=null || Logg[0].Logg[0]['cr6fc_submissiondate@OData.Community.Display.V1.FormattedValue']!='')
		{
		
		SubmissionDate=GetCreatedDateTime(Logg[0]['cr6fc_submissiondate@OData.Community.Display.V1.FormattedValue']);
		}
		else
		{
		SubmissionDate='';
		}
		divCGAppliStipu="<div><p style='font-size:15px !important;'>Sanction Date:- "+GetCreatedDateTime(Logg[0]['cr6fc_dateofsanction@OData.Community.Display.V1.FormattedValue'])+"</p><p style='font-size:15px !important;'>Submission Date :- "+SubmissionDate+"</p></div>"
		//divCGAppliStipu="<div><p>Sanction Date:- "+Logg[0].DateOfSanction.substring(0,Logg[0].DateOfSanction.indexOf("T"))+"</p><p>Submission Date :- "+Logg[0].DateOfRegistration.substring(0,Logg[0].DateOfRegistration.indexOf("T"))+"</p></div>"

		vHTML += "<td class='form-group' style='font-size:15px !important;'><font color='Black'><b>"+divCGAppliStipu+"</b></font></td>"
		vHTML += "</tr><tr>"
		vHTML += "<td class='form-group'><font color='Black' style='font-size:15px !important'><b>4.&nbspLive Credit facility(ies) to FPO covered under CGS-FPO not exceeding Rs.2 crore(including current request amount)</b></font></td>"
		if(parseInt(ToatalSanctionAmt) < 20000000)
		{
			vHTML += "<td style='text-align:center'><img style='width:25px' src='/correct.png'></td>"
		}
		else
		{
			vHTML += "<td style='text-align:center'><img style='width:25px' src='/remove1.png'></td>"
		}
		
		if(CGApplPANColl.length>0)
		{
			for(var i=0;i<CGApplPANColl.length; i++)
			{
			
			if(CGApplPANColl[i].cr6fc_status=="15")
			{
			var filterTaxData = $.grep(TaxMasterColl, function (value) 
				    {
				        return (value.cr6fc_cgid == CGApplPANColl[i].cr6fc_cgaplicationid);
				    });
				if(filterTaxData.length>0)
				{
					divCreditLimit+="<div class='form-group'><p style='font-size:15px !important;'>Guarantee Issused</p><p style='font-size:15px !important;'>reference No :- "+filterTaxData[0].cr6fc_cgpan+"</p><p style='font-size:15px !important;'>Amount :- "+CGApplPANColl[i].cr6fc_sanctionedamount+"</p></div>"
				}
				else
				{
					divCreditLimit+="";
				}

			}
			else
			{
				var filterSOEData = $.grep(SOEMasterColl, function (value) 
				    {
				        return (value.cr6fc_wfid == CGApplPANColl[i].cr6fc_cgaplicationid);
				    });
				    
			    if(filterSOEData.length>0)
			    {
					divCreditLimit+="<div class='form-group'><p style='font-size:15px !important;'>SOE Issused</p><p style='font-size:15px !important;'>reference No :- "+filterSOEData[0].cr6fc_name+"</p><p style='font-size:15px !important;'>Amount :- "+CGApplPANColl[i].cr6fc_sanctionedamount+"</p></div>";
				}
				else
				{
					divCreditLimit+="";
				}

			}
			

			}
			if(Logg[0].cr6fc_sanctionedamount!='' && Logg[0].cr6fc_sanctionedamount!=null)
			{
				divCreditLimit+="<div class='form-group'><p style='font-size:15px !important;'>Current Applications</p><p style='font-size:15px !important;'>Amount :- "+Logg[0].cr6fc_sanctionedamount+"</p></div>";
			}
		}
		else
		{
			divCreditLimit+="<div class='form-group'><p style='font-size:15px !important;'>No Previous Applications</p><p style='font-size:14px !important;'>Amount :- "+ToatalSanctionAmt+"</p></div>";
		}

		vHTML += "<td><font color='Black'><b>"+divCreditLimit+"</b></font></td>"
		vHTML += "</tr><tr style='height: 44px !important;'>"
		vHTML += "<td class='form-group'><font color='Black' style='font-size:15px !important'><b>5.&nbspLive Credit facility(ies) to FPO covered under CGS-FPO not exceeding Rs.2 crore(excluding current request amount)</b></font></td>"
		if(parseInt(ExcludingCurrSanctionAmt) > 20000000)
		{
			vHTML += "<td style='text-align:center'><img style='width:25px' src='/remove1.png'></td>"
		}
		else
		{
			vHTML += "<td style='text-align:center'><img style='width:25px' src='/correct.png'></td>"
		}
		
		if(CGApplPANColl.length>0)
		{
			for(var i=0;i<CGApplPANColl.length; i++)
			{
			
			if(CGApplPANColl[i].cr6fc_status=="15")
			{
			var filterTaxData = $.grep(TaxMasterColl, function (value) 
				    {
				        return (value.cr6fc_cgid == CGApplPANColl[i].cr6fc_cgaplicationid);
				    });
				if(filterTaxData.length>0)
				{
					divExcCurrCreditLimit+="<div class='form-group'><p  style='font-size:15x !important;'>Guarantee Issused</p><p  style='font-size:15px !important;'>reference No :- " +filterTaxData[0].cr6fc_cgpan+"</p><p  style='font-size:15px !important;'>Amount :- "+CGApplPANColl[i].cr6fc_sanctionedamount+"</p></div>"
				}
				else
				{
					divExcCurrCreditLimit+="";
				}

			}
			else
			{
				var filterSOEData = $.grep(SOEMasterColl, function (value) 
				    {
				        return (value.cr6fc_wfid == CGApplPANColl[i].cr6fc_cgaplicationid);
				    });
				    
			    if(filterSOEData.length>0)
			    {
					divExcCurrCreditLimit+="<div class='form-group'><p  style='font-size:15px !important;'>SOE Issused</p><p  style='font-size:15px !important;'>reference No :- "+filterSOEData[0].cr6fc_name+"</p><p  style='font-size:15px !important;'>Amount :- "+CGApplPANColl[i].cr6fc_sanctionedamount+"</p></div>";
				}
				else
				{
					divExcCurrCreditLimit+="";
				}

			}
			

			}
		}
		else
		{
			divExcCurrCreditLimit+="";
		}

		vHTML += "<td class='form-group'><font color='Black'>"+divExcCurrCreditLimit+"</font></td>"
		vHTML += "</tr><tr style='height: 44px !important;'>";
		vHTML += "<td class='form-group'><font color='Black' style='font-size:15px !important'><b>6.&nbsp Nature of Security </b></font></td>"
		if(Logg[0]['cr6fc_natureofsecurity@OData.Community.Display.V1.FormattedValue']=="Primary")
		{
			vHTML += "<td style='text-align:center'><img style='width:25px' src='/correct.png'></td>"
		}
		else
		{
			vHTML += "<td style='text-align:center'><img style='width:25px' src='/remove1.png'></td>"
		}
		vHTML += "<td class='form-group'><font color='Black' style='font-size:15px !important'>"+Logg[0]['cr6fc_natureofsecurity@OData.Community.Display.V1.FormattedValue']+"</font></td>"
		vHTML += "</tr><tr style='height: 44px !important;'>"
		vHTML += "<td class='form-group'><font color='Black' style='font-size:15px !important'><b>7.&nbspCredit Facility has been sanctioned without any collateral security and/or third guarantee </b></font></td>"
		if(Logg[0]['cr6fc_collateralsecurity@OData.Community.Display.V1.FormattedValue']=="Yes")
		{
			vHTML += "<td style='text-align:center'><img style='width:25px' src='/correct.png'></td>"
		}
		else
		{
			vHTML += "<td style='text-align:center'><img style='width:25px' src='/remove1.png'></td>"
		}
		vHTML += "<td class='form-group'><font color='Black' style='font-size:15px !important'>"+Logg[0]['cr6fc_collateralsecurity@OData.Community.Display.V1.FormattedValue']+"</font></td>"
		vHTML += "</tr>"


		 document.getElementById("dvCGApplicationData").innerHTML = vHTMLHeaderTBL + vHTML;

      
                
}                    

function ChecklistData1(Logg)
{			
	
            var vHTML='';
            var FPOMemberCount;
            var divCreditLimit='';
            var divExcCurrCreditLimit='';
            var divFPORegion='';
            var divCGAppliStipu='';
            
            var filterRegion = $.grep(RegionMasterColl, function (value) 
		    {
		        return (value.Id == Logg[0].RegionOfFPOId);
		    });

			var vHTMLHeaderTBL ="<table class='blueTable' style='width: 99.9%; border: 1px solid;' cellspacing='0'><tr style='background-color:#808080'>" +
								"<td><font color='white'><b>Compliance Required</b></font></td>" +
								"<td style='text-align:center'><font color='white'><b>Complied</b></font></td>" +
								"<td><font color='white'><b>Value</b></font></td>" +
								"</tr>";
		vHTML += "<tr>"
		vHTML += "<td><font color='Black'><b>1.&nbspShare-holder Members No. as per CGS-FPO</b></font></td>"
		
		if(Logg[0].RegionOfFPO.Region=="FPO in Plains")
		{
			if(Logg[0].TotalFPOMember=="Less than 300")
			{
				if(parseInt(Logg[0].FarmerMemberSize) > parseInt(filterRegion[0].MaxMembers))
				{
					//FPOMemberCount=
					vHTML += "<td style='text-align:center'><img style='width:25px' src='/sites/FPOCGPortalUAT/SiteAssets/remove.png'></td>"

				}
				else
				{
					vHTML += "<td style='text-align:center'><img style='width:25px' src='/sites/FPOCGPortalUAT/SiteAssets/correct.png'></td>"
				}
			}
			else if(Logg[0].TotalFPOMember=="More than 300")
			{
				if(parseInt(Logg[0].FarmerMemberSize) >= parseInt(filterRegion[0].MinMembers))
				{
					//FPOMemberCount=
					vHTML += "<td style='text-align:center'><img style='width:25px' src='/sites/FPOCGPortalUAT/SiteAssets/correct.png'></td>"

				}
				else
				{
					vHTML += "<td style='text-align:center'><img style='width:25px' src='/sites/FPOCGPortalUAT/SiteAssets/remove.png'></td>"
				}

			}
			else
			{
				vHTML += "<td></td>"
			}
			divFPORegion+="<div><p>Region of the FPO :- "+Logg[0].RegionOfFPO.Region+"</p><p>Total No of Member :- "+Logg[0].TotalFPOMember+"</p><p>Total Farmer Member Size :- "+Logg[0].FarmerMemberSize+"</p></div>"


		}
		else if(Logg[0].RegionOfFPO.Region=="FPO in North Eastern or Hilly Areas")
		{
			if(Logg[0].TotalMemberNorthen=="Less than 100")
			{
				if(parseInt(Logg[0].FarmerMemberSize) > parseInt(filterRegion[0].MaxMembers))
				{
					//FPOMemberCount=
					vHTML += "<td style='text-align:center'><img style='width:25px' src='/sites/FPOCGPortalUAT/SiteAssets/remove.png'></td>"

				}
				else
				{
					vHTML += "<td style='text-align:center'><img style='width:25px' src='/sites/FPOCGPortalUAT/SiteAssets/correct.png'></td>"
				}
			}
			else if(Logg[0].TotalMemberNorthen=="More than 100")
			{
				if(parseInt(Logg[0].FarmerMemberSize) > parseInt(filterRegion[0].MinMembers))
				{
					//FPOMemberCount=
					vHTML += "<td style='text-align:center'><img style='width:25px' src='/sites/FPOCGPortalUAT/SiteAssets/correct.png'></td>"

				}
				else
				{
					vHTML += "<td style='text-align:center'><img style='width:25px' src='/sites/FPOCGPortalUAT/SiteAssets/remove.png'></td>"
				}

			}
			else
			{
				vHTML += "<td></td>"
			}
			divFPORegion+="<div><p>Region of the FPO :- "+Logg[0].RegionOfFPO.Region+"</p><p>Total No of Member :- "+Logg[0].TotalMemberNorthen+"</p><p>Total Farmer Member Size :- "+Logg[0].FarmerMemberSize+"</p></div>"


		}
		if(divFPORegion!='')
		{
			vHTML += "<td><font color='Black'><b>"+divFPORegion+"</b></font></td>"
		}
		else
		{
			vHTML += "<td></td>";
		}
		vHTML += "</tr><tr>"
		//vHTML += "<tr>"
		vHTML += "<td><font color='Black'><b>2.&nbspFPO is connected with Agri- Business activities</b></font></td>";
		if(Logg[0].FPOAgriBusinessActivity=="Yes")
		{
			vHTML += "<td style='text-align:center'><img style='width:25px' src='/sites/FPOCGPortal/SiteAssets/correct.png'></td>";
		}
		else
		{
			vHTML += "<td style='text-align:center'><img style='width:25px' src='/sites/FPOCGPortal/SiteAssets/remove.png'></td>";
		}
		vHTML += "<td><font color='Black'><b>"+Logg[0].FPOAgriBusinessActivity+"</b></font></td>"
		vHTML += "</tr><tr>"
		vHTML += "<td><font color='Black'><b>3.&nbspCG Application applied within the stipulated time period </b></font></td>"
		vHTML += "<td></td>";
		
		var SubmissionDate;
		if(Logg[0].SubmissionDate!=undefined || Logg[0].SubmissionDate!=null || Logg[0].SubmissionDate!='')
		{
		
		SubmissionDate=GetCreatedDateTime(String.format("{0:yyyy-MM-dd}",new Date(Logg[0].SubmissionDate)));
		}
		else
		{
		SubmissionDate='';
		}
		divCGAppliStipu="<div><p>Sanction Date:- "+GetCreatedDateTime(String.format("{0:yyyy-MM-dd}",new Date(Logg[0].DateOfSanction)))+"</p><p>Submission Date :- "+SubmissionDate+"</p></div>"
		//divCGAppliStipu="<div><p>Sanction Date:- "+Logg[0].DateOfSanction.substring(0,Logg[0].DateOfSanction.indexOf("T"))+"</p><p>Submission Date :- "+Logg[0].DateOfRegistration.substring(0,Logg[0].DateOfRegistration.indexOf("T"))+"</p></div>"

		vHTML += "<td><font color='Black'><b>"+divCGAppliStipu+"</b></font></td>"
		vHTML += "</tr><tr>"
		vHTML += "<td><font color='Black'><b>4.&nbspLive Credit facility(ies) to FPO covered under CGS-FPO not exceeding Rs.2 crore(including current request amount)</b></font></td>"
		if(parseInt(ToatalSanctionAmt) > 20000000)
		{
			vHTML += "<td style='text-align:center'><img style='width:25px' src='/sites/FPOCGPortal/SiteAssets/remove.png'></td>"
		}
		else
		{
			vHTML += "<td style='text-align:center'><img style='width:25px' src='/sites/FPOCGPortal/SiteAssets/correct.png'></td>"
		}
		
		if(CGApplPANColl.length>0)
		{
			for(var i=0;i<CGApplPANColl.length; i++)
			{
			
			if(CGApplPANColl[i].Status=="15")
			{
			var filterTaxData = $.grep(TaxMasterColl, function (value) 
				    {
				        return (value.cr6fc_cgid == CGApplPANColl[i].Id);
				    });
				if(filterTaxData.length>0)
				{
					divCreditLimit+="<div><p>Guarantee Issused</p><p>reference No :- "+filterTaxData[0].CGPAN+"</p><p>Amount :- "+CGApplPANColl[i].cr6fc_sanctionedamount+"</p></div>"
				}
				else
				{
					divCreditLimit+="";
				}

			}
			else
			{
				var filterSOEData = $.grep(SOEMasterColl, function (value) 
				    {
				        return (value.WFID == CGApplPANColl[i].Id);
				    });
				    
			    if(filterSOEData.length>0)
			    {
					divCreditLimit+="<div><p>SOE Issused</p><p>reference No :- "+filterSOEData[0].Title+"</p><p>Amount :- "+CGApplPANColl[i].cr6fc_sanctionedamount+"</p></div>";
				}
				else
				{
					divCreditLimit+="";
				}

			}
			

			}
			if(Logg[0].cr6fc_sanctionedamount!='' && Logg[0].cr6fc_sanctionedamount!=null)
			{
				divCreditLimit+="<div><p>Current Applications</p><p>Amount :- "+Logg[0].cr6fc_sanctionedamount+"</p></div>";
			}
		}
		else
		{
			divCreditLimit+="<div><p>No Previous Applications</p><p>Amount :- "+ToatalSanctionAmt+"</p></div>";
		}

		vHTML += "<td><font color='Black'><b>"+divCreditLimit+"</b></font></td>"
		vHTML += "</tr><tr>"
		vHTML += "<td><font color='Black'><b>5.&nbspLive Credit facility(ies) to FPO covered under CGS-FPO not exceeding Rs.2 crore(excluding current request amount)</b></font></td>"
		if(parseInt(ExcludingCurrSanctionAmt) > 20000000)
		{
			vHTML += "<td style='text-align:center'><img style='width:25px' src='/sites/FPOCGPortal/SiteAssets/remove.png'></td>"
		}
		else
		{
			vHTML += "<td style='text-align:center'><img style='width:25px' src='/sites/FPOCGPortal/SiteAssets/correct.png'></td>"
		}
		
		if(CGApplPANColl.length>0)
		{
			for(var i=0;i<CGApplPANColl.length; i++)
			{
			
			if(CGApplPANColl[i].Status=="15")
			{
			var filterTaxData = $.grep(TaxMasterColl, function (value) 
				    {
				        return (value.CGID == CGApplPANColl[i].Id);
				    });
					if(filterTaxData.length>0)
					{
						divExcCurrCreditLimit+="<div><p>Guarantee Issused</p><p>reference No :- "+filterTaxData[0].CGPAN+"</p><p>Amount :- "+CGApplPANColl[i].cr6fc_sanctionedamount+"</p></div>"
					}
					else
					{
						divExcCurrCreditLimit+="";
					}

			}
			else
			{
				var filterSOEData = $.grep(SOEMasterColl, function (value) 
				    {
				        return (value.WFID == CGApplPANColl[i].Id);
				    });
				    
			    if(filterSOEData.length>0)
			    {
					divExcCurrCreditLimit+="<div><p>SOE Issused</p><p>reference No :- "+filterSOEData[0].Title+"</p><p>Amount :- "+CGApplPANColl[i].cr6fc_sanctionedamount+"</p></div>";
				}
				else
				{
					divExcCurrCreditLimit+="";
				}

			}			
			}
		}
		else
		{
			divExcCurrCreditLimit+="";
		}

		vHTML += "<td><font color='Black'><b>"+divExcCurrCreditLimit+"</b></font></td>"
		vHTML += "</tr><tr>";
		vHTML += "<td><font color='Black'><b>6.&nbsp Nature of Security </b></font></td>"
		if(Logg[0]['cr6fc_natureofsecurity@OData.Community.Display.V1.FormattedValue']=="Primary")
		{
			vHTML += "<td style='text-align:center'><img style='width:25px' src='/sites/FPOCGPortal/SiteAssets/correct.png'></td>"
		}
		else
		{
			vHTML += "<td style='text-align:center'><img style='width:25px' src='/sites/FPOCGPortal/SiteAssets/remove.png'></td>"
		}
		vHTML += "<td><font color='Black'><b>"+Logg[0].NatureOfSecurity+"</b></font></td>"
		vHTML += "</tr><tr>"
		vHTML += "<td><font color='Black'><b>7.&nbspCredit Facility has been sanctioned without any collateral security and/or third guarantee </b></font></td>"
		if(Logg[0].CollateralSecurity=="Yes")
		{
			vHTML += "<td style='text-align:center'><img style='width:25px' src='/sites/FPOCGPortal/SiteAssets/correct.png'></td>"
		}
		else
		{
			vHTML += "<td style='text-align:center'><img style='width:25px' src='/sites/FPOCGPortal/SiteAssets/remove.png'></td>"
		}
		vHTML += "<td><font color='Black'><b>"+Logg[0].CollateralSecurity+"</b></font></td>"
		vHTML += "</tr>"


		 document.getElementById("dvCGApplicationData").innerHTML = vHTMLHeaderTBL + vHTML;

      
                
                    
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
	//var Newtoday = dd + '/' + mm + '/' + yyyy+" "+strTime;
	var Newtoday = dd + '/' + mm + '/' + yyyy;
	return Newtoday ;
  }  

function ShowPopUp()
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

function Proceed()
{
	var Data;
	
			Data = JSON.stringify(
		    {
		        '__metadata': {
		            'type': 'SP.Data.CGApplicationsListItem'
		        },
				 "NSCheckerCertificateView":"Yes"				 
		    });

	$.ajax({
	
	    url: _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/getByTitle('CGApplications')/getItemByStringId('" +vItemID+ "')",
	    type: "POST",
	    contentType: "application/json;odata=verbose",
	    async: false,
	    data: Data,
	    headers: {
	        "accept": "application/json;odata=verbose",
	        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
	        "IF-MATCH": "*",
	        "X-Http-Method": "PATCH"
	    },
	    success: function (data) 
	    {
	       	 
				alert('Item Updated Succesfully');
				$("#inputDialog2").dialog("close");	
				//window.location.href="https://nabardmumbai.sharepoint.com/sites/FPOCGPortal/SitePages/ELICheckerDashBoardCGApp.aspx";	
	    },
	    error: function (e) 
	    {
	    	console.log(e);
	    }
	});

}
function ClosePopup()
{
	$("#inputDialog2").dialog("close");	
}
function Close1()
{
	window.location.href=location.origin+"/NSCheckerDashboard/";	

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

function FunAction(status) 
{   
 
 
    var hdnTotalSanctionAmt=$('#hdnTotalSanctionAmt').val();
	var SanctionAmt=document.getElementById("hdnSanctionAmt").value;
	if(hdnTotalSanctionAmt=="" || hdnTotalSanctionAmt==null || hdnTotalSanctionAmt==undefined || hdnTotalSanctionAmt==0)
	{
		hdnTotalSanctionAmt=SanctionAmt;
	}
	else
	{
		hdnTotalSanctionAmt=parseFloat(hdnTotalSanctionAmt)+parseFloat(SanctionAmt);
	}
 	var hdnStatus=document.getElementById("hdnStatus").value;
 	var txtRemarksComments= $('#txtRemarksComments').val();
    if (txtRemarksComments == '' || txtRemarksComments == null || txtRemarksComments == undefined) 
    {     
	  alert('Please Enter Remark')
	  return false;
     }
	var Data;
		var workflowDt = new Date();
	workflowDt = GetCurrentDataToday();

	var NSCheckerComm=document.getElementById("hdnNABCheckerComment").value;
     var txtNsApprRemark;
     if(NSCheckerComm!='' && NSCheckerComm!=undefined && NSCheckerComm!='')
     {
     	txtNsApprRemark= "Comment :- " + txtRemarksComments + " - " + workflowDt + ": " + NSCheckerComm.toString() + "\n\n"
     }
     else{
     	txtNsApprRemark= "Comment :- " + txtRemarksComments + " - " + workflowDt + "\n\n"
     }

	/*if(status !== 'Review by NABSaranrakshan')
	{
			Data = JSON.stringify(
		    {
		        '__metadata': {
		            'type': 'SP.Data.CGApplicationsListItem'
		        },
				 "Status":status,
				"cr6fc_nschackerremark":txtNsApprRemark
				 
		    });

	}
	else if(status == 'Review by NABSaranrakshan')
	{*/
			Data = JSON.stringify(
		    {
		        /*'__metadata': {
		            'type': 'SP.Data.CGApplicationsListItem'
		        },*/
				"cr6fc_status":status,
				"cr6fc_nschackerremark":txtNsApprRemark,
				//"cr6fc_nsapprover":NSCheckerApprover
				"cr6fc_NSApprover_contact@odata.bind": "/contacts(" + NSCheckerApprover + ")"
				 
		    });

	//}
	fileInput = $('#fileAttachInvoice');
	otherfileArray=[];
    //var AttchLength=fileInput[0].files.length
	$("#attachFilesHolderOther input:file").each(function () {
        if ($(this)[0].files[0]) {
            otherfileArray.push({ "Attachment": $(this)[0].files[0] });
        }
    });
	AttchLength= otherfileArray.length; 

	
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
	    success: function (data) 
	    {
	    	
	    		var filterRateData = $.grep(RateMasterColl, function (value) 
			    {
			        return (value['cr6fc_category@OData.Community.Display.V1.FormattedValue'] == "Guarantee Fee" && parseFloat(value.cr6fc_greaterthan) < parseFloat(hdnTotalSanctionAmt) && parseFloat(value.cr6fc_lessthan) > parseFloat(hdnTotalSanctionAmt));
			    });
			    if(filterRateData.length>0)
			    {
			    	var calCGFessPer=parseFloat(filterRateData[0].cr6fc_applicablepercentage)
			    	
			    	var CGFessPerValue=calCGFessPer/100;
					CGFessPerValue=''+CGFessPerValue
					var getCalVal=CGFessPerValue*SanctionAmt;
					getCalVal=''+getCalVal.toFixed(4);
					var CGFeeVal= Math.ceil(getCalVal);
					//var CGFeeVal= parseFloat(getCalVal) + parseFloat(SanctionAmt);

			    }
			    
			    var filterEligibleRateData = $.grep(RateMasterColl, function (value) 
			    {
			        return (value['cr6fc_category@OData.Community.Display.V1.FormattedValue'] == "Guarantee Cover" && parseFloat(value.cr6fc_greaterthan) < parseFloat(hdnTotalSanctionAmt) && parseFloat(value.cr6fc_lessthan) > parseFloat(hdnTotalSanctionAmt));
			    });
			    if(filterEligibleRateData.length>0)
			    {
			    	var calCGFessPerEligible=parseFloat(filterEligibleRateData[0].cr6fc_applicablepercentage)
			    	
			    	var CGFessPerValueElig=calCGFessPerEligible/100;
					CGFessPerValueElig=''+CGFessPerValueElig;
					var getCalValElig=CGFessPerValueElig*SanctionAmt;
					getCalValElig=''+getCalValElig
					var CGFeeValElig= Math.ceil(getCalValElig);
					//var CGFeeValElig= parseFloat(getCalValElig) + parseFloat(SanctionAmt);

			    }
			    var IGST='18';
			    var CGST='9';
			    var SGST='9';
			    var UGST='9';
			    if(TrustMasterColl.length>0)
			    {
			    	if(TrustMasterColl[0].cr6fc_State.cr6fc_name == ELIMasterColl[0].cr6fc_State.cr6fc_name)
			    	{
			    		//var calCGFessPerEligible=parseFloat(filterEligibleRateData[0].ApplicablePercentage)
			    	
				    	var CGST=CGST/100;
						CGST=''+CGST;
						var getCalCGST=CGST*parseFloat(CGFeeVal);
						getCalCGST=''+getCalCGST
						var CGSTVal= Math.ceil(getCalCGST);
						
						var SGST=SGST/100;
						SGST=''+SGST;
						var getCalSGST=SGST*parseFloat(CGFeeVal);
						getCalSGST=''+getCalSGST
						var SGSTVal = Math.ceil(getCalSGST);


			    	}
			    	else
			    	{
			    		var IGST=IGST/100;
						IGST=''+IGST;
						var getCalIGST=IGST*parseFloat(CGFeeVal);
						getCalIGST=''+getCalIGST
						var IGSTVal = Math.ceil(getCalIGST);

			    	}

			    }
			    else
			    {
			    		var IGST=IGST/100;
						IGST=''+IGST;
						var getCalIGST=IGST*parseFloat(CGFeeVal);
						getCalIGST=''+getCalIGST
						var IGSTVal = Math.ceil(getCalIGST);
			    }
			    var subTotal;
			    if(CGSTVal!='' && SGSTVal!='' && CGSTVal!=undefined && SGSTVal!=undefined)
			    {
			    	subTotal=parseFloat(CGSTVal) + parseFloat(SGSTVal);
			    }
			    else if(IGSTVal!='' && IGSTVal!=undefined)
			    {
			    	subTotal=parseFloat(IGSTVal);
			    }
				var GrandTot;
				if(subTotal!='' && CGFeeVal!='' && subTotal!=undefined && CGFeeVal!=undefined)
				{
					GrandTot = Math.ceil(subTotal) + Math.ceil(CGFeeVal);
				}
			if(SOEIDMasterColl.length>0)
	    	{
	    		var SOEData = JSON.stringify(
				    {				        
				        //"Title":vTitle,
				        //"SOENo":vTitle,
				        "cr6fc_wfid":vItemID,
				        //"CGFAN":vCGFANTitle,
						"cr6fc_billtoname":ELIMasterColl[0].cr6fc_lendinginstitute,
						"cr6fc_billtoaddress":ELIMasterColl[0].cr6fc_address,
						"cr6fc_BillToState@odata.bind": "/cr6fc_statemasters(" + ELIMasterColl[0].cr6fc_State.cr6fc_statemasterid + ")",
						// "cr6fc_billtostate":parseInt(ELIMasterColl[0].cr6fc_State.cr6fc_statemasterid),
						"cr6fc_billtogstin":ELIMasterColl[0].cr6fc_gstin,
						"cr6fc_billtopan":ELIMasterColl[0].cr6fc_pan,
						//"PlaceofSupply":document.getElementById("cr6fc_nameoflendinginstitution").value,
						//"SOEDate":new Date(),
						//"CreditGuaranteeFee":document.getElementById("PANFPO").value
						"cr6fc_fpo":$("#txtNameOfFPO").text(),
						"cr6fc_fpoloanaccountno":document.getElementById("hdnAccountNo").value,
						"cr6fc_sanctionedamount":document.getElementById("hdnSanctionAmt").value,
						"cr6fc_cgapplicationno":document.getElementById("txtApplicantID").value,
						"cr6fc_creditguaranteefee":''+CGFeeVal,
						"cr6fc_eligibleguranteecover":''+CGFeeValElig,
						"cr6fc_igst":''+IGST,
						"cr6fc_igstamount":''+IGSTVal,
						"cr6fc_cgst":''+CGST,
						"cr6fc_cgstamount":''+CGSTVal,
						"cr6fc_sgst":''+SGST,
						"cr6fc_sgstamount":''+SGSTVal,
						"cr6fc_taxamount":''+subTotal,
						"cr6fc_grandtotal":''+GrandTot
				    });
					
					
	    			/*$.ajax({
	
				    url: _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/getByTitle('SOEDetails')/getItemByStringId('" +SOEIDMasterColl[0].ID+ "')",
				    type: "POST",
				    contentType: "application/json;odata=verbose",
				    async: false,
				    data: SOEData,
				    headers: {
				        "accept": "application/json;odata=verbose",
				        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
				        "IF-MATCH": "*",
				        "X-Http-Method": "PATCH"
				    },*/
					console.log(token)
					var header={__RequestVerificationToken:token,
					contentType: "application/json;odata=verbose",
					XRequestDigest: $("#__REQUESTDIGEST").val(),
					IFMATCH: "*",
					XHttpMethod: "PATCH"
					}
					$.ajax({

					url: "/_api/cr6fc_soedetailses("+SOEIDMasterColl[0].cr6fc_soedetailsid+")",
					type: "PATCH",
					async: false,
					data: SOEData,
					headers: header,
					
				    success: function (data) 
				    {
				    	//successId=data.d.Id;
				    	//UpdateCounter();
				    	//UpdateCounterCGFAN();
						 SOECOLLID = SOEIDMasterColl[0].cr6fc_soedetailsid;
						if (AttchLength !=0){
							// getFileContentsAndMetadata(vItemID,token,SOECOLLID)
							updatecgappfile(vItemID)
						}
						

				    	alert('SOE Generated Sucessfully');
				    	if(AttchLength==0 || AttchLength==null || AttchLength=='')
				    	{
						 	window.location.href="/SOEDetails/?Item="+SOEIDMasterColl[0].cr6fc_soedetailsid+"&Page="+Page;			                 
						}
				    },
				    error: function (e) 
				    {
				    	console.log(e);
				    }
				});

	    	}
	    	else if(SOEIDMasterColl.length==0 && hdnStatus !== 'Sent Back by NABSaranrakshan')
	    	{
	    			var SOEData = JSON.stringify(
				    {				        
				        //"Title":vTitle,
				        //"SOENo":vTitle,
				        "cr6fc_wfid":vItemID,
				        //"CGFAN":vCGFANTitle,
						"cr6fc_billtoname":ELIMasterColl[0].cr6fc_lendinginstitute,
						"cr6fc_billtoaddress":ELIMasterColl[0].cr6fc_address,
						"cr6fc_BillToState@odata.bind": "/cr6fc_statemasters(" + ELIMasterColl[0].cr6fc_State.cr6fc_statemasterid + ")",
						// "cr6fc_billtostate":parseInt(ELIMasterColl[0].cr6fc_State.cr6fc_statemasterid),
						"cr6fc_billtogstin":ELIMasterColl[0].cr6fc_gstin,
						"cr6fc_billtopan":ELIMasterColl[0].cr6fc_pan,
						//"PlaceofSupply":document.getElementById("cr6fc_nameoflendinginstitution").value,
						//"SOEDate":new Date(),
						//"CreditGuaranteeFee":document.getElementById("PANFPO").value
						"cr6fc_fpo":$("#txtNameOfFPO").text(),
						"cr6fc_fpoloanaccountno":document.getElementById("hdnAccountNo").value,
						"cr6fc_sanctionedamount":document.getElementById("hdnSanctionAmt").value,
						"cr6fc_cgapplicationno":document.getElementById("txtApplicantID").value,
						"cr6fc_creditguaranteefee":''+CGFeeVal,
						"cr6fc_eligibleguranteecover":''+CGFeeValElig,
						"cr6fc_igst":''+IGST,
						"cr6fc_igstamount":''+IGSTVal,
						"cr6fc_cgst":''+CGST,
						"cr6fc_cgstamount":''+CGSTVal,
						"cr6fc_sgst":''+SGST,
						"cr6fc_sgstamount":''+SGSTVal,
						"cr6fc_taxamount":''+subTotal,
						"cr6fc_grandtotal":''+GrandTot
						 
				    });
					

					
	    			var header = {
						__RequestVerificationToken: token,
						contentType: "application/json;odata=verbose"
					}
					$.ajax({
						// url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CGApplications')/items",
						url: "/_api/cr6fc_soedetailses",
						type: "POST",
						headers: header,
						async: false,
						data: SOEData,
				    	success: function (data, textStatus, xhr) 
				    {
				    	SOECOLLID = xhr.getResponseHeader("entityid");
						if(AttchLength!=0 ){
							// getFileContentsAndMetadata(vItemID,token,SOECOLLID)
							updatecgappfile(vItemID)
						}
				    	alert('SOE Generated Sucessfully');
				    	if(AttchLength==0 )
				    	{
							SOEMasterID(vItemID);
						 	window.location.href="/SOEDetails/?Item="+SOECOLLID+"&Page="+Page;			                 
						}
				    },
				    error: function (e) 
				    {
				    	console.log(e);
				    }
				});

	    	}
	    	else
	    	{
				alert('Request has been 8');
				if(AttchLength==0 || AttchLength==null || AttchLength=='')
				{

					window.location.href="/NSCheckerDashboard/";			                 
				}
	    	}
	       	 //alert('List updated Succesfully');
			// window.location.href="https://nabardmumbai.sharepoint.com/sites/FPOCGPortal/SitePages/NSCheckerDashBoardCGApp.aspx";			                 
	    },
	    error: function (e) 
	    {
	    	console.log(e);
	    }
	});
})
}
var successId='';
function GetCounterCGFAN() {
    var vRetVal = '';
    var hdnCounter = '';
    var requestUri = location.origin+"/_api/('CounterMaster')//items?$top=500&$select=CGApplicationNo,ID,Title&$filter=Title eq 'CGFAN'";
    var requestHeaders = { "accept": "application/json;odata=verbose" };
    $.ajax({
        url: requestUri,
        contentType: "application/json;odata=verbose",
        headers: requestHeaders,
        async: false,
        cache: false,
        success: function (data) {
            var Logg = data.value;
            try {
               var dtt = new Date();
               	var dd=dtt.getDate();
                var mm = dtt.getMonth();
                var actmonh=mm+parseInt(1);
                actmonh=''+actmonh;
                var calmonth;
                if(actmonh.length==1)
                {
                	calmonth='0'+actmonh;
                }
                else 
                {
                	calmonth=actmonh;
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
                if (data.value.length > 0) {
                    var ItemId = data.value[0].CGApplicationNo;
                    
                    hdnCounter = parseInt(ItemId) + 1;
                    vRetVal = 'CGA'+ dd +''+ calmonth +''+ yyyy +'000'+ hdnCounter;
                    document.getElementById("hdnDigitalRequestNoCGFAN").value = vRetVal;
                    document.getElementById("hdnCounterItemIDCGFAN").value = data.value[0].CGApplicationNo;
                    document.getElementById("hdnCounterItemID1CGFAN").value = data.value[0].ID;

                   // hdnCounter = parseInt(vRetVal) + 1;

                   // var Itemid = data.value[0].ID;
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
    var requestUri = "/_api/('CounterMaster')//items?$top=500&$select=CGApplicationNo,ID,Title&$filter=Title eq 'SOE'";
    var requestHeaders = { "accept": "application/json;odata=verbose" };
    $.ajax({
        url: requestUri,
        contentType: "application/json;odata=verbose",
        headers: requestHeaders,
        async: false,
        cache: false,
        success: function (data) {
            var Logg = data.value;
            try {
               var dtt = new Date();
                if (data.value.length > 0) {
                    var ItemId = data.value[0].CGApplicationNo;
                      var fiscalyear = "";
					  var today = new Date();
					  if ((today.getMonth() + 1) <= 3) {
					    fiscalyear = (today.getFullYear() - 1) + "-" + today.getFullYear()
					  } else {
					    fiscalyear = today.getFullYear() + "-" + (today.getFullYear() + 1)
					  }
                    hdnCounter = parseInt(ItemId) + 1;
                    vRetVal = 'SFPO'+ hdnCounter + '/' + fiscalyear;
                    document.getElementById("hdnDigitalRequestNo").value = vRetVal;
                    document.getElementById("hdnCounterItemID").value = data.value[0].CGApplicationNo;
                    document.getElementById("hdnCounterItemID1").value = data.value[0].ID;

                   // hdnCounter = parseInt(vRetVal) + 1;

                   // var Itemid = data.value[0].ID;
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
    var hdnCounter =document.getElementById("hdnCounterItemIDCGFAN").value;
    hdnCounter1 = parseInt(hdnCounter) + 1;
    var data1 = JSON.stringify(
        {
            '__metadata': {
                'type': 'SP.Data.CounterMasterListItem'
            },
            'CGApplicationNo': hdnCounter1.toString()
        });
            $.ajax({
        url: "/_api/('CounterMaster')/getItemByStringId('" + itemId + "')",
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
    var hdnCounter =document.getElementById("hdnCounterItemID").value;
    hdnCounter1 = parseInt(hdnCounter) + 1;
    var data1 = JSON.stringify(
        {
            '__metadata': {
                'type': 'SP.Data.CounterMasterListItem'
            },
            'CGApplicationNo': hdnCounter1.toString()
        });
            $.ajax({
        url: "/_api/('CounterMaster')/getItemByStringId('" + itemId + "')",
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
function UpdateCounterAttchFailed() {
    debugger;
    var itemId = document.getElementById("hdnCounterItemID").value;
    var hdnCounter = document.getElementById("hdnCounterItemID").value;
    hdnCounter = parseInt(hdnCounter) + 1;
    $.ajax({
        url: "/_api/('CounterMaster')/getItemByStringId('" + itemId + "')",
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
// var DocName='';
// function upload(vItemID) {
//         // Define the folder path for this example.
//         var serverRelativeUrlToFolder = '/sites/FPOCGPortal/GeneralDocument';

//         // Get test values from the file input and text input page controls.
//         var fileInput = jQuery('#fileAttachInvoice');
//         var newName = jQuery('#displayName').val();
//         var fileCount = fileInput[0].files.length;
//         // Get the server URL.
//         var serverUrl = _spPageContextInfo.webAbsoluteUrl;
//         var filesUploaded = 0;
//         for (var i = 0; i < fileCount; i++) {
//             // Initiate method calls using jQuery promises.
//             // Get the local file as an array buffer.
//             var getFile = getFileBuffer(i);
//             getFile.done(function (arrayBuffer, i) {

//                 // Add the file to the SharePoint folder.
//                 var addFile = addFileToFolder(arrayBuffer, i);
//                 addFile.done(function (file, status, xhr) {
//                    //Get ID of File uploaded 
//                     var getfileID = getItem1(file.d);
//                     getfileID.done(function (fResult) {
//                         var colObject = new Object();
//                        /* colObject["RequestNo"] = request;
//                         colObject["DocType"] = 'GeneralManager';
//                         colObject["Title"] = ItemId;*/
//                            //colObject["RequestID"] = requestidvalue;
//                          //    colObject["RequestNo"] = request;
//                         colObject["DocType"] = 'NSChecker';
//                         colObject["Title"] = vItemID;
//                        // colObject["CMACNo"] = txtCMACNo;

//                         /*colObject["CMACNo"] = txtCMACNo;
//                        colObject["ProductID"] = ItemId;
//                         colObject["Creative"] = hdnRequestNo; */
                        
//                         var changeItem = updateFileMetadata('GeneralDocument', fResult.d, colObject);
//                         changeItem.done(function (result) {
//                             filesUploaded++;
//                             if (fileCount == filesUploaded) {
//                                 //alert("All files uploaded successfully");
//                                 //$("#msg").append("<div>All files uploaded successfully</div>");
//                                 $("#fileAttachInvoice").value = null;
//                                 filesUploaded = 0;
//                             }
//                         });
//                         changeItem.fail(function (result) {

//                         });

//                     }, function () { });

//                 });
//                 addFile.fail(onError);
//             });
//             getFile.fail(onError);

//         }
//          function getItem1(file) {
//         var def = jQuery.Deferred();
//         jQuery.ajax({
//             url: file.ListItemAllFields.__deferred.uri,
//             type: "GET",
//             dataType: "json",
//             headers: {
//                 Accept: "application/json;odata=verbose"
//             },
//             success: function (data) {
            
//                 def.resolve(data);
//             },
//             error: function (data, arg, jhr) {
//                 def.reject(data, arg, jhr);
//             }
//         });
//         return def.promise();
//         //return call;
//    }

//         // Get the local file as an array buffer.
//         function getFileBuffer(i) {
//             var deferred = jQuery.Deferred();
//             var reader = new FileReader();
//             reader.onloadend = function (e) {
//                 deferred.resolve(e.target.result, i);
//             }
//             reader.onerror = function (e) {
//                 deferred.reject(e.target.error);
//             }
//             reader.readAsArrayBuffer(fileInput[0].files[i]);
//             return deferred.promise();
//         }

//         // Add the file to the file collection in the Shared Documents folder.
//         function addFileToFolder(arrayBuffer, i) {
//             var index = i;

//             // Get the file name from the file input control on the page.
//             DocName=fileInput[0].files[index].name;
//             var fileName = fileInput[0].files[index].name;
// 			var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds  
// 			var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1).replace(":", "").slice(0, -2).replace(":", "").slice(0, -3).replace(".", "");
// 			var ext = fileName.split(".");
// 			ext = ext[ext.length - 1].toLowerCase();
// 			var ext1 = "." + ext;
// 			fileName = fileName.replace(ext1, "" + localISOTime + "" + ext1 + "");
//             // Construct the endpoint.
//             var fileCollectionEndpoint = String.format(
//                     "{0}/_api/web/getfolderbyserverrelativeurl('{1}')/files" +
//                     "/add(overwrite=true, url='{2}')",
//                     serverUrl, serverRelativeUrlToFolder, fileName);

//             // Send the request and return the response.
//             // This call returns the SharePoint file.
//             return jQuery.ajax({
//                 url: fileCollectionEndpoint,
//                 type: "POST",
//                 data: arrayBuffer,
//                 processData: false,
//                 headers: {
//                     "accept": "application/json;odata=verbose",
//                     "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
//                     "content-length": arrayBuffer.byteLength
//                 }
//             });
//         }
//     }

//     // Display error messages. 
//     function onError(error) {
//         alert(error.responseText);
//     }

//     function updateFileMetadata(libraryName, item, colPropObject) {
//         var def = jQuery.Deferred();
// 		var siteUrl= _spPageContextInfo.webAbsoluteUrl;
//         var restSource = siteUrl + "/_api/Web/Lists/getByTitle('" + libraryName + "')/Items(" + item.Id + ")";
//         var jsonString = "";

//         var metadataColumn = new Object();
//         metadataColumn["type"] = item.__metadata.type;
//         //columnArray.push(metadataColumn);
//         if (colPropObject == null || colPropObject == 'undefined')// For library having no column properties to be updated
//         {
//             colPropObject = new Object();
//         }
//         colPropObject["__metadata"] = metadataColumn;
//         jsonString = JSON.stringify(colPropObject);
//         var dfd = jQuery.Deferred();
//         jQuery.ajax(
//         {
//             'url': restSource,
//             'method': 'POST',
//             'data': jsonString,
//             'headers':
//                 {
//                     'accept': 'application/json;odata=verbose',
//                     'content-type': 'application/json;odata=verbose',
//                     'X-RequestDigest': jQuery('#__REQUESTDIGEST').val(),
//                     "IF-MATCH": item.__metadata.etag,
//                     "X-Http-Method": "MERGE"
//                 },
//             'success': function (data) {
//             //alert("Data update Successfully");
// 			if(successId!='' && successId!=null && successId!=undefined)
// 			{
// 			window.location.href=location.origin+"/SOEDetails/?Item="+successId+"&Page="+Page;		
// 			}
// 			else
// 			{
// 				window.location.href=location.origin+"/NSCheckerDashboard/";			                 
// 			}
//            //window.location.href="https://mypiramal.sharepoint.com/sites/uat/CollateralSystem/SitePages/MarketingManager.aspx";
//                 var d = data;
//                 dfd.resolve(d);
//             },
//             'error': function (err) {
//                 dfd.reject(err);
//             }
//         });

//         return dfd.promise();
//     }
 //------------------------------------------------------------------------------------------------------
 
 
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
	url: "/_api/cr6fc_cgappfileses(" + CGFileID + ")/cr6fc_nscheckerfile?x-ms-file-name=" + fileName,
	type: "PUT",
	async: false,
	contentType: "application/octet-stream",
	processData: false,
	// data: fileContent,
	data: fileContent,
	headers: header,
	success: function (data, textStatus, xhr) {
		window.location.href="/SOEDetails/?Item="+SOECOLLID+"&Page="+Page;			                 

	},
	error: function (xhr, textStatus, errorThrown) {
		console.log(errorThrown)
	}
	});
    // webapi.safeAjax({
    //     type: "PUT", // NOTE: right now Portals requires PUT instead of PATCH for the upload
    //     url: "/_api/cr6fc_makerregistrationrequestses(" + entityID + ")/cr6fc_attachmentfile?x-ms-file-name=" + fileName,
    //     contentType: "application/octet-stream",
    //     data: fileContent,
    //     processData: false,
    //     success: function (data, textStatus, xhr) {
    //         // Provide some visual feedback re successful upload
    //         // $('#upload-Audio h1').html('<span style="color: #1ed760;" class="glyphicon glyphicon-ok"></span> Here\'s your audio');
    //         // Set the source of the hidden audio player
    //         audioPlayerSrcURL = '/File/download.aspx?Entity=musdyn_track' + '&Attribute=musdyn_audiotrack&Id=' + entityID;
    //         $('#upload-player').attr('src',audioPlayerSrcURL)
    //         // Show the audio player
    //         $('.showOnSuccess').slideDown(200);
    //         // Hide the form
    //         $('#track-content').slideUp(200);
    //     },
    //     error: function (xhr, textStatus, errorThrown) {
    //         // If error occurs uploading the file, provide visual feedback
    //         $('#upload-Audio h1').text('Uh oh, uploading file the track');
    //     }
    // });
}

function updatecgappfile(vItemID){
	var data = JSON.stringify(
		{
			"cr6fc_cgid": vItemID,
			"cr6fc_name":"NSChecker",
			"cr6fc_cgapplicationno": document.getElementById("txtApplicantID").value
		});
	document.getElementById("txtApplicantID").value,
	shell.getTokenDeferred().done(function(token){
		console.log(token)
		var header = {
			__RequestVerificationToken: token,
			contentType: "application/json;odata=verbose"
		}
		$.ajax({
			// url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CGApplications')/items",
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





//----------------------------------------------------------------------------
function getfileNSchecker(vItemID)
{
	$.ajax({
	type: "GET",
   // url: "/_api/cr6fc_cgapplicationses("+vItemID+")/cr6fc_nscheckercgappfile",
   url:"/_api/cr6fc_cgappfileses?$select=cr6fc_nscheckerfile_name,cr6fc_cgappfilesid,cr6fc_nscheckerfile_name&$filter=cr6fc_cgid eq ("+vItemID+") and cr6fc_name eq 'NSChecker'",
    contentType:"application/json",
	async: false,
    success: function(res) {
        console.log(res);
		var Logg = res.value;
		var vhtml='';
		if(Logg.length>0){
			$("#NSCheckerDocs").show();
          for(var i = 0;i<Logg.length;i++){
			var cgappfilename12 = Logg[i].cr6fc_nscheckerfile_name;
			vhtml+="<a href='/_api/cr6fc_cgappfileses(" + Logg[i].cr6fc_cgappfilesid + ")/cr6fc_nscheckerfile/$value'>"+Logg[i].cr6fc_nscheckerfile_name+"</a>";

		  }
		  $('#additionalDocsNSChecker').append(vhtml);
		}
		//link="data:application/octet-stream;base64," + res.value + ""

		//$('#anchPANLICert').attr("href", "/_api/cr6fc_makerregistrationrequestses(" + vItemID + ")/cr6fc_lipan/$value");
		//$('#anchPANLICert').text(MakerRegistrationColl[0].cr6fc_lipan_name);
       // $('#main1').append('<a href="'+link+'">HI1</a>');
        //$('#main2').append('<iframe src="data:application/pdf;base64,' + res.value + '" frameborder="0" height="100%" width="100%"></iframe>')
		
    },
    error: function(xhr, status, error){
        var errorMessage = xhr.status + ': ' + xhr.statusText;
        console.log(errorMessage);
		}
	});
}
///----------------------------------
function getfileNSNSApprover(vItemID)
{
	$.ajax({
	type: "GET",
   // url: "/_api/cr6fc_cgapplicationses("+vItemID+")/cr6fc_nscheckercgappfile",
   url:"/_api/cr6fc_cgappfileses?$select=cr6fc_cgappfilesid,cr6fc_nsapproverfile_name&$filter=cr6fc_cgid eq ("+vItemID+") and cr6fc_name eq 'NSApprover'",
    contentType:"application/json",
	async: false,
    success: function(res) {
        console.log(res);
		var Logg = res.value;
		var vhtml='';
		if(Logg.length>0){
			$("#NSApproverDocs").show();
          for(var i = 0;i<Logg.length;i++){
			var cgappfilename12 = Logg[i].cr6fc_nsapproverfile_name
			vhtml+="<a href='/_api/cr6fc_cgappfileses(" + Logg[i].cr6fc_cgappfilesid + ")/cr6fc_nsapproverfile/$value'>"+Logg[i].cr6fc_nsapproverfile_name+"</a> ","";

		  }
		  $('#additionalDocsNSApprover').append(vhtml);
		}
		//link="data:application/octet-stream;base64," + res.value + ""

		//$('#anchPANLICert').attr("href", "/_api/cr6fc_makerregistrationrequestses(" + vItemID + ")/cr6fc_lipan/$value");
		//$('#anchPANLICert').text(MakerRegistrationColl[0].cr6fc_lipan_name);
       // $('#main1').append('<a href="'+link+'">HI1</a>');
        //$('#main2').append('<iframe src="data:application/pdf;base64,' + res.value + '" frameborder="0" height="100%" width="100%"></iframe>')
		
    },
    error: function(xhr, status, error){
        var errorMessage = xhr.status + ': ' + xhr.statusText;
        console.log(errorMessage);
		}
	});
}