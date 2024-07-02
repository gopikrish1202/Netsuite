/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/log'], function (record, log) {

    function beforeLoad(context) {
        // if (context.type !== context.UserEventType.CREATE)
        //     return;
      
        // var currentRec = context.newRecord;
        
        var current=currentRec.getValue("custbody_arab_amount1");
        // var rec_load=currentRec.load(current);
        // var save=rec_load.save();
        log.debug("test",current);
        
        

        if(current=null){
            currentRec.setValue({
            fieldId: "custbody_arab_amount1",
            value: 2
        });
    }
    }
    return {
        beforeLoad: beforeLoad
    }
});






/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/log'], function(record, log) {

    function beforeLoad(context) {
        try {
            var id='120011';
            var recordId = context.newRecord.id;
            var recordType = context.newRecord.PURCHASE_ORDER;

            // Check if recordId is not null or undefined (to avoid errors)
            if (recordId) {
                // Load the record explicitly
                var loadedRecord = record.load({
                    type: recordType,
                    id: recordId
                });

                // Example: Get a value from the loaded record
                var someFieldValue = loadedRecord.getValue({
                    fieldId: 'memo'
                });

                // Set another field value based on the fetched information
                context.newRecord.setValue({
                    fieldId: 'custbody10006',
                    value: someFieldValue
                });

                // Log the information for debugging
                log.debug({
                    title: 'Loaded Record Information',
                    details: 'Record Type: ' + recordType + ', Record ID: ' + recordId + ', Some Field Value: ' + someFieldValue
                });
            }
        } catch (e) {
            log.error({
                title: 'Error in beforeLoad',
                details: e.toString()
            });
        }
    }

    return {
        beforeLoad: beforeLoad
    };
});



