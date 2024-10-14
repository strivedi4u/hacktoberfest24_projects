const express = require('express');
const cors = require('cors');
const url = require('url');
const { getPlaylistVideos } = require('./server/playlistApi');
const app = express();
const port = 3000;

require('dotenv').config();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


function extractPlaylistId(input) {
  
  if (input.startsWith('http')) {
    const parsedUrl = url.parse(input, true);

    const listParam = parsedUrl.query.list;
    if (listParam) {
    //   console.log("from list param:", listParam);
      return listParam;
    }
  }

 
//   console.log("from input:", input);
  return input;
}

app.get('/youtube-playlist', async (req, res) => {
  try {
    const apikey = process.env.YOUTUBE_API_KEY;
    const maxresults = req.query.maxresults || 10; 
    const playlistInput = req.query.playlistid;

    if (!playlistInput) {
      return res.status(400).json({ error: 'Playlist ID or URL is required' });
    }

    
    const playlistid = extractPlaylistId(playlistInput);

    
    const videos = await getPlaylistVideos(apikey, maxresults, playlistid);
    res.json(videos);
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    res.status(500).json({ error: 'An error occurred while fetching YouTube data' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
