/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 */
define(['N/record'], function(record) {

    // Function to handle GET requests
    function getCustomer(data) {
        try {
            var customer = record.load({
                type: record.Type.CUSTOMER,
                id: data.id
            });
            return {
                success: true,
                customer: customer
            };
        } catch (e) {
            return {
                success: false,
                message: e.message
            };
        }
    }

    // Function to handle POST requests
    function createCustomer(data) {
        try {
            var customerRecord = record.create({
                type: record.Type.CUSTOMER,
                isDynamic: true
            });
            customerRecord.setValue('companyname', data.companyname);
            customerRecord.setValue('email', data.email);
            customerRecord.setValue('phone', data.phone);
            var customerId = customerRecord.save();
            return {
                success: true,
                customerId: customerId
            };
        } catch (e) {
            return {
                success: false,
                message: e.message
            };
        }
    }

    // Function to handle PUT requests
    function updateCustomer(data) {
        try {
            var customerRecord = record.load({
                type: record.Type.CUSTOMER,
                id: data.id,
                isDynamic: true
            });
            if (data.companyname) customerRecord.setValue('companyname', data.companyname);
            if (data.email) customerRecord.setValue('email', data.email);
            if (data.phone) customerRecord.setValue('phone', data.phone);
            var customerId = customerRecord.save();
            return {
                success: true,
                customerId: customerId
            };
        } catch (e) {
            return {
                success: false,
                message: e.message
            };
        }
    }

    // Function to handle DELETE requests
    function deleteCustomer(data) {
        try {
            record.delete({
                type: record.Type.CUSTOMER,
                id: data.id
            });
            return {
                success: true,
                message: 'Customer deleted successfully'
            };
        } catch (e) {
            return {
                success: false,
                message: e.message
            };
        }
    }

    // Return the mapping of HTTP methods to functions
    return {
        get: getCustomer,   
        post: createCustomer, 
        put: updateCustomer,  
        delete: deleteCustomer 
    };
});
