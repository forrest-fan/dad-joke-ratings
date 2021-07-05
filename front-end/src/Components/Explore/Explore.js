import React from 'react';
import './Explore.css';

import Joke from "../Joke/Joke";

function Explore () {
    return (
        <div id="explore">
            <h1>Explore Community Rated Jokes</h1>
            <div id="sort-select">
                <span>Top Rated</span>
                <span>Most Reviews</span>
            </div>
            <div id="jokes">
                <Joke />
            </div>
        </div>
    );
}

export default Explore;