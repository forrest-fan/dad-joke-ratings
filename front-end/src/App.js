import React from 'react';
import Jokes from './Components/Jokes/Jokes';
import Navbar from './Components/Navbar/Navbar';
import './App.css';

function App() {
  return (
    <div id="app-container">
      <Navbar />
      <Jokes />
    </div>
  );
}

export default App;
