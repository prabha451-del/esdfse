var loggedInUserId = '';
var loggedInUserName = '';
var loggedInUserEmail = '';
$(document).ready(function (){
	loggedInUserId = $('#fpo-user-contact-id').val();
	loggedInUserName = $('#fpo-user-contact-name').val();
	loggedInUserEmail = $('#fpo-user-email').val();
    Navigation();
SOEMaster();
TaxMaster();
// Dashboard();
EliMasterData(loggedInUserEmail);


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
        function Navigation() {
            var queryList = "";
            queryList = location.origin+"/_api/cr6fc_menumasters?$select=cr6fc_link,cr6fc_name&$filter=statecode eq 0  and cr6fc_role eq 0&$orderby=cr6fc_order asc&$top=5000";
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
            let URL = location.origin+"/_api/cr6fc_elimasters?$select=cr6fc_lendinginstitute,cr6fc_emailid&$filter= cr6fc_emailid eq '"+loggedInUserEmail+"'";
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
 
 var TaxInvoicesColl;
function TaxMaster() {
    //var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('TaxInvoices')//items?$top=5000&$select=*&$orderby=ID desc";
	var requestUri = location.origin+"/_api/cr6fc_taxinvoiceses?$select=cr6fc_cgid,cr6fc_cgpan&$top=5000";
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

var SOEColl;
function SOEMaster() {
    var requestUri = location.origin+"/_api/cr6fc_soedetailses?$select=cr6fc_wfid,cr6fc_eligibleguranteecover&$top=5000";
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

function SubmitData(){

window.location.href="";

}
/*function OpenXL(){
//window.location.href="/sites/FPOCGPortal/SitePages/CGApplicationExcelUpload.aspx";
window.location.href="/sites/FPOCGPortalUAT/SitePages/CGApplicationExcelUpload_Backup16Feb.aspx";
}*/
    
function Dashboard(){
//var LoginName=_spPageContextInfo.userId; 
var queryList = "";

 queryList = location.origin+"/_api/cr6fc_renewalcgapplications?$select=*&$filter=(cr6fc_status eq 1 or cr6fc_status eq 2 or cr6fc_status eq 4 or cr6fc_status eq 5 or cr6fc_status eq 9 or cr6fc_status eq 6 or cr6fc_status eq null) and cr6fc_nameoflendinginstitution eq '"+nameEliInstitute+"'&$top=5000";
 //queryList = location.origin+"/_api/cr6fc_cgapplicationses?$select=*&$filter=(cr6fc_status eq 2 or cr6fc_status eq 1 or cr6fc_status eq 4 or cr6fc_status eq 5 or cr6fc_status eq 9 or cr6fc_status eq 6  or cr6fc_status eq 7  or cr6fc_status eq 16) and cr6fc_elimakeremailid eq '"+loggedInUserEmail+"'&$top=5000&$orderby=cr6fc_name asc"; 
   //var requestHeaders = { "accept": "application/json;odata=verbose" };

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
                 if(Loggs.length>0)
                 {
                 var vHTML=''; 
             	 var vURLEdit1='';
                  for(var i=0;i<Loggs.length; i++)
                    { 
                    var vURLView =location.origin+"/ViewformRenewal/?Item="+Loggs[i].cr6fc_renewalcgapplicationid+"&Page=ELIMaker";
                 	var Status = Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'];
                  if(Status == "Sent Back by ELI Checker" || Status =="Saved"){
                  		//vURLEdit1 ="https://nabardmumbai.sharepoint.com/sites/FPOCGPortal/SitePages/CGApplicationEditForm.aspx?Item="+Loggs[i].ID;
                  		vURLEdit1 =location.origin+"/EditRenewalForm/?Item="+Loggs[i].cr6fc_renewalcgapplicationid;
                  	vURLEdit1 =	"<a href='"+vURLEdit1+"' title='Edit Form' style='margin:0;Padding:0;'><i class='fa fa-pencil' aria-hidden='true'></i></a>"
                  }
                  else if(Status == "Approved by NABSaranrakshan") {
                       vURLEdit1 =location.origin+"/ELIMakerUTRRenewal/?Item="+Loggs[i].cr6fc_renewalcgapplicationid;
                  	vURLEdit1 =	"<a href='"+vURLEdit1+"' title='Enter UTR Details' style='margin:0;Padding:0;'><i class='fa fa-pencil' aria-hidden='true'></i></a>"
                  }
                  else{
                     vURLEdit1 = "";
                  }
                  var status='';
                  /*if(Loggs[i].Status=="Review by NABSaranrakshan" || Loggs[i].Status=="Submitted to NabSanrakshan")
                  {
                  	status=Loggs[i].Status;
                  }
                  else
                  {
                  	status=Loggs[i].Status;
                  }*/
                  var accountno='';
                  if(Loggs[i].cr6fc_accountno!=null && Loggs[i].cr6fc_accountno!='')
                  {
                  	accountno=Loggs[i].cr6fc_accountno;
                  }
                  var SanctionedAmount='';
                  if(Loggs[i].cr6fc_modifiedsanctionedloanamount!=null && Loggs[i].cr6fc_modifiedsanctionedloanamount!='')
                  {
                  	SanctionedAmount=Loggs[i].cr6fc_modifiedsanctionedloanamount;
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
						//SoENo=filterSOEData[0].Title;
						UTREligible=filterSOEData[0].cr6fc_eligibleguranteecover;
						//SOECGFee=filterSOEData[0].CreditGuaranteeFee;
					}
                  
				var checkno="<input type='checkbox' id='fullhide'  class='checkbox' name='delete' value="+Loggs[i].cr6fc_renewalcgapplicationid+">"
                    vHTML += "<tr style='line-height: 16px;'>"+	
							"<td style='text-align:center'>"+CGPANNo+"</td>"+
							"<td style='text-align:center'>"+Loggs[i].cr6fc_nameoffpo+"</td>"+
							"<td style='text-align:center'>"+UTREligible+"</td>"+
							"<td style='text-align:center'>"+GetCreatedDateTime(Loggs[i].cr6fc_guaranteestartdate)+"</td>"+
							"<td style='text-align:center'>"+Loggs[i]['cr6fc_cgstatus@OData.Community.Display.V1.FormattedValue']+"</td>"+
							"<td style='text-align:center'>"+Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue']+"</td>"+
							"<td style='text-align:center;margin:0; padding-top: 15px !important;'>"+vURLEdit1+"<a href='"+vURLView+"'  style='margin:0;'><i class='fa fa-bars' style='position: inherit !important;' aria-hidden='true'></i></a></td>"+
							"<td style='text-align:center; display:none;'>"+Loggs[i].cr6fc_renewalcgapplicationid+"</td>"+							
                            
							"</tr>";
							
							                                       							
							
							
                    }
                    
                    if(vHTML != "")
                    {   
                        $('#tblDataMain').DataTable().clear();
                        $('#tblDataMain').DataTable().destroy();
                        document.getElementById("tbodyRequestor").innerHTML=vHTML;
                      	$('#tblDataMain').DataTable({ 
						"order": [[5,'desc']],
						//  scrollY: "300px",
						// scrollX:  true,
						//  scrollCollapse: true,
						paging:true,
						"bInfo": false,
						"bFilter": true
					 } );
														
															
                    }
                    else  
                    {
                        vHTML ="<tr><td colspan='8'><font face='Calibri' size='2'>No Data</font></td></tr>"; 
                        document.getElementById("tbodyRequestor").innerHTML=vHTML;
                        $('#tblDataMain').DataTable();
                    }          
              
                 }
                else  
                    {
                        vHTML ="<tr><td><font face='Calibri' size='2'>No Data</font></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>"; 
                        document.getElementById("tbodyRequestor").innerHTML=vHTML;
                        $('#tblDataMain').DataTable();
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
function BindHomeDetails(ddlStatus) {
debugger;
       var LoginName=_spPageContextInfo.userId; 
       var ddlStatus = document.getElementById("ddlStatus").value;
        var vHTML = "";
    var queryList = "";
       if ( ddlStatus !== "All") {
        queryList = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('RenewalCGApplication')/Items?$select=*,Created&$filter=(AuthorId eq '"+LoginName+"' and Status eq '"+ddlStatus+"' )&$top=5000&$orderby=ID desc"; 
          }
       else{
        queryList = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('RenewalCGApplication')/Items?$select=*,Created&$filter=AuthorId eq '"+LoginName+"'&$top=5000&$orderby=ID desc"; 

       }
       
   
    var requestHeaders = { "accept": "application/json;odata=verbose" };
    $.ajax({
        url: queryList,
        contentType: "application/json;odata=verbose",
        headers: requestHeaders,
        async: false,
        cache: false,
        success: function (data) {
     
            
            try
            {
                 var Loggs= data.d.results;
                 
                var vHTML=''; 
                var vURLEdit1='';
                  for(var i=0;i<Loggs.length; i++)
                    { 
                  var vURLView ="https://nabardmumbai.sharepoint.com/sites/FPOCGPortalUAT/SitePages/Renewal Application/ViewRenewalApplicationForm.aspx?Item="+Loggs[i].ID+"&Page=ELIMaker";
                 	var Status = Loggs[i].Status;
                  if(Status == "Sent Back by ELI Checker" || Status =="Saved"){
                  		//vURLEdit1 ="https://nabardmumbai.sharepoint.com/sites/FPOCGPortal/SitePages/CGApplicationEditForm.aspx?Item="+Loggs[i].ID;
                  		vURLEdit1 =location.origin+"/EditRenewalForm/?Item="+Loggs[i].ID;
                  	vURLEdit1 =	"<a href='"+vURLEdit1+"'  title='Edit Form' style='margin:0;Padding:0;'><i class='fa fa-pencil' aria-hidden='true'></i></a>"
                  }
                  else if(Status == "Approved by NABSaranrakshan") {
                       vURLEdit1 ="https://nabardmumbai.sharepoint.com/sites/FPOCGPortalUAT/SitePages/ELIMakerUTRDetails.aspx?Item="+Loggs[i].ID;
                  	vURLEdit1 =	"<a href='"+vURLEdit1+"'  title='Enter UTR Details' style='margin:0;Padding:0;'><i class='fa fa-pencil' aria-hidden='true'></i></a>"
                  }
                  else{
                     vURLEdit1 = "";
                  }
                  var filterSOEData = $.grep(SOEColl, function (value) 
				    {
				        return (value.WFID == Loggs[i].Parentid);
				    });	

                  var UTREligible='';			    				    
				    if(filterSOEData.length>0)
					{
						//SoENo=filterSOEData[0].Title;
						UTREligible=filterSOEData[0].EligibleGuranteeCover;
						//SOECGFee=filterSOEData[0].CreditGuaranteeFee;
					}
                  

				var checkno="<input type='checkbox' id='fullhide' class='checkbox' name='delete' value="+Loggs[i].ID+">"
                    vHTML +=  "<tr style='line-height: 16px;'>"+	
							"<td style='text-align:center'>"+Loggs[i].CGPAN+"</td>"+
							"<td style='text-align:center'>"+Loggs[i].NameOfFPO+"</td>"+
							"<td style='text-align:center'>"+UTREligible+"</td>"+
							"<td style='text-align:center'>"+GetCreatedDateTime(Loggs[i].GuaranteeStartDate)+"</td>"+
							"<td style='text-align:center'>"+Loggs[i].CGStatus+"</td>"+
							"<td style='text-align:center'>"+Loggs[i].Status+"</td>"+
							"<td style='text-align:center;margin:0; padding-top: 15px !important;'>"+vURLEdit1+"<a href='"+vURLView+"'  style='margin:0;Padding:0;'><i class='fa fa-bars' aria-hidden='true'></i></a></td>"+	      										
							"<td style='text-align:center; display:none;'>"+Loggs[i].ID+"</td>"+							
							"</tr>";
					
	            }
                    
                    if(vHTML != "")
                    {   
                        $('#tblDataMain').DataTable().clear();
                        $('#tblDataMain').DataTable().destroy();
                        document.getElementById("tbodyRequestor").innerHTML=vHTML;
                      	                  $('#tblDataMain').DataTable({ 
	                  "order": [[5,'desc']],
	                 //  scrollY: "300px",
                       // scrollX:  true,
                       //  scrollCollapse: true,
                         paging:true,
       					 "bInfo": false,
						  "bFilter": true
					 } );
														
															
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