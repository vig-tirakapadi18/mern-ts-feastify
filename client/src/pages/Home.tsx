import React, { FC } from "react";
import mobileResponsive from "../assets/mobile.png";
import appDownload from "../assets/appDownload.png";

const Home: FC = (): React.JSX.Element => {
  return (
    <div className="flex flex-col gap-12">
      <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-20">
        <h1 className="text-5xl font-bold tracking-tight text-emerald-600">
          Great foods awaits you
        </h1>

        <span className="text-xl">Food is just a click away!</span>
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
