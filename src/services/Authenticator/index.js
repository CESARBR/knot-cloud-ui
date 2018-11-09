import axios from 'axios';
import ErrorHandler from 'services/Authenticator/ErrorHandler';

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

  resetPassword(uuid, token, password) {
    const url = `${this.baseUrl}/reset`;

    return ErrorHandler.execute(axios.post(url, {
      uuid,
      token,
      password
    }));
  }
}

export default Authenticator;
