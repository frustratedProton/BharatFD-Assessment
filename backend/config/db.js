import mongoose from 'mongoose';

mongoose.set('strictQuery', false);
const url = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(url);
        console.log('mongodb connected successfully!');
    } catch (error) {
        console.error('mongodb connection error: ', error);
        process.exit(1);
    }
};

export default connectDB;
