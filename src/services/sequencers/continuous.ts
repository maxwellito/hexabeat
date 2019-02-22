import { Sequencer } from 'models/Sequencer';
import { Commit } from 'models/GitRepository';

let continuous: Sequencer = {
  name: 'Continuous',
  description: '',
  icon: [[1, 0, 1], [0, 2, 2], [1, 3, 3], [2, 4, 5], [3, 6, 6], [2, 7, 7]],
  algo: (input: Commit, tracks: number): boolean[][] => {
    let lastPosition = -1,
      output = [];

    for (let t = 0; t < tracks; t++) {
      output.push([]);
    }

    for (let i = 0; i < 16; i++) {
      let rotator = input.quad[i],
        newPosition = lastPosition;

      if (rotator === 0) {
        newPosition = Math.max(0, lastPosition - 1);
      } else if (rotator === 3) {
        newPosition = Math.min(tracks - 1, lastPosition + 1);
      }

      for (let t = 0; t < tracks; t++) {
        output[t].push(/*newPosition !== lastPosition && */ newPosition === t);
      }
      lastPosition = newPosition;
    }
    return output;
  }
};

export default continuous;
