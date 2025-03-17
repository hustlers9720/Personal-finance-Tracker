import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import axios from "axios";
import React from "react";
import { backendUrl, useBackend } from "../context/Store";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#E91E63"];

const DashBoardComponent = () => {
    const [chartData, setChartData] = useState([]);
    const [categoryData, setCategoryData] = useState([]); // Ensure it starts as an array
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [recentTransactions, setRecentTransactions] = useState([]);
    const backend = useBackend();

    useEffect(() => {
        axios.get(`${backend}/transaction/monthly-summary`)
            .then(res => {
                setChartData(res.data.monthlySummary || []);

                // Convert category breakdown object into an array
                const formattedCategoryData = Object.entries(res.data.categoryBreakdown || {}).map(([category, amount]) => ({
                    category,
                    amount
                }));

                setCategoryData(formattedCategoryData);
                setTotalExpenses(res.data.totalExpenses || 0);
                setRecentTransactions(res.data.recentTransactions || []);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="p-3 ml-3 mr-3 bg-gray-900 text-white rounded-lg">
            <h2 className="text-2xl font-bold text-green-400 mb-4">Financial Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-800 p-4 rounded-lg text-center">
                    <h3 className="text-lg font-semibold">Total Expenses</h3>
                    <p className="text-xl font-bold text-red-500">${totalExpenses}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Monthly Summary</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <XAxis dataKey="month" stroke="white" />
                            <YAxis stroke="white" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="income" fill="#4CAF50" radius={[5, 5, 0, 0]} name="Income" />
                            <Bar dataKey="expenses" fill="#E91E63" radius={[5, 5, 0, 0]} name="Expenses" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Category Breakdown</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={categoryData} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
        </div>
    );
};

export default DashBoardComponent;
