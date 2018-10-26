import request from 'request-promise-native';

class DeviceService {
  constructor(hostname, port) {
    this.authenticatorUrl = `http://${hostname}:${port}/devices`;
  }

  async createUser(email, password) {
    const url = this.authenticatorUrl;
    const headers = {
      'Content-Type': 'application/json'
    };
    let response;
    try {
      response = await request.post({
        url,
        headers,
        body: {
          email,
          password
        },
        json: true
      });
    } catch (err) {
      if (err.statusCode === 401) {
        throw Error('User exists');
      } else if (err.statusCode === 422) {
        throw Error(err.message);
      } else {
        throw Error(err.message);
      }
    }
    console.log(response);
  }
}

export default DeviceService;
