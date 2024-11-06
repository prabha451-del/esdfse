var loggedInUserId = '';
var loggedInUserName = '';
var loggedInUserEmail = '';
$(document).ready(function () {
loggedInUserId = $('#fpo-user-contact-id').val();
loggedInUserName = $('#fpo-user-contact-name').val();
loggedInUserEmail = $('#fpo-user-email').val();
UTRMaster();
SOEMaster();
Navigation();
TaxInvoicesGet();
EliMasterData(loggedInUserEmail);
// Dashboard();

        $("#checkall").change(function(){

           var checked = $(this).is(':checked');
           if(checked){
              $(".checkbox").each(function(){
                  $(this).prop("checked",true);
              });
           }else{
              $(".checkbox").each(function(){
                  $(this).prop("checked",false);
              });
           }
        });
}); 
// Check all

        // Changing state of CheckAll checkbox 
        $(".checkbox").click(function(){

           if($(".checkbox").length == $(".checkbox:checked").length) {
               $("#checkall").prop("checked", true);
           } else {
               $("#checkall").prop("checked",false);
           }

        });

   var TotalperEMployee='';
var LoginName='';
 function GetParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
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
// function SubmitData(){

// window.location.href="https://nabardmumbai.sharepoint.com/sites/FPOCGPortal/SitePages/CGApplicationForm_Backup01March.aspx";

// }
function Navigation() {
	var queryList = "";
	//queryList = location.origin+"/_api/cr6fc_menumasters?$select=cr6fc_link,cr6fc_name,statecode,cr6fc_role&$filter=statecode eq 0  and cr6fc_role eq 0&$orderby=cr6fc_order asc&$top=5000";
	queryList = location.origin+"/_api/cr6fc_menumasters?$select=cr6fc_link,cr6fc_name,statecode,cr6fc_role&$filter=statecode eq 0  and cr6fc_role eq 0&$orderby=cr6fc_order asc&$top=5000";
	var requestHeaders = { "accept": "application/json;odata=verbose" };
	$.ajax({
		url: queryList,
		type: "GET",
		async: false,
		headers: {
			"accept": "application/json;odata=verbose",
			"content-type": "application/json;odata=verbose"
		},
		success: function onSuccess(data) {
			try {
				var Loggs = data.value;
				if (Loggs.length > 0) {
					var vHTML = '';
					for (var i = 0; i < Loggs.length; i++) {
						//vHTML += "<li class='nav-item'><a class='nav-link' href='" + Loggs[i].cr6fc_link + "'>" + Loggs[i].cr6fc_name + "</a></li>"
						vHTML += "<li class='nav-item'><a class='nav-link' href='" + Loggs[i].cr6fc_link + "'>" + Loggs[i].cr6fc_name + "</a></li>"
					}
					if (vHTML != '' && vHTML != null && vHTML != undefined) {
						document.getElementById("Navdiv").innerHTML = vHTML;
						//$('#leftnavigation').text(vHTML);
					}

				}
			}
			catch (e) {
				console.log(e);
			}

		},
		error: function onError(error) {
			console.log(JSON.stringify(error));
		}
	});


}

var TaxInvoicesColl;
function TaxInvoicesGet() {
	//var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('TaxInvoices')//items?$top=5000&$select=*&$orderby=ID desc";
	//var requestUri = location.origin + "/_api/cr6fc_renewaltaxinvoices?$select=cr6fc_cgid,cr6fc_cgpan&$top=5000";
	var requestUri = location.origin + "/_api/cr6fc_renewaltaxinvoices?$select=cr6fc_cgid,cr6fc_cgpan&$top=5000";
			//var requestHeaders = { "accept": "application/json;odata=verbose" };
			$.ajax({
				url: requestUri,
				type: "GET",
				async: false,
				headers: {
				"accept": "application/json;odata=verbose",
				"content-type": "application/json;odata=verbose"
				},
				success: function (data) {
					TaxInvoicesColl = data.value;
				},
				error: function () {
					console.log("error");
				}
			});
}
var nameEliInstitute;
const EliMasterData = (loggedInUserEmail) =>{
	//let URL = location.origin+"/_api/cr6fc_elimasters?$select=cr6fc_emailid,cr6fc_lendinginstitute&$filter=cr6fc_emailid eq '"+loggedInUserEmail+"'";
	let URL = location.origin+"/_api/cr6fc_elimasters?$select=cr6fc_emailid,cr6fc_lendinginstitute&$filter=cr6fc_emailid eq '"+loggedInUserEmail+"'";
		   $.ajax({
			   url: URL,
			   type: "GET",
			   async: false,
			   headers: {
				   "accept": "application/json;odata=verbose",
				   "content-type": "application/json;odata=verbose"
			   },
			   success: function (data) {
				   Loggmakerrequestdata = data.value;
				   if (Loggmakerrequestdata.length > 0) {
					   for(var a =0;a<Loggmakerrequestdata.length;a++){
						   //nameEliInstitute = Loggmakerrequestdata[0].cr6fc_lendinginstitute;
						   nameEliInstitute = Loggmakerrequestdata[0].cr6fc_lendinginstitute;
					   }
					   Dashboard(nameEliInstitute);
				   }
				   else{
						  alert("Log in id is not a Eli Maker");
						  return false;
				   }
				   
			   },
			   error: function () {
				   console.log("error");
			   }
		   });
   }
function OpenXL(){
//window.location.href="/sites/FPOCGPortal/SitePages/CGApplicationExcelUpload.aspx";
window.location.href="/sites/FPOCGPortal/SitePages/CGApplicationExcelUpload_Backup16Feb.aspx";
}
  

var UTRColl;
function UTRMaster() {
    //var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('UTRDetails')//items?$top=5000&$select=*,CGID&$orderby=ID desc";
	//var requestUri = location.origin + "/_api/cr6fc_renewalutrdetailses?$select=cr6fc_cgid,cr6fc_paymentreceiveddate&$top=5000";
	var requestUri = location.origin + "/_api/cr6fc_renewalutrdetailses?$select=cr6fc_cgid,cr6fc_paymentreceiveddate&$top=5000";   
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
		        },
		        error: function () {
		            console.log("error");
		        }
		    });
}

var SOEColl;
function SOEMaster() {
   // var requestUri = location.origin + "/_api/cr6fc_renewalsoedetailses?$select=cr6fc_wfid,cr6fc_eligibleguranteecover&$top=5000";
	var requestUri = location.origin + "/_api/cr6fc_renewalsoedetailses?$select=cr6fc_wfid,cr6fc_eligibleguranteecover&$top=5000";
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
		            SOEColl = data.value;
		        },
		        error: function () {
		            console.log("error");
		        }
		    });
}
  
function Dashboard(nameEliInstitute){
    var queryList = "";

 //queryList = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('RenewalCGApplication')/Items?$select=*,Created&$filter=AuthorId eq '"+LoginName+"' and (Status eq 'Guarantee Issued' or CGStatus eq 'Normal Closed' or CGStatus eq 'Pre Closed' or CGStatus eq 'Temporary Closed' or CGStatus eq 'Force Closure')&$top=5000&$orderby=ID desc"; 
 //queryList = location.origin + "/_api/cr6fc_renewalcgapplications?$select=cr6fc_guaranteestartdate,cr6fc_status,cr6fc_nameoflendinginstitution,cr6fc_renewalcgapplicationid,cr6fc_cgstatus,cr6fc_cgpan,cr6fc_nameoffpo,cr6fc_cgstatus&$filter=cr6fc_nameoflendinginstitution eq '"+nameEliInstitute +"' and (cr6fc_status eq 15 or cr6fc_cgstatus eq 7 or cr6fc_cgstatus eq 8 or cr6fc_cgstatus eq 9 or cr6fc_cgstatus eq 10)&$top=5000";
 queryList = location.origin + "/_api/cr6fc_renewalcgapplications?$select=cr6fc_guaranteestartdate,cr6fc_status,cr6fc_nameoflendinginstitution,cr6fc_renewalcgapplicationid,cr6fc_cgstatus,cr6fc_cgpan,cr6fc_nameoffpo,cr6fc_cgstatus&$filter=cr6fc_nameoflendinginstitution eq '"+nameEliInstitute +"' and (cr6fc_status eq 15 or cr6fc_cgstatus eq 7 or cr6fc_cgstatus eq 8 or cr6fc_cgstatus eq 9 or cr6fc_cgstatus eq 10)&$top=5000";
 $.ajax({
	url: queryList,
	type: "GET",
	async: false,
	headers: {
	"accept": "application/json;odata=verbose",
	"content-type": "application/json;odata=verbose"
	},
	success: function (data)
	{
	
		
		try
		{
			  var Loggs= data.value;
                 
              var vHTML=''; 
             var vURLEdit1='';
                  for(var i=0;i<Loggs.length; i++)
                    { 
                  var vURLView =location.origin + "/ViewRenewalCGIssued/?Item="+Loggs[i].cr6fc_renewalcgapplicationid+"&Page=ELIMakerCGPay";
				  var vURLViewrenewed = location.origin + "/ViewformRenewal/?Item="+Loggs[i].cr6fc_renewalcgapplicationid+"";
                 	var Status = Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'];
                  if(Status == "Sent Back by ELI Checker" || Status =="Saved"){
                  		//vURLEdit1 ="https://nabardmumbai.sharepoint.com/sites/FPOCGPortal/SitePages/CGApplicationEditForm.aspx?Item="+Loggs[i].ID;
                  		vURLEdit1 ="https://nabardmumbai.sharepoint.com/sites/FPOCGPortal/SitePages/CGApplicationEditForm_Backup26Feb.aspx?Item="+Loggs[i].cr6fc_renewalcgapplicationid;
                  	vURLEdit1 =	"<a href='"+vURLEdit1+"' target='_blank' title='Edit Form' style='margin:0;Padding:0;'><i class='fa fa-pencil' aria-hidden='true'></i></a>"
                  }
                  else if(Status == "Approved by NABSaranrakshan") {
                       vURLEdit1 ="https://nabardmumbai.sharepoint.com/sites/FPOCGPortal/SitePages/ELIMakerUTRDetails.aspx?Item="+Loggs[i].cr6fc_renewalcgapplicationid;
                  	vURLEdit1 =	"<a href='"+vURLEdit1+"' target='_blank' title='Enter UTR Details' style='margin:0;Padding:0;'><i class='fa fa-pencil' aria-hidden='true'></i></a>"
                  }
                  else{
                     vURLEdit1 = "";
                  }
				var checkno="<input type='checkbox' id='fullhide' class='checkbox' name='delete' value="+Loggs[i].cr6fc_renewalcgapplicationid+">"
				var filterUTRData = $.grep(UTRColl, function (value) 
				    {
				        return (value.cr6fc_cgid == Loggs[i].cr6fc_renewalcgapplicationid);
				    });
				    
				     //var SoENo='';
				    var UTRDate='';
				    //var SOECGFee='';
					if(filterUTRData.length>0)
					{
						//SoENo=filterSOEData[0].Title;
						UTRDate=GetCreatedDateTime(filterUTRData[0].cr6fc_paymentreceiveddate);
						//SOECGFee=filterSOEData[0].CreditGuaranteeFee;
					}
					
					var filterSOEData = $.grep(SOEColl, function (value) 
				    {
				        return (value.cr6fc_wfid == Loggs[i].cr6fc_renewalcgapplicationid);
				    });
					var UTREligible;
				    if(filterSOEData.length>0)
					{
						//SoENo=filterSOEData[0].Title;
						UTREligible=filterSOEData[0].cr6fc_eligibleguranteecover;
						//SOECGFee=filterSOEData[0].CreditGuaranteeFee;
					}
					var vStatus='';
					if(Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] =="Guarantee Issued")
					{
						vStatus="Guarantee Renewed"
					}
					else
					{
						vStatus=Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'];
					}
	                					
	                var filterTaxData = $.grep(TaxInvoicesColl, function (value) 
				    {
				        return (value.cr6fc_cgid == Loggs[i].cr6fc_renewalcgapplicationid);
				    });				    
				    if(filterTaxData.length>0)
				    {
				    	CGPANNo=filterTaxData[0].cr6fc_cgpan;
				    }

                    vHTML += "<tr style='line-height: 16px;'>"+	
	      				
							//"<td style='text-align:center'>"+checkno+"</td>"+
							"<td style='text-align:center'>"+CGPANNo+"</td>"+
					        "<td style='text-align:center'>"+Loggs[i].cr6fc_nameoffpo+"</td>"+
							"<td style='text-align:center'>"+UTREligible+"</td>"+
							"<td style='text-align:center'>"+GetCreatedDateTime(Loggs[i].cr6fc_guaranteestartdate)+"</td>"+
							"<td style='text-align:center'>"+Loggs[i]['cr6fc_cgstatus@OData.Community.Display.V1.FormattedValue']+"</td>"+
							"<td style='text-align:center'>"+vStatus+"</td>"+
						   	"<td style='text-align:center;  margin:0; padding:0;'><a href='"+vURLView+"' target='_blank' style='margin:0;Padding:0;'><i class='fa fa-bars' aria-hidden='true'></i></a></td>"+
						   	"<td style='text-align:center;  margin:0; padding:0;'><a href='"+vURLViewrenewed+"' target='_blank' style='margin:0;Padding:0;'><i class='fa fa-bars' aria-hidden='true'></i></a></td>"+
							"<td style='text-align:center; display:none;'>"+Loggs[i].cr6fc_renewalcgapplicationid+"</td>"+					
							"</tr>";
							
							                                       							
							
							
                    }
                    
                    if(vHTML != "")
                    {   
                        $('#tblDataMain').DataTable().clear();
                        $('#tblDataMain').DataTable().destroy();
                        document.getElementById("tbodyRequestor").innerHTML=vHTML;
                      	                  $('#tblDataMain').DataTable();
														
															
                    }
                    else  
                    {
                        //vHTML ="<tr><td colspan='15'><font face='Calibri' size='2'>No Employee Addition Deletion</font></td></tr>"; 
                        vHTML ="<tr><td colspan='15'><font face='Calibri' size='2'>No CG Application</font></td></tr>"; 

                        document.getElementById("tbodyRequestor").innerHTML=vHTML;
                        $('#tblDataMain').dataTable();
                    }          
                
                    }
            catch (e) {       
            console.log(e);                        
            }
            //getData(PolicyNo);
        },
        error: function () {
            console.log("error");
        }
    });
}



