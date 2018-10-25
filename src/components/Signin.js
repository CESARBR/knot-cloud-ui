import React, { Component } from 'react';
import '../styles/Signin.css';

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
    const { email, password } = this.state;
    return (
      <div className="Signin">
        <form onSubmit={e => this.handleSignin(e)}>
          <input className="Text-input" id="email" type="email" value={email} onChange={this.handleChange} placeholder="Email" required />
          <br />
          <input className="Text-input" id="password" type="password" value={password} onChange={this.handleChange} placeholder="Password" required />
          <br />
          <input className="Button" id="button-signin" type="submit" value="Sign in" />
          <br />
        </form>
        <a href="/signup">
          <input className="Button ButtonSmall" id="button-signup" type="submit" value="Sign up" />
        </a>
        <a href="/forgot">
          <input className="Button ButtonSmall" id="button-forgot" href="/forgot" type="submit" value="Forgot password?" />
        </a>
      </div>
    );
  }
} export default Signin;
