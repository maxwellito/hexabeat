import { Commit } from 'models/Commit'

export default {
  icon: [
    [1, 0, 1],
    [2, 2, 2],
    [1, 3, 3],
    [0, 4, 4],
    [1, 5, 5],
    [0, 6, 6],
    [2, 7, 7]
  ],
  algo: (input:Commit, tracks:number):number[][] => {
    let lastPosition = -1,
        output = [];
    
    for (let t = 0; t < tracks; t++) {
      output.push([])
    }

    for (let i = 0; i < 16; i++) {
      let rotator = input.quad[i],
          newPosition = lastPosition;

      if (rotator === 0) {
        newPosition = Math.max(0, lastPosition - 1)
      }
      else if (rotator === 3) {
        newPosition = Math.min(tracks - 1, lastPosition + 1)
      }

      for (let t = 0; t < tracks; t++) {
        output[t].push(/*newPosition !== lastPosition && */newPosition === t)
      }
      lastPosition = newPosition;
    }
    return output;
  }
}