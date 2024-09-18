import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import HamburgerMenu from "./hamburgerMenu";

const NavBar = () => {
  return (
    <nav
      className="z-10 h-auto w-full border-b top-0  flex fixed bg-white bg-opacity-10  border border-white border-opacity-30 shadow-lg p-6 rounded-xl backdrop-blur-md

"
    >
      <div className="flex justify-between w-full">
        <Link>
          <img src={logo} alt="logo" className="h-12" />
        </Link>
        <HamburgerMenu />
      </div>
    </nav>
  );
};

export default NavBar;
