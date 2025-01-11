import { useAuth0 } from "@auth0/auth0-react";
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { BiLogIn } from "react-icons/bi";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, { UserFormData } from "./forms/UserProfileForm";
import { useGetLoggedInUser } from "../api/UserApi";
import { FaShoppingCart } from "react-icons/fa";

interface ICheckoutButtonProps {
  onCheckout: (userFormdata: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
}

const CheckoutButton: FC<ICheckoutButtonProps> = ({
  onCheckout,
  disabled,
  isLoading,
}): React.JSX.Element => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();
  const { pathname } = useLocation();

  const { currentLoggedInUser, isLoading: isGetUserLoading } =
    useGetLoggedInUser();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <Button
        className="flex w-full items-center gap-1 bg-emerald-500 hover:bg-emerald-500 hover:opacity-95"
        onClick={onLogin}
      >
        <BiLogIn size={24} />
        <span>Login to Checkout</span>
      </Button>
    );
  }

  if (isAuthLoading || !currentLoggedInUser || isLoading)
    return <LoadingButton />;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-emerald-500 flex-1 hover:bg-emerald-500 hover:opacity-95"
          disabled={disabled}
        >
          <FaShoppingCart />
          <span>Go to Checkout</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        <UserProfileForm
          currentLoggedInUser={currentLoggedInUser}
          onSave={onCheckout}
          isLoading={isGetUserLoading}
          title="Confirm Delivery Details"
          buttonText="Continue to Payment"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;
