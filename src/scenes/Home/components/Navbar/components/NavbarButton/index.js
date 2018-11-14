import React from 'react';
import PropTypes from 'prop-types';
import SecondaryButton from 'components/SecondaryButton';
import './styles.css';

const NavbarButton = ({ name, status, onClick }) => (
  <SecondaryButton className={`btn-navbar ${status}`} name={name} type="button" onClick={() => onClick(name)} />
);

NavbarButton.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default NavbarButton;
