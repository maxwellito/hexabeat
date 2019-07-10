import * as React from 'react';
import { Mpk, MpkKey, NobBypass, PadFilter } from 'services/MpkController';
import { store, actions } from 'store';
import { ControlBar } from './controlBar';
import { TrackGeneratorItem } from './trackGenerator';
import { TrackComponent } from './track';
import { SequenceCraftr } from 'components/screens/sequenceCraftr';
import { Picker } from 'components/picker';
import Track from 'models/Track';
import { VOLUME_STEP } from './controlBar/volumeInput';

export interface PlaygroundProps {}

export interface PlaygroundState {
  activeTrack: number;
  selectedNewTrack: number;
  tracks: Track[];
  editingTrack: Track;
  selectedNewTrackIsSelected: boolean;
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
  sampleGroups = store.getState().session.liveset.sampleGroups;

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
    [MpkKey.pad1]: [
      'Play/Pause',
      (isPress: boolean) => {
        if (isPress) {
          store.dispatch(actions.togglePlaying());
        }
      }
    ],
    [MpkKey.pad4]: [
      'Add/delete track',
      PadFilter(true, () => {
        const { tracks, selectedTrack } = store.getState().session;
        if (store.getState().session.selectedTrack === null) {
          // Add track
          const tr = new Track(this.sampleGroups[this.state.selectedNewTrack]);
          store.dispatch(actions.addTrack(tr));
          store.dispatch(actions.setSelectedTrack(tracks.length));
          this.setState({
            selectedNewTrackIsSelected: true
          });
        } else {
          // Delete track
          store.dispatch(actions.removeTrack(tracks[selectedTrack]));
        }
      })
    ],
    [MpkKey.pad5]: [
      'Mute track',
      (isPress: boolean) => {
        if (!isPress) return;
        const { tracks, selectedTrack } = store.getState().session;
        const track = tracks[selectedTrack || 0];
        if (!track) {
          return;
        }
        track.toggleMute();
      }
    ],
    [MpkKey.pad6]: [
      'Solo track',
      (isPress: boolean) => {
        if (!isPress) return;
        const { tracks, selectedTrack } = store.getState().session;
        const track = tracks[selectedTrack || 0];
        if (!track) {
          return;
        }
        store.dispatch(actions.toggleSoloTrack(track));
      }
    ],
    [MpkKey.pad7]: [
      'Open sequence crafter',
      (isPress: boolean) => {
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
      }
    ],

    // Select track
    [MpkKey.nob1]: [
      'Select track',
      NobBypass(3, (diff: number) => {
        const { activeTrack } = this.state;
        const trackLength = store.getState().session.tracks.length;
        const newTrack = Math.max(
          0,
          Math.min(trackLength - 1, activeTrack + diff)
        );
        if (activeTrack !== newTrack) {
          store.dispatch(actions.setSelectedTrack(newTrack));
        }
      })
    ],
    // Pick new track
    [MpkKey.nob2]: [
      'Selects new track to add',
      NobBypass(3, (diff: number) => {
        const { selectedNewTrack } = this.state;
        const sgLength = this.sampleGroups.length;
        const newIndex = Math.max(
          0,
          Math.min(sgLength - 1, selectedNewTrack + diff)
        );
        if (selectedNewTrack !== newIndex) {
          this.setState({
            selectedNewTrack: newIndex,
            selectedNewTrackIsSelected: false
          });
          store.dispatch(actions.setSelectedTrack(null));
        }
      })
    ],

    // Session BPM
    [MpkKey.nob3]: [
      'BPM',
      (diff: number) => {
        const newBPM = store.getState().session.bpm + diff;
        store.dispatch(actions.setBpm(newBPM));
      }
    ],

    // Session volume
    [MpkKey.nob4]: [
      'Volume',
      (diff: number) => {
        const newVol =
          store.getState().session.volume +
          (diff > 0 ? VOLUME_STEP : -VOLUME_STEP);
        store.dispatch(actions.setVolume(newVol));
      }
    ],

    // Volume track
    [MpkKey.nob5]: [
      'Track volume',
      (diff: number) => {
        const { tracks, selectedTrack } = store.getState().session;
        const track = tracks[selectedTrack || 0];
        if (!track) {
          return;
        }
        const newVolume =
          track.volume + (diff > 0 ? VOLUME_STEP : -VOLUME_STEP);
        track.setVolume(newVolume);
      }
    ],

    // Filter Frequency track
    [MpkKey.nob6]: [
      'Track filter frequency',
      (diff: number) => {
        const { tracks, selectedTrack } = store.getState().session;
        const track = tracks[selectedTrack || 0];
        if (!track) {
          return;
        }
        const newFrequency =
          track.filterFrequency + (diff > 0 ? VOLUME_STEP : -VOLUME_STEP);
        track.setFilterFrequency(newFrequency);
      }
    ],

    // Filter quality track
    [MpkKey.nob7]: [
      'Filter track quality',
      (diff: number) => {
        const { tracks, selectedTrack } = store.getState().session;
        const track = tracks[selectedTrack || 0];
        if (!track) {
          return;
        }
        const newQuality =
          track.filterQuality + (diff > 0 ? VOLUME_STEP : -VOLUME_STEP);
        track.setFilterQuality(newQuality);
      }
    ]
  });

  constructor(props: PlaygroundProps) {
    super(props);
    this.state = {
      activeTrack: 0,
      selectedNewTrack: 0,
      tracks: store.getState().session.tracks,
      editingTrack: store.getState().session.editingTrack,
      selectedNewTrackIsSelected: false
    };
  }

  componentWillUnmount() {
    this.unsubscribeMpk();
    this.unsubscribeStore();
  }

  onUpdateListener(index: number, isSelected: boolean) {
    this.setState({
      selectedNewTrack: index,
      selectedNewTrackIsSelected: isSelected
    });

    if (!isSelected) {
      return;
    }
    let tr = new Track(this.sampleGroups[index]);
    store.dispatch(actions.addTrack(tr));
  }
  onUpdate = this.onUpdateListener.bind(this);

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
        {/* <TrackGenerator
          pickerIndex={this.state.selectedNewTrack}
          isOn={this.state.activeTrack === null}
        /> */}
        <div
          className={
            'track trackgenerator ' +
            (this.state.activeTrack === null ? 'active' : '')
          }
          data-id='[+]'
        >
          <Picker
            data={store.getState().session.liveset.sampleGroups}
            component={TrackGeneratorItem}
            index={this.state.selectedNewTrack}
            isSelected={this.state.selectedNewTrackIsSelected}
            onUpdate={this.onUpdate}
          />
        </div>
        {/* <IconHelper /> */}
        {editor}
      </div>
    );
  }
}
