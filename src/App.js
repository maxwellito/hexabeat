import React, { Component } from 'react';
import TiledLines from './components/useless/tiledLines';
import LevelMeter from './components/track/levelMeter/levelMeter';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <LevelMeter progress={.6}/>
          <TiledLines gap={18} width={800} height={500} />
        </p>
      </div>
    );
  }
}

export default App;
