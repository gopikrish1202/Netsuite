/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget'], function(serverWidget) {

    function onRequest(context) {
        if (context.request.method === 'GET') {
            // Create a form
            var form = serverWidget.createForm({
                title: 'My Suitelet Form'
            });

            // Add fields, sublist, etc., to the form as needed
            form.addField({
                id: 'custpage_name',
                type: serverWidget.FieldType.TEXT,
                label: 'Name'
            });
            form.addField({
                id: 'custpage_date',
                type: serverWidget.FieldType.DATE,
                label: 'Date'
            });

            // Add a submit button to the form
            form.addSubmitButton({
                label: 'Submit',
        
            });
            
           
            

            // Display the form
            context.response.writePage(form);
        }
    }

    return {
        onRequest: onRequest
    };

});
