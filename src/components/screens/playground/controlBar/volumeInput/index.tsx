import * as React from 'react';
import { store, actions } from 'store';
import './index.css';

const VOLUME_STEP = 1 / 32;

export interface VolumeInputState {
  value: number;
}

/**
 * VolumeInput component
 * Used in the HomeScreem
 * Allow the user to pick a liveset to start
 *
 * Reserved CSS class: volumeinput
 */
export class VolumeInput extends React.Component<any, VolumeInputState> {
  wheelListener = this.onWheel.bind(this);
  unsubscribe = store.subscribe(() => {
    let newVolume = store.getState().session.volume;
    console.log('New session volume', newVolume);
    if (newVolume !== this.state.value) {
      this.setState({
        value: newVolume
      });
    }
  });

  constructor(props: any) {
    super(props);
    console.log(store.getState());
    this.state = {
      value: store.getState().session.volume
    };
  }

  onWheel(e: React.WheelEvent) {
    // End event
    e.stopPropagation();
    e.preventDefault();

    const Y = e.deltaY;
    const value = this.state.value;
    if (!Y) {
      return;
    }
    store.dispatch(
      actions.setVolume(value + (Y < 0 ? VOLUME_STEP : -VOLUME_STEP))
    );
  }

  render() {
    let height = Math.round((this.state.value || 0) * 100) + '%';
    return (
      <div className='volumeinput' onWheel={this.wheelListener}>
        <div className='volumeinput-wrap'>
          <div className='volumeinput-content' style={{ height: height }} />
        </div>
        <span className='volumeinput-label'>
          {this.state.value.toFixed(2).substr(2)}
        </span>
      </div>
    );
  }
}
