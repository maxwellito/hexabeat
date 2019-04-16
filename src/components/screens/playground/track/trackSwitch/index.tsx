import * as React from 'react';
import './index.css';

export interface TrackSwitchProps {
  isPlaying: boolean;
  isEnabled: boolean;
  isSolo: boolean;
  toggleState?: () => void;
  toggleSolo?: () => void;
}

export class TrackSwitch extends React.Component<TrackSwitchProps> {
  render() {
    let state, stateClass;
    let { isPlaying, isEnabled, isSolo, toggleState, toggleSolo } = this.props;
    if (isPlaying === isEnabled) {
      stateClass = state = isPlaying ? 'on' : 'off';
    } else {
      state = '/OFF';
      stateClass = 'standby stripped x1';
    }
    let enabledState = isEnabled ? 'on' : 'off';
    let soloState = isSolo ? 'on' : 'off';
    return (
      <div className='track-switch'>
        <div className={'track-switch-state ' + stateClass}>
          <div className='track-switch-pill'>{state}</div>
        </div>
        <div
          className={'track-switch-button ' + enabledState}
          onClick={toggleState}
        >
          I
        </div>
        <div
          className={'track-switch-button ' + soloState}
          onClick={toggleSolo}
        >
          S
        </div>
      </div>
    );
  }
}
