import jwt from 'jsonwebtoken';

export const generateToken = (userId, email) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return jwt.sign(
    { userId, email },
    secret,
    {
      expiresIn: process.env.JWT_EXPIRE || '7d',
    }
  );
};

export const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return jwt.verify(token, secret);
};

