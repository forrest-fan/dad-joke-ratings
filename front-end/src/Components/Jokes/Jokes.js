import React, { useState, useEffect } from 'react';
import './Jokes.css';

import Review from "../Review/Review";

function Joke() {
    const [joke, setJoke] = useState({
        joke: "Click to get a joke",
        id: 123,
        stars: 0,
        count: 0
    });
    const [rateFormStars, setRateFormStars] = useState(0);
    const [rateFormMessage, setRateFormMessage] = useState('');
    const [rateFormName, setRateFormName] = useState('');
    const [ratings, setRatings] = useState([]);


    // useEffect(() => {
    // fetch("http://localhost:5000/ratings")
    //   .then((res) => res.text())
    //   .then((json) => {
    //     console.log(json);
    //     setRatings(JSON.parse(json));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // }, []);

    function getJoke() {
        // Fetch joke from Dad Joke API
        fetch("https://icanhazdadjoke.com/", {
            headers: {
                Accept: "application/json"
            }
        })
            .then((res) => res.text())
            .then((json) => {
                // Get this joke's ratings from MongoDB
                let dadJoke = JSON.parse(json);
                let searchURL = "http://localhost:5000/ratings/byId?id=" + dadJoke.id;
                fetch(searchURL)
                    .then((res2) => res2.text())
                    .then((json2) => {
                        json2 = JSON.parse(json2);
                        // If joke exists in db, set joke with stars & count, otherwise set stars & count to 0
                        if (json2.length > 0) {
                            setJoke({
                                joke: dadJoke.joke,
                                id: dadJoke.id,
                                stars: json2[0].stars,
                                count: json2[0].count
                            });
                            setRatings(json2[0].reviews);
                        } else {
                            setJoke({
                                joke: dadJoke.joke,
                                id: dadJoke.id,
                                stars: 0,
                                count: 0
                            });
                            setRatings([]);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        // Call get joke on app load
        getJoke();
    }, []);

    function newRating() {
        if (rateFormStars > 0) {
            // Create request body
            let request = {
                id: joke.id,
                joke: joke.joke,
                stars: rateFormStars,
                message: rateFormMessage,
                name: rateFormName
            };
            // Post request to express app
            fetch("http://localhost:5000/ratings/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            })
                .then((res) => res.text())
                .then((text) => {
                    if (text === "success") {
                        // Success response
                        setRatings([ {
                            stars: request.stars,
                            name: request.name,
                            message: request.message,
                            timestamp: new Date()
                        }, ...ratings]);
                        setRateFormMessage("");
                        setRateFormName("");
                        setRateFormStars(0);
                        let newStars = Math.round((joke.stars * joke.count + request.stars) * 100 / (joke.count + 1)) / 100;
                        console.log(newStars);
                        setJoke({
                            joke: joke.joke,
                            id: joke.id,
                            stars: newStars,
                            count: joke.count + 1
                        });
                    } else {
                        // Error response
                        alert("There was an error");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            alert("Please give a rating from 1 to 5 stars.");
        }
        
    }

    return (
        <div id="joke-container">
            <div onClick={getJoke} className="the-joke">{joke.joke}</div>
            <div id="reviews">
                <h2>Reviews</h2>
                <div id="reviews-flex">
                    <div className="write-review">
                        <h3>Leave a review</h3>
                        <div>
                            <div className="star-container">
                                <i
                                    className={"rateStar fa-star " + (rateFormStars > 0 ? "fas" : "far")}
                                    onClick={() => setRateFormStars(1)}></i>
                                <i
                                    className={"rateStar fa-star " + (rateFormStars > 1 ? "fas" : "far")}
                                    onClick={() => setRateFormStars(2)}></i>
                                <i
                                    className={"rateStar fa-star " + (rateFormStars > 2 ? "fas" : "far")}
                                    onClick={() => setRateFormStars(3)}></i>
                                <i
                                    className={"rateStar fa-star " + (rateFormStars > 3 ? "fas" : "far")}
                                    onClick={() => setRateFormStars(4)}></i>
                                <i
                                    className={"rateStar fa-star " + (rateFormStars > 4 ? "fas" : "far")}
                                    onClick={() => setRateFormStars(5)}></i>
                            </div>
                            <textarea placeholder="Message" name="message" maxLength="250" value={rateFormMessage} onChange={(e) => {
                                setRateFormMessage(e.target.value);
                            }} ></textarea>
                            <div className="textarea-counter">{rateFormMessage.length} / 250</div>
                            <input placeholder="Name" name="name" value={rateFormName} onChange={(e) => {
                                setRateFormName(e.target.value);
                            }} />
                            <button onClick={newRating}>Submit Review</button>
                        </div>
                    </div>
                    <div className="read-reviews">
                        <div className="star-container avg-rating">
                            <i className={"fa-star " + (joke.stars > 0 ? "fas" : "far")}></i>
                            <i className={"fa-star " + (joke.stars > 1 ? "fas" : "far")}></i>
                            <i className={"fa-star " + (joke.stars > 2 ? "fas" : "far")}></i>
                            <i className={"fa-star " + (joke.stars > 3 ? "fas" : "far")}></i>
                            <i className={"fa-star " + (joke.stars > 4 ? "fas" : "far")}></i>
                            <span>{joke.stars}/5 stars</span>
                        </div>
                        <p className="review-count">{ratings.length > 1 ? ratings.length + " reviews" : ratings.length === 1 ? "1 review" : "No reviews yet. Be the first to leave one"}</p>
                        {ratings.map((r, i) => {
                            return (
                                <Review
                                    stars={r.stars}
                                    message={r.message}
                                    name={r.name}
                                    timestamp={r.timestamp}
                                    key={i}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Joke;