import mongoose from 'mongoose';
import logger from './logger.js'; // use .js if using ES Modules and Node >=14

const database = async () => {
  const DATABASE =
    process.env.NODE_ENV === 'test'
      ? process.env.DATABASE_TEST
      : process.env.DATABASE;

  if (!DATABASE) {
    logger.error('❌ Database connection string is missing.');
    process.exit(1);
  }

  try {
    const connection = await mongoose.connect(DATABASE);
    logger.info(`✅ Connected to MongoDB: ${connection.connection.host}`);
  } catch (error) {
    logger.error(`❌ Could not connect to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default database;
