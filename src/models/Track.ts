import {SampleSet} from './SampleSet';

export default class Track {
  isEnabled:boolean;     // boolean, is the track enabled
  isPlaying:boolean;     // boolean, is the track currently playing
  volume:number;         // number, between 0 and 1
  phaser:number;         // number, between 0 and 1
  sampleSet:SampleSet;   // SampleSet, sample set it's attached to
  layers:number;         // number, layer length [1~4]
  samples:AudioBufferSourceNode[] = [];      // number[], 
  partitions:boolean[][]; // boolean[16][], grid data
  labels: string[]; // List of labels
  name: string;

  audioCtx = new AudioContext();

  playAt(index: number) {
    this.partitions.forEach((partition, pIndex) => {
      if (partition[index]) {
        let old = this.samples[pIndex];
        old.disconnect();
        let n = this.audioCtx.createBufferSource();
        n.buffer = old.buffer;
        n.connect(this.audioCtx.destination);
        this.samples[pIndex] = n;
        this.samples[pIndex].start(0);
      }
    })
  }

  async addSample(audioFile:ArrayBuffer): Promise<any> {
    var source = this.audioCtx.createBufferSource();
    this.samples.push(source);
    this.layers = this.samples.length;

    return new Promise((resolve) => {
      this.audioCtx.decodeAudioData(audioFile, buffer => {
        source.buffer = buffer;
        source.connect(this.audioCtx.destination);
        resolve();
      });
    })
  }

}

