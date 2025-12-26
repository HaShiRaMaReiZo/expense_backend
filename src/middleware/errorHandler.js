export const errorHandler = (err, req, res, next) => {
  // Log the error for debugging
  console.error('Error Handler:', err);
  console.error('Error Name:', err?.name);
  console.error('Error Message:', err?.message);
  console.error('Error Stack:', err?.stack);

  // If response was already sent, don't try to send another response
  if (res.headersSent) {
    console.error('Headers already sent, cannot send error response');
    return;
  }

  const statusCode = err.statusCode || 500;
  let message = err.message || 'Server Error';

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    message = 'Resource not found';
    return res.status(404).json({
      success: false,
      message,
    });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    message = 'Duplicate field value entered';
    return res.status(400).json({
      success: false,
      message,
    });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map((val) => val.message).join(', ');
    return res.status(400).json({
      success: false,
      message,
    });
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

