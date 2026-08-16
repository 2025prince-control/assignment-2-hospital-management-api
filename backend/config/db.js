const mongoose = require('mongoose');

const connectDB = async () => {

    const uri = process.env.MONGO_URI ||
        'mongodb+srv://2025princey_db_user:princey_py_04@cluster0.a7hfyd2.mongodb.net/?appName=Cluster0';

    try {

        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000
        });

        console.log('MongoDB connected successfully');

    } catch (error) {

        console.error('Database connection failed:');
        console.error(error);

        throw error;
    }
};

module.exports = connectDB;
