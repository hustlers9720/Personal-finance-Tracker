import { createContext, useContext } from "react";

export const backendUrl = "https://personal-finance-tracker-f3ou.onrender.com"; // ✅ Correct URL

const Store = createContext(backendUrl); // ✅ Provide default value

export const useBackend = () => useContext(Store);

export default Store;
