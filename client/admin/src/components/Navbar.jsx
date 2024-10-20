import React from "react";

const Navbar = ({ open, setOpen }) => {
  const toggleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="sticky top-0 left-0 flex items-center w-full justify-between bg-[#f5f5f5ff] h-[60px] shadow-md">
      <div className="block cursor-pointer ml-4 ">
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
    </div>
  );
};

export default Navbar;
