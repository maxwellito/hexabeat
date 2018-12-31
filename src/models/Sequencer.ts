import {Commit} from './GitRepository';

export interface Sequencer {
  icon: number[][],
  algo: (input:Commit, tracks:number) => number[][]
}