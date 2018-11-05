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
}

export default Authenticator;
