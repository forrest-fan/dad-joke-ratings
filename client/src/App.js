import React, {useState, useEffect} from 'react'
import './App.css';

function App() {
  const [joke, setJoke] = useState({
    joke: "Click to get a joke"
  });
  const [ratings, setRatings] = useState([]);


  useEffect(() => {
    fetch("http://localhost:5000/ratings")
      .then((res) => res.text())
      .then((json) => {
        console.log(json);
        setRatings(JSON.parse(json));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <h1 onClick={() => {
        fetch("https://icanhazdadjoke.com/", {
          headers: {
            Accept: "application/json"
          }
        })
          .then((res) => res.text())
          .then((json) => {
            setJoke(JSON.parse(json));
          })
          .catch((err) => {
            console.log(err);
          });
      }}>{joke.joke}</h1>
      <h2>Ratings</h2>
      {ratings.map((rate) => {
        return (
          <div>
            <p>Stars: {rate.stars}</p>
            <p>{rate.count} reviews</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
