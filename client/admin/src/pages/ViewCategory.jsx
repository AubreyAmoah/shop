import React from "react";
import { AuthContext } from "../AuthContext";
import {
  faSpinner,
  faTrash,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import toast from "react-hot-toast";
import { globalUrl } from "../globals";

const ViewCategory = () => {
  const { loading, setLoading, categories, getCategories } =
    React.useContext(AuthContext);
  const deleteCategory = async (name) => {
    if (
      window.confirm(
        "Do you want to proceed?"
      )
    ) {
      setLoading(true);
      try {
        const response = await axios.delete(
          `${globalUrl}/api/categories/delete/${name}`,
          { withCredentials: true }
        );
        toast.success("Deleted!!");
        console.log("Delete success", response.data);
        getCategories();
      } catch (error) {
        console.log(error);
        toast.error(
          error.response?.data?.error || error.response?.data?.message
        );
      } finally {
        setLoading(false);
      }
    } else {
      return;
    }
  };
  return (
    <div className="absolute top-16 left-0 bg-[#f5f5f5] min-h-screen w-full">
      <h1 className="text-gradient text-2xl mb-6">Categories</h1>

      <div className="grid grid-cols-3 grid-rows-1 gap-4 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
        {categories ? (
          categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center p-4 gap-4 text-xl"
            >
              <img
                className="w-20 h-20"
                src={category.image}
                alt="Category Image"
              />
              <div className="flex gap-2 items-center max-[400px]:flex-col">
                <span className="text-gradient font-bold">{category.name}</span>
                <a
                  href={`/category/${category.name}`}
                  className={`text-gradient border border-[#229799ff] p-2 text-sm max-[400px]:text-xs`}
                >
                  More Details
                </a>
                <button
                  onClick={() => deleteCategory(category.name)}
                  disabled={loading ? true : false}
                  className="text-red-600 h-8"
                >
                  {loading ? (
                    <FontAwesomeIcon
                      className="text-[#229799ff] animate-spin"
                      icon={faSpinner}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faTrash} />
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          <a href="/createcategory" className="text-gradient mt-6 ml-6">
            click here to add categories
          </a>
        )}
      </div>
    </div>
  );
};

export default ViewCategory;
