exports.notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

exports.errorHandler = (error, req, res, next) => {
  const { message, stack } = error;
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(status).json({
    message,
    status,
    stack,
  });
};
