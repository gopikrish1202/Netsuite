/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 */
define(['N/record', 'N/log'], function(record, log) {

    /**
     * Deletes a record based on the provided record ID and record type.
     * @param {Object} requestBody - The request body containing the record ID and type to delete
     * @returns {Object} - Confirmation message upon successful deletion
     * @throws {Error} - Throws an error if deletion fails
     */
    function post(requestBody) {
        try {
            log.debug('Received request body', JSON.stringify(requestBody));

            var recordId = requestBody.id;
            var recordType = requestBody.recordType;

            log.debug('Record ID to delete', recordId);
            log.debug('Record type', recordType);

            if (!recordId || !recordType) {
                throw new Error('Missing required arguments: id or recordType');
            }

            // Delete the record
            var deletionResult = record.delete({
                type: recordType,
                id: recordId
            });

            log.debug('Deletion Result', JSON.stringify(deletionResult));

            return { message: 'Record deleted successfully' };
        } catch (e) {
            log.error({
                title: 'Error deleting record',
                details: e
            });
            throw e;
        }
    }

    return {
        post: post
    };
});
