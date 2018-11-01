import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TextInput from 'components/TextInput';
import PrimaryButton from 'components/Button/PrimaryButton';
import './styles.css';

class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const { password } = this.state;
    const { confirm } = this.state;

    if (password !== confirm) {
      window.alert("Passwords don't match!"); // eslint-disable-line no-alert
    } else {
      window.alert('Password updated!'); // eslint-disable-line no-alert
      this.setState({
        redirect: true
      });
    }
    e.preventDefault();
  }

  renderRedirect() { // eslint-disable-line consistent-return
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
    }
  }

  render() {
    return (
      <div className="reset-pwd-wrapper">
        <h3 className="page-title"> RESET PASSWORD </h3>
        <form className="reset-form" onSubmit={e => this.handleSubmit(e)}>
          <TextInput type="password" id="new-password" placeholder="New Password" onChange={e => this.setState({ password: e.target.value })} />
          <TextInput type="password" id="new-password-confirm" placeholder="Confirm new password" onChange={e => this.setState({ confirm: e.target.value })} />
          <PrimaryButton name="SUBMIT" />
        </form>
        {this.renderRedirect()}
      </div>
    );
  }
} export default Reset;
