/**
 * This is like a list, but landscape
 *
 * Reserved classname: picker
 */

import * as React from 'react';
import './index.css';

const WHEEL_STEP = 4;

export interface PickerProps {
  data: any[];
  index: number;
  component?: any;
  onUpdate?: (newIndex: number) => void;
}

export interface PickerState {}

export class Picker extends React.Component<PickerProps, PickerState> {
  previousIndex: number = 0;
  isScrollingDown: true;
  wheelListener: (e: React.WheelEvent) => void;
  wheelAcc = 0;
  private myRef: React.RefObject<HTMLDivElement>;

  constructor(props: PickerProps) {
    super(props);
    this.state = {
      index: 0
    };
    this.wheelListener = this.onWheel.bind(this);
    this.myRef = React.createRef();
  }

  onWheel(e: React.WheelEvent) {
    // End event
    e.stopPropagation();
    e.preventDefault();

    const Y = e.deltaY + e.deltaX;
    let newIndex = this.props.index;
    if (!Y) {
      return;
    }
    this.wheelAcc += Y > 0 ? 1 : -1;

    if (this.wheelAcc >= WHEEL_STEP) {
      newIndex += Math.floor(this.wheelAcc / WHEEL_STEP);
      this.wheelAcc %= WHEEL_STEP;
    } else if (this.wheelAcc <= -WHEEL_STEP) {
      newIndex -= Math.floor(-this.wheelAcc / WHEEL_STEP);
      this.wheelAcc = -(-this.wheelAcc % WHEEL_STEP);
    } else {
      return;
    }

    newIndex = Math.min(this.props.data.length - 1, Math.max(0, newIndex));
    this.props.onUpdate(newIndex);
  }

  shouldComponentUpdate(nextProps: PickerProps) {
    return (
      nextProps.index !== this.props.index || nextProps.data !== this.props.data
    );
  }

  render() {
    let items = this.props.data.map((item: any, index: number) => {
      let isActive = index === this.props.index;
      return React.createElement(this.props.component, {
        item,
        isActive,
        key: index
      });
    });

    return (
      <div className='picker' onWheel={this.wheelListener}>
        <div className={'picker-wrap'} ref={this.myRef}>
          {items}
        </div>
      </div>
    );
  }
}
