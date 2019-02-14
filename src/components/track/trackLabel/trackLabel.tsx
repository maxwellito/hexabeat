import * as React from 'react';
import './trackLabel.css';

export interface TrackLabelProps {
  title: string;
  subtitle: string;
}

export class TrackLabel extends React.Component<TrackLabelProps> {

  render() {
    return (
      <div className='track-label'>{this.props.title}</div>
    );
  }
}