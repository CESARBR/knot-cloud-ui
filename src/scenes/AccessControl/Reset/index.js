import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PasswordInput from 'components/PasswordInput';
import PrimaryButton from 'components/PrimaryButton';
import ErrorMessage from 'components/ErrorMessage';
import Authenticator from 'services/Authenticator';
import PropTypes from 'prop-types';
import * as queryString from 'query-string';
import './styles.css';

class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      isPasswordValid: false,
      loading: false,
      errorMessage: ''
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(e) {
    const { password, isPasswordValid } = this.state;
    const { location: { search } } = this.props;
    const { email, token } = queryString.parse(search);
    const authService = new Authenticator();

    if (isPasswordValid) {
      this.setState({ loading: true });
      authService.resetPassword(email, token, password)
        .then(() => {
          this.setState({
            redirect: true
          });
        })
        .catch((error) => {
          this.setState({
            errorMessage: error.message
          });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }

    e.preventDefault();
  }

  handlePasswordChange(password, isPasswordValid, errorMessage) {
    this.setState({
      password,
      isPasswordValid,
      errorMessage
    });
  }

  renderRedirect() { // eslint-disable-line consistent-return
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/signin" />;
    }
  }

  render() {
    const { errorMessage, loading } = this.state;

    return (
      <div className="reset-pwd-wrapper">
        <div className="error-container">
          <ErrorMessage message={errorMessage} />
        </div>
        <form className="reset-form" onSubmit={e => this.handleSubmit(e)}>
          <PasswordInput id="password-input-wrapper" onChange={this.handlePasswordChange} />
          <PrimaryButton disabled={loading} name="Reset Password" type="submit" />
        </form>
        {this.renderRedirect()}
      </div>
    );
  }
}

Reset.propTypes = {
  location: PropTypes.shape({ search: PropTypes.string.isRequired })
};

Reset.defaultProps = {
  location: { search: '?email=&token=' }
};


export default Reset;
