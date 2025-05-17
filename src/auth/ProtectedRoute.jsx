import { useAuth } from "./AuthProvider";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-lg text-gray-500">Please login to continue.</div>
      </div>
    );
  }

  return children;
}