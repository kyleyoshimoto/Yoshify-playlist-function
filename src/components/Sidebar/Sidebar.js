import React from 'react';

import './Sidebar.css';

function Sidebar(props) {
    return (
        <div className="sidebar">
            <div className="userInfo">
                <img alt={props.username} src={props.userImage}/>
                <h3>{props.username}</h3>  
            </div>
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