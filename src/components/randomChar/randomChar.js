import React, {Component} from 'react';
import './randomChar.css';
import GotService from '../../services/gotService';
import Spinner from '../spinner/';
import ErrorMessage from '../errorMessage';

export default class RandomChar extends Component {
  gotService = new GotService();
  state = {
    char: {},
    loading: true,
    error: false,
  }

  componentDidMount () {
    this.updateChar();
    this.timerId = setInterval(this.updateChar.bind(this), 5000);
  }

  componentWillUnmount () {
    clearInterval(this.timerId);
  }

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false
    });

  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  updateChar() {
    const id = Math.floor(Math.random()*140 * 10); //10 - 140

    this.gotService.getData({name:'characters', id})
          .then(this.onCharLoaded)
          .catch(this.onError);
  }

  render() {
    const {loading, error} = this.state,
          {name, gender, born, died, culture} = this.state.char;

    const Content = () => {
      if (error) {
        return <ErrorMessage/>;
      } 
      else if (loading) {
        return <Spinner/>;
      }
      else {
        return (
          <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                <span className="term">Gender </span>
                <span>{gender}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span className="term">Born </span>
                <span>{born}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span className="term">Died </span>
                <span>{died}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span className="term">Culture </span>
                <span>{culture}</span>
              </li>
            </ul>
          </>
        )
      }
    }

    return (
      <div className="random-block rounded">
        <Content/>
      </div>
    );
  }
}
