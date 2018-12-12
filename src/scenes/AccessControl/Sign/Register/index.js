import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Authenticator from 'services/Authenticator';
import ErrorMessage from 'components/ErrorMessage';
import PrimaryButton from 'components/PrimaryButton';
import SecondaryButton from 'components/SecondaryButton';
import TextInput from 'components/TextInput';
import PasswordInput from 'components/PasswordInput';
import 'scenes/AccessControl/Sign/styles.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isPasswordValid: false,
      redirect: false,
      errorMessage: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleSignup(e) {
    const { email, password, isPasswordValid } = this.state;
    const authService = new Authenticator();

    e.preventDefault();
    if (isPasswordValid) {
      authService.createUser(email, password)
        .then(() => {
          this.setState({ redirect: true });
        })
        .catch((error) => {
          this.setState({ errorMessage: error.message });
        });
    }
  }

  handlePasswordChange(password, isPasswordValid, errorMessage) {
    this.setState({
      password,
      isPasswordValid,
      errorMessage
    });
  }

  renderRedirect() { // eslint-disable-line consistent-return
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/signin" />;
    }
  }

  render() {
    const { errorMessage } = this.state;
    return (
      <div className="sign-form">
        <div className="error-container">
          <ErrorMessage message={errorMessage} />
        </div>
        <form onSubmit={e => this.handleSignup(e)}>
          <TextInput type="email" id="email" placeholder="Email" onChange={this.handleChange} />
          <PasswordInput id="password-input-wrapper" onChange={this.handlePasswordChange} />
          <PrimaryButton name="Sign up" type="submit" />
        </form>
        <Link to="/signin">
          <SecondaryButton name="Sign In" type="submit" />
        </Link>
        {this.renderRedirect()}
      </div>
    );
  }
} export default Signup;
