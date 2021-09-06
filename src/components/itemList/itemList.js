import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner';

export default class ItemList extends Component {
  state = {
    charList: null,
  }

  componentDidMount() {
    const {getData} = this.props;

    
    getData()
    .then((itemList) => {
      this.setState({
        itemList,
        selectedChar: null,
      })
    });
  }

  renderItems (arr) {
    return arr.map((item, i) => {
      return (
        <li 
        className="list-group-item"
        key={i}
        onClick={() => this.props.onItemSelected(1 + i)}
        >
          {item.name}
        </li>
      )
    })
  }

  render() {
    const {itemList} = this.state,
          items = itemList ? this.renderItems(itemList) : null;

    const Content = () => {
      if (!itemList) {
        return <Spinner/>;
      }
      else {
        return (
          <ul className="item-list list-group">
            {items}
          </ul>
        );
      }
    }
    

    return (
      <Content/>
    );
  }
}