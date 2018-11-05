import axios from 'axios';
import ErrorHandler from 'services/authenticator/errorHandler';

class Authenticator {
  constructor(hostname, port) {
    this.baseUrl = `http://${hostname}:${port}`;
  }

  async createUser(email, password) {
    const url = `${this.baseUrl}/users`;

    try {
      await ErrorHandler.execute(axios.post(url, {
        email,
        password
      }));
    } catch (message) {
      throw message;
    }
  }
}

export default Authenticator;
