import { isValidElement } from "../../node_modules/@types/react";

export class Deck {
  name: string;
  version: number;
  description: string;
  author: string;
  pathBase: string;
  sets: DeckSet[]

  //# To DEV
  getHash():string {
    return ''
  }
}

export class DeckSet {
  name: string;
  icon: string;
  samples: DeckSample[]
}

export class DeckSample {
  name: string;
  sub: string;
  url: string;
  blob: Blob;
}