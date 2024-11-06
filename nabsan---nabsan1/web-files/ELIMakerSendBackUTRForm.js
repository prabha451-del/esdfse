var vItemID;
$(document).ready(function () {
    $('title').text('ELI Maker UTR Details Form');
     vItemID= GetQueryStingValue()["Item"];
 // var vTaskID= GetQueryStingValue()["Task"];
     bindSOEDetailsData(vItemID);
     bindUTRDetailsData(vItemID);
     bindCGDetailsData(vItemID);
     var today = new Date();
        var dd1 = String(today.getDate()).padStart(2,'0');
        var mm = String(today.getMonth() + 1).padStart(2,'0');
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd1;
        $('#PaymentDate').attr('max',today);

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
function showSOW()
{
		var url="/SOEDetails/?Item="+InternId;
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

function bindCGDetailsData(vItemID){    
   // var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CGApplications')//items?$top=500&$select=*&$filter=(ID eq '"+vItemID+"')";
  // queryList = location.origin+"/_api/cr6fc_cgapplicationses?$select=*&$filter=(cr6fc_cgapplicationsid eq '"+vItemID+"')"; 
   queryList = location.origin+"/_api/cr6fc_cgaplications?$select=*&$filter=(cr6fc_cgaplicationid eq '"+vItemID+"')";   
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
            var LoggCG = data.value;                     
            try 
            {
              if(data.value.length > 0)
              {     
					//if(LoggCG[0].ELICheckerRemark!=null && LoggCG[0].ELICheckerRemark!=undefined && LoggCG[0].ELICheckerRemark!='')
					//{
					//	document.getElementById("divReview").innerHTML=LoggCG[0].ELICheckerRemark;
					//	document.getElementById("hdnNABApproverComment").value=LoggCG[0].ELICheckerRemark;
						//$('#reviewNab').show();
					//}
					//$('#MakerRdiv').hide();
					document.getElementById("txtELiMakerComments").value=LoggCG[0].cr6fc_elimakerpaymentremark;//added by shivaprabha
//document.getElementById("txtRemarksComments1").value=LoggCG[0].ELIMakerPaymentRemark;//added by shivaprabha

					if(LoggCG[0].cr6fc_elicheckerpaymentremark!=null && LoggCG[0].cr6fc_elicheckerpaymentremark!=undefined && LoggCG[0].cr6fc_elicheckerpaymentremark!='')
				{
						document.getElementById("divReview").innerHTML=LoggCG[0].cr6fc_elicheckerpaymentremark;
					//.getElementById("hdnNABApproverComment").value=LoggCG[0].cr6fc_elicheckerpaymentremark;
						//$('#reviewNab').show();
				}
				
//document.getElementById("txtRemarksComments1").value=LoggCG[0].cr6fc_elimakerpaymentremark;//added by shivaprabha

 if(LoggCG[0].cr6fc_elimakerpaymentremark!=null && LoggCG[0].cr6fc_elimakerpaymentremark!=undefined && LoggCG[0].cr6fc_elimakerpaymentremark!='')
				{
					$("#hdnkamerdiv").show();
						document.getElementById("divReview1").innerHTML=LoggCG[0].cr6fc_elimakerpaymentremark;
					//document.getElementById("hdnNABApproverComment").value=LoggCG[0].cr6fc_elimakerpaymentremark;
						//$('#reviewNab').show();
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

function bindSOEDetailsData(vItemID){    
   // var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SOEDetails')//items?$top=500&$select=*,BillToState/State,BillToState/Id,BillToState/StateCode&$expand=BillToState&$filter=(WFID eq '"+vItemID+"')";
  // queryList = location.origin+"/_api/cr6fc_soedetailses?$select=*&$filter=(cr6fc_wfid eq "+vItemID+")";
   queryList = location.origin+"/_api/cr6fc_soedetailses?$select=*&$filter=(cr6fc_wfid eq "+vItemID+")"; 
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
                   $('#txtCreditGuranteeFee').text(Math.ceil(Logg[0].cr6fc_creditguaranteefee));
                   $('#txtGSTAmount').text(Math.ceil(Logg[0].cr6fc_taxamount));
                   $('#txtGrandTotal').text(Math.ceil(Logg[0].cr6fc_grandtotal));
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
var UTRId='';
function bindUTRDetailsData(vItemID){    
    //var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('UTRDetails')//items?$top=500&$select=*&$filter=(CGID eq '"+vItemID+"')";
    //queryList = location.origin+"/_api/cr6fc_utrdetailses?$select=*&$filter=(cr6fc_cgid eq '"+vItemID+"')"; 
	queryList = location.origin+"/_api/cr6fc_utrdetailses?$select=*&$filter=(cr6fc_cgid eq '"+vItemID+"')"; 
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
            var Logg = data.value;  
            UTRId =  Logg[0].cr6fc_utrdetailsid;
            //InternId = Logg[0].ID;        
            try 
            {
              if(data.value.length > 0)
              {     
                   $('#txtPaidAmount').val(Logg[0].cr6fc_paymentpaid);
                   $('#txtUTRNo').val(Logg[0].cr6fc_utrno);
					if(Logg[0].cr6fc_paymentdate!=null && Logg[0].cr6fc_paymentdate!=undefined && Logg[0].cr6fc_paymentdate!='')
	                  {
                		document.getElementById("PaymentDate").value=Logg[0].cr6fc_paymentdate.substring(0,Logg[0].cr6fc_paymentdate.indexOf("T"));;
                	}
                  // $('#txtGrandTotal').text(Math.ceil(Logg[0].GrandTotal));
                  // $('#txtFPOName').text(Logg[0].FPO);
                  // $('#txtSOEdt').text(GetCreatedDateTime(Logg[0].SOEDate))
  
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

function SubmitData() {	
	//var txtCreditGuranteeFee= $("#txtCreditGuranteeFee").val();
	//var txtGSTAmount= $("#txtGSTAmount").val();	
	var txtSOENumber= $("#txtSOENumber").text();    
	var txtUTRNo= $("#txtUTRNo").val();
	var PaymentDate = $("#PaymentDate").val();
	var AmountPaid=$('#txtPaidAmount').val();
	if(AmountPaid==undefined || AmountPaid=='' || AmountPaid==null)
	{
		alert('Please enter paid Amount')
		return false;
	}
	var txtGrandTotal=$('#txtGrandTotal').text();
	var CGFeeDue=$('#txtCreditGuranteeFee').text();
	
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
	var txtRemarksComments1=$('#txtRemarksComments1').val();
	var x = confirm("Do you wish to Proceed ?");
	
	
		if(txtRemarksComments1=='' || txtRemarksComments1== undefined || txtRemarksComments1== null)
		{
			alert('Please enter the remark')
			return false;
		}
	
	var workflowDt = new Date();
	workflowDt = GetCurrentDataToday();

	var NSCheckerComm=document.getElementById("txtELiMakerComments").value;

var txtRemarksComments4;

    if(NSCheckerComm!='')
     {
     	txtRemarksComments4= "<b>Comment</b> :- " + txtRemarksComments1+ " - " + GetCurrentDataToday() + ": " + NSCheckerComm.toString() + "\n\n"
    }
     else{
     	txtRemarksComments4= "<b>Comment </b>:- " + txtRemarksComments1+ " - " + GetCurrentDataToday() + "\n\n"
   }

	if(x)
	{
			//var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('UTRDetails')/getItemByStringId('" +UTRId+ "')";
		   
			var data = JSON.stringify(
		      {
		        /*  "__metadata":
		          {
		              "type": "SP.Data.UTRDetailsListItem"
		          },*/
					"cr6fc_soenumber":txtSOENumber,
					"cr6fc_paymentdate":new Date(PaymentDate),
					"cr6fc_utrno":txtUTRNo,
					"cr6fc_cgid":""+WFID,
					"cr6fc_paymentpaid":''+AmountPaid,
					"cr6fc_soeid":""+InternId
		      });
			  shell.getTokenDeferred().done(function(token){
          $.ajax({
	       			//url: _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/getbytitle('UTRDetails')/getItemByStringId('" +UTRId+ "')",
					//url:location.origin+"/_api/cr6fc_utrdetailses(" +UTRId+")",
					url:location.origin+"/_api/cr6fc_utrdetailses(" +UTRId+")",
					type: "PATCH",
					contentType: "application/json;odata=verbose",
				    async:false,
				    data:data,
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
				    			var	Datanow = JSON.stringify(
							    {
							       /* '__metadata': {
							            'type': 'SP.Data.CGApplicationsListItem'
							        },*/
									 "cr6fc_status":"12",
									 "cr6fc_elimakerpaymentremark":txtRemarksComments4
									 
							    });	
							$.ajax({
							
							    url: "/_api/cr6fc_cgaplications("+vItemID+")",
							    type: "PATCH",
							    contentType: "application/json;odata=verbose",
							    async: false,
							    data: Datanow,
							    headers: {
									__RequestVerificationToken: token,
							        "accept": "application/json;odata=verbose",
							        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
							        "IF-MATCH": "*",
							        "X-Http-Method": "PATCH"
							    },
							    success: function (data) 
							    {
							       	 alert('Data  Submit Successfully.');
							       	 window.location.href=location.origin+"/ELIMakerCGFeeDashboard/";
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
 
function Exit()
{
window.location.href=location.origin+"/ELIMakerCGFeeDashboard/";
}    
 function StatusChange() 
 {   
 			var	Data = JSON.stringify(
		    {
		     /*   '__metadata': {
		            'type': 'SP.Data.CGApplicationsListItem'
		        },*/
				 "cr6fc_status":"13"
				 
		    });	
	$.ajax({
	
	    url:"/_api/cr6fc_cgaplications("+vItemID+")",
	    type: "PATCH",
	    contentType: "application/json;odata=verbose",
	    async: false,
	    data: Data,
	    headers: {
			__RequestVerificationToken:token,
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

