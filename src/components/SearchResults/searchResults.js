import React from 'react';

import './searchResults.css';

import TrackList from '../TrackList/trackList';

function SearchResults(props) {
    return (
        <div className='Search-results'>
            <h2>Search Results</h2>
            <hr />
            {props.searchResults.length == 0 
                ? <h2>Search Results</h2> 
                : <TrackList 
                    tracks={props.searchResults}
                    trackFeatures={props.trackFeatures}
                    onAdd={props.onAdd} 
                    analysisFeature={props.analysisFeature}
                    onSearch={props.onSearch}
                    />
            }
        </div>
    );
};


export default SearchResults;