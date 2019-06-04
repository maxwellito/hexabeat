import * as React from 'react';
import { store, actions } from 'store';
import Track from 'models/Track';
import './index.css';

// [komponent-class]: trackswitch

export interface TrackSwitchProps {
  track: Track;
}

export interface TrackSwitchState {
  currentSoloTrack?: Track;
}

export class TrackSwitch extends React.Component<
  TrackSwitchProps,
  TrackSwitchState
> {
  isDead = false;
  unsubscribeStore = store.subscribe(() => {
    if (this.isDead) {
      return;
    }
    let soloTrack = store.getState().session.soloTrack;
    if (soloTrack !== this.state.currentSoloTrack) {
      this.setState({
        currentSoloTrack: soloTrack
      });
    }
    let currentBit = store.getState().session.currentBit;
    if (currentBit === 0) {
      this.setState({});
    }
  });

  constructor(props: TrackSwitchProps) {
    super(props);
    this.state = {
      currentSoloTrack: store.getState().session.soloTrack
    };
  }

  statusToggle() {
    let { track } = this.props;
    track.isEnabled = !track.isEnabled;
    this.setState(this.state);
  }
  statusToggleListener = this.statusToggle.bind(this);

  soloToggle() {
    let { track } = this.props;
    store.dispatch(actions.toggleSoloTrack(track));
  }
  soloToggleListener = this.soloToggle.bind(this);

  componentWillUnmount() {
    this.unsubscribeStore();
    this.isDead = true;
  }

  render() {
    let { track } = this.props;
    let soloTrack = this.state.currentSoloTrack;

    let state, stateClass;
    let isOn = (soloTrack === track || !soloTrack) && track.isEnabled;
    if (track.isPlaying === isOn) {
      stateClass = state = isOn ? 'on' : 'off';
      if (soloTrack === track) {
        state = 'solo';
        stateClass = 'selected';
      }
    } else {
      state = isOn ? 'READY' : 'END';
      stateClass = 'standby stripped x1';
    }
    let enabledState = track.isEnabled ? 'on' : 'off';
    let soloState = track.isSolo ? 'on' : 'off';
    return (
      <div className='trackswitch'>
        <div className={'trackswitch-state ' + stateClass}>
          <div className='trackswitch-pill'>{state}</div>
        </div>
        <div
          className={'trackswitch-button ' + enabledState}
          onClick={this.statusToggleListener}
        >
          I
        </div>
        <div
          className={'trackswitch-button ' + soloState}
          onClick={this.soloToggleListener}
        >
          S
        </div>
      </div>
    );
  }
}
