import { useUserContext } from "../context/userContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logo from "../assets/logo.svg";

const SignForm = () => {
  const {
    isSignUp,
    toggleForm,
    handleEmailChange,
    handlePasswordChange,
    password,
    email,
    error,
    handleLogIn,
    handleSignUp,
    logInResponse,
    signUpResponse,
    setLogInResponse,
  } = useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (logInResponse === 200) {
      navigate("/home");
    }
    setLogInResponse(null);
  }, [setLogInResponse, logInResponse, navigate]);

  return (
    <form action="" className="flex justify-center h-2/5 w-full">
      <div className=" flex flex-col justify-evenly">
        <div>
          <h1 className="text-primary text-2xl">
            <img src={logo} alt="logo" className="h-12" />
            Welcome to Automate
          </h1>
          <p className="text-black">The ultimate tool for garages </p>
        </div>
        <input
          type="text"
          value={email}
          className="input input-bordered w-full bg-white text-black border-black"
          placeholder="Email"
          onChange={handleEmailChange}
        />
        <input
          type="password"
          className="input input-bordered w-full bg-white text-black border-black"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password}
        />
        {error && <p className="text-red-500">{error}</p>}
        <div>
          {isSignUp ? (
            <div>
              <p className="text-green-600 mb-2">{signUpResponse}</p>
              <button
                onClick={handleSignUp}
                className="btn btn-primary text-white mb-2"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogIn}
              className="btn btn-primary text-white mb-2"
            >
              Login
            </button>
          )}
          {isSignUp ? (
            <p className="text-black">
              Already have an account?{" "}
              <Link className="text-black" to="/" onClick={toggleForm}>
                Sign In
              </Link>
            </p>
          ) : (
            <p className="text-black">
              New to Automate?{" "}
              <Link
                className="text-black underline decoration-primary"
                to="/register"
                onClick={toggleForm}
              >
                Sign Up
              </Link>
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default SignForm;
