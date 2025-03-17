import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ["Food", "Transport", "Shopping", "Entertainment", "Others"],
    }

});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
