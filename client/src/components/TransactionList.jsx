import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import EditTransaction from "./EditTransaction";
import { backendUrl, useBackend } from "../context/Store";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [visibleTransactions, setVisibleTransactions] = useState(5);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const backend = useBackend();
  // Fetch Transactions
  useEffect(() => {
    axios
      .get(`${backend}/transaction/get`)
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Handle Edit Click
  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction);
  };

  // Handle Update Transaction
  const handleUpdateTransaction = (updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx._id === updatedTransaction._id ? updatedTransaction : tx))
    );
    setEditingTransaction(null);
  };

  // Handle Delete Transaction
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) return;

    try {
      await axios.delete(`${backend}/transaction/delete/${id}`);
      setTransactions((prev) => prev.filter((tx) => tx._id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-5">Transactions</h2>

      {editingTransaction ? (
        <EditTransaction
          transaction={editingTransaction}
          onUpdate={handleUpdateTransaction}
          onCancel={() => setEditingTransaction(null)}
        />
      ) : (
        <div className="space-y-4">
          {transactions.slice(0, visibleTransactions).map((tx) => (
            <div key={tx._id} className="bg-gray-800 text-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">${tx.amount}</p>
                <p className="text-sm text-gray-400">{new Date(tx.date).toLocaleDateString()}</p>
                <p className="text-sm">{tx.description}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEditClick(tx)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(tx._id)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {visibleTransactions < transactions.length && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setVisibleTransactions(transactions.length)}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
              >
                Show More
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TransactionList;