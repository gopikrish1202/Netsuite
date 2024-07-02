            /**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
            require(['N/action', 'N/record'], function(action, record) {
                // create timebill record  
                var rec = record.create({
                    type: 'timebill',
                    isDynamic: true
                });
                rec.setValue({
                    fieldId: 'custbody_ctx_api_error',
                    value: 104
                });
                rec.setValue({
                    fieldId: 'custbody_ctx_is_synced',
                    value: 'yes'
                });
                log.debug('values set successfully')
                
                var recordId = rec.save();
            
                var actions = action.find({
                    recordType: 'timebill',
                    recordId: recordId
            
                });
            
                log.debug("We've got the following actions: " + Object.keys(actions));
                if (actions.approve) {
                    var result = actions.approve();
                    log.debug("Timebill has been successfully approved");
                } else {
                    log.debug("The timebill is already approved");
                }
            });
            
            // Outputs the following:
            // We've got the following actions: approve, reject
            // Timebill has been successfully approved 
            
                      