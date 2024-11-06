var vItemID;
$(document).ready(function () {
    $('title').text('EIL Checker UTR Form');
    vItemID = GetQueryStingValue()["Item"];
    document.getElementById("MangmentCheck").disabled = true;

    // var vTaskID= GetQueryStingValue()["Task"];
    bindSOEDetailsData(vItemID);


    $("#vehicle1").change(function () {

        var checked = $(this).is(':checked');
        if (checked) {
            $("#vehicle1").each(function () {
                $(this).prop("checked", true);
                document.getElementById("MangmentCheck").disabled = false;

            });
        } else {
            $("#vehicle1").each(function () {
                $(this).prop("checked", false);
                document.getElementById("MangmentCheck").disabled = true;

            });
        }
    });

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
function Exit() {
    window.location.href = "/ELICheckerCGFeesDashboard/";
}

function showSOW() {
    var url = "/SOEDetails/?Item=" + InternId;
    window.open(url, "_blank");

}

function ShowPopUp(hi) {
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
function ShowSOE() {
    var url = "/sites/FPOCGPortal/SitePages/SOEDetails.aspx?Item=" + InternId;
    window.open(url, "_blank");

    //window.location.href="https://nabardmumbai.sharepoint.com/sites/FPOCGPortal/SitePages/SOEDetails.aspx?Item="+InternId;			                 
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
//var SOEID;
function bindSOEDetailsData(vItemID) {
    //   var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SOEDetails')//items?$top=500&$select=*,BillToState/State,BillToState/Id,BillToState/StateCode&$expand=BillToState&$filter=(WFID eq '"+vItemID+"')";
   // queryList = "/_api/cr6fc_soedetailses?$select=cr6fc_BillToState,cr6fc_wfid,cr6fc_soedetailsid,cr6fc_name,cr6fc_creditguaranteefee,cr6fc_taxamount,cr6fc_grandtotal,cr6fc_fpo,cr6fc_eligibleguranteecover,cr6fc_cgapplicationno,cr6fc_fpo,cr6fc_name,cr6fc_grandtotal,cr6fc_taxamount,cr6fc_creditguaranteefee,cr6fc_soedate,cr6fc_cgfan&$expand=cr6fc_BillToState($select=cr6fc_statemasterid,cr6fc_name)&$filter=(cr6fc_wfid eq '" + vItemID + "')&$top=5000";
    queryList = location.origin +"/_api/cr6fc_soedetailses?$select=cr6fc_BillToState,cr6fc_wfid,cr6fc_soedetailsid,cr6fc_name,cr6fc_creditguaranteefee,cr6fc_taxamount,cr6fc_grandtotal,cr6fc_fpo,cr6fc_eligibleguranteecover,cr6fc_cgapplicationno,cr6fc_fpo,cr6fc_name,cr6fc_grandtotal,cr6fc_taxamount,cr6fc_creditguaranteefee,cr6fc_soedate,cr6fc_cgfan&$expand=cr6fc_BillToState($select=cr6fc_statemasterid,cr6fc_name)&$filter=(cr6fc_wfid eq '" + vItemID + "')&$top=5000";

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
            //WFID = Logg[0].cr6fc_wfid;
            WFID = Logg[0].cr6fc_wfid;
            //InternId = Logg[0].cr6fc_soedetailsid;
            InternId = Logg[0].cr6fc_soedetailsid;
            try {
                if (Logg.length > 0) {
                   // $('#txtCGApplicationNo').val(Logg[0].cr6fc_cgapplicationno)
                    $('#txtCGApplicationNo').val(Logg[0].cr6fc_cgapplicationno)
                    //$('#txtNameOfFPO1').text(Logg[0].cr6fc_fpo)
                    $('#txtNameOfFPO1').text(Logg[0].cr6fc_fpo)
                    //$('#txtSOENo').text(Logg[0].cr6fc_name)
                    $('#txtSOENo').text(Logg[0].cr6fc_name)

                    var GrandTotal;
                    /*if (Logg[0].cr6fc_grandtotal == '' || Logg[0].cr6fc_grandtotal == null) {
                        GrandTotal = "0";
                    }
                    else {
                        GrandTotal = Logg[0].cr6fc_grandtotal;
                    }*/
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
                    /*if (Logg[0].cr6fc_taxamount == '' || Logg[0].cr6fc_taxamount == null) {
                        Amount = "0";
                    }
                    else {
                        Amount = Logg[0].cr6fc_taxamount;
                    }*/
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
                    /*if (Logg[0].cr6fc_creditguaranteefee == '' || Logg[0].cr6fc_creditguaranteefee == null) {
                        CreditGuaranteeFee = "0";
                    }
                    else {
                        CreditGuaranteeFee = Logg[0].cr6fc_creditguaranteefee;
                    }*/
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


                   /* $('#txtFPOName').text(Logg[0].cr6fc_fpo);
                    $('#txtSOEdt').text(GetCreatedDateTime(Logg[0].cr6fc_soedate))

                    $('#CGFANId').val(Logg[0].cr6fc_cgfan);
                    bindUTRDetailsData(Logg[0].cr6fc_soedetailsid)*/
                    $('#txtFPOName').text(Logg[0].cr6fc_fpo);
                    $('#txtSOEdt').text(GetCreatedDateTime(Logg[0].cr6fc_soedate))

                    $('#CGFANId').val(Logg[0].cr6fc_cgfan);
                    bindUTRDetailsData(Logg[0].cr6fc_soedetailsid)

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
   // queryList = "/_api/cr6fc_cgapplicationses?$select=cr6fc_cgapplicationsid,cr6fc_name,cr6fc_panfpo,_cr6fc_elichecker_value,cr6fc_nameoflendinginstitution,cr6fc_elicheckerpaymentremark,cr6fc_elimakerpaymentremark,&$filter=(cr6fc_cgapplicationsid eq '" + vCGID + "')&$top=5000"; comm on 9 20 24
    quesryList = "/_api/cr6fc_cgaplications?$select=cr6fc_cgaplicationid,cr6fc_name,cr6fc_panfpo,_cr6fc_elichecker_value,cr6fc_nameoflendinginstitution,cr6fc_elicheckerpaymentremark,cr6fc_elimakerpaymentremark&$filter=(cr6fc_cgaplicationid eq '" + vCGID + "')&$top=5000";
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
                    // $('#txtAmount').text(UTRColl[0].PaymentPaid)
                     //$('#CGApplicationNo').text(CGCollData[0].cr6fc_name)
                     $('#CGApplicationNo').text(CGCollData[0].cr6fc_name)
                    //document.getElementById("CGPANNo").value = CGCollData[0].cr6fc_panfpo;
                    document.getElementById("CGPANNo").value = CGCollData[0].cr6fc_panfpo;
                    //$("#txtELICheckerName").text(CGCollData[0]['_cr6fc_elichecker_value@OData.Community.Display.V1.FormattedValue']);
                    $("#txtELICheckerName").text(CGCollData[0]['_cr6fc_elichecker_value@OData.Community.Display.V1.FormattedValue']);
                   // $("#instituteId").text(CGCollData[0].cr6fc_nameoflendinginstitution);
                    $("#instituteId").text(CGCollData[0].cr6fc_nameoflendinginstitution);
                   // $("#instituteIdNew").text(CGCollData[0].cr6fc_nameoflendinginstitution);
                    $("#instituteIdNew").text(CGCollData[0].cr6fc_nameoflendinginstitution);
                    $("#dtproceed").text(GetCreatedDateTime(new Date));

                    //document.getElementById("txtELiCheckerComments").value=CGCollData[0].ELICheckerRemark;//commented by shivaprabha
                    $('#divCheckerHide').hide();//added by shivaprabha
                    //if(divCheckerHide!==''){
                    //$('#divCheckerHide').hide();

                    //}
                    //if (CGCollData[0].cr6fc_elicheckerpaymentremark != null && CGCollData[0].cr6fc_elicheckerpaymentremark != undefined && CGCollData[0].cr6fc_elicheckerpaymentremark != '') {
                        if (CGCollData[0].cr6fc_elicheckerpaymentremark != null && CGCollData[0].cr6fc_elicheckerpaymentremark != undefined && CGCollData[0].cr6fc_elicheckerpaymentremark != '') {
                        $('#divCheckerHide').show();
                        //document.getElementById("divELICheckerRemark").innerHTML = CGCollData[0].cr6fc_elicheckerpaymentremark;
                        document.getElementById("divELICheckerRemark").innerHTML = CGCollData[0].cr6fc_elicheckerpaymentremark;
                        //document.getElementById("divELICheckerRemark").append(Logg[0].ELICheckerRemark);
                        //document.getElementById("txtELiCheckerComments").value=CGCollData[0].cr6fc_elicheckerpaymentremark;
                        document.getElementById("txtELiCheckerComments").value=CGCollData[0].cr6fc_elicheckerpaymentremark;
                    }
                    $('#divMakerHide').hide();


                   // if (CGCollData[0].cr6fc_elimakerpaymentremark != null && CGCollData[0].cr6fc_elimakerpaymentremark != undefined && CGCollData[0].cr6fc_elimakerpaymentremark != '') {
                        if (CGCollData[0].cr6fc_elimakerpaymentremark != null && CGCollData[0].cr6fc_elimakerpaymentremark != undefined && CGCollData[0].cr6fc_elimakerpaymentremark != '') {
                        $('#divMakerHide').show();
                        //document.getElementById("divELIMakerRemark").innerHTML = CGCollData[0].cr6fc_elimakerpaymentremark;
                        document.getElementById("divELIMakerRemark").innerHTML = CGCollData[0].cr6fc_elimakerpaymentremark;
                        //document.getElementById("divELICheckerRemark").append(Logg[0].ELICheckerRemark);
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
    // var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('UTRDetails')//items?$top=500&$select=*&$filter=(SOEID eq '"+vSOEID+"')";
   // queryList = "/_api/cr6fc_utrdetailses?$select=cr6fc_paymentpaid,cr6fc_paymentdate,cr6fc_utrno&$filter=(cr6fc_soeid eq '" + vSOEID + "')&$top=5000";
    queryList = "/_api/cr6fc_utrdetailses?$select=cr6fc_paymentpaid,cr6fc_paymentdate,cr6fc_utrno&$filter=(cr6fc_soeid eq '" + vSOEID + "')&$top=5000";
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
                    // $('#txtAmount').text(UTRColl[0].PaymentPaid)
                    var PaymentPaid;
                   // if (UTRColl[0].cr6fc_paymentpaid == '' || UTRColl[0].cr6fc_paymentpaid == null) {
                        if (UTRColl[0].cr6fc_paymentpaid == '' || UTRColl[0].cr6fc_paymentpaid == null) {
                        PaymentPaid = "0";
                    }
                    else {
                       // PaymentPaid = UTRColl[0].cr6fc_paymentpaid;
                        PaymentPaid = UTRColl[0].cr6fc_paymentpaid;
                    }
                    $('#txtAmount').text(Math.ceil(PaymentPaid));
                    var Word = convertNumberToWords(Math.ceil(PaymentPaid));
                    console.log(Word);
                    $('#txtAmountinwords').text("Rupees " + " " + Word + " " + "Only");
                    $('#txtAmountinwords').val("Rupees " + " " + Word + " " + "Only");
                    //$('#txtUTRNo').text(UTRColl[0].cr6fc_utrno)
                    $('#txtUTRNo').text(UTRColl[0].cr6fc_utrno)
                    //document.getElementById("txtPaymentdt").text=UTRColl[0].PaymentDate.substring(0,UTRColl[0].PaymentDate.indexOf("T"));;
                   // $('#txtPaymentdt').text(GetCreatedDateTime(UTRColl[0].cr6fc_paymentdate))
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
    var hdnFPOPAN = document.getElementById("CGPANNo").value;


    //var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CounterMaster')//items?$top=500&$select=CGApplicationNo,ID,Title&$filter=Title eq 'CGPAN'";
    //queryList = "/_api/cr6fc_countermasters?$select=cr6fc_cgapplicationno,cr6fc_countermasterid&$filter=(cr6fc_name eq 'CGPAN')&$top=5000";
    queryList = "/_api/cr6fc_countermasters?$select=cr6fc_cgapplicationno,cr6fc_countermasterid&$filter=(cr6fc_name eq 'CGPAN')&$top=5000";
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
                if (Logg.length > 0) {
                   // var ItemId = Logg[0].cr6fc_cgapplicationno;
                    var ItemId = Logg[0].cr6fc_cgapplicationno;

                    hdnCounter = parseInt(ItemId) + 1;
                    vRetVal = 'CGFPO' + dd + '' + calmonth + '' + yyyy + '' + hdnFPOPAN + '' + '000' + hdnCounter;
                    document.getElementById("hdnDigitalRequestNoCGFAN").value = vRetVal;
                   // document.getElementById("hdnCounterItemIDCGFAN").value = Logg[0].cr6fc_cgapplicationno;
                   // document.getElementById("hdnCounterItemID1CGFAN").value = Logg[0].cr6fc_countermasterid;
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
   // queryList = "/_api/cr6fc_countermasters?$select=cr6fc_cgapplicationno,cr6fc_name,cr6fc_countermasterid&$filter=(cr6fc_name eq 'Tax')&$top=5000";
    queryList = "/_api/cr6fc_countermasters?$select=cr6fc_cgapplicationno,cr6fc_name,cr6fc_countermasterid&$filter=(cr6fc_name eq 'Tax')&$top=5000";
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
                    //var ItemId = Logg[0].cr6fc_cgapplicationno;
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
                    vRetVal = 'TFPO' + '/' + hdnCounter + '/' + fiscalyear;
                    document.getElementById("hdnDigitalRequestNo").value = vRetVal;
                    /*document.getElementById("hdnCounterItemID").value = Logg[0].cr6fc_cgapplicationno;
                    document.getElementById("hdnCounterItemID1").value = Logg[0].cr6fc_countermasterid;*/
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
var updatefanentityid;
function UpdateCounterCGFAN() {
    debugger;
    var itemId = document.getElementById("hdnCounterItemID1CGFAN").value;
    var hdnCounter = document.getElementById("hdnCounterItemIDCGFAN").value;
    hdnCounter1 = parseInt(hdnCounter) + 1;
    var data1 = JSON.stringify(
        {
            /* '__metadata': {
                 'type': 'SP.Data.CounterMasterListItem'
             },*/
           // 'cr6fc_cgapplicationno': hdnCounter1.toString()
            'cr6fc_cgapplicationno': hdnCounter1.toString()
        });
    $.ajax({
       // url: "/_api/cr6fc_countermasters('" + itemId + "')",
        url: "/_api/cr6fc_countermasters('" + itemId + "')",
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
        success: function (data,textStatus,xhr) {
            updatefanentityid = xhr.getResponseHeader('entityid');
            // AddDashBoard(document.getElementById("hdnDigitalRequestNo").value, document.getElementById("hdnApprvlNotesItemID").value);
            //alert('Data Done')
        },
        error: function (e) {
        }
    });
}
var counterentityid;
function UpdateCounter() {
    debugger;
    var itemId = document.getElementById("hdnCounterItemID1").value;
    var hdnCounter = document.getElementById("hdnCounterItemID").value;
    hdnCounter1 = parseInt(hdnCounter) + 1;
    var data1 = JSON.stringify(
        {
            /* '__metadata': {
                 'type': 'SP.Data.CounterMasterListItem'
             },*/
           // 'cr6fc_cgapplicationno': hdnCounter1.toString()
            'cr6fc_cgapplicationno': hdnCounter1.toString()
        });
    $.ajax({
        // url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('CounterMaster')/getItemByStringId('" + itemId + "')",
        //url: "/_api/cr6fc_countermasters('" + itemId + "')",
        url: "/_api/cr6fc_countermasters('" + itemId + "')",
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
        success: function (data,textStatus,xhr) {
             counterentityid = xhr.getResponseHeader('entityid');
            // AddDashBoard(document.getElementById("hdnDigitalRequestNo").value, document.getElementById("hdnApprvlNotesItemID").value);
            //alert('Data Done')
        },
        error: function (e) {
        }
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
var txtNsApprRemark;
var sentbackintityid;
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
            
            /*"cr6fc_status": "14",
            "cr6fc_elicheckerpaymentremark": txtNsApprRemark*/
            "cr6fc_status": "14",
            "cr6fc_elicheckerpaymentremark": txtNsApprRemark
        });
        shell.getTokenDeferred().done(function(token){
    $.ajax({

        // url: _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/getByTitle('CGApplications')/getItemByStringId('" +vItemID+"')",
        url: "/_api/cr6fc_cgaplications(" + vItemID + ")",
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
            sentbackintityid = xhr.getResponseHeader('entityid');
            alert('Request send back to ELI Maker');
           // window.location.href = location.origin + "/RefreshingCache/?id="+sentbackintityid+"&tbl=cr6fc_cgapplicationses&col=cr6fc_cacherefreshedon&red=ELICheckerCGFeesDashboard";
            window.location.href = location.origin + "/RefreshingCache/?id="+sentbackintityid+"&tbl=cr6fc_cgaplications&col=cr6fc_cacherefreshedon&red=ELICheckerCGFeesDashboard";
            // window.location.href = "/ELICheckerCGFeesDashboard/";
        },
        error: function (e) {
            console.log(e);
        }
    })
    });

}
function SubmitData() {
    //var txtCreditGuranteeFee= $("#txtCreditGuranteeFee").val();
    var CGFANId = $("#CGFANId").val();
    var txtSOENumber = $("#txtSOENo").text();
    var txtUTRNo = $("#txtUTRNo").text();
    var PaymentDate = $("#PaymentDate").text();
    var AmountPaid = $('#txtPaidAmount').text();
    var CGFeeDue = $('#txtGrandTotal').text();
    var txtNsApprRemark = $("#txtRemarksComments").val();
    var cgAppNumber =$("#CGApplicationNo").val();
    var x = confirm("Do you wish to Approve ?");
    if (x) {
        
        var url = "/_api/cr6fc_taxinvoiceses"
        var data = JSON.stringify(
            {
                /* "__metadata":
                 {
                     "type": "SP.Data.TaxInvoicesListItem"
                 },*/
                //"CGPAN":vCGFANTitle,
                /*"cr6fc_cgfan": CGFANId,
                "cr6fc_name":cgAppNumber,
                "cr6fc_invoicedate": new Date(),
                "cr6fc_soeno": txtSOENumber,
                "cr6fc_soeid": "" + InternId,
                "cr6fc_cgid": vItemID*/
                "cr6fc_cgfan": CGFANId,
                "cr6fc_name":cgAppNumber,
                "cr6fc_invoicedate": new Date(),
                "cr6fc_soeno": txtSOENumber,
                "cr6fc_soeid": "" + InternId,
                "cr6fc_cgid": vItemID

            });
            shell.getTokenDeferred().done(function(token){
                $.ajax({
                //url: _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/getbytitle('TaxInvoices')/items",
                url: url,
                type: "POST",
                contentType: "application/json;odata=verbose",
                async: false,
                data: data,
                headers: {
                    __RequestVerificationToken: token,
                    "X-RequestDigest": $('#__REQUESTDIGEST').val(),
                    "accept": "application/json",
                    //"content-type": "application/json",
                },

                success: function (data, textStatus, xhr) {
                    successId = xhr.getResponseHeader("entityid");
                    console.log(successId);

                    var DataNew = JSON.stringify(
                        {
                            /* '__metadata': {
                                'type': 'SP.Data.CGApplicationsListItem'
                            },*/
                            /*"cr6fc_paymentproceeddate": new Date(),
                            "cr6fc_elicheckerpaymentremark": txtNsApprRemark,
                            "cr6fc_status": "10"*/
                            "cr6fc_paymentproceeddate": new Date(),
                            "cr6fc_elicheckerpaymentremark": txtNsApprRemark,
                            "cr6fc_status": "10"

                        });
                    $.ajax({

                       // url :"/_api/cr6fc_cgapplicationses("+vItemID+")",
                        url :"/_api/cr6fc_cgaplications("+vItemID+")",
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

                           cgappentityid=xhr.getResponseHeader('entityid');

                            alert('Data  Submit Successfully.');
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

                            //window.location.href="/sites/FPOCGPortal/SitePages/ELICheckerDashBoardCGApp.aspx";
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

function Proceed()
{
    var Data;
	
            Data = JSON.stringify(
            {
                /*'__metadata': {
                    'type': 'SP.Data.CGApplicationsListItem'
                },*/
                 "cr6fc_eilcheckerutrcertificateview":"1",
                 "cr6fc_eilcheckerutrcertificateviewdate":new Date()				 
            });
            shell.getTokenDeferred().done(function(token){
                $.ajax({
	
        //url:"/_api/cr6fc_cgapplicationses(" + vItemID + ")",
        url:"/_api/cr6fc_cgaplications(" + vItemID + ")",
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
                   
                alert('Item Updated Succesfully');
                //window.location.href = location.origin + "/RefreshingCache/?id="+successId+","+cgappentityid+"&tbl=cr6fc_taxinvoiceses,cr6fc_cgapplicationses&col=cr6fc_cacherefreshedon&red=ELICheckerCGFeesDashboard";
                window.location.href = location.origin + "/RefreshingCache/?id="+successId+","+cgappentityid+"&tbl=cr6fc_taxinvoiceses,cr6fc_cgaplications&col=cr6fc_cacherefreshedon&red=ELICheckerCGFeesDashboard";
                // window.location.href="/ELICheckerCGFeesDashboard/";	
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
               /*'__metadata': {
                   'type': 'SP.Data.CGApplicationsListItem'
               },*/
                //"cr6fc_status":"10"
                "cr6fc_status":"10"
           });	
           shell.getTokenDeferred().done(function(token){

   $.ajax({
	
      // url:"/_api/cr6fc_cgapplicationses(" + vItemID + ")",
       url:"/_api/cr6fc_cgaplications(" + vItemID + ")",
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
