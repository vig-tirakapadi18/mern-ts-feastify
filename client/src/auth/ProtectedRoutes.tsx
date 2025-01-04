import { useAuth0 } from "@auth0/auth0-react";
import React, { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes: FC = (): React.JSX.Element => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
