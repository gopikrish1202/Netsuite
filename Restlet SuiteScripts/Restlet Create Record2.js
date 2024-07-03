/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 */
define(['N/record', 'N/log'], function(record, log) {
    /**
    * @param {Object} requestBody
    * @returns {string | Object}
    * @since 2015.2
    */
   function post(requestBody){
    log.debug("Post triggered",JSON.stringify(requestBody))
   

  var objRecord=record.create({
    type: requestBody.recordType
  })
  var fieldId=requestBody.fieldId;
  var values=requestBody.values;

  for(var i=0;i<values.length;i++){
    objRecord.setValue({
        fieldId: fieldId[i],
        value: values[i]
      })
  }
  var savedId = objRecord.save();
  return log.debug(JSON.stringify("Record created successfully with id",savedId))
}

 
   return{
    post: post
    
   }

})