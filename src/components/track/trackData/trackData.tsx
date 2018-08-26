import * as React from 'react';
import './trackData.css';

const lineLength = 16;

export interface TrackDataProps {
  currentPos: number,
  data: number[][]
}

/**
 * Props:
 * - `currentPos`: number
 * - `data`: boolean[][]
 */
export class TrackData extends React.Component<TrackDataProps> {

  render() {
    let data = this.props.data || [],
        currentPos = this.props.currentPos;
    
    let lines = data.map((lineData, index) => {
      let dots = lineData.map((bit, index) => {
        let dotClass = (bit ? 'bit-on' : 'bit-off') + (index === currentPos ? ' active' : '')
        return <div className={dotClass} key={index}></div>;
      })
      return <div className='line' key={index}>{dots}</div>
    });

    return (
      <div className="track-data selectable">
        {lines}
      </div>
    );
  }
}