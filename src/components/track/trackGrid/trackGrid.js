import React, { Component } from 'react';
import './trackGrid.css';

const lineLength = 16;

/**
 * Props:
 * - `currentPos`: number
 * - `data`: boolean[][]
 */
class TrackGrid extends Component {

  render() {
    let data = this.props.data || [],
        currentPos = this.props.currentPos;
    
    let lines = data.map((lineData) => {
      let dots = lineData.map((bit, index) => {
        let dotClass = (bit ? 'bit-on' : 'bit-off') + (index === currentPos ? ' active' : '')
        return <div className={dotClass}></div>;
      })
      return <div className='line'>{dots}</div>
    });

    return (
      <div className="track-grid">
        {lines}
      </div>
    );
  }
}

export default TrackGrid;
