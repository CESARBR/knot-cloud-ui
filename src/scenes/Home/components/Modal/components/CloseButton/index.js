import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const CloseButton = ({ onClick, className }) => (
  <button
    type="button"
    className={`close-button ${className}`}
    onClick={onClick}
  >
  X
  </button>
);

CloseButton.defaultProps = {
  className: ''
};

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default CloseButton;
