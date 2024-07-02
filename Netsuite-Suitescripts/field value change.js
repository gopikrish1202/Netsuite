/**
 * @NApiVersion 2.x
 * @NScriptType ScheduledScript
 */
define(['N/record', 'N/search', 'N/log'], function(record, search, log) {
    function execute(context) {
        log.audit('Scheduled Script', 'Script execution started');
        
        // Define the custom record type ID
        var customRecordType = '2019'; // Replace with your custom record type ID

        log.audit('id',customRecordType);
        
        // Create a search to get all records of the custom record type
        var customRecordSearch = search.create({
            type: customRecordType,
            filters: [],
            columns: ['customrecord2019']
        });

        // Get the results of the search
        var searchResults = customRecordSearch.run().getRange({
            start: 0,
            end: 1000
        });

        log.audit('Scheduled Script', 'Search returned ' + searchResults.length + ' results');

        // Loop through the search results and update the custom field
        for (var i = 0; i < searchResults.length; i++) { 
            var recordId = searchResults[i].getValue({ name: '2019' });

            log.audit('Scheduled Script', 'Processing record ID: ' + recordId);

            // Load the custom record
            var customRecord = record.load({
                type: customRecordType,
                id: recordId
            });

            // Update the custom field with a new value
            customRecord.setValue({
                fieldId: 'custrecord1968', // Replace with your custom field ID
                value: 1000 // Replace with the new value you want to set
            });

            // Save the updated record
            customRecord.save();

            log.audit('Scheduled Script', 'Updated record ID: ' + recordId);
        }
        
        log.audit('Scheduled Script', 'Script execution completed');
    }

    return {
        execute: execute
    };
});
