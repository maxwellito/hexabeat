import * as React from 'react';
import { DefaultListItem } from './items/DefaultListItem';
import { DigitalNob } from 'components/common/digitalNob';
import './List.css';

// [komponent-class]: listwrap

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
  updateListener = this.onUpdate.bind(this);
  wheelAcc = 0;

  constructor(props: ListProps) {
    super(props);
    this.state = {
      index: 0
    };
  }

  onUpdate(change: number) {
    let newIndex = this.props.index + change;
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
      <DigitalNob
        className={'listwrap ' + wrapClass}
        reverseScroll={true}
        onUpdate={this.updateListener}
      >
        <div className='listwrap-top'>{topList}</div>
        {selectedItem}
        <div className='listwrap-bottom'>{bottomList}</div>
      </DigitalNob>
    );
  }
}
