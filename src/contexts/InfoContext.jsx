import { createContext, useContext } from "react";

export const InfoContext = createContext();
export const useInfo = () => useContext(InfoContext);
