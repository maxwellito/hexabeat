export class CommitCollection {
  name: string;
  commits: Commit[];
}

export class Commit {
  name: string;
  hash: string;
  binary: Int8Array;
  quad: Int8Array;
}