import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/expense_tracker';

    // Set connection options
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3000,
    });

    console.log(` MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.warn(`Direct MongoDB connection failed: ${error.message}`);
    console.log(' Attempting fallback to in-memory MongoDB (for development & demo)...');

    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();

      const conn = await mongoose.connect(uri);
      console.log(` MongoDB In-Memory Server Connected: ${uri}`);
      return conn;
    } catch (memError) {
      console.error('Could not start in-memory MongoDB:', memError.message);
      console.error('Please make sure MongoDB is running or configure MONGODB_URI in server/.env');
      throw error;
    }
  }
};
