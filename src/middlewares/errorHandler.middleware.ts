import { Request, Response, NextFunction } from 'express';

// TODO:
// - render an error page
// - create different custom error types
function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);
  res.status(500).end();
}

export default errorHandler;
