const fs = require('fs');

// Load the JSON file
const _filePath = './form.json';
const filePath_ = './form_.json';

fs.readFile(_filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    try {
        // Parse JSON
        const jsonData = JSON.parse(data);

        // Iterate through the JSON array
        jsonData.forEach((item, index) => {
            // Ensure the item is an array and has a numeric subarray
            if (Array.isArray(item) && Array.isArray(item[item.length - 1])) {
                const numericArray = item[item.length - 1];
                if (numericArray.every(Number.isInteger)) {
                    // Append the length of the numeric array to its first index
                    numericArray.unshift(numericArray.length);
                }
            }
        });

        // Save the modified JSON
        fs.writeFile(filePath_, JSON.stringify(jsonData, null, 4), (err) => {
            if (err) {
                console.error('Error writing to the file:', err);
            } else {
                console.log('File successfully updated.');
            }
        });
    } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
    }
});
