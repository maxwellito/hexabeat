import * as React from 'react';
import { Mpk, MpkKey } from 'services/MpkController';
import { store, actions } from 'store';
import { ControlBar } from './controlBar';
import { TrackGenerator } from './trackGenerator';

export interface PlaygroundProps {}

export interface PlaygroundState {
  activeTrack: number;
}

/**
 * Playground component
 *
 * Components:
 * - LivesetPicker
 * - LivesetUploader
 * - LivesetStart
 */
export class Playground extends React.Component<
  PlaygroundProps,
  PlaygroundState
> {
  drapPos = 0;

  unsubscribeStore = store.subscribe(() => {
    // let newLivesets = store.getState().livesets;
    // console.log('Hello', newLivesets);
    // if (newLivesets !== this.state.livesets) {
    //   this.setState({
    //     livesets: newLivesets
    //   });
    // }
  });

  /** 
  - **P1** : PLAY/PAUSE
  - **P4** : Selects
  - **P5** : Mute track
  - **P6** : Solo track

  * **N1** : Select the track
  * **N3** : Output volume
  * **N4** : BPM
  * **N5** : Volume track
  */

  unsubscribeMpk = Mpk.takeControl({
    [MpkKey.pad1]: (isPress: boolean) => {
      if (isPress) {
        store.dispatch(actions.togglePlaying());
      }
    },
    [MpkKey.pad4]: () => {
      const { activeTrack } = this.state;
      const trackLength = store.getState().session.tracks.length;
      const newIndex = activeTrack === trackLength ? -1 : activeTrack;
      store.dispatch(actions.setSelectedTrack(newIndex));
    },
    [MpkKey.nob7]: (diff: number) => {
      // this.drapPos += diff;
      // console.log(this.drapPos, Math.floor(this.drapPos / 5));
      // this.setState({
      //   pickerIsSelected: false,
      //   pickerIndex: Math.floor(this.drapPos / 5)
      // });
    },

    // Select track
    [MpkKey.nob1]: (diff: number) => {
      const { activeTrack } = this.state;
      const trackLength = store.getState().session.tracks.length;
      const newTrack = Math.max(0, Math.min(trackLength, activeTrack + diff));
      if (activeTrack !== newTrack) {
        this.setState({
          activeTrack: newTrack
        });
      }
    },
    // Volume track
    [MpkKey.nob5]: (diff: number) => {
      const { tracks, selectedTrack } = store.getState().session;
      const track = tracks[selectedTrack];
      if (!track) {
        return;
      }
      track.volume += diff;
    },

    // Session volume
    [MpkKey.nob3]: (diff: number) => {
      const newVol = store.getState().session.volume + diff;
      store.dispatch(actions.setVolume(newVol));
    },
    // Session BPM
    [MpkKey.nob4]: (diff: number) => {
      const newBPM = store.getState().session.bpm + diff;
      store.dispatch(actions.setBpm(newBPM));
    }
  });

  constructor(props: PlaygroundProps) {
    super(props);
    this.state = {
      activeTrack: 0
    };
  }

  componentWillUnmount() {
    this.unsubscribeMpk();
    this.unsubscribeStore();
  }

  render() {
    return (
      <div>
        <ControlBar />
        <TrackGenerator />
        {/* <IconHelper /> */}
        Welcome
      </div>
    );
  }
}
