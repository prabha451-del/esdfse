var vItemID;
var vTotalDocLength = 0;
var fileArray = [];
var otherfileArray=[];
var AttchLength=0;
var arraycount = 0;

var loggedInUserId = '';
var loggedInUserName = '';
var loggedInUserEmail = '';
$(document).ready(function () {
    loggedInUserId = $('#fpo-user-contact-id').val();
    loggedInUserName = $('#fpo-user-contact-name').val();
    loggedInUserEmail = $('#fpo-user-email').val();

    $('title').text('NS Checker Payment Form');
    //$('#fileAttachInvoice').multifile();
	var today = new Date();
    var dd1 = String(today.getDate()).padStart(2,'0');
    var mm = String(today.getMonth() + 1).padStart(2,'0');
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd1;
    $('#dtpaymentreceived').attr('max',today);
    vItemID= GetQueryStingValue()["Item"];
    // var vTaskID= GetQueryStingValue()["Task"];
    bindCGApplicationData(vItemID);
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
function showTaxInvoice()
{
		var url="/?Item="+InternId;
		window.open(url, "_blank");
}
function ShowSOE()
{
		//var url="/sites/FPOCGPortal/SitePages/SOEDetails.aspx?Item="+InternId;
	  var url="/sites/FPOCGPortalUAT/SitePages/Renewal Application/RenewalSOEDetails.aspx?Item="+InternId;

		window.open(url, "_blank");

	//window.location.href="https://nabardmumbai.sharepoint.com/sites/FPOCGPortal/SitePages/SOEDetails.aspx?Item="+InternId;			                 
}
function Exit()
{
//window.location.href="/sites/FPOCGPortal/SitePages/NSCheckerCGFeesDashBoard.aspx";
window.location.href="/sites/FPOCGPortalUAT/SitePages/Renewal%20Application/RenewalNSCheckerCGFeesDashBoard.aspx";

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
function bindCGApplicationData(vItemID) {
    //  var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CGApplications')//items?$top=500&$select=*,FPOActivities111/FPOActivity,RegionOfFPO/Region,FPOState/State,BusinessFPOState/State,ELIChecker/Title&$expand=ELIChecker,RegionOfFPO,FPOActivities111,FPOState,BusinessFPOState&$filter=(ID eq '"+vItemID+"')";
    queryList = location.origin + "/_api/cr6fc_renewalcgapplications?$select=cr6fc_name,cr6fc_nameoffpo,_cr6fc_elichecker_value,cr6fc_nameoflendinginstitution,cr6fc_eilcheckerutrcertificateviewdate&$filter=cr6fc_renewalcgapplicationid eq " + vItemID + " &$top=5000";

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
            try {
                if (Logg.length > 0) {
                    $("#txtApplicationNo").text(Logg[0].cr6fc_name);
                    $("#txtCGApplicationNoPayment").val(Logg[0].cr6fc_name);
                    $("#txtNameOfFPO1Payment").text(Logg[0].cr6fc_nameoffpo);
                    $('#flexCheckChecked').prop('disabled', true);
                    $("#txtELICheckerNamePayment").text(Logg[0]['_cr6fc_elichecker_value@OData.Community.Display.V1.FormattedValue']);
                    $("#instituteIdNewPayment").text(Logg[0].cr6fc_nameoflendinginstitution);
                    if (Logg[0].cr6fc_eilcheckerutrcertificateviewdate != null && Logg[0].cr6fc_eilcheckerutrcertificateviewdate != undefined && Logg[0].cr6fc_eilcheckerutrcertificateviewdate != '') {
                        $('#dtproceedPayment').text(GetCreatedDateTime(Logg[0].cr6fc_eilcheckerutrcertificateviewdate))
                    }                    
                    $("#txtNameOfLendingInstitution").text(Logg[0].cr6fc_nameoflendinginstitution);
                  
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
function ClosePopup()
{
	$("#inputDialog3").dialog("close");	
}

function ViewPaymentManagment()
{
	$("#inputDialog3").dialog({
		autoOpen: false,
		modal: true,
		dialogClass: "noclose",
		closeOnEscape: false,		                
		show: { effect: "clip", duration: 200 }
		});
		
		$("#inputDialog3").dialog("open");

}

var WFID="" ;
var InternId="";
function bindSOEDetailsData(vItemID) {
    //var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SOEDetails')//items?$top=500&$select=*,BillToState/State,BillToState/Id,BillToState/StateCode&$expand=BillToState&$filter=(WFID eq '"+vItemID+"')";
    var requestUri = location.origin + "/_api/cr6fc_renewalsoedetailses?$select=cr6fc_wfid,cr6fc_name,cr6fc_creditguaranteefee,cr6fc_grandtotal,cr6fc_taxamount,cr6fc_renewalsoedetailsid,cr6fc_soedate,cr6fc_fpo,cr6fc_cgfan&$filter=(cr6fc_wfid eq '"+vItemID+"')&$top=5000";

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
                    $('#txtSOENo').text()
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
                    $('#txtSOEdt').text(GetCreatedDateTime(Logg[0].cr6fc_soedate))

                    bindUTRDetailsData(Logg[0].cr6fc_renewalsoedetailsid)
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
function OpenInvoice1()
{
	//window.location.href="https://nabardmumbai.sharepoint.com/sites/FPOCGPortal/SitePages/SOEDetails.aspx?Item="+InternId;	
		window.location.href=location.origin+"/RenewalSOEDetails/?Item="+InternId;			                 
		                 
}
var UTRColl;
var UTRInternalID;
function bindUTRDetailsData(vSOEID) {
    //  var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('UTRDetails')//items?$top=500&$select=*&$filter=(SOEID eq '"+vSOEID+"')";
    var requestUri = location.origin + "/_api/cr6fc_renewalutrdetailses?$select=cr6fc_renewalutrdetailsid,cr6fc_paymentpaid,cr6fc_paymentdate,cr6fc_utrno&$filter=cr6fc_soeid eq '" + vSOEID + "'&$top=5000";
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
                    // $('#txtAmount').text(Math.ceil(UTRColl[0].PaymentPaid))
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
                        $('#txtUTRNo').text(UTRColl[0].cr6fc_utrno);
                    }
                    
                    //document.getElementById("txtPaymentdt").text=UTRColl[0].PaymentDate.substring(0,UTRColl[0].PaymentDate.indexOf("T"));;
                    $('#txtPaymentdt').text(GetCreatedDateTime(UTRColl[0].cr6fc_paymentdate));

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
 var renewalcgentityid;
 var renewalutrdetails;
function SubmitData() {    
    var ddlPaymentReceived = $("#ddlPaymentReceived option:selected").val();
    var dtpaymentreceived = $("#dtpaymentreceived").val();
    if (dtpaymentreceived == null || dtpaymentreceived == undefined || dtpaymentreceived == '') {
        alert('Please enter payment received date')
        return false;
    }
    var txtRemarks = $('#txtRemarks').val();
    if (txtRemarks == null || txtRemarks == undefined || txtRemarks == '') {
        alert('Please enter the Remark')
        return false;
    }
    var x = confirm("Do you wish to Approve ?");
    if (x) {        
        var data = JSON.stringify(
            {                
              "cr6fc_paymentreceiveddate": dtpaymentreceived,              
              "cr6fc_paymentstatus":"0"
            });
        shell.getTokenDeferred().done(function (token) {
            $.ajax({
                url: location.origin + "/_api/cr6fc_renewalutrdetailses("+UTRInternalID+")",
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

                success: function (success,textStatus,xhr) {      
                    renewalutrdetails = xhr.getResponseHeader('entityid');             
                    var Data1 = JSON.stringify(
                        {                            
                            //"cr6fc_paymentconfirmeddate": new Date(),
                            "cr6fc_paymentreceiveddate": new Date(dtpaymentreceived),
                            "cr6fc_nschackerpaymentremark": txtRemarks,
                            "cr6fc_status": "11"

                        });
                    $.ajax({

                        url: location.origin + "/_api/cr6fc_renewalcgapplications("+vItemID+")",
                        type: "PATCH",
                        contentType: "application/json;odata=verbose",
                        async: false,
                        data: Data1,
                        headers: {
                            __RequestVerificationToken: token,
                            "accept": "application/json;odata=verbose",
                            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                            "IF-MATCH": "*",
                            "X-Http-Method": "PATCH"
                        },
                        success: function (data,textstatus,xhr) {
                            renewalcgentityid = xhr.getResponseHeader('entityid');
                
                            alert('Data  Submit Successfully.');
                            window.location.href = location.origin+"/RefreshingCache/?id="+renewalcgentityid+","+renewalutrdetails+"&tbl=cr6fc_renewalcgapplications,cr6fc_renewalutrdetailses&col=cr6fc_cacherefreshedon&red=NSCheckerCGFeesDB";
                            // window.location.href = location.origin + "/NSCheckerCGFeesDB/";
                            /*if (AttchLength == 0 || AttchLength == null || AttchLength == '') {
                                window.location.href = location.origin + "/NSCheckerCGFeesDB/";
                            }*/
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


    

