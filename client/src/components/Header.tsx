import React, { FC } from "react";
import { Link } from "react-router-dom";

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
      </div>
    </div>
  );
};

export default Header;
