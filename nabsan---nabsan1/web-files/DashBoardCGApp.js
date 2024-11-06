var loggedInUserId = '';
var loggedInUserName = '';
var loggedInUserEmail = '';
$(document).ready(function (){
	loggedInUserId = $('#fpo-user-contact-id').val();
	loggedInUserName = $('#fpo-user-contact-name').val();
	loggedInUserEmail = $('#fpo-user-email').val();
    EliMasterData(loggedInUserEmail);
    Navigation();
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
function SubmitData(){

window.location.href="/CGApplicationForm/";

}
/*function OpenXL(){
window.location.href="/sites/FPOCGPortal/SitePages/CGApplicationExcelUpload_Backup16Feb.aspx";
}*/
var nameEliInstitute;
const EliMasterData = (loggedInUserEmail) =>{
    let URL = location.origin+"/_api/cr6fc_elimasters?$select=*&$filter= cr6fc_emailid eq '"+loggedInUserEmail+"'";
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
function Navigation(){
    var queryList = "";
    queryList = location.origin+"/_api/cr6fc_menumasters?$select=cr6fc_link,cr6fc_name,statecode,cr6fc_role,cr6fc_order&$filter=statecode eq 0  and cr6fc_role eq 0&$orderby=cr6fc_order asc&$top=5000"; 
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
function Dashboard(nameEliInstitute){


    var queryList = "";


 queryList = location.origin+"/_api/cr6fc_cgaplications?$select=cr6fc_cgaplicationid,cr6fc_status,cr6fc_nameoflendinginstitution,cr6fc_name,cr6fc_accountno,cr6fc_sanctionedamount,createdon,cr6fc_nameoffpo&$filter=cr6fc_status eq 2 or cr6fc_status eq 1 or cr6fc_status eq 4 or cr6fc_status eq 5 or cr6fc_status eq 9 or cr6fc_status eq 6  or cr6fc_status eq 7  or cr6fc_status eq 16 and cr6fc_nameoflendinginstitution eq '"+nameEliInstitute+"'&$top=5000&$orderby=cr6fc_name asc"; 

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
                 //var Logg = Loggs.sort();
                 if(Loggs.length>0)
                 {
                 	              var vHTML=''; 
             var vURLEdit1='';
                  for(var i=0;i<Loggs.length; i++)
                    { 
                  var vURLView ="/CGApplicationViewForm?Item="+Loggs[i].cr6fc_cgaplicationid+"&Page=DashBoardCGApp";
                 	var Status = Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'];
                  if(Status == "Sent Back by ELI Checker" || Status =="Saved"){
                  		
                  	vURLEdit1 ="/CGApplicationEditForm?Item="+Loggs[i].cr6fc_cgaplicationid;
                  	vURLEdit1 =	"<a href='"+vURLEdit1+"' title='Edit Form' style='margin:0;Padding:10px;'><i class='fa fa-pencil' aria-hidden='true'></i></a>"
                  }
                  else if(Status == "Approved by NABSaranrakshan") {
                       vURLEdit1 ="/ELIMakerUTRDetails?Item="+Loggs[i].cr6fc_cgaplicationid;
						vURLEdit1 =	"<a href='"+vURLEdit1+"' title='Enter UTR Details' style='margin:0;Padding:10px;'><i class='fa fa-pencil' aria-hidden='true'></i></a>"
                  }
                  else{
                     vURLEdit1 = "";
                  }
                  
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
                 var SubStatus = '';
                 if(Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == 'Submitted to NabSanrakshan' || Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == 'Review by NABSaranrakshan' || Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] =='Sent Back by NABSaranrakshan' || Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] =='Recommend for Rejection' || Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] =='Recommend for Approval'){
                    SubStatus = "Submitted to NabSanrakshan";
                 }
                 else{
                    SubStatus = Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'];                    
                 }
                 // Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue']
				var checkno="<input type='checkbox' id='fullhide'  class='checkbox' name='delete' value="+Loggs[i].cr6fc_cgaplicationid+">"
                    vHTML += "<tr style='line-height: 16px;'>"+	
	      					"<td style='text-align:center'>"+Loggs[i].cr6fc_name+"</td>"+
						   "<td style='text-align:center'>"+ GetCreatedDateTime(Loggs[i].createdon)+"</td>"+
					        "<td style='text-align:center'>"+Loggs[i].cr6fc_nameoffpo+"</td>"+
							"<td style='text-align:center'>"+accountno+"</td>"+
							"<td style='text-align:center'>"+SanctionedAmount+"</td>"+
							"<td style='text-align:center'>"+SubStatus+"</td>"+
						   "<td style='text-align:center;margin:0; padding-top: 15px !important;'>"+vURLEdit1+"<a href='"+vURLView+"'  style='margin:0;'><i class='fa fa-bars' style='position: inherit !important;' aria-hidden='true'></i></a></td>"+
								"<td style='text-align:center; display:none;'>"+Loggs[i].createdon+"</td>"+
					
							"</tr>";
							
							                                       							
							
							
                    }
                    
                    if(vHTML != "")
                    {   
                        $('#tblDataMain').DataTable().clear();
                        $('#tblDataMain').DataTable().destroy();
                        document.getElementById("tbodyRequestor").innerHTML=vHTML;
                      	                  $('#tblDataMain').DataTable({ 
                                            "order": [[7,'dsc']]                                          
                                                            });
														
															
                    }
                    else  
                    {
                        vHTML ="<tr><td colspan='7'><font face='Calibri' size='2'>No CG Application</font></td></tr>"; 
                        document.getElementById("tbodyRequestor").innerHTML=vHTML;
                        $('#tblDataMain').DataTable();
                    }          
              
                 }
                else  
                    {
                         vHTML ="<tr><td><font face='Calibri' size='2'>No CG Application</font></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>"; 
                        document.getElementById("tbodyRequestor").innerHTML=vHTML;
                        $('#tblDataMain').DataTable();
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
function BindHomeDetails(ddlStatus) {
debugger;
      // var LoginName=_spPageContextInfo.userEmail; 
       var ddlStatus = document.getElementById("ddlStatus").value;
        var vHTML = "";
    var queryList = "";
       if ( ddlStatus !== "All") {
        //queryList = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('CGApplications')/Items?$select=*,Created&$filter=(ELIMakerEmailID eq '"+LoginName+"' and Status eq '"+ddlStatus+"' )&$top=5000&$orderby=ID asc"; 
        queryList = location.origin+"/_api/cr6fc_cgaplications?$select=*&$filter=(cr6fc_status eq "+ddlStatus+") and cr6fc_nameoflendinginstitution eq '"+nameEliInstitute+"'&$top=5000&$orderby=cr6fc_name desc"; 

    
    }
       else{
       // queryList = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('CGApplications')/Items?$select=*,Created&$filter=ELIMakerEmailID eq '"+LoginName+"'&$top=5000&$orderby=ID asc"; 
       queryList = location.origin+"/_api/cr6fc_cgaplications?$select=*&$filter=cr6fc_nameoflendinginstitution eq '"+nameEliInstitute+"'&$top=5000&$orderby=cr6fc_name desc"; 
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
        success: function (data) {
     
            
            try
            {
                 var Loggs= data.value;
                 
              var vHTML=''; 
             var vURLEdit1='';
             var URLView="";
                  for(var i=0;i<Loggs.length; i++)
                    { 
                  var vURLView ="/CGApplicationViewForm?Item="+Loggs[i].cr6fc_cgaplicationid+"&Page=ELIMaker";
                   URLView="<a href='"+vURLView+"'  style='margin:0;Padding:0;'><i class='fa fa-bars' style='position: inherit !important;' aria-hidden='true'></i></a>";
                 	var Status = Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'];
                  if(Status == "Sent Back by ELI Checker" || Status =="Saved"){
                  		vURLEdit1 ="/CGApplicationEditForm?Item="+Loggs[i].cr6fc_cgaplicationid;
                  	vURLEdit1 =	"<a href='"+vURLEdit1+"'  title='Edit Form' style='margin:0;Padding:0;'><i class='fa fa-pencil' style='position: inherit !important;' aria-hidden='true'></i></a>"
                  }
                  else if(Status == "Approved by NABSaranrakshan") {
                       vURLEdit1 ="/ELIMakerUTRDetails?Item="+Loggs[i].cr6fc_cgaplicationid;
                  	vURLEdit1 =	"<a href='"+vURLEdit1+"'  title='Enter UTR Details' style='margin:0;Padding:0;'><i class='fa fa-pencil' style='position: inherit !important;' aria-hidden='true'></i></a>"
                  }
                  else{
                     vURLEdit1 = "";
                  }

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
				var checkno="<input type='checkbox' id='fullhide' class='checkbox' name='delete' value="+Loggs[i].cr6fc_cgaplicationid+">"
                    vHTML += "<tr style='line-height: 16px;'>"+	
	      				
							"<td style='text-align:center'>"+Loggs[i].cr6fc_name+"</td>"+
							"<td style='text-align:center'>"+ GetCreatedDateTime(Loggs[i].createdon)+"</td>"+
					        "<td style='text-align:center'>"+Loggs[i].cr6fc_nameoffpo+"</td>"+
							"<td style='text-align:center'>"+accountno+"</td>"+
							"<td style='text-align:center'>"+SanctionedAmount+"</td>"+
							"<td style='text-align:center'>"+Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue']+"</td>"+
						   "<td style='text-align:center; margin:0; padding-top: 15px !important;'>"+vURLEdit1+""+URLView+"</td>"+
							"<td style='text-align:center; display:none;'>"+Loggs[i].cr6fc_cgaplicationid+"</td>"+
					
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
                        vHTML ="<tr><td colspan='7' style='text-align:center'><font face='Calibri' size='2'>No CG Application</font></td></tr>"; 

                        document.getElementById("tbodyRequestor").innerHTML=vHTML;
                        $('#tblDataMain').DataTable();
                    }          
                
                    }
            catch (e) {       
            console.log(e);                        
            }

        },
        error: function () {
            console.log("error");
        }
    });
}

// Get all navigation links
$(document).ready(function(){
 $('li:first-child a').addClass('active');
});


