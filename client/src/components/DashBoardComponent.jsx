import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import axios from "axios";
import React from "react";
import { backendUrl, useBackend } from "../context/Store";

const DashBoardComponent = () => {
    const [chartData, setChartData] = useState([]);
    const backend = useBackend();
    useEffect(() => {
        axios.get(`${backend}/transaction/monthly-summary`)
            .then(res => {
                setChartData(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="p-3 ml-3 mr-3 bg-gray-900 text-white rounded-lg ">
            <h2 className="text-2xl font-bold text-green-400 mb-4">Financial Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <XAxis dataKey="month" stroke="white" />
                    <YAxis stroke="white" />
                    <Tooltip />
                    <Bar dataKey="income" fill="#4CAF50" radius={[5, 5, 0, 0]} />
                    <Bar dataKey="expenses" fill="#E91E63" radius={[5, 5, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DashBoardComponent;
