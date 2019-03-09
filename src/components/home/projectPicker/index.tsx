import * as React from 'react';
// import { Mpk, MpkKey } from 'services/MpkController';
// import { List } from '../list/List';
// import { TrackComponent } from '../track/track';
// import { SequenceCraftr } from '../sequenceCraftr/SequenceCraftr';
import './index.css';
// import { setCurrentBit } from '../../actions';
// import store from 'store';
import { Deck } from 'models/Deck';

// import { MiniMPK } from '../controllbar/minimpk/MiniMPK';

export interface ProjectPickerProps {
  projects: Deck[];
  selectedIndex: number;
  onChange: (index: number) => void;
}

export interface ProjectPickerState {
  step: number;
}

/**
 * ProjectPicker component
 *
 * Components:
 * - ProjectPicker
 * - ProjectUploader
 * - ProjectStart
 */
export class ProjectPicker extends React.Component<
  ProjectPickerProps,
  ProjectPickerState
> {
  catchClick = this.catchClickListener.bind(this);

  constructor(props: ProjectPickerProps) {
    super(props);
  }

  catchClickListener(proj?: Deck) {
    this.props.onChange(this.props.projects.indexOf(proj));
  }
  render() {
    const selectedIndex = Math.min(
      this.props.projects.length - 1,
      Math.max(-1, this.props.selectedIndex)
    );
    let projectList = this.props.projects.map((projectData, index) => (
      <Project
        data={projectData}
        isSelected={selectedIndex === index}
        onSelect={this.catchClick}
        key={index}
      />
    ));
    return (
      <div className='project-picker'>
        <ProjectAdd
          isSelected={selectedIndex === -1}
          onSelect={this.catchClick}
        />
        {projectList}
      </div>
    );
  }
}

export interface ProjectProps {
  data: Deck;
  isSelected: boolean;
  onSelect: (data: Deck) => void;
}

class Project extends React.Component<ProjectProps> {
  selection = this.selectionListener.bind(this);
  constructor(props: ProjectProps) {
    super(props);
  }
  selectionListener() {
    console.log('>>>>');
    this.props.onSelect(this.props.data);
  }
  render() {
    const project = this.props.data;
    const classNames = ['project-item'];
    classNames.push(this.props.isSelected ? 'active' : '');
    return (
      <div className={classNames.join(' ')} onClick={this.selection}>
        <div>{project.name}</div>
        <div>ver. {project.version}</div>
        <div>by {project.author}</div>
        <div>{project.description}</div>
      </div>
    );
  }
}

export interface ProjectAddProps {
  isSelected: boolean;
  onSelect: () => void;
}

class ProjectAdd extends React.Component<ProjectAddProps> {
  render() {
    const classNames = ['project-item'];
    classNames.push(this.props.isSelected ? 'active' : '');
    return (
      <div className={classNames.join(' ')} onClick={this.props.onSelect}>
        <div>+</div>
        <div>Add project</div>
      </div>
    );
  }
}
