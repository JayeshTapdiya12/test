import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import cartRoute from './cart.route';
import wishlistRoute from './wishlist.route';
import productRoute from './product.route';

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', userRoute);
  router.use('/cart', cartRoute);
  router.use('/product', productRoute);
  router.use('/wishlist', wishlistRoute);

  return router;
};

export default routes;
