import * as React from 'react';
import { Liveset } from 'models/Liveset';
import './index.css';

/**
 * LivesetItem component
 * Vue component for a liveset item
 *
 * Reserved class names: picker & pickeritem
 */
export interface LivesetItemProps {
  item: Liveset;
  isActive: boolean;
  isSelected: boolean;
  onSelect: (index: number) => void;
  index: number;
}

export class LivesetItem extends React.Component<LivesetItemProps> {
  clickListener = this.onClick.bind(this);
  constructor(props: LivesetItemProps) {
    super(props);
  }
  onClick() {
    this.props.onSelect(this.props.index);
  }
  render() {
    const { item, isActive, isSelected } = this.props;
    const classes = ['liveset-item', 'picker-item'];
    if (isActive) {
      classes.push('active');
    }
    if (isActive && isSelected) {
      classes.push('active selected');
    }

    if (!item) {
      return (
        <div className={classes.join(' ')} onClick={this.clickListener}>
          <div className='liveset-item-title'>[+] Add Liveset</div>
          <div>Upload liveset file</div>
        </div>
      );
    }

    return (
      <div className={classes.join(' ')} onClick={this.clickListener}>
        <div className='liveset-item-title'>{item.name}</div>
        <div className='liveset-item-meta-1'>
          <span className='liveset-item-label'>version</span>
          <span className='liveset-item-contents'>{item.version}</span>
        </div>
        <div className='liveset-item-meta-2'>
          <span className='liveset-item-label'>author</span>
          <span className='liveset-item-contents'>{item.author}</span>
        </div>
        <div className='liveset-item-description'>{item.description}</div>
      </div>
    );
  }
}
