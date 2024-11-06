$(document).ready(function () {
vItemID= GetQueryStingValue()["Item"];
vPage = GetQueryStingValue()["Page"];
BindFPOActivities();
BindRegion();
bindCGApplicationData(vItemID);
facility();

  function DisbursmentLoan(selectedValue) {
    if (selectedValue === 'No') 
    {
		$('#3').hide();
		$('#5').hide();
		$('#6').hide();
		$('#7').hide();
		$('#8').hide();
    } 
    else 
    {
        $('#3').show();
		$('#5').show();
		$('#6').show();
		$('#7').show();
		$('#8').show();

    }
  }

  $('#DisbursmentLoan').on('change', function() {
    var selectedValue = $(this).val();
    DisbursmentLoan(selectedValue);
  });

});

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


function BindFPOActivities() {
	var requestUri = location.origin+"/_api/cr6fc_fpoactivitiesmasters?$select=*";

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
						FPOActivities.options[FPOActivities.options.length] = new Option(items[i].cr6fc_fpoactivity, i+1);
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

function BindRegion() {
	var requestUri = location.origin+"/_api/cr6fc_regionmasters?$select=*";
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
			items.splice(2,1);
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

function facility()
{
					if($("#TypeofFacility option:selected").text() == "Term Loan OR WCTL (Working Capital Term Loan)")
					{
						$("#2").hide();	            
					}
					else if($("#TypeofFacility option:selected").text() == "WC/CC Limit")
					{
						$("#1").hide();
					}
}

function bindCGApplicationData(vItemID){    
    var requestUri = location.origin+"/_api/cr6fc_renewalcgapplications?$top=5000&$select=*&$expand=cr6fc_FPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_BusinessFPOState($select=cr6fc_statemasterid,cr6fc_name),cr6fc_RegionOfFPO($select=cr6fc_regionmasterid,cr6fc_name)&$filter=(cr6fc_renewalcgapplicationid eq '" + vItemID + "')";
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
            
			$("#CGPAN").val(Logg[0].cr6fc_cgpan);
			$("#DisbursmentLoan").text(Logg[0]['cr6fc_disbursmentunderloan@OData.Community.Display.V1.FormattedValue']);
			$("#txtNameOfFPO").val(Logg[0].cr6fc_nameoffpo);
			$("#PANFPO").val(Logg[0].cr6fc_panfpo);
			$("#txtApplicantID").val(Logg[0].cr6fc_name);
			$("#CustomerID").val(Logg[0].cr6fc_customerid);
			$("#RegionOfFPO").val(Logg[0]._cr6fc_regionoffpo_value);
			$("#FarmerMemberSize").val(Logg[0].cr6fc_farmermembersize);
			$("#TypeofFacility").val(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue']);
			$("#hdnTitle").val(Logg[0].cr6fc_name);
			$("#AccountNo").val(Logg[0].cr6fc_accountno);
			$("#SanctionedAmount").val(Logg[0].cr6fc_sanctionedamount);
			$('#SanctionedAmount').text(Math.ceil(Logg[0].cr6fc_sanctionedamount));
			var Word=convertNumberToWords(Math.ceil(Logg[0].cr6fc_sanctionedamount));			
			$('#SanctionedAmountinwords').text("Rupees " + " " + Word + " " + "Only" );
			$("#ModifiedSanctionedAmount").val(Logg[0].cr6fc_modifiedsanctionedloanamount);
			$("#ModifiedSanctionedAmount").val(Logg[0].cr6fc_modifiedsanctionedloanamount);
			$('#ModifiedSanctionedAmount').text(Math.ceil(Logg[0].cr6fc_modifiedsanctionedloanamount));
			var Word=convertNumberToWords(Math.ceil(Logg[0].cr6fc_modifiedsanctionedloanamount));			
			$('#ModifiedSanctionedAmountinwords').text("Rupees " + " " + Word + " " + "Only" );
			if(Logg[0].cr6fc_dateofnpa != null)
			{
			document.getElementById("DateofNPA").value = Logg[0].cr6fc_dateofnpa.substring(0, Logg[0].cr6fc_dateofnpa.indexOf("T"));;                        	              	                       					
			}
			else
			{
				document.getElementById("DateofNPA").value = null
			}
      	    $("#IRACclassification").text(Logg[0]["cr6fc_iracclassificationoftheaccount@OData.Community.Display.V1.FormattedValue"]);
			var DisbursmentLoan =  Logg[0]['cr6fc_disbursmentunderloan@OData.Community.Display.V1.FormattedValue'] ; 
			var IRACStat = Logg[0]['cr6fc_iracclassificationoftheaccount@OData.Community.Display.V1.FormattedValue'];
						if (IRACStat == "Substandard" || IRACStat == "Doubtful" || IRACStat == "Loss") 
						{
							IRACStat="NPA";
						} 
						else 
						{
							IRACStat="Non NPA";
						}

						if (IRACStat=== 'Non NPA') 
						{ $('#20').hide();}
						if (IRACStat=== 'NPA') 
						{ $('#20').show();}           
            try 
            {                       	         
	              if(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'] == "Term Loan OR WCTL (Working Capital Term Loan)")	                   
					{
						$("#2").hide();
	              	 	$("#1").show();
	              	 	$("#DisbursmentLoan").val(Logg[0].cr6fc_disbursmentunderloan);												
						if( DisbursmentLoan == "No")
	              	 	{
							$('#3').hide();
							$('#5').hide();
							$('#6').hide();
							$('#7').hide();
							$('#8').hide();

	              	 	}	              	 	
						$("#PrincipalOutstanding").val(Logg[0].cr6fc_principaloutstanding);
						$('#PrincipalOutstanding').val(Math.ceil(Logg[0].cr6fc_principaloutstanding));
                       var Word=convertNumberToWords(Math.ceil(Logg[0].cr6fc_principaloutstanding));
                 
                       $('#PrincipalOutstandinginwords').text("Rupees " + " " + Word + " " + "Only" );
					    if(Logg[0].cr6fc_dateoffirstdisbursement != null)
						{
                            document.getElementById("Date").value = Logg[0].cr6fc_dateoffirstdisbursement.substring(0, Logg[0].cr6fc_dateoffirstdisbursement.indexOf("T"));;                        	              	
						}
						else
						{
							document.getElementById("Date").value = null;	
						}
					    if(Logg[0].cr6fc_enddateofinterestmoratium != null)
						{
							document.getElementById("EndDateinterest").value = Logg[0].cr6fc_enddateofinterestmoratium.substring(0, Logg[0].cr6fc_enddateofinterestmoratium.indexOf("T"));;                        	              	
						}
						else
						{
							document.getElementById("EndDateinterest").value = null;
						}
						if(Logg[0].cr6fc_enddateofprinciplemoratium != null)
						{
							document.getElementById("EndDateprincipal").value = Logg[0].cr6fc_enddateofprinciplemoratium.substring(0, Logg[0].cr6fc_enddateofprinciplemoratium.indexOf("T"));;                        	              	
						}
						else
						{
							document.getElementById("EndDateprincipal").value = null;
						}
					    if(Logg[0].cr6fc_dateoflastinstalment != null)
						{
							document.getElementById("DatelastInstalment").value = Logg[0].cr6fc_dateoflastinstalment.substring(0, Logg[0].cr6fc_dateoflastinstalment.indexOf("T"));;                        	              	
						}
						else
						{
							document.getElementById("DatelastInstalment").value = null;	
						}
						if(Logg[0].cr6fc_dateofclosureofloan != null)
						{
							document.getElementById("DateclosureLoan").value = Logg[0].cr6fc_dateofclosureofloan.substring(0, Logg[0].cr6fc_dateofclosureofloan.indexOf("T"));;                        	              	
						}
						else
						{
							document.getElementById("DateclosureLoan").value = null;
						}
					   					   					   						
	              	    $("#Loanfullydisbursed").val(Logg[0].cr6fc_loanfullydisbured);
	              	    $("#LoanClosed").text(Logg[0]['cr6fc_loanclosed@OData.Community.Display.V1.FormattedValue']);
	              	    if(Logg[0]['cr6fc_loanclosed@OData.Community.Display.V1.FormattedValue'] == "No"){
	              	     $("#10").hide();
	              	    }
	              	 }
	              	 if(Logg[0]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue'] == "WC/CC Limit")
	              	 {
	              	 	
	              	 	$("#2").show();
	              	 	$("#1").hide();	                   
	              	    
						$("#PeakOutstanding2").val(Logg[0].cr6fc_peakoutstanding);
						$('#PeakOutstanding2').text(Math.ceil(Logg[0].cr6fc_peakoutstanding));
                       var Word=convertNumberToWords(Math.ceil(Logg[0].cr6fc_peakoutstanding));
                 
                       $('#PeakOutstandinginwords').text("Rupees " + " " + Word + " " + "Only" );
					   if(Logg[0].cr6fc_dateoffirstwithdrawal != null || Logg[0].cr6fc_dateoffirstwithdrawal != undefined){
					   document.getElementById("DatefirstWithdrawl").value = Logg[0].cr6fc_dateoffirstwithdrawal.substring(0, Logg[0].cr6fc_dateoffirstwithdrawal.indexOf("T"));
					   }
					   if(Logg[0].cr6fc_dateofclosureoflimit != null ||Logg[0].cr6fc_dateofclosureoflimit != undefined){                        	              	
					   document.getElementById("DateClosureLimit2").value = Logg[0].cr6fc_dateofclosureoflimit.substring(0, Logg[0].cr6fc_dateofclosureoflimit.indexOf("T"));
					   }
					   if(Logg[0].cr6fc_dateofmodifiedsanction != null || Logg[0].cr6fc_dateofmodifiedsanction != undefined){                       	              	
					   document.getElementById("DateModifiedSanction").value = Logg[0].cr6fc_dateofmodifiedsanction.substring(0, Logg[0].cr6fc_dateofmodifiedsanction.indexOf("T"));
					   }
					   if(Logg[0].cr6fc_dateoflimitvalidity != null || Logg[0].cr6fc_dateoflimitvalidity != undefined){                       	              	              
					   document.getElementById("DateLimitValidity").value = Logg[0].cr6fc_dateoflimitvalidity.substring(0, Logg[0].cr6fc_dateoflimitvalidity.indexOf("T"));
					   }                        	              	              
                        $("#Limitoperational").val(Logg[0]['cr6fc_limitoperational@OData.Community.Display.V1.FormattedValue']);
                        $("#UtilisationLimit").val(Logg[0]['cr6fc_utilisationunderlimit@OData.Community.Display.V1.FormattedValue']);
                        $("#EndLimitClosed2").val(Logg[0]['cr6fc_limitclosed@OData.Community.Display.V1.FormattedValue']);
						if(Logg[0]['cr6fc_limitclosed@OData.Community.Display.V1.FormattedValue'] === 'No')
                        {
                        	$('#201').hide();
                        }
                        else
                        {
                        	$('#201').show();
                        }	
                                                                               	                  	                   
		          	}		          		
						if(Logg[0].cr6fc_elimakerremark!=null && Logg[0].cr6fc_elimakerremark!=undefined && Logg[0].cr6fc_elimakerremark!='')
						{
						$('#NSCheckerDiv').show();
						$("#txtCheckerRemark").text(Logg[0].cr6fc_elimakerremark);
						document.getElementById("txtCheckerRemark1").innerHTML=Logg[0].cr6fc_elimakerremark;
						}
						
						if(Logg[0].cr6fc_elicheckerremark!=null && Logg[0].cr6fc_elicheckerremark!=undefined && Logg[0].cr6fc_elicheckerremark!='')
						{
						$('#NSDiv').show();
						document.getElementById("txtNSAppproverRemark1").innerHTML=Logg[0].cr6fc_elicheckerremark;
						}	
						
						           		  				  
	          			
	        }
            catch (e) 
            {                               
            }
        },
        error: function () {
            console.log("error");
        }
    });  
    
}



var LoggELIMaker;





function Submit(status){

var SubStatus;
	if(status=="Draft")
	{
		SubStatus="Saved";
	}
	else if(status=="Submitted")
	{
		SubStatus="Pending for Approval";
	} 	    
var txtNameOfFPO=$("#txtNameOfFPO").val();
var CGPAN=$("#CGPAN").val();
var PANFPO=$("#PANFPO").val();
var CustomerID=$("#CustomerID").val();
var RegionOfFPO=$("#RegionOfFPO").val();
var FarmerMemberSize=$("#FarmerMemberSize").val();
var TypeofFacility=$("#TypeofFacility").val();
var Parentid=vItemID;
var Title=$("#hdnTitle").val();
var leadinginstitute=$("#hdnlendingInstitute").val();
var ELICheckerEmail=$('#hdnELICheckerEmail').val();
var makerremark = $("#txtmakerComment").val();
var EILchecker;

if((ELICheckerEmail!=null && ELICheckerEmail!=undefined && ELICheckerEmail!='') && status=="Submitted")
{
	EILchecker=GetUserId1(ELICheckerEmail);
}
if(EILchecker==-1 )
{
	alert('There is no valid EIL Checker against this Lending Institute')
	return false;
}

if(EILchecker==0 )
{
	alert('There is no EIL Checker against this Lending Institute')
	return false;
}
var ELICheckerEmail=$('#hdnELICheckerEmail').val();
	    
if(TypeofFacility == "Term Loan OR WCTL (Working Capital Term Loan)")
{
var AccountNo=$("#AccountNo").val();
var SanctionedAmount=$("#SanctionedAmount").val();
var ModifiedSanctionedAmount=$("#ModifiedSanctionedAmount").val();
var PrincipalOutstanding=$("#PrincipalOutstanding").val();
var Date=$("#Date").val();
var EndDateinterest=$("#EndDateinterest").val(); 
var EndDateprincipal=$("#EndDateprincipal").val();
var DatelastInstalment=$("#DatelastInstalment").val();
var Loanfullydisbursed=$("#Loanfullydisbursed").val();
var LoanClosed=$("#LoanClosed").val();
var PeakOutstanding=$("#PeakOutstanding").val();
var DatefirstWithdrawl=$("#DatefirstWithdrawl").val();
var EndLoanValidity=$("#EndLoanValidity").val();
var EndLimitClosed=$("#EndLimitClosed").val();
var DateclosureLoan=$("#DateclosureLoan").val();
var IRACclassification=$("#IRACclassification").val();
var DateofNPA=$("#DateofNPA").val();

var data1 = JSON.stringify({
  
"__metadata": { "type": "SP.Data.RenewalCGApplicationListItem"},

"NameOfFPO":txtNameOfFPO,
"CGPAN":CGPAN,
"PANFPO":PANFPO,
"CustomerID":CustomerID,
"RegionOfFPOId":RegionOfFPO,
"FarmerMemberSize":FarmerMemberSize,
"TypeofFacility":TypeofFacility,
//"ELIMakerRemark":txtmakerComment,
"AccountNo":AccountNo,
"TotalSanctionedAmount":SanctionedAmount,
"ModifiedSanctionedLoanAmount":ModifiedSanctionedAmount,
"PrincipalOutstanding":PrincipalOutstanding,
"DateOfFirstDisbursement":Date,
"EndDateOfInterestMoratium":EndDateinterest, 
"EndDateOfPrincipleMoratium":EndDateprincipal,
"DateOfLastInstalment":DatelastInstalment,
"LoanFullyDisbured":Loanfullydisbursed,
"LoanClosed":LoanClosed,
"DateOfClosureOfLoan":DateclosureLoan,
"IRACClassificationOfTheAccount":IRACclassification,
"DateOfNPA":DateofNPA,
"Parentid":Parentid,
"Title": Title,
"NameOfLendingInstitution":leadinginstitute,
"ELICheckerId":EILchecker,
"Status":SubStatus,
"ELIMakerRemark":makerremark
})
}
else if(TypeofFacility == "WC/CC Limit")
{
var AccountNo2 = $("#AccountNo2").val();
var SanctionedAmount2 = $("#SanctionedAmount2").val();
var ModifiedSanctionedAmount2 = $("#ModifiedSanctionedAmount2").val();
var PeakOutstanding2 =$("#PeakOutstanding2").val();
var DatefirstWithdrawl2 =$("#DatefirstWithdrawl2").val();
var EndLoanValidity2 =$("#EndLoanValidity2").val();
var EndLimitClosed2 =$("#EndLimitClosed2").val();
var DateClosureLimit2 =$("#DateClosureLimit2").val();
var IRACclassification2 =$("#IRACclassification2").val();
var DateofNPA2 =$("#DateofNPA2").val();

var data1 = JSON.stringify({
  
"__metadata": { "type": "SP.Data.RenewalCGApplicationListItem"},

"NameOfFPO":txtNameOfFPO,
"CGPAN":CGPAN,
"PANFPO":PANFPO,
"CustomerID":CustomerID,
"RegionOfFPOId":RegionOfFPO,
"FarmerMemberSize":FarmerMemberSize,
"TypeofFacility":TypeofFacility,
//"ELIMakerRemark":txtmakerComment,
"AccountNo":AccountNo2,
"TotalSanctionedAmount":SanctionedAmount2,
"ModifiedSanctionedLoanAmount":ModifiedSanctionedAmount2,
"PrincipalOutstanding":PrincipalOutstanding,
"Parentid":Parentid,
"Title": Title,
"PeakOutstanding":PeakOutstanding2,
"DateOfFirstWithdrawal":DatefirstWithdrawl2,
"EndDateOfLoanValidity":EndLoanValidity2,
"LimitClosed":EndLimitClosed2,
"NameOfLendingInstitution":leadinginstitute,
"ELICheckerId":EILchecker,
"Status":SubStatus,
"IRACClassificationOfTheAccount":IRACclassification2,
"ELIMakerRemark":makerremark
})
}

$.ajax({
url: _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/GetByTitle('RenewalCGApplication')/getItemByStringId('" +vItemID+ "')",
type: "POST",
contentType: "application/json;odata=verbose",
async:false,
data:data1,
headers: {
"accept": "application/json;odata=verbose",
"X-RequestDigest": $("#__REQUESTDIGEST").val(),
"IF-MATCH": "*",
"X-Http-Method": "PATCH"
},

success: function (success) 
{
	alert('Data  Update Successfully.')
},
error: function (error) 
{
	console.log(error);
	
	alert('Some error occured while adding data in RenewalCGApplication list. Please try again later.');
	console.log(error);
			 
}
})
}

function GetUserId1(EamilID) 
{
    debugger;
    var surl = _spPageContextInfo.webAbsoluteUrl+"/_api/web/siteusers?$filter=substringof('"+EamilID+"',Email)";
    var returnValue=-1;            
           $.ajax({
            async: false,                
            url:surl,
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data) {
               try
               {
                 returnValue=data.d.results[0].Id;
               }
                catch(err){
                returnValue=-1;  
                } },
            error: function (data) {
              returnValue=-1;
                console.log(JSON.stringify(data));
                
            }
        });          
       return returnValue;
}
function getOtherDocDataForELIMaker(vItemID)
{

	var queryList = "";
            queryList = _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/GetByTitle('RenewalDocument')/Items?$select=*,File/Name,EncodedAbsUrl&$expand=File&$filter=CGRenewalID eq '"+vItemID+"' and DocType eq 'ELIMakerRenewal'&$top=5000&$orderby=ID desc"; //
    
    $.ajax({
        url: queryList,
        method: 'GET',
        async:false,
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
        },
        success: function (data) {
        	var DocData = data.d.results;
        	var AttachmentFiles = '';
		 	if(DocData.length>0)
		 	{
		 		
		 		var appendDocuments=[];
		 		var Filename = '';
			 	var ServRel ='';
		
		 		for(var s=0;s<DocData.length;s++)
			 	{
			 					 		
					Filename = DocData[s].File.Name;
					var len=DocData[s].File.Name.length;
							if(len>40)
						    {
						      var Fname1=(Filename.substr(0,40)+'...');
						    }
						    else{
						    	Fname1=Filename;
						    }
			 		ServRel =DocData[s].EncodedAbsUrl;
					appendDocuments += '<div><div><a  onClick="DeleteOtherItemAttachment(this,\'' + Filename + '\')"></a><a href="'+ServRel+'" target="_blank">'+ Fname1+'<br/>&nbsp;&nbsp;&nbsp;&nbsp;</a></div></div>'					
			 	}
			 		$('#additionalDocs').append(appendDocuments);
		 	}
		 	else{
		 		$('#additionalDocs').append("no supporting documents.");
		 	}

        },
        error: function (data, errorCode, errorMessage) {
            console.log('An error occurred while searching for mapping content - ' + errorMessage);

        }
    });
} 
function getOtherDocDataForELIChecker(vItemID)
{

	var queryList = "";
            queryList = _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/GetByTitle('RenewalDocument')/Items?$select=*,File/Name,EncodedAbsUrl&$expand=File&$filter=CGRenewalID eq '"+vItemID+"' and DocType eq 'ELIcheckerRenewal'&$top=5000&$orderby=ID desc"; //
    
    $.ajax({
        url: queryList,
        method: 'GET',
        async:false,
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
        },
        success: function (data) {
        	var DocData = data.d.results;
       
        	var AttachmentFiles = '';
		 	if(DocData.length>0)
		 	{
		 		
		 		var appendDocuments=[];
		 		var Filename = '';
			 	var ServRel ='';
		
		 		for(var s=0;s<DocData.length;s++)
			 	{
			 					 		
					Filename = DocData[s].File.Name;
					var len=DocData[s].File.Name.length;
							if(len>40)
						    {
						      var Fname1=(Filename.substr(0,40)+'...');
						    }
						    else{
						    	Fname1=Filename;
						    }
			 		ServRel =DocData[s].EncodedAbsUrl;
					appendDocuments += '<div><div><a  onClick="DeleteOtherItemAttachment(this,\'' + Filename + '\')"></a><a href="'+ServRel+'" target="_blank">'+ Fname1+'<br/>&nbsp;&nbsp;&nbsp;&nbsp;</a></div></div>'					
			 	}
			 		$('#additionalDocsELIChecker').append(appendDocuments);
		 	}
		 	else{
		 		$('#additionalDocsELIChecker').append("no supporting documents.");//added by shivaprabha
		 	}

        },
        error: function (data, errorCode, errorMessage) {
            console.log('An error occurred while searching for mapping content - ' + errorMessage);

        }
    });
} 
function getOtherDocDataForNSChecker(vItemID)
{

	var queryList = "";
            queryList = _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/GetByTitle('RenewalDocument')/Items?$select=*,File/Name,EncodedAbsUrl&$expand=File&$filter=CGRenewalID eq '"+vItemID+"' and DocType eq 'NSCheckerRenewal'&$top=5000&$orderby=ID desc"; //
    
    $.ajax({
        url: queryList,
        method: 'GET',
        async:false,
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
        },
        success: function (data) {
        	var DocData = data.d.results;
     
        	var AttachmentFiles = '';
		 	if(DocData.length>0)
		 	{
		 		
		 		var appendDocuments=[];
		 		var Filename = '';
			 	var ServRel ='';
		
		 		for(var s=0;s<DocData.length;s++)
			 	{
			 					 		
					Filename = DocData[s].File.Name;
					var len=DocData[s].File.Name.length;
							if(len>40)
						    {
						      var Fname1=(Filename.substr(0,40)+'...');
						    }
						    else{
						    	Fname1=Filename;
						    }
			 		ServRel =DocData[s].EncodedAbsUrl;
					appendDocuments += '<div><div><a  onClick="DeleteOtherItemAttachment(this,\'' + Filename + '\')"></a><a href="'+ServRel+'" target="_blank">'+ Fname1+'<br/>&nbsp;&nbsp;&nbsp;&nbsp;</a></div></div>'					
				
			 	}
			 		$('#additionalDocsNSChecker').append(appendDocuments);
		 	}
		 	else{
		 		$('#additionalDocsNSChecker').append("no supporting documents.");//added by shivaprabha
		 	}

        },
        error: function (data, errorCode, errorMessage) {
            console.log('An error occurred while searching for mapping content - ' + errorMessage);

        }
    });
} 
function getOtherDocDataForNSApprover(vItemID)
{

	var queryList = "";
            queryList = _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/GetByTitle('RenewalDocument')/Items?$select=*,File/Name,EncodedAbsUrl&$expand=File&$filter=CGRenewalID eq '"+vItemID+"' and DocType eq 'NSApproverRenewal'&$top=5000&$orderby=ID desc"; //
    
    $.ajax({
        url: queryList,
        method: 'GET',
        async:false,
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
        },
        success: function (data) {
        	var DocData = data.d.results;
        	/*if(DocData.length != 0)
				{
				 $("#nsapproval").show();
				}
				else{
				 $("#nsapproval").hide();
				}*/

        	var AttachmentFiles = '';
		 	if(DocData.length>0)
		 	{
		 		//AttachmentFiles = data.d.results[t].AttachmentFiles.results;
		 		//	var AttcFileColl=[];
		 		var appendDocuments=[];
		 		var Filename = '';
			 	var ServRel ='';
		
		 		for(var s=0;s<DocData.length;s++)
			 	{
			 					 		
					Filename = DocData[s].File.Name;
					var len=DocData[s].File.Name.length;
							if(len>40)
						    {
						      var Fname1=(Filename.substr(0,40)+'...');
						    }
						    else{
						    	Fname1=Filename;
						    }
			 		ServRel =DocData[s].EncodedAbsUrl;
					appendDocuments += '<div><div><a  onClick="DeleteOtherItemAttachment(this,\'' + Filename + '\')"></a><a href="'+ServRel+'" target="_blank">'+ Fname1+'<br/>&nbsp;&nbsp;&nbsp;&nbsp;</a></div></div>'					
				
			 	}
			 		$('#additionalDocsNSApprover').append(appendDocuments);
		 	}
		 	else{
		 		
		 		$('#additionalDocsNSApprover').append("no supporting documents.");
		 	}

        },
        error: function (data, errorCode, errorMessage) {
            console.log('An error occurred while searching for mapping content - ' + errorMessage);

        }
    });
} 

function cancel()
{
if(vPage == "ELIMaker")
{
	       	 window.location.href=location.origin+"/ELIMakerDBRenewal/";
}
else if(vPage == "ELIChecker")
{
	       	 window.location.href= location.origin+"/ELICheckerDBRenewal/";
}

}
