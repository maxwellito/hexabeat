import * as React from 'react';
import { store, actions } from 'store';
import { Liveset } from 'models/Liveset';
import { Mpk, MpkKey } from 'services/MpkController';

import { MiniMPK } from 'components/common/minimpk';
import { LivesetPicker } from './LivesetPicker';

import './index.css';

export interface HomeProps {}

export interface HomeState {
  step: number;
  livesets: Liveset[];
}

/**
 * Home component
 *
 * Components:
 * - LivesetPicker
 * - LivesetUploader
 * - LivesetStart
 */
export class Home extends React.Component<HomeProps, HomeState> {
  drapPos = 0;

  unsubscribe = store.subscribe(() => {
    let newLivesets = store.getState().livesets;
    console.log('Hello', newLivesets);
    if (newLivesets !== this.state.livesets) {
      this.setState({
        livesets: newLivesets
      });
    }
  });

  startLoad = this.startLoadListener.bind(this);

  constructor(props: HomeProps) {
    super(props);
    this.state = {
      step: 0,
      livesets: store.getState().livesets
    };
    Mpk.takeControl({
      [MpkKey.nob1]: this.updatePos.bind(this)
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  updatePos(rel: number) {
    this.drapPos += rel;
    const step = Math.floor(this.drapPos / 5);
    if (step === this.state.step) {
      return;
    }
    console.log(step);
    this.setState({
      step
    });
  }

  startLoadListener(index: number) {
    const theLS = this.state.livesets[index];
    console.log(index, theLS);
    if (!theLS) {
      return;
    }

    theLS.loadAssets().then(
      () => {
        console.info('yay');
        store.dispatch(actions.setBpm(120));
        store.dispatch(actions.setCurrentBit(0));
        store.dispatch(actions.setSelectedTrack(null));
        store.dispatch(actions.setVolume(0.75));
        store.dispatch(actions.setLiveset(theLS));
      },
      e => console.warn
    );
  }

  render() {
    return (
      <div className='container'>
        <div />
        <div />
        <div />
        <div>
          <MiniMPK />
        </div>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div className='title'>
          <p>phontom.</p>
        </div>
        <div className='subtitle'>
          <p>welcome to the playground</p>
        </div>
        <div className='content'>
          <p>//// PROVIDE ON-BOARDING HELP ////</p>
          <LivesetPicker
            livesets={this.state.livesets}
            selectedIndex={this.state.step}
            onChange={this.startLoad}
          />
        </div>
      </div>
    );
  }
}
