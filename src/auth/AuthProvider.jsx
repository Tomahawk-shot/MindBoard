import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(); // เพิ่ม export ตรงนี้

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
  const saved = localStorage.getItem("mindboard_user");
  return saved ? JSON.parse(saved) : null;
});

const login = (userData) => {
  setUser(userData);
  localStorage.setItem("mindboard_user", JSON.stringify(userData));
};
const logout = () => {
  setUser(null);
  localStorage.removeItem("mindboard_user");
};

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}