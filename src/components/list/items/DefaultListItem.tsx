import * as React from 'react';
import { ListItem } from '../List';

// [komponent-class]: listitem

/**
 * Default list item
 */
export class DefaultListItem extends React.Component<ListItem> {
  render() {
    let classes = ['listitem'];

    if (this.props.isActive) {
      classes.push('active');
    }

    return (
      <div className={classes.join(' ')}>
        <p className='listitem-title'>{this.props.title}</p>
        <p className='listitem-subtitle'>{this.props.subtitle || ''}</p>
      </div>
    );
  }
}
