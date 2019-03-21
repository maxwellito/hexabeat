import * as React from 'react';
import { Provider } from 'react-redux';
import store from 'store';
import { Home } from './components/home/index';
// import { TiledLines } from './components/useless/tiledLines'
import { Playground } from 'components/screens/playground';

interface AppState {
  livesetReady: boolean;
}
/**
 * Fun times:
 *
 * <TiledLines gap={18} width={800} height={500} />
 */
export class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      livesetReady: false
    };

    store.subscribe(() => {
      let gotLiveset = !!store.getState().session.liveset;
      if (gotLiveset !== this.state.livesetReady) {
        this.setState({
          livesetReady: gotLiveset
        });
      }
    });
  }
  render() {
    let screen = this.state.livesetReady ? <Playground /> : <Home />;
    return <Provider store={store}>{screen}</Provider>;
  }
}
