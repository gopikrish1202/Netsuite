/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record','N/log'], function (record,log) {

    function afterSubmit(context) {
        log.debug('Script Start');



      if(context.type == 'edit' || context.type == 'create'){
        
       var id  = context.newRecord.id
        log.debug('id',id)
        var invoice = record.load({
            type: 'invoice',
            id: id
        });

        var location = invoice.getValue({ fieldId: 'location' });
        log.debug('customer',location)
        var cust_list=record.load({type: 'location',  id: location })
        log.debug('list',cust_list)
        var email=cust_list.getText({fieldId: 'locationtype'})
        log.debug('loca',email)
        invoice.setValue({fieldId: 'custbody_address', value: email})
        log.debug('set successfully',email)
        invoice.save();
       
    }
    }

    return {
        afterSubmit: afterSubmit
    };
});

