$(document).ready(function (){
	loggedInUserId = $('#fpo-user-contact-id').val();
	loggedInUserName = $('#fpo-user-contact-name').val();
	loggedInUserEmail = $('#fpo-user-email').val();
    //Navigation();
    Dashboard(loggedInUserEmail);
}); 
const SubmitData = () =>{
    location.href = "/ELIMemberRegistrationForm/";
}
function Dashboard(loggedInUserEmail){


    var queryList = "";


 queryList = location.origin + "/_api/cr6fc_elimasters?$select=cr6fc_elimasterid,cr6fc_name,cr6fc_emailid,cr6fc_elicheckeremailid,cr6fc_pan,cr6fc_gstin&$filter=cr6fc_administratoremail eq '"+loggedInUserEmail+"'&$top=5000"; //&$filter=

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
                
                        var vURLEdit1=location.origin+"/ElimakerCheckerEditForm/?Item="+Loggs[i].cr6fc_elimasterid+"";
                        var checkno="<input type='checkbox' id='fullhide'  class='checkbox' name='delete' value="+Loggs[i].cr6fc_name+">"
                    vHTML += "<tr style='line-height: 16px;'>"+	
	      					"<td style='text-align:center; color:black;'>"+Loggs[i].cr6fc_name+"</td>"+
						   "<td style='text-align:center; color:black;'>"+ Loggs[i].cr6fc_emailid+"</td>"+
					        "<td style='text-align:center; color:black;'>"+Loggs[i].cr6fc_elicheckeremailid+"</td>"+
							//"<td style='text-align:center; color:black;'>"+Loggs[i].cr6fc_bankcode+"</td>"+
							"<td style='text-align:center; color:black;'>"+Loggs[i].cr6fc_pan+"</td>"+
                            "<td style='text-align:center; color:black;'>"+Loggs[i].cr6fc_gstin+"</td>"+
							//"<td style='text-align:center; color:black;'>"+Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue']+"</td>"+
						//    "<td style='text-align:center;margin:0; color:black;'>"+
                        //    '<select class="form-control" id="ChangeStatus'+Loggs[i].cr6fc_elimasterid+'" onchange="Update(\''+ Loggs[i].cr6fc_elimasterid +'\');" style="margin-left:10px;"><option value="0">Select</option><option value="1">Active</option><option value="2">InActive</option></select>'+
                        //    "</td>"+
                        "<td style='text-align:center;margin:0; color:black;'>'<a href= " + vURLEdit1 + " title='Edit Form' style='margin:0;Padding:0;'><i class='fa fa-pencil' aria-hidden='true'></i></a>'</td>"+
							//	"<td style='text-align:center; display:none;'>"+Loggs[i].cr6fc_cgapplicationsid+"</td>"+
					
							"</tr>";
							
							                                       							
							
							
                    }
                    
                    if(vHTML != "")
                    {   
                        $('#tblDataMain').DataTable().clear();
                        $('#tblDataMain').DataTable().destroy();
                        document.getElementById("tbodyRequestor").innerHTML=vHTML;
                      	                  $('#tblDataMain').DataTable({ 
	                 // "order": [[7,'dsc']],
                         paging:true,
       					 "bInfo": false,
						  "bFilter": true
						  			} );
														
															
                    }
                    else  
                    {
                        vHTML ="<tr><td colspan='15'><font face='Calibri' size='2' style='color:black !important;'>No CG Application</font></td></tr>"; 
                        document.getElementById("tbodyRequestor").innerHTML=vHTML;
                        $('#tblDataMain').DataTable();
                    }          
              
                 }
                else  
                    {
                         vHTML ="<tr><td><font face='Calibri' size='2' style='color:black !important;'>No CG Application</font></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>"; 
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
function Update(ID) {
 
    // var AId=GetParameterByName("ItemID"); 
     
    
       var FieldId = "ChangeStatus"+ID
      Status  = $('#'+FieldId+' option:selected').val();
  
      if (Status =='Select') {
          alert('Please Select Status Type.');
          return false;
      }
         
                         
  
  var data1 = JSON.stringify({  
   
              "cr6fc_status": Status
  });
  shell.getTokenDeferred().done(function (token) {
             $.ajax({
                         url: "/_api/cr6fc_elimasters(" + ID + ")",	
                         type: "PATCH",
                         contentType: "application/json;odata=verbose",
                         async: false,
                         data: data1,
                         headers: {
                             __RequestVerificationToken: token,
                             contentType: "application/json;odata=verbose",
                             XRequestDigest: $("#__REQUESTDIGEST").val(),
                            //  IFMATCH: "*",
                            //  XHttpMethod: "PATCH"
                         },
  
                         success: function (data, textStatus, xhr) {
                            successId = xhr.getResponseHeader("entityid");
                            console.log(successId);
                                                           
                                  alert("item Update sucessfully");
                                //   location.reload();
                                window.location.href = location.origin + "/RefreshingCache/?id="+successId+"&tbl=cr6fc_elimasters&col=cr6fc_cacherefreshedon&red=AdminElimakerCheckerDashboard";
                            },
                          error: function (error) {
                          console.log(error);
                          //alert('Some error occured. Please try again later.');
                          alert('Some error occured while adding data in Machine list. Please try again later.');
                          console.log(error);
                      }
          
                      
          })
        });
   }
    