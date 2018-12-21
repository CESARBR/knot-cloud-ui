import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import TextInput from 'components/TextInput';
import PrimaryButton from 'components/PrimaryButton';
import ErrorMessage from 'components/ErrorMessage';
import Authenticator from 'services/Authenticator';
import 'scenes/AccessControl/Sign/styles.css';
import Storage from 'services/Storage';
import SmallButton from './components/SmallButton';
import './styles.css';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      redirect: false
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
    const authService = new Authenticator();
    e.preventDefault();
    document.body.classList.add('busy-cursor');
    document.querySelector('.btn-primary').classList.add('busy-cursor');
    authService.authenticate(email, password)
      .then((res) => {
        document.body.classList.remove('busy-cursor');
        document.querySelector('.btn-primary').classList.remove('busy-cursor');
        Storage.setCredentials(res.uuid, res.token);
        this.setState({ redirect: true });
      })
      .catch((error) => {
        document.body.classList.remove('busy-cursor');
        document.querySelector('.btn-primary').classList.remove('busy-cursor');
        this.setState({ errorMessage: error.message });
      });
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
        <form onSubmit={e => this.handleSignin(e)}>
          <TextInput type="email" id="email" placeholder="Email" onChange={this.handleChange} />
          <TextInput type="password" id="password" placeholder="Password" onChange={this.handleChange} />
          <ErrorMessage message={errorMessage} />
          <PrimaryButton name="Sign In" type="submit" />
        </form>
        <div className="smallbuttons-container">
          <Link to="/signup">
            <SmallButton name="Sign up" type="submit" />
          </Link>
          <Link to="/forgot">
            <SmallButton name="Forgot Password?" type="submit" />
          </Link>
        </div>
        {this.renderRedirect()}
      </div>
    );
  }
} export default Signin;
