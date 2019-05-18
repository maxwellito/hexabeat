import * as React from 'react';
import { Mpk, MpkKey, NobBypass, PadFilter } from 'services/MpkController';
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
  selectedNewTrack: number;
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
    let { tracks, editingTrack, selectedTrack } = store.getState().session;
    if (
      tracks !== this.state.tracks ||
      editingTrack !== this.state.editingTrack ||
      selectedTrack !== this.state.activeTrack
    ) {
      this.setState({
        tracks,
        editingTrack,
        activeTrack: selectedTrack
      });
    }
  });

  /**
   * **P1** : PLAY/PAUSE
   * **P4** : Delete track (double tap)
   * **P5** : Mute track
   * **P6** : Solo track
   * **P7** : Open Sequence Crafter
   *
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
    [MpkKey.pad4]: PadFilter(true, () => {
      const { tracks, selectedTrack } = store.getState().session;
      if (store.getState().session.selectedTrack === null) {
        // Add track
        const { sampleGroups } = store.getState().session.liveset;
        const tr = new Track(sampleGroups[this.state.selectedNewTrack]);
        store.dispatch(actions.addTrack(tr));
        store.dispatch(actions.setSelectedTrack(tracks.length));
      } else {
        // Delete track
        store.dispatch(actions.removeTrack(tracks[selectedTrack]));
      }
    }),
    [MpkKey.pad5]: (isPress: boolean) => {
      if (!isPress) return;
      const { tracks, selectedTrack } = store.getState().session;
      const track = tracks[selectedTrack || 0];
      if (!track) {
        return;
      }
      track.toggleMute();
    },
    [MpkKey.pad6]: (isPress: boolean) => {
      if (!isPress) return;
      const { tracks, selectedTrack } = store.getState().session;
      const track = tracks[selectedTrack || 0];
      if (!track) {
        return;
      }
      track.toggleSolo();
    },
    [MpkKey.pad7]: (isPress: boolean) => {
      if (!isPress) return;
      const { tracks, selectedTrack } = store.getState().session;
      const track = tracks[selectedTrack || 0];
      if (!track) {
        return;
      }
      store.dispatch(actions.setEditingTrack(track));
      // this.drapPos += diff;
      // this.setState({
      //   pickerIsSelected: false,
      //   pickerIndex: Math.floor(this.drapPos / 5)
      // });
    },

    // Select track
    [MpkKey.nob1]: NobBypass(3, (diff: number) => {
      const { activeTrack } = this.state;
      const trackLength = store.getState().session.tracks.length;
      const newTrack = Math.max(
        0,
        Math.min(trackLength - 1, activeTrack + diff)
      );
      if (activeTrack !== newTrack) {
        store.dispatch(actions.setSelectedTrack(newTrack));
      }
    }),
    // Pick new track
    [MpkKey.nob2]: NobBypass(3, (diff: number) => {
      const { selectedNewTrack } = this.state;
      const sgLength = store.getState().session.liveset.sampleGroups.length;
      const newIndex = Math.max(
        0,
        Math.min(sgLength - 1, selectedNewTrack + diff)
      );
      if (selectedNewTrack !== newIndex) {
        this.setState({ selectedNewTrack: newIndex });
        store.dispatch(actions.setSelectedTrack(null));
      }
    }),
    // Volume track
    [MpkKey.nob5]: (diff: number) => {
      const { tracks, selectedTrack } = store.getState().session;
      const track = tracks[selectedTrack || 0];
      if (!track) {
        return;
      }
      const newVolume = track.volume + (diff > 0 ? VOLUME_STEP : -VOLUME_STEP);
      track.setVolume(newVolume);
    },

    // Session BPM
    [MpkKey.nob3]: (diff: number) => {
      const newBPM = store.getState().session.bpm + diff;
      store.dispatch(actions.setBpm(newBPM));
    },

    // Session volume
    [MpkKey.nob4]: (diff: number) => {
      const newVol =
        store.getState().session.volume +
        (diff > 0 ? VOLUME_STEP : -VOLUME_STEP);
      store.dispatch(actions.setVolume(newVol));
    }
  });

  constructor(props: PlaygroundProps) {
    super(props);
    this.state = {
      activeTrack: 0,
      selectedNewTrack: 0,
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
      return (
        <TrackComponent
          index={i}
          data={t}
          active={this.state.activeTrack === i}
          key={t.id}
        />
      );
    });
    let editor;
    if (this.state.editingTrack) {
      editor = <SequenceCraftr track={this.state.editingTrack} />;
    }
    return (
      <div>
        <ControlBar />
        {trks}
        <TrackGenerator
          pickerIndex={this.state.selectedNewTrack}
          isOn={this.state.activeTrack === null}
        />
        {/* <IconHelper /> */}
        {editor}
      </div>
    );
  }
}
