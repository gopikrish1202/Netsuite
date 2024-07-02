// /**
//  * @NApiVersion 2.1
//  * @NScriptType ClientScript
//  */
// define(['N/record'], function (record) {
//     function pageInit(context){
//         // Create a record with two default values 
// record.create({
//     type: record.Type.SALES_ORDER,
//     defaultValues: {
//         entity: 107,
//         subsidiary: 1
//     }
// });
//     }
//     return{
//         pageInit: pageInit
//     }
// })


/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */
define(['N/record'], function (record) {
    function pageInit(context){
        // Create a record with two default values 
        var newSalesOrder = record.create({
            type: record.Type.SALES_ORDER,
            defaultValues: {
                entity: 107,
                subsidiary: 1
            }
        });

        // Save the record
        var salesOrderId = newSalesOrder.save();

       
       
    }

    return {
        pageInit: pageInit
    };
});
