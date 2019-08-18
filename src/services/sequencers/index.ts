import { Sequencer } from 'models/Sequencer';

import beat from './beat';
import gradual from './gradual';
import gradualLinear from './gradualLinear';
import snow from './snow';
import subloop from './subloop';

let sequencers: { [name: string]: Sequencer } = {
  gradual,
  gradualLinear,
  beat,
  subloop,
  snow
};

export default sequencers;
