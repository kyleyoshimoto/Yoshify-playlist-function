import React from 'react';

import './searchResults.css';

import TrackList from '../TrackList/trackList';

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='Search-results'>
                <h2>Tracks</h2>
                <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} />
            </div>
        );
    }
}


export default SearchResults;