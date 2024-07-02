/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define(['N/ui/serverWidget', 'N/url', 'N/log'], function(serverWidget, url, log) {

    function beforeLoad(context) {
        if (context.type === context.UserEventType.VIEW || context.type === context.UserEventType.EDIT) {
            var form = context.form;

            // Generate Suitelet URL
            var suiteletUrl = url.resolveScript({
                // scriptId: 'customscript_my_sui_',
                scriptId: 'customscript_sub_suite_',
                deploymentId: 'customdeploy_sub_suite_',
                // deploymentId: 'customdeploy_my_sui_', 
                params: {} 
            });

            
            var fullUrl = 'https://tstdrv2133943.app.netsuite.com' + suiteletUrl;

            // Log the resolved URL for debugging
            log.debug("Resolved Suitelet URL", fullUrl);

            // Add a button to execute the Suitelet
            form.addButton({
                id: 'custpage_my_button',
                label: 'Execute Suitelet',
                functionName: 'openSuitelet'
            });

            // Add an inline script field to the form
            form.addField({
                id: 'custpage_inline_script',
                type: serverWidget.FieldType.INLINEHTML,
                label: 'Inline Script'
            }).defaultValue = 
            '<script>' +
            'function openSuitelet() {' +
            '   var url = "' + fullUrl + '";' +
           
            '   window.open(url, "_blank");' +
            '}' +
            '</script>';
        
        }
    }

    return {
        beforeLoad: beforeLoad
    };

});
