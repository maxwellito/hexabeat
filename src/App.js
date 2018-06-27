import React, { Component } from 'react';
import TiledLines from './components/useless/tiledLines';
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
          <TiledLines gap={18} width={800} height={500} />
        </p>
      </div>
    );
  }
}

export default App;
