import * as React from 'react';
import { Mpk, MpkKey } from 'services/MpkController';
import { store, actions } from 'store';
import { ControlBar } from './controlBar';
import { TrackGenerator } from './trackGenerator';
import { TrackComponent } from './track/track';
import { SequenceCraftr } from 'components/screens/sequenceCraftr/SequenceCraftr';

import Track from 'models/Track';

import { VOLUME_STEP } from './controlBar/volumeInput';
import { editingTrack } from 'store/reducers/session/editingTrack';

export interface PlaygroundProps {}

export interface PlaygroundState {
  activeTrack: number;
  tracks: Track[];
  editingTrack: Track;
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
    let { tracks, editingTrack } = store.getState().session;
    if (
      tracks !== this.state.tracks ||
      editingTrack !== this.state.editingTrack
    ) {
      this.setState({
        tracks,
        editingTrack
      });
    }
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
      track.volume += diff > 0 ? VOLUME_STEP : -VOLUME_STEP;
    },

    // Session volume
    [MpkKey.nob3]: (diff: number) => {
      const newVol =
        store.getState().session.volume +
        (diff > 0 ? VOLUME_STEP : -VOLUME_STEP);
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
      activeTrack: 0,
      tracks: store.getState().session.tracks,
      editingTrack: store.getState().session.editingTrack
    };
  }

  componentWillUnmount() {
    this.unsubscribeMpk();
    this.unsubscribeStore();
  }

  render() {
    let trks = this.state.tracks.map((t, i) => {
      return <TrackComponent index={i} data={t} active={false} key={i} />;
    });
    let editor;
    if (this.state.editingTrack) {
      editor = <SequenceCraftr track={this.state.editingTrack} />;
    }
    return (
      <div>
        <ControlBar />
        {trks}
        <TrackGenerator />
        {/* <IconHelper /> */}
        {editor}
      </div>
    );
  }
}
