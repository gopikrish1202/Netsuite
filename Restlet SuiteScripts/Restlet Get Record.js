/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */

define(['N/record'], function(record) {

    /**
     * Function to handle GET requests (Read operation)
     * @param {Object} params - The parameters from the request URL
     * @returns {Object} - Returns an object with ID and Vendor Name
     */
    function doGet(params) {
        // Example: Load and return details from a Purchase Order
        var customer = record.load({
            type: record.Type.CUSTOMER,
            id: params.id// Replace with the internal ID of the Purchase Order you want to load
        });

        // Construct response object with required fields
        var response = {
            id: customer.id,
            email: customer.getValue('email'),
            companyname: customer.getValue('companyname')
        };

        return JSON.stringify(response)
    }

    // Expose the function to be called for GET requests
    return {
        get: doGet
    };

});
