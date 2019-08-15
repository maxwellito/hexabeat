import * as React from 'react';
import { store, actions } from 'store';
import { DigitalNob } from 'components/common/digitalNob';

export interface BpmInputState {
  value: number;
}

/**
 * bpmInput component
 * Used in the HomeScreem
 * Allow the user to pick a liveset to start
 *
 * Reserved CSS class: bpminput
 */
export class BpmInput extends React.Component<any, BpmInputState> {
  updateListener = this.onUpdate.bind(this);
  unsubscribe = store.subscribe(() => {
    let newBpm = store.getState().session.bpm;
    if (newBpm !== this.state.value) {
      this.setState({
        value: newBpm
      });
    }
  });

  constructor(props: any) {
    super(props);
    this.state = {
      value: store.getState().session.bpm
    };
  }

  onUpdate(change: number) {
    const value = this.state.value + change;
    store.dispatch(actions.setBpm(value));
  }

  render() {
    let extraO;
    if (this.state.value < 100) {
      extraO = <span className='controlbar-item-content-off'>0</span>;
    }
    return (
      <DigitalNob className='controlbar-item' onUpdate={this.updateListener}>
        <div className='controlbar-item-title'>BPM</div>
        {extraO}
        <span className='controlbar-item-content'>{this.state.value}</span>
      </DigitalNob>
    );
  }
}
