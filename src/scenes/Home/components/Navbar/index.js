import React, { Component } from 'react';
import PropTypes from 'prop-types';
import KHeadIcon from '_assets/png/KHeadIcon.png';
import 'components/Button/styles.css';
import NavbarButton from './components/NavbarButton';
import './styles.css';

class Navbar extends Component {
  render() {
    const { currentScene, actions, onAction } = this.props;

    return (
      <div className="navbar">
        <div className="navbar-logo">
          <img src={KHeadIcon} alt="KNoT logo" />
          <p>KNoT Cloud</p>
        </div>
        <div className="navbar-actions">
          {actions.map(action => (
            <NavbarButton key={action} name={action} onClick={onAction} status={currentScene === action ? 'current' : 'not-current'} />
          ))}
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  currentScene: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAction: PropTypes.func.isRequired
};

export default Navbar;
