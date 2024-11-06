var vItemID;
$(document).ready(function () {
    $('title').text('ELI Maker UTR Details Form');
     vItemID= GetQueryStingValue()["Item"];
 // var vTaskID= GetQueryStingValue()["Task"];
     bindSOEDetailsData(vItemID);
           	var today = new Date();
        var dd1 = String(today.getDate()).padStart(2,'0');
        var mm = String(today.getMonth() + 1).padStart(2,'0');
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd1;
        $('#PaymentDate').attr('max',today);
        //$('#DateOfRegistration').attr('max',today);

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
	window.location.href=location.origin+"/ELIMakerCGFeeDashboard/";
}
function showSOW()
{
		var url=location.origin+"/SOEDetails/?Item="+InternId;
		window.open(url, "_blank");
	
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
var WFID="" ;
var InternId="";
//var SOEID;
function bindSOEDetailsData(vItemID){    
  // var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SOEDetails')//items?$top=500&$select=*,BillToState/State,BillToState/Id,BillToState/StateCode&$expand=BillToState&$filter=(WFID eq '"+vItemID+"')";
//  queryList = location.origin+"/_api/cr6fc_soedetailses?$select=cr6fc_BillToState,cr6fc_wfid,cr6fc_soedetailsid,cr6fc_name,cr6fc_creditguaranteefee,cr6fc_taxamount,cr6fc_grandtotal,cr6fc_fpo,cr6fc_soedate&$expand=cr6fc_BillToState($select=cr6fc_statemasterid,cr6fc_name)&$filter=(cr6fc_wfid eq '"+vItemID+"')&$top=5000";
  queryList = location.origin+"/_api/cr6fc_soedetailses?$select=cr6fc_BillToState,cr6fc_wfid,cr6fc_soedetailsid,cr6fc_name,cr6fc_creditguaranteefee,cr6fc_taxamount,cr6fc_grandtotal,cr6fc_fpo,cr6fc_soedate&$expand=cr6fc_BillToState($select=cr6fc_statemasterid,cr6fc_name)&$filter=(cr6fc_wfid eq '"+vItemID+"')&$top=5000";
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
              if(data.value.length > 0)
              {     
                   $('#txtSOENumber').text(Logg[0].cr6fc_name);
                  // $('#txtCreditGuranteeFee').text(Math.ceil(Logg[0].CreditGuaranteeFee));
                  // $('#txtGSTAmount').text(Math.ceil(Logg[0].TaxAmount));
                   var CreditGuranteeFee;
                  if(Logg[0].cr6fc_creditguaranteefee == '' || Logg[0].cr6fc_creditguaranteefee == null)
                   {
                   	CreditGuranteeFee="0";
                   }
                   else
                   {
                   	CreditGuranteeFee=  Logg[0].cr6fc_creditguaranteefee;
                   }
                   $('#txtCreditGuranteeFee').text(Math.ceil(CreditGuranteeFee));
                   var Word=convertNumberToWords(Math.ceil(CreditGuranteeFee));
                   console.log(Word);
                   $('#txtCreditGuranteeFeeinwords').text("Rupees " + " " + Word + " " + "Only" );
                   $('#txtCreditGuranteeFeeinwords').val("Rupees " + " " + Word + " " + "Only" ); 
                  
                  var GSTAmount;
                  if(Logg[0].cr6fc_taxamount == '' || Logg[0].cr6fc_taxamount == null)
                   {
                   	GSTAmount="0";
                   }
                   else
                   {
                   	GSTAmount=Logg[0].cr6fc_taxamount;
                   }
                   $('#txtGSTAmount').text( Math.ceil(GSTAmount));
                   var Word=convertNumberToWords(Math.ceil(GSTAmount));
                   console.log(Word);
                   $('#txtGSTAmountinwords').text("Rupees " + " " + Word + " " + "Only" );
                   $('#txtGSTAmountinwords').val("Rupees " + " " + Word + " " + "Only" ); 
                   
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
                   $('#txtGrandTotalinword').text("Rupees " + " " + Word + " " + "Only" );
                   $('#txtGrandTotalinword').val("Rupees " + " " + Word + " " + "Only" );                  
                
                   $('#txtFPOName').text(Logg[0].cr6fc_fpo);
                   $('#txtSOEdt').text(GetCreatedDateTime(Logg[0].cr6fc_soedate))
  
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
function bindTermLoan()
{
	//var totalcapi = 0;
	  var txtPaidAmount = $("#txtPaidAmount").val();
        //totalcapi = SanctionedAmount 
         var Word=convertNumberToWords(Math.ceil(txtPaidAmount));
                   console.log(Word);
                   $('#txtAmountinwords').text("Rupees " + " " + Word + " " + "Only" );
                   $('#txtAmountinwords').val("Rupees " + " " + Word + " " + "Only" );


//$('#txtAmountinwords').text(totalcapi);
//$('#txtAmountinwords').val(totalcapi);

}
/*function bindTotalCGFees()
{
	  var txtPaidAmount = $("#txtGrandTotal").val();
         var Word=convertNumberToWords(Math.ceil(txtPaidAmount));
                   console.log(Word);
                   $('#txtGrandTotalinword').text("Rupees " + " " + Word + " " + "Only" );
                   $('#txtGrandTotalinword').val("Rupees " + " " + Word + " " + "Only" );
}*/

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


function SubmitData() {	
	//var txtCreditGuranteeFee= $("#txtCreditGuranteeFee").val();
	//var txtGSTAmount= $("#txtGSTAmount").val();	
	var txtSOENumber= $("#txtSOENumber").text();    
	var txtUTRNo= $("#txtUTRNo").val();
	var PaymentDate = $("#PaymentDate").val();
	var AmountPaid=$('#txtPaidAmount').val();
	var txtGrandTotal=$('#txtGrandTotal').text();
	var CGFeeDue=$('#txtCreditGuranteeFee').text();
	if(AmountPaid==undefined || AmountPaid=='' || AmountPaid==null)
	{
		alert('Please enter paid Amount')
		return false;
	}
	if(txtUTRNo==undefined || txtUTRNo== null || txtUTRNo== '')
	{
		alert('Please enter UTR')
		return false;

	}

	if(PaymentDate==undefined || PaymentDate == null || PaymentDate == '')
	{
		alert('Please enter Payment Date')
		return false;

	}
	if(parseFloat(AmountPaid) != parseFloat(txtGrandTotal))
	{
		alert('Please enter Amount Paid should be same as Grand Total')
	
		return false;

	}
	var x = confirm("Do you wish to Proceed ?");
	if(x)
	{
			//var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('UTRDetails')/items";
		    var data = JSON.stringify(
		      {
		          
					"cr6fc_soenumber":txtSOENumber,
					"cr6fc_paymentdate":new Date(PaymentDate),
					"cr6fc_utrno":txtUTRNo,
					"cr6fc_cgid":""+WFID,
					"cr6fc_paymentpaid":''+AmountPaid,
					"cr6fc_soeid":""+InternId
		      });

			  shell.getTokenDeferred().done(function(token){
				console.log(token)
			  var header = {
				__RequestVerificationToken: token,
				contentType: "application/json;odata=verbose"
			}
          $.ajax({
	       			//url: _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/getbytitle('UTRDetails')/items",
					//url:"/_api/cr6fc_utrdetailses",
					//url:location.origin+"/_api/cr6fc_utrdetailses",
					url:"/_api/cr6fc_utrdetailses",
					type: "POST",
					//contentType: "application/json;odata=verbose",
				    async:false,
				    data:data,
				   	headers:header,
				    // success: function (success) {
						success: function (data, textStatus, xhr) {
							 successId = xhr.getResponseHeader("entityid");
							//successId=success.cr6fc_utrdetailsid;
				    			console.log(successId);
                                 var statusy =''+ 12;
				    			var	Data1 = JSON.stringify(
							    {
							        /*'__metadata': {
							            'type': 'SP.Data.CGApplicationsListItem'
							        },*/
									 "cr6fc_status":statusy,
									 
							    });	
								var header={
									__RequestVerificationToken:token,
									contentType: "application/json;odata=verbose",
									XRequestDigest: $("#__REQUESTDIGEST").val(),
									IFMATCH: "*",
									XHttpMethod: "PATCH"
									}
							$.ajax({
							
							   // url: _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/getByTitle('CGApplications')/getItemByStringId('" +vItemID+"')",
							  // url :"/_api/cr6fc_cgapplicationses("+vItemID+")",
							   url :"/_api/cr6fc_cgaplications("+vItemID+")",
							    type: "PATCH",
							    contentType: "application/json;odata=verbose",
							    async: false,
							    data: Data1,
							    headers:header,
							    success: function (data, textStatus, xhr) 
							    {
									var cgappEntityId = xhr.getResponseHeader('entityid');
							       	 alert('Data  Submit Successfully.');
										//window.location.href = location.origin + "/RefreshingCache/?id="+cgappEntityId+","+successId+"&tbl=cr6fc_cgapplicationses,cr6fc_utrdetailses&col=cr6fc_cacherefreshedon&red=ELIMakerCGFeeDashboard"; 
										//window.location.href = location.origin + "/RefreshingCache/?id="+cgappEntityId+","+successId+"&tbl=cr6fc_cgapplicationses,cr6fc_utrdetailses&col=cr6fc_cacherefreshedon&red=ELIMakerCGFeeDashboard"; 
										window.location.href = location.origin + "/RefreshingCache/?id="+cgappEntityId+","+successId+"&tbl=cr6fc_cgaplications,cr6fc_utrdetailses&col=cr6fc_cacherefreshedon&red=ELIMakerCGFeeDashboard"; 
									 //	 window.location.href=location.origin+"/ELIMakerCGFeeDashboard/";
							    },
							    error: function (e) 
							    {
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
     
 function StatusChange() 
 {   
 			var	Data = JSON.stringify(
		    {
		      /*  '__metadata': {
		            'type': 'SP.Data.CGApplicationsListItem'
		        },*/
				 "cr6fc_status":"10"
				 
		    });	
			var header={
				__RequestVerificationToken:token,
				contentType: "application/json;odata=verbose",
				XRequestDigest: $("#__REQUESTDIGEST").val(),
				IFMATCH: "*",
				XHttpMethod: "PATCH"
				}
	$.ajax({
	   // url: _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/getByTitle('CGApplications')/getItemByStringId('" +vItemID+"')",
	   url:"/_api/cr6fc_cgaplications("+vItemID+")",
	    type: "POST",
	    contentType: "application/json;odata=verbose",
	    async: false,
	    data: Data,
	    headers:header,
	    success: function (data) 
	    {
	       	 alert('List updated Succesfully');
	    },
	    error: function (e) 
	    {
	    	console.log(e);
	    }
	});
}
