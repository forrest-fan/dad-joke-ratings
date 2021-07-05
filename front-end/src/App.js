import React, { useState } from 'react';
import Jokes from './Components/Jokes/Jokes';
import Navbar from './Components/Navbar/Navbar';
import Explore from './Components/Explore/Explore';
import './App.css';

function App() {
  const [page, setPage] = useState("explore");


  return (
    <div id="app-container">
      <Navbar 
        active={page}
        setJoke={() => {
          setPage("jokes")
        }}
        setExplore={() => {
          setPage("explore")
        }}/>
      {page === "jokes" ?
        <Jokes /> :
        <Explore />
      }
      
    </div>
  );
}

export default App;
