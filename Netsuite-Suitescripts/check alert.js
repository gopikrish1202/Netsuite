/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/log'], function(record, log) {

    function afterSubmit(context) {
        var newRecord = context.newRecord;

        var quantity = newRecord.getValue({ fieldId: 'custrecord_quant' });
        var item = newRecord.getValue({ fieldId: 'custrecord_item1' });
        var rate = newRecord.getValue({ fieldId: 'custrecord_rate' });

        log.debug('Quantity:', quantity);
        log.debug('Item:', item);
        log.debug('Rate:', rate);

        if (quantity == item && item == rate) {
            try {
                record.submitFields({
                    type: newRecord.type,
                    id: newRecord.id,
                    values: {
                        'custrecord_chk': true // Use the correct fieldId and set value to true
                    }
                });

                // Reload the record to get the updated value of custrecord_chk
                newRecord = record.load({
                    type: newRecord.type,
                    id: newRecord.id,
                    isDynamic: false
                });

                log.debug('Value of custrecord_chk after submitFields:', newRecord.getValue({ fieldId: 'custrecord_chk' }));
            } catch (e) {
                log.error('Error updating record:', e.message);
            }
        }
    }

    return {
        afterSubmit: afterSubmit
    };
});
