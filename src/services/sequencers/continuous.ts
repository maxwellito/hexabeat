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
  algo: (input:Commit, tracks:number) => {
    let lastPosition = input.quad[0],
        output = [];
    
    for (let t = 0; t < tracks; t++) {
      output.push([])
    }

    for (let i = 0; i < 16; i++) {
      let val = input.hash[i];


      for (let t = 0; t < tracks; t++) {
        output[t].push(postrack)
      }
    }
    return [];
  }
}