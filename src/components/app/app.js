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
  }

  onDeleteRandomChar () {
    this.setState({
      randomChar: !this.state.randomChar,
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
              <ItemList />
            </Col>
            <Col md='6'>
              <CharDetails />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
};
