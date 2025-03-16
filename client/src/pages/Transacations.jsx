import TransactionList from "../components/TransactionList";
import AddTransaction from "../components/AddTransaction";
import React from "react";
const Transacations = () => {
  return (
    <div className="p-5">
      <h2 className="text-xl font-bold">Transactions</h2>
      <AddTransaction />
      <TransactionList />
    </div>
  );
};

export default Transacations;
