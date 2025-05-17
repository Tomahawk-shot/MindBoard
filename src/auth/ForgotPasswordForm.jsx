import { useState } from "react";

export default function ForgotPasswordForm({ onBack }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-xs mx-auto mt-12 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Forgot Password</h2>
      {sent ? (
        <div className="text-green-600 mb-4">
          If this email exists, a reset link has been sent.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            className="border rounded px-3 py-2 text-gray-900"
            placeholder="Your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white rounded px-3 py-2 font-semibold hover:bg-green-700 transition"
          >
            Send Reset Link
          </button>
        </form>
      )}
      <button
        className="mt-4 text-sm text-gray-500 hover:text-green-600"
        onClick={onBack}
      >
        Back to Login
      </button>
    </div>
  );
}