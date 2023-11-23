import React, {useState, useCallback, useEffect} from 'react';

import Spotify from './Spotify';
import SearchBar from '../SearchBar/searchBar';
import SearchResults from '../SearchResults/searchResults';
import Playlist from '../Playlist/playlist';
import Sidebar from '../Sidebar/Sidebar';

import './App.css';
import logo from './logo.svg';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const search = useCallback((input) => {
    Spotify.search(input).then(setSearchResults)
  }, []);

  const addTracks = useCallback((track) => {
    if (playlistTracks.some((savedTrack) => savedTrack.id === track.id)) 
      return;

    setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    },
    [playlistTracks]
  );

  const removeTracks = useCallback((track) => {
    setPlaylistTracks((prevTracks) => 
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id))
  }, []);

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  }, [])

  const savePlaylist = useCallback(() => {
    const trackUris = playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  }, [playlistName, playlistTracks]);

  useEffect(() => {
    Spotify.getPlaylists().then(setPlaylists)
  }, [savePlaylist]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
	      <h1 className="App-title">Yoshify</h1>
      </header>
      <body>
        <SearchBar onSearch={search}/>
        <div className='App-playlist'>
          <SearchResults 
            searchResults={searchResults}
            onAdd={addTracks}
          />
          <Playlist 
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onNameChange={updatePlaylistName}
            onRemove={removeTracks}
            onSave={savePlaylist}
          />
          <Sidebar playlists={playlists} />
        </div>
      </body>
    </div>
  );
};

export default App;