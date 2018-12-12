import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class ErrorMessage extends Component {
  renderMessage(message) {
    return (
      <span className="request-error">
        {message}
      </span>);
  }

  render() {
    const { message } = this.props;
    return (
      <div style={{ height: '85px', width: '100%', clear: 'both' }}>
        {message
        && this.renderMessage(message)}
      </div>
    );
  }
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired
};

export default ErrorMessage;
