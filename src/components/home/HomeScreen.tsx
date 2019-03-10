import * as React from 'react';
import { Mpk, MpkKey } from 'services/MpkController';
import { List } from '../list/List';
import { TrackComponent } from '../track/track';
import { SequenceCraftr } from '../sequenceCraftr/SequenceCraftr';
import './HomeScreen.css';
import { setCurrentBit } from '../../actions';
import store from 'store';

import { MiniMPK } from '../controllbar/minimpk/MiniMPK';

export interface HomeProps {}

export interface HomeState {
  step: number;
  errorMessage: string;
  session: Session;
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

const steps: { [k: string]: number } = {
  init: 0,
  midi: 1,
  session: 2,
  deck: 3
};

export class Home extends React.Component<HomeProps, HomeState> {
  mpk = Mpk;
  keyUpListener: { (e: KeyboardEvent): void };
  stepUpdate: (newIndex: number) => void;

  knobListenerCanceller: () => void;

  constructor(props: HomeProps) {
    super(props);
    this.state = {
      step: steps.init,
      errorMessage: '',
      session: null
    };

    this.keyUpListener = this.onKeyUp.bind(this);
    window.addEventListener('keyup', this.keyUpListener);
    this.stepUpdate = this.updateStep.bind(this);
  }

  componentDidMount() {
    this.knobListenerCanceller = this.mpk.takeControl({
      [MpkKey.pad1]: (p: number) => {
        console.log('FF', p);
        this.setState({
          step: Math.floor(p / 8)
        });
      },
      [MpkKey.nob1]: (progress: number) => {
        console.log('nob1', progress);
      }
    });
  }

  onKeyUp(e: KeyboardEvent) {
    if (this.state.step === steps.init && e.key === ' ') {
      this.pressStart();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.keyUpListener);
  }

  updateStep(newIndex: number) {
    this.setState({
      step: newIndex
    });
  }

  /**
   * Here is where everything starts
   */
  pressStart() {
    this.mpk.accessDevice().then(
      () => {
        this.setState({
          step: steps.session
        });
      },
      e => {
        this.setState({
          step: steps.init,
          errorMessage: e.message
        });
      }
    );

    this.setState({
      step: steps.midi,
      errorMessage: ''
    });
  }

  start() {
    livesetLoader
      .load('public/decks/demo.json')
      .then(
        myLiveset => {
          let sess = new Session(98, myLiveset, pp);
          sess.isReady.then(() => {
            this.setState({ session: sess });
            sess.start((index: number) => {
              store.dispatch(setCurrentBit(index));
            });
          });
        },
        e => {
          console.warn(livesetLoader, e);
        }
      )
      .catch(console.log);
  }

  render() {
    let err;

    if (this.state.errorMessage) {
      err = <p className='warning-box'>{this.state.errorMessage}</p>;
    }

    let listData = [
      {
        title: 'PRESS SPACE'
        // subtitle: 'TO BEGIN'
      },
      {
        title: 'SETUP MIDI CONNECTION'
        // subtitle: 'REQUEST FOR PERMISSION AND FIND YOUR MINI MPK'
      },
      {
        title: 'PICK A SESSION'
        // subtitle: 'PICK AN EXISTING ONE OR CREATE A NEW ONE'
      },
      {
        title: 'CHOOSE A DECK'
        // subtitle: 'PICK YOUR KIT'
      },
      {
        title: 'PRESS SPACE'
        // subtitle: 'TO BEGIN'
      },
      {
        title: 'SETUP MIDI CONNECTION'
        // subtitle: 'REQUEST FOR PERMISSION AND FIND YOUR MINI MPK'
      },
      {
        title: 'PICK A SESSION'
        // subtitle: 'PICK AN EXISTING ONE OR CREATE A NEW ONE'
      },
      {
        title: 'CHOOSE A DECK'
        // subtitle: 'PICK YOUR KIT'
      },
      {
        title: 'PRESS SPACE'
        // subtitle: 'TO BEGIN'
      },
      {
        title: 'SETUP MIDI CONNECTION'
        // subtitle: 'REQUEST FOR PERMISSION AND FIND YOUR MINI MPK'
      },
      {
        title: 'PICK A SESSION'
        // subtitle: 'PICK AN EXISTING ONE OR CREATE A NEW ONE'
      },
      {
        title: 'CHOOSE A DECK'
        // subtitle: 'PICK YOUR KIT'
      },
      {
        title: 'PRESS SPACE'
        // subtitle: 'TO BEGIN'
      },
      {
        title: 'SETUP MIDI CONNECTION'
        // subtitle: 'REQUEST FOR PERMISSION AND FIND YOUR MINI MPK'
      },
      {
        title: 'PICK A SESSION'
        // subtitle: 'PICK AN EXISTING ONE OR CREATE A NEW ONE'
      },
      {
        title: 'CHOOSE A DECK'
        // subtitle: 'PICK YOUR KIT'
      }
    ];

    var xx = store.getState().currentBit;

    let tracks: TrackComponent[] = [];
    if (this.state.session) {
      tracks = this.state.session.tracks.map(
        (track, index): any => {
          return (
            <TrackComponent data={track} index={index} active={index === 0} />
          );
        }
      );
    }

    return (
      <div>
        <div className='step-wrap'>
          <span className='step-index'>
            {(this.state.step < 10 ? '0' : '') + this.state.step}
          </span>
          <List
            index={this.state.step}
            data={listData}
            onUpdate={this.stepUpdate}
          />
        </div>
        {err}
        <SequenceCraftr />
        <button onClick={this.start.bind(this)}>START</button>
        <MiniMPK />
        {tracks}
      </div>
    );
  }
}

import livesetLoader from 'services/LivesetLoader';
import Track from 'models/Track';

import { Liveset, SampleGroup, SampleItem } from 'models/Liveset';

const pp = [
  [
    [
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0
    ],
    [
      !!1,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!1,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0
    ]
  ],
  [
    [
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0
    ],
    [
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!1,
      !!0,
      !!1,
      !!0,
      !!1,
      !!0,
      !!1,
      !!1
    ],
    [
      !!1,
      !!0,
      !!1,
      !!0,
      !!1,
      !!0,
      !!1,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0
    ],
    [
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0,
      !!0
    ]
  ]
];

class Session {
  tracks: Track[] = [];
  contextListener: () => void;
  gridIndex = 0;
  isReady: Promise<any>;
  cbInterval: (keyIndex: number) => void;

  constructor(
    public bpm: number,
    myLiveset: Liveset,
    partitions: boolean[][][]
  ) {
    let loads: Promise<boolean>[] = [];
    myLiveset.sampleGroups.forEach((set: SampleGroup, setIndex: number) => {
      let trck = new Track();
      set.samples.forEach((sample: SampleItem) => {
        loads.push(trck.addSample(sample.data));
      });
      trck.name = set.name;
      trck.labels = set.samples.map(s => s.name);
      trck.partitions = partitions[setIndex];
      this.tracks.push(trck);
    });
    this.isReady = Promise.all(loads);
    this.contextListener = this.loop.bind(this);
  }

  start(cb: (keyIndex: number) => void) {
    this.cbInterval = cb;
    this.loop();
  }

  loop() {
    //setTimeout(this.contextListener, this.bpm);
    this.cbInterval(this.gridIndex);
    this.play();
  }

  play() {
    this.tracks.forEach((trck, index) => {
      trck.playAt(this.gridIndex);
    });
    this.gridIndex = (this.gridIndex + 17) % 16;
  }
}
