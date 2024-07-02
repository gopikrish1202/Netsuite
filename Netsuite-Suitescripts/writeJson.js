/**
 * @NApiVersion 2.x
 * @NScriptType ScheduledScript
 */
define(['N/file', 'N/log'], function(file, log) {

    function execute(context) {
        try {
            // Define the data to be stored in JSON format
            var dataToStore = {
                name: 'Gopi',
                age: '20',
                isStudent: false,
                favorites: ["apple", "banana", "cherry"],
                address: {
                    city: 'chennai',
                    postalCode: '600123'
                },
                nullValue: null
            };

            // Convert JavaScript object to JSON string
            var jsonString = JSON.stringify(dataToStore, null, 2);

            // Create a file in the NetSuite File Cabinet
            var jsonFile = file.create({
                name: 'data2.json',                  
                fileType: file.Type.JSON,           
                contents: jsonString,               
                folder: -15                         
            });

            // Save the file and get the file ID
            var fileId = jsonFile.save();
            log.debug('Data encoded and saved to file ID:', fileId);   
        } 

        catch (e) {
            log.error('Error writing file', e);
        }
    }

    return {
        execute: execute
    };
});
