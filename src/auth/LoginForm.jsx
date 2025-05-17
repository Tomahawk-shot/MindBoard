import { useState } from "react";
import { useAuth } from "./AuthProvider";

export default function LoginForm({ onRegister, onForgot }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }
    login({ email });
  };

  return (
  <div className="flex justify-center items-center min-h-screen bg-[#f3f3f3]">
    <div className="max-w-xs w-full bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Sign In</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          className="border rounded px-3 py-2 text-gray-900"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="border rounded px-3 py-2 text-gray-900"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white rounded px-3 py-2 font-semibold hover:bg-green-700 transition"
        >
          Login
        </button>
      </form>
      <div className="flex justify-between mt-4 text-sm">
        <button
          className="text-gray-500 hover:text-green-600"
          onClick={onForgot}
        >
          Forgot password?
        </button>
        <button
          className="text-gray-500 hover:text-green-600"
          onClick={onRegister}
        >
          Register
        </button>
      </div>
    </div>
  </div>
);
}