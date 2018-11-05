class ErrorHandler {
  static async execute(promise) {
    try {
      await promise;
    } catch (error) {
      if (error.response) {
        // Request was made and server responded with a status code
        // out of range 2XX
        const { status } = error.response;
        const dataMessage = error.response.data.message;

        switch (status) {
          case 400:
            throw Error('Bad request');
          case 500:
            throw Error('System error');
          default:
            throw Error(dataMessage);
        }
      } else if (error.request) {
        // Request was made but no response was received
        throw Error('Could not reach server! Try again later');
      } else {
        // Something happened when setting up the request
        throw error.message;
      }
    }
  }
}

export default ErrorHandler;
