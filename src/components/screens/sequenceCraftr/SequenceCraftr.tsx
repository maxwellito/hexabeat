import * as React from 'react';
import { actions, store } from 'store';

import { Repository } from 'models/GitRepository';
import { Sequencer } from 'models/Sequencer';
import sequencers from 'services/sequencers';
import { Mpk, MpkKey } from 'services/MpkController';
import { TrackData } from 'components/screens/playground/track/trackData/trackData';
import { List, ListItem } from 'components/list/List';
import {
  AlgoListItem,
  AlgoListItemProps
} from 'components/list/items/AlgoListItem';
import { HelperIcon } from 'components/common/helperIcon/helperIcon';

import './SequenceCraftr.css';
import Track from 'models/Track';

export interface SequenceCraftrProps {
  track: Track;
}

export class SequenceCraftr extends React.Component<SequenceCraftrProps> {
  updateRepoListener = this.updateRepo.bind(this);
  updateCommitListener = this.updateCommit.bind(this);
  updateSequencerListener = this.updateSequencer.bind(this);

  repoCollection: Repository[] = [];
  repoCollectionList: ListItem[];
  sequencers: Sequencer[] = [];
  sequencersList: AlgoListItemProps[] = [];

  unsubscribeMpk = Mpk.takeControl({
    [MpkKey.pad7]: (isPress: boolean) => {
      if (isPress) {
        this.viiListener();
      }
    },
    [MpkKey.nob5]: (diff: number) => {
      let { track } = this.props;
      this.updateRepo(track.selectedRepo + diff);
    },
    [MpkKey.nob6]: (diff: number) => {
      let { track } = this.props;
      this.updateCommit(track.selectedCommit + diff);
    },
    [MpkKey.nob7]: (diff: number) => {
      let { track } = this.props;
      this.updateSequencer(track.selectedSequencer + diff);
    }
  });

  constructor(props: SequenceCraftrProps) {
    super(props);

    const repoCollection = store.getState().session.gitRepositories;
    this.repoCollectionList = [];
    repoCollection.forEach((value, name) => {
      this.repoCollection.push(value);
      const [author, repoName] = name.split('/');
      this.repoCollectionList.push({
        title: repoName,
        subtitle: author
      });
    });
    Object.keys(sequencers).map(name => {
      this.sequencers.push(sequencers[name]);
      this.sequencersList.push({
        title: sequencers[name].name,
        subtitle: sequencers[name].description,
        icon: sequencers[name].icon
      });
    });
  }

  componentDidMount() {}

  updateRepo(newIndex: number) {
    let { track } = this.props;
    newIndex = Math.min(
      Math.max(0, newIndex),
      this.repoCollectionList.length - 1
    );
    if (newIndex === track.selectedRepo) {
      return;
    }

    track.selectedRepo = newIndex;
    track.selectedCommit = 0;
    this.setState({});
  }

  updateCommit(newIndex: number) {
    let { track } = this.props;
    const repoLength = this.repoCollection[track.selectedRepo].commits.length;
    newIndex = Math.min(Math.max(0, newIndex), repoLength - 1);
    if (newIndex === track.selectedCommit) {
      return;
    }

    track.selectedCommit = newIndex;
    this.setState({});
  }

  updateSequencer(newIndex: number) {
    let { track } = this.props;
    newIndex = Math.min(Math.max(0, newIndex), this.sequencersList.length - 1);
    if (newIndex === track.selectedSequencer) {
      return;
    }

    track.selectedSequencer = newIndex;
    this.setState({});
  }

  componentWillUnmount() {
    // window.removeEventListener('keyup', this.keyUpListener)
    this.unsubscribeMpk();
  }

  viiListener = this.onVii.bind(this);
  onVii(newVolume: number) {
    store.dispatch(actions.releaseEditingTrack());
  }

  render() {
    const { track } = this.props;
    const selectedRepo = this.repoCollection[track.selectedRepo];
    const commitList = selectedRepo.commits.map(commit => {
      return {
        title: commit.hash.substr(0, 24),
        subtitle: commit.name.substr(0, 36)
      };
    });

    // Calculate sequence
    var SHA = selectedRepo.commits[track.selectedCommit];
    var Algo = this.sequencers[track.selectedSequencer];
    var seq = Algo.algo(SHA, track.layers);
    track.partitions = seq;

    return (
      <div className='sequence-craftr' onClick={this.viiListener}>
        <div className='sequence-craftr-wrap'>
          <List
            index={track.selectedRepo}
            data={this.repoCollectionList}
            onUpdate={this.updateRepoListener}
            ref='red'
          />
          <List
            index={track.selectedCommit}
            data={commitList}
            onUpdate={this.updateCommitListener}
          />
          <List
            index={track.selectedSequencer}
            data={this.sequencersList}
            onUpdate={this.updateSequencerListener}
            component={AlgoListItem}
          />
        </div>
        <div className='sequence-craftr-track'>
          <TrackData data={seq} labels={track.labels} />
        </div>
        {/* <HelperIcon index={1} type='nob' />
        <HelperIcon index={3} type='pad' /> */}
      </div>
    );
  }
}
