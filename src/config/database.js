import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Cache the connection promise to avoid multiple connections in serverless
let cachedConnection = null;

const connectDB = async () => {
  try {
    // Check if already connected (for serverless environments)
    if (mongoose.connection.readyState === 1) {
      console.log('MongoDB already connected');
      return mongoose.connection;
    }

    // If connection is in progress, wait for it
    if (cachedConnection) {
      return await cachedConnection;
    }

    // Create new connection with optimized settings for serverless
    cachedConnection = mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0, // Disable mongoose buffering
    });

    const conn = await cachedConnection;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Reset cache on connection error
    mongoose.connection.on('error', () => {
      cachedConnection = null;
    });

    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    cachedConnection = null;
    // Don't exit process in serverless environments (Vercel)
    if (process.env.VERCEL !== '1') {
      process.exit(1);
    }
    throw error;
  }
};

export default connectDB;

