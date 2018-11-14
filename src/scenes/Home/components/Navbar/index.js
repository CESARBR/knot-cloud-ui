import React, { Component } from 'react';
import PropTypes from 'prop-types';
import KHeadIcon from '_assets/png/KHeadIcon.png';
import 'components/Button/styles.css';
import NavbarButton from './components/NavbarButton';
import './styles.css';

class Navbar extends Component {
  render() {
    const { onSceneChange } = this.props;
    const { onSignout } = this.props;
    const { currentScene } = this.props;

    return (
      <div className="navbar">
        <div className="navbar-logo">
          <img src={KHeadIcon} alt="KNoT logo" />
          <p>KNoT Cloud</p>
        </div>
        <div className="navbar-actions">
          <NavbarButton name="Gateways" onClick={onSceneChange} active={currentScene === 'Gateways'} />
          <NavbarButton name="Apps" onClick={onSceneChange} active={currentScene === 'Apps'} />
          <NavbarButton name="Sign Out" onClick={onSignout} active={false} />
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  currentScene: PropTypes.string.isRequired,
  onSceneChange: PropTypes.func.isRequired,
  onSignout: PropTypes.func.isRequired
};

export default Navbar;
