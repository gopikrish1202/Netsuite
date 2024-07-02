// /**
//  * @NApiVersion 2.x
//  * @NScriptType UserEventScript
//  */
// define(['N/search', 'N/log', 'N/record'], function(search, log, record) {

//     function afterSubmit(context) {
//         log.debug("afterSubmit triggered");

//         var invoiceSearchObj = search.create({
//             type: "invoice",
//             filters: [
//                 ["type", "anyof", "CustInvc"],
//                 "AND",
//                 ["item", "anyof", "1740"]
//             ],
//             columns: [
//                 search.createColumn({ name: "entity", label: "Name" })
//             ]
//         });

//         var searchResultCount = invoiceSearchObj.runPaged().count;
// var names = invoiceSearchObj.run().getRange({
//             start: 0,
//             end: 5
//         });

//         invoiceSearchObj.run().each(function(result) {
//             var entityName = result.getText('entity');
            
//             log.debug('Collected entity names', names);
//             return true;
//         });

        

//         if (names.length) {
//             var rec_id = context.newRecord.id;
//             log.debug('rec_id', rec_id);

//             var rec = record.load({
//                 type: 'customrecord_parent_samp_rec_',  
//                 id: rec_id
            
//             });
        

//             for (var line = 0; line < names.length; line++){
               
//                log.debug("line")
//                 // rec.setSublistValue({
//                 //     sublistId:'recmachcustrecord_reference', 
//                 //     fieldId:'custrecord_cust_name_', 
//                 //     line: line,
//                 //     value: names[line]
//                 // });
                
//             }
//             rec.save();
            
//         }
//     }

//     return {
//         afterSubmit: afterSubmit
//     };
// });



/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define(['N/search', 'N/log', 'N/record'], function(search, log, record) {

    function afterSubmit(context) {
        log.debug("afterSubmit triggered");

        var invoiceSearchObj = search.create({
            type: "invoice",
            filters: [
                ["type", "anyof", "CustInvc"],
                "AND",
                ["item", "anyof", "1740"]
            ],
            columns: [
                search.createColumn({ name: "entity", label: "Name" })
            ]
        });

        var searchResultCount = invoiceSearchObj.runPaged().count;
var names = invoiceSearchObj.run().getRange({
            start: 0,
            end: 5
        });
        var rec_id = context.newRecord.id;
        var rec = record.load({
                            type: 'customrecord_parent_samp_rec_',  
                            id: rec_id
                        
                        });


            for (var i = 0; i < names.length; i++){
                invoiceSearchObj.run().each(function (result) {
                    var c_name=result.getText('entity')
                    rec.setSublistValue({
                        sublistId:'recmachcustrecord_reference', 
                        fieldId:'custrecord_cust_name_', 
                        line: i,
                        value:c_name
                    });
                })
                
                return true;
                
            }

            rec.save();
            
        }
    return {
        afterSubmit: afterSubmit
    };
});












