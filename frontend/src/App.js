import { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const shortenUrl = async () => {
    if (!url) return alert("Please enter a URL");
    const res = await axios.post('http://localhost:5000/api/shorten', { original_url: url });
    setShortUrl(res.data.short_url);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>URL Shortener (MERN)</h2>
      <input
        type="text"
        placeholder="Enter long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ padding: '8px', width: '300px' }}
      />
      <button onClick={shortenUrl} style={{ padding: '8px 12px', marginLeft: '5px' }}>Shorten</button>
      {shortUrl && (
        <p>Short URL: <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a></p>
      )}
    </div>
  );
}

export default App;
