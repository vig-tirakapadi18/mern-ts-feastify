import React, { FC } from "react";
import landingBG from "../assets/landing.jpg";

const Hero: FC = (): React.JSX.Element => {
  return <div>
    <img src={landingBG} alt="Foods" className="w-full h-[40rem] object-cover" />
  </div>;
};

export default Hero;
