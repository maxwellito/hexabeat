import * as React from 'react';
import { actions, store } from 'store';
import { TrackIndex } from './trackIndex/trackIndex';
import { LevelMeter } from './levelMeter/levelMeter';
import { TrackLabel } from './trackLabel/trackLabel';
import { TrackSwitch } from './trackSwitch';
import { TrackData } from './trackData/trackData';
import './track.css';
import Track from 'models/Track';

export interface TrackProps {
  index: number;
  data: Track;
  active: boolean;
}

export interface TrackState {
  _: number;
}

export class TrackComponent extends React.Component<TrackProps, TrackState> {
  constructor(props: TrackProps) {
    super(props);
    this.state = {
      _: 0
    };
    this.props.data.updateListener = () => {
      this.setState({});
    };
  }
  volumeUpdateListener = this.onVolumeUpdate.bind(this);
  onVolumeUpdate(newVolume: number) {
    console.info(this.props.data.volume, newVolume);
    let track = this.props.data;
    track.setVolume(newVolume);
    this.setState({
      _: this.state._ + 1
    });
  }

  viiListener = this.onVii.bind(this);
  onVii(newVolume: number) {
    store.dispatch(actions.setEditingTrack(this.props.data));
  }

  componentWillUnmount() {
    this.props.data.updateListener = null;
    // this.unsubscribeStore();
  }

  // shouldComponentUpdate(props) {
  //   console.log('Should I update the track?');
  //   if (props.data._ !== this.state._) {
  //     this.setState({

  //     })
  //   }
  // }
  render() {
    let classes = ['track'];
    if (this.props.active) {
      classes.push('active');
    }

    let { index } = this.props;
    let track = this.props.data;

    return (
      <div className={classes.join(' ')}>
        <div className='track-bloc' data-title='id'>
          <div className='track-label'>0{index}</div>
        </div>
        <div
          className='track-bloc track-bloc-title selected'
          data-title='sampleset'
        >
          <div className='track-label'>{track.name}</div>
        </div>
        <div className='track-bloc' data-title='state'>
          <TrackSwitch track={track} />
        </div>
        <div className='track-bloc' data-title='volume'>
          <LevelMeter
            progress={track.volume}
            onUpdate={this.volumeUpdateListener}
          />
        </div>
        <div
          className='track-bloc'
          data-title='sequence'
          onClick={this.viiListener}
        >
          <TrackData data={track.partitions} labels={track.labels} />
        </div>
      </div>
    );
  }
}
