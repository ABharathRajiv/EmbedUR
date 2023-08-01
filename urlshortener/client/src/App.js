import React, { useState } from 'react';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000'; // Replace with the actual backend URL


function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const shortenUrl = async () => {
    try {
      const response = await axios.post('/shorten', { originalUrl });
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  return (
    <div>
      <h1>URL Shortener</h1>
      <input
        type="text"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        placeholder="Enter URL to shorten"
      />
      <button onClick={shortenUrl}>Shorten</button>
      {shortUrl && (
        <div>
          <p>Shortened URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
