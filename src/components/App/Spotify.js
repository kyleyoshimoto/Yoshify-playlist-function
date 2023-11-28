const clientId = '';
const redirectUri = 'http://localhost:3000/'; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
const scopes = [
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
    "playlist-modify-public",
  ];
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${scopes.join("%20")}&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  getUserProfile() {
    const accessToken = Spotify.getAccessToken();
    return fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      return {
        name: jsonResponse.display_name,
        imageUrl: jsonResponse.images[0].url,
      }
    })
  },


  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&limit=10&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        albumCover: track.album.images[0].url,
        uri: track.uri,
      }));
    });
  },

  getPlaylists() {
    const accessToken = Spotify.getAccessToken();
    return fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then(response => {
        return response.json();
    }).then(jsonResponse => {
        if (!jsonResponse.items) {
            return [];
    }
        return jsonResponse.items.map(playlist => playlist.name);
    })
    },

  getTrackAudioFeatures(trackId) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/audio-features/${trackId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse) {
        return {};
      }
      return {
        id: jsonResponse.id,
        danceability: jsonResponse.danceability,
        energy: jsonResponse.energy,
        loudness: jsonResponse.loudness,
        tempo: jsonResponse.tempo,
        valence: jsonResponse.valence
      }
    })
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
  }
};

export default Spotify;
