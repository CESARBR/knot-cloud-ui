import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextInput from 'components/TextInput';
import './styles.css';

class PasswordInput extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.updatePassword = this.updatePassword.bind(this);
    this.updateConfirmPassword = this.updateConfirmPassword.bind(this);
  }

  checkPasswordsValid(password, confirmPassword) {
    const doPasswordsMatch = (password === confirmPassword);
    const emptyFields = !(password && confirmPassword);
    const isPasswordValid = (doPasswordsMatch && !emptyFields);
    const shouldShowError = (!doPasswordsMatch && !emptyFields);
    const errorMessage = (shouldShowError ? "Passwords don't match!" : '');
    const { cbPasswordStatus } = this.props;

    cbPasswordStatus(isPasswordValid, errorMessage);
  }

  updatePassword(e) {
    const { confirmPassword } = this.state;
    const password = e.target.value;

    this.setState({
      password
    });
    this.checkPasswordsValid(password, confirmPassword);

    e.preventDefault();
  }

  updateConfirmPassword(e) {
    const { password } = this.state;
    const confirmPassword = e.target.value;

    this.setState({
      confirmPassword
    });
    this.checkPasswordsValid(password, confirmPassword);

    e.preventDefault();
  }

  render() {
    const { id } = this.props;

    return (
      <div id={id}>
        <TextInput type="password" id="new-password" placeholder="New password" onChange={e => this.updatePassword(e)} />
        <TextInput type="password" id="new-password-confirm" placeholder="Confirm new password" onChange={e => this.updateConfirmPassword(e)} />
      </div>);
  }
}

PasswordInput.propTypes = {
  id: PropTypes.string.isRequired,
  cbPasswordStatus: PropTypes.func.isRequired
};

export default PasswordInput;
