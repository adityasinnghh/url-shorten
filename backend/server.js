import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import shortid from 'shortid';
import Url from './models/Url.js';

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/urlshortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// API to shorten URL
app.post('/api/shorten', async (req, res) => {
  const { original_url } = req.body;
  const short_code = shortid.generate();

  const newUrl = new Url({ original_url, short_code });
  await newUrl.save();

  res.json({ short_url: `http://localhost:5000/${short_code}` });
});

// Redirect to original URL
app.get('/:shortcode', async (req, res) => {
  const url = await Url.findOne({ short_code: req.params.shortcode });
  if (url) {
    url.click_count += 1;
    await url.save();
    return res.redirect(url.original_url);
  }
  res.status(404).send('URL not found');
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
