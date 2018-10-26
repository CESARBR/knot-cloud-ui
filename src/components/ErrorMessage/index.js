import React, { Component } from 'react';
import './styles.css';

class ErrorMessage extends Component {
  render() {
    const { message } = this.props; // eslint-disable-line react/prop-types
    if (message) {
      return (
        <p className="request-error">
          {message}
        </p>);
    }
    return null;
  }
}
export default ErrorMessage;
