var loggedInUserId = '';
var loggedInUserName = '';
var loggedInUserEmail = '';
$(document).ready(function (){
        loggedInUserId = $('#fpo-user-contact-id').val();
        loggedInUserName = $('#fpo-user-contact-name').val();
        loggedInUserEmail = $('#fpo-user-email').val();
UTRMaster();
SOEMaster();
TaxInvoicesGet();
Dashboard();
Navigation();

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
function Navigation() {
    var queryList = "";
    queryList = location.origin+"/_api/cr6fc_menumasters?$select=*&$filter=statecode eq 0  and cr6fc_role eq 2&$orderby=cr6fc_order asc&$top=5000";
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
function SubmitData(){

window.location.href="";

}
function OpenXL(){
window.location.href="";

}

var UTRColl;
function UTRMaster() {
    //var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('UTRDetails')//items?$top=5000&$select=*,CGID&$orderby=ID desc";
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
 

    
function Dashboard(){
    var queryList = "";

 //queryList = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('CGApplications')/Items?$select=*&$filter=NSCheckerId eq '"+LoginName+"' and (Status eq 'Submitted to NabSanrakshan' or Status eq 'Approved by NabSaranrakshan' or  Status eq 'Rejected by NabSaranrakshan')&$top=5000&$orderby=ID asc"; 
 //queryList = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('RenewalCGApplication')/Items?$select=*&$filter=NSCheckerId eq '"+LoginName+"' and (Status eq 'Guarantee Issued')&$top=5000&$orderby=ID desc"; 
 queryList = location.origin + "/_api/cr6fc_renewalcgapplications?$select=cr6fc_status,cr6fc_nameoflendinginstitution,cr6fc_renewalcgapplicationid,cr6fc_cgstatus,cr6fc_cgpan,cr6fc_nameoffpo,cr6fc_guaranteestartdate,cr6fc_parentid&$filter=_cr6fc_nschecker_value eq '"+loggedInUserId+"' and (cr6fc_status eq 15)&$top=5000";
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
             
                  for(var i=0;i<Loggs.length; i++)
                    { 
                    var vURLView='';
                    var ViewLink='';
                    var ViewLink123 ='';
                    var Status = Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'];
                    if(Status=="Guarantee Renewed")
                    {
                      vURLView =location.origin + "/ViewRenewalCGIssued/?Item="+Loggs[i].cr6fc_renewalcgapplicationid+"&Page=NSCheckerCGPay";
                      var vURLViewrenewed = location.origin + "/ViewformRenewal/?Item="+Loggs[i].cr6fc_renewalcgapplicationid+"";

                  	  ViewLink="<a href='"+vURLView+"' target='_blank' style='margin:0;Padding:0;padding-left: 20px;'><i class='fa fa-bars' aria-hidden='true'></i></a>";
                  	  ViewLink123="<a href='"+vURLViewrenewed+"' target='_blank' style='margin:0;Padding:0;padding-left: 20px;'><i class='fa fa-bars' aria-hidden='true'></i></a>";
                    }
                    else if(Status=="Payment Processed by ELI")
                    {
                      vURLView ="/CGFeePaymentVeiwForm/?Item="+Loggs[i].cr6fc_renewalcgapplicationid+"&Page=NSCheckerCGPay";
                    }
					var filterUTRData = $.grep(UTRColl, function (value) 
				    {
				        return (value.cr6fc_cgid == Loggs[i].cr6fc_renewalcgapplicationid);
				    });
				    
				    var UTRDate='';
					if(filterUTRData.length>0)
					{
						UTRDate=GetCreatedDateTime(filterUTRData[0].cr6fc_paymentreceiveddate);
					}
					
					 var filterSOEData = $.grep(SOEColl, function (value) 
				    {
				        return (value.cr6fc_wfid == Loggs[i].cr6fc_renewalcgapplicationid);
				    });
                    var UTREligible;
				    if(filterSOEData.length>0)
					{
						UTREligible=filterSOEData[0].cr6fc_eligibleguranteecover;
					}
					
					var CGPANNo='';
                    var filterTaxData = $.grep(TaxInvoicesColl, function (value) 
				    {
				        return (value.cr6fc_cgid == Loggs[i].cr6fc_renewalcgapplicationid);
				    });				    
				    if(filterTaxData.length>0)
				    {
				    	CGPANNo=filterTaxData[0].cr6fc_cgpan;
				    }



                    vHTML += "<tr style='line-height: 16px;'>"+
                    		"<td style='text-align:center'>"+Loggs[i].cr6fc_nameoflendinginstitution+"</td>"+	
						    "<td style='text-align:center'>"+CGPANNo+"</td>"+
						    //"<td style='text-align:center'>"+GetCreatedDateTime(Loggs[i].Created)+"</td>"+
					        "<td style='text-align:center'>"+Loggs[i].cr6fc_nameoffpo+"</td>"+
					        //"<td style='text-align:center'>"+GetCreatedDate(Loggs[i].JoiningDate)+"</td>"+
							//"<td style='text-align:center'>"+Loggs[i].CGPAN+"</td>"+
							"<td style='text-align:center'>"+UTREligible+"</td>"+
							"<td style='text-align:center'>"+GetCreatedDateTime(Loggs[i].cr6fc_guaranteestartdate)+"</td>"+
							"<td style='text-align:center'>"+Loggs[i]['cr6fc_cgstatus@OData.Community.Display.V1.FormattedValue']+"</td>"+
							"<td style='text-align:center'>"+Status+"</td>"+
						   	"<td style='text-align:center; margin:0; padding:0;'>"+ViewLink+"</td>"+
						   	"<td style='text-align:center; margin:0; padding:0;'>"+ViewLink123+"</td>"+
							"<td style='text-align:center;display:none  !Important;'>"+Loggs[i].cr6fc_renewalcgapplicationid+"</td>"+
					
							"</tr>";
							
							                                       							
							
							
                    }
                    
                    if(vHTML != "")
                    {   
                        $('#tblDataMain').DataTable().clear();
                        $('#tblDataMain').DataTable().destroy();
                        document.getElementById("tbodyRequestor").innerHTML=vHTML;
                      	$('#tblDataMain').DataTable(/*{ 
	                 //  scrollY: "300px",
                       // scrollX:  true,
                         //scrollCollapse: true,
                         paging:true,
       					 "bInfo": false,
						  "bFilter": true
						  			} */);
														
															
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
        error: function (error) {
            console.log(error);
        }
    });
}
function BindHomeDetails() {
debugger;
       var LoginName=_spPageContextInfo.userId; 
       var ddlStatus = document.getElementById("ddlStatus").value;
        var vHTML = "";
    var queryList = "";
       if ( ddlStatus !== "All") {
        queryList = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('RenewalCGApplication')/Items?$select=*&$filter=(NSCheckerId eq '"+LoginName+"' and Status eq '"+ddlStatus+"' )&$top=5000&$orderby=ID desc"; 
          }
       else{
        queryList = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('RenewalCGApplication')/Items?$select=*&$filter=NSCheckerId eq '"+LoginName+"'&$top=5000&$orderby=ID desc"; 

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
             
                  for(var i=0;i<Loggs.length; i++)
                    { 
                 var vURLView ="/sites/FPOCGPortal/SitePages/NSCheckerApprovalForm.aspx?Item="+Loggs[i].ID;
                 //https://sharepointistech.sharepoint.com/sites/NABSANRAKSHAN/SitePages/CGApplicationEditForm.aspx
				//var vURLEdit ="";
				
				  var filterUTRData = $.grep(UTRColl, function (value) 
				    {
				        return (value.CGID == Loggs[i].Id);
				    });
				    
				     //var SoENo='';
				    var UTRDate='';
				    //var SOECGFee='';
					if(filterUTRData.length>0)
					{
						//SoENo=filterSOEData[0].Title;
						UTRDate=GetCreatedDateTime(filterUTRData[0].PaymentReceivedDate);
						//SOECGFee=filterSOEData[0].CreditGuaranteeFee;
					}
					
					 var filterSOEData = $.grep(SOEColl, function (value) 
				    {
				        return (value.WFID == Loggs[i].Id);
				    });
				    if(filterSOEData.length>0)
					{
						//SoENo=filterSOEData[0].Title;
						UTREligible=filterSOEData[0].EligibleGuranteeCover;
						//SOECGFee=filterSOEData[0].CreditGuaranteeFee;
					}


                    vHTML += "<tr style='line-height: 16px;'>"+	
						   "<td style='text-align:center'>"+Loggs[i].Title+"</td>"+
						    //"<td style='text-align:center'>"+GetCreatedDateTime(Loggs[i].Created)+"</td>"+
					        "<td style='text-align:center'>"+Loggs[i].NameOfFPO+"</td>"+
					        //"<td style='text-align:center'>"+GetCreatedDate(Loggs[i].JoiningDate)+"</td>"+
							//"<td style='text-align:center'>"+Loggs[i].CGPAN+"</td>"+
							"<td style='text-align:center'>"+UTREligible+"</td>"+
							"<td style='text-align:center'>"+UTRDate+"</td>"+
							"<td style='text-align:center'>"+Loggs[i].Status+"</td>"+
						   	"<td style='text-align:center; display:flex; margin:0; padding:0;'><a href='"+vURLView+"' target='_blank' style='margin:0;Padding:0;padding-left: 20px;'><i class='fa fa-eye' aria-hidden='true'></i></a></td>"+
						
							"<td style='text-align:center; display:none;'>"+Loggs[i].ID+"</td>"+
					
							"</tr>";
							
							                                       							
							
							
                    }
                    
                    if(vHTML != "")
                    {   
                        $('#tblDataMain').DataTable().clear();
                        $('#tblDataMain').DataTable().destroy();
                        document.getElementById("tbodyRequestor").innerHTML=vHTML;
                      	$('#tblDataMain').DataTable({ 
	                  "order": [[7,'dsc']],
	                  // scrollY: "300px",
                      //  scrollX:  true,
                        // scrollCollapse: true,
                         paging:true,
       					 "bInfo": false,
						  "bFilter": true
						  			} );
														
															
                    }
                    else  
                    {vHTML ="<tr><td colspan='15'><font face='Calibri' size='2'>No CG Application</font></td></tr>"; 

                        //vHTML ="<tr><td colspan='15'><font face='Calibri' size='2'>No Employee Addition Deletion</font></td></tr>"; 
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

var TaxInvoicesColl;
function TaxInvoicesGet() {
	//var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('TaxInvoices')//items?$top=5000&$select=*&$orderby=ID desc";
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
	//var Newtoday = dd + '/' + mm + '/' + yyyy+" "+strTime;
	var Newtoday = dd + '/' + mm + '/' + yyyy;
	return Newtoday ;
 }

 