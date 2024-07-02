/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
define(['N/search', 'N/ui/dialog', 'N/currentRecord'], function(search, dialog, currentRecord) {

    function pageInit(context) {
        var currRecord = currentRecord.get();

        // Get current field values
        var quantity = currRecord.getValue({
            fieldId: 'custrecord_quant'
        });
        var item = currRecord.getValue({
            fieldId: 'custrecord_item1'
        });
        var rate = currRecord.getValue({
            fieldId: 'custrecord_rate'
        });

        // Check if all three values are the same
        if (quantity === item && item === rate) {
            // Define filters for your Saved Search
            var filters = [
                ['custrecord_quant', 'is', quantity],
                'AND',
                ['custrecord_item1', 'is', item],
                'AND',
                ['custrecord_rate', 'is', rate]
            ];

            // Create the Saved Search
            var savedSearch = search.create({
                type: 'customrecord_acc', 
                filters: filters
            });

            // Run the Saved Search and process results
            savedSearch.run().each(function(result) {
                // Display alert if all values are the same
                dialog.alert({
                    title: 'Alert',
                    message: 'All the values are the same'
                });
               currRecord.setValue({
            fieldId: 'custrecord_quant',
            value:'',
                 ignoreFieldChange: true
        });
        currRecord.setValue({
            fieldId: 'custrecord_item1',
            value:'',
          ignoreFieldChange: true
        });
        currRecord.setValue({
            fieldId: 'custrecord_rate',
            value:'',
          ignoreFieldChange: true
        });
               
                // Stop processing further results after displaying the alert
                return false;
            });
        }
    }

    return {
        pageInit: pageInit
    };
});
