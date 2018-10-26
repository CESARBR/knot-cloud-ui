import React, { Component } from 'react';
import './styles.css';

class MessageError extends Component {
    render() {
        return (
        <p className="request-error">
          {this.props.errMessage}
        </p>)
    }
}
export default MessageError;