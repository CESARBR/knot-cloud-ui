import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'components/Button/styles.css';
import './styles.css';

class SecondaryButton extends Component {
  render() {
    const { name } = this.props;
    return (
      <div>
        <input className="btn btn-secondary" type="submit" value={name} />
      </div>);
  }
}

SecondaryButton.propTypes = {
  name: PropTypes.string.isRequired
};

export default SecondaryButton;
