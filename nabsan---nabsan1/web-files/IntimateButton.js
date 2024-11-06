var startdate='';
var EndDate = '';
$(document).ready(function () {
    Navigation();
    TaxMaster();
    SOEMaster();
//     $('#financialYearSelect').change(function() {
//         var selectedYear = $(this).val();
//         var years = selectedYear.split('-');
//         var startYear = parseInt(years[0]);
//         var endYear = parseInt(years[1]);

//         var financialYearDates = getFinancialYearDates(startYear, endYear);
//         console.log(financialYearDates)
//         // financialYearDates.forEach(function(dateRange) {
//         //     console.log("Start Date: " + dateRange.startDate.toDateString() + ", End Date: " + dateRange.endDate.toDateString());
//         //     // You can perform any desired operation with the dates here
//         // });
//     });
   
//     function getFinancialYearDates(startYear, endYear) {
//         var dates = [];
//         var startdate1 = '04'+'/'+"01"+'/'+startYear;
//         var parts = startdate1.split('/');
//         var month = parts[0];
//         var  day = parts[1];
//         var year = parts[2];
//         var date = new Date(year, month - 1, day);
//         date.setDate(date.getDate() + 1);  
//    startdate = date.toISOString();

//         var EndDate1 = '03'+'/'+"31" + '/' +endYear; 
//         var parts1 = EndDate1.split('/');
//         var month1  = parts1[0];
//         var day1  = parts1[1];
//         var year1 = parts1[2];
//         var date1 = new Date(year1, month1 - 1, day1);
//         date1.setDate(date1.getDate() + 1);
//      EndDate = date1.toISOString();
        
//         Dashboard(startdate,EndDate)
//     }

    // function formatDate(date) {
    //     var month = date.getMonth() + 1;
    //     var day = date.getDate();
    //     var year = date.getFullYear();

    //     // Format month and day with leading zeros if necessary
    //     month = (month < 10) ? '0' + month : month;
    //     day = (day < 10) ? '0' + day : day;

    //     return year + '-' + month + '-' + day;
    // }

});

function exportAllDatatoexcel()
{	
    $.getScript("~/TableExport.js", function()
    {	      
        var vCreatedBy="CGApplication";
        document.getElementById("tblDataMainExport").style.display = 'block';
        $('#tblDataMainExport').tableExport({type:'excel',escape:'true',fileName: vCreatedBy});	
       document.getElementById("tblDataMainExport").style.display = 'none';

    });
}

function Navigation(){
    var queryList = "";
    queryList = location.origin+"/_api/cr6fc_menumasters?$select=cr6fc_link,cr6fc_name,statecode,cr6fc_role,cr6fc_order&$filter=statecode eq 0  and cr6fc_role eq 2&$orderby=cr6fc_order asc&$top=5000"; 
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
 var today= new Date();

var curMonth = today.getMonth();
var day = today.getDate();
var currentyr = "";
var prevYr = ""; //
if(curMonth < 3){
        var financialmonth = ("03");
         var financialDate =("31");
         currentyr1 = financialmonth+"/"+financialDate+"/"+(today.getFullYear()-1).toString();
         var currentyear = new Date(currentyr1);
         currentyear.setDate(currentyear.getDate() + 1);  
         currentyr = currentyear.toISOString();
         var nextYr1 = (today.getFullYear() -2).toString();

        prevYr1="04"+"/"+"01"+"/"+nextYr1;
       var previousyear = new Date(prevYr1);
       previousyear.setDate(previousyear.getDate() + 1);  
       prevYr = previousyear.toISOString();
        }
        else{
            var financialmonth = ("03");
            var financialDate =("31");
            currentyr1 = financialmonth+"/"+financialDate+"/"+(today.getFullYear()).toString();
            var currentyear = new Date(currentyr1);
            currentyear.setDate(currentyear.getDate() + 1);  
            currentyr = currentyear.toISOString();
            var nextYr1 = (today.getFullYear() -1).toString();
   
           prevYr1="04"+"/"+"01"+"/"+nextYr1;
          var previousyear = new Date(prevYr1);
          previousyear.setDate(previousyear.getDate() + 1);  
          prevYr = previousyear.toISOString();

        }  
  
   
    function Intimate(){
        var previousyear= new Date(prevYr);
        var prevyear = previousyear.setDate(previousyear.getDate()-1);
        var prevyr = new Date(prevyear);
        var currentYear =new Date(currentyr);
        var Currentyr = currentYear.setDate(currentYear.getDate()-1);
        var cuurrntyr = new Date(Currentyr);
    var data1 = JSON.stringify(
        {
          /*  '__metadata': {
                'type': 'SP.Data.IntimateForRenewalListItem'
            },*/
            'cr6fc_renewalintimated':"0",
           'cr6fc_fromdate':prevyr,
           'cr6fc_todate':cuurrntyr
            
            
        });
        shell.getTokenDeferred().done(function(token){
			
			console.log(token)
			var header = {
				__RequestVerificationToken: token,
				contentType: "application/json;odata=verbose"
			}
            $.ajax({
        url:location.origin+"/_api/cr6fc_intimateforrenewals",
        type: "POST",
        contentType: "application/json;odata=verbose",
        async: false,
        data: data1,
       	headers:header,
        success: function (data) {
           alert('Data Intimated For Renewal');
        },
        error: function (e) {
            console.log("Error");
            console.log(e);
        }
     });
    })
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

function  Dashboard(){


    var queryList = "";


 queryList = location.origin+"/_api/cr6fc_cgaplications?$select=cr6fc_accountno,cr6fc_cgfeeenddate,cr6fc_typeoffacility,cr6fc_cgstatus,cr6fc_cgaplicationid,cr6fc_panfpo,cr6fc_status,cr6fc_nameoflendinginstitution,cr6fc_name,cr6fc_accountno,cr6fc_sanctionedamount,createdon,cr6fc_nameoffpo&$filter=cr6fc_status eq 15 and cr6fc_statuschangeddate le "+currentyr+" and cr6fc_statuschangeddate ge "+prevYr+" and cr6fc_renewalrequestongoing eq 1 and cr6fc_cgstatus ne 7 and cr6fc_cgstatus ne 8 &$top=5000&$orderby=cr6fc_name asc"; 

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
                         var UTREligible='';			    				    
                         if(filterSOEData.length>0)
                         {
                             //SoENo=filterSOEData[0].Title;
                             UTREligible=filterSOEData[0].cr6fc_eligibleguranteecover;
                             //SOECGFee=filterSOEData[0].CreditGuaranteeFee;
                         }
				//var checkno="<input type='checkbox' id='fullhide'  class='checkbox' name='delete' value="+Loggs[i].cr6fc_cgaplicationid+">"
                    vHTML += "<tr style='line-height: 16px;'>"+	
	      					"<td style='text-align:center'>"+Loggs[i].cr6fc_nameoflendinginstitution+"</td>"+
						   "<td style='text-align:center'>"+Loggs[i].cr6fc_nameoffpo+"</td>"+
					        "<td style='text-align:center'>"+CGPANNo+"</td>"+
							"<td style='text-align:center'>"+Loggs[i].cr6fc_panfpo+"</td>"+
							"<td style='text-align:center'>"+Loggs[i]['cr6fc_cgstatus@OData.Community.Display.V1.FormattedValue']+"</td>"+
                    "<td style='text-align:center'>"+Loggs[i]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue']+"</td>"+
                    "<td style='text-align:center'>"+Loggs[i].cr6fc_sanctionedamount+"</td>"+
                    "<td style='text-align:center'>"+UTREligible+"</td>"+
                    "<td style='text-align:center'>"+GetCreatedDateTime(Loggs[i].cr6fc_cgfeeenddate)+"</td>"+
                    "<td style='text-align:center'>"+Loggs[i].cr6fc_accountno+"</td>"+
                    //    "<td style='text-align:center;margin:0; padding-top: 15px !important;'>"+vURLEdit1+"<a href='"+vURLView+"'  style='margin:0;'><i class='fa fa-bars' style='position: inherit !important;' aria-hidden='true'></i></a></td>"+
						// 		"<td style='text-align:center; display:none;'>"+Loggs[i].createdon+"</td>"+
					
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
                             DashboardExport();
                             $('#statuscheck').show();
                            $('#IntimateButton').show();
                    }
                    else  
                    {
                        $('#tblDataMain').DataTable().clear();
                        vHTML ="<tr><td colspan='7'><font face='Calibri' size='2'>No CG Application</font></td></tr>"; 
                        document.getElementById("tbodyRequestor").innerHTML=vHTML;
                        $('#tblDataMain').DataTable();
                    }          
              
                 }
                else  
                    {
                        $('#tblDataMain').DataTable().clear();
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

function DashboardFilter(){


    var queryList = "";

var CGStatus = $('#CGStatusCheck option:selected').val();
if(CGStatus == 'Select'){
 queryList = location.origin+"/_api/cr6fc_cgaplications?$select=cr6fc_accountno,cr6fc_cgfeeenddate,cr6fc_typeoffacility,cr6fc_cgstatus,cr6fc_cgaplicationid,cr6fc_panfpo,cr6fc_status,cr6fc_nameoflendinginstitution,cr6fc_name,cr6fc_accountno,cr6fc_sanctionedamount,createdon,cr6fc_nameoffpo&$filter=cr6fc_status eq 15 and cr6fc_statuschangeddate le "+currentyr+" and cr6fc_statuschangeddate ge "+prevYr+" and cr6fc_renewalrequestongoing eq 1 and cr6fc_cgstatus ne 7 and cr6fc_cgstatus ne 8 &$top=5000&$orderby=cr6fc_name asc"; 
}else{
 queryList = location.origin+"/_api/cr6fc_cgaplications?$select=cr6fc_accountno,cr6fc_cgfeeenddate,cr6fc_typeoffacility,cr6fc_cgstatus,cr6fc_cgaplicationid,cr6fc_panfpo,cr6fc_status,cr6fc_nameoflendinginstitution,cr6fc_name,cr6fc_accountno,cr6fc_sanctionedamount,createdon,cr6fc_nameoffpo&$filter=cr6fc_status eq 15 and cr6fc_statuschangeddate le "+currentyr+" and cr6fc_statuschangeddate ge "+prevYr+" and cr6fc_renewalrequestongoing eq 1 and cr6fc_cgstatus eq "+CGStatus+" &$top=5000&$orderby=cr6fc_name asc"; 
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
                         var UTREligible='';			    				    
                         if(filterSOEData.length>0)
                         {
                             //SoENo=filterSOEData[0].Title;
                             UTREligible=filterSOEData[0].cr6fc_eligibleguranteecover;
                             //SOECGFee=filterSOEData[0].CreditGuaranteeFee;
                         }
				//var checkno="<input type='checkbox' id='fullhide'  class='checkbox' name='delete' value="+Loggs[i].cr6fc_cgapplicationsid+">"
                    vHTML += "<tr style='line-height: 16px;'>"+	
	      					"<td style='text-align:center'>"+Loggs[i].cr6fc_nameoflendinginstitution+"</td>"+
						   "<td style='text-align:center'>"+Loggs[i].cr6fc_nameoffpo+"</td>"+
					        "<td style='text-align:center'>"+CGPANNo+"</td>"+
							"<td style='text-align:center'>"+Loggs[i].cr6fc_panfpo+"</td>"+
							"<td style='text-align:center'>"+Loggs[i]['cr6fc_cgstatus@OData.Community.Display.V1.FormattedValue']+"</td>"+
                    "<td style='text-align:center'>"+Loggs[i]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue']+"</td>"+
                    "<td style='text-align:center'>"+Loggs[i].cr6fc_sanctionedamount+"</td>"+
                    "<td style='text-align:center'>"+UTREligible+"</td>"+
                    "<td style='text-align:center'>"+GetCreatedDateTime(Loggs[i].cr6fc_cgfeeenddate)+"</td>"+
                    "<td style='text-align:center'>"+Loggs[i].cr6fc_accountno+"</td>"+
                    //    "<td style='text-align:center;margin:0; padding-top: 15px !important;'>"+vURLEdit1+"<a href='"+vURLView+"'  style='margin:0;'><i class='fa fa-bars' style='position: inherit !important;' aria-hidden='true'></i></a></td>"+
						// 		"<td style='text-align:center; display:none;'>"+Loggs[i].createdon+"</td>"+
					
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
                                                            $('#tblDataMainExport').DataTable().clear();
                                                            $('#tblDataMainExport').DataTable().destroy();
                                                            document.getElementById("tbodyRequestorExport").innerHTML=vHTML;                             //DashboardExport();
                            $('#IntimateButton').show();
                    }
                    else  
                    {
                       // $('#tblDataMain').DataTable().clear();
                        vHTML ="<tr><td colspan='7'><font face='Calibri' size='2'>No CG Application</font></td></tr>"; 
                        document.getElementById("tbodyRequestor").innerHTML=vHTML;
                        $('#tblDataMain').DataTable().clear();
                        //$('#tblDataMain').DataTable().destroy();
                        $('#tblDataMainExport').DataTable().clear();
                       // $('#tblDataMainExport').DataTable().destroy();
                        $('#tblDataMain').DataTable();
                    }          
              
                 }
                else  
                    {
                        //$('#tblDataMain').DataTable().clear();
                        $('#tblDataMain').DataTable().clear();
                        //$('#tblDataMain').DataTable().destroy();
                        $('#tblDataMainExport').DataTable().clear();
                       // $('#tblDataMainExport').DataTable().destroy();
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


function  DashboardExport(){


    var queryList = "";


 queryList = location.origin+"/_api/cr6fc_cgaplications?$select=cr6fc_accountno,cr6fc_cgfeeenddate,cr6fc_typeoffacility,cr6fc_cgstatus,cr6fc_cgaplicationid,cr6fc_panfpo,cr6fc_status,cr6fc_nameoflendinginstitution,cr6fc_name,cr6fc_accountno,cr6fc_sanctionedamount,createdon,cr6fc_nameoffpo&$filter=cr6fc_status eq 15 and cr6fc_statuschangeddate le "+currentyr+" and cr6fc_statuschangeddate ge "+prevYr+" and cr6fc_renewalrequestongoing eq 1 and cr6fc_cgstatus ne 7 and cr6fc_cgstatus ne 8 &$top=5000&$orderby=cr6fc_name asc"; 

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
                         var UTREligible='';			    				    
                         if(filterSOEData.length>0)
                         {
                             //SoENo=filterSOEData[0].Title;
                             UTREligible=filterSOEData[0].cr6fc_eligibleguranteecover;
                             //SOECGFee=filterSOEData[0].CreditGuaranteeFee;
                         }
				//var checkno="<input type='checkbox' id='fullhide'  class='checkbox' name='delete' value="+Loggs[i].cr6fc_cgapplicationsid+">"
                    vHTML += "<tr style='line-height: 16px;'>"+	
	      					"<td style='text-align:center'>"+Loggs[i].cr6fc_nameoflendinginstitution+"</td>"+
						   "<td style='text-align:center'>"+Loggs[i].cr6fc_nameoffpo+"</td>"+
					        "<td style='text-align:center'>"+CGPANNo+"</td>"+
							"<td style='text-align:center'>"+Loggs[i].cr6fc_panfpo+"</td>"+
							"<td style='text-align:center'>"+Loggs[i]['cr6fc_cgstatus@OData.Community.Display.V1.FormattedValue']+"</td>"+
                    "<td style='text-align:center'>"+Loggs[i]['cr6fc_typeoffacility@OData.Community.Display.V1.FormattedValue']+"</td>"+
                    "<td style='text-align:center'>"+Loggs[i].cr6fc_sanctionedamount+"</td>"+
                    "<td style='text-align:center'>"+UTREligible+"</td>"+
                    "<td style='text-align:center'>"+GetCreatedDateTime(Loggs[i].cr6fc_cgfeeenddate)+"</td>"+
                    "<td style='text-align:center'>"+Loggs[i].cr6fc_accountno+"</td>"+
                    //    "<td style='text-align:center;margin:0; padding-top: 15px !important;'>"+vURLEdit1+"<a href='"+vURLView+"'  style='margin:0;'><i class='fa fa-bars' style='position: inherit !important;' aria-hidden='true'></i></a></td>"+
						// 		"<td style='text-align:center; display:none;'>"+Loggs[i].createdon+"</td>"+
					
							"</tr>";
							
							                                       							
							
							
                    }
                    
                    if(vHTML != "")
                    {   
                        $('#tblDataMainExport').DataTable().clear();
                        $('#tblDataMainExport').DataTable().destroy();
                        document.getElementById("tbodyRequestorExport").innerHTML=vHTML;
                      	                 /* $('#tblDataMainExport').DataTable({ 
                                            "order": [[7,'dsc']]                                          
                                                            });*/
														
															
                    }
                    else  
                    {
                        $('#tblDataMainExport').DataTable().clear();
                        vHTML ="<tr><td colspan='7'><font face='Calibri' size='2'>No CG Application</font></td></tr>"; 
                        document.getElementById("tbodyRequestorExport").innerHTML=vHTML;
                        $('#tblDataMainExport').DataTable();
                    }          
              
                 }
                else  
                    {
                        $('#tblDataMainExport').DataTable().clear();
                         vHTML ="<tr><td><font face='Calibri' size='2'>No CG Application</font></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>"; 
                        document.getElementById("tbodyRequestorExport").innerHTML=vHTML;
                        $('#tblDataMainExport').DataTable();
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