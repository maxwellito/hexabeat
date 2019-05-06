import * as React from 'react';
import { ListItem } from '../List';
import { AlgoIcon } from 'components/common/algoIcon/algoIcon';

/**
 * Algo list item
 */
export interface AlgoListItemProps extends ListItem {
  icon: number[][];
}

export class AlgoListItem extends React.Component<AlgoListItemProps> {
  render() {
    let classes = ['list-item algo-list-item'];

    if (this.props.isActive) {
      classes.push('active');
    }

    return (
      <div className={classes.join(' ')}>
        <AlgoIcon data={this.props.icon} />
        <p className='list-item-title'>{this.props.title}</p>
        <p className='list-item-subtitle'>{this.props.subtitle || ''}</p>
      </div>
    );
  }
}
