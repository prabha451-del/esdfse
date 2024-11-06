var loggedInUserId = '';
var loggedInUserName = '';
var loggedInUserEmail = '';
$(document).ready(function () {
    loggedInUserId = $('#fpo-user-contact-id').val();
	loggedInUserName = $('#fpo-user-contact-name').val();
	loggedInUserEmail = $('#fpo-user-email').val();
    Navigation();
SOEMaster();
TaxInvoicesGet();
// Dashboard();
EliMasterData(loggedInUserEmail);
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

function SubmitData(){

window.location.href="";

}
function OpenXL(){
window.location.href="";

}
function Navigation() {
    var queryList = "";
    queryList = location.origin+"/_api/cr6fc_menumasters?$select=statecode,cr6fc_role,cr6fc_order,cr6fc_link,cr6fc_name&$filter=statecode eq 0  and cr6fc_role eq 1&$orderby=cr6fc_order asc&$top=5000";
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
var nameEliInstitute;
const EliMasterData = (loggedInUserEmail) =>{
	let URL = location.origin+"/_api/cr6fc_elimasters?$select=cr6fc_lendinginstitute,cr6fc_elicheckeremailid&$filter= cr6fc_elicheckeremailid eq '"+loggedInUserEmail+"'";
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
function Dashboard(nameEliInstitute){
    var queryList = "";
 queryList = location.origin + "/_api/cr6fc_renewalcgapplications?$select=cr6fc_status,cr6fc_renewalcgapplicationid,cr6fc_nameoflendinginstitution,cr6fc_cgpan,cr6fc_nameoffpo,cr6fc_guaranteestartdate,cr6fc_parentid,cr6fc_cgstatus&$filter=(cr6fc_status eq 2 or cr6fc_status eq 4 or cr6fc_status eq 6) and cr6fc_nameoflendinginstitution eq '"+nameEliInstitute+"'&$top=5000";
   var requestHeaders = { "accept": "application/json;odata=verbose" };

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
                 var vURLEdit1 ='';
                  for(var i=0;i<Loggs.length; i++)
                {
				   var Status = Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'];
				   var vURLview =location.origin + "/ViewformRenewal/?Item="+Loggs[i].cr6fc_renewalcgapplicationid+"&Page=ELIChecker";
                   var vURLEdit =location.origin + "/ELICheckerAPF/?Item="+Loggs[i].cr6fc_renewalcgapplicationid;
                  if(Status == "Pending for Approval" ){
                  	vURLEdit1 =	"<a href='"+vURLEdit+"' target='_blank'target='_blank' style='margin:0; padding-right:10px'><i style='color:#f55905;'class='fa fa-edit' aria-hidden='true'></i></a>"
                   }
                       else{
                        vURLEdit1 ='';
                  }
					var CGPANNo='';
                   var filterTaxData = $.grep(TaxInvoicesColl, function (value) 
				    {
				        return (value.cr6fc_cgid == Loggs[i].cr6fc_parentid);
				    });				    
				    if(filterTaxData.length>0)
				    {
				    	CGPANNo=filterTaxData[0].cr6fc_cgpan;
				    }

					var filterSOEData = $.grep(SOEColl, function (value) 
				    {
				        return (value.cr6fc_wfid == Loggs[i].cr6fc_parentid);
				    });	
				    var UTREligible='';			    				    
				    if(filterSOEData.length>0)
					{
						UTREligible=filterSOEData[0].cr6fc_eligibleguranteecover;
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

                    vHTML += "<tr style='line-height: 16px;'>"+	
	      				
							"<td style='text-align:center'>"+Loggs[i].cr6fc_cgpan+"</td>"+
							"<td style='text-align:center'>"+Loggs[i].cr6fc_nameoffpo+"</td>"+
							"<td style='text-align:center'>"+UTREligible+"</td>"+
							"<td style='text-align:center'>"+GetCreatedDateTime(Loggs[i].cr6fc_guaranteestartdate)+"</td>"+														
							"<td style='text-align:center'>"+Loggs[i]['cr6fc_cgstatus@OData.Community.Display.V1.FormattedValue']+"</td>"+
							"<td style='text-align:center'>"+vStatus+"</td>"+
						   "<td style='text-align:center; margin:0; padding:0;'>"+vURLEdit1+"<a href="+vURLview+" target='_blank' style='margin:0;'><i class='fa fa-bars' aria-hidden='true'></i></a></td>"+
							"<td style='text-align:center; display:none;'>"+Loggs[i].cr6fc_renewalcgapplicationid+"</td>"+					
							"</tr>";						
                    }
                    
                    if(vHTML != "")
                    {   
                        $('#tblDataMain').DataTable().clear();
                        $('#tblDataMain').DataTable().destroy();
                        document.getElementById("tbodyRequestor").innerHTML=vHTML;
                      	                  $('#tblDataMain').DataTable(/*{ 
	                  "order": [[7,'dsc']],
                         paging:true,
                         "bSort": true,
       					 "bInfo": false,
						  "bFilter": true
						  			} */);
														
															
                    }
                    else  
                    {
                        vHTML ="<tr><td colspan='15'><font face='Calibri' size='2'>No Employee Addition Deletion</font></td></tr>"; 
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


var SOEColl;
function SOEMaster() {
    var requestUri = location.origin + "/_api/cr6fc_soedetailses?$select=cr6fc_wfid,cr6fc_eligibleguranteecover&$top=5000";
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


var TaxInvoicesColl;
function TaxInvoicesGet() {
    //var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('TaxInvoices')//items?$top=5000&$select=*&$orderby=ID desc";
	var requestUri = location.origin + "/_api/cr6fc_taxinvoiceses?$select=cr6fc_cgpan,cr6fc_cgid&$top=5000";
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

function BindHomeDetails() {
debugger;
       //var LoginName=_spPageContextInfo.userId; 
       var ddlStatus = document.getElementById("ddlStatus").value;
       if( ddlStatus == "Guarantee Renewed")
       {
       		ddlStatus = "Guarantee Issued";
       }
        var vHTML = "";
    var queryList = "";
    if(ddlStatus =="All")
    {
     queryList = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('RenewalCGApplication')/Items?$select=*&$filter=ELICheckerId eq '"+LoginName+"' and (Status eq 'Pending For Approval' or Status eq 'Rejected by NabSaranrakshan' or Status eq 'Sent Back by ELI Checker' or Status eq 'Rejected by ELI Checker' or Status eq 'Submitted to NabSanrakshan')&$top=5000&$orderby=ID desc"; 
    }
    else{
       if ( ddlStatus !== "All" && ddlStatus !== "") {
        queryList = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('RenewalCGApplication')/Items?$select=*&$filter=(ELICheckerId eq '"+LoginName+"' and Status eq '"+ddlStatus+"' )&$top=5000&$orderby=ID desc"; 
          }
       else{
        queryList = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('RenewalCGApplication')/Items?$select=*&$filter=ELICheckerIdeq '"+LoginName+"'&$top=5000&$orderby=ID desc"; 

       }
       }
    var requestHeaders = { "accept": "application/json;odata=verbose" };
    $.ajax({
        url: queryList,
        contentType: "application/json;odata=verbose",
        headers: requestHeaders,
        async: false,
        cache: false,
        success: function (data) 
        {    
          try
            {
                 var Loggs= data.d.results;
              var vHTML=''; 
              var vURLEdit1 = '';
                  for(var i=0;i<Loggs.length; i++)
                    { 
				  var vURLEdit ="/sites/FPOCGPortalUAT/SitePages/Renewal%20Application/ELICheckerApprovalRenewalForm.aspx?Item="+Loggs[i].ID;
                  var vURLView ="/sites/FPOCGPortalUAT/SitePages/Renewal%20Application/ViewRenewalApplicationForm.aspx?Item="+Loggs[i].ID+"&Page=ELIChecker";
				  var Status = Loggs[i].Status;
                  if(Status == "Pending For Approval" ){
				   var vURLEdit ="/sites/FPOCGPortalUAT/SitePages/Renewal Application/ELICheckerApprovalRenewalForm.aspx?Item="+Loggs[i].ID;
                  	vURLEdit1 =	"<a href='"+vURLEdit+"' target='_blank' style='margin:0;Padding:0;'><i class='fa fa-pencil' aria-hidden='true'></i></a>"
                  }
                  else{
                        vURLEdit1 ="";
                  }
                  var vStatus='';
					if(Loggs[i].Status=="Guarantee Issued")
					{
						vStatus="Guarantee Renewed"
					}
					else
					{
						vStatus=Loggs[i].Status;
					}


                    vHTML += "<tr style='line-height: 16px;'>"+	
	      				
							"<td style='text-align:center'>"+CGPANNo+"</td>"+
							"<td style='text-align:center'>"+Loggs[i].NameOfFPO+"</td>"+
							"<td style='text-align:center'>"+UTREligible+"</td>"+
							"<td style='text-align:center'>"+GetCreatedDateTime(Loggs[i].GuaranteeStartDate)+"</td>"+														
							"<td style='text-align:center'>"+Loggs[i].CGStatus+"</td>"+
							"<td style='text-align:center'>"+vStatus+"</td>"+
						   "<td style='text-align:center; margin:0; padding:0;'><span>"+vURLEdit1+"</span style='display:block;'><span><a href="+vURLview+" target='_blank' target='_blank'style='margin:0; padding-right:10px' padding-left: 20px;'><i class='fa fa-bars' aria-hidden='true'></i></a></span></td>"+
							"<td style='text-align:center; display:none;'>"+Loggs[i].ID+"</td>"+					
							"</tr>";	                    }
                    
                    if(vHTML != "")
                    {   
                        $('#tblDataMain').DataTable().clear();
                        $('#tblDataMain').DataTable().destroy();
                        document.getElementById("tbodyRequestor").innerHTML=vHTML;
                       $('#tblDataMain').DataTable({ 
	                  "order": [[5,'dsc']],
	                  // scrollY: "300px",
                       //scrollX:  true,
                       //  scrollCollapse: true,
                         paging:true,
                         "bSort": false,
       					 "bInfo": false,
						  "bFilter": true
						  			} );
														
															
                    }
                    else  
                    {
                        vHTML ="<tr><td colspan='15'><font face='Calibri' size='2'>No Employee Addition Deletion</font></td></tr>"; 
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
  
  
  /*if(InvoiceNumber == null || InvoiceNumber == undefined || InvoiceNumber == '')
 {
     document.getElementById("panelshow").style.display = 'none';
     document.getElementById("showvendor").style.display = 'none';

}*/
 