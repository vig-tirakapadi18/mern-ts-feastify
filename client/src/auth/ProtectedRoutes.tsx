import { useAuth0 } from "@auth0/auth0-react";
import React, { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const ProtectedRoutes: FC = (): React.JSX.Element => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <LoadingSpinner />;

  if (isAuthenticated) return <Outlet />;

  return <Navigate to="/" replace />;
};

export default ProtectedRoutes;
