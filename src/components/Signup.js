import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleSignup(e) {
    const { email, password, confirmPassword } = this.state;
    e.preventDefault();
    // TODO: Request to authenticator
    alert(`${email}\n${password}\n${confirmPassword}`);
  }

  render() {
    return (
      <div className="signup">
        <form onSubmit={e => this.handleSignup(e)}>
          <input className="text-input" id="email" type="email" onChange={this.handleChange} placeholder="Email" required />
          <br />
          <input className="text-input" id="password" type="password" onChange={this.handleChange} placeholder="Password" required />
          <br />
          <input className="text-input" id="confirmPassword" type="password" onChange={this.handleChange} placeholder="Confirm Password" required />
          <br />
          <input className="btn btn-primary" id="button" type="submit" value="Sign up" />
        </form>
        <Link to="/">
          <input className="btn btn-secondary" id="button-signin" type="submit" value="Sign in" />
        </Link>
      </div>
    );
  }
} export default Signup;
