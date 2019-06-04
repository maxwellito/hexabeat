import * as React from 'react';
import './index.css';

// [komponent-class]: tracklabel

export interface TrackLabelProps {
  title: string;
  subtitle: string;
}

export class TrackLabel extends React.Component<TrackLabelProps> {
  render() {
    return <div className='tracklabel'>{this.props.title}</div>;
  }
}
