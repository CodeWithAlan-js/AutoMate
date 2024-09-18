import { CgMenuRightAlt } from "react-icons/cg";
import { useState } from "react";
import LogOutButton from "./logOutButton";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={handleClick} type="button">
        <CgMenuRightAlt size={48} />
      </button>
      <div
        className={`fixed right-0 top-28 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <ul className="flex flex-col">
          <li className="p-4 border-b border-gray-200 flex justify-center">
            <LogOutButton />
          </li>
        </ul>
      </div>
    </>
  );
};

export default HamburgerMenu;
