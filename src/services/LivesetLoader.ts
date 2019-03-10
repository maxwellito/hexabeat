/**
 * LivesetLoader
 * From a config file URL or a raw object,
 * the
 */

import { Liveset, SampleItem } from '../models/Liveset';
import { fetchJson, fetchArrayBuffer } from './utils/fetch';

class LivesetLoader {
  /**
   * Load a config from a URL.
   * This will load the config file
   * then will load the samples.
   */
  load(configUrl: string): Promise<Liveset> {
    return fetchJson(configUrl).then(data => this.loadConfig(data));
  }

  /**
   * Takes a raw config as input, will cast it
   * to a Liveset object and load all the samples.
   * If the samples are loaded without problem,
   * the Promise will be resolved with the Liveset
   * object.
   */
  loadConfig(input: any): Promise<Liveset> {
    let output: Liveset = new Liveset();
    output = Object.assign(output, input);
    output.pathBase = output.pathBase || '';

    let samplesFetch: Promise<Blob>[] = [];
    output.sampleGroups.forEach(set => {
      set.samples.forEach(sample => {
        samplesFetch.push(this.loadSample(sample, output.pathBase));
      });
    });

    return Promise.all(samplesFetch).then(() => output);
  }

  /**
   * Load the sample from a SampleItem
   */
  loadSample(sample: SampleItem, pathBase: string = ''): Promise<Blob> {
    return fetchArrayBuffer(pathBase + sample.url).then(
      data => (sample.data = data)
    );
  }
}

export default new LivesetLoader();
