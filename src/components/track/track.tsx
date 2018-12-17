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
}

export class TrackComponent extends React.Component<TrackProps> {

  render() {
    return (
      <div className='track'>
        <TrackIndex index={this.props.index}/>
        <LevelMeter progress={.8}/>
        <TrackLabel title={this.props.data.name} subtitle={'7cbd875be785a085a0d87b5a'}/>
        <TrackData data={this.props.data.partitions} labels={this.props.data.labels} />
      </div>
    );
  }
}