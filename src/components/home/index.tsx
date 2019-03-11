import * as React from 'react';
import { Mpk, MpkKey } from 'services/MpkController';
// import { List } from '../list/List';
// import { TrackComponent } from '../track/track';
// import { SequenceCraftr } from '../sequenceCraftr/SequenceCraftr';
import './index.css';
// import { setCurrentBit } from '../../actions';
// import store from 'store';
import store from 'store';
import { Liveset } from 'models/Liveset';

import { LivesetPicker } from './LivesetPicker';

// import { MiniMPK } from '../controllbar/minimpk/MiniMPK';

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
  render() {
    return (
      <div className='container'>
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
            onChange={console.warn}
          />
        </div>
      </div>
    );
  }
}
