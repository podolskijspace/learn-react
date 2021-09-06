import React, {Component} from 'react';

export default class ErrorMessage extends Component {
  
  render () {
    return (
      <span className="error"> {this.props.children || 'Something goes wrong'}</span>
    )
  }
}
