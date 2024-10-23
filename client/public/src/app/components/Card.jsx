import React from "react";

const Card = ({ text1, text2, text3 }) => {
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">{text1}</h3>
        <p className="mt-2 text-3xl font-bold">{text2}</p>
        <p className="text-green-500 mt-1">{text3}</p>
      </div>
    </>
  );
};

export default Card;
