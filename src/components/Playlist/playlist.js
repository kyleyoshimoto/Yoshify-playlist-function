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

    /*const featuresSummary = () => {
        console.log('ANALYSIS SUMMARY');
        console.log()
        if (props.analysisFeature === 'energy') {
            let sum = 0;
            for (let i = 0; i < props.featuresSummary.length; i++) {
                sum += props.featuresSummary[i].energy;
            }
            return (
                <div className='feature-sum'>
                    <p>Playlist Energy:</p>
                    <p>{sum / props.featuresSummary.length}</p>
                </div>
            )
        } else if (props.analysisFeature === 'danceability') {
            let sum = 0;
            for (let i = 0; i < props.featuresSummary.length; i++) {
                sum += props.featuresSummary[i].danceability;
            }
            return (
                <div className='feature-sum'>
                    <p>Danceability:</p>
                    <p>{sum / props.featuresSummary.length}</p>
                </div>
            )
        } else if (props.analysisFeature === 'loudness') {
            let sum = 0;
            for (let i = 0; i < featuresSummary.length; i++) {
                sum += props.featuresSummary[i].loudness;
            }
            return (
                <div className='feature-sum'>
                    <p>Loudness:</p>
                    <p>{sum / props.featuresSummary.length}</p>
                </div>
            )
        } else if (props.analysisFeature === 'tempo') {
            let sum = 0;
            for (let i = 0; i < props.featuresSummary.length; i++) {
                sum += props.featuresSummary[i].tempo;
            }
            return (
                <div className='feature-sum'>
                    <p>BPM:</p>
                    <p>{sum / props.featuresSummary.length}</p>
                </div>
            )
        } else if (props.analysisFeature === 'valence') {
            let sum = 0;
            for (let i = 0; i < props.featuresSummary.length; i++) {
                sum += props.featuresSummary[i].valence;
            }
            return (
                <div className='feature-sum'>
                    <p>Valence:</p>
                    <p>{sum / props.featuresSummary.length}</p>
                </div>
            )
        } else {
            return <></>
        }
    }*/

    return (
        <div className='Playlist'>
            <label for='pTitle'>Playlist Title</label>
            <input id='pTitle' placeholder='Enter Title...' onChange={handleNameChange} defaultValue="New Playlist"/>
            {/*featuresSummary()*/}
            <hr />
            <button className='Playlist-save' onClick={props.onSave}>SAVE TO SPOTIFY</button>
            <TrackList
                tracks={props.playlistTracks}
                trackFeatures={props.trackFeatures}
                analysisFeature={props.analysisFeature}
                isRemoval={true}
                onRemove={props.onRemove}
            />
        </div>
    );
};

export default Playlist;