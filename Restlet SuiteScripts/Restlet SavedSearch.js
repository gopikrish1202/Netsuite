
/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 */
define(['N/search', 'N/log'], function(search, log) {
    function doGet(params) {
      
        var internalId = parseInt(params.internalId);
       
        log.debug('Parsed internalId:', internalId);

        // Define and create the saved search
        var customSearch = search.create({
            type: search.Type.CUSTOMER,
            filters: [
                ['internalid', 'is', internalId] // 'is' operator for exact match
            ],
            columns: ['companyname', 'email','internalId']
        });

        // Execute the saved search
        var searchResults = [];
        customSearch.run().each(function(result) {
            searchResults.push({
                internalId: result.id,
                companyName: result.getValue('companyname'),
                email: result.getValue('email')
            });
            return true; // Continue processing results
        });

        log.debug('search results array',searchResults)

        return JSON.stringify(searchResults);
    }

    return {
        get: doGet
    };
});
