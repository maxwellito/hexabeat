export interface RepositoryCollection {
  [sourceName: string]: Repository
}

export interface Repository {
  name: string;
  commits: Commit[];
}

export interface Commit {
  name: string;
  hash: string;
  binary: Int8Array;
  quad: Int8Array;
}