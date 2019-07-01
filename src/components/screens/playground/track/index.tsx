import * as React from 'react';
import { actions, store } from 'store';
import { LevelMeter } from './levelMeter';
import { TrackSwitch } from './trackSwitch';
import { TrackData } from './trackData';
import Track from 'models/Track';
import './index.css';

// [komponent-class]: track

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
    let track = this.props.data;
    track.setVolume(newVolume);
    this.setState({
      _: this.state._ + 1
    });
  }

  updateFilterFrequencyListener = this.updateFilterFrequency.bind(this);
  updateFilterFrequency(newFrequency: number) {
    let track = this.props.data;
    track.setFilterFrequency(newFrequency);
    this.setState({
      _: this.state._ + 1
    });
  }

  updateFilterQualityListener = this.updateFilterQuality.bind(this);
  updateFilterQuality(newQuality: number) {
    let track = this.props.data;
    track.setFilterQuality(newQuality);
    this.setState({
      _: this.state._ + 1
    });
  }

  viiListener = this.onVii.bind(this);
  onVii(newVolume: number) {
    store.dispatch(actions.setEditingTrack(this.props.data));
  }

  componentWillUnmount() {}

  render() {
    let classes = ['track'];
    if (this.props.active) {
      classes.push('active');
    }

    let { index } = this.props;
    let track = this.props.data;

    return (
      <div className={classes.join(' ')} data-id={'0' + index}>
        <div className='track-bloc track-bloc-title' data-title='sampleset'>
          <div className='track-label'>{track.name}</div>
        </div>
        <div className='track-bloc' data-title='volume'>
          <LevelMeter
            progress={track.volume}
            onUpdate={this.volumeUpdateListener}
          />
        </div>
        <div className='track-bloc' data-title='state'>
          <TrackSwitch track={track} />
        </div>
        <div className='track-bloc' data-title='freq.'>
          <LevelMeter
            progress={track.filterFrequency}
            onUpdate={this.updateFilterFrequencyListener}
          />
        </div>
        <div className='track-bloc' data-title='quality'>
          <LevelMeter
            progress={track.filterQuality}
            onUpdate={this.updateFilterQualityListener}
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
