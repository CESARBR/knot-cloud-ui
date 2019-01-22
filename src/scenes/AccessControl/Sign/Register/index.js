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
      loading: false,
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
      this.setState({ loading: true });
      authService.createUser(email, password)
        .then(() => {
          this.setState({ redirect: true });
        })
        .catch((error) => {
          this.setState({
            errorMessage: error.message,
            loading: false
          });
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

  render() {
    const { errorMessage, loading, redirect } = this.state;
    return (
      <div className="sign-form">
        <div className="error-container">
          <ErrorMessage message={errorMessage} />
        </div>
        <form onSubmit={e => this.handleSignup(e)}>
          <TextInput type="email" id="email" placeholder="Email" onChange={this.handleChange} />
          <PasswordInput id="password-input-wrapper" onChange={this.handlePasswordChange} />
          <PrimaryButton disabled={loading} name="Sign up" type="submit" />
        </form>
        <Link to="/signin">
          <SecondaryButton name="Sign In" type="submit" />
        </Link>
        {redirect && <Redirect to="/signin" />}
      </div>
    );
  }
} export default Signup;
