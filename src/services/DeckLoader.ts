/**
 * DeckLoader
 * From a config file URL or a raw object,
 * the 
 */

import {Deck, DeckSample} from '../models/Deck';
import {fetchJson, fetchArrayBuffer} from './utils/fetch';

class DeckLoader {

  /**
   * Load a config from a URL.
   * This will load the config file
   * then will load the samples.
   */
  load (configUrl:string):Promise<Deck> {
    return fetchJson(configUrl)
      .then(data => this.loadConfig(data)) 
  }

  /**
   * Takes a raw config as input, will cast it
   * to a Deck object and load all the samples.
   * If the samples are loaded without problem,
   * the Promise will be resolved with the Deck
   * object.
   */
  loadConfig (input:any):Promise<Deck> {
    let output:Deck = new Deck();
    output = Object.assign(output, input);
    output.pathBase = output.pathBase || ''

    let samplesFetch:Promise<Blob>[] = [];
    output.sets.forEach(set => {
      set.samples.forEach(sample => {
        samplesFetch.push(
          this.loadSample(sample, output.pathBase)
        );
      })
    })

    return Promise
      .all(samplesFetch) 
      .then(() => output)
  }

  /**
   * Load the sample from a DeckSample
   */
  loadSample (sample:DeckSample, pathBase:string = ''):Promise<Blob> {
    return fetchArrayBuffer(pathBase + sample.url)
      .then(data => sample.data = data)
  }
}

export default new DeckLoader;