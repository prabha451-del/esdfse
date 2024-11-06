var vItemID;
var vTotalDocLength = 0;
var fileArray = [];
var otherfileArray=[];
var AttchLength=0;
var arraycount = 0;
var vTaskID;
var  cgpaymentdoc;
var cgapymentnsApprover;
$(document).ready(function () {
    $('title').text('NABSanrakshan Payment View Form');
     vItemID= GetQueryStingValue()["Item"];
     Page= GetQueryStingValue()["Page"];
      bindCGApplicationData(vItemID);
     bindSOEDetailsData(vItemID);
     getfileNSChecker(vItemID)
     getfilensApprover(vItemID);
    // getOtherDocDataLatest(vItemID);
     //  $('#fileAttachInvoice').multifile();
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
      
		var url=location.origin+"/TaxInvoices/?Item="+InternId;
		window.open(url, "_blank");
	
}
function Exit()
{
if(Page=="ELImaker")
{
window.location.href=location.origin+"/ELIMakerCGFeeDashboard/";
}
else if(Page=="ELIChecker")
{
window.location.href=location.origin+"/ELICheckerCGFeesDashboard/";
}
else if(Page=="NSChecker"){
window.location.href=location.origin+"/NSCheckerCGFeeDashboard/";
}
else if(Page == "NSApprover"){
window.location.href=location.origin+"/NSApproverCGFeesDashboard/";
}
else if(Page == '' || Page == undefined){
window.open('','_self').close();
}
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
		/*buttons: [{
		text: "View",
		click: function () {
			
		}
		}],*/                
		show: { effect: "clip", duration: 200 }
		});
		
		$("#inputDialog2").dialog("open");

}

function ClosePopup()
{
	$("#inputDialog2").dialog("close");	
}

 function bindCGApplicationData(vItemID){    
   // var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CGApplications')//items?$top=500&$select=*,ELIChecker/Title,FPOActivities111/FPOActivity,RegionOfFPO/Region,FPOState/State,BusinessFPOState/State&$expand=ELIChecker,RegionOfFPO,FPOActivities111,FPOState,BusinessFPOState&$filter=(ID eq '"+vItemID+"')";
   queryList = location.origin+"/_api/cr6fc_cgaplications?$select=cr6fc_nameoflendinginstitution,cr6fc_cgaplicationid,cr6fc_status,cr6fc_name,cr6fc_nameoffpo,createdon,cr6fc_nscheckerpaymentfile,cr6fc_nsapproverpaymentfile,cr6fc_name,_cr6fc_elichecker_value,cr6fc_nameoflendinginstitution,cr6fc_status,cr6fc_nameoffpo,cr6fc_eilcheckerutrcertificateviewdate,cr6fc_elicheckerpaymentremark,cr6fc_elimakerpaymentremark,cr6fc_nschackerpaymentremark,cr6fc_nsapproverpaymentremark&$filter=cr6fc_cgaplicationid eq '"+vItemID+"'"; 
   var requestHeaders = { "accept": "application/json;odata=verbose" };
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
                cgpaymentdoc=Logg[0].cr6fc_nscheckerpaymentfile_name;
                cgapymentnsApprover =Logg[0].cr6fc_nsapproverpaymentfile_name;
                $("#txtApplicationNo").text(Logg[0].cr6fc_name);
              		$("#txtCGApplicationNo").val(Logg[0].cr6fc_name);
              		$("#txtELICheckerNamePayment").text(Logg[0]["_cr6fc_elichecker_value@OData.Community.Display.V1.FormattedValue"]);
              		$("#instituteIdNewPayment").text(Logg[0].cr6fc_nameoflendinginstitution);
              		
              		if(Logg[0]["cr6fc_status@OData.Community.Display.V1.FormattedValue"]=="Payment Processed by ELI" || Logg[0]["cr6fc_status@OData.Community.Display.V1.FormattedValue"]=="Payment Confirmed by NABSaranrakshan" || Logg[0]["cr6fc_status@OData.Community.Display.V1.FormattedValue"]=="Guarantee Issued")
              		{
              			$('#btnInvoice').show();
              			$('#btnPaymentCertificate').show();
              		}
              		$("#txtNameOfFPO1").val(Logg[0].cr6fc_nameoffpo);
					if(Logg[0].cr6fc_eilcheckerutrcertificateviewdate!=null && Logg[0].cr6fc_eilcheckerutrcertificateviewdate!=undefined && Logg[0].cr6fc_eilcheckerutrcertificateviewdate!='')
					{
						$('#dtproceedPayment').text(GetCreatedDateTime(Logg[0].cr6fc_eilcheckerutrcertificateviewdate))
					}
              		$('#txtId').val(Logg[0].cr6fc_cgaplicationid);
                  
                   $("#txtNameOfLendingInstitution").text(Logg[0].cr6fc_nameoflendinginstitution);
                   	//document.getElementById("txtELiCheckerComments").value=Logg[0].cr6fc_elicheckerpaymentremark;//added by shivaprabha
					if(Logg[0].cr6fc_elicheckerpaymentremark!=null && Logg[0].cr6fc_elicheckerpaymentremark!=undefined &&Logg[0].cr6fc_elicheckerpaymentremark!='')
					{
			
						$('#checkerremark').show();
						document.getElementById("txtEliCheckerRemarks").innerHTML=Logg[0].cr6fc_elicheckerpaymentremark;
					}    
                    else{$('#checkerremark').hide();}              
                   if(Logg[0].cr6fc_elimakerpaymentremark!=null &&Logg[0].cr6fc_elimakerpaymentremark!=undefined && Logg[0].cr6fc_elimakerpaymentremark!='')
					{
						$('#Makerremark').show();
						document.getElementById("txtEliMakerRemarks").innerHTML=Logg[0].cr6fc_elimakerpaymentremark;
					}
                    else{$('#Makerremark').hide();}
                    if(Logg[0].cr6fc_nschackerpaymentremark!=null && Logg[0].cr6fc_nschackerpaymentremark!=undefined &&Logg[0].cr6fc_nschackerpaymentremark!='')
					{
			
						$('#NScheckerremark').show();
						document.getElementById("txtNSCheckerRemarks").innerHTML=Logg[0].cr6fc_nschackerpaymentremark;
					}    
                    else{$('#NScheckerremark').hide();}              
                   if(Logg[0].cr6fc_nsapproverpaymentremark!=null &&Logg[0].cr6fc_nsapproverpaymentremark!=undefined && Logg[0].cr6fc_nsapproverpaymentremark!='')
					{
						$('#NSApproverremark').show();
						document.getElementById("txtNSApproverRemarks").innerHTML=Logg[0].cr6fc_nsapproverpaymentremark;
					}
                    else{$('#NSApproverremark').hide();}

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
var WFID="" ;
var InternId="";
//var SOEID;
function bindSOEDetailsData(vItemID){    
 //   var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SOEDetails')//items?$top=500&$select=*,BillToState/State,BillToState/Id,BillToState/StateCode&$expand=BillToState&$filter=(WFID eq '"+vItemID+"')";
      queryList = location.origin+"/_api/cr6fc_soedetailses?$select=cr6fc_wfid,cr6fc_creditguaranteefee,cr6fc_grandtotal,cr6fc_taxamount,cr6fc_cgfan,cr6fc_fpo,cr6fc_soedate,cr6fc_soedetailsid&$filter=(cr6fc_wfid eq '"+vItemID+"')"; 
 var requestHeaders = { "accept": "application/json;odata=verbose" };
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
            WFID =  Logg[0].cr6fc_wfid;
            InternId = Logg[0].cr6fc_soedetailsid;        
            try 
            {
              if(Logg.length > 0)
              {     
                   $('#txtSOENo').text(Logg[0].cr6fc_name)
                    var CreditGuaranteeFee;
                  if(Logg[0].cr6fc_creditguaranteefee == '' || Logg[0].cr6fc_creditguaranteefee == null)
                   {
                   	CreditGuaranteeFee ="0";
                   }
                   else
                   {
                   	CreditGuaranteeFee=Logg[0].cr6fc_creditguaranteefee;
                   }
                   $('#txtCreditGuranteeFee').text(Math.ceil(CreditGuaranteeFee));
                   var Word=convertNumberToWords(Math.ceil(CreditGuaranteeFee));
                   console.log(Word);
                   $('#txtCreditGuranteeFeeinwords').text("Rupees " + " " + Word + " " + "Only" );
                   $('#txtCreditGuranteeFeeinwords').val("Rupees " + " " + Word + " " + "Only" );
                   
                   //$('#txtTaxAmt').text(Math.ceil(Logg[0].TaxAmount));
                          var GrandTotal;
                  if(Logg[0].cr6fc_grandtotal== '' || Logg[0].cr6fc_grandtotal== null)
                   {
                   	GrandTotal="0";
                   }
                   else
                   {
                   	GrandTotal=Logg[0].cr6fc_grandtotal;
                   }
                   $('#txtGrandTotal').text(Math.ceil(GrandTotal));
                   var Word=convertNumberToWords(Math.ceil(GrandTotal));
                   console.log(Word);
                   $('#txtTaxAmtinwords').text("Rupees " + " " + Word + " " + "Only" );
                   $('#txtTaxAmtinwords').val("Rupees " + " " + Word + " " + "Only" );                  
                
                   var Amount;
                  if(Logg[0].cr6fc_taxamount == '' || Logg[0].cr6fc_taxamount == null)
                   {
                   	Amount="0";
                   }
                   else
                   {
                   	Amount=Logg[0].cr6fc_taxamount;
                   }
                   $('#txtTaxAmt').text(Math.ceil(Amount));
                   var Word=convertNumberToWords(Math.ceil(Amount));
                   console.log(Word);
                   $('#txtGrandTotalinwords').text("Rupees " + " " + Word + " " + "Only" );
                   $('#txtGrandTotalinwords').val("Rupees " + " " + Word + " " + "Only" );  

                   //$('#txtTaxAmt').text(Math.ceil(Logg[0].TaxAmount));
                   //$('#txtGrandTotal').text(Math.ceil(Logg[0].GrandTotal));//CGFANNo
                   $('#CGFANId').val(Logg[0].cr6fc_cgfan);
                   $('#CGFANNo').text(Logg[0].cr6fc_cgfan);
                   $('#txtFPOName').text(Logg[0].cr6fc_fpo);
                   $('#txtSOEdt').text(GetCreatedDateTime(Logg[0].cr6fc_soedate))

                   
                   bindUTRDetailsData(Logg[0].cr6fc_soedetailsid) 
                   bindTaxInvoiceData(Logg[0].cr6fc_soedetailsid)          
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
function bindTaxInvoiceData(vSOEID){    
    //var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('TaxInvoices')//items?$top=500&$select=*&$filter=(SOEID eq '"+vSOEID+"')";
    queryList = location.origin+"/_api/cr6fc_taxinvoiceses?$select=cr6fc_soeid,cr6fc_taxinvoicesid&$filter=(cr6fc_soeid eq '"+vSOEID+"')"; 
    var requestHeaders = { "accept": "application/json;odata=verbose" };
    $.ajax({
        url: queryList,
		type: "GET",
		async: false,
		headers: {
		"accept": "application/json;odata=verbose",
		"content-type": "application/json;odata=verbose"
		},
        success: function (data) {
            try 
            {
            var Logg = data.value;  
            //WFID =  Logg[0].WFID;
            txtTaxId= Logg[0].cr6fc_taxinvoicesid;
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
		var url="/SOEDetails/?Item="+InternId;
		window.open(url, "_blank");

	//window.location.href="https://nabardmumbai.sharepoint.com/sites/FPOCGPortalUAT/SitePages/SOEDetails.aspx?Item="+InternId;			                 
}
var UTRColl;
var UTRInternalID;
function bindUTRDetailsData(vSOEID){    
    //var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('UTRDetails')//items?$top=500&$select=*&$filter=(SOEID eq '"+vSOEID+"')";
    queryList = location.origin+"/_api/cr6fc_utrdetailses?$select=cr6fc_soeid,cr6fc_utrdetailsid,cr6fc_paymentpaid,cr6fc_utrno,cr6fc_paymentdate,cr6fc_paymentstatus,cr6fc_paymentreceiveddate&$filter=(cr6fc_soeid eq '"+vSOEID+"')"; 
    var requestHeaders = { "accept": "application/json;odata=verbose" };
    $.ajax({
        url: queryList,
        method: 'GET',
        async:false,
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
        },
        success: function (data) {
            UTRColl = data.value;  
       		UTRInternalID=UTRColl[0].cr6fc_utrdetailsid;
            try 
            {
              if(UTRColl.length > 0)
              {     
                 //  $('#txtAmount').text(Math.ceil(UTRColl[0].PaymentPaid));
                   var PaymentPaid;
                  if(UTRColl[0].cr6fc_paymentpaid == '' ||UTRColl[0].cr6fc_paymentpaid == null)
                   {
                   	PaymentPaid="0";
                   }
                   else
                   {
                   	PaymentPaid=UTRColl[0].cr6fc_paymentpaid;
                   }
                   $('#txtAmount').text(Math.ceil(PaymentPaid));
                   var Word=convertNumberToWords(Math.ceil(PaymentPaid));
                   console.log(Word);
                   $('#txtAmountinwords').text("Rupees " + " " + Word + " " + "Only" );
                   $('#txtAmountinwords').val("Rupees " + " " + Word + " " + "Only" ); 

                   $('#txtUTRNo').text(UTRColl[0].cr6fc_utrno)
                   //document.getElementById("txtPaymentdt").text=UTRColl[0].PaymentDate.substring(0,UTRColl[0].PaymentDate.indexOf("T"));;
                   $('#txtPaymentdt').text(GetCreatedDateTime(UTRColl[0].cr6fc_paymentdate))
                  $('#ddlPaymentReceived').text(UTRColl[0]["cr6fc_paymentstatus@OData.Community.Display.V1.FormattedValue"]);
                   $('#dtpaymentreceived').text(GetCreatedDateTime(UTRColl[0].cr6fc_paymentreceiveddate));
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
        var hdnFPOPAN=document.getElementById("CGPANNo").value;

    var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CounterMaster')//items?$top=500&$select=CGApplicationNo,ID,Title&$filter=Title eq 'CGPAN'";
    var requestHeaders = { "accept": "application/json;odata=verbose" };
    $.ajax({
        url: requestUri,
        contentType: "application/json;odata=verbose",
        headers: requestHeaders,
        async: false,
        cache: false,
        success: function (data) {
            var Logg = data.d.results;
            try {
            	var paymentdt=$('#hdnPaymentReceivedt').val()
               var dtt = new Date(paymentdt);
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
                if (data.d.results.length > 0) {
                    var ItemId = data.d.results[0].CGApplicationNo;
                    
                    hdnCounter = parseInt(ItemId) + 1;
                    vRetVal = 'CGFPO'+ dd +''+ calmonth +''+ yyyy +''+hdnFPOPAN+''+'000'+ hdnCounter;
                    document.getElementById("hdnDigitalRequestNoCGFAN").value = vRetVal;
                    document.getElementById("hdnCounterItemIDCGFAN").value = data.d.results[0].CGApplicationNo;
                    document.getElementById("hdnCounterItemID1CGFAN").value = data.d.results[0].ID;

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
    var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CounterMaster')//items?$top=500&$select=CGApplicationNo,ID,Title&$filter=Title eq 'Tax'";
    var requestHeaders = { "accept": "application/json;odata=verbose" };
    $.ajax({
        url: requestUri,
        contentType: "application/json;odata=verbose",
        headers: requestHeaders,
        async: false,
        cache: false,
        success: function (data) {
            var Logg = data.d.results;
            try {
               var dtt = new Date();
                if (data.d.results.length > 0) {
                    var ItemId = data.d.results[0].CGApplicationNo;
                      var fiscalyear = "";
					  var today = new Date();
					  if ((today.getMonth() + 1) <= 3) {
					    fiscalyear = (today.getFullYear() - 1) + "-" + today.getFullYear()
					  } else {
					    fiscalyear = today.getFullYear() + "-" + (today.getFullYear() + 1)
					  }
					  fiscalyear=fiscalyear.replace("20", "");
					fiscalyear=fiscalyear.replace("20", "");
                    hdnCounter = parseInt(ItemId) + 1;
                    vRetVal = 'TFPO'+ '/' + hdnCounter + '/' + fiscalyear;
                    document.getElementById("hdnDigitalRequestNo").value = vRetVal;
                    document.getElementById("hdnCounterItemID").value = data.d.results[0].CGApplicationNo;
                    document.getElementById("hdnCounterItemID1").value = data.d.results[0].ID;

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
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('CounterMaster')/getItemByStringId('" + itemId + "')",
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
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('CounterMaster')/getItemByStringId('" + itemId + "')",
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

function updateTaxInvoice()
{
	var vTitle = GetTaxCounter(); 
	var vCGFANTitle = GetCounterCGPAN(); 

	//var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('TaxInvoices')/items";
		    var data = JSON.stringify(
		      {
		          "__metadata":
		          {
		              "type": "SP.Data.TaxInvoicesListItem"
		          },
		          	"CGPAN":vCGFANTitle,
		          	"InvoiceNo":vTitle,

		      });
   
		$.ajax({
			url: _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/getbytitle('TaxInvoices')/getItemByStringId('" +txtTaxId+"')",
			type: "POST",
			contentType: "application/json;odata=verbose",
		    async:false,
		    data:data,
		   	headers: {
		        "accept": "application/json;odata=verbose",
		        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
		        "IF-MATCH": "*",
		        "X-Http-Method": "PATCH"
			},
		
		    success: function (success) {
					UpdateCounter();
		    		UpdateCounterCGFAN();
		
		    	},		
				error: function (error) {
		    	console.log(error);
		        //alert('Some error occured. Please try again later.');
		        alert('Some error occured while adding data in UTRDetail list. Please try again later.');
				console.log(error);
		           }					
		      })
}
function SubmitData() {	
	//var txtCreditGuranteeFee= $("#txtCreditGuranteeFee").val();
	var txtRemarks=$('#txtRemarks').val();
	var x = confirm("Do you wish to Approve ?");
	if(x)
	{
				    			var	Data = JSON.stringify(
							    {
							        '__metadata': {
							            'type': 'SP.Data.CGApplicationsListItem'
							        },
									 "Status":"Guarantee Issued"
									 
							    });	
							    fileInput = $('#fileAttachInvoice');
		     otherfileArray=[];
    //var AttchLength=fileInput[0].files.length
	$("#attachFilesHolderOther input:file").each(function () {
        if ($(this)[0].files[0]) {
            otherfileArray.push({ "Attachment": $(this)[0].files[0] });
        }
    });
	AttchLength= otherfileArray.length;

							$.ajax({
							
							    url: _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/getByTitle('CGApplications')/getItemByStringId('" +vItemID+"')",
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
							    	updateTaxInvoice()
							    	//UpdateCounter();
				    				//UpdateCounterCGFAN();
				    					if(AttchLength!=0)
										{
											upload(vItemID)
		                                }


							       	 alert('Data  Submit Successfully.');
							       	  if(AttchLength==0 || AttchLength==null || AttchLength==''){
							       	 window.location.href="/sites/FPOCGPortalUAT/SitePages/NSApproverCGFeesDashBoard.aspx";
							       	 }
							    },
							    error: function (e) 
							    {
							    	console.log(e);
							    }
							});

	}

	
     }
  

     function getfileNSChecker(vItemID)
     {
         $.ajax({
         type: "GET",
        url:location.origin+"/_api/cr6fc_cgappfileses?$select=*&$filter=cr6fc_cgid eq ("+vItemID+") and cr6fc_name eq 'NSCheckerUTR'",
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
         },
         error: function(xhr, status, error){
             var errorMessage = xhr.status + ': ' + xhr.statusText;
             console.log(errorMessage);
             }
         });
     }
//-----------------------------------------------------------------------------------------------------------------------------------------------------

function getfilensApprover(vItemID){
	$.ajax({
	type: "GET",
   url:location.origin+"/_api/cr6fc_cgappfileses?$select=*&$filter=cr6fc_cgid eq ("+vItemID+") and cr6fc_name eq 'NSAPPROVERUTR'",
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
			vhtml1+="<a href='/_api/cr6fc_cgappfileses(" + Logg[i].cr6fc_cgappfilesid + ")/cr6fc_nsapproverpaymentfile/$value'>"+Logg[i].cr6fc_nsapproverpaymentfile_name+"</a>";

		  }
		  $('#additionalnsapprover').append(vhtml1);
		}
    },
    error: function(xhr, status, error){
        var errorMessage = xhr.status + ': ' + xhr.statusText;
        console.log(errorMessage);
		}
	});
}