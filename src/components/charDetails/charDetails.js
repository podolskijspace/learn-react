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
    console.log(this.props.data);
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
    const {gender, born, died, culture, numberOfPages, publisher, overlord, region} = info;
    switch (data) {
    case "houses":
      return (
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Overlord</span>
            <span>{overlord}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Region</span>
            <span>{region}</span>
          </li>
        </ul>
      )
    case "books":
      return (
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">NumberOfPages</span>
            <span>{numberOfPages}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Publisher</span>
            <span>{publisher}</span>
          </li>
        </ul>
      )
    case "characters":
      return (
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Born</span>
            <span>{born}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Died</span>
            <span>{died}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Culture</span>
            <span>{culture}</span>
          </li>
        </ul>
      )
    default:
      console.error("Something goesWrong");
  }
}