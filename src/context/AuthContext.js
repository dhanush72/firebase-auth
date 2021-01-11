import React, { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const updateEmail = (email) => {
    return currentUser.updateEmail(email);
  };

  const updatePassword = (password) => {
    return currentUser.updatePassword(password);
  };

  const forgotpassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  const logout = () => {
    return auth.signOut();
  };

  const value = {
    currentUser,
    login,
    signup,
    forgotpassword,
    updateEmail,
    updatePassword,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
