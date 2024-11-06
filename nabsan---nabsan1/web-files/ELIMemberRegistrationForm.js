var loggedInUserId = '';
var loggedInUserName = '';
var loggedInUserEmail = '';
var loggedInUserDetail = '';
var randomDetail = '';

$(document).ready(function () {
	loggedInUserId = $('#fpo-user-contact-id').val();
	loggedInUserName = $('#fpo-user-contact-name').val();
	loggedInUserEmail = $('#fpo-user-email').val();
	detailofeli(loggedInUserEmail);
	getLoggedInUserDetail(loggedInUserEmail);
	EliMasterData(loggedInUserEmail);
	Eliregistrationcontact(loggedInUserEmail);
	getRandomDetail();
});
var Loggmakerrequestdata;
var elimakerData ='';
const EliMasterData = (loggedInUserEmail) =>{
 let URL = location.origin+"/_api/cr6fc_elimasters?$select=*&$filter= cr6fc_administratoremail eq '"+loggedInUserEmail+"'";
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
						elimakerData = Loggmakerrequestdata[a].cr6fc_emailid;
					}
				}
				
			},
			error: function () {
				console.log("error");
			}
		});
}
function getLoggedInUserDetail(emailId) {
	var requestUri = location.origin + "/_api/contacts?$top=500&$select=*&$filter=emailaddress1 eq '" + emailId + "'";

	$.ajax({
		url: requestUri,
		type: "GET",
		async: false,
		headers: {
			"accept": "application/json;odata=verbose",
			"content-type": "application/json;odata=verbose"
		},
		success: function (data) {
			loggedInUserDetail = data.value[0];
		},
		error: function (data) {
			console.log(JSON.stringify(data));
		}
	});
}

function getRandomDetail() {
	var requestUri = location.origin + "/_api/cr6fc_randomtokens?$top=500&$select=*";

	$.ajax({
		url: requestUri,
		type: "GET",
		async: false,
		headers: {
			"accept": "application/json;odata=verbose",
			"content-type": "application/json;odata=verbose"
		},
		success: function (data) {
			randomDetail = data.value;
		},
		error: function (data) {
			console.log(JSON.stringify(data));
		}
	});
}
var Loggmakerrequestdata;
const detailofeli = (loggedInUserEmail) =>{
 let URL = location.origin+"/_api/cr6fc_makerregistrationrequests?$select=*&$filter=cr6fc_administratoraddress eq '"+loggedInUserEmail+"'";
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
					//$('#NameOfLendingInstitution').val(LoggELIMaker[0]._cr6fc_username_value);
					for (var t = 0; t < Loggmakerrequestdata.length; t++) {
						$("#GSTIN").val(Loggmakerrequestdata[t].cr6fc_gstin);
						$("#PANNO").val(Loggmakerrequestdata[t].cr6fc_pannumber);
						$("#LendingInstitute").val(Loggmakerrequestdata[t].cr6fc_bankname);
						$("#ELIAddress").val(Loggmakerrequestdata[t].cr6fc_address);
						$("#state").val(Loggmakerrequestdata[t]._cr6fc_state_value);
						$("#administratorEmail").val(Loggmakerrequestdata[t].cr6fc_administratoraddress);
						$("#MRID").val(Loggmakerrequestdata[t].cr6fc_makerregistrationrequestid);
					}
				}
				
			},
			error: function () {
				console.log("error");
			}
		});
}
//var Loggmakerrequestdata12;
const Eliregistrationcontact = (loggedInUserEmail) =>{
 let URL = location.origin+"/_api/cr6fc_registrationcontacts?$select=*&$filter=cr6fc_adminemailaddress eq '"+loggedInUserEmail+"' and cr6fc_usertype eq 1 ";
		$.ajax({
			url: URL,
			type: "GET",
			async: false,
			headers: {
				"accept": "application/json;odata=verbose",
				"content-type": "application/json;odata=verbose"
			},
			success: function (data) {
				Loggmakerrequestdata12 = data.value;
				if (Loggmakerrequestdata12.length > 0) {
					for(var a =0;a<Loggmakerrequestdata12.length;a++){
						if(Loggmakerrequestdata12[a].statecode =='0'){
							alert("please Inactive allready registered Eli Maker And Eli checker");
							$('.form-control').prop('disabled', true);
							return false;
						}
					}
				}
				
			},
			error: function () {
				console.log("error");
			}
		});
}
var ddlUserType = '';
var txtFirstName = '';
var txtLastName = '';
var txtDesignation = '';
var txtEmail = '';
var txtMobileNo = '';
var txtEffectiveDate = '';
var txtRemarks = '';
var ddlAddressProofType = '';
var txtAddressProofNumber = '';
var fAddressProof = '';
var ddlIdentityProofType = '';
var txtIdentityProofNumber = '';
var fIdentityProof = '';
var numOfELIMkChk = 0;

function AddData() {
	ddlUserType = $('#ddlUserType').val();
	txtFirstName = $('#txtFirstName').val();
	txtLastName = $('#txtLastName').val();
	txtDesignation = $('#txtDesignation').val();
	txtEmail = $('#txtEmail').val();
	txtMobileNo = $('#txtMobileNo').val();
	txtEffectiveDate = $('#txtEffectiveDate').val();
	txtRemarks = $('#txtRemarks').val();

	ddlAddressProofType = $('#ddlAddressProofType').val();
	txtAddressProofNumber = $('#txtAddressProofNumber').val();
	fAddressProof = document.getElementById('fAddressProof').files[0];
	ddlIdentityProofType = $('#ddlIdentityProofType').val();
	txtIdentityProofNumber = $('#txtIdentityProofNumber').val();
	fIdentityProof = document.getElementById('fIdentityProof').files[0];

	if (ddlUserType == undefined || ddlUserType == "" || ddlUserType == null) {
		alert('Please enter User Type')
		return false;
	}
	if (txtFirstName == undefined || txtFirstName == "" || txtFirstName == null) {
		alert('Please enter First Name')
		return false;
	}
	if (txtLastName == undefined || txtLastName == "" || txtLastName == null) {
		alert('Please enter Last Name')
		return false;
	}
	if (txtDesignation == undefined || txtDesignation == "" || txtDesignation == null) {
		alert('Please enter Designation')
		return false;
	}
	if (txtEmail == undefined || txtEmail == "" || txtEmail == null) {
		alert('Please enter Email.')
		return false;
	}
	else {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (!regex.test(txtEmail)) {
			alert('Please Enter Valid Email Address');

			return false;
		}

	}
	if (txtMobileNo == undefined || txtMobileNo == "" || txtMobileNo == null) {
		alert('Please enter Mobile No.')
		return false;
	}
	if (txtEffectiveDate == undefined || txtEffectiveDate == "" || txtEffectiveDate == null) {
		alert('Please enter Effective Date')
		return false;
	}
	if (fAddressProof.length <= 0 && fIdentityProof.length <= 0) {
		alert('Please enter atleast one proof document');
		return false;
	}

	AddtoColl();
}

var eliMkrChkrColl = [];

function AddtoColl() {
	var eliMkrChkr = {};
	eliMkrChkr.ddlUserType = ddlUserType;
	eliMkrChkr.ddlUserTypeText = $("#ddlUserType option:selected").text();
	eliMkrChkr.txtFirstName = txtFirstName;
	eliMkrChkr.txtLastName = txtLastName;
	eliMkrChkr.txtDesignation = txtDesignation;
	eliMkrChkr.txtEmail = txtEmail;
	eliMkrChkr.txtMobileNo = txtMobileNo;
	eliMkrChkr.txtEffectiveDate = txtEffectiveDate;
	eliMkrChkr.txtRemarks = txtRemarks;

	eliMkrChkr.ddlAddressProofType = ddlAddressProofType;
	eliMkrChkr.ddlAddressProofTypeText = $("#ddlAddressProofType option:selected").text();
	eliMkrChkr.txtAddressProofNumber = txtAddressProofNumber;
	eliMkrChkr.fAddressProof = fAddressProof;
	eliMkrChkr.ddlIdentityProofType = ddlIdentityProofType;
	eliMkrChkr.ddlIdentityProofTypeText = $("#ddlIdentityProofType option:selected").text();
	eliMkrChkr.txtIdentityProofNumber = txtIdentityProofNumber;
	eliMkrChkr.fIdentityProof = fIdentityProof;
  if(eliMkrChkr.ddlUserType == "1"){
	$("#ElimakeremailID").val(eliMkrChkr.txtEmail);
  }
  else if(eliMkrChkr.ddlUserType =="2"){
	$("#EliCheckerEmailID").val(eliMkrChkr.txtEmail);
  }
	eliMkrChkrColl.push(eliMkrChkr);
	$('#tbodyMakerChecker').empty();
	bindData(eliMkrChkrColl);
}

function bindData(DetailArray) {
	var flag = false;
	if (DetailArray.length > 0) {
		flag = true;
	}
	var tableHTML = '';
	$('#tblData thead').append("<tr></tr>");

	if (flag == true) {
		for (var t = 0; t < DetailArray.length; t++) {
			tableHTML += '<tr><td style="text-align:center; color: #333; font-size: 14px;">' + DetailArray[t].ddlUserTypeText + '</td><td style="text-align:center; color: #333; font-size: 14px;">' + DetailArray[t].txtFirstName + '</td><td style="text-align:center; color: #333; font-size: 14px;">' + DetailArray[t].txtLastName + '</td><td style="text-align:center; color: #333; font-size: 14px;">' + DetailArray[t].txtDesignation + '</td><td style="text-align:center; color: #333; font-size: 14px;">' + DetailArray[t].txtEmail + '</td><td style="text-align:center; color: #333; font-size: 14px;">' + DetailArray[t].txtMobileNo + '</td><td style="text-align:center; color: #333; font-size: 14px;">' + DetailArray[t].txtEffectiveDate + '</td><td style="text-align:center; color: #333; font-size: 14px;">' + DetailArray[t].txtRemarks + '</td><td style="text-align:center; color: #333; font-size: 14px;">' + DetailArray[t].ddlAddressProofTypeText + '</td><td style="text-align:center; color: #333; font-size: 14px;">' + DetailArray[t].txtAddressProofNumber + '</td><td style="text-align:center; color: #333; font-size: 14px;">' + (DetailArray[t].fAddressProof != undefined ? DetailArray[t].fAddressProof.name : '') + '</td><td style="text-align:center; color: #333; font-size: 14px;">' + DetailArray[t].ddlIdentityProofTypeText + '</td><td style="text-align:center; color: #333; font-size: 14px;">' + DetailArray[t].txtIdentityProofNumber + '</td><td style="text-align:center; color: #333; font-size: 14px;">' + (DetailArray[t].fIdentityProof != undefined ? DetailArray[t].fIdentityProof.name : '') + '</td><td class="CenterAlign"><a href="#" title="Delete" onclick="DeleteRow(' + t + ')"><span class="glyphicon glyphicon-trash"></span></a></td></tr>';
		}
	}
	else {
		console.log();
	}
	$('#tbodyMakerChecker').append(tableHTML);
	$(".removeThisSelect").hide();
	document.getElementById("ddlUserType").value = 0;
	document.getElementById("txtFirstName").value = "";
	document.getElementById("txtLastName").value = "";
	document.getElementById("txtDesignation").value = "";
	document.getElementById("txtEmail").value = "";
	document.getElementById("txtMobileNo").value = "";
	document.getElementById("txtEffectiveDate").value = "";
	document.getElementById("txtRemarks").value = "";
	document.getElementById("ddlAddressProofType").value = 0;
	document.getElementById("txtAddressProofNumber").value = "";
	document.getElementById("fAddressProof").value = "";
	document.getElementById("ddlIdentityProofType").value = 0;
	document.getElementById("txtIdentityProofNumber").value = "";
	document.getElementById("fIdentityProof").value = "";
}

function DeleteRow(t) {
	eliMkrChkrColl.splice(t, 1);
	$('#tbodyMakerChecker').empty();
	bindData(eliMkrChkrColl);
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

function createGuid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

function GetCounter() {
	var deferred = $.Deferred();
	var vRetVal = '';
	var hdnCounter = '';

	var requestUri = location.origin + "/_api/cr6fc_countermasters?$top=500&$select=*&$filter=cr6fc_name eq 'Registration'";
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
					vRetVal = 'CGAFPO' + dd + '' + calmonth + '' + yyyy + '000' + hdnCounter;
					document.getElementById("hdnDigitalRequestNo").value = vRetVal;
					document.getElementById("hdnCounterItemID").value = Logg[0].cr6fc_cgapplicationno;
					document.getElementById("hdnCounterItemID1").value = Logg[0].cr6fc_countermasterid;
				}
				deferred.resolve(vRetVal);
			}
			catch (e) {
				deferred.reject(e);
			}
		},
		error: function (e) {
			console.log(e);
			deferred.reject(e);
		}
	});
	return deferred.promise();
}
var counterentityid;
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
			counterentityid = xhr.getResponseHeader('entityid');
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
var contactentityid;
var regContactDeferred = $.Deferred();
function createEliMakerChecker(token,successId, counter) {
	if (eliMkrChkrColl.length > 0) {
		var data = JSON.stringify(
			{
				"cr6fc_name": counter,
				"cr6fc_mrid": loggedInUserDetail.cr6fc_mrid,
				"cr6fc_usertype": eliMkrChkrColl[numOfELIMkChk].ddlUserType,
				"cr6fc_useremail": eliMkrChkrColl[numOfELIMkChk].txtEmail,
				"cr6fc_username": eliMkrChkrColl[numOfELIMkChk].txtFirstName + ' ' + eliMkrChkrColl[numOfELIMkChk].txtLastName,
				"cr6fc_usercontactno": eliMkrChkrColl[numOfELIMkChk].txtMobileNo,
				"cr6fc_userdesignation": eliMkrChkrColl[numOfELIMkChk].txtDesignation,
				"cr6fc_useraddress": "",
				"cr6fc_addressprooftype": eliMkrChkrColl[numOfELIMkChk].ddlAddressProofType,
				"cr6fc_addressproofnumber": eliMkrChkrColl[numOfELIMkChk].txtAddressProofNumber,
				"cr6fc_identityprooftype": eliMkrChkrColl[numOfELIMkChk].ddlIdentityProofType,
				"cr6fc_identityproofnumber": eliMkrChkrColl[numOfELIMkChk].txtIdentityProofNumber,
				"cr6fc_userfirstname":eliMkrChkrColl[numOfELIMkChk].txtFirstName,
				"cr6fc_userlastname":eliMkrChkrColl[numOfELIMkChk].txtLastName,
				"cr6fc_elimasterid":successId,
				
				"cr6fc_adminemailaddress": $('#fpo-user-email').val()
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
				contactentityid = xhr.getResponseHeader('entityid');
				console.log(xhr);
				if (eliMkrChkrColl[numOfELIMkChk].fAddressProof != undefined && eliMkrChkrColl[numOfELIMkChk].fIdentityProof != undefined) {
					uploadUserDocument(eliMkrChkrColl[numOfELIMkChk].fAddressProof, token, xhr.getResponseHeader("entityid"), "cr6fc_registrationcontacts", "cr6fc_addressproofdocument").done(function (addrProofDocResp) {
						uploadUserDocument(eliMkrChkrColl[numOfELIMkChk].fIdentityProof, token, xhr.getResponseHeader("entityid"), "cr6fc_registrationcontacts", "cr6fc_identityproofdocument").done(function (idenProofDocResp) {
							console.log(xhr);
							numOfELIMkChk++;
							if (numOfELIMkChk <= eliMkrChkrColl.length - 1) {
								createEliMakerChecker(token);
							} else {
								numOfELIMkChk = 0;
								regContactDeferred.resolve(xhr);
							}
						});
					});
				} else {
					if (eliMkrChkrColl[numOfELIMkChk].fAddressProof != undefined) {
						uploadUserDocument(eliMkrChkrColl[numOfELIMkChk].fAddressProof, token, xhr.getResponseHeader("entityid"), "cr6fc_registrationcontacts", "cr6fc_addressproofdocument").done(function (addrProofDocResp) {
							console.log(xhr);
							numOfELIMkChk++;
							if (numOfELIMkChk <= eliMkrChkrColl.length - 1) {
								createEliMakerChecker(token);
							} else {
								numOfELIMkChk = 0;
								regContactDeferred.resolve(xhr);
							}
						});
					}
					if (eliMkrChkrColl[numOfELIMkChk].fIdentityProof != undefined) {
						uploadUserDocument(eliMkrChkrColl[numOfELIMkChk].fIdentityProof, token, xhr.getResponseHeader("entityid"), "cr6fc_registrationcontacts", "cr6fc_identityproofdocument").done(function (idenProofDocResp) {
							console.log(xhr);
							numOfELIMkChk++;
							if (numOfELIMkChk <= eliMkrChkrColl.length - 1) {
								createEliMakerChecker(token);
							} else {
								numOfELIMkChk = 0;
								regContactDeferred.resolve(xhr);
							}
						});
					}
				}
				//regContactDeferred.resolve(xhr);
			},
			error: function (e) {
				console.log(e);
				numOfELIMkChk = 0;
				regContactDeferred.reject(e);
			}
		});
		//}
	}
	return regContactDeferred.promise();
}

var contactDeferred = $.Deferred();
function createContact(token) {
	if (eliMkrChkrColl.length > 0) {
		var randDetail = randomDetail[Math.floor(Math.random() * randomDetail.length)];
		var newGuid = createGuid();

		var data = JSON.stringify(
			{
				"cr6fc_usertype": eliMkrChkrColl[numOfELIMkChk].ddlUserType,
				"firstname": eliMkrChkrColl[numOfELIMkChk].txtFirstName,
				"lastname": eliMkrChkrColl[numOfELIMkChk].txtLastName,
				"fullname": eliMkrChkrColl[numOfELIMkChk].txtFirstName + ' ' + eliMkrChkrColl[numOfELIMkChk].txtLastName,
				"cr6fc_designation": eliMkrChkrColl[numOfELIMkChk].txtDesignation,
				"emailaddress1": eliMkrChkrColl[numOfELIMkChk].txtEmail,
				"mobilephone": eliMkrChkrColl[numOfELIMkChk].txtMobileNo,
				"cr6fc_effectivedate": eliMkrChkrColl[numOfELIMkChk].txtEffectiveDate,
				"description": eliMkrChkrColl[numOfELIMkChk].txtRemarks,
				"cr6fc_mrid": loggedInUserDetail.cr6fc_mrid,
				"adx_identity_username": eliMkrChkrColl[numOfELIMkChk].txtEmail,
				"adx_identity_lockoutenabled": true,
				"adx_identity_logonenabled": true,
				"adx_identity_passwordhash": randDetail.cr6fc_tokenhash,
				"cr6fc_passwordhashtext": randDetail.cr6fc_tokentext,
				"adx_identity_securitystamp": newGuid,
				"adx_profilemodifiedon": new Date()
			});
		var header = {
			__RequestVerificationToken: token,
			contentType: "application/json;odata=verbose"
		}
		$.ajax({
			url: "/_api/contacts",
			type: "POST",
			headers: header,
			async: false,
			data: data,
			success: function (data, textStatus, xhr) {
				console.log(xhr);
				numOfELIMkChk++;
				if (numOfELIMkChk <= eliMkrChkrColl.length - 1) {
					createContact(token);
				} else {
					numOfELIMkChk = 0;
					contactDeferred.resolve(xhr);
				}
				//contactDeferred.resolve(xhr);
			},
			error: function (e) {
				console.log(e);
				numOfELIMkChk = 0;
				contactDeferred.reject(e);
			}
		});
		//}
	}
	return contactDeferred.promise();
}

function registerEliMakerChecker() {
	/*if(eliMkrChkrColl.length>0){
	// if(eliMkrChkrColl[0].ddlUserType=='' && eliMkrChkrColl[1].ddlUserType == ''){
    //    flag = true;
	// }
	// else{
	// 	flag= false;
	// }
	arr = jQuery.grep(eliMkrChkrColl, function( data ) {
		return data.ddlUserType == '1';
	  })
	  arr2 = jQuery.grep(eliMkrChkrColl, function( data ) {
		return data.ddlUserType == '2';
	  })

	  if(arr.length > 0 && arr2.length > 0){
		flag = false;
	  }
	  else{
		flag = true;
	  }

}
else{
	alert("Please Enter Maker and Checker.");
		return false;
}
	if (flag == true) {
		alert("Please Enter Maker and Checker Both.");
		return false;
	}*/
		if(Loggmakerrequestdata.length == 0){
			arr = jQuery.grep(eliMkrChkrColl, function( data ) {
				return data.ddlUserType == '1';
			  })
			  arr2 = jQuery.grep(eliMkrChkrColl, function( data ) {
				return data.ddlUserType == '2';
			  })
		
			  if(arr.length > 0 && arr2.length > 0){
				flag = false;
			  }
			  else{
				flag = true;
			  }
		
		
		// else{
		// 	alert("Please Enter Maker and Checker.");
		// 		return false;
		// }
		if (flag == true) {
				alert("Please Enter Maker and Checker Both.");
				return false;
			}
		var data1 = JSON.stringify(
			{
				"cr6fc_name": $("#LendingInstitute").val(),
				"cr6fc_lendinginstitute": $("#LendingInstitute").val() ,
				"cr6fc_address": $("#ELIAddress").val(),
				"cr6fc_elicheckeremailid": $("#EliCheckerEmailID").val(),
				"cr6fc_State@odata.bind":"/cr6fc_statemasters("+ $("#state").val() +")",
				"cr6fc_emailid": $("#ElimakeremailID").val(),
				"cr6fc_pan": $("#PANNO").val(),
				"cr6fc_gstin": $("#GSTIN").val(),
				"cr6fc_status":'1',
				"cr6fc_mrid":$("#MRID").val(),
				"cr6fc_administratoremail":$('#administratorEmail').val()
				
					});

		shell.getTokenDeferred().done(function (token) {
			console.log(token)
			var header = {
				__RequestVerificationToken: token,
				contentType: "application/json;odata=verbose"
			}
			$.ajax({
				url: "/_api/cr6fc_elimasters",
				type: "POST",
				headers: header,
				async: false,
				data: data1,
				//success: function (success) {
				success: function (data, textStatus, xhr) {
					successId = xhr.getResponseHeader("entityid");
					console.log(successId);
					//successId = success.Id;
					//console.log(successId);
					//shell.getTokenDeferred().done(function (token) {
						GetCounter().done(function (counterResp) {
							createEliMakerChecker(token,successId, counterResp).done(function (eliMkrChkrResp) {
								numOfELIMkChk = 0;
								// createContact(token).done(function (contResp) {
									UpdateCounter(token).done(function (cResp) {
										alert("ELI Maker and Checker registered successfully!");
										window.location.href = location.origin + "/RefreshingCache/?id="+contactentityid+","+counterentityid+"&tbl=cr6fc_registrationcontacts,cr6fc_countermasters&col=cr6fc_cacherefreshedon&red=AdminElimakerCheckerDashboard";
										// window.location.href = location.origin + "/AdminElimakerCheckerDashboard/";
									});
								// });
							});
						});
					//});
				},
				error: function (error) {
					console.log(error);
					alert('Some error occured while adding data in ELI Maker Registration list. Please try again later.');
					console.log(error);
				}
			})
		})		
	}
	else{
		var elimakerID ='';
		elimakerID = $("#ElimakeremailID").val();
		if(elimakerID == '' || elimakerID == undefined){
			elimakerID =Loggmakerrequestdata[0].cr6fc_emailid;
		}
		var elicheckerID='';
		elicheckerID = $("#EliCheckerEmailID").val();
		if(elicheckerID == '' || elicheckerID == undefined){
			elicheckerID = Loggmakerrequestdata[0].cr6fc_elicheckeremailid;
		}
		var elimakerdatasave;
		var elimakerDatasent = elimakerData + ' Eli Maker changed on Date '+new Date();
		 if(Loggmakerrequestdata[0].cr6fc_elimakerflow !=null || Loggmakerrequestdata[0].cr6fc_elimakerflow !=undefined || Loggmakerrequestdata[0].cr6fc_elimakerflow !=''){
				elimakerdatasave = Loggmakerrequestdata[0].cr6fc_elimakerflow + elimakerDatasent;
		 }
		 elimakerdatasave = elimakerDatasent;
		var data12 = JSON.stringify(
			{
				"cr6fc_emailid": elimakerID,
				"cr6fc_elicheckeremailid": elicheckerID,
				"cr6fc_elimakerflow":elimakerdatasave
			});
			shell.getTokenDeferred().done(function (token) {
				console.log(token)
				var header = {
					__RequestVerificationToken: token,
					contentType: "application/json;odata=verbose"
				}
				$.ajax({
					url: "/_api/cr6fc_elimasters(" + Loggmakerrequestdata[0].cr6fc_elimasterid + ")",
					type: "PATCH",
					contentType: "application/json;odata=verbose",
					async: false,
					data: data12,
					headers: {
						__RequestVerificationToken: token,
						contentType: "application/json;odata=verbose",
						XRequestDigest: $("#__REQUESTDIGEST").val(),
						IFMATCH: "*",
						XHttpMethod: "PATCH"
					},
					// success: function (data) {
					success: function (data, textStatus, xhr) {
						successId = xhr.getResponseHeader("entityid");
						console.log(successId);
						GetCounter().done(function (counterResp) {
							createEliMakerChecker(token,successId, counterResp).done(function (eliMkrChkrResp) {
								numOfELIMkChk = 0;
								// createContact(token).done(function (contResp) {
									UpdateCounter(token).done(function (cResp) {
										alert("ELI Maker and Checker registered successfully!");

										// window.location.href = location.origin + "/AdminElimakerCheckerDashboard/";
									});
								// });
							});
						});
					
					},
					error: function (error) {
						console.log(error);
						//alert('Some error occured. Please try again later.');
						alert('Some error occured while adding data in CGApplications list. Please try again later.');
						console.log(error);
					}
				})
			})
	}
}
function cancel() {
	window.location.href = location.origin + "/AdminElimakerCheckerDashboard/";
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
