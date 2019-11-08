import * as React from 'react';
import './index.css';

// [komponent-class]: picker

export interface PickerProps {
  data: any[];
  component?: any;
  index: number;
  isSelected: boolean;
  onUpdate?: (newIndex: number, isSelected: boolean) => void;
}

export class Picker extends React.Component<PickerProps> {
  currentIndex: number;
  scrollTo: number;
  scrollProcess: number;
  private myRef: React.RefObject<HTMLDivElement> = React.createRef();
  wheelListener = this.onWheel.bind(this);
  autoscrollState = true;
  pauseAutoscroll = () => (this.autoscrollState = false);
  resumeAutoscroll = () => (this.autoscrollState = true);

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
      <div
        className='picker'
        ref={this.myRef}
        onWheel={this.wheelListener}
        onMouseEnter={this.pauseAutoscroll}
        onMouseLeave={this.resumeAutoscroll}
      >
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

    if (!this.autoscrollState) {
      return;
    }

    if (Math.abs(this.scrollTo - scrollLeft) < 10) {
      wrap.scrollLeft = this.scrollTo;
      this.scrollProcess = null;
      return;
    }
    wrap.scrollLeft = wrap.scrollLeft + direction;
    if (scrollLeft !== wrap.scrollLeft) {
      this.scrollProcess = requestAnimationFrame(this.scroll.bind(this));
    } else {
      this.scrollProcess = null;
    }
  }

  onWheel(e: React.WheelEvent) {
    this.myRef.current.scrollLeft += e.deltaY;
  }
}
