import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextInput from 'components/TextInput';
import config from 'react-global-configuration';
import PrimaryButton from 'components/Button/PrimaryButton';
import SecondaryButton from 'components/Button/SecondaryButton';
import ErrorMessage from 'components/ErrorMessage';
import AuthenticatorService from 'services/authenticator';
import './styles.css';

class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const { email } = this.state;
    const authService = new AuthenticatorService(config.get('authenticator.host'), config.get('authenticator.port'));
    authService.forgotPassword(email)
      .then(() => {
        alert(`Reset e-mail sent to ${email}`); // eslint-disable-line no-alert
      })
      .catch((error) => {
        this.setState({ errorMessage: error.message });
      });
    e.preventDefault();
  }

  render() {
    const { errorMessage } = this.state;
    return (
      <div className="forgot-pwd-wrapper">
        <h3 className="page-title"> FORGOT PASSWORD </h3>
        <form className="reset-form" onSubmit={e => this.handleSubmit(e)}>
          <TextInput type="email" id="reset-user-email" placeholder="Email" onChange={e => this.setState({ email: e.target.value })} />
          <ErrorMessage message={errorMessage} />
          <PrimaryButton name="SUBMIT" />
        </form>
        <Link to="/">
          <SecondaryButton name="Login" />
        </Link>
      </div>
    );
  }
} export default Forgot;
