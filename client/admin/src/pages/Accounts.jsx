import React from "react";
import { AuthContext } from "../AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { globalUrl } from "../globals";

const Accounts = () => {
  const { loading, setLoading } = React.useContext(AuthContext);
  const [accountsData, setAccountsData] = React.useState({});

  React.useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${globalUrl}/api/admin/users`, {
          withCredentials: true,
        });
        setAccountsData(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching item data", err);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);
  return (
    <div className="absolute top-16 left-0 bg-[#f5f5f5] min-h-screen w-full">
      {loading ? (
        <FontAwesomeIcon
          icon={faSpinner}
          className="animate-spin text-[#229799ff] text-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      ) : (
        <>
          <h1 className="text-gradient text-2xl mb-6 capitalize">Accounts</h1>
          {accountsData ? (
            accountsData?.map((data) => (
              <div
                key={data?.id}
                className="flex flex-col items-center w-full text-gradient text-left"
              >
                <div className="flex gap-4">
                  <FontAwesomeIcon className="text-[#229799ff]" icon={faUser} />
                  <span>{data.email}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No users available</p>
          )}
        </>
      )}
    </div>
  );
};

export default Accounts;
