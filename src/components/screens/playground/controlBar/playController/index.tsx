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
    const label = this.state.isPlaying ? '>' : '||';
    return (
      <div className='playcontroller' onClick={this.clickListener}>
        <span>{label}</span>
      </div>
    );
  }
}
