import * as React from 'react';
import { store, actions } from 'store';

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
  wheelListener = this.onWheel.bind(this);
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

  onWheel(e: React.WheelEvent) {
    // End event
    e.stopPropagation();
    e.preventDefault();

    const Y = e.deltaY;
    if (!Y) {
      return;
    }
    const value = this.state.value + (Y > 0 ? -1 : 1);
    store.dispatch(actions.setBpm(value));
  }

  render() {
    let extraO;
    if (this.state.value < 100) {
      extraO = <span className='controlbar-item-content-off'>0</span>;
    }
    return (
      <div className='controlbar-item' onWheel={this.wheelListener}>
        <div className='controlbar-item-title'>BPM</div>
        {extraO}
        <span className='controlbar-item-content'>{this.state.value}</span>
      </div>
    );
  }
}
