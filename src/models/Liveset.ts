export class Liveset {
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
