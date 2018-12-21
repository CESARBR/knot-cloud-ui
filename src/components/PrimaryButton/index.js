import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import './styles.css';

const PrimaryButton = ({
  name,
  type,
  className,
  onClick,
  disabled
}) => (
  <Button className={`btn-primary ${className}`} name={name} type={type} onClick={onClick} disabled={disabled} />
);

PrimaryButton.defaultProps = {
  className: '',
  disabled: false,
  onClick: null
};

PrimaryButton.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

export default PrimaryButton;
