import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Button = ({
  name,
  type,
  className,
  onClick
}) => (
  <div>
    <input className={`btn ${className}`} type={type} value={name} onClick={onClick} />
  </div>
);

Button.defaultProps = {
  className: '',
  onClick: null
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
