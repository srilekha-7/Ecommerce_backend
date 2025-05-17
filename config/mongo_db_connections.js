// config/db_mongo_connection.js
import mongoose from 'mongoose';

export const initMongoDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://passward:<EMKNAZnDJAWOc6x8>@ecommercecluster.bbvzxmv.mongodb.net/?retryWrites=true&w=majority&appName=EcommerceCluster';
    
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};
