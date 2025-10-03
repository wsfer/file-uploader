import { Request, Response, NextFunction } from 'express';

const defaultError: HTTPError = {
  name: 'ServerError',
  message: 'Internal server error',
  statusCode: 500,
};

// TODO:
// - render an error page
// - create different custom error types
function errorHandler(
  err: Error | HTTPError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const isHTTPError = (err as HTTPError).statusCode !== undefined;

  if (isHTTPError) {
    return res.render('errors/index', { error: err });
  }

  console.error(err);
  return res.render('errors/index', { error: defaultError });
}

export default errorHandler;
