import axios from 'axios';
import ErrorHandler from 'services/Authenticator/ErrorHandler';

class Authenticator {
  createUser(email, password) {
    return ErrorHandler.execute(axios.post('/api/users', {
      email,
      password
    }));
  }

  forgotPassword(email) {
    return ErrorHandler.execute(axios.post('/api/forgot', {
      email
    }));
  }

  authenticate(email, password) {
    return ErrorHandler.execute(axios.post('/api/auth', {
      email,
      password
    }));
  }

  resetPassword(email, token, password) {
    return ErrorHandler.execute(axios.post('/api/reset', {
      email,
      token,
      password
    }));
  }
}

export default Authenticator;
