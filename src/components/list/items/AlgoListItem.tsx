import * as React from 'react';
import { ListItem } from '../List';
import { AlgoIcon } from 'components/common/algoIcon';

// [komponent-class]: algolistitem

/**
 * Algo list item
 */
export interface AlgoListItemProps extends ListItem {
  icon: number[][];
}

export class AlgoListItem extends React.Component<AlgoListItemProps> {
  render() {
    let classes = ['listitem algolistitem'];

    if (this.props.isActive) {
      classes.push('active');
    }

    return (
      <div className={classes.join(' ')}>
        <AlgoIcon data={this.props.icon} />
        <p className='listitem-title'>{this.props.title}</p>
        <p className='listitem-subtitle'>{this.props.subtitle || ''}</p>
      </div>
    );
  }
}
