/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/log'], function(record, log) {

    function beforeLoad(context) {
        var currentRec=context.newRecord;
        log.debug('Script Start');

        if (context.type === 'create' || context.type === 'edit') {
            
                currentRec.setValue({ fieldId: 'custbody_memo_1_', value: 5 });
                var fieldValue = currentRec.getValue({ fieldId: 'custbody_memo_1_' });
                log.debug('Value of custbody_memo_1_', fieldValue);   
        }
    }

    return {
        beforeLoad: beforeLoad
    };
});
