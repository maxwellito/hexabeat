export class Deck {
  name: string;
  version: number;
  description: string;
  author: string;
  repositories: string[];
  pathBase: string;
  sets: DeckSet[];
}

export class DeckSet {
  name: string;
  icon: string;
  samples: DeckSample[];
}

export class DeckSample {
  name: string;
  sub: string;
  url: string;
  data: ArrayBuffer;
}
