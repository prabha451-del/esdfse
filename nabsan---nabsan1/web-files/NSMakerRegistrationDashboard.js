var loggedInUserId = '';
var loggedInUserName = '';
var loggedInUserEmail = '';
$(document).ready(function (){
	loggedInUserId = $('#fpo-user-contact-id').val();
	loggedInUserName = $('#fpo-user-contact-name').val();
	loggedInUserEmail = $('#fpo-user-email').val();
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

window.location.href=location.origin+"/CGApplicationForm/";

}

    
function Dashboard(){
    var queryList = "";
    queryList = location.origin+"/_api/cr6fc_makerregistrationrequests?$select=cr6fc_requeststatus,cr6fc_makerregistrationrequestid,_cr6fc_nsmaker_value,_cr6fc_nschecker_value,_cr6fc_nsapprover_value,cr6fc_name,createdon,cr6fc_bankname,cr6fc_TypeOfBank&$expand=cr6fc_TypeOfBank($select=cr6fc_banktypeid,cr6fc_name)&$filter=(cr6fc_requeststatus eq 1 or cr6fc_requeststatus eq 2 or cr6fc_requeststatus eq 3) and (_cr6fc_nsmaker_value eq "+loggedInUserId+" or _cr6fc_nschecker_value eq "+loggedInUserId+" or _cr6fc_nsapprover_value eq "+loggedInUserId+")&$orderby=createdon asc&$top=5000"; //or cr6fc_requeststatus eq 4

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
                        var vURLEdit1 = '';
                        let counter = 0;
                        var Loggs ;
                        // var Loggs1 ; 
                        // var Loggs2 ;
                        // Sort the data based on request status and createdon
                        /* Loggs = jQuery.grep(logg, function(n, i) {
                            return (n['cr6fc_requeststatus@OData.Community.Display.V1.FormattedValue'] == "Pending at NS Maker" && n._cr6fc_nsmaker_value == loggedInUserId);
                            });

                            Loggs1 = jQuery.grep(logg, function(n, i) {
                                return (n['cr6fc_requeststatus@OData.Community.Display.V1.FormattedValue'] == "Pending at NS Checker" && n._cr6fc_nschecker_value == loggedInUserId);
                                });  
                                Loggs2 = jQuery.grep(logg, function(n, i) {
                                    return (n['cr6fc_requeststatus@OData.Community.Display.V1.FormattedValue'] == "Pending at NS Approver" && n._cr6fc_nsapprover_value == loggedInUserId);
                                    }); */
                          if(Loggs.length != 0){           
                        for (var i = 0; i < Loggs.length; i++) {
                            var vURLView = location.origin+"/RegistrationViewForm?Item=" + Loggs[i].cr6fc_makerregistrationrequests + "&Page=DashBoardCGApp";
                            var Status = Loggs[i]['cr6fc_requeststatus@OData.Community.Display.V1.FormattedValue'];
            
                            if ((Status == "Pending at NS Maker" && Loggs[i]._cr6fc_nsmaker_value == loggedInUserId) || (Status == "Pending at NS Checker" && Loggs[i]._cr6fc_nschecker_value == loggedInUserId) || (Status == "Pending at NS Approver" && Loggs[i]._cr6fc_nsapprover_value == loggedInUserId)) {
                                vURLEdit1 = location.origin+"/RegistrationApprovalForm?Item=" + Loggs[i].cr6fc_makerregistrationrequests;
                                vURLEdit1 = "<a href='" + vURLEdit1 + "' title='Edit Form' style='margin:0;Padding:0;'><i class='fa fa-pencil' aria-hidden='true'></i></a>";
                                counter++
                            } else {
                                vURLEdit1 = "";
                            }
                            var typeodbank;
                            if(Loggs[i].cr6fc_TypeOfBank != null){
                                typeodbank = Loggs[i].cr6fc_TypeOfBank.cr6fc_name;
                            }
                            else{
                                typeodbank ='';
                            }
                            $("#pendingCount").text(counter);
                            vHTML += "<tr style='line-height: 16px;color: black;'>" +
                                "<td style='text-align:center'>" + Loggs[i].cr6fc_name + "</td>" +
                                "<td style='text-align:center'>" + GetCreatedDateTime(Loggs[i].createdon) + "</td>" +
                                "<td style='text-align:center'>" + Loggs[i].cr6fc_bankname + "</td>" +
                                "<td style='text-align:center'>" + typeodbank + "</td>" +
                                "<td style='text-align:center'>" + Loggs[i]['cr6fc_requeststatus@OData.Community.Display.V1.FormattedValue'] + "</td>" +
                                "<td style='text-align:center;margin:0; padding-top: 15px !important;'>" + vURLEdit1 + "<a href='" + vURLView + "' target='_blank' style='margin:0;'><i class='fa fa-bars' aria-hidden='true'></i></a></td>" +
                                "<td style='text-align:center; display:none;'>" + Loggs[i].createdon + "</td>" +
                                "</tr>";
                        }
                    }
                  
            
                        if (vHTML != "") {
                            $('#tblDataMain').DataTable().clear();
                            $('#tblDataMain').DataTable().destroy();
                            document.getElementById("tbodyRequestor").innerHTML = vHTML;
                            $('#tblDataMain').DataTable({
                                "order": [[6, 'asc']],
                                paging: true,
                                "bInfo": false,
                                "bFilter": true
                            });
                        } else {
                            vHTML = "<tr><td colspan='15'><font face='Calibri' size='2'>No CG Application</font></td></tr>";
                            document.getElementById("tbodyRequestor").innerHTML = vHTML;
                            $('#tblDataMain').DataTable();
                        }
            
                    } else {
                        vHTML = "<tr><td><font face='Calibri' size='2'>No CG Application</font></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
                        document.getElementById("tbodyRequestor").innerHTML = vHTML;
                        $('#tblDataMain').DataTable();
                    }
                } catch (e) {
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
       var LoginName=_spPageContextInfo.userEmail; 
       var ddlStatus = document.getElementById("ddlStatus").value;
        var vHTML = "";
    var queryList = "";
       if ( ddlStatus !== "All") {
        queryList = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('CGApplications')/Items?$select=*,Created&$filter=(ELIMakerEmailID eq '"+LoginName+"' and Status eq '"+ddlStatus+"' )&$top=5000&$orderby=ID asc"; 
          }
       else{
        queryList = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('CGApplications')/Items?$select=*,Created&$filter=ELIMakerEmailID eq '"+LoginName+"'&$top=5000&$orderby=ID asc"; 

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
                  var vURLView ="https://nabardmumbai.sharepoint.com/sites/FPOCGPortal/SitePages/CGApplicationViewForm.aspx?Item="+Loggs[i].ID+"&Page=ELIMaker";
                 	var Status = Loggs[i].Status;
                  if(Status == "Sent Back by ELI Checker" || Status =="Saved"){
                  		vURLEdit1 ="https://nabardmumbai.sharepoint.com/sites/FPOCGPortal/SitePages/CGApplicationEditForm_Backup26Feb_copy(1).aspx?Item="+Loggs[i].ID;
                  	vURLEdit1 =	"<a href='"+vURLEdit1+"'  title='Edit Form' style='margin:0;Padding:0;'><i class='fa fa-pencil' aria-hidden='true'></i></a>"
                  }
                  else if(Status == "Approved by NABSaranrakshan") {
                       vURLEdit1 ="https://nabardmumbai.sharepoint.com/sites/FPOCGPortal/SitePages/ELIMakerUTRDetails.aspx?Item="+Loggs[i].ID;
                  	vURLEdit1 =	"<a href='"+vURLEdit1+"'  title='Enter UTR Details' style='margin:0;Padding:0;'><i class='fa fa-pencil' aria-hidden='true'></i></a>"
                  }
                  else{
                     vURLEdit1 = "";
                  }
				var checkno="<input type='checkbox' id='fullhide' class='checkbox' name='delete' value="+Loggs[i].ID+">"
                    vHTML += "<tr style='line-height: 16px;'>"+	
	      				
							"<td style='text-align:center'>"+Loggs[i].Title+"</td>"+
							"<td style='text-align:center'>"+ GetCreatedDateTime(Loggs[i].Created)+"</td>"+
					        "<td style='text-align:center'>"+Loggs[i].NameOfFPO+"</td>"+
							"<td style='text-align:center'>"+Loggs[i].AccountNo+"</td>"+
							"<td style='text-align:center'>"+Loggs[i].SanctionedAmount+"</td>"+
							"<td style='text-align:center'>"+Loggs[i].Status+"</td>"+
						   "<td style='text-align:center; margin:0; padding-top: 15px !important;'>"+vURLEdit1+"<a href='"+vURLView+"'  style='margin:0;Padding:0;'><i class='fa fa-bars' aria-hidden='true'></i></a></td>"+
							"<td style='text-align:center; display:none;'>"+Loggs[i].ID+"</td>"+
					
							"</tr>";
							
							                                       							
							
							
                    }
                    
                    if(vHTML != "")
                    {   
                        $('#tblDataMain').DataTable().clear();
                        $('#tblDataMain').DataTable().destroy();
                        document.getElementById("tbodyRequestor").innerHTML=vHTML;
                      	                  $('#tblDataMain').DataTable({ 
	                  "order": [[9,'dsc']],
                         paging:true,
       					 "bInfo": false,
						  "bFilter": true
						  			} );
														
															
                    }
                    else  
                    {
                        vHTML ="<tr><td colspan='15'><font face='Calibri' size='2'>No CG Application</font></td></tr>"; 

                        document.getElementById("tbodyRequestor").innerHTML=vHTML;
                        $('#tblDataMain').dataTable();
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



