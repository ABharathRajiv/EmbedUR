const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors'); 
// Create Express app
// See http://expressjs.com/en/guide/using-middleware.html

const app = express();
const PORT = 3000; 
const HOST = '192.168.29.244'; 
//To run in the network locally

app.use(express.json());
// A sample route
// Enable CORS for all routes
app.use(cors());
// app.use((req, res, next) => {
app.post('/api/verify', async (req, res) => {
  const otpUrl = 'https://otp.dev/api/verify/';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + Buffer.from('tk1XvHlgQR3V6dhUbm8STiNYroD7sjfI:d87kosvaxj4cuf3y9hlnbe106g5qipz2').toString('base64'),
  };
//   const headers = {
  try {
    const response = await fetch(otpUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error while fetching OTP:', error);
    res.status(500).json({ error: 'An error occurred while fetching OTP.' });
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Proxy server listening on http://${HOST}:${PORT}`);
});
//Created a proxy server to bypass CORS error