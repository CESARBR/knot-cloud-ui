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
}

export default Cloud;
