import * as React from 'react';
import './index.css';

// [komponent-class]: labelpick

export interface LabelPickProps {
  active?: boolean;
  labels: string[];
}

export class LabelPick extends React.Component<LabelPickProps> {
  render() {
    let labelDoms,
      labels = this.props.labels || [],
      wrapClass = 'labelpick selectable' + (this.props.active ? 'active' : '');

    labelDoms = labels.map((label, index) => {
      return (
        <div className='labelpick-item' key={index}>
          <span className='labelpick-title'>{label}</span>
          <span className='labelpick-index'>00{index}</span>
        </div>
      );
    });
    return <div className={wrapClass}>{labelDoms}</div>;
  }
}
