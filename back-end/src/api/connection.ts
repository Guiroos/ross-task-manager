import mongoose from 'mongoose';

const MONGO_DB_URL = 'mongodb://localhost:27017/ross-task-manager';
const mongoDatabaseURL = process.env.MONGO_URL || MONGO_DB_URL;

const connectToDatabase = () => mongoose.connect(mongoDatabaseURL);

export default connectToDatabase;