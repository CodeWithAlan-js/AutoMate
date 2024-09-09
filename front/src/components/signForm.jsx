const SignForm = () => {
  return (
    <form action="" className="flex justify-center h-2/5 w-full">
      <div className="w-2/5 flex flex-col justify-evenly">
        <input
          type="text"
          className="input input-bordered w-full bg-white text-black border-black"
          placeholder="Email"
        />
        <input
          type="text"
          className="input input-bordered w-full bg-white text-black border-black"
          placeholder="Password"
        />
        <button className="btn btn-primary">Sign In</button>
      </div>
    </form>
  );
};

export default SignForm;
