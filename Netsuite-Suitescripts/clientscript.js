/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */

define(['N/ui/dialog'], function(dialog) {
    function pageInit(context) {
        dialog.alert({title: 'status',
        message: 'Form submitted successfully!'});
    }


    return {
        pageInit: pageInit,
        onSubmit: onSubmit
    };
});
