import { useFormContext } from "../context/formContext";

const HomePage = () => {
  const { user, handleLogOut } = useFormContext();

  return (
    <div>
      <h1 className="text-black">Home Page</h1>
      {user ? (
        <>
          <h2 className="text-black">Welcome {user.email}</h2>
          <button onClick={handleLogOut} className="btn btn-primary">
            Logout
          </button>
        </>
      ) : (
        <h2 className="text-black">No user logged in</h2>
      )}
    </div>
  );
};

export default HomePage;
