import * as React from 'react';
import { Mpk, MpkKey } from 'services/MpkController';
import { store, actions } from 'store';
import { Liveset } from 'models/Liveset';
import { MiniMPK } from 'components/common/minimpk';

import { Picker } from 'components/picker';

import { SampleGroup } from 'models/Liveset';

import './index.css';

export interface TrackGeneratorProps {}

export interface TrackGeneratorState {
  sampleGroups: SampleGroup[];
  pickerIndex: number;
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
  drapPos = 0;
  onUpdate = this.onUpdateListener.bind(this);

  unsubscribeStore = store.subscribe(() => {
    let sampleGroups = store.getState().session.liveset.sampleGroups;
    console.log('Samplegroups: ', sampleGroups);
    if (sampleGroups !== this.state.sampleGroups) {
      this.setState({
        sampleGroups: sampleGroups
      });
    }
  });

  unsubscribeMpk = Mpk.takeControl({
    [MpkKey.nob1]: (diff: number) => {
      this.drapPos += diff;
      console.log(this.drapPos, Math.floor(this.drapPos / 5));
      this.setState({
        pickerIsSelected: false,
        pickerIndex: Math.floor(this.drapPos / 5)
      });
    },
    [MpkKey.pad1]: () =>
      this.setState({
        pickerIsSelected: true
      })
  });

  constructor(props: TrackGeneratorProps) {
    super(props);
    let liveset = store.getState().session.liveset;
    this.state = {
      sampleGroups: liveset
        ? [
            ...liveset.sampleGroups,
            ...liveset.sampleGroups,
            ...liveset.sampleGroups,
            ...liveset.sampleGroups
          ]
        : [],
      pickerIndex: 0,
      pickerIsSelected: false
    };
  }

  onUpdateListener(index: number) {
    this.setState({
      pickerIndex: index,
      pickerIsSelected: true
    });
  }

  componentWillUnmount() {
    this.unsubscribeStore();
    this.unsubscribeMpk();
  }

  render() {
    console.info(this.state.pickerIndex);
    return (
      <div>
        <Picker
          data={this.state.sampleGroups}
          index={this.state.pickerIndex}
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
  click = this.clickListener.bind(this);
  clickListener() {
    this.props.onSelect(this.props.index);
  }
  render() {
    let { item, isActive, isSelected } = this.props;
    let classes = ['track-generator-item'];

    if (isActive) {
      classes.push('active');
    }
    if (isActive && isSelected) {
      classes.push('active selected');
    }

    return (
      <div className={classes.join(' ')} onClick={this.click}>
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
