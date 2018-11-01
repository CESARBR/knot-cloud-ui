import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import '../styles.css';

class ButtonPrimary extends Component {
  render() {
    const { name } = this.props; // eslint-disable-line react/prop-types
    return (
      <div>
        <input className="btn btn-primary" type="submit" value={name} />
      </div>);
  }
}
ButtonPrimary.propTypes = {
  name: PropTypes.string.isRequired
};
export default ButtonPrimary;
