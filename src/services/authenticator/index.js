import axios from 'axios';
import ErrorHandler from 'services/authenticator/errorHandler';

class Authenticator {
  constructor(hostname, port) {
    this.baseUrl = `http://${hostname}:${port}`;
  }

  createUser(email, password) {
    const url = `${this.baseUrl}/users`;

    return ErrorHandler.execute(axios.post(url, {
      email,
      password
    }));
  }

  forgotPassword(email) {
    const url = `${this.baseUrl}/forgot`;

    return ErrorHandler.execute(axios.post(url, {
      email
    }));
  }

  authenticate(email, password) {
    const url = `${this.baseUrl}/auth`;

    return ErrorHandler.execute(axios.post(url, {
      email,
      password
    }));
  }
}

export default Authenticator;
