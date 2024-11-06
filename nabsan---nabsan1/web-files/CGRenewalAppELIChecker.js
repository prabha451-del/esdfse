var loggedInUserId = '';
var loggedInUserName = '';
var loggedInUserEmail = '';
$(document).ready(function (){
	loggedInUserId = $('#fpo-user-contact-id').val();
	loggedInUserName = $('#fpo-user-contact-name').val();
	loggedInUserEmail = $('#fpo-user-email').val();
Navigation();    
TaxInvoicesGet();
SOEMaster();
Dashboard();

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

    var SOEColl;
    function SOEMaster() {
    var requestUri = location.origin + "/_api/cr6fc_soedetailses?$select=*&$top=5000";
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
function SubmitData()
{

window.location.href="https://nabardmumbai.sharepoint.com/sites/FPOCGPortalUAT/SitePages/CGApplicationForm_Backup01March.aspx";

}
function OpenXL()
{
//window.location.href="/sites/FPOCGPortal/SitePages/CGApplicationExcelUpload.aspx";
window.location.href="/sites/FPOCGPortalUAT/SitePages/CGApplicationExcelUpload_Backup16Feb.aspx";
}

var TaxInvoicesColl;
function TaxInvoicesGet() {
    //var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('TaxInvoices')//items?$top=5000&$select=*&$orderby=ID desc";
	var requestUri = location.origin + "/_api/cr6fc_taxinvoiceses?$select=*&$top=5000";
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

function Navigation(){
    var queryList = "";
    queryList = location.origin + "/_api/cr6fc_menumasters?$select=*&$filter=statecode eq 0  and cr6fc_role eq 1 &$orderby=cr6fc_order asc&$top=5000"; 
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

function Dashboard(){
//var LoginName=_spPageContextInfo.userId; 

    var queryList = "";


queryList = location.origin+"/_api/cr6fc_cgaplications?$select=cr6fc_cgaplicationid,cr6fc_name,cr6fc_nameoffpo,cr6fc_status,createdon,cr6fc_accountno,cr6fc_sanctionedamount,cr6fc_guaranteestartdate,cr6fc_cgstatus&$filter=cr6fc_eilcheckeremailid eq '"+loggedInUserEmail+"' and cr6fc_status eq 15 &$top=5000"; 
//queryList = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('CGApplications')/Items?$select=*,Created&$filter=AuthorId eq '"+LoginName+"' and Status eq 'Guarantee Issued'&$top=5000&$orderby=ID desc"; 

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
                 if(Loggs.length>0)
                 {
                  var vHTML=''; 
             	  var vURLEdit1='';
                for(var i=0;i<Loggs.length; i++)
                { 
                  var vURLView =location.origin + "/RenewalCGApplication/?Item="+Loggs[i].cr6fc_cgaplicationid;
                  var vURLRenew ="";
                  /*
                  var status='';
                  if(Loggs[i].Status=="Review by NABSaranrakshan" || Loggs[i].Status=="Submitted to NabSanrakshan")
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
                  if(Loggs[i].cr6fc_sanctionedamount!=null && Loggs[i].cr6fc_sanctionedamount!='')
                  {
                  	SanctionedAmount=Loggs[i].cr6fc_sanctionedamount;
                  }
					var CGPANNo='';
                    var filterTaxData = $.grep(TaxInvoicesColl, function (value) 
				    {
				        return (value.cr6fc_cgid == Loggs[i].cr6fc_cgaplicationid);
				    });
				    if(filterTaxData.length>0)
				    {
				    	CGPANNo=filterTaxData[0].cr6fc_cgpan;
				    }
					
					var filterSOEData = $.grep(SOEColl, function (value) 
				    {
				        return (value.cr6fc_wfid == Loggs[i].cr6fc_cgaplicationid);
				    });
				    var  UTREligible = '';				    				    
				    if(filterSOEData.length>0)
					{
						//SoENo=filterSOEData[0].Title;
						UTREligible=filterSOEData[0].cr6fc_eligibleguranteecover;
						//SOECGFee=filterSOEData[0].CreditGuaranteeFee;
					}
					var checkno="<input type='checkbox' id='fullhide'  class='checkbox' name='delete' value="+Loggs[i].cr6fc_cgaplicationid+">"
                    vHTML += "<tr style='line-height: 16px;'>"+	
								"<td style='color:Black; text-align:center'>"+CGPANNo+"</td>"+
								"<td style='color:Black; text-align:center'>"+Loggs[i].cr6fc_nameoffpo+"</td>"+
							    "<td style='color:Black; text-align:center'>"+UTREligible+"</td>"+																
								"<td style='color:Black; text-align:center'>"+GetCreatedDateTime(Loggs[i].cr6fc_guaranteestartdate)+"</td>"+
								"<td style='color:Black; text-align:center'>"+Loggs[i]['cr6fc_cgstatus@OData.Community.Display.V1.FormattedValue']+"</td>"+
								"<td style='color:Black; text-align:center'>"+Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue']+"</td>"+
								"<td style='color:Black; text-align:center;margin:0; padding-top: 15px !important;'>"+vURLRenew+"</td>"+
								"<td style='color:Black; text-align:center; display:none;'>"+Loggs[i].cr6fc_cgaplicationid+"</td>"+
								"</tr>";														                                       																					
                    }
                    
                    if(vHTML != "")
                    {   
                        $('#tblDataMain').DataTable().clear();
                        $('#tblDataMain').DataTable().destroy();
                        document.getElementById("tbodyRequestor").innerHTML=vHTML;
                      	                  $('#tblDataMain').DataTable({ 
	                  "order": [[5,'dsc']],
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
        queryList = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('CGApplication')/Items?$select=*,Created&$filter=(AuthorId eq '"+LoginName+"' and Status eq '"+ddlStatus+"' )&$top=5000&$orderby=ID asc"; 
          }
       else{
        queryList = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('CGApplication')/Items?$select=*,Created&$filter=AuthorId eq '"+LoginName+"'&$top=5000&$orderby=ID asc"; 

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
                  var vURLView ="https://nabardmumbai.sharepoint.com/sites/FPOCGPortalUAT/SitePages/CGApplicationViewForm.aspx?Item="+Loggs[i].ID;
                 	var Status = Loggs[i].Status;
                  if(Status == "Sent Back by ELI Checker" || Status =="Saved"){
                  		//vURLEdit1 ="https://nabardmumbai.sharepoint.com/sites/FPOCGPortal/SitePages/CGApplicationEditForm.aspx?Item="+Loggs[i].ID;
                  		vURLEdit1 ="https://nabardmumbai.sharepoint.com/sites/FPOCGPortalUAT/SitePages/CGApplicationEditForm_Backup26Feb_copy(1).aspx?Item="+Loggs[i].ID;
                  	vURLEdit1 =	"<a href='"+vURLEdit1+"'  title='Edit Form' style='margin:0;Padding:0;'><i class='fa fa-pencil' aria-hidden='true'></i></a>"
                  }
                  else if(Status == "Approved by NABSaranrakshan") {
                       vURLEdit1 ="https://nabardmumbai.sharepoint.com/sites/FPOCGPortalUAT/SitePages/ELIMakerUTRDetails.aspx?Item="+Loggs[i].ID;
                  	vURLEdit1 =	"<a href='"+vURLEdit1+"'  title='Enter UTR Details' style='margin:0;Padding:0;'><i class='fa fa-pencil' aria-hidden='true'></i></a>"
                  }
                  else{
                     vURLEdit1 = "";
                  }
				var checkno="<input type='checkbox' id='fullhide' class='checkbox' name='delete' value="+Loggs[i].ID+">"
                    vHTML += "<tr style='line-height: 16px;'>"+	
	      				
							//"<td style='text-align:center'>"+checkno+"</td>"+//commented by shivaprabha
							"<td style='text-align:center'>"+Loggs[i].Title+"</td>"+
								"<td style='text-align:center'>"+ GetCreatedDateTime(Loggs[i].GuaranteeStartDate)+"</td>"+
							//"<td style='text-align:center'>"+Loggs[i].NameOfFPO+"</td>"+
						   // "<td style='text-align:center'>"+ GetCreatedDateTime(Loggs[i].Created)+"</td>"+
					        "<td style='text-align:center'>"+Loggs[i].NameOfFPO+"</td>"+
					       // "<td style='text-align:center'>"+ GetCreatedDateTime(Loggs[i].Created)+"</td>"+
					        //"<td style='text-align:center'>"+GetCreatedDate(Loggs[i].JoiningDate)+"</td>"+
							"<td style='text-align:center'>"+Loggs[i].AccountNo+"</td>"+
							"<td style='text-align:center'>"+Loggs[i].SanctionedAmount+"</td>"+
						//	"<td style='text-align:center'>"+GetCreatedDateTime(Loggs[i].DateOfSanction)+"</td>"+
							"<td style='text-align:center'>"+Loggs[i].CGStatus+"</td>"+
						   "<td style='text-align:center; margin:0; padding-top: 15px !important;'>"+vURLEdit1+"<a href='"+vURLView+"'  style='margin:0;Padding:0;'><i class='fa fa-bars' aria-hidden='true'></i></a></td>"+
	      					//"<td style='text-align:center'></td>"+
						 //"<td style='text-align:center'>"+GetCreatedDate(Loggs[i].DateOfBirth)+"</td>"+	
							
							//"<td><a href='" + vURLView+ "' target='_blank'><b><font color='#0048BA'>View</font></b></a></td>" +

							//"<td><a href='" + vURLEdit+ "' target='_blank'><b><font color='#0048BA'>Edit</font></b></a></td>" +
						
								"<td style='text-align:center; display:none;'>"+Loggs[i].ID+"</td>"+
					
							"</tr>";
							
							                                       							
							
							
                    }
                    
                    if(vHTML != "")
                    {   
                        $('#tblDataMain').DataTable().clear();
                        $('#tblDataMain').DataTable().destroy();
                        document.getElementById("tbodyRequestor").innerHTML=vHTML;
                      	$('#tblDataMain').DataTable({ 
	                  "order": [[5,'dsc']],
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