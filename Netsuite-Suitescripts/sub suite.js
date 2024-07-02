/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget', 'N/log'], function(serverWidget, log) {

    function onRequest(context) {
        if (context.request.method === 'GET') {
            // Create the form
            var form = serverWidget.createForm({
                title: 'My Suitelet Form'
            });

        form.addField({
            id:'cust_name',
            type:serverWidget.FieldType.TEXT,
            label: 'Company Name'
        })

        form.addField({
            id:'cust_date',
            type:serverWidget.FieldType.DATE,
            label: 'Order Date'
        })

            // Add a sublist to the form
            var sublist = form.addSublist({
                id: 'custpage_sublist',
                type: serverWidget.SublistType.INLINEEDITOR,
                label: 'Items'
            });

            // Add fields to the sublist
            var itemField = sublist.addField({
                id: 'custpage_item',
                type: serverWidget.FieldType.TEXT,
                label: 'Item'
            });

            var quantityField = sublist.addField({
                id: 'custpage_quantity',
                type: serverWidget.FieldType.FLOAT,
                label: 'Quantity'
            });
            
            // Sample data to be added to the sublist
            var items = [
                { item: 'Item A', quantity: 10.0 },
                { item: 'Item B', quantity: 20.5 },
                { item: 'Item C', quantity: 15.0 },
                { item: 'Item D', quantity: 5.25 }
            ];

            // Array to hold sublist line data
            var sublistData = [];

            // Build sublist data array
            for (var i = 0; i < items.length; i++) {
                sublistData.push({
                    custpage_item: items[i].item,
                    custpage_quantity: items[i].quantity
                });
            }

            // Add sublist data to the sublist
            for (var j = 0; j < sublistData.length; j++) {
                sublist.setSublistValue({
                    id: 'custpage_item',
                    line: j,
                    value: sublistData[j].custpage_item
                });

                sublist.setSublistValue({
                    id: 'custpage_quantity',
                    line: j,
                    value: sublistData[j].custpage_quantity
                });
            }

            // Add a submit button to the form
            form.addSubmitButton({
                label: 'Submit'
            });

            // Display the form
            context.response.writePage(form);

        } else {
            // Process the submitted form
            var request = context.request;
            var item = request.parameters.custpage_item;
            var quantity = request.parameters.custpage_quantity;

            // Log the field values
            log.debug('Item', item);
            log.debug('Quantity', quantity);

            // Respond with a success message
            context.response.write('<html><body><script>alert("Form submitted successfully. Item: ' + item + ', Quantity: ' + quantity + '");</script></body></html>');

        }
    }

    return {
        onRequest: onRequest
    };

});
