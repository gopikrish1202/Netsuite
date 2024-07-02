const axios = require('axios');
const qs = require('qs'); // For URL encoding in POST requests (if needed)

// NetSuite OAuth credentials
const credentials = {
    accountId: '2133943',
    consumerKey: 'f8bce1f66dd3ff577a0c1bd3015b86ced593d037cc18a3fd179fdbecc561f872',
    consumerSecret: '945b85963417adb505a435d18211087c5a2870560b726b398af4c3414578f27d',
    tokenId: 'eba91650a02f87b3df4b6234570335462cdfde30b9bd5198d6d0ecb3815092f9',
    tokenSecret: 'd3d0920e716e723ad60254a3dcc77010436be5322058c79a8c1f01d35497af95'
};

// Base URL for NetSuite REST API
const baseUrl = `https://${credentials.accountId}.suitetalk.api.netsuite.com/services/rest/query/v1/suiteql`;

// Function to fetch customer records
async function fetchCustomers() {
    try {
        // Construct OAuth headers
        const oauth = {
            consumer_key: credentials.consumerKey,
            consumer_secret: credentials.consumerSecret,
            token: credentials.tokenId,
            token_secret: credentials.tokenSecret,
            realm: credentials.accountId
        };

        // OAuth parameters for Axios
        const oauthParams = {
            method: 'GET',
            url: baseUrl,
            headers: {
                Authorization: oauth,
                'Content-Type': 'application/json'
            },
            params: {
                q: 'SELECT * FROM customer LIMIT 10' // Example SuiteQL query to fetch 10 customers
            }
        };

        // Make GET request to NetSuite REST API
        const response = await axios(oauthParams);

        // Handle response data
        console.log('Customer Records:');
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error('Error fetching customers:', error);
        throw error;
    }
}

// Call fetchCustomers function
fetchCustomers();
