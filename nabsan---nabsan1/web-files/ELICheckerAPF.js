

var vItemID;
var loggedInUserId = '';
var loggedInUserName = '';
var loggedInUserEmail = '';
$(document).ready(function () {
    loggedInUserId = $('#fpo-user-contact-id').val();
	loggedInUserName = $('#fpo-user-contact-name').val();
	loggedInUserEmail = $('#fpo-user-email').val();
    $('title').text('ELICHECKERAPPROVALFORM');
    vItemID= GetQueryStingValue()["Item"];
    var vTaskID= GetQueryStingValue()["Task"];
  /*document.getElementById("MangmentCheck").disabled = true;*/

    BindFPOActivities();
    BindRegion();
    BindFPOState();
    BindBusinessFPOState();
    NSApprovalMatrix();
    bindCGApplicationData(vItemID);
	getfileELIMaker(vItemID);
	getfileELIChecker(vItemID);
     /*getOtherDocDatarenewal(vItemID);
     getOtherDocDataLatest(vItemID);*/
     
	 bindfinancialYear();
  });


  
var da = new Date();
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

 function bindfinancialYear() {
	//var requestUri = location.origin + "/_api/cr6fc_financialyears?$select=cr6fc_name,cr6fc_financialyearid"; comm 9 18 24
	var requestUri = location.origin + "/_api/cr6fc_financialyears?$select=cr6fc_name,cr6fc_financialyearid";
	var requestHeaders = { "accept": "application/json;odata=verbose" };
	$.ajax({
		url: requestUri,
		contentType: "application/json;odata=verbose",
		type: "GET",
		headers: requestHeaders,
		async: false,
		success: function (data) {
			var Logg = data.value;
			try {
				if (data.value.length > 0) {
					var ddlFinancialYear = document.getElementById("ddlFinancialYear");
					ddlFinancialYear.options.length = 0;
					 ddlFinancialYear.options[ddlFinancialYear.options.length] = new Option("Select", "0");
					for (var i = 0; i < data.value.length; i++) {
						//ddlFinancialYear.options[ddlFinancialYear.options.length] = new Option(data.value[i].cr6fc_name, data.value[i].cr6fc_financialyearid);
						ddlFinancialYear.options[ddlFinancialYear.options.length] = new Option(data.value[i].cr6fc_name, data.value[i].cr6fc_financialyearid);
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

 function BindFPOActivities() {
	//var requestUri = location.origin+"/_api/cr6fc_fpoactivitiesmasters?$select=cr6fc_fpoactivity";\ 9 18 24
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
						//FPOActivities.options[FPOActivities.options.length] = new Option(items[i].cr6fc_fpoactivity, i+1); 9 18 24
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
	//var requestUri = location.origin+"/_api/cr6fc_regionmasters?$select=cr6fc_name,cr6fc_regionmasterid";
	var requestUri = location.origin +"/_api/cr6fc_regionmasters?$select=cr6fc_name,cr6fc_regionmasterid";
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
			
//items.splice(2,1);
			try {
				if (items.length > 0) {
					var RegionOfFPO = document.getElementById("RegionOfFPO");
					RegionOfFPO.options.length = 0;
					RegionOfFPO.options[RegionOfFPO.options.length] = new Option("Select", "0");
					for (var i = 0; i < items.length; i++) {
						//RegionOfFPO.options[RegionOfFPO.options.length] = new Option(items[i].cr6fc_name, items[i].cr6fc_regionmasterid);
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
			LoggFPOState = data.value;
			try {
				if (LoggFPOState.length > 0) {
					var FPOState = document.getElementById("FPOState");
					FPOState.options.length = 0;
					FPOState.options[FPOState.options.length] = new Option("Select", "0");
					for (var i = 0; i < LoggFPOState.length; i++) {
						//FPOState.options[FPOState.options.length] = new Option(LoggFPOState[i].cr6fc_name, LoggFPOState[i].cr6fc_statemasterid);
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
						BusinessFPOState.options[BusinessFPOState.options.lenth] = new Option(Logg[i].cr6fc_name,Logg[i].cr6fc_statemasterid);
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
 
var CGFeeEndDateNPA = '';
function bindMainCGApplicationData(vItemID,CGStatus,ID){ 

    //var requestUri = location.origin+"/_api/cr6fc_cgapplicationses?$top=5000&$select=cr6fc_guaranteeenddate,cr6fc_FPOState,cr6fc_BusinessFPOState,cr6fc_RegionOfFPO,cr6fc_cgapplicationsid,cr6fc_guaranteestartdate,cr6fc_typeoffacility,cr6fc_enddateofinterestmoratium,cr6fc_enddateofprinciplemoratium,cr6fc_enddateofmoratium,cr6fc_cgfeestartdate,cr6fc_cgfeeenddate,cr6fc_cgstatus&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=(cr6fc_cgapplicationsid eq " + vItemID + ")";
	var requestUri = location.origin+"/_api/cr6fc_cgaplications?$top=5000&$select=cr6fc_guaranteeenddate,cr6fc_FPOState,cr6fc_BusinessFPOState,cr6fc_RegionOfFPO,cr6fc_cgaplicationid,cr6fc_guaranteestartdate,cr6fc_typeoffacility,cr6fc_enddateofinterestmoratium,cr6fc_enddateofprinciplemoratium,cr6fc_enddateofmoratium,cr6fc_cgfeestartdate,cr6fc_cgfeeenddate,cr6fc_cgstatus&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=(cr6fc_cgaplicationid eq " + vItemID + ")";
    
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
	                  
              		//$("#hdnGuranteeStartDt").val(Logg[0].cr6fc_guaranteestartdate);
					  $("#hdnGuranteeStartDt").val(Logg[0].cr6fc_guaranteestartdate);
              		//$("#hdnGuranteeEndDt").val(Logg[0].cr6fc_guaranteeenddate);
					  $("#hdnGuranteeEndDt").val(Logg[0].cr6fc_guaranteeenddate);
              		//$('#hdnTypeOfFacilityCGApp').val(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'])
					  $('#hdnTypeOfFacilityCGApp').val(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'])
              		if(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'] == "Term Loan OR WCTL (Working Capital Term Loan)")
              		{
              			if(Logg[0].cr6fc_enddateofinterestmoratium != null && Logg[0].cr6fc_enddateofinterestmoratium != "" && Logg[0].cr6fc_enddateofinterestmoratium != undefined)
	              		{
	              			$('#hdnEndDateOfInterestMoratiumCGApp').val(Logg[0].cr6fc_enddateofinterestmoratium)
	              		}
	              		if(Logg[0].cr6fc_enddateofprinciplemoratium!= null && Logg[0].cr6fc_enddateofprinciplemoratium!= "" && Logg[0].cr6fc_enddateofprinciplemoratium!= undefined)
	              		{
	              			$('#hdnEndDateOfPrincipleMoratiumCGApp').val(Logg[0].cr6fc_enddateofprinciplemoratium)
	              		}
              		}
              		else
              		{
              			
              			if(Logg[0].cr6fc_enddateofmoratium!= null && Logg[0].cr6fc_enddateofmoratium!= "" && Logg[0].cr6fc_enddateofmoratium!= undefined)
	              		{
	              			$('#hdnEndDateOfInterestMoratiumCGApp').val(Logg[0].cr6fc_enddateofmoratium)
	              		}

              		}
              		
					$('#hdnCGStartdtforTermLoan').val(Logg[0].cr6fc_cgfeestartdate);
					if(CGStatus=="" || CGStatus==undefined || CGStatus==null)
					{
						CGStatus=Logg[0].cr6fc_cgstatus;
					}
					
              		if(Logg[0]['cr6fc_cgstatus@OData.Community.Display.V1.FormattedValue'] == "In Force 0")
              		{
              			$("#hdnCGFeeStartDt").val(Logg[0].cr6fc_cgfeestartdate);
              			$("#hdnCGFeeEndDt").val(Logg[0].cr6fc_cgfeeenddate);

              		}
              		else
              		{
              			bindRenewalCGApplicationData(CGStatus,ID)
              		}
					CGFeeEndDateNPA = Logg[0].cr6fc_cgfeeenddate;
              		$("#hdnCGStatus").val(Logg[0]['cr6fc_cgstatus@OData.Community.Display.V1.FormattedValue']);
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

 function bindRenewalCGApplicationData(CGStatus,vItemID){    
	//var requestUri = location.origin+"/_api/cr6fc_renewalcgapplications?$top=5000&$select=cr6fc_FPOState,cr6fc_BusinessFPOState,cr6fc_RegionOfFPO,cr6fc_renewalcgapplicationid,cr6fc_cgfeestartdate,cr6fc_cgfeeenddate&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=(cr6fc_renewalcgapplicationid eq '" + vItemID + "')"; comm on 9 19 24
    var requestUri = location.origin+"/_api/cr6fc_renewalcgapplications?$top=5000&$select=cr6fc_FPOState,cr6fc_BusinessFPOState,cr6fc_RegionOfFPO,cr6fc_renewalcgapplicationid,cr6fc_cgfeestartdate,cr6fc_cgfeeenddate&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=(cr6fc_renewalcgapplicationid eq '" + vItemID + "')";
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
					/*if(Logg[0].cr6fc_cgfeestartdate!=null && Logg[0].cr6fc_cgfeestartdate!='' && Logg[0].cr6fc_cgfeestartdate!=undefined)
					{
						$("#hdnCGFeeStartDt").val(Logg[0].cr6fc_cgfeestartdate);
					}*/
					if(Logg[0].cr6fc_cgfeestartdate!=null && Logg[0].cr6fc_cgfeestartdate!='' && Logg[0].cr6fc_cgfeestartdate!=undefined)
					{
						$("#hdnCGFeeStartDt").val(Logg[0].cr6fc_cgfeestartdate);
					}
					/*if(Logg[0].cr6fc_cgfeeenddate!=null && Logg[0].cr6fc_cgfeeenddate!='' && Logg[0].cr6fc_cgfeeenddate!=undefined)
					{
						$("#hdnCGFeeEndDt").val(Logg[0].cr6fc_cgfeeenddate);
					}*/
					if(Logg[0].cr6fc_cgfeeenddate!=null && Logg[0].cr6fc_cgfeeenddate!='' && Logg[0].cr6fc_cgfeeenddate!=undefined)
						{
							$("#hdnCGFeeEndDt").val(Logg[0].cr6fc_cgfeeenddate);
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


var CGID;
function bindCGApplicationData(vItemID){    
    //var requestUri = location.origin+"/_api/cr6fc_renewalcgapplications?$top=5000&$select=cr6fc_parentid,cr6fc_cgpan,cr6fc_renewalcgapplicationid,cr6fc_iracclassificationoftheaccount,cr6fc_disbursmentunderloan,cr6fc_nameoffpo,cr6fc_panfpo,cr6fc_name,cr6fc_customerid,cr6fc_farmermembersize,cr6fc_typeoffacility,cr6fc_accountno,cr6fc_sanctionedamount,cr6fc_modifiedsanctionedloanamount,cr6fc_dateofnpa,cr6fc_iracclassificationoftheaccount,cr6fc_disbursmentunderloan,cr6fc_dateofsanction,cr6fc_elicheckerremark,cr6fc_elimakerremark,cr6fc_status,cr6fc_nameoffpo,cr6fc_cgpan,_cr6fc_elichecker_value,cr6fc_nameoflendinginstitution,cr6fc_typeoffacility,cr6fc_disbursmentunderloan,cr6fc_principaloutstanding,cr6fc_dateoffirstdisbursement,cr6fc_enddateofinterestmoratium,cr6fc_enddateofprinciplemoratium,cr6fc_dateoflastinstalment,cr6fc_dateofclosureofloan,cr6fc_dateofmodifiedsanction,cr6fc_loanfullydisbured,cr6fc_loanclosed,cr6fc_peakoutstanding,cr6fc_dateoffirstwithdrawal,cr6fc_dateofclosureoflimit,cr6fc_dateofmodifiedsanction,cr6fc_dateoflimitvalidity,cr6fc_limitoperational,cr6fc_limitoperational,cr6fc_utilisationunderlimit,cr6fc_limitclosed,cr6fc_typeoffacility,cr6fc_dateoflastinstalment,cr6fc_enddateofinterestmoratium,cr6fc_enddateofprinciplemoratium,cr6fc_loanclosed,cr6fc_dateoflimitvalidity,cr6fc_enddateofinterestmoratium,cr6fc_enddateofprinciplemoratium,cr6fc_limitclosed,cr6fc_elimakerremark,cr6fc_elicheckerremark,_cr6fc_elichecker_value,cr6fc_nameoflendinginstitution&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=(cr6fc_renewalcgapplicationid eq '" + vItemID + "')";
	var requestUri = location.origin+"/_api/cr6fc_renewalcgapplications?$top=5000&$select=cr6fc_parentid,cr6fc_cgpan,cr6fc_renewalcgapplicationid,cr6fc_iracclassificationoftheaccount,cr6fc_disbursmentunderloan,cr6fc_nameoffpo,cr6fc_panfpo,cr6fc_name,cr6fc_customerid,cr6fc_farmermembersize,cr6fc_typeoffacility,cr6fc_accountno,cr6fc_sanctionedamount,cr6fc_modifiedsanctionedloanamount,cr6fc_dateofnpa,cr6fc_iracclassificationoftheaccount,cr6fc_disbursmentunderloan,cr6fc_dateofsanction,cr6fc_elicheckerremark,cr6fc_elimakerremark,cr6fc_status,cr6fc_nameoffpo,cr6fc_cgpan,_cr6fc_elichecker_value,cr6fc_nameoflendinginstitution,cr6fc_typeoffacility,cr6fc_disbursmentunderloan,cr6fc_principaloutstanding,cr6fc_dateoffirstdisbursement,cr6fc_enddateofinterestmoratium,cr6fc_enddateofprinciplemoratium,cr6fc_dateoflastinstalment,cr6fc_dateofclosureofloan,cr6fc_dateofmodifiedsanction,cr6fc_loanfullydisbured,cr6fc_loanclosed,cr6fc_peakoutstanding,cr6fc_dateoffirstwithdrawal,cr6fc_dateofclosureoflimit,cr6fc_dateofmodifiedsanction,cr6fc_dateoflimitvalidity,cr6fc_limitoperational,cr6fc_utilisationunderlimit,cr6fc_limitclosed,cr6fc_typeoffacility,cr6fc_dateoflastinstalment,cr6fc_enddateofinterestmoratium,cr6fc_enddateofprinciplemoratium,cr6fc_loanclosed,cr6fc_dateoflimitvalidity,cr6fc_enddateofinterestmoratium,cr6fc_enddateofprinciplemoratium,cr6fc_limitclosed,cr6fc_elimakerremark,cr6fc_elicheckerremark,_cr6fc_elichecker_value,cr6fc_nameoflendinginstitution&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=(cr6fc_renewalcgapplicationid eq '" + vItemID + "')";
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
                   // CGID = Logg[0].cr6fc_parentid;
					CGID = Logg[0].cr6fc_parentid;
              		//$("#CGPAN").val(Logg[0].cr6fc_cgpan); 
					$("#CGPAN").val(Logg[0].cr6fc_cgpan);           		
             		//bindMainCGApplicationData(Logg[0].cr6fc_parentid,Logg[0].cr6fc_cgstatus,Logg[0].cr6fc_renewalcgapplicationid);
					 bindMainCGApplicationData(Logg[0].cr6fc_parentid,Logg[0].cr6fc_cgstatus,Logg[0].cr6fc_renewalcgapplicationid);
              		//$('#IRClassification').val(Logg[0]['cr6fc_iracclassificationoftheaccount@OData.Community.Display.V1.FormattedValue']);
					  $('#IRClassification').val(Logg[0]['cr6fc_iracclassificationoftheaccount@OData.Community.Display.V1.FormattedValue']);

              		/*if(Logg[0].IRACClassificationOfTheAccount=="Substandard"||Logg[0].IRACClassificationOfTheAccount=="Doubtful"||Logg[0].IRACClassificationOfTheAccount=="Loss"){
              		   $("#20").show();
              		}*/
					//var DisbursmentLoan =  Logg[0]['cr6fc_disbursmentunderloan@OData.Community.Display.V1.FormattedValue'] ;
					var DisbursmentLoan =  Logg[0]['cr6fc_disbursmentunderloan@OData.Community.Display.V1.FormattedValue'] ; 		 					
					//$("#CGPAN").val(Logg[0].cr6fc_cgpan);
					$("#CGPAN").val(Logg[0].cr6fc_cgpan);
					//$("#DisbursmentLoan").val(Logg[0]['cr6fc_disbursmentunderloan@OData.Community.Display.V1.FormattedValue']);
					$("#DisbursmentLoan").val(Logg[0]['cr6fc_disbursmentunderloan@OData.Community.Display.V1.FormattedValue']);
					//$("#txtNameOfFPO").val(Logg[0].cr6fc_nameoffpo);
					$("#txtNameOfFPO").val(Logg[0].cr6fc_nameoffpo);
					//$("#PANFPO").val(Logg[0].cr6fc_panfpo);
					$("#PANFPO").val(Logg[0].cr6fc_panfpo);
					//$("#txtApplicantID").val(Logg[0].cr6fc_name);
					$("#txtApplicantID").val(Logg[0].cr6fc_name);
					//$("#CustomerID").val(Logg[0].cr6fc_customerid);
					$("#CustomerID").val(Logg[0].cr6fc_customerid);
					//$("#RegionOfFPO").val(Logg[0].cr6fc_RegionOfFPO.cr6fc_regionmasterid);
					$("#RegionOfFPO").val(Logg[0].cr6fc_RegionOfFPO.cr6fc_regionmasterid);
					//$("#FarmerMemberSize").val(Logg[0].cr6fc_farmermembersize);
					$("#FarmerMemberSize").val(Logg[0].cr6fc_farmermembersize);
					//$("#TypeofFacility").val(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue']);
					$("#TypeofFacility").val(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue']);
					//$("#hdnTitle").val(Logg[0].cr6fc_name);
					$("#hdnTitle").val(Logg[0].cr6fc_name);
					//$("#AccountNo").val(Logg[0].cr6fc_accountno);
					$("#AccountNo").val(Logg[0].cr6fc_accountno);
					//$("#SanctionedAmount").val(Logg[0].cr6fc_sanctionedamount);
					$("#SanctionedAmount").val(Logg[0].cr6fc_sanctionedamount);
					//$('#SanctionedAmount').text(Math.ceil(Logg[0].cr6fc_sanctionedamount));
					$('#SanctionedAmount').text(Math.ceil(Logg[0].cr6fc_sanctionedamount));
					//var Word=convertNumberToWords(Math.ceil(Logg[0].cr6fc_sanctionedamount));	
					var Word=convertNumberToWords(Math.ceil(Logg[0].cr6fc_sanctionedamount));			
					$('#SanctionedAmountinwords').text("Rupees " + " " + Word + " " + "Only" );
					//$("#ModifiedSanctionedAmount").val(Logg[0].cr6fc_modifiedsanctionedloanamount);
					$("#ModifiedSanctionedAmount").val(Logg[0].cr6fc_modifiedsanctionedloanamount);
					//$("#ModifiedSanctionedAmount").val(Logg[0].cr6fc_modifiedsanctionedloanamount);
					$("#ModifiedSanctionedAmount").val(Logg[0].cr6fc_modifiedsanctionedloanamount);
					//$('#ModifiedSanctionedAmount').text(Math.ceil(Logg[0].cr6fc_modifiedsanctionedloanamount));
					$('#ModifiedSanctionedAmount').text(Math.ceil(Logg[0].cr6fc_modifiedsanctionedloanamount));
					//var Word=convertNumberToWords(Math.ceil(Logg[0].cr6fc_modifiedsanctionedloanamount));		
					var Word=convertNumberToWords(Math.ceil(Logg[0].cr6fc_modifiedsanctionedloanamount));		
					$('#ModifiedSanctionedAmountinwords').text("Rupees " + " " + Word + " " + "Only" );

					//if(Logg[0].cr6fc_dateofnpa !=null && Logg[0].cr6fc_dateofnpa!=undefined && Logg[0].cr6fc_dateofnpa !='')
						if(Logg[0].cr6fc_dateofnpa !=null && Logg[0].cr6fc_dateofnpa!=undefined && Logg[0].cr6fc_dateofnpa !='')
					{                		
					//document.getElementById("DateOfRegistration").value=String.format("{0:yyyy-MM-dd}",new Date(Logg[0].cr6fc_dateofregistration));
					//const DN = new Date(Logg[0].cr6fc_dateofnpa);
					const DN = new Date(Logg[0].cr6fc_dateofnpa);
					const spDate9 = new Date(DN).toISOString().slice(0, 10);
					document.getElementById("DateofNPA").value = spDate9;						
					}
					
					//$("#IRACclassification").text(Logg[0]['cr6fc_iracclassificationoftheaccount@OData.Community.Display.V1.FormattedValue']);
					$("#IRACclassification").text(Logg[0]['cr6fc_iracclassificationoftheaccount@OData.Community.Display.V1.FormattedValue']);
					//var DisbursmentLoan =  Logg[0]['cr6fc_disbursmentunderloan@OData.Community.Display.V1.FormattedValue'] ; 
					var DisbursmentLoan =  Logg[0]['cr6fc_disbursmentunderloan@OData.Community.Display.V1.FormattedValue'] ; 
					//var IRACStat = Logg[0]['cr6fc_iracclassificationoftheaccount@OData.Community.Display.V1.FormattedValue'];
					var IRACStat = Logg[0]['cr6fc_iracclassificationoftheaccount@OData.Community.Display.V1.FormattedValue'];
					if (IRACStat == "Substandard" || IRACStat == "Doubtful" || IRACStat == "Loss") 
					{
					IRACStat="NPA";
					} 
					else 
					{
					IRACStat="Non NPA";
					}

					if (IRACStat=== 'Non NPA') 
					{ $('#20').hide();}
					if (IRACStat=== 'NPA') 
					{ $('#20').show();}

					//if(Logg[0].cr6fc_dateofsanction!=null && Logg[0].cr6fc_dateofsanction!=undefined && Logg[0].cr6fc_dateofsanction!='')
					if(Logg[0].cr6fc_dateofsanction!=null && Logg[0].cr6fc_dateofsanction!=undefined && Logg[0].cr6fc_dateofsanction!='')
		      	    {						
						//var DOS=Logg[0].cr6fc_dateofsanction;	
						var DOS=Logg[0].cr6fc_dateofsanction;					
						const spDate = new Date(DOS).toISOString().slice(0, 10);
						document.getElementById("SanctionDate").value=spDate;
					}
					//if(Logg[0].cr6fc_elicheckerremark!=null && Logg[0].cr6fc_elicheckerremark!=undefined && Logg[0].cr6fc_elicheckerremark!='')			
		      	    
					if(Logg[0].cr6fc_elicheckerremark!=null && Logg[0].cr6fc_elicheckerremark!=undefined && Logg[0].cr6fc_elicheckerremark!='')			
					{
						$('#divCheckerHide').show();						
						//document.getElementById("divELICheckerRemark").innerHTML=Logg[0].cr6fc_elicheckerremark;
						document.getElementById("divELICheckerRemark").innerHTML=Logg[0].cr6fc_elicheckerremark;		
					}
					//if(Logg[0].cr6fc_elimakerremark!=null && Logg[0].cr6fc_elimakerremark!=undefined && Logg[0].cr6fc_elimakerremark!='')	
						if(Logg[0].cr6fc_elimakerremark!=null && Logg[0].cr6fc_elimakerremark!=undefined && Logg[0].cr6fc_elimakerremark!='')		
					{
						$('#divMaker').show();						
					//	document.getElementById("divELImaker").innerHTML=Logg[0].cr6fc_elimakerremark;		
						document.getElementById("divELImaker").innerHTML=Logg[0].cr6fc_elimakerremark;	
					}
					/*if(Logg[0].cr6fc_nscheckerremark !=null && Logg[0].cr6fc_nscheckerremark != undefined && Logg[0].cr6fc_nscheckerremark !='')			
					{
						$('#nscheckerapproval1').show();
						document.getElementById("additionalNSChecker").innerHTML=Logg[0].cr6fc_nscheckerremark;		
					}*/
					//if(Logg[0]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == "Pending for Approval")
						if(Logg[0]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == "Pending for Approval")
		      	    {
		      	    	//if(Logg[0]._cr6fc_elichecker_value == loggedInUserId)
							if(Logg[0]._cr6fc_elichecker_value == loggedInUserId)
		      	    	{
		      	    		$('#ButtonHide').show();
		      	    	}
		      	    }
					//var DisbursmentLoan =  Logg[0]['cr6fc_disbursmentunderloan@OData.Community.Display.V1.FormattedValue'];     
					var DisbursmentLoan =  Logg[0]['cr6fc_disbursmentunderloan@OData.Community.Display.V1.FormattedValue'];                  
                  // $("#txtNameOfFPO1").text(Logg[0].cr6fc_nameoffpo);   
				   $("#txtNameOfFPO1").text(Logg[0].cr6fc_nameoffpo);          					  
                  // $("#txtCGApplicationNo1").text(Logg[0].cr6fc_cgpan); 
				   $("#txtCGApplicationNo1").text(Logg[0].cr6fc_cgpan);            	
				  // document.getElementById("txtELICheckerName").value=Logg[0]['_cr6fc_elichecker_value@OData.Community.Display.V1.FormattedValue'];
				   document.getElementById("txtELICheckerName").value=Logg[0]['_cr6fc_elichecker_value@OData.Community.Display.V1.FormattedValue'];
					document.getElementById("dtproceed").innerHTML= dateval + "/" + b + "/" + c;
				  // document.getElementById("instituteIdNew").value=Logg[0].cr6fc_nameoflendinginstitution;
				   document.getElementById("instituteIdNew").value=Logg[0].cr6fc_nameoflendinginstitution;
				 //  if(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'] == "Term Loan OR WCTL (Working Capital Term Loan)")	   
					if(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'] == "Term Loan OR WCTL (Working Capital Term Loan)")	                 
				   {
					   $("#2").hide();
						  $("#1").show();
						 // $("#DisbursmentLoan").val(Logg[0]['cr6fc_disbursmentunderloan@OData.Community.Display.V1.FormattedValue']);
						  $("#DisbursmentLoan").val(Logg[0]['cr6fc_disbursmentunderloan@OData.Community.Display.V1.FormattedValue']);												
					   if( DisbursmentLoan == "No")
						  {
						   $('#3').hide();
						   $('#5').hide();
						   $('#6').hide();
						   $('#7').hide();
						   $('#8').hide();

						  }	              	 	
						 

					   
					  // $("#PrincipalOutstanding").val(Logg[0].cr6fc_principaloutstanding);
					   $("#PrincipalOutstanding").val(Logg[0].cr6fc_principaloutstanding);
					  // $('#PrincipalOutstanding').val(Math.ceil(Logg[0].cr6fc_principaloutstanding));
					   $('#PrincipalOutstanding').val(Math.ceil(Logg[0].cr6fc_principaloutstanding));
					 // var Word=convertNumberToWords(Math.ceil(Logg[0].cr6fc_principaloutstanding));
					  var Word=convertNumberToWords(Math.ceil(Logg[0].cr6fc_principaloutstanding));
					  $('#PrincipalOutstandinginwords').text("Rupees " + " " + Word + " " + "Only" );
					  // if(Logg[0].cr6fc_dateoffirstdisbursement != null && Logg[0].cr6fc_dateoffirstdisbursement !=undefined && Logg[0].cr6fc_dateoffirstdisbursement !='')
						if(Logg[0].cr6fc_dateoffirstdisbursement != null && Logg[0].cr6fc_dateoffirstdisbursement !=undefined && Logg[0].cr6fc_dateoffirstdisbursement !='')
					   {
							//var date=Logg[0].cr6fc_dateoffirstdisbursement;
							var date=Logg[0].cr6fc_dateoffirstdisbursement;
							const spDate4 = new Date(date).toISOString().slice(0, 10);
							document.getElementById("Date").value=spDate4;
					   }
					 //  if(Logg[0].cr6fc_enddateofinterestmoratium != null && Logg[0].cr6fc_enddateofinterestmoratium !=undefined && Logg[0].cr6fc_enddateofinterestmoratium !='')
					   if(Logg[0].cr6fc_enddateofinterestmoratium != null && Logg[0].cr6fc_enddateofinterestmoratium !=undefined && Logg[0].cr6fc_enddateofinterestmoratium !='')
					   {
						//var EDI=new Date(Logg[0].cr6fc_enddateofinterestmoratium);
						var EDI=new Date(Logg[0].cr6fc_enddateofinterestmoratium);
						const spDate5 = EDI.toISOString().slice(0, 10);
						document.getElementById("EndDateinterest").value=spDate5;
					   }
					  // if(Logg[0].cr6fc_enddateofprinciplemoratium != null && Logg[0].cr6fc_enddateofprinciplemoratium !=undefined && Logg[0].cr6fc_enddateofprinciplemoratium !='')
					   if(Logg[0].cr6fc_enddateofprinciplemoratium != null && Logg[0].cr6fc_enddateofprinciplemoratium !=undefined && Logg[0].cr6fc_enddateofprinciplemoratium !='')
					   {
						//var EDP=new Date(Logg[0].cr6fc_enddateofprinciplemoratium);
						var EDP=new Date(Logg[0].cr6fc_enddateofprinciplemoratium);
						const spDate6 = EDP.toISOString().slice(0, 10);
						document.getElementById("EndDateprincipal").value=spDate6;
					   }
					   //if(Logg[0].cr6fc_dateoflastinstalment != null && Logg[0].cr6fc_dateoflastinstalment !=undefined && Logg[0].cr6fc_dateoflastinstalment !='')
					   if(Logg[0].cr6fc_dateoflastinstalment != null && Logg[0].cr6fc_dateoflastinstalment !=undefined && Logg[0].cr6fc_dateoflastinstalment !='')
					   {
							//var DLI=new Date(Logg[0].cr6fc_dateoflastinstalment);
							var DLI=new Date(Logg[0].cr6fc_dateoflastinstalment);
							const spDate7 = DLI.toISOString().slice(0, 10);
							document.getElementById("DatelastInstalment").value=spDate7;
							//document.getElementById("hdnDateOfLastInstall").value=Logg[0].cr6fc_dateoflastinstalment;
							document.getElementById("hdnDateOfLastInstall").value=Logg[0].cr6fc_dateoflastinstalment;
					   }
					  // if(Logg[0].cr6fc_dateoflimitvalidity != null && Logg[0].cr6fc_dateoflimitvalidity !=undefined && Logg[0].cr6fc_dateoflimitvalidity !='')
					   if(Logg[0].cr6fc_dateoflimitvalidity != null && Logg[0].cr6fc_dateoflimitvalidity !=undefined && Logg[0].cr6fc_dateoflimitvalidity !='')
					   {
							//var DLV=new Date(Logg[0].cr6fc_dateoflimitvalidity);
							var DLV=new Date(Logg[0].cr6fc_dateoflimitvalidity);
							const DATELIMITVAL = DLV.toISOString().slice(0, 10);
							document.getElementById("DatelastInstalment").value=DATELIMITVAL;
							//document.getElementById("hdnDateOfLastInstall").value=Logg[0].cr6fc_dateoflimitvalidity;
							document.getElementById("hdnDateOfLastInstall").value=Logg[0].cr6fc_dateoflimitvalidity;
					   }
					 //  if(Logg[0].cr6fc_dateofclosureofloan != null && Logg[0].cr6fc_dateofclosureofloan !=undefined && Logg[0].cr6fc_dateofclosureofloan !='')
					   if(Logg[0].cr6fc_dateofclosureofloan != null && Logg[0].cr6fc_dateofclosureofloan !=undefined && Logg[0].cr6fc_dateofclosureofloan !='')
					   {
						//var DCL=new Date(Logg[0].cr6fc_dateofclosureofloan);
						var DCL=new Date(Logg[0].cr6fc_dateofclosureofloan);
						const spDate10 = DCL.toISOString().slice(0, 10);
						document.getElementById("DateclosureLoan").value=spDate10;
						//document.getElementById("hdnDateofClosure").value=Logg[0].cr6fc_dateofclosureofloan;
						document.getElementById("hdnDateofClosure").value=Logg[0].cr6fc_dateofclosureofloan;
					   }
					  // if(Logg[0].cr6fc_dateofclosureoflimit != null && Logg[0].cr6fc_dateofclosureoflimit !=undefined && Logg[0].cr6fc_dateofclosureoflimit !='') 
					   if(Logg[0].cr6fc_dateofclosureoflimit != null && Logg[0].cr6fc_dateofclosureoflimit !=undefined && Logg[0].cr6fc_dateofclosureoflimit !='')
					   {
						//var DCOL=new Date(Logg[0].cr6fc_dateofclosureoflimit);
						var DCOL=new Date(Logg[0].cr6fc_dateofclosureoflimit);
						const spDate40 = DCOL.toISOString().slice(0, 10);
						document.getElementById("DateclosureLoan").value=spDate40;
						//document.getElementById("hdnDateofClosure").value=Logg[0].cr6fc_dateofclosureoflimit;
						document.getElementById("hdnDateofClosure").value=Logg[0].cr6fc_dateofclosureoflimit;
					   }
					   //if(Logg[0].cr6fc_dateofmodifiedsanction != null && Logg[0].cr6fc_dateofmodifiedsanction !=undefined && Logg[0].cr6fc_dateofmodifiedsanction !='')
					   if(Logg[0].cr6fc_dateofmodifiedsanction != null && Logg[0].cr6fc_dateofmodifiedsanction !=undefined && Logg[0].cr6fc_dateofmodifiedsanction !='')
					   {
						//var DCL=new Date(Logg[0].cr6fc_dateofmodifiedsanction);
						var DCL=new Date(Logg[0].cr6fc_dateofmodifiedsanction);
						const spDate10 = DCL.toISOString().slice(0, 10);
						document.getElementById("DateModifiedSanction").value=spDate10;						
					   }		

						/* $("#Loanfullydisbursed").val(Logg[0]['cr6fc_loanfullydisbured@OData.Community.Display.V1.FormattedValue']);
						 $("#LoanClosed").text(Logg[0]['cr6fc_loanclosed@OData.Community.Display.V1.FormattedValue']);
						 if(Logg[0]['cr6fc_loanclosed@OData.Community.Display.V1.FormattedValue'] == "No")*/
							$("#Loanfullydisbursed").val(Logg[0]['cr6fc_loanfullydisbured@OData.Community.Display.V1.FormattedValue']);
						 $("#LoanClosed").text(Logg[0]['cr6fc_loanclosed@OData.Community.Display.V1.FormattedValue']);
						 if(Logg[0]['cr6fc_loanclosed@OData.Community.Display.V1.FormattedValue'] == "No")
						 {
						  $("#10").hide();
						 }
						
						 
						 
					  }
	              	 //if(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'] == "WC/CC Limit")
						if(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'] == "WC/CC Limit")
	              	 {
	              	 	
						$("#2").show();
						$("#1").hide();	                   
					   
					 //$("#PeakOutstanding2").val(Logg[0].cr6fc_peakoutstanding);
					 $("#PeakOutstanding2").val(Logg[0].cr6fc_peakoutstanding);
					// $('#PeakOutstanding2').text(Math.ceil(Logg[0].cr6fc_peakoutstanding));
					//var Word=convertNumberToWords(Math.ceil(Logg[0].cr6fc_peakoutstanding));    
					$('#PeakOutstanding2').text(Math.ceil(Logg[0].cr6fc_peakoutstanding));
					var Word=convertNumberToWords(Math.ceil(Logg[0].cr6fc_peakoutstanding));                
					$('#PeakOutstandinginwords').text("Rupees " + " " + Word + " " + "Only" );

					//document.getElementById("DatefirstWithdrawl").value = Logg[0].cr6fc_dateoffirstwithdrawal.substring(0, Logg[0].cr6fc_dateoffirstwithdrawal.indexOf("T"));;                        	              	
					//if(Logg[0].cr6fc_dateoffirstwithdrawal != null && Logg[0].cr6fc_dateoffirstwithdrawal !=undefined && Logg[0].cr6fc_dateoffirstwithdrawal !='')
						if(Logg[0].cr6fc_dateoffirstwithdrawal != null && Logg[0].cr6fc_dateoffirstwithdrawal !=undefined && Logg[0].cr6fc_dateoffirstwithdrawal !='')
					{
						//var EDI=new Date(Logg[0].cr6fc_dateoffirstwithdrawal);
						var EDI=new Date(Logg[0].cr6fc_dateoffirstwithdrawal);
						const spDate5 = EDI.toISOString().slice(0, 10);
						document.getElementById("DatefirstWithdrawl").value=spDate5;
					}
					//document.getElementById("DateClosureLimit2").value = Logg[0].cr6fc_dateofclosureoflimit.substring(0, Logg[0].cr6fc_dateofclosureoflimit.indexOf("T"));;                        	              	
					//if(Logg[0].cr6fc_dateofclosureoflimit != null && Logg[0].cr6fc_dateofclosureoflimit !=undefined && Logg[0].cr6fc_dateofclosureoflimit !='')
						if(Logg[0].cr6fc_dateofclosureoflimit != null && Logg[0].cr6fc_dateofclosureoflimit !=undefined && Logg[0].cr6fc_dateofclosureoflimit !='')
					{
						//var EDI=new Date(Logg[0].cr6fc_dateofclosureoflimit);
						var EDI=new Date(Logg[0].cr6fc_dateofclosureoflimit);
						const spDate5 = EDI.toISOString().slice(0, 10);
						document.getElementById("DateClosureLimit2").value=spDate5;
					}
					//document.getElementById("DateModifiedSanction").value = Logg[0].cr6fc_dateofmodifiedsanction.substring(0, Logg[0].cr6fc_dateofmodifiedsanction.indexOf("T"));;                        	              	              
					//if(Logg[0].cr6fc_dateofmodifiedsanction != null && Logg[0].cr6fc_dateofmodifiedsanction !=undefined && Logg[0].cr6fc_dateofmodifiedsanction !='')
					if(Logg[0].cr6fc_dateofmodifiedsanction != null && Logg[0].cr6fc_dateofmodifiedsanction !=undefined && Logg[0].cr6fc_dateofmodifiedsanction !='')
					{
						//var EDI=new Date(Logg[0].cr6fc_dateofmodifiedsanction);
						var EDI=new Date(Logg[0].cr6fc_dateofmodifiedsanction);
						const spDate5 = EDI.toISOString().slice(0, 10);
						document.getElementById("DateModifiedSanction1").value=spDate5;
					}
					//document.getElementById("DateLimitValidity").value = Logg[0].cr6fc_dateoflimitvalidity.substring(0, Logg[0].cr6fc_dateoflimitvalidity.indexOf("T"));;  
					if(Logg[0].cr6fc_dateoflimitvalidity != null && Logg[0].cr6fc_dateoflimitvalidity !=undefined && Logg[0].cr6fc_dateoflimitvalidity !='')                      	              	              
                  //  if(Logg[0].cr6fc_dateoflimitvalidity != null && Logg[0].cr6fc_dateoflimitvalidity !=undefined && Logg[0].cr6fc_dateoflimitvalidity !='')
					{
						//var EDI=new Date(Logg[0].cr6fc_dateoflimitvalidity);
						var EDI=new Date(Logg[0].cr6fc_dateoflimitvalidity);
						const spDate5 = EDI.toISOString().slice(0, 10);
						document.getElementById("DateLimitValidity").value=spDate5;
						//document.getElementById("hdnDateOfLastInstall").value=Logg[0].cr6fc_dateoflimitvalidity;
						document.getElementById("hdnDateOfLastInstall").value=Logg[0].cr6fc_dateoflimitvalidity;
					}   
					  // $("#Limitoperational").val(Logg[0]['cr6fc_limitoperational@OData.Community.Display.V1.FormattedValue']);
						//if (Logg[0]['cr6fc_limitoperational@OData.Community.Display.V1.FormattedValue'] === 'No') 
							$("#Limitoperational").val(Logg[0]['cr6fc_limitoperational@OData.Community.Display.V1.FormattedValue']);
						if (Logg[0]['cr6fc_limitoperational@OData.Community.Display.V1.FormattedValue'] === 'No') 
						{
							$('#22').hide();
						}
						else
						{
							$('#22').show();
						}                         
                        
                        
                        $("#UtilisationLimit").val(Logg[0]['cr6fc_utilisationunderlimit@OData.Community.Display.V1.FormattedValue']);
                        if(Logg[0]['cr6fc_utilisationunderlimit@OData.Community.Display.V1.FormattedValue'] === 'No')
                        {
                        	$('#202').hide();
                        }
                        else
                        {
                        	$('#202').show();
                        }
                        $("#EndLimitClosed2").val(Logg[0]['cr6fc_limitclosed@OData.Community.Display.V1.FormattedValue']);
                        if(Logg[0]['cr6fc_limitclosed@OData.Community.Display.V1.FormattedValue'] === 'No')
                        {
                        	$('#201').hide();
                        }
                        else
                        {
                        	$('#201').show();
                        }			
						              	                  	                   
		          		}
		          		
		          		if(Logg[0].cr6fc_dateofnpa!=null && Logg[0].cr6fc_dateofnpa!=undefined && Logg[0].cr6fc_dateofnpa!='')
	              	    {
							document.getElementById("hdnDateofNPA").value=Logg[0].cr6fc_dateofnpa;
						}

		               	 if(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'] == "Term Loan OR WCTL (Working Capital Term Loan)")	                   
		                   {
		                   		if(Logg[0].cr6fc_dateoflastinstalment!=null && Logg[0].cr6fc_dateoflastinstalment!=undefined && Logg[0].cr6fc_dateoflastinstalment!='')
			              	    {
									document.getElementById("hdnloanClosedDt").value=Logg[0].cr6fc_dateoflastinstalment;
								}
								
								if(Logg[0].cr6fc_enddateofinterestmoratium != null && Logg[0].cr6fc_enddateofinterestmoratium != "" && Logg[0].cr6fc_enddateofinterestmoratium != undefined)
			              		{
			              			$('#hdnEndDateOfInterestMoratium').val(Logg[0].cr6fc_enddateofinterestmoratium)
			              		}
			              		if(Logg[0].cr6fc_enddateofprinciplemoratium!= null && Logg[0].cr6fc_enddateofprinciplemoratium!= "" && Logg[0].cr6fc_enddateofprinciplemoratium!= undefined)
			              		{
			              			$('#hdnEndDateOfPrincipleMoratium').val(Logg[0].cr6fc_enddateofprinciplemoratium)
			              		}
			              		$('#hdnLoanClosed').val(Logg[0].cr6fc_loanclosed);

		
		                   }
		                   else
		                   {
		                   		if(Logg[0].cr6fc_dateoflimitvalidity!=null && Logg[0].cr6fc_dateoflimitvalidity!=undefined && Logg[0].cr6fc_dateoflimitvalidity!='')
								{	      
									document.getElementById("hdnloanClosedDt").value=Logg[0].cr6fc_dateoflimitvalidity;
		                        }
		                        if(Logg[0].cr6fc_enddateofinterestmoratium != null && Logg[0].cr6fc_enddateofinterestmoratium != "" && Logg[0].cr6fc_enddateofinterestmoratium != undefined)
			              		{
			              			$('#hdnEndDateOfInterestMoratium').val(Logg[0].cr6fc_enddateofinterestmoratium)
			              		}
			              		if(Logg[0].cr6fc_enddateofprinciplemoratium!= null && Logg[0].cr6fc_enddateofprinciplemoratium!= "" && Logg[0].cr6fc_enddateofprinciplemoratium!= undefined)
			              		{
			              			$('#hdnEndDateOfPrincipleMoratium').val(Logg[0].cr6fc_enddateofprinciplemoratium)
			              		}
			              		$('#hdnLoanClosed').val(Logg[0].cr6fc_limitclosed);

		
		                   }

		          		if(Logg[0].cr6fc_elimakerremark!=null && Logg[0].cr6fc_elimakerremark!=undefined && Logg[0].cr6fc_elimakerremark!='')
						
						{	
							$('#divMaker').show();							
							document.getElementById("divELImaker").innerHTML=Logg[0].cr6fc_elimakerremark;

						}
						
						if(Logg[0].cr6fc_elicheckerremark!=null && Logg[0].cr6fc_elicheckerremark!=undefined && Logg[0].cr6fc_elicheckerremark!='')
						
						{	
							$('#divCheckerHide').show();							
							document.getElementById("divELICheckerRemark").innerHTML=Logg[0].cr6fc_elicheckerremark;

						}
						
					$("#txtELICheckerName").text(Logg[0]['_cr6fc_elichecker_value@OData.Community.Display.V1.FormattedValue']);
					$("#instituteId").text(Logg[0].cr6fc_nameoflendinginstitution);
					$("#instituteIdNew").text(Logg[0].cr6fc_nameoflendinginstitution);					
                    // bindSOEDetailsData(Logg[0].cr6fc_renewalcgapplicationid);				          		  				  	          
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
				//var requestUri = location.origin+"/_api/cr6fc_nsapprovalmatrixes?$select=*&$filter= cr6fc_role eq 'Checker'";
				var requestUri = location.origin+"/_api/cr6fc_nsapprovalmatrixes?$select=*&$filter= cr6fc_role eq 'Checker'";
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
						NSCheckerApprover=NSApproverColl[0]._cr6fc_user_value;						
		            }
		        },
		        error: function () {
		            console.log("error");
		        }
		    });
}

function Proceed()
{
		
		var checkbox = document.getElementById("vehicle1");
		if(checkbox.checked==false)
		{
			alert('Please click on the check box to proceed ahead');
			return false;
		}

	  
	  	  
	   var Data;
	
			Data = JSON.stringify(
		    {		 
			      "cr6fc_status":SubStatus,   
				 "cr6fc_eilcheckercertificateview":"1",
				 "cr6fc_eilcheckercertificateviewdate":new Date()				 
		    });
			shell.getTokenDeferred().done(function(token){
				var header={__RequestVerificationToken:token,
					contentType: "application/json;odata=verbose",
					XRequestDigest: $("#__REQUESTDIGEST").val(),
					IFMATCH: "*",
					XHttpMethod: "PATCH"
					}
					$.ajax({
			
					//url: "/_api/cr6fc_renewalcgapplications("+vItemID+")",
				   url: "/_api/cr6fc_renewalcgapplications("+vItemID+")",
					type: "PATCH",
					async: false,
					data: Data,
					headers: header,
					
					success: function (data,textStatus,xhr) 
					{
	       	  successrenual = xhr.getResponseHeader('entityid');
				alert('Item Updated Succesfully');
				// window.location.href = location.origin + "/RefreshingCache/?id="+successrenual+"&tbl=cr6fc_renewalcgapplications&col=cr6fc_cacherefreshedon&red=ELICheckerDBRenewal";
		       // window.location.href = location.origin + "/RefreshingCache/?id="+updatefileid+","+cgappicationentity+","+successrenual+"&tbl=cr6fc_renewalappfiles,cr6fc_renewalcgapplications,cr6fc_renewalcgapplications&col=cr6fc_cacherefreshedon&red=ELICheckerDBRenewal";
				window.location.href = location.origin + "/RefreshingCache/?id="+updatefileid+","+cgappicationentity+","+successrenual+"&tbl=cr6fc_renewalappfiles,cr6fc_renewalcgapplications,cr6fc_renewalcgapplications&col=cr6fc_cacherefreshedon&red=ELICheckerDBRenewal";
				// window.location.href=location.origin+"/ELICheckerDBRenewal/";	
	    },
	    error: function (e) 
	    {
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
var cgappicationentity;
var SubStatus='';
var hdnCGFeeEndDtNew='';
//var lockinperiodnew = hdnCGFeeEndDtNew;
function Submit(status) 
 { 
	  
 	var txtRemarksComments= $('#txtmakerComment').val();
 	
	var dateofLastInstall = $("#hdnDateOfLastInstall").val();
	var dateofClosure = $("#hdnDateofClosure").val();
	if(dateofLastInstall != ''){
	var dateofLastInstall1 = new Date(dateofLastInstall);
	}
	var dateofClosure1 = new Date(dateofClosure);
	//var ddlFinancialYear = $('#ddlFinancialYear option:selected').text();
 	var IRClassifications=$('#IRClassification').val();
	var hdnCGFeeStartDt=$('#hdnCGFeeStartDt').val()
	var hdnCGFeeEndDt=$('#hdnCGFeeEndDt').val()
	var hdnCGStatus=$('#hdnCGStatus').val();
	var hdnLoanClosed=$('#hdnLoanClosed').val()
	var hdnDateofNPA=$('#hdnDateofNPA').val();
	var hdnTypeOfFacilityCGApp=$('#hdnTypeOfFacilityCGApp').val();
	var checkfinancialyear = confirm('Do you want to proceed');
	var CGStatus;
	if(IRClassifications=="SMA- 0" || IRClassifications=="SMA- 1" || IRClassifications=="SMA- 2" || IRClassifications=="Standard" || IRClassifications== "Standard - 0 Days Past Due (DPD)")
	{
			if(hdnCGStatus=="In Force 4" && hdnTypeOfFacilityCGApp=="WC/CC Limit")
			{
				let lastChar = hdnCGStatus.substr(hdnCGStatus.length - 1);
			    //lastChar=parseInt(lastChar);
			    let nxtLevl = parseFloat(lastChar) + 1;
			
			    let firsttext = hdnCGStatus; 
			    let result = firsttext.substr(0, 8);
			    let finalresult = result+" "+nxtLevl;
			    CGStatus = finalresult;               
				var hdnGuranteeStartDt=$('#hdnGuranteeStartDt').val()
				var hdnGuranteeEndDt=$('#hdnGuranteeEndDt').val()
				var hdnloanClosedDt=$('#hdnloanClosedDt').val();
				var hdnloanClosedDtNew=new Date(hdnloanClosedDt);
				 hdnCGFeeEndDtNew=new Date(hdnCGFeeEndDt);
				hdnCGFeeEndDtNew=hdnCGFeeEndDtNew.setDate(hdnCGFeeEndDtNew.getDate() + 1);
				hdnCGFeeEndDtNew=new Date(hdnCGFeeEndDtNew);
				var currDateYear='';
				// 	if(checkfinancialyear){
				// 	  if(ddlFinancialYear != 'Select'){
				// 	     var splitfinanceYear = ddlFinancialYear.split('-')[1];
				// 	     currDateYear = splitfinanceYear;
				// 	  }
				// 	  else{
				// 		var currDate=new Date();
				// 		currDateYear=currDate.getFullYear();
				// 		var CurrMonth=currDate.getMonth();
				// 		if(CurrMonth > 2)
				// 		{
				// 			currDateYear=currDateYear+1;
				// 		}

				// 		}
				// 	}
				// else{
					var currDate=new Date();
					currDateYear=currDate.getFullYear();
					var CurrMonth=currDate.getMonth();
						if(CurrMonth > 2)
						{
							currDateYear=currDateYear+1;
						}

				//}

				/*var currDate=new Date();
				var currDateYear=currDate.getFullYear()
				var CurrMonth=currDate.getMonth();
				if(CurrMonth > 2)
				{
					currDateYear=currDateYear+1;
				}*/
				var findDate=currDateYear+"-3-31"
				var hdn31March=new Date(findDate);
				
				var hdnGuranteeEndDtNew=new Date(hdnGuranteeEndDt)
				var date;
				
				if(hdnloanClosedDt!=null && hdnloanClosedDt!=undefined && hdnloanClosedDt!='')
				{
					if(hdn31March < hdnloanClosedDtNew)
					{
						date=hdn31March;
					}
					else
					{
						date=hdnloanClosedDtNew;
					}
				}
				else
				{
						date=hdn31March;
				}
				
				if(hdnGuranteeEndDt!=null && hdnGuranteeEndDt!=undefined && hdnGuranteeEndDt!='')
				{
					if(hdnGuranteeEndDtNew > date)
					{
						date=date;
					}
					else{
						date=hdnGuranteeEndDtNew;
					}
				}
				

			}
			else
			{
				let lastChar = hdnCGStatus.substr(hdnCGStatus.length - 1);			    
			    let nxtLevl = parseFloat(lastChar) + 1;
			
			    let firsttext = hdnCGStatus; 
			    let result = firsttext.substr(0, 8);
			    let finalresult = result+" "+nxtLevl;
			    CGStatus = finalresult;               
				var hdnGuranteeStartDt=$('#hdnGuranteeStartDt').val()
				var hdnGuranteeEndDt=$('#hdnGuranteeEndDt').val()
				var hdnloanClosedDt=$('#hdnloanClosedDt').val();
				var hdnloanClosedDtNew=new Date(hdnloanClosedDt);
				var hdnCGFeeEndDtNew=new Date(hdnCGFeeEndDt);
				hdnCGFeeEndDtNew=hdnCGFeeEndDtNew.setDate(hdnCGFeeEndDtNew.getDate() + 1);
				hdnCGFeeEndDtNew=new Date(hdnCGFeeEndDtNew);
				var currDateYear='';
				// 	if(checkfinancialyear){
				// 	  if(ddlFinancialYear != 'Select'){
				// 	     var splitfinanceYear = ddlFinancialYear.split('-')[1];
				// 	     currDateYear = splitfinanceYear;
				// 	  }
				// 	  else{
				// 		var currDate=new Date();
				// 		currDateYear=currDate.getFullYear();
				// 		var CurrMonth=currDate.getMonth();
				// 		if(CurrMonth > 2)
				// 		{
				// 			currDateYear=currDateYear+1;
				// 		}

				// 		}
				// 	}
				// else{
					var currDate=new Date();
					currDateYear=currDate.getFullYear();
					var CurrMonth=currDate.getMonth();
						if(CurrMonth > 2)
						{
							currDateYear=currDateYear+1;
						}

				//}

				/*var currDate=new Date();
				var currDateYear=currDate.getFullYear()
				var CurrMonth=currDate.getMonth();
				if(CurrMonth > 2)
				{
					currDateYear=currDateYear+1;
				}*/
				var findDate=currDateYear+"-3-31"
				var hdn31March=new Date(findDate);
				
				var hdnGuranteeEndDtNew=new Date(hdnGuranteeEndDt)
				var date;
							
				if(hdnGuranteeEndDt!=null && hdnGuranteeEndDt!=undefined && hdnGuranteeEndDt!='')
				{
					if(hdnGuranteeEndDtNew > hdn31March)
					{
						date=hdn31March;
					}
					else
					{
						date=hdnGuranteeEndDtNew;
					}
					if(dateofLastInstall1 != undefined){
					if(dateofLastInstall1 > hdn31March)
					{
						date=hdn31March;
					}
					else
					{
						date=dateofLastInstall1;
					}
				 }
				}
				else
				{
					date=hdn31March;
				}


			}

	}
	if(IRClassifications=="Substandard" || IRClassifications=="Doubtful" || IRClassifications=="Loss")
	{
		var hdnCGFeeEndDtNew=new Date(hdnCGFeeEndDt);
			hdnCGFeeEndDtNew=hdnCGFeeEndDtNew.setDate(hdnCGFeeEndDtNew.getDate() + 1);
			hdnCGFeeEndDtNew=new Date(hdnCGFeeEndDtNew);

		if(hdnTypeOfFacilityCGApp=="Term Loan OR WCTL (Working Capital Term Loan)")
		{
			var EndDateOfInterestMoratium='';
			var EndDateOfPrincipleMoratium='';
	
			var hdnEndDateOfInterestMoratium= $('#hdnEndDateOfInterestMoratium').val();	    
			var hdnEndDateOfPrincipleMoratium = $('#hdnEndDateOfPrincipleMoratium').val();	  
			
			var hdnEndDateOfInterestMoratiumCGApp= $('#hdnEndDateOfInterestMoratiumCGApp').val();	    
			var hdnEndDateOfPrincipleMoratiumCGApp= $('#hdnEndDateOfPrincipleMoratiumCGApp').val();	 
   
	  		var hdnCGStartdtforTermLoan=$('#hdnCGStartdtforTermLoan').val();
	  		hdnCGStartdtforTermLoan=new Date(hdnCGStartdtforTermLoan);
	  		
		  if(hdnEndDateOfInterestMoratiumCGApp!='' && EndDateOfPrincipleMoratium!=null && EndDateOfPrincipleMoratium!=undefined)
		  {
		  	EndDateOfInterestMoratium=new Date(hdnEndDateOfInterestMoratiumCGApp);
		  }
		  else
		  {
		  	EndDateOfInterestMoratium=new Date(hdnEndDateOfInterestMoratium);
		  }
		  
		 if(hdnEndDateOfPrincipleMoratiumCGApp!='' && hdnEndDateOfPrincipleMoratiumCGApp!=null && hdnEndDateOfPrincipleMoratiumCGApp!=undefined)
		  {
		  	EndDateOfPrincipleMoratium=new Date(hdnEndDateOfPrincipleMoratiumCGApp);
		  }
		  else
		  {
		  	EndDateOfPrincipleMoratium=new Date(hdnEndDateOfPrincipleMoratium);
		  }
		  
		  var lockInPeriod='';
		  if(!isNaN(EndDateOfPrincipleMoratium) && !isNaN(EndDateOfInterestMoratium))
		  {
		  		if(EndDateOfPrincipleMoratium < EndDateOfInterestMoratium)
				  {
				  	lockInPeriod=EndDateOfInterestMoratium;
				  }
				  else
				  {
				  	lockInPeriod=EndDateOfPrincipleMoratium;
				  }
		  }
		  
		  if(!isNaN(lockInPeriod) && !isNaN(hdnCGStartdtforTermLoan))
		  {
		  		if(lockInPeriod < hdnCGStartdtforTermLoan)
				  {
				  	lockInPeriod=hdnCGStartdtforTermLoan;
				  }
			  var lockinPeriodNew=lockInPeriod.setDate(lockInPeriod.getDate() + 365);
			  lockinPeriodNew=new Date(lockinPeriodNew);
			
			  	var hdnDateofNPANew=new Date(hdnDateofNPA);
				var lstInnvocationDt='';
				if(!isNaN(hdnDateofNPANew))
				{
					if(hdnDateofNPANew < lockinPeriodNew) 
					{
						lstInnvocationDt=lockinPeriodNew;
						//lstInnvocationDt=hdnDateofNPANew;
					}
					else
					{
						//lstInnvocationDt=lockinPeriodNew;
						lstInnvocationDt=hdnDateofNPANew;
					}
				}
				else
				{
						lstInnvocationDt=lockinPeriodNew;
				}
				
		  }
		  else
		  {
				lstInnvocationDt=new Date();
		  }
		  
			var lastdateofInnvocation=lstInnvocationDt.setDate(lstInnvocationDt.getDate() + 365);
			lastdateofInnvocation=new Date(lastdateofInnvocation);
			var currDateYear='';
				// 	if(checkfinancialyear){
				// 	  if(ddlFinancialYear != 'Select'){
				// 	     var splitfinanceYear = ddlFinancialYear.split('-')[1];
				// 	     currDateYear = splitfinanceYear;
				// 	  }
				// 	  else{
				// 		var currDate=new Date();
				// 		currDateYear=currDate.getFullYear();
				// 		var CurrMonth=currDate.getMonth();
				// 		if(CurrMonth > 2)
				// 		{
				// 			currDateYear=currDateYear+1;
				// 		}

				// 		}
				// 	}
				// else{
					var currDate=new Date();
					currDateYear=currDate.getFullYear();
					var CurrMonth=currDate.getMonth();
						if(CurrMonth > 2)
						{
							currDateYear=currDateYear+1;
						}

				// }

				/*var currDate=new Date();
				var currDateYear=currDate.getFullYear()
				var CurrMonth=currDate.getMonth();
				if(CurrMonth > 2)
				{
					currDateYear=currDateYear+1;
				}*/
				var findDate=currDateYear+"-3-31"
				var hdn31March=new Date(findDate);
	
				var date='';
				if(hdn31March > lastdateofInnvocation)
				{
					//date=hdn31March;
					date=lastdateofInnvocation;
				}
				else
				{
					date=hdn31March;
					//date=lastdateofInnvocation;
				}
				/*if(dateofLastInstall1 != undefined){
				if(dateofLastInstall1 > hdn31March)
					{
						date=hdn31March;
					}
					else
					{
						date=dateofLastInstall1;
					}
				}*/
		
		}
		else if(hdnTypeOfFacilityCGApp=="WC/CC Limit")
		{
			var DAteNPA = new Date(CGFeeEndDateNPA)
				var lockinPeriod = DAteNPA;
					var hdnDateofNPANew=new Date(hdnDateofNPA);
				var lstInnvocationDt='';
				if(!isNaN(lockinPeriod) && !isNaN(hdnDateofNPANew))
				{
					if(hdnDateofNPANew < lockinPeriod) 
					{
						//lstInnvocationDt=hdnDateofNPANew;
						lstInnvocationDt=lockinPeriod;
					}
					else
					{
						lstInnvocationDt=hdnDateofNPANew;
						//lstInnvocationDt=lockinPeriodNew;
					}
				}
				else
				{
						lstInnvocationDt=new Date();
				}
				
				var lastdateofInnvocation=lstInnvocationDt.setDate(lstInnvocationDt.getDate() + 365);
				lastdateofInnvocation=new Date(lastdateofInnvocation);
				var currDateYear='';
				// 	if(checkfinancialyear){
				// 	  if(ddlFinancialYear != 'Select'){
				// 	     var splitfinanceYear = ddlFinancialYear.split('-')[1];
				// 	     currDateYear = splitfinanceYear;
				// 	  }
				// 	  else{
				// 		var currDate=new Date();
				// 		currDateYear=currDate.getFullYear();
				// 		var CurrMonth=currDate.getMonth();
				// 		if(CurrMonth > 2)
				// 		{
				// 			currDateYear=currDateYear+1;
				// 		}

				// 		}
				// 	}
				// else{
					var currDate=new Date();
					currDateYear=currDate.getFullYear();
					var CurrMonth=currDate.getMonth();
						if(CurrMonth > 2)
						{
							currDateYear=currDateYear+1;
						}

				// }
	
				/*var currDate=new Date();
					var currDateYear=currDate.getFullYear()
					var CurrMonth=currDate.getMonth();
					if(CurrMonth > 2)
					{
						currDateYear=currDateYear+1;
					}*/
					var findDate=currDateYear+"-3-31"
					var hdn31March=new Date(findDate);
		
					var date='';
					if(hdn31March > lastdateofInnvocation)
					{
						//date=hdn31March;
						date=lastdateofInnvocation;
					}
					else
					{
						date=hdn31March;
						//date=lastdateofInnvocation;
					}

		}
			let lastChar = hdnCGStatus.substr(hdnCGStatus.length - 1);
		    //lastChar=parseInt(lastChar);
		    let nxtLevl = parseFloat(lastChar) + 1;
		
		    let firsttext = hdnCGStatus; 
		    let result = firsttext.substr(0, 8);
		    let finalresult = result+" "+nxtLevl;
		    CGStatus = finalresult; 

		
	}
	
    if (txtRemarksComments == '' || txtRemarksComments == null || txtRemarksComments == undefined) 
    {     
	  alert('Please Enter Remark')
	  return false;
     }
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
	 var hdnCGFeeEndDtNew=new Date(hdnCGFeeEndDt);
	 hdnCGFeeEndDtNew=hdnCGFeeEndDtNew.setDate(hdnCGFeeEndDtNew.getDate() + 1);
	 hdnCGFeeEndDtNew=new Date(hdnCGFeeEndDtNew);
	var difference = date.getTime() - hdnCGFeeEndDtNew.getTime();
	console.log(difference);
	var TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
	console.log(TotalDays + ' days to world Cup');
	//var IsPreNormalStatus="No";
	var IsPreNormalStatus="1";
	  if ((dateofClosure1 >= dateofLastInstall1) && (IRClassifications== "Standard" || IRClassifications== "Standard - 0 Days Past Due (DPD)" || IRClassifications== "SMA- 0" || IRClassifications== "SMA- 1" || IRClassifications== "SMA- 2") && hdnLoanClosed=="0") {
	    requestflag = true;
	    //IsPreNormalStatus="Yes";
		IsPreNormalStatus="0";
	    CGStatus = "Normal Closed";
	    hdnCGFeeEndDtNew=null;
	  	date=null;
	  	TotalDays='';

	  }
	  else if ((dateofClosure1 < dateofLastInstall1) && (IRClassifications== "Standard" || IRClassifications== "Standard - 0 Days Past Due (DPD)" || IRClassifications== "SMA- 0" || IRClassifications== "SMA- 1" || IRClassifications== "SMA- 2") && hdnLoanClosed=="0") {
	    requestflag = true;
	    //IsPreNormalStatus="Yes";
		IsPreNormalStatus="0";
	    CGStatus = "Pre Closed";
	    hdnCGFeeEndDtNew=null;
	  	date=null;
	  	TotalDays='';
	  }
	  else
	  {
	    //IsPreNormalStatus="No";
		IsPreNormalStatus="1";
	  }
	  var IsFeeeAlreadyPaid="No";
	  var IsFeeeAlreadyPaidFlag=false;
	  if ((hdnCGFeeEndDtNew > dateofLastInstall1) && (IRClassifications== "Standard" || IRClassifications== "Standard - 0 Days Past Due (DPD)" || IRClassifications== "SMA- 0" || IRClassifications== "SMA- 1" || IRClassifications== "SMA- 2")  && hdnLoanClosed=="1") {
	    IsFeeeAlreadyPaidFlag = true;
	    IsFeeeAlreadyPaid="Yes";
	    //CGStatus = "Pre Closed";
	    hdnCGFeeEndDtNew=hdnCGFeeEndDtNew;
	  	date=hdnCGFeeStartDt!=null && hdnCGFeeStartDt!="" ? new Date(hdnCGFeeStartDt) : null;
	  	TotalDays='';
	  }
	  //var hdnEnhancementDate=$('#hdnEnhancementDate').val();
	  	var currEnhDate=new Date();
		currEnhDateYear=currEnhDate.getFullYear();
		var CurrEnhMonth=currEnhDate.getMonth();
		if(CurrEnhMonth < 2)
		{
			currEnhDateYear=currEnhDateYear - 1;
		}
		var hdnEnhancementDate=currEnhDateYear+"-4-1";
	  if(hdnEnhancementDate!=null && hdnEnhancementDate!=undefined && hdnEnhancementDate!="")
	  {
		var hdnEnhancementDateNew=new Date(hdnEnhancementDate)
	  }
	  var cgfeeStartDateNew=null;
	  var typeofrequest="";
	  if(hdnCGStatus=="In Force 0" && hdnTypeOfFacilityCGApp=="WC/CC Limit")
	  {
				var CalCGFeeDate=new Date(hdnCGFeeEndDt);
				CalCGFeeDateYr=CalCGFeeDate.getFullYear();

				var findDate=CalCGFeeDateYr+"-3-31"
				var hdn31MarchCal=new Date(findDate);
				if(CalCGFeeDate > hdn31MarchCal)
				{
					cgfeeStartDateNew=hdnEnhancementDateNew;
					typeofrequest="2";
					if((hdnEnhancementDateNew != null && hdnEnhancementDateNew != undefined && hdnEnhancementDateNew != "") && (CalCGFeeDate != null && CalCGFeeDate != undefined && CalCGFeeDate != "" ) && (date != null && date != undefined && date != "" ))
					{
						var differenceCGFee = CalCGFeeDate.getTime() - hdnEnhancementDateNew.getTime();
						var differnceInDaysCGFee = Math.ceil(differenceCGFee / (1000 * 3600 * 24));
						console.log(differnceInDaysCGFee + ' days of Enhancement Date to CG Fee End Date');	

						var differenceCGFeeNext = date.getTime() - CalCGFeeDate.getTime();
						var differnceInDaysCGFeeNext = Math.ceil(differenceCGFeeNext / (1000 * 3600 * 24));
						console.log(differnceInDaysCGFeeNext + ' days of Enhancement Date to CG Fee End Date');	
						TotalDays = parseFloat(differnceInDaysCGFee) + parseFloat(differnceInDaysCGFeeNext)
					}
					else
					{
						cgfeeStartDateNew=hdnCGFeeEndDtNew;
						typeofrequest="1";
					}
				}
	  
	  else
	  {
		cgfeeStartDateNew=hdnCGFeeEndDtNew;
		typeofrequest="1";
		differnceInDaysCGFee = 0;
		differnceInDaysCGFeeNext= 0;
	  }
	}
	else
	  {
		cgfeeStartDateNew=hdnCGFeeEndDtNew;
		typeofrequest="1";
		differnceInDaysCGFee = 0;
		differnceInDaysCGFeeNext= 0;
	  }
	if(status == 'Sent Back by ELI Checker' || status == 'Rejected by ELI Checker')
	{
		if(status == "Sent Back by ELI Checker")
	  {
		status = "4";	  
	  }
	  if(status =='Rejected by ELI Checker')
	  {
		status = "5";
	  }
	  
			Data = JSON.stringify(
		    {		        
				 "cr6fc_status":status,
				 "cr6fc_elicheckerremark":txtELICheckerRemark
				 
		    });

	}
	else if(status == 'Submitted to NabSanrakshan')
	{
		if(status = 'Submitted to NabSanrakshan')
		{
			Vstatus = "6";
		}
			Data = JSON.stringify(
		    {
		        
				//"cr6fc_status": Vstatus,
				"cr6fc_elicheckerremark":txtELICheckerRemark,
				"cr6fc_NSChecker_contact@odata.bind": "/contacts(" + NSCheckerApprover + ")", 
				"cr6fc_cgfeeenddate":date,
				"cr6fc_cgfeestartdate":cgfeeStartDateNew,
				"cr6fc_isprenormalstatus":IsPreNormalStatus,
				"cr6fc_submissiondate":new Date(),
				"cr6fc_cgfeeindays":''+TotalDays,
				"cr6fc_lastdateforinvocation":lastdateofInnvocation,
				"cr6fc_isfeeealreadypaid":IsFeeeAlreadyPaid,
				"cr6fc_lockinperiod":lockinPeriodNew,
				// "cr6fc_typeofrequest":typeofrequest,
				// "cr6fc_alreadytakencgfeedays":''+differnceInDaysCGFee,
				// "cr6fc_remainingcgfeesindays":''+differnceInDaysCGFeeNext		 
				"cr6fc_typeofrequest":typeofrequest,
				"cr6fc_alreadytakencgfeedays":''+differnceInDaysCGFee,
				"cr6fc_remainingcgfeesindays":''+differnceInDaysCGFeeNext		 
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

		//url: "/_api/cr6fc_renewalcgapplications("+vItemID+")",
		url: "/_api/cr6fc_renewalcgapplications("+vItemID+")",
		type: "PATCH",
		async: false,
		data: Data,
		headers: header,
		
		success: function (data,textStatus,xhr)
		{
			SubStatus = '6';
			var cgappicationentity = xhr.getResponseHeader('entityid');
	       	 if(status == 'Submitted to NabSanrakshan')
	       	 {
				fileInput = $('#ELIChekerAttach');
				otherfileArray=[];						   
				$("#attachFilesHolder input:file").each(function () {
				if ($(this)[0].files[0]) {
				otherfileArray.push({ "Attachment": $(this)[0].files[0] });
				}
				});
				AttchLength= otherfileArray.length;
				if(AttchLength != 0)
				{							   							   
					updatecgappfile(vItemID)
				}
	       	 			alert('Approved Succesfully');

	       	 			$("#inputDialog2").dialog({
						autoOpen: false,
						modal: true,
						dialogClass: "noclose",
						closeOnEscape: false,						               
						show: { effect: "clip", duration: 200 }
						});
						
						$("#inputDialog2").dialog("open");												   

						 
						//    else
						//    {
						// 	//window.location.href = location.origin + "/RefreshingCache/?id="+cgappicationentity+"&tbl=cr6fc_renewalcgapplications&col=cr6fc_cacherefreshedon&red=ELICheckerDBRenewal";
						// 	// window.location.href=location.origin+"/ELICheckerDBRenewal/";
						//    }
			}
			else if(status == '5'){
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
					//url: "/_api/cr6fc_cgapplicationses(" + CGID + ")",
					url: "/_api/cr6fc_cgaplications(" + CGID + ")",
					type: "PATCH",
					async: false,
					data: CGData1,
					headers: header,
					success: function (data, textStatus, xhr) {
						cgappentitid = xhr.getResponseHeader('entityid');
							alert('Request Rejected');
							window.location.href=location.origin+"/ELICheckerDBRenewal/";								// window.location.href=location.origin + "/NSApproverDBRenewal/";		
					},
					error: function (e) {
						console.log(e);
					}
				});

			}
			else
			{
				alert('Item Updated Succesfully');
				window.location.href=location.origin+"/ELICheckerDBRenewal/";	

			}		                 
	    },
	    error: function (e) 
	    {
	    	console.log(e);
	    }
	    
	   })
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

//Attachment
function updatecgappfile(vItemID){
	var data = JSON.stringify(
		{
			"cr6fc_cgid": vItemID,
			"cr6fc_name":"RenewalELIChecker",
			"cr6fc_type":"CGRenewal",			
		});
	//document.getElementById("txtApplicantID").value,
	shell.getTokenDeferred().done(function(token){
		console.log(token)
		var header = {
			__RequestVerificationToken: token,
			contentType: "application/json;odata=verbose"
		}
		$.ajax({
			// url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CGApplications')/items",
			//url: "/_api/cr6fc_renewalappfiles",
			url: "/_api/cr6fc_renewalappfiles",
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


function getFileContentsAndMetadata(entityID,token,CGFileID) {
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
        reader.onload = function(e) {
            // The browser has finished reading the file, we can now do something with it...
            var fileContent = e.target.result;
            // Run the function to upload to the Portal Web API, passing the GUID of the newly created record and the file's contents and name as inputs
            uploadFile(fileContent,fileName,CGFileID,token,file.type,file);
        };
    }
}
var updatefileid;
// Upload the file to
function uploadFile(fileContent,fileName,CGFileID,token,Filecontenttype) {		
		var header={__RequestVerificationToken:token,
        Accept: 'application/json;odata=verbose',
		XRequestDigest: $("#__REQUESTDIGEST").val(),
		
	}
$.ajax({
	//url: "/_api/cr6fc_renewalappfiles(" + CGFileID + ")/cr6fc_attachment?x-ms-file-name=" + fileName,
	url: "/_api/cr6fc_renewalappfiles(" + CGFileID + ")/cr6fc_attachment?x-ms-file-name=" + fileName,
	type: "PUT",
	async: false,
	contentType: "application/octet-stream",
	processData: false,	
	data: fileContent,
	headers: header,
	success: function (data, textStatus, xhr) {
		updatefileid = xhr.getResponseHeader('entityid');
		// window.location.href = location.origin + "/RefreshingCache/?id="+updatefileid+","+cgappicationentity+"&tbl=cr6fc_renewalappfiles,cr6fc_renewalcgapplications&col=cr6fc_cacherefreshedon&red=ELICheckerCGFeesDashboard";
		// window.location.href= location.origin+"/ELICheckerDBRenewal/";		                 

	},
	error: function (xhr, textStatus, errorThrown) {
		console.log(errorThrown)
	}
});
}

//Binding Attachment 
function getfileELIMaker(vItemID)
{
	//var queryrequest = location.origin+"/_api/cr6fc_renewalappfiles?$select=cr6fc_renewalappfileid,cr6fc_attachment&$filter=cr6fc_cgid eq '" + vItemID + "' and cr6fc_name eq 'EliMakerRenewal'";
	var queryrequest = location.origin+"/_api/cr6fc_renewalappfiles?$select=cr6fc_renewalappfileid,cr6fc_attachment&$filter=cr6fc_cgid eq '" + vItemID + "' and cr6fc_name eq 'EliMakerRenewal'";
	$.ajax({
	   
	   // url: "/_api/cr6fc_cgapplicationses("+vItemID+")/cr6fc_nscheckercgappfile",
	   url: queryrequest,
	   contentType: "application/json",
	   async: false,
	   success: function (res) {
		  console.log(res);
		  var Logg = res.value;
		  var vhtml1 = '';
		  if (Logg.length > 0) {
			 $("#NSApproverAttach").show();
			 for (var i = 0; i < Logg.length; i++) {
				//var cgappfilename12 = Logg[i].cr6fc_nscheckerfile_name
				var cgappfilename12 = Logg[i].cr6fc_nscheckerfile_name
				//vhtml1 += "<a href='/_api/cr6fc_renewalappfiles(" + Logg[i].cr6fc_renewalappfileid + ")/cr6fc_attachment/$value'>" + Logg[i].cr6fc_attachment_name + "</a></br>";
				vhtml1 += "<a href='/_api/cr6fc_renewalappfiles(" + Logg[i].cr6fc_renewalappfileid + ")/cr6fc_attachment/$value'>" + Logg[i].cr6fc_attachment_name + "</a></br>";
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

function getfileELIChecker(vItemID)
{
	$.ajax({
	type: "GET",
    // url: "/_api/cr6fc_cgapplicationses("+vItemID+")/cr6fc_nscheckercgappfile",
    url:"/_api/cr6fc_renewalappfiles?$select=*&$filter=cr6fc_cgid eq ("+vItemID+") and cr6fc_name eq 'ELIChecker'",
    contentType:"application/json",
	async: false,
    success: function(res) {
        console.log(res);
		var Logg = res.value;
		var vhtml1='';
		if(Logg.length>0){
			$("#ELICheckerAttch").show();
          for(var i = 0;i<Logg.length;i++){
			var cgappfilename12 = Logg[i].cr6fc_nscheckerfile_name
			vhtml1+="<a href='/_api/cr6fc_renewalappfiles(" + Logg[i].cr6fc_renewalappfileid + ")/cr6fc_attachment/$value'>"+Logg[i].cr6fc_attachment_name+"</a></br>";

		  }
		  $('#additionalDocs2').append(vhtml1);
		}
		
    },
    error: function(xhr, status, error){
        var errorMessage = xhr.status + ': ' + xhr.statusText;
        console.log(errorMessage);
		}
	});
}