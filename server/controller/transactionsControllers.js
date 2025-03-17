import Transaction from "../models/transactionModel.js";

// Add a new transaction
const addTransaction = async (req, res) => {
    try {
        const { amount, date, description, category } = req.body;

        // Basic validation
        if (!amount || amount <= 0) {
            return res.status(400).json({ error: "Amount must be a positive number" });
        }
        if (!date) {
            return res.status(400).json({ error: "Date is required" });
        }
        if (!description.trim()) {
            return res.status(400).json({ error: "Description cannot be empty" });
        }
        if (!category || !["Food", "Transport", "Shopping", "Entertainment", "Others"].includes(category)) {
            return res.status(400).json({ error: "Invalid category" });
        }

        // Create a new transaction
        const transaction = new Transaction({ amount, date, description, category });

        // Save to MongoDB
        await transaction.save();

        return res.status(201).json(transaction);
    } catch (error) {
        console.error("Error adding transaction:", error);
        return res.status(500).json({ error: "Server error" });
    }
};


// Update an existing transaction
const updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, date, description, category } = req.body;

        // Validate if at least one valid field is provided
        if (
            (amount !== undefined && amount <= 0) ||
            (description !== undefined && description.trim() === "") ||
            (category !== undefined && !["Food", "Transport", "Shopping", "Entertainment", "Others"].includes(category)) ||
            (amount === undefined && date === undefined && description === undefined && category === undefined)
        ) {
            return res.status(400).json({ error: "Provide a valid amount, date, description, or category for update" });
        }

        // Create an object with only the provided fields
        const updateFields = {};
        if (amount !== undefined) updateFields.amount = amount;
        if (date !== undefined) updateFields.date = date;
        if (description !== undefined) updateFields.description = description;
        if (category !== undefined) updateFields.category = category;

        const transaction = await Transaction.findByIdAndUpdate(id, updateFields, { new: true });

        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        return res.status(200).json(transaction);
    } catch (error) {
        console.error("Error updating transaction:", error);
        return res.status(500).json({ error: "Server error" });
    }
};

// Get all transactions
const readTransaction = async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ date: -1 });
        return res.status(200).json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return res.status(500).json({ error: "Server error" });
    }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;

        const transaction = await Transaction.findByIdAndDelete(id);

        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        return res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        console.error("Error deleting transaction:", error);
        return res.status(500).json({ error: "Server error" });
    }
};


const monthlySummary = async (req, res) => {
    try {
        const transactions = await Transaction.find({});

        // Grouping transactions by month and category
        const monthlyData = {};
        const overallCategoryBreakdown = {}; // Track overall category-wise expenses
        let totalExpenses = 0; // Sum of all expenses

        transactions.forEach(({ amount, date, category }) => {
            const month = new Date(date).toLocaleString("en-US", { month: "short" });

            if (!monthlyData[month]) {
                monthlyData[month] = { month, income: 0, expenses: 0, categoryBreakdown: {} };
            }

            if (amount >= 0) {
                monthlyData[month].expenses += amount;
                totalExpenses += amount; // Add to total expenses

                // Monthly category-wise breakdown
                if (!monthlyData[month].categoryBreakdown[category]) {
                    monthlyData[month].categoryBreakdown[category] = 0;
                }
                monthlyData[month].categoryBreakdown[category] += amount;

                // Overall category-wise breakdown
                if (!overallCategoryBreakdown[category]) {
                    overallCategoryBreakdown[category] = 0;
                }
                overallCategoryBreakdown[category] += amount;
            } else {
                monthlyData[month].income += Math.abs(amount);
            }
        });

        // Convert object to array for frontend
        const formattedMonthlyData = Object.values(monthlyData).sort((a, b) =>
            new Date(`2024-${a.month}-01`) - new Date(`2024-${b.month}-01`)
        );

        res.json({
            monthlySummary: formattedMonthlyData,
            categoryBreakdown: overallCategoryBreakdown, // Overall category breakdown for Pie Chart
            totalExpenses, // Total sum of all expenses
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export { addTransaction, updateTransaction, readTransaction, deleteTransaction, monthlySummary };
