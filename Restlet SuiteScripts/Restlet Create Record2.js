// /**
//  * @NApiVersion 2.x
//  * @NScriptType Restlet
//  */
// define(['N/record', 'N/log'], function(record, log) {
//     function post(requestBody) {
//         log.debug("Post triggered", JSON.stringify(requestBody));
  
//         var objRecord = record.create({
//             type: requestBody.recordType
//         });
  
//         // Set main line fields
//         var mainLineFields = requestBody.mainLineFields;
//         for (var i = 0; i < mainLineFields.length; i++) {
//             objRecord.setValue({
//                 fieldId: mainLineFields[i].fieldId,
//                 value: mainLineFields[i].value
//             });
//         }
  
//         // Handle sublist data
//         var sublistData = requestBody.sublistData;
//         for (var j = 0; j < sublistData.length; j++) {
//             var sublist = sublistData[j];
//             var sublistId = sublist.sublistId;
//             var sublistItems = sublist.sublistItems;
  
//             // Add sublist items
//             for (var k = 0; k < sublistItems.length; k++) {
//                 var sublistItem = sublistItems[k];
//                 for (var fieldId in sublistItem) {
//                     objRecord.setSublistValue({
//                         sublistId: sublistId,
//                         fieldId: fieldId,
//                         line: k,
//                         value: sublistItem[fieldId]
//                     });
//                 }
//             }
//           }
  
//         var savedId = objRecord.save();
//         return {
//             success: true,
//             recordId: savedId
//         };
//     }
  
//     return {
//         post: 
//     };
//   });

/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 */
define(['N/record'], function(record) {
    function post(requestBody) {
        try {
            var objRecord = record.create({
                type: requestBody.recordType
            });

            // Set main line fields
            var mainLineFields = requestBody.mainLineFields;
            for (var i = 0; i < mainLineFields.length; i++) {
                objRecord.setValue({
                    fieldId: mainLineFields[i].fieldId,
                    value: mainLineFields[i].value
                });
            }

            // Handle sublist data
            var sublistData = requestBody.sublistData;
            for (var j = 0; j < sublistData.length; j++) {
                var sublist = sublistData[j];
                var sublistId = sublist.sublistId;
                var sublistItems = sublist.sublistItems;
                // Add sublist items
                for (var k = 0; k < sublistItems.length; k++) {
                    var sublistItem = sublistItems[k];
                    for (var fieldId in sublistItem) {
                        objRecord.setSublistValue({
                            sublistId: sublistId,
                            fieldId: fieldId,
                            line: k,
                            value: sublistItem[fieldId]
                        });
                    }
                }
            }

            // Save the record
            var savedId = objRecord.save();
            return {
                success: true,
                recordId: savedId
            };
        } catch (e) {
            return {
                success: false,
                error: e
            };
        }
    }

    return {
        post: post
    };
});




//JSON input

/** 
{
    "recordType": "purchaseorder",
    "mainLineFields": [
      {"fieldId": "tranid", "value": "PO123"},
      {"fieldId": "entity", "value": "38"}
    ],
    "sublistData": [
      {
        "sublistId": "item",
        "sublistItems": [
          {"item": "1358", "quantity": "2"}
        ]
      }
    ]
  }
*/