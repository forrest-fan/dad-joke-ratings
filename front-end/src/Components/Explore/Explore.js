import React, {useState, useEffect} from 'react';
import './Explore.css';

import Joke from "../Joke/Joke";

function Explore () {
    const [sort, setSort] = useState("stars");
    const [jokes, setJokes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/ratings")
            .then((res) => res.text())
            .then((json) => {
                let jokesArr = JSON.parse(json);
                if (sort === "stars") {
                    jokesArr.sort((a, b) => b.stars - a.stars);
                } else {
                    jokesArr.sort((a, b) => b.count - a.count);
                }
                
                setJokes(jokesArr);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div id="explore">
            <h1>Explore Community Rated Jokes</h1>
            <div id="sort-select">
                <span
                    className={sort === "stars" ? "selected" : ""}
                    onClick={() => {setSort("stars")}}>Top Rated</span>
                <span
                    className={sort === "count" ? "selected" : ""}
                    onClick={() => {setSort("count")}}>Most Reviews</span>
            </div>
            <div id="jokes">
                {[].concat(jokes).sort((a, b) => {
                    if (sort === "stars") {
                        return b.stars - a.stars;
                    } else {
                        return b.count - a.count;
                    }
                }).map((j, i) => {
                    return (
                        <Joke
                            id={j.id}
                            joke={j.joke}
                            stars={j.stars}
                            count={j.count}
                            reviews={j.reviews}
                            key={j.id + "-" + i}
                            index={i + 1}/>
                    );
                })}
            </div>
        </div>
    );
}

export default Explore;