import * as React from 'react';
import { DefaultListItem } from './items/DefaultListItem';
import './List.css';

const WHEEL_STEP = 4;

/**
 * Base element
 */
export interface ListItem {
  isActive?: boolean;
  title: string;
  subtitle?: string;
}

export interface ListProps {
  data: ListItem[];
  index: number;
  component?: any;
  onUpdate?: (newIndex: number) => void;
}

export interface ListState {}

export class List extends React.Component<ListProps, ListState> {
  previousIndex: number = 0;
  isScrollingDown: true;
  wheelListener: (e: React.WheelEvent) => void;
  wheelAcc = 0;

  constructor(props: ListProps) {
    super(props);
    this.state = {
      index: 0
    };
    this.wheelListener = this.onWheel.bind(this);
  }

  onWheel(e: React.WheelEvent) {
    // End event
    e.stopPropagation();
    e.preventDefault();

    const Y = e.deltaY;
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

  shouldComponentUpdate(nextProps: ListProps) {
    return (
      nextProps.index !== this.props.index || nextProps.data !== this.props.data
    );
  }

  render() {
    let topList: any[] = [],
      selectedItem: any,
      bottomList: any[] = [];

    this.props.data.forEach((item: ListItem, index: number) => {
      let isActive = index === this.props.index,
        output = React.createElement(this.props.component || DefaultListItem, {
          ...item,
          isActive,
          key: index
        });

      if (isActive) {
        selectedItem = output;
      } else {
        (index < this.props.index ? topList : bottomList).push(output);
      }
    });

    let wrapClass = this.previousIndex > this.props.index ? 'down' : 'up';
    this.previousIndex = this.props.index;

    return (
      <div className={'list-wrap ' + wrapClass} onWheel={this.wheelListener}>
        <div className='list-wrap-top'>{topList}</div>
        {selectedItem}
        <div className='list-wrap-bottom'>{bottomList}</div>
      </div>
    );
  }
}
