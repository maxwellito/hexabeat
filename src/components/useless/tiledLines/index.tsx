import * as React from 'react';
import './index.css';

// [komponent-class]: tiledlines

export interface TiledLinesProps {
  gap?: number;
  width?: number;
  height?: number;
  type?: string;
}

export class TiledLines extends React.Component<TiledLinesProps> {
  render() {
    let pif,
      pos,
      stack = [],
      gap = this.props.gap || 20,
      width = this.props.width || 600,
      height = this.props.height || 600,
      sizeX = Math.ceil(width / gap),
      sizeY = Math.ceil(height / gap),
      type = this.props.type || 'tiledlines';

    for (let x = 0; x < sizeX; x++) {
      for (let y = 0; y < sizeY; y++) {
        pif = Math.random() > 0.5;
        pos = Math.floor(Math.abs(sizeX / 2 - x) + Math.abs(sizeY / 2 - y));
        stack.push(
          <line
            className={'pos' + pos}
            key={x * sizeX + y}
            x1={(pif ? x : x + 1) * gap}
            y1={y * gap}
            x2={(pif ? x + 1 : x) * gap}
            y2={(y + 1) * gap}
          />
        );
      }
    }

    return (
      <svg className={type} viewBox={'0 0 ' + width + ' ' + height}>
        {stack}
      </svg>
    );
  }
}
