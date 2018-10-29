import React, { Component } from 'react';
import '../styles/Forgot.css';
import { Link } from 'react-router-dom';
import config from 'react-global-configuration';
import axios from 'axios';

const RequestResult = (status) => {
  const { err, message } = status;
  let result;

  if (err) {
    result = (
      <div className="request-result request-error">
        {message}
      </div>
    );
  } else {
    result = (
      <div className="request-result request-success">
        {message}
      </div>
    );
  }

  return result;
};

class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: false,
      err: true,
      message: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const { email } = this.state;
    const { host, port } = config.get('authenticator');
    let message = '';
    let err = true;

    axios.post(`http://${host}:${port}/forgot`, {
      data: {
        email
      }
    }).then(() => {
      message = 'Reset e-mail sent. Check your inbox';
      err = false;
    }).catch((error) => {
      if (error.response) {
        // Request was made and server responded with a status code
        // out of range 2XX
        const { status } = error.response;

        if (status === 400) {
          message = 'Bad request';
        } else if (status === 422) {
          message = 'Data validation error';
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
    }).finally(() => {
      this.setState({
        result: true,
        err,
        message
      });
    });
    e.preventDefault();
  }

  render() {
    const { result, err, message } = this.state;

    return (
      <div className="forgot-pwd-wrapper">
        <h3 className="page-title"> FORGOT PASSWORD </h3>
        {result ? <RequestResult err={err} message={message} /> : <div />}
        <form className="reset-form" onSubmit={e => this.handleSubmit(e)}>
          <input type="email" className="text-input" id="reset-user-email" placeholder="Email" onChange={e => this.setState({ email: e.target.value })} required />
          <br />
          <input type="submit" className="btn btn-primary" id="reset-user-btn" value="SUBMIT" />
          <br />
        </form>
        <Link to="/">
          <button className="btn btn-secondary" type="button">
            LOGIN
          </button>
        </Link>
      </div>
    );
  }
} export default Forgot;
