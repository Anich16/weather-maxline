import React from 'react';
import logo from './logo.svg';
import './App.css';
import WeatherContainer from "./redux/Weather/WeatherContainer";

function App() {
  return (
    <div className="App">
      <WeatherContainer />
    </div>
  );
}

export default App;
