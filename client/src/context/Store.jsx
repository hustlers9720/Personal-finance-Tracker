import { createContext, useContext } from "react";

export const backendUrl = "http://localhost:5000"; // ✅ Correct URL

const Store = createContext(backendUrl); // ✅ Provide default value

export const useBackend = () => useContext(Store);

export default Store;
