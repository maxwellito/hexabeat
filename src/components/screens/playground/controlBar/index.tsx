import * as React from 'react';
import { store } from 'store';
import { MiniMPK } from 'components/common/minimpk';
import { BpmInput } from './bpmInput';
import { PlayController } from './playController';
import { VolumeInput } from './volumeInput';
import './index.css';

// [komponent-class]: controlbar

export interface ControlBarProps {}

export interface ControlBarState {
  liveset: string;
}

export class ControlBar extends React.Component<
  ControlBarProps,
  ControlBarState
> {
  drapPos = 0;

  constructor(props: ControlBarProps) {
    super(props);
    this.state = {
      liveset: store.getState().session.liveset.name
    };
  }

  render() {
    return (
      <div className='track'>
        <div className='controlbar'>
          <div className='controlbar-item-main'>
            <div className='controlbar-item-title'>Liveset</div>
            <span className='controlbar-item-content'>
              {this.state.liveset}
            </span>
          </div>
          <BpmInput />
          <VolumeInput />
          <div className='controlbar-item'>
            <div className='controlbar-item-title'>MPK</div>
            <div className='controlbar-item-content'>
              <MiniMPK shortTag={true} />
            </div>
          </div>
          <PlayController />
        </div>
      </div>
    );
  }
}
