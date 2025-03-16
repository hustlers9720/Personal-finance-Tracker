import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Store from "./context/Store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Store.Provider value="http://localhost:5000"> {/* Provide backend URL */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Store.Provider>
);
