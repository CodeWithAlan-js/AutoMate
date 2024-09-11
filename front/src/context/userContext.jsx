import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("alan@gmail.com");
  const [password, setPassword] = useState("test");
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3001/api/auth/register",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      const status = response.status;
      setResponse(status);
      const user = response.data.user;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
  };

  const handleLogOut = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/auth/logout",
        {
          withCredentials: true,
        }
      );
      console.log("Logout response:", response.data);
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        isSignUp,
        toggleForm,
        handleEmailChange,
        handlePasswordChange,
        handleLogOut,
        email,
        password,
        handleSignUp,
        handleLogIn,
        error,
        response,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
