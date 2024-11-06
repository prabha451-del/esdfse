var loggedInUserId = '';
var loggedInUserName = '';
var loggedInUserEmail = '';
(function (webapi, $) {
	function safeAjax(ajaxOptions) {
		var deferredAjax = $.Deferred();
		shell.getTokenDeferred().done(function (token) {
			// add headers for AJAX
			if (!ajaxOptions.headers) {
				$.extend(ajaxOptions, {
					headers: {
						"__RequestVerificationToken": token
					}
				});
			} else {
				ajaxOptions.headers["__RequestVerificationToken"] = token;
			}
			$.ajax(ajaxOptions)
				.done(function (data, textStatus, jqXHR) {
					validateLoginSession(data, textStatus, jqXHR, deferredAjax.resolve);
					//usingPortalWebapi();
				}).fail(deferredAjax.reject); //AJAX
		}).fail(function () {
			deferredAjax.rejectWith(this, arguments); // on token failure pass the token AJAX and args
		});
		return deferredAjax.promise();
	}
	webapi.safeAjax = safeAjax;
})(window.webapi = window.webapi || {}, jQuery)

var rowIdx = 1;
$(document).ready(function () {
	loggedInUserId = $('#fpo-user-contact-id').val();
	loggedInUserName = $('#fpo-user-contact-name').val();
	loggedInUserEmail = $('#fpo-user-email').val();
	$('title').text('APPLICATION');
	vItemID = GetQueryStingValue()["Item"];
	// abc();
	BindBankType();
	BindFPOState();
	BindELIMaker();
	// populateBankNames();
	getMakerRegisterData(vItemID);
	getAuthorizedSign(vItemID);
	getDelegateAutho(vItemID);
	getUserContact(vItemID);
	otherdocuments(vItemID);

	$(".nav-tabs a").click(function () {
		$(this).tab('show');
	});
	$('.nav-tabs a').on('shown.bs.tab', function (event) {
		var x = $(event.target).text();         // active tab
		var y = $(event.relatedTarget).text();  // previous tab
		$(".act span").text(x);
		$(".prev span").text(y);
	});
	$('#anchAdminAddProof').next().hide();
	$('#anchAdminIdProof').next().hide();
});

var LoggELIMaker;
function BindELIMaker() {
	var requestUri = location.origin + "/_api/cr6fc_registrationapprovalmatrixes?$select=*";
	//var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ELIMaster')//items?$top=500&$select=*";
	var requestHeaders = { "accept": "application/json;odata=verbose" };
	webapi.safeAjax({
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
var txtTypeofBank;
function BindBankType() {
	var requestUri = location.origin + "/_api/cr6fc_banktypes?$select=cr6fc_banktypeid,cr6fc_name";
	var requestHeaders = { "accept": "application/json;odata=verbose" };
	webapi.safeAjax({
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
var LoggFPOState;
function BindFPOState() {
	var requestUri = location.origin + "/_api/cr6fc_statemasters?$select=cr6fc_name,cr6fc_statemasterid";
	var requestHeaders = { "accept": "application/json;odata=verbose" };
	webapi.safeAjax({
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
function GetQueryStingValue() {
	var pageUrl = window.location.href.replace("#", "")
	var vars = [], hash;
	var hashes = pageUrl.slice(pageUrl.indexOf('?') + 1).split('&');
	for (var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

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

var MakerRegistrationColl = [];
function getMakerRegisterData(vItemID) {
	var queryList = "";
	queryList = location.origin + "/_api/cr6fc_makerregistrationrequests?$select=cr6fc_makerregistrationrequestid,cr6fc_bankname,cr6fc_pannumber,cr6fc_pincode,cr6fc_userfirstname,cr6fc_userlastname,cr6fc_userdesignation,cr6fc_usermobilenumber,cr6fc_address,cr6fc_town,cr6fc_city,cr6fc_TypeOfBank,cr6fc_town,cr6fc_State,cr6fc_gstin,cr6fc_website,cr6fc_telephonenumber,cr6fc_requeststatus,cr6fc_otherdescription,cr6fc_requesterremark,cr6fc_bodresolutioncertificate,cr6fc_lipan,cr6fc_bussinesstransdelcertificate,cr6fc_liutilityaddressproof,cr6fc_originalundertaking,cr6fc_agriculturemou,cr6fc_certifiedgstin,cr6fc_letterauthorityadministrator&$expand=cr6fc_TypeOfBank($select=cr6fc_banktypeid,cr6fc_name),cr6fc_State($select=cr6fc_statemasterid,cr6fc_name)&$filter=cr6fc_makerregistrationrequestid eq '" + vItemID + "'&$top=5000";
	webapi.safeAjax({
		url: queryList,
		type: "GET",
		async: false,
		headers: {
			"accept": "application/json;odata=verbose",
			"content-type": "application/json;odata=verbose"
		},
		success: function onSuccess(data) {
			MakerRegistrationColl = data.value;
			if (MakerRegistrationColl.length > 0) {
				//$('#NameOfLendingInstitution').val(LoggELIMaker[0]._cr6fc_username_value);
				$('#txtBankName').val(MakerRegistrationColl[0].cr6fc_bankname);
				$('#txtPan').val(MakerRegistrationColl[0].cr6fc_pannumber);
				$('#txtpincode').val(MakerRegistrationColl[0].cr6fc_pincode);

				//$('#txtTypeofBank').val(MakerRegistrationColl[0]._cr6fc_typeofbank_value);
				if (MakerRegistrationColl[0].cr6fc_TypeOfBank.cr6fc_banktypeid == "fd6165f3-5a58-ee11-be6f-000d3a0aabb1") {
					$('#txtTypeofBank').val("0");
				}
				else { $('#txtTypeofBank').val(MakerRegistrationColl[0].cr6fc_TypeOfBank.cr6fc_banktypeid); }
				$("#userfirstname").text(MakerRegistrationColl[0].cr6fc_userfirstname);
				$("#userlastname").text(MakerRegistrationColl[0].cr6fc_userlastname);
				$("#userDesignation").text(MakerRegistrationColl[0].cr6fc_userdesignation);
				$("#userMobilenumber").text(MakerRegistrationColl[0].cr6fc_usermobilenumber);
				$('#txtAddress').val(MakerRegistrationColl[0].cr6fc_address);
				$('#txtCity').val(MakerRegistrationColl[0].cr6fc_city);
				$('#txtTown').val(MakerRegistrationColl[0].cr6fc_town);
				//$('#ddlState').val(MakerRegistrationColl[0]._cr6fc_state_value);
				if (MakerRegistrationColl[0].cr6fc_State.cr6fc_statemasterid == "e018b138-4231-ee11-bdf4-000d3a0aabb1") {
					$('#ddlState').val("0")
				}
				else { 
					$('#ddlState').val(MakerRegistrationColl[0].cr6fc_State.cr6fc_statemasterid);
				 }
				$('#GSTINFPO').val(MakerRegistrationColl[0].cr6fc_gstin);
				$('#txtWebsite').val(MakerRegistrationColl[0].cr6fc_website);
				/*$('#txtEmailID').val(MakerRegistrationColl[0].cr6fc_emailid);
				$('#txtContactNo').val(MakerRegistrationColl[0].cr6fc_contactno);*/
				$("#txttelephnno").val(MakerRegistrationColl[0].cr6fc_telephonenumber);
				$('#hdnRequestStatus').val(MakerRegistrationColl[0].cr6fc_requeststatus);
				if (MakerRegistrationColl[0].cr6fc_otherdescription != null || MakerRegistrationColl[0].cr6fc_otherdescription != undefined) {
					$("#txtDescription").val(MakerRegistrationColl[0].cr6fc_otherdescription);
				}
				if (MakerRegistrationColl[0].cr6fc_requesterremark != null || MakerRegistrationColl[0].cr6fc_requesterremark != undefined) {
					$("#txtmakerComment").val(MakerRegistrationColl[0].cr6fc_requesterremark);
				}
				if (MakerRegistrationColl[0].cr6fc_bodresolutioncertificate_name != null) {
					$('#anchBodReslCert').attr("href", "/_api/cr6fc_makerregistrationrequests(" + vItemID + ")/cr6fc_bodresolutioncertificate/$value");
					$('#anchBodReslCert').next().attr("onclick", "DeleteAttachment('/_api/cr6fc_makerregistrationrequests(" + vItemID + ")/cr6fc_bodresolutioncertificate','" + vItemID + "','anchBodReslCert')");
					$('#anchBodReslCert').text(MakerRegistrationColl[0].cr6fc_bodresolutioncertificate_name);
				}
				else {
					$('#anchBodReslCert').next().hide()
				}
				if (MakerRegistrationColl[0].cr6fc_lipan_name != null) {
					$('#anchPANLICert').attr("href", "/_api/cr6fc_makerregistrationrequestses(" + vItemID + ")/cr6fc_lipan/$value");
					$('#anchPANLICert').next().attr("onclick", "DeleteAttachment('/_api/cr6fc_makerregistrationrequests(" + vItemID + ")/cr6fc_lipan','" + vItemID + "','anchPANLICert')");
					$('#anchPANLICert').text(MakerRegistrationColl[0].cr6fc_lipan_name);
				}
				else {
					$('#anchPANLICert').next().hide()
				}
				if (MakerRegistrationColl[0].cr6fc_bussinesstransdelcertificate_name != null) {
					$('#anchDelTranBussCert').attr("href", "/_api/cr6fc_makerregistrationrequests(" + vItemID + ")/cr6fc_bussinesstransdelcertificate/$value");
					$('#anchDelTranBussCert').next().attr("onclick", "DeleteAttachment('/_api/cr6fc_makerregistrationrequests(" + vItemID + ")/cr6fc_bussinesstransdelcertificate','" + vItemID + "','anchDelTranBussCert')");
					$('#anchDelTranBussCert').text(MakerRegistrationColl[0].cr6fc_bussinesstransdelcertificate_name);
				}
				else {
					$('#anchDelTranBussCert').next().hide()
				}
				if (MakerRegistrationColl[0].cr6fc_liutilityaddressproof_name != null) {
					$('#anchAddProofUtility').attr("href", "/_api/cr6fc_makerregistrationrequests(" + vItemID + ")/cr6fc_liutilityaddressproof/$value");
					$('#anchAddProofUtility').next().attr("onclick", "DeleteAttachment('/_api/cr6fc_makerregistrationrequests(" + vItemID + ")/cr6fc_liutilityaddressproof','" + vItemID + "','anchAddProofUtility')");
					$('#anchAddProofUtility').text(MakerRegistrationColl[0].cr6fc_liutilityaddressproof_name);
				}
				else {
					$('#anchAddProofUtility').next().hide()
				}

				if (MakerRegistrationColl[0].cr6fc_originalundertaking_name != null) {
					$('#anchOrgUndertaking').attr("href", "/_api/cr6fc_makerregistrationrequests(" + vItemID + ")/cr6fc_originalundertaking/$value");
					$('#anchOrgUndertaking').next().attr("onclick", "DeleteAttachment('/_api/cr6fc_makerregistrationrequests(" + vItemID + ")/cr6fc_originalundertaking','" + vItemID + "','anchOrgUndertaking')");
					$('#anchOrgUndertaking').text(MakerRegistrationColl[0].cr6fc_originalundertaking_name);
				}
				else {
					$('#anchOrgUndertaking').next().hide()
				}

				if (MakerRegistrationColl[0].cr6fc_agriculturemou_name != null) {
					$('#anchMOU').attr("href", "/_api/cr6fc_makerregistrationrequests(" + vItemID + ")/cr6fc_agriculturemou/$value");
					$('#anchMOU').next().attr("onclick", "DeleteAttachment('/_api/cr6fc_makerregistrationrequests(" + vItemID + ")/cr6fc_agriculturemou','" + vItemID + "','anchMOU')");
					$('#anchMOU').text(MakerRegistrationColl[0].cr6fc_agriculturemou_name);
				}
				else {
					$('#anchMOU').next().hide()
				}
				if (MakerRegistrationColl[0].cr6fc_certifiedgstin_name != null) {
					$('#anchCertGSTIN').attr("href", "/_api/cr6fc_makerregistrationrequests(" + vItemID + ")/cr6fc_certifiedgstin/$value");
					$('#anchCertGSTIN').next().attr("onclick", "DeleteAttachment('/_api/cr6fc_makerregistrationrequests(" + vItemID + ")/cr6fc_certifiedgstin','" + vItemID + "','anchCertGSTIN')");
					$('#anchCertGSTIN').text(MakerRegistrationColl[0].cr6fc_certifiedgstin_name);
				}
				else {
					$('#anchCertGSTIN').next().hide()
				}
				if (MakerRegistrationColl[0].cr6fc_letterauthorityadministrator_name != null) {
					$('#viewletterAuthority').attr("href", "/_api/cr6fc_makerregistrationrequests(" + vItemID + ")/cr6fc_letterauthorityadministrator/$value");
					$('#viewletterAuthority').next().attr("onclick", "DeleteAttachment('/_api/cr6fc_makerregistrationrequests(" + vItemID + ")/cr6fc_letterauthorityadministrator','" + vItemID + "','viewletterAuthority')");
					$('#viewletterAuthority').text(MakerRegistrationColl[0].cr6fc_letterauthorityadministrator_name);
				}
				else {
					$('#viewletterAuthority').next().hide()
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
const otherdocuments = (vItemID) => {
	var queryList = "";
	queryList = location.origin + "/_api/cr6fc_registrationotherdocuments?$select=cr6fc_name,cr6fc_otherdocuments,cr6fc_registrationotherdocumentid&$filter=cr6fc_name eq '" + vItemID + "'&$top=5000";
	webapi.safeAjax({
		url: queryList,
		type: "GET",
		async: false,
		headers: {
			"accept": "application/json;odata=verbose",
			"content-type": "application/json;odata=verbose"
		},
		success: function onSuccess(data) {
			OtherAttachments = data.value;

			var viewOtherDocumentsContainer = $('#viewotherDocuments');

			for (var i = 0; i < OtherAttachments.length; i++) {
				var attachment = OtherAttachments[i];

				if (attachment.cr6fc_otherdocuments_name != null) {
					var attachmentLink = $("<a>")
						.attr("href", "/_api/cr6fc_registrationotherdocuments(" + attachment.cr6fc_registrationotherdocumentid + ")/cr6fc_otherdocuments/$value")
						.text(attachment.cr6fc_otherdocuments_name);

					var deleteIcon = $("<i>")
						.addClass("fa fa-times")
						.attr("style", "color: #ed0202; margin: 0 5px 0; cursor: pointer;")
						.on("click", function () {
							DeleteAttachment('/_api/cr6fc_registrationotherdocuments(' + attachment.cr6fc_registrationotherdocumentid + ')/cr6fc_otherdocuments', attachment.cr6fc_registrationotherdocumentid, 'viewotherDocuments');
						});

					viewOtherDocumentsContainer.append(attachmentLink);
					viewOtherDocumentsContainer.append(deleteIcon);

					viewOtherDocumentsContainer.append("<br>");
				}
			}


		},
		error: function () {
			console.log("error");
		}
	});
}
var signrequestintityid;
function DeleteAuthorizedRow1(rowId) {
	let text = "Do you want to delete ?";
	if (confirm(text) == true) {
		shell.getTokenDeferred().done(function (token) {
			console.log(token)
			var header = {
				__RequestVerificationToken: token,
				contentType: "application/json;odata=verbose"
			}
			webapi.safeAjax({
				url: "/_api/cr6fc_registrationauthorizedsignrequestses(" + rowId + ")",
				type: "DELETE",
				contentType: "application/json;odata=verbose",
				async: false,
				headers: {
					__RequestVerificationToken: token,
					contentType: "application/json;odata=verbose",
					XRequestDigest: $("#__REQUESTDIGEST").val(),
				},
				// success: function (data) {
				success: function (data, textStatus, xhr) {
						var queryList = "";
						queryList = location.origin + "/_api/cr6fc_registrationauthorizedsignrequestses?$select=cr6fc_mrid,cr6fc_registrationauthorizedsignrequestsid&$top=1";
						webapi.safeAjax({
							url: queryList,
							type: "GET",
							async: false,
							headers: {
								"accept": "application/json;odata=verbose",
								"content-type": "application/json;odata=verbose"
							},
							success: function onSuccess(data) {					
									LoggsAutho = data.value;
									signrequestintityid = LoggsAutho[0].cr6fc_registrationauthorizedsignrequestsid;
							}
						});
					successId = xhr.getResponseHeader("entityid");
					console.log(successId);
					location.reload();
					alert('Item Deleted !!')
					window.location.href = location.origin + "/RefreshingCache/?id="+signrequestintityid+"&tbl=cr6fc_registrationauthorizedsignrequestses&col=cr6fc_cacherefreshedon&red=RegistrationEditForm&Item="+vItemID+""
				},
				error: function (error) {
					console.log(error);
					//alert('Some error occured. Please try again later.');
					alert('Some error occured while deleting data in list. Please try again later.');
					console.log(error);
				}
			})
		})
	}
}

function DeleteAttachment(url, Id, fieldId) {
	let text = "Do you want to delete ?";
	if (confirm(text) == true) {
		shell.getTokenDeferred().done(function (token) {
			console.log(token)
			var header = {
				__RequestVerificationToken: token,
				// contentType: "application/json;odata=verbose"
			}
			webapi.safeAjax({
				// url: "/_api/cr6fc_makerregistrationrequestses(29aa5b77-9b53-ee11-be6f-000d3a0aabb1)/cr6fc_bodresolutioncertificate",
				url: url,
				type: "DELETE",
				//contentType: "application/octet-stream",
				async: false,
				headers: {
					__RequestVerificationToken: token,
					contentType: "application/octet-stream",
					XRequestDigest: $("#__REQUESTDIGEST").val(),
				},
				// success: function (data) {
				success: function (data, textStatus, xhr) {
					
					$('#' + fieldId).text("");
					$('#' + fieldId).next().hide();
					alert('Item Deleted !!')
				},
				error: function (error) {
					console.log(error);
					//alert('Some error occured. Please try again later.');
					alert('Some error occured while deleting data in list. Please try again later.');
					console.log(error);
				}
			})
		})
	}
}
var loggdelegatedentityid;
function DeleteDelegatedRow1(rowId) {
	let text = "Do you want to delete ?";
	if (confirm(text) == true) {
		shell.getTokenDeferred().done(function (token) {
			console.log(token)
			var header = {
				__RequestVerificationToken: token,
				contentType: "application/json;odata=verbose"
			}
			webapi.safeAjax({
				url: "/_api/cr6fc_registrationdelgatedauthorequestses(" + rowId + ")",
				type: "DELETE",
				contentType: "application/json;odata=verbose",
				async: false,
				headers: {
					__RequestVerificationToken: token,
					contentType: "application/json;odata=verbose",
					XRequestDigest: $("#__REQUESTDIGEST").val(),
				},
				// success: function (data) {
				success: function (data, textStatus, xhr) {
					var queryList = "";
				queryList = location.origin + "/_api/cr6fc_registrationdelgatedauthorequestses?$select=cr6fc_registrationdelgatedauthorequestsid,cr6fc_mrid&$top=1";
				webapi.safeAjax({
					url: queryList,
					type: "GET",
					async: false,
					headers: {
						"accept": "application/json;odata=verbose",
						"content-type": "application/json;odata=verbose"
					},
					success: function onSuccess(data) {	
							LoggsDeleAuth = data.value;
							 loggdelegatedentityid = LoggsDeleAuth[0].cr6fc_registrationdelgatedauthorequestsid;
					}
				});
					successId = xhr.getResponseHeader("entityid");
					console.log(successId);
					alert('Item Deleted !!');
					window.location.href = location.origin + "/RefreshingCache/?id="+loggdelegatedentityid+"&tbl=cr6fc_registrationdelgatedauthorequestses&col=cr6fc_cacherefreshedon&red=RegistrationEditForm&Item="+vItemID+"";
				},
				error: function (error) {
					console.log(error);
					//alert('Some error occured. Please try again later.');
					alert('Some error occured while deleting data in list. Please try again later.');
					console.log(error);
				}
			})
		})
	}
}
var LoggsAutho = []
function getAuthorizedSign(vItemID) {
	var queryList = "";
	queryList = location.origin + "/_api/cr6fc_registrationauthorizedsignrequestses?$select=cr6fc_mrid,cr6fc_authorizedfirstname,cr6fc_authorizedlastname,cr6fc_authorizeddesignation,cr6fc_authorizedmobileno,cr6fc_authorizedaddress,cr6fc_addressprooftype,cr6fc_addressproofdocument,cr6fc_identityproofdocument,cr6fc_identityprooftype&$filter=cr6fc_mrid eq " + vItemID + "&$top=5000";
	webapi.safeAjax({
		url: queryList,
		type: "GET",
		async: false,
		headers: {
			"accept": "application/json;odata=verbose",
			"content-type": "application/json;odata=verbose"
		},
		success: function onSuccess(data) {
			try {
				LoggsAutho = data.value;
				if (LoggsAutho.length > 0) {
					var vHTML = '';
					var vURLEdit1 = '';
					for (var i = 0; i < LoggsAutho.length; i++) {
						vHTML += "<tr style='line-height: 16px;color: black;'>" +
							//"<td style='text-align:center'>" + LoggsAutho[i].cr6fc_authorizedname + "</td>" +
							"<td style='text-align:center'>" + LoggsAutho[i].cr6fc_authorizedfirstname + "</td>" +
							"<td style='text-align:center'>" + LoggsAutho[i].cr6fc_authorizedlastname + "</td>" +
							"<td style='text-align:center'>" + LoggsAutho[i].cr6fc_authorizeddesignation + "</td>" +
							"<td style='text-align:center'>" + LoggsAutho[i].cr6fc_authorizedmobileno + "</td>" +
							"<td style='text-align:center'>" + LoggsAutho[i].cr6fc_authorizedaddress + "</td>" +
							"<td style='text-align:center'>" + LoggsAutho[i]["cr6fc_addressprooftype@OData.Community.Display.V1.FormattedValue"] + "</td>" +
							//"<td style='text-align:center'>" + LoggsAutho[i].cr6fc_addressproofnumber + "</td>" +
							"<td style='text-align:center'><a href='/_api/cr6fc_registrationauthorizedsignrequestses(" + LoggsAutho[i].cr6fc_registrationauthorizedsignrequestsid + ")/cr6fc_addressproofdocument/$value' id='anchAuthSignAddProof" + i + "' target='_blank'>" + LoggsAutho[i].cr6fc_addressproofdocument_name + "</a></td>" +
							"<td style='text-align:center'>" + LoggsAutho[i]["cr6fc_identityprooftype@OData.Community.Display.V1.FormattedValue"] + "</td>" +
							//"<td style='text-align:center'>" + LoggsAutho[i].cr6fc_identityproofnumber + "</td>" +
							"<td style='text-align:center'><a href='/_api/cr6fc_registrationauthorizedsignrequestses(" + LoggsAutho[i].cr6fc_registrationauthorizedsignrequestsid + ")/cr6fc_Identityproofdocument/$value' id='anchAuthSignIdentityProof" + i + "' target='_blank'>" + LoggsAutho[i].cr6fc_identityproofdocument_name + "</a></td>" +
							"<td class='CenterAlign'><a href='#' title='Delete' onclick='DeleteAuthorizedRow1(\"" + LoggsAutho[i].cr6fc_registrationauthorizedsignrequestsid + "\")'><span class='glyphicon glyphicon-trash'></span></a></td>" +
							"</tr>";
					}
					if (vHTML != "") {
						$('#tblDataMain').DataTable().clear();
						$('#tblDataMain').DataTable().destroy();
						document.getElementById("ExistingAuthorizedtbodyRequestor").innerHTML = vHTML;
						$('#tblDataMain').DataTable({
							"order": [[0, 'asc']],
							paging: true,
							"bInfo": false,
							"bFilter": true
						});
					}
					else {
						vHTML = "<tr><td colspan='4'><font face='Calibri' size='2'>No Authorized Sign Record</font></td></tr>";
						document.getElementById("ExistingAuthorizedtbodyRequestor").innerHTML = vHTML;
						$('#tblDataMain').DataTable();
					}
				}
				/*else {
					vHTML = "<tr><td colspan='4'><font face='Calibri' size='2'>No Authorized Sign Record</font></td></tr>";
					document.getElementById("ExistingAuthorizedtbodyRequestor").innerHTML = vHTML;
					$('#tblDataMain').DataTable();
				}*/
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
var LoggsDeleAuth = []
function getDelegateAutho(vItemID) {
	var queryList = "";
	queryList = location.origin + "/_api/cr6fc_registrationdelgatedauthorequestses?$select=cr6fc_delegatedfirstname,cr6fc_delegatedlastname,cr6fc_delegateddesignation,cr6fc_delegatedmobileno,cr6fc_delegatedaddress,cr6fc_addressprooftype,cr6fc_addressproofdocument,cr6fc_identityproofdocument,cr6fc_identityprooftype&$filter=cr6fc_mrid eq " + vItemID + "&$top=5000";
	webapi.safeAjax({
		url: queryList,
		type: "GET",
		async: false,
		headers: {
			"accept": "application/json;odata=verbose",
			"content-type": "application/json;odata=verbose"
		},
		success: function onSuccess(data) {
			try {
				LoggsDeleAuth = data.value;
				if (LoggsDeleAuth.length > 0) {
					var vHTML = '';
					var vURLEdit1 = '';
					for (var i = 0; i < LoggsDeleAuth.length; i++) {
						vHTML += "<tr style='line-height: 16px;color: black;'>" +
							//"<td style='text-align:center'>" + LoggsDeleAuth[i].cr6fc_delegatedname + "</td>" +
							"<td style='text-align:center'>" + LoggsDeleAuth[i].cr6fc_delegatedfirstname + "</td>" +
							"<td style='text-align:center'>" + LoggsDeleAuth[i].cr6fc_delegatedlastname + "</td>" +
							"<td style='text-align:center'>" + LoggsDeleAuth[i].cr6fc_delegateddesignation + "</td>" +
							"<td style='text-align:center'>" + LoggsDeleAuth[i].cr6fc_delegatedmobileno + "</td>" +
							"<td style='text-align:center'>" + LoggsDeleAuth[i].cr6fc_delegatedaddress + "</td>" +
							"<td style='text-align:center'>" + LoggsDeleAuth[i]["cr6fc_addressprooftype@OData.Community.Display.V1.FormattedValue"] + "</td>" +
							//"<td style='text-align:center'>" + LoggsDeleAuth[i].cr6fc_addressproofnumber + "</td>" +
							"<td style='text-align:center'><a href='/_api/cr6fc_registrationdelgatedauthorequestses(" + LoggsDeleAuth[i].cr6fc_registrationdelgatedauthorequestsid + ")/cr6fc_addressproofdocument/$value' id='anchDelAuthAddProof" + i + "' target='_blank'>" + LoggsDeleAuth[i].cr6fc_addressproofdocument_name + "</a></td>" +
							"<td style='text-align:center'>" + LoggsDeleAuth[i]["cr6fc_identityprooftype@OData.Community.Display.V1.FormattedValue"] + "</td>" +
							//"<td style='text-align:center'>" + LoggsDeleAuth[i].cr6fc_identityproofnumber + "</td>" +
							"<td style='text-align:center'><a href='/_api/cr6fc_registrationdelgatedauthorequestses(" + LoggsDeleAuth[i].cr6fc_registrationdelgatedauthorequestsid + ")/cr6fc_Identityproofdocument/$value' id='anchDelAuthIdentityProof" + i + "' target='_blank'>" + LoggsDeleAuth[i].cr6fc_identityproofdocument_name + "</a></td>" +
							"<td class='CenterAlign'><a href='#' title='Delete' onclick='DeleteDelegatedRow1(\"" + LoggsDeleAuth[i].cr6fc_registrationdelgatedauthorequestsid + "\")'><span class='glyphicon glyphicon-trash'></span></a></td>" +
							"</tr>";
					}
					if (vHTML != "") {
						$('#tblDataDelegated').DataTable().clear();
						$('#tblDataDelegated').DataTable().destroy();
						document.getElementById("ExistingdelegatetbodyRequestor").innerHTML = vHTML;
						$('#tblDataDelegated').DataTable({
							paging: true,
							"bInfo": false,
							"bFilter": true
						});
					}
					else {
						vHTML = "<tr><td colspan='4'><font face='Calibri' size='2'>No Authorized Sign Record</font></td></tr>";
						document.getElementById("ExistingdelegatetbodyRequestor").innerHTML = vHTML;
						$('#tblDataDelegated').DataTable();
					}
				}
				/*	else {
						vHTML = "<tr><td colspan='4'><font face='Calibri' size='2'>No Authorized Sign Record</font></td></tr>";
						document.getElementById("ExistingdelegatetbodyRequestor").innerHTML = vHTML;
						$('#tblDataDelegated').DataTable();
					}*/

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
var LoggContactColl = [];
var contactid = '';
function getUserContact(vItemID) {
	var queryList = "";
	
	queryList = location.origin + "/_api/cr6fc_registrationcontacts?$select=cr6fc_mrid,cr6fc_userfirstname,cr6fc_userlastname,cr6fc_userdesignation,cr6fc_usercontactno,cr6fc_useremail,cr6fc_addressprooftype,cr6fc_addressproofdocument,cr6fc_identityprooftype,cr6fc_identityproofdocument&$filter=cr6fc_mrid eq " + vItemID + "&$top=1&$orderby=createdon asc";
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
				LoggContactColl = data.value;
				if (LoggContactColl.length > 0) {
					var vHTML = '';
					var vURLEdit1 = '';
					for (var i = 0; i < LoggContactColl.length; i++) {
						contactid = LoggContactColl[i].cr6fc_registrationcontactid;

						vHTML += "<tr style='line-height: 16px;color: black;'>" +
							//"<td style='text-align:center'>" + LoggsDeleAuth[i].cr6fc_delegatedname + "</td>" +
							"<td style='text-align:center'>" + LoggContactColl[i].cr6fc_userfirstname + "</td>" +
							"<td style='text-align:center'>" + LoggContactColl[i].cr6fc_userlastname + "</td>" +
							"<td style='text-align:center'>" + LoggContactColl[i].cr6fc_userdesignation + "</td>" +
							"<td style='text-align:center'>" + LoggContactColl[i].cr6fc_usercontactno + "</td>" +
							"<td style='text-align:center'>" + LoggContactColl[i].cr6fc_useremail + "</td>" +
							//"<td style='text-align:center'>" + LoggContactColl[i].cr6fc_useraddress + "</td>" +
							"<td style='text-align:center'>" + LoggContactColl[i]["cr6fc_addressprooftype@OData.Community.Display.V1.FormattedValue"] + "</td>" +
							//"<td style='text-align:center'>" + LoggsDeleAuth[i].cr6fc_addressproofnumber + "</td>" +
							"<td style='text-align:center'><a href='/_api/cr6fc_registrationcontacts(" + LoggContactColl[i].cr6fc_registrationcontactid + ")/cr6fc_addressproofdocument/$value' id='fAddressProof" + i + "' target='_blank'>" + LoggContactColl[i].cr6fc_addressproofdocument_name + "</a></td>" +
							"<td style='text-align:center'>" + LoggContactColl[i]["cr6fc_identityprooftype@OData.Community.Display.V1.FormattedValue"] + "</td>" +
							//"<td style='text-align:center'>" + LoggsDeleAuth[i].cr6fc_identityproofnumber + "</td>" +
							"<td style='text-align:center'><a href='/_api/cr6fc_registrationcontacts(" + LoggContactColl[i].cr6fc_registrationcontactid + ")/cr6fc_identityproofdocument/$value' id='fIdentityProof" + i + "' target='_blank'>" + LoggContactColl[i].cr6fc_identityproofdocument_name + "</a></td>" +
							"<td style='text-align:center'><a href='#' title='Delete' onclick='DeleteContactRow1(\"" + LoggContactColl[i].cr6fc_registrationcontactid + "\")'><span class='glyphicon glyphicon-trash'></span></a></td>" +
							"</tr>";

						//}
					}
					if (vHTML != "") {
						$('#tbladministrater').DataTable().clear();
						$('#tbladministrater').DataTable().destroy();
						document.getElementById("tbodyRequestorAdministrator").innerHTML = vHTML;
						$('#tbladministrater').DataTable({
							paging: true,
							"bInfo": false,
							"bFilter": true
						});
					}
					else {
						vHTML = "<tr><td colspan='4'><font face='Calibri' size='2'>No Data Available</font></td></tr>";
						document.getElementById("tbodyRequestorAdministrator").innerHTML = vHTML;
						$('#tbladministrater').DataTable();
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
function DeleteContactRow1(rowId) {
	let text = "Do you want to delete ?";
	if (confirm(text) == true) {
		shell.getTokenDeferred().done(function (token) {
			console.log(token)
			var header = {
				__RequestVerificationToken: token,
				contentType: "application/json;odata=verbose"
			}
			webapi.safeAjax({
				url: "/_api/cr6fc_registrationcontacts(" + rowId + ")",
				type: "DELETE",
				contentType: "application/json;odata=verbose",
				async: false,
				headers: {
					__RequestVerificationToken: token,
					contentType: "application/json;odata=verbose",
					XRequestDigest: $("#__REQUESTDIGEST").val(),
				},
				// success: function (data) {
				success: function (data, textStatus, xhr) {
					var queryList = "";
	
				queryList = location.origin + "/_api/cr6fc_registrationcontacts?$select=cr6fc_registrationcontactid,cr6fc_mrid&$top=1&$orderby=createdon asc";
				$.ajax({
					url: queryList,
					type: "GET",
					async: false,
					headers: {
						"accept": "application/json;odata=verbose",
						"content-type": "application/json;odata=verbose"
					},
					success: function onSuccess(data) {
							LoggContactColl = data.value;
									contactid = LoggContactColl[0].cr6fc_registrationcontactid;	
							}
						});
					successId = xhr.getResponseHeader("entityid");
					console.log(successId);
					alert('Item Deleted !!');
					window.location.href = location.origin + "/RefreshingCache/?id="+contactid+"&tbl=cr6fc_registrationcontacts&col=cr6fc_cacherefreshedon&red=RegistrationEditForm&Item="+vItemID+"";
					// location.reload();

				},
				error: function (error) {
					console.log(error);
					//alert('Some error occured. Please try again later.');
					alert('Some error occured while deleting data in list. Please try again later.');
					console.log(error);
				}
			})
		})
	}
}
var txtFirstNameAuthorized = '';
var txtLastNameAuthorized = "";
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
	//txtNameAuthorized = $('#txtNameAuthorized').val();
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
                       
                        <td align="center" style="text-align: center;"><input id="fAuthSignAddressProof" title="Address Proof Type" type="file" name="fAuthSignAddressProof" class="form-control" /></td>
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
                        
                        <td align="center" style="text-align: center;"><input id="fAuthSignIdentityProof" title="Identity Proof Type" type="file" name="fAuthSignIdentityProof" class="form-control" /></td>
						<td class="text-center">
						<button class="btn remove btn-danger btn-xs" type="button" style="min-width: auto;height: 22px !important;" onclick="remove(R${IncrimentalID});"><i class="fa fa-trash"></i></button>
						</td>
  
	 </tr>`);
}
var DetailArrayAuthSign = [];
const addDetailstoautorised = () => {
	var myTab = document.getElementById('tbodyone');
	// LOOP THROUGH EACH ROW OF THE TABLE AFTER HEADER.
	DetailArrayAuthSign = [];
	if (myTab.rows.length > 0) {

		for (i = 0; i < myTab.rows.length; i++) {

			// GET THE CELLS COLLECTION OF THE CURRENT ROW.
			var objCells = myTab.rows.item(i).cells;

			// LOOP THROUGH EACH CELL OF THE CURENT ROW TO READ CELL VALUES.
			var DetailColl = {};

			for (var j = 0; j < objCells.length; j++) {

				debugger; (objCells.item(j).children[0].value);
				if (j == 0) {
					//DetailColl.InvoiceNumber= RefInvoiceNumber;
					if ((objCells[j].children[0].value == "" || objCells[j].children[0].value == undefined) && LoggsAutho.length == 0) {
						alert('Please enter First Name in row "' + (parseInt(i) + 1) + '"');
						flag = true;
						return false;
					}
					flag = false;
					DetailColl.txtFirstName = objCells[j].children[0].value;
				}
				if (j == 1) {
					if ((objCells[j].children[0].value == "" || objCells[j].children[0].value == undefined) && LoggsAutho.length == 0) {
						alert('Please enter Last Name in row "' + (parseInt(i) + 1) + '"');
						flag = true;
						return false;
					}
					// DetailColl.InvoiceDate= InvoiceDate;
					flag = false;
					DetailColl.txtLastName = objCells[j].children[0].value;
				}
				if (j == 2) {
					// DetailColl.Description= Description;

					if ((objCells[j].children[0].value == "" || objCells[j].children[0].value == undefined) && LoggsAutho.length == 0) {
						alert('Please enter Designation in row "' + (parseInt(i) + 1) + '"');
						flag = true;
						return false;
					}
					flag = false;
					DetailColl.txtDesignation = objCells[j].children[0].value;
				}
				if (j == 3) {
					// DetailColl.ExpenseSegments= ExpenseSegments;
					if ((objCells[j].children[0].value == "" || objCells[j].children[0].value == 'Select') && LoggsAutho.length == 0) {
						alert('Please enter mobile number in row "' + (parseInt(i) + 1) + '"');
						flag = true;
						return false;
					}
					flag = false;
					DetailColl.txtMobileNo = objCells[j].children[0].value;
				}
				if (j == 4) {
					if ((objCells[j].children[0].value == "" || objCells[j].children[0].value == 'Select') && LoggsAutho.length == 0) {
						alert('Please enter EmailID type in row "' + (parseInt(i) + 1) + '"');
						flag = true;
						return false;
					}
					// DetailColl.VendorName= VendorName;
					flag = false;
					DetailColl.txtAddressAuthorized = objCells[j].children[0].value;
				}
				if (j == 5) {
					//DetailColl.MSME = MSME;
					if ((objCells[j].children[0].value == "" || objCells[j].children[0].value == undefined) && LoggsAutho.length == 0) {
						alert('Please enter Address Proof Type in row "' + (parseInt(i) + 1) + '"');
						flag = true;
						return false;
					}
					flag = false;
					DetailColl.ddlAuthSignAddressProofType = objCells[j].children[0].value;
				}
				if (j == 6) {
					// DetailColl.OriginalInvoiceAmount = OriginalInvoiceAmount;
					if ((objCells[j].children[0].value == "" || objCells[j].children[0].value == undefined) && LoggsAutho.length == 0) {
						alert('Please enter fAuthSignAddressProof in row "' + (parseInt(i) + 1) + '"');
						flag = true;
						return false;
					}
					else if ((objCells[j].children[0].value != "" || objCells[j].children[0].value != undefined) && LoggsAutho.length == 0) {
						if (!(objCells[j].children[0].files[0].name.endsWith(".pdf") || objCells[j].children[0].files[0].name.endsWith(".PDF"))) {
							alert('Please enter PDF File only in fAuthSignAddressProof in row "' + (parseInt(i) + 1) + '"');
							flag = true;
							return false;
						}
					}
					flag = false;
					DetailColl.fAuthSignAddressProof = objCells[j].children[0].files[0];
				}
				if (j == 7) {
					// DetailColl.Deduction = Deduction;
					if ((objCells[j].children[0].value == "" || objCells[j].children[0].value == undefined) && LoggsAutho.length == 0) {
						alert('Please enter ddlAuthSignIdentityProofType in row "' + (parseInt(i) + 1) + '"');
						flag = true;
						return false;
					}
					flag = false;
					DetailColl.ddlAuthSignIdentityProofType = objCells[j].children[0].value;
				}
				if (j == 8) {
					// DetailColl.Deduction = Deduction;
					if ((objCells[j].children[0].value == "" || objCells[j].children[0].value == undefined) && LoggsAutho.length == 0) {
						alert('Please enter fAuthSignIdentityProof in row "' + (parseInt(i) + 1) + '"');
						flag = true;
						return false;
					}
					else if ((objCells[j].children[0].value != "" || objCells[j].children[0].value != undefined) && LoggsAutho.length == 0) {
						if (!(objCells[j].children[0].files[0].name.endsWith(".pdf") || objCells[j].children[0].files[0].name.endsWith(".PDF"))) {
							alert('Please enter PDF File only in fAuthSignIdentityProof in row "' + (parseInt(i) + 1) + '"');
							flag = true;
							return false;
						}
					}
					flag = false;
					DetailColl.fAuthSignIdentityProof = objCells[j].children[0].files[0];
				}
				if (j == 9) {
					DetailArrayAuthSign.push(DetailColl);

				}
				//

			}

		}

	}
}
function remove(ID) {
	let CredensialID = ID.id;
	$("#" + CredensialID + "").empty();
	$("#" + CredensialID + "").remove();

}

function AddtoColl() {
	var DetailColl = {};
	//DetailColl.txtName = txtNameAuthorized;
	DetailColl.txtFirstName = txtFirstNameAuthorized;
	DetailColl.txtLastName = txtLastNameAuthorized;
	DetailColl.txtDesignation = txtDesignationAuthorized;
	DetailColl.txtMobileNo = txtMobileNoAuthorized;
	DetailColl.txtAddressAuthorized = txtAddressAuthorized;

	DetailColl.ddlAuthSignAddressProofType = ddlAuthSignAddressProofType;
	DetailColl.ddlAuthSignAddressProofTypetxt = ddlAuthSignAddressProofTypetxt;
	//DetailColl.txtAuthSignAddressProofNumber = txtAuthSignAddressProofNumber;
	DetailColl.fAuthSignAddressProof = fAuthSignAddressProof;
	DetailColl.ddlAuthSignIdentityProofType = ddlAuthSignIdentityProofType;
	DetailColl.ddlAuthSignIdentityProofTypetxt = ddlAuthSignIdentityProofTypetxt;
	//DetailColl.txtAuthSignIdentityProofNumber = txtAuthSignIdentityProofNumber;
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
		//.getElementById("txtNameAuthorized").value = "";
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

//var txtNameDelegated = '';
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
	txtLastNameDelegated = $('#txtNameDelegated').val();
	//txtNameDelegated = $('#txtNameDelegated').val();
	txtDesignationDelegated = $('#txtDesignationDelegated').val();
	txtMobileNoDelegated = $('#txtMobileNoDelegated').val();
	txtAddressDelegated = $('#txtAddressDelegated').val();

	ddlDelAuthAddressProofType = $('#ddlDelAuthAddressProofType').val();
	ddlDelAuthAddressProofTypetxt = $('#ddlDelAuthAddressProofType option:selected').text();
	//i txtDelAuthAddressProofNumber = $('#txtDelAuthAddressProofNumber').val();
	fDelAuthAddressProof = document.getElementById('fDelAuthAddressProof').files[0];
	ddlDelAuthIdentityProofType = $('#ddlDelAuthIdentityProofType').val();
	ddlDelAuthIdentityProofTypetxt = $('#ddlDelAuthIdentityProofType option:selected').text();
	//txtDelAuthIdentityProofNumber = $('#txtDelAuthIdentityProofNumber').val();
	fDelAuthIdentityProof = document.getElementById('fDelAuthIdentityProof').files[0];

	if (txtFirstNameDelegated == undefined || txtFirstNameDelegated == "" || txtFirstNameDelegated == null) {
		alert('Please enter First Name');
		return false;
	}
	if (txtFirstNameDelegated != "" || txtFirstNameDelegated != undefined) {
		if (txtLastNameDelegated == undefined || txtLastNameDelegated == "" || txtLastNameDelegated == null) {
			alert('Please enter First Name');
			return false;
		}
		if (txtDesignationDelegated == undefined || txtDesignationDelegated == "" || txtDesignationDelegated == null) {
			alert('Please enter Designation');
			return false;
		}
		if (txtMobileNoDelegated == undefined || txtMobileNoDelegated == "" || txtMobileNoDelegated == null) {
			alert('Please enter Delegated Mobile No.');
			return false;
		}
		else if (txtMobileNoDelegated.length != 10) {
			alert("Please Enter valid Delegated Mobile No.")
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
		else if (!(document.getElementById('fDelAuthAddressProof').files[0].name.endsWith(".pdf") || document.getElementById('fDelAuthAddressProof').files[0].name.endsWith(".PDF"))) {
			alert("Please Enter PDF file in Authorized Address Proof");
			return false;
		}
		if (!((document.getElementById('fDelAuthIdentityProof').files[0].name.endsWith(".pdf")) || (document.getElementById('fDelAuthIdentityProof').files[0].name.endsWith(".PDF")))) {
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
	//DetailColl.txtDelAuthAddressProofNumber = txtDelAuthAddressProofNumber;
	DetailColl.fDelAuthAddressProof = fDelAuthAddressProof;
	DetailColl.ddlDelAuthIdentityProofType = ddlDelAuthIdentityProofType;
	DetailColl.ddlDelAuthIdentityProofTypetxt = ddlDelAuthIdentityProofTypetxt;
	//DetailColl.txtDelAuthIdentityProofNumber = txtDelAuthIdentityProofNumber;
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
		//document.getElementById("txtNameDelegated").value = "";
		document.getElementById("txtFirstNameDelegated").value = "";
		document.getElementById("txtNameDelegated").value = "";
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

function checkedEmailAddressNew(txtEmailIdAdministrator) {
	var vRetVal = false;
	var hdnCounter = '';
	var requestUri = location.origin + "/_api/cr6fc_registrationcontacts?$top=2&$select=*&$filter=cr6fc_useremail eq '" + txtEmailIdAdministrator + "'";
	var requestHeaders = { "accept": "application/json;odata=verbose" };
	webapi.safeAjax({
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
				if (Logg.length > 1) {
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
var vTitle;
var ELIChecker;
function testrecord() {
	var testrecordtest = $("#txtFirstNameAdministrator").val();
	if (testrecordtest != '') {
		if (LoggContactColl != undefined) {
			if (LoggContactColl.length > 0) {
				alert("please delete privious request");
				return false;
			}
		}
	}
}

function SubmitData(status) {


	var txtBankName = $("#txtBankName").val();
	if ((txtBankName == "" || txtBankName == undefined) && status == "Submitted") {
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
	else if (txtTypeofBank == 0 || txtTypeofBank == undefined) {
		txtTypeofBank = "fd6165f3-5a58-ee11-be6f-000d3a0aabb1"
	}
	var txtPan = $("#txtPan").val();
	if ((txtPan == "" || txtPan == undefined)) {
		alert('Please Enter PAN No')
		return false;
	}
	else {
		var regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;

		if (!regex.test(txtPan)) {
			alert('Please Enter Valid PAN Number')

			return false;
		}

	}
	if (txtPan.length != 10) {
		alert('Please Enter Valid PAN Number')
		return false;
	}
	var GSTINFPO = $("#GSTINFPO").val();
	if (GSTINFPO == "" && status == "Submitted") {
		alert('Please Enter  GSTIN Number')
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


	/*	var txtEmailID = $("#txtEmailID").val();
		if ((txtEmailID == "" || txtEmailID == undefined) && status == "Submitted") {
			alert('Please Enter Email ID')
			return false;
		}
		else {
			var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if (!regex.test(txtEmailID) && status == "Submitted") {
				alert('Please Enter Valid Email ID')
	
				return false;
			}
	
		}
		 */
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
	/*var txtTown = $("#txtTown").val();
	if ((txtTown == "" || txtTown == undefined) && status == "Submitted") {
		alert('Please Enter town')
		return false;
	}*/
	var ddlState = $("#ddlState option:selected").val();
	if ((ddlState == "" || ddlState == undefined || ddlState == "0" || ddlState == 0) && status == "Submitted") {
		alert('Please Select State')
		return false;
	}
	else if (ddlState == "e018b138-4231-ee11-bdf4-000d3a0aabb1") {
		alert("Please Enter Valid State")
		return false;
	}
	else {
		if ((ddlState == "" || ddlState == undefined || ddlState == "0" || ddlState == 0)) {

			ddlState = "e018b138-4231-ee11-bdf4-000d3a0aabb1";
		}

	}
	var txtpincode = $("#txtpincode").val();
	if ((txtpincode == "" || txtpincode == undefined) && status == "Submitted") {
		alert('Please Enter Pincode');
		return false;
	}
	else if (txtpincode.length != 6 && status == "Submitted") {
		alert("Please Enter Valid Pincode");
		return false;
	}
	/*var txtContactNo = $("#txtContactNo").val();
	if ((txtContactNo == "" || txtContactNo == undefined) && status == "Submitted") {
		alert('Please Enter ELI Mobile Number')
		return false;
	}
	else {
		var regex = /^\d*(?:\.\d{1,2})?$/;
		if (!regex.test(txtContactNo) && status == "Submitted") {
			alert('Please Enter Valid ELI Mobile Number')

			return false;
		}

	}
	if (txtContactNo.length != 10 && status == "Submitted") {
		alert('Please Enter Valid ELI Mobile Number')
		return false;
	}*/
	var txttelephnno = $("#txttelephnno").val();
	if (document.getElementById('fBodReslCert').files.length <= 0 && $('#anchBodReslCert').text() == "" && status == "Submitted") {
		alert('Please provide Certified copy of Resolution from Board of Directors')
		return false;
	}

	if (document.getElementById('fPANLICert').files.length <= 0 && $('#anchPANLICert').text() == "" && status == "Submitted") {
		alert('Please provide Certified copy of Permanent Account Number of LI')
		return false;
	}

	if (document.getElementById('fAddProofUtility').files.length <= 0 && $('#anchAddProofUtility').text() == "" && status == "Submitted") {
		alert('Please provide Address Proof of EL')
		return false;
	}
	if (document.getElementById('fOrgUndertaking').files.length <= 0 && $('#anchOrgUndertaking').text() == "" && status == "Submitted") {
		alert('Please provide Original Undertaking')
		return false;
	}
	if (document.getElementById('fCertGSTIN').files.length <= 0 && $('#anchCertGSTIN').text() == "" && status == "Submitted") {
		alert('Please provide Certified GSTIN*')
		return false;
	}


	var SubStatus;
	if (status == "Draft") {
		SubStatus = "6";
	}
	else if (status == "Submitted") {
		SubStatus = "1";
	}

	/*if(LoggsAutho.length==0)
	{
		if (DetailArrayAuthSign != undefined && status == "Submitted") {
			if (DetailArrayAuthSign.length == 0) {
				alert('Enter atleast one record of Authority')
				return false;
			}
		}
		else {
			alert('Enter atleast one record of Authorized Signatory')
			return false;
		}
	}*/

	var txtNameDelegated = $('#txtFirstNameDelegated').val();
	if (LoggsDeleAuth.length == 0) {
		if (txtNameDelegated != "" && status == "Submitted") {
			if (DetailArrayDelegated != undefined) {
				if (DetailArrayDelegated.length == 0) {
					alert('Enter atleast one record of Delegation of Authority')
					return false;
				}
			}
			/*else {
				alert('Enter atleast one record of Delegation of Authority')
				return false;
			}*/
		}
	}


	//************************* */
	/*var txtNameAdministrator = $('#txtNameAdministrator').val();
	if ((txtNameAdministrator == "" || txtNameAdministrator == undefined) && status == "Submitted") {
		alert('Please enter Name of Administrator')
		return false;
	}*/

	var txtFirstNameAdministrator = $("#txtFirstNameAdministrator").val();
	if (((txtFirstNameAdministrator == "" || txtFirstNameAdministrator == undefined) && status == "Submitted") && LoggContactColl.length <= 0) {
		alert('Please enter First Name  of Administrator')
		return false;
	}
	var txtLastNameAdministrator = $("#txtLastNameAdministrator").val();
	if (((txtLastNameAdministrator == "" || txtLastNameAdministrator == undefined) && status == "Submitted") && LoggContactColl.length <= 0) {
		alert('Please enter Last Name  of Administrator')
		return false;
	}
	var txtDesignationAdministrator = $('#txtDesignationAdministrator').val();
	if (((txtDesignationAdministrator == "" || txtDesignationAdministrator == undefined) && status == "Submitted") && LoggContactColl.length <= 0) {
		alert('Please enter Designation  of Administrator')
		return false;
	}
	var txtMobileNoAdministrator = $('#txtMobileNoAdministrator').val();
	if (((txtMobileNoAdministrator == "" || txtMobileNoAdministrator == undefined) && status == "Submitted") && LoggContactColl.length <= 0) {
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
	if ((txtMobileNoAdministrator.length != 10 && status == "Submitted") && LoggContactColl.length <= 0) {
		alert('Please Enter Valid Mobile No of Administrator')
		return false;
	}

	var txtEmailIdAdministrator = $('#txtEmailIdAdministrator').val();
	if (((txtEmailIdAdministrator == "" || txtEmailIdAdministrator == undefined) && status == "Submitted") && LoggContactColl.length <= 0) {
		alert('Please enter Email Address of Administrator')
		return false;
	}
	else {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if ((!regex.test(txtEmailIdAdministrator) && status == "Submitted") && LoggContactColl.length <= 0) {
			alert('Please Enter Valid Email Address of Administrator')

			return false;
		}

	}
	var checkedEmailAddress = checkedEmailAddressNew(txtEmailIdAdministrator);
	if ((checkedEmailAddress && LoggContactColl.length <= 0)) {
		alert('Duplicate Admin Email Address found')
		return false;
	}
	/*var txtAddressAdministrator = $('#txtAddressAdministrator').val();
	if ((txtAddressAdministrator == "" || txtAddressAdministrator == undefined) && status == "Submitted") {
		alert('Please enter Address of Administrator')
		return false;
	}**/

	if ((((document.getElementById('fAddressProof').files.length <= 0 && $('#anchAdminAddProof').text() == "")) && status == "Submitted") && LoggContactColl.length <= 0) {
		alert('Please provide Address proof document of Administrator')
		return false;
	}
	if (((document.getElementById('fIdentityProof').files.length <= 0 && $('#anchAdminIdProof').text() == "") && status == "Submitted") && LoggContactColl.length <= 0) {

		alert('Please provide Identity proof document of Administrator')
		return false;
	}


	var optionAddressProofType = $('#ddlAddressProofType').val();
	if (((optionAddressProofType == 0 || optionAddressProofType == undefined) && status == "Submitted") && LoggContactColl.length < 0) {
		alert("PLease Enter the Address proof Type")
		return false;
	}
	/*var txtAddressProofNumber = $('#txtAddressProofNumber').val();
	if ((txtAddressProofNumber == "" || txtAddressProofNumber == undefined)&& status == "Submitted") {
		alert("PLease Enter the Address proof Number")
		return false;
	}*/



	var optionIdentityProofType = $('#ddlIdentityProofType').val();
	if (((optionIdentityProofType == 0 || optionIdentityProofType == undefined) && status == "Submitted") && LoggContactColl.length <= 0) {
		alert("Please Enter the Identity Proof Type");
		return false;
	}
	/*var txtIdentityProofNumber = $('#txtIdentityProofNumber').val();
	if ((txtIdentityProofNumber == "" || txtIdentityProofNumber == undefined)&& status == "Submitted") {
		alert("Please Enter the Identity Proof Number");
		return false;
	}*/



	var optionAddressProofType = $('#ddlAddressProofType').val();
	if ((optionAddressProofType == "" || optionAddressProofType == undefined)) {
		optionAddressProofType = 0;
	}
	/*var txtAddressProofNumber = $('#txtAddressProofNumber').val();
	if ((txtAddressProofNumber == "" || txtAddressProofNumber == undefined)) {
		txtAddressProofNumber = "";
	}*/
	var optionIdentityProofType = $('#ddlIdentityProofType').val();
	if ((optionIdentityProofType == "" || optionIdentityProofType == undefined)) {
		optionIdentityProofType = 0;
	}
	/*var txtIdentityProofNumber = $('#txtIdentityProofNumber').val();
	if ((txtIdentityProofNumber == "" || txtIdentityProofNumber == undefined)) {
		txtIdentityProofNumber = "";
	}*/
	var txtDescription = $("#txtDescription").val();
	var ContactColl = [];

	var contact = {};
	//contact.Name = txtNameAdministrator;
	/*contact.FirstName=txtFirstNameAdministrator;
	contact.LastName=txtLastNameAdministrator;
	contact.Email = txtEmailIdAdministrator;
	contact.Designation = txtDesignationAdministrator;
	contact.Mobile = txtMobileNoAdministrator;
	contact.Address = txtAddressAdministrator;
	contact.UserType = "3";
	contact.AddressProofType = optionAddressProofType;
	contact.AddressProofNumber = txtAddressProofNumber;
	contact.IdentityProofType = optionIdentityProofType;
	contact.IdentityProofNumber = txtIdentityProofNumber;*/

	if (txtFirstNameAdministrator != '') { contact.FirstName = txtFirstNameAdministrator; }
	if (txtLastNameAdministrator != '') { contact.LastName = txtLastNameAdministrator; }
	if (txtEmailIdAdministrator != '') { contact.Email = txtEmailIdAdministrator; }
	if (txtDesignationAdministrator != '') { contact.Designation = txtDesignationAdministrator; }
	if (txtMobileNoAdministrator != '') { contact.Mobile = txtMobileNoAdministrator; }
	//if(txtAddressAdministrator !=''){contact.Address = txtAddressAdministrator;}

	if (txtFirstNameAdministrator != '') { contact.UserType = "3"; }
	if (optionAddressProofType != 0) { contact.AddressProofType = optionAddressProofType; }
	///if(txtAddressProofNumber !=''){contact.AddressProofNumber = txtAddressProofNumber;}
	if (optionIdentityProofType != 0) { contact.IdentityProofType = optionIdentityProofType; }
	if (contactid != '') { contact.contactid = contactid }
	//if(txtIdentityProofNumber !=''){contact.IdentityProofNumber = txtIdentityProofNumber;}
	//ContactColl.push(contact);
	if ($.isEmptyObject(contact) == false) {
		ContactColl.push(contact);

	}
	//************************* */



	var ELICheckerEmail = $('#ELICheckerEmail').val();
	var EILchecker;
	if (ELICheckerEmail != null && ELICheckerEmail != undefined && ELICheckerEmail != '') {
		//EILchecker=checker[0].EILCheckerId;
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
	var requesterRemark = $('#txtmakerComment').val();

	var hdnNSMaker = $('#hdnNSMaker').val();
	var hdnNSChecker = $('#hdnNSChecker').val();
	var hdnNSApprover = $('#hdnNSApprover').val();
	if(LoggContactColl != undefined){
		if(LoggContactColl.length>0 && ContactColl[0].FirstName != undefined ){
			alert('please delete previous contact details of administrator');
			return false;
		}
	}
	addDetailstoautorised();
	if (flag == true) {
		return false;
	}
	$('#btnSave').prop('disabled', true);
	$('#btn1').prop('disabled', true);

	var data = JSON.stringify(
		{
			"cr6fc_name": vTitle,
			"cr6fc_bankname": txtBankName,
			//"cr6fc_registrationname": txtRegistrationName,
			//"cr6fc_typeofbank": txtTypeofBank,
			"cr6fc_TypeOfBank@odata.bind": "/cr6fc_banktypes(" + txtTypeofBank + ")",
			"cr6fc_address": txtAddress,
			"cr6fc_city": txtCity,
			//"cr6fc_town": txtTown,
			"cr6fc_gstin": GSTINFPO,
			"cr6fc_pannumber": txtPan,
			"cr6fc_pincode": txtpincode,
			"cr6fc_requeststatus": SubStatus,
			"cr6fc_State@odata.bind": "/cr6fc_statemasters(" + ddlState + ")",
			"cr6fc_website": txtWebsite,
			// "cr6fc_emailid": txtEmailID,
			// //"cr6fc_requeststatus": 1,
			// "cr6fc_contactno": txtContactNo,
			"cr6fc_telephonenumber": txttelephnno,
			"cr6fc_administratorfirstname": txtFirstNameAdministrator,
			"cr6fc_administratorlastname": txtLastNameAdministrator,
			"cr6fc_administratordesignation": txtDesignationAdministrator,
			"cr6fc_administratormobileno": txtMobileNoAdministrator,
			"cr6fc_otherdescription": txtDescription,
			"cr6fc_NSMaker_contact@odata.bind": "/contacts(" + hdnNSMaker + ")",
			"cr6fc_NSChecker_contact@odata.bind": "/contacts(" + hdnNSChecker + ")",
			"cr6fc_NSApprover_contact@odata.bind": "/contacts(" + hdnNSApprover + ")",
			"cr6fc_Requester_contact@odata.bind": "/contacts(" + loggedInUserId + ")",
			"cr6fc_requesterremark": requesterRemark,
		});

	shell.getTokenDeferred().done(function (token) {
		console.log(token)
		var header = {
			__RequestVerificationToken: token,
			contentType: "application/json;odata=verbose",
			XRequestDigest: $("#__REQUESTDIGEST").val(),
			IFMATCH: "*",
			XHttpMethod: "PATCH"
		}
		webapi.safeAjax({
			url: "/_api/cr6fc_makerregistrationrequests(" + vItemID + ")",
			type: "PATCH",
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
					createAuthorizedSign(token, vTitle, successId).done(function (authSignResp) {
						createDelegatedAutho(token, vTitle, successId).done(function (delgAuthResp) {
							createContact(token, vTitle, successId, ContactColl, vItemID).done(function (contactResp) {
								//UpdateCounter(token).done(function (counterResp) {
								UploadotherDocument(token, successId).done(function (OtherDocumentResp) {
									if (SubStatus == "6") {
										alert("Application for ELI registration has been Saved")
									} else {
										alert('Application for ELI registration has been successfully submitted.')
									}
									//window.location.href = location.origin + "/RefreshingCache/?id=" + AuthorizedsignentityID + "&tbl=cr6fc_registrationauthorizedsignrequestses&col=cr6fc_cacherefreshedon&red=RegisterDashboard";

									//window.location.href = location.origin + "/RefreshingCache/?id=" + registrationcontactentityid + "&tbl=cr6fc_registrationcontacts&col=cr6fc_cacherefreshedon&red=RegisterDashboard";
									window.location.href = location.origin + "/refreshingcache/?id=" + AuthorizedsignentityID + "," + otherdocumententityid + "," + registrationcontactentityid + "," + createDelegatedAuthoentityid + "&tbl=cr6fc_registrationauthorizedsignrequestses,cr6fc_registrationotherdocuments,cr6fc_registrationcontacts,cr6fc_registrationdelgatedauthorequestses&col=cr6fc_cacherefreshedon&red=RegisterDashboard";
									//refreshCache("cr6fc_registrationauthorizedsignrequestses",AuthorizedsignentityID,"cr6fc_cacherefreshedon","RegisterDashboard");
									//window.location.href = location.origin + "/RegisterDashboard/";
									//});
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
	webapi.safeAjax({
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
	// webapi.safeAjax({
	//     type: "PUT", // NOTE: right now Portals requires PUT instead of PATCH for the upload
	//     url: "/_api/cr6fc_makerregistrationrequestses(" + entityID + ")/cr6fc_attachmentfile?x-ms-file-name=" + fileName,
	//     contentType: "application/octet-stream",
	//     data: fileContent,
	//     processData: false,
	//     success: function (data, textStatus, xhr) {
	//         // Provide some visual feedback re successful upload
	//         // $('#upload-Audio h1').html('<span style="color: #1ed760;" class="glyphicon glyphicon-ok"></span> Here\'s your audio');
	//         // Set the source of the hidden audio player
	//         audioPlayerSrcURL = '/File/download.aspx?Entity=musdyn_track' + '&Attribute=musdyn_audiotrack&Id=' + entityID;
	//         $('#upload-player').attr('src',audioPlayerSrcURL)
	//         // Show the audio player
	//         $('.showOnSuccess').slideDown(200);
	//         // Hide the form
	//         $('#track-content').slideUp(200);
	//     },
	//     error: function (xhr, textStatus, errorThrown) {
	//         // If error occurs uploading the file, provide visual feedback
	//         $('#upload-Audio h1').text('Uh oh, uploading file the track');
	//     }
	// });
}

var authSignDeferred = $.Deferred();
var authSignResp = [];
var AuthorizedsignentityID;
function createAuthorizedSign(token, vTitle, entityID) {


	if (DetailArrayAuthSign.length >= 1 && DetailArrayAuthSign[numOfAuthSign].txtFirstName != '') {
		//for (var i = 0; i < DetailArrayAuthSign.length; i++) {
		var data = JSON.stringify(
			{
				"cr6fc_name": vTitle,
				"cr6fc_mrid": entityID,
				//"cr6fc_authorizedname": DetailArrayAuthSign[numOfAuthSign].txtName,
				"cr6fc_authorizedfirstname": DetailArrayAuthSign[numOfAuthSign].txtFirstName,
				"cr6fc_authorizedlastname": DetailArrayAuthSign[numOfAuthSign].txtLastName,
				"cr6fc_authorizeddesignation": DetailArrayAuthSign[numOfAuthSign].txtDesignation,
				"cr6fc_authorizedmobileno": DetailArrayAuthSign[numOfAuthSign].txtMobileNo,
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
		webapi.safeAjax({
			url: "/_api/cr6fc_registrationauthorizedsignrequestses",
			type: "POST",
			headers: header,
			async: false,
			data: data,
			success: function (data, textStatus, xhr) {
				console.log(xhr);
				AuthorizedsignentityID = xhr.getResponseHeader('entityid');
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
		//}
	}
	else {
		authSignDeferred.resolve(authSignResp);
	}
	return authSignDeferred.promise();
}

var delAuthDeferred = $.Deferred();
var delgAuthResp = [];
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
		webapi.safeAjax({
			url: "/_api/cr6fc_registrationdelgatedauthorequestses",
			type: "POST",
			headers: header,
			async: false,
			data: data,
			success: function (data, textStatus, xhr) {
				console.log(xhr);
				createDelegatedAuthoentityid = xhr.getResponseHeader('entityid');
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
				//delAuthDeferred.resolve(xhr);
			},
			error: function (e) {
				console.log(e);
				delAuthDeferred.reject(e);
			}
		});
		//}
	}else
	{
		delAuthDeferred.resolve(delgAuthResp);
	}
	return delAuthDeferred.promise();
}
var contactResp = [];
var registrationcontactentityid;
function createContact(token, vTitle, entityID, ContactColl, vItemID) {
	var deferred = $.Deferred();
	var contIntId = $('#hdnContactId').val()
	if (LoggContactColl.length > 0) {
		if (ContactColl.length > 0 && ContactColl[0].FirstName !=undefined) {
			for (var i = 0; i < ContactColl.length; i++) {
				var data = JSON.stringify(
					{
						"cr6fc_name": vTitle,
						"cr6fc_mrid": vItemID,
						"cr6fc_usertype": ContactColl[i].UserType,
						"cr6fc_useremail": ContactColl[i].Email,
						"cr6fc_userfirstname": ContactColl[i].FirstName,
						"cr6fc_userlastname": ContactColl[i].LastName,
						"cr6fc_usercontactno": ContactColl[i].Mobile,
						"cr6fc_userdesignation": ContactColl[i].Designation,
						"cr6fc_useraddress": ContactColl[i].Address,
						"cr6fc_addressprooftype": ContactColl[i].AddressProofType,
						"cr6fc_addressproofnumber": ContactColl[i].AddressProofNumber,
						"cr6fc_identityprooftype": ContactColl[i].IdentityProofType,
						"cr6fc_identityproofnumber": ContactColl[i].IdentityProofNumber,
					});
				var header = {
					__RequestVerificationToken: token,
					contentType: "application/json;odata=verbose",
					XRequestDigest: $("#__REQUESTDIGEST").val(),
					IFMATCH: "*",
					XHttpMethod: "PATCH"
				}
				webapi.safeAjax({
					url: "/_api/cr6fc_registrationcontacts(" + contIntId + ")",
					type: "PATCH",
					headers: header,
					async: false,
					data: data,
					success: function (data, textStatus, xhr) {
						console.log(xhr);
						registrationcontactentityid = xhr.getResponseHeader('entityid');
						if ((document.getElementById('fAddressProof').files.length == 0 && $('#anchAdminAddProof').text() != "") && (document.getElementById('fIdentityProof').files.length == 0 && $('#anchAdminIdProof').text() != "")) {
							deferred.resolve(xhr);
						}
						else {
							if (document.getElementById('fAddressProof').files.length > 0 && document.getElementById('fIdentityProof').files.length > 0) {
								uploadUserDocument(document.getElementById('fAddressProof').files[0], token, xhr.getResponseHeader("entityid"), "cr6fc_registrationcontacts", "cr6fc_addressproofdocument").done(function (addrProofDocResp) {
									uploadUserDocument(document.getElementById('fIdentityProof').files[0], token, xhr.getResponseHeader("entityid"), "cr6fc_registrationcontacts", "cr6fc_identityproofdocument").done(function (idenProofDocResp) {
										deferred.resolve(xhr);
									});
								});
							} else {
								if (document.getElementById('fAddressProof').files.length > 0) {
									uploadUserDocument(document.getElementById('fAddressProof').files[0], token, xhr.getResponseHeader("entityid"), "cr6fc_registrationcontacts", "cr6fc_addressproofdocument").done(function (addrProofDocResp) {
										deferred.resolve(xhr);
									});
								}
								if (document.getElementById('fIdentityProof').files.length > 0) {
									uploadUserDocument(document.getElementById('fIdentityProof').files[0], token, xhr.getResponseHeader("entityid"), "cr6fc_registrationcontacts", "cr6fc_identityproofdocument").done(function (idenProofDocResp) {
										deferred.resolve(xhr);
									});
								}
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
		else {
			deferred.resolve(contactResp);
		}
	}
	else {
		if (ContactColl.length > 0) {
			for (var i = 0; i < ContactColl.length; i++) {
				var data = JSON.stringify(
					{
						"cr6fc_name": vTitle,
						"cr6fc_mrid": entityID,
						"cr6fc_usertype": ContactColl[i].UserType,
						"cr6fc_useremail": ContactColl[i].Email,
						"cr6fc_userfirstname": ContactColl[i].FirstName,
						"cr6fc_userlastname": ContactColl[i].LastName,
						"cr6fc_usercontactno": ContactColl[i].Mobile,
						"cr6fc_userdesignation": ContactColl[i].Designation,
						"cr6fc_useraddress": ContactColl[i].Address,
						"cr6fc_addressprooftype": ContactColl[i].AddressProofType,
						"cr6fc_addressproofnumber": ContactColl[i].AddressProofNumber,
						"cr6fc_identityprooftype": ContactColl[i].IdentityProofType,
						"cr6fc_identityproofnumber": ContactColl[i].IdentityProofNumber,
					});
				var header = {
					__RequestVerificationToken: token,
					contentType: "application/json;odata=verbose",
					XRequestDigest: $("#__REQUESTDIGEST").val(),
					IFMATCH: "*",
					XHttpMethod: "POST"
				}
				webapi.safeAjax({
					url: "/_api/cr6fc_registrationcontacts",
					type: "POST",
					headers: header,
					async: false,
					data: data,
					success: function (data, textStatus, xhr) {
						console.log(xhr);
						registrationcontactentityid = xhr.getResponseHeader('entityid');
						if ((document.getElementById('fAddressProof').files.length == 0 && $('#anchAdminAddProof').text() != "") || (document.getElementById('fIdentityProof').files.length == 0 && $('#anchAdminIdProof').text() != "")) {
							deferred.resolve(xhr);
						}
						else {
							if (document.getElementById('fAddressProof').files.length > 0 && document.getElementById('fIdentityProof').files.length > 0) {
								uploadUserDocument(document.getElementById('fAddressProof').files[0], token, xhr.getResponseHeader("entityid"), "cr6fc_registrationcontacts", "cr6fc_addressproofdocument").done(function (addrProofDocResp) {
									uploadUserDocument(document.getElementById('fIdentityProof').files[0], token, xhr.getResponseHeader("entityid"), "cr6fc_registrationcontacts", "cr6fc_identityproofdocument").done(function (idenProofDocResp) {
										deferred.resolve(xhr);
									});
								});
							} else {
								if (document.getElementById('fAddressProof').files.length > 0) {
									uploadUserDocument(document.getElementById('fAddressProof').files[0], token, xhr.getResponseHeader("entityid"), "cr6fc_registrationcontacts", "cr6fc_addressproofdocument").done(function (addrProofDocResp) {
										deferred.resolve(xhr);
									});
								}
								if (document.getElementById('fIdentityProof').files.length > 0) {
									uploadUserDocument(document.getElementById('fIdentityProof').files[0], token, xhr.getResponseHeader("entityid"), "cr6fc_registrationcontacts", "cr6fc_identityproofdocument").done(function (idenProofDocResp) {
										deferred.resolve(xhr);
									});
								}
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
		else {
			deferred.resolve(contactResp);
		}
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
	webapi.safeAjax({
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
	webapi.safeAjax({
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
	webapi.safeAjax({
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
		webapi.safeAjax({
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
	if (fileCtrl.files[0].name.endsWith(".pdf") || fileCtrl.files[0].name.endsWith(".PDF")) {
		if (fileCtrl.files[0] != undefined) {
			eliFile.file = fileCtrl.files[0];
			eliFile.position = index;
			eliFile.columnName = columnName;
			eliFileColl.push(eliFile);
		}
	} else {
		alert("Please upload a PDF file only");
		document.getElementById(fileCtrl.name).value = '';
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

function uploadEliDocuments(token, entityID) {
	if (eliFileColl.length > 0) {
		uploadUserDocument(eliFileColl[numOfEliDocs].file, token, entityID, "cr6fc_makerregistrationrequests", eliFileColl[numOfEliDocs].columnName).done(function (eliDocResp) {
			eliDocResponse.push(eliDocResp);
			numOfEliDocs++;
			if (numOfEliDocs <= eliFileColl.length - 1) {
				uploadEliDocuments(token, entityID);
			} else {
				eliDocDeferred.resolve(eliDocResp);
			}
		}).fail(function (jqXHR, textStatus, errorThrown) {
			eliDocDeferred.reject(jqXHR);
		});
	} else {
		eliDocDeferred.resolve(eliDocResponse);
	}
	return eliDocDeferred.promise();
}

var OtherDocumentResp = [];
var otherdocumententityid;
const UploadotherDocument = (token, entityID) => {
	var deferred = $.Deferred();
	fileInput = $('#OtherDocument');
	otherfileArray = [];
	let index = 0;
	//var AttchLength=fileInput[0].files.length
	$("#attachFilesHolderOther input:file").each(function () {
		if ($(this)[0].files[0]) {
			otherfileArray.push($(this)[0].files[0]);
		}
	});

	AttchLength = otherfileArray.length;
	if (otherfileArray.length > 0) {
		for (let i = 0; i < otherfileArray.length; i++) {
			var data = JSON.stringify(
				{
					"cr6fc_name": entityID,

				});
			var header = {
				__RequestVerificationToken: token,
				contentType: "application/json;odata=verbose"
			}
			webapi.safeAjax({
				url: "/_api/cr6fc_registrationotherdocuments",
				type: "POST",
				headers: header,
				async: false,
				data: data,
				success: function (data, textStatus, xhr) {
					otherdocumententityid = xhr.getResponseHeader("entityid");
					console.log(xhr);
					if (otherfileArray.length > 0) {
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
	} else {
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


const cancel = () => {
	location.href = location.origin + '/registerdashboard/';
}
//----------------------------------------------------------------------------------------
function refreshCache(tableLogicalName, guid, columnName, redirect) {
	try {
		var n = Date.now();
		var timestamp = n.toString();
		// var guid = GetQueryStingValue()["id"];
		// var tableLogicalName = GetQueryStingValue()["tbl"];
		// var columnName = GetQueryStingValue()["col"];
		// var redirect = GetQueryStingValue()["red"];
		debugger;
		//alert(guid);
		if (guid) {
			webapi.safeAjax({
				type: "PUT",
				url: "/_api/" + tableLogicalName + "(" + guid + ")/" + columnName,
				contentType: "application/json",
				data: JSON.stringify({
					"value": timestamp
				}),
				success: function (res) {
					debugger;
					console.log(res);
					window.location.href = location.origin + "/" + redirect + "/";
				}
			});
		}
		else {
			window.location.href = location.origin + "/" + redirect + "/";
		}
	} catch (err) {
		alert(err.message);
	}
}
