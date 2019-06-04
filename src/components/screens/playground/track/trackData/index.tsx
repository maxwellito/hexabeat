import * as React from 'react';
import { store } from 'store';

import './index.css';

// [komponent-class]: trackdata

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
  isDead = false;
  unsubscribe = store.subscribe(() => {
    if (this.isDead) {
      return;
    }
    this.setState({
      currentPos: store.getState().session.currentBit
    });
  });

  constructor(props: TrackDataProps) {
    super(props);
    this.state = {
      currentPos: 0
    };
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.isDead = true;
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
        <div className='trackdata-line' key={index}>
          <div className='trackdata-label'>{this.props.labels[index]}</div>
          {dots}
        </div>
      );
    });

    return <div className='trackdata'>{lines}</div>;
  }
}
