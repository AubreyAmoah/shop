import React from "react";
import { AuthContext } from "../AuthContext";

const ViewCategory = () => {
  const { loading, setLoading, categories } = React.useContext(AuthContext);

  return (
    <div className="absolute top-16 left-0 bg-[#f5f5f5] min-h-screen w-full">
      <h1 className="text-gradient text-2xl mb-6">Categories</h1>

      <div className="grid grid-cols-3 grid-rows-1 gap-4 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
        {categories.map((category) => (
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
                href="#"
                className={`text-gradient border border-[#229799ff] p-2 text-sm max-[400px]:text-xs`}
              >
                More Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCategory;
