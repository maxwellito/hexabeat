import React, { Component } from 'react';
import LabelPick from './labelPick/labelPick';
import LevelMeter from './levelMeter/levelMeter';
import TrackData from './trackData/trackData';
import './track.css';

class Track extends Component {

  constructor() {
    super();
    this.setState({currentPos: 0})
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
    }, 2000);

    return (
      <div className='track'>
        <LabelPick labels={labels} />
        <LevelMeter progress={.6}/>
        <TrackData currentPos={currentPos} data={trackData} />
      </div>
    );
  }
}

export default Track;
