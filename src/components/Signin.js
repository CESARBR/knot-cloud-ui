import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    return (
      <div className="Signin">
        <form onSubmit={e => this.handleSignin(e)}>
          <input className="text-input" id="email" type="email" onChange={this.handleChange} placeholder="Email" required />
          <br />
          <input className="text-input" id="password" type="password" onChange={this.handleChange} placeholder="Password" required />
          <br />
          <input className="btn btn-primary" id="button-signin" type="submit" value="Sign in" />
          <br />
        </form>
        <Link to="/signup">
          <input className="btn btn-secondary btn-small" id="button-signup" type="submit" value="Sign up" />
        </Link>
        <Link to="/forgot">
          <input className="btn btn-secondary btn-small" id="button-forgot" href="/forgot" type="submit" value="Forgot password?" />
        </Link>
      </div>
    );
  }
} export default Signin;
