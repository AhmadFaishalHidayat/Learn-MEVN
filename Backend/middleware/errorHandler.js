const notFound = (req, res, next) => {
  console.log("Not Found");
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  console.log("Error Handler");
  let statusCode = req.statusCode === 200 ? 500 : res.statusCode;

  let message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = `Resource not found`;
    statusCode = 404;
  }

  console.log("err.errors", err.errors);
  if (err.name == `ValidationError`) {
    console.log("Validation Error1");
    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    console.log("message", message);
    console.log("Validation Error2", statusCode);
    statusCode = 400;
    console.log("Validation Error3", statusCode);
  }
  console.log("err.name");

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
  console.log("Error Handler Done");
};
export { notFound, errorHandler };
