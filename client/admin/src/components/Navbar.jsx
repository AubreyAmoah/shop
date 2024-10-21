import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { AuthContext } from "../AuthContext";

const Navbar = ({ open, setOpen }) => {
  const { user } = React.useContext(AuthContext);
  const [visible, setVisible] = React.useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
  const toggleVisible = () => {
    setVisible(!visible);
  };
  return (
    <div className="fixed top-0 left-0 flex items-center w-full justify-between bg-[#f5f5f5ff] h-[60px] shadow-md z-10">
      <div className={`${user ? "block cursor-pointer ml-4" : "hidden"}`}>
        <div onClick={toggleOpen}>
          <div
            className={`transition-all h-1 w-8 rounded-full bg-gradient-to-br from-[#229799ff] to-[#48cfcbff] ${
              open ? "rotate-45 top-2 relative" : ""
            }`}
          ></div>
          <div
            className={`transition-all h-1 w-8 rounded-full bg-gradient-to-br from-[#229799ff] to-[#48cfcbff] mt-1 ${
              open ? "opacity-0" : ""
            }`}
          ></div>
          <div
            className={`transition-all h-1 w-8 rounded-full bg-gradient-to-br from-[#229799ff] to-[#48cfcbff] mt-1 ${
              open ? "-rotate-45 -top-2 relative" : ""
            }`}
          ></div>
        </div>
      </div>

      <input
        type="text"
        placeholder="search"
        className={`${
          visible
            ? "caret-[#229799] gradient-placeholder focus:outline focus:outline-[#48cfcb] py-2 px-4 rounded-sm bg-[#d9d9d9ff]"
            : "hidden"
        }`}
      />

      <button
        className={`${user ? "block" : "hidden"}`}
        onClick={toggleVisible}
      >
        <FontAwesomeIcon
          icon={faSearch}
          className={`text-[#229799] text-[20px] mr-4`}
        />
      </button>
    </div>
  );
};

export default Navbar;
