import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InputText from 'components/InputText';
import PrimaryButton from 'components/Button/PrimaryButton';
import 'scenes/Sign/styles.css';

import SmallButton from './components/SmallButton';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignin = this.handleSignin.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleSignin(e) {
    const { email, password } = this.state;
    e.preventDefault();
    // TODO: Request to authenticator
    alert(`${email}\n${password}`);
  }

  render() {
    return (
      <div className="sign-form">
        <form onSubmit={e => this.handleSignin(e)}>
          <InputText type="email" id="email" placeholder="Email" onChange={this.handleChange} />
          <InputText type="password" id="password" placeholder="Password" onChange={this.handleChange} />
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