import React, { FC } from "react";
import UserProfileForm from "../components/forms/UserProfileForm";
import { useGetLoggedInUser, useUpdateUser } from "../api/UserApi";
import LoadingSpinner from "../components/LoadingSpinner";

const UserProfile: FC = (): React.JSX.Element => {
  const { currentLoggedInUser, isLoading: isLoadingUser } =
    useGetLoggedInUser();
  const { updateUser, isLoading } = useUpdateUser();

  if (isLoadingUser) return <LoadingSpinner width={150} />;

  if (!currentLoggedInUser)
    return (
      <span className="mt-4 text-center text-rose-500 text-xl">
        Unable to load user profile! Please try again ater.
      </span>
    );

  return (
    <UserProfileForm
      onSave={updateUser}
      isLoading={isLoading}
      currentLoggedInUser={currentLoggedInUser}
    />
  );
};

export default UserProfile;
