import * as React from 'react';
import { Mpk, MpkKey } from 'services/MpkController';
import { store, actions } from 'store';
import { Liveset } from 'models/Liveset';
import { MiniMPK } from 'components/common/minimpk';

export interface ControlBarProps {}

export interface ControlBarState {}

/**
 * ControlBar component
 *
 * Components:
 * - LivesetPicker
 * - LivesetUploader
 * - LivesetStart
 */
export class ControlBar extends React.Component<
  ControlBarProps,
  ControlBarState
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

  constructor(props: ControlBarProps) {
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
        <MiniMPK />
      </div>
    );
  }
}
