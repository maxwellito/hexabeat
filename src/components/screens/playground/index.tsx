import * as React from 'react';
import { Mpk, MpkKey } from 'services/MpkController';
import { store, actions } from 'store';
import { Liveset } from 'models/Liveset';
import { ControlBar } from './controlBar';
import { TrackGenerator } from './trackGenerator';

import { IconHelper } from 'components/useless/icon-helper';

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
    return (
      <div>
        <ControlBar />
        <TrackGenerator />
        {/* <IconHelper /> */}
        Welcome
      </div>
    );
  }
}
