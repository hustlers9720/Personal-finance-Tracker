import mongoose from "mongoose";
import { config } from "dotenv";

config(); // Load environment variables

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URI}/`);

        console.log(`MongoDB Connected `);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
