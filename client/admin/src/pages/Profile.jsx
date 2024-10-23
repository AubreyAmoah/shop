import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../AuthContext";
import { globalUrl } from "../globals";

const Profile = () => {
  const { user, checkSession, loading } = React.useContext(AuthContext);
  const [newName, setNewName] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [oldPassword, setOldPassword] = React.useState("");
  const [showPasswordFields, setShowPasswordFields] = React.useState(false);

  const updateUser = async () => {
    if (!newName) return toast.error("Provide valid characters");
    try {
      const response = await axios.patch(
        `${globalUrl}/api/admin/update`,
        { name: newName },
        { withCredentials: true }
      );
      toast.success("Update success!");
      console.log("Update success", response.data);
      setNewName("");
      checkSession();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  const changePassword = async () => {
    if (!newPassword || !oldPassword)
      return toast.error("Provide valid characters");
    try {
      const response = await axios.patch(
        `${globalUrl}/api/admin/changepassword`,
        { oldPassword, newPassword },
        { withCredentials: true }
      );
      toast.success("Password Changed!!");
      console.log("Update success", response.data);
      setNewPassword("");
      setOldPassword("");
      checkSession();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  const toggleFields = () => {
    setShowPasswordFields(!showPasswordFields);
  };
  return (
    <div className="absolute top-16 left-0 bg-[#f5f5f5] max-[800px]:overflow-auto h-screen w-full">
      <div className="w-[300px] md:w-[600px] lg:w-[300px] absolute top-4 lg:top-4 md:top-32 left-1/2 -translate-x-1/2">
        <div className="bg-[#d9d9d9ff] shadow-md rounded-t-md text-center">
          <FontAwesomeIcon
            className="text-[#229799ff] text-[200px] mt-[30px] mb-[30px]"
            icon={faUser}
          />

          <div className=" rounded-b-md bg-white p-4 text-center">
            <p className="text-gradient font-bold">{user.email}</p>
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <input
            onChange={(e) => setNewName(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && updateUser()}
            className="px-4 py-2 mb-2 rounded-sm bg-[#d9d9d9ff] caret-[#229799] text-[#229799ff] gradient-placeholder focus:outline focus:outline-[#48cfcb]"
            type="text"
            placeholder={user.name}
            value={newName}
          />

          <button
            onClick={toggleFields}
            className={`${
              loading ? "disabled:bg-gray-400 disabled:cursor-not-allowed" : ""
            }text-gradient border border-[#229799ff] p-2 ml-auto mr-auto mt-4 mb-2`}
          >
            {loading ? (
              <FontAwesomeIcon className="animate-spin" icon={faSpinner} />
            ) : showPasswordFields ? (
              "hide"
            ) : (
              "change password"
            )}
          </button>
          <input
            onChange={(e) => setOldPassword(e.target.value)}
            className={`${
              showPasswordFields
                ? "px-4 py-2 mb-2 rounded-sm bg-[#d9d9d9ff] caret-[#229799] text-[#229799ff] gradient-placeholder focus:outline focus:outline-[#48cfcb]"
                : "hidden"
            }`}
            type="password"
            placeholder="old password"
            value={oldPassword}
          />
          <input
            onChange={(e) => setNewPassword(e.target.value)}
            className={`${
              showPasswordFields
                ? "px-4 py-2 mb-2  rounded-sm bg-[#d9d9d9ff] caret-[#229799] text-[#229799ff] gradient-placeholder focus:outline focus:outline-[#48cfcb]"
                : "hidden"
            }`}
            type="password"
            placeholder="new password"
            value={newPassword}
          />

          <button
            onClick={changePassword}
            className={`${
              showPasswordFields
                ? `${
                    loading
                      ? "disabled:bg-gray-400 disabled:cursor-not-allowed"
                      : ""
                  }text-gradient border border-[#229799ff] p-2 ml-auto mr-auto mt-4`
                : "hidden"
            }`}
          >
            {loading ? (
              <FontAwesomeIcon className="animate-spin" icon={faSpinner} />
            ) : (
              "Update"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
