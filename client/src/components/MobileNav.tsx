import React, { FC } from "react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { IoMenu } from "react-icons/io5";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const MobileNav: FC = (): React.JSX.Element => {
  return (
    <Sheet>
      <SheetTrigger className="bg-white">
        <IoMenu color="#10b981" size={36} />
      </SheetTrigger>

      <SheetContent>
        <SheetTitle>
          <span>Welcome to Feastify!🍔</span>
        </SheetTitle>

        <Separator />

        <SheetDescription className="flex">
          <Button className="flex-1 font-bold bg-emerald-500 rounded-full mt-2">Sign In</Button>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
