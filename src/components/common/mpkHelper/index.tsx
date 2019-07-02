import * as React from 'react';
import {MpkKey} from 'services/MpkController'

import './index.css';


export class MpkHelper extends React.Component {

  render() {
    const labels: {[key: number]: string} = {
      [MpkKey.pad1]: 'PLAY/PAUSE',
      [MpkKey.pad4]: 'DELETE/ADD TRACK',
      [MpkKey.pad5]: 'MUTE TRACK',
      [MpkKey.pad6]: 'SOLO TRACK',
      [MpkKey.pad7]: 'OPEN CRAFTER',
      [MpkKey.nob1]: 'SELECT TRACK',
      [MpkKey.nob2]: 'PICK NEW TRACK',
      [MpkKey.nob3]: 'OUTPUT VOLUME',
      [MpkKey.nob4]: 'BPM',
      [MpkKey.nob5]: 'TRACK VOLUME',
      [MpkKey.nob6]: 'TRACK FILTER FREQUENCY',
      [MpkKey.nob7]: 'TRACK FILTER QUALITY'
    }
    return (
      <svg width="1140px" height="600px" viewBox="-20 0 1120 600" preserveAspectRatio="xMidYMid" className="mpkhelper">
        <g fill="none" stroke="#fff">
          <g id="pad_1" className={!!labels[MpkKey.pad1] ? '' : 'disabled'}>
            <rect x="63.5" y="190.5" stroke-width="2" rx="4" stroke-miterlimit="10" width="98" height="98"/>
            <rect x="68.5" y="195.5" stroke-miterlimit="10" width="88" height="88"/>
          </g>
          <g id="pad_2" className={!!labels[MpkKey.pad2] ? '' : 'disabled'}>
            <rect x="183.5" y="190.5" stroke-width="2" rx="4" stroke-miterlimit="10" width="98" height="98"/>
            <rect x="188.5" y="195.5" stroke-miterlimit="10" width="88" height="88"/>
          </g>
          <g id="pad_3" className={!!labels[MpkKey.pad3] ? '' : 'disabled'}>
            <rect x="304" y="190.5" stroke-width="2" rx="4" stroke-miterlimit="10" width="98" height="98"/>
            <rect x="309" y="195.5" stroke-miterlimit="10" width="88" height="88"/>
          </g>
          <g id="pad_4" className={!!labels[MpkKey.pad4] ? '' : 'disabled'}>
            <rect x="424" y="190.5" stroke-width="2" rx="4" stroke-miterlimit="10" width="98" height="98"/>
            <rect x="429" y="195.5" stroke-miterlimit="10" width="88" height="88"/>
          </g>
          <g id="pad_5" className={!!labels[MpkKey.pad5] ? '' : 'disabled'}>
            <rect x="63.5" y="311" stroke-width="2" rx="4" stroke-miterlimit="10" width="98" height="98"/>
            <rect x="68.5" y="316" stroke-miterlimit="10" width="88" height="88"/>
          </g>
          <g id="pad_6" className={!!labels[MpkKey.pad6] ? '' : 'disabled'}>
            <rect x="183.5" y="311" stroke-width="2" rx="4" stroke-miterlimit="10" width="98" height="98"/>
            <rect x="188.5" y="316" stroke-miterlimit="10" width="88" height="88"/>
          </g>
          <g id="pad_7" className={!!labels[MpkKey.pad7] ? '' : 'disabled'}>
            <rect x="304" y="311" stroke-width="2" rx="4" stroke-miterlimit="10" width="98" height="98"/>
            <rect x="309" y="316" stroke-miterlimit="10" width="88" height="88"/>
          </g>
          <g id="pad_8" className={!!labels[MpkKey.pad8] ? '' : 'disabled'}>
            <rect x="424" y="311" stroke-width="2" rx="4" stroke-miterlimit="10" width="98" height="98"/>
            <rect x="429" y="316" stroke-miterlimit="10" width="88" height="88"/>
          </g>

          <g id="nob_1" className={!!labels[MpkKey.nob1] ? '' : 'disabled'}>
            <circle stroke-width="2" stroke-miterlimit="10" cx="583.5" cy="250.5" r="27"/>
            <circle stroke-miterlimit="10" cx="583.5" cy="247" r="21"/>
            <line stroke-width="8" stroke-miterlimit="10" x1="583.5" y1="253.5" x2="583.5" y2="223.5"/>
          </g>
          <g id="nob_2" className={!!labels[MpkKey.nob2] ? '' : 'disabled'}>
            <circle stroke-width="2" stroke-miterlimit="10" cx="681.5" cy="250.5" r="27"/>
            <circle stroke-miterlimit="10" cx="681.5" cy="247" r="21"/>
            <line stroke-width="8" stroke-miterlimit="10" x1="681.5" y1="253.5" x2="681.5" y2="223.5"/>
          </g>
          <g id="nob_3" className={!!labels[MpkKey.nob3] ? '' : 'disabled'}>
            <circle stroke-width="2" stroke-miterlimit="10" cx="779.5" cy="250.5" r="27"/>
            <circle stroke-miterlimit="10" cx="779.5" cy="247" r="21"/>
            <line stroke-width="8" stroke-miterlimit="10" x1="779.5" y1="253.5" x2="779.5" y2="223.5"/>
          </g>
          <g id="nob_4" className={!!labels[MpkKey.nob4] ? '' : 'disabled'}>
            <circle stroke-width="2" stroke-miterlimit="10" cx="877.5" cy="250.5" r="27"/>
            <circle stroke-miterlimit="10" cx="877.5" cy="247" r="21"/>
            <line stroke-width="8" stroke-miterlimit="10" x1="877.5" y1="253.5" x2="877.5" y2="223.5"/>
          </g>
          <g id="nob_5" className={!!labels[MpkKey.nob5] ? '' : 'disabled'}>
            <circle stroke-width="2" stroke-miterlimit="10" cx="583.5" cy="355.5" r="27"/>
            <circle stroke-miterlimit="10" cx="583.5" cy="352" r="21"/>
            <line stroke-width="8" stroke-miterlimit="10" x1="583.5" y1="358.5" x2="583.5" y2="328.5"/>
          </g>
          <g id="nob_6" className={!!labels[MpkKey.nob6] ? '' : 'disabled'}>
            <circle stroke-width="2" stroke-miterlimit="10" cx="681.5" cy="355.5" r="27"/>
            <circle stroke-miterlimit="10" cx="681.5" cy="352" r="21"/>
            <line stroke-width="8" stroke-miterlimit="10" x1="681.5" y1="358.5" x2="681.5" y2="328.5"/>
          </g>
          <g id="nob_7" className={!!labels[MpkKey.nob7] ? '' : 'disabled'}>
            <circle stroke-width="2" stroke-miterlimit="10" cx="779.5" cy="355.5" r="27"/>
            <circle stroke-miterlimit="10" cx="779.5" cy="352" r="21"/>
            <line stroke-width="8" stroke-miterlimit="10" x1="779.5" y1="358.5" x2="779.5" y2="328.5"/>
          </g>
          <g id="nob_8" className={!!labels[MpkKey.nob8] ? '' : 'disabled'}>
            <circle stroke-width="2" stroke-miterlimit="10" cx="877.5" cy="355.5" r="27"/>
            <circle stroke-miterlimit="10" cx="877.5" cy="352" r="21"/>
            <line stroke-width="8" stroke-miterlimit="10" x1="877.5" y1="358.5" x2="877.5" y2="328.5"/>
          </g>


          <g id="helper_pad_1" className={!!labels[MpkKey.pad1] ? '' : 'hidden'}>
            <text text-anchor="end" x="130" y="137.3672" fill="#fff" stroke="none">{labels[MpkKey.pad1]}</text>
            <polyline stroke-miterlimit="10" points="138.149,133.5 156.5,133.5 156.5,181.5 		"/>
          </g>
          <g id="helper_pad_2" className={!!labels[MpkKey.pad2] ? '' : 'hidden'}>
            <text text-anchor="end" x="166" y="111.5322" fill="#fff" stroke="none">{labels[MpkKey.pad2]}</text>
            <polyline stroke-miterlimit="10" points="174.231,107.5 276.5,107.5 276.5,181.5 		"/>
          </g>
          <g id="helper_pad_3" className={!!labels[MpkKey.pad3] ? '' : 'hidden'}>
            <text text-anchor="end" x="202" y="85.4438" fill="#fff" stroke="none">{labels[MpkKey.pad3]}</text>
            <polyline stroke-miterlimit="10" points="210.312,81.5 397,81.5 397,181.5 		"/>
          </g>
          <g id="helper_pad_4" className={!!labels[MpkKey.pad4] ? '' : 'hidden'}>
            <text text-anchor="end" x="238" y="59.3672" fill="#fff" stroke="none">{labels[MpkKey.pad4]}</text>
            <polyline stroke-miterlimit="10" points="517,181.5 516.812,55.5 246.395,55.5 		"/>
          </g>
          <g id="helper_pad_5" className={!!labels[MpkKey.pad5] ? '' : 'hidden'}>
            <text text-anchor="end" x="130" y="471.6328" fill="#fff" stroke="none">{labels[MpkKey.pad5]}</text>
            <polyline stroke-miterlimit="10" points="138.149,467.5 156.5,467.5 156.5,419.5 		"/>
          </g>
          <g id="helper_pad_6" className={!!labels[MpkKey.pad6] ? '' : 'hidden'}>
            <text text-anchor="end" x="166" y="497.4678" fill="#fff" stroke="none">{labels[MpkKey.pad6]}</text>
            <polyline stroke-miterlimit="10" points="174.231,493.5 276.5,493.5 276.5,419.5 		"/>
          </g>
          <g id="helper_pad_7" className={!!labels[MpkKey.pad7] ? '' : 'hidden'}>
            <text text-anchor="end" x="202" y="523.5566" fill="#fff" stroke="none">{labels[MpkKey.pad7]}</text>
            <polyline stroke-miterlimit="10" points="210.312,519.5 397,519.5 397,419.5 		"/>
          </g>
          <g id="helper_pad_8" className={!!labels[MpkKey.pad8] ? '' : 'hidden'}>
            <text text-anchor="end" x="238" y="549.6328" fill="#fff" stroke="none">{labels[MpkKey.pad8]}</text>
            <polyline stroke-miterlimit="10" points="517,419.5 516.812,545.5 246.395,545.5 		"/>
          </g>

          <g id="helper_nob_1" className={!!labels[MpkKey.nob1] ? '' : 'hidden'}>
            <text x="865.301" y="59.3672" fill="#fff" stroke="none">{labels[MpkKey.nob1]}</text>
            <polyline stroke-miterlimit="10" points="584.081,212.5 584.27,55.5 854.687,55.5 		"/>
          </g>
          <g id="helper_nob_2" className={!!labels[MpkKey.nob2] ? '' : 'hidden'}>
            <text x="879.289" y="85.4438" fill="#fff" stroke="none">{labels[MpkKey.nob2]}</text>
            <polyline stroke-miterlimit="10" points="868.769,81.5 682.081,81.5 682.081,212.5 		"/>
          </g>
          <g id="helper_nob_3" className={!!labels[MpkKey.nob3] ? '' : 'hidden'}>
            <text x="892.589" y="111.5322" fill="#fff" stroke="none">{labels[MpkKey.nob3]}</text>
            <polyline stroke-miterlimit="10" points="882.183,107.5 779.914,107.5 779.913,212.5 		"/>
          </g>
          <g id="helper_nob_4" className={!!labels[MpkKey.nob4] ? '' : 'hidden'}>
            <text x="906.808" y="137.3672" fill="#fff" stroke="none">{labels[MpkKey.nob4]}</text>
            <polyline stroke-miterlimit="10" points="896.266,133.5 877.914,133.5 877.914,212.5 		"/>
          </g>
          <g id="helper_nob_5" className={!!labels[MpkKey.nob5] ? '' : 'hidden'}>
            <text x="865.301" y="549.6328" fill="#fff" stroke="none">{labels[MpkKey.nob5]}</text>
            <polyline stroke-miterlimit="10" points="584.081,388.5 584.27,545.5 854.687,545.5 		"/>
          </g>
          <g id="helper_nob_6" className={!!labels[MpkKey.nob6] ? '' : 'hidden'}>
            <text x="879.289" y="523.5566" fill="#fff" stroke="none">{labels[MpkKey.nob6]}</text>
            <polyline stroke-miterlimit="10" points="868.769,519.5 682.081,519.5 682.081,388.5 		"/>
          </g>
          <g id="helper_nob_7" className={!!labels[MpkKey.nob7] ? '' : 'hidden'}>
            <text x="892.589" y="497.4678" fill="#fff" stroke="none">{labels[MpkKey.nob7]}</text>
            <polyline stroke-miterlimit="10" points="882.183,493.5 779.914,493.5 779.913,388.5 		"/>
          </g>
          <g id="helper_nob_8" className={!!labels[MpkKey.nob8] ? '' : 'hidden'}>
            <text x="906.808" y="471.6328" fill="#fff" stroke="none">{labels[MpkKey.nob8]}</text>
            <polyline stroke-miterlimit="10" points="896.266,467.5 877.914,467.5 877.914,388.5 		"/>
          </g>
        </g>
      </svg>
    );
  }
}