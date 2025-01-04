import React, { FC } from "react";
import loadingSpinner from "../assets/loading.svg";

interface ILoadingSpinnerProps {
  width?: number;
}

const LoadingSpinner: FC<ILoadingSpinnerProps> = ({
  width = 100,
}: ILoadingSpinnerProps): React.JSX.Element => {
  return (
    <div className="flex justify-center items-center h-screen">
      <img src={loadingSpinner} width={width} alt="spinner" />
    </div>
  );
};

export default LoadingSpinner;
