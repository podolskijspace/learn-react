import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import RandomChar from '../randomChar/';
import ItemList from '../itemList/';
import CharDetails from '../charDetails/';
import Header from '../header/'
import DeleteRandomChar from '../deleteRandomChar/';
import logo from '../../logo.svg';

export default class App extends Component {
  state= {
    randomChar: true,
    selectedChar: 130,
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps, this.props);
  }

  onDeleteRandomChar () {
    this.setState({
      randomChar: !this.state.randomChar,
    })
  }

  onCharSelected(id) {
    console.log(id);
    this.setState({
      selectedChar: id,
    })
  }

  render () {
    const {randomChar} = this.state,
          Content = randomChar ? <RandomChar/> : null;

    return (
      <> 
        <Container>
          <Header />
        </Container>
        <Container>
          <Row>
            <Col lg={{size: 5, offset: 0}}>
              {Content}
            </Col>
          </Row>
          <Row>
            <DeleteRandomChar onDeleteRandomChar={this.onDeleteRandomChar.bind(this)}/>
          </Row>
          <Row>
            <Col md='6'>
              <ItemList onCharSelected={this.onCharSelected.bind(this)}/>
            </Col>
            <Col md='6'>
              <CharDetails charId={this.state.selectedChar}/>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
};
