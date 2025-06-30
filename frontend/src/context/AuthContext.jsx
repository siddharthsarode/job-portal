import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_APP_BASE_URL;

  // console.log(user);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const res = await fetch(`${url}/auth/getUser`, {
          method: "GET",
          credentials: "include",
        });

        const result = await res.json();

        if (!res.ok || !result.user) {
          setUser(null);
          return;
        }

        setUser(result.user);
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getUserProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
