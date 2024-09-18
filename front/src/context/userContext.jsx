import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [logInResponse, setLogInResponse] = useState(null);
  const [signUpResponse, setSignUpResponse] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const toggleForm = () => setIsSignUp((prev) => !prev);

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        { email, password },
        { withCredentials: true }
      );
      console.log(response);
      setSignUpResponse(response.data.message);
    } catch (error) {
      setError(error.response?.data?.message || "Sign Up Error");
    }
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setLogInResponse(response.status);
    } catch (error) {
      setError(error.response?.data?.message || "Login Error");
      throw error;
    }
  };

  const handleLogOut = async () => {
    try {
      await axios.get("http://localhost:3001/api/auth/logout", {
        withCredentials: true,
      });
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      setError(error.response?.data?.message || "Logout Error");
    }
  };

  return (
    <UserContext.Provider
      value={{
        isSignUp,
        toggleForm,
        handleEmailChange,
        handlePasswordChange,
        email,
        password,
        handleSignUp,
        handleLogIn,
        handleLogOut,
        logInResponse,
        signUpResponse,
        setLogInResponse,
        error,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
