import SignForm from "./signForm";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="flex flex-col h-3/4 w-2/5 border border-primary rounded shadow-lg">
      <div className="flex flex-col justify-around items-center w-full h-40 ">
        <h1 className="text-4xl underline underline-offset-8 text-center mt-10 text-black">
          Sign In
        </h1>
        <p className="text-black">
          Organise your holidays with complete peace of mind
        </p>
      </div>
      <SignForm />
      <div>
        <p className="text-black text-center">
          Don&apos;t have an account yet?{" "}
          <Link className="text-pink-400" to={"/signup"}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
