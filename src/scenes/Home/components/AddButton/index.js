import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'components/Button/styles.css';
import './styles.css';

class AddButton extends Component {
  render() {
    const { onClick, id } = this.props;

    return (
      <div id={id}>
        <button className="btn-new-device" type="button" onClick={onClick}>
          <p className="plus">+</p>
        </button>
      </div>);
  }
}

AddButton.propTypes = {
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default AddButton;
