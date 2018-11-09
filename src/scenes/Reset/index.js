import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import config from 'react-global-configuration';
import TextInput from 'components/TextInput';
import PrimaryButton from 'components/Button/PrimaryButton';
import ErrorMessage from 'components/ErrorMessage';
import Authenticator from 'services/Authenticator';
import PropTypes from 'prop-types';
import * as queryString from 'query-string';
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
    const { password, isPasswordValid } = this.state;
    const { location: { search } } = this.props;
    const { email, token } = queryString.parse(search);
    const authService = new Authenticator(config.get('authenticator.host'), config.get('authenticator.port'));

    if (isPasswordValid) {
      authService.resetPassword(email, token, password)
        .then(() => {
          this.setState({
            redirect: true
          });
        })
        .catch((error) => {
          this.setState({
            errorMessage: error.message
          });
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
}

Reset.propTypes = {
  location: PropTypes.shape({ search: PropTypes.string.isRequired })
};

Reset.defaultProps = {
  location: { search: '?email=&token=' }
};


export default Reset;
