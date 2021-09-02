import React, {Component} from 'react';
import './itemList.css';
import GotService from '../../services/gotService';
import Spinner from '../spinner';

export default class ItemList extends Component {

  gotService = new GotService();

  state = {
    charList: null,
  }

  componentDidMount() {
    this.gotService.getAllCharacters()
    .then((charList) => {
      this.setState({
        charList,
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
        onClick={() => this.props.onCharSelected(41 + i)}
        >
          {item.name}
        </li>
      )
    })
  }

  render() {
    const {charList} = this.state;
    
    if (!charList) {
      return <Spinner/>
    }
    const items = this.renderItems(charList);

    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
  }
}