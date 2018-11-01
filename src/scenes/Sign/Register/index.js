import React, { Component } from 'react';
import config from 'react-global-configuration';
import { Link, Redirect } from 'react-router-dom';
import Authenticator from 'services/Authenticator';
import ErrorMessage from 'components/ErrorMessage';
import { PrimaryButton, SecondaryButton } from 'components/Button';
import TextInput from 'components/TextInput';
import 'scenes/Sign/styles.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      redirect: false,
      errorMessage: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
    this.setState({ errorMessage: '' }); // remove message
  }

  handleError(error) {
    let message;
    if (error.response) {
      // Request was made and server responded with a status code
      // out of range 2XX
      const { status, data: { message: dataMessage } } = error.response;

      if (status === 400) {
        message = 'Bad request';
      } else if (status === 500) {
        message = 'Unknown error';
      } else {
        message = dataMessage;
      }
    } else if (error.request) {
      // Request was made but no response was received
      message = 'Could not reach server! Try again later';
    } else {
      // Something happened when setting up the request
      message = error.message; // eslint-disable-line prefer-destructuring
    }
    this.setState({ errorMessage: message });
  }

  async handleSignup(e) {
    const { email, password, confirmPassword } = this.state;
    const authService = new Authenticator(config.get('authenticator.host'), config.get('authenticator.port'));
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        await authService.createUser(email, password);
        this.setState({ redirect: true });
      } catch (error) {
        this.handleError(error);
      }
    } else {
      this.setState({ errorMessage: 'Password not match' });
    }
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
      <div className="sign-form">
        <form onSubmit={e => this.handleSignup(e)}>
          <TextInput type="email" id="email" placeholder="Email" onChange={this.handleChange} />
          <TextInput type="password" id="password" placeholder="Password" onChange={this.handleChange} />
          <TextInput type="password" id="confirmPassword" placeholder="Confirm Password" onChange={this.handleChange} />
          <ErrorMessage message={errorMessage} />
          <PrimaryButton name="Sign up" />
        </form>
        <Link to="/">
          <SecondaryButton name="Sign in" />
        </Link>
        {this.renderRedirect()}
      </div>
    );
  }
} export default Signup;
