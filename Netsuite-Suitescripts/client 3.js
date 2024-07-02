/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */

define(['N/url', 'N/currentRecord'], function (url, currentRecord) {

    function pageInit(context) {

        var rec = currentRecord.get();
        var id = rec.getValue('id');
        
        var suiteletUrl = url.resolveScript({
            scriptId: 'customscript_suite3fin_',
            deploymentId: 'customdeploy_suite3fin_',
            returnExternalUrl: false,
            params: { 'id': id }
        });
        
        
        log.debug("suiteletUrl", suiteletUrl);
        window.open(suiteletUrl, '_blank');
    }

    return {
        pageInit: pageInit
    };
});
