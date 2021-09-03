import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import ItemList from '../itemList/';
import CharDetails from '../charDetails/';
import ErrorMessage from '../errorMessage';

export default class CharacterPage extends Component {
  state= {
    selectedChar: 130,
    error: false,
  }

  componentDidCatch () {
    this.setState({
      error: true,
    })
  }

  onCharSelected(id) {
    console.log(id);
    this.setState({
      selectedChar: id,
    })
  }

  render () {
    if (this.state.error) {
      return <ErrorMessage/>;
    }

    return (
      <Row>
        <Col md='6'>
          <ItemList onCharSelected={this.onCharSelected.bind(this)}/>
        </Col>
        <Col md='6'>
          <CharDetails charId={this.state.selectedChar}/>
        </Col>
      </Row>
    )
  }
} 