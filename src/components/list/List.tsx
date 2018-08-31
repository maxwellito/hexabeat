import * as React from 'react';
import './List.css';

export interface ListProps {
  data: ListItem[];
  index: number;
}

export interface ListState {
  index: number;
}

class ListItem {
  title: string;
  subtitle?: string;
}

export class List extends React.Component<ListProps, ListState> {

  constructor(props:ListProps) {
    super(props);
    this.state = {
      index: 0
    }
  }

  render() {
    let items = this.props.data.map((item:ListItem, index:number) => {
      let itemClass = 'list-item ' + (index === this.props.index ? 'active' : ''),
          itemElements = [<p className='list-item-title'>{item.title}</p>];
      
      if (item.subtitle) {
        itemElements.push(<p className='list-item-subtitle'>{item.subtitle}</p>)
      }
      return <div className={itemClass} key={index}>
        {itemElements}
      </div>
    })

    return (
      <div className='list-wrap'>
        {items}
      </div>
    );
  }
}