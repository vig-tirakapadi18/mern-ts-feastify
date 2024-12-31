import React, { FC } from "react";
import { Button } from "./ui/button";

const MainNav: FC = (): React.JSX.Element => {
  return (
    <Button
      variant="ghost"
      className="font-bold bg-emerald-500 text-white hover:bg-white hover:text-emerald-500 hover:border-emerald-500 border-[1px] outline-none text-lg px-10 py-5 rounded-full"
    >
      Sign In
    </Button>
  );
};

export default MainNav;
