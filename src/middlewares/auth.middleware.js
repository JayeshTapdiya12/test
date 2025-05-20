import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate user via Bearer Token
 * Adds decoded user info to req.user
 */
export const userAuth = (secretKey) => {
  return (req, res, next) => {
    try {
      let bearerToken = req.header('Authorization');
      console.log('bearerToken before splitting ----->', bearerToken);

      if (!bearerToken || !bearerToken.startsWith('Bearer '))
        return res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          message: 'Authorization token is required'
        });

      const token = bearerToken.split(' ')[1];
      const userDetails = jwt.verify(token, secretKey);

      // Attach user info to req.user
      req.user = {
        id: userDetails.UserId,
        email: userDetails.Email
      };

      next();
    } catch (error) {
      console.error('Auth Error:', error.message);
      return res.status(HttpStatus.UNAUTHORIZED).json({
        code: HttpStatus.UNAUTHORIZED,
        message: 'Invalid or expired token'
      });
    }
  };
};
