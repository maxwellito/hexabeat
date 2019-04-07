import * as React from 'react';
import { store, actions } from 'store';
import './index.css';

export interface PlayControllerState {
  isPlaying: boolean;
}

/**
 * PlayController component
 * Used in the HomeScreem
 * Allow the user to pick a liveset to start
 *
 * Reserved CSS class: playcontroller
 */
export class PlayController extends React.Component<any, PlayControllerState> {
  clickListener = this.onClick.bind(this);
  unsubscribe = store.subscribe(() => {
    const isPlaying = store.getState().session.isPlaying;
    if (isPlaying !== this.state.isPlaying) {
      this.setState({
        isPlaying
      });
    }
  });

  constructor(props: any) {
    super(props);
    this.state = {
      isPlaying: store.getState().session.isPlaying
    };
  }

  onClick(e: React.WheelEvent) {
    // End event
    e.stopPropagation();
    e.preventDefault();

    store.dispatch(actions.play(!this.state.isPlaying));
  }

  render() {
    const stack = []; //this.state.isPlaying ? '>' : '||';
    if (this.state.isPlaying) {
      stack.push(<line x1='4' y1='2' x2='4' y2='14' />);
      stack.push(<line x1='12' y1='2' x2='12' y2='14' />);
    } else {
      stack.push(<polygon points='3,3 14,8 3,13 ' />);
    }
    return (
      <div
        className='controlbar-item playcontroller'
        onClick={this.clickListener}
      >
        <svg
          className='playcontroller-icon controlbar-item-content'
          viewBox='0 0 16 16'
        >
          {stack}
        </svg>
      </div>
    );
  }
}
