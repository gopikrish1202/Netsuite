/**
 * @NApiVersion 2.x
 * @NScriptType ScheduledScript
 */
define(['N/file', 'N/log'], function(file, log) {

    function execute(context) {
        try {
            // Load the file from the File Cabinet
            var jsonFile = file.load({
                id: '16836' // Replace with actual path or internal ID
            });

            // Read the file contents as a string
            var jsonString = jsonFile.getContents();

            // Parse the JSON string back to a JavaScript object
            var dataObject = JSON.parse(jsonString);

            // Log the decoded JavaScript object
            log.debug('Decoded JavaScript Object', dataObject);

        } catch (e) {
            log.error('Error reading file', e.name + ': ' + e.message);
        }
    }

    return {
        execute: execute
    };
});
