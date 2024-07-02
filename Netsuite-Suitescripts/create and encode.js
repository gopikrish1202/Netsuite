const fs = require('fs');

// JavaScript object representing a person's information
let person = {
    "name": "John Doe",
    "age": 30,
    "isStudent": false,
    "favorites": ["apple", "banana", "cherry"],
    "address": {
        "city": "New York",
        "postalCode": "10001"
    },
    "nullValue": null
};

// Convert JavaScript object to JSON string
let jsonStr = JSON.stringify(person, null, 2);

// Write JSON string to a file (data.json) with UTF-8 encoding
fs.writeFile('data.json', jsonStr, 'utf8', (err) => {
    if (err) {
        console.error('Error writing file:', err);
        return;
    }
    console.log('Data encoded and saved to data.json');
});
