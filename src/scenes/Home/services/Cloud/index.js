import KNoTCloudWebSocket from '@cesarbr/knot-cloud-websocket';

class Cloud {
  constructor(hostname, port, id, token) {
    this.client = new KNoTCloudWebSocket({
      hostname,
      port,
      id,
      token
    });
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.client.connect();
      this.client.once('ready', () => resolve());
      this.client.once('error', () => {
        reject(new Error('Connection not established. Refresh the page'));
      });
    });
  }

  isConnected() {
    const { OPEN } = Object.getPrototypeOf(this.client.socket);
    return this.client.socket.readyState === OPEN;
  }

  close() {
    this.client.close();
  }

  register(properties) {
    return new Promise((resolve, reject) => {
      if (this.isConnected()) {
        this.client.register(properties);
      } else {
        reject(new Error('Socket closed. Unable to register device. Refresh the page'));
      }
      this.client.once('registered', device => resolve(device));
      this.client.once('error', (err) => {
        reject(new Error(err));
      });
    });
  }

  getDevices(query) {
    return new Promise((resolve, reject) => {
      if (this.isConnected()) {
        this.client.getDevices(query);
      } else {
        reject(new Error('Socket closed. Unable to get devices. Refresh the page'));
      }
      this.client.once('devices', devices => resolve(devices));
      this.client.once('error', (err) => {
        reject(new Error(err));
      });
    });
  }

  unregister(id) {
    return new Promise((resolve, reject) => {
      if (this.isConnected()) {
        this.client.unregister(id);
      } else {
        reject(new Error('Socket closed. Unable to delete device. Refresh the page'));
      }
      this.client.once('unregistered', () => resolve());
      this.client.once('error', (err) => {
        reject(new Error(err));
      });
    });
  }

  update(id, metadata) {
    return new Promise((resolve, reject) => {
      if (this.isConnected()) {
        this.client.updateMetadata(id, metadata);
      } else {
        reject(new Error('Socket closed. Unable to update device. Refresh the page'));
      }
      this.client.once('updated', () => resolve());
      this.client.once('error', (err) => {
        reject(new Error(err));
      });
    });
  }
}

export default Cloud;
