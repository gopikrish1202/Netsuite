
/**
 * @NApiVersion 2.x
 * @NScriptType restlet
 */
define([], function() {
    function doGet() {
        return "Hello world!";
    }

    return {
        get: doGet
    };
});
