import React, { FC } from "react";
import UserProfileForm from "../components/forms/UserProfileForm";
import { useUpdateUser } from "../api/UserApi";

const UserProfile: FC = (): React.JSX.Element => {
  const { updateUser, isLoading } = useUpdateUser();

  return <UserProfileForm onSave={updateUser} isLoading={isLoading} />;
};

export default UserProfile;
