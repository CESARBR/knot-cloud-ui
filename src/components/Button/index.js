import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Button = ({
  name,
  type,
  className,
  onClick,
  disabled
}) => (
  <div>
    <input disabled={disabled} className={`btn ${className}`} type={type} value={name} onClick={onClick} />
  </div>
);

Button.defaultProps = {
  className: '',
  disabled: false,
  onClick: null
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

export default Button;
