import { Commit, CommitCollection } from '../models/Commit';

const firstLiner = /^(.)*(\r?\n|\r)?/;

export default {
  sources: {},

  addSource:(src:string, fetchNow:boolean = true ) => {
    if (this.sources[src]) {
      return;
    }

    let collection = new CommitCollection()
    collection.name = src;
    collection.commits = [];
    this.sources[src] = collection;
  },
  fetch:() => {
    this.source.map(this.githubFetcher)
  },
  /**
   * Method to load commit information from GitHub
   * @param {string} repo Repo name (ex: 'maxwellito/commitbeat')
   * @return {promise} Promise resolved with GitHub data
   */
  githubFetcher: (repo:string) => {
    return fetch(`https://api.github.com/repos/${repo}/commits`)
      .then(response => response.json())
      .then((data:any) => {
        this.sources[repo] = data.map(this.commitParser)
      })
  },


  hashParser: (commit:any):Commit => {
    let hash = commit.sha,
        messageParsed = firstLiner.exec(commit.commit.message),
        name = (messageParsed && messageParsed[0]) || '',
        four, val, len = hash.length,
        binary = new Int8Array(len * 4),
        quad = new Int8Array(len * 2);

    for (var i = 0; i < len; i++) {
      val = this.hexToInt(hash.substr(i, 1))

      quad[i*2]     = Math.floor(val/4);
      quad[i*2 + 1] = val % 4;

      for (four = 3; four >= 0; four--) {
        binary[i * 4 + four] = val % 2;
        val = val >> 1;
      }
    }
    
    return {
      name,
      hash,
      binary,
      quad,
    }
  }

}
