import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      await axios.post("http://localhost:3000/api/auth/register", {
        email,
        password,
      });
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
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

  const handleLogOut = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <FormContext.Provider
      value={{
        isSignUp,
        toggleForm,
        handleEmailChange,
        handlePasswordChange,
        handleLogOut,
        email,
        password,
        handleSignUp,
        handleLogin,
        error,
        response,
        user,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  return useContext(FormContext);
};
