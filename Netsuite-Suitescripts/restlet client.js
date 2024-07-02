/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/https'],function(https){
    function pageInit(context){
        
        var dataFromRestlet=https.get('https://tstdrv2133943.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=2640&deploy=1')
   
    }
    return{
        pageInit:pageInit
    }
});