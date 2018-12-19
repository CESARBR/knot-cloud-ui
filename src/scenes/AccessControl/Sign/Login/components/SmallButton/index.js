import React from 'react';
import PropTypes from 'prop-types';
import SecondaryButton from 'components/SecondaryButton';
import './styles.css';

const SmallButton = ({ name, type, onClick }) => (
  <SecondaryButton className="btn-small" name={name} type={type} onClick={onClick} />
);

SmallButton.defaultProps = {
  onClick: null
};

SmallButton.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default SmallButton;
