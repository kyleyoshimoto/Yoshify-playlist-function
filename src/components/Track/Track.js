import React, {useCallback} from 'react';

import './track.css';

function Track(props) {
    const { trackFeatures } = props;

    const addTrack = useCallback(
        (event) => {
            props.onAdd(props.track, props.track.id);
        },
        [props.onAdd, props.track]
    );

    const removeTrack = useCallback(
        (event) => {
            props.onRemove(props.track);
        },
        [props.onRemove, props.track]
    );

    const renderAction = () => {
        if (props.isRemoval) {
            return (
                <button className="Track-action" onClick={removeTrack}>
                    -
                </button>
            );
        }
        return (
            <button className="Track-action" onClick={addTrack}>
                +
            </button>
        );
    };

    const renderAnalysis = () => {
        if (!props.trackFeatures) {
            console.log("No track features!!!!!")
            return <></>
        }
        if (props.analysisFeature === 'energy') {
            return (
                <div className='feature'>
                    <p>Energy:</p>
                    <p className="value">{(trackFeatures.energy * 100).toFixed(1)}</p>
                </div>
            )
        } else if (props.analysisFeature === 'danceability') {
            return (
                <div className='feature'>
                    <p>Danceability:</p>
                    <p className="value">{(trackFeatures.danceability * 100).toFixed(1)}</p>
                </div>
            )
        } else if (props.analysisFeature === 'loudness') {
            return (
                <div className='feature'>
                    <p>Loudness:</p>
                    <p className="value">{trackFeatures.loudness}</p>
                </div>
            )
        } else if (props.analysisFeature === 'tempo') {
            return (
                <div className='feature'>
                    <p>BPM:</p>
                    <p className="value">{(trackFeatures.tempo).toFixed(1)}</p>
                </div>
            )
        } else if (props.analysisFeature === 'valence') {
            return (
                <div className='feature'>
                    <p>Valence:</p>
                    <p className="value">{(trackFeatures.valence * 100).toFixed(1)}</p>
                </div>
            )
        } else {
            console.log("TRACK FEATURE ERROR");
            return <></>
        }
    }

    return (
        <div className="Track">
            <img src={props.track.albumCover} alt={props.track.album} />
            <div className="Track-information">
                <h3>{props.track.name}</h3>
                <p>{props.track.artist} | {props.track.album}</p>
            </div>
            {renderAnalysis()}
            {renderAction()}
        </div>
    );
};

export default Track;