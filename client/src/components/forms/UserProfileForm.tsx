import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import LoadingButton from "../LoadingButton";
import { IUser } from "../../types";
import { formSchema } from "../../models/UserSchema";

export type UserFormData = z.infer<typeof formSchema>;

interface IUserProfileFormProps {
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
  currentLoggedInUser: IUser;
  title?: string;
  buttonText?: string;
}

const UserProfileForm: FC<IUserProfileFormProps> = ({
  isLoading,
  onSave,
  currentLoggedInUser,
  title = "User Profile",
  buttonText = "Update Profile",
}: IUserProfileFormProps): React.JSX.Element => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentLoggedInUser.existingUser,
  });

  useEffect(() => {
    form.reset(currentLoggedInUser.existingUser);
  }, [currentLoggedInUser.existingUser, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className="space-y-4 bg-gray-50 rounded-lg md:p-10"
      >
        <div className="">
          <h2 className="text-2xl font-bold">{title}</h2>
          <FormDescription>
            View and edit your user profile details.
          </FormDescription>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button className="bg-emerald-500 hover:bg-emerald-600">
            {buttonText}
          </Button>
        )}
      </form>
    </Form>
  );
};

export default UserProfileForm;
