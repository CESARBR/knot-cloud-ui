import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import DeviceService from '../services/device';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      redirect: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  async handleSignup(e) {
    const { email, password, confirmPassword } = this.state;
    let device;
    e.preventDefault();
    if (password === confirmPassword) {
      device = new DeviceService(process.env.AUTH_SERVER || 'localhost', process.env.AUTH_PORT || 3003);
      try {
        await device.createUser(email, password);
        this.setState({ redirect: true });
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    } else {
      // TODO: show to user that password not match
      alert('password not match');
    }
  }

  renderRedirect() { // eslint-disable-line consistent-return
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
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
        {this.renderRedirect()}
      </div>
    );
  }
} export default Signup;
