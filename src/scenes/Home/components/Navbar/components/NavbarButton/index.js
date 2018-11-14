import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'components/Button/styles.css';
import './styles.css';

class NavbarButton extends Component {
  render() {
    const { name } = this.props;
    const { onClickCallback } = this.props;
    const { active } = this.props;
    const isCurrentScene = active ? 'current' : 'not-current';

    return (
      <input className={`btn btn-secondary btn-navbar ${isCurrentScene}`} type="button" value={name} onClick={() => onClickCallback(`${name}`)} />
    );
  }
}

NavbarButton.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClickCallback: PropTypes.func.isRequired
};

export default NavbarButton;
