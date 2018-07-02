import React, { Component } from 'react';
import Track from './components/track/track';

/**
 * Fun times:
 * 
 * <TiledLines gap={18} width={800} height={500} />
 */
class App extends Component {
  render() {
    return (
      <div>
        <Track/>
      </div>
    );
  }
}

export default App;
