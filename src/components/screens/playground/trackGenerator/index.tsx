import * as React from 'react';
import { store, actions } from 'store';
import { Picker } from 'components/picker';
import { SampleGroup } from 'models/Liveset';
import Track from 'models/Track';

import './index.css';

export interface TrackGeneratorProps {
  isOn: boolean;
  pickerIndex: number;
}

export interface TrackGeneratorState {
  sampleGroups: SampleGroup[];
  pickerIsSelected: boolean;
}

/**
 * TrackGenerator component
 *
 * Components:
 * - LivesetPicker
 * - LivesetUploader
 * - LivesetStart
 */
export class TrackGenerator extends React.Component<
  TrackGeneratorProps,
  TrackGeneratorState
> {
  isActive = false;
  drapPos = 0;
  onUpdate = this.onUpdateListener.bind(this);

  constructor(props: TrackGeneratorProps) {
    super(props);
    let liveset = store.getState().session.liveset;
    this.state = {
      sampleGroups: liveset && liveset.sampleGroups,
      pickerIsSelected: false
    };
  }

  onUpdateListener(index: number) {
    this.setState({
      pickerIsSelected: true
    });
    this.addTrack(index);
  }

  addTrack(index: number) {
    let tr = new Track(this.state.sampleGroups[index]);
    store.dispatch(actions.addTrack(tr));
  }

  render() {
    return (
      <div className='track'>
        <Picker
          data={this.state.sampleGroups}
          index={this.props.pickerIndex}
          isSelected={this.state.pickerIsSelected}
          component={TrackGeneratorItem}
          onUpdate={this.onUpdate}
        />
      </div>
    );
  }
}

export interface TrackGeneratorItemProps {
  item: SampleGroup;
  isActive: boolean;
  isSelected: boolean;
  onSelect: (index: number) => void;
  index: number;
}

export class TrackGeneratorItem extends React.Component<
  TrackGeneratorItemProps
> {
  clickListener = this.onClick.bind(this);
  onClick() {
    this.props.onSelect(this.props.index);
  }
  render() {
    let { item, isActive, isSelected } = this.props;
    let classes = ['track-generator-item', 'picker-item'];

    if (isActive) {
      classes.push('active');
    }
    if (isActive && isSelected) {
      classes.push('active selected');
    }

    return (
      <div className={classes.join(' ')} onClick={this.clickListener}>
        <div className='track-generator-item-icon'>
          <span className={'icon-' + item.icon} />
        </div>
        <div className='track-generator-item-content'>
          <div className='track-generator-item-title'>{item.name}</div>
          <div className='track-generator-item-subtitle'>
            SMPL.0{item.samples.length}
          </div>
        </div>
      </div>
    );
  }
}
