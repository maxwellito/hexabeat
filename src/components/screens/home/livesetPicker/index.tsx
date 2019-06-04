import * as React from 'react';
import { Liveset } from 'models/Liveset';
import './index.css';

// [komponent-class]: livesetitem

export interface LivesetItemProps {
  item: Liveset;
  isActive: boolean;
  isSelected: boolean;
  onSelect: (index: number, isSelected: boolean) => void;
  index: number;
}

export class LivesetItem extends React.Component<LivesetItemProps> {
  constructor(props: LivesetItemProps) {
    super(props);
  }
  clickListener = this.onClick.bind(this);
  onClick() {
    this.props.onSelect(this.props.index, true);
  }

  hoverListener = this.onHover.bind(this);
  onHover() {
    this.props.onSelect(this.props.index, false);
  }
  render() {
    const { item, isActive, isSelected } = this.props;
    const classes = ['livesetitem', 'picker-item'];
    if (isActive) {
      classes.push('active');
    }
    if (isActive && isSelected) {
      classes.push('active selected');
    }

    if (!item) {
      return (
        <div
          className={classes.join(' ')}
          onClick={this.clickListener}
          onMouseOver={this.hoverListener}
        >
          <div className='livesetitem-title'>[+] Add Liveset</div>
          <div>Upload liveset file</div>
        </div>
      );
    }

    return (
      <div
        className={classes.join(' ')}
        onClick={this.clickListener}
        onMouseOver={this.hoverListener}
      >
        <div className='livesetitem-title'>{item.name}</div>
        <div className='livesetitem-meta-1'>
          <span className='livesetitem-label'>version</span>
          <span className='livesetitem-contents'>{item.version}</span>
        </div>
        <div className='livesetitem-meta-2'>
          <span className='livesetitem-label'>author</span>
          <span className='livesetitem-contents'>{item.author}</span>
        </div>
        <div className='livesetitem-description'>{item.description}</div>
      </div>
    );
  }
}
