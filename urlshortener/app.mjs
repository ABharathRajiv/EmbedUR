import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;
import bodyParser from 'body-parser';
import { nanoid } from 'nanoid';
import cors from 'cors';

const app = express();
app.use(cors());

const pool = new Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432, // Change to your PostgreSQL port if necessary
});

app.use(bodyParser.json());

// Endpoint to create a shortened URL
app.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  const shortId = nanoid(6); // Change the number inside nanoid to set the length of the short ID

  try {
    const queryText = 'INSERT INTO urls (short_id, original_url) VALUES ($1, $2)';
    await pool.query(queryText, [shortId, originalUrl]);
    res.json({ shortUrl: `http://localhost/${shortId}` }); // Replace 'yourdomain' with your actual domain
  } catch (error) {
    console.error('Error creating shortened URL:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to redirect to the original URL
app.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;

  try {
    const queryText = 'SELECT original_url FROM urls WHERE short_id = $1';
    const result = await pool.query(queryText, [shortId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    const { original_url } = result.rows[0];
    res.redirect(original_url);
  } catch (error) {
    console.error('Error redirecting to the original URL:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

