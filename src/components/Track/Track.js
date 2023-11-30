import React, {useCallback} from 'react';

import './track.css';

function Track(props) {
    const [trackFeatures, setTrackFeatures] = useState([]);

    const getTrackFeatures = useCallback(
        (event) => {
            props.getTrackDetails(props.track.id).then(setTrackFeatures)
        },
        [props.onSearch]
    );

    /*useEffect(() => {
        props.getTrackDetails(props.track.id).then(setTrackFeatures)
    }, [props.onSearch]);*/

    console.log(trackFeatures);

    const addTrack = useCallback(
        (event) => {
            props.onAdd(props.track);
        },
        [onAdd, track]
    );

    const removeTrack = useCallback(
        (event) => {
            onRemove(track);
        },
        [onRemove, track]
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
        if (props.analysisFeature == 'energy') {
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
    }*/

    return (
        <div className="Track" onLoad={getTrackFeatures}>
            <img src={props.track.albumCover} alt={props.track.album} />
            <div className="Track-information">
                <h3>{track.name}</h3>
                <p>{track.artist} | {track.album}</p>
            </div>
            {/*renderAnalysis()*/}
            {renderAction()}
        </div>
    );
};

export default Track;