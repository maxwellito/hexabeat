import { SampleGroup } from './Liveset';

export default class Track {
  name: string;

  isEnabled = true; // boolean, is the track enabled
  isPlaying = true; // boolean, is the track currently playing
  isSolo = false;
  volume = 1; // number, between 0 and 1
  phaser: number; // number, between 0 and 1
  partitions: boolean[][]; // boolean[16][], grid data

  sampleGroup: SampleGroup; // SampleGroup, sample set it's attached to
  samples: AudioBufferSourceNode[] = []; // number[],
  layers: number; // number, layer length [1~4]
  labels: string[]; // List of labels

  selectedRepo = 0;
  selectedCommit = 0;
  selectedSequencer = 0;

  audioCtx = new AudioContext();
  gain = this.audioCtx.createGain();

  constructor(set: SampleGroup) {
    this.sampleGroup = set;
    this.layers = set.samples.length;
    this.name = set.name;
    this.labels = set.samples.map(e => e.name);
    this.partitions = set.samples.map(() => [
      !1,
      !1,
      !1,
      !1,
      !1,
      !1,
      !1,
      !1,
      !1,
      !1,
      !1,
      !1,
      !1,
      !1,
      !1,
      !1
    ]);

    set.samples.forEach(sample => this.addSample(sample.data));
  }

  /**
   * Set track volume
   * @param volume Volume to set (between 0 and 1)
   */
  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.gain.gain.value = this.volume;
  }

  playAt(index: number, masterVolume: number) {
    if (index === 0) {
      this.isPlaying = this.isEnabled;
    }
    if (!this.isPlaying) {
      return;
    }
    this.partitions.forEach((partition, pIndex) => {
      if (partition[index]) {
        let old = this.samples[pIndex];
        old.disconnect();
        let n = this.audioCtx.createBufferSource();
        n.buffer = old.buffer;
        this.gain.gain.value = this.volume * masterVolume;
        n.connect(this.gain).connect(this.audioCtx.destination);
        this.samples[pIndex] = n;
        this.samples[pIndex].start(0);
      }
    });
  }

  async addSample(audioFile: ArrayBuffer): Promise<any> {
    var source = this.audioCtx.createBufferSource();
    this.samples.push(source);
    this.layers = this.samples.length;

    return new Promise(resolve => {
      this.audioCtx.decodeAudioData(audioFile.slice(0), buffer => {
        source.buffer = buffer;
        source.connect(this.gain).connect(this.audioCtx.destination);
        resolve();
      });
    });
  }
}
