import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import RandomChar from '../randomChar/';
import Header from '../header/'
import Button from '../button';
import ErrorMessage from '../errorMessage';
import BottomPage from '../../pages/bottomPage';
import { BrowserRouter, Route} from 'react-router-dom';

export default class App extends Component {
  state= {
    randomChar: true, //Блок с случайным персонажем
    error: false, //Наличие ошибки
  }

  componentDidCatch () { // Отлавливаем ошибку
    this.setState({
      error: true,
    })
  }
  
  onToggleRandomChar () { //При нажатии на кнопку переключение блока с случайным персонажем
    this.setState({
      randomChar: !this.state.randomChar,
    })
  }
  
  render () { //Основная функция
    const {randomChar} = this.state; //Вытаскивыаем из состояния блок с случайным персонажем

    const View = () => { //Проверка на наличие ошибки
      if (this.state.error) {
        return (
          <ErrorMessage>
            Something wrong with Component
          </ErrorMessage>
        )
      } else {
        return (
          <>
            <Container>
              <Header />
            </Container>
            <Container>
              <Row>
                <Col lg={{size: 5, offset: 0}}>
                  {randomChar ? <RandomChar/> : null}
                </Col>
              </Row>
              <Row>
                <Button onClick={this.onToggleRandomChar.bind(this)}/>
              </Row>
                <Route path="/houses"  component={() => <BottomPage data="houses"/>}/>
                <Route path="/books"  component={() => <BottomPage data="books"/>} />
                <Route path="/characters"  component={() => <BottomPage data="characters"/>} />
            </Container>
          </>
        )
      }
    }

    return (
      <BrowserRouter >
        <div className = 'app'>
          <View/>
        </div>
      </BrowserRouter>
    );
  }
};
