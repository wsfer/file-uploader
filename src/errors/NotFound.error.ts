class NotFoundError extends Error implements HTTPError {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }

  name: string;
  statusCode: number;
}

export default NotFoundError;
