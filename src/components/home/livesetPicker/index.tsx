import * as React from 'react';
// import { Mpk, MpkKey } from 'services/MpkController';
// import { List } from '../list/List';
// import { TrackComponent } from '../track/track';
// import { SequenceCraftr } from '../sequenceCraftr/SequenceCraftr';
import './index.css';
// import { setCurrentBit } from '../../actions';
// import store from 'store';
import { Liveset } from 'models/Liveset';

// import { MiniMPK } from '../controllbar/minimpk/MiniMPK';

export interface LivesetPickerProps {
  livesets: Liveset[];
  selectedIndex: number;
  onChange: (index: number) => void;
}

export interface LivesetPickerState {
  step: number;
}

/**
 * LivesetPicker component
 *
 * Components:
 * - LivesetPicker
 * - LivesetUploader
 * - LivesetStart
 */
export class LivesetPicker extends React.Component<
  LivesetPickerProps,
  LivesetPickerState
> {
  catchClick = this.catchClickListener.bind(this);

  constructor(props: LivesetPickerProps) {
    super(props);
  }

  catchClickListener(proj?: Liveset) {
    this.props.onChange(this.props.livesets.indexOf(proj));
  }
  render() {
    const selectedIndex = Math.min(
      this.props.livesets.length - 1,
      Math.max(-1, this.props.selectedIndex)
    );
    let livesetList = this.props.livesets.map((livesetData, index) => (
      <LivesetItem
        data={livesetData}
        isSelected={selectedIndex === index}
        onSelect={this.catchClick}
        key={index}
      />
    ));
    return (
      <div className='liveset-picker'>
        <LivesetAdd
          isSelected={selectedIndex === -1}
          onSelect={this.catchClick}
        />
        {livesetList}
      </div>
    );
  }
}

export interface LivesetItemProps {
  data: Liveset;
  isSelected: boolean;
  onSelect: (data: Liveset) => void;
}

class LivesetItem extends React.Component<LivesetItemProps> {
  selection = this.selectionListener.bind(this);
  constructor(props: LivesetItemProps) {
    super(props);
  }
  selectionListener() {
    console.log('>>>>');
    this.props.onSelect(this.props.data);
  }
  render() {
    const liveset = this.props.data;
    const classNames = ['liveset-item'];
    classNames.push(this.props.isSelected ? 'active' : '');
    return (
      <div className={classNames.join(' ')} onClick={this.selection}>
        <div>{liveset.name}</div>
        <div>ver. {liveset.version}</div>
        <div>by {liveset.author}</div>
        <div>{liveset.description}</div>
      </div>
    );
  }
}

export interface LivesetAddProps {
  isSelected: boolean;
  onSelect: () => void;
}

class LivesetAdd extends React.Component<LivesetAddProps> {
  render() {
    const classNames = ['liveset-item'];
    classNames.push(this.props.isSelected ? 'active' : '');
    return (
      <div className={classNames.join(' ')} onClick={this.props.onSelect}>
        <div>+</div>
        <div>Add liveset</div>
      </div>
    );
  }
}
