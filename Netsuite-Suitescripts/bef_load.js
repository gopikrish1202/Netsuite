/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/log'], function (log) {

  function beforeLoad(context) {
    
      var currentRec = context.currentRecord;

     
      currentRec.setValue({
          fieldId: 'custbody10028',
          value: 'hey' // You can set this to any value you need
      });

      // Log the updated value
      log.debug("Set Amount 1");
  }

  return {
      beforeLoad: beforeLoad
  };
});