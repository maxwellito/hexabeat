import * as React from 'react';
import { store, actions } from 'store';
import { Liveset } from 'models/Liveset';
import { Picker } from 'components/picker';
import { LivesetItem } from './LivesetPicker';

import { DigitalNob } from 'components/common/digitalNob';

import './index.css';

// [komponent-class]: homescreen

export interface HomeProps {}

export interface HomeState {
  livesets: Liveset[];
  isLoadingLivesetContent: boolean;
  pickerIndex: number;
  pickerIsSelected: boolean;
  currentAction?: string;
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

  updateListener = this.onUpdate.bind(this);

  unsubscribeStore = store.subscribe(() => {
    let newLivesets = store.getState().livesets;
    if (newLivesets !== this.state.livesets) {
      this.setState({
        livesets: [...newLivesets, null]
      });
    }
  });

  constructor(props: HomeProps) {
    super(props);
    this.state = {
      livesets: store.getState().livesets,
      isLoadingLivesetContent: false,
      pickerIndex: 0,
      pickerIsSelected: false
    };
  }

  disconnect() {
    this.unsubscribeStore();
  }

  updatePos(rel: number) {
    this.drapPos += rel;
    const pickerIndex = Math.floor(this.drapPos / 5);
    if (pickerIndex === this.state.pickerIndex) {
      return;
    }
    this.setState({
      pickerIndex
    });
  }

  onUpdate(index: number, isSelected: boolean) {
    this.setState({
      pickerIndex: index
    });
    if (!isSelected) {
      return;
    }
    const { livesets, pickerIndex } = this.state;
    if (!livesets[index]) {
      this.loadLiveset(prompt('Provide the URL to your liveset'));
    } else {
      const theLS = livesets[pickerIndex];
      this.loadLivesetAssets(theLS);
    }
  }

  loadLiveset(livesetPath: string) {
    const newLiveset = new Liveset(livesetPath);
    newLiveset
      .loadConfig()
      .then(
        theLS => this.loadLivesetAssets(theLS),
        err => this.setState({ currentAction: err.message })
      );
  }

  loadLivesetAssets(theLS: Liveset) {
    if (!theLS || this.state.isLoadingLivesetContent) {
      return;
    }

    this.setState({
      isLoadingLivesetContent: true,
      pickerIsSelected: true,
      currentAction: 'Loading...'
    });

    setTimeout(() => {
      theLS.loadAssets().then(
        () => {
          console.info('LIVESET LOADED');
          this.disconnect();
          store.dispatch(actions.setBpm(120));
          store.dispatch(actions.setCurrentBit(0));
          store.dispatch(actions.setSelectedTrack(null));
          store.dispatch(actions.setVolume(0.75));
          store.dispatch(actions.setGitRepositories(theLS.repoData));
          store.dispatch(actions.setLiveset(theLS));
        },
        e => {
          console.warn(e);
          this.setState({
            isLoadingLivesetContent: false,
            currentAction: e.message
          });
        }
      );
    }, 1000);
  }

  render() {
    let currentAction;
    if (this.state.currentAction) {
      currentAction = (
        <p className='homescreen-action-label'>{this.state.currentAction}</p>
      );
    }
    return (
      <div className='homescreen'>
        <h1>phontom.</h1>
        <p>Express the beats from hidden commits.</p>
        <p>
          Phontom is a sequencer using commits from GitHub to make beats.
          <br />
          It takes a config file as input defining groups of sounds and
          repositories to extract commits from.
          <br />
          Then mix and match commits and algorithms to make an infinite
          combinaisons of sequences.
          <br />
          The app can be fully controlled via Akai MiniMPK device.
          <br />
          More resources to get started on this tutorial
        </p>
        <DigitalNob
          onUpdate={e => {
            console.log('>>', e);
          }}
        >
          <p>Start by picking one of the following set</p>
        </DigitalNob>
        <Picker
          data={this.state.livesets}
          component={LivesetItem}
          index={this.state.pickerIndex}
          isSelected={this.state.pickerIsSelected}
          onUpdate={this.updateListener}
        />
        {currentAction}
      </div>
    );
  }
}
