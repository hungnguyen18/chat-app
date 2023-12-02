import React, { useEffect, useState, createContext } from "react";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const history = useNavigate();

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;

        setUser({ displayName, email, uid, photoURL });

        setIsLoading(false);

        history("/");

        return;
      }

      // reset user info
      setUser({});
      setIsLoading(false);
      history("/login");
    });

    //clean function
    return () => {
      unsubscribed();
    };
  }, [history]);

  return (
    <AuthContext.Provider value={{ user }}>
      {isLoading ? (
        <Spin style={{ position: "fixed", inset: 0 }}></Spin>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
