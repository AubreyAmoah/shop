import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

const Login = ({ session, loading, setLoading }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleLogin = async () => {
    if (loading === true) {
      return toast.error("Not allowed");
    }
    if (!email || !password)
      return toast.error("Please fill out all the fields");
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5500/api/auth/admin/signin",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      toast.success("Login Successful");
      session();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
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
            <p className="text-gradient font-bold">Sign In</p>
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 mb-2 rounded-sm bg-[#d9d9d9ff] caret-[#229799] text-[#229799ff] gradient-placeholder focus:outline focus:outline-[#48cfcb]"
            type="text"
            placeholder="email"
            value={email}
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 mb-2 rounded-sm bg-[#d9d9d9ff] caret-[#229799] text-[#229799ff] gradient-placeholder focus:outline focus:outline-[#48cfcb]"
            type="password"
            placeholder="password"
            value={password}
          />
          <button
            onClick={handleLogin}
            className={`${
              loading ? "disabled:bg-gray-400 disabled:cursor-not-allowed" : ""
            }text-gradient border border-[#229799ff] w-[100px] p-2 ml-auto mr-auto mt-4`}
          >
            {loading ? (
              <FontAwesomeIcon className="animate-spin" icon={faSpinner} />
            ) : (
              "Sign In"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
