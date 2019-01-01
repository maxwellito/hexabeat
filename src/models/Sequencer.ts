import {Commit} from './GitRepository';

export interface Sequencer {
  name: string,
  description: string,
  icon: number[][],
  algo: (input:Commit, tracks:number) => number[][]
}