import * as React from 'react';
import { store, actions } from 'store';
import { DigitalNob } from 'components/common/digitalNob';

export const VOLUME_STEP = 1 / 32;

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
  updateListener = this.onUpdate.bind(this);
  unsubscribe = store.subscribe(() => {
    let newVolume = store.getState().session.volume;
    if (newVolume !== this.state.value) {
      this.setState({
        value: newVolume
      });
    }
  });

  constructor(props: any) {
    super(props);
    this.state = {
      value: store.getState().session.volume
    };
  }

  onUpdate(change: number) {
    const value = this.state.value;
    store.dispatch(actions.setVolume(value + change * VOLUME_STEP));
  }

  render() {
    let height = Math.round((this.state.value || 0) * 100) + '%';
    let displayValue = this.state.value.toFixed(2).substr(2);
    let extraO;
    if (this.state.value === 1) {
      displayValue = '100';
    } else {
      extraO = <span className='controlbar-item-content-off'>0</span>;
    }
    return (
      <DigitalNob className='controlbar-item' onUpdate={this.updateListener}>
        <div className='controlbar-item-title'>Volume</div>
        {extraO}
        <span className='controlbar-item-content'>{displayValue}</span>
      </DigitalNob>
    );
  }
}
