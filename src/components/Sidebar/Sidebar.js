import React from 'react';

import './Sidebar.css';

function Sidebar(props) {
    return (
        <div className="sidebar">
            <h2>Playlists</h2>
            <hr />
            {props.playlists.map((playlist) => {
                return (
                    <p>{playlist}</p>
                );
            })}
        </div>
    );
};

export default Sidebar;