import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loader = ({ height, width, color, className }) => {
  return (
    <div
      style={{ pointerEvents: "none" }}
      className="w-full h-full flex justify-center items-center"
    >
      <div>
        <ThreeDots
          visible={true}
          height={height || "40"}
          width={width || "40"}
          color={color || "#fff"}
          wrapperClass={className || ""}
        />
      </div>
    </div>
  );
};

export default Loader;
