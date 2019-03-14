import { Commit, Repository } from 'models/GitRepository';

const firstLiner = /^(.)*(\r?\n|\r)?/;

/**
 * Method to load commit information from GitHub
 * @param {string} repo Repo name (ex: 'maxwellito/commitbeat')
 * @return {promise} Promise resolved with GitHub data
 */
export function githubFetcher(repo: string): Promise<Repository> {
  // return fetch(`https://api.github.com/repos/${repo}/commits`)
  return fetch(`/public/repos/${repo}.json`)
    .then(response => response.json())
    .then((data: any) => {
      return {
        name: repo,
        commits: data.map(hashParser)
      };
    });
}

/**
 * Transform a GitHub commit into a Commit object
 * This one contain trimmed label, original SHA
 * and parsed version into hexadecimal and quadecimal
 *
 * @param {object} commit Commit object from GitHub API
 * @return {Commit} Lovaly formatted commit object
 */
function hashParser(commit: any): Commit {
  let hash = commit.sha,
    messageParsed = firstLiner.exec(commit.commit.message),
    name = (messageParsed && messageParsed[0]) || '',
    four,
    val,
    len = hash.length,
    binary = new Int8Array(len * 4),
    quad = new Int8Array(len * 2);

  for (var i = 0; i < len; i++) {
    val = hexToInt(hash.substr(i, 1));

    quad[i * 2] = Math.floor(val / 4);
    quad[i * 2 + 1] = val % 4;

    for (four = 3; four >= 0; four--) {
      binary[i * 4 + four] = val % 2;
      val = val >> 1;
    }
  }

  return {
    name,
    hash,
    binary,
    quad
  };
}

/**
 * Convert hexadecimal character to number.
 * @param input Hexadecimal character
 */
function hexToInt(input: string) {
  return parseInt(input, 16);
}
