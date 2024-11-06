var vItemID;
var vTotalDocLength = 0;
var fileArray = [];
var otherfileArray = [];
var AttchLength = 0;
var arraycount = 0;
var loggedInUserId = '';
var loggedInUserName = '';
var loggedInUserEmail = '';
$(document).ready(function () {
    loggedInUserId = $('#fpo-user-contact-id').val();
    loggedInUserName = $('#fpo-user-contact-name').val();
    loggedInUserEmail = $('#fpo-user-email').val();
    $('title').text('NS Checker Payment Form');
   // $('#fileAttachInvoice').multifile();

    vItemID = GetQueryStingValue()["Item"];
    // var vTaskID= GetQueryStingValue()["Task"];
    bindCGApplicationData(vItemID);
    bindSOEDetailsData(vItemID);


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
    var url = "/TaxInvoices/?Item=" + InternId;
    window.open(url, "_blank");

}
function ShowSOE() {
    var url = "/SOEDetails/?Item=" + InternId;
    window.open(url, "_blank");

    //window.location.href="https://nabardmumbai.sharepoint.com/sites/FPOCGPortal/SitePages/SOEDetails.aspx?Item="+InternId;			                 
}
function Exit() {
    window.location.href = "/NSCheckerCGFeeDashboard/";
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
    queryList = location.origin +"/_api/cr6fc_cgaplications?$select=*&$filter=cr6fc_cgaplicationid eq " + vItemID + " &$top=5000";

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

                    //document.getElementById("txtApplicantName").value=Logg[0].ApplicantName;
                    //document.getElementById("txtNameOfFPO").value=Logg[0].NameOfFPO;
                    $("#txtNameOfLendingInstitution").text(Logg[0].cr6fc_nameoflendinginstitution);
                  /*  if (Logg[0].cr6fc_elimakerpaymentremark != null && Logg[0].cr6fc_elimakerpaymentremark != undefined && Logg[0].cr6fc_elimakerpaymentremark != '') {
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

                    //   $("#txtEliMakerRemarks").val(Logg[0].NameOfLendingInstitution);
                    // $("#").val(Logg[0].NameOfLendingInstitution);
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
function ClosePopup() {
    $("#inputDialog3").dialog("close");
    $("#inputDialog3").css('display','none')
}

function ViewPaymentManagment() {
    $("#inputDialog3").dialog({
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

    $("#inputDialog3").dialog("open");

}

var WFID = "";
var InternId = "";
//var SOEID;
function bindSOEDetailsData(vItemID) {
    //var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SOEDetails')//items?$top=500&$select=*,BillToState/State,BillToState/Id,BillToState/StateCode&$expand=BillToState&$filter=(WFID eq '"+vItemID+"')";
    var requestUri = location.origin +"/_api/cr6fc_soedetailses?$select=cr6fc_wfid,cr6fc_soedetailsid,cr6fc_name,cr6fc_creditguaranteefee,cr6fc_grandtotal,cr6fc_taxamount,cr6fc_cgfan,cr6fc_fpo,cr6fc_soedate&$filter=(cr6fc_wfid eq '"+vItemID+"')&$top=5000";

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
                    //$('#txtGrandTotal').text(Math.ceil(GrandTotal));


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

                    //$('#txtGrandTotal').text(Math.ceil(Logg[0].GrandTotal));//CGFANNo
                    $('#CGFANId').val(Logg[0].cr6fc_cgfan);
                    $('#CGFANNo').text(Logg[0].cr6fc_cgfan);
                    $('#txtFPOName').text(Logg[0].cr6fc_fpo);
                    $('#txtSOEdt').text(GetCreatedDateTime(Logg[0].cr6fc_soedate))

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
function OpenInvoice1() {
    window.location.href = "/SOEDetails/?Item=" + InternId;
}
var UTRColl;
var UTRInternalID;
function bindUTRDetailsData(vSOEID) {
    //  var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('UTRDetails')//items?$top=500&$select=*&$filter=(SOEID eq '"+vSOEID+"')";
    var requestUri = "/_api/cr6fc_utrdetailses?$select=cr6fc_utrdetailsid,cr6fc_paymentpaid,cr6fc_utrno,cr6fc_paymentdate&$filter=cr6fc_soeid eq '" + vSOEID + "'&$top=5000";
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
                    $('#txtUTRNo').text(UTRColl[0].cr6fc_utrno)
                    //document.getElementById("txtPaymentdt").text=UTRColl[0].PaymentDate.substring(0,UTRColl[0].PaymentDate.indexOf("T"));;
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
    //var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CounterMaster')//items?$top=500&$select=CGApplicationNo,ID,Title&$filter=Title eq 'CGPAN'";
    queryList = "/_api/cr6fc_countermasters?$select=*&$filter=(cr6fc_name eq 'CGPAN')&$top=5000";
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
                    var ItemId = Logg[0].cr6fc_cgapplicationno;

                    hdnCounter = parseInt(ItemId) + 1;
                    vRetVal = 'CGFPO' + dd + '' + calmonth + '' + yyyy + '000' + hdnCounter;
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
    // var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CounterMaster')//items?$top=500&$select=CGApplicationNo,ID,Title&$filter=Title eq 'Tax'";
    queryList = "/_api/cr6fc_countermasters?$select=*&$filter=(cr6fc_name eq 'Tax')&$top=5000";
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
                    hdnCounter = parseInt(ItemId) + 1;
                    fiscalyear = fiscalyear.replace("20", "");
                    fiscalyear = fiscalyear.replace("20", "");
                    vRetVal = 'TFPO' + '/' + hdnCounter + '/' + fiscalyear;
                    document.getElementById("hdnDigitalRequestNo").value = vRetVal;
                    document.getElementById("hdnCounterItemID").value = data.value[0].cr6fc_cgapplicationno;
                    document.getElementById("hdnCounterItemID1").value = data.value[0].cr6fc_countermasterid;

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
    var hdnCounter = document.getElementById("hdnCounterItemIDCGFAN").value;
    hdnCounter1 = parseInt(hdnCounter) + 1;
    var data1 = JSON.stringify(
        {
            /*  '__metadata': {
                  'type': 'SP.Data.CounterMasterListItem'
              },*/
            'cr6fc_cgapplicationno': hdnCounter1.toString()
        });
    $.ajax({
        url: "/_api/cr6fc_countermasters(" + itemId + ")",
        type: "PATCH",
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
    var hdnCounter = document.getElementById("hdnCounterItemID").value;
    hdnCounter1 = parseInt(hdnCounter) + 1;
    var data1 = JSON.stringify(
        {
            '__metadata': {
                'type': 'SP.Data.CounterMasterListItem'
            },
            'CGApplicationNo': hdnCounter1.toString()
        });
    $.ajax({
        url: "/_api/cr6fc_countermasters(" + itemId + ")",
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

function SubmitData() {
    //var txtCreditGuranteeFee= $("#txtCreditGuranteeFee").val();
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
        //var vTitle = GetTaxCounter(); 
        //var vCGFANTitle = GetCounterCGPAN(); 

        //var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('UTRDetails')/items";
        var data = JSON.stringify(
            {
                /* "__metadata":
                 {
                     "type": "SP.Data.UTRDetailsListItem"
                 },*/
                "cr6fc_paymentreceiveddate": dtpaymentreceived,
              //  "cr6fc_paymentstatus": ddlPaymentReceived,
              "cr6fc_paymentstatus":""+426900000
            });
        shell.getTokenDeferred().done(function (token) {
            $.ajax({
                url: "/_api/cr6fc_utrdetailses("+UTRInternalID+")",
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

                success: function (success) {
                    //successId=success.Id;
                    //console.log(successId);
                    var Data1 = JSON.stringify(
                        {
                            /*  '__metadata': {
                                  'type': 'SP.Data.CGApplicationsListItem'
                              },*/
                            "cr6fc_paymentconfirmeddate": new Date(),
                            "cr6fc_paymentreceiveddate": new Date(dtpaymentreceived),
                            "cr6fc_nschackerpaymentremark": txtRemarks,
                            "cr6fc_status": "11"

                        });
                    fileInput = $('#fileAttachInvoice');
                    otherfileArray = [];
                    //var AttchLength=fileInput[0].files.length
                    $("#attachFilesHolderOther input:file").each(function () {
                        if ($(this)[0].files[0]) {
                            otherfileArray.push({ "Attachment": $(this)[0].files[0] });
                        }
                    });
                    AttchLength = otherfileArray.length;
                    $.ajax({

                        url: "/_api/cr6fc_cgaplications("+vItemID+")",
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
                        success: function (data) {
                            //UpdateCounter();
                            //UpdateCounterCGFAN();
                            if (AttchLength != 0) {
                               // getFileContentsAndMetadata(vItemID,token)
                               updatecgappfile(vItemID)
                            }

                            alert('Data  Submit Successfully.');
                            if (AttchLength == 0 || AttchLength == null || AttchLength == '') {
                                window.location.href = "/NSCheckerCGFeeDashboard/";
                            }
                        },
                        error: function (e) {
                            console.log(e);
                        }
                    });


                    //StatusChange();
                },
                error: function (error) {
                    console.log(error);
                    //alert('Some error occured. Please try again later.');
                    alert('Some error occured while adding data in UTRDetail list. Please try again later.');
                    console.log(error);
                }
            })
        })
    }


}

function StatusChange() {
    var Data = JSON.stringify(
        {
            /*'__metadata': {
                'type': 'SP.Data.CGApplicationsListItem'
            },*/
            "cr6fc_status": "10"

        });
        shell.getTokenDeferred().done(function (token) {
    $.ajax({

        url:"/_api/cr6fc_cgaplications("+vItemID +")",
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
        success: function (data) {
            alert('List updated Succesfully');
        },
        error: function (e) {
            console.log(e);
        }
    })
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
//                 window.location.href = "/sites/FPOCGPortal/SitePages/NSCheckerDashBoardCGApp.aspx";

//                 //alert("Data update Successfully");
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


//------------------------------------------------------------------------------------------------------
function getFileContentsAndMetadata(CGFileID,token) {
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
	url: "/_api/cr6fc_cgappfileses(" + CGFileID + ")/cr6fc_nscheckerpaymentfiles?x-ms-file-name=" + fileName,
	type: "PUT",
	async: false,
	contentType: "application/octet-stream",
	processData: false,
	// data: fileContent,
	data: fileContent,
	headers: header,
	success: function (data, textStatus, xhr) {
        window.location.href = "/NSCheckerCGFeeDashboard/";
	},
	error: function (xhr, textStatus, errorThrown) {
		console.log(errorThrown)
	}
});
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