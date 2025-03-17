import { useState, useEffect } from "react";
import axios from "axios";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from "recharts";
import React from "react";
import { useBackend } from "../context/Store";

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"];

export default function BudgetvsActual() {
    const [budgetData, setBudgetData] = useState([]);
    const [actualData, setActualData] = useState({});
    const [month, setMonth] = useState("");
    const backend = useBackend();

    useEffect(() => {
        if (month) {
            fetchBudgetData();
            fetchActualData();
        }
    }, [month]);

    const fetchBudgetData = async () => {
        if (!month) return;

        try {
            console.log("Fetching budget data for:", month);
            const response = await axios.get(`${backend}/budget/actual`, { params: { month } });
            console.log("Budget Data:", response.data);
            setBudgetData(response.data);
        } catch (error) {
            console.error("Error fetching budget data", error);
        }
    };

    const fetchActualData = async () => {
        if (!month) return;

        try {
            console.log("Fetching actual data for:", month);
            const response = await axios.get(`${backend}/transaction/monthly-summary`, { params: { month } });
            console.log("Actual Data:", response.data);

            const transactions = response.data.transactions || [];

            const categorizedData = transactions.reduce((acc, txn) => {
                const category = txn.category;
                if (!acc[category]) acc[category] = 0;
                acc[category] += txn.amount;
                return acc;
            }, {});

            console.log("Processed Actual Data:", categorizedData);
            setActualData(categorizedData);
        } catch (error) {
            console.error("Error fetching actual data", error);
        }
    };

    const mergeData = () => {
        return budgetData.map((budgetItem) => ({
            category: budgetItem.category,
            budget: budgetItem.budget,
            actual: actualData[budgetItem.category], // Ensure fallback for missing data
        }));
    };

    const pieChartData = mergeData().map((item) => ({
        name: item.category,
        value: item.actual,
    }));

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-xl font-semibold mb-4">Budget vs Actual Comparison</h2>

            <input
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="p-2 border rounded mb-4 w-full"
            />

            {budgetData.length > 0 ? (
                <>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={mergeData()}>
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="budget" fill="#3b82f6" name="Budget" />
                            <Bar dataKey="actual" fill="#ef4444" name="Actual Spending" />
                        </BarChart>
                    </ResponsiveContainer>

                    <h3 className="text-lg font-semibold mt-6 text-center">Actual Spending Breakdown</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </>
            ) : (
                <p className="text-gray-500 text-center">No data available</p>
            )}
        </div>
    );
}
