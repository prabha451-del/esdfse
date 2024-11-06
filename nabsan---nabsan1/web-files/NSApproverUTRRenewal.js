var vItemID;
var vTotalDocLength = 0;
var fileArray = [];
var otherfileArray=[];
var AttchLength=0;
var arraycount = 0;

$(document).ready(function () {
    $('title').text('NS Approver Payment Form');
    vItemID= GetQueryStingValue()["Item"];
    bindCGApplicationData(vItemID);
    bindSOEDetailsData(vItemID);     
    bindRenewalCGApplicationData1(vItemID);
    //getOtherDocDataLatest(vItemID);
    //getOtherDocDataLatest(vItemID);
    //$('#fileAttachInvoice').multifile();
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

function showTaxInvoice()
{		
	   var url="/sites/FPOCGPortalUAT/SitePages/Renewal Application/RenewalTax-Invoice.aspx?Item="+InternId;
		window.open(url, "_blank");	
}

function Exit()
{
	window.location.href="/sites/FPOCGPortalUAT/SitePages/Renewal%20Application/RenewalNSApproverCGFeesDashBoard.aspx";
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
function ShowPopUp()
{
		$("#inputDialog2").dialog({
		autoOpen: false,
		modal: true,
		dialogClass: "noclose",
		closeOnEscape: false,		              
		show: { effect: "clip", duration: 200 }
		});		
		$("#inputDialog2").dialog("open");

}

function ClosePopup()
{
	$("#inputDialog2").dialog("close");	
}

 function bindMainCGApplicationData(vItemID,CGStatus,ID)
 {    
    //var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CGApplications')//items?$top=500&$select=*&$filter=(ID eq '"+vItemID+"')";
    //var requestUri = location.origin + "/_api/cr6fc_cgapplicationses?$select=*&$filter=cr6fc_cgapplicationsid eq " + vItemID + "";
    var requestUri = location.origin + "/_api/cr6fc_cgaplications?$select=*&$filter=cr6fc_cgaplicationid eq " + vItemID + "";
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
              		//$("#hdnGuranteeStartDt").val(Logg[0].GuaranteeStartDate);
              		//$("#hdnGuranteeEndDt").val(Logg[0].GuaranteeEndDate);
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
              		if(Logg[0]['cr6fc_cgstatus@OData.Community.Display.V1.FormattedValue'] =="In Force 0")
              		{
              			$("#hdnCGFeeStartDt").val(Logg[0].cr6fc_cgfeestartdate);
              			$("#hdnCGFeeEndDt").val(Logg[0].cr6fc_cgfeeenddate);

              		}
              		else
              		{
              			bindRenewalCGApplicationData(CGStatus,ID)
              		}
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
    //var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('RenewalCGApplication')//items?$top=500&$select=*&$filter=(ID ne '"+vItemID+"') and CGStatus eq '"+CGStatus+"'";
    //queryList = location.origin + "/_api/cr6fc_renewalcgapplications?$select=*&$filter=cr6fc_renewalcgapplicationid eq " + vItemID + " and cr6fc_cgstatus eq "+ CGStatus + " &$top=5000";
    queryList = location.origin + "/_api/cr6fc_renewalcgapplications?$select=*&$filter=cr6fc_renewalcgapplicationid eq " + vItemID + " and cr6fc_cgstatus eq "+ CGStatus + " &$top=5000";
    $.ajax({
        url: queryList,
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
              		if(Logg[0].cr6fc_cgfeestartdate!=null && Logg[0].cr6fc_cgfeestartdate!='' && Logg[0].cr6fc_cgfeestartdate!=undefined)
              		{
              			$("#hdnCGFeeStartDt").val(Logg[0].cr6fc_cgfeestartdate);
              		}
              		if(Logg[0].cr6fc_cgfeeenddate!=null && Logg[0].cr6fc_cgfeeenddate!='' && Logg[0].cr6fc_cgfeeenddate!=undefined)
              		{

              		$("#hdnCGFeeEndDt").val(Logg[0].cr6fc_cgfeeenddate);
              		}
              		 if(Logg[0].cr6fc_elicheckerpaymentremark!=null && Logg[0].cr6fc_elicheckerpaymentremark!=undefined && Logg[0].cr6fc_elicheckerpaymentremark!='')
  
						//if(Logg[0].ELIMakerRemark!=null && Logg[0].ELIMakerRemark!=undefined && Logg[0].ELIMakerRemark!='')
						{	
							$('#divchecker').show();
							//document.getElementById("divELImaker").innerHTML=Logg[0].ELIMakerRemark;
							document.getElementById("divELIchecker").innerHTML=Logg[0].cr6fc_elicheckerpaymentremark;

						}
                       if(Logg[0].cr6fc_nschackerpaymentremark!=null && Logg[0].cr6fc_nschackerpaymentremark!=undefined && Logg[0].cr6fc_nschackerpaymentremark!='')

						//if(Logg[0].ELIMakerRemark!=null && Logg[0].ELIMakerRemark!=undefined && Logg[0].ELIMakerRemark!='')
						{	
							$('#divNSCheckerHide').show();
							//document.getElementById("divELImaker").innerHTML=Logg[0].ELIMakerRemark;
							document.getElementById("divNSCheckerRemark").innerHTML=Logg[0].cr6fc_nschackerpaymentremark;

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
function bindRenewalCGApplicationData1(vItemID){    
    //var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('RenewalCGApplication')//items?$top=500&$select=*&$filter=(ID eq '"+vItemID+"')";
    queryList = location.origin + "/_api/cr6fc_renewalcgapplications?$select=*&$filter=cr6fc_renewalcgapplicationid eq " + vItemID + " &$top=5000";
    
    $.ajax({
        url: queryList,
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
              		
                    if(Logg[0].cr6fc_elicheckerpaymentremark !=null && Logg[0].cr6fc_elicheckerpaymentremark!=undefined && Logg[0].cr6fc_elicheckerpaymentremark!='')
                    {	
                        $('#divchecker').show();						
                        document.getElementById("divELIchecker").innerHTML=Logg[0].cr6fc_elicheckerpaymentremark;
                    }
                    if(Logg[0].cr6fc_nschackerpaymentremark !=null && Logg[0].cr6fc_nschackerpaymentremark !=undefined && Logg[0].NSChackerPaymentRemark!='')
                    {	
                        $('#divNSCheckerHide').show();						
                        document.getElementById("divNSCheckerRemark").innerHTML=Logg[0].cr6fc_nschackerpaymentremark;
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
    //var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('RenewalCGApplication')//items?$top=500&$select=*,ELIChecker/Title,FPOActivities111/FPOActivity,RegionOfFPO/Region,FPOState/State,BusinessFPOState/State&$expand=ELIChecker,RegionOfFPO,FPOActivities111,FPOState,BusinessFPOState&$filter=(ID eq '"+vItemID+"')";
    queryList = location.origin + "/_api/cr6fc_renewalcgapplications?$select=cr6fc_name,cr6fc_renewalcgapplicationid,cr6fc_cgstatus,cr6fc_parentid,cr6fc_iracclassificationoftheaccount,_cr6fc_elichecker_value,cr6fc_eilcheckerutrcertificateviewdate,cr6fc_nameoffpo,cr6fc_nameoflendinginstitution,cr6fc_dateofnpa,cr6fc_panfpo,cr6fc_eilcheckerutrcertificateviewdate,cr6fc_enddateofprinciplemoratium,cr6fc_enddateofinterestmoratium,cr6fc_duedateoflastinstallment,cr6fc_typeoffacility&$filter=cr6fc_renewalcgapplicationid eq " + vItemID + " &$top=5000";
    
    $.ajax({
        url: queryList,
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
              		//bindMainCGApplicationData(Logg[0].cr6fc_parentid,Logg[0].cr6fc_cgstatus,Logg[0].cr6fc_renewalcgapplicationid);
                      bindMainCGApplicationData(Logg[0].cr6fc_parentid,Logg[0].cr6fc_cgstatus,Logg[0].cr6fc_renewalcgapplicationid);
              		$('#IRClassification').val(Logg[0]['cr6fc_iracclassificationoftheaccount@OData.Community.Display.V1.FormattedValue'])
              		$('#hdWFID').val(Logg[0].cr6fc_parentid);
              		$("#txtApplicationNo").text(Logg[0].cr6fc_name);
              		$("#txtCGApplicationNo").val(Logg[0].cr6fc_name);
              		$("#txtELICheckerNamePayment").text(Logg[0]['_cr6fc_elichecker_value@OData.Community.Display.V1.FormattedValue']);
              		$("#instituteIdNewPayment").text(Logg[0].cr6fc_nameoflendinginstitution);
              		$("#txtNameOfFPO1").val(Logg[0].cr6fc_nameoffpo);
              		//$('#hdnloanClosedDt').val(Logg[0].NameOfFPO)
					if(Logg[0].cr6fc_eilcheckerutrcertificateviewdate!=null && Logg[0].cr6fc_eilcheckerutrcertificateviewdate!=undefined && Logg[0].cr6fc_eilcheckerutrcertificateviewdate!='')
					{
						$('#dtproceedPayment').text(GetCreatedDateTime(Logg[0].cr6fc_eilcheckerutrcertificateviewdate))
					}
              		$('#txtId').val(Logg[0].cr6fc_renewalcgapplicationid);
              		
              		$('#CGPANNo').val(Logg[0].cr6fc_panfpo);              	                   
                   $("#txtNameOfLendingInstitution").text(Logg[0].cr6fc_nameoflendinginstitution);
                   
                  if(Logg[0].cr6fc_dateofnpa!=null && Logg[0].cr6fc_dateofnpa!=undefined && Logg[0].cr6fc_dateofnpa!='')
	              	    {
							document.getElementById("hdnDateofNPA").value=Logg[0].cr6fc_dateofnpa;
						}
 
               	 if(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'] == "Term Loan OR WCTL (Working Capital Term Loan)")	                   
                   {
                   		if(Logg[0].cr6fc_duedateoflastinstallment!=null && Logg[0].cr6fc_duedateoflastinstallment!=undefined && Logg[0].cr6fc_duedateoflastinstallment!='')
	              	    {
							document.getElementById("hdnloanClosedDt").value=Logg[0].cr6fc_duedateoflastinstallment;
						}
						
						if(Logg[0].cr6fc_enddateofinterestmoratium != null && Logg[0].cr6fc_enddateofinterestmoratium != "" && Logg[0].cr6fc_enddateofinterestmoratium != undefined)
	              		{
	              			$('#hdnEndDateOfInterestMoratium').val(Logg[0].cr6fc_enddateofinterestmoratium)
	              		}
	              		if(Logg[0].cr6fc_enddateofprinciplemoratium!= null && Logg[0].cr6fc_enddateofprinciplemoratium!= "" && Logg[0].cr6fc_enddateofprinciplemoratium!= undefined)
	              		{
	              			$('#hdnEndDateOfPrincipleMoratium').val(Logg[0].cr6fc_enddateofprinciplemoratium)
	              		}

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
var WFID = "";
var InternId = "";
//var SOEID;
function bindSOEDetailsData(vItemID) {
    var requestUri = location.origin + "/_api/cr6fc_renewalsoedetailses?$select=cr6fc_name,cr6fc_renewalsoedetailsid,cr6fc_wfid,cr6fc_name,cr6fc_creditguaranteefee,cr6fc_taxamount,cr6fc_grandtotal,cr6fc_soedate,cr6fc_fpo,cr6fc_cgfan&$filter=cr6fc_wfid eq '" + vItemID + "'";
    // var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SOEDetails')//items?$top=500&$select=*,BillToState/State,BillToState/Id,BillToState/StateCode&$expand=BillToState&$filter=(WFID eq '"+vItemID+"')";
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
            WFID = Logg[0].cr6fc_wfid;
            InternId = Logg[0].cr6fc_renewalsoedetailsid;
            try {
                if (Logg.length > 0) {
                    if(Logg[0].cr6fc_name != null){
                    $('#txtSOENo').text(Logg[0].cr6fc_name)
                    }
                    else{
                        $('#txtSOENo').text();
                    }
                    // $('#txtCreditGuranteeFee').text(Math.ceil(Logg[0].CreditGuaranteeFee));
                    var CreditGuaranteeFee;
                    if (Logg[0].cr6fc_creditguaranteefee == '' || Logg[0].cr6fc_creditguaranteefee == null) {
                        CreditGuaranteeFee = "0";
                    }
                    else {
                        CreditGuaranteeFee = Logg[0].cr6fc_creditguaranteefee;
                    }
                    $('#txtCreditGuranteeFee').text(Math.ceil(CreditGuaranteeFee));
                    var Word = convertNumberToWords(Math.ceil(CreditGuaranteeFee));
                    console.log(Word);
                    $('#txtCreditGuranteeFeeinwords').text("Rupees " + " " + Word + " " + "Only");
                    $('#txtCreditGuranteeFeeinwords').val("Rupees " + " " + Word + " " + "Only");
                    var GrandTotal;
                    if (Logg[0].cr6fc_grandtotal == '' || Logg[0].cr6fc_grandtotal == null) {
                        GrandTotal = "0";
                    }
                    else {
                        GrandTotal = Logg[0].cr6fc_grandtotal;
                    }
                    $("#txtGrandTotal").text(GrandTotal);
                    var a = GrandTotal.replace(",", "");
                    var Word = convertNumberToWords(Math.ceil(a));
                    console.log(Word);
                    $('#txtTaxAmtinwords').text("Rupees " + " " + Word + " " + "Only");
                    $('#txtTaxAmtinwords').val("Rupees " + " " + Word + " " + "Only");
                    var Amount;
                    if (Logg[0].cr6fc_taxamount == '' || Logg[0].cr6fc_taxamount == null) {
                        Amount = "0";
                    }
                    else {
                        Amount = Logg[0].cr6fc_taxamount;
                    }
                    $('#txtTaxAmt').text(Math.ceil(Amount));
                    var Word = convertNumberToWords(Math.ceil(Amount));
                    console.log(Word);
                    $('#txtGrandTotalinwords').text("Rupees " + " " + Word + " " + "Only");
                    $('#txtGrandTotalinwords').val("Rupees " + " " + Word + " " + "Only");
                    $('#CGFANId').val(Logg[0].cr6fc_cgfan);
                    if(Logg[0].cr6fc_cgfan != null){
                    $('#CGFANNo').text(Logg[0].cr6fc_cgfan);
                    }
                    else{
                        $('#CGFANNo').text();
                    }
                    $('#txtFPOName').text(Logg[0].cr6fc_fpo);
                    if (Logg[0].cr6fc_soedate != null) {
                        $('#txtSOEdt').text(GetCreatedDateTime(Logg[0].cr6fc_soedate))
                    }
                    bindUTRDetailsData(Logg[0].cr6fc_renewalsoedetailsid)
                    bindTaxInvoiceData(Logg[0].cr6fc_renewalsoedetailsid)
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

var txtTaxId;
function bindTaxInvoiceData(vSOEID) {
    var requestUri = location.origin + "/_api/cr6fc_renewaltaxinvoices?$select=cr6fc_soeid,cr6fc_renewaltaxinvoiceid&$filter=cr6fc_soeid eq " + vSOEID + "";
    
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
            try {
                var Logg = data.value;                
                txtTaxId = Logg[0].cr6fc_renewaltaxinvoiceid;
            }
            catch (e) {
            }
        },
        error: function () {
            console.log("error");
        }
    });

}


function ShowSOE()
{
		var url=location.origin + "/RenewalSOEDetails/?Item="+InternId;
		window.open(url, "_blank");

	//window.location.href="https://nabardmumbai.sharepoint.com/sites/FPOCGPortal/SitePages/SOEDetails.aspx?Item="+InternId;			                 
}
var UTRColl;
var UTRInternalID;
function bindUTRDetailsData(vSOEID) {
    var requestUri = location.origin + "/_api/cr6fc_renewalutrdetailses?$select=cr6fc_renewalutrdetailsid,cr6fc_paymentpaid,cr6fc_paymentreceiveddate,cr6fc_paymentstatus,cr6fc_paymentdate,cr6fc_utrno&$filter=cr6fc_soeid eq '" + vSOEID + "'";
    // var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('UTRDetails')//items?$top=500&$select=*&$filter=(SOEID eq '"+vSOEID+"')";
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
            UTRColl = data.value;
            UTRInternalID = UTRColl[0].cr6fc_renewalutrdetailsid;
            try {
                if (UTRColl.length > 0) {
                    //  $('#txtAmount').text(Math.ceil(UTRColl[0].PaymentPaid));
                    var PaymentPaid;
                    if (UTRColl[0].cr6fc_paymentpaid == '' || UTRColl[0].cr6fc_paymentpaid == null) {
                        PaymentPaid = "0";
                    }
                    else {
                        PaymentPaid = UTRColl[0].cr6fc_paymentpaid;
                    }
                    $('#txtAmount').text(Math.ceil(PaymentPaid));
                    var Word = convertNumberToWords(Math.ceil(PaymentPaid));
                    console.log(Word);
                    $('#txtAmountinwords').text("Rupees " + " " + Word + " " + "Only");
                    $('#txtAmountinwords').val("Rupees " + " " + Word + " " + "Only");
                        if(UTRColl[0].cr6fc_utrno != null){
                    $('#txtUTRNo').text(UTRColl[0].cr6fc_utrno)
                        }
                        else{
                            $('#txtUTRNo').text();
                        }
                    //document.getElementById("txtPaymentdt").text=UTRColl[0].PaymentDate.substring(0,UTRColl[0].PaymentDate.indexOf("T"));;
                    if (UTRColl[0].cr6fc_paymentdate != null) {
                        $('#txtPaymentdt').text(GetCreatedDateTime(UTRColl[0].cr6fc_paymentdate))
                    }
                    $('#ddlPaymentReceived').text(UTRColl[0]['cr6fc_paymentstatus@OData.Community.Display.V1.FormattedValue']);
                    if (UTRColl[0].cr6fc_paymentreceiveddate != null) {
                        $('#dtpaymentreceived').text(GetCreatedDateTime(UTRColl[0].cr6fc_paymentreceiveddate));
                    }
                    $('#hdnPaymentReceivedt').val(UTRColl[0].cr6fc_paymentreceiveddate)


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

function GetCounterCGPAN() {
    var vRetVal = '';
    var hdnCounter = '';
    var hdnFPOPAN = document.getElementById("CGPANNo").value;
	var requestUri = location.origin + "/_api/cr6fc_countermasters?$select=cr6fc_cgapplicationno,cr6fc_countermasterid&$filter=cr6fc_name eq 'CGPAN' and cr6fc_entrytype eq 1";

    // var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CounterMaster')//items?$top=500&$select=CGApplicationNo,ID,Title&$filter=Title eq 'CGPAN'";
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
                var paymentdt = $('#hdnPaymentReceivedt').val()
                var dtt = new Date(paymentdt);
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
                    var ItemId = Logg[0].cr6fc_cgapplicationno;

                    hdnCounter = parseInt(ItemId) + 1;

                    hdnCounter = '' + hdnCounter;
                    var hdnval = '';
                    if (hdnCounter.length == 1) {
                        hdnval = "0000"
                    }
                    else if (hdnCounter.length == 2) {
                        hdnval = "000"
                    }
                    else if (hdnCounter.length == 3) {
                        hdnval = "00"
                    }
                    else if (hdnCounter.length == 4) {
                        hdnval = "0"
                    }

                    vRetVal = 'GFFPO' + dd + '' + calmonth + '' + yyyy + '' + hdnFPOPAN + '' + hdnval + hdnCounter;
                    document.getElementById("hdnDigitalRequestNoCGFAN").value = vRetVal;
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

function GetTaxCounter() {
    var vRetVal = '';
    var hdnCounter = '';
	var requestUri = location.origin + "/_api/cr6fc_countermasters?$select=cr6fc_cgapplicationno,cr6fc_countermasterid&$filter=cr6fc_name eq 'Tax' and cr6fc_entrytype eq 1";
    // var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CounterMaster')//items?$top=500&$select=CGApplicationNo,ID,Title&$filter=Title eq 'Tax'";
    var requestHeaders = { "accept": "application/json;odata=verbose" };
    $.ajax({
        url: requestUri,
		type: "GET",
        headers: {
			"accept": "application/json;odata=verbose",
			"content-type": "application/json;odata=verbose"
		},
        async: false,
        success: function (data) {
            var Logg = data.value;
            try {
                var dtt = new Date();
                if (Logg.length > 0) {
                    var ItemId = Logg[0].cr6fc_cgapplicationno;
                    var fiscalyear = "";
                    var today = new Date();
                    if ((today.getMonth() + 1) <= 3) {
                        fiscalyear = (today.getFullYear() - 1) + "-" + today.getFullYear()
                    } else {
                        fiscalyear = today.getFullYear() + "-" + (today.getFullYear() + 1)
                    }
                    fiscalyear = fiscalyear.replace("20", "");
                    fiscalyear = fiscalyear.replace("20", "");
                    hdnCounter = parseInt(ItemId) + 1;
                    var hdnCounter_str = hdnCounter.toString();

                    var counter_length = hdnCounter_str.length;

                    if (counter_length < 5) {
                        var padding_zeros = '0'.repeat(5 - counter_length);
                        hdnCounter_str = padding_zeros + hdnCounter_str;
                    }

                    vRetVal = 'TFPO' + '/' + hdnCounter_str + '/' + fiscalyear;
                    document.getElementById("hdnDigitalRequestNo").value = vRetVal;
                    document.getElementById("hdnCounterItemID").value = Logg[0].cr6fc_cgapplicationno;
                    document.getElementById("hdnCounterItemID1").value = Logg[0].cr6fc_countermasterid;

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
var successCGFANCounter;
function UpdateCounterCGFAN(token) {
    debugger;
    var itemId = document.getElementById("hdnCounterItemID1CGFAN").value;
    var hdnCounter = document.getElementById("hdnCounterItemIDCGFAN").value;
    hdnCounter1 = parseInt(hdnCounter) + 1;
    var data1 = JSON.stringify(
        {
            'cr6fc_cgapplicationno': hdnCounter1.toString()
        });
    $.ajax({
        url: "/_api/cr6fc_countermasters(" + itemId + ")",
        type: "PATCH",
        contentType: "application/json;odata=verbose",
        async: false,
        data: data1,
        headers: {
            __RequestVerificationToken: token,
            contentType: "application/json;odata=verbose",
            XRequestDigest: $("#__REQUESTDIGEST").val(),
            IFMATCH: "*",
            XHttpMethod: "PATCH"
        },
        success: function (data,textstatus,xhr) {
           successCGFANCounter = xhr.getResponseHeader('entityid');
        },
        error: function (e) {
        }
    });
}
var successcounter;
function UpdateCounter(token) {
    debugger;
    var itemId = document.getElementById("hdnCounterItemID1").value;
    var hdnCounter = document.getElementById("hdnCounterItemID").value;
    hdnCounter1 = parseInt(hdnCounter) + 1;
    var data1 = JSON.stringify(
        {
            
            'cr6fc_cgapplicationno': hdnCounter1.toString()
        });
    $.ajax({
        url: "/_api/cr6fc_countermasters(" + itemId + ")",
        type: "PATCH",
        contentType: "application/json;odata=verbose",
        async: false,
        data: data1,
        headers: {
            __RequestVerificationToken: token,
            contentType: "application/json;odata=verbose",
            XRequestDigest: $("#__REQUESTDIGEST").val(),
            IFMATCH: "*",
            XHttpMethod: "PATCH"
        },
        success: function (data,textStatus,xhr) {
           successcounter = xhr.getResponseHeader('entityid');
            // AddDashBoard(document.getElementById("hdnDigitalRequestNo").value, document.getElementById("hdnApprvlNotesItemID").value);
            //alert('Data Done')
        },
        error: function (e) {
        }
    });
}
var successrenewaltax;
function updateTaxInvoice(token) {
    var vTitle = GetTaxCounter();
    var vCGFANTitle = GetCounterCGPAN();

    //var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('TaxInvoices')/items";
    var data = JSON.stringify(
        {

            "cr6fc_cgpan": vCGFANTitle,
            "cr6fc_invoiceno": vTitle,

        });

    $.ajax({
		url: "/_api/cr6fc_renewaltaxinvoices(" + txtTaxId + ")",
        type: "PATCH",
        contentType: "application/json;odata=verbose",
        async: false,
        data: data,
        headers: {
            __RequestVerificationToken: token,
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-Http-Method": "PATCH"
        },

        success: function (success,textstatus,xhr) {
            successrenewaltax = xhr.getResponseHeader('entityid');
            UpdateCounter(token);
            UpdateCounterCGFAN(token);

        },
        error: function (error) {
            console.log(error);
            //alert('Some error occured. Please try again later.');
            alert('Some error occured while adding data in TAX Invoice list. Please try again later.');
            console.log(error);
        }
    })
}
var successrenewal;
var succescgapp;
function SubmitData() {	
	var CGStatus;
	var hdWFID=$('#hdWFID').val();
	var txtRemarks=$('#txtRemarks').val();
	var IRClassification=$('#IRClassification').val();
	var hdnCGFeeStartDt=$('#hdnCGFeeStartDt').val()
	var hdnCGFeeEndDt=$('#hdnCGFeeEndDt').val()
	var hdnCGStatus=$('#hdnCGStatus').val();
	var hdnDateofNPA=$('#hdnDateofNPA').val();
	var hdnTypeOfFacilityCGApp=$('#hdnTypeOfFacilityCGApp').val();

	if(IRClassification=="SMA- 0" || IRClassification=="SMA- 1" || IRClassification=="SMA- 2" || IRClassification=="Standard" || IRClassification== "Standard - 0 Days Past Due (DPD)")
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
			var hdnCGFeeEndDtNew=new Date(hdnCGFeeEndDt);
			hdnCGFeeEndDtNew=hdnCGFeeEndDtNew.setDate(hdnCGFeeEndDtNew.getDate() + 1);
			hdnCGFeeEndDtNew=new Date(hdnCGFeeEndDtNew);
			var currDate=new Date();
			var currDateYear=currDate.getFullYear()
			var CurrMonth=currDate.getMonth();
			if(CurrMonth > 2)
			{
				currDateYear=currDateYear+1;
			}
			var findDate=currDateYear+"-3-31"
			var hdn31March=new Date(findDate);
			
			var hdnGuranteeEndDtNew=new Date(hdnGuranteeEndDt)
			var date;
			if(hdn31March < hdnloanClosedDtNew)
			{
				date=hdn31March;
			}
			else
			{
				date=hdnloanClosedDtNew;
			}
		
			if(hdnGuranteeEndDtNew > date)
			{
				date=date;
			}

	}
	if(IRClassification=="Substandard" || IRClassification=="Doubtful" || IRClassification=="Loss")
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
		  if(EndDateOfPrincipleMoratium > EndDateOfInterestMoratium)
		  {
		  	lockInPeriod=EndDateOfInterestMoratium;
		  }
		  else
		  {
		  	lockInPeriod=EndDateOfPrincipleMoratium;
		  }
		  
		  if(lockInPeriod > hdnCGStartdtforTermLoan)
		  {
		  	lockInPeriod=hdnCGStartdtforTermLoan;
		  }
		  var lockinPeriodNew=lockInPeriod.setDate(lockInPeriod.getDate() + 365);
		  lockinPeriodNew=new Date(lockinPeriodNew);
		
		  	var hdnDateofNPANew=new Date(hdnDateofNPA);
			var lstInnvocationDt='';
			if(hdnDateofNPANew > lockinPeriodNew) 
			{
				lstInnvocationDt=hdnDateofNPANew;
			}
			else
			{
				lstInnvocationDt=lockinPeriodNew;
			}
			var lastdateofInnvocation=lstInnvocationDt.setDate(lstInnvocationDt.getDate() + 365);
			lastdateofInnvocation=new Date(lastdateofInnvocation);
				var currDate=new Date();
				var currDateYear=currDate.getFullYear()
				var CurrMonth=currDate.getMonth();
				if(CurrMonth > 2)
				{
					currDateYear=currDateYear+1;
				}
				var findDate=currDateYear+"-3-31"
				var hdn31March=new Date(findDate);
	
				var date='';
				if(hdn31March > lastdateofInnvocation)
				{
					date=hdn31March;
				}
				else
				{
					date=lastdateofInnvocation;
				}
		
		}
		else if(hdnTypeOfFacilityCGApp=="WC/CC Limit")
		{
				var lockinPeriodNew = hdnCGFeeEndDtNew;
					var hdnDateofNPANew=new Date(hdnDateofNPA);
				var lstInnvocationDt='';
				if(hdnDateofNPANew > lockinPeriodNew) 
				{
					lstInnvocationDt=hdnDateofNPANew;
				}
				else
				{
					lstInnvocationDt=lockinPeriodNew;
				}
				var lastdateofInnvocation=lstInnvocationDt.setDate(lstInnvocationDt.getDate() + 364);
				lastdateofInnvocation=new Date(lastdateofInnvocation);
					var currDate=new Date();
					var currDateYear=currDate.getFullYear()
					var CurrMonth=currDate.getMonth();
					if(CurrMonth > 2)
					{
						currDateYear=currDateYear+1;
					}
					var findDate=currDateYear+"-3-31"
					var hdn31March=new Date(findDate);
		
					var date='';
					if(hdn31March > lastdateofInnvocation)
					{
						date=hdn31March;
					}
					else
					{
						date=lastdateofInnvocation;
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
    if(CGStatus == "In Force 0")
    {
        CGStatus = "0";
    }
    if(CGStatus == "In Force 1")
    {
        CGStatus = "1";
    }
    if(CGStatus == "In Force 2")
    {
        CGStatus = "2";
    }
    if(CGStatus == "In Force 3")
    {
        CGStatus = "3";
    }
    if(CGStatus == "In Force 4")
    {
        CGStatus = "4";
    }
    if(CGStatus == "In Force 5")
    {
        CGStatus = "5";
    }
    if(CGStatus == "In Force 6")
    {
        CGStatus = "6";
    }

	var x = confirm("Do you wish to Approve ?");
	if(x)
	{
			var	Data = JSON.stringify(
		    {		        	        
                "cr6fc_status": "15",
                "cr6fc_nsapproverpaymentremark": txtRemarks,
                "cr6fc_cgstatus":CGStatus				 
		    });	  
    shell.getTokenDeferred().done(function (token) {
        $.ajax({

            url: "/_api/cr6fc_renewalcgapplications("+vItemID+")",
            type: "PATCH",
            contentType: "application/json;odata=verbose",
            async: false,
            data: Data,
            headers: {
                __RequestVerificationToken: token,
                "accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-Http-Method": "PATCH"
            },
            success: function (data,textstatus,xhr) {
                successrenewal = xhr.getResponseHeader('entityid');
							    	var CGData = JSON.stringify(
								    {								        
										"cr6fc_cgstatus":CGStatus,
										"cr6fc_renewalrequestongoing":"1",
										"cr6fc_statuschangeddate":new Date()			 
								    });
				
					    			

                                        $.ajax({

                                            url: "/_api/cr6fc_cgaplications("+hdWFID+")",
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
                                            success: function (data,textStatus,xhr) {
                                                succescgapp = xhr.getResponseHeader('entityid');
								    	updateTaxInvoice(token)							    	
				    				


							       	 alert('Data  Submit Successfully.');
                                        // window.location.href=location.origin + "/NSApproverCGFeesDB/";    
                                      //  window.location.href = location.origin + "/RefreshingCache/?id="+successrenewal+","+succescgapp+","+successrenewaltax+","+successcounter+","+successCGFANCounter+"&tbl=cr6fc_renewalcgapplications,cr6fc_cgapplicationses,cr6fc_renewaltaxinvoices,cr6fc_countermasters,cr6fc_countermasters&col=cr6fc_cacherefreshedon&red=NSApproverCGFeesDB" 
                                        window.location.href = location.origin + "/RefreshingCache/?id="+successrenewal+","+succescgapp+","+successrenewaltax+","+successcounter+","+successCGFANCounter+"&tbl=cr6fc_renewalcgapplications,cr6fc_cgaplications,cr6fc_renewaltaxinvoices,cr6fc_countermasters,cr6fc_countermasters&col=cr6fc_cacherefreshedon&red=NSApproverCGFeesDB"            
								    },
								    error: function (e) 
								    {
								    	console.log(e);
								    }
								});

							    },
							    error: function (e) 
							    {
							    	console.log(e);
							    }
							});
                        })
	}

	
     }
  
   
 
//For Attachments copied from NSApprover Payment

function getFileContentsAndMetadata(entityID,token) {
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
            uploadFile(fileContent,fileName,entityID,token,file.type,file);
        };
    }
}
 
// Upload the file to
function uploadFile(fileContent,fileName,entityID,token,Filecontenttype) {
	
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
	url: "/_api/cr6fc_cgappfileses(" + entityID + ")/cr6fc_nsapproverpaymentfile?x-ms-file-name=" + fileName,
	type: "PUT",
	async: false,
	contentType: "application/octet-stream",
	processData: false,
	// data: fileContent,
	data: fileContent,
	headers: header,
	success: function (data, textStatus, xhr) {
		//window.location.href = location.origin + "/NSApproverDashboard";
        window.location.href = location.origin + "/NSApproverCGFeesDashboard/";

	},
	error: function (xhr, textStatus, errorThrown) {
		console.log(errorThrown)
	}
});
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
function getfileNSChecker(vItemID)
{
	$.ajax({
	type: "GET",
   // url: "/_api/cr6fc_cgapplicationses("+vItemID+")/cr6fc_nscheckercgappfile",
   url:"/_api/cr6fc_cgappfileses?$select=*&$filter=cr6fc_cgid eq ("+vItemID+") and cr6fc_name eq 'NSCheckerUTR'",
    contentType:"application/json",
	async: false,
    success: function(res) {
        console.log(res);
		var Logg = res.value;
		var vhtml1='';
		if(Logg.length>0){
			$("#NSApproverAttach").show();
          for(var i = 0;i<Logg.length;i++){
			var cgappfilename12 = Logg[i].cr6fc_nscheckerfile_name
			vhtml1+="<a href='/_api/cr6fc_cgappfileses(" + Logg[i].cr6fc_cgappfilesid + ")/cr6fc_nscheckerpaymentfiles/$value'>"+Logg[i].cr6fc_nscheckerpaymentfiles_name+"</a>";

		  }
		  $('#additionalDocs').append(vhtml1);
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
	//window.location.replace(link)
	var file = dataURLtoFile(link,cgpaymentdoc);
	saveAs(file, cgpaymentdoc);
	console.log(file);
}


function updatecgappfile(vItemID){
	var data = JSON.stringify(
		{
			"cr6fc_cgid": vItemID,
			"cr6fc_name":"NSCheckerUTR",
			"cr6fc_cgapplicationno": document.getElementById("txtApplicationNo").value
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
				//alert('Some error occured. Please try again later.');
				alert('Some error occured while adding data in CGApplications list. Please try again later.');
				console.log(error);
	
			}
	
	
		})
	})
}