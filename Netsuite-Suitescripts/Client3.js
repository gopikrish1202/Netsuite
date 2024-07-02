/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
define(['N/url', 'N/currentRecord', 'N/log'], function(url, currentRecord, log) {

    function pageInit(context) {
        // Initialize or handle page initialization if needed
    }

    function openSuitelet() {
        try {
            var currentRec = currentRecord.get();
            var id = currentRec.id; // Assuming 'id' is the fieldId for record internal ID

            var scriptId = 'customscript_suite4_'; // Replace with your Suitelet script ID
            var deploymentId = 'customdeploy_suite4_'; // Replace with your Suitelet deployment ID

            var suiteletUrl = url.resolveScript({
                scriptId: scriptId,
                deploymentId: deploymentId,
                params: { 'id': id }
            });

            var fullUrl = 'https://tstdrv2133943.app.netsuite.com' + suiteletUrl;
            log.debug("Resolved Suitelet URL", fullUrl);

            window.open(fullUrl, '_blank');
        } catch (e) {
            console.error('Error opening Suitelet URL:', e);
        }
    }

    // Example: Attach openSuitelet() function to a button click event
    function onClickButton() {
        log.debug('Button clicked successfully')
        openSuitelet();
    }

    return {
        pageInit: pageInit,
        onClickButton: onClickButton // Optionally, attach this to a button click event
    };
});
