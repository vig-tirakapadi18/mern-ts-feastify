import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { FaUserCircle } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const UsernameMenu = () => {
  const { user, logout } = useAuth0();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-emerald-500 gap-2">
        {user?.picture ? (
          <img
            src={user.picture}
            alt={user?.given_name || "profile"}
            className="w-[40px] h-[40px] rounded-full"
          />
        ) : (
          <FaUserCircle color="#10b981" size={32} />
        )}
        {user?.given_name}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link to="/profile" className="font-bold hover:text-emerald-500">
            {user?.email}
          </Link>
        </DropdownMenuItem>

        <Separator />

        <DropdownMenuItem>
          <Button
            className="flex flex-1 font-bold bg-emerald-500 hover:bg-white hover:text-emerald-500 border-[1px] border-emerald-500 rounded-full"
            onClick={() => logout()}
          >
            Sign Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;
