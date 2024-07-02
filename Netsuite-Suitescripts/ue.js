/**
*@NApiVersion 2.x
*@NScriptType UserEventScript
*/
define(['N/record','N/ui/serverWidget'], function (record, serverWidget) {
    function beforeLoad(context) {
        var recld = context.newRecord;
        var form = context.form;
        if (context.type == "view") {

            form.addButton({
                id: "custpage_mprint_pdf",
                label: "Print Template",
                functionName: "pageInit"
            });
            form.clientScriptFileId = 16614;

        }
    }
    return {
        beforeLoad: beforeLoad
    }
});