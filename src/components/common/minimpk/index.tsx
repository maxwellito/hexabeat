import * as React from 'react';
import { Mpk, MpkStatus } from 'services/MpkController';

export interface MiniMPKProps {
  shortTag?: boolean;
}
export interface MiniMPKState {
  status: MpkStatus;
}

const shortLabel = {
  [MpkStatus.off]: 'Off',
  [MpkStatus.incompatible]: '-',
  [MpkStatus.waitingForAccess]: 'Off',
  [MpkStatus.pending]: 'Off',
  [MpkStatus.connected]: 'On',
  [MpkStatus.disconnected]: 'Off',
  [MpkStatus.error]: 'Off'
};

const longLabel = {
  [MpkStatus.off]: 'Click to connect your mpk device.',
  [MpkStatus.incompatible]: "Your browser don't support Midi.",
  [MpkStatus.waitingForAccess]: 'Waiting for access.',
  [MpkStatus.pending]: 'Pending.',
  [MpkStatus.connected]: 'MiniMPK connected.',
  [MpkStatus.disconnected]: 'MiniMPK disconnected.',
  [MpkStatus.error]: 'Error while connecting the MiniMPK.'
};

export class MiniMPK extends React.Component<MiniMPKProps, MiniMPKState> {
  unsubscribe: (bin: any) => void;
  constructor(props: MiniMPKProps) {
    super(props);
    this.state = {
      status: Mpk.status
    };

    this.unsubscribe = Mpk.onStateChange(status => {
      this.setState({ status });
    });
  }

  connect() {
    Mpk.accessDevice();
  }

  componentWillUnmount() {
    this.unsubscribe(null);
  }

  render() {
    let status;
    if (this.props.shortTag) {
      status = shortLabel[this.state.status];
    } else {
      status = longLabel[this.state.status];
    }
    return (
      <div className={this.state.status} onClick={this.connect.bind(this)}>
        {status}
      </div>
    );
  }
}
