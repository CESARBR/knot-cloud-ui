import React, { Component } from 'react';
import '../styles/Forgot.css';
import { Link } from 'react-router-dom';

class Forgot extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const { email } = this.state;

    window.alert(`Reset e-mail sent to ${email}`); // eslint-disable-line no-alert
    e.preventDefault();
  }

  render() {
    return (
      <div className="forgot-pwd-wrapper">
        <h3 className="page-title"> FORGOT PASSWORD </h3>
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
