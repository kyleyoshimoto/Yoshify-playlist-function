import React from 'react';

import './trackList.css';

import Track from '../Track/Track';

function TrackList(props) {
    console.log("TTTTTTTTTTT TRACKLIST COMPONENT TTTTTTTTTTTT");
    console.log(props.trackFeatures);
    return (
        <div className='Track-list'>
            {props.tracks.map((track) => {
                let features = props.trackFeatures[track.id];
                console.log("********* TRACK FEATURES . ID **********");
                console.log(features);
                return (
            <Track 
                track={track} 
                key={track.id}
                trackFeatures={features}
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