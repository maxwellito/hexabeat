import * as React from 'react';
import {TrackIndex} from './trackIndex/trackIndex';
import {LevelMeter} from './levelMeter/levelMeter';
import {TrackLabel} from './trackLabel/trackLabel';
import {TrackData} from './trackData/trackData';
import './track.css';
import Track from 'models/Track';

export interface TrackProps {
  index: number;
  data: Track;
  active: boolean;
}

export class TrackComponent extends React.Component<TrackProps> {

  render() {
    let wrapClass = `track ${this.props.active ? 'active' : ''}`;
    return (
      <div className={wrapClass}>
        <div className='track-bloc' data-title='id'>
          <div className='track-label'>0{this.props.index}</div>
        </div>
        <div className='track-bloc track-bloc-title selected' data-title='sampleset'>
          <div className='track-label'>{this.props.data.name}</div>
        </div>
        <div className='track-bloc' data-title='volume'>
          <LevelMeter progress={.8}/>
        </div>
        <div className='track-bloc' data-title='sequence'>
          <TrackData data={this.props.data.partitions} labels={this.props.data.labels} />
        </div>
      </div>
    );
  }
}