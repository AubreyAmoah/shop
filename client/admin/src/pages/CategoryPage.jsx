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

const CategoryPage = () => {
  const { name } = useParams();
  const { loading, setLoading, categories } = React.useContext(AuthContext);
  const [categoryData, setCategoryData] = React.useState({});

  React.useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.get(
          `${globalUrl}/api/categories/${name}`,
          {
            withCredentials: true,
          }
        );
        setCategoryData(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching item data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryDetails();
  }, [name]);
  return (
    <div className="absolute top-16 left-0 bg-[#f5f5f5] min-h-screen w-full">
      <h1 className="text-gradient text-2xl mb-6 capitalize">Item</h1>
      <div
        key={categoryData?.id}
        className="flex flex-col items-center w-full text-gradient"
      >
        <img
          src={categoryData?.image}
          alt={`catgory imag`}
          className="object-cover h-40 shadow-md"
        />

        <h2 className="mt-4">Basic Details</h2>
        <div className="flex items-center justify-center px-6 w-full gap-4 max-[600px]:flex-col">
          <span>
            item name:
            <input
              className={`px-4 py-2 mb-2 rounded-sm bg-[#d9d9d9ff] caret-[#229799] text-[#229799ff] gradient-placeholder focus:outline focus:outline-[#48cfcb] w-40 max-[600px]:w-full`}
              type="text"
              placeholder={categoryData?.name}
            />
          </span>
        </div>
        <h2 className="mt-4 mb-4 text-xl">Items</h2>
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
