import * as KNoTCloudWebSocket from '@cesarbr/knot-cloud-websocket';

class Connector {
  constructor(hostname, port, uuid, token) {
    this.client = new KNoTCloudWebSocket({
      hostname,
      port,
      uuid,
      token
    });
  }
}

export default Connector;
