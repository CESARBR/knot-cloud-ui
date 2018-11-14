import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'components/Button/styles.css';
import './styles.css';

class NavbarButton extends Component {
  render() {
    const { name } = this.props;
    const { onClick } = this.props;
    const { active } = this.props;
    const isCurrent = active ? 'current' : 'not-current';

    return (
      <input className={`btn btn-secondary btn-navbar ${isCurrent}`} type="button" value={name} onClick={() => onClick(`${name}`)} />
    );
  }
}

NavbarButton.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default NavbarButton;
