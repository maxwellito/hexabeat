import * as React from 'react';
import './levelMeter.css';

export interface LevelMeterProps {
  active?: boolean;
  progress: number;
  onUpdate?: (newIndex: number) => void;
}

export interface LevelMeterState {
  progress: number;
}

export class LevelMeter extends React.Component<
  LevelMeterProps,
  LevelMeterState
> {
  wheelListener = this.onWheel.bind(this);
  onWheel(e: React.WheelEvent) {
    // End event
    // e.stopPropagation();
    // e.preventDefault();

    let x = this.props.progress - e.deltaY * (1 / 32);
    console.log(x);
    // this.setState({
    //   progress: x
    // });
    this.props.onUpdate(x);
  }

  constructor(props: LevelMeterProps) {
    super(props);
    this.state = {
      progress: props.progress
    };
  }

  render() {
    console.log('>> ' + this.props.progress);
    let height = Math.round((this.props.progress || 0) * 100) + '%';
    let displayValue = this.props.progress.toFixed(2).substr(2);
    let extraO;
    if (this.props.progress === 1) {
      displayValue = '100';
    } else {
      extraO = <span className='level-meter-label-off'>0</span>;
    }

    let stripSize = Math.floor(this.props.progress * 5) + 1;

    return (
      <div className='level-meter' onWheel={this.wheelListener}>
        <div className='level-meter-wrap'>
          <div
            className={'level-meter-content stripped x' + stripSize}
            style={{ height: height }}
          />
        </div>
        <span className='level-meter-label'>
          {extraO}
          <span>{displayValue}</span>
        </span>
      </div>
    );
  }
}
