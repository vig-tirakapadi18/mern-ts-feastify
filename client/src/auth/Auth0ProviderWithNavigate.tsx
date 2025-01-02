import React, { FC } from "react";
import { AppState, Auth0Provider, User } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

interface IAuth0ProviderWithNavigateProps {
  children: React.ReactNode;
}

const Auth0ProviderWithNavigate: FC<IAuth0ProviderWithNavigateProps> = ({
  children,
}: IAuth0ProviderWithNavigateProps): React.JSX.Element => {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN as string;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID as string;
  const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI as string;

  const onRedirectCallback = (appState?: AppState, user?: User) => {
    navigate("/auth-callback");
    console.log(user);
    console.log("APP STATE", appState);
  };

  if (!domain || !clientId || !redirectUri)
    throw new Error("Unable to initialize Auth0!");

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
