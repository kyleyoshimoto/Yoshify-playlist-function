import React, {useCallback} from 'react';

import TrackList from '../TrackList/trackList';

import './playlist.css';

function Playlist(props) {
    const { onNameChange } = props;

    const handleNameChange = useCallback(
        (event) => {
            onNameChange(event.target.value);
        },
        []
    );

    return (
        <div className='Playlist'>
            <label for='pTitle'>Playlist Title</label>
            <input id='pTitle' placeholder='Enter Title...' onChange={handleNameChange} defaultValue="New Playlist"/>
            <hr />
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