import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Transacations from "./pages/Transacations";
import Dashboard from "./pages/Dashboard";
import BudgetManager from "./pages/BudgetManager";
import React from "react";

const App = () => {
  return (

    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transacations />} />
          <Route path="/budget-Manager" element={<BudgetManager />} />
        </Routes>
      </div>
    </div>

  );
};

export default App;
