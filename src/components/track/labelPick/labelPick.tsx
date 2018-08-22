import * as React from 'react';
// import './labelPick.css';

export interface LabelPickProps {
  active?: boolean,
  labels: string[]
}

export class LabelPick extends React.Component<LabelPickProps> {

  render() {
    let labelDoms,
        labels = this.props.labels || [],
        wrapClass = 'label-pick selectable' + (this.props.active ? 'active' : '')

    labelDoms = labels.map((label, index) => {
      return <div className='label' key={index}>
        <span className='labelTitle'>{label}</span>
        <span className='labelIndex'>00{index}</span>
      </div>
    });
    return (
      <div className={wrapClass}>
        {labelDoms}
      </div>
    );
  }
}