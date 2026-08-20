import { json } from "stream/consumers";
import type { User } from "../types/user";

const AUTH_KEY = "vinba_auth";

export interface StoredAuth {
  token: string;
  user: User;
}

export function getStoredAuth(): StoredAuth | null {
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw )return null;

  try {
    return JSON.parse(raw);
  }catch {
    return null;
  }
}

export function setStoredAuth(auth: StoredAuth): void {
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
}

export function clearStoredAuth(): void {
  localStorage.removeItem(AUTH_KEY);
}
