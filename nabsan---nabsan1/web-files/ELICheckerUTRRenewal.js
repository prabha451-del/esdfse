var vItemID;
$(document).ready(function () {
    $('title').text('EIL Checker UTR Form');
     vItemID= GetQueryStingValue()["Item"];
       document.getElementById("MangmentCheck").disabled = true; 
       bindSOEDetailsData(vItemID);          
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
function Exit()
{
	window.location.href = location.origin + "/ELICheckerCGFeeDB/";
}

function showSOW()
{
    var url=location.origin + "/RenewalSOEDetails/?Item="+InternId;
    window.open(url, "_blank");		
}

function ShowPopUp(hi)
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

    

var WFID = "";
var InternId = "";
function bindSOEDetailsData(vItemID) {
    //   var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SOEDetails')//items?$top=500&$select=*,BillToState/State,BillToState/Id,BillToState/StateCode&$expand=BillToState&$filter=(WFID eq '"+vItemID+"')";    
    queryList = location.origin + "/_api/cr6fc_renewalsoedetailses?$select=cr6fc_BillToState,cr6fc_wfid,cr6fc_renewalsoedetailsid,cr6fc_cgapplicationno,cr6fc_fpo,cr6fc_name,cr6fc_grandtotal,cr6fc_taxamount,cr6fc_creditguaranteefee,cr6fc_soedate,cr6fc_fpo,cr6fc_cgfan&$expand=cr6fc_BillToState($select=cr6fc_statemasterid,cr6fc_name)&$filter=(cr6fc_wfid eq '"+vItemID+"')&$top=5000";
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
            WFID = Logg[0].cr6fc_wfid;
            InternId = Logg[0].cr6fc_renewalsoedetailsid;
            try {
                if (Logg.length > 0) {
                    $('#txtCGApplicationNo').val(Logg[0].cr6fc_cgapplicationno)
                    $('#txtNameOfFPO1').text(Logg[0].cr6fc_fpo)
                    $('#txtSOENo').text(Logg[0].cr6fc_name)

                    var GrandTotal;
                    if (Logg[0].cr6fc_grandtotal == '' || Logg[0].cr6fc_grandtotal == null) {
                        GrandTotal = "0";
                    }
                    else {
                        GrandTotal = Logg[0].cr6fc_grandtotal;
                    }
                    $('#txtGrandTotal').text(Math.ceil(GrandTotal));
                    var Word = convertNumberToWords(Math.ceil(GrandTotal));
                    console.log(Word);
                    $('#txtGrandTotalinwords').text("Rupees " + " " + Word + " " + "Only");
                    $('#txtGrandTotalinwords').val("Rupees " + " " + Word + " " + "Only");


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
                    $('#txtTaxAmtinwords').text("Rupees " + " " + Word + " " + "Only");
                    $('#txtTaxAmtinwords').val("Rupees " + " " + Word + " " + "Only");

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


                    $('#txtFPOName').text(Logg[0].cr6fc_fpo);
                    $('#txtSOEdt').text(GetCreatedDateTime(Logg[0].cr6fc_soedate))

                    $('#CGFANId').val(Logg[0].cr6fc_cgfan);
                    bindUTRDetailsData(Logg[0].cr6fc_renewalsoedetailsid)
                    bindCGDetailsData(vItemID)
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

function bindCGDetailsData(vCGID) {
    // var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CGApplications')//items?$top=500&$select=*,ELIChecker/Title&$expand=ELIChecker&$filter=(ID eq '"+vCGID+"')";
    queryList = location.origin + "/_api/cr6fc_cgaplications?$select=*&$filter=(cr6fc_cgaplicationid eq '" + vCGID + "')&$top=5000";
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
            var CGCollData = data.value;

            try {
                if (CGCollData.length > 0) {
                    
                    document.getElementById("CGPANNo").value = CGCollData[0].cr6fc_panfpo;
                    $("#txtELICheckerName").text(CGCollData[0]['_cr6fc_elichecker_value@OData.Community.Display.V1.FormattedValue']);
                    $("#instituteId").text(CGCollData[0].cr6fc_nameoflendinginstitution);
                    $("#instituteIdNew").text(CGCollData[0].cr6fc_nameoflendinginstitution);
                    $("#dtproceed").text(GetCreatedDateTime(new Date));                    
                    $('#divCheckerHide').hide();
                    
                    if (CGCollData[0].cr6fc_elicheckerpaymentremark != null && CGCollData[0].cr6fc_elicheckerpaymentremark != undefined && CGCollData[0].cr6fc_elicheckerpaymentremark != '') {

                        $('#divCheckerHide').show();
                        document.getElementById("divELICheckerRemark").innerHTML = CGCollData[0].cr6fc_elicheckerpaymentremark;                        
                        document.getElementById("txtELiCheckerComments").value=CGCollData[0].cr6fc_elicheckerpaymentremark;
                    }
                    $('#divMakerHide').hide();


                    if (CGCollData[0].cr6fc_elimakerpaymentremark != null && CGCollData[0].cr6fc_elimakerpaymentremark != undefined && CGCollData[0].cr6fc_elimakerpaymentremark != '') {
                        $('#divMakerHide').show();
                        document.getElementById("divELIMakerRemark").innerHTML = CGCollData[0].cr6fc_elimakerpaymentremark;                        
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

var UTRColl;
function bindUTRDetailsData(vSOEID) {    
    queryList = location.origin + "/_api/cr6fc_renewalutrdetailses?$select=cr6fc_paymentpaid,cr6fc_paymentdate,cr6fc_utrno,cr6fc_soeid&$filter=(cr6fc_soeid eq '" + vSOEID + "')&$top=5000";
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
            UTRColl = data.value;

            try {
                if (UTRColl.length > 0) {                    
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
                    $('#txtUTRNo').text(UTRColl[0].cr6fc_utrno)                    
                    $('#txtPaymentdt').text(GetCreatedDateTime(UTRColl[0].cr6fc_paymentdate))

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

var txtNsApprRemark;
var txtNsApprRemark;
function SendbackData() {
    var txtRemarksComments = $('#txtRemarksComments').val();

    if (txtRemarksComments == '' || txtRemarksComments == null || txtRemarksComments == undefined) {
        alert('Please Enter Remark')
        return false;
    }
    var workflowDt = new Date();
    workflowDt = GetCurrentDataToday();

    var NSCheckerComm = document.getElementById("txtELiCheckerComments").value;    

    if (NSCheckerComm != '' && NSCheckerComm != undefined && NSCheckerComm != '') {
        txtNsApprRemark = "<b>Comment</b> :- " + txtRemarksComments + " - " + workflowDt + ": " + NSCheckerComm.toString() + "\n\n"
    }
    else {
        txtNsApprRemark = "<b>Comment</b> :- " + txtRemarksComments + " - " + workflowDt + "<br/>";
    }


    var Data = JSON.stringify(
        {            
            "cr6fc_status": "14",            
            "cr6fc_elicheckerpaymentremark": txtNsApprRemark            
        });
    shell.getTokenDeferred().done(function(token){
    $.ajax({        
        url: location.origin + "/_api/cr6fc_renewalcgapplications(" + vItemID + ")",
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
        success: function (data,textStatus,xhr) {
            renewalentityid = xhr.getResponseHeader('entityid');
            alert('Request send back to ELI Maker');
            // window.location.href = location.origin + "/ELICheckerCGFeeDB/";
            window.location.href = location.origin + "/RefreshingCache/?id="+renewalentityid+"&tbl=cr6fc_renewalcgapplications&col=cr6fc_cacherefreshedon&red=ELICheckerCGFeesDashboard";
        },
        error: function (e) {
            console.log(e);
        }
    })
    });

}
var renewalcgentityid;
var successId;
var Substatus;
function SubmitData() {        
    var CGFANId = $("#CGFANId").val();
    var txtSOENumber = $("#txtSOENo").text();
    var txtUTRNo = $("#txtUTRNo").text();
    var PaymentDate = $("#PaymentDate").text();
    var AmountPaid = $('#txtPaidAmount').text();
    var CGFeeDue = $('#txtGrandTotal').text();
    var txtNsApprRemark = $("#txtRemarksComments").val();
    var x = confirm("Do you wish to Approve ?");
    if (x) {
        
        var url = location.origin + "/_api/cr6fc_renewaltaxinvoices"
        var data = JSON.stringify(
            {
                
                "cr6fc_cgfan": CGFANId,                    
                "cr6fc_invoicedate": new Date(),
                "cr6fc_soeno": txtSOENumber,
                "cr6fc_soeid": "" + InternId,
                "cr6fc_cgid": vItemID
            });
            shell.getTokenDeferred().done(function(token){
                $.ajax({                    
                url: url,
                type: "POST",
                contentType: "application/json;odata=verbose",
                async: false,
                data: data,
                headers: {
                    __RequestVerificationToken: token,
                    "X-RequestDigest": $('#__REQUESTDIGEST').val(),
                    "accept": "application/json",                        
                },

                success: function (data, textStatus, xhr) {
                    successId = xhr.getResponseHeader("entityid");
                    console.log(successId);

                    var DataNew = JSON.stringify(
                        {                                                            
                            "cr6fc_elicheckerpaymentremark": txtNsApprRemark
                            //"cr6fc_status": "10"    
                        });
                    $.ajax({

                        url :"/_api/cr6fc_renewalcgapplications("+vItemID+")",
                        type: "PATCH",
                        contentType: "application/json;odata=verbose",
                        async: false,
                        data: DataNew,
                        headers: {
                            __RequestVerificationToken: token,
                            "accept": "application/json;odata=verbose",
                            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                            "IF-MATCH": "*",
                            "X-Http-Method": "PATCH"
                        },
                        success: function (data,textStatus,xhr) {    
                            Substatus = '10';                            
                            renewalcgentityid = xhr.getResponseHeader('entityid');
                            alert('Data  Submit Successfully.');
                            $("#inputDialog2").dialog({
                                autoOpen: false,
                                modal: true,
                                dialogClass: "noclose",
                                closeOnEscape: false,                                    
                                show: { effect: "clip", duration: 200 }
                            });

                            $("#inputDialog2").dialog("open");
                                
                        },
                        error: function (e) {
                            console.log(e);
                        }
                    });                    
            },
            error: function (error) {
                console.log(error);                    
                alert('Some error occured while adding data in UTRDetail list. Please try again later.');
                console.log(error);
            }
             })
        })
    }


}


     
function Proceed()
{
    var Data;
	
            Data = JSON.stringify(
            {            
                 "cr6fc_eilcheckerutrcertificateview":"1",
                 "cr6fc_eilcheckerutrcertificateviewdate":new Date(),
                 "cr6fc_status":Substatus			 
            });
            shell.getTokenDeferred().done(function(token){
                $.ajax({
	
        url:location.origin + "/_api/cr6fc_renewalcgapplications(" + vItemID + ")",
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
        success: function (data,textStatus,xhr) 
        {
                   renewalcgapplicationentityid= xhr.getResponseHeader('entityid');
                alert('Item Updated Succesfully');
                // window.location.href=location.origin + "/ELICheckerCGFeeDB/";	
                window.location.href = location.origin + "/RefreshingCache/?id="+successId+","+renewalcgentityid+"&tbl=cr6fc_renewaltaxinvoices,cr6fc_renewalcgapplications&col=cr6fc_cacherefreshedon&red=ELICheckerCGFeeDB";
            },
        error: function (e) 
        {
            console.log(e);
        }
        })
    });

}

 
    
function StatusChange()
{   
            var	Data = JSON.stringify(
           {
               
                "cr6fc_status":"10"
                
           });	
           shell.getTokenDeferred().done(function(token){

   $.ajax({
	
       url:location.origin + "/_api/cr6fc_renewalcgapplications(" + vItemID + ")",
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
       success: function (data) 
       {
                  alert('List updated Succesfully');
       },
       error: function (e) 
       {
           console.log(e);
       }
    })
   });
}