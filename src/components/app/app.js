import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import RandomChar from '../randomChar/';
import Header from '../header/'
import DeleteRandomChar from '../deleteRandomChar/';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';
import logo from '../../logo.svg';

export default class App extends Component {
  state= {
    randomChar: true,
    error: false,
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps, this.props);
  }

  onDeleteRandomChar () {
    this.setState({
      randomChar: !this.state.randomChar,
    })
  }

  componentDidCatch () {
    this.setState({
      error: true,
    })
  }

  render () {
    const {randomChar} = this.state,
          Content = randomChar ? <RandomChar/> : null;

    if (this.state.error) {
      return <ErrorMessage/>
    }

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
          <CharacterPage/>
        </Container>
      </>
    );
  }
};
