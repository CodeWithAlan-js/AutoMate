import { CiLogout } from "react-icons/ci";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const LogOutButton = () => {
  const { handleLogOut } = useUserContext();
  const navigate = useNavigate();

  const handleClick = async () => {
    await handleLogOut();
    navigate("/");
  };

  return (
    <button onClick={handleClick}>
      <CiLogout size={30} />
    </button>
  );
};

export default LogOutButton;
