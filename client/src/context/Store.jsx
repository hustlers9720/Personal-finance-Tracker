import { createContext, useContext } from "react";

export const backendUrl = "http://localhost:5000"; // ✅ Explicitly define and export

const Store = createContext(backendUrl); // ✅ Context uses backendUrl

export const useBackend = () => useContext(Store); // ✅ Hook for consuming context

export default Store;
