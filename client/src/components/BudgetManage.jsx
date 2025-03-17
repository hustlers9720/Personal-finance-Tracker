import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { backendUrl, useBackend } from "../context/Store";

const categories = ["Food", "Transport", "Shopping", "Entertainment", "Others"];

export default function BudgetManage() {
    const [budgets, setBudgets] = useState([]);
    const [category, setCategory] = useState(categories[0]);
    const [budget, setBudget] = useState("");
    const [month, setMonth] = useState("");
    const backend = useBackend();
    useEffect(() => {
        fetchBudgets();
    }, []);

    const fetchBudgets = async () => {
        try {
            const { data } = await axios.get(`${backend}/budget/getBudget`);
            setBudgets(data);
        } catch (error) {
            console.error("Error fetching budgets", error);
        }
    };

    const addBudget = async () => {
        if (!category || !budget || !month) return;
        try {
            await axios.post(`${backend}/budget/add`, { category, budget, month });
            fetchBudgets();
            setBudget("");
            setMonth("");
        } catch (error) {
            console.error("Error adding budget", error);
        }
    };

    const deleteBudget = async (id) => {
        try {
            await axios.delete(`${backend}/budget/delete/${id}`);
            fetchBudgets();
        } catch (error) {
            console.error("Error deleting budget", error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Set Monthly Budget</h2>
                <div className="grid grid-cols-3 gap-4">
                    <select
                        className="p-2 border rounded"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Budget Amount"
                        className="p-2 border rounded"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                    />
                    <input
                        type="month"
                        className="p-2 border rounded"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                    />
                </div>
                <button
                    onClick={addBudget}
                    className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Add Budget
                </button>
            </div>

            <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Budgets</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 border">Category</th>
                            <th className="p-2 border">Amount</th>
                            <th className="p-2 border">Month</th>
                            <th className="p-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {budgets.map((b) => (
                            <tr key={b._id} className="text-center">
                                <td className="p-2 border">{b.category}</td>
                                <td className="p-2 border">${b.budget}</td>
                                <td className="p-2 border">{b.month}</td>
                                <td className="p-2 border">
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        onClick={() => deleteBudget(b._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
