import * as React from 'react';
import FullscreenHelper from 'services/FullscreenHelper';

export class FullscreenIcon extends React.Component {
  togglerListener = this.toggler.bind(this);
  toggler() {
    FullscreenHelper.toggle();
    this.setState({});
  }

  render() {
    const text = FullscreenHelper.isFullscreen() ? 'EXIT' : 'FL/SCRN';
    return <span onClick={this.togglerListener}>{text}</span>;
  }
}
