import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'components/Button/styles.css';
import './styles.css';

class NewDeviceButton extends Component {
  render() {
    const { addDevice } = this.props;
    const { id } = this.props;

    return (
      <div id={id}>
        <button className="btn-new-device" type="button" onClick={addDevice}>
          <p className="plus">+</p>
        </button>
      </div>);
  }
}

NewDeviceButton.propTypes = {
  id: PropTypes.string.isRequired,
  addDevice: PropTypes.func.isRequired
};

export default NewDeviceButton;
