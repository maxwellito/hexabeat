/**
 * LivesetLoader
 * From a config file URL or a raw object,
 * the
 */

import { fetchJson, fetchArrayBuffer } from 'services/utils/fetch';
import config from '../config';
import { githubFetcher } from 'services/GithubFetcher';
import { Repository } from 'models/GitRepository';

export class LivesetFile {
  name: string;
  version: string;
  description: string;
  author: string;
  repositories: string[];
  pathBase: string;
  sampleGroups: SampleGroup[];
}

export class SampleGroup {
  name: string;
  icon: string;
  samples: SampleItem[];
}

export class SampleItem {
  name: string;
  sub: string;
  url: string;
  data: ArrayBuffer;
}

export class Liveset extends LivesetFile {
  configUrl: string;
  isFullyLoaded = false;
  repoData = new Map<string, Repository>();

  constructor(configUrl: string) {
    super();
    this.configUrl = configUrl;
  }

  /**
   * Load the config of a Liveset without assets.
   */
  loadConfig(): Promise<Liveset> {
    return fetchJson(this.configUrl)
      .then(data => this.setData(data))
      .then(() => this);
  }

  /**
   * Validate and set data in the object
   * @param input LivesetFile freshly loaded
   */
  setData(input: LivesetFile) {
    const versionPattern = /^(0|([1-9][0-9]*))(\.(0|([1-9][0-9]*))){0,2}$/;
    const repositoryPattern = /^[a-zA-Z-_]+\/[a-zA-Z-_]+$/;

    // Test sample groups
    if (!input.sampleGroups || !input.sampleGroups.length) {
      throw new Error(`Missing sampleGroup of ${this.configUrl}`);
    }
    let exisitingGroupNames: string[] = [];
    for (let x = input.sampleGroups.length - 1; x >= 0; x--) {
      let group = input.sampleGroups[x];
      if (!group.name) {
        throw new Error(
          `Missing name on sampleGroup n."${x}" of ${this.configUrl}`
        );
      }
      if (exisitingGroupNames.indexOf(group.name) > -1) {
        throw new Error(
          `Duplicate sampleGroup name "${group.name}" of ${this.configUrl}`
        );
      }

      if (!group.samples || !group.samples.length) {
        throw new Error(
          `No samples found in "${group.name}" sampleGroup of ${this.configUrl}`
        );
      }
      let exisitingSampleNames: string[] = [];
      for (let y = group.samples.length - 1; y >= 0; y--) {
        let sample = group.samples[y];
        if (!sample.name) {
          throw new Error(
            `Name missing in "${group.name}" sample n.${y} of ${this.configUrl}`
          );
        }
        if (exisitingSampleNames.indexOf(sample.name) > -1) {
          throw new Error(
            `Duplicate name in "${group.name}" sample n.${y} of ${
              this.configUrl
            }`
          );
        }
        if (!sample.url) {
          throw new Error(
            `Name url in "${group.name}" sample n.${y} of ${this.configUrl}`
          );
        }
        exisitingSampleNames.push(sample.name);
      }
      exisitingGroupNames.push(group.name);
    }

    // Test repositories
    if (input.repositories && input.repositories.length) {
      for (let x = input.repositories.length - 1; x >= 0; x--) {
        let repository = input.repositories[x];
        if (!repositoryPattern.test(repository)) {
          throw new Error(
            `Repository n.${x} is invalid in ${
              this.configUrl
            }. It should be "username/repo_name".`
          );
        }
      }
    } else {
      input.repositories = config.repositories;
    }

    // Test version
    if (!input.version) {
      throw new Error(`Version is missing in ${this.configUrl}`);
    } else if (!versionPattern.test(input.version)) {
      throw new Error(`Version is invalid in ${this.configUrl}`);
    }

    this.name = input.name || this.configUrl.split('/').pop();
    this.version = input.version;
    this.description = input.description || '-';
    this.author = input.author || 'unknown';
    this.repositories = input.repositories;
    this.pathBase = input.pathBase;
    this.sampleGroups = input.sampleGroups;
  }

  /**
   * Load the complete assets : commits and samples
   */
  loadAssets() {
    return Promise.all([this.loadRepositories(), this.loadSamples()]).then(
      () => {
        this.isFullyLoaded = true;
        return this;
      }
    );
  }

  /**
   * Load repositories data
   */
  loadRepositories(): Promise<any> {
    return Promise.all(
      this.repositories.map((repo: string) =>
        githubFetcher(repo).then(repoData =>
          this.repoData.set(repoData.name, repoData)
        )
      )
    );
  }

  /**
   * Takes a raw config as input, will cast it
   * to a Liveset object and load all the samples.
   * If the samples are loaded without problem,
   * the Promise will be resolved with the Liveset
   * object.
   */
  loadSamples(): Promise<any> {
    let samplesFetch: Promise<void>[] = [];
    this.sampleGroups.forEach(set => {
      set.samples.forEach(sample => {
        samplesFetch.push(this.loadSample(sample, this.pathBase));
      });
    });

    return Promise.all(samplesFetch);
  }

  /**
   * Load the sample from a SampleItem
   */
  loadSample(sample: SampleItem, pathBase: string = ''): Promise<void> {
    return fetchArrayBuffer(pathBase + sample.url).then(data => {
      sample.data = data;
    });
  }
}
