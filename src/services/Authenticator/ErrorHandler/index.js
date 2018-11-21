class ErrorHandler {
  static async execute(promise) {
    try {
      const response = await promise;
      return response.data;
    } catch (error) {
      if (error.response) {
        // Request was made and server responded with a status code
        // out of range 2XX
        const { status, data: { message: dataMessage } } = error.response;

        switch (status) {
          case 500:
            throw Error('System error');
          case 400:
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
