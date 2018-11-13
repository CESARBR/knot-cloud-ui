import React, { Component } from 'react';
import config from 'react-global-configuration';
import { Link, Redirect } from 'react-router-dom';
import Authenticator from 'services/Authenticator';
import ErrorMessage from 'components/ErrorMessage';
import { PrimaryButton, SecondaryButton } from 'components/Button';
import TextInput from 'components/TextInput';
import { matchingPasswords, isEmpty } from 'util/checkPassword';
import 'scenes/Sign/styles.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      passwordMatch: false,
      redirect: false,
      errorMessage: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleSignup(e) {
    const { email, password, passwordMatch } = this.state;
    const authService = new Authenticator(config.get('authenticator.host'), config.get('authenticator.port'));

    e.preventDefault();
    if (passwordMatch) {
      authService.createUser(email, password)
        .then(() => {
          this.setState({ redirect: true });
        })
        .catch((error) => {
          this.setState({ errorMessage: error.message });
        });
    }
  }

  checkPasswordOK(password, confirmPassword) {
    const passwordMatch = matchingPasswords(password, confirmPassword);
    const emptyFields = isEmpty(password, confirmPassword);
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
    });

    e.preventDefault();
  }

  checkConfirmPassword(e) {
    const { password } = this.state;
    const confirmPassword = e.target.value;

    this.checkPasswordOK(password, confirmPassword);
    this.setState({
      confirmPassword
    });

    e.preventDefault();
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
        <form onSubmit={e => this.handleSignup(e)}>
          <TextInput type="email" id="email" placeholder="Email" onChange={this.handleChange} />
          <TextInput type="password" id="password" placeholder="Password" onChange={e => this.checkPassword(e)} />
          <TextInput type="password" id="confirmPassword" placeholder="Confirm Password" onChange={e => this.checkConfirmPassword(e)} />
          <ErrorMessage message={errorMessage} />
          <PrimaryButton name="Sign up" />
        </form>
        <Link to="/signin">
          <SecondaryButton name="Sign in" />
        </Link>
        {this.renderRedirect()}
      </div>
    );
  }
} export default Signup;
