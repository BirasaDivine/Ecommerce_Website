import { useAuth } from "../context/AuthContext";
import { useLoginForm } from "../hooks/useLoginForm";
import AccountView from "../components/login/AccountView";
import LoginForm from "../components/login/LoginForm";

export default function Login() {
  const { user, role, isAuthenticated, logout } = useAuth();
  const form = useLoginForm();

  if (isAuthenticated && user) {
    return <AccountView email={user.email} role={role} onLogout={logout} />;
  }

  return (
    <LoginForm
      email={form.email}
      password={form.password}
      error={form.error}
      onEmailChange={form.setEmail}
      onPasswordChange={form.setPassword}
      onSubmit={form.handleSubmit}
    />
  );
}
