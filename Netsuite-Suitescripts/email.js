/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/email', 'N/record', 'N/file'], function(email, record, file) {
    function afterSubmit(context) {
        const senderId = 3117;
        const recipientEmail = 'ggopikrishna@mail.the-absol.com';


         email.send({
            author: senderId,
            body: 'email body',
            recipients: recipientEmail,
            subject: 'Test Sample Email Module', 
             
         })
    }

    return {
        afterSubmit: afterSubmit
    };
});
