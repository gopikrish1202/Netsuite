const fs = require('fs');

// Read the file with UTF-8 encoding
fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    try {
        // Parse JSON string into JavaScript object
        const parsedData = JSON.parse(data);
        console.log('Parsed JSON object:', parsedData);
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
});
