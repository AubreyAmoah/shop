import {
  faSpinner,
  faUpload,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import { AuthContext } from "../AuthContext";
import { globalUrl } from "../globals";
import { useParams } from "react-router-dom";

const ItemPage = () => {
  const { name } = useParams();
  const [itemData, setItemData] = React.useState(null);
  const { loading, setLoading, categories } = React.useContext(AuthContext);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const [itemName, setItemName] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [sizeprice, setSizeprice] = React.useState([
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
  React.useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`${globalUrl}/api/items/item/${name}`, {
          withCredentials: true,
        });
        setItemData(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching item data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
    setItemName(itemData?.name);
    setSelectedCategory(itemData?.category.name);
  }, [name]);
  return (
    <div className="absolute top-16 left-0 bg-[#f5f5f5] min-h-screen w-full">
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
        {itemData?.images.length < 1 && (
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
            item name:
            <input
              onChange={(e) => setItemName(e.target.value)}
              className={`px-4 py-2 mb-2 rounded-sm bg-[#d9d9d9ff] caret-[#229799] text-[#229799ff] gradient-placeholder focus:outline focus:outline-[#48cfcb] w-40 max-[600px]:w-full`}
              type="text"
              placeholder={itemData?.name}
              value={itemName}
            />
          </span>
          <span>
            category:
            <select
              className={`px-4 py-2 mb-2 rounded-sm bg-[#d9d9d9ff] caret-[#229799] text-[#229799ff] gradient-placeholder focus:outline focus:outline-[#48cfcb] w-40 max-[600px]:w-full`}
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

        {itemData?.SizesAndPrices?.map((data) => (
          <>
            <h2 className="mt-4" key={data?.id}>
              Available Types
            </h2>
            <div className="flex justify-center items-center gap-4 w-full p-2 max-[600px]:flex-col">
              <span>
                price:
                <input
                  className={`px-4 py-2 mb-2 rounded-sm bg-[#d9d9d9ff] caret-[#229799] text-[#229799ff] gradient-placeholder focus:outline focus:outline-[#48cfcb] w-40 max-[600px]:w-full`}
                  type="text"
                  placeholder={`GHS ${data?.price}`}
                />
              </span>
              <span>
                size:{" "}
                <input
                  className={`px-4 py-2 mb-2 rounded-sm bg-[#d9d9d9ff] caret-[#229799] text-[#229799ff] gradient-placeholder focus:outline focus:outline-[#48cfcb] w-20 max-[600px]:w-full`}
                  type="text"
                  placeholder={`${data?.size}`}
                />
              </span>
              <span>
                color:{" "}
                <input
                  className={`px-4 py-2 mb-2 rounded-sm bg-[#d9d9d9ff] caret-[#229799] text-[#229799ff] gradient-placeholder focus:outline focus:outline-[#48cfcb] w-40 max-[600px]:w-full`}
                  type="text"
                  placeholder={`${data?.color}`}
                />
              </span>
              <span>
                stock:{" "}
                <input
                  className={`px-4 py-2 mb-2 rounded-sm bg-[#d9d9d9ff] caret-[#229799] text-[#229799ff] gradient-placeholder focus:outline focus:outline-[#48cfcb] w-20 max-[600px]:w-full`}
                  type="number"
                  min={0}
                  max={100}
                  placeholder={`${data?.stock}`}
                />
              </span>
            </div>
          </>
        ))}

        <h2 className="mt-4">Add new image</h2>
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

        <div className="flex w-full items-center justify-center">
          {loading ? (
            <FontAwesomeIcon
              className="mt-6 mb-6 px-4 py-2 text-[#229799ff] ml-10 text-xl animate-spin"
              icon={faSpinner}
            />
          ) : (
            <button className="mt-6 mb-6 border border-[#229799ff] px-4 py-2 text-[#229799ff]">
              Add image
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
