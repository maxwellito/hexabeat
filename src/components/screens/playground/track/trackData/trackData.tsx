import * as React from 'react';
import './trackData.css';
import { store } from 'store';

const lineLength = 16;

export interface TrackDataProps {
  data: boolean[][];
  labels: string[];
}

export interface TrackDataState {
  currentPos: number;
}

/**
 * Props:
 * - `currentPos`: number
 * - `data`: boolean[][]
 */
export class TrackData extends React.Component<TrackDataProps, TrackDataState> {
  constructor(props: TrackDataProps) {
    super(props);
    this.state = {
      currentPos: 0
    };
    console.log(props);
    store.subscribe(() => {
      this.setState({
        currentPos: store.getState().session.currentBit
      });
    });
  }

  render() {
    let data = this.props.data || [],
      currentPos = this.state.currentPos;

    currentPos = store.getState().session.currentBit;

    let lines = data.map((lineData, index) => {
      let dots = lineData.map((bit, index) => {
        let dotClass =
          (bit ? 'bit-on' : 'bit-off') +
          (index === currentPos ? ' active' : '');
        return <div className={dotClass} key={index} />;
      });
      return (
        <div className='track-data-line' key={index}>
          <div className='track-data-label'>{this.props.labels[index]}</div>
          {dots}
        </div>
      );
    });

    return <div className='track-data'>{lines}</div>;
  }
}
