import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const ModalButton = ({
  name,
  className,
  onClick,
  disabled
}) => (
  <input disabled={disabled} className={`btn-modal ${className}`} type="button" value={name} onClick={onClick} />
);

ModalButton.defaultProps = {
  disabled: false,
  className: ''
};

ModalButton.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default ModalButton;
