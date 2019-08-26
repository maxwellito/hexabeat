import { Sequencer } from 'models/Sequencer';
import { Commit } from 'models/GitRepository';
import { binToInt } from '../HashSequencer';

let subloop: Sequencer = {
  name: 'SubLoop',
  description: 'Subsequence by loops',
  icon: [
    [0, 0, 1],
    [0, 4, 5],
    [1, 0, 3],
    [1, 6, 7],
    [2, 0, 0],
    [2, 2, 4],
    [2, 6, 7],
    [3, 0, 0],
    [3, 2, 2],
    [3, 4, 4],
    [3, 6, 6]
  ],
  algo: (input: Commit, tracks: number): boolean[][] => {
    let output: boolean[][] = [];

    // this.part = [];
    // binaryHash = hexToArray(hash.substr(4));
    let binary = Array.from(input.binary);

    for (let i = 0; i < tracks; i++) {
      output[i] = splicer(binary.splice(0, 20));
    }

    return output;
  }
};

function splicer(input: number[]): boolean[] {
  var map = [],
    output: boolean[] = [],
    bufferLength = 0,
    canGoOn = true,
    binaryMaxLoop;

  // Mapping of the Input
  while (canGoOn) {
    if (input.length < 2) {
      canGoOn = false;
      continue;
    }

    let loopSize = Math.pow(2, input[0] * 2 + input[1] + 1);
    input.splice(0, 2);

    binaryMaxLoop = binarySizer(Math.ceil((16 - bufferLength) / loopSize));

    if (input.length < loopSize + binaryMaxLoop) {
      canGoOn = false;
      continue;
    }

    map.push({
      size: loopSize,
      data: input.splice(0, loopSize).map(x => !!x),
      loop: binToInt(input.splice(0, binaryMaxLoop)) + 1
    });
  }

  // Transform mapping into binary sequence
  if (!map.length) {
    throw new Error('Wrong mapping dude!');
  }

  map.forEach(function(track) {
    for (var i = track.loop; i > 0; i--) {
      output = output.concat(track.data);
    }
  });

  while (output.length < 16) {
    output = output.concat(output);
  }

  return output.slice(0, 16);
}

function binarySizer(size: number): number {
  switch (true) {
    case size >= 16:
      return 4;
    case size >= 8:
      return 3;
    case size >= 4:
      return 2;
    case size > 1:
      return 1;
    default:
      return 0;
  }
}

export default subloop;
