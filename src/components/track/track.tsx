import * as React from 'react';
import {LabelPick} from './labelPick/labelPick';
import {LevelMeter} from './levelMeter/levelMeter';
import {TrackData} from './trackData/trackData';
// import './track.css';

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
    }, 80000);

    return (
      <div className='track selectable'>
        <LabelPick labels={labels}/>
        <LevelMeter progress={.6}/>
        <TrackData currentPos={currentPos} data={trackData} />
      </div>
    );
  }
}