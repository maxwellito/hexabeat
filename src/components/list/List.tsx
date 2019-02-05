import * as React from 'react';
import './List.css';

const WHEEL_STEP = 4;

export interface ListProps {
  data: ListItem[];
  index: number;
  onUpdate?: (newIndex: number) => void;
}

export interface ListState {
}

export interface ListItem {
  title: string;
  subtitle?: string;
  icon?: string;
}

export class List extends React.Component<ListProps, ListState> {

  previousIndex:number = 0;
  isScrollingDown: true;
  wheelListener: (e:React.WheelEvent) => void;
  wheelAcc = 0;

  constructor(props:ListProps) {
    super(props);
    this.state = {
      index: 0
    }
    this.wheelListener = this.onWheel.bind(this);


    console.log(this.props.children)
  }

  onWheel(e:React.WheelEvent) {
    const Y = e.deltaY;
    let newIndex = this.props.index;
    if (!Y) {
      return;
    }
    this.wheelAcc += Y > 0 ? 1 : -1;

    if (this.wheelAcc >= WHEEL_STEP) {
      newIndex += Math.floor(this.wheelAcc / WHEEL_STEP);
      this.wheelAcc %= WHEEL_STEP;
    }
    else if (this.wheelAcc <= -WHEEL_STEP) {
      newIndex -= Math.floor(-this.wheelAcc / WHEEL_STEP);
      this.wheelAcc = -(-this.wheelAcc % WHEEL_STEP);
    }
    else {
      return;
    }

    newIndex = Math.min(this.props.data.length-1, Math.max(0, newIndex));
    this.props.onUpdate(newIndex);
  }

  shouldComponentUpdate(nextProps:ListProps) {
    return  nextProps.index !== this.props.index ||
            nextProps.data !== this.props.data;
  }

  render() {
    let topList:any[] = [],
        selectedItem:any,
        bottomList:any[] = [];
        
    this.props.data.forEach((item:ListItem, index:number) => {
      let itemClass = 'list-item ' + (index === this.props.index ? 'active' : ''),
          itemElements = [<p className='list-item-title'  key={index+'_title'}>{item.title}</p>];
      
      if (item.subtitle) {
        itemElements.push(<p className='list-item-subtitle' key={index+'_sub'}>{item.subtitle}</p>)
      }
      if (item.icon) {
        itemElements.unshift(<span className='list-item-icon {item.icon}' key={index+'_icon'}></span>)
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
      <div className={'list-wrap ' + wrapClass} onWheel={this.wheelListener}>
        <div className='list-wrap-top'>{topList}</div>
        {selectedItem}
        <div className='list-wrap-bottom'>{bottomList}</div>
      </div>
    );
  }
}