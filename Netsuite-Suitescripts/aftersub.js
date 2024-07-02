/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record','N/log','N/ui/dialog'], function (record,log,dialog) {

    function afterSubmit(context) {
        log.debug('Script Start');



      if(context.type == 'edit' || context.type == 'create'){
        
       var id  = context.newRecord.id
        log.debug('id',id)
        var purchaseOrder = record.load({
            type: 'purchaseorder',
            id: id
        });


        
        
        var memo = purchaseOrder.getValue({ fieldId: 'memo' });
        log.debug('memo',memo)
        var vendor = purchaseOrder.setValue({fieldId:'custbody_vatno', value: memo});
        log.debug('vendor',vendor)

       // log.debug("After Submit Values", { memo: memo, vendor: vendor  });

       
       purchaseOrder.save()
       
    }
    }

    return {
        afterSubmit: afterSubmit
    };
});




//  if (context.type === context.UserEventType.CREATE || context.type === context.UserEventType.EDIT) {