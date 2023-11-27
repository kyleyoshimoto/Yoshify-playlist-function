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
  const [username, setUsername] = useState("User");
  const [userImage, setUserImage] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png")

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
    Spotify.getPlaylists().then(setPlaylists);
    Spotify.getUserProfile().then(response => {
      setUsername(response.name);
      setUserImage(response.imageUrl);
    })

  }, [savePlaylist]);


  return (
    <div className="App">
      <body>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Yoshify</h1>
        </header>
        <div className='App-playlist'>
          <div className="search">
            <SearchBar onSearch={search}/>
            <SearchResults 
              searchResults={searchResults}
              onAdd={addTracks}
            />
          </div>
          <Playlist 
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onNameChange={updatePlaylistName}
            onRemove={removeTracks}
            onSave={savePlaylist}
          />
          <Sidebar 
            playlists={playlists}
            username={username}
            userImage={userImage}
            />
        </div>
      </body>
    </div>
  );
};

export default App;