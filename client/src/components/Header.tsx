import React, { FC } from "react";
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";

const Header: FC = (): React.JSX.Element => {
  return (
    <div className="border-b-2 border-b-emerald-500 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-bold tracking-tight text-emerald-500"
        >
          Feastify!🍔
        </Link>

        <div className="md:hidden">
          <MobileNav />
        </div>

        <div className="hidden md:block">
          <MainNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
