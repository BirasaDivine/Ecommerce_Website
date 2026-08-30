import Title from "../Title";
import type { Role } from "../../types/user";

interface AccountViewProps {
  email: string;
  role: Role;
  onLogout: () => void;
}

export default function AccountView({ email, role, onLogout }: AccountViewProps) {
  return (
    <div className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <Title text1="MY" text2="ACCOUNT" />
      <p className="text-sm text-gray-600">
        Signed in as <span className="font-medium">{email}</span>{" "}
        <span className="text-xs text-gray-400">({role})</span>
      </p>
      <button
        onClick={onLogout}
        className="bg-black text-white font-light px-8 py-2 mt-4"
      >
        LOGOUT
      </button>
    </div>
  );
}
