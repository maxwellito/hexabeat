import * as React from 'react';
import {Mpk, MpkStatus} from 'services/MpkController'

export interface MiniMPKProps {}
export interface MiniMPKState {
  status: MpkStatus
}

export class MiniMPK extends React.Component<MiniMPKProps,MiniMPKState> {

  constructor(props:MiniMPKProps) {
    super(props);
    this.state = {
      status: Mpk.status
    }

    Mpk.onStateChange((status) => {
      this.setState({status})
    })
  }

  connect() {
    Mpk.accessDevice()
  }

  render() {
    return (
      <div className={this.state.status} onClick={this.connect.bind(this)}>
      {this.state.status}
      </div>
    );
  }
}