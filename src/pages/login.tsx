import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { getStoredAuth, setStoredAuth, clearStoredAuth } from "../services/authStorage";
import type { StoredAuth } from "../services/authStorage";
import Title from "../components/Title";

export default function Login() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<StoredAuth | null>(getStoredAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const result = await login(email, password);
      setStoredAuth(result);
      setAuth(result);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const handleLogout = () => {
    clearStoredAuth();
    setAuth(null);
    setEmail("");
    setPassword("");
  };

  if (auth) {
    return (
      <div className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
        <Title text1="MY" text2="ACCOUNT" />
        <p className="text-sm text-gray-600">
          Signed in as <span className="font-medium">{auth.user.email}</span>
        </p>
        <button
          onClick={handleLogout}
          className="bg-black text-white font-light px-8 py-2 mt-4"
        >
          LOGOUT
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <Title text1="" text2="LOGIN" />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
        required
      />

      {error && <p className="w-full text-sm text-red-600">{error}</p>}

      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        SIGN IN
      </button>
    </form>
  );
}
