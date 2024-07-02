/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */
define(['N/ui/message'], function(message){

    function pageInit(context){
var currentRec=context.currentRecord;
var first=currentRec.getValue({
    fieldId: 'custbody10028'  
})
var second=currentRec.getValue({
    fieldId: 'custbody10029'
})
var msg=first+second;

currentRecord.setValue({
    fieldId: 'custbody10030',
    value: msg
   
})
    }
    return({
        pageInit: pageInit
    })
});