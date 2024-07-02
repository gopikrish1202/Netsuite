/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record'], function (record) {

    function afterSubmit(context){
    
    
    var poRecord = record.create({
    type: record.Type.PURCHASE_ORDER, 
    isDynamic: true
});

var vendor='VEN425 VIG123'

poRecord.setText({
    fieldId: 'entity',
    text: vendor
});

poRecord.setValue({
    fieldId: 'custbody_ctx_api_error',
    value: 1
});




var poId = poRecord.save();


log.debug('Purchase Order Created', 'Internal ID: ' + poId);

    }
    return {
        afterSubmit: afterSubmit
    }
})




