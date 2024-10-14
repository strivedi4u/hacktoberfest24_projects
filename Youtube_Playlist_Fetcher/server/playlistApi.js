const axios = require('axios');

async function getPlaylistVideos(apikey, maxresults, playlistid) {
  if (!playlistid) {
    throw new Error('Playlist ID is required');
  }

  try {
    const youtubeurl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxresults}&playlistId=${playlistid}&key=${apikey}`;

    const response = await axios.get(youtubeurl);
    const json = response.data;

    if (!json.items || json.items.length === 0) {
      return [];
    }

    const videos = json.items.map(item => {
      const snippet = item.snippet;
      const thumbnail = snippet.thumbnails.medium
        ? snippet.thumbnails.medium.url
        : snippet.thumbnails.default.url;
      const videoid = snippet.resourceId.videoId;
      const title = snippet.title;
      const description = snippet.description;
      const publishedAt = snippet.publishedAt;

      return {
        thumbnail,
        videoid,
        title,
        description,
        publishedAt,
        embedUrl: `https://www.youtube.com/embed/${videoid}`
      };
    });

    return videos;
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    if (error.response && error.response.data) {
      console.error('YouTube API Error:', error.response.data);
    }
    throw new Error('Failed to fetch playlist data from YouTube API');
  }
}

module.exports = { getPlaylistVideos };