import React from "react";
import Loader from "@/components/loader";

const LoadingComponent: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <Loader />
    </div>
  );
};

export default LoadingComponent;
