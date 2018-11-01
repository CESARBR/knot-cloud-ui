import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'components/Button/styles.css';
import './styles.css';

class PrimaryButton extends Component {
  render() {
    const { name } = this.props;
    return (
      <div>
        <input className="btn btn-primary" type="submit" value={name} />
      </div>);
  }
}

PrimaryButton.propTypes = {
  name: PropTypes.string.isRequired
};

export default PrimaryButton;
