import React, { FC } from "react";
import { AppState, Auth0Provider, User } from "@auth0/auth0-react";
import { useCreateUser } from "../hooks/useCreateUser";

interface IAuth0ProviderWithNavigateProps {
  children: React.ReactNode;
}

const Auth0ProviderWithNavigate: FC<IAuth0ProviderWithNavigateProps> = ({
  children,
}: IAuth0ProviderWithNavigateProps): React.JSX.Element => {
  const { createUser } = useCreateUser();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN as string;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID as string;
  const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI as string;

  const onRedirectCallback = (appState?: AppState, user?: User) => {
    if (user?.sub && user?.email) {
      createUser({ auth0Id: user.sub, email: user.email });
    }
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
