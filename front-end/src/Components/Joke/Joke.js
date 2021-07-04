import React, { useState, useEffect } from 'react';
import './Joke.css';

function Joke() {
    const [joke, setJoke] = useState({});
    const [rateFormStars, setRateFormStars] = useState(0);
    const [rateFormMessage, setRateFormMessage] = useState('');
    const [rateFormName, setRateFormName] = useState('');
    const [rating, setRating] = useState({})
    // const [ratings, setRatings] = useState([]);


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
                        } else {
                            setJoke({
                                joke: dadJoke.joke,
                                id: dadJoke.id,
                                stars: 0,
                                count: 0
                            });
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
        // Create request body
        let request = {
            id: joke.id,
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
                    alert("successfully added");
                } else {
                    // Error response
                    alert("there was an error");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="App">
            <h1 onClick={getJoke}>{joke.joke}</h1>
            <div id="reviews">
                <h2>Reviews</h2>
                <div className="write-review">
                    <div>
                        <input type="number" min="0" max="5" placeholder="stars" name="stars" value={rateFormStars} onChange={(e) => {
                            setRateFormStars(e.target.value);
                        }} />
                        <textarea placeholder="Message" name="message" value={rateFormMessage} onChange={(e) => {
                            setRateFormMessage(e.target.value);
                        }} />
                        <input placeholder="Name" name="name" value={rateFormName} onChange={(e) => {
                            setRateFormName(e.target.value);
                        }} />
                        <button onClick={newRating}>Submit Review</button>
                    </div>
                </div>
                <div className="read-reviews">
                    <div className="star-container">
                        <i className={"fa-star " + (joke.stars > 0 ? "fas" : "far")}></i>
                        <i className={"fa-star " + (joke.stars > 1 ? "fas" : "far")}></i>
                        <i className={"fa-star " + (joke.stars > 2 ? "fas" : "far")}></i>
                        <i className={"fa-star " + (joke.stars > 3 ? "fas" : "far")}></i>
                        <i className={"fa-star " + (joke.stars > 4 ? "fas" : "far")}></i>
                        {joke.stars} stars
          </div>
                    <p>{joke.count > 0 ? joke.count + " reviews" : "No reveiws yet. Be the first to leave one"}</p>
                    {/* {ratings.map((rate) => {
            return (
              <div>
                <p>Stars: {rate.stars}</p>
                <p>{rate.count} reviews</p>
              </div>
            );
          })} */}
                </div>
            </div>
        </div>
    );
}

export default Joke;