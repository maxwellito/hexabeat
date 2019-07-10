import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store';

import { Home } from 'components/screens/home';
import { Playground } from 'components/screens/playground';
import { MpkHelper } from 'components/common/mpkHelper';

interface AppState {
  livesetReady: boolean;
}

/**
 * Root component
 * Switch between screen depending on the
 * app store.
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
    return (
      <Provider store={store}>
        <MpkHelper />
        {screen}
      </Provider>
    );
  }
}
