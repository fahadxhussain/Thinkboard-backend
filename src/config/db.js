import mongoose from 'mongoose';

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI) // This connects to the MongoDB database using Mongoose - checks connection + authentication
        // If you do not give any name to your database, it will be named as test - notes_db before the ? is the name of DB
        console.log("MongoDB connected successfully")
    }
    catch(error){
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit the process with failure
    }
}