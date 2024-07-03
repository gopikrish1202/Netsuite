  
            
                        


// /**
//  * @NApiVersion 2.x
//  * @NScriptType Suitelet
//  */
// define(['N/ui/serverWidget'], function(serverWidget) {
//     function onRequest(context) {
//         if (context.request.method === 'GET') {

//             // Section One - Forms - See 'Steps for Creating a Custom Form' in topic 'Sample Custom Form Script'
//             var form = serverWidget.createForm({
//                 title: 'Customer Information'
//             });

//             var usergroup = form.addFieldGroup({
//                 id: 'usergroup',
//                 label: 'User Information'
//             });
//             usergroup.isSingleColumn = true;

//             var companygroup = form.addFieldGroup({
//                 id: 'companygroup',
//                 label: 'Company Information'
//             });

//             var select = form.addField({
//                 id: 'titlefield',
//                 type: serverWidget.FieldType.SELECT,
//                 label: 'Title',
//                 container: 'usergroup'
//             });
//             select.addSelectOption({
//                 value: 'Mr.',
//                 text: 'Mr.'
//             });
//             select.addSelectOption({
//                 value: 'MS.',
//                 text: 'Ms.'
//             });
//             select.addSelectOption({
//                 value: 'Dr.',
//                 text: 'Dr.'
//             });

//             var fname = form.addField({
//                 id: 'fnamefield',
//                 type: serverWidget.FieldType.TEXT,
//                 label: 'First Name',
//                 container: 'usergroup'
//             });
//             fname.isMandatory = true;

//             var lname = form.addField({
//                 id: 'lnamefield',
//                 type: serverWidget.FieldType.TEXT,
//                 label: 'Last Name',
//                 container: 'usergroup'
//             });
//             lname.isMandatory = true;

//             form.addField({
//                 id: 'emailfield',
//                 type: serverWidget.FieldType.EMAIL,
//                 label: 'Email',
//                 container: 'usergroup'
//             });

//             var companyname = form.addField({
//                 id: 'companyfield',
//                 type: serverWidget.FieldType.TEXT,
//                 label: 'Company',
//                 container: 'companygroup'
//             });
//             companyname.defaultValue = 'Company Name';

//             form.addField({
//                 id: 'phonefield',
//                 type: serverWidget.FieldType.PHONE,
//                 label: 'Phone Number',
//                 container: 'companygroup'
//             });

//             form.addField({
//                 id: 'urlfield',
//                 type: serverWidget.FieldType.URL,
//                 label: 'Website',
//                 container:'companygroup'
//             });

//             form.addSubmitButton({
//                 label: 'Submit'
//             });

//             // Section Two - Tabs - See 'Steps for Adding a Tab to a Form' in topic 'Sample Custom Form Script'
//             var tab1 = form.addTab({
//                 id: 'tab1id',
//                 label: 'Payment'
//             });


//             var tab2 = form.addTab({
//                 id: 'tab2id',
//                 label: 'Inventory'
//             });

//             form.addSubtab({
//                 id: 'subtab1id',
//                 label: 'Payment Information',
//                 tab: 'tab1id'
//             });

//             form.addSubtab({
//                 id: 'subtab2id',
//                 label: 'Transaction Record',
//                 tab: 'tab1id'
//             });

//             // Subtab One Fields
//             var ccselect = form.addField({
//                 id: 'cctypefield',
//                 type: serverWidget.FieldType.SELECT,
//                 label: 'Payment Mode',
//                 container: 'subtab1id'
//             });
//             ccselect.addSelectOption({
//                 value: 'UPI',
//                 text: 'UPI'
//             });
//             ccselect.addSelectOption({
//                 value: 'DEBIT CARD',
//                 text: 'DEBIT CARD'
//             });
//             ccselect.addSelectOption({
//                 value: 'CREDIT CARD',
//                 text: 'CREDIT CARD'
//             });


//             // Section Three - Sublist - See 'Steps for Adding a Sublist to a Form' in topic 'Sample Custom Form Script'
//             var sublist = form.addSublist({
//                 id: 'sublistid',
//                 type: serverWidget.SublistType.INLINEEDITOR,
//                 label: 'Inline Sublist',
//                 tab: 'tab2id'
//             });


//             // Sublist Fields
//             sublist.addField({
//                 id: 'datefieldid',
//                 type: serverWidget.FieldType.DATE,
//                 label: 'Date'
//             });

//             sublist.addField({
//                 id: 'productfieldid',
//                 type: serverWidget.FieldType.TEXT,
//                 label: 'Product'
//             });

//             sublist.addField({
//                 id: 'qtyfieldid',
//                 type: serverWidget.FieldType.INTEGER,
//                 label: 'Quantity'
//             });

//             sublist.addField({
//                 id: 'upfieldid',
//                 type: serverWidget.FieldType.CURRENCY,
//                 label: 'Unit Cost'
//             });

//             context.response.writePage(form);
//         } else if (context.request.method === 'POST') {
//             // Process form submission
//             var titleField = context.request.parameters.titlefield;
//             var fnameField = context.request.parameters.fnamefield;
//             var lnameField = context.request.parameters.lnamefield;
//             var emailField = context.request.parameters.emailfield;
//             var companyField = context.request.parameters.companyfield;
//             var phoneField = context.request.parameters.phonefield;
//             var urlField = context.request.parameters.urlfield;
//             var ccField = context.request.parameters.cctypefield;
//             var ccNumber = context.request.parameters.credfield;
//             var expMonth = context.request.parameters.expmonth;
//             var expYear = context.request.parameters.expyear;

//             // You can perform further processing here, such as creating records or displaying a confirmation message.
//             context.response.write('Form submitted successfully!');
//         }
//     }
//     return {
//         onRequest: onRequest
//     };
// });



/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget'], function(serverWidget) {
    function onRequest(context) {
        if (context.request.method === 'GET') {

            // Section One - Forms - See 'Steps for Creating a Custom Form' in topic 'Sample Custom Form Script'
            var form = serverWidget.createForm({
                title: 'Customer Information'
            });

            var usergroup = form.addFieldGroup({
                id: 'usergroup',
                label: 'User Information'
            });
            usergroup.isSingleColumn = true;

            var companygroup = form.addFieldGroup({
                id: 'companygroup',
                label: 'Company Information'
            });

            var select = form.addField({
                id: 'titlefield',
                type: serverWidget.FieldType.SELECT,
                label: 'Title',
                container: 'usergroup'
            });
            select.addSelectOption({
                value: 'Mr.',
                text: 'Mr.'
            });
            select.addSelectOption({
                value: 'MS.',
                text: 'Ms.'
            });
            select.addSelectOption({
                value: 'Dr.',
                text: 'Dr.'
            });

            var fname = form.addField({
                id: 'fnamefield',
                type: serverWidget.FieldType.TEXT,
                label: 'First Name',
                container: 'usergroup'
            });
            fname.isMandatory = true;

            var lname = form.addField({
                id: 'lnamefield',
                type: serverWidget.FieldType.TEXT,
                label: 'Last Name',
                container: 'usergroup'
            });
            
            lname.isMandatory = true;

            form.addField({
                id: 'emailfield',
                type: serverWidget.FieldType.EMAIL,
                label: 'Email',
                container: 'usergroup'
            });

            var companyname = form.addField({
                id: 'companyfield',
                type: serverWidget.FieldType.TEXT,
                label: 'Company',
                container: 'companygroup'
            });
            companyname.defaultValue = 'Company Name';

            form.addField({
                id: 'phonefield',
                type: serverWidget.FieldType.PHONE,
                label: 'Phone Number',
                container: 'companygroup'
            });

            form.addField({
                id: 'urlfield',
                type: serverWidget.FieldType.URL,
                label: 'Website',
                container:'companygroup'
            });
          
            form.clientScriptFileId=16621;
            
             
             
            var submitButton = form.addSubmitButton({
                label: 'Submit',
                functionName: 'onSubmit()'
                

            });
            

            // Add client script to handle form submission
            
            // Section Two - Tabs - See 'Steps for Adding a Tab to a Form' in topic 'Sample Custom Form Script'
            var tab1 = form.addTab({
                id: 'tab1id',
                label: 'Payment'
            });

            var tab2 = form.addTab({
                id: 'tab2id',
                label: 'Inventory'
            });

            form.addSubtab({
                id: 'subtab1id',
                label: 'Payment Information',
                tab: 'tab1id'
            });

            form.addSubtab({
                id: 'subtab2id',
                label: 'Transaction Record',
                tab: 'tab1id'
            });

            // Subtab One Fields
            var ccselect = form.addField({
                id: 'cctypefield',
                type: serverWidget.FieldType.SELECT,
                label: 'Payment Mode',
                container: 'subtab1id'
            });
            ccselect.addSelectOption({
                value: 'UPI',
                text: 'UPI'
            });
            ccselect.addSelectOption({
                value: 'DEBIT CARD',
                text: 'DEBIT CARD'
            });
            ccselect.addSelectOption({
                value: 'CREDIT CARD',
                text: 'CREDIT CARD'
            });

            // Section Three - Sublist - See 'Steps for Adding a Sublist to a Form' in topic 'Sample Custom Form Script'
            var sublist = form.addSublist({
                id: 'sublistid',
                type: serverWidget.SublistType.INLINEEDITOR,
                label: 'Inline Sublist',
                tab: 'tab2id'
            });


            // Sublist Fields
            sublist.addField({
                id: 'datefieldid',
                type: serverWidget.FieldType.DATE,
                label: 'Date'
            });

            sublist.addField({
                id: 'productfieldid',
                type: serverWidget.FieldType.TEXT,
                label: 'Product'
            });

            sublist.addField({
                id: 'qtyfieldid',
                type: serverWidget.FieldType.INTEGER,
                label: 'Quantity'
            });

            sublist.addField({
                id: 'upfieldid',
                type: serverWidget.FieldType.CURRENCY,
                label: 'Unit Cost'
            });

            context.response.writePage(form);
        } else if (context.request.method === 'POST') {
            // Process form submission
            var titleField = context.request.parameters.titlefield;
            var fnameField = context.request.parameters.fnamefield;
            var lnameField = context.request.parameters.lnamefield;
            var emailField = context.request.parameters.emailfield;
            var companyField = context.request.parameters.companyfield;
            var phoneField = context.request.parameters.phonefield;
            var urlField = context.request.parameters.urlfield;

            
        }
    }
    return {
        onRequest: onRequest
    };
});
