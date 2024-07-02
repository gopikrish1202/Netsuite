// /**
//  * @NApiVersion 2.1
//  * @NScriptType UserEventScript
//  */
// define(['N/record'], function (record) {

//     function afterSubmit(context) {
        
//         var currentRec = context.newRecord;
//         var get_location = currentRec.getValue({ fieldId: 'custbody_location' });
//         var get_vendor = currentRec.getValue({ fieldId: 'entity' });
//         var linecnt = currentRec.getLineCount({ sublistId: 'item' });

//         for (var line = 0; line < linecnt; line++) {
//             var get_item = currentRec.getSublistValue({ sublistId: 'item', fieldId: 'item', line: line });
//             var get_quantity = currentRec.getSublistValue({ sublistId: 'item', fieldId: 'quantity', line: line });
           
//             var poRecord = record.create({
//                 type: 'purchaseorder'
//             });

//             poRecord.setValue({ fieldId: 'custbody_location', value: get_location });
//             log.debug('set location',get_location)

//             poRecord.setValue({ fieldId: 'entity', value: get_vendor });
//             log.debug(get_vendor)

//             poRecord.setSublistValue({ sublistId: 'item', fieldId: 'item', line: line, value: get_item });
//             log.debug(get_item)

//             poRecord.setSublistValue({ sublistId: 'item', fieldId: 'quantity', line: line, value: get_quantity });
//             log.debug(get_quantity)

//             var poRecordId = poRecord.save();
//             log.debug('record saved successfully')
//         }
//     }

//     return {
//         afterSubmit: afterSubmit
//     };
// });

/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record'], function (record) {

    function afterSubmit(context) {
        
        var currentRec = context.newRecord;
        var get_location = currentRec.getValue({ fieldId: 'custbody_location' });
        var get_vendor = currentRec.getValue({ fieldId: 'entity' });
        var linecnt = currentRec.getLineCount({ sublistId: 'item' });
        
        var lineItems = [];

        // Collect line items into an array
        for (var line = 0; line < linecnt; line++) {
            var itemObj = {};
            itemObj.item = currentRec.getSublistValue({ sublistId: 'item', fieldId: 'item', line: line });
            itemObj.quantity = currentRec.getSublistValue({ sublistId: 'item', fieldId: 'quantity', line: line });
            lineItems.push(itemObj);
        }

        // Create and save purchase orders from the array
        lineItems.forEach(function(lineItem) {
            var poRecord = record.create({
                type: 'purchaseorder'
            });

            poRecord.setValue({ fieldId: 'custbody_location', value: get_location });
            log.debug('set location',get_location)

            poRecord.setValue({ fieldId: 'entity', value: get_vendor });
            log.debug(get_vendor)

            poRecord.setSublistValue({ sublistId: 'item', fieldId: 'item', line: line, value: lineItem.item });
            log.debug(lineItem.item)

            poRecord.setSublistValue({ sublistId: 'item', fieldId: 'quantity', line: line, value: lineItem.quantity });
            log.debug(lineItem.quantity)

            var poRecordId = poRecord.save();
            log.debug('record saved successfully')
        });
    }

    return {
        afterSubmit: afterSubmit
    };
});
