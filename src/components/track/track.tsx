import * as React from 'react';
import {TrackIndex} from './trackIndex/trackIndex';
import {LevelMeter} from './levelMeter/levelMeter';
import {TrackLabel} from './trackLabel/trackLabel';
import {TrackData} from './trackData/trackData';
import './track.css';

export interface TrackProps {
}

export interface TrackState {
  currentPos: number
}

export class Track extends React.Component<TrackProps, TrackState> {

  constructor(props:TrackProps) {
    super(props);
    this.state = {
      currentPos: 0
    }
  }

  render() {
    let currentPos = (this.state && this.state.currentPos) || 0,
        trackData = [
          [0, 1, 1, 1,  0, 0, 0, 1,  1, 0, 1, 0,  1, 1, 0, 0],
          [0, 1, 0, 0,  1, 1, 0, 0,  0, 1, 1, 1,  0, 1, 1, 0]
        ],
        labels = ['xyz', 'abc'];

    setTimeout(() => {
      this.setState({currentPos: (currentPos + 1) % 16})
    }, 800);

    return (
      <div className='track'>
        <TrackIndex index={2}/>
        <LevelMeter progress={.6}/>
        <TrackLabel title={'tr808_drums'} subtitle={'7cbd875be785a085a0d87b5a'}/>
        <TrackData currentPos={currentPos} data={trackData} />
      </div>
    );
  }
}