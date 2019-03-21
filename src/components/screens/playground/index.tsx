import * as React from 'react';
import { Mpk, MpkKey } from 'services/MpkController';
import store from 'store';
import { Liveset } from 'models/Liveset';
import * as actions from 'actions/index';

export interface PlaygroundProps {}

export interface PlaygroundState {}

/**
 * Playground component
 *
 * Components:
 * - LivesetPicker
 * - LivesetUploader
 * - LivesetStart
 */
export class Playground extends React.Component<
  PlaygroundProps,
  PlaygroundState
> {
  drapPos = 0;

  unsubscribe = store.subscribe(() => {
    // let newLivesets = store.getState().livesets;
    // console.log('Hello', newLivesets);
    // if (newLivesets !== this.state.livesets) {
    //   this.setState({
    //     livesets: newLivesets
    //   });
    // }
  });

  constructor(props: PlaygroundProps) {
    super(props);
    this.state = {};
    // Mpk.takeControl({
    //   [MpkKey.nob1]: this.updatePos.bind(this)
    // });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return <div className='container'>Welcome</div>;
  }
}
