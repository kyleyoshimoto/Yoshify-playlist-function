import React from 'react';

import './trackList.css';

import Track from '../Track/Track';

function TrackList(props) {
    return (
        <div className='Track-list'>
            {props.tracks.map((track) => {
                return (
            <Track 
                track={track} 
                key={track.id}
                getTrackDetails={props.getTrackDetails}
                analysisFeature={props.analysisFeature}
                onAdd={props.onAdd}
                isRemoval={props.isRemoval}
                onRemove={props.onRemove}
                onSearch={props.onSearch}
            />
            );
            })}
        </div>
    );
};

export default TrackList;