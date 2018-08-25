import {SampleSet} from './SampleSet';

export default class Track {
  isEnabled:boolean;     // boolean, is the track enabled
  isPlaying:boolean;     // boolean, is the track currently playing
  volume:number;         // number, between 0 and 1
  phaser:number;         // number, between 0 and 1
  sampleSet:SampleSet;   // SampleSet, sample set it's attached to
  layers:number;         // number, layer length [1~4]
  samples:number[];      // number[], 
  partition:boolean[][]; // boolean[16][], grid data
}