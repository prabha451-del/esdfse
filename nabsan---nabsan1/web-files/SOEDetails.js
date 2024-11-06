var vItemID;
$(document).ready(function () {
    $('title').text('SOE Details Form');
     Page= GetQueryStingValue()["Page"];
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
window.location.href="/sites/FPOCGPortal/SitePages/DashBoardCGApp.aspx";

}

function onClickPDF(){
//window.print();
 document.getElementById("printPageButton").style.visibility = false;
var vDate=new Date();
//var currDate=GetCreatedDate1(vDate);
// window.print()
var txtSOENo=$('#txtSOENo').text();
CreatePDFWithDynamiContent(txtSOENo, 'allDivcontain');

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
		    var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('NSApprovalMatrix')//items?$top=500&$select=*,Title,ID,User/Title,User/Id&$expand=User&$filter=Role eq 'Approver'&$orderby=ID asc";
		    var requestHeaders = { "accept": "application/json;odata=verbose" };
		    $.ajax({
		        url: requestUri,
		        contentType: "application/json;odata=verbose",
		        headers: requestHeaders,
		        async: false,
		        cache: false,
		        success: function (data) {
		            NSApproverColl = data.d.results;
		            if(NSApproverColl.length>0)
		            {
		            	NSCheckerApprover=NSApproverColl[0].User.Id;
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
function bindSOEDetailsData(vItemID){    
    //var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SOEDetails')//items?$top=500&$select=*,BillToState/State,BillToState/Id,BillToState/StateCode&$expand=BillToState&$filter=(ID eq '"+vItemID+"')";
    var requestUri = location.origin+"/_api/cr6fc_soedetailses?$select=*&$expand=cr6fc_BillToState($select=cr6fc_statemasterid,cr6fc_name,cr6fc_statecode)&$filter=(cr6fc_soedetailsid eq '"+vItemID+"')";
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
                   $('#txtbillname').text(Logg[0].cr6fc_billtoname)
                   $('#txtAddress').text(Logg[0].cr6fc_billtoaddress)
                   $('#txtState').text(Logg[0]['_cr6fc_billtostate_value@OData.Community.Display.V1.FormattedValue']);
                   $('#txtStateCode').text(Logg[0].cr6fc_BillToState.cr6fc_statecode)
                   $('#txtPlaceofSupply').text(Logg[0]['_cr6fc_billtostate_value@OData.Community.Display.V1.FormattedValue'])
                   $('#txtStateCode1').text(Logg[0].cr6fc_BillToState.cr6fc_statecode)
                   $('#txtGSTIN').text(Logg[0].cr6fc_billtogstin);
                   $('#txtPAN').text(Logg[0].cr6fc_billtopan);
                   if(Logg[0]['cr6fc_soedate@OData.Community.Display.V1.FormattedValue']!=undefined && Logg[0]['cr6fc_soedate@OData.Community.Display.V1.FormattedValue']!=null && Logg[0].SOEDate!='')
                   {
                        $('#SOEdt').text(GetCreatedDateTime(Logg[0]['cr6fc_soedate@OData.Community.Display.V1.FormattedValue']));}
                   }
                   if(Logg[0].cr6fc_name!==null && Logg[0].cr6fc_name!==undefined && Logg[0].cr6fc_name!=='')
                   {
                   		$('#txtSOENo').text(Logg[0].cr6fc_name);
                   }
                   
                   $('#txtCGFee').text("₹ " + "" + Math.ceil(Logg[0].cr6fc_creditguaranteefee));//txtCGFee
                   $('#txtFpo').text(Logg[0].cr6fc_fpo);//txtCGFee
                   $('#txtLoanAcc').text(Logg[0].cr6fc_fpoloanaccountno);//txtCGFee
                   $('#txtsanAmt').text("₹ " + "" + Math.ceil(Logg[0].cr6fc_sanctionedamount));//txtCGFee
                   $('#txtCGAppNo').text(Logg[0].cr6fc_cgapplicationno);//txtCGFee
                   if(Logg[0].cr6fc_cgfan!==null && Logg[0].cr6fc_cgfan!==undefined && Logg[0].cr6fc_cgfan!=='')
                   {
                   		$('#txtCGFAN').text(Logg[0].cr6fc_cgfan);
                   }
                   $('#txtElig').text("₹ " + "" + Math.ceil(Logg[0].cr6fc_eligibleguranteecover));//txtCGFee
                   $('#txtSubTot').text("₹ " + "" + Math.ceil(Logg[0].cr6fc_creditguaranteefee));//txtCGFee
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
                   $("#txtsubtotal").text(Logg[0].cr6fc_taxamount);
                  var GrandTotal;
                  if(Logg[0].cr6fc_grandtotal== '' || Logg[0].cr6fc_grandtotal== null)
                   {
                   	GrandTotal="0";
                   }
                   else
                   {
                   	GrandTotal=Logg[0].cr6fc_grandtotal;
                   }
                   $('#txtgrandtotal').text("₹ " + "" + Math.ceil(GrandTotal));
                   var Word=convertNumberToWords(Math.ceil(GrandTotal));
                   console.log(Word);
                   $('#txtAmtWords').text("Rupees " + " " + Word + " " + "Only" );
	          //}
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
function exitSoeDetail(){
if(Page=="DashBoardCGApp")
{
window.location.href=location.origin+"/DashboardCGApp/";
}
else if(Page=="ELIChecker")
{
window.location.href=location.origin+"/ELICheckerDashBoardCGApp/";
}
else if(Page=="NSChecker"){
window.location.href=location.origin+"/NSCheckerDashboard/";
}
else if(Page == "NSApprover"){
window.location.href=location.origin+"/NSApproverDashboard/";
}
else if(Page == '' || Page == undefined){
window.open('','_self').close();
}
}
