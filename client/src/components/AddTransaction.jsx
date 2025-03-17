import { useState } from "react";
import axios from "axios";
import React from "react";
import { backendUrl, useBackend } from "../context/Store";

const categories = [
  "Food", "Transport", "Shopping", "Entertainment", "Others"
];

const AddTransaction = () => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]); // Default category

  const backend = useBackend();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backend}/transaction/add`, { amount, date, description, category });
      alert("Transaction Added!");
      setAmount("");
      setDate("");
      setDescription("");
      setCategory(categories[0]); // Reset to default category
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 bg-gray-900 text-white shadow-lg rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-center">Add Transaction</h2>

      <div className="flex gap-3 mb-3">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="border p-2 rounded w-1/3 bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="border p-2 rounded w-1/3 bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="border p-2 rounded w-1/3 bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        rows="2"
        className="border p-2 rounded w-full bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
      />

      <button
        type="submit"
        className="mt-4 w-full p-3 bg-green-500 hover:bg-green-600 transition-all rounded-lg text-white font-semibold"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default AddTransaction;
