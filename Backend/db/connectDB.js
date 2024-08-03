import mongoose from 'mongoose';

const connectDB = async (url) => {
    try {
        await mongoose
            .connect(url);
        return console.log("CONNECTED TO THE DB...");
    } catch (err) {
        return console.log(err);
    }
};

export default connectDB;
