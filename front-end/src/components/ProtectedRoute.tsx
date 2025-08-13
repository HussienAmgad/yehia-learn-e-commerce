import { useAuth } from "../context/Auth/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token } = useAuth();

  if (!token) {
    return <p className="text-2xl text-center mt-20">Please Login</p>;
  }

  return children;
}
