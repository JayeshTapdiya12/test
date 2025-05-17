import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = (secretKey) => {
  return async (req, res, next) => {
    try {
      let bearerToken = req.header('Authorization');
      console.log('bearerToken before splitting----->', bearerToken);

      if (!bearerToken)
        throw {
          code: HttpStatus.BAD_REQUEST,
          message: 'Authorization token is required'
        };

      bearerToken = bearerToken.split(' ')[1];

      let userDetails = jwt.verify(bearerToken, secretKey);
      req.body.createdBy = userDetails.UserId;
      req.body.Email = userDetails.Email;

      next();
    } catch (error) {
      next(error);
    }
  };
};
