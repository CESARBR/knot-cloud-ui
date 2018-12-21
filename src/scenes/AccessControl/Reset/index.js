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
      document.body.classList.add('busy-cursor');
      document.querySelector('.btn-primary').classList.add('busy-cursor');
      authService.resetPassword(email, token, password)
        .then(() => {
          document.body.classList.remove('busy-cursor');
          document.querySelector('.btn-primary').classList.remove('busy-cursor');
          this.setState({
            redirect: true
          });
        })
        .catch((error) => {
          document.body.classList.remove('busy-cursor');
          document.querySelector('.btn-primary').classList.remove('busy-cursor');
          this.setState({
            errorMessage: error.message
          });
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
    const { errorMessage } = this.state;

    return (
      <div className="reset-pwd-wrapper">
        <form className="reset-form" onSubmit={e => this.handleSubmit(e)}>
          <PasswordInput id="password-input-wrapper" onChange={this.handlePasswordChange} />
          <ErrorMessage message={errorMessage} />
          <PrimaryButton name="Reset Password" type="submit" />
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
