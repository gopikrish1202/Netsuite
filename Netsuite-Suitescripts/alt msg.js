/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
define(['N/ui/dialog', 'N/currentRecord'], function(dialog, currentRecord) {

    function pageInit(context) {
      
        var currRecord = context.currentRecord;

   
        if (currRecord) {
         
            var check = currRecord.getValue({
                fieldId: 'custrecord_chk'
            });

            log.debug('check value', check);

            if (check === true) {
                log.debug('values same');
                dialog.alert({
                    title: 'Confirmation',
                    message: 'All records are the same'
                });
            }
        } else {
            log.error('Current record is undefined');
        }
    }

    return {
        pageInit: pageInit
    };
});
