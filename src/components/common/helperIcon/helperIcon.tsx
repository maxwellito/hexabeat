import * as React from 'react';
import './helperIcon.css';

export interface HelperIconProps {
  index: number;
  type: 'nob' | 'pad';
}

export class HelperIcon extends React.Component<HelperIconProps> {
  render() {
    const className = 'helperIcon ' + this.props.type;
    return <div className={className}>{this.props.index}</div>;
  }
}
