// config/db_mongo_connection.js
import mongoose from 'mongoose';

export const initMongoDB = async () => {
  try {
    const MONGO_URI = 'mongodb+srv://srilekhavenu7:DDA2eagmaLx1ocdl@ecommercecluster.bbvzxmv.mongodb.net/ecommerce'
    
    await mongoose.connect(MONGO_URI);

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};
