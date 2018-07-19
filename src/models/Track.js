export default class Track {
  isEnabled; // boolean, is the track enabled
  isPlaying; // boolean, is the track currently playing
  volume;    // number, between 0 and 1
  phaser;    // number, between 0 and 1
  sampleSet; // SampleSet, sample set it's attached to
  layers;    // number, layer length [1~4]
  samples;   // number[], 
  partition; // boolean[16][], grid data
}