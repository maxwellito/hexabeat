import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from './App';
import store from './store';

import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById("root")
);


// Playground

// import commitLoader from 'services/CommitLoader';
// commitLoader.addSource('maxwellito/vivus')
// commitLoader.addSource('maxwellito/triangulart')
// commitLoader.fetch().then(
//   () => {
//     console.info(commitLoader)
//   },
//   (e) => {
//     console.warn(commitLoader, e)
//   }
// )

import deckLoader from 'services/DeckLoader';
import Track from "models/Track";


window.onafterprint = () => {
deckLoader.load('public/decks/demo.json')
  .then(
    (myDeck) => {

      let sess = new Session;
      myDeck.sets.forEach((set, x) => {
        let trck = new Track;
        set.samples.forEach((sample) => {
          trck.addSample(sample.data);
        })
        trck.partitions = pp[x];
        sess.tracks.push(trck);
      });
      console.log(sess);
      debugger;

      let ii = 0;
      setInterval(function () {
        sess.tracks.forEach(trck => trck.playAt(ii));
        ii = (ii + 17) % 16;
      }, 98);

    },
    (e) => {
      console.warn(deckLoader, e)
    }
  )
  .catch(console.log)
}
const pp = [
  [
    [!!0,!!0,!!0,!!0,!!0,!!0,!!0,!!0,!!0,!!0,!!0,!!0,!!0,!!0,!!0,!!0],
    [!!1,!!0,!!0,!!0,!!0,!!0,!!0,!!0,!!1,!!0,!!0,!!0,!!0,!!0,!!0,!!0],
    [!!0,!!0,!!0,!!0,!!0,!!0,!!0,!!0,!!0,!!0,!!0,!!0,!!0,!!0,!!0,!!0],
  ],
  [
    [!!0,!!0,!!0,!!0,!!0,!!0,!!0,!!0,!!0,!!0,!!0,!!0,!!0,!!0,!!0,!!0],
    [!!0,!!0,!!0,!!0,!!0,!!0,!!0,!!0,!!1,!!0,!!1,!!0,!!1,!!0,!!1,!!1],
    [!!1,!!0,!!1,!!0,!!1,!!0,!!1,!!0,!!0,!!0,!!0,!!0,!!0,!!0,!!0,!!0],
  ]
]

class Session {
  tracks: Track[] = [];


}