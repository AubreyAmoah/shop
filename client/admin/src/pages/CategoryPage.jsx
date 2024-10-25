import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faUpload } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { globalUrl } from "../globals";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { name } = useParams();
  const { loading, setLoading } = useContext(AuthContext);
  const [categoryData, setCategoryData] = useState({});
  const [newName, setNewName] = useState(""); // New state for category name update
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const fetchCategoryDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${globalUrl}/api/categories/${name}`, {
        withCredentials: true,
      });
      setCategoryData(response.data);
      setNewName(response.data.name); // Set initial name
    } catch (err) {
      console.error("Error fetching category data:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategoryDetails();
  }, [name]);

  // Handle category name update
  const handleUpdateName = async () => {
    if (!newName || newName === categoryData.name) return;
    setLoading(true);
    try {
      await axios.put(
        `${globalUrl}/api/categories/update`,
        {
          name: categoryData.name,
          newName,
        },
        { withCredentials: true }
      );
      setCategoryData((prevData) => ({ ...prevData, name: newName })); // Update local data
    } catch (error) {
      console.error("Error updating category name:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle file selection for image upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setFile(file);
    }
  };

  // Handle category image update
  const handleUpdateImage = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        `${globalUrl}/api/categories/${categoryData.name}/updateImage`,
        formData,
        { withCredentials: true }
      );
      fetchCategoryDetails(); // Refresh data after image update
    } catch (error) {
      console.error("Error updating category image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-16 left-0 bg-[#f5f5f5] min-h-screen w-full">
      <h1 className="text-gradient text-2xl mb-6 capitalize">Category</h1>
      <div
        key={categoryData?.id}
        className="flex flex-col items-center w-full text-gradient"
      >
        {/* Display Category Image */}
        <img
          src={categoryData?.image || selectedImage}
          alt="Category Image"
          className="object-cover h-40 shadow-md mb-4"
        />

        {/* Image Upload Section */}
        <h2 className="mt-4">Update Image</h2>
        <label htmlFor="file" className="cursor-pointer shadow-md">
          <div className="bg-[#d9d9d9ff] w-[400px] h-[300px] text-[#999999ff] text-2xl flex flex-col items-center justify-center gap-4">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected"
                className="object-cover w-full h-full"
              />
            ) : (
              <>
                <FontAwesomeIcon icon={faUpload} />
                <span>Click here to upload a new image</span>
              </>
            )}
          </div>
        </label>
        <input
          type="file"
          id="file"
          name="file"
          className="hidden"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={handleFileChange}
        />
        <button
          onClick={handleUpdateImage}
          className="mt-4 mb-6 border px-4 py-2 text-[#229799ff]"
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
          ) : (
            "Update Image"
          )}
        </button>

        {/* Category Name Update */}
        <h2 className="mt-4">Update Name</h2>
        <div className="flex items-center justify-center px-6 w-full gap-4 max-[600px]:flex-col">
          <span>
            Category name:
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="px-4 py-2 mb-2 rounded-sm bg-[#d9d9d9ff] text-[#229799ff] caret-[#229799] focus:outline-[#48cfcb] w-40 max-[600px]:w-full"
              type="text"
              placeholder="Enter new name"
            />
          </span>
        </div>
        <button
          onClick={handleUpdateName}
          className="mt-4 mb-6 border px-4 py-2 text-[#229799ff]"
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
          ) : (
            "Update Name"
          )}
        </button>

        {/* Render Items in Category */}
        <h2 className="mt-4 mb-4 text-xl">Items in this Category</h2>
        <div className="flex flex-col w-full items-center gap-4">
          {categoryData?.Item?.map((data) => (
            <div key={data.id}>
              <a href={`/item/${data.name}`}>{data.name}</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
