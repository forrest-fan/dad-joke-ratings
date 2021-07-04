import React from 'react';
import './Navbar.css';

function Navbar() {
    return (
        <div id="navbar">
            <li id="home">Dad Joke Ratings</li>
            <div id="nav-links">
                <li id="jokes" className="active">Jokes</li>
                <li id="explore">Explore</li>
                {/* <li id="login">Login</li> */}
            </div>
        </div>
    );
}

export default Navbar;