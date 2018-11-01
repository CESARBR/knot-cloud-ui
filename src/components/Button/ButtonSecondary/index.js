import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import '../styles.css';

class ButtonSecondary extends Component {
  render() {
    const { name } = this.props; // eslint-disable-line react/prop-types
    return (
      <div>
        <input className="btn btn-secondary" type="submit" value={name} />
      </div>);
  }
}
ButtonSecondary.propTypes = {
  name: PropTypes.string.isRequired
};
export default ButtonSecondary;
