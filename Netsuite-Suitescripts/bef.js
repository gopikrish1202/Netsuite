/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record'], function (record) {

    function beforeLoad(context) {
        var currentRec = context.newRecord;
        log.debug('Script Start',currentRec);

    
            log.debug('123')
        
            currentRec.setValue({ fieldId: 'custbody_number_a', value: '5' });
            log.debug('Value of ccustbody_number_a');
            
    }


    return {
        beforeLoad: beforeLoad
    };
});
