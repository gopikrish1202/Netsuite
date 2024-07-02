/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record','N/log','N/ui/dialog'], function (record,log,dialog) {

    function afterSubmit(context) {
        log.debug('Script Start');
        var purchaseOrder = record.load({
            type: record.Type.PURCHASE_ORDER,
            id: '120011'
        });


        
        var memo = purchaseOrder.getValue({ fieldId: 'memo' });
        var vendor = purchaseOrder.getValue({ fieldId: 'tranid' });

        log.debug("After Submit Values", { memo: memo, vendor: vendor  });

        dialog.alert({
            title: "After Submit Values",
            message: "="+ { memo: memo, vendor: vendor }
        });
       
    }

    return {
        afterSubmit: afterSubmit
    };
});




//  if (context.type === context.UserEventType.CREATE || context.type === context.UserEventType.EDIT) {