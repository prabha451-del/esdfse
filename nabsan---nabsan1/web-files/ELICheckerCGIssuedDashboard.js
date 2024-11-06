var loggedInUserId = '';
var loggedInUserName = '';
var loggedInUserEmail = '';
$(document).ready(function (){
loggedInUserId = $('#fpo-user-contact-id').val();
loggedInUserName = $('#fpo-user-contact-name').val();
loggedInUserEmail = $('#fpo-user-email').val();
UTRMaster();
SOEMaster();
TaxMaster();
// Dashboard();
Navigation();
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
var nameEliInstitute;
const EliMasterData = (loggedInUserEmail) =>{
	//let URL = location.origin+"/_api/cr6fc_elimasters?$select=*&$filter= cr6fc_elicheckeremailid eq '"+loggedInUserEmail+"'"; 
	let URL =location.origin+"/_api/cr6fc_elimasters?$select=*&$filter=cr6fc_elicheckeremailid eq '"+loggedInUserEmail+"'";
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

function Navigation(){
    var queryList = "";
   // queryList = "/_api/cr6fc_menumasters?$select=*&$filter=statecode eq 0  and cr6fc_role eq 1&$orderby=cr6fc_order asc&$top=5000"; 
	queryList = location.origin +"/_api/cr6fc_menumasters?$select=*&$filter=statecode eq 0  and cr6fc_role eq 1&$orderby=cr6fc_order asc&$top=5000"; 
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
            try
            {
                 var Loggs= data.value;
                 if(Loggs.length>0)
                 {
                    var vHTML=''; 
                    for(var i=0;i<Loggs.length; i++)
                        { 
                            //vHTML+="<li class='nav-item '><a class='nav-link' href='"+Loggs[i].cr6fc_link+"'>"+Loggs[i].cr6fc_name+"</a></li>"
							vHTML+="<li class='nav-item '><a class='nav-link' href='"+Loggs[i].cr6fc_link+"'>"+Loggs[i].cr6fc_name+"</a></li>"
                        }
                    if(vHTML!='' && vHTML!=null && vHTML!=undefined)
                    {
                        document.getElementById("Navdiv").innerHTML=vHTML;
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
var UTRColl;
function UTRMaster() {
    //var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('UTRDetails')//items?$top=5000&$select=*,CGID&$orderby=ID desc";
	//var requestUri = "/_api/cr6fc_utrdetailses?$select=cr6fc_cgid,cr6fc_paymentreceiveddate&$top=5000";
	var requestUri =location.origin + "/_api/cr6fc_utrdetailses?$select=*,cr6fc_cgid,cr6fc_paymentreceiveddate&$top=5000";
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
		        },
		        error: function () {
		            console.log("error");
		        }
		    });
}
var TaxMasterColl;
function TaxMaster() {
    //var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('TaxInvoices')//items?$top=5000&$select=*&$orderby=ID desc";
	//var requestUri = "/_api/cr6fc_taxinvoiceses?$select=cr6fc_cgpan,cr6fc_cgid&$top=5000";
	var requestUri = location.origin +"/_api/cr6fc_taxinvoiceses?$select=*,cr6fc_cgpan,cr6fc_cgid&$top=5000";
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
		            TaxMasterColl = data.value;
		        },
		        error: function () {
		            console.log("error");
		        }
		    });
}

 var SOEColl;
function SOEMaster() {
    //var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SOEDetails')//items?$top=5000&$select=*,BillToState/State,BillToState/Id,BillToState/StateCode&$expand=BillToState&$orderby=ID desc";
	//var requestUri = "/_api/cr6fc_soedetailses?$select=cr6fc_eligibleguranteecover,cr6fc_wfid&$top=5000";
	var requestUri = location.origin +"/_api/cr6fc_soedetailses?$select=*,cr6fc_eligibleguranteecover,cr6fc_wfid&$top=5000";
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
//var LoginName=_spPageContextInfo.userId; 
    var queryList = "";

 //queryList = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('CGApplications')/Items?$select=*&$filter=ELICheckerId eq '"+LoginName+"' and (Status eq 'Guarantee Issued')&$top=5000&$orderby=ID desc"; 
 //queryList = location.origin+"/_api/cr6fc_cgapplicationses?$select=cr6fc_cgstatus,cr6fc_nameoflendinginstitution,cr6fc_status,cr6fc_cgapplicationsid,cr6fc_status,cr6fc_name,cr6fc_nameoffpo,createdon&$filter=cr6fc_nameoflendinginstitution eq '"+nameEliInstitute+"' and cr6fc_status eq 15 &$top=5000&$orderby=cr6fc_name desc"; 
 //queryList = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('CGApplications')/Items?$select=*&$filter=ELICheckerId eq '"+LoginName+"' and (Status eq 'Guarantee Issued')&$top=5000&$orderby=ID desc"; 
queryList = location.origin+"/_api/cr6fc_cgaplications?$select=cr6fc_cgstatus,cr6fc_nameoflendinginstitution,cr6fc_status,cr6fc_cgaplicationid,cr6fc_status,cr6fc_name,cr6fc_nameoffpo,createdon&$filter=cr6fc_nameoflendinginstitution eq '"+nameEliInstitute+"' and cr6fc_status eq 15 &$top=5000&$orderby=cr6fc_name desc"; 
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
                 var vURLView ="/CGFeePaymentVeiwForm/?Item="+Loggs[i].cr6fc_cgaplicationid;
                 var vURLview2 ="/CGApplicationViewForm/?Item="+Loggs[i].cr6fc_cgaplicationid+"&Page=ELICheckerCGIssued";
                 var ViewLink2="<a href='"+vURLview2+"'  style='margin:0;'><i class='fa fa-bars' aria-hidden='true'></i></a>";
                 //https://nabardmumbai.sharepoint.com/sites/FPOCGPortal/SitePages/CGApplicationEditForm.aspx
				  var Status = Loggs[i].cr6fc_status;
				  				  var vURLEdit ="/CGFeePaymentVeiwForm/?Item="+Loggs[i].cr6fc_cgaplicationid;

                  if(Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == "Pending For Approval" ){
				   var vURLEdit ="CGFeePaymentVeiwForm/?Item="+Loggs[i].cr6fc_cgaplicationid;
                  	vURLEdit1 =	"<a href='"+vURLEdit+"' target='_blank' style='margin:0;Padding:0;'><i class='fa fa-pencil' aria-hidden='true'></i></a>"
                  }
                  else if(Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == "Payment Inititated by ELI")
                  {
                  	var vURLEdit ="/ELICheckerUTRApproverForm/?Item="+Loggs[i].cr6fc_cgaplicationid;
                  	vURLEdit1 =	"<a href='"+vURLEdit+"' target='_blank' style='margin:0;Padding:0;'><i class='fa fa-pencil' aria-hidden='true'></i></a>"
                  }
                  else{
                        vURLEdit1 ="";
                  }
                  var filterCGPANData = $.grep(TaxMasterColl, function (value) 
				    {
				        return (value.cr6fc_cgid == Loggs[i].cr6fc_cgaplicationid);
				    });
				var CGPANNo='';;
				if(filterCGPANData.length>0)
				{
					CGPANNo=filterCGPANData[0].cr6fc_cgpan;	
				}

                   var filterUTRData = $.grep(UTRColl, function (value) 
				    {
				        return (value.cr6fc_cgid == Loggs[i].cr6fc_cgaplicationid);
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
				        return (value.cr6fc_wfid == Loggs[i].cr6fc_cgaplicationid);
				    });
				    if(filterSOEData.length>0)
					{
						//SoENo=filterSOEData[0].Title;
						UTREligible=filterSOEData[0].cr6fc_eligibleguranteecover;
						//SOECGFee=filterSOEData[0].CreditGuaranteeFee;
					}




                    vHTML += "<tr style='line-height: 16px;'>"+		      				
								//"<td style='text-align:center'>"+Loggs[i].cr6fc_name+"</td>"+
								"<td style='text-align:center'>"+Loggs[i].cr6fc_nameoffpo+"</td>"+
								"<td style='text-align:center'>"+CGPANNo+"</td>"+
								"<td style='text-align:center'>"+UTREligible+"</td>"+
								"<td style='text-align:center'>"+UTRDate+"</td>"+
								"<td style='text-align:center'>"+Loggs[i]["cr6fc_cgstatus@OData.Community.Display.V1.FormattedValue"]+"</td>"+
								"<td style='text-align:center;'>"+vURLEdit1+"<a href='"+vURLView+"' target='_blank' style='margin:0;'><i class='fa fa-bars' aria-hidden='true'></i></a></td>"+
								"<td style='text-align:center;'>"+ViewLink2+"</td>"+	      							
								"<td style='text-align:center; display:none;'>"+Loggs[i].createdon+"</td>"+						
								"</tr>";
							"</tr>";						
                    }
                    
                    if(vHTML != "")
                    {   
                        $('#tblDataMain').DataTable().clear();
                        $('#tblDataMain').DataTable().destroy();
                        document.getElementById("tbodyRequestor").innerHTML=vHTML;
                      	                  $('#tblDataMain').DataTable({ 
	                  "order": [[7,'dsc']]
						  			} );
														
															
                    }
                    else  
                    {
                       // vHTML ="<tr><td colspan='15'><font face='Calibri' size='2'>No Employee Addition Deletion</font></td></tr>"; 
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
function BindHomeDetails() {
debugger;
      // var LoginName=_spPageContextInfo.userId; 
       var ddlStatus = document.getElementById("ddlStatus").value;
        var vHTML = "";
    var queryList = "";
       if ( ddlStatus !== "All" && ddlStatus !== "") {
        //queryList = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('CGApplications')/Items?$select=*&$filter=(ELICheckerId eq '"+LoginName+"' and Status eq '"+ddlStatus+"' )&$top=5000"; 
		//queryList = "/_api/cr6fc_cgapplicationses?$select=cr6fc_cgstatus,cr6fc_nameoflendinginstitution,cr6fc_status,cr6fc_cgapplicationsid,cr6fc_status,cr6fc_name,cr6fc_nameoffpo,createdon&$filter=(cr6fc_nameoflendinginstitution eq '" + nameEliInstitute + "' and cr6fc_cgstatus eq " + ddlStatus + ")&$top=5000";
		queryList = "/_api/cr6fc_cgaplications?$select=cr6fc_cgstatus,cr6fc_nameoflendinginstitution,cr6fc_status,cr6fc_cgaplicationid,cr6fc_status,cr6fc_name,cr6fc_nameoffpo,createdon&$filter=(cr6fc_nameoflendinginstitution eq '" + nameEliInstitute + "' and cr6fc_cgstatus eq " + ddlStatus + ")&$top=5000";
          }
       else{
        //queryList = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('CGApplications')/Items?$select=*&$filter=ELICheckerIdeq '"+LoginName+"'&$top=5000&$orderby=ID asc"; 
	//	queryList = "/_api/cr6fc_cgapplicationses?$select=cr6fc_cgstatus,cr6fc_nameoflendinginstitution,cr6fc_status,cr6fc_cgapplicationsid,cr6fc_status,cr6fc_name,cr6fc_nameoffpo,createdon&$filter=cr6fc_nameoflendinginstitution eq '" + loggedInUserEmail + "'&$top=5000";
		queryList = "/_api/cr6fc_cgaplications?$select=cr6fc_cgstatus,cr6fc_nameoflendinginstitution,cr6fc_status,cr6fc_cgaplicationid,cr6fc_status,cr6fc_name,cr6fc_nameoffpo,createdon&$filter=cr6fc_nameoflendinginstitution eq '" + loggedInUserEmail + "'&$top=5000";
       }
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
              var vURLEdit1 = '';
                  for(var i=0;i<Loggs.length; i++)
                    { 
				  var vURLEdit ="/ELICheckerApproverForm/?Item="+Loggs[i].cr6fc_cgaplicationid;
                  var vURLView ="/ELICheckerApproverForm/?Item="+Loggs[i].cr6fc_cgaplicationid;
				  var Status = Loggs[i].Status;
				  var vURLview2 ="/CGApplicationViewForm/?Item="+Loggs[i].cr6fc_cgaplicationid+"&Page=ELICheckerCGIssued";
				  var ViewLink2="<a href='"+vURLview2+"'  style='margin:0;'><i class='fa fa-bars' aria-hidden='true'></i></a>";
				   var vURLEdit ="/ELICheckerApproverForm/?Item="+Loggs[i].cr6fc_cgaplicationid;

                  if(Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == "Pending For Approval" ){
				   var vURLEdit ="/ELICheckerApproverForm/?Item="+Loggs[i].cr6fc_cgaplicationid;
                  	vURLEdit1 =	"<a href='"+vURLEdit+"' target='_blank' style='margin:0;Padding:0;'><i class='fa fa-pencil' aria-hidden='true'></i></a>"
                  }
                  else{
                        vURLEdit1 ="";
                  }
                  var filterCGPANData = $.grep(TaxMasterColl, function (value) 
				    {
				        return (value.cr6fc_cgid == Loggs[i].cr6fc_cgaplicationid);
				    });
				var CGPANNo='';;
				if(filterCGPANData.length>0)
				{
					CGPANNo=filterCGPANData[0].cr6fc_cgpan;	
				}
				var filterUTRData = $.grep(UTRColl, function (value) 
				    {
				        return (value.cr6fc_cgid == Loggs[i].cr6fc_cgaplicationid);
				    });

				var filterUTRData = $.grep(UTRColl, function (value) 
				    {
				        return (value.cr6fc_cgid == Loggs[i].cr6fc_cgaplicationid);
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
				        return (value.cr6fc_wfid == Loggs[i].cr6fc_cgaplicationid);
				    });
				    if(filterSOEData.length>0)
					{
						//SoENo=filterSOEData[0].Title;
						UTREligible=filterSOEData[0].cr6fc_eligibleguranteecover;
						//SOECGFee=filterSOEData[0].CreditGuaranteeFee;
					}


                    vHTML += "<tr style='line-height: 16px;'>"+	
								//"<td style='text-align:center'>"+Loggs[i].cr6fc_name+"</td>"+
								"<td style='text-align:center'>"+Loggs[i].cr6fc_nameoffpo+"</td>"+
								"<td style='text-align:center'>"+CGPANNo+"</td>"+
								"<td style='text-align:center'>"+UTREligible+"</td>"+
								"<td style='text-align:center'>"+UTRDate+"</td>"+
								"<td style='text-align:center'>"+Loggs[i]["cr6fc_cgstatus@OData.Community.Display.V1.FormattedValue"]+"</td>"+
								"<td style='text-align:center;'>"+vURLEdit1+"<a href='"+vURLView+"' target='_blank' style='margin:0;'><i class='fa fa-bars' aria-hidden='true'></i></a></td>"+
								"<td style='text-align:center;'>"+ViewLink2+"</td>"+	      							
								"<td style='text-align:center; display:none;'>"+Loggs[i].cr6fc_cgaplicationid+"</td>"+
					
							"</tr>";
                    }
                    
                    if(vHTML != "")
                    {   
                       // $('#tblDataMain').DataTable().clear();
                        $('#tblDataMain').DataTable().destroy();
                        document.getElementById("tbodyRequestor").innerHTML=vHTML;
                       $('#tblDataMain').DataTable({ 
	                  "order": [[7,'dsc']],
	                  /* scrollY: "300px",
                        scrollX:  true,
                         scrollCollapse: true,
                         paging:true,
                         "bSort": false,
       					 "bInfo": false,
						  "bFilter": true
					   */} );
														
															
                    }
                    else  
                    {
                       // vHTML ="<tr><td colspan='15'><font face='Calibri' size='2'>No Employee Addition Deletion</font></td></tr>"; 
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
 