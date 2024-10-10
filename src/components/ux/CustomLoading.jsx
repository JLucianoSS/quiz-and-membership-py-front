

import ReactLoading from "react-loading";

export const CustomLoading = ({ type = "spin", color = "#000000", height = 23, width = 23, className="" }) => {
  return (
    <div className={`w-full flex justify-center items-center ${className}`}>
      <ReactLoading type={type} color={color} height={height} width={width} />
    </div>
  );
};

