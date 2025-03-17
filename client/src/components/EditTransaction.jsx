import { useState } from "react";
import axios from "axios";
import React from "react";
import { backendUrl, useBackend } from "../context/Store";

const categories = ["Food", "Transport", "Shopping", "Entertainment", "Others"]; // Fixed category options

const EditTransaction = ({ transaction, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    amount: transaction.amount || "",
    date: transaction.date ? transaction.date.split("T")[0] : "", // Convert to YYYY-MM-DD
    description: transaction.description || "",
    category: transaction.category || categories[0], // Default to the first category if empty
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const backend = useBackend();

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.amount || !formData.date || !formData.description || !formData.category) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      await axios.put(`${backend}/transaction/update/${transaction._id}`, formData);
      onUpdate({ ...transaction, ...formData });
    } catch (err) {
      setError("Failed to update transaction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 border rounded bg-gray-100">
      <h2 className="text-xl font-bold">Edit Transaction</h2>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block">Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-2">
          <label className="block">Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-2">
          <label className="block">Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-2">
          <label className="block">Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>

          <button
            type="button"
            className="bg-gray-500 text-white p-2 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTransaction;
