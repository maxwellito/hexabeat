import React, { Component } from 'react';
import './levelMeter.css';

class LevelMeter extends Component {

  render() {
    let height = Math.round((this.props.progress || 0) * 100) + '%',
        wrapClass = 'level-meter' + (this.props.active ? 'active' : '')
    return (
      <div className={wrapClass}>
        <div className="level-meter-wrap">
          <div className="level-meter-content" style={{"height": height}}></div>
        </div>
      </div>
    );
  }
}

export default LevelMeter;
