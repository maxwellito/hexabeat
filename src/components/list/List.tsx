import * as React from 'react';
import { AlgoIcon } from 'components/algoIcon/algoIcon';
import { ListItemProps, DefaultListItem } from './templates/SimpleListItem';
import './List.css';

const WHEEL_STEP = 4;

export interface ListProps {
  data: ListItemProps[];
  index: number;
  component?: any;
  onUpdate?: (newIndex: number) => void;
}

export interface ListState {}

export interface ListItem {
  title: string;
  subtitle?: string;
  icon?: number[][];
}

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

    console.log(this.props.children);
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

    // items = this.props.data.map(e => React.createElement(c, { e })

    this.props.data.forEach((item: ListItem, index: number) => {
      let output = React.createElement(DefaultListItem, {
        ...item,
        key: index,
        isActive: index === this.props.index
      });

      if (index === this.props.index) {
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
