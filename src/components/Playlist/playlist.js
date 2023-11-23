import React, {useCallback} from 'react';

import TrackList from '../TrackList/trackList';

import './playlist.css';

function Playlist(props) {
    const handleNameChange = useCallback(
        (event) => {
            props.onNameChange(event.target.value);
        },
        [props.onNameChange]
    );

    return (
        <div className='Playlist'>
            <label for='pTitle'>Playlist Title</label>
            <input id='pTitle' placeholder='Enter Title...' onChange={handleNameChange} defaultValue="New Playlist"/>
            <TrackList
                tracks={props.playlistTracks}
                isRemoval={true}
                onRemove={props.onRemove}
            />
            <button className='Playlist-save' onClick={props.onSave}>SAVE TO SPOTIFY</button>
        </div>
    );
};

export default Playlist;