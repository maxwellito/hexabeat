
import * as React from 'react';
import './trackIndex.css';

export interface TrackIndexProps {
  index: number
}

/**
 * Props:
 * - `index`: number
 */
export class TrackIndex extends React.Component<TrackIndexProps> {

  render() {
    let {index} = this.props,
      label = (index < 10 ? '0' : '') + index;
    return (
      <span className='track-index'>{label}</span>
    );
  }
}