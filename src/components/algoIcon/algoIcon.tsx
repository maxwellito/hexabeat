import * as React from 'react';
import './algoIcon.css';

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
  render() {
    const lines = this.props.data.map((lineData, lineIndex) => {
      const [y, x1, x2] = lineData;
      return (
        <line
          key={lineIndex}
          strokeWidth={LINE_WIDTH}
          x1={POS_BASE + GAP_SIZE * x1}
          y1={POS_BASE + GAP_SIZE * y}
          x2={POS_BASE + GAP_SIZE * x2}
          y2={POS_BASE + GAP_SIZE * y}
        />
      );
    });

    const viewBoxWidth = POS_BASE + X_MAX * GAP_SIZE,
      viewBoxHeight = POS_BASE + Y_MAX * GAP_SIZE;

    return (
      <svg
        className='algoIcon'
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      >
        {lines}
      </svg>
    );
  }
}
