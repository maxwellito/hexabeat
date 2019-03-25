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
  selectedGroup: number;
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

  unsubscribe = store.subscribe(() => {
    let sampleGroups = store.getState().session.liveset.sampleGroups;
    console.log('Samplegroups: ', sampleGroups);
    if (sampleGroups !== this.state.sampleGroups) {
      this.setState({
        sampleGroups: sampleGroups
      });
    }
  });

  constructor(props: TrackGeneratorProps) {
    super(props);
    let liveset = store.getState().session.liveset;
    this.state = {
      sampleGroups: liveset ? liveset.sampleGroups : [],
      selectedGroup: 0
    };

    // Mpk.takeControl({
    //   [MpkKey.nob1]: this.updatePos.bind(this)
    // });
  }

  onUpdateListener(e: any) {
    console.log(e);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div>
        <Picker
          data={this.state.sampleGroups}
          index={this.state.selectedGroup}
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
}

export class TrackGeneratorItem extends React.Component<
  TrackGeneratorItemProps
> {
  oo = this.ooListener.bind(this);
  ooo = false;
  ooListener() {
    this.ooo = !this.ooo;
    this.setState({});
  }
  render() {
    let { item } = this.props;
    let classes = ['track-generator-item'];

    if (this.props.isActive) {
      classes.push('active');
    }
    if (this.ooo) {
      classes.push('active selected');
    }

    return (
      <div className={classes.join(' ')} onClick={this.oo}>
        <div className='track-generator-item-icon'>
          <span className={'icon-' + item.icon} />
        </div>
        <div className='track-generator-item-content'>
          <div className='track-generator-item-title'>{item.name}</div>
          <div className='track-generator-item-subtitle'>
            {item.samples.length}
          </div>
        </div>
      </div>
    );
  }
}
