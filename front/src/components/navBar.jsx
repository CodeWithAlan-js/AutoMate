import logo from "../assets/logo.svg";

const NavBar = () => {
  return (
    <nav className="w-full border-b-2 border-primary flex">
      <div className="flex justify-center items-center">
        <img src={logo} alt="logo" className="w-20" />
        logo
      </div>
    </nav>
  );
};

export default NavBar;
