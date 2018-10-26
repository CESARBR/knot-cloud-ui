import React, { Component } from 'react';
import './styles.css';

class MessageError extends Component {
  render() {
    const { errMessage } = this.props; // eslint-disable-line react/prop-types
    if (errMessage) {
      return (
        <div>
          <p className="request-error">
            {errMessage}
          </p>
        </div>);
    } else { // eslint-disable-line no-else-return
      return null;
    }
  }
}
export default MessageError;
