import React, {Component} from 'react';
import './charDetails.css';
import GotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';

export default class CharDetails extends Component {
  gotService = new GotService();

  state = {
    item: null,
  }

  componentDidMount () {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateChar();
    }
  }

  updateChar () {
    const {itemId} = this.props;
    if (!itemId) {
      return 
    }
    this.gotService.getData({name:this.props.data, id:itemId})
      .then((item) => {
        this.setState({item})
      })
    
    // this.foo.bar = 0; //Симулируем ошибку
  }

  render() {
    if (!this.state.item) {
      return (
        <ErrorMessage>
          Can't get data
        </ErrorMessage>
      );
    }

    const {name} = this.state.item;

    return (
      <div className="char-details rounded">
        <h4>{name}</h4>
        <DataList data={this.props.data} info={this.state.item}/>
      </div>
    );
  }
}

const DataList = ({data, info}) => {
    const {gender, born, died, culture, numberOfPages, publisher, released, overlord, words, region} = info;
    switch (data) {
    case "houses":
      return (
        <ul className="list-group list-group-flush">
          <Item text={region} info={'Region'}/>
          <Item text={words} info={'Words'}/>
          <Item text={overlord} info={'Overlord'}/>
        </ul>
      )
    case "books":
      return (
        <ul className="list-group list-group-flush">
          <Item text={numberOfPages} info={'Number Of Pages'}/>
          <Item text={publisher} info={'Publisher'}/>
          <Item text={released} info={'Released'}/>
          <Item text={culture} info={'Culture'}/>
        </ul>
      )
    case "characters":
      return (
        <ul className="list-group list-group-flush">
          <Item text={gender} info={'Gender'}/>
          <Item text={born} info={'Born'}/>
          <Item text={died} info={'Died'}/>
          <Item text={culture} info={'Culture'}/>
        </ul>
      )
    default:
      console.error("Something goes wrong");
  }
}

const Item = ({text, info}) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="term">{info}</span>
      <span>{text}</span>
    </li>
  )
}