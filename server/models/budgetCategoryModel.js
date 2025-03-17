import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
    category: { type: String, required: true },
    budget: { type: Number, required: true },
    month: { type: String, required: true } // Format: YYYY-MM
});

const BudgetModel = mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);

export default BudgetModel;
