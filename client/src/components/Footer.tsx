import React, { FC } from "react";

const Footer: FC = (): React.JSX.Element => {
  return (
    <div className="bg-emerald-500 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <span className="text-3xl text-emerald-100 font-bold tracking-tight">
          Feastify!
        </span>

        <span className="text-emerald-100 font-bold tracking-tight flex gap-4">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </span>
      </div>
    </div>
  );
};

export default Footer;
