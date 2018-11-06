import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextInput from 'components/TextInput';
import config from 'react-global-configuration';
import PrimaryButton from 'components/Button/PrimaryButton';
import ErrorMessage from 'components/ErrorMessage';
import Authenticator from 'services/Authenticator';
import 'scenes/Sign/styles.css';
import SmallButton from './components/SmallButton';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignin = this.handleSignin.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
    this.setState({ errorMessage: '' });
  }

  handleSignin(e) {
    const { email, password } = this.state;
    const authService = new Authenticator(config.get('authenticator.host'), config.get('authenticator.port'));
    e.preventDefault();
    authService.authenticate(email, password)
      .then((res) => {
        console.log(res); // eslint-disable-line no-console
      })
      .catch((error) => {
        this.setState({ errorMessage: error.message });
      });
  }

  render() {
    const { errorMessage } = this.state;
    return (
      <div className="sign-form">
        <form onSubmit={e => this.handleSignin(e)}>
          <TextInput type="email" id="email" placeholder="Email" onChange={this.handleChange} />
          <TextInput type="password" id="password" placeholder="Password" onChange={this.handleChange} />
          <ErrorMessage message={errorMessage} />
          <PrimaryButton name="Login" />
        </form>
        <Link to="/signup">
          <SmallButton name="Sign up" />
        </Link>
        <Link to="/forgot">
          <SmallButton name="Forgot Password?" />
        </Link>
      </div>
    );
  }
} export default Signin;
