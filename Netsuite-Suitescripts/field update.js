/**
 * @NApiVersion 2.x
 * @NScriptType ScheduledScript
 */
define(['N/record', 'N/search', 'N/log'], function(record, search, log) {
    function execute(context) {
        // Define the search to find customers where the custom field is empty
        var customerSearch = search.create({
            type: search.Type.CUSTOMER,
            filters: [
                ['custentity_preferred_contact_method', 'anyof', '@NONE@']
            ],
            columns: ['internalid']
        });

        // Get the results of the search
        var searchResults = customerSearch.run().getRange({
            start: 0,
            end: 1000
        });
 
        // Loop through the search results and update the custom field
        for (var i = 0; i < searchResults.length; i++) {
            var purchaseId = searchResults[i].getValue({ name: 'internalid' });

            // Load the customer record
            var customerRecord = record.load({
                type: record.Type.PURCHASE,
                id: purchaseId
            });

            // Update the custom field with the default value
            customerRecord.setValue({
                fieldId: 'custentity_preferred_contact_method',
                value: 'Email'
            });

            // Save the updated record
            customerRecord.save();

            log.audit({
                title: 'Customer Updated',
                details: 'Updated customer ID: ' + purchaseId
            });
        }
    }

    return {
        execute: execute
    };
});
