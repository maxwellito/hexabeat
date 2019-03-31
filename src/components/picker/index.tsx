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

export interface PickerProps {
  data: any[];
  index: number;
  isSelected: boolean;
  component?: any;
  onUpdate?: (newIndex: number) => void;
}

export class Picker extends React.Component<PickerProps> {
  wheelAcc = 0;
  currentIndex: number;
  private myRef: React.RefObject<HTMLDivElement> = React.createRef();

  render() {
    let index = this.props.index,
      dataLength = this.props.data.length,
      currentIndex = Math.max(0, Math.min(dataLength - 1, index));
    this.currentIndex = currentIndex;

    let { isSelected } = this.props;
    let items = this.props.data.map((item: any, index: number) => {
      let isActive = index === currentIndex;
      return React.createElement(this.props.component, {
        item,
        isActive,
        isSelected,
        key: index,
        index,
        onSelect: this.props.onUpdate
      });
    });

    return (
      <div className='picker' ref={this.myRef}>
        <div className={'picker-wrap'}>{items}</div>
      </div>
    );
  }

  componentDidUpdate() {
    let wrap = this.myRef.current;
    if (wrap) {
      let active: any = wrap.querySelector('.active');
      wrap.scrollTo((active ? active.offsetLeft : 0) - 80, 0);
    }
  }
}
