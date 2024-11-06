var loggedInUserId = '';
var loggedInUserName = '';
var loggedInUserEmail = '';
$(document).ready(function () {
loggedInUserId = $('#fpo-user-contact-id').val();
loggedInUserName = $('#fpo-user-contact-name').val();
loggedInUserEmail = $('#fpo-user-email').val();
SOEMaster();
TaxInvoicesGet();
Dashboard();
Navigation();

}); 
function Navigation() {
    var queryList = "";
    queryList = location.origin+"/_api/cr6fc_menumasters?$select=cr6fc_link,cr6fc_name&$filter=statecode eq 0  and cr6fc_role eq 2&$orderby=cr6fc_order asc&$top=5000";
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
    
function Dashboard(){
//var LoginName=_spPageContextInfo.userId; 
var queryList = "" ;
//queryList = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('RenewalCGApplication')/Items?$select=*&$filter=NSCheckerId eq '"+LoginName+"' and (Status eq 'Submitted to NabSanrakshan'  or Status eq 'Sent Back by NABSaranrakshan' or Status eq 'Review by NABSaranrakshan' or Status eq 'Recommend for Rejection' or Status eq 'Rejected by NABSaranrakshan')&$top=5000&$orderby=ID desc"; 
//13-01-2024
//queryList = location.origin + "/_api/cr6fc_renewalcgapplications?$select=*&$filter=(cr6fc_status eq 6 or cr6fc_status eq 3 or cr6fc_status eq 7 or cr6fc_status eq 16 or cr6fc_status eq 9) and _cr6fc_nschecker_value eq '"+loggedInUserId+"'&$top=5000";
//13-01-2024
queryList = location.origin + "/_api/cr6fc_renewalcgapplications?$select=cr6fc_renewalcgapplicationid,cr6fc_status,cr6fc_nameoflendinginstitution,cr6fc_nameoffpo,cr6fc_parentid,cr6fc_guaranteestartdate,cr6fc_cgstatus&$filter=(cr6fc_status eq 6 or cr6fc_status eq 3 or cr6fc_status eq 7 or cr6fc_status eq 16 or cr6fc_status eq 9) and _cr6fc_nschecker_value eq '"+loggedInUserId+"'&$top=5000";
/*Select=cr6fc_TypeOfBank&$expand=cr6fc_TypeOfBank($select=cr6fc_banktypeid,cr6fc_name)*/
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
                    var vURLEdit='';
                    var EditLink='';
                    if(Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue']=="Submitted to NabSanrakshan" || Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue']=="Sent Back by NABSaranrakshan")
                    {
                 	vURLEdit =location.origin + "/NSCheckerAPF/?Item="+Loggs[i].cr6fc_renewalcgapplicationid;
                 	
                 	EditLink ="<a href='"+vURLEdit+"' target='_blank' style='margin:0;Padding:0;'><i class='fa fa-edit' aria-hidden='true'></i></a>";
                 	
                 	vURLView =location.origin + "/ViewFormRenewalNS/?Item="+Loggs[i].cr6fc_renewalcgapplicationid;
                 	
                 	ViewLink="<a href='"+vURLView+"' target='_blank' style='margin:0;Padding:0;'><i class='fa fa-bars' aria-hidden='true'></i></a>";
	                }
	                 else
	                 {
	                 	vURLView =location.origin+"/ViewFormRenewalNS/?Item="+Loggs[i].cr6fc_renewalcgapplicationid+"&Page=NSChecker";
	                 	
	                 	ViewLink="<a href='"+vURLView+"' target='_blank' style='margin:0;Padding:0;'><i class='fa fa-bars' aria-hidden='true'></i></a>";
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


                    vHTML += "<tr style='line-height: 16px;'>"+
                    		"<td style='text-align:center'>"+Loggs[i].cr6fc_nameoflendinginstitution+"</td>"+	
                    		"<td style='text-align:center'>"+CGPANNo+"</td>"+
							"<td style='text-align:center'>"+Loggs[i].cr6fc_nameoffpo+"</td>"+
							"<td style='text-align:center'>"+UTREligible+"</td>"+
							"<td style='text-align:center'>"+ GetCreatedDateTime(Loggs[i].cr6fc_guaranteestartdate)+"</td>"+														
							"<td style='text-align:center'>"+Loggs[i]['cr6fc_cgstatus@OData.Community.Display.V1.FormattedValue']+"</td>"+
                            "<td style='text-align:center'>"+Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue']+"</td>"+
						   	"<td style='text-align:center; display:flex; margin:0; padding:0;'>"+EditLink+""+ViewLink+"</td>"+						
							"<td style='text-align:center;display:none !Important;'>"+Loggs[i].cr6fc_renewalcgapplicationid+"</td>"+					
							"</tr>";
							
							                                       							
							
							
                    }
                    
                    if(vHTML != "")
                    {   
                        $('#tblDataMain').DataTable().clear();
                        $('#tblDataMain').DataTable().destroy();
                        document.getElementById("tbodyRequestor").innerHTML=vHTML;
                      	$('#tblDataMain').DataTable(/*{ 
	                    "order": [[6,'dsc']],
	                  // scrollY: "300px",
                       // scrollX:  true,
                       //  scrollCollapse: true,
                         paging:true,
                         "bSort": true,
       					 "bInfo": false,
						  "bFilter": true
						  			} */);
														
															
                    }
                    else  
                    {
                        vHTML ="<tr><td colspan='15'><font face='Calibri' size='2'>No CG Application Data</font></td></tr>"; 
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
	var requestUri = location.origin + "/_api/cr6fc_taxinvoiceses?$select=cr6fc_cgid,cr6fc_cgpan&$top=5000";
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
                 var vURLView ="/sites/FPOCGPortalUAT/SitePages/Renewal Application/ViewRenewalNS.aspx?Item="+Loggs[i].ID+"&Page=NSChecker";
                //https://sharepointistech.sharepoint.com/sites/NABSANRAKSHAN/SitePages/CGApplicationEditForm.aspx
				//var vURLEdit ="";

                    vHTML += "<tr style='line-height: 16px;'>"+
                    		"<td style='text-align:center'>"+Loggs[i].NameOfLendingInstitution+"</td>"+	
						    "<td style='text-align:center'>"+Loggs[i].CGPAN+"</td>"+
						    "<td style='text-align:center'>"+GetCreatedDateTime(Loggs[i].Created)+"</td>"+
						 //   "<td style='text-align:center'>"+Loggs[i].NameOfLendingInstitution+"</td>"+
					        "<td style='text-align:center'>"+Loggs[i].NameOfFPO+"</td>"+
					      //  "<td style='text-align:center'>"+GetCreatedDateTime(Loggs[i].Created)+"</td>"+
							"<td style='text-align:center'>"+Loggs[i].AccountNo+"</td>"+
							"<td style='text-align:center'>"+Loggs[i].SanctionedAmount+"</td>"+
							//"<td style='text-align:center'>"+GetCreatedDateTime(Loggs[i].Created)+"</td>"+
							"<td style='text-align:center'>"+Loggs[i].Status+"</td>"+
						   	"<td style='text-align:center; display:flex; margin:0; padding:0;'><a href='"+vURLView+"' target='_blank' style='margin:0;Padding:0;'><i class='fa fa-eye' aria-hidden='true'></i></a></td>"+						
							"<td style='text-align:center; display:none;'>"+Loggs[i].ID+"</td>"+					
							"</tr>";														                                       															
                    }
                    
                    if(vHTML != "")
                    {   
                        $('#tblDataMain').DataTable().clear();
                        $('#tblDataMain').DataTable().destroy();
                        document.getElementById("tbodyRequestor").innerHTML=vHTML;
                      	$('#tblDataMain').DataTable({ 
	                  "order": [[6,'dsc']],
	                  // scrollY: "300px",
                       // scrollX:  true,
                       //  scrollCollapse: true,
                         paging:true,
                         "bSort": true,
       					 "bInfo": false,
						  "bFilter": true
					});
														
															
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

 