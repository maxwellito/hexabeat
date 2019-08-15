import * as React from 'react';
import { DigitalNob } from 'components/common/digitalNob';
import './index.css';

// [komponent-class]: levelmeter

export interface LevelMeterProps {
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
  updateListener = this.onUpdate.bind(this);
  onUpdate(change: number) {
    let x = this.props.progress + change * (1 / 32);
    this.props.onUpdate(x);
  }

  constructor(props: LevelMeterProps) {
    super(props);
    this.state = {
      progress: props.progress
    };
  }

  render() {
    let height = Math.round((this.props.progress || 0) * 100) + '%';
    let displayValue = this.props.progress.toFixed(2).substr(2);
    let extraO;
    if (this.props.progress === 1) {
      displayValue = '100';
    } else {
      extraO = <span className='levelmeter-label-off'>0</span>;
    }

    let stripSize = Math.floor(this.props.progress * 5) + 1;

    return (
      <DigitalNob className='levelmeter' onUpdate={this.updateListener}>
        <div className='levelmeter-wrap'>
          <div
            className={'levelmeter-content stripped x' + stripSize}
            style={{ height: height }}
          />
        </div>
        <span className='levelmeter-label'>
          {extraO}
          <span>{displayValue}</span>
        </span>
      </DigitalNob>
    );
  }
}
