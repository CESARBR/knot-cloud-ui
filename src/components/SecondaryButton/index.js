import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import './styles.css';

const SecondaryButton = ({
  name,
  type,
  className,
  onClick
}) => (
  <Button className={`btn-secondary ${className}`} name={name} type={type} onClick={onClick} />
);

SecondaryButton.defaultProps = {
  className: '',
  onClick: null
};

SecondaryButton.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default SecondaryButton;
