// Vercel serverless function — Spotify "now playing".
// Requires env vars in Vercel project settings:
//   SPOTIFY_CLIENT_ID
//   SPOTIFY_CLIENT_SECRET
//   SPOTIFY_REFRESH_TOKEN
// Falls back to { playing: false } if any missing or API errors.
// Setup guide: https://benwiz.com/notes/create-spotify-refresh-token/

const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';

export default async function handler(req, res) {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    res.setHeader('Cache-Control', 'public, max-age=60');
    return res.status(200).json({ playing: false, reason: 'env_missing' });
  }

  try {
    const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
    const tokenRes = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: SPOTIFY_REFRESH_TOKEN,
      }),
    });

    if (!tokenRes.ok) {
      return res.status(200).json({ playing: false, reason: 'token_fail' });
    }
    const { access_token } = await tokenRes.json();

    const playRes = await fetch(NOW_PLAYING_URL, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (playRes.status === 204) {
      res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60');
      return res.status(200).json({ playing: false });
    }
    if (!playRes.ok) {
      return res.status(200).json({ playing: false, reason: `api_${playRes.status}` });
    }

    const data = await playRes.json();
    if (!data.item) {
      return res.status(200).json({ playing: false });
    }

    res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60');
    return res.status(200).json({
      playing: !!data.is_playing,
      title: data.item.name,
      artist: (data.item.artists || []).map((a) => a.name).join(', '),
      album: data.item.album?.name,
      art: data.item.album?.images?.[0]?.url,
      url: data.item.external_urls?.spotify,
    });
  } catch (err) {
    return res.status(200).json({ playing: false, reason: 'exception' });
  }
}
