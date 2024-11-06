$(document).ready(function () {


});


function Savedata(){
    //var Email = $("#inputEmail").val();
    var Password = $("#inputPassword4").val();
    var Address= $("#inputAddress").val();
    var Address2 = $("#inputAddress2").val();
    var City= $("#inputCity").val();
    
    var State = $('select#inputState option:selected').val();

    var Zip=  $("#inputZip").val();
    
    var data = JSON.stringify(
        {
                "__metadata": { "type": "SP.Data.prlistListItem" },
         	 //     "cr6fc_email":Email,
        	        "cr6fc_password": Password,
                	"cr6fc_address": Address,
                	"cr6fc_address2" : Address2,
         		"cr6fc_city": City,
                     	"cr6fc_state": State,
        		"cr6fc_zip":Zip,
        }); 

        var header = {
                __RequestVerificationToken: token,
                contentType: "application/json;odata=verbose"
        }

        ajax({
                url: "/_api/cr6fc_newformprs",
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











    
//      var data1 = JSON.stringify({  
// 	   /* "__metadata": { "type": "SP.Data.prlistListItem" },*/
// 	  //  "cr6fc_email":Email,
// 	    "cr6fc_password": Password,
// 		"cr6fc_address": Address,
// 		"cr6fc_address2" : Address2,
// 		"cr6fc_city": City,
//      	"cr6fc_state": State,
// 		"cr6fc_zip":Zip

	     
	    
// 	    });

// 		shell.getTokenDeferred().done(function (token) {
// 			console.log(token)
// 			var header = {
// 				__RequestVerificationToken: token,
// 				contentType: "application/json;odata=verbose"
// 			}
// 			$.ajax({
// 				url: "/_api/cr6fc_newformprs",
// 				type: "POST",
// 				headers: header,
// 				async: false,
// 				data: data,
// 				//success: function (success) {
// 				success: function (data, textStatus, xhr) {
// 					successId = xhr.getResponseHeader("entityid");
// 					console.log(successId);
					//successId = success.Id;
					//console.log(successId);
				//uploadEliDocuments(token, successId).done(function (eliDocRes) {
					//	createAuthorizedSign(token, vTitle, successId).done(function (authSignResp) {
					//		createDelegatedAutho(token, vTitle, successId).done(function (delgAuthResp) {
					//			createContact(token, vTitle, successId, ContactColl).done(function (contactResp) {
					//				UpdateCounter(token).done(function (counterResp) {
								//		alert('Application for ELI registration has been successfully submitted.')
					//					window.location.href = location.origin + "/RegisterDashboard/";
								
				//});
								//});
						//}
					//);
					//	});
					//});
				// },
				// error: function (error) {
				// 	console.log(error);
				// 	alert('Some error occured while adding data in ELI Maker Registration list. Please try again later.');
				// 	console.log(error);
				// }
		//	})
		//})
	
	

               
		
// 		$.ajax({
// 			url: "/_api/contacts",
// 			type: "POST",
// 			headers: header,
// 			async: false,
// 			data: data,
// 			success: function (data, textStatus, xhr) {
// 				console.log(xhr);
// 				numOfELIMkChk++;
// 				if (numOfELIMkChk <= eliMkrChkrColl.length - 1) {
// 					createContact(token);
// 				} else {
// 					numOfELIMkChk = 0;
// 					contactDeferred.resolve(xhr);
// 				}
// 				//contactDeferred.resolve(xhr);
// 			},
// 			error: function (e) {
// 				console.log(e);
// 				numOfELIMkChk = 0;
// 				contactDeferred.reject(e);
// 			}
// 		});
// 		//}
// 	}
// 	return contactDeferred.promise();
// }

	
	