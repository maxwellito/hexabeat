import * as React from 'react';
import { Mpk, MpkKey } from 'services/MpkController';
import { store, actions } from 'store';
import { Liveset } from 'models/Liveset';
import { MiniMPK } from 'components/common/minimpk';
import { BpmInput } from './bpmInput';
import { PlayController } from './playController';
import { VolumeInput } from './volumeInput';

import './index.css';

export interface ControlBarProps {}

export interface ControlBarState {
  liveset: string;
}

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
    this.state = {
      liveset: store.getState().session.liveset.name
    };
    // Mpk.takeControl({
    //   [MpkKey.nob1]: this.updatePos.bind(this)
    // });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div className='controlbar'>
        <div className='controlbar-item'>
          <div className='controlbar-item-title'>{this.state.liveset}</div>
        </div>
        <BpmInput />
        <VolumeInput />
        <div className='controlbar-item'>
          <div className='controlbar-item-title'>MPK</div>
          <div className='controlbar-item-content'>
            <MiniMPK />
          </div>
        </div>
        <PlayController />
      </div>
    );
  }
}
