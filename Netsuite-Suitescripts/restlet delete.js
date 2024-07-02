/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 */
define(['N/record'], function(record) {
    function createCustomer(data) {
        try {
            var customerRecord = record.create({
                type: record.Type.CUSTOMER,
                isDynamic: true
            });
            
            customerRecord.setValue({
                fieldId: 'companyname',
                value: data.companyname
            });
            
            customerRecord.setValue({
                fieldId: 'email',
                value: data.email
            });
            
            customerRecord.setValue({
                fieldId: 'phone',
                value: data.phone
            });
            
            var customerId = customerRecord.save();
            return { success: true, customerId: customerId };
            
        } catch (e) {
            return { success: false, message: e.message };
        }
    }

    return {
        post: createCustomer
    };
});
