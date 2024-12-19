import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const auth = {
    signin: (email, callback) => {
      // Implement signin logic here
      setUser({ email });
      callback();
    },
    signout: (callback) => {
      setUser(null);
      callback();
    },
    user: user?.email,
  };

  return (
    <AuthContext.Provider value={{ user, auth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
