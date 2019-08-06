import * as React from 'react';
import { store, actions } from 'store';
import { Liveset } from 'models/Liveset';
import { Picker } from 'components/picker';

import { MiniMPK } from 'components/common/minimpk';
import { FullscreenIcon } from 'components/common/fullscreenIcon';
import { LivesetItem } from './LivesetPicker';

import './index.css';

// [komponent-class]: homescreen

export interface HomeProps {}

export interface HomeState {
  livesets: Liveset[];
  isLoadingLivesetContent: boolean;
  pickerIndex: number;
  pickerIsSelected: boolean;
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

  startLoad = this.startLoadListener.bind(this);
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
    this.startLoadListener();
  }

  startLoadListener() {
    const { livesets, pickerIndex } = this.state;
    const theLS = livesets[pickerIndex];
    if (!theLS || this.state.isLoadingLivesetContent) {
      return;
    }

    this.setState({
      isLoadingLivesetContent: true,
      pickerIsSelected: true
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
          this.setState({ isLoadingLivesetContent: false });
        }
      );
    }, 1000);
  }

  render() {
    let onLoad;
    if (this.state.isLoadingLivesetContent) {
      onLoad = <span>LOADING...</span>;
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
        <p>Start by picking one of the following set</p>
        <Picker
          data={this.state.livesets}
          component={LivesetItem}
          index={this.state.pickerIndex}
          isSelected={this.state.pickerIsSelected}
          onUpdate={this.updateListener}
        />
        {onLoad}
      </div>
    );
  }
}
