import * as React from 'react';

import './index.css';

const WHEEL_STEP = 4;

export interface DigitalNobProps {
  unitSize?: number;
  reverseScroll?: boolean;
  className?: string;
  onUpdate: (change: number) => void;
}

export class DigitalNob extends React.Component<DigitalNobProps> {
  xStart: number;
  yStart: number;
  currentValue = 0;
  nextValue = 0;
  wheelAcc = 0;
  updatePlanned: number;

  touchStartListener = this.touchStart.bind(this);
  touchUpdateListener = this.touchUpdate.bind(this);
  touchEndListener = this.touchEnd.bind(this);
  mouseStartListener = this.mouseStart.bind(this);
  mouseUpdateListener = this.mouseUpdate.bind(this);
  mouseEndListener = this.mouseEnd.bind(this);
  wheelListener = this.onWheel.bind(this);

  requestAnimationListener = this.requestAnimation.bind(this);

  componentWillUnmount() {
    if (this.updatePlanned) {
      window.cancelAnimationFrame(this.updatePlanned);
    }
    this.mouseEnd(null);
  }

  render() {
    let { className } = this.props;
    className = 'digitalnob ' + (className || '');
    return (
      <div
        onMouseDown={this.mouseStartListener}
        onTouchStart={this.touchStartListener}
        onTouchMove={this.touchUpdateListener}
        onTouchEnd={this.touchEndListener}
        onWheel={this.wheelListener}
        className={className}
      >
        {this.props.children}
      </div>
    );
  }

  /* Touch listeners *************************************/

  touchStart(t: TouchEvent) {
    this.reset(t.targetTouches[0].pageX, t.targetTouches[0].pageY);
    this.touchUpdate(t);
  }

  touchUpdate(t: TouchEvent) {
    t.preventDefault();
    t.stopPropagation();
    this.update(t.targetTouches[0].pageX, t.targetTouches[0].pageY);
  }

  touchEnd() {}

  /* Mouse listeners *************************************/

  mouseStart(t: MouseEvent) {
    this.reset(t.pageX, t.pageY);

    this.mouseUpdateListener = this.mouseUpdate.bind(this);
    this.mouseEndListener = this.mouseEnd.bind(this);
    window.addEventListener('mousemove', this.mouseUpdateListener);
    window.addEventListener('mouseleave', this.mouseEndListener);
    window.addEventListener('mouseup', this.mouseEndListener);
  }

  mouseUpdate(t: MouseEvent) {
    t.preventDefault();
    t.stopPropagation();

    this.update(t.pageX, t.pageY);
  }

  mouseEnd(t: MouseEvent) {
    window.removeEventListener('mousemove', this.mouseUpdateListener);
    window.removeEventListener('mouseout', this.mouseEndListener);
    window.removeEventListener('mouseup', this.mouseEndListener);
  }

  /* Wheel ***********************************************/

  onWheel(e: React.WheelEvent) {
    // End event
    e.stopPropagation();
    e.preventDefault();

    const Y = -e.deltaY;
    let newIndex = 0;
    if (!Y) {
      return;
    }
    if (this.props.reverseScroll) {
      this.wheelAcc += Y > 0 ? -1 : +1;
    } else {
      this.wheelAcc += Y > 0 ? +1 : -1;
    }

    if (this.wheelAcc >= WHEEL_STEP) {
      newIndex += Math.floor(this.wheelAcc / WHEEL_STEP);
      this.wheelAcc %= WHEEL_STEP;
    } else if (this.wheelAcc <= -WHEEL_STEP) {
      newIndex -= Math.floor(-this.wheelAcc / WHEEL_STEP);
      this.wheelAcc = -(-this.wheelAcc % WHEEL_STEP);
    } else {
      return;
    }
    this.setNextValue(this.nextValue + newIndex);
  }

  /* Logic ***********************************************/

  reset(xStart: number, yStart: number) {
    this.xStart = xStart;
    this.yStart = yStart;
    this.currentValue = 0;
    this.nextValue = 0;
  }

  update(x: number, y: number) {
    const unitSize = this.props.unitSize || 10;
    const raw = x - this.xStart + (this.yStart - y);
    const value = Math.round(raw / unitSize);
    this.setNextValue(value);
  }

  setNextValue(value: number) {
    if (this.nextValue === value) {
      return;
    }
    this.nextValue = value;
    this.triggerUpdate();
  }

  triggerUpdate() {
    if (this.updatePlanned) {
      return;
    }

    this.updatePlanned = window.requestAnimationFrame(
      this.requestAnimationListener
    );
  }

  requestAnimation() {
    this.updatePlanned = 0;
    this.props.onUpdate(this.nextValue - this.currentValue);
    this.currentValue = this.nextValue;
  }
}
