import * as React from 'react';
import './index.css';

// [komponent-class]: algoicon

export interface AlgoIconProps {
  data: number[][];
}

const X_MAX = 8,
  Y_MAX = 4,
  LINE_WIDTH = 4,
  LINE_PADDING = 1,
  POS_BASE = LINE_PADDING + LINE_WIDTH / 2,
  GAP_SIZE = LINE_PADDING + LINE_WIDTH;

export class AlgoIcon extends React.Component<AlgoIconProps> {
  shouldComponentUpdate() {
    return !this.props;
  }
  render() {
    let dots = [];
    for (let x = 0; x < X_MAX; x++) {
      for (let y = 0; y < Y_MAX; y++) {
        const isOn = this.props.data
          .filter(path => path[0] === y)
          .filter(path => path[1] <= x)
          .filter(path => path[2] >= x);

        dots.push(
          <line
            key={x * Y_MAX + y}
            strokeWidth={isOn.length ? LINE_WIDTH : 1}
            x1={POS_BASE + GAP_SIZE * x}
            y1={POS_BASE + GAP_SIZE * y}
            x2={POS_BASE + GAP_SIZE * x}
            y2={POS_BASE + GAP_SIZE * y}
          />
        );
      }
    }

    const viewBoxWidth = POS_BASE + X_MAX * GAP_SIZE,
      viewBoxHeight = POS_BASE + Y_MAX * GAP_SIZE;

    return (
      <svg
        className='algoicon'
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      >
        {dots}
      </svg>
    );
  }
}
