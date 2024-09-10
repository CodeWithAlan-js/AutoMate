import { useFormContext } from "../context/formContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignForm = () => {
  const {
    isSignUp,
    toggleForm,
    handleEmailChange,
    handlePasswordChange,
    password,
    email,
    handleSignUp,
    handleLogin,
    response,
  } = useFormContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (response === 200) {
      navigate("/home");
    }
  }, [response, navigate]);

  return (
    <form action="" className="flex justify-center h-2/5 w-full">
      <div className="w-2/5 flex flex-col justify-evenly">
        <div>
          <h1 className="text-primary text-3xl">
            {isSignUp ? "Sign Up" : "Login"}
          </h1>
          <p className="text-black">
            Organise your holidays with complete peace of mind
          </p>
        </div>
        <input
          type="text"
          value={email}
          className="input input-bordered w-full bg-white text-black border-black"
          placeholder="Email"
          onChange={handleEmailChange}
        />
        <input
          type="text"
          className="input input-bordered w-full bg-white text-black border-black"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password}
        />
        <div>
          {isSignUp ? (
            <button onClick={handleSignUp} className="btn btn-primary">
              Sign Up
            </button>
          ) : (
            <button onClick={handleLogin} className="btn btn-primary">
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
              New to Planify?{" "}
              <Link className="text-black" to="/register" onClick={toggleForm}>
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
