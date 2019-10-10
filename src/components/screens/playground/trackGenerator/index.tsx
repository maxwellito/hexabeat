import * as React from 'react';
import { store, actions } from 'store';
import { Picker } from 'components/picker';
import { SampleGroup } from 'models/Liveset';
import Track from 'models/Track';
import './index.css';

// [komponent-class]: trackgenerator

export interface TrackGeneratorProps {
  isOn: boolean;
  pickerIndex: number;
}

export interface TrackGeneratorState {
  sampleGroups: SampleGroup[];
  pickerIsSelected: boolean;
}

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

  onUpdateListener(index: number, isSelected: boolean) {
    if (!isSelected) {
      return;
    }
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
    const classes = ['track', 'trackgenerator'];
    if (this.props.isOn) {
      classes.push('active');
    }
    return (
      <div className={classes.join(' ')} data-id='[+]'>
        <Picker
          data={this.state.sampleGroups}
          component={TrackGeneratorItem}
          index={this.props.pickerIndex}
          isSelected={this.state.pickerIsSelected}
          onUpdate={this.onUpdate}
        />
      </div>
    );
  }
}

// [komponent-class]: trackgeneratoritem

export interface TrackGeneratorItemProps {
  item: SampleGroup;
  isActive: boolean;
  isSelected: boolean;
  onSelect: (index: number, isSelected: boolean) => void;
  index: number;
}

export class TrackGeneratorItem extends React.Component<
  TrackGeneratorItemProps
> {
  clickListener = this.onClick.bind(this);
  onClick() {
    this.props.onSelect(this.props.index, true);
  }

  hoverListener = this.onHover.bind(this);
  onHover() {
    this.props.onSelect(this.props.index, false);
  }
  render() {
    let { item, isActive, isSelected } = this.props;
    let classes = ['trackgeneratoritem', 'picker-item'];

    if (isActive) {
      classes.push('active');
    }
    if (isActive && isSelected) {
      classes.push('active selected');
    }

    return (
      <div
        className={classes.join(' ')}
        onClick={this.clickListener}
        onMouseEnter={this.hoverListener}
      >
        <div className='trackgeneratoritem-icon'>{item.icon}</div>
        <div className='trackgeneratoritem-content'>
          <div className='trackgeneratoritem-title'>{item.name}</div>
          <div className='trackgeneratoritem-subtitle'>
            SMPL.0{item.samples.length}
          </div>
        </div>
      </div>
    );
  }
}
