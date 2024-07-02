/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
define([], function() {

    function pageInit(context) {
        // Add initialization code here if needed
    }

    function saveRecord(context) {
        // Fetch field values from the form
        var name = context.currentRecord.getValue({
            fieldId: 'custpage_name'
        });

        var date = context.currentRecord.getValue({
            fieldId: 'custpage_date'
        });

        // Display fetched values in an alert
        var message = 'Name: ' + name + '\nDate: ' + date;
        alert(message);

        // Return true to continue saving the record
        return true;
    }

    return {
        pageInit: pageInit,
        saveRecord: saveRecord
    };
});
