import * as React from 'react';

/**
 * Base element
 */
export interface ListItemProps {
  isActive?: boolean;
  title: string;
  subtitle?: string;
  icon?: number[][];
}

class ListItem extends React.Component<ListItemProps> {}

/**
 * Default list item
 */
export interface DefaultListItemProps extends ListItemProps {}

export class DefaultListItem extends React.Component<ListItemProps> {
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
