import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextInput from 'components/TextInput';
import PrimaryButton from 'components/PrimaryButton';
import SecondaryButton from 'components/SecondaryButton';
import ErrorMessage from 'components/ErrorMessage';
import Authenticator from 'services/Authenticator';
import './styles.css';

class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errorMessage: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const { email } = this.state;
    const authService = new Authenticator();
    this.setState({ loading: true });
    authService.forgotPassword(email)
      .then(() => {
        alert(`Reset e-mail sent to ${email}`); // eslint-disable-line no-alert
      })
      .catch((error) => {
        this.setState({ errorMessage: error.message });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
    e.preventDefault();
  }

  render() {
    const { errorMessage, loading } = this.state;
    return (
      <div className="forgot-pwd-wrapper">
        <form className="reset-form" onSubmit={e => this.handleSubmit(e)}>
          <TextInput type="email" id="reset-user-email" placeholder="Email" onChange={e => this.setState({ email: e.target.value })} />
          <ErrorMessage message={errorMessage} />
          <PrimaryButton disabled={loading} name="Forgot Password" type="submit" />
        </form>
        <Link to="/signin">
          <SecondaryButton name="Sign In" type="submit" />
        </Link>
      </div>
    );
  }
} export default Forgot;
