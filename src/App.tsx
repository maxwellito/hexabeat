import * as React from "react";
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
        <Track/>
        <TiledLines type={'red'} />
      </div>
    );
  }
}