import {
  faMinus,
  faPlus,
  faSpinner,
  faUpload,
  faArrowLeft,
  faArrowRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../AuthContext";
import { globalUrl } from "../globals";

const ItemCreate = () => {
  const { loading, setLoading, categories } = React.useContext(AuthContext);
  const [itemName, setItemName] = React.useState("");
  const [sizePrice, setSizePrice] = React.useState([
    { price: "", size: "", color: "", stock: 0 },
  ]);
  const [category, setCategory] = React.useState("");
  const [selectedImages, setSelectedImages] = React.useState([]);
  const [files, setFiles] = React.useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [error, setError] = React.useState(false);

  const handleInputChange = (index, field, value) => {
    const newSizePrice = [...sizePrice];
    newSizePrice[index][field] = value;
    setSizePrice(newSizePrice);
  };

  // Add new input group
  const addInputGroup = () => {
    setSizePrice([...sizePrice, { price: "", size: "", color: "", stock: 0 }]);
  };

  // Remove input group
  const removeInputGroup = (index) => {
    const newSizePrice = sizePrice.filter((_, i) => i !== index);
    setSizePrice(newSizePrice);
  };

  const isLastGroupFilled = () => {
    const lastGroup = sizePrice[sizePrice.length - 1];
    return (
      lastGroup.price !== "" &&
      lastGroup.size !== "" &&
      lastGroup.color !== "" &&
      lastGroup.stock > 0
    );
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);

    // Limit to a maximum of 5 images
    if (newFiles.length + selectedImages.length > 5) {
      alert("You can only upload a maximum of 5 images.");
      return;
    }

    const newImageUrls = newFiles.map((file) => URL.createObjectURL(file));

    setSelectedImages((prevImages) => [...prevImages, ...newImageUrls]);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const removeImage = (index) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newFiles = files.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    setFiles(newFiles);

    // Adjust current index if necessary
    if (currentIndex >= newImages.length) {
      setCurrentIndex(newImages.length - 1);
    }
  };

  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? selectedImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === selectedImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  //Add new item functionalities

  const deleteItem = async (name) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `${globalUrl}/api/items/delete/${name}`,
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
  const createItem = async () => {
    if (!itemName) return toast.error("Enter a name");

    if (!category) return toast.error("No category selected");

    for (let i = 0; i < sizePrice.length; i++) {
      if (!sizePrice[i].price) return toast.error("Please provide a price");
      if (sizePrice[i].stock < 1)
        return toast.error("Stock must me greater than 0");
      if (!sizePrice[i].size) return toast.error("Please provide a size");
      if (!sizePrice[i].color) return toast.error("Please provide a color");
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${globalUrl}/api/items/`,
        { name: itemName, sizeprice: sizePrice, category },
        { withCredentials: true }
      );
      if (response.status === 201) {
        if (files.length < 1) {
          toast.error("Rolling back changes");
          deleteItem(itemName);
          return toast.error("Please select at least a file to upload");
        }

        const formData = new FormData();
        formData.append("files", files);

        try {
          const response = await axios.patch(
            `${globalUrl}/api/items/addimages/${itemName}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data", // Make sure the header is set correctly
              },
              withCredentials: true,
            }
          );

          toast.success("Item created");
          console.log("Uploaded file response:", response.data);
          setItemName("");
          setCategory("");
          setSizePrice([{ price: "", size: "", color: "", stock: 0 }]);
          setSelectedImages([]);
          setFiles([]);
        } catch (error) {
          setError(true);
          toast.error("Upload failed. Please try again.");
          console.error("Upload error:", error);
        }
        if (error) deleteItem(itemName);
        setError(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Category creation failed");
    } finally {
      setLoading(false);
    }
  };

  React.useState(() => {
    if (error) deleteItem(itemName);
    setError(false);
  }, []);

  return (
    <div className="absolute top-16 left-0 bg-[#f5f5f5] min-h-screen w-full">
      <h1 className="text-gradient text-2xl mb-6">Basic Info</h1>
      <div className="grid grid-cols-3 grid-rows-1 gap-4 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
        <input
          onChange={(e) => setItemName(e.target.value)}
          className={`px-4 py-2 mb-2 rounded-sm bg-[#d9d9d9ff] caret-[#229799] text-[#229799ff] gradient-placeholder focus:outline focus:outline-[#48cfcb]`}
          type="text"
          placeholder="item name"
          value={itemName}
        />
        <select
          onChange={(e) => setCategory(e.target.value)}
          className={`px-4 py-2 mb-2 rounded-sm bg-[#d9d9d9ff] caret-[#229799] text-[#229799ff] gradient-placeholder focus:outline focus:outline-[#48cfcb]`}
        >
          <option value={category}>Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <h1 className="text-gradient text-2xl mb-6">More Details</h1>
      {sizePrice.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-4 grid-rows-1 gap-4 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1 mb-4"
        >
          <input
            onChange={(e) => handleInputChange(index, "price", e.target.value)}
            className="px-4 py-2 mb-2 rounded-sm bg-[#d9d9d9ff] caret-[#229799] text-[#229799ff] gradient-placeholder focus:outline focus:outline-[#48cfcb]"
            type="text"
            placeholder="price"
            value={item.price}
          />
          <input
            onChange={(e) => handleInputChange(index, "size", e.target.value)}
            className="px-4 py-2 mb-2 rounded-sm bg-[#d9d9d9ff] caret-[#229799] text-[#229799ff] gradient-placeholder focus:outline focus:outline-[#48cfcb]"
            type="text"
            placeholder="size"
            value={item.size}
          />
          <input
            onChange={(e) => handleInputChange(index, "color", e.target.value)}
            className="px-4 py-2 mb-2 rounded-sm bg-[#d9d9d9ff] caret-[#229799] text-[#229799ff] gradient-placeholder focus:outline focus:outline-[#48cfcb]"
            type="text"
            placeholder="color"
            value={item.color}
          />

          <input
            onChange={(e) => handleInputChange(index, "stock", e.target.value)}
            className="px-4 py-2 mb-2 rounded-sm bg-[#d9d9d9ff] caret-[#229799] text-[#229799ff] gradient-placeholder focus:outline focus:outline-[#48cfcb]"
            type="number"
            min={0}
            max={100}
            placeholder="stock"
            value={item.stock}
          />
          <div></div>
          {/* Add minus button to remove input fields */}
          <button
            onClick={() => removeInputGroup(index)}
            className={`${
              sizePrice.length === 1
                ? "hidden"
                : "p-2 bg-[#ff4d4d] text-white rounded-sm ml-2"
            }`}
            disabled={sizePrice.length === 1} // Disable if only one input group
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
        </div>
      ))}

      <div className="flex items-center justify-center w-full gap-4">
        <button
          onClick={addInputGroup}
          className={`${
            !isLastGroupFilled()
              ? "hidden"
              : "p-2 bg-[#229799] text-[#d9d9d9ff] rounded-sm w-10"
          }`}
          disabled={!isLastGroupFilled()}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      <h1 className="text-gradient text-2xl mb-6 mt-16 max-[740px]:mt-24">
        Item Images
      </h1>
      <div className="flex flex-col justify-center items-center w-full">
        <label
          htmlFor="file"
          className="cursor-pointer ml-auto mr-auto shadow-md max-[550px]:w-full"
        >
          <div className="bg-[#d9d9d9ff] w-[400px] h-[300px] text-[#999999ff] text-2xl flex flex-col items-center justify-center gap-4 max-[550px]:w-full">
            {selectedImages.length > 0 ? (
              // Show the carousel if there are images
              <>
                <img
                  src={selectedImages[currentIndex]}
                  alt={`Selected ${currentIndex + 1}`}
                  className="object-cover w-full h-full"
                />
                {/* Carousel controls */}
                {selectedImages.length > 1 && (
                  <div className="flex justify-between absolute top-[50%] left-0 right-0 px-4">
                    <button onClick={handlePrevImage}>
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <button onClick={handleNextImage}>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                  </div>
                )}

                <button
                  onClick={() => removeImage(currentIndex)}
                  className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </>
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
          multiple
        />

        {/* Show image count and limit */}
        <p className="mt-4">{selectedImages.length}/5 images selected</p>
      </div>

      <div className="flex items-center justify-center w-full">
        {loading ? (
          <FontAwesomeIcon
            className="mt-6 mb-6 px-4 py-2 text-[#229799ff] text-xl animate-spin"
            icon={faSpinner}
          />
        ) : (
          <button
            onClick={createItem}
            className="mt-6 mb-6 border border-[#229799ff] px-4 py-2 text-[#229799ff] text-xl"
          >
            Create
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemCreate;
