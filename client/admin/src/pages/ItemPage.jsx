import {
  faSpinner,
  faUpload,
  faArrowLeft,
  faArrowRight,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { globalUrl } from "../globals";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ItemPage = () => {
  const { name } = useParams();
  const [itemData, setItemData] = useState(null);
  const { loading, setLoading, categories } = useContext(AuthContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [itemName, setItemName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sizeprice, setSizeprice] = useState([
    { size: "", price: "", color: "" },
  ]);

  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? itemData.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === itemData.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const handleSizePriceChange = (index, key, value) => {
    const updatedSizeprice = [...sizeprice];
    updatedSizeprice[index][key] = value;
    setSizeprice(updatedSizeprice);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const fetchItemDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${globalUrl}/api/items/item/${name}`, {
        withCredentials: true,
      });
      setItemData(response.data);
      setItemName(response.data.name);
      setSelectedCategory(response.data.category?.name);
      setSizeprice(
        response.data.SizesAndPrices || [{ size: "", price: "", color: "" }]
      );
    } catch (err) {
      console.error("Error fetching item data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateItem = async () => {
    setLoading(true);
    try {
      const updatedData = {
        name: itemName,
        category: selectedCategory,
        sizeprice,
      };

      await axios.put(
        `${globalUrl}/api/items/update/${itemData.id}`,
        updatedData,
        {
          withCredentials: true,
        }
      );

      toast.success("Item updated successfully");
      fetchItemDetails();
    } catch (error) {
      console.error("Error updating item:", error);
      toast.error("Failed to update item");
    } finally {
      setLoading(false);
    }
  };

  // Handle appending a new image
  const handleAppendImage = async () => {
    if (!file) return toast.error("upload an image");
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        `${globalUrl}/api/items/${itemData.id}/appendImage`,
        formData,
        { withCredentials: true }
      );
      setFile(null);
      setSelectedImage(null);
      toast.success("Item updated successfully");
      fetchItemDetails();
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle image removal
  const handleRemoveImage = async (imageUrl) => {
    setLoading(true);
    try {
      await axios.put(
        `${globalUrl}/api/items/removeImage`,
        {
          name: itemData.name,
          imagesToRemove: [imageUrl],
        },
        { withCredentials: true }
      );
      toast.success("Item updated successfully");
      fetchItemDetails(); // Refresh item data after removal
    } catch (error) {
      toast.error("Failed to update item");
      console.error("Error removing image:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItemDetails();
  }, [name]);

  return (
    <div className="absolute top-16 left-0 bg-[#f5f5f5] min-h-screen w-full">
      {loading ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <FontAwesomeIcon
            className="text-[#229799ff] ml-10 text-3xl animate-spin"
            icon={faSpinner}
          />
        </div>
      ) : (
        <>
          <h1 className="text-gradient text-2xl mb-6 capitalize">Item</h1>
          <div
            key={itemData?.id}
            className="flex flex-col items-center w-full text-gradient"
          >
            <img
              src={itemData?.images[currentIndex]}
              alt={`Selected ${currentIndex + 1}`}
              className="object-cover h-40 shadow-md"
            />
            {/* Carousel controls */}
            {itemData?.images.length > 1 && (
              <div className="flex justify-between w-40 text-2xl mt-6 px-4 text-[#229799]">
                <button onClick={handlePrevImage}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button onClick={handleNextImage}>
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            )}

            <h2 className="mt-4">Basic Details</h2>
            <div className="flex items-center justify-center px-6 w-full gap-4 max-[600px]:flex-col">
              <span>
                Item Name:
                <input
                  onChange={(e) => setItemName(e.target.value)}
                  className="px-4 py-2 mb-2 rounded-sm bg-[#d9d9d9ff] caret-[#229799] text-[#229799ff] gradient-placeholder focus:outline focus:outline-[#48cfcb] w-40 max-[600px]:w-full"
                  type="text"
                  value={itemName}
                />
              </span>
              <span>
                Category:
                <select
                  onChange={handleCategoryChange}
                  className="px-4 py-2 mb-2 rounded-sm bg-[#d9d9d9ff] caret-[#229799] text-[#229799ff] gradient-placeholder focus:outline focus:outline-[#48cfcb] w-40 max-[600px]:w-full"
                  value={selectedCategory}
                >
                  <option value={selectedCategory}>{selectedCategory}</option>
                  {categories?.map((category) => (
                    <option key={category?.id} value={category?.name}>
                      {category?.name}
                    </option>
                  ))}
                </select>
              </span>
            </div>

            {sizeprice.map((data, index) => (
              <div
                key={index}
                className="flex justify-center items-center gap-4 w-full p-2 max-[600px]:flex-col"
              >
                <span>
                  Price:
                  <input
                    onChange={(e) =>
                      handleSizePriceChange(index, "price", e.target.value)
                    }
                    className="px-4 py-2 mb-2 rounded-sm bg-[#d9d9d9ff] caret-[#229799] text-[#229799ff] gradient-placeholder focus:outline focus:outline-[#48cfcb] w-40 max-[600px]:w-full"
                    type="text"
                    placeholder={`GHS ${data.price}`}
                    value={data.price}
                  />
                </span>
                <span>
                  Size:
                  <input
                    onChange={(e) =>
                      handleSizePriceChange(index, "size", e.target.value)
                    }
                    className="px-4 py-2 mb-2 rounded-sm bg-[#d9d9d9ff] caret-[#229799] text-[#229799ff] gradient-placeholder focus:outline focus:outline-[#48cfcb] w-20 max-[600px]:w-full"
                    type="text"
                    placeholder={data.size}
                    value={data.size}
                  />
                </span>
                <span>
                  Color:
                  <input
                    onChange={(e) =>
                      handleSizePriceChange(index, "color", e.target.value)
                    }
                    className="px-4 py-2 mb-2 rounded-sm bg-[#d9d9d9ff] caret-[#229799] text-[#229799ff] gradient-placeholder focus:outline focus:outline-[#48cfcb] w-40 max-[600px]:w-full"
                    type="text"
                    placeholder={data.color}
                    value={data.color}
                  />
                </span>
              </div>
            ))}
            <div className="flex w-full items-center justify-center">
              {loading ? (
                <FontAwesomeIcon
                  className="mt-6 mb-6 px-4 py-2 text-[#229799ff] ml-10 text-xl animate-spin"
                  icon={faSpinner}
                />
              ) : (
                <button
                  onClick={handleUpdateItem}
                  className="mt-6 mb-6 border border-[#229799ff] px-4 py-2 text-[#229799ff]"
                >
                  Update Item
                </button>
              )}
            </div>
            <h2 className="mt-4">Images</h2>

            {/* Render Delete Button for Each Image */}
            {itemData?.images?.map((image, index) => (
              <div key={index} className="flex flex-col items-center mt-2">
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="object-cover h-32 w-32 shadow-md mb-2"
                />
                <button
                  onClick={() => handleRemoveImage(image)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FontAwesomeIcon icon={faTrashAlt} /> Remove Image
                </button>
              </div>
            ))}

            <h2 className="mt-4">Add new image</h2>
            <div className="flex flex-col justify-center items-center w-full">
              <label
                htmlFor="file"
                className="cursor-pointer ml-auto mr-auto shadow-md max-[550px]:w-full"
              >
                <div className="bg-[#d9d9d9ff] w-[400px] h-[300px] text-[#999999ff] text-2xl flex flex-col items-center justify-center gap-4 max-[550px]:w-full">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="object-cover w-full h-full"
                    />
                  ) : (
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
              <button
                onClick={handleAppendImage}
                className="mt-4 mb-6 border border-[#229799ff] px-4 py-2 text-[#229799ff]"
              >
                {loading ? (
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                ) : (
                  "Add image"
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ItemPage;
