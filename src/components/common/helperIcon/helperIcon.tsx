import * as React from 'react';
import './helperIcon.css';
import store from 'store';

export interface HelperIconProps {
  index: number;
  type: 'nob' | 'pad';
  status?: boolean;
  disabled?: boolean;
}

export interface HelperIconState {
  isHelpActivated: boolean;
}

export class HelperIcon extends React.Component<
  HelperIconProps,
  HelperIconState
> {
  unsubscribe = store.subscribe(() => {
    let isHelpActivated = store.getState().rootUI;
    if (isHelpActivated !== this.state.isHelpActivated) {
      this.setState({
        isHelpActivated
      });
    }
  });

  constructor(props: HelperIconProps) {
    super(props);
    this.state = {
      isHelpActivated: store.getState().rootUI
    };
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const classes = ['helperIcon', this.props.type];
    if (this.props.status !== undefined) {
      classes.push(this.props.status ? 'on' : 'off');
    } else {
      classes.push(
        !this.props.disabled && store.getState().rootUI ? 'on' : 'off'
      );
    }

    return <div className={classes.join(' ')}>{this.props.index}</div>;
  }
}
