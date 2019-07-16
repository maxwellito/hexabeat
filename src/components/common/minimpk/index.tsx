import * as React from 'react';
import { Mpk, MpkStatus } from 'services/MpkController';

export interface MiniMPKProps {
  shortTag: boolean;
}
export interface MiniMPKState {
  status: MpkStatus;
}

export class MiniMPK extends React.Component<MiniMPKProps, MiniMPKState> {
  constructor(props: MiniMPKProps) {
    super(props);
    this.state = {
      status: Mpk.status
    };

    Mpk.onStateChange(status => {
      this.setState({ status });
    });
  }

  connect() {
    Mpk.accessDevice();
  }

  render() {
    let status;
    if (!this.props.shortTag) {
      status = this.state.status;
    } else {
      switch (this.state.status) {
        case MpkStatus.connected:
          status = 'on';
          break;
        case MpkStatus.incompatible:
          status = '-';
          break;
        default:
          status = 'off';
      }
    }
    return (
      <div className={this.state.status} onClick={this.connect.bind(this)}>
        {status}
      </div>
    );
  }
}
