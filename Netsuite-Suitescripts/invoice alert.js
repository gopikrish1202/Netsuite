/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
define(['N/ui/dialog'], function(dialog) {

    function validateLine(context) {
        var currRec = context.currentRecord;
        var sublistId = context.sublistId;

        if (sublistId === 'item') {

            var currentIndex = currRec.getCurrentSublistIndex({
                sublistId: 'item'
            });
            
            var currentItem = currRec.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'item'
            });
            var currentQuantity = currRec.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'quantity'
            });
            var currentRate = currRec.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'rate'
            });

            var lineCount = currRec.getLineCount({ sublistId: 'item' });



            for (var i = 0; i < lineCount; i++) {

                if (i !== currentIndex) {
                var item = currRec.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'item',
                    line: i
                });

                var quantity = currRec.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    line: i
                });

                var rate = currRec.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'rate',
                    line: i
                });

                if (currentItem === item && currentQuantity === quantity && currentRate === rate) {
                    dialog.alert({
                        title: 'Duplicate Line Values',
                        message: 'Item, Quantity, and Unit Price must not repeat in another line.'
                    });
                   
                    return false; // Prevent the line from being added or edited
                }
            }
            }


        }

        return true; // Allow the line to be added or edited
    }

    return {
        validateLine: validateLine
    };
});



