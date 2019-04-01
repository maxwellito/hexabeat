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
 * Reserved classname: picker and pickeritem
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
  scrollTo: number;
  scrollProcess: number;
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
    let active: any = wrap && wrap.querySelector('.active');
    if (!active) {
      return;
    }

    this.scrollTo = Math.max(0, active.offsetLeft - 80);
    if (!this.scrollProcess) {
      this.scroll();
    }
  }

  scroll() {
    let wrap = this.myRef.current;
    let scrollLeft = wrap.scrollLeft;
    let direction = this.scrollTo - scrollLeft < 0 ? -10 : 10;

    if (Math.abs(this.scrollTo - scrollLeft) < 10) {
      wrap.scrollTo(this.scrollTo, 0);
      this.scrollProcess = null;
      return;
    }
    wrap.scrollTo(wrap.scrollLeft + direction, 0);
    if (scrollLeft !== wrap.scrollLeft) {
      this.scrollProcess = requestAnimationFrame(this.scroll.bind(this));
    } else {
      this.scrollProcess = null;
    }
  }
}
