import * as React from 'react';
import { Mpk } from 'services/MpkController';
import { List } from '../list/List';
import { Track } from '../track/track';
import './HomeScreen.css';

import { MiniMPK } from '../controllbar/minimpk/MiniMPK';

export interface HomeProps {
}

export interface HomeState {
  step: number;
  errorMessage: string;
}

/**
 * Home component
 * 
 * Here are the different steps of the component
 * 
 * 1. Press SPACE
 * 2. Connect your Mini MPK
 *   a. Check if WebMIDI is allowed [can skip]
 *   b. Ask for auth
 *   c. Get the list of Midi devices
 *   d. Ask to press start if the device is not available
 * 3. Pick a session from the local storage or new one
 * 4. Pick an audio deck
 *   a. From list or provide URL
 *   b. Load content
 *   c. Check validity
 *   d. Load assets
 * 5. GO!
 */

const steps:{[k:string]:number} = {
  init: 0,
  midi: 1,
  session: 2,
  deck: 3
}

export class Home extends React.Component<HomeProps, HomeState> {

  mpk = Mpk;
  keyUpListener: {(e:KeyboardEvent):void};

  knobListenerCanceller: ()=>void;

  constructor(props:HomeProps) {
    super(props);
    this.state = {
      step: steps.init,
      errorMessage: ''
    }

    this.keyUpListener = this.onKeyUp.bind(this)
    window.addEventListener('keyup', this.keyUpListener)
  }

  componentDidMount() {
    this.knobListenerCanceller = this.mpk.stackNobListener(1,
      p => { 
        console.log('FF', p);
        this.setState({
          step: Math.floor(p/8)
        });
      }
    );
  }

  onKeyUp(e:KeyboardEvent) {
    if (this.state.step === steps.init && e.key === ' ') {
      this.pressStart()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.keyUpListener)
  }

  /**
   * Here is where everything starts
   */
  pressStart() {
    this.mpk.accessDevice()
      .then(() => {
        this.setState({
          step: steps.session
        })
      }, e => {
        this.setState({
          step: steps.init,
          errorMessage: e.message
        })
      })
    
    this.setState({
      step: steps.midi,
      errorMessage: ''
    })
  }

  render() {
    let err;

    if (this.state.errorMessage) {
      err = <p className='warning-box'>{this.state.errorMessage}</p>
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
    ]

    return (
      <div>
        <div className='step-wrap'>
          <span className='step-index'>{(this.state.step < 10 ? '0' : '') + this.state.step}</span>
          <List index={this.state.step} data={listData} />
        </div>
        {err}
        <MiniMPK/>
        <Track/>
      </div>
    );
  }
}