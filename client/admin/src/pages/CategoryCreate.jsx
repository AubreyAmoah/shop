import { faSpinner, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../AuthContext";
import { globalUrl } from "../globals";
const CategoryCreate = () => {
  const { loading, setLoading } = React.useContext(AuthContext);
  const [categoryName, setCategoryName] = React.useState("");
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [file, setFile] = React.useState(null);

  const deleteCategory = async (name) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `${globalUrl}/api/categories/delete/${name}`,
        { withCredentials: true }
      );
      toast.success("Deleted!!");
      console.log("Delete success", response.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  const createCategory = async () => {
    if (!categoryName) return toast.error("Enter valid characters");
    setLoading(true);
    try {
      const response = await axios.post(
        `${globalUrl}/api/categories/`,
        { name: categoryName },
        { withCredentials: true }
      );
      if (response.status === 201) {
        if (!file) {
          toast.error("Rolling back changes");
          deleteCategory(categoryName);
          return toast.error("Please select a file to upload");
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await axios.patch(
            `${globalUrl}/api/categories/addimage/${categoryName}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data", // Make sure the header is set correctly
              },
              withCredentials: true,
            }
          );

          toast.success("Category created");
          console.log("Uploaded file response:", response.data);
          setCategoryName("");
          setSelectedImage(null);
          setFile(null);
        } catch (error) {
          toast.error("Upload failed. Please try again.");
          console.error("Upload error:", error);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Category creation failed");
    } finally {
      setLoading(false);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setFile(file);
    }
  };
  return (
    <div className="absolute top-16 left-0 bg-[#f5f5f5] min-h-screen w-full">
      <h1 className="text-gradient text-2xl mb-6">Basic Info</h1>
      <input
        onChange={(e) => setCategoryName(e.target.value)}
        className={`px-4 py-2 mb-2 rounded-sm bg-[#d9d9d9ff] caret-[#229799] text-[#229799ff] gradient-placeholder focus:outline focus:outline-[#48cfcb] ml-4`}
        type="text"
        placeholder="catgeory name"
        value={categoryName}
      />

      <h1 className="text-gradient text-2xl mb-6 mt-16 max-[740px]:mt-24">
        Category Image
      </h1>
      <div className="flex flex-col justify-center items-center w-full">
        <label
          htmlFor="file"
          className=" cursor-pointer ml-auto mr-auto shadow-md max-[550px]:w-full"
        >
          <div className="bg-[#d9d9d9ff] w-[400px] h-[300px] text-[#999999ff] text-2xl flex flex-col items-center justify-center gap-4 max-[550px]:w-full">
            {selectedImage ? (
              // Show the selected image if present
              <img
                src={selectedImage}
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
          onChange={handleFileChange}
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
          onClick={createCategory}
        >
          Create
        </button>
      )}
    </div>
  );
};

export default CategoryCreate;
