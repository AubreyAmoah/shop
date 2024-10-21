import { faEdit, faListAlt } from "@fortawesome/free-regular-svg-icons";
import {
  faDoorClosed,
  faHome,
  faTools,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../AuthContext";

const Sidebar = ({ open, closeSidebar }) => {
  const { logout } = React.useContext(AuthContext);
  return (
    <div
      className={`transition-all ${
        open
          ? "fixed left-0 top-16 h-[85vh] overflow-auto bg-[#f5f5f5ff] w-[400px] shadow-md z-20"
          : "hidden"
      }`}
    >
      <a href="/" className="flex gap-4 items-center text-2xl mb-8">
        <FontAwesomeIcon className="text-[#229799ff]" icon={faHome} />{" "}
        <p className="text-gradient">Home</p>
      </a>
      <div className="flex flex-col gap-4 w-full p-2 mb-6 ">
        <h1 className="text-gradient text-2xl">Categories</h1>
        <a href="/createcategory" className="flex gap-4 items-center">
          <FontAwesomeIcon className="text-[#229799ff]" icon={faEdit} />{" "}
          <p className="text-gradient">Create Category</p>
        </a>
        <a href="/viewcategories" className="flex gap-4 items-center">
          <FontAwesomeIcon className="text-[#229799ff]" icon={faListAlt} />{" "}
          <p className="text-gradient">View Categories</p>
        </a>
      </div>

      <div className="flex flex-col gap-4 w-full p-2 mb-6">
        <h1 className="text-gradient text-2xl">Items</h1>
        <a href="/createitem" className="flex gap-4 items-center">
          <FontAwesomeIcon className="text-[#229799ff]" icon={faEdit} />{" "}
          <p className="text-gradient">Create Item</p>
        </a>
        <a href="/viewitems" className="flex gap-4 items-center">
          <FontAwesomeIcon className="text-[#229799ff]" icon={faListAlt} />{" "}
          <p className="text-gradient">View Items</p>
        </a>
      </div>

      <div className="flex flex-col gap-4 w-full p-2 mb-6">
        <h1 className="text-gradient text-2xl">Profile</h1>
        <a href="/setting" className="flex gap-4 items-center">
          <FontAwesomeIcon className="text-[#229799ff]" icon={faTools} />{" "}
          <p className="text-gradient">Settings</p>
        </a>
        <a href="/accounts" className="flex gap-4 items-center">
          <FontAwesomeIcon className="text-[#229799ff]" icon={faUserGroup} />{" "}
          <p className="text-gradient">Accounts</p>
        </a>
        <button
          onClick={() => {
            logout();
            closeSidebar();
          }}
          className="flex gap-4 items-center"
        >
          <FontAwesomeIcon className="text-[#229799ff]" icon={faDoorClosed} />{" "}
          <p className="text-gradient">Logout</p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
