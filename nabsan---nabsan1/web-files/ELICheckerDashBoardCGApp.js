var loggedInUserId = '';
var loggedInUserName = '';
var loggedInUserEmail = '';

$(document).ready(function () {
  Navigation();

  loggedInUserId = $('#fpo-user-contact-id').val();
  loggedInUserName = $('#fpo-user-contact-name').val();
  loggedInUserEmail = $('#fpo-user-email').val();
  // Dashboard();
  EliMasterData(loggedInUserEmail);


});
$(document).ready(function(){
  $('li:first-child a').addClass('active');
 });
var TotalperEMployee = '';
var LoginName = '';
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

function SubmitData() {

  window.location.href = "";

}
function OpenXL() {
  window.location.href = "";

}

function Navigation() {
  var queryList = "";
  //queryList = location.origin+"/_api/cr6fc_menumasters?$select=statecode,cr6fc_role,cr6fc_link,cr6fc_name&$filter=statecode eq 0  and cr6fc_role eq 1&$orderby=cr6fc_order asc&$top=5000";
  queryList = location.origin+"/_api/cr6fc_menumasters?$select=statecode,cr6fc_role,cr6fc_link,cr6fc_name&$filter=statecode eq 0  and cr6fc_role eq 1&$orderby=cr6fc_order asc&$top=5000";
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
           // vHTML += "<li class='nav-item'><a class='nav-link' href='" + Loggs[i].cr6fc_link + "'>" + Loggs[i].cr6fc_name + "</a></li>"
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
	//let URL = location.origin+"/_api/cr6fc_elimasters?$select=cr6fc_lendinginstitute,cr6fc_elicheckeremailid&$filter= cr6fc_elicheckeremailid eq '"+loggedInUserEmail+"'";
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
function Dashboard(nameEliInstitute) {
  //var LoginName=_spPageContextInfo.userId; 
  var queryList = "";

  //queryList = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('CGApplications')/Items?$select=*&$filter=ELICheckerId eq '"+LoginName+"' and (Status eq 'Pending For Approval' or Status eq 'Sent Back by ELI Checker' or Status eq 'Rejected by ELI Checker' or Status eq 'Submitted to NabSanrakshan')&$top=5000"; 
  //queryList = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('CGApplications')/Items?$select=*&$filter=ELICheckerId eq '"+LoginName+"' and (Status eq 'Pending For Approval' or Status eq 'Rejected by NabSaranrakshan' or Status eq 'Sent Back by ELI Checker' or Status eq 'Rejected by ELI Checker' or Status eq 'Submitted to NabSanrakshan' or Status eq 'Review by NABSaranrakshan'  or Status eq 'Recommend for Rejection')&$top=5000&$orderby=ID desc"; 
  //queryList = location.origin+"/_api/cr6fc_cgapplicationses?$select=cr6fc_status,cr6fc_nameoflendinginstitution,cr6fc_cgapplicationsid,cr6fc_name,createdon,cr6fc_nameoffpo,cr6fc_accountno,cr6fc_sanctionedamount&$filter=cr6fc_nameoflendinginstitution eq '" + nameEliInstitute + "' and (cr6fc_status eq 1 or cr6fc_status eq 4 or cr6fc_status eq 5 or cr6fc_status eq 6 )&$top=5000";
  queryList = location.origin+"/_api/cr6fc_cgaplications?$select=cr6fc_status,cr6fc_nameoflendinginstitution,cr6fc_cgaplicationid,cr6fc_name,createdon,cr6fc_nameoffpo,cr6fc_accountno,cr6fc_sanctionedamount&$filter=cr6fc_nameoflendinginstitution eq '" + nameEliInstitute + "' and (cr6fc_status eq 1 or cr6fc_status eq 4 or cr6fc_status eq 5 or cr6fc_status eq 6 )&$top=5000";
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


      try {
        var Loggs = data.value;
        var vHTML = '';
        var vURLEdit1 = '';
        for (var i = 0; i < Loggs.length; i++) {
          var Status = Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'];
          var vURLview = location.origin+"/CGApplicationViewForm/?Item=" + Loggs[i].cr6fc_cgaplicationid + "&Page=ELIChecker";
          var vURLEdit = location.origin+"/ELICheckerApproverForm/?Item=" + Loggs[i].cr6fc_cgaplicationid;
          if (Status == "Pending for Approval") {
            vURLEdit1 = "<a href='" + vURLEdit + "' target='_blank'target='_blank' style='margin:0; padding-right:10px'><i style='color:#f55905;'class='fa fa-edit' aria-hidden='true'></i></a>"
          }
          else {
            vURLEdit1 = '';
          }
          varSubStatus ='';
          if(Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == 'Submitted to NabSanrakshan' || Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] == 'Review by NABSaranrakshan' || Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] =='Sent Back by NABSaranrakshan' || Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] =='Recommend for Rejection' || Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] =='Recommend for Approval'){
            SubStatus = "Submitted to NabSanrakshan";
         }
         else{
            SubStatus = Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'];                    
         }
          vHTML += "<tr style='line-height: 16px;'>" +

            "<td style='text-align:center'>" + Loggs[i].cr6fc_name + "</td>" +
            "<td style='text-align:center'>" + GetCreatedDateTime(Loggs[i].createdon) + "</td>" +
            "<td style='text-align:center'>" + Loggs[i].cr6fc_nameoffpo + "</td>" +
            //  "<td style='text-align:center'>"+GetCreatedDateTime(Loggs[i].Created)+"</td>"+
            // "<td style='text-align:center'>"+Loggs[i].NameOfFPO+"</td>"+
            "<td style='text-align:center'>" + Loggs[i].cr6fc_accountno + "</td>" +
            "<td style='text-align:center'>" + Loggs[i].cr6fc_sanctionedamount + "</td>" +
            "<td style='text-align:center'>" + SubStatus+ "</td>" +
            "<td style='text-align:center; margin:0; padding:15px;'><span>" + vURLEdit1 + "</span style='display:block;'><span><a href=" + vURLview + " target='_blank' target='_blank'style='margin:0; padding-right:10px' padding-left: 20px;'><i class='fa fa-bars' aria-hidden='true'></i></a></span></td>" +
            "<td style='text-align:center; display:none;'>" + Loggs[i].createdon + "</td>" +

            "</tr>";
        }

        if (vHTML != "") {
          $('#tblDataMain').DataTable().clear();
          $('#tblDataMain').DataTable().destroy();
          document.getElementById("tbodyRequestor").innerHTML = vHTML;
          $('#tblDataMain').DataTable({
            "order": [[7, 'dsc']]
            
          });


        }
        else {
          //vHTML ="<tr><td colspan='15'><font face='Calibri' size='2'>No Employee Addition Deletion</font></td></tr>"; 
          vHTML = "<tr><td colspan='15'><font face='Calibri' size='2'>No CG Application</font></td></tr>";

          document.getElementById("tbodyRequestor").innerHTML = vHTML;
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
  if (ddlStatus == "All") {
    //queryList = location.origin+"/_api/cr6fc_cgapplicationses?$select=cr6fc_status,cr6fc_nameoflendinginstitution,cr6fc_cgapplicationsid,cr6fc_name,createdon,cr6fc_nameoffpo,cr6fc_accountno,cr6fc_sanctionedamount&$filter=cr6fc_nameoflendinginstitution eq '"+nameEliInstitute+"'and (cr6fc_status eq 1 or cr6fc_status eq 9 or cr6fc_status eq 4 or cr6fc_status eq 5 or cr6fc_status eq 6 or cr6fc_status eq 7  or cr6fc_status eq 16)";
    queryList = location.origin +"/_api/cr6fc_cgaplications?$select=cr6fc_status,cr6fc_nameoflendinginstitution,cr6fc_cgaplicationid,cr6fc_name,createdon,cr6fc_nameoffpo,cr6fc_accountno,cr6fc_sanctionedamount&$filter=cr6fc_nameoflendinginstitution eq '"+nameEliInstitute+"' and (cr6fc_status eq 1 or cr6fc_status eq 9 or cr6fc_status eq 4 or cr6fc_status eq 5 or cr6fc_status eq 6 or cr6fc_status eq 7 or cr6fc_status eq 16)";
  }
  else {
    if (ddlStatus !== "All" && ddlStatus !== "") {
     // queryList = location.origin+"/_api/cr6fc_cgapplicationses?$select=cr6fc_status,cr6fc_nameoflendinginstitution,cr6fc_cgapplicationsid,cr6fc_name,createdon,cr6fc_nameoffpo,cr6fc_accountno,cr6fc_sanctionedamount&$filter=cr6fc_nameoflendinginstitution eq '"+nameEliInstitute+"' and cr6fc_status  eq "+ddlStatus+"";
    queryList = location.origin+"/_api/cr6fc_cgaplications/$select=cr6fc_status,cr6fc_nameoflendinginstitution,cr6fc_cgaplicationid,cr6fc_name,createdon,cr6fc_nameoffpo,cr6fc_accountno,cr6fc_sanctionedamount&$filter=cr6fc_nameoflendinginstitution eq '"+nameEliInstitute+"' and cr6fc_status  eq "+ddlStatus+"";
    }
  }
  $.ajax({
    url: queryList,
    type: "GET",
    async: false,
    headers: {
      "accept": "application/json;odata=verbose",
      "content-type": "application/json;odata=verbose"
    },
    success: function (data) {
      try {
        var Loggs = data.value;
        var vHTML = '';
        var vURLEdit1 = '';
        for (var i = 0; i < Loggs.length; i++) {
          //var Status = Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'];
          var Status = Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'];
          var vURLview = location.origin+"/CGApplicationViewForm/?Item=" + Loggs[i].cr6fc_cgaplicationid +"&Page=ELIChecker";
          var vURLEdit = location.origin+"/ELICheckerApproverForm/?Item=" + Loggs[i].cr6fc_cgaplicationid;
          if (Status == "Pending for Approval") {
            vURLEdit1 = "<a href='" + vURLEdit + "' target='_blank'target='_blank' style='margin:0; padding-right:10px'><i style='color:#f55905;'class='fa fa-edit' aria-hidden='true'></i></a>"
          }
          else {
            vURLEdit1 = '';
          }
          vHTML += "<tr style='line-height: 16px;'>" +
            "<td style='text-align:center'>" + Loggs[i].cr6fc_name + "</td>" +
            "<td style='text-align:center'>" + GetCreatedDateTime(Loggs[i].createdon) + "</td>" +
            "<td style='text-align:center'>" + Loggs[i].cr6fc_nameoffpo + "</td>" +
            "<td style='text-align:center'>" + Loggs[i].cr6fc_accountno + "</td>" +
            "<td style='text-align:center'>" + Loggs[i].cr6fc_sanctionedamount + "</td>" +
            "<td style='text-align:center'>" + Loggs[i]['cr6fc_status@OData.Community.Display.V1.FormattedValue'] + "</td>" +
            "<td style='text-align:center; margin:0; padding:5px;'>" + vURLEdit1 + "<a href='" + vURLview + "' target='_blank' style='margin:0;Padding:0; padding-left: 20px;'><i class='fa fa-bars' aria-hidden='true'></i></a></td>" +
            "<td style='text-align:center; display:none;'>" + Loggs[i].cr6fc_cgaplicationid + "</td>" +
            "</tr>";
        }
        if (vHTML != "") {
          $('#tblDataMain').DataTable().clear();
          $('#tblDataMain').DataTable().destroy();
          document.getElementById("tbodyRequestor").innerHTML = vHTML;
          $('#tblDataMain').DataTable({
            "order": [[7, 'dsc']],
            paging: true,
            "bSort": false,
            "bInfo": false,
            "bFilter": true
          });
        }
        else {
          vHTML = "<tr><td colspan='15'><font face='Calibri' size='2'>No CG Application</font></td></tr>";

          document.getElementById("tbodyRequestor").innerHTML = vHTML;
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
function GetCreatedDateTime(vCreatedDate) {
  var vCreated = vCreatedDate;
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
  return Newtoday;
}
 /* if(InvoiceNumber == null || InvoiceNumber == undefined || InvoiceNumber == '')
{
    document.getElementById("panelshow").style.display = 'none';
    document.getElementById("showvendor").style.display = 'none';

}*/
