import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";

const NavBar = () => {
  return (
    <nav className="h-auto w-full border-b border-black flex p-2 fixed">
      <div className="flex justify-between w-full">
        <Link>
          <img src={logo} alt="logo" className="h-12" />
        </Link>
        <button>
          <HiMenuAlt3 size={46} />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
