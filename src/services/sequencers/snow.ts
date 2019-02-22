import { Sequencer } from 'models/Sequencer';
import { Commit } from 'models/GitRepository';

let snow: Sequencer = {
  name: 'Snow',
  description: 'Translate pure SHA binary to sequence',
  icon: [
    [0, 0, 1],
    [0, 3, 3],
    [0, 5, 5],
    [0, 7, 7],
    [1, 1, 2],
    [1, 4, 7],
    [2, 4, 4],
    [2, 6, 6],
    [3, 0, 0],
    [3, 2, 3],
    [3, 5, 5]
  ],
  algo: (input: Commit, tracks: number): boolean[][] => {
    let output: boolean[][] = [];
    for (let t = 0; t < tracks; t++) {
      let line: boolean[] = [];
      input.binary
        .slice(t * 16, (t + 1) * 16)
        .forEach(value => line.push(!!value));
      output.push(line);
    }
    return output;
  }
};

export default snow;
