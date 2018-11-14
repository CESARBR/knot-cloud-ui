import React, { Component } from 'react';
import PropTypes from 'prop-types';
import KHeadIcon from '_assets/png/KHeadIcon.png';
import 'components/Button/styles.css';
import NavbarButton from './components/NavbarButton';
import './styles.css';

class Navbar extends Component {
  render() {
    const { changeSceneCallback } = this.props;
    const { logoutCallback } = this.props;
    const { currentScene } = this.props;

    return (
      <div className="navbar">
        <div className="navbar-logo">
          <img className="knot-logo" src={KHeadIcon} alt="KNoT logo" />
          <div className="knot-cloud">KNoT Cloud</div>
        </div>
        <div className="navbar-actions">
          <NavbarButton name="Gateways" onClickCallback={changeSceneCallback} active={currentScene === 'Gateways'} />
          <NavbarButton name="Apps" onClickCallback={changeSceneCallback} active={currentScene === 'Apps'} />
        </div>
        <div className="navbar-logout">
          <NavbarButton name="Logout" onClickCallback={logoutCallback} active={false} />
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  currentScene: PropTypes.string.isRequired,
  changeSceneCallback: PropTypes.func.isRequired,
  logoutCallback: PropTypes.func.isRequired
};

export default Navbar;
