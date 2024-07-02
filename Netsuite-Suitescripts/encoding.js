
/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */

define(['N/encode'], function(encode) {
    function convertStringToDifferentEncoding() {
        var stringInput = "TÃƒÂ©st StriÃƒÂ±g Input";
        var base64EncodedString = encode.convert({
            string: stringInput,
            inputEncoding: encode.Encoding.UTF_8,
            outputEncoding: encode.Encoding.BASE_64
        });
        log.debug(base64EncodedString)
    }
    

    
    convertStringToDifferentEncoding();
}); 