var loggedInUserId = '';
var loggedInUserName = '';
var loggedInUserEmail = '';
var rowIdx = 1;
$(document).ready(function () {
	loggedInUserId = $('#fpo-user-contact-id').val();
	loggedInUserName = $('#fpo-user-contact-name').val();
	loggedInUserEmail = $('#fpo-user-email').val();
	$('title').text('APPLICATION');	
	BindFPOState();
	BindELIMaker();
	bindfporegister();
	BindBankType();
	// populateBankNames();
	$('#OtherDocument').multifile();
	$(".nav-tabs a").click(function () {
		$(this).tab('show');
	});
	$('.nav-tabs a').on('shown.bs.tab', function (event) {
		var x = $(event.target).text();         // active tab
		var y = $(event.relatedTarget).text();  // previous tab
		$(".act span").text(x);
		$(".prev span").text(y);
	});
});
function convertNumberToWords(num) {
	var ones = ["", "One ", "Two ", "Three ", "Four ", "Five ", "Six ", "Seven ", "Eight ", "Nine ", "Ten ", "Eleven ", "Twelve ", "Thirteen ", "Fourteen ", "Fifteen ", "Sixteen ", "Seventeen ", "Eighteen ", "Nineteen "];
	var tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
	if ((num = num.toString()).length > 9) return "Overflow: Maximum 9 digits supported";
	n = ("000000000" + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
	if (!n) return;
	var str = "";
	str += n[1] != 0 ? (ones[Number(n[1])] || tens[n[1][0]] + " " + ones[n[1][1]]) + "Crore " : "";
	str += n[2] != 0 ? (ones[Number(n[2])] || tens[n[2][0]] + " " + ones[n[2][1]]) + "Lakh " : "";
	str += n[3] != 0 ? (ones[Number(n[3])] || tens[n[3][0]] + " " + ones[n[3][1]]) + "Thousand " : "";
	str += n[4] != 0 ? (ones[Number(n[4])] || tens[n[4][0]] + " " + ones[n[4][1]]) + "Hundred " : "";
	str += n[5] != 0 ? (str != "" ? "and " : "") + (ones[Number(n[5])] || tens[n[5][0]] + " " + ones[n[5][1]]) : "";
	return str;
}

const cancel =()=>{
	location.href = location.origin+'/registerdashboard/';
}
var LoggELIMaker;
function BindELIMaker() {
	var requestUri = location.origin + "/_api/cr6fc_registrationapprovalmatrixes?$select=*";
	//var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ELIMaster')//items?$top=500&$select=*";
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
			LoggELIMaker = data.value;
			if (LoggELIMaker.length > 0) {
				//$('#NameOfLendingInstitution').val(LoggELIMaker[0]._cr6fc_username_value);
				for (var t = 0; t < LoggELIMaker.length; t++) {
					if (LoggELIMaker[t].cr6fc_name == "NS Maker") {
						$('#hdnNSMaker').val(LoggELIMaker[t]._cr6fc_username_value);
					}
					else if (LoggELIMaker[t].cr6fc_name == "NS Checker") {
						$('#hdnNSChecker').val(LoggELIMaker[t]._cr6fc_username_value);
					}
					else if (LoggELIMaker[t].cr6fc_name == "NS Approver") {
						$('#hdnNSApprover').val(LoggELIMaker[t]._cr6fc_username_value);
					}
				}
			}
			else {
				$('.form-control').prop('disabled', true);

			}
		},
		error: function () {
			console.log("error");
		}
	});
}
const bindfporegister = () => {
	var requestUri = location.origin + "/_api/cr6fc_fpocontacts?$select=*&$filter=cr6fc_useremail eq '"+loggedInUserEmail+"'";
	//var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ELIMaster')//items?$top=500&$select=*";
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
			Loggfpocontact = data.value;
			if (Loggfpocontact.length > 0) {
				//$('#NameOfLendingInstitution').val(LoggELIMaker[0]._cr6fc_username_value);
				//for (var t = 0; t < LoggELIMaker.length; t++)
				for(let t = 0; t<Loggfpocontact.length;t++) {
					$("#RequesterEmailAddress").val(Loggfpocontact[t].cr6fc_useremail);
					$("#txtBankName").val(Loggfpocontact[t].cr6fc_lendinginstitutionname);
					$("#userfirstname").text(Loggfpocontact[t].cr6fc_userfirstname);
					$("#userlastname").text(Loggfpocontact[t].cr6fc_userlastname);
					$("#userDesignation").text(Loggfpocontact[t].cr6fc_designation);
					$("#userMobilenumber").text(Loggfpocontact[t].cr6fc_mobilenumber);
				}
			}
			
		},
		error: function () {
			console.log("error");
		}
	});
}
var LoggFPOState;
function BindFPOState() {
	var requestUri = location.origin + "/_api/cr6fc_statemasters?$select=*";
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
			LoggFPOState = data.value;
			try {
				if (LoggFPOState.length > 0) {
					var FPOState = document.getElementById("ddlState");
					FPOState.options.length = 0;
					FPOState.options[FPOState.options.length] = new Option("Select", "0");
					for (var i = 0; i < LoggFPOState.length; i++) {
						FPOState.options[FPOState.options.length] = new Option(LoggFPOState[i].cr6fc_name, LoggFPOState[i].cr6fc_statemasterid);
					}
				}
			}
			catch (e) {
			}
		},
		error: function () {
			console.log("error");
		}
	});
}
var txtTypeofBank;
function BindBankType() {
	var requestUri = location.origin + "/_api/cr6fc_banktypes?$select=*";
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
			txtTypeofBank = data.value;
			try {
				if (txtTypeofBank.length > 0) {
					var txtTypeofBank1 = document.getElementById("txtTypeofBank");
					txtTypeofBank1.options.length = 0;
					txtTypeofBank1.options[txtTypeofBank1.options.length] = new Option("Select", "0");
					for (var i = 0; i < txtTypeofBank.length; i++) {
						txtTypeofBank1.options[txtTypeofBank1.options.length] = new Option(txtTypeofBank[i].cr6fc_name, txtTypeofBank[i].cr6fc_banktypeid);
					}
				}
			}
			catch (e) {
			}
		},
		error: function () {
			console.log("error");
		}
	});
}

function BindBusinessFPOcity() {
	var requestUri = location.origin + "/_api/cr6fc_citymasters?$select=*";
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
			var Logg = data.value;
			try {
				if (Logg.length > 0) {
					var BusinessFPOcity = document.getElementById("BusinessFPOcity");
					BusinessFPOcity.options.length = 0;
					BusinessFPOcity.options[BusinessFPOcity.options.length] = new Option("Select", "0");
					for (var i = 0; i < Logg.length; i++) {
						BusinessFPOcity.options[BusinessFPOcity.options.length] = new Option(Logg[i].cr6fc_name, Logg[i].cr6fc_citymasterid);
					}
				}
			}
			catch (e) {
			}
		},
		error: function () {
			console.log("error");
		}
	});
}
var txtFirstNameAuthorized = '';
var txtLastNameAuthorized = '';
var txtDesignationAuthorized = '';
var txtMobileNoAuthorized = '';
var txtAddressAuthorized = '';

var ddlAuthSignAddressProofType = '';
var ddlAuthSignAddressProofTypetxt = '';
var txtAuthSignAddressProofNumber = '';
var fAuthSignAddressProof = '';
var ddlAuthSignIdentityProofType = '';
var ddlAuthSignIdentityProofTypetxt = '';
var txtAuthSignIdentityProofNumber = '';
var fAuthSignIdentityProof = '';
var numOfAuthSign = 0;

function AddData() {
	
	let IncrimentalID = ++rowIdx;
	$('#tbodyone').append(`<tr id="R${IncrimentalID}">
	<td align="center" style="text-align: center;"><input type="text" id="txtFirstNameAuthorized" class="form-control" /></td>
                        <td align="center" style="text-align: center;"><input type="text" id="txtLastNameAuthorized" class="form-control" /></td>
                        <td align="center" style="text-align: center;"><input type="text" id="txtDesignationAuthorized" class="form-control" /></td>
                        <td align="center" style="text-align: center;"><input type="text" maxlength="10" onkeypress="return onlyNumberKey(event)" id="txtMobileNoAuthorized" class="form-control" /></td>
                        <td align="center" style="text-align: center;"><input type="text" id="txtAddressAuthorized" class="form-control" /></td>
                        <td align="center" style="text-align: center;">
                          <select id="ddlAuthSignAddressProofType" class="form-control">
                            <option value="0">Select</option>
                            <option value="1">Passport</option>
                            <option value="2">Driving Licence</option>
                            <option value="3">Proof of possession of Aadhaar number</option>
                            <option value="4">Voters Identity Card issued by the Election Commission of India</option>
                          </select>
                        </td>
                       
                        <td align="center" style="text-align: center;"><input id="fAuthSignAddressProof" title="Address Proof Type" type="file" name="fAuthSignAddressProof" class="form-control" onchange="validateFile(this)"/></td>
                        <td align="center" style="text-align: center;">
                          <select id="ddlAuthSignIdentityProofType" class="form-control">
                            <option value="0">Select</option>
                            <option value="1">Passport</option>
                            <option value="2">Driving Licence</option>
                            <option value="3">PAN</option>
                            <option value="4">Proof of possession of Aadhaar number</option>
                            <option value="5">Voters Identity Card issued by the Election Commission of India</option>
                          </select>
                        </td>
                        
                        <td align="center" style="text-align: center;"><input id="fAuthSignIdentityProof" title="Identity Proof Type" type="file" name="fAuthSignIdentityProof" class="form-control" onchange="validateFile(this)"/></td>
						<td class="text-center">
						<button class="btn remove btn-danger btn-xs" type="button" style="min-width: auto;height: 22px !important;" onclick="remove(R${IncrimentalID});"><i class="fa fa-trash"></i></button>
						</td>
  
	 </tr>`);
}
var flag=false;
var DetailArrayAuthSign = [];
const addDetailstoautorised = (status) =>{
	var myTab = document.getElementById('tbodyone');
    // LOOP THROUGH EACH ROW OF THE TABLE AFTER HEADER.
        if(myTab.rows.length > 0)
        {
			
        for (i = 0; i < myTab.rows.length; i++) {

            // GET THE CELLS COLLECTION OF THE CURRENT ROW.
            var objCells = myTab.rows.item(i).cells;
			
            // LOOP THROUGH EACH CELL OF THE CURENT ROW TO READ CELL VALUES.
                var DetailColl = {};
            
            for (var j = 0; j < objCells.length; j++) {
            	
                debugger;(objCells.item(j).children[0].value);
                if(j==0){
                //DetailColl.InvoiceNumber= RefInvoiceNumber;
                if((objCells[j].children[0].value=="" || objCells[j].children[0].value== undefined) && status == "Submitted")
				{
					alert('Please enter First Name in row "'+(parseInt(i) + 1)+'"');
					flag=true;
					return false;
				}
				flag=false;
                DetailColl.txtFirstName = objCells[j].children[0].value;
			}
                if(j==1){
				if((objCells[j].children[0].value=="" || objCells[j].children[0].value== undefined) && status == "Submitted")
				{
					alert('Please enter Last Name in row "'+(parseInt(i) + 1)+'"');
					flag=true;
					return false;
				}
               // DetailColl.InvoiceDate= InvoiceDate;
			   flag=false;
                DetailColl.txtLastName = objCells[j].children[0].value;
			}
                if(j==2){
               // DetailColl.Description= Description;
			
                if((objCells[j].children[0].value=="" || objCells[j].children[0].value== undefined ) && status == "Submitted")
				{
					alert('Please enter Designation in row "'+(parseInt(i) + 1)+'"');
					flag=true;
					return false;
				}
				flag=false;
               DetailColl.txtDesignation = objCells[j].children[0].value;
			}
                if(j==3){
               // DetailColl.ExpenseSegments= ExpenseSegments;
               if((objCells[j].children[0].value=="" || objCells[j].children[0].value== 'Select')  && status == "Submitted")
				{
					alert('Please enter mobile number in row "'+(parseInt(i) + 1)+'"');
					flag=true;
					return false;
				}
				flag=false;
               DetailColl.txtMobileNo = objCells[j].children[0].value;
			}
                if(j==4){
				if((objCells[j].children[0].value=="" || objCells[j].children[0].value== 'Select') && status == "Submitted")
				{
					alert('Please enter EmailID type in row "'+(parseInt(i) + 1)+'"');
					flag=true;
					return false;
				}
               // DetailColl.VendorName= VendorName;
			   flag=false;
                DetailColl.txtAddressAuthorized = objCells[j].children[0].value;
			}
                if(j==5){
                //DetailColl.MSME = MSME;
                if((objCells[j].children[0].value=="" || objCells[j].children[0].value== undefined) && status == "Submitted")
				{
					alert('Please enter Address Proof Type in row "'+(parseInt(i) + 1)+'"');
					flag=true;
					return false;
				}
				flag=false;
                DetailColl.ddlAuthSignAddressProofType = objCells[j].children[0].value;
			}
                if(j==6){
               // DetailColl.OriginalInvoiceAmount = OriginalInvoiceAmount;
                if((objCells[j].children[0].value=="" || objCells[j].children[0].value== undefined) && status == "Submitted")
				{
					alert('Please enter fAuthSignAddressProof in row "'+(parseInt(i) + 1)+'"');
					flag=true;
					return false;
				}
				/*else if (!((objCells[j].children[0].files[0].name.endsWith(".pdf"))||(objCells[j].children[0].files[0].name.endsWith(".PDF")))) {
					alert('Please enter PDF File only in fAuthSignAddressProof in row "'+(parseInt(i) + 1)+'"');
					flag=true;
					return false;
				}*/
				flag=false;
                DetailColl.fAuthSignAddressProof = objCells[j].children[0].files[0];
			}
                if(j==7){
               // DetailColl.Deduction = Deduction;
               if((objCells[j].children[0].value=="" || objCells[j].children[0].value== undefined) && status == "Submitted")
				{
					alert('Please enter ddlAuthSignIdentityProofType in row "'+(parseInt(i) + 1)+'"');
					flag=true;
					return false;
				}
				flag=false;
                DetailColl.ddlAuthSignIdentityProofType = objCells[j].children[0].value;
			}
				if(j==8){
				// DetailColl.Deduction = Deduction;
				if((objCells[j].children[0].value=="" || objCells[j].children[0].value== undefined) && status == "Submitted")
				 {
					 alert('Please enter fAuthSignIdentityProof in row "'+(parseInt(i) + 1)+'"');
					 flag=true;
					 return false;
				 }
				/*else if (
					!((objCells[j].children[0].files[0].name.endsWith(".pdf"))||
					(objCells[j].children[0].files[0].name.endsWith(".PDF")))
					) {
					alert('Please enter PDF File only in fAuthSignIdentityProof in row "'+(parseInt(i) + 1)+'"');
					flag=true;
					return false;			
					}*/
					flag=false;
				 DetailColl.fAuthSignIdentityProof = objCells[j].children[0].files[0];
				}
                if(j == 9)  
                	{
                		DetailArrayAuthSign.push(DetailColl); 
                		
                	}
				//
				
            }    
                  
        }
       
    }
}
function remove(ID){
	let CredensialID = ID.id;
	$("#"+CredensialID+"").empty();
   $("#"+CredensialID+"").remove();

}

var DetailArrayAuthSign = [];
function AddtoColl() {
	var DetailColl = {};
	DetailColl.txtFirstName = txtFirstNameAuthorized;
	DetailColl.txtLastName = txtLastNameAuthorized;
	DetailColl.txtDesignation = txtDesignationAuthorized;
	DetailColl.txtMobileNo = txtMobileNoAuthorized;
	DetailColl.txtAddressAuthorized = txtAddressAuthorized;

	DetailColl.ddlAuthSignAddressProofType = ddlAuthSignAddressProofType;
	DetailColl.ddlAuthSignAddressProofTypetxt = ddlAuthSignAddressProofTypetxt;
	//DetailColl.txtAuthSignAddressProofNumber = txtAuthSignAddressProofNumber;
	//DetailColl.txtAuthSignAddressProofNumberMasked = txtAuthSignAddressProofNumber.replace(/\d/g, "X") + txtAuthSignAddressProofNumber.substr(txtAuthSignAddressProofNumber.length-4, 4);

	DetailColl.fAuthSignAddressProof = fAuthSignAddressProof;
	DetailColl.ddlAuthSignIdentityProofType = ddlAuthSignIdentityProofType;
	DetailColl.ddlAuthSignIdentityProofTypetxt = ddlAuthSignIdentityProofTypetxt;
	//DetailColl.txtAuthSignIdentityProofNumber = txtAuthSignIdentityProofNumber;
	//DetailColl.txtAuthSignIdentityProofNumberMasked = txtAuthSignIdentityProofNumber.replace(/\d/g, "X") + txtAuthSignIdentityProofNumber.substr(txtAuthSignIdentityProofNumber.length-4, 4);
	DetailColl.fAuthSignIdentityProof = fAuthSignIdentityProof;

	DetailArrayAuthSign.push(DetailColl);
	$('#tbodyRequestor').empty();
	bindData(DetailArrayAuthSign);
}
function bindData(DetailArray) {
	var flag = false;
	if (DetailArray.length > 0) {
		flag = true;
	}
	var tableHTML = '';
	var TotalBillAmount = 0;
	{
		$('#tblData thead').append("<tr></tr>");
		//var searchRow = $('#tblData thead tr').eq(1);
		if (flag == true) {
			for (var t = 0; t < DetailArray.length; t++) {
				tableHTML += '<tr><td style="text-align:center; color: #333; font-size: 14px;">' + DetailArray[t].txtFirstName + '</td><td style="text-align:center; color: #333; font-size: 14px;">' + DetailArray[t].txtLastName + '</td><td style="text-align:center; color: #333; font-size: 14px;">' + DetailArray[t].txtDesignation + '</td><td style="text-align:center; color: #333; font-size: 14px;">' + DetailArray[t].txtMobileNo + '</td><td style="text-align:center; color: #333; font-size: 14px;">' + DetailArray[t].txtAddressAuthorized + '</td><td style="text-align:center; color: #333; font-size: 14px;">' + DetailArray[t].ddlAuthSignAddressProofTypetxt + '</td><td style="text-align:center; color: #333; font-size: 14px;">' + (DetailArray[t].fAuthSignAddressProof != undefined ? DetailArray[t].fAuthSignAddressProof.name : '') + '</td><td style="text-align:center; color: #333; font-size: 14px;">' + DetailArray[t].ddlAuthSignIdentityProofTypetxt + '</td><td style="text-align:center; color: #333; font-size: 14px;">' + (DetailArray[t].fAuthSignIdentityProof != undefined ? DetailArray[t].fAuthSignIdentityProof.name : '') + '</td><td class="CenterAlign"><a href="#" title="Delete" onclick="DeleteRow(' + t + ')"><span class="glyphicon glyphicon-trash"></span></a></td></tr>';
			}
		}
		else {
			console.log();
		}
		$('#tbodyRequestor').append(tableHTML);
		$(".removeThisSelect").hide();
		document.getElementById("txtFirstNameAuthorized").value = "";
		document.getElementById("txtLastNameAuthorized").value = "";
		document.getElementById("txtDesignationAuthorized").value = "";
		document.getElementById("txtMobileNoAuthorized").value = "";
		document.getElementById("txtAddressAuthorized").value = "";
		document.getElementById("ddlAuthSignAddressProofType").value = 0;
		//document.getElementById("txtAuthSignAddressProofNumber").value = "";
		document.getElementById("fAuthSignAddressProof").value = "";
		document.getElementById("ddlAuthSignIdentityProofType").value = "";
		//document.getElementById("txtAuthSignIdentityProofNumber").value = "";
		document.getElementById("fAuthSignIdentityProof").value = "";
	}
}
function DeleteRow(t) {
	DetailArrayAuthSign.splice(t, 1);
	$('#tbodyRequestor').empty();
	bindData(DetailArrayAuthSign);
}

var txtFirstNameDelegated = '';
var txtLastNameDelegated = '';
var txtDesignationDelegated = '';
var txtMobileNoDelegated = '';
var txtAddressDelegated = '';
var ddlDelAuthAddressProofType = '';
var ddlDelAuthAddressProofTypetxt = '';
var txtDelAuthAddressProofNumber = '';
var fDelAuthAddressProof = '';
var ddlDelAuthIdentityProofType = '';
var ddlDelAuthIdentityProofTypetxt = '';
var txtDelAuthIdentityProofNumber = '';
var fDelAuthIdentityProof = '';
var numOfDelgAuth = 0;

function AddDataDelegated() {
	txtFirstNameDelegated = $('#txtFirstNameDelegated').val();
	txtLastNameDelegated = $('#txtLastNameDelegated').val();
	txtDesignationDelegated = $('#txtDesignationDelegated').val();
	txtMobileNoDelegated = $('#txtMobileNoDelegated').val();
	txtAddressDelegated = $('#txtAddressDelegated').val();

	ddlDelAuthAddressProofType = $('#ddlDelAuthAddressProofType').val();
	ddlDelAuthAddressProofTypetxt = $('#ddlDelAuthAddressProofType option:selected').text();
	
	fDelAuthAddressProof = document.getElementById('fDelAuthAddressProof').files[0];
	ddlDelAuthIdentityProofType = $('#ddlDelAuthIdentityProofType').val();
	ddlDelAuthIdentityProofTypetxt = $('#ddlDelAuthIdentityProofType option:selected').text();

	fDelAuthIdentityProof = document.getElementById('fDelAuthIdentityProof').files[0];

	if (txtFirstNameDelegated == undefined || txtFirstNameDelegated == "" || txtFirstNameDelegated == null) {
		alert('Please enter First Name');
		return false;
	}
	if(txtFirstNameDelegated!=""||txtFirstNameDelegated!=null){
		if (txtLastNameDelegated == undefined || txtLastNameDelegated == "" || txtLastNameDelegated == null) {
			alert('Please enter Last Name');
			return false;
		}
		if (txtDesignationDelegated == undefined || txtDesignationDelegated == "" || txtDesignationDelegated == null) {
			alert('Please enter Designation');
			return false;
		}
		if (txtMobileNoDelegated == undefined || txtMobileNoDelegated == "" || txtMobileNoDelegated == null) {
			alert('Please enter Mobile No.');
			return false;
		}
		else if(txtMobileNoDelegated.length!=10){
			alert("Please Enter Valid mobile no.")
			return false;
		}
		if (txtAddressDelegated == undefined || txtAddressDelegated == "" || txtAddressDelegated == null) {
			alert('Please enter Address');
			return false;
		}
		if (fDelAuthAddressProof.length <= 0 && fDelAuthIdentityProof.length <= 0) {
			alert('Please enter atleast one proof document');
			return false;
		}
		else if(!(document.getElementById('fDelAuthAddressProof').files[0].name.endsWith(".pdf")||document.getElementById('fDelAuthAddressProof').files[0].name.endsWith(".PDF"))){
			alert("Please Enter PDF file in Authorized Address Proof");
			return false;
		}
		if(!((document.getElementById('fDelAuthIdentityProof').files[0].name.endsWith(".pdf"))||(document.getElementById('fDelAuthIdentityProof').files[0].name.endsWith(".PDF")))){
			alert("Please Enter PDF file in Authorized Identity Proof");
			return false;
		}
	}
	AddtoCollDelegated();
}
var DetailArrayDelegated = [];
function AddtoCollDelegated() {
	var DetailColl = {};
	DetailColl.txtFirstName = txtFirstNameDelegated;
	DetailColl.txtLastName = txtLastNameDelegated;
	DetailColl.txtDesignation = txtDesignationDelegated;
	DetailColl.txtMobileNo = txtMobileNoDelegated;
	DetailColl.txtAddressAuthorized = txtAddressDelegated;

	DetailColl.ddlDelAuthAddressProofType = ddlDelAuthAddressProofType;
	DetailColl.ddlDelAuthAddressProofTypetxt = ddlDelAuthAddressProofTypetxt;

	//DetailColl.txtDelAuthAddressProofNumberMasked = txtDelAuthAddressProofNumber.replace(/\d/g, "X") + txtDelAuthAddressProofNumber.substr(txtDelAuthAddressProofNumber.length-4, 4);
	
	DetailColl.fDelAuthAddressProof = fDelAuthAddressProof;
	DetailColl.ddlDelAuthIdentityProofType = ddlDelAuthIdentityProofType;
	DetailColl.ddlDelAuthIdentityProofTypetxt = ddlDelAuthIdentityProofTypetxt;

	//DetailColl.txtDelAuthIdentityProofNumberMasked = txtDelAuthIdentityProofNumber.replace(/\d/g, "X") + txtDelAuthIdentityProofNumber.substr(txtDelAuthIdentityProofNumber.length-4, 4);
	DetailColl.fDelAuthIdentityProof = fDelAuthIdentityProof;

	DetailArrayDelegated.push(DetailColl);
	$('#tbodyRequestorDelegated').empty();
	bindDataDelegated(DetailArrayDelegated);
}
function bindDataDelegated(DetailArray) {
	var flag = false;
	if (DetailArray.length > 0) {
		flag = true;
	}
	var tableHTML = '';
	var TotalBillAmount = 0;
	{
		$('#tblDataDelegated thead').append("<tr></tr>");
		//var searchRow = $('#tblData thead tr').eq(1);
		if (flag == true) {
			for (var t = 0; t < DetailArray.length; t++) {
				tableHTML += '<tr><td style="text-align:center; color: #333; font-size: 14px;">' + DetailArray[t].txtFirstName + '</td><td style="text-align:center; color: #333; font-size: 14px;">' + DetailArray[t].txtLastName + '</td><td style="text-align:center; color: #333; font-size: 14px;">' + DetailArray[t].txtDesignation + '</td><td style="text-align:center; color: #333; font-size: 14px;">' + DetailArray[t].txtMobileNo + '</td><td style="text-align:center; color: #333; font-size: 14px;">' + DetailArray[t].txtAddressAuthorized + '</td><td style="text-align:center; color: #333; font-size: 14px;">' + DetailArray[t].ddlDelAuthAddressProofTypetxt + '</td><td style="text-align:center; color: #333; font-size: 14px;">' + (DetailArray[t].fDelAuthAddressProof != undefined ? DetailArray[t].fDelAuthAddressProof.name : '') + '</td><td style="text-align:center; color: #333; font-size: 14px;">' + DetailArray[t].ddlDelAuthIdentityProofTypetxt + '</td><td style="text-align:center; color: #333; font-size: 14px;">' + (DetailArray[t].fDelAuthIdentityProof != undefined ? DetailArray[t].fDelAuthIdentityProof.name : '') + '</td><td class="CenterAlign"><a href="#" title="Delete" onclick="DeleteRowDelegated(' + t + ')"><span class="glyphicon glyphicon-trash"></span></a></td></tr>';
			}
		}
		else {
			console.log();
		}
		$('#tbodyRequestorDelegated').append(tableHTML);
		$(".removeThisSelectDelegated").hide();
		document.getElementById("txtFirstNameDelegated").value = "";
		document.getElementById("txtLastNameDelegated").value = "";
		document.getElementById("txtDesignationDelegated").value = "";
		document.getElementById("txtMobileNoDelegated").value = "";
		document.getElementById("txtAddressDelegated").value = "";
		document.getElementById("ddlDelAuthAddressProofType").value = 0;
		//document.getElementById("txtDelAuthAddressProofNumber").value = "";
		document.getElementById("fDelAuthAddressProof").value = "";
		document.getElementById("ddlDelAuthIdentityProofType").value = "";
		//document.getElementById("txtDelAuthIdentityProofNumber").value = "";
		document.getElementById("fDelAuthIdentityProof").value = "";
	}
}
function DeleteRowDelegated(t) {
	DetailArrayDelegated.splice(t, 1);
	$('#tbodyRequestorDelegated').empty();
	bindDataDelegated(DetailArrayDelegated);
}

var vTitle;
var ELIChecker;

function checkedEmailAddressNew(txtEmailIdAdministrator) {
	var vRetVal = false;
	var hdnCounter = '';
	var requestUri = location.origin + "/_api/cr6fc_registrationcontacts?$top=2&$select=*&$filter=cr6fc_useremail eq '"+txtEmailIdAdministrator+"'";
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
			var Logg = data.value;
			try {
				if(Logg.length>0)
				{
					vRetVal = true;
				}
			}
			catch (e) {
			}
		},
		error: function () {
			console.log("error");
		}
	});
	return vRetVal;
}
function GetCounter() {
	var vRetVal = '';
	var hdnCounter = '';
	// var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CounterMaster')//items?$top=500&$select=CGApplicationNo,ID,Title&$filter=Title eq 'CGApplication'&$orderby=CGApplicationNo desc";
	var requestUri = location.origin + "/_api/cr6fc_countermasters?$top=500&$select=*&$filter=cr6fc_name eq 'Registration'";
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
			var Logg = data.value;
			try {
				var dtt = new Date();
				var dd = dtt.getDate();
				var mm = dtt.getMonth();
				var actmonh = mm + parseInt(1);
				actmonh = '' + actmonh;
				var calmonth;
				if (actmonh.length == 1) {
					calmonth = '0' + actmonh;
				}
				else {
					calmonth = actmonh;
				}
				var yyyy = dtt.getFullYear();
				var month = new Array();

				if (Logg.length > 0) {
					var ItemId = Logg[0].cr6fc_cgapplicationno;

					hdnCounter = parseInt(ItemId) + 1;
					vRetVal = ' ELIRFPO' + dd + '' + calmonth + '' + yyyy + '000' + hdnCounter;
					document.getElementById("hdnDigitalRequestNo").value = vRetVal;
					document.getElementById("hdnCounterItemID").value = Logg[0].cr6fc_cgapplicationno;
					document.getElementById("hdnCounterItemID1").value = Logg[0].cr6fc_countermasterid;

				}
			}
			catch (e) {
			}
			// UpdateCounter();
		},
		error: function () {
			console.log("error");
		}
	});
	return vRetVal;
}
var SubStatus;
function SubmitData(status) {
	
	var txtBankName = $("#txtBankName").val();
	if ((txtBankName == "" || txtBankName == undefined)) {
		alert('Please Enter Bank Name')
		return false;
	}

	/*var txtRegistrationName = $("#txtRegistrationName").val();
	if ((txtRegistrationName == "" || txtRegistrationName == undefined) && status == "Submitted") {
		alert('Please Enter Registration Name')
		return false;
	}*/
	var txtTypeofBank = $("#txtTypeofBank option:selected").val();
	if ((txtTypeofBank == 0 || txtTypeofBank == undefined) && status == "Submitted") {
		alert('Please Enter Type Of Bank')
		return false;
	}
	else if(txtTypeofBank == 0 ||txtTypeofBank==undefined ){
		txtTypeofBank = "fd6165f3-5a58-ee11-be6f-000d3a0aabb1"
	}
	var txtPan = $("#txtPan").val();
	if((txtPan ==""|| txtPan ==undefined)){
		alert('Please Enter PAN No')
		return false;
	   }
	   else 
	   {
		   var regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
		   
		   if (!regex.test(txtPan)) {
		   alert('Please Enter Valid PAN Number')
		   
		   return false;
		   }
   
	   }
		 if (txtPan.length!=10){
		  alert('Please Enter Valid PAN Number')
		  return false;
	   }
	   var GSTINFPO = $("#GSTINFPO").val();
	   if ((GSTINFPO == "" || GSTINFPO == null)&& status == "Submitted") {		
			   alert('Please Enter GSTIN Number')
			   return false;	
	   }
	   if (GSTINFPO != "" && GSTINFPO != null && status == "Submitted") {
		   if (GSTINFPO.length != 15) {
			   alert('Please Enter Valid GSTIN Number')
			   return false;
		   }
	   }
	   var txtWebsite = $('#txtWebsite').val();
	if ((txtWebsite == "" || txtWebsite == undefined) && status == "Submitted") {
		alert('Please enter Website')
		return false;
	}


	
	var txtAddress = $("#txtAddress").val();
	if ((txtAddress == "" || txtAddress == undefined) && status == "Submitted") {
		alert('Please Enter Address')
		return false;
	}
	var txtCity = $("#txtCity").val();
	if ((txtCity == "" || txtCity == undefined) && status == "Submitted") {
		alert('Please Enter City')
		return false;
	}
	
	
	var ddlState = $("#ddlState option:selected").val();
	if ((ddlState == "" || ddlState == undefined || ddlState == "0" || ddlState == 0) && status == "Submitted") {
		alert('Please Select State')
		return false;
	}
    else if(ddlState == "" || ddlState == undefined || ddlState == "0" || ddlState == 0){
		ddlState="e018b138-4231-ee11-bdf4-000d3a0aabb1"
	}
	
	var txtpincode =$("#txtpincode").val();
	if((txtpincode=="" || txtpincode==undefined) && status=="Submitted"){
		alert('Please Enter Pincode')
		return false;
	   }
	   else if(txtpincode.length!=6 && status=="Submitted"){ alert("Please Enter The valid pincode")
	   return false;}
	
	
   var txtTelephoneNo = $("#txtTelephoneNo").val();
	if (document.getElementById('fBodReslCert').files.length <= 0 && status == "Submitted") {
		alert('Please provide Certified copy of Resolution from Board of Directors')
		return false;
	}
	
	if (document.getElementById('fPANLICert').files.length <= 0 && status == "Submitted") {
		alert('Please provide Certified copy of Permanent Account Number of LI')
		return false;
	}
	
	if (document.getElementById('fAddProofUtility').files.length <= 0 && status == "Submitted") {
		alert('Please provide Address Proof of EL')
		return false;
	}
	
	if (document.getElementById('fOrgUndertaking').files.length <= 0 && status == "Submitted") {
		alert('Please provide Original Undertaking')
		return false;
	}
	
	if (document.getElementById('fCertGSTIN').files.length <= 0 && status == "Submitted") {
		alert('Please provide Certified Copy GSTIN*')
		return false;
	}
	


	
	if (status == "Draft") {
		SubStatus = "6";
	}
	else if (status == "Submitted") {
		SubStatus = "1";
	}
     if( status == "Submitted"){
			// if (DetailArrayAuthSign != undefined) {
			// 	if (DetailArrayAuthSign.length == 0) {
			// 		alert('Enter atleast one record of Authority')
			// 		return false;
			// 	}
			// }
			// ese {
			// 	alert('Enter atleast one record of Authorized Signatory')
			// 	rleturn false;
			// }


			
	 }
     var txtFirstNameDelegated = $("#txtFirstNameDelegated").val();
	 if (txtFirstNameDelegated!=""){
	 if (DetailArrayDelegated != undefined  ) {
				if (DetailArrayDelegated.length == 0) {
					alert('Enter atleast one record of Delegation of Authority')
					return false;
				}
			}
			else {
				alert('Enter atleast one record of Delegation of Authority')
				return false;
			}
		}
	//************************* */
	var txtFirstNameAdministrator = $('#txtFirstNameAdministrator').val();
	if ((txtFirstNameAdministrator == "" || txtFirstNameAdministrator == undefined) && status == "Submitted") {
		alert('Please enter First Name of Administrator')
		return false;
	}
    var txtLastNameAdministrator = $('#txtLastNameAdministrator').val();
	if ((txtLastNameAdministrator == "" || txtLastNameAdministrator == undefined) && status == "Submitted") {
		alert('Please enter Last Name of Administrator')
		return false;
	}
	var txtDesignationAdministrator = $('#txtDesignationAdministrator').val();
	if ((txtDesignationAdministrator == "" || txtDesignationAdministrator == undefined) && status == "Submitted") {
		alert('Please enter Designation  of Administrator')
		return false;
	}
	var txtMobileNoAdministrator = $('#txtMobileNoAdministrator').val();
	if ((txtMobileNoAdministrator == "" || txtMobileNoAdministrator == undefined) && status == "Submitted") {
		alert('Please enter Mobile no of Administrator')
		return false;
	}
	else {
		var regex = /^\d*(?:\.\d{1,2})?$/;
		if (!regex.test(txtMobileNoAdministrator) && status == "Submitted") {
			alert('Please Enter Valid Mobile Number of Administrator')

			return false;
		}

	}
	if (txtMobileNoAdministrator.length != 10 && status == "Submitted") {
		alert('Please Enter Valid Mobile No of Administrator')
		return false;
	}

	var txtEmailIdAdministrator = $('#txtEmailIdAdministrator').val();
	if ((txtEmailIdAdministrator == "" || txtEmailIdAdministrator == undefined) && status == "Submitted") {
		alert('Please enter Email Address of Administrator')
		return false;
	}
	else {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (!regex.test(txtEmailIdAdministrator) && status == "Submitted") {
			alert('Please Enter Valid Email Address of Administrator')

			return false;
		}

	}
	var checkedEmailAddress=checkedEmailAddressNew(txtEmailIdAdministrator);
	if(checkedEmailAddress)
	{
		alert('Duplicate Admin Email Address found')
		return false;
	}
	

	if (document.getElementById('fAddressProof').files.length <= 0  && status == "Submitted") {
		alert('Please provide Address proof document of Administrator')
		return false;
	}
	
	if( document.getElementById('fIdentityProof').files.length <= 0&& status == "Submitted")
	{
		alert('Please provide Identity proof document of Administrator')
		return false;
	}

if(document.getElementById('fAddressProof').files.length>0){
	var optionAddressProofType = $('#ddlAddressProofType').val();
	if ((optionAddressProofType == 0 || optionAddressProofType == undefined)&& status == "Submitted") {
		alert("PLease Enter the Address proof Type")
		return false;
	}
	
}
if(document.getElementById('fIdentityProof').files.length>0){
	var optionIdentityProofType = $('#ddlIdentityProofType').val();
	if ((optionIdentityProofType == 0 || optionIdentityProofType == undefined)&& status == "Submitted") {
		alert("Please Enter the Identity Proof Type");
		return false;
	}
}

if(document.getElementById('letterAuthorityAdd').files.length>0){
	var leeterofAuthorityAdd = $('#letterAuthorityAdd').val();
	if ((leeterofAuthorityAdd == 0 || leeterofAuthorityAdd == undefined)&& status == "Submitted") {
		alert("PLease Enter the Letter of Authority for Administrator")
		return false;
	}
}
	var optionAddressProofType = $('#ddlAddressProofType').val();
	if ((optionAddressProofType == "" || optionAddressProofType == undefined)&& status == "Submitted") {
		optionAddressProofType = 0;
	}
	
	var optionIdentityProofType = $('#ddlIdentityProofType').val();
	if ((optionIdentityProofType == "" || optionIdentityProofType == undefined)&& status == "Submitted") {
		optionIdentityProofType = 0;
	}
	var txtDescription = $("#txtDescription").val()
	

	var ContactColl = [];

	var contact = {};
	if(txtFirstNameAdministrator !=''){contact.FirstName = txtFirstNameAdministrator;}
	if(txtLastNameAdministrator !=''){contact.LastName = txtLastNameAdministrator;}
	if(txtEmailIdAdministrator !=''){contact.Email = txtEmailIdAdministrator;}
	if(txtDesignationAdministrator !=''){contact.Designation = txtDesignationAdministrator;}
	if(txtMobileNoAdministrator !=''){contact.Mobile = txtMobileNoAdministrator;}
	if(txtFirstNameAdministrator !=''){contact.UserType = "3";}
	if(optionAddressProofType != 0 ){contact.AddressProofType = optionAddressProofType;}
	if(optionIdentityProofType != 0 ){contact.IdentityProofType = optionIdentityProofType;}
	if($.isEmptyObject(contact) == false){
		ContactColl.push(contact);
	 
		}
	//************************* */

	vTitle = GetCounter();


	var ELICheckerEmail = $('#ELICheckerEmail').val();
	var EILchecker;
	if (ELICheckerEmail != null && ELICheckerEmail != undefined && ELICheckerEmail != '') {
		EILchecker = GetUserId1(ELICheckerEmail);
	}

	if (EILchecker == -1) {
		alert('There is no valid EIL Checker against this Lending Institute')
		return false;
	}

	if (EILchecker == 0) {
		alert('There is no EIL Checker against this Lending Institute')
		return false;
	}
	var requesterRemark=$('#txtmakerComment').val();
    var EmailID = $('#RequesterEmailAddress').val();
	var hdnNSMaker = $('#hdnNSMaker').val();
	var hdnNSChecker = $('#hdnNSChecker').val();
	var hdnNSApprover = $('#hdnNSApprover').val();
	addDetailstoautorised(status);
	if(flag == true){
		return false;
	}
	$('#btnSave').prop('disabled', true);
	$('#btn1').prop('disabled', true);

	var data = JSON.stringify(
		{
			"cr6fc_name": vTitle,
			"cr6fc_bankname": txtBankName,
			"cr6fc_TypeOfBank@odata.bind":"/cr6fc_banktypes("+ txtTypeofBank +")",
			"cr6fc_address": txtAddress,
			"cr6fc_city": txtCity,
			"cr6fc_gstin": GSTINFPO,
			"cr6fc_pannumber": txtPan,
			"cr6fc_pincode":txtpincode,
			"cr6fc_State@odata.bind": "/cr6fc_statemasters(" + ddlState + ")",
			"cr6fc_website": txtWebsite,
			"cr6fc_requeststatus": SubStatus,
			"cr6fc_telephonenumber": txtTelephoneNo,
			"cr6fc_administratorfirstname":txtFirstNameAdministrator,
			"cr6fc_administratorlastname":txtLastNameAdministrator,
			"cr6fc_administratordesignation": txtDesignationAdministrator,
			"cr6fc_administratormobileno": txtMobileNoAdministrator,
			//"cr6fc_administratoraddress": txtEmailIdAdministrator, 
			"cr6fc_administratoremailaddress":txtEmailIdAdministrator,
			"cr6fc_NSMaker_contact@odata.bind": "/contacts(" + hdnNSMaker + ")",
			"cr6fc_NSChecker_contact@odata.bind": "/contacts(" + hdnNSChecker + ")",
			"cr6fc_NSApprover_contact@odata.bind": "/contacts(" + hdnNSApprover + ")",
			"cr6fc_Requester_contact@odata.bind": "/contacts(" + loggedInUserId + ")",
			"cr6fc_requesterremark":requesterRemark,
			"cr6fc_otherdescription":txtDescription,
			"cr6fc_emailid":EmailID,
			"cr6fc_userfirstname":$("#userfirstname").text(),
			"cr6fc_userlastname":$("#userlastname").text(),
			"cr6fc_userdesignation":$("#userDesignation").text(),
			"cr6fc_usermobilenumber":$("#userMobilenumber").text()
				});

	shell.getTokenDeferred().done(function (token) {
		console.log(token)
		var header = {
			__RequestVerificationToken: token,
			contentType: "application/json;odata=verbose"
		}
		$.ajax({
			url: "/_api/cr6fc_makerregistrationrequests",
			type: "POST",
			headers: header,
			async: false,
			data: data,
			//success: function (success) {
			success: function (data, textStatus, xhr) {
				successId = xhr.getResponseHeader("entityid");
				console.log(successId);
				//successId = success.Id;
				//console.log(successId);
				uploadEliDocuments(token, successId).done(function (eliDocRes) {
					createAuthorizedSign(token, vTitle, successId,status).done(function (authSignResp) {
						createDelegatedAutho(token, vTitle, successId).done(function (delgAuthResp) {
							createContact(token, vTitle, successId, ContactColl).done(function (contactResp) {
								UpdateCounter(token).done(function (counterResp) {
									UploadotherDocument(token, successId).done(function(OtherDocumentResp){
								if(SubStatus == "6"){
									alert("Application for ELI registration has been Saved")
								}else{
									alert('Application for ELI registration has been successfully submitted.')
								}
								window.location.href = location.origin + "/refreshingcache/?id=" + AuthorizedsignentityID+","+otherdocumententityid+","+registrationcontactentityid+","+createDelegatedAuthoentityid + "&tbl=cr6fc_registrationauthorizedsignrequestses,cr6fc_registrationotherdocuments,cr6fc_registrationcontacts,cr6fc_registrationdelgatedauthorequestses&col=cr6fc_cacherefreshedon&red=RegisterDashboard";
								//window.location.href = location.origin + "/RegisterDashboard/";
									});
								});
							});
						});
					});
				});
			},
			error: function (error) {
				console.log(error);
				alert('Some error occured while adding data in ELI Maker Registration list. Please try again later.');
				console.log(error);
			}
		})
	})
	//}
}

function getFileContentsAndMetadata(entityID, token) {
	// Get the name of the selected file
	var fileName = encodeURIComponent(document.getElementById('fileAuthorityAadharAttach').files[0].name);
	// Get the content of the selected file
	var file = document.getElementById('fileAuthorityAadharAttach').files[0];
	// If the user has selected a file
	if (file) {
		// Read the file as a byte array
		var reader = new FileReader();
		reader.readAsArrayBuffer(file);
		// The browser has finished reading the file, we can now do something with it...
		reader.onload = function (e) {
			// The browser has finished reading the file, we can now do something with it...
			var fileContent = e.target.result;
			// Run the function to upload to the Portal Web API, passing the GUID of the newly created record and the file's contents and name as inputs
			uploadFile(fileContent, fileName, entityID, token, file.type);
		};
	}
}

// Upload the file to
function uploadFile(fileContent, fileName, entityID, token, Filecontenttype) {

	var data1 = JSON.stringify({
		cr6fc_registrationname: fileName
		//"value":2

	});
	var header = {
		__RequestVerificationToken: token,
		Accept: 'application/json;odata=verbose',
		XRequestDigest: $("#__REQUESTDIGEST").val(),
		// IFMATCH: "*",
		// XHttpMethod: "PUT"
	}
	$.ajax({
		url: "/_api/cr6fc_makerregistrationrequests(" + entityID + ")/cr6fc_attachmentfile?x-ms-file-name=" + fileName,
		type: "PUT",
		async: false,
		contentType: "application/octet-stream",
		processData: false,
		// data: fileContent,
		data: fileContent,
		headers: header,
		success: function (data, textStatus, xhr) {
			audioPlayerSrcURL = '/File/download.aspx?Entity=musdyn_track' + '&Attribute=cr6fc_attachmentfile&Id=' + entityID;
			// AddDashBoard(document.getElementById("hdnDigitalRequestNo").value, document.getElementById("hdnApprvlNotesItemID").value);
			//alert('Data Done')
		},
		error: function (xhr, textStatus, errorThrown) {
			console.log(errorThrown)
		}
	});
	
}

var authSignDeferred = $.Deferred();
var authSignResp = [];
var AuthorizedsignentityID;
function createAuthorizedSign(token, vTitle, entityID,status) {
	
	if (DetailArrayAuthSign.length > 0 && DetailArrayAuthSign[numOfAuthSign].txtFirstName !='') {
		//for (var i = 0; i < DetailArrayAuthSign.length; i++) {
		var data = JSON.stringify(
			{
				"cr6fc_name": vTitle,
				"cr6fc_mrid": entityID,
				//"cr6fc_authorizedname": DetailArrayAuthSign[numOfAuthSign].txtName,
				"cr6fc_authorizedfirstname":DetailArrayAuthSign[numOfAuthSign].txtFirstName,
				"cr6fc_authorizedlastname":DetailArrayAuthSign[numOfAuthSign].txtLastName,
				"cr6fc_authorizeddesignation": DetailArrayAuthSign[numOfAuthSign].txtDesignation,
				"cr6fc_authorizeddesignation": DetailArrayAuthSign[numOfAuthSign].txtMobileNo,
				"cr6fc_authorizedaddress": DetailArrayAuthSign[numOfAuthSign].txtAddressAuthorized,
				"cr6fc_addressprooftype": DetailArrayAuthSign[numOfAuthSign].ddlAuthSignAddressProofType,
				//"cr6fc_addressproofnumber": DetailArrayAuthSign[numOfAuthSign].txtAuthSignAddressProofNumber,
				"cr6fc_identityprooftype": DetailArrayAuthSign[numOfAuthSign].ddlAuthSignIdentityProofType,
				//"cr6fc_identityproofnumber": DetailArrayAuthSign[numOfAuthSign].txtAuthSignIdentityProofNumber,
			});
		var header = {
			__RequestVerificationToken: token,
			contentType: "application/json;odata=verbose"
		}
		$.ajax({
			url: "/_api/cr6fc_registrationauthorizedsignrequestses",
			type: "POST",
			headers: header,
			async: false,
			data: data,
			success: function (data, textStatus, xhr) {
				console.log(xhr);
				AuthorizedsignentityID = xhr.getResponseHeader("entityid");
				if (DetailArrayAuthSign[numOfAuthSign].fAuthSignAddressProof != undefined && DetailArrayAuthSign[numOfAuthSign].fAuthSignIdentityProof != undefined) {
					uploadUserDocument(DetailArrayAuthSign[numOfAuthSign].fAuthSignAddressProof, token, xhr.getResponseHeader("entityid"), "cr6fc_registrationauthorizedsignrequestses", "cr6fc_addressproofdocument").done(function (addrProofDocResp) {
						uploadUserDocument(DetailArrayAuthSign[numOfAuthSign].fAuthSignIdentityProof, token, xhr.getResponseHeader("entityid"), "cr6fc_registrationauthorizedsignrequestses", "cr6fc_identityproofdocument").done(function (idenProofDocResp) {
							console.log(xhr);
							numOfAuthSign++;
							if (numOfAuthSign <= DetailArrayAuthSign.length - 1) {
								createAuthorizedSign(token, vTitle, entityID);
							} else {
								authSignDeferred.resolve(xhr);
							}
						});
						console.log(xhr);
					});
				} 
				else {
					if (DetailArrayAuthSign[numOfAuthSign].fAuthSignAddressProof != undefined) {
						uploadUserDocument(DetailArrayAuthSign[numOfAuthSign].fAuthSignAddressProof, token, xhr.getResponseHeader("entityid"), "cr6fc_registrationauthorizedsignrequestses", "cr6fc_addressproofdocument").done(function (addrProofDocResp) {
							console.log(xhr);
							numOfAuthSign++;
							if (numOfAuthSign <= DetailArrayAuthSign.length - 1) {
								createAuthorizedSign(token, vTitle, entityID);
							} else {
								authSignDeferred.resolve(xhr);
							}
						});
					}
					if (DetailArrayAuthSign[numOfAuthSign].fAuthSignIdentityProof != undefined) {
						uploadUserDocument(DetailArrayAuthSign[numOfAuthSign].fAuthSignIdentityProof, token, xhr.getResponseHeader("entityid"), "cr6fc_registrationauthorizedsignrequestses", "cr6fc_identityproofdocument").done(function (idenProofDocResp) {
							console.log(xhr);
							numOfAuthSign++;
							if (numOfAuthSign <= DetailArrayAuthSign.length - 1) {
								createAuthorizedSign(token, vTitle, entityID);
							} else {
								authSignDeferred.resolve(xhr);
							}
						});
					}
				}
				//authSignDeferred.resolve(xhr);
			},
			error: function (e) {
				console.log(e);
				authSignDeferred.reject(e);
			}
		});
		
	}
	else{
		authSignDeferred.resolve(authSignResp);
	}
	authSignDeferred.resolve(authSignResp);
	return authSignDeferred.promise();

}

var delAuthDeferred = $.Deferred();
var delgAuthResp =[];
var createDelegatedAuthoentityid;
function createDelegatedAutho(token, vTitle, entityID) {
	if (DetailArrayDelegated.length > 0) {
		//for (var i = 0; i < DetailArrayDelegated.length; i++) {
		var data = JSON.stringify(
			{
				"cr6fc_name": vTitle,
				"cr6fc_mrid": entityID,
				//"cr6fc_delegatedname": DetailArrayDelegated[numOfDelgAuth].txtName,
				"cr6fc_delegatedfirstname": DetailArrayDelegated[numOfDelgAuth].txtFirstName,
				"cr6fc_delegatedlastname": DetailArrayDelegated[numOfDelgAuth].txtLastName,
				"cr6fc_delegateddesignation": DetailArrayDelegated[numOfDelgAuth].txtDesignation,
				"cr6fc_delegatedmobileno": DetailArrayDelegated[numOfDelgAuth].txtMobileNo,
				"cr6fc_delegatedaddress": DetailArrayDelegated[numOfDelgAuth].txtAddressAuthorized,
				"cr6fc_addressprooftype": DetailArrayDelegated[numOfDelgAuth].ddlDelAuthAddressProofType,
				//"cr6fc_addressproofnumber": DetailArrayDelegated[numOfDelgAuth].txtDelAuthAddressProofNumber,
				"cr6fc_identityprooftype": DetailArrayDelegated[numOfDelgAuth].ddlDelAuthIdentityProofType,
				//"cr6fc_identityproofnumber": DetailArrayDelegated[numOfDelgAuth].txtDelAuthIdentityProofNumber,
			});
		var header = {
			__RequestVerificationToken: token,
			contentType: "application/json;odata=verbose"
		}
		$.ajax({
			url: "/_api/cr6fc_registrationdelgatedauthorequestses",
			type: "POST",
			headers: header,
			async: false,
			data: data,
			success: function (data, textStatus, xhr) {
				console.log(xhr);
				createDelegatedAuthoentityid = xhr.getResponseHeader("entityid");
				if (DetailArrayDelegated[numOfDelgAuth].fDelAuthAddressProof != undefined && DetailArrayDelegated[numOfDelgAuth].fDelAuthIdentityProof != undefined) {
					uploadUserDocument(DetailArrayDelegated[numOfDelgAuth].fDelAuthAddressProof, token, xhr.getResponseHeader("entityid"), "cr6fc_registrationdelgatedauthorequestses", "cr6fc_addressproofdocument").done(function (addrProofDocResp) {
						uploadUserDocument(DetailArrayDelegated[numOfDelgAuth].fDelAuthIdentityProof, token, xhr.getResponseHeader("entityid"), "cr6fc_registrationdelgatedauthorequestses", "cr6fc_identityproofdocument").done(function (idenProofDocResp) {
							console.log(xhr);
							numOfDelgAuth++;
							if (numOfDelgAuth <= DetailArrayDelegated.length - 1) {
								createDelegatedAutho(token, vTitle, entityID);
							} else {
								delAuthDeferred.resolve(xhr);
							}
						});
					});
				} else {
					if (DetailArrayDelegated[numOfDelgAuth].fDelAuthAddressProof != undefined) {
						uploadUserDocument(DetailArrayDelegated[numOfDelgAuth].fDelAuthAddressProof, token, xhr.getResponseHeader("entityid"), "cr6fc_registrationdelgatedauthorequestses", "cr6fc_addressproofdocument").done(function (addrProofDocResp) {
							console.log(xhr);
							numOfDelgAuth++;
							if (numOfDelgAuth <= DetailArrayDelegated.length - 1) {
								createDelegatedAutho(token, vTitle, entityID);
							} else {
								delAuthDeferred.resolve(xhr);
							}
						});
					}
					if (DetailArrayDelegated[numOfDelgAuth].fDelAuthIdentityProof != undefined) {
						uploadUserDocument(DetailArrayDelegated[numOfDelgAuth].fDelAuthIdentityProof, token, xhr.getResponseHeader("entityid"), "cr6fc_registrationdelgatedauthorequestses", "cr6fc_identityproofdocument").done(function (idenProofDocResp) {
							console.log(xhr);
							numOfDelgAuth++;
							if (numOfDelgAuth <= DetailArrayDelegated.length - 1) {
								createDelegatedAutho(token, vTitle, entityID);
							} else {
								delAuthDeferred.resolve(xhr);
							}
						});
					}
				}
				//delAuthDeferred.resolve(delgAuthResp);
			},
			error: function (e) {
				console.log(e);
				delAuthDeferred.reject(e);
			}
		});
		//}
	}
	else{
		delAuthDeferred.resolve(delgAuthResp);
	}
	return delAuthDeferred.promise();
}
var contactResp=[];
var registrationcontactentityid;
function createContact(token, vTitle, entityID, ContactColl) {
	var deferred = $.Deferred();
	if (ContactColl.length > 0) {
		for (var i = 0; i < ContactColl.length; i++) {
			var data = JSON.stringify(
				{
					"cr6fc_name": vTitle,
					"cr6fc_mrid": entityID,
					"cr6fc_usertype": ContactColl[i].UserType,
					"cr6fc_useremail": ContactColl[i].Email,
					//"cr6fc_username": ContactColl[i].Name,
					"cr6fc_userfirstname":ContactColl[i].FirstName,
					"cr6fc_userlastname":ContactColl[i].LastName,
					"cr6fc_usercontactno": ContactColl[i].Mobile,
					"cr6fc_userdesignation": ContactColl[i].Designation,
					//"cr6fc_useraddress": ContactColl[i].Address,
					"cr6fc_addressprooftype": ContactColl[i].AddressProofType,
					//"cr6fc_addressproofnumber": ContactColl[i].AddressProofNumber,
					"cr6fc_identityprooftype": ContactColl[i].IdentityProofType,
					//"cr6fc_identityproofnumber": ContactColl[i].IdentityProofNumber
				});
			var header = {
				__RequestVerificationToken: token,
				contentType: "application/json;odata=verbose"
			}
			$.ajax({
				url: "/_api/cr6fc_registrationcontacts",
				type: "POST",
				headers: header,
				async: false,
				data: data,
				success: function (data, textStatus, xhr) {
					console.log(xhr);
					registrationcontactentityid = xhr.getResponseHeader("entityid");
					if (document.getElementById('fAddressProof').files.length > 0 && document.getElementById('fIdentityProof').files.length > 0  ) {
						uploadUserDocument(document.getElementById('fAddressProof').files[0], token, xhr.getResponseHeader("entityid"), "cr6fc_registrationcontacts", "cr6fc_addressproofdocument").done(function (addrProofDocResp) {
							uploadUserDocument(document.getElementById('fIdentityProof').files[0], token, xhr.getResponseHeader("entityid"), "cr6fc_registrationcontacts", "cr6fc_identityproofdocument").done(function (idenProofDocResp) {
								deferred.resolve(xhr);
							});
						});
					} else {
						if (document.getElementById('fAddressProof').files.length > 0 ) {
							uploadUserDocument(document.getElementById('fAddressProof').files[0], token, xhr.getResponseHeader("entityid"), "cr6fc_registrationcontacts", "cr6fc_addressproofdocument").done(function (addrProofDocResp) {
								deferred.resolve(xhr);
							});
						}
						if (document.getElementById('fIdentityProof').files.length > 0 ) {
							uploadUserDocument(document.getElementById('fIdentityProof').files[0], token, xhr.getResponseHeader("entityid"), "cr6fc_registrationcontacts", "cr6fc_identityproofdocument").done(function (idenProofDocResp) {
								deferred.resolve(xhr);
							});
						}
					}
				},
				error: function (e) {
					console.log(e)
					deferred.reject(e);
				}
			});
		}
	}
	else{
		deferred.resolve(contactResp);
	}
	return deferred.promise();
}

function GetCurrentDataToday() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();
	var vDueDate = dd + "/" + mm + "/" + yyyy;
	var hours = today.getHours();
	var minutes = today.getMinutes();
	var ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0' + minutes : minutes;
	var strTime = vDueDate;
	return strTime;
}

function GetUserId1(EamilID) {
	debugger;
	//var vNewLoginName=EamilID.split('|')[2];
	var requestUri = location.origin + "/_api/contacts?$top=500&$select=*&$filter=emailaddress1 eq '" + EamilID + "'";
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
			var Logg = data.value;

			try {
				returnValue = Logg[0].contactid;
			}
			catch (err) {
				returnValue = -1;
			}
		},
		error: function (data) {
			returnValue = -1;
			console.log(JSON.stringify(data));

		}
	});
	return returnValue;
}


function UpdateCounter(token) {
	var deferred = $.Deferred();
	var itemId = document.getElementById("hdnCounterItemID1").value;
	var hdnCounter = document.getElementById("hdnCounterItemID").value;
	hdnCounter1 = parseInt(hdnCounter) + 1;

	var data1 = JSON.stringify({
		cr6fc_cgapplicationno: '' + hdnCounter1
	});
	var header = {
		__RequestVerificationToken: token,
		contentType: "application/json;odata=verbose",
		XRequestDigest: $("#__REQUESTDIGEST").val(),
		IFMATCH: "*",
		XHttpMethod: "PATCH"
	}
	$.ajax({
		url: "/_api/cr6fc_countermasters(" + itemId + ")",
		type: "PATCH",
		async: false,
		data: data1,
		headers: header,
		success: function (data, textStatus, xhr) {
			console.log(xhr);
			deferred.resolve(xhr);
		},
		error: function (e) {
			console.log(e)
			deferred.reject(e);
		}
	});
	return deferred.promise();
}

function UpdateCounterAttchFailed() {
	debugger;
	var itemId = document.getElementById("hdnCounterItemID").value;
	var hdnCounter = document.getElementById("hdnCounterItemID").value;
	hdnCounter = parseInt(hdnCounter) + 1;
	$.ajax({
		url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('CounterMaster')/getItemByStringId('" + itemId + "')",
		type: "POST",
		contentType: "application/json;odata=verbose",
		async: false,
		data: JSON.stringify(
			{
				'__metadata': {
					'type': 'SP.Data.CounterMasterListItem'
				},
				'CGApplicationNo': hdnCounter.toString()
			}),
		headers: {
			"accept": "application/json;odata=verbose",
			"X-RequestDigest": $("#__REQUESTDIGEST").val(),
			"IF-MATCH": "*",
			"X-Http-Method": "PATCH"
		},
		success: function (data) {
			// AddDashBoardAttachFailed(document.getElementById("hdnDigitalRequestNo").value, document.getElementById("hdnApprvlNotesItemID").value);
		},
		error: function (e) {
		}
	});

}

// Get the local file as an array buffer.
function getFileBuffer(objFile) {
	var deferred = $.Deferred();
	var reader = new FileReader();
	reader.onloadend = function (e) {
		deferred.resolve(e.target.result);
	}
	reader.onerror = function (e) {
		deferred.reject(e.target.error);
	}
	reader.readAsArrayBuffer(objFile);//fileInput[0].files[0]
	return deferred.promise();
}

function uploadUserDocument(objFile, token, entityID, tableLogicalName, columnLogicalName) {
	var deferred = $.Deferred();
	var getFile = getFileBuffer(objFile);

	getFile.done(function (arrayBuffer) {
		var header = {
			__RequestVerificationToken: token,
			Accept: 'application/json;odata=verbose',
			XRequestDigest: $("#__REQUESTDIGEST").val()
		}
		$.ajax({
			url: "/_api/" + tableLogicalName + "(" + entityID + ")/" + columnLogicalName + "?x-ms-file-name=" + objFile.name,
			type: "PUT",
			async: false,
			contentType: "application/octet-stream",
			processData: false,
			data: arrayBuffer,
			headers: header,
			success: function (data, textStatus, xhr) {
				console.log(xhr);
				deferred.resolve(xhr);
			},
			error: function (xhr, textStatus, errorThrown) {
				console.log(xhr)
				deferred.reject(xhr);
			}
		});
	});
	return deferred.promise();
}

var eliFileColl = [];
var numOfEliDocs = 0;
function getFileDetails(fileCtrl, index, columnName) {
	var eliFile = {};
	if (fileCtrl.files[0].name.endsWith(".pdf") ||fileCtrl.files[0].name.endsWith(".PDF")) {
		if (fileCtrl.files[0] !== undefined) {
		  let eliFile = {
			file: fileCtrl.files[0],
			position: index,
			columnName: columnName,
		  };
	  
		  eliFileColl.push(eliFile);
		}
	} else {
		alert("Please upload a PDF file only");
		document.getElementById(fileCtrl.name).value='';
		return false;
	  }
	for (var i = eliFileColl.length - 1; i >= 0; --i) {
		if (fileCtrl.files[0] == undefined && eliFileColl[i].position == index) {
			eliFileColl.splice(i, 1);
		}
	}
	console.log(eliFileColl)
}

var eliDocResponse = [];
var eliDocDeferred = $.Deferred();
var otherdocumententityid;
function uploadEliDocuments(token, entityID) {
	if(eliFileColl.length > 0){
		uploadUserDocument(eliFileColl[numOfEliDocs].file, token, entityID, "cr6fc_makerregistrationrequests", eliFileColl[numOfEliDocs].columnName).done(function (eliDocResp) {
			eliDocResponse.push(eliDocResp);
			numOfEliDocs++;
			if (numOfEliDocs <= eliFileColl.length - 1) {
				uploadEliDocuments(token, entityID);
			} else {
				eliDocDeferred.resolve(eliDocResp);
			}
		}).fail(function(jqXHR, textStatus, errorThrown){
			eliDocDeferred.reject(jqXHR);
		});
	}else{
		eliDocDeferred.resolve(eliDocResponse);
	}
	return eliDocDeferred.promise();

}
	var OtherDocumentResp=[];
const UploadotherDocument = (token, entityID) =>{
	var deferred = $.Deferred();
	fileInput = $('#OtherDocument');
	otherfileArray=[];
	let index=0;
//var AttchLength=fileInput[0].files.length
		$("#attachFilesHolderOther input:file").each(function () {
				if ($(this)[0].files[0]) {
				otherfileArray.push($(this)[0].files[0]);
				}
		});

			AttchLength= otherfileArray.length; 
			if(otherfileArray.length>0){
	for (let i=0; i<otherfileArray.length;i++){
		var data = JSON.stringify(
			{
				"cr6fc_name": entityID,
				
			});
		var header = {
			__RequestVerificationToken: token,
			contentType: "application/json;odata=verbose"
		}
		$.ajax({
			url: "/_api/cr6fc_registrationotherdocuments",
			type: "POST",
			headers: header,
			async: false,
			data: data,
			success: function (data, textStatus, xhr) {
				otherdocumententityid=xhr.getResponseHeader("entityid");
				console.log(xhr);
				if ( otherfileArray.length > 0  ) {
					uploadUserDocument(otherfileArray[i], token, xhr.getResponseHeader("entityid"), "cr6fc_registrationotherdocuments", "cr6fc_otherdocuments").done(function (OtherDocumentResp) {
						//deferred.resolve(xhr);
						deferred.resolve(OtherDocumentResp);
						// index++;
						// if(otherfileArray.length==index)
						// {
							
						// }
							
					});
				} 
			},
			error: function (e) {
				console.log(e)
				deferred.reject(e);
			}
		});
	}
}else{
	deferred.resolve(OtherDocumentResp);

}
return deferred.promise();

}
function validateFile(fileInput) {
	var filePath = fileInput.value;
	if (filePath.trim() !== '') {
		var fileExtension = filePath.split('.').pop().toLowerCase();
		if (fileExtension === 'pdf') {
			console.log('PDF file uploaded');
		} else {
			alert('Please upload a PDF file.');
			fileInput.value = '';
		}
	} else {
		console.log('No file selected');
	}
}
