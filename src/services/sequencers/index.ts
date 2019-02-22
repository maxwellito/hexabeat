import { Sequencer } from 'models/Sequencer';

import gradual from './gradual';
import gradualLinear from './gradualLinear';
import snow from './snow';

let sequencers: { [name: string]: Sequencer } = {
  gradual,
  gradualLinear,
  snow
};

export default sequencers;
