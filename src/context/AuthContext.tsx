import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { login as loginRequest } from "../services/authService";
import { getStoredAuth, setStoredAuth, clearStoredAuth } from "../services/authStorage";
import type { StoredAuth } from "../services/authStorage";
import type { Role, User } from "../types/user";

interface AuthContextValue {
  user: User | null;
  role: Role;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<StoredAuth | null>(getStoredAuth);

  const login = async (email: string, password: string) => {
    const result = await loginRequest(email, password);
    setStoredAuth(result);
    setAuth(result);
  };

  const logout = () => {
    clearStoredAuth();
    setAuth(null);
  };

  const value: AuthContextValue = {
    user: auth?.user ?? null,
    role: auth?.user.role ?? "PUBLIC",
    isAuthenticated: auth !== null,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
