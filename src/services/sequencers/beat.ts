import { Sequencer } from 'models/Sequencer';
import { Commit } from 'models/GitRepository';

let beat: Sequencer = {
  name: 'Beat',
  description: 'Beat maker',
  icon: [
    [0, 0, 0],
    [0, 4, 4],
    [1, 0, 3],
    [2, 2, 3],
    [2, 6, 7],
    [3, 0, 0],
    [3, 2, 2],
    [3, 4, 4],
    [3, 6, 6]
  ],
  algo: (input: Commit, tracks: number): boolean[][] => {
    let index = 0,
      output = [];

    let next = function() {
      return input.quad[index++];
    };

    console.log(`New beat`);

    for (let t = 0; t < tracks; t++) {
      /**
       * beatSize
       * - value: 0~7
       *    0: 1
       *    1: 2,
       *    2: 4,
       *    3: 8,
       *    4: 16,
       *    5,6,7: No beat
       *
       * offset
       * - value: 0~15
       */
      let beatSize = Math.pow(2, next() + next()),
        offset = (next() * 4 + next()) % beatSize,
        row = [];

      console.log(`  ${t}: ${beatSize}, ${offset}`);

      if (beatSize > 16) {
        offset = -1;
      }

      for (let i = 0; i < 16; i++) {
        row.push(i % beatSize === offset);
      }
      output.push(row);
    }
    return output;
  }
};

export default beat;
