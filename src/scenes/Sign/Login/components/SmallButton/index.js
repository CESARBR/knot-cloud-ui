import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'components/Button/styles.css';
import './styles.css';

class SmallButton extends Component {
  render() {
    const { name } = this.props;
    return (
      <input className="btn btn-secondary btn-small" type="submit" value={name} />
    );
  }
}

SmallButton.propTypes = {
  name: PropTypes.string.isRequired
};

export default SmallButton;
