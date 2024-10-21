import { faSpinner, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../AuthContext";

const ItemCreate = () => {
  const { loading, setLoading } = React.useContext(AuthContext);
  const [itemName, setItemName] = React.useState("");
  const [selectedImages, setSelectedImages] = React.useState(null);
  const [files, setFiles] = React.useState(null);
  return (
    <div className="absolute top-16 left-0 bg-[#f5f5f5] min-h-screen w-full">
      <h1 className="text-gradient text-2xl mb-6">Basic Info</h1>
      <input
        onChange={(e) => setItemName(e.target.value)}
        className={`px-4 py-2 mb-2 rounded-sm bg-[#d9d9d9ff] caret-[#229799] text-[#229799ff] gradient-placeholder focus:outline focus:outline-[#48cfcb] ml-4`}
        type="text"
        placeholder="item name"
        value={itemName}
      />

      <h1 className="text-gradient text-2xl mb-6 mt-16 max-[740px]:mt-24">
        Item Images
      </h1>
      <div className="flex flex-col justify-center items-center w-full">
        <label
          htmlFor="file"
          className=" cursor-pointer ml-auto mr-auto shadow-md max-[550px]:w-full"
        >
          <div className="bg-[#d9d9d9ff] w-[400px] h-[300px] text-[#999999ff] text-2xl flex flex-col items-center justify-center gap-4 max-[550px]:w-full">
            {selectedImages ? (
              // Show the selected image if present
              <img
                src={selectedImages}
                alt="Selected"
                className="object-cover w-full h-full"
              />
            ) : (
              // Show the default upload icon and message if no image is selected
              <>
                <FontAwesomeIcon icon={faUpload} />
                <span>Click here to upload files</span>
              </>
            )}
          </div>
        </label>
        <input
          className="hidden"
          type="file"
          name="file"
          id="file"
          accept=".jpg,.jpeg,.webp,.png"
        />
      </div>

      {loading ? (
        <FontAwesomeIcon
          className="mt-6 px-4 py-2 text-[#229799ff] ml-10 text-xl animate-spin"
          icon={faSpinner}
        />
      ) : (
        <button
          className="mt-6 border border-[#229799ff] px-4 py-2 text-[#229799ff] ml-10 text-xl"
        >
          Create
        </button>
      )}
    </div>
  );
};

export default ItemCreate;
