import React, { FC } from "react";
import mobileResponsive from "../assets/mobile.png";
import appDownload from "../assets/appDownload.png";
import { FaSearch } from "react-icons/fa";
import { Button } from "../components/ui/button";

const Home: FC = (): React.JSX.Element => {
  return (
    <div className="flex flex-col gap-12">
      <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-20">
        <h1 className="text-5xl font-bold tracking-tight text-emerald-600">
          Great foods awaits you
        </h1>

        <span className="text-xl">Food is just a click away!</span>

        <div className="border-gray-200 border-2 lg:mx-40 md:mx-28 sm:mx-10 flex justify-between items-center px-6 py-4 rounded-full">
          <FaSearch size={28} color="#10b981" />
          <input type="text" className="w-full mx-4 h-full text-xl" />
          <Button className="bg-[#10b981] w-28 text-lg rounded-full hover:bg-emerald-500 hover:opacity-95">Search</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <img src={mobileResponsive} alt="Phone Screen" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-xl tracking-tighter">
            Order takeway even faster!
          </span>
          <span>
            Download the <b>Feastify!</b> app for faster ordering and
            personalized recommendations.
          </span>

          <img src={appDownload} alt="playstore appstore" />
        </div>
      </div>
    </div>
  );
};

export default Home;
