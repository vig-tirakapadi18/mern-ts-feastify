import React, { ChangeEvent, FC } from "react";
import { cuisineList } from "../config/restaurantOptions";
import { Label } from "./ui/label";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { Button } from "./ui/button";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface ICuisineFilterProps {
  onChange: (cuisine: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
}

const CuisineFilter: FC<ICuisineFilterProps> = ({
  onChange,
  selectedCuisines,
  isExpanded,
  onExpandedClick,
}): React.JSX.Element => {
  const handleCuisinesReset = () => {};

  const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = event.target.value;
    const isChecked = event.target.checked;

    const newCuisinesList = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);

    onChange(newCuisinesList);
  };

  return (
    <>
      <section className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter By Cuisine</div>
        <div
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
          onClick={handleCuisinesReset}
        >
          Reset Filters
        </div>
      </section>

      <section className="space-y-2 flex flex-col">
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine) => {
            const isSelected = selectedCuisines.includes(cuisine);
            return (
              <div className="flex" key={crypto.randomUUID()}>
                <input
                  id={`cuisine_${cuisine}`}
                  type="checkbox"
                  className="hidden"
                  value={cuisine}
                  checked={isSelected}
                  onChange={handleCuisinesChange}
                />
                <Label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelected
                      ? "border-green-600 text-green-600 border-2"
                      : "border border-stone-400"
                  }`}
                >
                  {isSelected && (
                    <HiMiniCheckBadge size={22} className="mr-1" />
                  )}
                  {cuisine}
                </Label>
              </div>
            );
          })}

        <Button
          variant="link"
          className="mt-4 flex-1"
          onClick={onExpandedClick}
        >
          {isExpanded ? (
            <span className="flex flex-row items-center gap-1 text-blue-600">
              View Less <FaChevronUp size={40} />
            </span>
          ) : (
            <span className="flex flex-row items-center gap-1 text-blue-600">
              View More <FaChevronDown size={40} />
            </span>
          )}
        </Button>
      </section>
    </>
  );
};

export default CuisineFilter;
