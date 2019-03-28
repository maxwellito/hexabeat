/**
 * This is like a list, but landscape
 *
 *
 *
 * Input:
 *  parent node
 *     position + isSelected
 *  User click
 *     [position + ]
 *
 *
 * Reserved classname: picker
 */

import * as React from 'react';
import './index.css';

const WHEEL_STEP = 4;

export interface PickerProps {
  data: any[];
  index: number;
  isSelected: boolean;
  component?: any;
  onUpdate?: (newIndex: number) => void;
}

export interface PickerState {
  index: number;
  isSelected: boolean;
}

export class Picker extends React.Component<PickerProps, PickerState> {
  selectListener = this.onSelect.bind(this);
  wheelAcc = 0;
  private myRef: React.RefObject<HTMLDivElement>;

  constructor(props: PickerProps) {
    super(props);
    this.state = {
      index: 0,
      isSelected: false
    };
    this.myRef = React.createRef();
  }

  onSelect(index: number) {
    if (index === this.state.index) {
      return;
    }
    this.setState({
      index,
      isSelected: true
    });
    this.props.onUpdate(index);
  }

  render() {
    let { isSelected } = this.props;
    let items = this.props.data.map((item: any, index: number) => {
      let isActive = index === this.state.index;
      return React.createElement(this.props.component, {
        item,
        isActive,
        isSelected,
        key: index,
        index,
        onSelect: this.selectListener
      });
    });

    return (
      <div className='picker'>
        <div className={'picker-wrap'} ref={this.myRef}>
          {items}
        </div>
      </div>
    );
  }
}
