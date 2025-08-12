import { createContext, useContext } from "react";

interface AuthContextType {
  name: string | null;
  email: string | null;
  token: string | null;
  login: (name: string, email: string, token: string) => void;
}

export const AuthContext = createContext<AuthContextType>({name: null, email: null, token: null, login: () => {}});

export const useAuth = () => useContext(AuthContext);
