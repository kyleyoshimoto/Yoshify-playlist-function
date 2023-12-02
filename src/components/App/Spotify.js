const client_id = 'e387fa01d3fa40aaa56e3c2a097c2156';
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
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=${scopes.join("%20")}&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  getUserProfile() {
    const accessToken = Spotify.getAccessToken();
    return fetch('https://api.spotify.com/v1/me', {
      headers: {Authorization: `Bearer ${accessToken}`}
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
    return fetch(`https://api.spotify.com/v1/search?type=track&limit=24&q=${term}`, {
      headers: {Authorization: `Bearer ${accessToken}`}
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

  getTrackAudioFeatures(term) {
    const accessToken = Spotify.getAccessToken();
    
    return fetch(`https://api.spotify.com/v1/search?type=track&limit=24&q=${term}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      const trackIds = jsonResponse.tracks.items.map(track => track.id);
      return fetch(`https://api.spotify.com/v1/audio-features?ids=${trackIds.join(",")}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(jsonResponse => {
        if (!jsonResponse.audio_features) {
          return {};
        }
        const features = {};
        for (let i = 0; i < jsonResponse.audio_features.length; i++) {
          const audioFeature = jsonResponse.audio_features[i];
          features[audioFeature.id] = {
            danceability: audioFeature.danceability,
            energy: audioFeature.energy,
            loudness: audioFeature.loudness,
            tempo: audioFeature.tempo,
            valence: audioFeature.valence
          };
        }
        console.log('TrackAudioFeatures -------');
        console.log(features);
        return features;
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      // Handle error scenarios here
      return {};
    });
  },
  

  /*getTrackAudioFeatures(trackIds) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/audio-features?ids=${trackIds}`, {
      headers: headers
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.audio_features) {
        return {};
      }
      let features = {};
      console.log('jsonResponse.audio_features');
      console.log(jsonResponse.audio_features);
      for (let i = 0; i < jsonResponse.audio_features.length; i++) {
        console.log('yes');
        features[jsonResponse.audio_features[i].id] = {
          danceability: jsonResponse.audio_features[i].danceability,
          energy: jsonResponse.audio_features[i].energy,
          loudness: jsonResponse.audio_features[i].loudness,
          tempo: jsonResponse.audio_features[i].tempo,
          valence: jsonResponse.audio_features[i].valence
        }
      };
      console.log('TrackAudioFeatures -------');
      console.log(features);
      return features;
    })
  },*/

  getPlaylists() {
    const accessToken = Spotify.getAccessToken();
    return fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => {
        return response.json();
    }).then(jsonResponse => {
        if (!jsonResponse.items) {
            return [];
    }
        return jsonResponse.items.map(playlist => playlist.name);
    })
    },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = {Authorization: `Bearer ${accessToken}`};
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
