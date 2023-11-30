import React from 'react';

import './searchResults.css';

import TrackList from '../TrackList/trackList';

function SearchResults(props) {
    console.log("XXXXXXXXXX SEARCH RESULTS COMPONENT XXXXXXXXXX");
    console.log(props.trackFeatures);
    return (
        <div className='Search-results'>
            <h2>Search Results</h2>
            <hr />
            {props.searchResults.length == 0 
                ? <p>...</p> 
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