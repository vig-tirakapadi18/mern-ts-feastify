import React, { FC, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Button } from "./ui/button";
import { searchSchema } from "../models/SearchSchema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";

export type SearchForm = z.infer<typeof searchSchema>;

interface ISearchBarProps {
  onSubmit: (formData: SearchForm) => void;
  placeHolder: string;
  onReset?: () => void;
  searchQuery?: string;
}

const SearchBar: FC<ISearchBarProps> = ({
  onSubmit,
  placeHolder,
  onReset,
  searchQuery,
}: ISearchBarProps): React.JSX.Element => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchQuery: searchQuery || "",
    },
  });

  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });

    if (onReset) onReset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`border-gray-200 border-2 lg:mx-40 md:mx-28 sm:mx-10 flex justify-between items-center px-6 py-4 rounded-full ${
          form.formState.errors.searchQuery && "border-rose-500"
        }`}
      >
        <FaSearch size={28} color="#10b981" className="hidden md:block" />
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  className="mx-4 h-full text-xl border-none outline-none focus-visible:ring-0"
                  placeholder={placeHolder}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="button"
          variant="outline"
          className="rounded-full text-lg border-emerald-500 mx-2 py-2"
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button className="bg-[#10b981] w-28 text-lg rounded-full hover:bg-emerald-500 hover:opacity-95">
          Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
