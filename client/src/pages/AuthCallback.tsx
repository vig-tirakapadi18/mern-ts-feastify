import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateUser } from "../hooks/useCreateUser";

const AuthCallback = () => {
  const { user } = useAuth0();
  const { createUser } = useCreateUser();
  const navigate = useNavigate();

  const hasCreatedUserRef = useRef<boolean>(false);

  useEffect(() => {
    if (user?.sub && user?.email && hasCreatedUserRef.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      hasCreatedUserRef.current = true;
    }

    navigate("/");
  }, [createUser, user, navigate]);

  return <>Loading...</>;
};

export default AuthCallback;
