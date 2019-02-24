import * as React from 'react';
import { ListItem } from '../List';

/**
 * Default list item
 */
export class DefaultListItem extends React.Component<ListItem> {
  render() {
    let classes = ['list-item'];

    if (this.props.isActive) {
      classes.push('active');
    }

    return (
      <div className={classes.join(' ')}>
        <p className='list-item-title'>{this.props.title}</p>
        <p className='list-item-subtitle'>{this.props.subtitle || ''}</p>
      </div>
    );
  }
}
