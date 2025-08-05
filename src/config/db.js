import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        // Prevent multiple connections in serverless environment
        if (mongoose.connections[0].readyState) {
            console.log("MongoDB already connected");
            return;
        }
        
        await mongoose.connect(process.env.MONGO_URI, {
            bufferCommands: false, // Disable mongoose buffering for serverless
        });
        
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        
        // Don't exit process in serverless environment
        if (process.env.NODE_ENV !== 'production') {
            process.exit(1);
        }
        throw error; // Re-throw for serverless handling
    }
}