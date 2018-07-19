import React, { Component } from 'react';
import './labelPick.css';

class LabelPick extends Component {

  render() {
    let labels = this.props.labels || [],
        wrapClass = 'label-pick selectable' + (this.props.active ? 'active' : '')

    labels = labels.map((label, index) => {
      return <div className='label'>
        <span className='labelTitle'>{label}</span>
        <span className='labelIndex'>00{index}</span>
      </div>
    });
    return (
      <div className={wrapClass}>
        {labels}
      </div>
    );
  }
}

export default LabelPick;
