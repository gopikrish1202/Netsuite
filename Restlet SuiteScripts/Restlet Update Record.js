/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 */
define(['N/record', 'N/log'], function(record, log) {
    function update(requestBody) {
        try {
            var recordId = requestBody.id;
            var recordType = requestBody.recordType;
            var values = requestBody.values;

            log.debug('Updating record', { recordId: recordId, recordType: recordType, values: values });

            var updatedRecordId = record.submitFields({
                type: recordType,
                id: recordId,
                values: values,
                options: {
                    enableSourcing: false,
                    ignoreMandatoryFields: true
                }
            });

            return JSON.stringify({ message: 'Record updated successfully', id: updatedRecordId });
        } catch (e) {
            log.error({
                title: 'Error updating record',
                details: e
            });
            throw e;
        }
    }

  
});
