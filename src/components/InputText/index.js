import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class InputText extends Component {
  render() {
    const { id, placeholder } = this.props;
    const { type, onChange } = this.props;
    return (
      <div>
        <input className="text-input" id={id} type={type} onChange={onChange} placeholder={placeholder} required />
      </div>);
  }
}
InputText.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
export default InputText;
