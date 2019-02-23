import { Sequencer } from 'models/Sequencer';

import gradual from './gradual';
import gradualLinear from './gradualLinear';
import snow from './snow';
import subloop from './subloop';

let sequencers: { [name: string]: Sequencer } = {
  gradual,
  gradualLinear,
  snow,
  subloop
};

export default sequencers;
