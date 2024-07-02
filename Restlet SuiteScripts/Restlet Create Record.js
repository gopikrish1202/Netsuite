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
    function post(requestBody) {
        log.debug('Post triggered', JSON.stringify(requestBody));

        try {
            var objRecord = record.create({
                type: requestBody.recordType
            });

            objRecord.setValue({
                fieldId: 'companyname',
                value: requestBody.companyname
            });

            // Set subsidiary field with a single value
            var subsidiary = requestBody.subsidiary; // Assuming requestBody.subsidiary is a single subsidiary ID
            log.debug('Setting subsidiary', subsidiary);
            objRecord.setValue({
                fieldId: 'subsidiary',
                value: subsidiary
            });

            var comments=requestBody.comments;
            objRecord.setValue({
                fieldId: 'comments',
                value: comments
            })

            var creditlimit=requestBody.creditlimit;
            objRecord.setValue({
                fieldId: 'creditlimit',
                value:creditlimit
            })

           

            var id = objRecord.save();
            log.debug('Record saved', id);

            return JSON.stringify({id: id, message: "created successfully"});
        } catch (e) {
            log.error({
                title: 'Error creating record',
                details: e
            });
            throw e;
        }
    }

    return {
        post: post
    };
});
