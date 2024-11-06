var loggedInUserId = '';
var loggedInUserName = '';
var loggedInUserEmail = '';
$(document).ready(function () {
   loggedInUserId = $('#fpo-user-contact-id').val();
   loggedInUserName = $('#fpo-user-contact-name').val();
   loggedInUserEmail = $('#fpo-user-email').val();
   vItemID = GetQueryStingValue()["Item"];
   BindFPOActivities();
   BindRegion();
   //$('#file_input').multifile();
   BindCGPAN(vItemID);
   bindCGApplicationData(vItemID);
   // facility();
   //getOtherDocDataLatest(vItemID);
   BindELIMaker();
   // getfileELIMaker(vItemID);
   // getfileELIChecker(vItemID);
   /*$("#file_input").multifile();*/
   function DisbursmentLoan(selectedValue) {
      if (selectedValue === 'No') {
         $('#3').hide();
         $('#5').hide();
         $('#6').hide();
         $('#7').hide();
         $('#8').hide();
      }
      else {
         $('#3').show();
         $('#5').show();
         $('#6').show();
         $('#7').show();
         $('#8').show();

      }
   }

   $('#DisbursmentLoan').on('change', function () {
      var selectedValue = $(this).val();
      DisbursmentLoan(selectedValue);
   });

   function Limitoperational(selectedValue3) {
      if (selectedValue3 === 'Yes') {
         $('#22').hide();
      }
      else {
         $('#22').show();
      }
   }
   function UtilisationLimit(selectedValue5) {
      if (selectedValue5 === 'No') { $('#202').hide(); }
      if (selectedValue5 === 'Yes') { $('#202').show(); }

   }

   $('#UtilisationLimit').on('change', function () {
      var selectedValue5 = $(this).val();
      UtilisationLimit(selectedValue5);
   });

   function Limitoperational(selectedValue3) {
      if (selectedValue3 === 'No') { $('#22').hide(); }
      if (selectedValue3 === 'Yes') { $('#22').show(); }

   }
   $('#Limitoperational').on('change', function () {
      var selectedValue3 = $(this).val();
      Limitoperational(selectedValue3);
   });


   function LoanClosed(selectedValue2) {
      if (selectedValue2 === 'No') { $('#10').hide(); }
      if (selectedValue2 === 'Yes') { $('#10').show(); }
   }

   $('#LoanClosed').on('change', function () {
      var selectedvalue2 = $(this).val();
      LoanClosed(selectedvalue2);
   });

   function EndLimitClosed2(selectedValue4) {
      if (selectedValue4 === 'No') { $('#201').hide(); }
      if (selectedValue4 === 'Yes') { $('#201').show(); }
   }

   $('#EndLimitClosed2').on('change', function () {
      var selectedvalue4 = $(this).val();
      EndLimitClosed2(selectedvalue4);
   });

   function IRACclassification(IRACStat) {
      if (IRACStat == "Substandard" || IRACStat == "Doubtful" || IRACStat == "Loss") {
         IRACStat = "NPA";
      }
      else {
         IRACStat = "Non NPA";
      }

      if (IRACStat === 'Non NPA') {
         $('#20').hide();
      }
      if (IRACStat === 'NPA') { $('#20').show(); }
   }

   $('#IRACclassification').on('change', function () {
      var IRACStat = $(this).val();
      IRACclassification(IRACStat);
   });

   var today = new Date();
   var dd1 = String(today.getDate()).padStart(2, '0');
   var mm = String(today.getMonth() + 1).padStart(2, '0');
   var yyyy = today.getFullYear();

   today = yyyy + '-' + mm + '-' + dd1;
   $('#DateofNPA').attr('max', today);
   $('#DateClosureLimit2').attr('max', today);
   $('#DateclosureLoan').attr('max', today);
   $('#DatefirstWithdrawl').attr('max', today);

});

let workflowDt = new Date();
workflowDt = GetCurrentDataToday();

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

function BindFPOActivities() {
   var requestUri = location.origin + "/_api/cr6fc_fpoactivitiesmasters?$select=cr6fc_fpoactivity";

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
                  FPOActivities.options[FPOActivities.options.length] = new Option(items[i].cr6fc_fpoactivity, i + 1);
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

function BindRegion() {
   var requestUri = location.origin + "/_api/cr6fc_regionmasters?$select=cr6fc_name,cr6fc_regionmasterid";
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
         items.splice(2, 1);
         try {
            if (items.length > 0) {
               var RegionOfFPO = document.getElementById("RegionOfFPO");
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



function cancel() {

   window.location.href = location.origin + "/ELIMakerDBRenewal/";

}
var ModifiedSanctionedAmount;
var PeakOutstanding2;

function PeakOutstanding() {
   PeakOutstanding2 = $("#PeakOutstanding2").val();
   var PeakOutstanding2inword = convertNumberToWords(Math.ceil(PeakOutstanding2));
   $('#PeakOutstandinginwords').text("Rupees " + " " + PeakOutstanding2inword + " " + "Only");
}

function ModifiedSanctionedAmountss() {
   ModifiedSanctionedAmount = $("#ModifiedSanctionedAmount").val();
   var World = convertNumberToWords(Math.ceil(ModifiedSanctionedAmount));
   $('#ModifiedSanctionedAmountiinwords').text("Rupees " + " " + World + " " + "Only");
}

function PrincipalOutstandinginwords() {
   var PrincipalOutstanding = $("#PrincipalOutstanding").val();
   var PrincipalOutstandinginword = convertNumberToWords(Math.ceil(PrincipalOutstanding));
   $('#PrincipalOutstandinginwords').text("Rupees " + " " + PrincipalOutstandinginword + " " + "Only");
}
var parentid;
//var DisbursmentLoan ;
function bindCGApplicationData(vItemID) {
   var requestUri = location.origin + "/_api/cr6fc_renewalcgapplications?$top=5000&$select=cr6fc_guaranteeenddate,cr6fc_guaranteestartdate,cr6fc_cgfeedate,cr6fc_validityenddate,cr6fc_cgfeestartdate,cr6fc_totalmembernorthen,cr6fc_totalfpomember,cr6fc_cgstatus,cr6fc_enddateofprinciplemoratium,cr6fc_dateoffirstdisbursement,cr6fc_dateofmodifiedsanction,cr6fc_FPOState,cr6fc_BusinessFPOState,cr6fc_RegionOfFPO,cr6fc_renewalcgapplicationid,cr6fc_parentid,cr6fc_cgpan,cr6fc_disbursmentunderloan,cr6fc_nameoffpo,cr6fc_panfpo,cr6fc_name,cr6fc_customerid,cr6fc_farmermembersize,cr6fc_typeoffacility,cr6fc_name,cr6fc_dateofsanction,cr6fc_accountno,cr6fc_sanctionedamount,cr6fc_modifiedsanctionedloanamount,cr6fc_dateofnpa,cr6fc_iracclassificationoftheaccount,cr6fc_disbursmentunderloan,cr6fc_principaloutstanding,cr6fc_enddateofinterestmoratium,cr6fc_dateoflastinstalment,cr6fc_loanfullydisbured,cr6fc_loanclosed,cr6fc_dateofclosureofloan,cr6fc_peakoutstanding,cr6fc_dateoffirstwithdrawal,cr6fc_dateofclosureoflimit,cr6fc_limitoperational,cr6fc_utilisationunderlimit,cr6fc_limitclosed,cr6fc_dateoflimitvalidity,cr6fc_elicheckerremark,cr6fc_elimakerremark&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=(cr6fc_renewalcgapplicationid eq '" + vItemID + "')";
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
         parentid = Logg[0].cr6fc_parentid;
         getfileELIMaker(vItemID);
         $("#CGPAN").val(Logg[0].cr6fc_cgpan);
         $("#DisbursmentLoan").val(Logg[0]['cr6fc_disbursmentunderloan@OData.Community.Display.V1.FormattedValue']);
         if (Logg[0]['cr6fc_disbursmentunderloan@OData.Community.Display.V1.FormattedValue'] == 'No') {
            $('#3').hide();
            $('#5').hide();
            $('#6').hide();
            $('#7').hide();
            $('#8').hide();
         }
         else {
            $('#3').show();
            $('#5').show();
            $('#6').show();
            $('#7').show();
            $('#8').show();

         }
         $("#txtNameOfFPO").val(Logg[0].cr6fc_nameoffpo);
         $("#PANFPO").val(Logg[0].cr6fc_panfpo);
         $("#txtApplicantID").val(Logg[0].cr6fc_name);
         $("#CustomerID").val(Logg[0].cr6fc_customerid);
         $("#RegionOfFPO").val(Logg[0].cr6fc_RegionOfFPO.cr6fc_regionmasterid);
         $("#FarmerMemberSize").val(Logg[0].cr6fc_farmermembersize);
         $("#TypeofFacility").val(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue']);

         if (Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'] == "Term Loan OR WCTL (Working Capital Term Loan)") {
            $("#2").hide();
         }
         else if (Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'] == "WC/CC Limit") {
            $("#1").hide();
         }

         $("#hdnTitle").val(Logg[0].cr6fc_name);
         //$("#SanctionDate").val(Logg[0].DateOfSanction);
         if (Logg[0].cr6fc_dateofsanction != null && Logg[0].cr6fc_dateofsanction != undefined && Logg[0].cr6fc_dateofsanction != '') {
            var SanctionDate = new Date(Logg[0].cr6fc_dateofsanction);
            var spDate9 = SanctionDate.toISOString().slice(0, 10);
            document.getElementById("SanctionDate").value = spDate9;
         }

         $("#AccountNo").val(Logg[0].cr6fc_accountno);
         $("#SanctionedAmount").val(Logg[0].cr6fc_sanctionedamount);
         $('#SanctionedAmount').text(Math.ceil(Logg[0].cr6fc_sanctionedamount));
         var Word = convertNumberToWords(Math.ceil(Logg[0].cr6fc_sanctionedamount));
         $('#SanctionedAmountinwords').text("Rupees " + " " + Word + " " + "Only");

         $('#ModifiedSanctionedAmount').val(Logg[0].cr6fc_modifiedsanctionedloanamount);
         $('#ModifiedSanctionedAmount').text(Math.ceil(Logg[0].cr6fc_modifiedsanctionedloanamount));
         var Words = convertNumberToWords(Math.ceil(Logg[0].cr6fc_modifiedsanctionedloanamount));
         $('#ModifiedSanctionedAmountiinwords').text("Rupees " + " " + Words + " " + "Only");

         if (Logg[0].cr6fc_dateofnpa != null && Logg[0].cr6fc_dateofnpa != undefined && Logg[0].cr6fc_dateofnpa != '') {
            var DN = new Date(Logg[0].cr6fc_dateofnpa);
            var spDate9 = DN.toISOString().slice(0, 10);
            document.getElementById("DateofNPA").value = spDate9;
         }

         $("#IRACclassification").val(Logg[0]["cr6fc_iracclassificationoftheaccount@OData.Community.Display.V1.FormattedValue"]);
         if (Logg[0]["cr6fc_iracclassificationoftheaccount@OData.Community.Display.V1.FormattedValue"] == "Substandard" || Logg[0]["cr6fc_iracclassificationoftheaccount@OData.Community.Display.V1.FormattedValue"] == "Doubtful" || Logg[0]["cr6fc_iracclassificationoftheaccount@OData.Community.Display.V1.FormattedValue"] == "Loss") {
            $('#20').show();
         }
         else {
            $('#20').hide();
         }
         var DisbursmentLoan = Logg[0]["cr6fc_disbursmentunderloan@OData.Community.Display.V1.FormattedValue"];
         if (Logg[0].cr6fc_dateofmodifiedsanction != null && Logg[0].cr6fc_dateofmodifiedsanction != undefined && Logg[0].cr6fc_dateofmodifiedsanction != '') {
            var DMS2 = new Date(Logg[0].cr6fc_dateofmodifiedsanction);
            var spDate5 = DMS2.toISOString().slice(0, 10);
            document.getElementById("DateModifiedSanction").value = spDate5;
         }
         try {


            if (Logg[0]["cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue"] == "Term Loan OR WCTL (Working Capital Term Loan)") {
               $("#2").hide();
               $("#1").show();
               $("#DisbursmentLoan").val(Logg[0]["cr6fc_disbursmentunderloan@OData.Community.Display.V1.FormattedValue"]);
               if (DisbursmentLoan == "No") {
                  $('#3').hide();
                  $('#5').hide();
                  $('#6').hide();
                  $('#7').hide();
                  $('#8').hide();
               }
               $("#PrincipalOutstanding").val(Logg[0].cr6fc_principaloutstanding);
               $('#PrincipalOutstanding').text(Math.ceil(Logg[0].cr6fc_principaloutstanding));
               var Word = convertNumberToWords(Math.ceil(Logg[0].cr6fc_principaloutstanding));
               //  console.log(Word);
               $('#PrincipalOutstandinginwords').text("Rupees " + " " + Word + " " + "Only");

               if (Logg[0].cr6fc_dateoffirstdisbursement != null && Logg[0].cr6fc_dateoffirstdisbursement != undefined && Logg[0].cr6fc_dateoffirstdisbursement != '') {
                  var date = new Date(Logg[0].cr6fc_dateoffirstdisbursement);
                  var spDate4 = date.toISOString().slice(0, 10);
                  document.getElementById("Date").value = spDate4;
               }
               if (Logg[0].cr6fc_enddateofinterestmoratium != null && Logg[0].cr6fc_enddateofinterestmoratium != undefined && Logg[0].cr6fc_enddateofinterestmoratium != '') {
                  var EDI = new Date(Logg[0].cr6fc_enddateofinterestmoratium);
                  var spDate5 = EDI.toISOString().slice(0, 10);
                  document.getElementById("EndDateinterest").value = spDate5;
               }
               if (Logg[0].cr6fc_enddateofprinciplemoratium != null && Logg[0].cr6fc_enddateofprinciplemoratium != undefined && Logg[0].cr6fc_enddateofprinciplemoratium != '') {
                  var EDP = new Date(Logg[0].cr6fc_enddateofprinciplemoratium);
                  var spDate6 = EDP.toISOString().slice(0, 10);
                  document.getElementById("EndDateprincipal").value = spDate6;
               }
               if (Logg[0].cr6fc_dateoflastinstalment != null && Logg[0].cr6fc_dateoflastinstalment != undefined && Logg[0].cr6fc_dateoflastinstalment != '') {
                  var DLI = new Date(Logg[0].cr6fc_dateoflastinstalment);
                  var spDate8 = DLI.toISOString().slice(0, 10);
                  document.getElementById("DatelastInstalment").value = spDate8;
               }
               $("#Loanfullydisbursed").val(Logg[0]['cr6fc_loanfullydisbured@OData.Community.Display.V1.FormattedValue']);
               $("#LoanClosed").val(Logg[0]["cr6fc_loanclosed@OData.Community.Display.V1.FormattedValue"]);
               if (Logg[0]["cr6fc_loanclosed@OData.Community.Display.V1.FormattedValue"] == "Yes") {
                  $('#10').show();
               }
               else {
                  $("#10").hide();
               }
               if (Logg[0].cr6fc_dateofclosureofloan != null && Logg[0].cr6fc_dateofclosureofloan != undefined && Logg[0].cr6fc_dateofclosureofloan != '') {
                  var DCL = new Date(Logg[0].cr6fc_dateofclosureofloan);
                  var spDate10 = DCL.toISOString().slice(0, 10);
                  document.getElementById("DateclosureLoan").value = spDate10;
               }


            }
            if (Logg[0]["cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue"] == "WC/CC Limit") {

               $("#2").show();
               $("#1").hide();

               $("#PeakOutstanding2").val(Logg[0].cr6fc_peakoutstanding);
               if (Logg[0].cr6fc_dateoffirstwithdrawal != null && Logg[0].cr6fc_dateoffirstwithdrawal != undefined && Logg[0].cr6fc_dateoffirstwithdrawal != '') {
                  var DFWL2 = new Date(Logg[0].cr6fc_dateoffirstwithdrawal);
                  var spDate3 = DFWL2.toISOString().slice(0, 10);
                  document.getElementById("DatefirstWithdrawl").value = spDate3;
               }

               if (Logg[0].cr6fc_dateofclosureoflimit != null && Logg[0].cr6fc_dateofclosureoflimit != undefined && Logg[0].cr6fc_dateofclosureoflimit != '') {
                  var DCL2 = new Date(Logg[0].cr6fc_dateofclosureoflimit);
                  var spDate4 = DCL2.toISOString().slice(0, 10);
                  document.getElementById("DateClosureLimit2").value = spDate4;
               }
               $("#Limitoperational").val(Logg[0]['cr6fc_limitoperational@OData.Community.Display.V1.FormattedValue']);
               if (Logg[0]['cr6fc_limitoperational@OData.Community.Display.V1.FormattedValue'] == "Yes") {
                  $("#22").show();
               }
               $("#UtilisationLimit").val(Logg[0]['cr6fc_utilisationunderlimit@OData.Community.Display.V1.FormattedValue']);
               if (Logg[0]['cr6fc_utilisationunderlimit@OData.Community.Display.V1.FormattedValue'] == "Yes") {
                  $("#202").show();
               }
               $("#EndLimitClosed2").val(Logg[0]['cr6fc_limitclosed@OData.Community.Display.V1.FormattedValue']);
               if (Logg[0]['cr6fc_limitclosed@OData.Community.Display.V1.FormattedValue'] == "Yes") {
                  $("#201").show();
               }

               if (Logg[0].cr6fc_dateoflimitvalidity != null && Logg[0].cr6fc_dateoflimitvalidity != undefined && Logg[0].cr6fc_dateoflimitvalidity != '') {
                  var DLV2 = new Date(Logg[0].cr6fc_dateoflimitvalidity);
                  var spDate6 = DLV2.toISOString().slice(0, 10);
                  document.getElementById("DateLimitValidity").value = spDate6;
               }

            }

            if (Logg[0].cr6fc_elicheckerremark != null && Logg[0].cr6fc_elicheckerremark != undefined && Logg[0].cr6fc_elicheckerremark != '') {
               $('#divCheckerHide').show();
               document.getElementById("divELICheckerRemark").innerHTML = Logg[0].cr6fc_elicheckerremark;
            }
            if (Logg[0].cr6fc_elimakerremark != null && Logg[0].cr6fc_elimakerremark != undefined && Logg[0].cr6fc_elimakerremark != '') {
               $('#divMaker').show();
               document.getElementById("txtmakerComment").innerHTML = Logg[0].cr6fc_elimakerremark;
            }
            if (Logg[0].cr6fc_guaranteestartdate != null && Logg[0].cr6fc_guaranteestartdate != undefined && Logg[0].cr6fc_guaranteestartdate != '') {
               var DLV2 = new Date(Logg[0].cr6fc_guaranteestartdate);
               var spDate7 = DLV2.toISOString().slice(0, 10);
               document.getElementById("hdnGurenteeStartDt").value = spDate7;
            }
               // $('#hdnGurenteeStartDt').val(Logg[0].cr6fc_guaranteestartdate);
               if (Logg[0].cr6fc_guaranteeenddate != null && Logg[0].cr6fc_guaranteeenddate != undefined && Logg[0].cr6fc_guaranteeenddate != '') {
                  var DLV2 = new Date(Logg[0].cr6fc_guaranteeenddate);
                  var spDate8 = DLV2.toISOString().slice(0, 10);
                  document.getElementById("hdnGurenteeEndDt").value = spDate8;
               }
                  // document.getElementById("hdnCGStatus").innerHTML = Logg[0].cr6fc_cgstatus;
                  $("#hdnCGStatus").val( Logg[0].cr6fc_cgstatus);
                  document.getElementById("hdnTotalFPOPlainMember").value = Logg[0].cr6fc_totalfpomember;
               
               // if (Logg[0].cr6fc_totalmembernorthen != null && Logg[0].cr6fc_totalmembernorthen != undefined && Logg[0].cr6fc_totalmembernorthen != '') {
               //    document.getElementById("hdnTotalFPONorthenMember").value = Logg[0].cr6fc_totalmembernorthen;
               // }
               $('#hdnTotalFPONorthenMember').val(Logg[0].cr6fc_totalmembernorthen);
               $('#hdnCGFeeCGApplicationDt').val(Logg[0].cr6fc_cgfeedate);
               if (Logg[0].cr6fc_cgfeedate != null && Logg[0].cr6fc_cgfeedate != undefined && Logg[0].cr6fc_cgfeedate != '') {
                  var DLV2 = new Date(Logg[0].cr6fc_cgfeedate);
                  var spDate9 = DLV2.toISOString().slice(0, 10);
                  document.getElementById("hdnCGFeeCGApplicationDt").value = spDate9;
               }
               $('#hdnValidityEndDate').val(Logg[0].cr6fc_validityenddate);
               if (Logg[0].cr6fc_guaranteestartdate != null && Logg[0].cr6fc_guaranteestartdate != undefined && Logg[0].cr6fc_guaranteestartdate != '') {
                  var DLV2 = new Date(Logg[0].cr6fc_guaranteestartdate);
                  var spDate10 = DLV2.toISOString().slice(0, 10);
                  document.getElementById("hdnValidityEndDate").value = spDate10;
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
   var requestUri = location.origin + "/_api/cr6fc_taxinvoiceses?$select=cr6fc_cgid,cr6fc_cgpan&$filter=cr6fc_cgid eq '" + vItemID + "'";
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
         if (CGPAN.length > 0) {
            $('#CGPAN').val(CGPAN[0].cr6fc_cgpan);
         }
      },
      error: function () {
         console.log("error");
      }
   });
}
var renewalcgappentityid;
function Submit(status) {
   var SubStatus = '';
   if (status == "Draft") {
      SubStatus = "Saved";
   }
   else if (status == "Submitted") {
      SubStatus = "Pending for Approval";
   }
   var SanctionDate = $("#SanctionDate").val();
   var txtNameOfFPO = $("#txtNameOfFPO").val();
   var CGPAN = $("#CGPAN").val();
   var CGApplicationno = $("#hdnCGApplicationno").val();
   var PANFPO = $("#PANFPO").val();
   var CustomerID = $("#CustomerID").val();
   var RegionOfFPO = $("#RegionOfFPO").val();
   var FarmerMemberSize = $("#FarmerMemberSize").val();
   var TypeofFacility = $("#TypeofFacility").val();
   var txtELIMakerRemark = $("#txtmakerComment").val();
   var txtmakerComment
   if (txtELIMakerRemark != '' && txtELIMakerRemark != undefined && txtELIMakerRemark != '') {
      txtmakerComment = "<b>Comment</b> :- " + txtELIMakerRemark + " - " + workflowDt + ": " + "\n\n"
   }
   // var Parentid = ;
   var Title = $("#hdnTitle").val();
   var leadinginstitute = $('#hdnlendingInstitute').val();
   //var ELICheckerEmail = $('#ELICheckerEmail').val();
   var AccountNo = $("#AccountNo").val();
   var SanctionedAmount = $("#SanctionedAmount").val();
   var DateofNPA = $("#DateofNPA").val();
   var IRACclassification = $("#IRACclassification").val();
   var ModifiedSanctionedAmount = $("#ModifiedSanctionedAmount").val();
   /* var World=convertNumberToWords(Math.ceil(ModifiedSanctionedAmount));
    $('#ModifiedSanctionedAmountiinwords').text("Rupees " + " " + World+ " " + "Only" );*/
   var DateofRenewal = new window.Date();
   var hdnGurenteeStartDt = $('#hdnGurenteeStartDt').val();
   var hdnGurenteeEndDt = $('#hdnGurenteeEndDt').val();
   var hdnCGStatus = $('#hdnCGStatus').val();
   var hdnTotalFPOPlainMember = $('#hdnTotalFPOPlainMember').val();
   var hdnTotalFPONorthenMember = $('#hdnTotalFPONorthenMember').val();
   var hdnCGFeeCGApplicationDt = $('#hdnCGFeeCGApplicationDt').val();
   var hdnCGFeeRenewalCGApplicationDt = $('#hdnCGFeeRenewalCGApplicationDt').val();
   var ValidityEndDate = $("#hdnValidityEndDate").val();
   var CGFeeEndDate = null;
   if (hdnCGFeeRenewalCGApplicationDt != '' && hdnCGFeeRenewalCGApplicationDt != null && hdnCGFeeRenewalCGApplicationDt != undefined) {
      CGFeeEndDate = hdnCGFeeRenewalCGApplicationDt;
   }
   if (ValidityEndDate == "" || ValidityEndDate == null || ValidityEndDate == undefined) {
      ValidityEndDate = null;
   }

   if (hdnCGFeeCGApplicationDt != null && hdnCGFeeCGApplicationDt != '' && hdnCGFeeCGApplicationDt != undefined) {
      CGFeeEndDate = hdnCGFeeCGApplicationDt;
   }
   if (TypeofFacility == "Term Loan OR Working Capital Term Loan(WCTL)" || TypeofFacility == "Term Loan OR WCTL (Working Capital Term Loan)") {
      if (parseInt(ModifiedSanctionedAmount) > parseInt(SanctionedAmount)) {
         alert("Modified sanctioned amount should be lesser or equal to the sanction amount")
         return false;
      }
   }

   if (TypeofFacility == "Term Loan OR Working Capital Term Loan(WCTL)" || TypeofFacility == "Term Loan OR WCTL (Working Capital Term Loan)") {

      var Date = $("#Date").val();
      var PrincipalOutstanding = $("#PrincipalOutstanding").val();
      var EndDateinterest = $("#EndDateinterest").val();
      var EndDateprincipal = $("#EndDateprincipal").val();
      var DatelastInstalment = $("#DatelastInstalment").val();
      var Loanfullydisbursed = $("#LoanClosed").val();
      var DateclosureLoan = $("#DateclosureLoan").val();
      var LoanClosed = $('#LoanClosed').val();
      var DisbursmentLoan = $("#DisbursmentLoan").val();
      var DateModifiedSanction = $("#DateModifiedSanction").val();

      if (SanctionedAmount !== ModifiedSanctionedAmount) {
         if ((DateModifiedSanction == "" || DateModifiedSanction == null || DateModifiedSanction == undefined) && status == 'Submitted') {
            alert('Enter the Modified Sanction Date')
            return false;
         }
      }
      else if (DateModifiedSanction == "" || DateModifiedSanction == null || DateModifiedSanction == undefined) {
         DateModifiedSanction = null;
      }
      if (DateModifiedSanction != SanctionDate) {
         if (DateModifiedSanction != null) {

            if (new window.Date(DateModifiedSanction) <= new window.Date(SanctionDate)) {
               alert(' Modified Sanctioned Date should be greater than sanctioned Date')
               return false;
            }
         }
      }
      else {
         DateModifiedSanction = null;
      }


      if ((DisbursmentLoan == "" || DisbursmentLoan == null || DisbursmentLoan == undefined) && status == 'Submitted') {
         alert('Please select Any Disbursement under loan')
         return false;
      }

      if (DisbursmentLoan == "No" || DisbursmentLoan == "Select") {
         if (EndDateinterest == "" || EndDateinterest == null || EndDateinterest == undefined) {
            EndDateinterest = null;
         }
         if (EndDateprincipal == "" || EndDateprincipal == null || EndDateprincipal == undefined) {
            EndDateprincipal = null;
         }
         if (DatelastInstalment == "" || DatelastInstalment == null || DatelastInstalment == undefined) {
            DatelastInstalment = null;
         }
         if (Date == "" || Date == null || Date == undefined) {
            Date = null;
         }
         if (Loanfullydisbursed == "" || Loanfullydisbursed == null || Loanfullydisbursed == undefined) {
            Loanfullydisbursed = null;
         }

      }

      if (DisbursmentLoan == "Yes") {
         if ((Date == "" || Date == null || Date == undefined) && status == 'Submitted') {
            alert('Please select Date Of first disbursement')
            return false;

         }
         else {
            if (Date == "" || Date == null || Date == undefined) {
               Date = null;
            }
         }
         if (new window.Date(Date) < new window.Date(SanctionDate) && status == 'Submitted') {
            alert('Date of first disbursement should be greater than Date of Sanction')
            return false;
         }

      }


      if ((new window.Date(Date) >= new window.Date(DateofRenewal)) && status == 'Submitted') {
         alert("Date of first disbursement should be less than Current Date")
         return false;
      }

      if ((PrincipalOutstanding == '' || PrincipalOutstanding == null || PrincipalOutstanding == undefined) && status == 'Submitted') {
         alert('Please enter Principal Outstanding(Rs)')
         return false;

      }

      // if (PrincipalOutstanding == "0" && status == 'Submitted') {
      //    alert('Principal Outstanding should be greater than zero')
      //    return false;

      // }

      if ((parseInt(PrincipalOutstanding) > parseInt(ModifiedSanctionedAmount)) && status == 'Submitted') {
         alert('Principal Outstanding should be less than or equal to Modified sanctioned amount')
         return false;
      }

      if (DisbursmentLoan == "Yes" && status == 'Submitted') {

         if ((EndDateinterest == "" || EndDateinterest == null || EndDateinterest == undefined) && status == 'Submitted') {
            alert('Please select End Date of interest moratorium')
            return false;

         }
         if ((EndDateinterest < SanctionDate) && status == 'Submitted') {
            alert('End Date of Interest Moratorium should be greater than sanctioned date.');
            return false;
         }

         if ((EndDateprincipal == "" || EndDateprincipal == null || EndDateprincipal == undefined) && status == 'Submitted') {
            alert('Please select End Date of principal moratorium')
            return false;

         }

         if ((EndDateprincipal < SanctionDate) && status == 'Submitted') {
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
      else {
         if ((EndDateinterest == "" || EndDateinterest == null || EndDateinterest == undefined)) {
            EndDateinterest = null;
         }
         if (EndDateprincipal == "" || EndDateprincipal == null || EndDateprincipal == undefined) {
            EndDateprincipal = null;
         }
         if (DatelastInstalment == "" || DatelastInstalment == null || DatelastInstalment == undefined) {
            DatelastInstalment = null;
         }
         if (Loanfullydisbursed == "Yes" && status == 'Submitted') {
            if (DateclosureLoan == '' || DateclosureLoan == null || DateclosureLoan == undefined) {
               alert('Please select Date of Closure of Loan')
               return false;

            }



            else {
               if (DateclosureLoan == '' || DateclosureLoan == null || DateclosureLoan == undefined) {
                  DateclosureLoan = null;
               }
            }

            if (Loanfullydisbursed == "No" || Loanfullydisbursed == null) {

               DateclosureLoan = null;

            }


         }
         else {
            if (DateclosureLoan == '' || DateclosureLoan == null || DateclosureLoan == undefined) {
               DateclosureLoan = null;
            }
         }
      }



      if ((LoanClosed == '' || LoanClosed == null || LoanClosed == undefined) && status == 'Submitted') {
         alert('Please select Loan Closed ?')
         return false;

      }
      else {
         if (LoanClosed == "Yes") {
            if ((DateclosureLoan == '' || DateclosureLoan == null || DateclosureLoan == undefined) && status == 'Submitted') {
               alert('Please select Date of Closure of Loan')
               return false;

            }

         }

         if (LoanClosed == "No" || LoanClosed == "Select") {
            if (DateclosureLoan == '' || DateclosureLoan == null || DateclosureLoan == undefined) {
               DateclosureLoan = null;
            }
         }
      }

      if (DisbursmentLoan == "Yes" && status == 'Submitted') {

         if (new window.Date(EndDateinterest) < new window.Date(Date)) {
            alert('End Date of Interest Moratorium should be greater than the Date of First Disbursement')
            return false;
         }
         if (new window.Date(EndDateprincipal) <= new window.Date(Date)) {
            alert('End Date of Principal Moratorium should be greater than Date of First Disbursement')
            return false;
         }
         if (new window.Date(DatelastInstalment) < new window.Date(EndDateprincipal)) {
            alert('Date of Last Instalment should be greater than or equal to End Date of principal Moratorium')
            return false;
         }
         /*if (new window.Date(DatelastInstalment) == new window.Date(EndDateprincipal)) {
            alert('Date of Last Instalment should be greater than the End Date of principal Moratorium')
            return false;
         }*/

         if (DateclosureLoan != null || DateclosureLoan == "") {
            if (new window.Date(DateclosureLoan) < new window.Date(SanctionDate)) {
               alert('Date of closure of loan should be greater than Date of Sanction')
               return false;
            }
         }
      }
      if ((IRACclassification == '' || IRACclassification == null || IRACclassification == undefined || IRACclassification == "-IRAC classification--") && status == 'Submitted') {
         alert('Please select IRAC Classification')
         return false;

      }
      var IRACStatus = "";

      if (IRACclassification == "Substandard" || IRACclassification == "Doubtful" || IRACclassification == "Loss") {
         IRACStatus = "NPA";
         if ((DateofNPA == "" || DateofNPA == null || DateofNPA == undefined) && status == 'Submitted') {
            alert('Please select Date of NPA')
            return false;
         }
         else {

            if (DateofNPA == '' || DateofNPA == null || DateofNPA == undefined) {
               DateofNPA = null;
            }
         }

      }
      else {
         IRACStatus = "Non NPA";
         if (DateofNPA == '' || DateofNPA == null || DateofNPA == undefined) {
            DateofNPA = null;
         }
      }
      if (DisbursmentLoan == "Yes") {
         DisbursmentLoan = "0";
      }
      else if(DisbursmentLoan == "No"){
         DisbursmentLoan = "1";
      }
      else if(DisbursmentLoan == "Select"){
         DisbursmentLoan = "2";
      }
      // if (Loanfullydisbursed == "Yes") {
      //    Loanfullydisbursed = "0";
      // }
      // else {
      //    Loanfullydisbursed = "1";
      // }

      // if (LoanClosed == "Yes") {
      //    LoanClosed = "0";
      // }
      // else {
      //    LoanClosed = "1";
      // }
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
      //
      var TypeofFacilityNew;
      if (TypeofFacility == "Term Loan OR Working Capital Term Loan(WCTL)" || TypeofFacility == "Term Loan OR WCTL (Working Capital Term Loan)") {
         TypeofFacilityNew = "1";
      }
      else if (TypeofFacility == "WC/CC Limit") {
         TypeofFacilityNew = "2";
      }

      if (IRACclassification == "Standard - 0 Days Past Due (DPD)") {
         IRACclassification = "0";
      }
      else if (IRACclassification == "SMA- 0") {
         IRACclassification = "1";
      }
      else if (IRACclassification == "SMA- 1") {
         IRACclassification = "2";
      }
      else if (IRACclassification == "SMA- 2") {
         IRACclassification = "3";
      }
      else if (IRACclassification == "Substandard") {
         IRACclassification = "4";
      }
      else if (IRACclassification == "Doubtful") {
         IRACclassification = "5";
      }
      else if (IRACclassification == "Loss") {
         IRACclassification = "6";
      }
      else if(IRACclassification == 'Select'){
         IRACclassification = "7";
      }
      if (SubStatus == "Saved") {
         SubStatus = "1";
      }
      else if (SubStatus == "Pending for Approval") {
         SubStatus = "2";
      }

      if (txtmakerComment == null && txtmakerComment == undefined && txtmakerComment == "") {
         txtmakerComment = null;
      }

      /*if (EILchecker == null && EILchecker == undefined && EILchecker == "")
      {
       EILchecker = null;
      }*/

      var FPORegion = "/cr6fc_regionmasters(" + RegionOfFPO + ")";

      //vTitle = GetCounter();

      var data1 = JSON.stringify({

         "cr6fc_nameoffpo": txtNameOfFPO,
         //"cr6fc_name": vTitle,
         "cr6fc_cgpan": CGPAN,
         "cr6fc_panfpo": PANFPO,
         "cr6fc_customerid": CustomerID,
         "cr6fc_typeoffacility": TypeofFacilityNew,
         "cr6fc_accountno": AccountNo,
         "cr6fc_sanctionedamount": SanctionedAmount,
         "cr6fc_modifiedsanctionedloanamount": ModifiedSanctionedAmount,
         "cr6fc_farmermembersize": FarmerMemberSize,
         "cr6fc_totalfpomember": hdnTotalFPOPlainMember,
         "cr6fc_totalmembernorthen": hdnTotalFPONorthenMember,
         "cr6fc_iracclassificationoftheaccount": IRACclassification,
         "cr6fc_dateofnpa": DateofNPA,
         "cr6fc_elimakeremailid": loggedInUserEmail,
         "cr6fc_elimakerremark": txtmakerComment,
         // "cr6fc_parentid": vItemID,
         "cr6fc_nameoflendinginstitution": leadinginstitute,
         //"cr6fc_ELIChecker_contact@odata.bind": "/contacts(" + EILchecker + ")",   
         "cr6fc_cgapplicationno": CGApplicationno,
         "cr6fc_RegionOfFPO@odata.bind": FPORegion,
         //"cr6fc_guaranteeenddate":hdnGurenteeEndDt, 
         "cr6fc_guaranteestartdate": hdnGurenteeStartDt,
         "cr6fc_status": SubStatus,
         "cr6fc_cgstatus": hdnCGStatus,
         "cr6fc_iracstatus": IRACStatus,
         "cr6fc_cgfeedate": CGFeeEndDate,
         "cr6fc_validityenddate": new window.Date(ValidityEndDate),
         "cr6fc_dateofsanction": SanctionDate,

         "cr6fc_disbursmentunderloan": DisbursmentLoan,
         "cr6fc_dateoffirstdisbursement": Date,
         "cr6fc_principaloutstanding": PrincipalOutstanding,
         "cr6fc_enddateofinterestmoratium": EndDateinterest,
         "cr6fc_enddateofprinciplemoratium": EndDateprincipal,
         "cr6fc_dateoflastinstalment": DatelastInstalment,
         "cr6fc_loanfullydisbured": Loanfullydisbursed,
         "cr6fc_loanclosed": LoanClosed,
         "cr6fc_dateofclosureofloan": DateclosureLoan,
         "cr6fc_dateofmodifiedsanction": DateModifiedSanction

      });
   }
   //}

   if (TypeofFacility == "WC/CC Limit") {
      var PeakOutstanding2 = $("#PeakOutstanding2").val();
      var DatefirstWithdrawl = $("#DatefirstWithdrawl").val();
      var DateClosureLimit2 = $("#DateClosureLimit2").val();
      var EndLimitClosed2 = $("#EndLimitClosed2").val();
      var Limitoperational = $("#Limitoperational").val();
      var UtilisationLimit = $("#UtilisationLimit").val();
      var DateModifiedSanction = $("#DateModifiedSanction").val();
      var DateLimitValidity = $("#DateLimitValidity").val();
      var SanctionDate = $("#SanctionDate").val();

      if (SanctionedAmount !== ModifiedSanctionedAmount) {

         if ((DateModifiedSanction == "" || DateModifiedSanction == null || DateModifiedSanction == undefined) && status == 'Submitted') {
            alert('Enter the Modified Sanction Date')
            return false;
         }
      }
      else if (DateModifiedSanction == "" || DateModifiedSanction == null || DateModifiedSanction == undefined) {
         DateModifiedSanction = null;
      }
      if (DateModifiedSanction != SanctionDate) {
         if (DateModifiedSanction != null) {

            if (new window.Date(DateModifiedSanction) <= new window.Date(SanctionDate)) {
               alert(' Modified Sanctioned Date should be greater than sanctioned Date')
               return false;
            }
         }
      }
      else {
         DateModifiedSanction = null;
      }

      if ((UtilisationLimit == '' || UtilisationLimit == null || UtilisationLimit == undefined) && status == "Submitted") {
         alert('Please select Any Utilisation under the Limit ? ')
         return false;
      }
      if (UtilisationLimit == "Yes") {
         if ((DatefirstWithdrawl == "" || DatefirstWithdrawl == null || DatefirstWithdrawl == undefined) && status == 'Submitted') {
            alert('Enter Date of First Withdrawl')
            return false;
         }
         else if (DatefirstWithdrawl == "" || DatefirstWithdrawl == null || DatefirstWithdrawl == undefined) { DatefirstWithdrawl = null }
         if (DatefirstWithdrawl != null) {
            if (new window.Date(DatefirstWithdrawl) < new window.Date(SanctionDate)) {
               alert('Date of first withdrawal Should be greater or same as the Date of Sanction')
               return false;
            }
         }

      }
      if (UtilisationLimit == "No") {
         DatefirstWithdrawl = null;
      }

      if ((new window.Date(DateofNPA) < new window.Date(DatefirstWithdrawl)) && status == 'Submitted') {
         alert('Date of NPA Should be greater than Date of First Withdrawal')
         return false;
      }
     

      if ((Limitoperational == '' || Limitoperational == null || Limitoperational == undefined) && status == 'Submitted') {
         alert('Please select Was the Limit operational for full previous Financial Year ? ')
         return false;
      }

      if (Limitoperational == "Yes") {
         if ((PeakOutstanding2 == "" || PeakOutstanding2 == null || PeakOutstanding2 == undefined) && status == 'Submitted') {
            alert('Enter Peak Outstanding')
            return false;
         }
      }
      if (Limitoperational == "No") {
         PeakOutstanding2 = null;
      }

      if ((DateLimitValidity == "" || DateLimitValidity == null || DateLimitValidity == undefined) && status == 'Submitted') {
         alert('Please Enter End Date of Limit Validity')
         return false;
      }
      else if (DateLimitValidity == "" || DateLimitValidity == null || DateLimitValidity == undefined) {
         DateLimitValidity = null
      }
      if ((EndLimitClosed2 == "" || EndLimitClosed2 == null || EndLimitClosed2 == undefined) && status == 'Submitted') {
         alert('Please select Limit Closed?')
         return false;
      }
      if (EndLimitClosed2 == "Yes") {
         if ((DateClosureLimit2 == '' || DateClosureLimit2 == null || DateClosureLimit2 == undefined) && status == 'Submitted') {
            alert('Please select Date of Closure of Limit ?')
            return false;

         }
         else if (DateClosureLimit2 == '' || DateClosureLimit2 == null || DateClosureLimit2 == undefined) {
            DateClosureLimit2 = null
         }
      }
      if (EndLimitClosed2 == "No") {
         DateClosureLimit2 = null;
      }

      if (EndLimitClosed2 == "Yes") {
         if ((new window.Date(DateClosureLimit2) < new window.Date(SanctionDate)) && status == 'Submitted') {
            alert("Date of Closure of Limit should be greater than the Date of Sanction")
            return false;
         }
      }

      if ((IRACclassification == '' || IRACclassification == null || IRACclassification == undefined || IRACclassification == "Select") && status == 'Submitted') {
         alert('Please select IRAC Classification')
         return false;
      }
      var IRACStatus = '';
      if (IRACclassification == "Substandard" || IRACclassification == "Doubtful" || IRACclassification == "Loss") {
         IRACStatus = "NPA";
         if ((DateofNPA == "" || DateofNPA == null || DateofNPA == undefined) && status == "Submitted") {
            alert('Please select Date of NPA')
            return false;
         }
         else if (DateofNPA == "" || DateofNPA == null || DateofNPA == undefined) {
            DateofNPA = null;
         }
      }
      else {
         IRACStatus = "Non NPA";
         DateofNPA = null;
      }

      var EILchecker;
      if (UtilisationLimit == "Yes") {
         UtilisationLimit = "0";
      }
      else if (UtilisationLimit == "No") {
         UtilisationLimit = "1";
      }

      if (EndLimitClosed2 == "Yes") {
         EndLimitClosed2 = "0";
      }
      else if (EndLimitClosed2 == "No") {
         EndLimitClosed2 = "1";
      }

      if (Limitoperational == "Yes") {
         Limitoperational = "0";
      }
      else if (Limitoperational == "No") {
         Limitoperational = "1";
      }


      //
      if (TypeofFacility == "Term Loan OR Working Capital Term Loan(WCTL)" || TypeofFacility == "Term Loan OR WCTL (Working Capital Term Loan)") {
         TypeofFacility = "1";
      }
      else if (TypeofFacility == "WC/CC Limit") {
         TypeofFacility = "2";
      }

      if (IRACclassification == "Standard - 0 Days Past Due (DPD)") {
         IRACclassification = "0";
      }
      else if (IRACclassification == "SMA- 0") {
         IRACclassification = "1";
      }
      else if (IRACclassification == "SMA- 1") {
         IRACclassification = "2";
      }
      else if (IRACclassification == "SMA- 2") {
         IRACclassification = "3";
      }
      else if (IRACclassification == "Substandard") {
         IRACclassification = "4";
      }
      else if (IRACclassification == "Doubtful") {
         IRACclassification = "5";
      }
      else if (IRACclassification == "Loss") {
         IRACclassification = "6";
      }

      if (SubStatus == "Saved") {
         SubStatus = "1";
      }
      else if (SubStatus == "Pending for Approval") {
         SubStatus = "2";
      }

      if (DatefirstWithdrawl == null && DatefirstWithdrawl == undefined && DatefirstWithdrawl == "") {
         DatefirstWithdrawl = null;
      }
      if (PeakOutstanding2 == null && PeakOutstanding2 == undefined && PeakOutstanding2 == "") {
         PeakOutstanding2 = null;
      }
      if (EndLimitClosed2 == null && EndLimitClosed2 == undefined && EndLimitClosed2 == "") {
         EndLimitClosed2 = null;
      }
      if (UtilisationLimit == null && UtilisationLimit == undefined && UtilisationLimit == "") {
         UtilisationLimit = null;
      }
      if (Limitoperational == null && Limitoperational == undefined && Limitoperational == "") {
         Limitoperational = null;
      }
      if (DateModifiedSanction == null && DateModifiedSanction == undefined && DateModifiedSanction == "") {
         DateModifiedSanction = null;
      }
      if (DateLimitValidity == null && DateLimitValidity == undefined && DateLimitValidity == "") {
         DateLimitValidity = null;
      }

      var FPORegion = "/cr6fc_regionmasters(" + RegionOfFPO + ")";

      //vTitle = GetCounter();


      var data1 = JSON.stringify({

         "cr6fc_nameoffpo": txtNameOfFPO,
         //"cr6fc_name": vTitle,
         "cr6fc_cgpan": CGPAN,
         "cr6fc_panfpo": PANFPO,
         "cr6fc_customerid": CustomerID,
         "cr6fc_RegionOfFPO@odata.bind": FPORegion,
         "cr6fc_typeoffacility": TypeofFacility,
         "cr6fc_accountno": AccountNo,
         "cr6fc_sanctionedamount": SanctionedAmount,
         "cr6fc_modifiedsanctionedloanamount": ModifiedSanctionedAmount,
         "cr6fc_farmermembersize": FarmerMemberSize,
         "cr6fc_totalfpomember": hdnTotalFPOPlainMember,
         "cr6fc_totalmembernorthen": hdnTotalFPONorthenMember,
         "cr6fc_iracclassificationoftheaccount": IRACclassification,
         "cr6fc_dateofnpa": DateofNPA,
         "cr6fc_elimakeremailid": loggedInUserEmail,
         "cr6fc_elimakerremark": txtmakerComment,
         // "cr6fc_parentid": vItemID,
         "cr6fc_nameoflendinginstitution": leadinginstitute,
         "cr6fc_cgapplicationno": CGApplicationno,
         "cr6fc_guaranteestartdate": hdnGurenteeStartDt,
         "cr6fc_iracstatus": IRACStatus,
         "cr6fc_cgfeedate": CGFeeEndDate,
         "cr6fc_status": SubStatus,
         "cr6fc_cgstatus": hdnCGStatus,
         "cr6fc_validityenddate": new window.Date(ValidityEndDate),
         "cr6fc_dateofsanction": SanctionDate,
         //
         "cr6fc_dateoffirstwithdrawal": DatefirstWithdrawl,
         "cr6fc_peakoutstanding": PeakOutstanding2,
         "cr6fc_dateofclosureoflimit": DateClosureLimit2,
         "cr6fc_limitclosed": EndLimitClosed2,
         "cr6fc_utilisationunderlimit": UtilisationLimit,
         "cr6fc_limitoperational": Limitoperational,
         "cr6fc_dateofmodifiedsanction": DateModifiedSanction,
         "cr6fc_dateoflimitvalidity": DateLimitValidity,
      });
   }


   shell.getTokenDeferred().done(function (token) {

      console.log(token)

      $.ajax({
         url: "/_api/cr6fc_renewalcgapplications(" + vItemID + ")",
         type: "PATCH",
         headers: {
            __RequestVerificationToken: token,
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-Http-Method": "PATCH"
         },
         async: false,
         data: data1,
         success: function (data, textStatus, xhr) {
            renewalcgappentityid = xhr.getResponseHeader('entityid');
            fileInput = $('#ELIChekerAttach');
            otherfileArray = [];
            //var AttchLength=fileInput[0].files.length
            $("#attachFilesHolder input:file").each(function () {
               if ($(this)[0].files[0]) {
                  otherfileArray.push({ "Attachment": $(this)[0].files[0] });
               }
            });
            AttchLength = otherfileArray.length;
            if (AttchLength != 0) {
               updatecgappfile(vItemID);
            }
            else {
               alert('Data updated successfully.')
               window.location.href = location.origin + "/RefreshingCache/?id="+renewalcgappentityid+","+CGFileentityID+"&tbl=cr6fc_renewalcgapplications,cr6fc_renewalappfiles&col=cr6fc_cacherefreshedon&red=ELIMakerDBRenewal";
            }
         },

         error: function (error) {
            console.log(error);
            alert('Some error occured while adding data in CGApplications list. Please try again later.');
            console.log(error);

         }


      })
   })
}


//Attachment

function getfileELIMaker(vItemID) {
   var queryrequest = location.origin+"/_api/cr6fc_renewalappfiles?$select=cr6fc_renewalappfileid,cr6fc_attachment&$filter=cr6fc_cgid eq '" + vItemID + "' and cr6fc_name eq 'EliMakerRenewal'";
   $.ajax({
      
      // url: "/_api/cr6fc_cgapplicationses("+vItemID+")/cr6fc_nscheckercgappfile",
      url: queryrequest,
      contentType: "application/json",
      async: false,
      success: function (res) {
         console.log(res);
         var Logg = res.value;
         var vhtml1 = '';
         if (Logg.length > 0) {
            $("#NSApproverAttach").show();
            for (var i = 0; i < Logg.length; i++) {
               var cgappfilename12 = Logg[i].cr6fc_nscheckerfile_name
               vhtml1 += "<a href='/_api/cr6fc_renewalappfiles(" + Logg[i].cr6fc_renewalappfileid + ")/cr6fc_attachment/$value'>" + Logg[i].cr6fc_attachment_name + "</a></br>";

            }
            $('#additionalDocsNSChecker').append(vhtml1);
         }

      },
      error: function (xhr, status, error) {
         var errorMessage = xhr.status + ': ' + xhr.statusText;
         console.log(errorMessage);
      }
   });
}

var CGFileentityID;
function updatecgappfile(vItemID) {
   var data = JSON.stringify(
      {
         "cr6fc_cgid": vItemID,
         "cr6fc_name": "EliMakerRenewal",
         "cr6fc_type": "CGRenewal",
      });
   //document.getElementById("txtApplicantID").value,
   shell.getTokenDeferred().done(function (token) {
      console.log(token)
      var header = {
         __RequestVerificationToken: token,
         contentType: "application/json;odata=verbose"
      }
      $.ajax({
         // url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CGApplications')/items",
         url: "/_api/cr6fc_renewalappfiles",
         type: "POST",
         headers: header,
         async: false,
         data: data,
         success: function (data, textStatus, xhr) {
            CGFileentityID = xhr.getResponseHeader("entityid");
            getFileContentsAndMetadata(vItemID, token, CGFileentityID)
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


function getFileContentsAndMetadata(entityID, token, CGFileID) {
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
      reader.onload = function (e) {
         // The browser has finished reading the file, we can now do something with it...
         var fileContent = e.target.result;
         // Run the function to upload to the Portal Web API, passing the GUID of the newly created record and the file's contents and name as inputs
         uploadFile(fileContent, fileName, CGFileID, token, file.type, file);
      };
   }
}

// Upload the file to
function uploadFile(fileContent, fileName, CGFileID, token, Filecontenttype) {
   var header = {
      __RequestVerificationToken: token,
      Accept: 'application/json;odata=verbose',
      XRequestDigest: $("#__REQUESTDIGEST").val(),

   }
   $.ajax({
      url: "/_api/cr6fc_renewalappfiles(" + CGFileID + ")/cr6fc_attachment?x-ms-file-name=" + fileName,
      type: "PUT",
      async: false,
      contentType: "application/octet-stream",
      processData: false,
      data: fileContent,
      headers: header,
      success: function (data, textStatus, xhr) {
         var successId = xhr.getResponseHeader('entityid');
         alert('Data updated successfully.');
         window.location.href = location.origin + "/RefreshingCache/?id=" + successId + "," + renewalcgappentityid + "&tbl=cr6fc_renewalappfiles,cr6fc_renewalcgapplications&col=cr6fc_cacherefreshedon&red=ELIMakerDBRenewal";
      },
      error: function (xhr, textStatus, errorThrown) {
         console.log(errorThrown)
      }
   });
}


function getfileELIChecker(vItemID) {
   $.ajax({
      type: "GET",
      url: "/_api/cr6fc_renewalappfiles?$select=*&$filter=cr6fc_cgid eq (" + vItemID + ") and cr6fc_name eq 'ELIChecker'",
      contentType: "application/json",
      async: false,
      success: function (res) {
         console.log(res);
         var Logg = res.value;
         var vhtml1 = '';
         if (Logg.length > 0) {
            $("#ELICheckerAttch").show();
            for (var i = 0; i < Logg.length; i++) {
               var cgappfilename12 = Logg[i].cr6fc_nscheckerfile_name
               vhtml1 += "<a href='/_api/cr6fc_renewalappfiles(" + Logg[i].cr6fc_renewalappfileid + ")/cr6fc_attachment/$value'>" + Logg[i].cr6fc_attachment_name + "</a>";

            }
            $('#additionalDocs2').append(vhtml1);
         }

      },
      error: function (xhr, status, error) {
         var errorMessage = xhr.status + ': ' + xhr.statusText;
         console.log(errorMessage);
      }
   });
}