// filepath: src/pages/AuthPage.jsx
import { useState } from "react";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import ForgotPasswordForm from "../auth/ForgotPasswordForm";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  return (
    <>
      {mode === "login" && (
        <LoginForm
          onRegister={() => setMode("register")}
          onForgot={() => setMode("forgot")}
        />
      )}
      {mode === "register" && (
        <RegisterForm onLogin={() => setMode("login")} />
      )}
      {mode === "forgot" && (
        <ForgotPasswordForm onBack={() => setMode("login")} />
      )}
    </>
  );
}