const iconList = [
  'accordion',
  'acoustic-guitar',
  'amplifier',
  'bagpipes',
  'balalaika',
  'banjo',
  'bell',
  'cabasa',
  'chimes',
  'clave',
  'conga',
  'cymbals',
  'cymbals-1',
  'djembe',
  'djembe-1',
  'domra',
  'drum',
  'drum-1',
  'drum-set',
  'drumsticks',
  'electric-guitar',
  'electric-guitar-1',
  'flute',
  'flute-1',
  'flute-2',
  'french-horn',
  'harmonica',
  'harp',
  'keyboard',
  'keytar',
  'maracas',
  'metronome',
  'microphone',
  'mixer',
  'pedal',
  'percussion',
  'piano',
  'saxophone',
  'sitar',
  'stand',
  'synthesizer',
  'tambourine',
  'triangle',
  'trumpet',
  'tuning-fork',
  'turntable',
  'ukelele',
  'violin',
  'violin-1',
  'xylophone'
];

import * as React from 'react';

export class IconHelper extends React.Component {
  render() {
    const itemStyle = {
        display: 'inline-block',
        width: '6rem',
        height: '6rem',
        verticalAlign: 'top',
        fontSize: '.75em'
      },
      itemIconStyle = {
        fontSize: '2.5rem'
      },
      labelDoms = iconList.map(label => (
        <div style={itemStyle} key={label}>
          <div style={itemIconStyle} className={'icon-' + label} />
          <div>{label}</div>
        </div>
      ));
    return <div>{labelDoms}</div>;
  }
}
