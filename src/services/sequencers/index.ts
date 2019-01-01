import { Sequencer } from 'models/Sequencer';

import continuous from './continuous';

let sequencers: {[name: string]: Sequencer} = {
  continuous
};

export default sequencers;