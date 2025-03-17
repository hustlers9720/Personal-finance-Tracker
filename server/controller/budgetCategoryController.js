import BudgetModel from "../models/budgetCategoryModel.js";
import Transaction from "../models/transactionModel.js";

const addBudget = async (req, res) => {
    try {
        const { category, budget, month } = req.body;
        if (!category || !budget || !month) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newBudget = await BudgetModel.create({ category, budget, month });
        return res.status(201).json(newBudget);
    } catch (error) {
        return res.status(500).json({ error: "Server Error" });
    }
}

const getBudget = async (req, res) => {
    try {
        const { month } = req.query;
        const filter = month ? { month } : {};
        const budgets = await BudgetModel.find(filter);
        return res.status(200).json(budgets);
    } catch (error) {
        return res.status(500).json({ error: "Server Error" });
    }
}

const deleteBudget = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) return res.status(400).json({ error: "Missing budget ID" });

        await Budget.findByIdAndDelete(id);
        return res.status(200).json({ message: "Budget deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Server Error" });
    }
}

const actualBudget = async (req, res) => {
    try {
        const { month } = req.query;
        if (!month) return res.status(400).json({ error: "Month is required" });

        // Convert month (YYYY-MM) into a proper date range
        const startDate = new Date(`${month}-01T00:00:00.000Z`); // First day of the month
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1); // Move to next month

        // Fetch budget data
        const budgets = await BudgetModel.find({ month });

        // Fetch actual spending data using date range
        const transactions = await Transaction.aggregate([
            { 
                $match: { 
                    date: { $gte: startDate, $lt: endDate } // Match transactions within the month
                } 
            },
            { 
                $group: { 
                    _id: "$category", 
                    actual: { $sum: "$amount" } 
                } 
            }
        ]);

        // Map actual spending to categories
        const actualMap = {};
        transactions.forEach((t) => {
            actualMap[t._id] = t.actual;
        });

        // Combine budget & actual data
        const comparisonData = budgets.map((b) => ({
            category: b.category,
            budget: b.budget,
            actual: actualMap[b.category] || 0, // Default to 0 if no spending found
        }));

        res.json(comparisonData);
    } catch (error) {
        console.error("Error fetching budget vs actual data:", error);
        res.status(500).json({ error: "Server error" });
    }
};


export { addBudget, deleteBudget, getBudget, actualBudget }