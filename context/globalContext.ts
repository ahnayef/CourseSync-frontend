import { createContext } from "react";

export const GlobalContext = createContext<any | undefined>(undefined);

export const GlobalProvider = GlobalContext.Provider;
export const AuthConsumer = GlobalContext.Consumer;

export default GlobalContext;


