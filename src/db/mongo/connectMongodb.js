import mongoose from "mongoose";

const connectMongodb = async () => {
    if (!process.env.MONGODB_URI) {
        throw new Error('Invalid MongoDB connection URI');
    }

    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            resolve();
        })
        .catch((error) => {
            reject(error);
        })
    })
};

module.exports = connectMongodb;