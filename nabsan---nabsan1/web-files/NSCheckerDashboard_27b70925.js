var loggedInUserId = '';
var loggedInUserName = '';
var loggedInUserEmail = '';
$(document).ready(function (){
loggedInUserId = $('#fpo-user-contact-id').val();
loggedInUserName = $('#fpo-user-contact-name').val();
loggedInUserEmail = $('#fpo-user-email').val();
Navigation();
Dashboard();

}); 
$(document).ready(function(){
    $('li:first-child a').addClass('active');
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
function Navigation(){
    var queryList = "";
    queryList = location.origin +"/_api/cr6fc_menumasters?$select=cr6fc_link,cr6fc_name&$filter=statecode eq 0  and cr6fc_role eq 2&$orderby=cr6fc_order asc&$top=5000"; 
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
                            vHTML+="<li class='nav-item'><a class='nav-link' href='"+Loggs[i].cr6fc_link+"'>"+Loggs[i].cr6fc_name+"</a></li>"
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
//queryList = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('CGApplications')/Items?$select=*&$filter=NSCheckerId eq '"+LoginName+"' and (Status eq 'Submitted to NabSanrakshan'  or Status eq 'Sent Back by NABSaranrakshan' or Status eq 'Review by NABSaranrakshan' or Status eq 'Recommend for Rejection' or Status eq 'Rejected by NABSaranrakshan' or Status eq 'Approved by NABSaranrakshan')&$top=5000&$orderby=ID desc"; 
queryList = location.origin +"/_api/cr6fc_cgaplications?$select=cr6fc_status,cr6fc_cgaplicationid,cr6fc_nameoflendinginstitution,cr6fc_name,createdon,cr6fc_nameoffpo,cr6fc_accountno,cr6fc_sanctionedamount&$filter=_cr6fc_nschecker_value eq "+loggedInUserId+" and (cr6fc_status eq 6 or cr6fc_status eq 4 or cr6fc_status eq 3 or cr6fc_status eq 16 or cr6fc_status eq 9 or cr6fc_status eq 8 or cr6fc_status eq 7 )&$top=5000"; 
//queryList = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('CGApplications')/Items?$select=*&$filter=NSCheckerId eq '"+LoginName+"' and (Status eq 'Submitted to NabSanrakshan' or Status eq 'Approved by NabSaranrakshan' or  Status eq 'Rejected by NabSaranrakshan')&$top=5000&$orderby=ID asc"; 
// queryList = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('CGApplications')/Items?$select=*&$filter=NSCheckerId eq '"+LoginName+"' and (Status eq 'Submitted to NabSanrakshan'  or Status eq 'Sent Back by NABSaranrakshan' or Status eq 'Review by NABSaranrakshan' or Status eq 'Recommend for Rejection')&$top=5000&$orderby=ID desc"; 

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
             
                  for(var i=0;i<Loggs.length; i++)
                    { 
                    
                    var vURLView='';
                    var ViewLink='';
                    var vURLEdit='';
                    var EditLink='';
                    if(Loggs[i].cr6fc_status =="6" || Loggs[i].cr6fc_status =="3")
                    {
                 	vURLEdit ="/NSChecker/?Item="+Loggs[i].cr6fc_cgaplicationid+"&Page=NSChecker";
                 	
                 	EditLink ="<a href='"+vURLEdit+"' target='_blank' style='margin:0;Padding:0;'><i class='fa fa-edit' style='color:#f55905 !important; margin-right:3px;' aria-hidden='true'></i></a>";
                 	
                 	vURLView ="/CGApplicationNSViewForm/?Item="+Loggs[i].cr6fc_cgaplicationid+"&Page=NSChecker";
                 	
                 	ViewLink="<a href='"+vURLView+"' target='_blank' style='margin:0;Padding:0;'><i class='fa fa-bars' style='color:#f55905 !important;' aria-hidden='true'></i></a>";
	                 }
	                 else
	                 {
	                 	vURLView ="/CGApplicationNSViewForm/?Item="+Loggs[i].cr6fc_cgaplicationid+"&Page=NSChecker";
	                 	
	                 	ViewLink="<a href='"+vURLView+"' target='_blank' style='margin:0;Padding:0;'><i class='fa fa-bars' style='color:#f55905 !important;' aria-hidden='true'></i></a>";
	                 }
                 //https://sharepointistech.sharepoint.com/sites/NABSANRAKSHAN/SitePages/CGApplicationEditForm.aspx
                 
				//var vURLEdit ="";

                    vHTML +="<tr style='line-height: 16px;'>"+	
                    		"<td style='text-align:center'>"+Loggs[i].cr6fc_nameoflendinginstitution+"</td>"+
						    "<td style='text-align:center'>"+Loggs[i].cr6fc_name+"</td>"+
						    "<td style='text-align:center'>"+GetCreatedDateTime(Loggs[i].createdon)+"</td>"+
						   // "<td style='text-align:center'>"+Loggs[i].NameOfLendingInstitution+"</td>"+
					        "<td style='text-align:center'>"+Loggs[i].cr6fc_nameoffpo+"</td>"+
					       // "<td style='text-align:center'>"+GetCreatedDateTime(Loggs[i].Created)+"</td>"+
							"<td style='text-align:center'>"+Loggs[i].cr6fc_accountno+"</td>"+
							"<td style='text-align:center'>"+Loggs[i].cr6fc_sanctionedamount+"</td>"+
							//"<td style='text-align:center'>"+GetCreatedDateTime(Loggs[i].Created)+"</td>"+
							"<td style='text-align:center'>"+Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue']+"</td>"+
						   	"<td style='text-align:center;color:#f55905 !important; margin:0; padding:0;'>"+EditLink+""+ViewLink+"</td>"+						
							"<td style='text-align:center;display:none !Important;'>"+Loggs[i].createdon+"</td>"+					
							"</tr>";														                                       																					
                    }
                    
                    if(vHTML != "")
                    {   
                        $('#tblDataMain').DataTable().clear();
                        $('#tblDataMain').DataTable().destroy();
                        document.getElementById("tbodyRequestor").innerHTML=vHTML;
                      	$('#tblDataMain').DataTable({ 
	                  "order": [[8,'desc']]
                    });																													
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
       //var LoginName=_spPageContextInfo.userId; 
       var ddlStatus = document.getElementById("ddlStatus").value;
        var vHTML = "";
        var queryList = "";
       if ( ddlStatus !== "All") {
        queryList = "/_api/cr6fc_cgaplications?$select=cr6fc_status,cr6fc_cgaplicationid,cr6fc_nameoflendinginstitution,cr6fc_name,createdon,cr6fc_nameoffpo,cr6fc_sanctionedamount,cr6fc_accountno,cr6fc_sanctionedamount,cr6fc_status,cr6fc_cgaplicationid&$filter=_cr6fc_nschecker_value eq '"+loggedInUserId+"' and cr6fc_status eq "+ddlStatus+" &$top=5000"; 
          }
       else{
        queryList = "/_api/cr6fc_cgaplications?$select=cr6fc_status,cr6fc_cgaplicationid,cr6fc_nameoflendinginstitution,cr6fc_name,createdon,cr6fc_nameoffpo,cr6fc_sanctionedamount,cr6fc_accountno,cr6fc_sanctionedamount,cr6fc_status,cr6fc_cgaplicationid&$filter=_cr6fc_nschecker_value eq '"+loggedInUserId+"' &$top=5000"; 

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
             
                  for(var i=0;i<Loggs.length; i++)
                    { 
                 var vURLView ="/CGApplicationViewForm/?Item="+Loggs[i].ID;
                 
                 var vURLView='';
                    var ViewLink='';
                    var vURLEdit='';
                    var EditLink='';
                    if(Loggs[i].cr6fc_status =="6" ||Loggs[i].cr6fc_status =="3")
                    {
                 	vURLEdit ="/NSChecker/?Item="+Loggs[i].cr6fc_cgaplicationid+"&Page=NSChecker";
                 	
                 	EditLink ="<a href='"+vURLEdit+"' target='_blank' style='margin:0;Padding:0;'><i class='fa fa-edit'style='color:#f55905 !important;'aria-hidden='true'></i></a>";
                 	
                 	vURLView ="/CGApplicationViewForm/?Item="+Loggs[i].cr6fc_cgaplicationid+"&Page=NSChecker";
                 	
                 	ViewLink="<a href='"+vURLView+"' target='_blank' style='margin:0;Padding:0;'><i class='fa fa-bars'style='color:#f55905 !important;' aria-hidden='true'></i></a>";
	                 }
	                 else
	                 {
	                 	vURLView ="/CGApplicationViewForm/?Item="+Loggs[i].cr6fc_cgaplicationid+"&Page=NSChecker";
	                 	
	                 	ViewLink="<a href='"+vURLView+"' target='_blank' style='margin:0;Padding:0;'><i class='fa fa-bars'style='color:#f55905 !important;' aria-hidden='true'></i></a>";
	                 }
                    vHTML += "<tr style='line-height: 16px;'>"+	
                    		"<td style='text-align:center'>"+Loggs[i].cr6fc_nameoflendinginstitution+"</td>"+
						    "<td style='text-align:center'>"+Loggs[i].cr6fc_name+"</td>"+
						    "<td style='text-align:center'>"+GetCreatedDateTime(Loggs[i].createdon)+"</td>"+
					        "<td style='text-align:center'>"+Loggs[i].cr6fc_nameoffpo+"</td>"+
							"<td style='text-align:center'>"+Loggs[i].cr6fc_accountno+"</td>"+
							"<td style='text-align:center'>"+Loggs[i].cr6fc_sanctionedamount+"</td>"+
							//"<td style='text-align:center'>"+GetCreatedDateTime(Loggs[i].Created)+"</td>"+
							"<td style='text-align:center'>"+Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue']+"</td>"+
						   	"<td style='text-align:center; margin:0; padding:0;'>"+EditLink+""+ViewLink+"</td>"+
						
							"<td style='text-align:center;display:none !Important;'>"+Loggs[i].cr6fc_cgaplicationid+"</td>"+
					
							"</tr>";		
							                                       							
							
							
                    }
                    
                    if(vHTML != "")
                    {   
                        $('#tblDataMain').DataTable().clear();
                        $('#tblDataMain').DataTable().destroy();
                        document.getElementById("tbodyRequestor").innerHTML=vHTML;
                      	$('#tblDataMain').DataTable(/*{ 
	                  "order": [[8,'dsc']],
	                  // scrollY: "300px",
                       // scrollX:  true,
                       //  scrollCollapse: true,
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
	var Newtoday = dd + '/' + mm + '/' + yyyy;//+" "+strTime
	return Newtoday ;
 }
/*  if(InvoiceNumber == null || InvoiceNumber == undefined || InvoiceNumber == '')
 {
     document.getElementById("panelshow").style.display = 'none';
     document.getElementById("showvendor").style.display = 'none';

}*/
 