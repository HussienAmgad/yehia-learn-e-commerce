import { createContext, useContext } from "react";

interface AuthContextType {
  name: string | null;
  email: string | null;
  token: string | null;
  login: (name: string, email: string, token: string) => void;
  logout: () => void;
  isAuthorization: boolean;
}

export const AuthContext = createContext<AuthContextType>({ name: null, email: null, token: null, login: () => {}, isAuthorization: false, logout: () => {} });

export const useAuth = () => useContext(AuthContext);
