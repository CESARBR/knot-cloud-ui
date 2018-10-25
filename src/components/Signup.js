import React, { Component } from 'react';
import '../styles/Signup.css';

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
    const { email, password, confirmPassword } = this.state;
    return (
      <div className="Signup">
        <form onSubmit={e => this.handleSignup(e)}>
          <input className="Text-input" id="email" type="email" value={email} onChange={this.handleChange} placeholder="Email" required />
          <br />
          <input className="Text-input" id="password" type="password" value={password} onChange={this.handleChange} placeholder="Password" required />
          <br />
          <input className="Text-input" id="confirmPassword" type="password" value={confirmPassword} onChange={this.handleChange} placeholder="Confirm Password" required />
          <br />
          <input className="Button" id="button" type="submit" value="Sign up" />
        </form>
      </div>
    );
  }
} export default Signup;
