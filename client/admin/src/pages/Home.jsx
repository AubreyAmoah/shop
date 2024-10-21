import { faEdit } from "@fortawesome/free-regular-svg-icons";
import {
  faDoorClosed,
  faList,
  faSpinner,
  faTools,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { AuthContext } from "../AuthContext";

const Home = () => {
  const { user, loading, logout } = React.useContext(AuthContext);

  if (!user) {
    return <p>You need to log in to access the dashboard</p>;
  }
  return (
    <div className="absolute top-16 left-0 bg-[#f5f5f5] min-h-screen w-full">
      <h1 className="text-gradient text-2xl mb-6">Category</h1>
      <div className="grid grid-cols-3 grid-rows-1 gap-20 max-[1000px]:gap-4 max-[380px]:grid-cols-1">
        <a
          href="/createcategory"
          className="bg-[#d9d9d9ff] shadow-md rounded-t-md text-center w-[200px] ml-auto mr-auto max-[740px]:w-[160px] max-[740px]:h-[160px] max-[500px]:w-[120px] max-[500px]:h-[120px]"
        >
          <FontAwesomeIcon
            className="text-[#229799ff] text-[100px] mt-[30px] mb-[30px] max-[740px]:text-[66px] max-[500px]:text-[40px]"
            icon={faEdit}
          />

          <div className=" rounded-b-md bg-white p-4 text-center max-[740px]:p-2 max-[740px]:text-sm max-[500px]:text-xs">
            <p className="text-gradient font-bold">Create Category</p>
          </div>
        </a>
        <a
          href="/viewcategories"
          className="bg-[#d9d9d9ff] shadow-md rounded-t-md text-center w-[200px] ml-auto mr-auto max-[740px]:w-[160px] max-[740px]:h-[160px] max-[500px]:w-[120px] max-[500px]:h-[120px]"
        >
          <FontAwesomeIcon
            className="text-[#229799ff] text-[100px] mt-[30px] mb-[30px] max-[740px]:text-[66px] max-[500px]:text-[40px]"
            icon={faList}
          />
          <div className=" rounded-b-md bg-white p-4 text-center max-[740px]:p-2 max-[740px]:text-sm max-[500px]:text-xs">
            <p className="text-gradient font-bold">View Categories</p>
          </div>
        </a>
      </div>

      <h1 className="text-gradient text-2xl mb-6 mt-16 max-[740px]:mt-24">
        Items
      </h1>
      <div className="grid grid-cols-3 grid-rows-1 gap-20 max-[1000px]:gap-4 max-[380px]:grid-cols-1">
        <a
          href="/createitem"
          className="bg-[#d9d9d9ff] shadow-md rounded-t-md text-center w-[200px] ml-auto mr-auto max-[740px]:w-[160px] max-[740px]:h-[160px] max-[500px]:w-[120px] max-[500px]:h-[120px]"
        >
          <FontAwesomeIcon
            className="text-[#229799ff] text-[100px] mt-[30px] mb-[30px] max-[740px]:text-[66px] max-[500px]:text-[40px]"
            icon={faEdit}
          />

          <div className=" rounded-b-md bg-white p-4 text-center max-[740px]:p-2 max-[740px]:text-sm max-[500px]:text-xs">
            <p className="text-gradient font-bold">Create Category</p>
          </div>
        </a>
        <a
          href="/viewitems"
          className="bg-[#d9d9d9ff] shadow-md rounded-t-md text-center w-[200px] ml-auto mr-auto max-[740px]:w-[160px] max-[740px]:h-[160px] max-[500px]:w-[120px] max-[500px]:h-[120px]"
        >
          <FontAwesomeIcon
            className="text-[#229799ff] text-[100px] mt-[30px] mb-[30px] max-[740px]:text-[66px] max-[500px]:text-[40px]"
            icon={faList}
          />

          <div className=" rounded-b-md bg-white p-4 text-center max-[740px]:p-2 max-[740px]:text-sm max-[500px]:text-xs">
            <p className="text-gradient font-bold">View Categories</p>
          </div>
        </a>
      </div>

      <h1 className="text-gradient text-2xl mb-6 mt-16 max-[740px]:mt-24">
        Profile
      </h1>
      <div className="grid grid-cols-3 grid-rows-1 gap-20 mb-6 max-[1000px]:gap-4 max-[380px]:grid-cols-1">
        <a
          href="/setting"
          className="bg-[#d9d9d9ff] shadow-md rounded-t-md text-center w-[200px] ml-auto mr-auto max-[740px]:w-[160px] max-[740px]:h-[160px] max-[500px]:w-[120px] max-[500px]:h-[120px]"
        >
          <FontAwesomeIcon
            className="text-[#229799ff] text-[100px] mt-[30px] mb-[30px] max-[740px]:text-[66px] max-[500px]:text-[40px]"
            icon={faTools}
          />

          <div className=" rounded-b-md bg-white p-4 text-center max-[740px]:p-2 max-[740px]:text-sm max-[500px]:text-xs">
            <p className="text-gradient font-bold">Settings</p>
          </div>
        </a>
        <a
          href="/accounts"
          className="bg-[#d9d9d9ff] shadow-md rounded-t-md text-center w-[200px] ml-auto mr-auto max-[740px]:w-[160px] max-[740px]:h-[160px] max-[500px]:w-[120px] max-[500px]:h-[120px]"
        >
          <FontAwesomeIcon
            className="text-[#229799ff] text-[100px] mt-[30px] mb-[30px] max-[740px]:text-[66px] max-[500px]:text-[40px]"
            icon={faUserGroup}
          />

          <div className=" rounded-b-md bg-white p-4 text-center max-[740px]:p-2 max-[740px]:text-sm max-[500px]:text-xs">
            <p className="text-gradient font-bold">Accounts</p>
          </div>
        </a>
        <button
          onClick={logout}
          className={`bg-[#d9d9d9ff] shadow-md rounded-t-md text-center w-[200px] ml-auto mr-auto ${
            loading ? "disabled:cursor-not-allowed opacity-50" : ""
          } mr-auto max-[740px]:w-[160px] max-[740px]:h-[160px] max-[500px]:w-[120px] max-[500px]:h-[120px]`}
        >
          {loading ? (
            <FontAwesomeIcon
              className="animate-spin text-[#229799ff] text-[100px] mt-[30px] mb-[30px] max-[740px]:text-[66px] max-[500px]:text-[40px]"
              icon={faSpinner}
            />
          ) : (
            <FontAwesomeIcon
              className="text-[#229799ff] text-[100px] mt-[30px] mb-[30px] max-[740px]:text-[66px] max-[500px]:text-[40px]"
              icon={faDoorClosed}
            />
          )}

          <div className=" rounded-b-md bg-white p-4 text-center max-[740px]:p-2 max-[740px]:text-sm max-[500px]:text-xs">
            <p className="text-gradient font-bold">
              {loading ? "...please wait" : "Logout"}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Home;
