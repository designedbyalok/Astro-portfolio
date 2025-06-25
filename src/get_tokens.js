import { Buffer } from "buffer";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI || "https://www.designedbyalok.com/";
const code = process.env.SPOTIFY_AUTH_CODE;

const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

const res = await fetch("https://accounts.spotify.com/api/token", {
  method: "POST",
  headers: {
    Authorization: `Basic ${authHeader}`,
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
  }),
});

const data = await res.json();
// Store tokens securely instead of logging
// Consider using environment variables or secure storage

async function fetchNowPlaying() {
  const res = await fetch('/api/spotify-now-playing');
  const data = await res.json();
  if (!data.playing) {
    // handle not playing
    return;
  }
  // update UI with data.name, data.artists, data.albumArt
}