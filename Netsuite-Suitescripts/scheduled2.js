    /**
     * @NApiVersion 2.x
     * @NScriptType ScheduledScript
     * @NModuleScope SameAccount
     */
    define(['N/log'], function(log) {

        function execute(context) {
        
            log.audit({
                title: 'Scheduled Script Execution',
                details: 'This is a basic example of a scheduled script in NetSuite.'
            });

        }
        return {
            execute: execute
        };
    });
