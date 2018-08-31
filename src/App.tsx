import * as React from "react";
import { Home } from './components/home/HomeScreen';
import { Track } from './components/track/track';
import { TiledLines } from './components/useless/tiledLines'

/**
 * Fun times:
 * 
 * <TiledLines gap={18} width={800} height={500} />
 */
export class App extends React.Component {
  render() {
    return (
      <div>
        <Home/>
        {/* <Track/>
        <TiledLines type={'red'} /> */}
      </div>
    );
  }
}