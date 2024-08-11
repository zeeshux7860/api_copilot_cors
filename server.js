const express = require('express');
const corsAnywhere = require('cors-anywhere');

const app = express();
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8080;

// Create the CORS Anywhere server
const corsProxy = corsAnywhere.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2'],
});

// Use Express to handle requests
app.use((req, res) => {
    // Handle the CORS proxy
    corsProxy.emit('request', req, res);
});

// Start the Express server
app.listen(port, host, () => {
    console.log(`CORS Anywhere proxy server running at http://${host}:${port}`);
});
