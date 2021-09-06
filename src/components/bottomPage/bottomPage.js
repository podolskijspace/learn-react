import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';

export default class BottomPage extends Component {
  gotService = new GotService();

  state= {
    selectedItem: 11,
    error: false,
  }

  componentDidCatch () {
    this.setState({
      error: true,
    })
  }

  onItemSelected(id) {
    this.setState({
      selectedItem: id,
    })
  }

  render () {
    const {data} = this.props;
    if (this.state.error) {
      return (
        <ErrorMessage>
          Something wrong with Component
        </ErrorMessage>
      );
    }

    return (
      <Row>
        <Col md='6'>
          <ItemList 
          onItemSelected={this.onItemSelected.bind(this)}
          getData={() => this.gotService.getData({name:data})}
          />
        </Col>
        <Col md='6'>
          <CharDetails itemId={this.state.selectedItem} data={data}/>
        </Col>
      </Row>
    )
  }
} 