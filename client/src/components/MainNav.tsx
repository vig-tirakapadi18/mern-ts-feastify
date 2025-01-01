import React, { FC } from "react";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import UsernameMenu from "./UsernameMenu";

const MainNav: FC = (): React.JSX.Element => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <span>
      {isAuthenticated ? (
        <UsernameMenu />
      ) : (
        <Button
          variant="ghost"
          className="font-bold bg-emerald-500 text-white hover:bg-white hover:text-emerald-500 hover:border-emerald-500 border-[1px] outline-none text-lg px-10 py-5 rounded-full"
          onClick={async () => await loginWithRedirect()}
        >
          Sign In
        </Button>
      )}
    </span>
  );
};

export default MainNav;
