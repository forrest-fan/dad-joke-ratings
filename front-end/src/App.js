import React from 'react';
import Joke from './Components/Joke/Joke';
import Navbar from './Components/Navbar/Navbar';
import './App.css';

function App() {
  return (
    <div id="app-container">
      <Navbar />
      <Joke />
    </div>
  );
}

export default App;
