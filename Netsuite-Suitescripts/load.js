/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
define(['N/record', 'N/log'], function(record, log) {
    function pageInit(context) {
        
            log.debug('Script Start');
            var purchaseOrder = record.load({
                type: record.Type.PURCHASE_ORDER,
                id: '120011'
            });
          log.debug('Loaded Purchase Order', purchaseOrder);
      var val=purchaseOrder.getValue({fieldId: 'memo'});
      log.debug('Loaded memo no:', val);
    }

  
  
    return {
        pageInit: pageInit
    };
});
