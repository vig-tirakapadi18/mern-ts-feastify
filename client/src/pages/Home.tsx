import React, { FC } from "react";

const Home: FC = (): React.JSX.Element => {
  return (
    <div className="flex flex-col gap-12">
      <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-20">
        <h1 className="text-5xl font-bold tracking-tight text-emerald-600">
          Great foods awaits you
        </h1>

        <span className="text-xl">Food is just a click away!</span>
      </div>
    </div>
  );
};

export default Home;
