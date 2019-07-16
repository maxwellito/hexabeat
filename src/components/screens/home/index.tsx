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
        <div />
        <div />
        <div>
          <FullscreenIcon />
        </div>
        <div>
          <MiniMPK shortTag={false} />
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
          <Picker
            data={this.state.livesets}
            component={LivesetItem}
            index={this.state.pickerIndex}
            isSelected={this.state.pickerIsSelected}
            onUpdate={this.updateListener}
          />
          {onLoad}
        </div>
      </div>
    );
  }
}
