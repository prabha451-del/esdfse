var vItemID;
var loggedInUserId = '';
var loggedInUserName = '';
var loggedInUserEmail = '';
$(document).ready(function () {
    loggedInUserId = $('#fpo-user-contact-id').val();
    loggedInUserName = $('#fpo-user-contact-name').val();
    loggedInUserEmail = $('#fpo-user-email').val();
    $('title').text('Tax Invoice Form');
     vItemID= GetQueryStingValue()["Item"];
 // var vTaskID= GetQueryStingValue()["Task"];
     bindSOEDetailsData(vItemID);
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
window.location.href=location.origin+"/NSApproverCGFeesDashboard/";

}

function onClickPDF(){
//window.print();
 document.getElementById("printPageButton").style.visibility = false;
var vDate=new Date();
//var currDate=GetCreatedDate1(vDate);
var txtSOENo=$('#txtTaxNo').text();
CreatePDFWithDynamiContent(txtSOENo, 'allDivcontain');


}

function CreatePDFWithDynamiContent(FileName, ContentID)
{ 
    var element = document.getElementById(ContentID);
    html2pdf(element, {
    	 //margin: [1, 1, 1, 1],
       margin: [0.5, 0.5, 0.5, 0.5],
        filename: FileName + '.pdf',
        image: {
            type: 'jpeg',
            quality: 1
        },
        html2canvas: {
            dpi: 192,
            letterRendering: true,
            scale: window.devicePixelRatio2pdf
        },
        jsPDF: {
            unit: 'in',
            format: 'a4',
            orientation: 'portrait'
        }
    })   
 }

function GetCreatedDate1(vCreatedDate)
 {
	//var vCreated=vCreatedDate;
	var today = vCreatedDate;
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


 var NSApproverColl;
 var NSCheckerApprover;
function NSApprovalMatrix() {
		  //  var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('NSApprovalMatrix')//items?$top=500&$select=*,Title,ID,User/Title,User/Id&$expand=User&$filter=Role eq 'Approver'&$orderby=ID asc";
          queryList = location.origin+"/_api/cr6fc_nsapprovalmatrixes?$select=_cr6fc_user_value&$filter=cr6fc_role eq 'Approver'&$top=5000"; 
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
		            NSApproverColl = data.value;
		            if(NSApproverColl.length>0)
		            {
		            	NSCheckerApprover=NSApproverColl[0]['_cr6fc_user_value'];
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
var WFID;
function bindSOEDetailsData(vItemID){    
 //  var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SOEDetails')//items?$top=500&$select=*,BillToState/State,BillToState/Id,BillToState/StateCode&$expand=BillToState&$filter=(ID eq '"+vItemID+"')";
 var requestUri = location.origin+"/_api/cr6fc_soedetailses?$select=cr6fc_taxamount,cr6fc_BillToState,cr6fc_soedetailsid,cr6fc_billtoname,cr6fc_billtoaddress,cr6fc_billtogstin,cr6fc_billtopan,cr6fc_soeno,cr6fc_creditguaranteefee,cr6fc_fpo,cr6fc_fpoloanaccountno,cr6fc_sanctionedamount,cr6fc_cgapplicationno,cr6fc_cgfan,cr6fc_eligibleguranteecover,cr6fc_creditguaranteefee,cr6fc_igstamount,cr6fc_cgstamount,cr6fc_sgstamount,cr6fc_ugstamount,cr6fc_grandtotal&$expand=cr6fc_BillToState($select=cr6fc_statemasterid,cr6fc_statecode,cr6fc_name)&$filter=(cr6fc_soedetailsid eq "+vItemID+")&$top=5000";
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
                WFID = Logg[0].cr6fc_wfid;
                   $('#txtbillname').text(Logg[0].cr6fc_billtoname)
                   $('#txtAddress').text(Logg[0].cr6fc_billtoaddress)
                   $('#txtState').text(Logg[0].cr6fc_BillToState.cr6fc_name)
                   $('#txtStateCode').text(Logg[0].cr6fc_BillToState.cr6fc_statecode)
                   $('#txtPlaceofSupply').text(Logg[0].cr6fc_BillToState.cr6fc_name)
                   $('#txtStateCode1').text(Logg[0].cr6fc_BillToState.cr6fc_statecode)
                   $('#txtGSTIN').text(Logg[0].cr6fc_billtogstin);
                   $('#txtPAN').text(Logg[0].cr6fc_billtopan);
                   $('#txtSOENo').text(Logg[0].cr6fc_soeno);//txtCGFee
                 //  $('#txtCGFee').val("₹ " + "" + Math.ceil(Logg[0].CreditGuaranteeFee));//txtCGFee
                   $("#txtCGFee").text("₹ " + "" +Logg[0].cr6fc_creditguaranteefee);
                   $('#txtFpo').text(Logg[0].cr6fc_fpo);//txtCGFee
                   $('#txtLoanAcc').text(Logg[0].cr6fc_fpoloanaccountno);//txtCGFee
                   $('#txtsanAmt').text("₹ " + "" +Logg[0].cr6fc_sanctionedamount);//txtCGFee
                   $('#txtCGAppNo').text(Logg[0].cr6fc_cgapplicationno);//txtCGFee
                   $('#txtCGFAN').text(Logg[0].cr6fc_cgfan);//txtCGFee
                   $('#txtElig').text("₹ " + "" + Logg[0].cr6fc_eligibleguranteecover);//txtCGFee
                   if(Logg[0].cr6fc_eligibleguranteecover)
                   $('#txtguarentystart')
                   $('#txtSubTot').text("₹ " + "" + Logg[0].cr6fc_creditguaranteefee);//txtCGFee
                   $('#txtSubtotal1').text("₹ " + "" + Logg[0].cr6fc_taxamount);
                   var IGSTAmount;
                   if(Logg[0].cr6fc_igstamount=='' || Logg[0].cr6fc_igstamount==null || Logg[0].cr6fc_igstamount=="undefined")
                   {
                   IGSTAmount="0";
                   }
                   else
                   {
                   		IGSTAmount=Logg[0].cr6fc_igstamount;
                   }
                   
                   $('#txtIGST').text("₹ " + "" + Math.ceil(IGSTAmount));//txtCGFee
                   
                   var CGSTAmount;
                   if(Logg[0].cr6fc_cgstamount=='' || Logg[0].cr6fc_cgstamount==null || Logg[0].cr6fc_cgstamount=="undefined")
                   {
                   		CGSTAmount="0";
                   }
                   else
                   {
                   CGSTAmount=Logg[0].cr6fc_cgstamount;
                   }

                   $('#txtCGST').text("₹ " + "" + Math.ceil(CGSTAmount));//txtCGFee
                   
                   var SGSTAmount;
                   if(Logg[0].cr6fc_sgstamount=='' || Logg[0].cr6fc_sgstamount==null || Logg[0].cr6fc_sgstamount=="undefined")
                   {
                   		SGSTAmount="0";
                   }
                   else
                   {
                       SGSTAmount=Logg[0].cr6fc_sgstamount;
                   }

                   $('#txtSGST').text("₹ " + "" + Math.ceil(SGSTAmount));//txtCGFee
                   
                   var UGSTAmount;
                  if(Logg[0].cr6fc_ugstamount== '' || Logg[0].cr6fc_ugstamount== null || Logg[0].cr6fc_ugstamount=="undefined")
                   {
                   	UGSTAmount="0";
                   }
                   else
                   {
                   	UGSTAmount=Logg[0].cr6fc_ugstamount;
                   }
                   $('#txtUGST').text("₹ " + "" + Math.ceil(UGSTAmount));//txtCGFee

                  var GrandTotal;
                  if(Logg[0].cr6fc_grandtotal== '' || Logg[0].cr6fc_grandtotal== null || Logg[0].cr6fc_grandtotal=="undefined")
                   {
                   	GrandTotal="0";
                   }
                   else
                   {
                   	GrandTotal=Logg[0].cr6fc_grandtotal;
                   }
                   var grandtotal = GrandTotal.replace(",","");
                   $('#txtgrandtotal').text("₹ " + "" + Math.ceil(grandtotal));
                   var Word=convertNumberToWords(Math.ceil(grandtotal));
                   console.log(Word);
                   $('#txtAmtWords').text("Rupees " + "" + Word + " " + "Only" );
                   bindTaxInvoiceData(Logg[0].cr6fc_soedetailsid);
                   bindUTRDetailsData(Logg[0].cr6fc_soedetailsid) 
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
function bindUTRDetailsData(vSOEID){    
      //var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('UTRDetails')//items?$top=500&$select=*&$filter=(SOEID eq '"+vSOEID+"')";
      var requestUri = location.origin+"/_api/cr6fc_utrdetailses?$select=cr6fc_utrdetailsid,cr6fc_paymentreceiveddate,&$filter=(cr6fc_soeid eq "+vSOEID+")&$top=5000";
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
            UTRCollNew = data.value;  
       		UTRInternalID=UTRCollNew[0].cr6fc_utrdetailsid;
            try 
            {
              if(UTRCollNew.length > 0)
              {     
              		if(UTRCollNew[0].cr6fc_paymentreceiveddate!=undefined && UTRCollNew[0].cr6fc_paymentreceiveddate!=null && UTRCollNew[0].cr6fc_paymentreceiveddate!='')
              		{
                   		$('#InvoiceDt').text(GetCreatedDateTime(UTRCollNew[0].cr6fc_paymentreceiveddate));
              		}
                      if(UTRCollNew[0].cr6fc_paymentreceiveddate!=undefined && UTRCollNew[0].cr6fc_paymentreceiveddate!=null && UTRCollNew[0].cr6fc_paymentreceiveddate!='')
              		{
                   		$('#txtguarentystart').text(GetCreatedDateTime(UTRCollNew[0].cr6fc_paymentreceiveddate));
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

function bindTaxInvoiceData(vSOEID){    
   // var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('TaxInvoices')//items?$top=500&$select=*&$filter=(SOEID eq '"+vSOEID+"')";
   var requestUri = location.origin+"/_api/cr6fc_taxinvoiceses?$select=cr6fc_taxinvoicesid,cr6fc_cgpan,cr6fc_invoiceno&$filter=(cr6fc_soeid eq "+vSOEID+")&$top=5000";
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
            TaxCall = data.value;  
       		UTRInternalID=TaxCall[0].cr6fc_taxinvoicesid;
            try 
            {
              if(TaxCall.length > 0)
              {     
                   if(TaxCall[0].cr6fc_cgpan!=null && TaxCall[0].cr6fc_cgpan!=undefined && TaxCall[0].cr6fc_cgpan!='')
                   {
                   		$('#txtCGPAN').text(TaxCall[0].cr6fc_cgpan)
                   }
                   if(TaxCall[0].cr6fc_invoiceno!=null && TaxCall[0].cr6fc_invoiceno!=undefined && TaxCall[0].cr6fc_invoiceno!='')
                   {
                   		$('#txtTaxNo').text(TaxCall[0].cr6fc_invoiceno);
                   		
                   }
                 /*  if(UTRColl[0].InvoiceDate!=undefined && UTRColl[0].InvoiceDate!=null)
                   {
                   	$('#InvoiceDt').text(GetCreatedDateTime(UTRColl[0].InvoiceDate))
                   }*/

                            
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

function numberToWords(number) {  
        var digit = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];  
        var elevenSeries = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];  
        var countingByTens = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];  
        var shortScale = ['', 'thousand', 'million', 'billion', 'trillion'];  
  
        number = number.toString(); number = number.replace(/[\, ]/g, ''); if (number != parseFloat(number)) return 'not a number'; var x = number.indexOf('.'); if (x == -1) x = number.length; if (x > 15) return 'too big'; var n = number.split(''); var str = ''; var sk = 0; for (var i = 0; i < x; i++) { if ((x - i) % 3 == 2) { if (n[i] == '1') { str += elevenSeries[Number(n[i + 1])] + ' '; i++; sk = 1; } else if (n[i] != 0) { str += countingByTens[n[i] - 2] + ' '; sk = 1; } } else if (n[i] != 0) { str += digit[n[i]] + ' '; if ((x - i) % 3 == 0) str += 'hundred '; sk = 1; } if ((x - i) % 3 == 1) { if (sk) str += shortScale[(x - i - 1) / 3] + ' '; sk = 0; } } if (x != number.length) { var y = number.length; str += 'point '; for (var i = x + 1; i < y; i++) str += digit[n[i]] + ' '; } str = str.replace(/\number+/g, ' '); return str.trim() + ".";  
  		return number;
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

