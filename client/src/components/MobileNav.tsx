import React, { FC } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { IoMenu } from "react-icons/io5";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const MobileNav: FC = (): React.JSX.Element => {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  return (
    <Sheet>
      <SheetTrigger className="bg-white">
        <IoMenu color="#10b981" size={36} />
      </SheetTrigger>

      <SheetContent>
        <SheetTitle>
          {isAuthenticated ? (
            <div className="flex flex-col items-center gap-2">
              <span>
                {user?.picture ? (
                  <img
                    src={user?.picture}
                    alt={user?.given_name}
                    className="w-40 h-40 rounded-full"
                  />
                ) : (
                  <FaUserCircle color="#10b981" size={32} />
                )}
              </span>
              <Link to="/profile" className="text-2xl font-bold hover:text-emerald-500">{user?.name}</Link>
              <span className="text-emerald-500">{user?.email}</span>
            </div>
          ) : (
            <span>Welcome to Feastify!🍔</span>
          )}
        </SheetTitle>

        <Separator />

        <SheetDescription className="flex">
          {isAuthenticated ? (
            <Button
              className="flex-1 font-bold bg-emerald-500 rounded-full mt-2 text-lg"
              onClick={async () => await loginWithRedirect()}
            >
              Sign Out
            </Button>
          ) : (
            <Button
              className="flex-1 font-bold bg-emerald-500 rounded-full mt-2 text-lg"
              onClick={() => logout()}
            >
              Sign In
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
