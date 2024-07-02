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

        
        var location = invoice.getText({ fieldId: 'location' });
        log.debug('customer',location)

        // var loc_type=invoice.getText({fieldId: 'locationtype'})
        // log.debug('loca',loc_type)

        var linecnt = invoice.getLineCount({ sublistId: 'item'})

        for( var line = 0;line < linecnt; line++){
            var set=invoice.setSublistValue({
            sublistId: 'item', fieldId: 'custbody_result_gopi', value: location, line:line
        })
    }
    invoice.save();
    }
       
}
    return {
        afterSubmit: afterSubmit
    };
});



