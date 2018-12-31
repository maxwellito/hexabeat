import * as React from 'react';
import { Mpk } from 'services/MpkController';
import { List, ListItem } from '../list/List';
import store from 'store';
import {RepositoryCollection, Repository} from 'models/GitRepository';
import './SequenceCraftr.css';

export interface SequenceCraftrProps {
}

export interface SequenceCraftrState {
  selectedRepo: number;
  selectedCommit: number;
  selectedSequencer: number;
}


export class SequenceCraftr extends React.Component<SequenceCraftrProps, SequenceCraftrState> {

  updateRepoListener: (newIndex: number) => void;
  updateCommitListener: (newIndex: number) => void;
  updateAlgoListener: (newIndex: number) => void;

  repoCollection: Repository[] = [];
  repoCollectionList: ListItem[];

  constructor(props:SequenceCraftrProps) {
    super(props);
    this.state = {
      selectedRepo: 0,
      selectedCommit: 0,
      selectedSequencer: 0
    };

    this.updateRepoListener = this.updateRepo.bind(this);
    this.updateCommitListener = this.updateCommit.bind(this);
    // this.commitUpdate = this.listUpdate('selectedCommit');
    // this.sequencerUpdate = this.listUpdate('selectedSequencer');

    
    const repoCollection = store.getState().repositoryCollection;
    this.repoCollectionList = Object.keys(repoCollection)
      .map((name: string): ListItem => {
        this.repoCollection.push(repoCollection[name])
        const [author, repoName] = name.split('/');
        return {
          title: repoName,
          subtitle: author
        };
      });
  }

  componentDidMount() {
    // this.knobListenerCanceller = this.mpk.stackNobListener(1,
    //   p => { 
    //     console.log('FF', p);
    //     this.setState({
    //       step: Math.floor(p/8)
    //     });
    //   }
    // );
  }

  updateRepo(newIndex: number) {
  
    this.setState({
      selectedRepo: newIndex,
      selectedCommit: 0
    });
  }

  updateCommit(newIndex: number) {
  
    this.setState({
      selectedCommit: newIndex
    });
  }

  componentWillUnmount() {
    // window.removeEventListener('keyup', this.keyUpListener)
  }



  render() {
    const selectedRepo = this.repoCollection[this.state.selectedRepo];
    const commitList = selectedRepo.commits.map(commit => {
      return {
        title: commit.hash,
        subtitle: commit.name
      };
    })

    return (
      <div className='sequence-craftr-wrap'>
        <List 
          index={this.state.selectedRepo}
          data={this.repoCollectionList}
          onUpdate={this.updateRepoListener}/>
        <List
          key={this.state.selectedCommit}
          index={this.state.selectedCommit}
          data={commitList}
          onUpdate={this.updateCommitListener}
        />
        {/* <List
          index={this.state.selectedSequencer}
          data={listData}
        /> */}
      </div>
    );
  }
}
