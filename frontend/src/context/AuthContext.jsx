import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Check if already logged in on first load
  useEffect(() => {
    fetch("http://localhost:5001/api/auth/me", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  const login = async (email, password) => {
    const res = await fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      setUser({ id: data.userId, email });
      return true;
    }
    return false;
  };

  const logout = async () => {
    setUser(null);
    // optional: call a backend logout endpoint to clear the cookie
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}