import type { FormEvent } from "react";
import Title from "../Title";

interface LoginFormProps {
  email: string;
  password: string;
  error: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export default function LoginForm({
  email,
  password,
  error,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <Title text1="" text2="LOGIN" />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
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
