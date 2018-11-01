import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextInput from 'components/TextInput';
import { PrimaryButton, SecondaryButton } from 'components/Button';
import './styles.css';

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
          <TextInput type="email" id="reset-user-email" placeholder="Email" onChange={e => this.setState({ email: e.target.value })} />
          <PrimaryButton name="SUBMIT" />
        </form>
        <Link to="/">
          <SecondaryButton name="Login" />
        </Link>
      </div>
    );
  }
} export default Forgot;
