import React, { Component } from 'react';
import PropTypes from 'prop-types';
import KHeadIcon from '_assets/png/KHeadIcon.png';
import 'components/Button/styles.css';
import NavbarButton from './components/NavbarButton';
import './styles.css';

class Navbar extends Component {
  render() {
    const { onSceneChange } = this.props;
    const { onLogout } = this.props;
    const { currentScene } = this.props;

    return (
      <div className="navbar">
        <div className="navbar-logo">
          <img className="knot-logo" src={KHeadIcon} alt="KNoT logo" />
          <div className="knot-cloud">KNoT Cloud</div>
        </div>
        <div className="navbar-actions">
          <NavbarButton name="Gateways" onClick={onSceneChange} active={currentScene === 'Gateways'} />
          <NavbarButton name="Apps" onClick={onSceneChange} active={currentScene === 'Apps'} />
        </div>
        <div className="navbar-logout">
          <NavbarButton name="Logout" onClick={onLogout} active={false} />
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  currentScene: PropTypes.string.isRequired,
  onSceneChange: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired
};

export default Navbar;
