import React, {useState} from 'react'
import './App.css';

function App() {
  const [joke, setJoke] = useState({
    joke: "Click to get a joke"
  });
  return (
    <div className="App">
      <h1 onClick={() => {
        fetch("https://icanhazdadjoke.com/", {
          headers: {
            Accept: "application/json"
          }
        })
          .then((res) => res.text())
          .then((json) => setJoke(JSON.parse(json)));
      }}>{joke.joke}</h1>
    </div>
  );
}

export default App;
