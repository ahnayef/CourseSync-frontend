import { createContext } from "react";

export const AuthContext = createContext<any | undefined>(undefined);

export const AuthProvider = AuthContext.Provider;
export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;


