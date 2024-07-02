/**
 * @NApiVersion 2.x
 * @NScriptType ScheduledScript
 */
define(['N/record', 'N/log', 'N/search'], function(record, log, search) {
    function execute(context) {
        try {
            // Create a new custom record
            var customRecord = record.create({
                type: 'customrecord2019', 
                isDynamic: true
            });

            // Array of names
            const names = ['adam', 'amar', 'gopi', 'james', 'howard', 'Volvo', 'BMW', 'Ford', 'Tata'];
            
            // Get a random index for the names array
            var randomIndex = Math.floor(Math.random() * names.length);

            // Set the 'name' field value using the randomly selected name from the array
            customRecord.setValue({
                fieldId: 'name',
                value: names[randomIndex]
            });
            
            var val = Math.round(Math.random() * 1000);

            customRecord.setValue({
                fieldId: 'custrecord1968',
                value: val
            });

            var recordId = customRecord.save();

            log.debug('Record Created', 'ID: ' + recordId);

            var customRecordSearch = search.create({
                type: 'customrecord2019',
                columns: ['name']  // Explicitly add the 'name' field as a search column
            });

            var resultSet = customRecordSearch.run();

            // Store all names in an array
            var namesArray = [];

            // Loop through the search results
            resultSet.each(function(result) {
                var name = result.getValue({
                    name: 'name'
                });

                // Add the name to the array
                if (name) {
                    namesArray.push(name);
                } else {
                    log.debug('Name not found for record', result.id);
                }

                // Continue processing other search results
                return true;
            });

            // Log the names array correctly
            log.debug('Names Array', namesArray);

        } catch (e) {
            log.error('Error creating record', e.message);
        }
    }

    return {
        execute: execute
    };
});
