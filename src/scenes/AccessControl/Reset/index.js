import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import config from 'react-global-configuration';
import TextInput from 'components/TextInput';
import PrimaryButton from 'components/Button/PrimaryButton';
import ErrorMessage from 'components/ErrorMessage';
import CheckPassword from 'services/CheckPassword';
import Authenticator from 'services/Authenticator';
import PropTypes from 'prop-types';
import * as queryString from 'query-string';
import './styles.css';

class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      passwordMatch: false,
      errorMessage: ''
    };
  }

  handleSubmit(e) {
    const { password, passwordMatch } = this.state;
    const { location: { search } } = this.props;
    const { uuid, token } = queryString.parse(search);
    const authService = new Authenticator(config.get('authenticator.host'), config.get('authenticator.port'));

    if (passwordMatch) {
      authService.resetPassword(uuid, token, password)
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

  checkPasswordOK(password, confirmPassword) {
    const checkPasswordService = new CheckPassword();
    const { passwordMatch, emptyFields }  = checkPasswordService.isPasswordOK(password, confirmPassword);
    // The error message should NOT appear if the passwords match or if there
    // are empty fields
    const errorMessage = (passwordMatch || emptyFields) ? '' : "Passwords don't match!";

    this.setState({
      passwordMatch,
      errorMessage
    });
  }

  checkPassword(e) {
    const { confirmPassword } = this.state;
    const password = e.target.value;

    this.checkPasswordOK(password, confirmPassword);
    this.setState({
      password
    })

    e.preventDefault();
  }

  checkConfirmPassword(e) {
    const { password } = this.state;
    const confirmPassword = e.target.value;

    this.checkPasswordOK(password, confirmPassword);
    this.setState({
      confirmPassword
    })

    e.preventDefault();
  }

  renderRedirect() { // eslint-disable-line consistent-return
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/login" />;
    }
  }

  render() {
    const { errorMessage } = this.state;

    return (
      <div className="reset-pwd-wrapper">
        <h3 className="page-title"> RESET PASSWORD </h3>
        <form className="reset-form" onSubmit={e => this.handleSubmit(e)}>
          <TextInput type="password" id="new-password" placeholder="New Password" onChange={e => this.checkPassword(e)} />
          <TextInput type="password" id="new-password-confirm" placeholder="Confirm new password" onChange={e => this.checkConfirmPassword(e)} />
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
  location: { search: '?uuid=&token=' }
};


export default Reset;
