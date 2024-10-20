import React from "react";

const Sidebar = ({ open, user }) => {
  return (
    <div
      className={`transition-all ${
        open
          ? "sticky left-0 top-[65px] h-[85vh] overflow-auto bg-[#f5f5f5ff] w-[400px] shadow-md"
          : "hidden"
      }`}
    >
      {user ? <>test</> : <></>}
    </div>
  );
};

export default Sidebar;
