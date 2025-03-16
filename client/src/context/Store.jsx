import { createContext, useContext } from "react";

export const backendUrl = "https://personal-finance-tracker-f3ou.onrender.com"; // ✅ Explicitly define and export

const Store = createContext({ backendUrl }); // ✅ Context uses backendUrl

export const useBackend = () => useContext(Store); // ✅ Hook for consuming context

export default Store;
