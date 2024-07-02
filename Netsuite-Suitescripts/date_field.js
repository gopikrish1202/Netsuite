    /**
     * @NApiVersion 2.x
     * @NScriptType UserEventScript
     */
    define(['N/record', 'N/format'], function(record, format) {



        function beforeLoad(context) {
            if (context.type === context.UserEventType.CREATE) {
                var newRecord = context.newRecord;

            
                var today = new Date();

        
                var formattedDate = format.format({
                    value: today,
                    type: format.Type.DATE
                });

                
                newRecord.setValue({
                    fieldId: 'custrecord1967',
                    value: today
                });

                log.debug({
                    title: 'Today Date on Before load',
                    details: formattedDate
                });
                
            }
        }



        function afterSubmit(context) {
            var newRecord = context.newRecord;

            
            var unformatted = newRecord.getValue({
                fieldId: 'custrecord1967'
            });

            log.debug('After submit date (unformatted)', unformatted);

            var today = new Date();
            var formattedDate = format.format({
                value: new Date(unformatted),
                type: format.Type.DATE
            });
            var date_num=formatToTwoDigits(today.getDate())
            var month_num=formatToTwoDigits(today.getMonth()+1)
            var year_num=formatToTwoDigits(today.getFullYear())
            log.debug('Today\'s Date', date_num);
            log.debug('Today\'s Month', month_num)
            log.debug('Today\'s Year',year_num)


            

            record.submitFields({
                type: newRecord.type,
                id: newRecord.id,
                values: {
                    'custrecord_set_date_': formattedDate
                }
            });

        var splitted=formattedDate.split('/')
        var date=splitted[0]
        var month=splitted[1]
        var year=splitted[2]

            log.debug('date set successfully', formattedDate);
            log.debug('set date',date)
            log.debug('set month',month)
            log.debug('set year ',year)
        }


        function formatToTwoDigits(number) {
            return number.toString();
        }

        return {
            beforeLoad: beforeLoad,
            afterSubmit: afterSubmit
        };
    });

