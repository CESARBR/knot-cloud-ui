import React, { Component } from 'react';
import config from 'react-global-configuration';
import { Link, Redirect } from 'react-router-dom';
import AuthenticatorService from '../services/authenticator';
import MessageError from './MessageError';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      redirect: false,
      errMessage: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
    this.setState({ errMessage: false }); // remove message
  }

  async handleSignup(e) {
    const { email, password, confirmPassword } = this.state;
    let authServ;
    e.preventDefault();
    if (password === confirmPassword) {
      authServ = new AuthenticatorService(config.get('authenticator.host'), config.get('authenticator.port'));
      try {
        await authServ.createUser(email, password);
        this.setState({ redirect: true });
      } catch (error) {
        let message;
        if (error.response) {
          // Request was made and server responded with a status code
          // out of range 2XX
          const { status } = error.response;

          if (status === 400) {
            message = 'Bad request';
          } else if (status === 401) {
            message = 'User exists';
          } else if (status === 422) {
            message = 'This format email is not supported';
          } else if (status === 500) {
            message = 'System error';
          } else {
            message = 'Unknown error';
          }
        } else if (error.request) {
          // Request was made but no response was received
          message = 'Could not reach server! Try again later';
        } else {
          // Something happened when setting up the request
          message = error.message; // eslint-disable-line prefer-destructuring
        }
        this.setState({ errMessage: message });
      }
    } else {
      this.setState({ errMessage: 'Password not match' });
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
          <MessageError errMessage={this.state.errMessage} />
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
