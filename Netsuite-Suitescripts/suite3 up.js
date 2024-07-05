/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/record', 'N/render', 'N/log'], function(record, render, log) {

  function onRequest(context) {
      var rec_id = context.request.parameters.id;
      log.debug("recid", rec_id);

      // Load the invoice record
      var loadPO = record.load({
          type: 'invoice',
          id: rec_id
      });

     

      // Extract necessary data from the loaded record
      var transactionNumber = loadPO.getValue({
          fieldId: 'tranid'
      });
      log.debug('Transaction number', transactionNumber);

      var transactionDate = loadPO.getText({
          fieldId: 'trandate'
      });
      log.debug('Transaction date', transactionDate);

      var location = loadPO.getText({
          fieldId: 'location'
      });
      log.debug('Location', location);

      var custRefNum = loadPO.getText({
          fieldId: 'custbody_customer_ref_number'
      });
      log.debug('Customer reference number', custRefNum);

      var paymentTerms = loadPO.getText({
          fieldId: 'custbody_payment_terms'
      });
      log.debug('Payment Terms', paymentTerms);

      var vatNo = loadPO.getText({
          fieldId: 'custbody_vat'
      });
      
      log.debug('VAT No.', vatNo);
      var pinNo = loadPO.getText({
          fieldId: 'custbody10038'
      });

      log.debug('PIN No.', pinNo);
      var billAddress = loadPO.getText({
          fieldId: 'billaddress'
      });
      log.debug('Address', billAddress);
      var subtotal = loadPO.getValue({
          fieldId: 'subtotal'
      });
      log.debug('Subtotal', subtotal);
      var taxTotal = loadPO.getValue({
          fieldId: 'taxtotal'
      });
      log.debug('Tax Total', taxTotal);
      var total = loadPO.getValue({
          fieldId: 'total'
      });
      log.debug('Total', total);
      
      

      // Load sublist items
      var items = [];
      var itemCount = loadPO.getLineCount({
          sublistId: 'item'
      });

      for (var i = 0; i < itemCount; i++) {
          items.push({
              description: loadPO.getSublistValue({
                  sublistId: 'item',
                  fieldId: 'description',
                  line: i
              }),
              units: loadPO.getSublistValue({
                  sublistId: 'item',
                  fieldId: 'units',
                  line: i
              }),
              quantity: loadPO.getSublistValue({
                  sublistId: 'item',
                  fieldId: 'quantity',
                  line: i
              }),
              rate: loadPO.getSublistValue({
                  sublistId: 'item',
                  fieldId: 'rate',
                  line: i
              }),
              amount: loadPO.getSublistValue({
                  sublistId: 'item',
                  fieldId: 'amount',
                  line: i
              })
          });
      }

      // Generate items XML dynamically
      var itemsXml = '';
      for (var j = 0; j < items.length; j++) {
          itemsXml += '<tr>\
              <td>' + (j + 1) + '</td>\
              <td style="border-left:1px solid;">' + items[j].description + '</td>\
              <td style="border-left:1px solid;">' + items[j].units + '</td>\
              <td style="border-left:1px solid;">' + items[j].quantity + '</td>\
              <td style="border-left:1px solid;">' + items[j].rate + '</td>\
              <td style="border-left:1px solid;">' + items[j].amount + '</td>\
          </tr>';
      }
      log.debug('Items in array',itemsXml)
      // Create XML template content with embedded values
      var xmlTemplateFile = '<?xml version="1.0"?>\
      <!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">\
      <pdf>\
          <head>\
              <link name="NotoSans" type="font" subtype="truetype" src="${nsfont.NotoSans_Regular}" src-bold="${nsfont.NotoSans_Bold}" src-italic="${nsfont.NotoSans_Italic}" src-bolditalic="${nsfont.NotoSans_BoldItalic}" bytes="2" />\
              <#if .locale == "zh_CN">\
                  <link name="NotoSansCJKsc" type="font" subtype="opentype" src="${nsfont.NotoSansCJKsc_Regular}" src-bold="${nsfont.NotoSansCJKsc_Bold}" bytes="2" />\
              <#elseif .locale == "zh_TW">\
                  <link name="NotoSansCJKtc" type="font" subtype="opentype" src="${nsfont.NotoSansCJKtc_Regular}" src-bold="${nsfont.NotoSansCJKtc_Bold}" bytes="2" />\
              <#elseif .locale == "ja_JP">\
                  <link name="NotoSansCJKjp" type="font" subtype="opentype" src="${nsfont.NotoSansCJKjp_Regular}" src-bold="${nsfont.NotoSansCJKjp_Bold}" bytes="2" />\
              <#elseif .locale == "ko_KR">\
                  <link name="NotoSansCJKkr" type="font" subtype="opentype" src="${nsfont.NotoSansCJKkr_Regular}" src-bold="${nsfont.NotoSansCJKkr_Bold}" bytes="2" />\
              <#elseif .locale == "th_TH">\
                  <link name="NotoSansThai" type="font" subtype="opentype" src="${nsfont.NotoSansThai_Regular}" src-bold="${nsfont.NotoSansThai_Bold}" bytes="2" />\
              </#if>\
              <macrolist>\
                  <macro id="nlheader">\
                      <table class="header" style="width: 100%;"><tr>\
                          <td align="right">Invoice NO:'+transactionNumber+'</td>\
                      </tr></table>\
                  </macro>\
                  <macro id="nlfooter">\
                      <table class="footer"><tr>\
                          <td align="right"><pagenumber/> of <totalpages/></td>\
                      </tr></table>\
                      <table style="width: 100%;"><tr>\
                          <td align="left">Issued by - ${user.firstname} ${user.lastname}</td>\
                          <td align="right">Printed on ${.now}</td>\
                      </tr></table>\
                  </macro>\
              </macrolist>\
              <style type="text/css">\
                  * {\
                      <#if .locale == "zh_CN">\
                          font-family: NotoSans, NotoSansCJKsc, sans-serif;\
                      <#elseif .locale == "zh_TW">\
                          font-family: NotoSans, NotoSansCJKtc, sans-serif;\
                      <#elseif .locale == "ja_JP">\
                          font-family: NotoSans, NotoSansCJKjp, sans-serif;\
                      <#elseif .locale == "ko_KR">\
                          font-family: NotoSans, NotoSansCJKkr, sans-serif;\
                      <#elseif .locale == "th_TH">\
                          font-family: NotoSansThai, sans-serif;\
                      <#else>\
                          font-family: NotoSans, sans-serif;\
                      </#if>\
                  }\
                  table {\
                      font-size: 9pt;\
                      table-layout: fixed;\
                  }\
                  th {\
                      font-weight: bold;\
                      font-size: 8pt;\
                      vertical-align: middle;\
                      padding: 5px 6px 3px;\
                      background-color: #7f8584;\
                      color: #333333;\
                  }\
                  td {\
                      padding: 4px 6px;\
                  }\
                  td p {\
                      align: left;\
                  }\
                  b {\
                      font-weight: bold;\
                      color: #333333;\
                  }\
                  table.header td {\
                      padding: 0px;\
                      font-size: 10pt;\
                  }\
                  table.footer td {\
                      font-size: 8pt;\
                  }\
                  table.itemtable th {\
                      padding-bottom: 10px;\
                      padding-top: 10px;\
                  }\
                  table.body td {\
                      padding-top: 2px;\
                  }\
                  table.total {\
                      page-break-inside: avoid;\
                  }\
                  tr.totalrow {\
                      background-color: #e3e3e3;\
                      line-height: 200%;\
                  }\
                  td.totalboxtop {\
                      font-size: 12pt;\
                      background-color: #e3e3e3;\
                  }\
                  td.totalboxtopp {\
                      line-height: 150%;\
                  }\
                  td.addressheader {\
                      font-size: 8pt;\
                      padding-top: 6px;\
                      padding-bottom: 2px;\
                  }\
                  td.address {\
                      padding-top: 0px;\
                  }\
                  td.totalboxmid {\
                      font-size: 28pt;\
                      padding-top: 20px;\
                      background-color: #e3e3e3;\
                  }\
                  td.totalboxbot {\
                      background-color: #e3e3e3;\
                      font-weight: bold;\
                  }\
                  span.title {\
                      font-size: 28pt;\
                  }\
                  span.number {\
                      font-size: 16pt;\
                  }\
                  hr {\
                      width: 100%;\
                      color: #d3d3d3;\
                      background-color: #d3d3d3;\
                      height: 1px;\
                  }\
              </style>\
          </head>\
          <body padding="0.5in 0.5in 0.5in 0.5in" size="A4">\
              <table style="border:1px solid;width:100%;padding-top:0.5px;margin-bottom:8px;">\
                  <tbody align="center">\
                      <tr>\
                          <td rowspan="2"><table border="0">\
                              <tr style="padding-bottom:28px">\
                                  <td>\
                                      <img src="https://tstdrv2133943.app.netsuite.com/core/media/media.nl?id=15167&amp;c=TSTDRV2133943&amp;h=0wDIlfTv3uhsFHKZKiGHwec7_FNvbBPhSveMKplDHrUY1qHd" width="60" height="60"/>\
                                  </td>\
                                  <td style="padding-bottom:5px;word-spacing: 10px;align:left;border:0">Al Ittihad Educational Institutions<br />\
                                      Po Box: 184857, 1802,<br />\
                                      Silver Towers, Al Abraj Street<br />\
                                      Business Bay, Dubai<br />\
                                      Tel:- 91 - 9840722503<br />\
                                      Email : www.appsbizsol.com</td>\
                              </tr>\
                          </table></td>\
                          <th style="border-left:1px solid;border-bottom:1px solid; text-align:center"><b>Invoice</b></th>\
                      </tr>\
                      <tr>\
                          <td style="border-left:1px solid;">\
                              <table style="width:100%; text-align:left;">\
                                  <tr>\
                                      <td>Invoice No</td>\
                                      <td>:</td>\
                                      <td>' + transactionNumber + '</td>\
                                  </tr>\
                                  <tr>\
                                      <td>Date</td>\
                                      <td>:</td>\
                                      <td>' + transactionDate + '</td>\
                                  </tr>\
                                  <tr>\
                                      <td>Location</td>\
                                      <td>:</td>\
                                      <td>' + location + '</td>\
                                  </tr>\
                                  <tr>\
                                      <td>Cust Ref No</td>\
                                      <td>:</td>\
                                      <td>' + custRefNum + '</td>\
                                  </tr>\
                                  <tr>\
                                      <td>Payment Terms</td>\
                                      <td>:</td>\
                                      <td>' + paymentTerms + '</td>\
                                  </tr>\
                                  <tr>\
                                      <td>VAT No</td>\
                                      <td>:</td>\
                                       <td>' + vatNo + '</td>\
                                  </tr>\
                                  <tr>\
                                      <td>Pin No</td>\
                                      <td>:</td>\
                                      <td>' + pinNo + '</td>\
                                  </tr>\
                              </table>\
                          </td>\
                      </tr>\
                  </tbody>\
              </table>\
                            <table style="border:1px solid;width:100%;margin-bottom:8px;">\
                  <tbody>\
                      <tr>\
                          <th style="border-bottom:1px solid">Bill To</th>\
                          <th style="border-left:1px solid;border-bottom:1px solid">Ship To</th>\
                      </tr>\
                      <tr><td>'+billAddress+'</td><td style="border-left: 1px">' + billAddress + '</td></tr>\
                      <tr>\
                          <td><br /></td>\
                          <td style="border-left: 1px"><br /></td>\
                      </tr>\
                  </tbody>\
              </table>\
              <#if items.length > 0>\
                  <table style="border:1px solid;width:100%;margin-bottom:8px;">\
                      <tr style="background-color: #f2f2f2;">\
                          <th style="border-bottom:1px solid;text-align:center">S.No</th>\
                          <th style="border-left:1px solid;border-bottom:1px solid;text-align:center">Description</th>\
                          <th style="border-left:1px solid;border-bottom:1px solid;text-align:center">UoM</th>\
                          <th style="border-left:1px solid;border-bottom:1px solid;text-align:center">Qty</th>\
                          <th style="border-left:1px solid;border-bottom:1px solid;text-align:center">Net Price</th>\
                          <th style="border-left:1px solid;border-bottom:1px solid;text-align:center">Net Amount</th>\
                      </tr>\
                      ' + itemsXml + '\
                       </table>\
              </#if>\
              <table style="border:1px solid;width:100%;margin-bottom:8px;">\
                  <tbody>\
                      <tr>\
                          <th style="border-bottom:1px solid" width="80%">Terms and Conditions</th>\
                          <td rowspan="2" width="20%" style="border-left:1px solid">\
                              <table>\
                                  <tr>\
                                      <td>Amount</td>\
                                      <td style="width:5%"></td>\
                                      <td>:</td>\
                                     <td>' + subtotal + '</td>\
                                  </tr>\
                                  <tr>\
                                      <td>VAT</td>\
                                      <td style="width:5%"></td>\
                                      <td>:</td>\
                                     <td>' + taxTotal + '</td>\
                                  </tr>\
                                  <tr>\
                                      <td>Total</td>\
                                      <td style="width:5%"></td>\
                                      <td>:</td>\
                                      <td>' + total + '</td>\
                                  </tr>\
                              </table>\
                          </td>\
                      </tr>\
                      <tr>\
                          <td>1) We don’t accept or compensate for expired goods.<br/>\
                              2) Damages - Please notify us within 24 hrs from goods receipt through office@appsbizsol.com as\
                              from the company until the customer has paid for the goods in full.<br/>\
                              3) Overdue invoices will attract interest @ 3% per month.</td>\
                      </tr>\
                  </tbody>\
              </table>\
              <table style="border-left:0;width:100%; border:1px solid">\
                  <tr>\
                      <td style="text-align:left">AMOUNT IN WORDS: </td>\
                      <td></td>\
                  </tr>\
              </table>\
          </body>\
      </pdf>';

      // Create renderer and render the PDF
      var renderer = render.create();
      renderer.templateContent = xmlTemplateFile;
      renderer.addRecord('record', loadPO);
      var invoicePdf = renderer.renderAsPdf();

      // Serve the PDF as response
      context.response.writeFile({
          file: invoicePdf,
          isInline: true
      });
  }

  return {
      onRequest: onRequest
  };

});
