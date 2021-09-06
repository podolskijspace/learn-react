import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import ItemList from '../../components/itemList';
import SinglePage from '../singlePage';
import ErrorMessage from '../../components/errorMessage';
import GotService from '../../services/gotService';
import { withRouter, Route } from 'react-router';

class BottomPage extends Component {
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
          onItemSelected={(id) => this.props.history.push(`${id}`)}
          getData={() => this.gotService.getData({name:data})}
          />
        </Col>
        <Col md='6'>
          <Route path="/characters/:id" 
            render={({match}) => {
              return <SinglePage itemId={match.params.id} data={'characters'}/>} 
            }
          />
          <Route path="/houses/:id" 
            render={({match}) => {
              return <SinglePage itemId={match.params.id} data={'houses'}/>} 
            }
          />
          <Route path="/books/:id" 
            render={({match}) => {
              return <SinglePage itemId={match.params.id} data={'books'}/>} 
            }
          />
          {/* <CharDetails itemId={this.state.selectedItem} data={data}/> */}
        </Col>
      </Row>
    )
  }
} 

export default withRouter(BottomPage);