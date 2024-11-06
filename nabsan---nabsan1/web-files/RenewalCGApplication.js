var loggedInUserId = '';
var loggedInUserName = '';
var loggedInUserEmail = '';
$(document).ready(function () {
    loggedInUserId = $('#fpo-user-contact-id').val();
	loggedInUserName = $('#fpo-user-contact-name').val();
	loggedInUserEmail = $('#fpo-user-email').val();
vItemID= GetQueryStingValue()["Item"];
BindFPOActivities();
BindRegion();
//$('#ELIChekerAttach').multifile();
BindCGPAN(vItemID);
bindCGApplicationData(vItemID);
facility();
BindELIMaker();


	
	
  	function DisbursmentLoan(selectedValue) {
    if (selectedValue == 'No') 
    {
		$('#3').hide();
		$('#5').hide();
		$('#6').hide();
		$('#7').hide();
		$('#8').hide();
    } 
    else 
    {
        $('#3').show();
		$('#5').show();
		$('#6').show();
		$('#7').show();
		$('#8').show();

    }
 	}

    
  	$('#DisbursmentLoan').on('change', function() {
	var selectedValue = $(this).val();
	DisbursmentLoan(selectedValue);
	});
	
	function Limitoperational(selectedValue3) {
    if (selectedValue3 === 'No') 
    {
		$('#22').hide();
    } 
    else 
    {
        $('#22').show();
    }
 	}
 	
  	
  	function UtilisationLimit(selectedValue5)
	{
	if (selectedValue5 === 'No') 
    { $('#202').hide();}
    if (selectedValue5 === 'Yes') 
    { $('#202').show();}}
    
	$('#UtilisationLimit').on('change', function() 
	{
	var selectedValue5 = $(this).val();
	UtilisationLimit(selectedValue5);
	});
  	
  	$('#Limitoperational').on('change', function() {
	var selectedValue3 = $(this).val();
	Limitoperational(selectedValue3);
	});

  
  	function LoanClosed(selectedValue2) {
    if (selectedValue2 === 'No') 
    { $('#10').hide();}
    if (selectedValue2 === 'Yes') 
    { $('#10').show();}}
    
	$('#LoanClosed').on('change', function() 
	{
	var selectedvalue2 = $(this).val();
	LoanClosed(selectedvalue2);
	});	
	
	function EndLimitClosed2(selectedValue4)
	{
	if (selectedValue4 === 'No') 
    { $('#201').hide();}
    if (selectedValue4 === 'Yes') 
    { $('#201').show();}}
    
	$('#EndLimitClosed2').on('change', function() 
	{
	var selectedvalue4 = $(this).val();
	EndLimitClosed2(selectedvalue4);
	});
	
	
    function IRACclassification1(IRACStat) 
    {
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
	}
	    
	$('#IRACclassification').on('change', function() 
	{
		var IRACStat = $(this).val();
		IRACclassification1(IRACStat);
	});
	
	var today = new Date();
    var dd1 = String(today.getDate()).padStart(2,'0');
    var mm = String(today.getMonth() + 1).padStart(2,'0');
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd1;
    $('#DateofNPA').attr('max',today);
    $('#DateClosureLimit2').attr('max',today);
    $('#DateclosureLoan').attr('max',today);
    $('#DatefirstWithdrawl').attr('max',today);

});

 	
function BindFPOActivities() {
	var requestUri = location.origin + "/_api/cr6fc_fpoactivitiesmasters?$select=*";

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
	var requestUri = location.origin + "/_api/cr6fc_regionmasters?$select=*";
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
					var RegionOfFPO = document.getElementById("RegionOfFPO1");
					RegionOfFPO.options.length = 0;
					RegionOfFPO.options[RegionOfFPO.options.length] = new Option("Select", "0");
					for (var i = 0; i < items.length; i++) {
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

function facility()
{
					if($("#TypeofFacility option:selected").text() == "Term Loan OR WCTL (Working Capital Term Loan)")
					{
						$("#2").hide();	            
					}
					else if($("#TypeofFacility option:selected").text() == "WC/CC Limit")
					{
						$("#1").hide();
					}
}

function cancel()
{

window.location.href=location.origin + "/CGRenewalApplications/";

}
 function bindRenewalCGApplicationData(vItemID){    
    var requestUri =location.origin + "/_api/cr6fc_renewalcgapplications?$top=500&$select=*&$filter=cr6fc_parentid eq '"+vItemID+"'";
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
              		if(Logg[data.value.length -1].cr6fc_cgfeeenddate!=null && Logg[data.value.length -1 ].cr6fc_cgfeeenddate!='' && Logg[data.value.length - 1].cr6fc_cgfeeenddate!=undefined)
              		{
              		$("#hdnCGFeeRenewalCGApplicationDt").val(Logg[data.value.length -1].cr6fc_cgfeeenddate);
              		}
                       /* $('#Loanfullydisbursed').val(Logg[0]['cr6fc_loanfullydisbured@OData.Community.Display.V1.FormattedValue'])
                  if(Logg[0]['cr6fc_loanfullydisbured@OData.Community.Display.V1.FormattedValue'] == "Yes"){
                     $('#Loanfullydisbursed').prop('disabled', true);
                  }*/
                  if(Logg[0].cr6fc_dateoffirstdisbursement != null){
                     //$('#Date').val(Logg[0].cr6fc_dateoffirstdisbursement.substring(0, Logg[0].cr6fc_dateoffirstdisbursement.indexOf("T")));
                     const DateFirst = new Date(Logg[0].cr6fc_dateoffirstdisbursement);
                     const formateDateFirst = DateFirst.toISOString().slice(0, 10);
                     document.getElementById("Date").value = formateDateFirst;
                     $('Date').prop('disabled',true);
                      }
                  
                  if(Logg[0].cr6fc_principaloutstanding != null){
                           $('#PrincipalOutstanding').val(Logg[0].cr6fc_principaloutstanding)
                  }
                  if(Logg[0].cr6fc_loanfullydisbured != null)  {
                     $('#Loanfullydisbursed').val(Logg[0]['cr6fc_loanfullydisbured@OData.Community.Display.V1.FormattedValue']);
                     if(Logg[0]['cr6fc_loanfullydisbured@OData.Community.Display.V1.FormattedValue'] =='Yes'){
                        $('#Loanfullydisbursed').prop('disabled',true);
                     } 
                  }  
                  if(Logg[0].cr6fc_disbursmentunderloan != null || Logg[0].cr6fc_disbursmentunderloan !=''|| Logg[0].cr6fc_disbursmentunderloan != undefined)  {
                     $('#DisbursmentLoan').val(Logg[0]['cr6fc_disbursmentunderloan@OData.Community.Display.V1.FormattedValue']);
                     if(Logg[0]['cr6fc_disbursmentunderloan@OData.Community.Display.V1.FormattedValue'] =='Yes'){
                        $('#DisbursmentLoan').prop('disabled',true);
                     }             
                       } 
                       
                       if(Logg[0].cr6fc_enddateofinterestmoratium != null){
                        const dateofinterest1 = new Date(Logg[0].cr6fc_enddateofinterestmoratium);
                        const dateofinterestmoretoriam2 = dateofinterest1.toISOString().slice(0, 10);
                        //document.getElementById("DateOfRegistration").value = formattedDate2;
                        $('#EndDateinterest').val(dateofinterestmoretoriam2)
                        $('#EndDateinterest').prop('disabled',true);

                     }

                     if(Logg[0].cr6fc_enddateofprinciplemoratium != null){
                        const dateofendprinciple = new Date(Logg[0].cr6fc_enddateofprinciplemoratium);
                        const dateofendprinciplemoretorium = dateofendprinciple.toISOString().slice(0, 10);
                        //document.getElementById("DateOfRegistration").value = formattedDate2;
                        $('#EndDateprincipal').val(dateofendprinciplemoretorium);
                        $('#EndDateprincipal').prop('disabled',true);

                     }
                     if(Logg[0].cr6fc_dateoflastinstalment != null){
                        const dateoflast1 = new Date(Logg[0].cr6fc_dateoflastinstalment);
                        const dateoflastinstallment1 = dateoflast1.toISOString().slice(0, 10);
                        //document.getElementById("DateOfRegistration").value = formattedDate2;
                        $('#DatelastInstalment').val(dateoflastinstallment1);
                        $('#DatelastInstalment').prop('disabled',true);
                     }
                     if(Logg[0].cr6fc_iracclassificationoftheaccount!= null || Logg[0].cr6fc_iracclassificationoftheaccount!=''){
                        $('#IRACclassification').val(Logg[0]['cr6fc_iracclassificationoftheaccount@OData.Community.Display.V1.FormattedValue']);
                       
                        // IRACclassification1(Logg[0]['cr6fc_iracclassificationoftheaccount@OData.Community.Display.V1.FormattedValue']);
                              var IRACStat= Logg[0]['cr6fc_iracclassificationoftheaccount@OData.Community.Display.V1.FormattedValue'];
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
                     }

                     if(Logg[0].cr6fc_dateofnpa != null){
                        const dateofNpa = new Date(Logg[0].cr6fc_dateofnpa);
                        const DateOfNPA1 = dateofNpa.toISOString().slice(0, 10);
                        //document.getElementById("DateOfRegistration").value = formattedDate2;
                        $('#DateofNPA').val(DateOfNPA1);
                       // $('#DatelastInstalment').prop('disabled',true);
                     }

                     //wc-cc
                     if(Logg[0].cr6fc_dateofmodifiedsanction != null){
                        const dateofmodified = new Date(Logg[0].cr6fc_dateofmodifiedsanction);
                        const dateofmodifiedsanction = dateofmodified.toISOString().slice(0, 10);
                        $('#DateModifiedSanction').val(dateofmodifiedsanction)
                     }
                     if(Logg[0].cr6fc_utilisationunderlimit != null || Logg[0].cr6fc_utilisationunderlimit != undefined){
                        $('#UtilisationLimit').val(Logg[0]['cr6fc_utilisationunderlimit@OData.Community.Display.V1.FormattedValue'])
                        if(Logg[0]['cr6fc_utilisationunderlimit@OData.Community.Display.V1.FormattedValue'] == 'Yes'){
                                 $('#UtilisationLimit').prop('disabled',true);
                        }
                     }
                     if(Logg[0].cr6fc_dateoffirstwithdrawal != null){
                        const dateoffirstw = new Date(Logg[0].cr6fc_dateoffirstwithdrawal);
                        const dateoffirstWithdrawal = dateoffirstw.toISOString().slice(0, 10);
                        $('#DatefirstWithdrawl').val(dateoffirstWithdrawal)  
                     }
                     
                     if(Logg[0].cr6fc_dateoflimitvalidity != null){
                        const validityend1 = new Date(Logg[0].cr6fc_dateoflimitvalidity);
                        const vslidityenddate2 = validityend1.toISOString().slice(0, 10);
                        document.getElementById("DateLimitValidity").value = vslidityenddate2;
                     }

                     if(Logg[0].cr6fc_limitclosed != null || Logg[0].cr6fc_limitclosed != undefined){
                        $('#EndLimitClosed2').val(Logg[0]['cr6fc_limitclosed@OData.Community.Display.V1.FormattedValue']);
                        if(Logg[0]['cr6fc_limitclosed@OData.Community.Display.V1.FormattedValue'] == "Yes"){
                           $('#EndLimitClosed2').prop('disabled',true);
                      }
                     }
                     if(Logg[0].cr6fc_peakoutstanding != null || Logg[0].cr6fc_peakoutstanding != undefined){
                        $('#PeakOutstanding2').val(Logg[0].cr6fc_peakoutstanding)
                     }
                     if(Logg[0].cr6fc_limitoperational != null || Logg[0].cr6fc_limitoperational != undefined){
                        $('#Limitoperational').val(Logg[0]['cr6fc_limitoperational@OData.Community.Display.V1.FormattedValue'])
                     }
                   }    
	        }
            catch (e) {         
               console.log(e )                      
            }
        },
        error: function () {
            console.log("error");
        }
    });  
    
}

function bindCGApplicationData(vItemID){    
    //var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CGApplications')//items?$top=5000&$select=*,FPOActivities111/FPOActivity,RegionOfFPO/ID,FPOState/ID,BusinessFPOState/Id,Title&$expand=RegionOfFPO,FPOActivities111,FPOState,BusinessFPOState&$filter=(ID eq '"+vItemID+"')";
    var requestUri = location.origin + "/_api/cr6fc_cgaplications?$top=5000&$select=cr6fc_outstandingamountondate,cr6fc_duedateoflastinstallmen,cr6fc_enddateofprinciplemoratium,cr6fc_enddateofinterestmoratium,cr6fc_outstandingamountondate,cr6fc_loanfullydisbured,cr6fc_guaranteestartdate,cr6fc_cgfeestartdate,cr6fc_guaranteeenddate,cr6fc_FPOState,cr6fc_BusinessFPOState,cr6fc_RegionOfFPO,cr6fc_cgaplicationid,cr6fc_name,cr6fc_paymentreceiveddate,cr6fc_validityenddate,cr6fc_nameoffpo,cr6fc_panfpo,cr6fc_customerid,cr6fc_farmermembersize,cr6fc_typeoffacility,cr6fc_sanctionedamount,cr6fc_dateofsanction,cr6fc_cgfeeenddate,cr6fc_totalfpomember,cr6fc_totalmembernorthen,cr6fc_cgstatus,cr6fc_accountno&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=(cr6fc_cgaplicationid eq " + vItemID + ")";
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
                        $("#hdnCGApplicationno").val(Logg[0].cr6fc_name);
                        $("#hdnTitle").val(Logg[0].cr6fc_name);
                        // $('#hdnGurenteeEndDt').val(Logg[0].cr6fc_guaranteeenddate);
                        if(Logg[0].cr6fc_guaranteeenddate != null || Logg[0].cr6fc_guaranteeenddate != undefined){
                           document.getElementById("hdnGurenteeEndDt").value = Logg[0].cr6fc_guaranteeenddate.substring(0, Logg[0].cr6fc_guaranteeenddate.indexOf("T"));;                        	              	
                        }
                        if(Logg[0].cr6fc_guaranteestartdate != null || Logg[0].cr6fc_guaranteestartdate != undefined) {
                           document.getElementById("hdnGurenteeStartDt").value = Logg[0].cr6fc_guaranteestartdate.substring(0, Logg[0].cr6fc_guaranteestartdate.indexOf("T"));;                        	              	
                        }
						$("#hdnValidityEndDate").val(Logg[0].cr6fc_validityenddate);
	              		$("#txtNameOfFPO").val(Logg[0].cr6fc_nameoffpo);
						$("#PANFPO").val(Logg[0].cr6fc_panfpo);
						$("#CustomerID").val(Logg[0].cr6fc_customerid);                        
                // $("#RegionOfFPO").val(Logg[0].cr6fc_RegionOfFPO.cr6fc_regionmasterid);  .val
                // $("#RegionOfFPO").val(Logg[0].cr6fc_RegionOfFPO.cr6fc_regionmasterid);  .val
                $('#RegionOfFPO1').val(Logg[0].cr6fc_RegionOfFPO.cr6fc_regionmasterid);         						
					//	document.getElementById('RegionOfFPO1').value = Logg[0].cr6fc_RegionOfFPO.cr6fc_regionmasterid;
                $("#FarmerMemberSize").val(Logg[0].cr6fc_farmermembersize);
						$("#FarmerMemberSize1").val(Logg[0].cr6fc_farmermembersize);
                        $("#TypeofFacility").val(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue']);              	    
	              	   	$("#SanctionedAmount").val(Logg[0].cr6fc_sanctionedamount);
	              	   	$('#SanctionedAmount').text(Math.ceil(Logg[0].cr6fc_sanctionedamount));
                        var Word=convertNumberToWords(Math.ceil(Logg[0].cr6fc_sanctionedamount));                
                        $('#SanctionedAmountinwords').text("Rupees " + " " + Word + " " + "Only" );                   
						$("#AccountNo").val(Logg[0].cr6fc_accountno);	              	    
	              	    $('#ModifiedSanctionedAmount').val(Logg[0].cr6fc_sanctionedamount);	              	
	              	    $('#ModifiedSanctionedAmount').text(Math.ceil(Logg[0].cr6fc_sanctionedamount));
	              	    $('#ModifiedSanctionedAmount1').val(Math.ceil(Logg[0].cr6fc_sanctionedamount));
                        var Words=convertNumberToWords(Math.ceil(Logg[0].cr6fc_sanctionedamount));                 
                        $('#ModifiedSanctionedAmountiinwords').text("Rupees " + " " + Words + " " + "Only" );                   
	              	    $('#hdnsanctiondate').val(Logg[0].cr6fc_dateofsanction);	              	    	              	    
	              	   // $('#hdnCGFeeCGApplicationDt').val(Logg[0].cr6fc_cgfeeenddate);
                       document.getElementById("hdnCGFeeCGApplicationDt").value = Logg[0].cr6fc_cgfeeenddate.substring(0, Logg[0].cr6fc_cgfeeenddate.indexOf("T"));                      	              	
                       $('#hdnTotalFPOPlainMember').val(Logg[0].cr6fc_totalfpomember);
	              	    $('#hdnTotalFPONorthenMember').val(Logg[0].cr6fc_totalmembernorthen);
	              	    $('#hdnCGStatus').val(Logg[0].cr6fc_cgstatus);
                      $('#CGfeeStartDate').val(Logg[0].cr6fc_cgfeestartdate);
                        document.getElementById("SanctionDate").value = Logg[0].cr6fc_dateofsanction.substring(0, Logg[0].cr6fc_dateofsanction.indexOf("T"));   
                        if(Logg[0].cr6fc_outstandingamountondate != null || Logg[0].cr6fc_outstandingamountondate !=''|| Logg[0].cr6fc_outstandingamountondate != undefined)  {
                           $('#PrincipalOutstanding').val(Logg[0].cr6fc_outstandingamountondate);
                           $('#PeakOutstanding2').val(Logg[0].cr6fc_outstandingamountondate)
                        }
                            if(Logg[0].cr6fc_ccoutstandingamountondate != null || Logg[0].cr6fc_ccoutstandingamountondate !=''|| Logg[0].cr6fc_ccoutstandingamountondate != undefined)  {
                           //$('#PrincipalOutstanding').val(Logg[0].cr6fc_outstandingamountondate);
                           $('#PeakOutstanding2').val(Logg[0].cr6fc_ccoutstandingamountondate)
                        } 

                        if(Logg[0].cr6fc_loanfullydisbured != null || Logg[0].cr6fc_loanfullydisbured !=''|| Logg[0].cr6fc_loanfullydisbured != undefined)  {
                           $('#Loanfullydisbursed').val(Logg[0]['cr6fc_loanfullydisbured@OData.Community.Display.V1.FormattedValue']);
                           $('#DisbursmentLoan').val(Logg[0]['cr6fc_loanfullydisbured@OData.Community.Display.V1.FormattedValue']);
                           if(Logg[0]['cr6fc_loanfullydisbured@OData.Community.Display.V1.FormattedValue'] =='Yes'){
                              $('#DisbursmentLoan').prop('disabled',true);
                              $('#Loanfullydisbursed').prop('disabled',true);

                           }
                        }       
                     if(Logg[0].cr6fc_enddateofinterestmoratium != null){
                        const dateofinterest = new Date(Logg[0].cr6fc_enddateofinterestmoratium);
                        const dateofinterestmoretoriam = dateofinterest.toISOString().slice(0, 10);
                        //document.getElementById("DateOfRegistration").value = formattedDate2;
                        $('#EndDateinterest').val(dateofinterestmoretoriam);
                        $('#EndDateinterest').prop('disabled',true);

                     }
                     if(Logg[0].cr6fc_enddateofprinciplemoratium != null){
                        const dateofendprinciple1 = new Date(Logg[0].cr6fc_enddateofprinciplemoratium);
                        const dateofendprinciplemoretorium1 = dateofendprinciple1.toISOString().slice(0, 10);
                        //document.getElementById("DateOfRegistration").value = formattedDate2;
                        $('#EndDateprincipal').val(dateofendprinciplemoretorium1);
                        $('#EndDateprincipal').prop('disabled',true);

                     }
                     if(Logg[0].cr6fc_duedateoflastinstallment != null){
                        const dateoflast = new Date(Logg[0].cr6fc_duedateoflastinstallment);
                        const dateoflastinstallment = dateoflast.toISOString().slice(0, 10);
                        //document.getElementById("DateOfRegistration").value = formattedDate2;
                        $('#DatelastInstalment').val(dateoflastinstallment);
                        $('#DatelastInstalment').prop('disabled',true);

                     }
                     if(Logg[0].cr6fc_validityenddate != null){
                        const validityend = new Date(Logg[0].cr6fc_validityenddate);
                        const vslidityenddate = validityend.toISOString().slice(0, 10);
                        document.getElementById("DateLimitValidity").value = vslidityenddate;
                     }
              
                     /* const date2 = new Date(Logg[0].cr6fc_dateofregistration);
                        const formattedDate2 = date2.toISOString().slice(0, 10);
                        document.getElementById("DateOfRegistration").value = formattedDate2;
                         }*/
                         if(Logg[0].cr6fc_loanfullydisbured != null || Logg[0].cr6fc_loanfullydisbured != undefined){
                           $('#UtilisationLimit').val(Logg[0]['cr6fc_loanfullydisbured@OData.Community.Display.V1.FormattedValue'])
                           if(Logg[0]['cr6fc_loanfullydisbured@OData.Community.Display.V1.FormattedValue'] == 'Yes'){
                                    $('#UtilisationLimit').prop('disabled',true);
                           }
                        }
                        if(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'] == 'WC/CC Limit'){
                        BindWCApplication(Logg[0].cr6fc_panfpo)
                        }
	              	    bindRenewalCGApplicationData(Logg[0].cr6fc_cgaplicationid)

						              	                  	                   
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
function BindWCApplication(CGPAN) {
	var requestUri = location.origin + "/_api/cr6fc_wcapplicationses?$select=*&$filter=cr6fc_panfpo eq '" +CGPAN+ "'";
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
			CGPAN = data.value;
			if(CGPAN.length>0)
		            {	
		            	if(CGPAN[0].cr6fc_modifiedsanctionedamount != null){
                        $('#ModifiedSanctionedAmount1').val(CGPAN[0].cr6fc_modifiedsanctionedamount)
                     }
                     if(CGPAN[0].cr6fc_newdateofmodifedsanction != null){
                        const newmode = new Date(CGPAN[0].cr6fc_newdateofmodifedsanction);
                        const newmodification = newmode.toISOString().slice(0, 10);
                        document.getElementById("DateModifiedSanction").value = newmodification;
                     }
		            }
		},
		error: function () {
			console.log("error");
		}
	});
}

var LoggELIMaker;
function BindELIMaker() {
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
				$('#hdnlendingInstitute').val(LoggELIMaker[0].cr6fc_lendinginstitute);
				$('#ELICheckerEmail').val(LoggELIMaker[0].cr6fc_elicheckeremailid);
			}
			else {
				alert('You dont have a Permission')
				

			}
		},
		error: function () {
			console.log("error");
		}
	});
}

var CGPAN;
function BindCGPAN() {
	var requestUri = location.origin + "/_api/cr6fc_taxinvoiceses?$select=cr6fc_cgid,cr6fc_cgpan&$filter=cr6fc_cgid eq '" +vItemID+ "'";
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
			CGPAN = data.value;
			if(CGPAN.length>0)
		            {	
		            	$('#CGPAN').val(CGPAN[0].cr6fc_cgpan);
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
	// var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CounterMaster')//items?$top=500&$select=CGApplicationNo,ID,Title&$filter=Title eq 'CGApplication' and Entrytype eq 'Renewal'&$orderby=CGApplicationNo desc";
	var requestUri = location.origin + "/_api/cr6fc_countermasters?$top=500&$select=cr6fc_name,cr6fc_entrytype,cr6fc_cgapplicationno,cr6fc_countermasterid&$filter=cr6fc_name eq 'CGApplication' and cr6fc_entrytype eq 2";
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
					var ItemId = Logg[0].cr6fc_cgapplicationno;

					hdnCounter = parseInt(ItemId) + 1;
					vRetVal = 'CGAFPO' + dd + '' + calmonth + '' + yyyy + '000' + hdnCounter;
					document.getElementById("hdnDigitalRequestNo").value = vRetVal;
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


var ModifiedSanctionedAmount;
var PeakOutstanding2;
function ModifiedSanctionedAmountss(){
       ModifiedSanctionedAmount = $("#ModifiedSanctionedAmount").val();
       var World=convertNumberToWords(Math.ceil(ModifiedSanctionedAmount));
       $('#ModifiedSanctionedAmountiinwords').text("Rupees " + " " + World+ " " + "Only" );
}

function PeakOutstanding(){
    PeakOutstanding2 = $("#PeakOutstanding2").val();
       var PeakOutstanding2inword =convertNumberToWords(Math.ceil(PeakOutstanding2));
       $('#PeakOutstandinginwords').text("Rupees " + " " + PeakOutstanding2inword+ " " + "Only" );
}
function PrincipalOutstandinginwords(){
  var PrincipalOutstanding= $("#PrincipalOutstanding").val();
       var PrincipalOutstandinginword =convertNumberToWords(Math.ceil(PrincipalOutstanding));
       $('#PrincipalOutstandinginwords').text("Rupees " + " " + PrincipalOutstandinginword+ " " + "Only" );
}

var renewalentityid;
var successId;
function Submit(status) 
{
  
   var SubStatus='';
   if (status == "Draft") 
   {
      SubStatus = "Saved";
   } 
   else if (status == "Submitted") 
   {
      SubStatus = "Pending for Approval";
   }
   var SanctionDate = $("#SanctionDate").val();
   var txtNameOfFPO = $("#txtNameOfFPO").val();
   var CGPAN = $("#CGPAN").val();
   var CGApplicationno = $("#hdnCGApplicationno").val();
   var PANFPO = $("#PANFPO").val();
   var CustomerID = $("#CustomerID").val();
   var RegionOfFPO = $("#RegionOfFPO1").val();
   var TypeofFacility = $("#TypeofFacility").val();     
   var txtmakerComment = $("#txtmakerComment").val();
   var Parentid = vItemID;
   var Title = $("#hdnTitle").val();
   var leadinginstitute = $('#hdnlendingInstitute').val();
   var ELICheckerEmail = $('#ELICheckerEmail').val();
   var AccountNo = $("#AccountNo").val();
   var SanctionedAmount = $("#SanctionedAmount").val();
   var DateofNPA = $("#DateofNPA").val();
   var IRACclassification = $("#IRACclassification").val();
   var ModifiedSanctionedAmount = $('#ModifiedSanctionedAmount').val();
      /* var World=convertNumberToWords(Math.ceil(ModifiedSanctionedAmount));
       $('#ModifiedSanctionedAmountiinwords').text("Rupees " + " " + World+ " " + "Only" );*/
   var DateofRenewal = new window.Date();
   var hdnGurenteeStartDt=$('#hdnGurenteeStartDt').val();
   var hdnGurenteeEndDt=$('#hdnGurenteeEndDt').val();
   var hdnCGStatus=$('#hdnCGStatus').val();
   var hdnTotalFPOPlainMember=$('#hdnTotalFPOPlainMember').val();
   var hdnTotalFPONorthenMember=$('#hdnTotalFPONorthenMember').val();
   var hdnCGFeeCGApplicationDt=$('#hdnCGFeeCGApplicationDt').val();
   var hdnCGFeeRenewalCGApplicationDt=$('#hdnCGFeeRenewalCGApplicationDt').val();
   var ValidityEndDate = $("#hdnValidityEndDate").val();
   var CGFeeEndDate=null;
   if(hdnCGFeeCGApplicationDt!=null && hdnCGFeeCGApplicationDt!='' && hdnCGFeeCGApplicationDt!=undefined)
   {
   		CGFeeEndDate=hdnCGFeeCGApplicationDt;
   }
   if(hdnCGFeeRenewalCGApplicationDt!='' && hdnCGFeeRenewalCGApplicationDt!=null && hdnCGFeeRenewalCGApplicationDt!=undefined)
   {
   		CGFeeEndDate=hdnCGFeeRenewalCGApplicationDt;
   }
   if(ValidityEndDate =="" ||  ValidityEndDate ==null || ValidityEndDate ==undefined)
   {
   		ValidityEndDate = null;
   }
  
   
	    if(TypeofFacility == "Term Loan OR WCTL (Working Capital Term Loan)"){
			   	if (parseInt(ModifiedSanctionedAmount)> parseInt(SanctionedAmount))
				{
					alert("Modified sanctioned amount should be lesser or equal to the sanction amount")
					return false;
				}		
	}
   
   if (TypeofFacility == "Term Loan OR WCTL (Working Capital Term Loan)") 
   {

      var Date = $("#Date").val();      
      var PrincipalOutstanding = $("#PrincipalOutstanding").val();
      var EndDateinterest = $("#EndDateinterest").val();
      var EndDateprincipal = $("#EndDateprincipal").val();
      var DatelastInstalment = $("#DatelastInstalment").val();
      var Loanfullydisbursed = $("#Loanfullydisbursed").val();
      var DateclosureLoan = $("#DateclosureLoan").val();
      var LoanClosed = $('#LoanClosed').val();
      var DisbursmentLoan = $("#DisbursmentLoan").val();
      var FarmerMemberSize = $("#FarmerMemberSize").val();
      var ModifiedSanctionedAmount = $("#ModifiedSanctionedAmount").val();
      var DateModifiedSanction = $("#DateModifiedSanction1").val();
      var CGfeeStartDate = $("#CGfeeStartDate").val();
      if (SanctionedAmount !== ModifiedSanctionedAmount) 
      {

         if ((DateModifiedSanction == "" || DateModifiedSanction == null || DateModifiedSanction == undefined) && status == 'Submitted') {
            alert('Enter the Modified Sanction Date')
            return false;
         }
      }      
      else if (DateModifiedSanction == "" || DateModifiedSanction == null || DateModifiedSanction == undefined) 
      {
            DateModifiedSanction = null;       
      }
      if (DateModifiedSanction != SanctionDate){
      if (DateModifiedSanction != null){
      
           if (new window.Date(DateModifiedSanction)<= new window.Date(SanctionDate) ){
                alert(' Modified Sanctioned Date should be greater than sanctioned Date')
            return false;                 
           }
        }
      }
      if ((DisbursmentLoan == "" || DisbursmentLoan == null || DisbursmentLoan == undefined) && status == 'Submitted') 
	{
	  alert('Please select Any Disbursement under loan')
	  return false;
	}	
	
	if (DisbursmentLoan == "No" || DisbursmentLoan == "Select") 
	{
		if (EndDateinterest == "" || EndDateinterest == null || EndDateinterest == undefined) 
		{
        	EndDateinterest = null;
        }        
        if (EndDateprincipal == "" || EndDateprincipal == null || EndDateprincipal == undefined)
		{
        	EndDateprincipal = null;
        }
		if (DatelastInstalment == "" || DatelastInstalment == null || DatelastInstalment == undefined) 
		{
			DatelastInstalment = null;
		}
		if (Date == "" || Date == null || Date == undefined) 
		{
			Date = null;
		}
		if (Loanfullydisbursed == "" || Loanfullydisbursed == null || Loanfullydisbursed == undefined) 
		{
			Loanfullydisbursed = null;
		}

	} 
	
	if (DisbursmentLoan == "Yes") 
	{
         if ((Date == "" || Date == null || Date == undefined) && status == 'Submitted') 
         {
            alert('Please select Date Of first disbursement')
            return false;

         }
      }
      else if(DisbursmentLoan == "No" ||DisbursmentLoan == "" ){
			{
		         if (Date == "" || Date == null || Date == undefined) 
		         {
		            Date = null;
		         }
			}
         if(Date != null){
         if(new window.Date(Date) <= new window.Date(SanctionDate) && status == 'Submitted')
		{
			alert('Date of first disbursement should be greater than Date of Sanction')
			return false;
		}                  
     }
	}
	
   if(Date != null){
	
	if ((new window.Date(Date) >= new window.Date(DateofRenewal)) && status == 'Submitted')
	{
	alert("Date of first disbursement should be less than Current Date")
	return false;
	}
}	
      if ((PrincipalOutstanding == '' || PrincipalOutstanding == null || PrincipalOutstanding == undefined) && status == 'Submitted') 
      {
         alert('Please enter Principal Outstanding(Rs)')
         return false;

      }
      
      // if (PrincipalOutstanding == "0" && status == 'Submitted')
      // {
      //    alert('Principal Outstanding should be greater than zero')
      //    return false;

      // }
      
	if((parseInt(PrincipalOutstanding) > parseInt(ModifiedSanctionedAmount)) && status == 'Submitted')
	{
		alert('Principal Outstanding should be less than or equal to Modified sanctioned amount')
		return false;
	}
		
      if (DisbursmentLoan == "Yes" && status == 'Submitted') 
      {
      	
         if ((EndDateinterest == "" || EndDateinterest == null || EndDateinterest == undefined) && status == 'Submitted') {
            alert('Please select End Date of interest moratorium')
            return false;

         }
         if ((EndDateinterest < SanctionDate) && status == 'Submitted')
         {
         	alert('End Date of Interest Moratorium should be greater than sanctioned date.');
         	return false;
         }
         
         if ((EndDateprincipal == "" || EndDateprincipal == null || EndDateprincipal == undefined) && status == 'Submitted') {
            alert('Please select End Date of principal moratorium')
            return false;

         }
         
         if ((EndDateprincipal < SanctionDate) && status == 'Submitted')
         {
         	alert('End Date of Principal Moratorium should be greater than sanctioned date.');
         	return false;
         }
         
         if ((DatelastInstalment == "" || DatelastInstalment == null || DatelastInstalment == undefined) && status == 'Submitted') {
            alert('Please select Date of last Instalment')
            return false;

         }
         if ((Loanfullydisbursed == "" || Loanfullydisbursed == null || Loanfullydisbursed == undefined) && status == 'Submitted') {
            alert('Please select Is Loan fully disbursed')
            return false;

         }
         

      } 
      else 
      {
         if ((EndDateinterest == "" || EndDateinterest == null || EndDateinterest == undefined) ) {
            EndDateinterest = null;
         }
         if (EndDateprincipal == "" || EndDateprincipal == null || EndDateprincipal == undefined ) {
            EndDateprincipal = null;
         }
         if (DatelastInstalment == "" || DatelastInstalment == null || DatelastInstalment == undefined) {
            DatelastInstalment = null;
         }
         if (Loanfullydisbursed == "Yes" && status == 'Submitted') 
     	{
            if (DateclosureLoan == '' || DateclosureLoan == null || DateclosureLoan == undefined) 
            {
               alert('Please select Date of Closure of Loan')
               return false;

            }
        

     	
            else{
               if (DateclosureLoan == '' || DateclosureLoan == null || DateclosureLoan == undefined)
                   {
	               DateclosureLoan = null;
	               }
            }
	 
			if (Loanfullydisbursed == "No" || Loanfullydisbursed == null)
			{
	            	
	               DateclosureLoan = null;
	            
	         }


            }
        else
        {
         if (DateclosureLoan == '' || DateclosureLoan == null || DateclosureLoan == undefined)
         {
        DateclosureLoan = null;
        }
              }
    }


      
      if ((LoanClosed == '' || LoanClosed == null || LoanClosed == undefined) && status == 'Submitted') 
      {
         alert('Please select Loan Closed ?')
         return false;

      }
       else 
       {
	         if (LoanClosed == "Yes" ) 
         	{
	            if ((DateclosureLoan == '' || DateclosureLoan == null || DateclosureLoan == undefined)&& status == 'Submitted') 
	            {
	               alert('Please select Date of Closure of Loan')
	               return false;
	
	            }

         	}
         	 
			if (LoanClosed == "No" ||LoanClosed =="Select")
			{
	            if (DateclosureLoan == '' || DateclosureLoan == null || DateclosureLoan == undefined) 
	            {	
	               DateclosureLoan = null;
	            }
	         }
      	}
    
    if(DisbursmentLoan == "Yes" && status == 'Submitted')
    {
    		    		
		if(new window.Date(EndDateinterest) < new window.Date(Date))
		{
			alert('End Date of Interest Moratorium should be greater than the Date of First Disbursement')
			return false;
		}
		if(new window.Date(EndDateprincipal) <= new window.Date(Date))
		{
			alert('End Date of Principal Moratorium should be greater than Date of First Disbursement')
			return false;
		}
		if(new window.Date(DatelastInstalment) < new window.Date(EndDateprincipal))
		{
			alert('Date of Last Instalment should be greater than or equal to End Date of principal Moratorium')
			return false;
		}
		/*if(new window.Date(DatelastInstalment) == new window.Date(EndDateprincipal))
		{
			alert('Date of Last Instalment should be greater than the End Date of principal Moratorium')
			return false;
		}
		*/
		if(DateclosureLoan != null || DateclosureLoan == "")
		{	
			if(new window.Date(DateclosureLoan) < new window.Date(SanctionDate))
			{
				alert('Date of closure of loan should be greater than Date of Sanction')
				return false;
			}
		}
	}
	
		
	
	  if ((IRACclassification == '' || IRACclassification == null || IRACclassification == undefined || IRACclassification == "-IRAC classification--" )&& status == 'Submitted') 
      {
         alert('Please select IRAC Classification')
         return false;

      }
      	var IRACStatus="";

      if (IRACclassification == "Substandard" || IRACclassification == "Doubtful" || IRACclassification == "Loss") 
      {
      	 IRACStatus="NPA";
         if ((DateofNPA == "" || DateofNPA == null || DateofNPA == undefined) && status == 'Submitted') 
         {
            alert('Please select Date of NPA')
            return false;
         }
          else 
		      {
		      	
		         if (DateofNPA == '' || DateofNPA == null || DateofNPA == undefined) 
		         {
		            DateofNPA = null;
		         }
		      }
		
      } 
      else 
      {
      	 IRACStatus="Non NPA";
         if (DateofNPA == '' || DateofNPA == null || DateofNPA == undefined) 
         {
            DateofNPA = null;
         }
      }
      
       
      
   var EILchecker;
   if ((ELICheckerEmail != null && ELICheckerEmail != undefined && ELICheckerEmail != '') ) {
      EILchecker = GetUserId1(ELICheckerEmail);
   }
   if ((EILchecker == -1)&& status == "Submitted") {
      alert('There is no valid EIL Checker against this Lending Institute')
      return false;
   }

   if ((EILchecker == 0)&& status == "Submitted") {
      alert('There is no EIL Checker against this Lending Institute')
      return false;
   }   
   var ELICheckerEmail = $('#ELICheckerEmail').val();;   

   //choice column conditions/////
   if(DisbursmentLoan == "Yes")
   {
    DisbursmentLoan = "0";
   }
   else if(DisbursmentLoan == "No")
   {
    DisbursmentLoan = "1";
   }
   else if(DisbursmentLoan == "Select"){
      DisbursmentLoan = "2";
   }
   if(Loanfullydisbursed == "Yes")
   {
    Loanfullydisbursed = "0";
   }
   else if(Loanfullydisbursed == "No")
   {
    Loanfullydisbursed = "1";
   }
   else if(Loanfullydisbursed == "Select"){
      Loanfullydisbursed = "2";

   }
   if(LoanClosed == "Yes")
   {
    LoanClosed = "0";
   }
   else if(LoanClosed == "No")
   {
    LoanClosed = "1";
   }
   else if(LoanClosed == "Select" || LoanClosed == "" ){
      LoanClosed = "2";
   }
   var TypeofFacilityNew;
   if(TypeofFacility == "Term Loan OR WCTL (Working Capital Term Loan)")
   {
        TypeofFacilityNew = "1";
   }
   else if(TypeofFacility == "WC/CC Limit")
   {
        TypeofFacilityNew = "2";
   } 

   if (IRACclassification == "Standard - 0 Days Past Due (DPD)")
   {
     IRACclassification = "0";
   }
   else if (IRACclassification == "SMA- 0")
   {
     IRACclassification = "1";
   }
   else if(IRACclassification == "SMA- 1")
   {
     IRACclassification = "2";
   }
   else if(IRACclassification == "SMA- 2")
   {
     IRACclassification = "3";
   }
   else if(IRACclassification == "Substandard")
   {
     IRACclassification = "4";
   }
   else if(IRACclassification == "Doubtful")
   {
     IRACclassification = "5";
   }
   else if(IRACclassification == "Loss")
   {
     IRACclassification = "6";
   }
   else if (IRACclassification == "Select"){
      IRACclassification = "7";
   }
   if (SubStatus == "Saved") 
   {
      SubStatus = "1";
   } 
   else if (SubStatus == "Pending for Approval") 
   {
      SubStatus = "2";
   }

   if (txtmakerComment == null && txtmakerComment == undefined && txtmakerComment == "")
   {
    txtmakerComment = null;
   }

   if (EILchecker == null && EILchecker == undefined && EILchecker == "")
   {
    EILchecker = null;
   }

   var FPORegion="/cr6fc_regionmasters(" + RegionOfFPO + ")";
         
      $('#SendFormApproval').prop('disabled', 'true');
         $('#saveasDraft').prop('disabled', 'true');
         vTitle = GetCounter();
      var data1 = JSON.stringify({

        "cr6fc_nameoffpo": txtNameOfFPO,
        "cr6fc_name": vTitle,
        "cr6fc_cgpan": CGPAN,
        "cr6fc_panfpo": PANFPO,
        "cr6fc_customerid": CustomerID,        
        "cr6fc_typeoffacility": TypeofFacilityNew,
        "cr6fc_accountno": AccountNo,
        "cr6fc_sanctionedamount": SanctionedAmount,
        "cr6fc_modifiedsanctionedloanamount": ModifiedSanctionedAmount,
        "cr6fc_farmermembersize": FarmerMemberSize,
        "cr6fc_totalfpomember":hdnTotalFPOPlainMember,
        "cr6fc_totalmembernorthen":hdnTotalFPONorthenMember,        
        "cr6fc_iracclassificationoftheaccount": IRACclassification,
        "cr6fc_dateofnpa": DateofNPA,
        "cr6fc_elimakeremailid": loggedInUserEmail,
        "cr6fc_elimakerremark": txtmakerComment,
        "cr6fc_parentid": vItemID,
        "cr6fc_nameoflendinginstitution": leadinginstitute,
        "cr6fc_ELIChecker_contact@odata.bind": "/contacts(" + EILchecker + ")",   
        "cr6fc_cgapplicationno":CGApplicationno,        
        "cr6fc_RegionOfFPO@odata.bind": FPORegion,
        "cr6fc_guaranteestartdate":hdnGurenteeStartDt,                       
        "cr6fc_status": SubStatus,
        "cr6fc_cgstatus":hdnCGStatus,
        "cr6fc_iracstatus":IRACStatus,
        "cr6fc_guaranteeenddate":hdnGurenteeEndDt,
        "cr6fc_cgfeedate":CGFeeEndDate,        
        "cr6fc_validityenddate": new window.Date(ValidityEndDate),
        "cr6fc_dateofsanction":SanctionDate,
        "cr6fc_dateofmodifiedsanction": DateModifiedSanction,
        "cr6fc_disbursmentunderloan": DisbursmentLoan,
         "cr6fc_dateoffirstdisbursement": Date,
         "cr6fc_principaloutstanding": PrincipalOutstanding,
         "cr6fc_enddateofinterestmoratium": EndDateinterest,
         "cr6fc_enddateofprinciplemoratium": EndDateprincipal,
         "cr6fc_dateoflastinstalment": DatelastInstalment,
         "cr6fc_loanfullydisbured": Loanfullydisbursed,
         "cr6fc_loanclosed": LoanClosed,
         "cr6fc_cgfeeenddate":CGFeeEndDate,
         "cr6fc_dateofclosureofloan": DateclosureLoan
               
      });
   }
   //}

   if (TypeofFacility == "WC/CC Limit") 
   {
      var PeakOutstanding2 = $("#PeakOutstanding2").val();
      var DatefirstWithdrawl = $("#DatefirstWithdrawl").val();
      var DateClosureLimit2 = $("#DateClosureLimit2").val();
      var EndLimitClosed2 = $("#EndLimitClosed2").val();
      var Limitoperational = $("#Limitoperational").val();
      var UtilisationLimit = $("#UtilisationLimit").val();      
      var DateModifiedSanction = $("#DateModifiedSanction").val();
      var DateLimitValidity = $("#DateLimitValidity").val();
      var SanctionDate = $("#SanctionDate").val();
      var ModifiedSanctionedAmount = $("#ModifiedSanctionedAmount1").val();
      var FarmerMemberSize = $("#FarmerMemberSize1").val();
   
      if (SanctionedAmount !== ModifiedSanctionedAmount) 
      {

         if ((DateModifiedSanction == "" || DateModifiedSanction == null || DateModifiedSanction == undefined) && status == 'Submitted') {
            alert('Enter the Modified Sanction Date')
            return false;
         }
      }      
      else if (DateModifiedSanction == "" || DateModifiedSanction == null || DateModifiedSanction == undefined) 
      {
            DateModifiedSanction = null;       
      }
      if (DateModifiedSanction != SanctionDate){
      if (DateModifiedSanction != null){
      
           if (new window.Date(DateModifiedSanction)<= new window.Date(SanctionDate) ){
                alert(' Modified Sanctioned Date should be greater than sanctioned Date')
            return false;                 
           }
        }
      }
      else
      {
         if (DateModifiedSanction == "" || DateModifiedSanction == null || DateModifiedSanction == undefined) 
      {
            DateModifiedSanction = null;       
      }      
      }

      if ((UtilisationLimit == '' || UtilisationLimit == null || UtilisationLimit == undefined) && status == "Submitted" ) 
      {
         alert('Please select Any Utilisation under the Limit ? ')
         return false;
      }
      if (UtilisationLimit == "Yes") 
      {
         if ((DatefirstWithdrawl == "" || DatefirstWithdrawl == null || DatefirstWithdrawl == undefined) && status == 'Submitted') 
         {
            alert('Enter Date of First Withdrawl')
            return false;
         }
         else if(DatefirstWithdrawl == "" || DatefirstWithdrawl == null || DatefirstWithdrawl == undefined)
         {DatefirstWithdrawl = null}
         if(DatefirstWithdrawl != null){
         if (new window.Date(DatefirstWithdrawl) < new window.Date(SanctionDate))
         {
         	alert('Date of first withdrawal Should be greater or same as the Date of Sanction')
            return false;
         }
      } 
      
      }
      if (UtilisationLimit == "No" || UtilisationLimit == '')
      {
      	    DatefirstWithdrawl = null;      	
      }
      
      if((new window.Date(DateofNPA) < new window.Date(DatefirstWithdrawl)) && status == 'Submitted')
      {
      	alert('Date of NPA Should be greater than Date of First Withdrawal')
      	return false;
      }   
      if ((Limitoperational == '' || Limitoperational == null || Limitoperational == undefined) && status == 'Submitted') {
         alert('Please select Was the Limit operational for full previous Financial Year ? ')
         return false;
      }

      if (Limitoperational == "Yes") 
      {
         if ((PeakOutstanding2 == "" || PeakOutstanding2 == null || PeakOutstanding2 == undefined) && status == 'Submitted') 
         {
            alert('Enter Peak Outstanding')
            return false;
         }
       }
     if (Limitoperational == "No" ||Limitoperational == '')
      {
      	      		PeakOutstanding2 = null;
      }
      
      if ((DateLimitValidity == "" || DateLimitValidity == null || DateLimitValidity == undefined)&& status == 'Submitted') {
         alert('Please Enter End Date of Limit Validity')
         return false;
      }
      else if(DateLimitValidity == "" || DateLimitValidity == null || DateLimitValidity == undefined){
         DateLimitValidity = null
      }
      if ((EndLimitClosed2 == "" || EndLimitClosed2 == null || EndLimitClosed2 == undefined) && status == 'Submitted') {
         alert('Please select Limit Closed?')
         return false;
      }
      if (EndLimitClosed2 == "Yes" ) 
      {
         if ((DateClosureLimit2 == '' || DateClosureLimit2 == null || DateClosureLimit2 == undefined) && status == 'Submitted') 
         {
            alert('Please select Date of Closure of Limit ?')
            return false;

         }
         else if(DateClosureLimit2 == '' || DateClosureLimit2 == null || DateClosureLimit2 == undefined)
         {
         DateClosureLimit2 = null
         }
      } 
      if (EndLimitClosed2 == "No" || EndLimitClosed2 == '')
      {
         DateClosureLimit2 = null;
      }
      
      if(EndLimitClosed2 == "Yes")
      {
	      if((new window.Date(DateClosureLimit2) < new window.Date(SanctionDate)) && status == 'Submitted')      
	      {
	      alert("Date of Closure of Limit should be greater than the Date of Sanction")
	      return false;
	      }
      }
	  
      if ((IRACclassification == '' || IRACclassification == null || IRACclassification == undefined || IRACclassification == "Select" )&& status == 'Submitted') 
      {
         alert('Please select IRAC Classification')
         return false;
      }
      var IRACStatus='';
      if (IRACclassification == "Substandard" || IRACclassification == "Doubtful" || IRACclassification == "Loss" ) 
      {
      	IRACStatus="NPA";
         if ((DateofNPA == "" || DateofNPA == null || DateofNPA == undefined)&& status == "Submitted") {
            alert('Please select Date of NPA')
            return false;
         }
         else if(DateofNPA == "" || DateofNPA == null || DateofNPA == undefined){  
                DateofNPA = null;
            }
      } 
      else 
      {
      	 IRACStatus="Non NPA";
         DateofNPA = null;
      }

    	var EILchecker;

   //if((ELICheckerEmail!=null && ELICheckerEmail!=undefined && ELICheckerEmail!='') && status=="Submitted")
   if ((ELICheckerEmail != null && ELICheckerEmail != undefined && ELICheckerEmail != '')) {
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
   var ELICheckerEmail = $('#ELICheckerEmail').val();

   //
    if (UtilisationLimit == "Yes") 
    {
        UtilisationLimit = "0";  
    }
    else if (UtilisationLimit == "No")
    {
        UtilisationLimit = "1";
    }
    else if(UtilisationLimit == ""){
      UtilisationLimit = "2";
   }
    if (EndLimitClosed2 == "Yes") 
    {
        EndLimitClosed2 = "0";  
    }
    else if (EndLimitClosed2 == "No")
    {
        EndLimitClosed2 = "1";
    }
   
    if (Limitoperational == "Yes") 
    {
        Limitoperational = "0";  
    }
    else if (Limitoperational == "No")
    {
        Limitoperational = "1";
    }


    //
    if(TypeofFacility == "Term Loan OR WCTL (Working Capital Term Loan)")
   {
        TypeofFacility = "1";
   }
   else if(TypeofFacility == "WC/CC Limit")
   {
        TypeofFacility = "2";
   } 

   if (IRACclassification == "Standard - 0 Days Past Due (DPD)")
   {
     IRACclassification = "0";
   }
   else if (IRACclassification == "SMA- 0")
   {
     IRACclassification = "1";
   }
   else if(IRACclassification == "SMA- 1")
   {
     IRACclassification = "2";
   }
   else if(IRACclassification == "SMA- 2")
   {
     IRACclassification = "3";
   }
   else if(IRACclassification == "Substandard")
   {
     IRACclassification = "4";
   }
   else if(IRACclassification == "Doubtful")
   {
     IRACclassification = "5";
   }
   else if(IRACclassification == "Loss")
   {
     IRACclassification = "6";
   }
   else if(IRACclassification ="Select"){
      IRACclassification = '7';
   }
   if (SubStatus == "Saved") 
   {
      SubStatus = "1";
   } 
   else if (SubStatus == "Pending for Approval") 
   {
      SubStatus = "2";
   }

   if(DatefirstWithdrawl == null || DatefirstWithdrawl == undefined || DatefirstWithdrawl == "")
   {
    DatefirstWithdrawl = null;
   }
   if(PeakOutstanding2 == null || PeakOutstanding2 == undefined || PeakOutstanding2 == "")
   {
    PeakOutstfanding2 = null;
   }
   if(EndLimitClosed2 == null || EndLimitClosed2 == undefined || EndLimitClosed2 == "")
   {
    EndLimitClosed2 = null;
   }
   if(UtilisationLimit == null || UtilisationLimit == undefined || UtilisationLimit == "")
   {
    UtilisationLimit = null;
   }
   if(Limitoperational == null || Limitoperational == undefined || Limitoperational == "")
   {
    Limitoperational = null;
   }
   if(DateModifiedSanction == null || DateModifiedSanction == undefined || DateModifiedSanction == "")
   {
    DateModifiedSanction = null;
   }
   if(DateLimitValidity == null || DateLimitValidity == undefined || DateLimitValidity == "")
   {
    DateLimitValidity = null;
   }
           
   var FPORegion="/cr6fc_regionmasters(" + RegionOfFPO + ")";

      vTitle = GetCounter();
      $('#SendFormApproval').prop('disabled', 'true');
         $('#saveasDraft').prop('disabled', 'true');

      var data1 = JSON.stringify({         

         "cr6fc_nameoffpo": txtNameOfFPO,
         "cr6fc_name": vTitle,
         "cr6fc_cgpan": CGPAN,
         "cr6fc_panfpo": PANFPO,
         "cr6fc_customerid": CustomerID,
         "cr6fc_RegionOfFPO@odata.bind": FPORegion,
         "cr6fc_typeoffacility": TypeofFacility,
         "cr6fc_accountno": AccountNo,
         "cr6fc_sanctionedamount": SanctionedAmount,
         "cr6fc_modifiedsanctionedloanamount": ModifiedSanctionedAmount,
         "cr6fc_farmermembersize": FarmerMemberSize,
         "cr6fc_totalfpomember":hdnTotalFPOPlainMember,
         "cr6fc_totalmembernorthen":hdnTotalFPONorthenMember,         
         "cr6fc_iracclassificationoftheaccount": IRACclassification,
         "cr6fc_dateofnpa": DateofNPA,
         "cr6fc_elimakeremailid": loggedInUserEmail,
         "cr6fc_elimakerremark": txtmakerComment,
         "cr6fc_parentid": vItemID,
         "cr6fc_nameoflendinginstitution": leadinginstitute,
         "cr6fc_ELIChecker_contact@odata.bind": "/contacts(" + EILchecker + ")",    
         "cr6fc_cgapplicationno":CGApplicationno,
         "cr6fc_guaranteestartdate":hdnGurenteeStartDt,
         "cr6fc_guaranteeenddate":hdnGurenteeEndDt,
         "cr6fc_iracstatus":IRACStatus,
         "cr6fc_cgfeedate":CGFeeEndDate,
         "cr6fc_status": SubStatus,
         "cr6fc_cgstatus":hdnCGStatus,
         "cr6fc_validityenddate": new window.Date(ValidityEndDate),
         "cr6fc_dateofsanction":SanctionDate,
         "cr6fc_cgfeestartdate":CGfeeStartDate,
         "cr6fc_dateoffirstwithdrawal": DatefirstWithdrawl,
         "cr6fc_peakoutstanding": PeakOutstanding2,
         "cr6fc_dateofclosureoflimit": DateClosureLimit2,
         "cr6fc_limitclosed": EndLimitClosed2,
         "cr6fc_utilisationunderlimit": UtilisationLimit,
         "cr6fc_limitoperational": Limitoperational,
         "cr6fc_cgfeeenddate":CGFeeEndDate,
         "cr6fc_dateofmodifiedsanction": DateModifiedSanction,
         "cr6fc_dateoflimitvalidity": DateLimitValidity,         
      });
   }   


shell.getTokenDeferred().done(function(token){
			
    console.log(token)
    var header = {
        __RequestVerificationToken: token,
        contentType: "application/json;odata=verbose"
    }
    $.ajax({        
        url: "/_api/cr6fc_renewalcgapplications",
        type: "POST",
        headers: header,
        async: false,
        data: data1,
        success: function (data,success,xhr) {            
            renewalentityid = xhr.getResponseHeader('entityid');
         //console.log(successId);
         UpdateCounter();
         // updatecgappfile(vItemID);
         var CGData = JSON.stringify(
				    {				       
						"cr6fc_renewalrequestongoing": "0"				 
				    });

	    			$.ajax({
	
                    url: "/_api/cr6fc_renewalcgapplications("+vItemID+")",
                    type: "PATCH",
                    contentType: "application/json;odata=verbose",
                    async: false,
                    data: CGData,
                    headers: {
                        __RequestVerificationToken: token,
                        "accept": "application/json;odata=verbose",
                        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                        "IF-MATCH": "*",
                        "X-Http-Method": "PATCH"
                    },                        
				    success: function (data,textstatus,xhr) 
				    {
                  successId = xhr.getResponseHeader('entityid');
                         UpdateCounter(token);
                         if(SubStatus == "2")
                         {
                             alert('Data saved Successfully. The CGApplication No.is:-' + vTitle)
                         }
                         else
                         {
                             alert('Data Added Successfully. The CGApplication No.is:-' + vTitle)
                         }
                         var uploadfile = document.getElementById('ELIChekerAttach').value;
                         if(uploadfile != ''){
                         updatecgappfile(vItemID);
                         }
                         window.location.href = location.origin + "/RefreshingCache/?id="+successId+","+renewalentityid+","+counterentID+"&tbl=cr6fc_cgaplications,cr6fc_renewalcgapplications,cr6fc_countermasters&col=cr6fc_cacherefreshedon&red=CGRenewalApplications";
                        //  window.location.href = location.origin + "/CGRenewalApplications/";
				    },
				    error: function (e) 
				    {
				    	console.log(e);
				    }
				});
        },            
        
        error: function (error) {
            console.log(error);            
            alert('Some error occured while adding data in CGApplications list. Please try again later.');
            console.log(error);

        }


    })
})
}
var CGID;
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
		success: function (data,textStatus,xhr) {
			// AddDashBoard(document.getElementById("hdnDigitalRequestNo").value, document.getElementById("hdnApprvlNotesItemID").value);
			//alert('Data Done')
         counterentID = xhr.getResponseHeader('entityid');
		},
		error: function (e) {
		}
	});
}


function GetUserId1(EamilID) {
	debugger;
	//var vNewLoginName=EamilID.split('|')[2];
	var requestUri = location.origin + "/_api/contacts?$top=500&$select=*&$filter=emailaddress1 eq '"+EamilID+"'";
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

//-------------------------------------Code For Attachment--------------------------------------------------------------------
function updatecgappfile(vItemID){
	var data = JSON.stringify(
		{
			"cr6fc_cgid": vItemID,
			"cr6fc_name":"EliMakerRenewal",
			"cr6fc_cgpanrenewal": document.getElementById("CGPAN").value
		});
	
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
				getFileContentsAndMetadata(CGFileID,token)
			},
			error: function (error) {
				console.log(error);
				alert('Some error occured while adding data in CGFiles list. Please try again later.');
				console.log(error);
	
			}
	
	
		})
	})
}
function getFileContentsAndMetadata(entityID,token) {
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
            uploadFile(fileContent,fileName,entityID,token,file.type,file);
        };
    }
}
 
var uploadfileentityid;
function uploadFile(fileContent,fileName,entityID,token,Filecontenttype) {
	
	
	var header={__RequestVerificationToken:token,
        Accept: 'application/json;odata=verbose',
		XRequestDigest: $("#__REQUESTDIGEST").val(),
		
	}
$.ajax({
	url: "/_api/cr6fc_cgappfileses(" + entityID + ")/cr6fc_nsapproverpaymentfile?x-ms-file-name=" + fileName,
	type: "PUT",
	async: false,
	contentType: "application/octet-stream",
	processData: false,
	// data: fileContent,
	data: fileContent,
	headers: header,
	success: function (data, textStatus, xhr) {
		uploadfileentityid = xhr.getResponseHeader('entityid');
      window.location.href = location.origin + "/RefreshingCache/?id="+successId+","+renewalentityid+","+counterentID+","+uploadfileentityid+"&tbl=cr6fc_cgaplications,cr6fc_renewalcgapplications,cr6fc_countermasters,cr6fc_cgappfileses&col=cr6fc_cacherefreshedon&red=CGRenewalApplications";
      //   window.location.href = location.origin+"/CGRenewalApplications/";

	},
	error: function (xhr, textStatus, errorThrown) {
		console.log(errorThrown)
	}
});
}