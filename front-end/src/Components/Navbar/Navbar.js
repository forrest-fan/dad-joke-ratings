import React from 'react';
import './Navbar.css';

function Navbar(props) {
    return (
        <div id="navbar">
            <li id="home">Dad Joke Ratings</li>
            <div id="nav-links">
                <li id="jokes" onClick={props.setJoke} className={props.active === "jokes" ? "active" : ""}>Jokes</li>
                <li id="explore" onClick={props.setExplore} className={props.active === "explore" ? "active" : ""}>Explore</li>
                {/* <li id="login">Login</li> */}
            </div>
        </div>
    );
}

export default Navbar;