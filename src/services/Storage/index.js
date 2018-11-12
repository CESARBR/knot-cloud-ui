class Storage {
  static setCredentials(uuid, token) {
    localStorage.setItem('uuid', uuid);
    localStorage.setItem('token', token);
  }

  static getCredentials() {
    return {
      uuid: localStorage.getItem('uuid'),
      token: localStorage.getItem('token')
    };
  }

  static credentialsExists() {
    return !!(localStorage.getItem('uuid') && localStorage.getItem('token'));
  }

  static removeCredentials() {
    localStorage.removeItem('uuid');
    localStorage.removeItem('token');
  }
}

export default Storage;
