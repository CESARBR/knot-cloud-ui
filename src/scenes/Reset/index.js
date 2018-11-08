import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TextInput from 'components/TextInput';
import PrimaryButton from 'components/Button/PrimaryButton';
import ErrorMessage from 'components/ErrorMessage';
import './styles.css';

class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      isPasswordValid: false,
      errorMessage: ''
    };
  }

  handleSubmit(e) {
    const { isPasswordValid } = this.state;

    if (isPasswordValid) {
      this.setState({
        redirect: true
      });
    }

    e.preventDefault();
  }

  shouldShowError(doPasswordsMatch, emptyFields) {
    const errorMessage = (!doPasswordsMatch && !emptyFields) ? "Passwords don't match!" : '';

    this.setState({
      errorMessage
    });
  }

  checkPasswordsValid(password, confirmPassword) {
    const doPasswordsMatch = (password === confirmPassword);
    const emptyFields = !(password && confirmPassword);
    const isPasswordValid = (doPasswordsMatch && !emptyFields);

    this.shouldShowError(doPasswordsMatch, emptyFields);
    this.setState({
      isPasswordValid
    });
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

  renderRedirect() { // eslint-disable-line consistent-return
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
    }
  }

  render() {
    const { errorMessage } = this.state;

    return (
      <div className="reset-pwd-wrapper">
        <h3 className="page-title"> RESET PASSWORD </h3>
        <form className="reset-form" onSubmit={e => this.handleSubmit(e)}>
          <TextInput type="password" id="new-password" placeholder="New Password" onChange={e => this.updatePassword(e)} />
          <TextInput type="password" id="new-password-confirm" placeholder="Confirm new password" onChange={e => this.updateConfirmPassword(e)} />
          <ErrorMessage message={errorMessage} />
          <PrimaryButton name="SUBMIT" />
        </form>
        {this.renderRedirect()}
      </div>
    );
  }
} export default Reset;
