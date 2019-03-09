import * as React from 'react';
import { Mpk, MpkKey } from 'services/MpkController';
// import { List } from '../list/List';
// import { TrackComponent } from '../track/track';
// import { SequenceCraftr } from '../sequenceCraftr/SequenceCraftr';
import './index.css';
// import { setCurrentBit } from '../../actions';
// import store from 'store';

import { Deck } from 'models/Deck';

import { ProjectPicker } from './projectPicker';

// import { MiniMPK } from '../controllbar/minimpk/MiniMPK';

export interface HomeProps {}

export interface HomeState {
  step: number;
}

/**
 * Home component
 *
 * Components:
 * - ProjectPicker
 * - ProjectUploader
 * - ProjectStart
 */
export class Home extends React.Component<HomeProps, HomeState> {
  drapPos = 0;
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      step: 0
    };
    Mpk.takeControl({
      [MpkKey.nob1]: this.updatePos.bind(this)
    });
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
          <ProjectPicker
            projects={decks}
            selectedIndex={this.state.step}
            onChange={console.warn}
          />
        </div>
      </div>
    );
  }
}

const decks: Deck[] = [
  {
    name: 'minimal kit',
    version: 1,
    description: 'Audio deck for minimal kit',
    author: 'Sancho Gomez aka Wurst Offendr',
    repositories: [],
    pathBase: '/public/decks/',
    sets: []
  },
  {
    name: 'panorama',
    version: 1,
    description: 'Shadow dancin..',
    author: 'Ryan Elliot',
    repositories: [],
    pathBase: '/public/decks/',
    sets: []
  }
];
