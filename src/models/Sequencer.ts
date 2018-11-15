import {Commit} from './Commit';

export interface Sequencer {
  icon: number[][],
  algo: (input:Commit, tracks:number) => number[][]
}