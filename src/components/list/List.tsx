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

  previousIndex:number = 0;
  isScrollingDown: true;

  constructor(props:ListProps) {
    super(props);
    this.state = {
      index: 0
    }
  }

  shouldComponentUpdate(nextProps:ListProps) {
    return nextProps.index !== this.props.index;
  }

  render() {
    let topList:any[] = [],
        selectedItem:any,
        bottomList:any[] = [];
        
    this.props.data.forEach((item:ListItem, index:number) => {
      let itemClass = 'list-item ' + (index === this.props.index ? 'active' : ''),
          itemElements = [<p className='list-item-title'  key={'ff'+index}>{item.title}</p>];
      
      if (item.subtitle) {
        itemElements.push(<p className='list-item-subtitle'>{item.subtitle}</p>)
      }

      let output = <div className={itemClass} key={index}>{itemElements}</div>
      if (index === this.props.index) {
        selectedItem = output;
      }
      else {
        (index < this.props.index ? topList : bottomList).push(output)
      }
    })

    let wrapClass = this.previousIndex > this.props.index ? 'down' : 'up';
    this.previousIndex = this.props.index;

    return (
      <div className={'list-wrap ' + wrapClass}>
        <div className='list-wrap-top'>{topList}</div>
        {selectedItem}
        <div className='list-wrap-bottom'>{bottomList}</div>
      </div>
    );
  }
}