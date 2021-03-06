import * as React from 'react';
import { store, actions } from 'store';
import { Liveset } from 'models/Liveset';
import { Picker } from 'components/picker';
import { MiniMPK } from 'components/common/minimpk';
import { LivesetItem } from './LivesetPicker';
import themeService from 'services/Theme';

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
    if (this.state.pickerIsSelected) {
      return;
    }
    this.setState({
      pickerIndex: index
    });
    if (!isSelected) {
      return;
    }
    const { livesets, pickerIndex } = this.state;

    if (!livesets[index]) {
      const livesetPath = prompt('Provide the URL to your liveset');
      if (!livesetPath) {
        return;
      }
      this.loadLiveset(livesetPath);
    } else {
      const theLS = livesets[pickerIndex];
      this.loadLivesetAssets(theLS);
    }
    this.setState({
      pickerIsSelected: true
    });
  }

  loadLiveset(livesetPath: string) {
    this.setState({
      currentAction: 'Loading liveset config...'
    });
    const newLiveset = new Liveset(livesetPath);
    newLiveset.loadConfig().then(
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
      currentAction: 'Loading liveset content...'
    });

    setTimeout(() => {
      theLS.loadAssets().then(
        () => {
          console.info('LIVESET LOADED');
          this.disconnect();
          store.dispatch(actions.play(true));
          store.dispatch(actions.setBpm(120));
          store.dispatch(actions.setCurrentBit(0));
          store.dispatch(actions.setSelectedTrack(null));
          store.dispatch(actions.setVolume(0.75));
          store.dispatch(actions.setGitRepositories(theLS.repoData));
          store.dispatch(actions.setLiveset(theLS));
          themeService.set(theLS.theme);
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
    return (
      <div className='homescreen'>
        <div className='homescreen-head strokegrid-row'>
          <div>
            <img
              src='public/img/hexabeat-logo.svg'
              className='homescreen-logo'
            />
          </div>
          <div>
            <img
              src='public/img/hexabeat-title.svg'
              className='homescreen-logo'
            />
          </div>
        </div>
        <div className='strokegrid-row'>
          <div>
            <p>Express the beats from hidden commits.</p>
            <p>
              HexaBeat is a sequencer using commits from GitHub to make beats.
              <br />
              It takes a config file as input defining groups of sounds and
              repositories to extract commits from.
              <br />
              Then mix and match commits and algorithms to make an infinite
              combinaisons of sequences.
              <br />
              The app can be fully controlled via{' '}
              <a href='https://github.com/maxwellito/hexabeat#usage'>
                Akai MiniMPK device
              </a>
              .
              <br />
              Wide screen is required.
            </p>
          </div>
        </div>
        <div className='strokegrid-row'>
          <div>
            <p>Double click anywhere to go fullscreen.</p>
          </div>
          <MiniMPK />
        </div>
        <div className='strokegrid-row'>
          <div>
            <p>Pick one of the following liveset to start.</p>
          </div>
        </div>
        <div className='homescreen-picker-wrap'>
          <Picker
            data={this.state.livesets}
            component={LivesetItem}
            index={this.state.pickerIndex}
            isSelected={this.state.pickerIsSelected}
            onUpdate={this.updateListener}
          />
        </div>
        <div className='strokegrid-row'>
          <div className='homescreen-action-label'>
            <p className='homescreen-action-label'>
              {this.state.currentAction}
            </p>
          </div>
          <div>
            <p className='homescreen-credits'>
              <span>by </span>
              <a href='https://twitter.com/mxwllt'>
                <svg>
                  <use href='#icon-maxwellito' />
                </svg>
              </a>
              <span> / on </span>
              <a href='https://github.com/maxwellito/hexabeat'>
                <svg>
                  <use href='#icon-github' />
                </svg>
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
