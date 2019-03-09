import * as React from 'react';
import { Provider } from 'react-redux';
import store from 'store';
import { Home } from './components/home/index';
// import { TiledLines } from './components/useless/tiledLines'

/**
 * Fun times:
 *
 * <TiledLines gap={18} width={800} height={500} />
 */
export class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Home />
        {/* <Track/>
        <TiledLines type={'red'} /> */}
      </Provider>
    );
  }
}
