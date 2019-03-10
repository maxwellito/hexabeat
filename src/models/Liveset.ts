export class Liveset {
  name: string;
  version: number;
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
