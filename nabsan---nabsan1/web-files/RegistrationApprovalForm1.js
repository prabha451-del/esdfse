var loggedInUserId = '';
var loggedInUserName = '';
var loggedInUserEmail = '';
$(document).ready(function () {
	loggedInUserId = $('#fpo-user-contact-id').val();
	loggedInUserName = $('#fpo-user-contact-name').val();
	loggedInUserEmail = $('#fpo-user-email').val();
	$('title').text('APPLICATION');
	vItemID = GetQueryStingValue()["Item"];
	// abc();
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
});

function GetQueryStingValue() {
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
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
	queryList = location.origin + "/_api/cr6fc_makerregistrationrequests?$select=cr6fc_makerregistrationrequestid,cr6fc_bankname,cr6fc_pannumber,cr6fc_pincode,cr6fc_userfirstname,cr6fc_userlastname,cr6fc_userdesignation,cr6fc_usermobilenumber,cr6fc_address,cr6fc_town,cr6fc_city,cr6fc_typeofbank,cr6fc_town,cr6fc_state,cr6fc_gstin,cr6fc_website,cr6fc_telephonenumber,cr6fc_requeststatus,cr6fc_otherdescription,cr6fc_requesterremark,cr6fc_bodresolutioncertificate,cr6fc_lipan,cr6fc_bussinesstransdelcertificate,cr6fc_liutilityaddressproof,cr6fc_originalundertaking,cr6fc_agriculturemou,cr6fc_certifiedgstin,cr6fc_nsmakerfiles,cr6fc_nscheckerfile,cr6fc_nsapprovalfile,cr6fc_recommendationofnsmaker,cr6fc_recommendationofnschecker,cr6fc_nscheckerremark,cr6fc_letterauthorityadministrator,cr6fc_nsmakerremark&$expand=cr6fc_TypeOfBank($select=cr6fc_banktypeid,cr6fc_name),cr6fc_State($select=cr6fc_statemasterid,cr6fc_name)&$filter=cr6fc_makerregistrationrequestid eq '" + vItemID + "'&$top=5000";
	$.ajax({
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
				if(MakerRegistrationColl[0].cr6fc_bankname!=null && MakerRegistrationColl[0].cr6fc_bankname!=undefined)
				{
					$('#txtBankName').text(MakerRegistrationColl[0].cr6fc_bankname);
				}
				/*if(MakerRegistrationColl[0].cr6fc_bankname!=null  && MakerRegistrationColl[0].cr6fc_registrationname!=undefined)
				{
					$('#txtRegistrationName').text(MakerRegistrationColl[0].cr6fc_registrationname);
				}*/
				/*if(MakerRegistrationColl[0].cr6fc_typeofbank!=null && MakerRegistrationColl[0].cr6fc_typeofbank!=undefined)
				{
					$('#txtTypeofBank').val(MakerRegistrationColl[0]['_cr6fc_typeofbank_value@OData.Community.Display.V1.FormattedValue']);
				}*/
				$('#txtTypeofBank').text(MakerRegistrationColl[0].cr6fc_TypeOfBank.cr6fc_name);

				if(MakerRegistrationColl[0].cr6fc_pannumber!=null && MakerRegistrationColl[0].cr6fc_pannumber!=undefined)
				{
					$('#txtPan').text(MakerRegistrationColl[0].cr6fc_pannumber);
				}
				if(MakerRegistrationColl[0].cr6fc_address!=null && MakerRegistrationColl[0].cr6fc_address!=undefined)
				{
					$('#txtAddress').text(MakerRegistrationColl[0].cr6fc_address);
				}
				if(MakerRegistrationColl[0].cr6fc_city!=null && MakerRegistrationColl[0].cr6fc_city!=undefined)
				{
					$('#txtCity').text(MakerRegistrationColl[0].cr6fc_city);
				}
				if(MakerRegistrationColl[0].cr6fc_pincode!=null && MakerRegistrationColl[0].cr6fc_pincode!=undefined)
				{
					$('#txtpincode').text(MakerRegistrationColl[0].cr6fc_pincode);
				}
				if(MakerRegistrationColl[0].cr6fc_town!=null && MakerRegistrationColl[0].cr6fc_town!=undefined)
				{
					$('#txtTown').text(MakerRegistrationColl[0].cr6fc_town);
				}
				if(MakerRegistrationColl[0].cr6fc_State.cr6fc_name!=null && MakerRegistrationColl[0].cr6fc_State.cr6fc_name!=undefined)
				{
					$('#ddlState').text(MakerRegistrationColl[0].cr6fc_State.cr6fc_name);
				}
				if(MakerRegistrationColl[0].cr6fc_gstin!=null && MakerRegistrationColl[0].cr6fc_gstin!=undefined)
				{
					$('#GSTINFPO').text(MakerRegistrationColl[0].cr6fc_gstin);
				}
				if(MakerRegistrationColl[0].cr6fc_website!=null && MakerRegistrationColl[0].cr6fc_website!=undefined)
				{
					$('#txtWebsite').text(MakerRegistrationColl[0].cr6fc_website);
				}
				if(MakerRegistrationColl[0].cr6fc_otherdescription!=null && MakerRegistrationColl[0].cr6fc_otherdescription!=undefined)
				{
					$('#DescriptionofDocument').text(MakerRegistrationColl[0].cr6fc_otherdescription);
				}
				/*if(MakerRegistrationColl[0].cr6fc_emailid!=null && MakerRegistrationColl[0].cr6fc_emailid!=undefined)
				{
					$('#txtEmailID').text(MakerRegistrationColl[0].cr6fc_emailid);
				}*/
				/*if(MakerRegistrationColl[0].cr6fc_contactno!=null && MakerRegistrationColl[0].cr6fc_contactno!=undefined)
				{
					$('#txtContactNo').text(MakerRegistrationColl[0].cr6fc_contactno);
				}*/
				if(MakerRegistrationColl[0].cr6fc_telephonenumber!=null && MakerRegistrationColl[0].cr6fc_telephonenumber!=undefined)
				{
					$('#txttelephnno').val(MakerRegistrationColl[0].cr6fc_telephonenumber);
				}
				if(MakerRegistrationColl[0].cr6fc_requeststatus!=null && MakerRegistrationColl[0].cr6fc_requeststatus!=undefined)
				{
					$('#hdnRequestStatus').val(MakerRegistrationColl[0].cr6fc_requeststatus);
				}
				if(MakerRegistrationColl[0].cr6fc_requesterremark!=null && MakerRegistrationColl[0].cr6fc_requesterremark!=undefined)
				{
					$("#commentrequester").show();
					$('#requesterComment').text(MakerRegistrationColl[0].cr6fc_requesterremark);
				}
				if (MakerRegistrationColl[0].cr6fc_bodresolutioncertificate_name != null) {
					$('#anchBodReslCert').attr("href", "/_api/cr6fc_makerregistrationrequests(" + vItemID + ")/cr6fc_bodresolutioncertificate/$value");
					$('#anchBodReslCert').text(MakerRegistrationColl[0].cr6fc_bodresolutioncertificate_name);
				}
				if (MakerRegistrationColl[0].cr6fc_lipan_name != null) {
					$('#anchPANLICert').attr("href", "/_api/cr6fc_makerregistrationrequests(" + vItemID + ")/cr6fc_lipan/$value");
					$('#anchPANLICert').text(MakerRegistrationColl[0].cr6fc_lipan_name);
				}
				if (MakerRegistrationColl[0].cr6fc_bussinesstransdelcertificate_name != null) {
					$('#anchDelTranBussCert').attr("href", "/_api/cr6fc_makerregistrationrequests(" + vItemID + ")/cr6fc_bussinesstransdelcertificate/$value");
					$('#anchDelTranBussCert').text(MakerRegistrationColl[0].cr6fc_bussinesstransdelcertificate_name);
				}
				if (MakerRegistrationColl[0].cr6fc_liutilityaddressproof_name != null) {
					$('#anchAddProofUtility').attr("href", "/_api/cr6fc_makerregistrationrequests(" + vItemID + ")/cr6fc_liutilityaddressproof/$value");
					$('#anchAddProofUtility').text(MakerRegistrationColl[0].cr6fc_liutilityaddressproof_name);
				}
				if (MakerRegistrationColl[0].cr6fc_originalundertaking_name != null) {
					$('#anchOrgUndertaking').attr("href", "/_api/cr6fc_makerregistrationrequests(" + vItemID + ")/cr6fc_originalundertaking/$value");
					$('#anchOrgUndertaking').text(MakerRegistrationColl[0].cr6fc_originalundertaking_name);
				}
				if (MakerRegistrationColl[0].cr6fc_agriculturemou_name != null) {
					$('#anchMOU').attr("href", "/_api/cr6fc_makerregistrationrequests(" + vItemID + ")/cr6fc_agriculturemou/$value");
					$('#anchMOU').text(MakerRegistrationColl[0].cr6fc_agriculturemou_name);
				}
				if (MakerRegistrationColl[0].cr6fc_certifiedgstin_name != null) {
					$('#anchCertGSTIN').attr("href", "/_api/cr6fc_makerregistrationrequests(" + vItemID + ")/cr6fc_certifiedgstin/$value");
					$('#anchCertGSTIN').text(MakerRegistrationColl[0].cr6fc_certifiedgstin_name);
				}
				if (MakerRegistrationColl[0].cr6fc_nsmakerfiles_name != null) {
					$("#NsMakerAttached").show();
					$('#NSMakerAttach').attr("href", "/_api/cr6fc_makerregistrationrequests(" + vItemID + ")/cr6fc_nsmakerfiles/$value");
					$('#NSMakerAttach').text(MakerRegistrationColl[0].cr6fc_nsmakerfiles_name);
				}
				if (MakerRegistrationColl[0].cr6fc_nscheckerfile_name != null) {
					$("#NsCheckerAttached").show();
					$('#NScheckerAttach').attr("href", "/_api/cr6fc_makerregistrationrequests(" + vItemID + ")/cr6fc_nscheckerfile/$value");
					$('#NScheckerAttach').text(MakerRegistrationColl[0].cr6fc_nscheckerfile_name);
				}
				if (MakerRegistrationColl[0].cr6fc_nsapprovalfile_name != null) {
					$("#NsApprovalAttached").show();
					$('#NSApprovalAttach').attr("href", "/_api/cr6fc_makerregistrationrequests(" + vItemID + ")/cr6fc_nsapprovalfile/$value");
					$('#NSApprovalAttach').text(MakerRegistrationColl[0].cr6fc_nsapprovalfile_name);
				}
				if(MakerRegistrationColl[0].cr6fc_requeststatus=="3"){
					$("#divhide").show();
					$("#divshow").hide();
				}
				else{
					$("#divshow").show();
					$("#divhide").hide();	}
				if(MakerRegistrationColl[0].cr6fc_recommendationofnsmaker!=null||MakerRegistrationColl[0].cr6fc_recommendationofnsmaker!=undefined)
					{
                       $("#recommendationNSma").show();
					   $("#recommendationofNSmaker").text(MakerRegistrationColl[0].cr6fc_recommendationofnsmaker)

					}
				if(MakerRegistrationColl[0].cr6fc_recommendationofnschecker!=null||MakerRegistrationColl[0].cr6fc_recommendationofnschecker!=undefined)
					{
                       $("#recommendationNSchecker").show();
					   $("#recommendationofNSChecker").text(MakerRegistrationColl[0].cr6fc_recommendationofnschecker)

					}
					if(MakerRegistrationColl[0].cr6fc_nscheckerremark!=null||MakerRegistrationColl[0].cr6fc_nscheckerremark!=undefined)
					{
                       $("#NSCheckercomment").show();
					   $("#NsCheckerRemark").text(MakerRegistrationColl[0].cr6fc_nscheckerremark)

					}	
					if(MakerRegistrationColl[0].cr6fc_nsmakerremark!=null||MakerRegistrationColl[0].cr6fc_nsmakerremark!=undefined)
					{
                       $("#NsMakerRemark").show();
					   $("#RemarkNsMaker").text(MakerRegistrationColl[0].cr6fc_nsmakerremark)

					}
					if (MakerRegistrationColl[0].cr6fc_letterauthorityadministrator != null) {
						$('#viewletterAuthority').attr("href", "/_api/cr6fc_makerregistrationrequests(" + vItemID + ")/cr6fc_letterauthorityadministrator/$value");
						$('#viewletterAuthority').text(MakerRegistrationColl[0].cr6fc_letterauthorityadministrator_name);
					}
					$("#userfirstname").text(MakerRegistrationColl[0].cr6fc_userfirstname);
					$("#userlastname").text(MakerRegistrationColl[0].cr6fc_userlastname);
					$("#userDesignation").text(MakerRegistrationColl[0].cr6fc_userdesignation);
					$("#userMobilenumber").text(MakerRegistrationColl[0].cr6fc_usermobilenumber);
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
const otherdocuments = (vItemID) =>{
	var queryList = "";
	queryList = location.origin + "/_api/cr6fc_registrationotherdocuments?$select=*&$filter=cr6fc_name eq '" + vItemID + "'&$top=5000";
	$.ajax({
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

       /* var deleteIcon = $("<i>")
            .addClass("fa fa-times")
            .attr("style", "color: #ed0202; margin: 0 5px 0; cursor: pointer;")
            .on("click", function () {
                DeleteAttachment('/_api/cr6fc_registrationotherdocuments(' + attachment.cr6fc_registrationotherdocumentid + ')/cr6fc_otherdocuments', attachment.cr6fc_registrationotherdocumentid, 'viewotherDocuments');
            });*/

        viewOtherDocumentsContainer.append(attachmentLink);
       // viewOtherDocumentsContainer.append(deleteIcon);
        
        viewOtherDocumentsContainer.append("<br>");
    }
}


		},
		error: function () {
			console.log("error");
		}
	});
}
function getAuthorizedSign(vItemID) {
	var queryList = "";
	queryList = location.origin + "/_api/cr6fc_registrationauthorizedsignrequestses?$select=cr6fc_mrid,cr6fc_authorizedfirstname,cr6fc_authorizedlastname,cr6fc_authorizeddesignation,cr6fc_authorizedmobileno,cr6fc_authorizedaddress,cr6fc_addressprooftype,cr6fc_addressproofdocument,cr6fc_identityproofdocument,cr6fc_identityprooftype&$filter=cr6fc_mrid eq " + vItemID + "&$top=5000";
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
					for (var i = 0; i < Loggs.length; i++) {
						var cr6fc_identityproofnumberfprmatted='';
						var cr6fc_identityproofnumber=Loggs[i].cr6fc_identityproofnumber;
						
						/*if(cr6fc_identityproofnumber!=null && cr6fc_identityproofnumber!=undefined)
						{
							cr6fc_identityproofnumberfprmatted = cr6fc_identityproofnumber.replace(/\d/g, "X") + cr6fc_identityproofnumber.substr(cr6fc_identityproofnumber.length-4, 4);
						}*/
						vHTML += "<tr style='line-height: 16px;color: black;'>" +
							"<td style='text-align:center'>" + Loggs[i].cr6fc_authorizedfirstname + "</td>" +
							"<td style='text-align:center'>" + Loggs[i].cr6fc_authorizedlastname + "</td>" +
							"<td style='text-align:center'>" + Loggs[i].cr6fc_authorizeddesignation + "</td>" +
							"<td style='text-align:center'>" + Loggs[i].cr6fc_authorizedmobileno + "</td>" +
							"<td style='text-align:center'>" + Loggs[i].cr6fc_authorizedaddress + "</td>" +
							"<td style='text-align:center'>" + Loggs[i]["cr6fc_addressprooftype@OData.Community.Display.V1.FormattedValue"] + "</td>" +
							//"<td style='text-align:center'>" + Loggs[i].cr6fc_addressproofnumber + "</td>" +
							"<td style='text-align:center'><a href='/_api/cr6fc_registrationauthorizedsignrequestsid(" + Loggs[i].cr6fc_registrationauthorizedsignrequestsid + ")/cr6fc_addressproofdocument/$value' id='anchAuthSignAddProof" + i + "' target='_blank'>" + Loggs[i].cr6fc_addressproofdocument_name + "</a></td>" +
							"<td style='text-align:center'>" + Loggs[i]["cr6fc_identityprooftype@OData.Community.Display.V1.FormattedValue"] + "</td>" +
							//"<td style='text-align:center'>" + cr6fc_identityproofnumberfprmatted + "</td>" +
							"<td style='text-align:center'><a href='/_api/cr6fc_registrationauthorizedsignrequestsid(" + Loggs[i].cr6fc_registrationauthorizedsignrequestsid + ")/cr6fc_Identityproofdocument/$value' id='anchAuthSignIdentityProof" + i + "' target='_blank'>" + Loggs[i].cr6fc_identityproofdocument_name + "</a></td>" +
							"</tr>";
					}
					if (vHTML != "") {
						$('#tblDataMain').DataTable().clear();
						//$('#tblDataMain').DataTable().destroy();
						document.getElementById("tbodyRequestor").innerHTML = vHTML;
						$('#tblDataMain').DataTable(/*{
							"order": [[0, 'asc']],
							paging: true,
							"bInfo": false,
							"bFilter": true
						}*/);
					}
					else {
						vHTML = "<tr><td colspan='4'><font face='Calibri' size='2'>No Authorized Sign Record</font></td></tr>";
						document.getElementById("tbodyRequestor").innerHTML = vHTML;
						$('#tblDataMain').DataTable();
					}
				}
				else {
					vHTML = "<tr><td colspan='4'><font face='Calibri' size='2'>No Authorized Sign Record</font></td></tr>";
					document.getElementById("tbodyRequestor").innerHTML = vHTML;
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

function getDelegateAutho(vItemID) {
	var queryList = "";
	queryList = location.origin + "/_api/cr6fc_registrationdelgatedauthorequestses?$select=cr6fc_delegatedfirstname,cr6fc_delegatedlastname,cr6fc_delegateddesignation,cr6fc_delegatedmobileno,cr6fc_delegatedaddress,cr6fc_addressprooftype,cr6fc_addressproofdocument,cr6fc_identityproofdocument,cr6fc_identityprooftype&$filter=cr6fc_mrid eq " + vItemID + "&$top=5000";
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
					for (var i = 0; i < Loggs.length; i++) {
						var cr6fc_identityproofnumberfprmatted='';
						var cr6fc_identityproofnumber=Loggs[i].cr6fc_identityproofnumber;
						
						/*if(cr6fc_identityproofnumber!=null && cr6fc_identityproofnumber!=undefined)
						{
							cr6fc_identityproofnumberfprmatted = cr6fc_identityproofnumber.replace(/\d/g, "X") + cr6fc_identityproofnumber.substr(cr6fc_identityproofnumber.length-4, 4);
						}*/
						vHTML += "<tr style='line-height: 16px;color: black;'>" +
							//"<td style='text-align:center'>" + Loggs[i].cr6fc_delegatedname + "</td>" +
							"<td style='text-align:center'>" + Loggs[i].cr6fc_delegatedfirstname + "</td>" +
							"<td style='text-align:center'>" + Loggs[i].cr6fc_delegatedlastname + "</td>" +
							"<td style='text-align:center'>" + Loggs[i].cr6fc_delegateddesignation + "</td>" +
							"<td style='text-align:center'>" + Loggs[i].cr6fc_delegatedmobileno + "</td>" +
							"<td style='text-align:center'>" + Loggs[i].cr6fc_delegatedaddress + "</td>" +
							"<td style='text-align:center'>" + Loggs[i]["cr6fc_addressprooftype@OData.Community.Display.V1.FormattedValue"] + "</td>" +
							//"<td style='text-align:center'>" + Loggs[i].cr6fc_addressproofnumber + "</td>" +
							"<td style='text-align:center'><a href='/_api/cr6fc_registrationdelgatedauthorequestses(" + Loggs[i].cr6fc_registrationdelgatedauthorequestsid + ")/cr6fc_addressproofdocument/$value' id='anchDelAuthAddProof" + i + "' target='_blank'>" + Loggs[i].cr6fc_addressproofdocument_name + "</a></td>" +
							"<td style='text-align:center'>" + Loggs[i]["cr6fc_identityprooftype@OData.Community.Display.V1.FormattedValue"] + "</td>" +
							//"<td style='text-align:center'>" + cr6fc_identityproofnumberfprmatted + "</td>" +
							"<td style='text-align:center'><a href='/_api/cr6fc_registrationdelgatedauthorequestses(" + Loggs[i].cr6fc_registrationdelgatedauthorequestsid + ")/cr6fc_identityproofdocument/$value' id='anchDelAuthIdentityProof" + i + "' target='_blank'>" + Loggs[i].cr6fc_identityproofdocument_name + "</a></td>" +
							"</tr>";
					}
					if (vHTML != "") {
						$('#tblDataDelegated').DataTable().clear();
						//$('#tblDataDelegated').DataTable().destroy();
						document.getElementById("tbodyRequestorDelegated").innerHTML = vHTML;
						$('#tblDataDelegated').DataTable(/*{
							"order": [[0, 'asc']],
							paging: true,
							"bInfo": false,
							"bFilter": true
						}*/);
					}
					else {
						vHTML = "<tr><td colspan='4'><font face='Calibri' size='2'>No Authorized Sign Record</font></td></tr>";
						document.getElementById("tbodyRequestorDelegated").innerHTML = vHTML;
						$('#tblDataDelegated').DataTable();
					}
				}
				else {
					vHTML = "<tr><td colspan='4'><font face='Calibri' size='2'>No Authorized Sign Record</font></td></tr>";
					document.getElementById("tbodyRequestorDelegated").innerHTML = vHTML;
					$('#tblDataDelegated').DataTable();
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
var LoggContactColl = [];
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

						var cr6fc_identityproofnumberfprmatted='';
						var cr6fc_identityproofnumber=LoggContactColl[i].cr6fc_identityproofnumber;
						
						if(cr6fc_identityproofnumber!=null && cr6fc_identityproofnumber!=undefined)
						{
							cr6fc_identityproofnumberfprmatted = cr6fc_identityproofnumber.replace(/\d/g, "X") + cr6fc_identityproofnumber.substr(cr6fc_identityproofnumber.length-4, 4);
						}
						//if (LoggContactColl[i].cr6fc_usertype == 3) {
						$('#txtFirstNameAdministrator').text(LoggContactColl[i].cr6fc_userfirstname != null ? LoggContactColl[i].cr6fc_userfirstname :'');
						$('#txtLastNameAdministrator').text(LoggContactColl[i].cr6fc_userlastname != null ? LoggContactColl[i].cr6fc_userlastname :'');
						$('#txtDesignationAdministrator').text(LoggContactColl[i].cr6fc_userdesignation != null ? LoggContactColl[i].cr6fc_userdesignation :'');
						$('#txtMobileNoAdministrator').text(LoggContactColl[i].cr6fc_usercontactno!=null ? LoggContactColl[i].cr6fc_usercontactno :'');
						$('#txtEmailIdAdministrator').text(LoggContactColl[i].cr6fc_useremail!=null ? LoggContactColl[i].cr6fc_useremail:'');
						$('#txtAddressAdministrator').text(LoggContactColl[i].cr6fc_useraddress != null ? LoggContactColl[i].cr6fc_useraddress : '');
						$('#lblAddressProofType').text(LoggContactColl[i]["cr6fc_addressprooftype@OData.Community.Display.V1.FormattedValue"] != null ? LoggContactColl[i]["cr6fc_addressprooftype@OData.Community.Display.V1.FormattedValue"]:'');
						$('#lblAddressProofNumber').text(LoggContactColl[i].cr6fc_addressproofnumber != null ? LoggContactColl[i].cr6fc_addressproofnumber:'');
						$('#lblIdentityProofType').text(LoggContactColl[i]["cr6fc_identityprooftype@OData.Community.Display.V1.FormattedValue"] ? LoggContactColl[i]["cr6fc_identityprooftype@OData.Community.Display.V1.FormattedValue"] :'');
						
						$('#lblIdentityProofNumber').text(cr6fc_identityproofnumberfprmatted);
						if (LoggContactColl[i].cr6fc_addressproofdocument_name != null) {
							$('#anchAdminAddProof').attr("href", "/_api/cr6fc_registrationcontacts(" + LoggContactColl[i].cr6fc_registrationcontactid + ")/cr6fc_addressproofdocument/$value");
							$('#anchAdminAddProof').text(LoggContactColl[i].cr6fc_addressproofdocument_name);
						}
						if (LoggContactColl[i].cr6fc_identityproofdocument_name != null) {
							$('#anchAdminIdProof').attr("href", "/_api/cr6fc_registrationcontacts(" + LoggContactColl[i].cr6fc_registrationcontactid + ")/cr6fc_identityproofdocument/$value");
							$('#anchAdminIdProof').text(LoggContactColl[i].cr6fc_identityproofdocument_name);
						}
						//}
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

var vTitle;
var ELIChecker;
var hdnRequestStatus ;
var columnname ;
var requestStatus = '';
var successId;
function SubmitData(status,Recommend) {
	var txtmakerComment = $('#txtmakerComment').val();
	if (txtmakerComment == "" || txtmakerComment == undefined) {
		alert('Please enter Remark')
		return false;
	}
	 hdnRequestStatus = $('#hdnRequestStatus').val();

	$('#btnSave').prop('disabled', true);
	$('#btn1').prop('disabled', true);
	$('#btnSentBack').prop('disabled', true);
	if (hdnRequestStatus == "1") {
		var data = JSON.stringify(
			{
				"cr6fc_requeststatus": "2",
				"cr6fc_recommendationofnsmaker":Recommend,
				"cr6fc_nsmakerremark": txtmakerComment

			});

	}
	else if (hdnRequestStatus == "2") {
		var data = JSON.stringify(
			{
				"cr6fc_requeststatus": "3",
				"cr6fc_recommendationofnschecker":Recommend,
				"cr6fc_nscheckerremark": txtmakerComment

			});
	}
	else if (hdnRequestStatus == "3") {
		if(status == "Submitted"){
			requestStatus = '4';
		}
		else if(status == "Rejected"){
			requestStatus = '7';
		}
		var data = JSON.stringify(
			{
				"cr6fc_requeststatus": requestStatus,
				"cr6fc_nsapproverremark": txtmakerComment

			});
	}

	shell.getTokenDeferred().done(function (token) {
		console.log(token)
		var header = {
			__RequestVerificationToken: token,
			contentType: "application/json;odata=verbose"
		}
		$.ajax({
			url: "/_api/cr6fc_makerregistrationrequests(" + vItemID + ")",
			type: "PATCH",
			contentType: "application/json;odata=verbose",
			async: false,
			data: data,
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
				// if(hdnRequestStatus=="3")
				// {
				// 	createMainContact(token,vItemID, LoggContactColl);
				// }
				if (document.getElementById('fBodReslCert').files.length > 0 ) {
					if (hdnRequestStatus == "1"){getFileContentsAndMetadataForNsMaker(token,successId,"cr6fc_nsmakerfiles");}
				if (hdnRequestStatus == "2"){getFileContentsAndMetadataForNsMaker(token,successId,"cr6fc_nscheckerfile");}
				if (hdnRequestStatus == "3"){getFileContentsAndMetadataForNsMaker(token,successId,"cr6fc_nsapprovalfile");}
				}
				if (Recommend == "Recommend for Sendback"){alert('Request Has Been Recommended For SendBack')};
				if(Recommend=="Recommend for Approval"){alert('Request Has Been Recommended For Approval')};
				if(Recommend=="Recommend for Rejection"){alert('Request Has Been Recommended for Rejection')};
				if (requestStatus == '4'){alert('ELI has been successfully registered');}
				if(requestStatus == '7'){alert('Request Has Been Rejected')}
				if (document.getElementById('fBodReslCert').files.length <= 0 ) {
				// window.location.href = location.origin + "/NSMakerRegistrationDashboard/";
				window.location.href = location.origin+"/refreshingcache/?id="+successId+"&tbl=cr6fc_makerregistrationrequests&col=cr6fc_cacherefreshedon&red=nsmakerregistrationdashboard";
				}
			},
			error: function (error) {
				console.log(error);
				//alert('Some error occured. Please try again later.');
				alert('Some error occured while adding data in CGApplications list. Please try again later.');
				console.log(error);
			}
		})
	})
	//}
}

function SentBack(status) {
	var txtmakerComment = $('#txtmakerComment').val();
	if (txtmakerComment == "" || txtmakerComment == undefined) {
		alert('Please enter Remark')
		return false;
	}
	var hdnRequestStatus = $('#hdnRequestStatus').val();

	$('#btnSave').prop('disabled', true);
	$('#btn1').prop('disabled', true);
	$('#btnSentBack').prop('disabled', true);
	if (hdnRequestStatus == "1") {
		var data = JSON.stringify(
			{
				"cr6fc_requeststatus": status,
				"cr6fc_nsmakerremark": txtmakerComment

			});
	}
	else if (hdnRequestStatus == "2") {
		var data = JSON.stringify(
			{
				"cr6fc_requeststatus": status,
				"cr6fc_nscheckerremark": txtmakerComment

			});
	}
	else if (hdnRequestStatus == "3") {
		var data = JSON.stringify(
			{
				"cr6fc_requeststatus": status,
				"cr6fc_nsapproverremark": txtmakerComment

			});
	}

	shell.getTokenDeferred().done(function (token) {
		console.log(token)
		var header = {
			__RequestVerificationToken: token,
			contentType: "application/json;odata=verbose"
		}
		$.ajax({
			url: "/_api/cr6fc_makerregistrationrequests(" + vItemID + ")",
			type: "PATCH",
			contentType: "application/json;odata=verbose",
			async: false,
			data: data,
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
				// if(hdnRequestStatus=="3")
				// {
				// 	createMainContact(token,vItemID, LoggContactColl);
				// }

				alert('Request has been Send Back');
				window.location.href = location.origin+"/refreshingcache/?id="+successId+"&tbl=cr6fc_makerregistrationrequests&col=cr6fc_cacherefreshedon&red=nsmakerregistrationdashboard";

				// window.location.href = location.origin + "/NSMakerRegistrationDashboard/";
			},
			error: function (error) {
				console.log(error);
				//alert('Some error occured. Please try again later.');
				alert('Some error occured while adding data in CGApplications list. Please try again later.');
				console.log(error);
			}
		})
	})
	//}
}

function convertToHash(str) {
	if (str == "") return 0;
	let hashString = 0;
	for (let character of str) {
		let charCode = character.charCodeAt(0);
		hashString = hashString << 5 - hashString;
		hashString += charCode;
		hashString |= hashString;
	}
	//output.innerHTML += "The original string is " + str + "<br/>";
	//output.innerHTML += "The hash string related to original string is " + hashString + "<br/>";
	return hashString;
}

function generateSecurityStamp() {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let stamp = '';
	for (let i = 0; i < 16; i++) {
		const randomIndex = Math.floor(Math.random() * chars.length);
		stamp += chars.charAt(randomIndex);
	}
	return stamp;
}

function createMainContact(token, entityID, ContactColl) {
	debugger;
	if (ContactColl.length > 0) {
		for (var i = 0; i < ContactColl.length; i++) {
			var usertype;
			//var passwordtxt=convertToHash("Next2068");
			var passwordtxt = CryptoJS.AES.encrypt(ContactColl[i].cr6fc_useremail, 'Next2068').toString();
			//var passwordtxt = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

			// Generate a random security stamp
			var securityStamp = generateSecurityStamp();
			//console.log("The hash string is " + encryptedText);
			if (ContactColl[i].cr6fc_usertype == 3) {
				usertype = "5";
			}
			else if (ContactColl[i].cr6fc_usertype == 4) {
				usertype = "6";
			}
			else {
				usertype = ContactColl[i].cr6fc_usertype;
			}
			var data = JSON.stringify(
				{
					"fullname": ContactColl[i].cr6fc_username,
					"cr6fc_mrid": entityID,
					"cr6fc_usertype": usertype,
					"emailaddress1": ContactColl[i].cr6fc_useremail,
					"adx_identity_username": ContactColl[i].cr6fc_useremail,
					"lastname": ContactColl[i].cr6fc_username,
					"mobilephone": ContactColl[i].cr6fc_usercontactno,
					"cr6fc_designation": ContactColl[i].cr6fc_userdesignation,
					"address1_composite": ContactColl[i].cr6fc_useraddress,
					"adx_identity_lockoutenabled": true,
					"adx_identity_logonenabled": true,
					"adx_identity_passwordhash": passwordtxt,
					"adx_identity_securitystamp": securityStamp
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
				success: function (success) {
					console.log(success)
				},
				error: function (e) {
					console.log(e)

				}
			});
		}
	}
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
//----------------------------------------------------------------------------
function getFileContentsAndMetadataForNsMaker(token,CGFileID,ColumnName) {
    // Get the name of the selected file
    var fileName = encodeURIComponent(document.getElementById('fBodReslCert').files[0].name);
    // Get the content of the selected file
    var file = document.getElementById('fBodReslCert').files[0];
    // If the user has selected a file
    if (file) {
        // Read the file as a byte array
        var reader = new FileReader();
        reader.readAsArrayBuffer(file);
        // The browser has finished reading the file, we can now do something with it...
        reader.onload = function(e) {
            // The browser has finished reading the file, we can now do something with it...
            var fileContent = e.target.result;
            // Run the function to upload to the Portal Web API, passing the GUID of the newly created record and the file's contents and name as inputs
            uploadFileNSMaker(fileContent,fileName,CGFileID,ColumnName,token,file.type,file);
        };
    }
}
 
// Upload the file to
function uploadFileNSMaker(fileContent,fileName,CGFileID,ColumnName,token,Filecontenttype) {
	
	// var data1 = JSON.stringify({
	// 	cr6fc_registrationname: fileName
	// 	//"value":2

	// });
	var header={
		__RequestVerificationToken:token,
        Accept: 'application/json;odata=verbose',
		XRequestDigest: $("#__REQUESTDIGEST").val(),
		// IFMATCH: "*",
		// XHttpMethod: "PUT"
	}
$.ajax({
	url: "/_api/cr6fc_makerregistrationrequests(" + CGFileID + ")/"+ColumnName+"?x-ms-file-name=" + fileName,
	type: "PUT",
	async: false,
	contentType: "application/octet-stream",
	processData: false,
	// data: fileContent,
	data: fileContent,
	headers: header,
	success: function (data, textStatus, xhr) {
	//	window.location.href=location.origin+"/SOEDetails/?Item="+SOECOLLID+"&Page="+Page;			                 
	//window.location.href = location.origin + "/NSMakerRegistrationDashboard/";
	window.location.href = location.origin+"/refreshingcache/?id="+successId+"&tbl=cr6fc_makerregistrationrequests&col=cr6fc_cacherefreshedon&red=nsmakerregistrationdashboard";
	},
	error: function (xhr, textStatus, errorThrown) {
		console.log(errorThrown)
	}
});
}
//--------------------------------------------------

const cancel =()=>{
	location.href = location.origin+'/nsmakerregistrationdashboard/';
}