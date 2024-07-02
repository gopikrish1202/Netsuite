/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define(['N/render', 'N/file', 'N/log'],
function(render, file, log) {
    
    /**
     * Search for a folder by name and return its ID
     * @param {string} folderName - The name of the folder
     * @returns {number} - The ID of the folder
     */
    function findFolderIdByName(folderName) {
        var folderSearch = file.find({
            type: file.Type.FOLDER,
            filters: [['name', 'is', folderName]]
        });
        var folderId;
        folderSearch.forEach(function(result) {
            folderId = result.id;
            // Stop iteration after finding the first matching folder
            return false;
        });
        return folderId;
    }

    function beforeLoad(context) {
        if (context.type === context.UserEventType.VIEW) {
            var xmlStr = "<?xml version=\"1.0\"?>\n" +
                "<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n" +
                "<pdf>\n<body font-size=\"18\">\nHello World!\n</body>\n</pdf>";

            var pdfFile = render.xmlToPdf({
                xmlString: xmlStr
            });
            log.debug('render successful');
            
            if (pdfFile) {
                // Save PDF file
                var folderName = 'SuiteScripts'; // Change this to the name of your folder
                var folderId = findFolderIdByName(folderName);
                if (!folderId) {
                    log.error('Folder not found:', folderName);
                    return;
                }

                var fileId = pdfFile.save({
                    folder: folderId
                });
                log.debug('pdf saved successfully');

                // Get URL for the PDF file
                var fileObj = file.load({
                    type: file.Type.FILE,
                    id: fileId
                });
                var fileUrl = fileObj.url;

                // Open PDF file in a new tab
                var linkUrl = fileUrl + '&download=T'; // Append '&download=T' to force download
                log.debug('url resolved successfully');
                
                // Redirect to the PDF file
                if (linkUrl) {
                    var script = "window.open('" + linkUrl + "', '_blank')";
                    context.response.write("<script>" + script + "</script>");
                }
            }
        }
    }
    
    return {
        beforeLoad: beforeLoad
    };
});
