import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class ErrorMessage extends Component {
  render() {
    const { message } = this.props;
    if (message) {
      return (
        <p className="request-error">
          {message}
        </p>
      );
    }
    return null;
  }
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired
};

export default ErrorMessage;
