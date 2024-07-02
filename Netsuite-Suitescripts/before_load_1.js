/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record'], function (record) {

    function beforeLoad(context) {
        var currentRec = context.newRecord;
        log.debug('Script Start');

        if ( context.type !='create') {
            log.debug('123')
            var fieldValue = currentRec.setValue({ fieldId: 'custbody2_2', value: '5' });
            log.debug('Value of custbody2_2:', fieldValue);
            
    }
}

    return {
        beforeLoad: beforeLoad
    };
});
