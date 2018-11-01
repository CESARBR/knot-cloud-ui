import axios from 'axios';

class Authenticator {
  constructor(hostname, port) {
    this.baseUrl = `http://${hostname}:${port}`;
  }

  async createUser(email, password) {
    const url = `${this.baseUrl}/users`;

    return axios.post(url, {
      email,
      password
    });
  }
}

export default Authenticator;
