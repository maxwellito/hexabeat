import * as React from 'react';
import { Mpk } from 'services/MpkController';
import { List } from '../list/List';
import './HomeScreen.css';

export interface SequenceCraftrProps {
}

export interface SequenceCraftrState {
  selectedRepo: number;
  selectedCommit: number;
  selectedSequencer: number;
}


export class SequenceCraftr extends React.Component<SequenceCraftrProps, SequenceCraftrState> {

  repoUpdate: (newIndex: number) => void;
  commitUpdate: (newIndex: number) => void;
  sequencerUpdate: (newIndex: number) => void;

  constructor(props:SequenceCraftrProps) {
    super(props);
    this.state = {
      selectedRepo: 0,
      selectedCommit: 0,
      selectedSequencer: 0
    };

    this.repoUpdate = this.updateRepo.bind(this);
    // this.commitUpdate = this.listUpdate('selectedCommit');
    // this.sequencerUpdate = this.listUpdate('selectedSequencer');
  }

  componentDidMount() {
    // this.knobListenerCanceller = this.mpk.stackNobListener(1,
    //   p => { 
    //     console.log('FF', p);
    //     this.setState({
    //       step: Math.floor(p/8)
    //     });
    //   }
    // );
  }

  updateRepo(newIndex: number) {
    this.setState({
      selectedRepo: newIndex
    });
  }

  componentWillUnmount() {
    // window.removeEventListener('keyup', this.keyUpListener)
  }



  render() {
    return (
      <div>
        <List index={this.state.selectedRepo} data={listData} onUpdate={this.repoUpdate}/>
        <List index={this.state.selectedCommit} data={listData} />
        <List index={this.state.selectedSequencer} data={listData} />
      </div>
    );
  }
}


let listData = [
  {
    title: 'PRESS SPACE',
    // subtitle: 'TO BEGIN'
  },
  {
    title: 'SETUP MIDI CONNECTION',
    // subtitle: 'REQUEST FOR PERMISSION AND FIND YOUR MINI MPK'
  },
  {
    title: 'PICK A SESSION',
    // subtitle: 'PICK AN EXISTING ONE OR CREATE A NEW ONE'
  },
  {
    title: 'CHOOSE A DECK',
    // subtitle: 'PICK YOUR KIT'
  },
  {
    title: 'PRESS SPACE',
    // subtitle: 'TO BEGIN'
  },
  {
    title: 'SETUP MIDI CONNECTION',
    // subtitle: 'REQUEST FOR PERMISSION AND FIND YOUR MINI MPK'
  },
  {
    title: 'PICK A SESSION',
    // subtitle: 'PICK AN EXISTING ONE OR CREATE A NEW ONE'
  },
  {
    title: 'CHOOSE A DECK',
    // subtitle: 'PICK YOUR KIT'
  },
  {
    title: 'PRESS SPACE',
    // subtitle: 'TO BEGIN'
  },
  {
    title: 'SETUP MIDI CONNECTION',
    // subtitle: 'REQUEST FOR PERMISSION AND FIND YOUR MINI MPK'
  },
  {
    title: 'PICK A SESSION',
    // subtitle: 'PICK AN EXISTING ONE OR CREATE A NEW ONE'
  },
  {
    title: 'CHOOSE A DECK',
    // subtitle: 'PICK YOUR KIT'
  },
  {
    title: 'PRESS SPACE',
    // subtitle: 'TO BEGIN'
  },
  {
    title: 'SETUP MIDI CONNECTION',
    // subtitle: 'REQUEST FOR PERMISSION AND FIND YOUR MINI MPK'
  },
  {
    title: 'PICK A SESSION',
    // subtitle: 'PICK AN EXISTING ONE OR CREATE A NEW ONE'
  },
  {
    title: 'CHOOSE A DECK',
    // subtitle: 'PICK YOUR KIT'
  }
];