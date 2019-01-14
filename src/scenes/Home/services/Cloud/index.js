import KNoTCloudWebSocket from '@cesarbr/knot-cloud-websocket';

class Cloud {
  constructor(hostname, port, uuid, token) {
    this.client = new KNoTCloudWebSocket({
      hostname,
      port,
      uuid,
      token
    });
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.client.connect();
      this.client.once('ready', () => resolve());
      this.client.once('error', (err) => {
        reject(new Error(err));
      });
    });
  }

  close() {
    this.client.close();
  }

  register(properties) {
    return new Promise((resolve, reject) => {
      this.client.register(properties);
      this.client.once('registered', device => resolve(device));
      this.client.once('error', (err) => {
        reject(new Error(err));
      });
    });
  }

  devices(query) {
    return new Promise((resolve, reject) => {
      this.client.getDevices(query);
      this.client.once('devices', devices => resolve(devices));
      this.client.once('error', (err) => {
        reject(new Error(err));
      });
    });
  }

  unregister(id) {
    return new Promise((resolve, reject) => {
      this.client.unregister(id);
      this.client.once('unregistered', () => resolve());
      this.client.once('error', (err) => {
        reject(new Error(err));
      });
    });
  }

  update(id, metadata) {
    return new Promise((resolve, reject) => {
      this.client.updateMetadata(id, metadata);
      this.client.once('updated', () => resolve());
      this.client.once('error', (err) => {
        reject(new Error(err));
      });
    });
  }

  createSessionToken(id) {
    return new Promise((resolve, reject) => {
      this.client.createSessionToken(id);
      this.client.once('created', token => resolve(token));
      this.client.once('error', (err) => {
        reject(new Error(err));
      });
    });
  }
}

export default Cloud;
