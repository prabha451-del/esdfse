var vItemID;
var vTotalDocLength = 0;
var fileArray = [];
var otherfileArray = [];
var AttchLength = 0;
var arraycount = 0;
var cgpaymentdoc;
$(document).ready(function () {
    $('title').text('NS Approver Payment Form');
    vItemID = GetQueryStingValue()["Item"];
    // var vTaskID= GetQueryStingValue()["Task"];
    bindCGApplicationData(vItemID);
    bindSOEDetailsData(vItemID);
   // getOtherDocDataLatest(vItemID);
    //$('#fileAttachInvoice').multifile();
    getfileNSChecker(vItemID);
});

function GetQueryStingValue() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
function showTaxInvoice() {
    var url = location.origin+"/TaxInvoices/?Item=" + InternId;
    window.open(url, "_blank");

}
function Exit() {
    window.location.href = location.origin+"/NSApproverCGFeesDashboard/";
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
function ShowPopUp() {
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

function ClosePopup() {
    $("#inputDialog2").dialog("close");
}
function bindCGApplicationData(vItemID) {
    // var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CGApplications')//items?$top=500&$select=*,ELIChecker/Title,FPOActivities111/FPOActivity,RegionOfFPO/Region,FPOState/State,BusinessFPOState/State&$expand=ELIChecker,RegionOfFPO,FPOActivities111,FPOState,BusinessFPOState&$filter=(ID eq '"+vItemID+"')";
   // var requestUri = location.origin+"/_api/cr6fc_cgapplicationses?$select=cr6fc_nameoflendinginstitution,cr6fc_cgapplicationsid,cr6fc_status,cr6fc_name,cr6fc_nameoffpo,createdon,cr6fc_accountno,cr6fc_sanctionedamount,cr6fc_nscheckerpaymentfile,cr6fc_nsapproverpaymentfile,_cr6fc_elichecker_value,cr6fc_nameoflendinginstitution,cr6fc_nameoffpo,cr6fc_eilcheckerutrcertificateviewdate,cr6fc_elicheckerpaymentremark,cr6fc_elimakerpaymentremark,cr6fc_nschackerpaymentremark,cr6fc_nsapproverpaymentremark,cr6fc_panfpo&$filter=cr6fc_cgapplicationsid eq " + vItemID + "";
    var requestUri = location.origin+"/_api/cr6fc_cgaplications?$select=cr6fc_nameoflendinginstitution,cr6fc_cgaplicationid,cr6fc_status,cr6fc_name,cr6fc_nameoffpo,createdon,cr6fc_accountno,cr6fc_sanctionedamount,cr6fc_nscheckerpaymentfile,cr6fc_nsapproverpaymentfile,_cr6fc_elichecker_value,cr6fc_nameoflendinginstitution,cr6fc_nameoffpo,cr6fc_eilcheckerutrcertificateviewdate,cr6fc_elicheckerpaymentremark,cr6fc_elimakerpaymentremark,cr6fc_nschackerpaymentremark,cr6fc_nsapproverpaymentremark,cr6fc_panfpo&$filter=cr6fc_cgaplicationid eq " + vItemID + "";
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
                     cgpaymentdoc=Logg[0].cr6fc_nscheckerpaymentfile_name;
                    $("#txtApplicationNo").text(Logg[0].cr6fc_name);
                    $("#txtCGApplicationNo").val(Logg[0].cr6fc_name);
                    if (Logg[0]._cr6fc_elichecker_value != null) {
                        $("#txtELICheckerNamePayment").text(Logg[0]['_cr6fc_elichecker_value@OData.Community.Display.V1.FormattedValue'])
                    }
                    $("#instituteIdNewPayment").text(Logg[0].cr6fc_nameoflendinginstitution);
                    $("#txtNameOfFPO1").text(Logg[0].cr6fc_nameoffpo);
                    if (Logg[0].cr6fc_eilcheckerutrcertificateviewdate != null && Logg[0].cr6fc_eilcheckerutrcertificateviewdate != undefined && Logg[0].cr6fc_eilcheckerutrcertificateviewdate != '') {
                        $('#dtproceedPayment').text(GetCreatedDateTime(Logg[0].cr6fc_eilcheckerutrcertificateviewdate))
                    }
                    $('#txtId').val(Logg[0].cr6fc_cgaplicationid);
                    //document.getElementById("txtApplicantName").value=Logg[0].ApplicantName;
                    //document.getElementById("txtNameOfFPO").value=Logg[0].NameOfFPO;
                    $("#txtNameOfLendingInstitution").text(Logg[0].cr6fc_nameoflendinginstitution);
                    $('#CGPANNo').val(Logg[0].cr6fc_panfpo);
                   /* if (Logg[0].cr6fc_elimakerpaymentremark != null && Logg[0].cr6fc_elimakerpaymentremark != undefined && Logg[0].cr6fc_elimakerpaymentremark != '') {
                        $("#Makerremark").show();
                        $("#txtEliMakerRemarks").text(Logg[0].cr6fc_elimakerpaymentremark);
                    }
                    else {
                        $("#Makerremark").hide();
                    }
                    if (Logg[0].cr6fc_elicheckerpaymentremark != null && Logg[0].cr6fc_elicheckerpaymentremark != undefined && Logg[0].cr6fc_elicheckerpaymentremark != '') {
                        $("#checkerremark").show();
                        $("#txtEliCheckerRemarks").text(Logg[0].cr6fc_elicheckerpaymentremark);
                    }
                    else {
                        $("#checkerremark").hide();
                    }*/
                    if (Logg[0].cr6fc_nschackerpaymentremark != null && Logg[0].cr6fc_nschackerpaymentremark != undefined && Logg[0].cr6fc_nschackerpaymentremark != '') {
                        $("#NScheckerremark").show();
                        $("#txtNSCheckerRemarks").text(Logg[0].cr6fc_nschackerpaymentremark);
                    }
                    else {
                        $("#NScheckerremark").hide();
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
    var requestUri = location.origin+"/_api/cr6fc_soedetailses?$select=cr6fc_wfid,cr6fc_soedetailsid,cr6fc_name,cr6fc_creditguaranteefee,cr6fc_grandtotal,cr6fc_taxamount,cr6fc_cgfan,cr6fc_soedate,cr6fc_fpo,cr6fc_cgfan,cr6fc_soedate&$filter=cr6fc_wfid eq '" + vItemID + "'";
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
            InternId = Logg[0].cr6fc_soedetailsid;
            try {
                if (Logg.length > 0) {
                    $('#txtSOENo').text(Logg[0].cr6fc_name)
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

                    //$('#txtTaxAmt').text(Math.ceil(Logg[0].TaxAmount));
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
                    /*
                    $('#txtGrandTotal').text(Math.ceil(GrandTotal));
                    var Word=convertNumberToWords(Math.ceil(GrandTotal));
                    console.log(Word);
                    $('#txtTaxAmtinwords').text("Rupees " + " " + Word + " " + "Only" );
                    $('#txtTaxAmtinwords').val("Rupees " + " " + Word + " " + "Only" );                  
                     */
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

                    //$('#txtTaxAmt').text(Math.ceil(Logg[0].TaxAmount));
                    //$('#txtGrandTotal').text(Math.ceil(Logg[0].GrandTotal));//CGFANNo
                    $('#CGFANId').val(Logg[0].cr6fc_cgfan);
                    $('#CGFANNo').text(Logg[0].cr6fc_cgfan);
                    $('#txtFPOName').text(Logg[0].cr6fc_fpo);
                    if (Logg[0].cr6fc_soedate != null) {
                        $('#txtSOEdt').text(GetCreatedDateTime(Logg[0].cr6fc_soedate))

                    }


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
function bindTaxInvoiceData(vSOEID) {
    var requestUri = location.origin+"/_api/cr6fc_taxinvoiceses?$select=cr6fc_soeid,cr6fc_taxinvoicesid&$filter=cr6fc_soeid eq " + vSOEID + "";
    // var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('TaxInvoices')//items?$top=500&$select=*&$filter=(SOEID eq '"+vSOEID+"')";
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
                //WFID =  Logg[0].WFID;
                txtTaxId = Logg[0].cr6fc_taxinvoicesid;
            }
            catch (e) {
            }
        },
        error: function () {
            console.log("error");
        }
    });

}


function ShowSOE() {
    var url = location.origin+"/SOEDetails/?Item=" + InternId;
    window.open(url, "_blank");
}
var UTRColl;
var UTRInternalID;
function bindUTRDetailsData(vSOEID) {
   // var requestUri = location.origin+"/_api/cr6fc_utrdetailses?$select=cr6fc_paymentpaid,cr6fc_utrno,cr6fc_paymentdate,cr6fc_paymentstatus,cr6fc_paymentreceiveddate,cr6fc_utrdetailsid&$filter=cr6fc_soeid eq '" + vSOEID + "'";
    var requestUri = location.origin+"/_api/cr6fc_utrdetailses?$select=cr6fc_paymentpaid,cr6fc_utrno,cr6fc_paymentdate,cr6fc_paymentstatus,cr6fc_paymentreceiveddate,cr6fc_utrdetailsid&$filter=cr6fc_soeid eq '" + vSOEID + "'";
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
            UTRInternalID = UTRColl[0].cr6fc_utrdetailsid;
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

                    $('#txtUTRNo').text(UTRColl[0].cr6fc_utrno)
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
function GetCreatedDateTime(vCreatedDate) {
    var vCreated = vCreatedDate;
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
    return Newtoday;
}
function GetCounterCGPAN() {
    var vRetVal = '';
    var hdnCounter = '';
    var hdnFPOPAN = document.getElementById("CGPANNo").value;
	var requestUri = location.origin+"/_api/cr6fc_countermasters?$select=cr6fc_name,cr6fc_cgapplicationno,cr6fc_countermasterid&$filter=cr6fc_name eq 'CGPAN' and cr6fc_entrytype eq 1";

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
	//var requestUri = location.origin+"/_api/cr6fc_countermasters?$select=cr6fc_name,cr6fc_cgapplicationno,cr6fc_countermasterid&$filter=cr6fc_name eq 'Tax' and cr6fc_entrytype eq 1";
    var requestUri = location.origin+"/_api/cr6fc_countermasters?$select=cr6fc_name,cr6fc_cgapplicationno,cr6fc_countermasterid&$filter=cr6fc_name eq 'Tax' and cr6fc_entrytype eq 1";
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
                    var date = $("#hdnPaymentReceivedt").val();
                    var today = new Date(date);
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
var countercgfanentityid;
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
        success: function (data,textStatus,xhr) {
            countercgfanentityid = xhr.getResponseHeader('entityid');
            // AddDashBoard(document.getElementById("hdnDigitalRequestNo").value, document.getElementById("hdnApprvlNotesItemID").value);
            //alert('Data Done')
        },
        error: function (e) {
        }
    });
}
var countercgentityid;
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
            countercgentityid = xhr.getResponseHeader('entityid');
            // AddDashBoard(document.getElementById("hdnDigitalRequestNo").value, document.getElementById("hdnApprvlNotesItemID").value);
            //alert('Data Done')
        },
        error: function (e) {
        }
    });
}
var taxinvoicesesentityid;
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
		url: "/_api/cr6fc_taxinvoiceses(" + txtTaxId + ")",
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
            taxinvoicesesentityid = xhr.getResponseHeader('entityid');
            UpdateCounter(token);
            UpdateCounterCGFAN(token);

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
    var txtRemarks = $('#txtRemarks').val();
    var paymentdt = new Date($('#hdnPaymentReceivedt').val());
    var payDt = paymentdt.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
	var paymentdtNew=new Date(payDt);
	var fivYearsDays=364*5;
	var GuaranteeEnd=paymentdtNew.setDate(paymentdtNew.getDate() + fivYearsDays);
	var GuaranteeEndDate=new Date(GuaranteeEnd);
	
	var paymentdtone=new Date(payDt);
	var oneYearsDays=364;
	var CGFeeEnd=paymentdtone.setDate(paymentdtone.getDate() + oneYearsDays);
	var CGFeeEndDate=new Date(CGFeeEnd);
    fileInput = $('#fileAttachInvoice');
    otherfileArray = [];
    //var AttchLength=fileInput[0].files.length
    $("#attachFilesHolderOther input:file").each(function () {
        if ($(this)[0].files[0]) {
            otherfileArray.push({ "Attachment": $(this)[0].files[0] });
        }
    });
    AttchLength = otherfileArray.length;
    var x = confirm("Do you wish to Approve ?");
    if (x) {
        var Data = JSON.stringify(
            {

                "cr6fc_paymentissueddate": new Date(),
                "cr6fc_status": "15",
                "cr6fc_statuschangeddate":new Date(),
                "cr6fc_nsapproverpaymentremark": txtRemarks,
                "cr6fc_cgfeestartdate":paymentdt,
                "cr6fc_guaranteestartdate":paymentdt,
                "cr6fc_guaranteeenddate":GuaranteeEndDate,
                "cr6fc_cgfeeenddate":CGFeeEndDate,
                "cr6fc_cgstatus": "0"

            });

            shell.getTokenDeferred().done(function (token) {
                $.ajax({

                    url: "/_api/cr6fc_cgaplications("+vItemID+")",
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
                                cgapplicationentityid = xhr.getResponseHeader('entityid')
                        updateTaxInvoice(token)
                        //UpdateCounter();
                        //UpdateCounterCGFAN();
                        if (AttchLength != 0) {
                           // upload(vItemID)
                            // getFileContentsAndMetadata(vItemID,token)
                            updatecgappfile(vItemID)

                        }
        
        
                        alert('Data  Submit Successfully.');
                        if (AttchLength == 0 || AttchLength == null || AttchLength == '') {
                            // window.location.href = location.origin+"/NSApproverCGFeesDashboard/";
                            window.location.href = location.origin + "/RefreshingCache/?id="+taxinvoicesesentityid+","+countercgfanentityid+","+countercgentityid+","+cgapplicationentityid+"&tbl=cr6fc_taxinvoiceses,cr6fc_countermasters,cr6fc_countermasters,cr6fc_cgaplications,&col=cr6fc_cacherefreshedon&red=NSApproverCGFeesDashboard";
                        }
                    },
                    error: function (e) {
                        console.log(e);
                    }
                });
            })


    }


}


function StatusChange() {
    var Data = JSON.stringify(
        {
            '__metadata': {
                'type': 'SP.Data.CGApplicationsListItem'
            },
            "Status": "Payment Processed by ELI"

        });
    $.ajax({

        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('CGApplications')/getItemByStringId('" + vItemID + "')",
        type: "PATCH",
        contentType: "application/json;odata=verbose",
        async: false,
        data: Data,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-Http-Method": "PATCH"
        },
        success: function (data) {
            alert('List updated Succesfully');
        },
        error: function (e) {
            console.log(e);
        }
    });
}

// var DocName = '';
// function upload(vItemID) {
//     // Define the folder path for this example.
//     var serverRelativeUrlToFolder = '/sites/FPOCGPortal/GeneralDocument';

//     // Get test values from the file input and text input page controls.
//     var fileInput = jQuery('#fileAttachInvoice');
//     var newName = jQuery('#displayName').val();
//     var fileCount = fileInput[0].files.length;
//     // Get the server URL.
//     var serverUrl = _spPageContextInfo.webAbsoluteUrl;
//     var filesUploaded = 0;
//     for (var i = 0; i < fileCount; i++) {
//         // Initiate method calls using jQuery promises.
//         // Get the local file as an array buffer.
//         var getFile = getFileBuffer(i);
//         getFile.done(function (arrayBuffer, i) {

//             // Add the file to the SharePoint folder.
//             var addFile = addFileToFolder(arrayBuffer, i);
//             addFile.done(function (file, status, xhr) {
//                 //Get ID of File uploaded 
//                 var getfileID = getItem1(file.d);
//                 getfileID.done(function (fResult) {
//                     var colObject = new Object();
//                     /* colObject["RequestNo"] = request;
//                      colObject["DocType"] = 'GeneralManager';
//                      colObject["Title"] = ItemId;*/
//                     //colObject["RequestID"] = requestidvalue;
//                     //    colObject["RequestNo"] = request;
//                     colObject["DocType"] = 'NSCheckerUTR';
//                     colObject["Title"] = vItemID;
//                     // colObject["CMACNo"] = txtCMACNo;

//                     /*colObject["CMACNo"] = txtCMACNo;
//                    colObject["ProductID"] = ItemId;
//                     colObject["Creative"] = hdnRequestNo; */

//                     var changeItem = updateFileMetadata('GeneralDocument', fResult.d, colObject);
//                     changeItem.done(function (result) {
//                         filesUploaded++;
//                         if (fileCount == filesUploaded) {
//                             //alert("All files uploaded successfully");
//                             //$("#msg").append("<div>All files uploaded successfully</div>");
//                             $("#fileAttachInvoice").value = null;
//                             filesUploaded = 0;
//                         }
//                     });
//                     changeItem.fail(function (result) {

//                     });

//                 }, function () { });

//             });
//             addFile.fail(onError);
//         });
//         getFile.fail(onError);

//     }
//     function getItem1(file) {
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
//     }

//     // Get the local file as an array buffer.
//     function getFileBuffer(i) {
//         var deferred = jQuery.Deferred();
//         var reader = new FileReader();
//         reader.onloadend = function (e) {
//             deferred.resolve(e.target.result, i);
//         }
//         reader.onerror = function (e) {
//             deferred.reject(e.target.error);
//         }
//         reader.readAsArrayBuffer(fileInput[0].files[i]);
//         return deferred.promise();
//     }

//     // Add the file to the file collection in the Shared Documents folder.
//     function addFileToFolder(arrayBuffer, i) {
//         var index = i;

//         // Get the file name from the file input control on the page.
//         DocName = fileInput[0].files[index].name;
//         var fileName = fileInput[0].files[index].name;
//         var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds  
//         var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1).replace(":", "").slice(0, -2).replace(":", "").slice(0, -3).replace(".", "");
//         var ext = fileName.split(".");
//         ext = ext[ext.length - 1].toLowerCase();
//         var ext1 = "." + ext;
//         fileName = fileName.replace(ext1, "" + localISOTime + "" + ext1 + "");
//         // Construct the endpoint.
//         var fileCollectionEndpoint = String.format(
//             "{0}/_api/web/getfolderbyserverrelativeurl('{1}')/files" +
//             "/add(overwrite=true, url='{2}')",
//             serverUrl, serverRelativeUrlToFolder, fileName);

//         // Send the request and return the response.
//         // This call returns the SharePoint file.
//         return jQuery.ajax({
//             url: fileCollectionEndpoint,
//             type: "POST",
//             data: arrayBuffer,
//             processData: false,
//             headers: {
//                 "accept": "application/json;odata=verbose",
//                 "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
//                 "content-length": arrayBuffer.byteLength
//             }
//         });
//     }
// }

// // Display error messages. 
// function onError(error) {
//     alert(error.responseText);
// }

// function updateFileMetadata(libraryName, item, colPropObject) {
//     var def = jQuery.Deferred();
//     var siteUrl = _spPageContextInfo.webAbsoluteUrl;
//     var restSource = siteUrl + "/_api/Web/Lists/getByTitle('" + libraryName + "')/Items(" + item.Id + ")";
//     var jsonString = "";

//     var metadataColumn = new Object();
//     metadataColumn["type"] = item.__metadata.type;
//     //columnArray.push(metadataColumn);
//     if (colPropObject == null || colPropObject == 'undefined')// For library having no column properties to be updated
//     {
//         colPropObject = new Object();
//     }
//     colPropObject["__metadata"] = metadataColumn;
//     jsonString = JSON.stringify(colPropObject);
//     var dfd = jQuery.Deferred();
//     jQuery.ajax(
//         {
//             'url': restSource,
//             'method': 'POST',
//             'data': jsonString,
//             'headers':
//             {
//                 'accept': 'application/json;odata=verbose',
//                 'content-type': 'application/json;odata=verbose',
//                 'X-RequestDigest': jQuery('#__REQUESTDIGEST').val(),
//                 "IF-MATCH": item.__metadata.etag,
//                 "X-Http-Method": "MERGE"
//             },
//             'success': function (data) {
//                 //alert("Data update Successfully");

//                 window.location.href = "https://nabardmumbai.sharepoint.com/sites/FPOCGPortal/SitePages/NSApproverCGFeesDashBoard.aspx";
//                 /*	if(successId!='' && successId!=null && successId!=undefined)
//                     {
//                     //window.location.href="https://nabardmumbai.sharepoint.com/sites/FPOCGPortal/SitePages/SOEDetails.aspx?Item="+successId;		
//                     }
//                     else
//                     {
//                         window.location.href="https://nabardmumbai.sharepoint.com/sites/FPOCGPortal/SitePages/NSCheckerDashBoardCGApp.aspx";			                 
//                     }*/
//                 //window.location.href="https://mypiramal.sharepoint.com/sites/uat/CollateralSystem/SitePages/MarketingManager.aspx";
//                 var d = data;
//                 dfd.resolve(d);
//             },
//             'error': function (err) {
//                 dfd.reject(err);
//             }
//         });

//     return dfd.promise();
// }

// $("#DeleteOtherItemAttachment").on("click", function () {

//     /*delete arr.files[0];*/
//     $('#additionalDocs').remove();
// });


// function DeleteOtherItemAttachment(txtId, Fname) {
//     txtId = document.getElementById("txtId").value;
//     if (confirm('Do you want to delete this Attachment File?')) {
//         var fileName = Fname;
//         deleteAttachmentFile(_spPageContextInfo.webAbsoluteUrl, 'GeneralDocument', txtId, fileName)
//             .done(function (data) {
//                 alert("File Deleted !!");
//                 $scope.populate();
//                 return false;
//                 //$scope.EditUploadAttachment(objEditMonthly);
//             })
//             .fail(
//                 function (error) {
//                     console.log(error.responseText);
//                 });
//     }
//     else {
//         return false;
//     }


// }

// function deleteAttachmentFile(webUrl, listTitle, txtId, fileName) {
//     var webUrl = _spPageContextInfo.webAbsoluteUrl;
//     var documentLibrary = "GeneralDocument";
//     var targetUrl = _spPageContextInfo.webServerRelativeUrl + "/" + documentLibrary;
//     return $.ajax({
//         url: webUrl + "/_api/Web/GetFolderByServerRelativeUrl(@target)/Files/add(overwrite=true, url='" + fileName + "')?@target='" + targetUrl + "'&$expand=ListItemAllFields",
//         method: 'POST',
//         contentType: 'application/json;odata=verbose',
//         headers: {
//             'X-RequestDigest': $('#__REQUESTDIGEST').val(),
//             'X-HTTP-Method': 'DELETE',
//             'Accept': 'application/json;odata=verbose'
//         }
//     });
// }

//---------------------------------------------------------------------------------------------------------------------------------------------------------
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
 var cgappfilesentityid;
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
       cgappfilesentityid = xhr.getResponseHeader('entityid')
        window.location.href = location.origin + "/RefreshingCache/?id="+taxinvoicesesentityid+","+countercgfanentityid+","+countercgentityid+","+cgapplicationentityid+","+cgappfilesentityid+"&tbl=cr6fc_taxinvoiceses,cr6fc_countermasters,cr6fc_countermasters,cr6fc_cgaplications,cr6fc_cgappfileses&col=cr6fc_cacherefreshedon&red=NSApproverDashboard";
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
			"cr6fc_name":"NSApproverUTR",
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