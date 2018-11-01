import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'components/Button/styles.css';
import './styles.css';

class ButtonSmall extends Component {
  render() {
    const { name } = this.props; // eslint-disable-line react/prop-types
    return (
      <input className="btn btn-secondary btn-small" type="submit" value={name} />
    );
  }
}
ButtonSmall.propTypes = {
  name: PropTypes.string.isRequired
};
export default ButtonSmall;
